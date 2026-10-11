"use client";

import { useActionState, useState } from "react";
import { SWITCHES, type SwitchId } from "@/data/challenges";
import { LIMITS } from "@/lib/social-rules";
import {
  blockLinkAction, createInviteAction, linkSiblingAction, redeemInviteAction, removeLinkAction, saveSettingsAction, unblockLinkAction,
  type InviteState, type RedeemState, type SettingsState, type SiblingState,
} from "./actions";

type Values = Record<SwitchId, boolean>;

// The parent's four switches for one learner. Chat needs challenges and voice needs chat, so turning one off turns off what
// depends on it (the server enforces the same rule). Features the owner has not switched on for the site show as "not open yet".
export function SettingsForm({ learnerId, name, values, open }: { learnerId: string; name: string; values: Values; open: Record<SwitchId, boolean> }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(saveSettingsAction, {});
  const [on, setOn] = useState<Values>(values);
  const set = (id: SwitchId, value: boolean) => setOn((current) => {
    const next = { ...current, [id]: value };
    if (!next.challenges) { next.classVisible = false; next.presence = false; next.chat = false; next.voice = false; }
    if (!next.chat) next.voice = false;
    return next;
  });
  const needs: Partial<Record<SwitchId, boolean>> = { classVisible: !on.challenges, presence: !on.challenges, chat: !on.challenges, voice: !on.chat };

  return (
    <form action={action} className="switch-form">
      <input type="hidden" name="learnerId" value={learnerId} />
      <ul className="switch-list">
        {SWITCHES.map((item) => {
          const disabled = !open[item.id] || needs[item.id];
          return (
            <li key={item.id}>
              <label className={`switch-row ${disabled ? "is-disabled" : ""}`}>
                <input type="checkbox" name={item.id} checked={on[item.id]} disabled={disabled} onChange={(event) => set(item.id, event.target.checked)} />
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.help}</small>
                  {!open[item.id] && <small className="switch-soon">Not open on Edify yet. Your choice is saved for when it is.</small>}
                </span>
              </label>
              {/* A greyed-out switch is not sent with the form, so keep a saved choice for a feature that is not open yet. */}
              {!open[item.id] && on[item.id] && <input type="hidden" name={item.id} value="on" />}
            </li>
          );
        })}
      </ul>
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      {state.saved && <p role="status" className="form-success">Saved for {name}.</p>}
      <button type="submit" className="pill-button small" disabled={pending}>{pending ? "Saving…" : `Save for ${name}`}</button>
    </form>
  );
}

export function InviteMaker({ learnerId, name, disabled }: { learnerId: string; name: string; disabled: boolean }) {
  const [state, action, pending] = useActionState<InviteState, FormData>(createInviteAction, {});
  const [copied, setCopied] = useState(false);
  return (
    <form action={action} className="code-form">
      <input type="hidden" name="learnerId" value={learnerId} />
      <p>Make a code for {name} and send it to the other parent. It works once, for {LIMITS.codeValidDays} days.</p>
      {state.code ? (
        <div className="code-box" role="status">
          <strong aria-label={`Code ${state.code.split("").join(" ")}`}>{state.code}</strong>
          <small>Shown once, so copy it now. It works one time, for the next {LIMITS.codeValidDays} days.</small>
          <button type="button" className="pill-outline small" onClick={() => { void navigator.clipboard?.writeText(state.code ?? "").then(() => setCopied(true)).catch(() => setCopied(false)); }}>{copied ? "Copied" : "Copy code"}</button>
        </div>
      ) : null}
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <button type="submit" className="pill-button small" disabled={pending || disabled}>{pending ? "Making…" : state.code ? "Make another code" : `Make a code for ${name}`}</button>
    </form>
  );
}

export function RedeemForm({ learnerId, name, disabled }: { learnerId: string; name: string; disabled: boolean }) {
  const [state, action, pending] = useActionState<RedeemState, FormData>(redeemInviteAction, {});
  return (
    <form action={action} className="code-form">
      <input type="hidden" name="learnerId" value={learnerId} />
      <label htmlFor={`code-${learnerId}`}>Type the code the other parent sent you</label>
      <div className="code-row">
        <input id={`code-${learnerId}`} name="code" className="code-text" autoComplete="off" autoCapitalize="characters" spellCheck={false} maxLength={12} placeholder="ABCD-2345" required disabled={disabled} />
        <button type="submit" className="pill-button small" disabled={pending || disabled}>{pending ? "Checking…" : `Link ${name}`}</button>
      </div>
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      {state.joined && <p role="status" className="form-success">{name} is now linked with {state.joined.name} ({state.joined.classLevel}).</p>}
    </form>
  );
}

// Block, unblock or remove one classmate, with a confirmation step.
export function LinkActions({ linkId, learnerId, other, mode }: { linkId: string; learnerId: string; other: string; mode: "active" | "blocked-by-us" | "blocked-by-them" }) {
  const [asking, setAsking] = useState<"block" | "remove" | null>(null);
  const hidden = <><input type="hidden" name="linkId" value={linkId} /><input type="hidden" name="learnerId" value={learnerId} /></>;
  if (mode === "blocked-by-them") return <span className="link-state">Not available</span>;
  if (asking) {
    return (
      <form action={asking === "block" ? blockLinkAction : removeLinkAction} className="remove-confirm">
        {hidden}
        <span>{asking === "block" ? `Block ${other}? They can’t be challenged or messaged until you unblock.` : `Remove ${other}? Their chat is deleted, and a new code is needed to link again.`}</span>
        <div><button type="submit" className="danger-button">{asking === "block" ? "Yes, block" : "Yes, remove"}</button><button type="button" className="text-button" onClick={() => setAsking(null)}>Keep</button></div>
      </form>
    );
  }
  return (
    <span className="link-actions">
      {mode === "blocked-by-us"
        ? <form action={unblockLinkAction}>{hidden}<button type="submit" className="text-button small">Unblock</button></form>
        : <button type="button" className="text-button small" onClick={() => setAsking("block")}>Block</button>}
      <button type="button" className="text-button small" onClick={() => setAsking("remove")}>Remove</button>
    </span>
  );
}

// One click to link this learner with a brother or sister on the same account who is in the same class and school.
export function SiblingLink({ learnerId, name, sibling }: { learnerId: string; name: string; sibling: { id: string; name: string; ready: boolean } }) {
  const [state, action, pending] = useActionState<SiblingState, FormData>(linkSiblingAction, {});
  return (
    <form action={action} className="sibling-row">
      <input type="hidden" name="learnerId" value={learnerId} />
      <input type="hidden" name="siblingId" value={sibling.id} />
      <span className="avatar small" aria-hidden="true">{sibling.name[0]?.toUpperCase()}</span>
      <span className="link-who"><strong>{sibling.name}</strong><small>{sibling.ready ? "Same class and school, on your account" : `Switch on challenges for ${sibling.name} first`}</small></span>
      <button type="submit" className="pill-button small" disabled={pending || !sibling.ready}>{pending ? "Linking…" : `Link with ${name}`}</button>
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
    </form>
  );
}
