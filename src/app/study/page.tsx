import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { curriculum } from "@/data/curriculum";
import { catalog, plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { getCompletedLessons } from "@/lib/progress";

export const metadata = { title: "My study space — Edify" };

export default async function StudyPage() {
  const learner = await requireLearner();
  let done: string[] = [];
  let loadFailed = false;
  try { done = await getCompletedLessons(learner.id); } catch { loadFailed = true; }

  // Show the first term that has subjects; every subject in it gets its own week list.
  const term = curriculum.find((t) => t.subjects.length) ?? curriculum[0];
  const subjects = catalog.filter((entry) => entry.term.slug === term.slug).map((entry) => ({
    ...entry,
    weeks: entry.weeks.map((row) => ({ ...row, completed: !!row.lesson && done.includes(row.lesson.id) })),
  }));
  const rows = subjects.flatMap((entry) => entry.weeks.map((row) => ({ ...row, subject: entry.subject })));
  const completedCount = rows.filter((row) => row.completed).length;
  const next = rows.find((row) => row.lesson && !row.completed);
  const percent = rows.length ? Math.round((completedCount / rows.length) * 100) : 0;

  return (
    <div className="shell dashboard-content">
      <div className="dashboard-hello">
        <div><span className="kicker">SS1 · BRAINFIELD SCHOOL</span><h1>Keep going, <span className="hl">{learner.name}.</span></h1><p>{next ? `Your next step: ${next.subject.name}, ${next.week.topic}.` : "You’re all caught up. New lessons are on the way."}</p></div>
        <div className="progress-stamp"><strong>{completedCount}</strong><span>of {plural(rows.length, "topic")} done</span></div>
      </div>
      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}
      <div className="progress-track" role="progressbar" aria-label={`${term.name} progress`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><span style={{ width: `${percent}%` }} /></div>
      {next && <Link href={next.href} className="continue-card"><span>CONTINUE WHERE YOU LEFT OFF</span><strong>{next.subject.name} · {next.week.label} · {next.week.topic}</strong><b aria-hidden="true"><ArrowRight size={20} /></b></Link>}
      <div className="dashboard-grid">
        <aside className="study-sidebar"><span className="kicker">YOUR LEARNING PATH</span><h2>SS1</h2>{curriculum.map((t) => <div className={`term-chip ${t.slug === term.slug ? "active" : ""}`} key={t.slug}><span>{t.name}</span><small>{t.subjects.length ? plural(t.subjects.length, "subject") : "Coming soon"}</small></div>)}<p>More terms and subjects will appear here as they are added.</p></aside>
        <div className="study-subjects">
          {subjects.map(({ subject, weeks }, index) => (
            <section className="study-main" key={subject.slug} aria-labelledby={`subject-${subject.slug}`}>
              <div className="study-subject-head"><div className="subject-symbol" aria-hidden="true">{subject.name[0]}</div><div><span>{term.name.toUpperCase()} · SUBJECT {String(index + 1).padStart(2, "0")}</span><h2 id={`subject-${subject.slug}`}>{subject.name}</h2></div></div>
              <p className="study-description">Explore each topic in order. New lessons are added one week at a time.</p>
              <div className="study-week-list">{weeks.map(({ week, lesson, completed, href }) => <div className={`study-week ${lesson ? "is-ready" : ""}`} key={week.slug}><span className="study-week-label">{week.label}</span><strong>{week.topic}</strong>{lesson ? <Link href={href} className={completed ? "status-pill done" : "status-pill ready"} aria-label={`${completed ? "Review" : "Start"} ${week.topic}`}>{completed ? <><Check size={13} /> Review</> : <>Start <ArrowRight size={13} /></>}</Link> : <span className="status-pill">Coming soon</span>}</div>)}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
