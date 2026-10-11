import Link from "next/link";
import { notFound } from "next/navigation";
import { listConversations, type Conversation } from "@/lib/social/chat";
import { chatEnabled } from "@/lib/social/flags";
import { pageActor } from "@/lib/social/guard";
import Gate from "../challenges/gate";
import ChatsShell from "./chats-shell";
import "../challenges/challenges.css";
import "./chats.css";

export const metadata = { title: "Chats — Edify" };

// Chats with classmates. Only learners whose parent switched chat on get here; the list holds only classmates whose
// parents did the same.
export default async function ChatsLayout({ children }: { children: React.ReactNode }) {
  if (!chatEnabled()) notFound();
  const { learner, settings, blocked } = await pageActor();
  if (blocked) return <Gate blocked={blocked} learnerId={learner.id} />;
  if (!settings.chat) {
    return (
      <div className="page">
        <section className="panel challenge-gate">
          <h1>A parent needs to switch chat on.</h1>
          <p>Chat lets you message the classmates you are linked with. Your parent switches it on, can read every message, and can switch it off at any time.</p>
          <Link href={`/study/classmates?learner=${learner.id}#step-switches`} className="pill-button">Open classmate settings (for parents)</Link>
        </section>
      </div>
    );
  }
  const initial: Conversation[] = await listConversations(learner.id).catch(() => []);
  return <ChatsShell initial={initial}>{children}</ChatsShell>;
}
