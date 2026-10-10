import { PLAN_NAMES, type PlanId } from "@/data/plans";

// A learner's plan as a small pill: "Gold · sponsored" when a referral code paid for it.
// Free learners show nothing while everything is free in the beta.
export default function PlanBadge({ plan, sponsored, className }: { plan: PlanId; sponsored: boolean; className?: string }) {
  if (plan === "free") return null;
  return <span className={`plan-badge plan-badge-${plan} ${className ?? ""}`}>{PLAN_NAMES[plan]}{sponsored && " · sponsored"}</span>;
}
