"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth/client";
import { authErrorMessage } from "@/lib/auth/errors";
import PasswordField from "@/components/password-field";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "reset" | "done">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error: sendError } = await authClient.forgetPassword.emailOtp({ email: email.trim() });
      if (sendError) { setError(authErrorMessage(sendError, "Could not send a code. Try again in a moment.")); return; }
      setStep("reset");
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    setBusy(true);
    setError("");
    try {
      const { error: resetError } = await authClient.emailOtp.resetPassword({ email: email.trim(), otp: code, password });
      if (resetError) { setError(authErrorMessage(resetError, "Could not reset your password. Try again.")); return; }
      setStep("done");
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-grid">
      <div className="account-intro">
        <span className="kicker">ACCOUNT HELP</span>
        <h1>Reset your <span className="hl">password.</span></h1>
        <p>We’ll email a 6-digit code to the address on your parent account. Use it to choose a new password.</p>
      </div>
      <div className="account-card">
        {step === "email" && <>
          <h2>Get a reset code</h2>
          <form className="account-form" onSubmit={sendCode}>
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com…" />
            {error && <p role="alert" className="form-error">{error}</p>}
            <button className="pill-button" type="submit" disabled={busy}>{busy ? "Sending…" : "Email me a code"}</button>
          </form>
        </>}
        {step === "reset" && <>
          <h2>Choose a new password</h2>
          <p className="account-note">If an account exists for <strong>{email}</strong>, a code is on its way.</p>
          <form className="account-form" onSubmit={resetPassword}>
            <label htmlFor="code">6-digit code</label>
            <input id="code" name="code" className="code-input" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} required value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))} placeholder="123456" />
            <label htmlFor="password">New password</label>
            <PasswordField id="password" name="password" label="new password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters…" />
            {error && <p role="alert" className="form-error">{error}</p>}
            <button className="pill-button" type="submit" disabled={busy || code.length !== 6}>{busy ? "Saving…" : "Save new password"}</button>
          </form>
        </>}
        {step === "done" && <>
          <h2>Password saved</h2>
          <p className="form-success" role="status">You can now log in with your new password.</p>
          <Link href="/login" className="pill-button">Go to log in</Link>
        </>}
        <p className="account-switch"><Link href="/login" className="text-link small">Back to log in</Link></p>
      </div>
    </div>
  );
}
