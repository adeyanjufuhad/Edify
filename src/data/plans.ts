// One payment per learner covers 105 days (3½ months); no automatic renewal.
export type PlanId = "free" | "bronze" | "silver" | "gold";
export type Plan = { id: Exclude<PlanId, "free">; name: string; price: number; tagline: string; features: string[]; popular?: boolean };

export const PLANS: Plan[] = [
  { id: "bronze", name: "Bronze", price: 1000, tagline: "Read every lesson.", features: ["All weekly notes", "Quick exam notes", "Hidden facts and book checks", "Your own notes, saved"] },
  { id: "silver", name: "Silver", price: 3000, tagline: "Read it, then practise it.", features: ["Everything in Bronze", "Exam-style practice questions", "Model answers for theory questions"], popular: true },
  { id: "gold", name: "Gold", price: 5000, tagline: "The full exam toolkit.", features: ["Everything in Silver", "Timed CBT tests", "AI study help, when it arrives"] },
];

export const PLAN_NAMES: Record<PlanId, string> = { free: "No active plan", bronze: "Bronze", silver: "Silver", gold: "Gold" };
export const PLAN_RANK: Record<PlanId, number> = { free: 0, bronze: 1, silver: 2, gold: 3 };

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && Object.hasOwn(PLAN_NAMES, value);
}

export function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
