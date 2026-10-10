// Edify's plans, priced per child per term. Display only while Edify is in beta: nobody pays yet.
export type PlanId = "free" | "bronze" | "silver" | "gold";
export type Plan = { id: Exclude<PlanId, "free">; name: string; price: number; tagline: string; features: string[]; popular?: boolean };

export const PLANS: Plan[] = [
  { id: "bronze", name: "Bronze", price: 1000, tagline: "Read every lesson.", features: ["All weekly notes", "Quick exam notes", "Hidden facts and book checks", "Your own notes, saved"] },
  { id: "silver", name: "Silver", price: 3000, tagline: "Read it, then practise it.", features: ["Everything in Bronze", "Exam-style practice questions", "Model answers for theory questions"], popular: true },
  { id: "gold", name: "Gold", price: 5000, tagline: "The full exam toolkit.", features: ["Everything in Silver", "Timed CBT tests", "AI study help, when it arrives"] },
];

export const PLAN_NAMES: Record<PlanId, string> = { free: "Free", bronze: "Bronze", silver: "Silver", gold: "Gold" };

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === "string" && value in PLAN_NAMES;
}

export function naira(amount: number) {
  return `₦${amount.toLocaleString("en-NG")}`;
}
