import { PLAN_NAMES, type PlanId } from "@/data/plans";

// A learner's plan as a small pill: "Gold · sponsored" when a referral code paid for it.
// Accounts without paid or sponsored access need a plan before studying.
export default function PlanBadge({ plan, sponsored, className }: { plan: PlanId; sponsored: boolean; className?: string }) {
  return <span className={`plan-badge plan-badge-${plan} ${className ?? ""}`}>{PLAN_NAMES[plan]}{sponsored && " · sponsored"}</span>;
}
