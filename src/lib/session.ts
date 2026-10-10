// Study pages and the progress API ask for the current learner from here.
import { redirect } from "next/navigation";
import { requireLearner as requireProfile } from "@/lib/account";
import { hasPlan } from "@/lib/access";
export { getLearner, type Learner } from "@/lib/account";

export async function requireLearner() {
  const learner = await requireProfile();
  if (!hasPlan(learner, "bronze")) redirect(`/billing?learner=${learner.id}`);
  return learner;
}
