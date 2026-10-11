"use server";

import { redirect } from "next/navigation";
import { isReportReason } from "@/data/challenges";
import { actionActor } from "@/lib/social/guard";
import { cancelChallenge, createChallenge, declineChallenge, startChallenge, submitChallenge } from "@/lib/social/challenges";
import { blockAsLearner, reportAsLearner } from "@/lib/social/links";

// Every action starts by finding out who is asking from the signed-in session and learner cookie (never from the
// form), and checks that the challenge or classmate in the form really belongs to that learner.
export type ActionState = { error?: string };

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "");

export async function createChallengeAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await actionActor();
  if (!actor.ok) return { error: actor.error };
  const made = await createChallenge(actor.learner.id, {
    linkId: field(formData, "linkId"), subjectSlug: field(formData, "subject"), termSlug: field(formData, "term"), count: Number(field(formData, "count")),
  });
  if ("error" in made) return { error: made.error };
  redirect(`/study/challenges/${made.id}`);
}

// Starting is a form post, not a link, so a page prefetch can never start someone's clock.
export async function startChallengeAction(formData: FormData) {
  const id = field(formData, "challengeId");
  const actor = await actionActor();
  if (!actor.ok) redirect("/study/challenges");
  const started = await startChallenge(actor.learner.id, id);
  if ("error" in started) redirect(`/study/challenges/${encodeURIComponent(id)}?problem=start`);
  redirect(`/study/challenges/${encodeURIComponent(id)}/play`);
}

export async function declineChallengeAction(formData: FormData) {
  const actor = await actionActor();
  if (actor.ok) await declineChallenge(actor.learner.id, field(formData, "challengeId"));
  redirect("/study/challenges");
}

export async function cancelChallengeAction(formData: FormData) {
  const actor = await actionActor();
  if (actor.ok) await cancelChallenge(actor.learner.id, field(formData, "challengeId"));
  redirect("/study/challenges");
}

// Called by the exam screen when the player hands in (or time runs out). Marks the paper on the server.
export async function submitChallengeAction(input: { challengeId: string; picks: Record<string, string> }): Promise<{ error?: string }> {
  const actor = await actionActor();
  if (!actor.ok) return { error: actor.error };
  if (!input || typeof input.challengeId !== "string") return { error: "That challenge could not be read." };
  const result = await submitChallenge(actor.learner.id, input.challengeId, input.picks);
  return "error" in result ? { error: result.error } : {};
}

export async function blockClassmateAction(formData: FormData) {
  const actor = await actionActor();
  if (actor.ok) await blockAsLearner(actor.learner.id, field(formData, "linkId"));
  redirect("/study/challenges?notice=blocked");
}

export async function reportClassmateAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await actionActor();
  if (!actor.ok) return { error: actor.error };
  const reason = field(formData, "reason");
  if (!isReportReason(reason)) return { error: "Choose what went wrong." };
  const result = await reportAsLearner(actor.learner.id, field(formData, "linkId"), reason, field(formData, "note"));
  if ("error" in result) return { error: result.error };
  redirect("/study/challenges?notice=reported");
}
