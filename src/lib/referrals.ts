import type { PlanId } from "@/data/plans";

// Referral codes are checked on the server only. Valid codes live in the REFERRAL_CODES
// environment variable (comma-separated) and never reach the browser.
export const SPONSORED_SCHOOLS = ["Brainfield School", "Adams College"];

export type ReferralResult = { ok: true; plan: PlanId; code: string | null } | { ok: false; error: string };

function validCodes() {
  return new Set((process.env.REFERRAL_CODES ?? "").split(",").map((code) => code.trim().toUpperCase()).filter(Boolean));
}

// No code means the free plan. A code must be valid (ignoring case) and the learner's school must be sponsored.
export function applyReferral(rawCode: string, school: string): ReferralResult {
  const code = rawCode.trim().toUpperCase();
  if (!code) return { ok: true, plan: "free", code: null };
  if (code.length > 40 || !validCodes().has(code)) return { ok: false, error: "That referral code isn’t valid. Check the spelling, or leave the box empty." };
  if (!SPONSORED_SCHOOLS.includes(school)) return { ok: false, error: `This referral code is only for learners at ${SPONSORED_SCHOOLS.join(" or ")}. Check the school name, or leave the code empty.` };
  return { ok: true, plan: "gold", code };
}
