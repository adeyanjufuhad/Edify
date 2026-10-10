"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { authClient } from "@/lib/auth/client";
import { VERIFY_EMAIL_KEY, authErrorMessage } from "@/lib/auth/errors";
import PasswordField from "@/components/password-field";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.length < 8) { setError("Use a password with at least 8 characters."); return; }
    setBusy(true);
    setError("");
    try {
      const { error: signUpError } = await authClient.signUp.email({ name: name.trim(), email: email.trim(), password });
      if (signUpError) { setError(authErrorMessage(signUpError, "Could not create your account. Try again in a moment.")); return; }
      // Neon Auth requires a verified email but doesn't email a code on sign-up by itself, so ask for one.
      await authClient.emailOtp.sendVerificationOtp({ email: email.trim(), type: "email-verification" }).catch(() => {});
      sessionStorage.setItem(VERIFY_EMAIL_KEY, email.trim());
      router.push("/verify");
    } catch {
      setError("The account service is unavailable right now. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-grid">
      <div className="account-intro">
        <span className="kicker">FOR PARENTS AND GUARDIANS</span>
        <h1>Create your <span className="hl">family account.</span></h1>
        <p>One account for the whole family. Add each child as a learner with their class, school and own PIN, so their progress and notes stay separate.</p>
        <ol className="account-steps"><li><b>1</b>Create your account</li><li><b>2</b>Confirm your email with a 6-digit code</li><li><b>3</b>Add each child’s class and school</li></ol>
      </div>
      <div className="account-card">
        <h2>Sign up</h2>
        <form className="account-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Mrs Adeyanju…" />
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com…" />
          <label htmlFor="password">Password</label>
          <PasswordField id="password" name="password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters…" />
          {error && <p role="alert" className="form-error">{error}</p>}
          <button className="pill-button" type="submit" disabled={busy}>{busy ? "Creating account…" : "Create account"}</button>
        </form>
        <p className="account-note">By signing up you confirm you’re the parent or guardian of the learners you add.</p>
        <p className="account-switch">Already have an account? <Link href="/login" className="text-link">Log in</Link></p>
      </div>
    </div>
  );
}
