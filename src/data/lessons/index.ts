import type { Lesson } from "./types";
import { week1 } from "./week-1";
import { week2 } from "./week-2";
import { week3 } from "./week-3";
import { weeks45 } from "./weeks-4-5";

// To publish a lesson: create its data file, then register it here under
// "<term>/<subject>/<week slug>" (the slugs used in src/data/curriculum.ts).
export const lessons: Record<string, Lesson> = {
  "first-term/chemistry/week-1": week1,
  "first-term/chemistry/week-2": week2,
  "first-term/chemistry/week-3": week3,
  "first-term/chemistry/weeks-4-5": weeks45,
};

export const lessonIds: ReadonlySet<string> = new Set(Object.values(lessons).map((lesson) => lesson.id));

export function lessonKey(term: string, subject: string, week: string) {
  return `${term}/${subject}/${week}`;
}

export function getLesson(term: string, subject: string, week: string): Lesson | undefined {
  return lessons[lessonKey(term, subject, week)];
}
