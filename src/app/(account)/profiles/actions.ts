"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refresh } from "next/cache";
import { PROFILE_COOKIE, PROFILE_COOKIE_MAX_AGE, requireConsentedParent, requireParent } from "@/lib/account";
import { deleteParentAccount } from "@/lib/account-deletion";
import { getAuth } from "@/lib/auth/server";
import { MAX_PROFILES, PIN_PATTERN, checkPin, createProfile, deleteProfile, getProfile, setPin, setStream, updateProfile, type LearnerDetails } from "@/lib/profiles";
import { LOCKED_MESSAGE, forgetUnlock, parentCanManage } from "@/lib/parent-lock";
import { pinAllowance, recordWrongPin, waitMessage, wrongPinMessage, type TryAllowance } from "@/lib/pin-tries";
import { isClassLevel } from "@/data/curriculum";
import { normalizeSchool } from "@/data/schools";
import { isSeniorClass, isStreamId } from "@/data/streams";
import { SPONSORED_SCHOOLS, applyReferral } from "@/lib/referrals";

// `values` hands back what was typed (never the PINs) so a rejected form keeps it.
export type FormValues = { name: string; classLevel: string; stream: string; school: string; referralCode: string };
export type FormState = { error?: string; addedAt?: number; values?: FormValues };

// Actions that change learners or the account need the parent area open: no parent PIN set, or unlocked with it
// (src/lib/parent-lock.ts). Checked here on the server; the page only hides the buttons.

// The first name, class, stream and school, checked the same way when adding and editing a learner.
function readDetails(formData: FormData): { details: LearnerDetails; values: Omit<FormValues, "referralCode"> } | { error: string; values: Omit<FormValues, "referralCode"> } {
  const name = String(formData.get("name") ?? "").trim().replace(/\s+/g, " ");
  const classLevel = String(formData.get("classLevel") ?? "");
  const stream = String(formData.get("stream") ?? "");
  const school = normalizeSchool(String(formData.get("school") ?? ""));
  const values = { name, classLevel, stream, school };
  if (!name || name.length > 40) return { error: "Enter the learner’s first name (up to 40 letters).", values };
  if (!isClassLevel(classLevel)) return { error: "Choose the learner’s class (JSS1 to SS3).", values };
  // Only SS1 to SS3 learners have a stream; for JSS learners any value sent is ignored.
  const streamId = isSeniorClass(classLevel) && isStreamId(stream) ? stream : null;
  if (isSeniorClass(classLevel) && !streamId) return { error: "Choose the learner’s stream: Medical, Technology, Arts or Business.", values };
  if (school.length < 2 || school.length > 80) return { error: "Enter the learner’s school (pick one from the list or type its name).", values };
  return { details: { name, classLevel, school, stream: streamId }, values };
}

export async function addProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireConsentedParent();
  const pin = String(formData.get("pin") ?? "");
  const confirm = String(formData.get("confirmPin") ?? "");
  const referralCode = String(formData.get("referralCode") ?? "").trim().slice(0, 40);
  const read = readDetails(formData);
  const values = { ...read.values, referralCode };
  const fail = (error: string): FormState => ({ error, values });
  if (!(await parentCanManage(parent))) return fail(LOCKED_MESSAGE);
  if ("error" in read) return fail(read.error);
  if (!PIN_PATTERN.test(pin)) return fail("Choose a PIN of exactly 4 digits.");
  if (pin !== confirm) return fail("The two PINs don’t match. Type the same 4 digits twice.");
  const referral = applyReferral(referralCode, read.details.school);
  if (!referral.ok) return fail(referral.error);
  try {
    await createProfile(parent.id, { ...read.details, pin, plan: referral.plan, referralCode: referral.code });
  } catch (error) {
    const limit = error instanceof Error && error.message.includes(String(MAX_PROFILES));
    return fail(limit ? `You can add up to ${MAX_PROFILES} learners.` : "Could not add the learner. Check your connection and try again.");
  }
  refresh();
  return { addedAt: Date.now() };
}

export type EditState = { error?: string; savedAt?: number; values?: Omit<FormValues, "referralCode"> };

// A parent corrects a learner's first name, class, stream or school. The PIN, plan and progress are untouched, and
// classmate links stay (see updateProfile).
export async function editProfile(_state: EditState, formData: FormData): Promise<EditState> {
  const parent = await requireConsentedParent();
  const profileId = String(formData.get("profileId") ?? "");
  const read = readDetails(formData);
  const fail = (error: string): EditState => ({ error, values: read.values });
  if (!(await parentCanManage(parent))) return fail(LOCKED_MESSAGE);
  if ("error" in read) return fail(read.error);
  try {
    const profile = await getProfile(parent.id, profileId);
    if (!profile) return fail("That learner isn’t on your account.");
    // A sponsored Gold plan comes from a referral code that only partner schools can use, so it can't follow a learner
    // to another school. Say so rather than quietly dropping the plan.
    if (profile.sponsored && !SPONSORED_SCHOOLS.includes(read.details.school)) {
      return fail(`${profile.name}’s sponsored Gold plan is only for learners at ${SPONSORED_SCHOOLS.join(" or ")}, so the school can’t be changed here. Contact Edify if ${profile.name} has moved school.`);
    }
    if (!(await updateProfile(parent.id, profileId, read.details))) return fail("That learner isn’t on your account.");
  } catch {
    return fail("Could not save the changes. Check your connection and try again.");
  }
  refresh();
  return { savedAt: Date.now() };
}

export async function openProfile(_state: FormState, formData: FormData): Promise<FormState> {
  const parent = await requireConsentedParent();
  const profileId = String(formData.get("profileId") ?? "");
  const pin = String(formData.get("pin") ?? "");
  // Wrong learner PINs are limited per parent account. If the counter can't be read (migration 010 not applied, or a
  // passing database error) the PIN is still checked, so children are never locked out of studying by it.
  const allowance: TryAllowance | null = await pinAllowance(parent.id, "pin-fail").catch(() => null);
  if (allowance?.blocked) return { error: waitMessage(allowance.waitMinutes) };
  let profile;
  try {
    profile = await checkPin(parent.id, profileId, pin);
  } catch {
    return { error: "Could not check the PIN. Check your connection and try again." };
  }
  if (!profile) {
    if (!allowance) return { error: "That PIN isn’t right. Try again." };
    const before = allowance.left;
    const left = await recordWrongPin(parent.id, "pin-fail", before).catch(() => before);
    return { error: wrongPinMessage(left) };
  }
  const store = await cookies();
  store.set(PROFILE_COOKIE, profile.id, {
    path: "/",
    maxAge: PROFILE_COOKIE_MAX_AGE,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  // Handing the device to a child: the parent area locks again (it only matters when a parent PIN is set).
  await forgetUnlock();
  redirect("/study");
}

export type PinState = { error?: string; changedAt?: number };

// A parent gives one of their learners a new PIN (the old one is not needed: the parent is signed in and, when a
// parent PIN is set, has unlocked the parent area).
export async function changePin(_state: PinState, formData: FormData): Promise<PinState> {
  const parent = await requireConsentedParent();
  if (!(await parentCanManage(parent))) return { error: LOCKED_MESSAGE };
  const profileId = String(formData.get("profileId") ?? "");
  const pin = String(formData.get("pin") ?? "");
  if (!PIN_PATTERN.test(pin)) return { error: "Choose a PIN of exactly 4 digits." };
  if (pin !== String(formData.get("confirmPin") ?? "")) return { error: "The two PINs don’t match. Type the same 4 digits twice." };
  try {
    if (!(await setPin(parent.id, profileId, pin))) return { error: "That learner isn’t on your account." };
  } catch {
    return { error: "Could not save the new PIN. Check your connection and try again." };
  }
  return { changedAt: Date.now() };
}

export async function removeProfile(formData: FormData) {
  const parent = await requireParent();
  if (await parentCanManage(parent)) {
    const profileId = String(formData.get("profileId") ?? "");
    await deleteProfile(parent.id, profileId);
    const store = await cookies();
    if (store.get(PROFILE_COOKIE)?.value === profileId) store.delete(PROFILE_COOKIE);
  }
  // When locked, nothing is removed and the refreshed page shows the lock.
  refresh();
}

// Lets a parent give a senior learner, added before streams existed, the stream they study.
export async function setStreamFor(formData: FormData) {
  const parent = await requireConsentedParent();
  const profileId = String(formData.get("profileId") ?? "");
  const stream = String(formData.get("stream") ?? "");
  if (isStreamId(stream) && (await parentCanManage(parent))) await setStream(parent.id, profileId, stream);
  refresh();
}

// Signing out (and switching learner from inside the study app) forgets the open learner and locks the parent area.
export async function forgetProfile() {
  const store = await cookies();
  store.delete(PROFILE_COOKIE);
  await forgetUnlock();
}

export type DeleteState = { error?: string };

// Cookies set by Neon Auth start with this prefix (sign-in token, cached session, sign-in challenge).
const AUTH_COOKIE_PREFIX = "__Secure-neon-auth";

// Deletes the whole account: the learners and all their data, then the parent's sign-in. The parent is
// the signed-in user from the session; nothing in the form says whose account to delete.
export async function deleteAccount(_state: DeleteState, formData: FormData): Promise<DeleteState> {
  const parent = await requireParent();
  if (!(await parentCanManage(parent))) return { error: LOCKED_MESSAGE };
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
  await forgetUnlock();
  for (const { name } of store.getAll()) {
    if (name.startsWith(AUTH_COOKIE_PREFIX)) store.set(name, "", { path: "/", maxAge: 0, secure: true, httpOnly: true, sameSite: "lax" });
  }
  redirect("/deleted");
}
