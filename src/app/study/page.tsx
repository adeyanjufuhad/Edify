import Link from "next/link";
import { curriculum, lessonPath } from "@/data/curriculum";
import { getLesson } from "@/data/lessons";
import { requireLearner } from "@/lib/auth/session";
import { getCompletedLessons } from "@/lib/progress";

export const metadata = { title: "My study space — Edify" };

export default async function StudyPage() {
  const learner = await requireLearner();
  let done: string[] = [];
  let loadFailed = false;
  try { done = await getCompletedLessons(learner.id); } catch { loadFailed = true; }

  const term = curriculum[0];
  const subject = term.subjects[0];
  const rows = subject.weeks.map((week) => {
    const lesson = getLesson(term.slug, subject.slug, week.slug);
    return { week, lesson, completed: !!lesson && done.includes(lesson.id), href: lessonPath(term, subject, week) };
  });
  const completedCount = rows.filter((row) => row.completed).length;
  const next = rows.find((row) => row.lesson && !row.completed);
  const percent = Math.round((completedCount / rows.length) * 100);

  return (
    <div className="shell dashboard-content">
      <div className="dashboard-hello">
        <div><span className="section-kicker">SS1 · BRAINFIELD SCHOOL</span><h1>Keep going, <em>{learner.name}.</em></h1><p>{next ? `Your next step: ${next.week.topic}.` : "You're all caught up. New lessons are on the way."}</p></div>
        <div className="progress-stamp"><strong>{completedCount}</strong><span>of {rows.length} topics done</span></div>
      </div>
      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Try refreshing the page.</p>}
      <div className="progress-track" role="progressbar" aria-label="Chemistry progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
      {next && <Link href={next.href} className="continue-card"><span>CONTINUE WHERE YOU LEFT OFF</span><strong>{next.week.label} · {next.week.topic}</strong><b aria-hidden="true">→</b></Link>}
      <div className="dashboard-grid">
        <aside className="study-sidebar"><span className="panel-overline">YOUR LEARNING PATH</span><h2>SS1</h2>{curriculum.map((t) => <div className={`term-chip ${t.slug === term.slug ? "active" : ""}`} key={t.slug}><span>{t.name}</span><small>{t.subjects.length ? `${t.subjects.length} subject` : "Coming soon"}</small></div>)}<p>More terms and subjects will appear here as they are added.</p></aside>
        <section className="study-main">
          <div className="study-subject-head"><div className="subject-symbol">C</div><div><span>{term.name.toUpperCase()} · SUBJECT 01</span><h2>{subject.name}</h2></div></div>
          <p className="study-description">Explore each topic in order. New lessons are added one week at a time.</p>
          <div className="study-week-list">{rows.map(({ week, lesson, completed, href }) => <div className={`study-week ${lesson ? "is-ready" : ""}`} key={week.slug}><span className="study-week-label">{week.label}</span><strong>{week.topic}</strong>{lesson ? <Link href={href}>{completed ? "✓ Review lesson" : "Start lesson"} →</Link> : <span className="coming-label">Coming soon</span>}</div>)}</div>
        </section>
      </div>
    </div>
  );
}
