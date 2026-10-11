"use client";

import { useActionState, useCallback, useEffect, useRef, useState } from "react";
import { Send } from "@/components/icons";
import { REPORT_REASONS } from "@/data/challenges";
import { reportMessageAction, type ActionState } from "../../actions";
import VoiceRecorder from "./voice-recorder";

export type Message = { id: string; seq: string; mine: boolean; kind: "text" | "voice"; body: string | null; seconds: number | null; at: string };
type Props = { linkId: string; name: string; initial: Message[]; maxChars: number; voiceSeconds: number | null };

const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
const FAST = 4000;
const SLOW = 20000;

export function mergeMessages(current: Message[], incoming: Message[]) {
  if (!incoming.length) return current;
  const byId = new Map(current.map((message) => [message.id, message]));
  for (const message of incoming) byId.set(message.id, message);
  return [...byId.values()].sort((a, b) => Number(a.seq) - Number(b.seq));
}

// The chat with one classmate. New messages arrive by asking the server every few seconds while the page is visible
// (docs/challenges.md explains why this is polling and not a live connection).
export default function ChatRoom({ linkId, name, initial, maxChars, voiceSeconds }: Props) {
  const [messages, setMessages] = useState<Message[]>(initial);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [offline, setOffline] = useState(false);
  const [reporting, setReporting] = useState<Message | null>(null);
  const lastSeq = useRef(initial.length ? Number(initial[initial.length - 1].seq) : 0);
  const listRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);

  const take = useCallback((incoming: Message[]) => {
    if (!incoming.length) return;
    lastSeq.current = Math.max(lastSeq.current, ...incoming.map((message) => Number(message.seq)));
    setMessages((current) => mergeMessages(current, incoming));
  }, []);

  // Ask for new messages: quickly while the page is in front, slowly when it is hidden.
  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async () => {
      try {
        const response = await fetch(`/api/social/chat/${linkId}?after=${lastSeq.current}`, { cache: "no-store" });
        if (response.status === 403 || response.status === 404 || response.status === 401) { setOffline(true); return; }
        if (response.ok) { take(((await response.json()) as { messages: Message[] }).messages); setOffline(false); }
      } catch { /* try again on the next round */ }
      if (!stopped) timer = setTimeout(poll, document.visibilityState === "visible" ? FAST : SLOW);
    };
    const onVisible = () => { if (document.visibilityState === "visible") { clearTimeout(timer); void poll(); } };
    timer = setTimeout(poll, FAST);
    document.addEventListener("visibilitychange", onVisible);
    return () => { stopped = true; clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [linkId, take]);

  // Keep the newest message in view unless the reader has scrolled up.
  useEffect(() => {
    const list = listRef.current;
    if (list && stick.current) list.scrollTop = list.scrollHeight;
  }, [messages]);

  async function send(event: React.FormEvent) {
    event.preventDefault();
    const value = text.trim();
    if (!value || sending) return;
    setSending(true);
    setError("");
    try {
      const response = await fetch(`/api/social/chat/${linkId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: value }) });
      const data = (await response.json().catch(() => ({}))) as { message?: Message; error?: string };
      if (!response.ok || !data.message) { setError(data.error ?? "Your message could not be sent."); return; }
      stick.current = true;
      take([data.message]);
      setText("");
    } catch {
      setError("Your message could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat">
      <div
        ref={listRef}
        className="chat-log"
        role="log"
        aria-live="polite"
        aria-label={`Chat with ${name}`}
        tabIndex={0}
        onScroll={(event) => { const el = event.currentTarget; stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80; }}
      >
        {messages.length === 0 && <p className="chat-empty">No messages yet. Say hello, and keep it about school.</p>}
        {messages.map((message) => (
          <div key={message.id} className={`bubble ${message.mine ? "is-mine" : ""}`}>
            {message.kind === "text" ? <p>{message.body}</p> : voiceSeconds !== null ? <><p className="bubble-voice">Voice note · {message.seconds ?? 0} s</p><audio controls preload="none" src={`/api/social/voice/${message.id}`} aria-label={`Voice note from ${message.mine ? "you" : name}`} /></> : <p className="bubble-voice">Voice note · {message.seconds ?? 0} s (voice notes are off)</p>}
            <small>{message.mine ? "You" : name} · {TIME.format(new Date(message.at))}{!message.mine && <> · <button type="button" className="text-button small" onClick={() => setReporting(message)}>Report</button></>}</small>
          </div>
        ))}
      </div>

      {offline && <p role="alert" className="form-error">Chat isn’t available right now. A parent may have switched it off.</p>}
      {reporting && <ReportMessage message={reporting} name={name} onClose={() => setReporting(null)} />}

      {voiceSeconds !== null && <VoiceRecorder linkId={linkId} maxSeconds={voiceSeconds} onSent={(message) => { stick.current = true; take([message]); }} />}

      <form onSubmit={send} className="chat-form">
        <label htmlFor="chat-text" className="sr-only">Message for {name}</label>
        <textarea
          id="chat-text"
          value={text}
          maxLength={maxChars}
          rows={2}
          placeholder={`Write to ${name}…`}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }}
        />
        <button type="submit" className="pill-button small" disabled={sending || !text.trim()}><Send size={16} /> {sending ? "Sending…" : "Send"}</button>
      </form>
      <p className="chat-hint"><span>{text.length}/{maxChars}</span> Don’t share phone numbers, emails or links. Your parents can read this chat.</p>
      {error && <p role="alert" className="form-error">{error}</p>}
    </div>
  );
}

function ReportMessage({ message, name, onClose }: { message: Message; name: string; onClose: () => void }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(reportMessageAction, {});
  return (
    <form action={action} className="classmate-more-body chat-report">
      <input type="hidden" name="messageId" value={message.id} />
      <p><strong>Report this message from {name}.</strong> We save it for the Edify team and block {name} straight away.</p>
      <label htmlFor="chat-report-reason">What went wrong?</label>
      <select id="chat-report-reason" name="reason" required defaultValue="">
        <option value="" disabled>Choose…</option>
        {REPORT_REASONS.map((reason) => <option key={reason.id} value={reason.id}>{reason.label}</option>)}
      </select>
      <label htmlFor="chat-report-note">Tell us more <span className="optional">(optional)</span></label>
      <textarea id="chat-report-note" name="note" maxLength={300} />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div className="challenge-actions">
        <button type="submit" className="danger-button" disabled={pending}>{pending ? "Sending…" : "Send report"}</button>
        <button type="button" className="text-button small" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
