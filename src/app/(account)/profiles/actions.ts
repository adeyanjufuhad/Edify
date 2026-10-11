"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { PROFILE_COOKIE, PROFILE_COOKIE_MAX_AGE, requireConsentedParent, requireParent } from "@/lib/account";
import { deleteParentAccount } from "@/lib/account-deletion";
import { getAuth } from "@/lib/auth/server";
import { MAX_PROFILES, PIN_PATTERN, checkPin, createProfile, deleteProfile, setStream } from "@/lib/profiles";
import { isClassLevel } from "@/data/curriculum";
import { normalizeSchool } from "@/data/schools";
import { isSeniorClass, isStreamId } from "@/data/streams";
import { applyReferral } from "@/lib/referrals";

// `values` hands back what was typed (never the PINs) so a rejected form keeps it.
export type FormValues = { name: string; classLevel: string; stream: string; school: string; referralCode: string };
export type FormState = { error?: string; addedAt?: number; values?: FormValues };

export async function addProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireConsentedParent();
  const name = String(formData.get("name") ?? "").trim().replace(/\s+/g, " ");
  const pin = String(formData.get("pin") ?? "");
  const confirm = String(formData.get("confirmPin") ?? "");
  const classLevel = String(formData.get("classLevel") ?? "");
  const stream = String(formData.get("stream") ?? "");
  const school = normalizeSchool(String(formData.get("school") ?? ""));
  const referralCode = String(formData.get("referralCode") ?? "").trim().slice(0, 40);
  const values = { name, classLevel, stream, school, referralCode };
  const fail = (error: string): FormState => ({ error, values });
  if (!name || name.length > 40) return fail("Enter the learner’s first name (up to 40 letters).");
  if (!isClassLevel(classLevel)) return fail("Choose the learner’s class (JSS1 to SS3).");
  // Only SS1 to SS3 learners have a stream; for JSS learners any value sent is ignored.
  const streamId = isSeniorClass(classLevel) && isStreamId(stream) ? stream : null;
  if (isSeniorClass(classLevel) && !streamId) return fail("Choose the learner’s stream: Science, Technical, Arts or Business.");
  if (school.length < 2 || school.length > 80) return fail("Enter the learner’s school (pick one from the list or type its name).");
  if (!PIN_PATTERN.test(pin)) return fail("Choose a PIN of exactly 4 digits.");
  if (pin !== confirm) return fail("The two PINs don’t match. Type the same 4 digits twice.");
  const referral = applyReferral(referralCode, school);
  if (!referral.ok) return fail(referral.error);
  try {
    await createProfile(parent.id, { name, pin, classLevel, school, stream: streamId, plan: referral.plan, referralCode: referral.code });
  } catch (error) {
    const limit = error instanceof Error && error.message.includes(String(MAX_PROFILES));
    return fail(limit ? `You can add up to ${MAX_PROFILES} learners.` : "Could not add the learner. Check your connection and try again.");
  }
  refresh();
  return { addedAt: Date.now() };
}

export async function openProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireConsentedParent();
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

// Lets a parent give a senior learner, added before streams existed, the stream they study.
export async function setStreamFor(formData: FormData) {
  const parent = await requireConsentedParent();
  const profileId = String(formData.get("profileId") ?? "");
  const stream = String(formData.get("stream") ?? "");
  if (isStreamId(stream)) await setStream(parent.id, profileId, stream);
  refresh();
}

export async function forgetProfile() {
  (await cookies()).delete(PROFILE_COOKIE);
}

export type DeleteState = { error?: string };

// Cookies set by Neon Auth start with this prefix (sign-in token, cached session, sign-in challenge).
const AUTH_COOKIE_PREFIX = "__Secure-neon-auth";

// Deletes the whole account: the learners and all their data, then the parent's sign-in. The parent is
// the signed-in user from the session; nothing in the form says whose account to delete.
export async function deleteAccount(_state: DeleteState, formData: FormData): Promise<DeleteState> {
  const parent = await requireParent();
  if (String(formData.get("confirmation") ?? "").trim() !== "DELETE") return { error: "Type DELETE in capital letters to confirm." };
  try {
    await deleteParentAccount(parent.id, parent.email);
  } catch {
    return { error: "We couldn’t delete your account just now, and nothing was removed. Check your connection and try again." };
  }
  // The sessions are already gone. Ask Neon Auth to sign out, then clear the cookies ourselves
  // (a cached session would otherwise look signed in for a few more minutes).
  await getAuth().signOut().catch(() => undefined);
  const store = await cookies();
  store.delete(PROFILE_COOKIE);
  for (const { name } of store.getAll()) {
    if (name.startsWith(AUTH_COOKIE_PREFIX)) store.set(name, "", { path: "/", maxAge: 0, secure: true, httpOnly: true, sameSite: "lax" });
  }
  redirect("/deleted");
}
