import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { curriculum } from "@/data/curriculum";
import { catalog, plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { getCompletedLessons } from "@/lib/progress";

export const metadata = { title: "My study space — Edify" };

const RING_RADIUS = 52;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

export default async function StudyPage() {
  const learner = await requireLearner();
  let done: string[] = [];
  let loadFailed = false;
  try { done = await getCompletedLessons(learner.id); } catch { loadFailed = true; }

  // Show the first term that has subjects; every subject in it gets its own learning path.
  const term = curriculum.find((t) => t.subjects.length) ?? curriculum[0];
  const subjects = catalog.filter((entry) => entry.term.slug === term.slug).map((entry) => {
    const weeks = entry.weeks.map((row) => ({ ...row, completed: !!row.lesson && done.includes(row.lesson.id) }));
    return { ...entry, weeks, completed: weeks.filter((row) => row.completed).length };
  });
  const rows = subjects.flatMap((entry) => entry.weeks.map((row) => ({ ...row, subject: entry.subject })));
  const completedCount = rows.filter((row) => row.completed).length;
  const next = rows.find((row) => row.lesson && !row.completed);
  const percent = rows.length ? Math.round((completedCount / rows.length) * 100) : 0;
  const firstName = learner.name.split(" ")[0];

  return (
    <div className="shell dashboard-content">
      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}

      <section className="dash-hero">
        <div className="dash-greeting">
          <span className="kicker">SS1 · {term.name.toUpperCase()}</span>
          <h1>Keep going, <span className="hl">{firstName}.</span></h1>
          {next ? (
            <>
              <p>Your next step is <strong>{next.week.topic}</strong> in {next.subject.name}.</p>
              <Link href={next.href} className="pill-button">Continue {next.week.label} <ArrowRight /></Link>
            </>
          ) : (
            <p>You’ve finished every lesson that’s ready. New lessons are on the way, so use the time to retry a quiz.</p>
          )}
        </div>
        <div className="dash-ring" role="img" aria-label={`${completedCount} of ${rows.length} topics done, ${percent}%`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r={RING_RADIUS} className="ring-track" />
            <circle cx="60" cy="60" r={RING_RADIUS} className="ring-fill" strokeDasharray={RING_LENGTH} strokeDashoffset={RING_LENGTH * (1 - percent / 100)} />
          </svg>
          <div className="ring-label"><strong>{percent}%</strong><span>{completedCount} of {plural(rows.length, "topic")}</span></div>
        </div>
      </section>

      <nav className="term-tabs" aria-label="Terms">
        {curriculum.map((t) => {
          const active = t.slug === term.slug;
          return <span key={t.slug} className={`term-tab ${active ? "active" : ""}`} aria-current={active ? "true" : undefined}>{t.name}<small>{t.subjects.length ? plural(t.subjects.length, "subject") : "Soon"}</small></span>;
        })}
      </nav>

      <div className="path-grid">
        {subjects.map(({ subject, weeks, completed }) => (
          <section className="path-card" key={subject.slug} aria-labelledby={`subject-${subject.slug}`}>
            <header className="path-head">
              <div className="subject-symbol" aria-hidden="true">{subject.name[0]}</div>
              <div className="path-title"><h2 id={`subject-${subject.slug}`}>{subject.name}</h2><span>{completed} of {plural(weeks.length, "topic")} done</span></div>
              <span className="path-meter" aria-hidden="true"><span style={{ transform: `scaleX(${weeks.length ? completed / weeks.length : 0})` }} /></span>
            </header>
            <ol className="path">
              {weeks.map(({ week, lesson, completed: isDone, href }) => {
                const isNext = next?.week.slug === week.slug && next.subject.slug === subject.slug;
                const state = isDone ? "done" : isNext ? "next" : lesson ? "ready" : "soon";
                const body = <><span className="path-node" aria-hidden="true">{isDone && <Check size={13} />}</span><span className="path-week">{week.label}</span><span className="path-topic">{week.topic}</span><span className="path-action">{isDone ? "Review" : isNext ? "Up next" : lesson ? "Start" : "Coming soon"}{lesson && <ArrowRight size={13} />}</span></>;
                return (
                  <li key={week.slug} className={`path-step is-${state}`}>
                    {lesson ? <Link href={href} aria-label={`${isDone ? "Review" : "Start"} ${week.label}: ${week.topic}`}>{body}</Link> : <div>{body}</div>}
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
        <aside className="path-card path-more">
          <span className="kicker">MORE ON THE WAY</span>
          <h2>New subjects appear here.</h2>
          <p>As soon as the first lessons of another subject are ready, it gets its own path on this page.</p>
        </aside>
      </div>
    </div>
  );
}
