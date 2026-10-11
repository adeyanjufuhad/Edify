import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "@/components/icons";
import { catalog, plural } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { loadStudy, percent } from "@/lib/study";

type Params = { term: string; subject: string };

const findSubject = (term: string, subject: string) => catalog.find((entry) => entry.term.slug === term && entry.subject.slug === subject);

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { term, subject } = await params;
  const entry = findSubject(term, subject);
  return { title: entry ? `${entry.subject.name} scheme of work — Edify` : "Edify" };
}

// A subject's scheme of work: its week-by-week plan, with the learner's progress, linking to each lesson.
export default async function SchemeOfWorkPage({ params }: { params: Promise<Params> }) {
  const { term: termSlug, subject: subjectSlug } = await params;
  if (!findSubject(termSlug, subjectSlug)) notFound();
  const learner = await requireLearner();
  const { loadFailed, term, subjects, ownClass, contentClass } = await loadStudy(learner.id, learner.classLevel);
  const entry = subjects.find((row) => row.term.slug === termSlug && row.subject.slug === subjectSlug);
  if (!entry) notFound();

  const { subject, weeks, completed, ready } = entry;
  const upNext = weeks.find((row) => row.lesson && !row.completed);

  return (
    <div className="page">
      <Link href="/study/subjects" className="back-link"><ArrowLeft size={15} /> All subjects</Link>
      <header className="page-head">
        <div>
          <span className="kicker">{contentClass} · {term.name} · Scheme of work</span>
          <h1>{subject.name}</h1>
          <p>{ownClass ? `The week-by-week plan for ${term.name.toLowerCase()} ${subject.name}. Work through it in order, and finished lessons stay open for revision.` : `${learner.classLevel} lessons are on the way. You can read ahead with this ${contentClass} ${subject.name} plan.`}</p>
        </div>
        {upNext && <Link href={upNext.href} className="pill-button">{completed ? "Continue" : "Start"}: {upNext.week.label} <ArrowRight /></Link>}
      </header>

      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}

      <section className="panel path-card" aria-labelledby="scheme-title">
        <header className="path-head">
          <span className="subject-symbol" aria-hidden="true">{subject.name[0]}</span>
          <div className="path-title"><h2 id="scheme-title">Week by week</h2><span>{completed} of {plural(weeks.length, "lesson")} done · {percent(completed, weeks.length)}% · {ready} ready</span></div>
          <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${weeks.length ? completed / weeks.length : 0})` }} /></span>
        </header>
        <ol className="path">
          {weeks.map(({ week, lesson, completed: isDone, href }) => {
            const isNext = upNext?.week.slug === week.slug;
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
    </div>
  );
}
