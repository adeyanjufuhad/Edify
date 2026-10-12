"use client";

import { useActionState, useState } from "react";
import { Shield } from "@/components/icons";
import { FRESH_SIGN_IN_MINUTES, UNLOCK_MINUTES } from "@/lib/parent-lock-rules";
import { lockParentArea, saveParentPin, unlockParentArea, type ParentPinState } from "@/app/(account)/profiles/parent-pin-actions";

// The parent PIN controls, used on /profiles and /study/classmates. Every check happens on the server
// (src/lib/parent-lock.ts); these forms only collect the digits.

const digits = (value: string) => value.replace(/\D/g, "").slice(0, 8);

type PinInputProps = { id: string; name: string; label: string };

function PinInput({ id, name, label }: PinInputProps) {
  const [value, setValue] = useState("");
  return (
    <div className="lock-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={name} type="password" inputMode="numeric" autoComplete="off" pattern="\d{4,8}" title="4 to 8 digits" minLength={4} maxLength={8} required value={value} onChange={(event) => setValue(digits(event.target.value))} placeholder="••••" />
    </div>
  );
}

// No parent PIN yet: a clear, optional prompt to set one.
export function ParentPinSetup() {
  const [state, action, pending] = useActionState<ParentPinState, FormData>(saveParentPin, {});
  return (
    <section className="account-card parent-lock" aria-labelledby="parent-pin-title">
      <h2 id="parent-pin-title"><Shield size={20} /> Protect your parent settings</h2>
      <p>Children often study on a parent’s phone. A parent PIN stops them changing classmate settings, adding, editing or removing learners, changing a brother’s or sister’s PIN, or deleting the account. Choose 4 to 8 digits your children don’t know.</p>
      <form action={action} className="lock-form">
        <PinInput id="parent-pin-new" name="pin" label="Parent PIN" />
        <PinInput id="parent-pin-again" name="confirmPin" label="Type it again" />
        <button type="submit" className="pill-button small" disabled={pending}>{pending ? "Saving…" : "Set parent PIN"}</button>
      </form>
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <p className="account-note">Recommended. Each time you type it, parent controls stay open for {UNLOCK_MINUTES} minutes, or until you open a learner’s space. If you forget it, sign out and sign in again with your password to choose a new one.</p>
    </section>
  );
}

// A parent PIN is set and the parent area is locked.
export function ParentUnlock({ intro, recentSignIn, failed = false }: { intro: string; recentSignIn: boolean; failed?: boolean }) {
  const [state, action, pending] = useActionState<ParentPinState, FormData>(unlockParentArea, {});
  const [resetting, setResetting] = useState(false);
  return (
    <section className="account-card parent-lock is-locked" aria-labelledby="parent-unlock-title">
      <h2 id="parent-unlock-title"><Shield size={20} /> Parent controls are locked</h2>
      <p>{intro}</p>
      {failed && <p role="alert" className="form-error">We couldn’t check your parent settings. Refresh the page to try again.</p>}
      <form action={action} className="lock-form">
        <PinInput id="parent-pin-unlock" name="pin" label="Parent PIN" />
        <button type="submit" className="pill-button small" disabled={pending}>{pending ? "Checking…" : "Unlock"}</button>
      </form>
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      {recentSignIn ? (
        resetting ? <NewParentPin needsCurrent={false} onClose={() => setResetting(false)} />
          : <p className="account-note">Forgot it? You signed in a few minutes ago, so you can <button type="button" className="text-button small" onClick={() => setResetting(true)}>choose a new parent PIN</button> without the old one.</p>
      ) : (
        <p className="account-note">Forgot it? Sign out, then sign in again with your email and password. For {FRESH_SIGN_IN_MINUTES} minutes after signing in you can choose a new parent PIN here without the old one.</p>
      )}
    </section>
  );
}

// A parent PIN is set and the parent area is open: when it locks again, a Lock now button, and changing or removing the PIN.
export function ParentUnlocked({ untilLabel, recentSignIn }: { untilLabel: string; recentSignIn: boolean }) {
  const [changing, setChanging] = useState(false);
  return (
    <section className="account-card parent-lock is-open" aria-label="Parent controls">
      <div className="lock-bar">
        <p role="status"><Shield size={18} /> <span>Parent controls are unlocked until <b>{untilLabel}</b>.</span></p>
        <form action={lockParentArea}><button type="submit" className="pill-outline small">Lock now</button></form>
      </div>
      {changing ? <NewParentPin needsCurrent={!recentSignIn} onClose={() => setChanging(false)} />
        : <button type="button" className="text-button small" onClick={() => setChanging(true)}>Change or remove the parent PIN</button>}
    </section>
  );
}

// A new parent PIN (or removing it). The current PIN is asked for unless the parent signed in a few minutes ago.
function NewParentPin({ needsCurrent, onClose }: { needsCurrent: boolean; onClose: () => void }) {
  const [state, action, pending] = useActionState<ParentPinState, FormData>(saveParentPin, {});
  if (state.done === "changed" || state.done === "set") return <p role="status" className="form-success">New parent PIN saved. <button type="button" className="text-button small" onClick={onClose}>Done</button></p>;
  return (
    <form action={action} className="lock-form lock-change">
      {needsCurrent && <PinInput id="parent-pin-current" name="currentPin" label="Current parent PIN" />}
      <PinInput id="parent-pin-change" name="pin" label="New parent PIN" />
      <PinInput id="parent-pin-change-again" name="confirmPin" label="Type it again" />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div className="lock-actions">
        <button type="submit" className="pill-button small" disabled={pending}>{pending ? "Saving…" : "Save new PIN"}</button>
        <button type="submit" name="intent" value="remove" formNoValidate className="text-button small" disabled={pending}>Remove the parent PIN</button>
        <button type="button" className="text-button small" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
