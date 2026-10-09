"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";
import PasswordField from "@/components/password-field";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!process.env.NEXT_PUBLIC_NEON_AUTH_READY) { setError("Secure accounts are being set up. Please check back soon."); return; }
    setBusy(true); setError("");
    try {
      const result = await authClient.signIn.email({ email, password });
      if (result.error) { setError("That email or password was not recognised."); return; }
      router.push("/study");
    } catch {
      setError("The account service is unavailable right now. Please try again shortly.");
    } finally {
      setBusy(false);
    }
  }

  return <main className="account-page"><header className="site-header shell"><Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link><Link href="/" className="back-link">← Back to home</Link></header>
    <div className="login-layout shell"><div className="login-intro"><span className="section-kicker">YOUR STUDY SPACE</span><h1>Good to have<br />you <em>back.</em></h1><p>Taiwo and Kehinde each have a private account, with lesson progress and notes that follow them across devices.</p><div className="login-decoration">✳ <span>One step at a time.</span></div></div>
      <div className="login-panel"><span className="panel-overline">WELCOME BACK</span><h2>Log in to Edify</h2><form onSubmit={handleSubmit} className="login-form"><label htmlFor="email">Email address</label><input id="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /><label htmlFor="password">Password</label><PasswordField id="password" label="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" /><button className="button button-red" type="submit" disabled={busy}>{busy ? "Signing in…" : "Log in securely"}<span aria-hidden="true">→</span></button>{error && <p role="alert" className="form-error">{error}</p>}</form><Link href="/reset-password" className="reset-link">Set or reset your password →</Link><p className="login-note">Each learner has a private account. Use the email address your parent chose for you.</p></div>
    </div>
  </main>;
}
