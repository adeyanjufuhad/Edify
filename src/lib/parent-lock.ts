import "server-only";
import { cache } from "react";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { database } from "@/lib/db";
import { pinMatches } from "@/lib/pin-hash";
import { FRESH_SIGN_IN_MINUTES, PARENT_PIN_PATTERN, UNLOCK_MINUTES } from "@/lib/parent-lock-rules";
import { pinAllowance, recordWrongPin, waitMessage, wrongPinMessage } from "@/lib/pin-tries";

// The parent PIN: an optional second lock on the parent area, because children often study on a parent's
// signed-in phone. Once a parent sets one, these need it (checked on the server in every page and action):
//   /profiles: adding, editing or removing a learner, changing a learner's PIN or stream, deleting the account;
//   /study/classmates: viewing the page and every action on it (and the parent's playback of voice notes).
// Picking a learner and typing their PIN, and plans and payments (checkout needs a card anyway), stay open.
//
// Unlocking sets an httpOnly cookie that holds an expiry and an HMAC of (parent id, the stored PIN hash, expiry), so it
// cannot be forged, moved to another account, or outlive a change of PIN. It lasts UNLOCK_MINUTES. Opening a learner's
// study space, signing out and "Lock now" clear it.
//
// A forgotten parent PIN: Neon Auth gives the server no way to re-check the account password, so instead a sign-in
// from the last FRESH_SIGN_IN_MINUTES (the session's createdAt) counts as proof. The parent signs out, signs in again
// with their password, and can then choose a new parent PIN (or remove it) without the old one.
// Setting the very first parent PIN needs only the signed-in account: if a child sets one first, the parent can
// still take it over by signing in again.

export { PARENT_PIN_PATTERN, UNLOCK_MINUTES, FRESH_SIGN_IN_MINUTES };
export const PARENT_UNLOCK_COOKIE = "edify_parent_unlock";
export const LOCKED_MESSAGE = "Parent controls are locked. Enter your parent PIN on this page to unlock them, then try again.";

type PinSetting = { available: boolean; hash: string | null };

// `available` is false while migration 015 has not been applied: then there is simply no parent PIN.
const missingTable = (error: unknown) => {
  const { code, message } = (error ?? {}) as { code?: string; message?: string };
  return code === "42P01" || /parent_settings.*does not exist/i.test(message ?? "");
};

export async function readPinSetting(parentId: string): Promise<PinSetting> {
  try {
    const rows = await database()`select pin_hash from public.parent_settings where parent_id = ${parentId}`;
    return { available: true, hash: (rows[0]?.pin_hash as string | null | undefined) ?? null };
  } catch (error) {
    if (missingTable(error)) return { available: false, hash: null };
    throw error;
  }
}

// `hash` null removes the parent PIN.
export async function savePinHash(parentId: string, hash: string | null) {
  await database()`insert into public.parent_settings (parent_id, pin_hash, updated_at) values (${parentId}, ${hash}, now())
    on conflict (parent_id) do update set pin_hash = excluded.pin_hash, updated_at = now()`;
}

// A key only for this cookie, derived from a server secret that already exists: the Neon Auth cookie secret, or
// failing that the database URL. With neither, nothing can be unlocked (the server could not run anyway).
function unlockKey(): Buffer | null {
  const base = process.env.NEON_AUTH_COOKIE_SECRET || process.env.DATABASE_URL;
  return base ? createHash("sha256").update(`edify-parent-unlock-v1\0${base}`).digest() : null;
}

function sign(key: Buffer, parentId: string, pinHash: string, expires: number) {
  return createHmac("sha256", key).update(`${parentId}\0${pinHash}\0${expires}`).digest("base64url");
}

// The expiry (ms) of a valid unlock cookie for this parent and PIN, or null.
function verifyUnlock(value: string | undefined, parentId: string, pinHash: string): number | null {
  const key = unlockKey();
  const match = /^(\d{10,16})\.([A-Za-z0-9_-]{43})$/.exec(value ?? "");
  if (!key || !match) return null;
  const expires = Number(match[1]);
  const now = Date.now();
  // Also refuses an expiry further away than one unlock could ever give.
  if (expires <= now || expires > now + UNLOCK_MINUTES * 60_000 + 60_000) return null;
  const expected = Buffer.from(sign(key, parentId, pinHash, expires));
  const given = Buffer.from(match[2]);
  return expected.length === given.length && timingSafeEqual(expected, given) ? expires : null;
}

export const signedInRecently = (signedInAt: number | null) =>
  signedInAt !== null && Date.now() - signedInAt < FRESH_SIGN_IN_MINUTES * 60_000 && signedInAt <= Date.now() + 60_000;

// `canManage` is true when there is no parent PIN or the parent area is unlocked. A failed lookup locks (fails closed).
export type ParentLock = { available: boolean; hasPin: boolean; canManage: boolean; unlockedUntil: number | null; recentSignIn: boolean; failed: boolean };

export const getParentLock = cache(async (parentId: string, signedInAt: number | null): Promise<ParentLock> => {
  const recentSignIn = signedInRecently(signedInAt);
  let setting: PinSetting;
  try {
    setting = await readPinSetting(parentId);
  } catch {
    return { available: true, hasPin: true, canManage: false, unlockedUntil: null, recentSignIn, failed: true };
  }
  if (!setting.hash) return { available: setting.available, hasPin: false, canManage: true, unlockedUntil: null, recentSignIn, failed: false };
  const unlockedUntil = verifyUnlock((await cookies()).get(PARENT_UNLOCK_COOKIE)?.value, parentId, setting.hash);
  return { available: true, hasPin: true, canManage: unlockedUntil !== null, unlockedUntil, recentSignIn, failed: false };
});

export async function parentCanManage(parent: { id: string; signedInAt: number | null }) {
  return (await getParentLock(parent.id, parent.signedInAt)).canManage;
}

// Server Functions only (cookies can only be set there). Returns false when no key is available.
export async function rememberUnlock(parentId: string, pinHash: string) {
  const key = unlockKey();
  if (!key) return false;
  const expires = Date.now() + UNLOCK_MINUTES * 60_000;
  (await cookies()).set(PARENT_UNLOCK_COOKIE, `${expires}.${sign(key, parentId, pinHash, expires)}`, {
    path: "/",
    maxAge: UNLOCK_MINUTES * 60,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return true;
}

export async function forgetUnlock() {
  (await cookies()).delete(PARENT_UNLOCK_COOKIE);
}

export type PinCheck = { ok: true; hash: string } | { ok: false; error: string };

// Checks a typed parent PIN, with the wrong-PIN limit. Throws when the database cannot be reached, or when the try
// counter (migration 010) is missing: the caller then refuses, so the limit can never be skipped.
export async function checkParentPin(parentId: string, pin: string): Promise<PinCheck> {
  if (!PARENT_PIN_PATTERN.test(pin)) return { ok: false, error: "Enter your parent PIN (4 to 8 digits)." };
  const { hash } = await readPinSetting(parentId);
  if (!hash) return { ok: false, error: "No parent PIN is set on this account." };
  const allowance = await pinAllowance(parentId, "parent-pin-fail");
  if (allowance.blocked) return { ok: false, error: waitMessage(allowance.waitMinutes) };
  if (await pinMatches(pin, hash)) return { ok: true, hash };
  return { ok: false, error: wrongPinMessage(await recordWrongPin(parentId, "parent-pin-fail", allowance.left)) };
}
