import "server-only";
import { LIMITS, RETENTION_DAYS, cleanMessage } from "@/lib/social-rules";
import * as sq from "@/lib/social-queries";
import { isUuid, run, toIso, withinLimit } from "./data";
import { chatEnabled } from "./flags";
import { getLinkForLearner, type LinkedLearner } from "./links";
import type { SocialSettings } from "./settings";

// Phase 3: text chat between linked classmates whose parents both switched chat on. Every function takes the learner
// from the session and checks the link, so a link id from the browser is only ever a reference.
export type ChatMessage = { id: string; seq: string; mine: boolean; kind: "text" | "voice"; body: string | null; seconds: number | null; at: string };
export type ChatFailure = { error: string; status: number };

function toMessage(row: Record<string, unknown>, learnerId: string): ChatMessage {
  return {
    id: row.id as string, seq: String(row.seq), mine: row.sender_id === learnerId, kind: row.kind === "voice" ? "voice" : "text",
    body: (row.body as string | null) ?? null, seconds: (row.audio_seconds as number | null) ?? null, at: toIso(row.created_at),
  };
}

// Is this learner allowed to chat on this link right now? Returns the classmate on it, or why not.
export async function openChat(learnerId: string, settings: SocialSettings, linkId: string): Promise<{ link: LinkedLearner } | ChatFailure> {
  if (!chatEnabled()) return { error: "Chat is not switched on.", status: 404 };
  const link = await getLinkForLearner(learnerId, linkId);
  if (!link || link.status !== "active" || !link.otherSwitches.challenges) return { error: "That classmate isn’t available.", status: 404 };
  if (!settings.chat) return { error: "A parent has not switched chat on for you.", status: 403 };
  if (!link.otherSwitches.chat) return { error: `${link.other.name}’s parent has not switched chat on.`, status: 403 };
  return { link };
}

export async function listMessages(learnerId: string, linkId: string, after: number): Promise<ChatMessage[]> {
  const rows = await run(sq.chatListQuery(learnerId, linkId, Math.max(0, Math.floor(after) || 0), RETENTION_DAYS.textMessages, RETENTION_DAYS.voiceNotes, after > 0 ? 100 : 60));
  return rows.map((row) => toMessage(row, learnerId));
}

export async function sendText(learnerId: string, linkId: string, raw: unknown): Promise<{ message: ChatMessage } | ChatFailure> {
  const cleaned = cleanMessage(raw);
  if ("error" in cleaned) return { error: cleaned.error, status: 400 };
  if (!(await withinLimit({ learnerId }, "message-minute", LIMITS.messagesPerMinute, 60))) return { error: "Slow down a little. Try again in a minute.", status: 429 };
  if (!(await withinLimit({ learnerId }, "message-day", LIMITS.messagesPerDay, 86400))) return { error: "That’s enough messages for today.", status: 429 };
  const row = (await run(sq.sendTextQuery(learnerId, linkId, cleaned.text)))[0];
  if (!row) return { error: "That classmate isn’t available.", status: 404 };
  return { message: { id: row.id as string, seq: String(row.seq), mine: true, kind: "text", body: cleaned.text, seconds: null, at: toIso(row.created_at) } };
}

export async function markRead(learnerId: string, linkId: string) {
  if (isUuid(linkId)) await run(sq.markReadQuery(learnerId, linkId));
}

export async function unreadByLink(learnerId: string): Promise<Record<string, number>> {
  const rows = await run(sq.unreadQuery(learnerId, RETENTION_DAYS.textMessages, RETENTION_DAYS.voiceNotes));
  return Object.fromEntries(rows.map((row) => [row.link_id as string, row.n as number]));
}

// A message the learner received, for reporting it. Never one they sent.
export async function receivedMessage(learnerId: string, messageId: string): Promise<{ id: string; linkId: string; text: string } | null> {
  if (!isUuid(messageId)) return null;
  const row = (await run(sq.receivedMessageQuery(learnerId, messageId)))[0];
  if (!row) return null;
  return { id: row.id as string, linkId: row.link_id as string, text: row.kind === "voice" ? "[voice note]" : ((row.body as string | null) ?? "") };
}

// ---------- Parents ----------
export type ParentMessage = { id: string; senderName: string; mine: boolean; kind: "text" | "voice"; body: string | null; seconds: number | null; at: string };

// Every message of a conversation the parent's learner is in, as long as it is kept.
export async function parentConversation(parentId: string, learnerId: string, linkId: string): Promise<ParentMessage[]> {
  if (!isUuid(learnerId) || !isUuid(linkId)) return [];
  const rows = await run(sq.parentConversationQuery(parentId, learnerId, linkId, RETENTION_DAYS.textMessages, RETENTION_DAYS.voiceNotes, 200));
  return rows.map((row) => ({
    id: row.id as string, senderName: row.sender_name as string, mine: row.sender_id === learnerId, kind: row.kind === "voice" ? "voice" : "text",
    body: (row.body as string | null) ?? null, seconds: (row.audio_seconds as number | null) ?? null, at: toIso(row.created_at),
  }));
}

export async function deleteMessageAsParent(parentId: string, messageId: string): Promise<boolean> {
  return isUuid(messageId) && (await run(sq.deleteMessageQuery(parentId, messageId))).length > 0;
}
