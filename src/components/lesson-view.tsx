"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Lesson } from "@/data/lessons/types";

type Props = {
  lesson: Lesson;
  crumbs: string;
  initialCompleted: boolean;
  initialNote: string;
  loadFailed: boolean;
  next: { href: string; label: string } | null;
};

const LETTERS = ["A", "B", "C", "D", "E"];
const AUTOSAVE_DELAY_MS = 1500;

export default function LessonView({ lesson, crumbs, initialCompleted, initialNote, loadFailed, next }: Props) {
  const [complete, setComplete] = useState(initialCompleted);
  const [note, setNote] = useState(initialNote);
  const [saveStatus, setSaveStatus] = useState(loadFailed ? "Your saved notes could not be loaded. Please refresh before writing." : "");
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [shownTheory, setShownTheory] = useState<Set<number>>(new Set());

  const completeRef = useRef(initialCompleted);
  const noteRef = useRef(initialNote);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dirty = useRef(false);
  const flushRef = useRef<() => void>(() => {});

  const objective = lesson.questions.filter((q) => q.kind === "Objective" && q.options);
  const theory = lesson.questions.filter((q) => q.kind === "Theory");
  const answered = objective.filter((q) => picks[q.number]).length;
  const score = objective.filter((q) => picks[q.number] === q.answer).length;
  const allTheoryShown = theory.every((q) => shownTheory.has(q.number));

  function request(nextComplete: boolean, text: string, keepalive = false) {
    return fetch("/api/progress", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      keepalive,
      body: JSON.stringify({ lessonId: lesson.id, completed: nextComplete, notes: text }),
    });
  }

  async function persist(nextComplete: boolean, text: string) {
    clearTimeout(timer.current);
    setSaveStatus("Saving…");
    try {
      const response = await request(nextComplete, text);
      if (!response.ok) throw new Error();
      if (noteRef.current === text) dirty.current = false;
      completeRef.current = nextComplete;
      setComplete(nextComplete);
      setSaveStatus("Saved to your account.");
    } catch {
      setSaveStatus("Could not save. Check your connection and try again.");
    }
  }

  function onNoteChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const text = event.target.value;
    noteRef.current = text;
    dirty.current = true;
    setNote(text);
    setSaveStatus("Unsaved changes…");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => persist(completeRef.current, noteRef.current), AUTOSAVE_DELAY_MS);
  }

  // If the learner leaves the page with an unsaved note, send it before unmounting.
  useEffect(() => {
    flushRef.current = () => {
      clearTimeout(timer.current);
      if (dirty.current) request(completeRef.current, noteRef.current, true).catch(() => {});
    };
  });
  useEffect(() => () => flushRef.current(), []);

  function toggleTheory(number: number) {
    setShownTheory((current) => {
      const copy = new Set(current);
      if (!copy.delete(number)) copy.add(number);
      return copy;
    });
  }

  return (
    <div className="shell lesson-shell">
      <Link href="/study" className="back-link">← Back to study space</Link>
      <div className="lesson-head">
        <span className="section-kicker">{crumbs}</span>
        <h1>{lesson.title}<span>.</span></h1>
        <p>{lesson.subtitle}</p>
        <div className="lesson-head-actions"><a href="#notes" className="button button-red">Read the lesson ↓</a><a href="#practice" className="text-link">Jump to practice →</a></div>
      </div>
      <div className="lesson-columns">
        <aside className="lesson-toc">
          <strong>IN THIS LESSON</strong>
          <a href="#objectives">Learning objectives</a><a href="#notes">Full notes</a><a href="#hidden-facts">Exam tips</a><a href="#summary">Key summary</a>
          <a href="#practice">{lesson.questions.length} practice questions</a><a href="#my-notes">My notes</a>
        </aside>
        <div className="lesson-content">
          <section id="objectives" className="lesson-section">
            <span className="section-kicker">01 / WHAT YOU&apos;LL LEARN</span><h2>Learning objectives</h2>
            <ul className="check-list">{lesson.objectives.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section id="notes" className="lesson-section">
            <span className="section-kicker">02 / THE FULL LESSON</span><h2>Let&apos;s understand it</h2>
            {lesson.sections.map((section) => (
              <article className="note-section" key={section.heading}>
                <h3>{section.heading}</h3>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                {section.diagram && <div className="diagram-description"><strong>Diagram to draw</strong><p>{section.diagram}</p></div>}
              </article>
            ))}
          </section>

          <section id="hidden-facts" className="lesson-section">
            <span className="section-kicker">03 / EXAM SMARTS</span><h2>Hidden facts &amp; exam tips</h2>
            <ol className="tips-list">{lesson.hiddenFacts.map((tip) => <li key={tip}>{tip}</li>)}</ol>
          </section>

          <section id="summary" className="lesson-section summary-box">
            <span className="section-kicker">04 / KEEP THIS IN MIND</span><h2>One-minute recap</h2><p>{lesson.summary}</p>
          </section>

          <section id="practice" className="lesson-section">
            <span className="section-kicker">05 / TEST YOURSELF</span><h2>{lesson.questions.length} WAEC-style questions</h2>
            <p className="practice-intro">Tap an option to check your answer straight away. For the theory questions, write your own answer first, then reveal the model answer.</p>
            <div className="quiz-score" role="status" aria-live="polite">
              <strong>{score} / {objective.length}</strong><span>objective score · {answered} answered</span>
              {answered > 0 && <button type="button" className="text-button" onClick={() => setPicks({})}>Reset quiz</button>}
            </div>
            <div className="questions">
              {lesson.questions.map((q) => {
                const picked = picks[q.number];
                const isTheory = q.kind === "Theory";
                const revealed = isTheory ? shownTheory.has(q.number) : !!picked;
                return (
                  <article className="question-card" key={q.number}>
                    <div className="question-meta"><span>{String(q.number).padStart(2, "0")}</span><span>{q.kind}</span></div>
                    <h3>{q.prompt}</h3>
                    {q.options && (
                      <div className="option-list" role="group" aria-label={`Options for question ${q.number}`}>
                        {q.options.map((option, index) => {
                          const letter = LETTERS[index];
                          const state = !picked ? "" : letter === q.answer ? "is-correct" : letter === picked ? "is-wrong" : "";
                          return (
                            <button type="button" key={option} className={`option-btn ${state}`} disabled={!!picked} onClick={() => setPicks((current) => ({ ...current, [q.number]: letter }))}>
                              <b>{letter}</b><span>{option}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                    {isTheory && <button type="button" className="text-button" aria-expanded={revealed} onClick={() => toggleTheory(q.number)}>{revealed ? "Hide model answer" : "Show model answer"}</button>}
                    {revealed && (
                      <div className="answer">
                        <strong>{isTheory ? "Model answer" : picked === q.answer ? `Correct — ${q.answer}` : `Not quite — the answer is ${q.answer}`}</strong>
                        {isTheory ? <p>{q.answer}</p> : q.explanation && <p>{q.explanation}</p>}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
            <button type="button" className="answer-toggle" onClick={() => setShownTheory(allTheoryShown ? new Set() : new Set(theory.map((q) => q.number)))}>
              {allTheoryShown ? "Hide all theory answers" : "Show all theory answers"}
            </button>
          </section>

          <section id="my-notes" className="lesson-section">
            <span className="section-kicker">06 / YOUR SPACE</span><h2>My notes</h2>
            <p>Write down a question, example, or idea you want to remember. Notes save automatically to your private account, so they are on your other devices too.</p>
            <textarea aria-label="My lesson notes" maxLength={10000} value={note} onChange={onNoteChange} placeholder="What stood out to you?" />
            <div className="note-actions">
              <button type="button" className="answer-toggle" onClick={() => persist(completeRef.current, noteRef.current)}>Save now</button>
              <button type="button" className={`complete-button ${complete ? "completed" : ""}`} onClick={() => persist(!complete, noteRef.current)}>{complete ? "✓ Lesson completed" : "Mark lesson complete"}</button>
            </div>
            <p role="status" className="save-status">{saveStatus}</p>
          </section>

          {next && <Link href={next.href} className="continue-card next-lesson"><span>UP NEXT</span><strong>{next.label}</strong><b aria-hidden="true">→</b></Link>}
          <p className="source-note">{lesson.source}</p>
        </div>
      </div>
    </div>
  );
}
