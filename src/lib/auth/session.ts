import { cache } from "react";
import { redirect } from "next/navigation";
import { getAuth } from "./server";
import { displayName } from "@/lib/learner";

export type Learner = { id: string; name: string };

export const getLearner = cache(async (): Promise<Learner | null> => {
  try {
    const { data } = await getAuth().getSession();
    if (!data?.user) return null;
    return { id: data.user.id, name: displayName(data.user.name, data.user.email) };
  } catch {
    return null;
  }
});

export async function requireLearner(): Promise<Learner> {
  const learner = await getLearner();
  if (!learner) redirect("/login");
  return learner;
}
