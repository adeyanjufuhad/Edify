"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore, type FormEvent } from "react";
import { authClient } from "@/lib/auth/client";
import { VERIFY_EMAIL_KEY, authErrorMessage } from "@/lib/auth/errors";

const RESEND_WAIT_SECONDS = 30;

export default function VerifyPage() {
  const router = useRouter();
  // The sign-up and log-in pages leave the address in sessionStorage (never in the URL).
  const savedEmail = useSyncExternalStore(() => () => {}, () => sessionStorage.getItem(VERIFY_EMAIL_KEY), () => null);
  const [typedEmail, setEmail] = useState("");
  const email = savedEmail ?? typedEmail;
  const knownEmail = !!savedEmail;
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [wait, setWait] = useState(RESEND_WAIT_SECONDS);

  useEffect(() => {
    if (wait <= 0) return;
    const timer = setTimeout(() => setWait((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [wait]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error: verifyError } = await authClient.emailOtp.verifyEmail({ email: email.trim(), otp: code });
      if (verifyError) { setError(authErrorMessage(verifyError, "Could not confirm your email. Try again.")); return; }
      sessionStorage.removeItem(VERIFY_EMAIL_KEY);
      router.push("/profiles");
      router.refresh();
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resend() {
    setError("");
    setMessage("");
    try {
      const { error: sendError } = await authClient.emailOtp.sendVerificationOtp({ email: email.trim(), type: "email-verification" });
      if (sendError) { setError(authErrorMessage(sendError, "Could not send a new code. Try again in a moment.")); return; }
      setMessage(`A new code is on its way to ${email.trim()}.`);
      setWait(RESEND_WAIT_SECONDS);
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    }
  }

  return (
    <div className="account-grid">
      <div className="account-intro">
        <span className="kicker">STEP 2 OF 3</span>
        <h1>Check your <span className="hl">email.</span></h1>
        <p>{knownEmail ? <>We sent a 6-digit code to <strong>{email}</strong>.</> : "Enter your email address and the 6-digit code we sent you."} It can take a minute to arrive, so check your spam folder too.</p>
      </div>
      <div className="account-card">
        <h2>Confirm your email</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          {!knownEmail && <>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com…" />
          </>}
          <label htmlFor="code">6-digit code</label>
          <input id="code" name="code" className="code-input" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="123456" />
          {error && <p role="alert" className="form-error">{error}</p>}
          {message && <p role="status" className="form-success">{message}</p>}
          <button className="pill-button" type="submit" disabled={busy || code.length !== 6}>{busy ? "Checking…" : "Confirm email"}</button>
        </form>
        <p className="account-switch">Didn’t get it? <button type="button" className="text-button" disabled={wait > 0 || !email} onClick={resend}>{wait > 0 ? `Send a new code in ${wait}s` : "Send a new code"}</button></p>
        <p className="account-switch"><Link href="/signup" className="text-link small">Use a different email</Link></p>
      </div>
    </div>
  );
}
