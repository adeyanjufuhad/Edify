"use server";

import { getParent } from "@/lib/account";
import { recordLegalConsent } from "@/lib/consent";

export type ConsentState = { error?: string; accepted?: boolean };

// The parent comes from the session and the version and time from the server; the form only says "I agree".
export async function acceptLegal(_state: ConsentState, formData: FormData): Promise<ConsentState> {
  // Not requireParent(): called from /verify, a redirect there would pull the parent to the log-in page.
  const parent = await getParent();
  if (!parent) return { error: "Your sign-in has expired. Log in again, then agree." };
  if (formData.get("agree") !== "on") return { error: "Tick the box to confirm, then continue." };
  try {
    await recordLegalConsent(parent.id);
  } catch {
    return { error: "We couldn’t save your agreement. Check your connection and try again." };
  }
  return { accepted: true };
}
