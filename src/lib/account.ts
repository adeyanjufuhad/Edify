import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth/server";
import { getProfile } from "@/lib/profiles";

// The parent signs in with Neon Auth; the learner they picked is kept in this cookie
// and re-checked against the parent's own profiles on every request.
export const PROFILE_COOKIE = "edify_profile";
export const PROFILE_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

export type Parent = { id: string; name: string; email: string };
export type Learner = { id: string; name: string };

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

export const getLearner = cache(async (): Promise<Learner | null> => {
  const parent = await getParent();
  const profileId = (await cookies()).get(PROFILE_COOKIE)?.value;
  if (!parent || !profileId) return null;
  try {
    const profile = await getProfile(parent.id, profileId);
    return profile ? { id: profile.id, name: profile.name } : null;
  } catch {
    return null;
  }
});

export async function requireLearner(): Promise<Learner> {
  await requireParent();
  const learner = await getLearner();
  if (!learner) redirect("/profiles");
  return learner;
}
