import "server-only";
import { LIMITS, RETENTION_DAYS, audioKindFromType, sniffAudio, storedAudioType } from "@/lib/social-rules";
import * as sq from "@/lib/social-queries";
import { isUuid, run, toIso, withinLimit } from "./data";
import type { ChatFailure, ChatMessage } from "./chat";

// Phase 4: voice notes. The recording is stored in Postgres next to the message (see docs/challenges.md for why), so
// deleting the message, the link, the learner or the account deletes the audio in the same statement.

// Reads a request body, giving up as soon as it is bigger than `max` bytes (the declared length can't be trusted).
export async function readLimited(request: Request, max: number): Promise<Uint8Array | null> {
  const reader = request.body?.getReader();
  if (!reader) return new Uint8Array();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > max) { await reader.cancel().catch(() => undefined); return null; }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return bytes;
}

// Checks and stores one voice note. `declaredType` is the browser's Content-Type; the first bytes must agree with it.
export async function sendVoice(learnerId: string, linkId: string, declaredType: string | null, secondsText: string | null, bytes: Uint8Array): Promise<{ message: ChatMessage } | ChatFailure> {
  const declared = audioKindFromType(declaredType);
  if (!declared) return { error: "Send a recording made in the browser (webm, ogg or mp4 audio).", status: 415 };
  if (bytes.byteLength < 200) return { error: "That recording is empty.", status: 400 };
  if (bytes.byteLength > LIMITS.voiceMaxBytes) return { error: "That recording is too big.", status: 413 };
  if (sniffAudio(bytes) !== declared) return { error: "That file is not a voice recording.", status: 415 };
  const seconds = Math.round(Number(secondsText));
  if (!Number.isFinite(seconds) || seconds < 1) return { error: "That recording is too short.", status: 400 };
  if (seconds > LIMITS.voiceMaxSeconds + 2) return { error: `Voice notes can be up to ${LIMITS.voiceMaxSeconds} seconds.`, status: 400 };
  if (!(await withinLimit({ learnerId }, "voice-hour", LIMITS.voicePerHour, 3600))) return { error: "That’s a lot of voice notes. Try again in a while.", status: 429 };
  if (!(await withinLimit({ learnerId }, "voice-day", LIMITS.voicePerDay, 86400))) return { error: "That’s enough voice notes for today.", status: 429 };

  const row = (await run(sq.sendVoiceQuery(learnerId, linkId, storedAudioType(declared), Math.min(seconds, LIMITS.voiceMaxSeconds), Buffer.from(bytes).toString("base64"), bytes.byteLength)))[0];
  if (!row) return { error: "Voice notes aren’t switched on for you and your classmate.", status: 403 };
  return { message: { id: row.id as string, seq: String(row.seq), mine: true, kind: "voice", body: null, seconds: Math.min(seconds, LIMITS.voiceMaxSeconds), at: toIso(row.created_at) } };
}

export type Clip = { contentType: string; bytes: Buffer };

// The recording, for a learner who is on the link (voice on for both) or a parent of one of them.
export async function getClip(who: { learnerId?: string; parentId?: string }, messageId: string): Promise<Clip | null> {
  if (!isUuid(messageId)) return null;
  const queries = [
    who.learnerId ? sq.voiceForLearnerQuery(who.learnerId, messageId, RETENTION_DAYS.voiceNotes) : null,
    who.parentId ? sq.voiceForParentQuery(who.parentId, messageId, RETENTION_DAYS.voiceNotes) : null,
  ];
  for (const query of queries) {
    if (!query) continue;
    const row = (await run(query))[0];
    if (row) return { contentType: row.content_type as string, bytes: Buffer.from(row.audio as string, "base64") };
  }
  return null;
}
