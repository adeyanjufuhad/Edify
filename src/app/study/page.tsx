import Link from "next/link";
import { ArrowRight, Note } from "@/components/icons";
import Mascot from "@/components/mascot";
import { Sparkle, Star } from "@/components/doodles";
import { lessonIndex, plural, totals } from "@/data/catalog";
import { requireLearner } from "@/lib/session";
import { loadStudy, percent } from "@/lib/study";

export const metadata = { title: "Dashboard — Edify" };

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: "Africa/Lagos" }).format(new Date()));
  return hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
}

export default async function DashboardPage() {
  const learner = await requireLearner();
  const { records, loadFailed, term, subjects, rows, upcoming, next, completedCount, ownClass, contentClass } = await loadStudy(learner.id, learner.classLevel);
  const notes = records.filter((record) => record.notes.trim() && lessonIndex.has(record.lessonId));
  const firstName = learner.name.split(" ")[0];
  const readyQuestions = rows.reduce((sum, row) => sum + (row.lesson?.questions.length ?? 0), 0);

  return (
    <div className="page">
      <header className="page-head hello-head">
        <Mascot pose="wave" className="hello-mascot" />
        <div>
          <span className="kicker">{learner.classLevel} · {term.name}</span>
          <h1>{greeting()}, {firstName}! <Star className="hello-star" /></h1>
          <p>{!ownClass ? <>Lessons for {learner.classLevel} are being written. You can get a head start with the {contentClass} lessons that are ready.</> : next ? <>Your next lesson is <strong>{next.week.topic}</strong> in {next.subject.name}.</> : "You’ve finished every lesson that’s ready. New lessons are on the way."}</p>
        </div>
        {ownClass && next && <Link href={next.href} className="pill-button">Continue learning <ArrowRight /></Link>}
      </header>

      {loadFailed && <p role="alert" className="form-error">Your progress could not be loaded. Refresh the page to try again.</p>}

      {!ownClass ? (
        <section className="panel coming-class">
          <Mascot pose="read" className="coming-mascot" />
          <div>
            <span className="kicker">On the way</span>
            <h2>{learner.classLevel} lessons are coming soon.</h2>
            <p>We’re writing and checking lessons for {learner.classLevel} now. They’ll appear on this dashboard automatically. Until then, you can read the {contentClass} lessons that are ready; your notes and ticks are saved as usual.</p>
            <Link href="/study/subjects" className="pill-button">Browse ready lessons <ArrowRight /></Link>
          </div>
        </section>
      ) : <>
      <section className="stat-grid" aria-label="Your progress">
        <div className="stat-tile is-navy">
          <span>Lessons completed</span>
          <strong>{completedCount}<small> / {rows.length}</small></strong>
          <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${rows.length ? completedCount / rows.length : 0})` }} /></span>
        </div>
        <div className="stat-tile"><span>Term progress</span><strong>{percent(completedCount, rows.length)}%</strong><small>of {term.name.toLowerCase()} lessons</small></div>
        <div className="stat-tile"><span>Notes written</span><strong>{notes.length}</strong><small>{notes.length ? "saved to your account" : "add one in any lesson"}</small></div>
        <div className="stat-tile"><span>Practice questions</span><strong>{readyQuestions}</strong><small>across {plural(totals.readyTopics, "ready lesson")}</small></div>
      </section>

      <div className="overview-grid">
        <div className="overview-col">
          {next && (
            <section className="next-card" aria-labelledby="next-title">
              <Sparkle className="next-sparkle" color="#fdf0d5" />
              <span className="next-meta">Up next · {next.subject.name} · {next.week.label}</span>
              <h2 id="next-title">{next.week.topic}</h2>
              <p>{next.lesson?.subtitle}</p>
              <div className="next-actions">
                <Link href={next.href} className="btn-navy">Start lesson <ArrowRight /></Link>
                <span>{next.lesson?.questions.length} practice questions</span>
              </div>
            </section>
          )}

          <section className="panel" aria-labelledby="subjects-title">
            <header className="panel-head"><h2 id="subjects-title">Your subjects</h2><Link href="/study/subjects" className="text-link small">All lessons <ArrowRight size={14} /></Link></header>
            <ul className="subject-list">
              {subjects.map(({ subject, weeks, completed, ready }) => (
                <li key={subject.slug}>
                  <span className="subject-symbol" aria-hidden="true">{subject.name[0]}</span>
                  <div className="subject-info">
                    <div className="subject-line"><strong>{subject.name}</strong><span>{percent(completed, weeks.length)}%</span></div>
                    <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${weeks.length ? completed / weeks.length : 0})` }} /></span>
                    <small>{completed} of {plural(weeks.length, "lesson")} done · {ready} ready</small>
                  </div>
                </li>
              ))}
              <li className="subject-soon"><span className="subject-symbol" aria-hidden="true">+</span><div className="subject-info"><strong>More subjects</strong><small>Appear here as soon as their first lessons are ready.</small></div></li>
            </ul>
          </section>
        </div>

        <div className="overview-col">
          <section className="panel" aria-labelledby="upcoming-title">
            <header className="panel-head"><h2 id="upcoming-title">Coming up</h2></header>
            {upcoming.length ? (
              <ol className="upcoming-list">
                {upcoming.slice(0, 5).map((row) => (
                  <li key={row.href}><Link href={row.href}><span className="week-tag">{row.week.label.replace("Week", "Wk").replace("Weeks", "Wks")}</span><span className="upcoming-topic"><strong>{row.week.topic}</strong><small>{row.subject.name}</small></span><ArrowRight size={16} /></Link></li>
                ))}
              </ol>
            ) : <p className="empty">Nothing left to start. Revisit a lesson and retry its quiz.</p>}
          </section>

          <section className="panel" aria-labelledby="notes-title">
            <header className="panel-head"><h2 id="notes-title">Recent notes</h2>{notes.length > 0 && <Link href="/study/notes" className="text-link small">All notes <ArrowRight size={14} /></Link>}</header>
            {notes.length ? (
              <ul className="note-previews">
                {notes.slice(0, 3).map((record) => {
                  const entry = lessonIndex.get(record.lessonId)!;
                  return <li key={record.lessonId}><Link href={entry.href}><small>{entry.subject.name} · {entry.week.label}</small><strong>{entry.week.topic}</strong><p>{record.notes}</p></Link></li>;
                })}
              </ul>
            ) : (
              <div className="empty"><Note size={22} /><p>Notes you write at the bottom of a lesson appear here, so you can revise them in one place.</p></div>
            )}
          </section>
        </div>
      </div>
      </>}
    </div>
  );
}
