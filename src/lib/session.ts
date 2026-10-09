import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LEARNER_COOKIE, findLearner, type LearnerProfile } from "@/lib/learners";

export type Learner = { id: string; name: string };

// The learner is whoever picked their name on the home page (stored in a cookie).
export const getLearner = cache(async (): Promise<Learner | null> => {
  const profile: LearnerProfile | undefined = findLearner((await cookies()).get(LEARNER_COOKIE)?.value);
  return profile ? { id: profile.slug, name: profile.name } : null;
});

export async function requireLearner(): Promise<Learner> {
  const learner = await getLearner();
  if (!learner) redirect("/#who");
  return learner;
}
