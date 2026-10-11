// Shared facts for the classmate features (challenges, leaderboard, online status, chat, voice notes).
// No server code here, so client components can import it. The numbers that limit things are in src/lib/social-rules.ts.
import type { PlanId } from "@/data/plans";

// OWNER DECISION: challenges use the CBT engine, so they follow the CBT rule (Gold). Change this one line to open
// them to every paid plan.
export const CHALLENGE_MIN_PLAN: Exclude<PlanId, "free"> = "gold";

export const REPORT_REASONS = [
  { id: "unkind", label: "Unkind or rude" },
  { id: "personal-details", label: "Asked for personal details" },
  { id: "unsafe", label: "Made me feel unsafe" },
  { id: "cheating", label: "Cheating in a challenge" },
  { id: "other", label: "Something else" },
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number]["id"];

export function isReportReason(value: unknown): value is ReportReason {
  return REPORT_REASONS.some((reason) => reason.id === value);
}

// The switches a parent controls for each learner.
export const SWITCHES = [
  { id: "challenges", label: "Challenges and classmates", help: "Can be linked with classmates you approve, take part in challenges and appear on their leaderboard." },
  { id: "classVisible", label: "Visible to my class", help: "Other children in the same school and class whose parents also chose this can see this learner’s first name and class, and send a classmate request with a challenge. Chat only opens if this learner accepts." },
  { id: "presence", label: "Show when online", help: "Classmates this learner can see (linked ones, and the class list when it is on) see an “Online now” mark while this learner has Edify open, if they share theirs too. Nothing else about what they are doing." },
  { id: "chat", label: "Text chat", help: "Can send short text messages to classmates they are linked with (or whose request they accepted) who also have chat on. You can read and delete every message." },
  { id: "voice", label: "Voice notes", help: "Can send short recorded voice notes in chat. You can listen to and delete every one." },
] as const;

export type SwitchId = (typeof SWITCHES)[number]["id"];
