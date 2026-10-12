import { curriculum, lessonPath, subjectOpenTo, type Subject, type Term, type Week } from "./curriculum";
import { getLesson, lessons } from "./lessons";
import type { Lesson } from "./lessons/types";
import { streamLabel, type StreamId } from "./streams";

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
  likelyQuestions: Object.values(lessons).reduce((sum, lesson) => sum + (lesson.quick?.likely.length ?? 0), 0),
};

// The subjects that have at least one published lesson, for copy that names them.
export const readySubjects = [...new Set(catalog.filter((entry) => entry.ready > 0).map((entry) => entry.subject.name))];
export const listWords = (items: string[]) => new Intl.ListFormat("en-GB", { style: "long", type: "conjunction" }).format(items);

export function plural(count: number, word: string) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

export type LessonEntry = CatalogWeek & { term: Term; subject: Subject; lesson: Lesson };

// Look up where a published lesson lives (term, subject, week, link) from its id.
export const lessonIndex: ReadonlyMap<string, LessonEntry> = new Map(
  catalog.flatMap(({ term, subject, weeks }) => weeks.flatMap((entry) => (entry.lesson ? [[entry.lesson.id, { ...entry, term, subject, lesson: entry.lesson }] as const] : []))),
);

// What one learner can see, by department (stream). Everything that lists subjects or opens a lesson for a
// signed-in learner goes through these, so a subject that is not offered to a department stays out of sight.
export const catalogFor = (stream: StreamId | null | undefined) => catalog.filter((entry) => subjectOpenTo(entry.subject, stream));
export const readyLessonsFor = (stream: StreamId | null | undefined) => catalogFor(stream).reduce((sum, entry) => sum + entry.ready, 0);
export function lessonOpenTo(lessonId: string, stream: StreamId | null | undefined) {
  const entry = lessonIndex.get(lessonId);
  return !!entry && subjectOpenTo(entry.subject, stream);
}

// "Not for Arts" on a subject card, or null when the subject is for every department.
export const notForLabel = (subject: Subject) => subject.excludedStreams?.length ? `Not for ${listWords(subject.excludedStreams.map((id) => streamLabel(id) ?? id))}` : null;

// "Mathematics is for every department except Arts." One sentence per subject that leaves a department out.
export const departmentNotes: string[] = [...new Map(catalog.filter((entry) => entry.subject.excludedStreams?.length).map((entry) => [entry.subject.name, entry.subject] as const)).values()]
  .map((subject) => `${subject.name} is for every department except ${listWords((subject.excludedStreams ?? []).map((id) => streamLabel(id) ?? id))}.`);
