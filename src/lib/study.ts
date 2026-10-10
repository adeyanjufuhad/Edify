import { CURRICULUM_CLASS, curriculum } from "@/data/curriculum";
import { catalog } from "@/data/catalog";
import { getLearnerRecords, type LessonRecord } from "@/lib/progress";

// Everything the study pages need about one learner: their saved records and per-subject progress
// for the current term (the first term that has subjects). `ownClass` is false while the learner's
// class has no lessons yet; the lessons that do exist (CURRICULUM_CLASS) are still returned to browse.
export async function loadStudy(learnerId: string, classLevel: string) {
  let records: LessonRecord[] = [];
  let loadFailed = false;
  try { records = await getLearnerRecords(learnerId); } catch { loadFailed = true; }

  const done = new Set(records.filter((record) => record.completed).map((record) => record.lessonId));
  const term = curriculum.find((t) => t.subjects.length) ?? curriculum[0];
  const subjects = catalog.filter((entry) => entry.term.slug === term.slug).map((entry) => {
    const weeks = entry.weeks.map((row) => ({ ...row, completed: !!row.lesson && done.has(row.lesson.id) }));
    return { ...entry, weeks, completed: weeks.filter((row) => row.completed).length };
  });
  const rows = subjects.flatMap((entry) => entry.weeks.map((row) => ({ ...row, subject: entry.subject })));
  const upcoming = rows.filter((row) => row.lesson && !row.completed);

  return { records, loadFailed, term, subjects, rows, upcoming, next: upcoming[0], completedCount: rows.filter((row) => row.completed).length, ownClass: classLevel === CURRICULUM_CLASS, contentClass: CURRICULUM_CLASS };
}

export function percent(part: number, whole: number) {
  return whole ? Math.round((part / whole) * 100) : 0;
}
