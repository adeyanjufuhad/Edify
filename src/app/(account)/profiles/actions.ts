"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { PROFILE_COOKIE, PROFILE_COOKIE_MAX_AGE, requireParent } from "@/lib/account";
import { MAX_PROFILES, PIN_PATTERN, checkPin, createProfile, deleteProfile } from "@/lib/profiles";
import { isClassLevel } from "@/data/curriculum";
import { normalizeSchool } from "@/data/schools";
import { applyReferral } from "@/lib/referrals";

// `values` hands back what was typed (never the PINs) so a rejected form keeps it.
export type FormValues = { name: string; classLevel: string; school: string; referralCode: string };
export type FormState = { error?: string; addedAt?: number; values?: FormValues };

export async function addProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireParent();
  const name = String(formData.get("name") ?? "").trim().replace(/\s+/g, " ");
  const pin = String(formData.get("pin") ?? "");
  const confirm = String(formData.get("confirmPin") ?? "");
  const classLevel = String(formData.get("classLevel") ?? "");
  const school = normalizeSchool(String(formData.get("school") ?? ""));
  const referralCode = String(formData.get("referralCode") ?? "").trim().slice(0, 40);
  const values = { name, classLevel, school, referralCode };
  const fail = (error: string): FormState => ({ error, values });
  if (!name || name.length > 40) return fail("Enter the learner’s first name (up to 40 letters).");
  if (!isClassLevel(classLevel)) return fail("Choose the learner’s class (JSS1 to SS3).");
  if (school.length < 2 || school.length > 80) return fail("Enter the learner’s school (pick one from the list or type its name).");
  if (!PIN_PATTERN.test(pin)) return fail("Choose a PIN of exactly 4 digits.");
  if (pin !== confirm) return fail("The two PINs don’t match. Type the same 4 digits twice.");
  const referral = applyReferral(referralCode, school);
  if (!referral.ok) return fail(referral.error);
  try {
    await createProfile(parent.id, { name, pin, classLevel, school, plan: referral.plan, referralCode: referral.code });
  } catch (error) {
    const limit = error instanceof Error && error.message.includes(String(MAX_PROFILES));
    return fail(limit ? `You can add up to ${MAX_PROFILES} learners.` : "Could not add the learner. Check your connection and try again.");
  }
  refresh();
  return { addedAt: Date.now() };
}

export async function openProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireParent();
  const profileId = String(formData.get("profileId") ?? "");
  const pin = String(formData.get("pin") ?? "");
  let profile;
  try {
    profile = await checkPin(parent.id, profileId, pin);
  } catch {
    return { error: "Could not check the PIN. Check your connection and try again." };
  }
  if (!profile) return { error: "That PIN isn’t right. Try again." };
  (await cookies()).set(PROFILE_COOKIE, profile.id, {
    path: "/",
    maxAge: PROFILE_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  redirect("/study");
}

export async function removeProfile(formData: FormData) {
  const parent = await requireParent();
  const profileId = String(formData.get("profileId") ?? "");
  await deleteProfile(parent.id, profileId);
  const store = await cookies();
  if (store.get(PROFILE_COOKIE)?.value === profileId) store.delete(PROFILE_COOKIE);
  refresh();
}

export async function forgetProfile() {
  (await cookies()).delete(PROFILE_COOKIE);
}
