import "server-only";
import { recentEventsQuery, recordEventQuery } from "@/lib/social-sql";
import { run } from "@/lib/social/data";

// A limit on wrong PINs, so a child cannot work through all 10,000 four-digit PINs of a brother, a sister or the
// parent. Counted per parent account (in public.social_events, which needs migration 010), so switching between
// learners does not reset it, and a right PIN does not reset it either (otherwise a child could mix in their own
// PIN to keep guessing a sibling's). Learner PINs and the parent PIN have separate allowances.
export const PIN_TRIES = { max: 5, windowSeconds: 15 * 60 };
export type PinKind = "pin-fail" | "parent-pin-fail";

export type TryAllowance = { blocked: false; left: number } | { blocked: true; waitMinutes: number };

export async function pinAllowance(parentId: string, kind: PinKind): Promise<TryAllowance> {
  const rows = await run(recentEventsQuery({ parentId }, kind, PIN_TRIES.windowSeconds));
  const used = Number(rows[0]?.n ?? 0);
  if (used < PIN_TRIES.max) return { blocked: false, left: PIN_TRIES.max - used };
  return { blocked: true, waitMinutes: Math.max(1, Math.ceil(Number(rows[0]?.wait_seconds ?? PIN_TRIES.windowSeconds) / 60)) };
}

// Records one wrong PIN and returns how many tries are left in the window.
export async function recordWrongPin(parentId: string, kind: PinKind, leftBefore: number) {
  await run(recordEventQuery({ parentId }, kind));
  return Math.max(0, leftBefore - 1);
}

export const waitMessage = (minutes: number) =>
  `Too many wrong PINs. For safety, please wait about ${minutes} minute${minutes === 1 ? "" : "s"} and try again.`;

export const wrongPinMessage = (left: number) =>
  left > 0
    ? `That PIN isn’t right. ${left} more ${left === 1 ? "try" : "tries"} before a short wait.`
    : `That PIN isn’t right. Please wait about ${Math.round(PIN_TRIES.windowSeconds / 60)} minutes before trying again.`;
