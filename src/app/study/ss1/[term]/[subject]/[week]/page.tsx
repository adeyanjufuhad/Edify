import { notFound } from "next/navigation";
import LessonView from "@/components/lesson-view";
import { curriculum, lessonPath } from "@/data/curriculum";
import { getLesson } from "@/data/lessons";
import { requireLearner } from "@/lib/session";
import { getProgress } from "@/lib/progress";

type Params = { term: string; subject: string; week: string };

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { term, subject, week } = await params;
  const lesson = getLesson(term, subject, week);
  return { title: lesson ? `${lesson.title} — Edify` : "Edify" };
}

export default async function LessonPage({ params }: { params: Promise<Params> }) {
  const { term, subject, week } = await params;
  const lesson = getLesson(term, subject, week);
  if (!lesson) notFound();
  const learner = await requireLearner();

  let record = null;
  let loadFailed = false;
  try { record = await getProgress(learner.id, lesson.id); } catch { loadFailed = true; }

  const termData = curriculum.find((t) => t.slug === term)!;
  const subjectData = termData.subjects.find((s) => s.slug === subject)!;
  const weekIndex = subjectData.weeks.findIndex((w) => w.slug === week);
  const nextWeek = subjectData.weeks.slice(weekIndex + 1).find((w) => getLesson(term, subject, w.slug));
  const crumbs = `SS1 / ${termData.name} / ${subjectData.name} / ${lesson.week}`.toUpperCase();

  return (
    <LessonView
      lesson={lesson}
      crumbs={crumbs}
      initialCompleted={record?.completed ?? false}
      initialNote={record?.notes ?? ""}
      loadFailed={loadFailed}
      next={nextWeek ? { href: lessonPath(termData, subjectData, nextWeek), label: nextWeek.topic } : null}
    />
  );
}
