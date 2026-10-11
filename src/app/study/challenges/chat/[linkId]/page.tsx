import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { LIMITS } from "@/lib/social-rules";
import { listMessages, markRead, openChat, type ChatMessage } from "@/lib/social/chat";
import { isUuid } from "@/lib/social/data";
import { chatEnabled } from "@/lib/social/flags";
import { pageActor } from "@/lib/social/guard";
import Gate from "../../gate";
import ChatRoom from "./chat-room";
import "../../../cbt/cbt.css";
import "../../challenges.css";

export const metadata = { title: "Chat — Edify" };

export default async function ChatPage({ params }: { params: Promise<{ linkId: string }> }) {
  if (!chatEnabled()) notFound();
  const { learner, settings, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  const { linkId } = await params;
  if (!isUuid(linkId)) notFound();
  const opened = await openChat(learner.id, settings, linkId).catch(() => ({ error: "Chat could not be loaded. Refresh to try again.", status: 503 }));

  let initial: ChatMessage[] = [];
  if (!("error" in opened)) {
    try {
      initial = await listMessages(learner.id, linkId, 0);
      await markRead(learner.id, linkId);
    } catch { /* the room still opens and keeps asking for messages */ }
  }

  return (
    <div className="page chat-page">
      <Link href="/study/challenges" className="text-link small cbt-back"><ArrowLeft size={14} /> All challenges</Link>
      {"error" in opened ? (
        <section className="panel challenge-gate"><h1>Chat isn’t open</h1><p>{opened.error}</p></section>
      ) : (
        <>
          <header className="page-head">
            <div>
              <span className="kicker">Chat</span>
              <h1>{opened.link.other.name} <small className="chat-class">{opened.link.other.classLevel}</small></h1>
              <p>Keep it friendly and about school. Parents can read this chat, and messages are deleted after a short time.</p>
            </div>
          </header>
          <section className="panel chat-panel" aria-label={`Chat with ${opened.link.other.name}`}>
            <ChatRoom
              linkId={linkId}
              name={opened.link.other.name}
              initial={initial}
              maxChars={LIMITS.messageMaxChars}
              voiceSeconds={settings.voice && opened.link.otherSwitches.voice ? LIMITS.voiceMaxSeconds : null}
            />
          </section>
        </>
      )}
    </div>
  );
}
