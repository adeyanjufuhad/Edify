import { curriculum, lessonPath, type Subject, type Term, type Week } from "./curriculum";
import { getLesson, lessons } from "./lessons";
import type { Lesson } from "./lessons/types";

export type CatalogWeek = { week: Week; lesson: Lesson | undefined; href: string };
export type CatalogSubject = { term: Term; subject: Subject; weeks: CatalogWeek[]; ready: number };

// Every subject in the curriculum (all terms), with the weeks that already have a published lesson.
export const catalog: CatalogSubject[] = curriculum.flatMap((term) => term.subjects.map((subject) => {
  const weeks = subject.weeks.map((week) => ({ week, lesson: getLesson(term.slug, subject.slug, week.slug), href: lessonPath(term, subject, week) }));
  return { term, subject, weeks, ready: weeks.filter((entry) => entry.lesson).length };
}));

export const totals = {
  topics: catalog.reduce((sum, entry) => sum + entry.weeks.length, 0),
  readyTopics: catalog.reduce((sum, entry) => sum + entry.ready, 0),
  readySubjects: catalog.filter((entry) => entry.ready > 0).length,
  questions: Object.values(lessons).reduce((sum, lesson) => sum + lesson.questions.length, 0),
};

export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export type LessonEntry = CatalogWeek & { term: Term; subject: Subject; lesson: Lesson };

// Look up where a published lesson lives (term, subject, week, link) from its id.
export const lessonIndex: ReadonlyMap<string, LessonEntry> = new Map(
  catalog.flatMap(({ term, subject, weeks }) => weeks.flatMap((entry) => (entry.lesson ? [[entry.lesson.id, { ...entry, term, subject, lesson: entry.lesson }] as const] : []))),
);
