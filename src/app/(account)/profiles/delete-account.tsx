"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { deleteAccount, type DeleteState } from "./actions";

const CONFIRM_WORD = "DELETE";

// "Delete your account" at the bottom of /profiles. The server checks the typed word again and deletes
// the signed-in parent's account; this form sends no ids.
export default function DeleteAccount() {
  const [state, action, pending] = useActionState<DeleteState, FormData>(deleteAccount, {});
  const [typed, setTyped] = useState("");
  return (
    <section id="delete-account" className="account-card danger-zone" aria-labelledby="delete-account-title">
      <h2 id="delete-account-title">Delete your account</h2>
      <p>This permanently deletes your parent account, every learner on it, and all their lesson progress, notes and CBT results. It also signs you out. It can’t be undone, and we can’t bring anything back.</p>
      <p>Payment records are the one thing we keep, because we may need them for accounting, refunds or disputes. They are no longer linked to your account or your learners, but they still show the email address used at checkout. <Link href="/privacy#payments" className="text-link">How we handle payment records</Link></p>
      <p>Paid access ends with the learner it belongs to and can’t be moved to a new account. To remove just one child, use <b>Remove</b> on their card instead.</p>
      <form action={action} className="account-form">
        <label htmlFor="delete-confirmation">Type <b>{CONFIRM_WORD}</b> to confirm</label>
        <input id="delete-confirmation" name="confirmation" autoComplete="off" autoCapitalize="characters" spellCheck={false} value={typed} onChange={(event) => setTyped(event.target.value)} placeholder={CONFIRM_WORD} aria-describedby={state.error ? "delete-error" : undefined} />
        {state.error && <p id="delete-error" role="alert" className="form-error">{state.error}</p>}
        <button className="pill-button" type="submit" disabled={pending || typed.trim() !== CONFIRM_WORD}>{pending ? "Deleting…" : "Delete my account and all data"}</button>
      </form>
    </section>
  );
}
