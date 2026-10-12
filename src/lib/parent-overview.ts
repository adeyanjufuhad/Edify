import "server-only";
import { lessonOpenTo, readyLessonsFor } from "@/data/catalog";
import type { StreamId } from "@/data/streams";
import { database } from "@/lib/db";
import { examGrade } from "@/lib/grades";
import { RETENTION_DAYS } from "@/lib/social-rules";
import { leaderboardQuery } from "@/lib/social-sql";
import { challengesEnabled } from "@/lib/social/flags";

// What a parent sees on each learner's card on /profiles, without the learner's PIN: lessons completed, the last CBT
// grade, and challenges won in the leaderboard window. One query per kind for all learners together. Each kind fails
// on its own, so one missing piece (for example the classmate tables) never hides the others:
// null for lessonsDone, and cbtLoaded false, mean that part could not be loaded (the card leaves it out).
export type LearnerOverview = {
  lessonsDone: number | null;
  lessonsTotal: number;
  lastCbt: { grade: string; percent: number; at: string } | null;
  cbtLoaded: boolean;
  challenges: { played: number; wins: number; days: number } | null;
};

const DAY = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "Africa/Lagos" });

type Row = Record<string, unknown>;

async function rows(text: string, params: unknown[]): Promise<Row[] | null> {
  try {
    return (await database().query(text, params)) as Row[];
  } catch {
    return null;
  }
}

// Each learner's lesson total and count only cover the subjects offered to their department (stream).
export async function learnerOverviews(learners: { id: string; stream: StreamId | null }[]): Promise<Record<string, LearnerOverview>> {
  if (!learners.length) return {};
  const learnerIds = learners.map((learner) => learner.id);
  const streams = new Map(learners.map((learner) => [learner.id, learner.stream] as const));
  const windowDays = RETENTION_DAYS.leaderboardWindow;
  const board = challengesEnabled() ? leaderboardQuery(learnerIds, windowDays, null) : null;
  const [lessons, attempts, played] = await Promise.all([
    // lesson_progress.user_id is text; the ids are the learners' own (from learner_profiles of this parent).
    rows("select user_id, lesson_id from public.lesson_progress where completed and user_id = any($1::text[])", [learnerIds]),
    rows(`select distinct on (learner_id) learner_id, score, total, created_at from public.cbt_attempts
      where learner_id = any($1::uuid[]) order by learner_id, created_at desc`, [learnerIds]),
    // Only when the classmate features are on; the query fails (null) where their tables don't exist.
    board ? rows(board.text, board.params) : Promise.resolve(null),
  ]);

  const out: Record<string, LearnerOverview> = {};
  for (const learner of learners) out[learner.id] = { lessonsDone: lessons ? 0 : null, lessonsTotal: readyLessonsFor(learner.stream), lastCbt: null, cbtLoaded: attempts !== null, challenges: null };
  // Only lessons that are still published and offered to the learner's department count, so the number never passes the total.
  for (const row of lessons ?? []) {
    const entry = out[String(row.user_id)];
    if (entry && entry.lessonsDone !== null && lessonOpenTo(String(row.lesson_id), streams.get(String(row.user_id)))) entry.lessonsDone += 1;
  }
  for (const row of attempts ?? []) {
    const entry = out[String(row.learner_id)];
    const total = Number(row.total);
    if (!entry || !total) continue;
    const percent = Math.round((Number(row.score) / total) * 100);
    entry.lastCbt = { grade: examGrade(percent).grade, percent, at: DAY.format(new Date(row.created_at as string)) };
  }
  for (const row of played ?? []) {
    const entry = out[String(row.learner_id)];
    if (entry) entry.challenges = { played: Number(row.played), wins: Number(row.wins), days: windowDays };
  }
  return out;
}
