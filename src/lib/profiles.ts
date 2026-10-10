import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { database } from "@/lib/db";
import { isPlanId, type PlanId } from "@/data/plans";

const scrypt = promisify(scryptCallback) as (password: string, salt: Buffer, keylen: number) => Promise<Buffer>;

// `sponsored` is true when a referral code set the learner's plan.
export type LearnerProfile = { id: string; name: string; classLevel: string; school: string | null; plan: PlanId; sponsored: boolean };
type NewProfile = { name: string; pin: string; classLevel: string; school: string; plan: PlanId; referralCode: string | null };

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

function toProfile(row: Record<string, unknown>): LearnerProfile {
  return {
    id: row.id as string,
    name: row.name as string,
    classLevel: row.class_level as string,
    school: (row.school as string | null) ?? null,
    plan: isPlanId(row.plan) ? row.plan : "free",
    sponsored: !!row.referral_code,
  };
}

export async function listProfiles(parentId: string): Promise<LearnerProfile[]> {
  const rows = await database()`select id, name, class_level, school, plan, referral_code from public.learner_profiles where parent_id = ${parentId} order by created_at`;
  return rows.map(toProfile);
}

export async function getProfile(parentId: string, profileId: string): Promise<LearnerProfile | null> {
  if (!UUID_PATTERN.test(profileId)) return null;
  const rows = await database()`select id, name, class_level, school, plan, referral_code from public.learner_profiles where id = ${profileId} and parent_id = ${parentId}`;
  return rows[0] ? toProfile(rows[0]) : null;
}

export async function createProfile(parentId: string, { name, pin, classLevel, school, plan, referralCode }: NewProfile): Promise<LearnerProfile> {
  const rows = await database()`insert into public.learner_profiles (parent_id, name, pin_hash, class_level, school, plan, referral_code)
    select ${parentId}, ${name}, ${await hashPin(pin)}, ${classLevel}, ${school}, ${plan}, ${referralCode}
    where (select count(*) from public.learner_profiles where parent_id = ${parentId}) < ${MAX_PROFILES}
    returning id, name, class_level, school, plan, referral_code`;
  if (!rows[0]) throw new Error(`A parent account can have at most ${MAX_PROFILES} learners.`);
  return toProfile(rows[0]);
}

export async function checkPin(parentId: string, profileId: string, pin: string): Promise<LearnerProfile | null> {
  if (!UUID_PATTERN.test(profileId) || !PIN_PATTERN.test(pin)) return null;
  const rows = await database()`select id, name, class_level, school, plan, referral_code, pin_hash from public.learner_profiles where id = ${profileId} and parent_id = ${parentId}`;
  if (!rows[0] || !(await pinMatches(pin, rows[0].pin_hash as string))) return null;
  return toProfile(rows[0]);
}

export async function deleteProfile(parentId: string, profileId: string) {
  if (!UUID_PATTERN.test(profileId)) return;
  const sql = database();
  const deleted = await sql`delete from public.learner_profiles where id = ${profileId} and parent_id = ${parentId} returning id`;
  if (deleted[0]) await sql`delete from public.lesson_progress where user_id = ${profileId}`;
}
