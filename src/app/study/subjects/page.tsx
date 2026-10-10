import Link from "next/link";
import { ArrowRight, Check } from "@/components/icons";
import { curriculum } from "@/data/curriculum";
import { plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { loadStudy, percent } from "@/lib/study";

export const metadata = { title: "Subjects & lessons — Edify" };

export default async function SubjectsPage() {
  const learner = await requireLearner();
  const { loadFailed, term, subjects, next, ownClass, contentClass } = await loadStudy(learner.id, learner.classLevel);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <span className="kicker">{contentClass} · {term.name}</span>
          <h1>Subjects &amp; lessons</h1>
          <p>{ownClass ? "Work through each subject week by week. Finished lessons stay open for revision." : `${learner.classLevel} lessons are on the way. These ${contentClass} lessons are ready to read now.`}</p>
        </div>
      </header>

      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}

      <nav className="term-tabs" aria-label="Terms">
        {curriculum.map((t) => {
          const active = t.slug === term.slug;
          return <span key={t.slug} className={`term-tab ${active ? "active" : ""}`} aria-current={active ? "true" : undefined}>{t.name}<small>{t.subjects.length ? plural(t.subjects.length, "subject") : "Soon"}</small></span>;
        })}
      </nav>

      <div className="path-grid">
        {subjects.map(({ subject, weeks, completed }) => (
          <section className="panel path-card" key={subject.slug} aria-labelledby={`subject-${subject.slug}`}>
            <header className="path-head">
              <span className="subject-symbol" aria-hidden="true">{subject.name[0]}</span>
              <div className="path-title"><h2 id={`subject-${subject.slug}`}>{subject.name}</h2><span>{completed} of {plural(weeks.length, "lesson")} done · {percent(completed, weeks.length)}%</span></div>
              <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${weeks.length ? completed / weeks.length : 0})` }} /></span>
            </header>
            <ol className="path">
              {weeks.map(({ week, lesson, completed: isDone, href }) => {
                const isNext = next?.week.slug === week.slug && next.subject.slug === subject.slug;
                const state = isDone ? "done" : isNext ? "next" : lesson ? "ready" : "soon";
                const body = <>
                  <span className="path-node" aria-hidden="true">{isDone ? <Check size={13} /> : null}</span>
                  <span className="path-week">{week.label}</span>
                  <span className="path-topic">{week.topic}</span>
                  <span className="path-action">{isDone ? "Review" : isNext ? "Up next" : lesson ? "Start" : "Coming soon"}{lesson && <ArrowRight size={14} />}</span>
                </>;
                return <li key={week.slug} className={`path-step is-${state}`}>{lesson ? <Link href={href} aria-label={`${isDone ? "Review" : "Start"} ${week.label}: ${week.topic}`}>{body}</Link> : <div>{body}</div>}</li>;
              })}
            </ol>
          </section>
        ))}
        <aside className="panel path-more">
          <span className="kicker">More on the way</span>
          <h2>New subjects appear here.</h2>
          <p>As soon as the first lessons of another subject or class are ready, they get their own path on this page.</p>
        </aside>
      </div>
    </div>
  );
}
