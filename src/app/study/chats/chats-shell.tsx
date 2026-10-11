"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Mic, Message } from "@/components/icons";
import type { Conversation } from "@/lib/social/chat";

const EVERY = 8000;
type Shared = { conversations: Conversation[]; refresh: () => void };
const ChatsContext = createContext<Shared>({ conversations: [], refresh: () => {} });
export const useChats = () => useContext(ChatsContext);

const TIME = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });
const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Lagos" });
const lagosDate = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });

// "14:05" today, "Yesterday", or "12 Oct".
export function shortWhen(iso: string) {
  const today = lagosDate(new Date().toISOString());
  const yesterday = lagosDate(new Date(Date.now() - 86_400_000).toISOString());
  const day = lagosDate(iso);
  return day === today ? TIME.format(new Date(iso)) : day === yesterday ? "Yesterday" : DAY.format(new Date(iso));
}

// The Chats section: the list of conversations on the left (or on its own on a phone) and the open chat beside it.
// The list asks the server every 8 seconds while the page is in front, for new messages, unread counts and who is online.
export default function ChatsShell({ initial, children }: { initial: Conversation[]; children: React.ReactNode }) {
  const [conversations, setConversations] = useState(initial);
  const pathname = usePathname();
  const openId = /^\/study\/chats\/([^/]+)/.exec(pathname)?.[1] ?? null;

  const load = useCallback(async () => {
    try {
      const response = await fetch("/api/social/conversations", { cache: "no-store" });
      if (response.ok) setConversations(((await response.json()) as { conversations: Conversation[] }).conversations);
    } catch { /* try again next time */ }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stopped = false;
    const tick = async () => {
      if (document.visibilityState === "visible") await load();
      if (!stopped) timer = setTimeout(tick, EVERY);
    };
    const onVisible = () => { if (document.visibilityState === "visible") { clearTimeout(timer); void tick(); } };
    timer = setTimeout(tick, EVERY);
    document.addEventListener("visibilitychange", onVisible);
    return () => { stopped = true; clearTimeout(timer); document.removeEventListener("visibilitychange", onVisible); };
  }, [load]);

  return (
    <ChatsContext.Provider value={{ conversations, refresh: () => void load() }}>
      <div className={`chats ${openId ? "has-open" : ""}`}>
        <aside className="chat-list-pane" aria-label="Your chats">
          <header className="chat-list-head"><h1>Chats</h1></header>
          {conversations.length ? (
            <ul className="chat-list">
              {conversations.map((chat) => (
                <li key={chat.linkId}>
                  <Link href={`/study/chats/${chat.linkId}`} className={`chat-row ${chat.linkId === openId ? "is-open" : ""}`} aria-current={chat.linkId === openId ? "page" : undefined}>
                    <span className="chat-avatar" aria-hidden="true">{chat.name[0]?.toUpperCase()}{chat.online && <i className="chat-dot" />}</span>
                    <span className="chat-row-main">
                      <span className="chat-row-top"><strong>{chat.name}</strong>{chat.last && <time className={chat.unread ? "is-unread" : ""}>{shortWhen(chat.last.at)}</time>}</span>
                      <span className="chat-row-bottom">
                        <span className="chat-preview">
                          {chat.last ? <>
                            {chat.last.mine && "You: "}
                            {chat.last.kind === "voice" ? <><Mic size={13} /> Voice note ({chat.last.seconds ?? 0}s)</> : chat.last.text}
                          </> : <em>{chat.online ? "Online now · say hello" : `${chat.classLevel} · say hello`}</em>}
                        </span>
                        {chat.unread > 0 && <span className="unread"><span aria-hidden="true">{chat.unread}</span><span className="sr-only">, {chat.unread} unread</span></span>}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="chat-list-empty">
              <Message size={24} />
              <p>No chats yet. You can chat with classmates once you are linked and both your parents have switched chat on.</p>
              <Link href="/study/challenges" className="pill-outline small">Find classmates</Link>
            </div>
          )}
        </aside>
        <section className="chat-pane">{children}</section>
      </div>
    </ChatsContext.Provider>
  );
}
