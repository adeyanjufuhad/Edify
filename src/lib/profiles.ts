import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { database } from "@/lib/db";
import { isPlanId, type PlanId } from "@/data/plans";
import { isStreamId, type StreamId } from "@/data/streams";
import { paidAccess } from "@/lib/access";

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// `sponsored` is true when a referral code set the learner's plan. `stream` is null for JSS learners.
export type LearnerProfile = { id: string; name: string; classLevel: string; school: string | null; stream: StreamId | null; plan: PlanId; sponsored: boolean; expiresAt?: string | null };
type NewProfile = { name: string; pin: string; classLevel: string; school: string; stream: StreamId | null; plan: PlanId; referralCode: string | null };

export const MAX_PROFILES = 6;
export const PIN_PATTERN = /^\d{4}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function hashPin(pin: string) {
  const salt = randomBytes(16);
  const hash = await scrypt(pin, salt, 32);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

async function pinMatches(pin: string, stored: string) {
  const [saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;
  const expected = Buffer.from(hashHex, "hex");
  const actual = await scrypt(pin, Buffer.from(saltHex, "hex"), expected.length);
  return timingSafeEqual(actual, expected);
}

async function toProfile(row: Record<string, unknown>): Promise<LearnerProfile> {
  const sponsored = !!row.referral_code && row.plan === "gold";
  const access = sponsored ? { plan: "gold" as const, expiresAt: null } : await paidAccess(row.id as string);
  return {
    id: row.id as string,
    name: row.name as string,
    classLevel: row.class_level as string,
    school: (row.school as string | null) ?? null,
    stream: isStreamId(row.stream) ? row.stream : null,
    plan: isPlanId(access.plan) ? access.plan : "free",
    expiresAt: access.expiresAt,
    sponsored,
  };
}

export async function listProfiles(parentId: string): Promise<LearnerProfile[]> {
  const rows = await database()`select id, name, class_level, school, stream, plan, referral_code from public.learner_profiles where parent_id = ${parentId} order by created_at`;
  return Promise.all(rows.map(toProfile));
}

export async function getProfile(parentId: string, profileId: string): Promise<LearnerProfile | null> {
  if (!UUID_PATTERN.test(profileId)) return null;
  const rows = await database()`select id, name, class_level, school, stream, plan, referral_code from public.learner_profiles where id = ${profileId} and parent_id = ${parentId}`;
  return rows[0] ? toProfile(rows[0]) : null;
}

export async function createProfile(parentId: string, { name, pin, classLevel, school, stream, plan, referralCode }: NewProfile): Promise<LearnerProfile> {
  const rows = await database()`insert into public.learner_profiles (parent_id, name, pin_hash, class_level, school, stream, plan, referral_code)
    select ${parentId}, ${name}, ${await hashPin(pin)}, ${classLevel}, ${school}, ${stream}, ${plan}, ${referralCode}
    where (select count(*) from public.learner_profiles where parent_id = ${parentId}) < ${MAX_PROFILES}
    returning id, name, class_level, school, stream, plan, referral_code`;
  if (!rows[0]) throw new Error(`A parent account can have at most ${MAX_PROFILES} learners.`);
  return toProfile(rows[0]);
}

export async function checkPin(parentId: string, profileId: string, pin: string): Promise<LearnerProfile | null> {
  if (!UUID_PATTERN.test(profileId) || !PIN_PATTERN.test(pin)) return null;
  const rows = await database()`select id, name, class_level, school, stream, plan, referral_code, pin_hash from public.learner_profiles where id = ${profileId} and parent_id = ${parentId}`;
  if (!rows[0] || !(await pinMatches(pin, rows[0].pin_hash as string))) return null;
  return toProfile(rows[0]);
}

// For senior learners added before streams existed. Only fills a stream that is still empty, so it cannot silently change one.
// The class list matches isSeniorClass() in src/data/streams.ts.
export async function setStream(parentId: string, profileId: string, stream: StreamId): Promise<boolean> {
  if (!UUID_PATTERN.test(profileId)) return false;
  const rows = await database()`update public.learner_profiles set stream = ${stream}
    where id = ${profileId} and parent_id = ${parentId} and stream is null and class_level in ('SS1', 'SS2', 'SS3')
    returning id`;
  return rows.length > 0;
}

export async function deleteProfile(parentId: string, profileId: string) {
  if (!UUID_PATTERN.test(profileId)) return;
  const sql = database();
  const deleted = await sql`delete from public.learner_profiles where id = ${profileId} and parent_id = ${parentId} returning id`;
  if (deleted[0]) await sql`delete from public.lesson_progress where user_id = ${profileId}`;
}
