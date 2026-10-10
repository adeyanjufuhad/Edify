"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import ConsentField from "@/components/consent-field";
import { acceptLegal, type ConsentState } from "../consent-actions";

// Shown on /profiles to a parent who has not yet agreed to the current privacy policy and terms.
export default function ConsentForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState<ConsentState, FormData>(acceptLegal, {});
  useEffect(() => { if (state.accepted) router.refresh(); }, [state.accepted, router]);
  return (
    <form action={action} className="account-form">
      <ConsentField />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <button className="pill-button" type="submit" disabled={pending || !!state.accepted}>{pending || state.accepted ? "Saving…" : "Agree and continue"}</button>
    </form>
  );
}
