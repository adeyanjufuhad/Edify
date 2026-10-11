"use client";

import Link from "next/link";
import { Fragment, useActionState, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, Flag, Mic, Send, Target } from "@/components/icons";
import { REPORT_REASONS } from "@/data/challenges";
import { reportMessageAction, type ActionState } from "../../challenges/actions";
import { useChats } from "../chats-shell";
import VoiceRecorder from "./voice-recorder";

export type Message = { id: string; seq: string; mine: boolean; kind: "text" | "voice"; body: string | null; seconds: number | null; at: string };
type Props = { linkId: string; name: string; classLevel: string; initial: Message[]; initialTheirRead: string; maxChars: number; voiceSeconds: number | null; keptDays: number };

const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
const LONG_DAY = new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", timeZone: "Africa/Lagos" });
const lagosDate = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
const FAST = 4000;
const SLOW = 20000;

function dayLabel(iso: string) {
  const day = lagosDate(iso);
  if (day === lagosDate(new Date().toISOString())) return "Today";
  if (day === lagosDate(new Date(Date.now() - 86_400_000).toISOString())) return "Yesterday";
  return LONG_DAY.format(new Date(iso));
}

function mergeMessages(current: Message[], incoming: Message[]) {
  if (!incoming.length) return current;
  const byId = new Map(current.map((message) => [message.id, message]));
  for (const message of incoming) byId.set(message.id, message);
  return [...byId.values()].sort((a, b) => Number(a.seq) - Number(b.seq));
}

// One tick when sent, two navy ticks once the classmate has opened the chat after it arrived.
function Ticks({ read }: { read: boolean }) {
  return (
    <svg className={`ticks ${read ? "is-read" : ""}`} width="18" height="12" viewBox="0 0 18 12" aria-label={read ? "Read" : "Sent"} role="img">
      <path d="M1 6.5 4.5 10 11 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {read && <path d="M7.5 9.5 8 10 14.5 2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
}

// A conversation with one classmate, laid out like a messaging app. New messages arrive by asking the server every few
// seconds while the page is in front (docs/challenges.md explains why it is not a live connection).
export default function ChatRoom({ linkId, name, classLevel, initial, initialTheirRead, maxChars, voiceSeconds, keptDays }: Props) {
  const { conversations, refresh } = useChats();
  const online = conversations.find((chat) => chat.linkId === linkId)?.online ?? null;
  const [messages, setMessages] = useState<Message[]>(initial);
  const [theirRead, setTheirRead] = useState(Number(initialTheirRead) || 0);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [offline, setOffline] = useState(false);
  const [recording, setRecording] = useState(false);
  const [reporting, setReporting] = useState<Message | null>(null);
  const lastSeq = useRef(initial.length ? Number(initial[initial.length - 1].seq) : 0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const stick = useRef(true);

  const take = useCallback((incoming: Message[]) => {
    if (!incoming.length) return;
    lastSeq.current = Math.max(lastSeq.current, ...incoming.map((message) => Number(message.seq)));
    setMessages((current) => mergeMessages(current, incoming));
  }, []);

  useEffect(() => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const poll = async () => {
      try {
        const response = await fetch(`/api/social/chat/${linkId}?after=${lastSeq.current}`, { cache: "no-store" });
        if (response.status === 401 || response.status === 403 || response.status === 404) { setOffline(true); return; }
        if (response.ok) {
          const data = (await response.json()) as { messages: Message[]; theirRead?: string };
          take(data.messages);
          if (data.theirRead) setTheirRead(Number(data.theirRead) || 0);
          setOffline(false);
        }
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
    const log = logRef.current;
    if (log && stick.current) log.scrollTop = log.scrollHeight;
  }, [messages]);

  // The text box grows with what is typed, up to about five lines.
  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    input.style.height = "auto";
    input.style.height = `${Math.max(44, Math.min(input.scrollHeight, 132))}px`;
    input.style.overflowY = input.scrollHeight > 132 ? "auto" : "hidden";
  }, [text]);

  async function send(event?: React.FormEvent) {
    event?.preventDefault();
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
      refresh();
      inputRef.current?.focus();
    } catch {
      setError("Your message could not be sent. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="room">
      <header className="room-head">
        <Link href="/study/chats" className="room-back" aria-label="Back to all chats"><ArrowLeft size={20} /></Link>
        <span className="chat-avatar" aria-hidden="true">{name[0]?.toUpperCase()}{online && <i className="chat-dot" />}</span>
        <span className="room-who"><strong>{name}</strong><small>{online ? "Online now" : classLevel}</small></span>
        <Link href={`/study/challenges/new?with=${linkId}`} className="room-challenge"><Target size={16} /> <span>Challenge</span></Link>
      </header>

      <div
        ref={logRef}
        className="room-log"
        role="log"
        aria-live="polite"
        aria-label={`Messages with ${name}`}
        tabIndex={0}
        onScroll={(event) => { const el = event.currentTarget; stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80; }}
      >
        <p className="room-notice">Messages are kept for {keptDays} days. Your parents and {name}’s parents can read this chat. Never share phone numbers, addresses or links.</p>
        {messages.length === 0 && <p className="room-notice is-plain">No messages yet. Say hello to {name}!</p>}
        {messages.map((message, index) => {
          const previous = messages[index - 1];
          const newDay = !previous || lagosDate(previous.at) !== lagosDate(message.at);
          const first = newDay || !previous || previous.mine !== message.mine;
          return (
            <Fragment key={message.id}>
              {newDay && <p className="room-day"><span>{dayLabel(message.at)}</span></p>}
              <div className={`msg ${message.mine ? "is-mine" : "is-theirs"} ${first ? "is-first" : ""}`}>
                <div className="msg-bubble">
                  {message.kind === "text"
                    ? <p className="msg-text">{message.body}</p>
                    : voiceSeconds !== null
                      ? <audio controls preload="none" src={`/api/social/voice/${message.id}`} aria-label={`Voice note, ${message.seconds ?? 0} seconds`} />
                      : <p className="msg-text msg-voice"><Mic size={14} /> Voice note ({message.seconds ?? 0}s)</p>}
                  <span className="msg-meta">
                    <time dateTime={message.at}>{TIME.format(new Date(message.at))}</time>
                    {message.mine && <Ticks read={theirRead >= Number(message.seq)} />}
                  </span>
                </div>
                {!message.mine && <button type="button" className="msg-report" onClick={() => setReporting(message)} aria-label={`Report this message from ${name}`} title="Report"><Flag size={14} /></button>}
              </div>
            </Fragment>
          );
        })}
      </div>

      {offline && <p role="alert" className="form-error room-alert">Chat isn’t available right now. A parent may have switched it off.</p>}
      {error && <p role="alert" className="form-error room-alert">{error}</p>}
      {reporting && <ReportMessage message={reporting} name={name} onClose={() => setReporting(null)} />}

      {recording && voiceSeconds !== null ? (
        <div className="room-compose">
          <VoiceRecorder linkId={linkId} maxSeconds={voiceSeconds} onSent={(message) => { stick.current = true; take([message]); refresh(); setRecording(false); }} onCancel={() => setRecording(false)} />
        </div>
      ) : (
        <form onSubmit={send} className="room-compose">
          <label htmlFor="room-text" className="sr-only">Message for {name}</label>
          <div className="compose-box">
            <textarea
              ref={inputRef}
              id="room-text"
              value={text}
              maxLength={maxChars}
              rows={1}
              placeholder="Message"
              disabled={offline}
              onChange={(event) => setText(event.target.value)}
              onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send(); } }}
            />
            {text.length > maxChars - 80 && <span className="compose-count">{maxChars - text.length}</span>}
          </div>
          {text.trim() || voiceSeconds === null
            ? <button type="submit" className="compose-btn is-send" disabled={sending || !text.trim() || offline} aria-label="Send"><Send size={20} /></button>
            : <button type="button" className="compose-btn" onClick={() => setRecording(true)} disabled={offline} aria-label="Record a voice note"><Mic size={20} /></button>}
        </form>
      )}
    </div>
  );
}

function ReportMessage({ message, name, onClose }: { message: Message; name: string; onClose: () => void }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(reportMessageAction, {});
  return (
    <form action={action} className="room-report">
      <input type="hidden" name="messageId" value={message.id} />
      <p><strong>Report this message from {name}?</strong> We save it for the Edify team and block {name} straight away. Tell a parent or teacher too.</p>
      {message.kind === "text" && <blockquote>{message.body}</blockquote>}
      <label htmlFor="room-report-reason">What went wrong?</label>
      <select id="room-report-reason" name="reason" required defaultValue="">
        <option value="" disabled>Choose…</option>
        {REPORT_REASONS.map((reason) => <option key={reason.id} value={reason.id}>{reason.label}</option>)}
      </select>
      <label htmlFor="room-report-note">Tell us more <span className="optional">(optional)</span></label>
      <textarea id="room-report-note" name="note" maxLength={300} rows={2} />
      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div className="room-report-actions">
        <button type="submit" className="danger-button" disabled={pending}>{pending ? "Sending…" : "Send report"}</button>
        <button type="button" className="text-button small" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
