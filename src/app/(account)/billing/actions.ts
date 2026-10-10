"use server";

import { redirect } from "next/navigation";
import { requireParent } from "@/lib/account";
import { getProfile } from "@/lib/profiles";
import { isPlanId, PLAN_RANK } from "@/data/plans";
import { initializePayment } from "@/lib/paystack";

export async function checkout(_state: { error?: string }, form: FormData): Promise<{ error?: string }> {
  const parent = await requireParent();
  const profileId = String(form.get("profileId") ?? "");
  const plan = form.get("plan");
  if (!isPlanId(plan) || plan === "free") return { error: "Choose a plan." };
  let url;
  try {
    const learner = await getProfile(parent.id, profileId);
    if (!learner) return { error: "Choose one of your learners." };
    if (learner.sponsored) return { error: "This learner already has sponsored Gold access." };
    if (PLAN_RANK[learner.plan] >= PLAN_RANK[plan]) return { error: "This learner already has this plan or a higher plan. You can renew when it expires." };
    url = await initializePayment(parent, learner.id, plan);
  } catch {
    return { error: "We couldn’t open checkout. Please try again shortly. If you already paid, check your recent payments below before paying again." };
  }
  redirect(url);
}
