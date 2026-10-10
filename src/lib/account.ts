import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";
import { getProfile, type LearnerProfile } from "@/lib/profiles";
import { hasAcceptedLegal } from "@/lib/consent";

// The parent signs in with Neon Auth; the learner they picked is kept in this cookie
// and re-checked against the parent's own profiles on every request.
export const PROFILE_COOKIE = "edify_profile";
export const PROFILE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type Parent = { id: string; name: string; email: string };
export type Learner = LearnerProfile;

export const getParent = cache(async (): Promise<Parent | null> => {
  try {
    const { data } = await getAuth().getSession();
    const user = data?.user;
    if (!user) return null;
    return { id: user.id, name: user.name?.trim() || user.email.split("@")[0], email: user.email };
  } catch {
    return null;
  }
});

export async function requireParent(): Promise<Parent> {
  const parent = await getParent();
  if (!parent) redirect("/login");
  return parent;
}

// Everything except the sign-up steps, /profiles and account deletion needs the parent to have agreed to the
// current privacy policy and terms. /profiles shows the agreement screen.
export async function requireConsentedParent(): Promise<Parent> {
  const parent = await requireParent();
  if (!(await hasAcceptedLegal(parent.id))) redirect("/profiles");
  return parent;
}

export const getLearner = cache(async (): Promise<Learner | null> => {
  const parent = await getParent();
  const profileId = (await cookies()).get(PROFILE_COOKIE)?.value;
  if (!parent || !profileId) return null;
  try {
    // A parent who hasn't agreed to the current policies gets no learner, so the progress API is closed to them too.
    if (!(await hasAcceptedLegal(parent.id))) return null;
    const profile = await getProfile(parent.id, profileId);
    return profile;
  } catch {
    return null;
  }
});

export async function requireLearner(): Promise<Learner> {
  await requireConsentedParent();
  const learner = await getLearner();
  if (!learner) redirect("/profiles");
  return learner;
}
