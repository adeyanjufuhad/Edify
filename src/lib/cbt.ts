import { catalog } from "@/data/catalog";
import { database } from "@/lib/db";
import { examGrade } from "@/lib/grades";

// Computer-based tests built from the objective questions of the published lessons.
// Server only: answers never go to the browser. A paper is fully described by its settings
// (mode, lessons, count, shuffle, time, seed), so the server rebuilds the same paper to grade it.

export const CBT_MODES = { week: "Single week", weeks: "Chosen weeks", term: "Whole term", midterm: "Mid-term test" } as const;
export type CbtMode = keyof typeof CBT_MODES;
export const LETTERS = ["A", "B", "C", "D"] as const;
export type Letter = (typeof LETTERS)[number];

const MAX_MINUTES = 180;
const MIDTERM_DEFAULT: [number, number] = [1, 6];
const DEFAULT_COUNT: Record<CbtMode, number> = { week: 20, weeks: 30, term: 40, midterm: 30 };
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type BankQuestion = { key: string; number: number; prompt: string; options: string[]; answer: Letter; explanation?: string };
export type BankLesson = { id: string; label: string; topic: string; href: string; from: number; to: number; questions: BankQuestion[] };
export type CbtBank = { key: string; subject: string; term: string; lessons: BankLesson[] };

// "week-3" -> [3, 3], "weeks-4-5" -> [4, 5]
function weekSpan(slug: string): [number, number] {
  const match = /^weeks?-(\d+)(?:-(\d+))?$/.exec(slug);
  const from = match ? Number(match[1]) : 0;
  return [from, match?.[2] ? Number(match[2]) : from];
}

const isLetter = (value: unknown): value is Letter => typeof value === "string" && (LETTERS as readonly string[]).includes(value);

export const cbtBanks: CbtBank[] = catalog.flatMap(({ term, subject, weeks }) => {
  const lessons = weeks.flatMap(({ week, lesson, href }) => {
    if (!lesson) return [];
    const questions = lesson.questions
      .filter((q) => q.kind === "Objective" && q.options?.length === LETTERS.length && isLetter(q.answer))
      .map((q) => ({ key: `${lesson.id}#${q.number}`, number: q.number, prompt: q.prompt, options: q.options!, answer: q.answer as Letter, explanation: q.explanation }));
    const [from, to] = weekSpan(week.slug);
    return questions.length ? [{ id: lesson.id, label: week.label, topic: week.topic, href, from, to, questions }] : [];
  });
  return lessons.length ? [{ key: `${term.slug}/${subject.slug}`, subject: subject.name, term: term.name, lessons }] : [];
});

const questionIndex = new Map(cbtBanks.flatMap((bank) => bank.lessons.flatMap((lesson) => lesson.questions.map((q) => [q.key, { q, lesson }] as const))));
const lessonIndex = new Map(cbtBanks.flatMap((bank) => bank.lessons.map((lesson) => [lesson.id, { lesson, bank }] as const)));

// What the setup screen needs (no questions or answers).
export function bankSummaries() {
  return cbtBanks.map(({ key, subject, term, lessons }) => ({
    key, subject, term,
    lessons: lessons.map(({ id, label, topic, from, to, questions }) => ({ id, label, topic, from, to, count: questions.length })),
  }));
}
export type BankSummary = ReturnType<typeof bankSummaries>[number];

export type PaperSpec = { bank: CbtBank; mode: CbtMode; lessons: BankLesson[]; range: [number, number] | null; count: number; shuffle: boolean; minutes: number; seed: number };

function intParam(params: URLSearchParams, name: string) {
  const value = params.get(name);
  return value && /^\d{1,10}$/.test(value) ? Number(value) : null;
}

// Reads a paper's settings from the exam URL. Missing count/time fall back to the defaults.
export function parsePaperSpec(params: URLSearchParams): PaperSpec | { error: string } {
  const mode = params.get("mode");
  if (!mode || !(mode in CBT_MODES)) return { error: "Choose a test type." };
  const bank = cbtBanks.find((entry) => entry.key === params.get("bank")) ?? cbtBanks[0];
  if (!bank) return { error: "No lessons are ready for tests yet." };

  let lessons: BankLesson[] = [];
  let range: [number, number] | null = null;
  if (mode === "week" || mode === "weeks") {
    const ids = new Set((params.get("lessons") ?? "").split(",").filter(Boolean));
    lessons = bank.lessons.filter((lesson) => ids.has(lesson.id));
    if (mode === "week" && lessons.length !== 1) return { error: "Choose one week for a single-week test." };
    if (mode === "weeks" && lessons.length < 1) return { error: "Choose at least one week." };
  } else if (mode === "term") {
    lessons = bank.lessons;
  } else {
    const from = intParam(params, "from") ?? MIDTERM_DEFAULT[0];
    const to = intParam(params, "to") ?? MIDTERM_DEFAULT[1];
    if (from < 1 || to < from) return { error: "Choose a week range where the first week comes before the last." };
    range = [from, to];
    lessons = bank.lessons.filter((lesson) => lesson.from <= to && lesson.to >= from);
    if (!lessons.length) return { error: "No lessons are ready in that week range yet." };
  }

  const available = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);
  const count = Math.min(Math.max(intParam(params, "count") ?? DEFAULT_COUNT[mode as CbtMode], 1), available);
  const minutes = Math.min(Math.max(intParam(params, "minutes") ?? count, 1), MAX_MINUTES);
  const seed = intParam(params, "seed") ?? 0;
  return { bank, mode: mode as CbtMode, lessons, range, count, shuffle: params.get("shuffle") !== "0", minutes, seed: seed >>> 0 };
}

// The canonical query string for a paper; parsing it again gives the same spec.
export function specParams(spec: PaperSpec) {
  const params = new URLSearchParams({ mode: spec.mode, bank: spec.bank.key });
  if (spec.mode === "week" || spec.mode === "weeks") params.set("lessons", spec.lessons.map((lesson) => lesson.id).join(","));
  if (spec.range) { params.set("from", String(spec.range[0])); params.set("to", String(spec.range[1])); }
  params.set("count", String(spec.count));
  params.set("shuffle", spec.shuffle ? "1" : "0");
  params.set("minutes", String(spec.minutes));
  params.set("seed", String(spec.seed));
  return params.toString();
}

// Small seeded random number generator (mulberry32), so the same seed always builds the same paper.
function random(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(items: readonly T[], next: () => number) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// The questions a learner sees: options are listed in display order, each tagged with its original letter.
export type PaperQuestion = { key: string; lessonId: string; prompt: string; options: { letter: Letter; text: string }[] };

// Picks `count` questions spread across the chosen lessons in proportion to their size, then
// orders them (shuffled, or by week and question number) and shuffles options when asked.
export function buildPaper(spec: PaperSpec): PaperQuestion[] {
  const next = random(spec.seed);
  const pools = spec.lessons.map((lesson) => shuffled(lesson.questions, next));
  const available = pools.reduce((sum, pool) => sum + pool.length, 0);
  const shares = pools.map((pool) => (pool.length * spec.count) / available);
  const take = shares.map(Math.floor);
  const byRemainder = shares.map((share, index) => [share - Math.floor(share), index] as const).sort((a, b) => b[0] - a[0]);
  for (let i = 0, left = spec.count - take.reduce((a, b) => a + b, 0); left > 0; i++) {
    const index = byRemainder[i % byRemainder.length][1];
    if (take[index] < pools[index].length) { take[index]++; left--; }
  }

  let picked = pools.flatMap((pool, index) => pool.slice(0, take[index]).map((q) => ({ q, lesson: spec.lessons[index] })));
  picked = spec.shuffle ? shuffled(picked, next) : picked.sort((a, b) => spec.lessons.indexOf(a.lesson) - spec.lessons.indexOf(b.lesson) || a.q.number - b.q.number);
  return picked.map(({ q, lesson }) => {
    const options = q.options.map((text, index) => ({ letter: LETTERS[index], text }));
    return { key: q.key, lessonId: lesson.id, prompt: q.prompt, options: spec.shuffle ? shuffled(options, next) : options };
  });
}

function joinWeeks(lessons: { from: number; to: number }[]) {
  return lessons.map(({ from, to }) => (from === to ? `${from}` : `${from}–${to}`)).join(", ");
}

// Titles name the weeks a paper actually covers (a Weeks 1–6 mid-term includes the "Weeks 06–07" lesson).
export function paperTitle(mode: CbtMode, lessons: BankLesson[]) {
  if (!lessons.length) return CBT_MODES[mode];
  if (mode === "week") return `${lessons[0].label} · ${lessons[0].topic}`;
  if (mode === "weeks") return `${lessons.length === 1 ? "Week" : "Weeks"} ${joinWeeks(lessons)}`;
  if (mode === "term") return "Whole term";
  return `Mid-term test · Weeks ${Math.min(...lessons.map((l) => l.from))}–${Math.max(...lessons.map((l) => l.to))}`;
}

export type AttemptAnswer = { q: string; picked: Letter | null; correct: Letter; flagged: boolean; order: string };
export type Submission = { params: string; picks: Record<string, string>; flags: string[]; durationSeconds: number };

// Rebuilds the paper from its settings and marks it. The browser only sends the settings and the picks.
export function gradeSubmission(input: Submission) {
  const spec = parsePaperSpec(new URLSearchParams(input.params));
  if ("error" in spec) return { error: spec.error };
  const paper = buildPaper(spec);
  const flags = new Set(Array.isArray(input.flags) ? input.flags : []);
  const answers: AttemptAnswer[] = paper.map(({ key, options }) => {
    const picked = input.picks?.[key];
    return { q: key, picked: isLetter(picked) ? picked : null, correct: questionIndex.get(key)!.q.answer, flagged: flags.has(key), order: options.map((option) => option.letter).join("") };
  });
  const limit = spec.minutes * 60;
  const duration = Number.isFinite(input.durationSeconds) ? Math.round(input.durationSeconds) : limit;
  return {
    mode: spec.mode,
    lessonIds: spec.lessons.map((lesson) => lesson.id),
    total: answers.length,
    score: answers.filter((answer) => answer.picked === answer.correct).length,
    durationSeconds: Math.min(Math.max(duration, 0), limit + 60),
    answers,
  };
}

export async function saveAttempt(learnerId: string, attempt: Exclude<ReturnType<typeof gradeSubmission>, { error: string }>) {
  const rows = await database()`insert into public.cbt_attempts (learner_id, mode, lesson_ids, total, score, duration_seconds, answers)
    values (${learnerId}, ${attempt.mode}, ${attempt.lessonIds}, ${attempt.total}, ${attempt.score}, ${attempt.durationSeconds}, ${JSON.stringify(attempt.answers)}::jsonb)
    returning id`;
  return rows[0].id as string;
}

export type AttemptSummary = { id: string; mode: CbtMode; title: string; subject: string; bankKey: string; total: number; score: number; percent: number; grade: string; great: boolean; durationSeconds: number; createdAt: string; lessons: BankLesson[] };

function toSummary(row: Record<string, unknown>): AttemptSummary {
  const mode = (row.mode as string) in CBT_MODES ? (row.mode as CbtMode) : "term";
  const found = (row.lesson_ids as string[]).flatMap((id) => lessonIndex.get(id) ?? []);
  const lessons = found.map(({ lesson }) => lesson);
  const total = row.total as number;
  const score = row.score as number;
  const percent = total ? Math.round((score / total) * 100) : 0;
  const { grade, great } = examGrade(percent);
  return {
    id: row.id as string, mode, title: paperTitle(mode, lessons), subject: found[0] ? `${found[0].bank.subject} · ${found[0].bank.term}` : "", bankKey: found[0]?.bank.key ?? "",
    total, score, percent, grade, great, durationSeconds: row.duration_seconds as number, createdAt: new Date(row.created_at as string).toISOString(), lessons,
  };
}

export async function listAttempts(learnerId: string, limit = 5): Promise<AttemptSummary[]> {
  const rows = await database()`select id, mode, lesson_ids, total, score, duration_seconds, created_at from public.cbt_attempts
    where learner_id = ${learnerId} order by created_at desc limit ${limit}`;
  return rows.map(toSummary);
}

// One attempt with every question looked up again, for the results page.
export async function getAttempt(learnerId: string, attemptId: string) {
  if (!UUID_PATTERN.test(attemptId)) return null;
  const rows = await database()`select id, mode, lesson_ids, total, score, duration_seconds, created_at, answers from public.cbt_attempts
    where id = ${attemptId} and learner_id = ${learnerId}`;
  return rows[0] ? attemptFromRow(rows[0]) : null;
}

// Joins a stored attempt back to its questions. A question removed from the lessons since still shows, without its text.
export function attemptFromRow(row: Record<string, unknown>) {
  const answers = (row.answers as AttemptAnswer[]).map((answer) => {
    const entry = questionIndex.get(answer.q);
    return { ...answer, question: entry?.q ?? null, lesson: entry?.lesson ?? null };
  });
  return { ...toSummary(row), answers };
}
export type AttemptDetail = ReturnType<typeof attemptFromRow>;

export function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return minutes ? `${minutes} min ${String(seconds % 60).padStart(2, "0")} s` : `${seconds} s`;
}
