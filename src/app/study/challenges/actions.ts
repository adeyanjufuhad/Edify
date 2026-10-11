"use server";

import { redirect } from "next/navigation";
import { isReportReason } from "@/data/challenges";
import { actionActor } from "@/lib/social/guard";
import { cancelChallenge, createChallenge, declineChallenge, startChallenge, submitChallenge } from "@/lib/social/challenges";
import { blockAsLearner, reportAsLearner } from "@/lib/social/links";
import { receivedMessage } from "@/lib/social/chat";

// Every action starts by finding out who is asking from the signed-in session and learner cookie (never from the
// form), and checks that the challenge or classmate in the form really belongs to that learner.
export type ActionState = { error?: string };

const field = (formData: FormData, name: string) => String(formData.get(name) ?? "");

export async function createChallengeAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await actionActor();
  if (!actor.ok) return { error: actor.error };
  if (field(formData, "cover") === "weeks" && !formData.getAll("lesson").length) return { error: "Tick at least one week, or choose the whole term." };
  const made = await createChallenge(actor.learner.id, {
    linkId: field(formData, "linkId"), subjectSlug: field(formData, "subject"), termSlug: field(formData, "term"), count: Number(field(formData, "count")),
    // Weeks are only sent when the learner chose "Choose weeks"; none means the whole term.
    lessonIds: field(formData, "cover") === "weeks" ? formData.getAll("lesson").map(String) : [],
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

// Reports one message the learner received (never one they sent). The text is copied into the report because the message
// may be deleted later; the classmate is blocked straight away.
export async function reportMessageAction(_state: ActionState, formData: FormData): Promise<ActionState> {
  const actor = await actionActor();
  if (!actor.ok) return { error: actor.error };
  const reason = field(formData, "reason");
  if (!isReportReason(reason)) return { error: "Choose what went wrong." };
  const message = await receivedMessage(actor.learner.id, field(formData, "messageId"));
  if (!message) return { error: "That message isn’t available to report." };
  const result = await reportAsLearner(actor.learner.id, message.linkId, reason, field(formData, "note"), { id: message.id, text: message.text });
  if ("error" in result) return { error: result.error };
  redirect("/study/challenges?notice=reported");
}
