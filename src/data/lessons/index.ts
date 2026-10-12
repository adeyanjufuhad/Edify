import type { Lesson } from "./types";
import { week1 } from "./week-1";
import { week2 } from "./week-2";
import { week3 } from "./week-3";
import { weeks45 } from "./weeks-4-5";
import { weeks67 } from "./weeks-6-7";
import { week8 } from "./week-8";
import { week9 } from "./week-9";
import { week10 } from "./week-10";
import { week11 } from "./week-11";
import { week12 } from "./week-12";
import { week13 } from "./week-13";
import { bioWeek1 } from "./biology/week-1";
import { bioWeek2 } from "./biology/week-2";
import { bioWeeks34 } from "./biology/weeks-3-4";
import { bioWeek5 } from "./biology/week-5";
import { bioWeek6 } from "./biology/week-6";
import { bioWeeks78 } from "./biology/weeks-7-8";
import { bioWeek9 } from "./biology/week-9";
import { bioWeek10 } from "./biology/week-10";
import { bioWeek11 } from "./biology/week-11";
import { phyWeek1 } from "./physics/week-1";
import { phyWeek2 } from "./physics/week-2";
import { phyWeek3 } from "./physics/week-3";
import { phyWeek4 } from "./physics/week-4";
import { phyWeek5 } from "./physics/week-5";
import { phyWeek6 } from "./physics/week-6";
import { phyWeek7 } from "./physics/week-7";
import { phyWeek8 } from "./physics/week-8";
import { phyWeek9 } from "./physics/week-9";
import { phyWeek10 } from "./physics/week-10";
import { phyWeek11 } from "./physics/week-11";
import { phyWeeks1213 } from "./physics/weeks-12-13";

// To publish a lesson: create its data file, then register it here under
// "<term>/<subject>/<week slug>" (the slugs used in src/data/curriculum.ts).
export const lessons: Record<string, Lesson> = {
  "first-term/biology/week-1": bioWeek1,
  "first-term/biology/week-2": bioWeek2,
  "first-term/biology/weeks-3-4": bioWeeks34,
  "first-term/biology/week-5": bioWeek5,
  "first-term/biology/week-6": bioWeek6,
  "first-term/biology/weeks-7-8": bioWeeks78,
  "first-term/biology/week-9": bioWeek9,
  "first-term/biology/week-10": bioWeek10,
  "first-term/biology/week-11": bioWeek11,
  "first-term/chemistry/week-1": week1,
  "first-term/chemistry/week-2": week2,
  "first-term/chemistry/week-3": week3,
  "first-term/chemistry/weeks-4-5": weeks45,
  "first-term/chemistry/weeks-6-7": weeks67,
  "first-term/chemistry/week-8": week8,
  "first-term/chemistry/week-9": week9,
  "first-term/chemistry/week-10": week10,
  "first-term/chemistry/week-11": week11,
  "first-term/chemistry/week-12": week12,
  "first-term/chemistry/week-13": week13,
  "first-term/physics/week-1": phyWeek1,
  "first-term/physics/week-2": phyWeek2,
  "first-term/physics/week-3": phyWeek3,
  "first-term/physics/week-4": phyWeek4,
  "first-term/physics/week-5": phyWeek5,
  "first-term/physics/week-6": phyWeek6,
  "first-term/physics/week-7": phyWeek7,
  "first-term/physics/week-8": phyWeek8,
  "first-term/physics/week-9": phyWeek9,
  "first-term/physics/week-10": phyWeek10,
  "first-term/physics/week-11": phyWeek11,
  "first-term/physics/weeks-12-13": phyWeeks1213,
};

export const lessonIds: ReadonlySet<string> = new Set(Object.values(lessons).map((lesson) => lesson.id));

export function lessonKey(term: string, subject: string, week: string) {
  return `${term}/${subject}/${week}`;
}

export function getLesson(term: string, subject: string, week: string): Lesson | undefined {
  return lessons[lessonKey(term, subject, week)];
}
