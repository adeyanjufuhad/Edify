import "server-only";
import { randomInt } from "node:crypto";
import { CHALLENGE_MIN_PLAN } from "@/data/challenges";
import { PLAN_RANK } from "@/data/plans";
import { planForLearner } from "@/lib/profiles";
import {
  LIMITS, RETENTION_DAYS, challengeStatus, decideWinner, gradePicks, phaseOf, rankBoard, viewerSlot,
  type BoardRow, type ChallengeStatus, type FrozenQuestion, type PlayerPhase, type ViewerSlot,
} from "@/lib/social-rules";
import * as sq from "@/lib/social-queries";
import { finishChallengeQuery, finishSettledQuery, leaderboardQuery, settleOverdueQuery, startEntryQuery, submitEntryQuery } from "@/lib/social-sql";
import { challengeSubjects, examQuestions, isFrozenPaper, makeChallengePaper, type ExamQuestion } from "./challenge-papers";
import { isUuid, run, runTogether, toIso, withinLimit } from "./data";
import { getLinkForLearner, listClassmates } from "./links";

// A player who started and closed the tab scores zero once their time (and a short grace) is over.
export async function settleOverdue(learnerId: string) {
  await runTogether([settleOverdueQuery(learnerId, LIMITS.gracePeriodSeconds), finishSettledQuery(learnerId)]);
}

export type Side = { phase: PlayerPhase; score: number | null; total: number | null; durationSeconds: number | null };
export type ChallengeItem = {
  id: string;
  linkId: string;
  iAmChallenger: boolean;
  subject: string; subjectSlug: string; term: string; count: number; minutes: number;
  status: ChallengeStatus; slot: ViewerSlot;
  other: { id: string; name: string; classLevel: string };
  expiresAt: string; finishedAt: string | null; createdAt: string;
  mine: Side; theirs: Side;
  result: "won" | "lost" | "draw" | null;
};

function sideOf(started: unknown, submitted: unknown, score: unknown, total: unknown, duration: unknown): Side {
  return {
    phase: phaseOf({ started: !!started, submitted: !!submitted }),
    score: typeof score === "number" ? score : null, total: typeof total === "number" ? total : null, durationSeconds: typeof duration === "number" ? duration : null,
  };
}

function toItem(row: Record<string, unknown>, learnerId: string): ChallengeItem {
  const mine = sideOf(row.my_started_at, row.my_submitted_at, row.my_score, row.my_total, row.my_duration);
  // The classmate's score only exists once the challenge is finished (the query leaves it empty before).
  const theirs = sideOf(row.their_started_at, row.their_submitted_at, row.their_score, row.question_count, row.their_duration);
  const status = challengeStatus({ stored: row.status as string, expiresAt: new Date(row.expires_at as string).getTime(), now: Date.now(), phases: [mine.phase, theirs.phase] });
  let result: ChallengeItem["result"] = null;
  if (status === "finished" && mine.score !== null && theirs.score !== null) {
    const winner = decideWinner({ score: mine.score, total: mine.total ?? 0, durationSeconds: mine.durationSeconds ?? 0 }, { score: theirs.score, total: theirs.total ?? 0, durationSeconds: theirs.durationSeconds ?? 0 });
    result = winner === "draw" ? "draw" : winner === "a" ? "won" : "lost";
  }
  return {
    id: row.id as string, linkId: row.link_id as string, iAmChallenger: row.challenger_id === learnerId,
    subject: row.subject_name as string, subjectSlug: row.subject_slug as string, term: row.term_name as string, count: row.question_count as number, minutes: row.minutes as number,
    status, slot: viewerSlot(status, mine.phase),
    other: { id: row.other_id as string, name: row.other_name as string, classLevel: row.other_class as string },
    expiresAt: toIso(row.expires_at), finishedAt: row.finished_at ? toIso(row.finished_at) : null, createdAt: toIso(row.created_at),
    mine, theirs, result,
  };
}

export async function listChallenges(learnerId: string, limit = 30): Promise<ChallengeItem[]> {
  await settleOverdue(learnerId);
  const rows = await run(sq.challengeListQuery(learnerId, RETENTION_DAYS.finishedChallenges, limit));
  return rows.map((row) => toItem(row, learnerId));
}

export type ReviewItem = { prompt: string; options: string[]; correct: number; mine: number | null; theirs: number | null; explanation?: string };
export type ChallengeDetail = ChallengeItem & { review: ReviewItem[] | null };

const LETTERS = ["A", "B", "C", "D"];

export async function getChallenge(learnerId: string, challengeId: string): Promise<ChallengeDetail | null> {
  if (!isUuid(learnerId) || !isUuid(challengeId)) return null;
  await settleOverdue(learnerId);
  const row = (await run(sq.challengeDetailQuery(learnerId, challengeId)))[0];
  if (!row) return null;
  const item = toItem(row, learnerId);
  let review: ReviewItem[] | null = null;
  if (item.status === "finished" && isFrozenPaper(row.paper)) {
    const picked = (answers: unknown) => new Map((Array.isArray(answers) ? answers : []).map((a: { q?: string; picked?: string | null }) => [a.q, a.picked ? LETTERS.indexOf(a.picked) : -1] as const));
    const mine = picked(row.my_answers);
    const theirs = picked(row.their_answers);
    const index = (map: Map<string | undefined, number>, key: string) => { const value = map.get(key); return value === undefined || value < 0 ? null : value; };
    review = row.paper.map((q: FrozenQuestion) => ({ prompt: q.prompt, options: q.options, correct: q.answer, mine: index(mine, q.key), theirs: index(theirs, q.key), explanation: q.explanation }));
  }
  return { ...item, review };
}

// ---------- Creating, starting, handing in ----------
export async function createChallenge(learnerId: string, input: { linkId: string; subjectSlug: string; termSlug: string; count: number }): Promise<{ id: string } | { error: string }> {
  const link = await getLinkForLearner(learnerId, input.linkId);
  if (!link || link.status !== "active" || !link.otherSwitches.challenges) return { error: "That classmate isn’t available for challenges." };
  const subject = challengeSubjects().find((entry) => entry.slug === input.subjectSlug);
  if (!subject) return { error: "Choose a subject from the list." };
  const termSlug = input.termSlug === "all" ? null : input.termSlug;
  if (termSlug !== null && !subject.terms.some((term) => term.slug === termSlug)) return { error: "Choose a term from the list." };
  if (!LIMITS.challengeCounts.includes(input.count)) return { error: "Choose how many questions from the list." };

  if (PLAN_RANK[await planForLearner(link.other.id)] < PLAN_RANK[CHALLENGE_MIN_PLAN]) return { error: `${link.other.name} can’t take challenges right now.` };
  if (((await run(sq.openBetweenQuery(learnerId, link.other.id)))[0]?.n as number) >= LIMITS.openChallengesPerPair) return { error: `You already have ${LIMITS.openChallengesPerPair} open challenges with ${link.other.name}. Finish or cancel one first.` };
  if (!(await withinLimit({ learnerId }, "challenge", LIMITS.challengesPerLearnerPerDay, 86400))) return { error: "That’s enough challenges for today. Try again tomorrow." };

  const made = makeChallengePaper(subject.slug, termSlug, input.count, randomInt(1, 2 ** 31));
  if ("error" in made) return { error: made.error };
  const row = (await run(sq.createChallengeQuery({
    challengerId: learnerId, opponentId: link.other.id, subjectSlug: subject.slug, subjectName: made.subjectName, termSlug, termName: made.termName,
    count: made.count, minutes: made.count, paperJson: JSON.stringify(made.paper), validDays: LIMITS.challengeValidDays,
  })))[0];
  return row ? { id: row.id as string } : { error: "Could not make the challenge. Try again." };
}

// Starts the clock for this learner (which also accepts, if they were challenged). Safe to repeat.
export async function startChallenge(learnerId: string, challengeId: string): Promise<{ ok: true } | { error: string }> {
  if (!isUuid(challengeId)) return { error: "That challenge isn’t available." };
  await run(startEntryQuery(challengeId, learnerId));
  const play = (await run(sq.playQuery(learnerId, challengeId)))[0];
  return play ? { ok: true } : { error: "This challenge can’t be started. It may have ended, or you may have handed it in already." };
}

// The questions for a player who has started: no answers, plus the seconds left on the server's clock.
export async function getPlay(learnerId: string, challengeId: string): Promise<{ title: string; subject: string; questions: ExamQuestion[]; secondsLeft: number; minutes: number } | null> {
  if (!isUuid(challengeId)) return null;
  const row = (await run(sq.playQuery(learnerId, challengeId)))[0];
  if (!row || !isFrozenPaper(row.paper)) return null;
  return { title: `${row.subject_name} challenge`, subject: row.term_name as string, questions: examQuestions(row.paper), secondsLeft: row.seconds_left as number, minutes: row.minutes as number };
}

// Marks the paper on the server from the frozen answers. The time taken and the lateness rule come from the database.
export async function submitChallenge(learnerId: string, challengeId: string, picks: unknown): Promise<{ ok: true } | { error: string }> {
  if (!isUuid(challengeId)) return { error: "That challenge isn’t available." };
  const row = (await run(sq.playQuery(learnerId, challengeId)))[0];
  if (!row || !isFrozenPaper(row.paper)) return { error: "This challenge isn’t open for you any more. It may already be handed in." };
  const safePicks: Record<string, string> = {};
  if (typeof picks === "object" && picks !== null) {
    for (const [key, value] of Object.entries(picks).slice(0, 100)) if (typeof value === "string" && value.length === 1) safePicks[key] = value;
  }
  const graded = gradePicks(row.paper, safePicks);
  const [handedIn] = await runTogether([
    submitEntryQuery(challengeId, learnerId, graded.score, graded.total, JSON.stringify(graded.answers), LIMITS.gracePeriodSeconds),
    finishChallengeQuery(challengeId),
  ]);
  return handedIn.length ? { ok: true } : { error: "This challenge was already handed in." };
}

export async function declineChallenge(learnerId: string, challengeId: string) {
  return isUuid(challengeId) && (await run(sq.declineChallengeQuery(learnerId, challengeId))).length > 0;
}

export async function cancelChallenge(learnerId: string, challengeId: string) {
  return isUuid(challengeId) && (await run(sq.cancelChallengeQuery(learnerId, challengeId))).length > 0;
}

// ---------- Leaderboard ----------
export type BoardEntry = BoardRow & { rank: number | null; isMe: boolean };

// The learner and their linked classmates, ranked on finished challenges in the last 90 days.
export async function leaderboard(learnerId: string, subjectSlug: string | null): Promise<BoardEntry[]> {
  if (subjectSlug && !challengeSubjects().some((subject) => subject.slug === subjectSlug)) subjectSlug = null;
  const classmates = await listClassmates(learnerId);
  const circle = [learnerId, ...classmates.map((classmate) => classmate.learnerId)];
  const rows = await run(leaderboardQuery(circle, RETENTION_DAYS.leaderboardWindow, subjectSlug));
  const board: BoardRow[] = rows.map((row) => ({
    learnerId: row.learner_id as string, name: row.name as string, classLevel: row.class_level as string,
    played: row.played as number, wins: row.wins as number, draws: row.draws as number, losses: row.losses as number, avgPercent: row.avg_percent as number,
  }));
  return rankBoard(board).map((entry) => ({ ...entry, isMe: entry.learnerId === learnerId }));
}
