import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { curriculum, type Subject, type Term } from "@/data/curriculum";
import { plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { loadStudy, percent } from "@/lib/study";

export const metadata = { title: "Subjects & lessons — Edify" };

// Each subject's scheme of work (its week-by-week plan) lives one level down.
const schemePath = (term: Term, subject: Subject) => `/study/ss1/${term.slug}/${subject.slug}`;

export default async function SubjectsPage() {
  const learner = await requireLearner();
  const { loadFailed, term, subjects, ownClass, contentClass } = await loadStudy(learner.id, learner.classLevel);

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <span className="kicker">{contentClass} · {term.name}</span>
          <h1>Subjects &amp; lessons</h1>
          <p>{ownClass ? "Pick a subject to see its scheme of work, the week-by-week plan, and open any lesson." : `${learner.classLevel} lessons are on the way. These ${contentClass} subjects are ready to read now. Pick one to see its scheme of work.`}</p>
        </div>
      </header>

      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}

      <nav className="term-tabs" aria-label="Terms">
        {curriculum.map((t) => {
          const active = t.slug === term.slug;
          return <span key={t.slug} className={`term-tab ${active ? "active" : ""}`} aria-current={active ? "true" : undefined}>{t.name}<small>{t.subjects.length ? plural(t.subjects.length, "subject") : "Soon"}</small></span>;
        })}
      </nav>

      <ul className="subject-cards" aria-label={`${term.name} subjects`}>
        {subjects.map(({ term: subjectTerm, subject, weeks, completed, ready }) => {
          const upNext = weeks.find((row) => row.lesson && !row.completed);
          const allDone = ready > 0 && !upNext;
          return (
            <li key={subject.slug}>
              <article className="panel subject-card">
                <header className="subject-card-head">
                  <span className="subject-symbol" aria-hidden="true">{subject.name[0]}</span>
                  <div className="subject-card-title">
                    <h2><Link href={schemePath(subjectTerm, subject)} className="subject-link">{subject.name}<span className="sr-only"> scheme of work</span></Link></h2>
                    <span>{completed} of {plural(weeks.length, "lesson")} done · {percent(completed, weeks.length)}%</span>
                  </div>
                </header>
                <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${weeks.length ? completed / weeks.length : 0})` }} /></span>
                <p className="subject-next">
                  <small>{upNext ? "Up next" : allDone ? "All done" : "Coming soon"}</small>
                  <strong>{upNext ? `${upNext.week.label} · ${upNext.week.topic}` : allDone ? "Every lesson is finished. Review any week whenever you like." : "The first lessons are being written."}</strong>
                </p>
                <span className="subject-card-action">Open scheme of work <ArrowRight size={14} /></span>
              </article>
            </li>
          );
        })}
        <li>
          <aside className="panel subject-more">
            <span className="kicker">More on the way</span>
            <h2>New subjects appear here.</h2>
            <p>As soon as the first lessons of another subject or class are ready, they get their own card on this page.</p>
          </aside>
        </li>
      </ul>
    </div>
  );
}
