"use client";

import Link from "next/link";
import { Check, Target } from "@/components/icons";
import type { ClassEntry, Request } from "@/lib/social/links";
import { acceptRequestAction, challengeFromClassAction, declineRequestAction } from "./actions";
import { usePulse } from "./use-pulse";

// Classmate requests waiting for this learner to say yes or no, and the ones they sent.
export function RequestList({ requests }: { requests: Request[] }) {
  const incoming = requests.filter((request) => !request.fromMe);
  const outgoing = requests.filter((request) => request.fromMe);
  return (
    <div className="request-list">
      {incoming.map((request) => (
        <div key={request.linkId} className="request is-incoming">
          <span className="avatar small" aria-hidden="true">{request.name[0]?.toUpperCase()}</span>
          <span className="classmate-who"><strong>{request.name} wants to be classmates</strong><small>{request.classLevel} · Say yes to chat and challenge each other. Saying no means they can’t ask again.</small></span>
          <span className="classmate-actions">
            <form action={acceptRequestAction}><input type="hidden" name="linkId" value={request.linkId} /><button type="submit" className="pill-button small"><Check size={16} /> Accept</button></form>
            <form action={declineRequestAction}><input type="hidden" name="linkId" value={request.linkId} /><button type="submit" className="text-button small">No thanks</button></form>
          </span>
        </div>
      ))}
      {outgoing.map((request) => (
        <div key={request.linkId} className="request">
          <span className="avatar small" aria-hidden="true">{request.name[0]?.toUpperCase()}</span>
          <span className="classmate-who"><strong>Waiting for {request.name}</strong><small>{request.classLevel} · You can chat once they accept.</small></span>
        </div>
      ))}
    </div>
  );
}

// Everyone in the learner's school and class whose parent chose "Visible to my class": first name, class and, when both
// share it, whether they are online right now. Online people come first.
export function ClassList({ entries, showOnline }: { entries: ClassEntry[]; showOnline: boolean }) {
  const pulse = usePulse();
  const online = (entry: ClassEntry) => (showOnline ? pulse.classOnline[entry.learnerId] ?? entry.online : null);
  const sorted = [...entries].sort((a, b) => Number(online(b) === true) - Number(online(a) === true));
  const onlineCount = sorted.filter((entry) => online(entry) === true).length;
  return (
    <>
      {showOnline && <p className="class-count" aria-live="polite">{onlineCount ? `${onlineCount} online now` : "Nobody else is online right now."}</p>}
      <ul className="classmate-list">
        {sorted.map((entry) => {
          const isOnline = online(entry);
          return (
            <li key={entry.learnerId} className="classmate">
              <span className="avatar" aria-hidden="true">{entry.name[0]?.toUpperCase()}</span>
              <span className="classmate-who">
                <strong>{entry.name}</strong>
                <small>{entry.classLevel}{entry.state === "linked" ? " · your classmate" : entry.state === "asked" ? " · request sent" : entry.state === "asking-me" ? " · wants to be classmates" : ""}</small>
                {isOnline !== null && <span className={`presence ${isOnline ? "is-online" : ""}`}>{isOnline ? "Online now" : "Offline"}</span>}
              </span>
              <span className="classmate-actions">
                {entry.state === "none" || entry.state === "asking-me" ? (
                  <form action={challengeFromClassAction}>
                    <input type="hidden" name="learnerId" value={entry.learnerId} />
                    <button type="submit" className="pill-button small"><Target size={16} /> Challenge<span className="sr-only"> {entry.name}</span></button>
                  </form>
                ) : (
                  <Link href={`/study/challenges/new?with=${entry.linkId}`} className="pill-button small"><Target size={16} /> Challenge<span className="sr-only"> {entry.name}</span></Link>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
