"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Message, Target } from "@/components/icons";
import { REPORT_REASONS } from "@/data/challenges";
import type { Classmate } from "@/lib/social/links";
import { blockClassmateAction, reportClassmateAction, type ActionState } from "./actions";
import { usePulse } from "./use-pulse";

// The learner's linked classmates: first name and class, who is online (when both parents allow it), and what they
// can do with each one. `features` says what the owner has switched on and the learner's own parent allows.
export default function ClassmateList({ classmates, features }: { classmates: Classmate[]; features: { presence: boolean; chat: boolean; voice: boolean } }) {
  const pulse = usePulse();
  return (
    <ul className="classmate-list">
      {classmates.map((classmate) => {
        const online = features.presence && classmate.presence ? pulse.online[classmate.linkId] : undefined;
        const unread = pulse.unread[classmate.linkId] ?? 0;
        const canChat = features.chat && classmate.chat;
        return (
          <li key={classmate.linkId} className="classmate">
            <span className="avatar" aria-hidden="true">{classmate.name[0]?.toUpperCase()}</span>
            <span className="classmate-who">
              <strong>{classmate.name}</strong>
              <small>{classmate.classLevel}</small>
              {online !== undefined && <span className={`presence ${online ? "is-online" : ""}`}>{online ? "Online now" : "Offline"}</span>}
            </span>
            <span className="classmate-actions">
              {canChat && (
                <Link href={`/study/chats/${classmate.linkId}`} className="pill-outline small">
                  <Message size={16} /> Chat<span className="sr-only"> with {classmate.name}</span>
                  {unread > 0 && <span className="unread"><span aria-hidden="true">{unread}</span><span className="sr-only">, {unread} unread</span></span>}
                </Link>
              )}
              <Link href={`/study/challenges/new?with=${classmate.linkId}`} className="pill-button small"><Target size={16} /> Challenge<span className="sr-only"> {classmate.name}</span></Link>
            </span>
            <details className="classmate-more">
              <summary>Block or report {classmate.name}</summary>
              <div className="classmate-more-body">
                <p>If something is wrong, tell a parent or a teacher you trust too. A parent can see all your classmates and can remove any of them.</p>
                <form action={blockClassmateAction}>
                  <input type="hidden" name="linkId" value={classmate.linkId} />
                  <p><strong>Block {classmate.name}.</strong> You will stop seeing each other and any open challenge ends.</p>
                  <button type="submit" className="danger-button">Block {classmate.name}</button>
                </form>
                <ReportForm linkId={classmate.linkId} name={classmate.name} />
              </div>
            </details>
          </li>
        );
      })}
    </ul>
  );
}

function ReportForm({ linkId, name }: { linkId: string; name: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(reportClassmateAction, {});
  const id = `report-${linkId}`;
  return (
    <form action={action}>
      <input type="hidden" name="linkId" value={linkId} />
      <p><strong>Report {name}.</strong> We save your report for the Edify team and block them straight away.</p>
      <label htmlFor={`${id}-reason`}>What went wrong?</label>
      <select id={`${id}-reason`} name="reason" required defaultValue="">
        <option value="" disabled>Choose…</option>
        {REPORT_REASONS.map((reason) => <option key={reason.id} value={reason.id}>{reason.label}</option>)}
      </select>
      <label htmlFor={`${id}-note`}>Tell us more <span className="optional">(optional)</span></label>
      <textarea id={`${id}-note`} name="note" maxLength={300} placeholder="A few words are enough." />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <button type="submit" className="danger-button" disabled={pending}>{pending ? "Sending…" : `Report ${name}`}</button>
    </form>
  );
}
