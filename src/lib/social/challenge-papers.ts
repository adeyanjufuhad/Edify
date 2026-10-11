import "server-only";
import { LETTERS, buildPaper, cbtBanks, type CbtBank } from "@/lib/cbt";
import type { FrozenQuestion } from "@/lib/social-rules";

// Challenge papers are built by the CBT engine (seeded, shuffled, spread across the lessons) and then frozen: the
// questions, option order and answers are copied into the challenge, so both players always get the same paper.

const split = (bank: CbtBank) => {
  const [termSlug, subjectSlug] = bank.key.split("/");
  return { termSlug, subjectSlug };
};

const questionByKey = new Map(cbtBanks.flatMap((bank) => bank.lessons.flatMap((lesson) => lesson.questions.map((question) => [question.key, question] as const))));

export type WeekOption = { id: string; label: string; topic: string; questions: number };
export type SubjectOption = { slug: string; name: string; terms: { slug: string; name: string; questions: number; weeks: WeekOption[] }[] };

// The subjects that have lessons with questions, and the terms of each. Computed from the lessons, never hard-coded.
export function challengeSubjects(): SubjectOption[] {
  const subjects = new Map<string, SubjectOption>();
  for (const bank of cbtBanks) {
    const { termSlug, subjectSlug } = split(bank);
    const entry = subjects.get(subjectSlug) ?? { slug: subjectSlug, name: bank.subject, terms: [] };
    entry.terms.push({
      slug: termSlug, name: bank.term, questions: bank.lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0),
      weeks: bank.lessons.map((lesson) => ({ id: lesson.id, label: lesson.label, topic: lesson.topic, questions: lesson.questions.length })),
    });
    subjects.set(subjectSlug, entry);
  }
  return [...subjects.values()];
}

export type MadePaper = { paper: FrozenQuestion[]; subjectName: string; termName: string; count: number };

// "Weeks 1, 3, 4–5" from the lessons chosen, in the order they come in the term.
function weeksLabel(lessons: { from: number; to: number }[]) {
  const parts = lessons.map(({ from, to }) => (from === to ? `${from}` : `${from}–${to}`));
  return `${lessons.length === 1 && lessons[0].from === lessons[0].to ? "Week" : "Weeks"} ${parts.join(", ")}`;
}

// `termSlug` null means every term of the subject that has questions (only offered when there are at least two).
// `lessonIds` narrows a single term to the weeks the learner ticked; empty means the whole term.
export function makeChallengePaper(subjectSlug: string, termSlug: string | null, wantedCount: number, seed: number, lessonIds: string[] = []): MadePaper | { error: string } {
  const banks = cbtBanks.filter((bank) => split(bank).subjectSlug === subjectSlug && (termSlug === null || split(bank).termSlug === termSlug));
  if (!banks.length) return { error: "There are no questions for that subject and term yet." };
  if (termSlug === null && banks.length < 2) return { error: "Choose a term: this subject only has questions for one term so far." };
  let lessons = banks.flatMap((bank) => bank.lessons);
  if (lessonIds.length) {
    if (termSlug === null) return { error: "Choose one term to pick weeks from." };
    const wanted = new Set(lessonIds);
    lessons = lessons.filter((lesson) => wanted.has(lesson.id));
    if (lessons.length !== wanted.size) return { error: "Choose weeks from the list." };
  }
  const available = lessons.reduce((sum, lesson) => sum + lesson.questions.length, 0);
  const count = Math.min(wantedCount, available);
  if (count < 5) return { error: "There are not enough questions for that choice yet." };

  // The database keeps up to 80 characters for this label.
  const fullName = termSlug === null ? "All terms" : lessonIds.length ? `${banks[0].term} · ${weeksLabel(lessons)}` : banks[0].term;
  const termName = fullName.length > 80 ? `${fullName.slice(0, 79)}…` : fullName;
  const merged: CbtBank = { key: `${termSlug ?? "all"}/${subjectSlug}`, subject: banks[0].subject, term: banks[0].term, lessons };
  const questions = buildPaper({ bank: merged, mode: "term", lessons, range: null, count, shuffle: true, minutes: count, seed });

  const paper: FrozenQuestion[] = [];
  for (const question of questions) {
    const original = questionByKey.get(question.key);
    if (!original) continue;
    // Relabel the options A to D in the order shown, and remember which position is right.
    const answer = question.options.findIndex((option) => option.letter === original.answer);
    if (answer < 0) continue;
    paper.push({ key: question.key, prompt: question.prompt, options: question.options.map((option) => option.text), answer, ...(original.explanation ? { explanation: original.explanation } : {}) });
  }
  return paper.length >= 5 ? { paper, subjectName: banks[0].subject, termName, count: paper.length } : { error: "There are not enough questions for that choice yet." };
}

// What the browser gets to answer: the questions and options, never the answers.
export type ExamQuestion = { key: string; prompt: string; options: { letter: (typeof LETTERS)[number]; text: string }[] };

export function examQuestions(paper: FrozenQuestion[]): ExamQuestion[] {
  return paper.map((question) => ({ key: question.key, prompt: question.prompt, options: question.options.map((text, index) => ({ letter: LETTERS[index], text })) }));
}

export function isFrozenPaper(value: unknown): value is FrozenQuestion[] {
  return Array.isArray(value) && value.every((q) => q && typeof q.key === "string" && typeof q.prompt === "string" && Array.isArray(q.options) && q.options.length === 4 && typeof q.answer === "number" && q.answer >= 0 && q.answer < 4);
}
