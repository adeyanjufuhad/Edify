"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth/client";
import { VERIFY_EMAIL_KEY, authErrorMessage } from "@/lib/auth/errors";
import PasswordField from "@/components/password-field";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { error: signInError } = await authClient.signIn.email({ email: email.trim(), password });
      if (signInError?.code === "EMAIL_NOT_VERIFIED") {
        sessionStorage.setItem(VERIFY_EMAIL_KEY, email.trim());
        await authClient.emailOtp.sendVerificationOtp({ email: email.trim(), type: "email-verification" });
        router.push("/verify");
        return;
      }
      if (signInError) { setError(authErrorMessage(signInError, "Could not log you in. Try again in a moment.")); return; }
      router.push("/profiles");
      router.refresh();
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-grid">
      <div className="account-intro">
        <span className="kicker">WELCOME BACK</span>
        <h1>Good to have you <span className="hl">back.</span></h1>
        <p>Log in with your parent account, then choose who’s studying today.</p>
      </div>
      <div className="account-card">
        <h2>Log in</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="username" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com…" />
          <div className="label-row"><label htmlFor="password">Password</label><Link href="/forgot-password" className="text-link small">Forgot password?</Link></div>
          <PasswordField id="password" name="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p role="alert" className="form-error">{error}</p>}
          <button className="pill-button" type="submit" disabled={busy}>{busy ? "Logging in…" : "Log in"}</button>
        </form>
        <p className="account-switch">New to Edify? <Link href="/signup" className="text-link">Create a family account</Link></p>
      </div>
    </div>
  );
}
