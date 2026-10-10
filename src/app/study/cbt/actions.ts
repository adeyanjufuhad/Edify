"use server";

import { requireLearner } from "@/lib/session";
import { gradeSubmission, saveAttempt, type Submission } from "@/lib/cbt";

// Marks a finished CBT paper on the server and saves the attempt for the signed-in learner.
export async function submitCbt(input: Submission): Promise<{ id?: string; error?: string }> {
  const learner = await requireLearner();
  if (!input || typeof input.params !== "string" || input.params.length > 2000 || typeof input.picks !== "object" || input.picks === null) {
    return { error: "That test could not be read. Start a new one from the CBT page." };
  }
  const attempt = gradeSubmission(input);
  if ("error" in attempt) return { error: attempt.error ?? "That test could not be marked." };
  try {
    return { id: await saveAttempt(learner.id, attempt) };
  } catch {
    return { error: "Your answers could not be saved. Check your connection and try again; your answers are kept on this device." };
  }
}
