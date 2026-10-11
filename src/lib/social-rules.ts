// The rules of the classmate features that need no database: limits, retention, winner and ranking maths,
// classmate codes, the message filter and the voice-note file check. No imports on purpose:
// scripts/social.test.mjs runs this file directly. See docs/challenges.md for why each number is what it is.

// ---------- Limits ----------
export const LIMITS = {
  maxClassmates: 12,
  // Classmate codes
  codeValidDays: 7,
  codesPerParentPerDay: 5,
  pendingCodesPerLearner: 3,
  codeTriesPerParentPerHour: 10,
  // Challenges
  challengesPerLearnerPerDay: 5,
  openChallengesPerPair: 2,
  challengeValidDays: 3,
  challengeCounts: [10, 15, 20] as readonly number[],
  gracePeriodSeconds: 60,
  // Classmate requests to children in the same class ("Visible to my class")
  requestsPerLearnerPerDay: 10,
  // Reports
  reportsPerLearnerPerDay: 5,
  // Chat
  messageMaxChars: 500,
  messagesPerMinute: 20,
  messagesPerDay: 400,
  // Voice notes
  voiceMaxSeconds: 30,
  voiceMaxBytes: 400 * 1024,
  voicePerHour: 10,
  voicePerDay: 40,
  // Presence
  heartbeatMinGapSeconds: 20,
  onlineWithinSeconds: 75,
};

// OWNER DECISION: every number here is a proposal. Messages and voice notes are hidden from reads once older than
// this, and deleted by the daily purge (src/lib/social/purge.ts).
export const RETENTION_DAYS = {
  textMessages: 14,
  voiceNotes: 7,
  finishedChallenges: 180,
  leaderboardWindow: 90,
  endedChallenges: 30,
  events: 2,
  codes: 30,
  reports: 365,
};

// ---------- Classmate codes ----------
// No 0, O, 1, I or L, so a code read out loud or typed from a screenshot is not misread.
export const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
export const CODE_LENGTH = 8;

// `pick(n)` must return a uniform whole number from 0 to n - 1 (the server passes crypto.randomInt).
export function makeCode(pick: (below: number) => number) {
  let code = "";
  for (let i = 0; i < CODE_LENGTH; i++) code += CODE_ALPHABET[pick(CODE_ALPHABET.length)];
  return code;
}

export function formatCode(code: string) {
  return `${code.slice(0, 4)}-${code.slice(4)}`;
}

// What a parent typed, tidied; null when it cannot be a code.
export function normalizeCode(input: string) {
  const code = input.toUpperCase().replace(/[\s-]/g, "");
  return code.length === CODE_LENGTH && [...code].every((char) => CODE_ALPHABET.includes(char)) ? code : null;
}

// ---------- Who counts as a classmate ----------
// Same class, and the same school once case, spacing and punctuation are ignored.
export function schoolKey(school: string | null | undefined) {
  return (school ?? "").normalize("NFKC").toLowerCase().replace(/[.,'’`"]/g, "").replace(/\s+/g, " ").trim();
}

export function areClassmates(a: { school: string | null; classLevel: string }, b: { school: string | null; classLevel: string }) {
  const key = schoolKey(a.school);
  return key.length >= 2 && key === schoolKey(b.school) && a.classLevel === b.classLevel;
}

// A link stores the two learners in a fixed order (learner_a < learner_b), as the database requires.
export function orderedPair(x: string, y: string): [string, string] {
  return x < y ? [x, y] : [y, x];
}

// ---------- Challenges ----------
export type Outcome = { score: number; total: number; durationSeconds: number };

// Higher score wins; with equal scores the faster finish wins; equal on both is a draw.
export function decideWinner(a: Outcome, b: Outcome): "a" | "b" | "draw" {
  if (a.score !== b.score) return a.score > b.score ? "a" : "b";
  if (a.durationSeconds !== b.durationSeconds) return a.durationSeconds < b.durationSeconds ? "a" : "b";
  return "draw";
}

export type PlayerPhase = "new" | "playing" | "done";
export type ChallengeStatus = "declined" | "cancelled" | "expired" | "finished" | "open";

export function challengeStatus(input: { stored: string; expiresAt: number; now: number; phases: readonly [PlayerPhase, PlayerPhase] }): ChallengeStatus {
  if (input.stored === "declined") return "declined";
  if (input.stored === "cancelled") return "cancelled";
  if (input.phases.every((phase) => phase === "done")) return "finished";
  // Time to start runs out; a player who has already started may still finish.
  if (input.now >= input.expiresAt && input.phases.some((phase) => phase === "new")) return "expired";
  return "open";
}

export function phaseOf(entry: { started: boolean; submitted: boolean }): PlayerPhase {
  return entry.submitted ? "done" : entry.started ? "playing" : "new";
}

// How a learner should see a challenge in their list.
export type ViewerSlot = "your-turn" | "continue" | "waiting" | "finished" | "ended";
export function viewerSlot(status: ChallengeStatus, mine: PlayerPhase): ViewerSlot {
  if (status === "finished") return "finished";
  if (status !== "open") return "ended";
  if (mine === "done") return "waiting";
  return mine === "playing" ? "continue" : "your-turn";
}

// Marks a paper: `picks` maps question key to the letter chosen. Unknown or malformed picks count as blank.
export type FrozenQuestion = { key: string; prompt: string; options: string[]; answer: number; explanation?: string };
const LETTERS = ["A", "B", "C", "D"];

export function gradePicks(paper: FrozenQuestion[], picks: unknown) {
  const source = typeof picks === "object" && picks !== null ? (picks as Record<string, unknown>) : {};
  const answers = paper.map((question) => {
    const picked = typeof source[question.key] === "string" ? LETTERS.indexOf(source[question.key] as string) : -1;
    return { q: question.key, picked: picked >= 0 && picked < question.options.length ? LETTERS[picked] : null, correct: LETTERS[question.answer] };
  });
  return { score: answers.filter((answer) => answer.picked === answer.correct).length, total: answers.length, answers };
}

// ---------- Leaderboard ----------
export type BoardRow = { learnerId: string; name: string; classLevel: string; played: number; wins: number; draws: number; losses: number; avgPercent: number };

// Most wins first, then draws, then average score. Learners with no finished challenge come last, unranked.
// Equal rows share a rank (1, 2, 2, 4).
export function rankBoard(rows: BoardRow[]): (BoardRow & { rank: number | null })[] {
  const sorted = [...rows].sort((a, b) => Number(b.played > 0) - Number(a.played > 0) || b.wins - a.wins || b.draws - a.draws || b.avgPercent - a.avgPercent || a.name.localeCompare(b.name));
  const same = (a: BoardRow, b: BoardRow) => a.wins === b.wins && a.draws === b.draws && a.avgPercent === b.avgPercent;
  return sorted.map((row, index) => {
    if (row.played === 0) return { ...row, rank: null };
    let first = index;
    while (first > 0 && sorted[first - 1].played > 0 && same(sorted[first - 1], row)) first--;
    return { ...row, rank: first + 1 };
  });
}

// ---------- Chat messages ----------
// Returns the message to store, or an error to show the child.
export function cleanMessage(raw: unknown): { text: string } | { error: string } {
  if (typeof raw !== "string") return { error: "Write a message first." };
  const text = raw.normalize("NFC").replace(/[\u0000-\u0008\u000b-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]/g, "").replace(/\s+/g, " ").trim();
  if (!text) return { error: "Write a message first." };
  if (text.length > LIMITS.messageMaxChars) return { error: `Keep messages under ${LIMITS.messageMaxChars} characters.` };
  const blocked = findContactDetails(text);
  if (blocked) return { error: "For your safety, don’t share phone numbers, emails, links or social media names here. Keep it to your studies." };
  return { text };
}

const SOCIAL_NAMES = /\b(whats\s?app|telegram|instagram|snap\s?chat|tik\s?tok|facebook|discord|signal|twitter|x\.com|youtube)\b/i;

// A basic guard against children swapping contact details. It is not moderation: it misses plenty and
// will sometimes stop an innocent message.
export function findContactDetails(text: string): boolean {
  const squeezed = text.replace(/(\d)[\s\-.()]+(?=\d)/g, "$1");
  if (/\d{8,}/.test(squeezed)) return true;
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(text) || /@\w{3,}/.test(text)) return true;
  if (/(https?:\/\/|www\.)/i.test(text) || /\b[a-z0-9-]+\.(com|net|org|ng|co|io|me|ly|app|xyz|info|biz|tv|gg|link|site|online)\b/i.test(text)) return true;
  return SOCIAL_NAMES.test(text);
}

// ---------- Voice notes ----------
export type AudioKind = "webm" | "ogg" | "mp4";
const AUDIO_TYPES: Record<AudioKind, string> = { webm: "audio/webm", ogg: "audio/ogg", mp4: "audio/mp4" };

// The content type a browser declared (parameters like ;codecs=opus are ignored) to the kind we accept.
export function audioKindFromType(declared: string | null | undefined): AudioKind | null {
  const base = (declared ?? "").split(";")[0].trim().toLowerCase();
  if (base === "audio/webm") return "webm";
  if (base === "audio/ogg") return "ogg";
  if (base === "audio/mp4" || base === "audio/x-m4a" || base === "audio/m4a") return "mp4";
  return null;
}

// The first bytes of the file must really be that container, so a renamed file is refused.
export function sniffAudio(bytes: Uint8Array): AudioKind | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0x1a && bytes[1] === 0x45 && bytes[2] === 0xdf && bytes[3] === 0xa3) return "webm";
  if (bytes[0] === 0x4f && bytes[1] === 0x67 && bytes[2] === 0x67 && bytes[3] === 0x53) return "ogg";
  if (bytes[4] === 0x66 && bytes[5] === 0x74 && bytes[6] === 0x79 && bytes[7] === 0x70) return "mp4";
  return null;
}

export const storedAudioType = (kind: AudioKind) => AUDIO_TYPES[kind];

// "bytes=0-" style single range. Returns null for anything we do not serve as a range.
export function parseRange(header: string | null, size: number): { start: number; end: number } | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header ?? "");
  if (!match || (!match[1] && !match[2]) || size <= 0) return null;
  let start: number;
  let end: number;
  if (!match[1]) { start = Math.max(size - Number(match[2]), 0); end = size - 1; }
  else { start = Number(match[1]); end = match[2] ? Math.min(Number(match[2]), size - 1) : size - 1; }
  return start <= end && start < size ? { start, end } : null;
}
