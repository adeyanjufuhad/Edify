"use client";

import { useActionState, useRef, useState } from "react";
import type { LearnerProfile } from "@/lib/profiles";
import { OFFERED_CLASS_LEVELS, isClassLevel } from "@/data/curriculum";
import { SUGGESTED_SCHOOLS } from "@/data/schools";
import { STREAMS, isSeniorClass, streamLabel } from "@/data/streams";
import PlanBadge from "@/components/plan-badge";
import type { LearnerOverview } from "@/lib/parent-overview";
import { addProfile, changePin, editProfile, openProfile, removeProfile, setStreamFor, type EditState, type FormState, type PinState } from "./actions";

const digitsOnly = (value: string) => value.replace(/\D/g, "").slice(0, 4);

// `manage` is false while a parent PIN is set and the parent area is locked: then the cards only open learners (the
// server refuses the other actions anyway). `overviews` is each learner's progress, shown without their PIN.
export function ProfilePicker({ profiles, manage, overviews, classmates }: { profiles: LearnerProfile[]; manage: boolean; overviews: Record<string, LearnerOverview>; classmates: boolean }) {
  const [selected, setSelected] = useState<string | null>(profiles.length === 1 ? profiles[0].id : null);
  const [state, action, pending] = useActionState<FormState, FormData>(openProfile, {});
  const [pin, setPin] = useState("");
  const pinRef = useRef<HTMLInputElement>(null);
  // At most one small form is open on the cards at a time: "Edit", "Change PIN" or "Remove".
  const [open, setOpen] = useState<{ id: string; form: "edit" | "pin" | "remove" } | null>(null);
  const opened = (id: string, form: "edit" | "pin" | "remove") => open?.id === id && open.form === form;
  const current = profiles.find((profile) => profile.id === selected);

  return (
    <div className="profile-picker">
      <div className="profile-grid" role="list">
        {profiles.map((profile) => (
          <div role="listitem" key={profile.id} className={`profile-card ${profile.id === selected ? "is-selected" : ""} ${open?.id === profile.id && open.form === "edit" ? "is-editing" : ""}`}>
            <button type="button" className="profile-select" aria-pressed={profile.id === selected} onClick={() => { setSelected(profile.id); setPin(""); setOpen(null); requestAnimationFrame(() => pinRef.current?.focus()); }}>
              <span className="avatar" aria-hidden="true">{profile.name[0]?.toUpperCase()}</span>
              <strong>{profile.name}</strong>
              <small>{profile.classLevel}{profile.stream && <> · {streamLabel(profile.stream)}</>}{profile.school && <> · <span className="profile-school">{profile.school}</span></>}</small>
              <PlanBadge plan={profile.plan} sponsored={profile.sponsored} />
            </button>
            {overviews[profile.id] && <ProgressSummary name={profile.name} overview={overviews[profile.id]} />}
            {manage && isSeniorClass(profile.classLevel) && !profile.stream && (
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
            {!manage ? null : opened(profile.id, "remove") ? (
              <form action={removeProfile} className="remove-confirm">
                <input type="hidden" name="profileId" value={profile.id} />
                <span>Remove {profile.name} and all their progress and notes?</span>
                <div><button type="submit" className="danger-button">Yes, remove</button><button type="button" className="text-button" onClick={() => setOpen(null)}>Keep</button></div>
              </form>
            ) : opened(profile.id, "pin") ? (
              <ChangePinForm profile={profile} onClose={() => setOpen(null)} />
            ) : opened(profile.id, "edit") ? (
              <EditProfileForm profile={profile} classmates={classmates} onClose={() => setOpen(null)} />
            ) : (
              <div className="card-links">
                <button type="button" className="text-button small remove-link" onClick={() => setOpen({ id: profile.id, form: "edit" })}>Edit<span className="sr-only"> {profile.name}’s details</span></button>
                <button type="button" className="text-button small remove-link" onClick={() => setOpen({ id: profile.id, form: "pin" })}>Change PIN<span className="sr-only"> for {profile.name}</span></button>
                <button type="button" className="text-button small remove-link" onClick={() => setOpen({ id: profile.id, form: "remove" })}>Remove<span className="sr-only"> {profile.name}</span></button>
              </div>
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
          <p className="account-note">Forgot the PIN? A parent can choose a new one with <b>Change PIN</b> on {current.name}’s card{manage ? "" : " after unlocking parent controls"}. Their progress and notes stay.</p>
        </form>
      )}
    </div>
  );
}

// A new PIN for one learner, typed twice. The parent is signed in, so the old PIN is not asked for.
function ChangePinForm({ profile, onClose }: { profile: LearnerProfile; onClose: () => void }) {
  const [state, action, pending] = useActionState<PinState, FormData>(changePin, {});
  const id = `new-pin-${profile.id}`;
  if (state.changedAt) {
    return (
      <div className="pin-change" role="status">
        <span>New PIN saved for {profile.name}.</span>
        <div><button type="button" className="text-button small" onClick={onClose}>Done</button></div>
      </div>
    );
  }
  return (
    <form action={action} className="pin-change">
      <input type="hidden" name="profileId" value={profile.id} />
      <label htmlFor={id}>New PIN for {profile.name}</label>
      <input id={id} name="pin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      <label htmlFor={`${id}-again`}>Type it again</label>
      <input id={`${id}-again`} name="confirmPin" type="password" inputMode="numeric" autoComplete="off" pattern="\d{4}" title="4 digits" maxLength={4} required placeholder="••••" />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div><button type="submit" className="pill-button small" disabled={pending}>{pending ? "Saving…" : "Save PIN"}</button><button type="button" className="text-button" onClick={onClose}>Cancel</button></div>
    </form>
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
// `idPrefix` keeps the ids unique when the add form and an edit form are on the page together.
function ClassAndStream({ initialClass, initialStream, currentClass, idPrefix = "learner" }: { initialClass?: string; initialStream?: string; currentClass?: string; idPrefix?: string }) {
  const [level, setLevel] = useState(initialClass ?? "");
  const senior = isSeniorClass(level);
  // Only the offered (senior) classes can be chosen, plus the class a learner already has, so an edit form for a
  // junior learner added earlier still shows their class.
  const classes: readonly string[] = currentClass && isClassLevel(currentClass) && !(OFFERED_CLASS_LEVELS as readonly string[]).includes(currentClass) ? [currentClass, ...OFFERED_CLASS_LEVELS] : OFFERED_CLASS_LEVELS;
  return <>
    <div className="field">
      <label htmlFor={`${idPrefix}-class`}>Class</label>
      <select id={`${idPrefix}-class`} name="classLevel" value={classes.includes(level) ? level : ""} onChange={(event) => setLevel(event.target.value)} required aria-describedby={`${idPrefix}-class-help`}>
        <option value="" disabled>Choose a class…</option>
        {classes.map((item) => <option key={item} value={item}>{item}</option>)}
      </select>
      <span className="field-help" id={`${idPrefix}-class-help`}>Edify currently focuses on SS1 to SS3. SS1 lessons are available now; SS2 and SS3 lessons are coming later.</span>
    </div>
    {senior && (
      <div className="field">
        <label htmlFor={`${idPrefix}-stream`}>Stream</label>
        <select id={`${idPrefix}-stream`} name="stream" defaultValue={initialStream ?? ""} required aria-describedby={`${idPrefix}-stream-help`}>
          <option value="" disabled>Choose a stream…</option>
          {STREAMS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
        </select>
        <span className="field-help" id={`${idPrefix}-stream-help`}>SS1 to SS3 students choose one: Medical, Technology, Arts or Business.</span>
      </div>
    )}
  </>;
}

// A free-text school field for any school; partner schools appear as autocomplete suggestions.
function SchoolField({ initial, idPrefix = "learner" }: { initial?: string; idPrefix?: string }) {
  return (
    <div className="field full">
      <label htmlFor={`${idPrefix}-school`}>School</label>
      <input id={`${idPrefix}-school`} name="school" list={`${idPrefix}-school-suggestions`} autoComplete="off" required minLength={2} maxLength={80} defaultValue={initial} placeholder="e.g. Queen’s College, Yaba…" aria-describedby={`${idPrefix}-school-help`} />
      <datalist id={`${idPrefix}-school-suggestions`}>{SUGGESTED_SCHOOLS.map((name) => <option key={name} value={name} />)}</datalist>
      <span className="field-help" id={`${idPrefix}-school-help`}>Type the full name of your child’s school.</span>
    </div>
  );
}

// A learner's first name, class, stream and school, changed by a parent. The server checks everything again.
function EditProfileForm({ profile, classmates, onClose }: { profile: LearnerProfile; classmates: boolean; onClose: () => void }) {
  const [state, action, pending] = useActionState<EditState, FormData>(editProfile, {});
  const prefix = `edit-${profile.id}`;
  const values = state.values;
  if (state.savedAt) {
    return (
      <div className="pin-change" role="status">
        <span>Saved {profile.name}’s details.</span>
        <div><button type="button" className="text-button small" onClick={onClose}>Done</button></div>
      </div>
    );
  }
  return (
    <form action={action} className="account-form add-form edit-form">
      <input type="hidden" name="profileId" value={profile.id} />
      <div className="field">
        <label htmlFor={`${prefix}-name`}>First name</label>
        <input id={`${prefix}-name`} name="name" autoComplete="off" required maxLength={40} defaultValue={values?.name ?? profile.name} />
      </div>
      <ClassAndStream idPrefix={prefix} currentClass={profile.classLevel} initialClass={values?.classLevel ?? profile.classLevel} initialStream={values?.stream ?? profile.stream ?? ""} />
      <SchoolField idPrefix={prefix} initial={values?.school ?? profile.school ?? ""} />
      {classmates && <p className="field-help full">Changing the class or school changes who {profile.name} sees under “In your class”. Classmates already linked stay linked; you can remove any of them in Classmate settings.</p>}
      {state.error && <p role="alert" className="form-error full">{state.error}</p>}
      <div className="edit-actions full">
        <button className="pill-button small" type="submit" disabled={pending}>{pending ? "Saving…" : "Save changes"}</button>
        <button type="button" className="text-button" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}

// Lessons done, the last CBT and (with the classmate features) challenges won: readable at a glance on a phone.
function ProgressSummary({ name, overview }: { name: string; overview: LearnerOverview }) {
  const { lessonsDone, lessonsTotal, lastCbt, cbtLoaded, challenges } = overview;
  if (lessonsDone === null && !cbtLoaded && !challenges) return null;
  return (
    <dl className="card-stats" aria-label={`${name}’s progress`}>
      {lessonsDone !== null && <div><dt>Lessons</dt><dd>{lessonsDone} of {lessonsTotal}</dd></div>}
      {cbtLoaded && <div><dt>Last CBT</dt><dd>{lastCbt ? <><b>{lastCbt.grade}</b> <span className="stat-when">{lastCbt.percent}% · {lastCbt.at}</span></> : "None yet"}</dd></div>}
      {challenges && <div><dt>Challenges</dt><dd>{challenges.played ? `${challenges.wins} won of ${challenges.played}` : "None yet"}<span className="sr-only"> in the last {challenges.days} days</span></dd></div>}
    </dl>
  );
}
