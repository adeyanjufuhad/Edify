"use client";

import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { authClient } from "@/lib/auth/client";
import type { LearnerProfile } from "@/lib/profiles";
import { addProfile, forgetProfile, openProfile, removeProfile, type FormState } from "./actions";

const digitsOnly = (value: string) => value.replace(/\D/g, "").slice(0, 4);

export function ProfilePicker({ profiles }: { profiles: LearnerProfile[] }) {
  const [selected, setSelected] = useState<string | null>(profiles.length === 1 ? profiles[0].id : null);
  const [state, action, pending] = useActionState<FormState, FormData>(openProfile, {});
  const [pin, setPin] = useState("");
  const pinRef = useRef<HTMLInputElement>(null);
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const current = profiles.find((profile) => profile.id === selected);


  return (
    <div className="profile-picker">
      <div className="profile-grid" role="list">
        {profiles.map((profile) => (
          <div role="listitem" key={profile.id} className={`profile-card ${profile.id === selected ? "is-selected" : ""}`}>
            <button type="button" className="profile-select" aria-pressed={profile.id === selected} onClick={() => { setSelected(profile.id); setPin(""); setConfirmRemove(null); requestAnimationFrame(() => pinRef.current?.focus()); }}>
              <span className="avatar" aria-hidden="true">{profile.name[0]?.toUpperCase()}</span>
              <strong>{profile.name}</strong>
              <small>{profile.classLevel}</small>
            </button>
            {confirmRemove === profile.id ? (
              <form action={removeProfile} className="remove-confirm">
                <input type="hidden" name="profileId" value={profile.id} />
                <span>Remove {profile.name} and all their progress and notes?</span>
                <div><button type="submit" className="danger-button">Yes, remove</button><button type="button" className="text-button" onClick={() => setConfirmRemove(null)}>Keep</button></div>
              </form>
            ) : (
              <button type="button" className="text-button small remove-link" onClick={() => setConfirmRemove(profile.id)}>Remove</button>
            )}
          </div>
        ))}
      </div>
      {current && (
        <form action={(formData) => { setPin(""); action(formData); }} className="account-card pin-card">
          <input type="hidden" name="profileId" value={current.id} />
          <label htmlFor="pin">{current.name}’s PIN</label>
          <div className="pin-row">
            <input ref={pinRef} id="pin" name="pin" className="code-input" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" maxLength={4} required value={pin} onChange={(event) => setPin(digitsOnly(event.target.value))} placeholder="••••" />
            <button className="pill-button" type="submit" disabled={pending || pin.length !== 4}>{pending ? "Opening…" : `Open ${current.name}’s space`}</button>
          </div>
          {state.error && <p role="alert" className="form-error">{state.error}</p>}
          <p className="account-note">Forgot the PIN? A parent can remove this learner and add them again with a new PIN. Their progress would be lost, so ask for help first.</p>
        </form>
      )}
    </div>
  );
}

export function AddProfileForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(addProfile, {});

  // A new key after each successful add gives the learner a fresh, empty form.
  return (
    <form key={state.addedAt ?? 0} action={action} className="account-form add-form">
      <div className="field">
        <label htmlFor="learner-name">First name</label>
        <input id="learner-name" name="name" autoComplete="off" required maxLength={40} placeholder="e.g. Taiwo…" />
      </div>
      <div className="field">
        <label htmlFor="learner-class">Class</label>
        <select id="learner-class" name="classLevel" defaultValue="SS1" disabled><option value="SS1">SS1</option></select>
        <small className="field-help">More classes are coming.</small>
      </div>
      <div className="field">
        <label htmlFor="learner-pin">4-digit PIN</label>
        <input id="learner-pin" name="pin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      </div>
      <div className="field">
        <label htmlFor="learner-pin-confirm">Type the PIN again</label>
        <input id="learner-pin-confirm" name="confirmPin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      </div>
      {state.error && <p role="alert" className="form-error full">{state.error}</p>}
      {state.addedAt && <p role="status" className="form-success full">Learner added. Pick their name above to start.</p>}
      <button className="pill-button full" type="submit" disabled={pending}>{pending ? "Adding…" : "Add learner"}</button>
    </form>
  );
}

export function SignOutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <button type="button" className="pill-outline small" disabled={busy} onClick={async () => {
      setBusy(true);
      try { await forgetProfile(); await authClient.signOut(); } finally { router.push("/"); router.refresh(); }
    }}>{busy ? "Signing out…" : "Sign out"}</button>
  );
}
