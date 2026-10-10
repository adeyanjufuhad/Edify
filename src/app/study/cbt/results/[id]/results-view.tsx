import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Flag } from "@/components/icons";
import Mascot from "@/components/mascot";
import { examGrade } from "@/lib/grades";
import { formatDuration, LETTERS, type AttemptDetail } from "@/lib/cbt";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "wrong", label: "Wrong" },
  { id: "blank", label: "Blank" },
  { id: "flagged", label: "Flagged" },
] as const;
type Filter = (typeof FILTERS)[number]["id"];

const WHEN = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: "Africa/Lagos" });

// The marked paper: grade, score per week and a review of every question.
export default function ResultsView({ attempt, show }: { attempt: AttemptDetail; show?: string | string[] }) {
  const filter: Filter = FILTERS.some((entry) => entry.id === show) ? (show as Filter) : "all";
  const { advice } = examGrade(attempt.percent);
  const answers = attempt.answers.map((answer, index) => ({ ...answer, number: index + 1 }));
  const wrong = answers.filter((answer) => answer.picked && answer.picked !== answer.correct);
  const blank = answers.filter((answer) => !answer.picked);
  const flagged = answers.filter((answer) => answer.flagged);
  const counts: Record<Filter, number> = { all: answers.length, wrong: wrong.length, blank: blank.length, flagged: flagged.length };
  const shown = filter === "wrong" ? wrong : filter === "blank" ? blank : filter === "flagged" ? flagged : answers;

  // Score per week, in the order the weeks come in the term.
  const weeks = attempt.lessons.map((lesson) => {
    const mine = answers.filter((answer) => answer.lesson?.id === lesson.id);
    return { lesson, total: mine.length, score: mine.filter((answer) => answer.picked === answer.correct).length };
  }).filter((week) => week.total > 0);

  // "Take a similar test" rebuilds the same kind of paper with fresh questions and order.
  const again = new URLSearchParams({ mode: attempt.mode, bank: attempt.bankKey, count: String(attempt.total) });
  if (attempt.mode === "week" || attempt.mode === "weeks") again.set("lessons", attempt.lessons.map((lesson) => lesson.id).join(","));
  if (attempt.mode === "midterm" && attempt.lessons.length) {
    again.set("from", String(Math.min(...attempt.lessons.map((lesson) => lesson.from))));
    again.set("to", String(Math.max(...attempt.lessons.map((lesson) => lesson.to))));
  }

  return (
    <div className="page">
      <Link href="/study/cbt" className="text-link small cbt-back"><ArrowLeft size={14} /> All CBT tests</Link>
      <header className="page-head">
        <div>
          <span className="kicker">CBT result{attempt.subject && ` · ${attempt.subject}`}</span>
          <h1>{attempt.title}</h1>
          <p>{WHEN.format(new Date(attempt.createdAt))} · finished in {formatDuration(attempt.durationSeconds)}</p>
        </div>
      </header>

      <section className="cbt-result" aria-labelledby="cbt-score">
        <div className="result-art">
          <Mascot pose={attempt.great ? "cheer" : "think"} className="result-mascot" />
          <div className="grade-badge" data-grade={attempt.grade[0]}><strong>{attempt.grade}</strong><span>{attempt.percent}%</span></div>
        </div>
        <div>
          <h2 id="cbt-score">You scored {attempt.score} out of {attempt.total}.</h2>
          <p>{advice}</p>
          <div className="quiz-result-actions">
            <Link href={`/study/cbt/exam?${again}`} className="pill-button small">Take a similar test <ArrowRight /></Link>
            {wrong.length + blank.length > 0 && <Link href={`?show=${wrong.length ? "wrong" : "blank"}#review`} className="pill-outline small">Review my misses</Link>}
          </div>
        </div>
        <dl className="cbt-tally">
          <div><dt>Correct</dt><dd>{attempt.score}</dd></div>
          <div><dt>Wrong</dt><dd>{wrong.length}</dd></div>
          <div><dt>Blank</dt><dd>{blank.length}</dd></div>
          <div><dt>Time</dt><dd>{formatDuration(attempt.durationSeconds)}</dd></div>
        </dl>
      </section>

      {weeks.length > 0 && (
        <section className="panel" aria-labelledby="cbt-weeks">
          <header className="panel-head"><h2 id="cbt-weeks">Score by week</h2></header>
          <ul className="cbt-week-scores">
            {weeks.map(({ lesson, total, score }) => (
              <li key={lesson.id}>
                <span className="week-tag">{lesson.label.replace("Weeks", "Wks").replace("Week", "Wk")}</span>
                <div className="cbt-week-score-info">
                  <div className="subject-line"><strong>{lesson.topic}</strong><span>{score}/{total}</span></div>
                  <span className={`meter ${score / total < 0.5 ? "is-weak" : ""}`} aria-hidden="true"><span style={{ transform: `scaleX(${score / total})` }} /></span>
                </div>
                <Link href={lesson.href} className="text-link small">Revise<span className="sr-only"> {lesson.label}</span></Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="cbt-review" id="review" aria-labelledby="cbt-review-title">
        <header className="cbt-review-head">
          <h2 id="cbt-review-title">Review every question</h2>
          <nav className="cbt-filters" aria-label="Filter questions">
            {FILTERS.map((entry) => (
              <Link key={entry.id} href={entry.id === "all" ? "?#review" : `?show=${entry.id}#review`} scroll={false} className={filter === entry.id ? "is-on" : ""} aria-current={filter === entry.id ? "true" : undefined}>{entry.label} <span>{counts[entry.id]}</span></Link>
            ))}
          </nav>
        </header>
        {shown.length ? (
          <ol className="cbt-review-list">
            {shown.map((answer) => {
              const question = answer.question;
              const correctIndex = LETTERS.indexOf(answer.correct);
              const status = !answer.picked ? "blank" : answer.picked === answer.correct ? "right" : "wrong";
              return (
                <li key={answer.q} className={`cbt-review-item is-${status}`}>
                  <div className="question-meta">
                    <span>Q{String(answer.number).padStart(2, "0")}</span>
                    <span className={`cbt-verdict is-${status}`}>{status === "right" ? "Correct" : status === "wrong" ? "Wrong" : "Not answered"}</span>
                    {answer.flagged && <span className="cbt-flag-tag"><Flag size={13} /> Flagged</span>}
                    {answer.lesson && <span className="cbt-review-week">{answer.lesson.label}</span>}
                  </div>
                  {question ? <>
                    <h3>{question.prompt}</h3>
                    <ul className="cbt-review-options">
                      {answer.order.split("").map((letter, index) => {
                        const isCorrect = letter === answer.correct;
                        const isPicked = letter === answer.picked;
                        return (
                          <li key={letter} className={isCorrect ? "is-correct" : isPicked ? "is-wrong" : ""}>
                            <b>{LETTERS[index]}</b>
                            <span>{question.options[LETTERS.indexOf(letter as (typeof LETTERS)[number])]}</span>
                            {isCorrect && <em><Check size={14} /> Correct answer</em>}
                            {isPicked && !isCorrect && <em>Your answer</em>}
                          </li>
                        );
                      })}
                    </ul>
                    <div className="answer">
                      <strong>{status === "right" ? "Well done." : `The answer is ${LETTERS[answer.order.indexOf(answer.correct)] ?? answer.correct}: ${question.options[correctIndex]}.`}</strong>
                      {question.explanation && <p>{question.explanation}</p>}
                      {answer.lesson && status !== "right" && <p><Link href={answer.lesson.href} className="text-link small">Revise {answer.lesson.label}: {answer.lesson.topic} <ArrowRight size={14} /></Link></p>}
                    </div>
                  </> : <p className="empty">This question has since been removed from the lessons.</p>}
                </li>
              );
            })}
          </ol>
        ) : <p className="empty cbt-review-empty">{filter === "wrong" ? "No wrong answers. Brilliant!" : filter === "blank" ? "You answered every question." : "You didn’t flag any questions."}</p>}
      </section>
    </div>
  );
}
