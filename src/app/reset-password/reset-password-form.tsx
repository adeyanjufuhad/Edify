"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth/client";
import PasswordField from "@/components/password-field";

export default function ResetPasswordForm({ token }: { token: string | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!process.env.NEXT_PUBLIC_NEON_AUTH_READY) { setMessage("Accounts are being set up. Please check back soon."); return; }
    setBusy(true);
    try {
      if (!token) {
        const { error } = await authClient.requestPasswordReset({ email, redirectTo: `${window.location.origin}/reset-password` });
        setMessage(error ? "We could not send a reset link. Please try again." : "If this account exists, a password link has been sent to its email address.");
      } else if (password !== confirm) {
        setMessage("The passwords do not match.");
      } else if (password.length < 8) {
        setMessage("Choose a password with at least 8 characters.");
      } else {
        const { error } = await authClient.resetPassword({ token, newPassword: password });
        setMessage(error ? "The link has expired or could not be used. Request a new one." : "Password saved. You can now log in to Edify.");
      }
    } catch {
      setMessage("The account service is unavailable right now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="account-page"><header className="site-header shell"><Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link><Link href="/login" className="back-link">← Back to login</Link></header><div className="login-layout shell"><div className="login-intro"><span className="section-kicker">ACCOUNT ACCESS</span><h1>{token ? "Choose a new" : "Start with your"}<br /><em>password.</em></h1><p>Each learner has their own secure Edify account and private notes.</p></div><div className="login-panel"><span className="panel-overline">{token ? "NEW PASSWORD" : "EMAIL LINK"}</span><h2>{token ? "Set your password" : "Get a password link"}</h2><form className="login-form" onSubmit={handleSubmit}>{token ? <><label htmlFor="new-password">New password</label><PasswordField id="new-password" label="new password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} /><label htmlFor="confirm-password">Confirm password</label><PasswordField id="confirm-password" label="password confirmation" autoComplete="new-password" minLength={8} value={confirm} onChange={(event) => setConfirm(event.target.value)} /></> : <><label htmlFor="reset-email">Your account email</label><input id="reset-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></>}<button className="button button-red" type="submit" disabled={busy}>{busy ? "Please wait…" : token ? "Save new password" : "Email me a link"} <span aria-hidden="true">→</span></button>{message && <p role="status" className="form-error">{message}</p>}</form><p className="login-note">Only use a link sent to the email address on your own account.</p></div></div></main>;
}
