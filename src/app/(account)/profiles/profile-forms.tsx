"use client";

import { useRouter } from "next/navigation";
import { useActionState, useRef, useState } from "react";
import { authClient } from "@/lib/auth/client";
import type { LearnerProfile } from "@/lib/profiles";
import { CLASS_LEVELS } from "@/data/curriculum";
import { SUGGESTED_SCHOOLS } from "@/data/schools";
import { STREAMS, isSeniorClass, streamLabel } from "@/data/streams";
import PlanBadge from "@/components/plan-badge";
import { addProfile, forgetProfile, openProfile, removeProfile, setStreamFor, type FormState } from "./actions";

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
              <small>{profile.classLevel}{profile.stream && <> · {streamLabel(profile.stream)}</>}{profile.school && <> · <span className="profile-school">{profile.school}</span></>}</small>
              <PlanBadge plan={profile.plan} sponsored={profile.sponsored} />
            </button>
            {isSeniorClass(profile.classLevel) && !profile.stream && (
              <form action={setStreamFor} className="stream-fix">
                <input type="hidden" name="profileId" value={profile.id} />
                <label htmlFor={`stream-${profile.id}`}>Set {profile.name}’s stream</label>
                <select id={`stream-${profile.id}`} name="stream" defaultValue="" required>
                  <option value="" disabled>Choose…</option>
                  {STREAMS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
                </select>
                <button type="submit" className="pill-button small">Save</button>
              </form>
            )}
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
  const values = state.values;

  // A new key after each successful add gives the learner a fresh, empty form. After a rejected
  // submit, the server hands back what was typed (not the PINs) as the fields' defaults.
  return (
    <form key={state.addedAt ?? 0} action={action} className="account-form add-form">
      <div className="field">
        <label htmlFor="learner-name">First name</label>
        <input id="learner-name" name="name" autoComplete="off" required maxLength={40} defaultValue={values?.name} placeholder="e.g. Taiwo…" />
      </div>
      <ClassAndStream initialClass={values?.classLevel} initialStream={values?.stream} />
      <SchoolField initial={values?.school} />
      <div className="field">
        <label htmlFor="learner-pin">4-digit PIN</label>
        <input id="learner-pin" name="pin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      </div>
      <div className="field">
        <label htmlFor="learner-pin-confirm">Type the PIN again</label>
        <input id="learner-pin-confirm" name="confirmPin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      </div>
      <div className="field full">
        <label htmlFor="learner-referral">Referral code <span className="optional">(optional)</span></label>
        <input id="learner-referral" name="referralCode" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={40} defaultValue={values?.referralCode} placeholder="Leave empty if you don’t have one" aria-describedby="learner-referral-help" />
        <span className="field-help" id="learner-referral-help">Got a code from your child’s school? Enter it to unlock their sponsored plan.</span>
      </div>
      {state.error && <p role="alert" className="form-error full">{state.error}</p>}
      {state.addedAt && <p role="status" className="form-success full">Learner added. Pick their name above to start.</p>}
      <button className="pill-button full" type="submit" disabled={pending}>{pending ? "Adding…" : "Add learner"}</button>
    </form>
  );
}

// The class, and for SS1 to SS3 learners a stream. The stream picker only appears once a senior class is chosen.
function ClassAndStream({ initialClass, initialStream }: { initialClass?: string; initialStream?: string }) {
  const [level, setLevel] = useState(initialClass ?? "");
  const senior = isSeniorClass(level);
  return <>
    <div className="field">
      <label htmlFor="learner-class">Class</label>
      <select id="learner-class" name="classLevel" value={level} onChange={(event) => setLevel(event.target.value)} required>
        <option value="" disabled>Choose a class…</option>
        {CLASS_LEVELS.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
    </div>
    {senior && (
      <div className="field">
        <label htmlFor="learner-stream">Stream</label>
        <select id="learner-stream" name="stream" defaultValue={initialStream ?? ""} required aria-describedby="learner-stream-help">
          <option value="" disabled>Choose a stream…</option>
          {STREAMS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <span className="field-help" id="learner-stream-help">SS1 to SS3 students choose one: Science, Technical, Arts or Business.</span>
      </div>
    )}
  </>;
}

// A free-text school field for any school; partner schools appear as autocomplete suggestions.
function SchoolField({ initial }: { initial?: string }) {
  return (
    <div className="field full">
      <label htmlFor="learner-school">School</label>
      <input id="learner-school" name="school" list="school-suggestions" autoComplete="off" required minLength={2} maxLength={80} defaultValue={initial} placeholder="e.g. Queen’s College, Yaba…" aria-describedby="learner-school-help" />
      <datalist id="school-suggestions">{SUGGESTED_SCHOOLS.map((name) => <option key={name} value={name} />)}</datalist>
      <span className="field-help" id="learner-school-help">Type the full name of your child’s school.</span>
    </div>
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
