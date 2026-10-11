import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@/components/icons";
import { LIMITS, RETENTION_DAYS } from "@/lib/social-rules";
import { listMessages, markRead, openChat, theirReadSeq, type ChatMessage } from "@/lib/social/chat";
import { isUuid } from "@/lib/social/data";
import { pageActor } from "@/lib/social/guard";
import ChatRoom from "./chat-room";

export const metadata = { title: "Chat — Edify" };

// One conversation. The layout around it has already checked that chat is on for this learner.
export default async function ChatPage({ params }: { params: Promise<{ linkId: string }> }) {
  const { learner, settings } = await pageActor();
  const { linkId } = await params;
  if (!isUuid(linkId)) notFound();
  const opened = await openChat(learner.id, settings, linkId).catch(() => ({ error: "Chat could not be loaded. Refresh to try again.", status: 503 }));
  if ("error" in opened) {
    return (
      <div className="chat-welcome">
        <h2>This chat isn’t open</h2>
        <p>{opened.error}</p>
        <Link href="/study/chats" className="pill-outline small"><ArrowLeft size={14} /> All chats</Link>
      </div>
    );
  }

  let initial: ChatMessage[] = [];
  let theirRead = "0";
  try {
    initial = await listMessages(learner.id, linkId, 0);
    await markRead(learner.id, linkId);
    theirRead = await theirReadSeq(learner.id, linkId);
  } catch { /* the room still opens and keeps asking for messages */ }

  return (
    <ChatRoom
      key={linkId}
      linkId={linkId}
      name={opened.link.other.name}
      classLevel={opened.link.other.classLevel}
      initial={initial}
      initialTheirRead={theirRead}
      maxChars={LIMITS.messageMaxChars}
      voiceSeconds={settings.voice && opened.link.otherSwitches.voice ? LIMITS.voiceMaxSeconds : null}
      keptDays={RETENTION_DAYS.textMessages}
    />
  );
}
