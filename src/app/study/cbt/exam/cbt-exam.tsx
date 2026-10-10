"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowLeft, ArrowRight, Clock, Flag } from "@/components/icons";
import Mascot from "@/components/mascot";
import type { Letter, PaperQuestion } from "@/lib/cbt";
import { submitCbt } from "../actions";

type Props = { title: string; subject: string; questions: PaperQuestion[]; minutes: number; params: string; storageKey: string };
type Saved = { picks: Record<string, Letter>; flags: string[]; current: number; startedAt: number; deadline: number };
type Phase = "running" | "confirm" | "quit" | "saving" | "failed";

const DISPLAY_LETTERS = ["A", "B", "C", "D"];
const noSubscribe = () => () => {};

function loadSession(key: string, minutes: number): Saved {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "null") as Saved | null;
    if (saved && typeof saved.deadline === "number" && typeof saved.startedAt === "number") return { picks: saved.picks ?? {}, flags: saved.flags ?? [], current: saved.current ?? 0, startedAt: saved.startedAt, deadline: saved.deadline };
  } catch {}
  const now = Date.now();
  return { picks: {}, flags: [], current: 0, startedAt: now, deadline: now + minutes * 60_000 };
}

function clock(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = String(seconds % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${s}` : `${String(m).padStart(2, "0")}:${s}`;
}

// The exam needs the device clock and saved answers, so it only renders in the browser.
export default function CbtExam(props: Props) {
  const ready = useSyncExternalStore(noSubscribe, () => true, () => false);
  if (!ready) {
    return (
      <div className="cbt-exam" aria-busy="true">
        <div className="cbt-bar"><div className="cbt-bar-title"><small>{props.subject}</small><strong>{props.title}</strong></div></div>
        <div className="cbt-body"><div className="skeleton-stack"><span className="skeleton h-title w-60" /><span className="skeleton block" /><span className="skeleton block" /></div></div>
      </div>
    );
  }
  return <ExamRunner {...props} />;
}

function ExamRunner({ title, subject, questions, minutes, params, storageKey }: Props) {
  const router = useRouter();
  const [initial] = useState(() => loadSession(storageKey, minutes));
  const [picks, setPicks] = useState(initial.picks);
  const [flags, setFlags] = useState<string[]>(initial.flags);
  const [current, setCurrent] = useState(Math.min(Math.max(initial.current, 0), questions.length - 1));
  const [now, setNow] = useState(() => Date.now());
  const [phase, setPhase] = useState<Phase>("running");
  const [error, setError] = useState("");
  const [timeUp, setTimeUp] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const autoSubmitted = useRef(false);

  const question = questions[current];
  const answered = questions.filter((q) => picks[q.key]).length;
  const flagged = new Set(flags);
  const remaining = Math.max(0, Math.ceil((initial.deadline - now) / 1000));
  const lastStretch = remaining <= 60;
  const warning = remaining === 0 ? "Time is up. Your answers are being handed in." : remaining <= 60 ? "Less than 1 minute left." : remaining <= 300 ? "5 minutes left." : "";
  const locked = timeUp || phase === "saving";

  const submit = useCallback(async () => {
    setPhase("saving");
    setError("");
    const durationSeconds = Math.round((Math.min(Date.now(), initial.deadline) - initial.startedAt) / 1000);
    try {
      const result = await submitCbt({ params, picks, flags, durationSeconds });
      if (!result.id) { setError(result.error ?? "Your answers could not be saved."); setPhase("failed"); return; }
      try { localStorage.removeItem(storageKey); } catch {}
      router.push(`/study/cbt/results/${result.id}`);
    } catch {
      setError("Your answers could not be sent. Check your connection and try again; they are kept on this device.");
      setPhase("failed");
    }
  }, [flags, initial.deadline, initial.startedAt, params, picks, router, storageKey]);

  const submitRef = useRef(submit);
  useEffect(() => { submitRef.current = submit; }, [submit]);

  // Keep answers on this device so a reload or a dropped connection doesn't lose them.
  useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify({ picks, flags, current, startedAt: initial.startedAt, deadline: initial.deadline })); } catch {}
  }, [current, flags, initial.deadline, initial.startedAt, picks, storageKey]);

  // Countdown; hands the paper in by itself when time runs out.
  useEffect(() => {
    const tick = () => {
      const time = Date.now();
      setNow(time);
      if (time >= initial.deadline && !autoSubmitted.current) {
        autoSubmitted.current = true;
        setTimeUp(true);
        void submitRef.current();
      }
    };
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [initial.deadline]);

  // Warn before closing the tab mid-test.
  useEffect(() => {
    if (phase === "saving") return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if ((phase === "confirm" || phase === "quit") && !dialog.open) dialog.showModal();
    if (phase !== "confirm" && phase !== "quit" && dialog.open) dialog.close();
  }, [phase]);

  const choose = useCallback((letter: Letter) => {
    if (locked) return;
    setPicks((currentPicks) => ({ ...currentPicks, [question.key]: letter }));
  }, [locked, question.key]);
  const go = useCallback((index: number) => { setCurrent(Math.min(Math.max(index, 0), questions.length - 1)); }, [questions.length]);
  const toggleFlag = useCallback(() => {
    setFlags((currentFlags) => (currentFlags.includes(question.key) ? currentFlags.filter((key) => key !== question.key) : [...currentFlags, question.key]));
  }, [question.key]);

  // Keyboard shortcuts: A–D answer, N next, P previous, F flag.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (phase !== "running" || locked || event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
      const key = event.key.toLowerCase();
      const index = DISPLAY_LETTERS.indexOf(key.toUpperCase());
      if (index >= 0 && question.options[index]) { event.preventDefault(); choose(question.options[index].letter); }
      else if (key === "n") { event.preventDefault(); go(current + 1); }
      else if (key === "p") { event.preventDefault(); go(current - 1); }
      else if (key === "f") { event.preventDefault(); toggleFlag(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choose, current, go, locked, phase, question.options, toggleFlag]);

  const unanswered = questions.length - answered;

  return (
    <div className="cbt-exam">
      <header className="cbt-bar">
        <div className="cbt-bar-title"><small>{subject}</small><strong>{title}</strong></div>
        <div className={`cbt-timer ${lastStretch ? "is-low" : ""}`} role="timer" aria-label={`Time left ${clock(remaining)}`}><Clock size={18} /><span>{clock(remaining)}</span></div>
        <button type="button" className="pill-button small cbt-submit" disabled={locked} onClick={() => setPhase("confirm")}>Submit</button>
      </header>
      <p className="sr-only" aria-live="polite">{warning}</p>

      {(phase === "failed" || timeUp) && (
        <div className={phase === "failed" ? "form-error cbt-banner" : "form-success cbt-banner"} role={phase === "failed" ? "alert" : "status"}>
          <span>{phase === "failed" ? error : "Time’s up! Handing in your answers…"}</span>
          {phase === "failed" && <button type="button" className="pill-button small" onClick={() => void submit()}>Try again</button>}
        </div>
      )}

      <div className="cbt-body">
        <section className="cbt-question" aria-labelledby="cbt-prompt">
          <div key={question.key} className="cbt-q-swap">
          <div className="cbt-q-meta">
            <span>Question <strong>{current + 1}</strong> of {questions.length}</span>
            {flagged.has(question.key) && <span className="cbt-flag-tag"><Flag size={14} /> Flagged</span>}
          </div>
          <h1 id="cbt-prompt">{question.prompt}</h1>
          <div className="cbt-options" role="group" aria-labelledby="cbt-prompt">
            {question.options.map((option, index) => {
              const selected = picks[question.key] === option.letter;
              return (
                <button type="button" key={option.letter} className={`cbt-option ${selected ? "is-picked" : ""}`} aria-pressed={selected} disabled={locked} onClick={() => choose(option.letter)}>
                  <b aria-hidden="true">{DISPLAY_LETTERS[index]}</b><span><span className="sr-only">Option {DISPLAY_LETTERS[index]}: </span>{option.text}</span>
                </button>
              );
            })}
          </div>
          </div>
          <nav className="cbt-nav" aria-label="Question navigation">
            <button type="button" className="pill-outline small" disabled={current === 0} onClick={() => go(current - 1)}><ArrowLeft /> <span>Previous</span></button>
            <button type="button" className={`cbt-flag-btn ${flagged.has(question.key) ? "is-on" : ""}`} aria-pressed={flagged.has(question.key)} disabled={locked} onClick={toggleFlag}><Flag /> <span>{flagged.has(question.key) ? "Flagged" : "Flag"}</span></button>
            {current < questions.length - 1
              ? <button type="button" className="btn-navy small" onClick={() => go(current + 1)}><span>Next</span> <ArrowRight /></button>
              : <button type="button" className="pill-button small" disabled={locked} onClick={() => setPhase("confirm")}><span>Finish</span> <ArrowRight /></button>}
          </nav>
          <p className="cbt-keys" aria-hidden="true">Keys: <kbd>A</kbd>–<kbd>D</kbd> answer · <kbd>N</kbd> next · <kbd>P</kbd> previous · <kbd>F</kbd> flag</p>
        </section>

        <aside className={`cbt-palette ${paletteOpen ? "is-open" : ""}`} aria-label="All questions">
          <div className="cbt-palette-head">
            <strong>{answered} of {questions.length} answered</strong>
            <button type="button" className="text-button small cbt-palette-toggle" aria-expanded={paletteOpen} aria-controls="cbt-grid" onClick={() => setPaletteOpen((open) => !open)}>{paletteOpen ? "Hide numbers" : "Show all numbers"}</button>
          </div>
          <span className="meter" aria-hidden="true"><span style={{ transform: `scaleX(${answered / questions.length})` }} /></span>
          <ol className="cbt-grid" id="cbt-grid">
            {questions.map((q, index) => {
              const states = [picks[q.key] ? "answered" : "not answered", flagged.has(q.key) ? "flagged" : ""].filter(Boolean).join(", ");
              return (
                <li key={q.key}>
                  <button type="button" className={`cbt-cell ${picks[q.key] ? "is-answered" : ""} ${flagged.has(q.key) ? "is-flagged" : ""} ${index === current ? "is-current" : ""}`} aria-current={index === current ? "step" : undefined} aria-label={`Question ${index + 1}, ${states}`} onClick={() => { go(index); setPaletteOpen(false); }}>{index + 1}</button>
                </li>
              );
            })}
          </ol>
          <ul className="cbt-legend" aria-hidden="true">
            <li><span className="cbt-cell is-answered" />Answered</li>
            <li><span className="cbt-cell" />Not answered</li>
            <li><span className="cbt-cell is-flagged" />Flagged</li>
            <li><span className="cbt-cell is-current" />Current</li>
          </ul>
          <div className="cbt-palette-actions">
            <button type="button" className="pill-button small" disabled={locked} onClick={() => setPhase("confirm")}>Submit test</button>
            <button type="button" className="text-button small" disabled={locked} onClick={() => setPhase("quit")}>Quit without submitting</button>
          </div>
        </aside>
      </div>

      <dialog ref={dialogRef} className="cbt-dialog" aria-labelledby="cbt-dialog-title" onClose={() => setPhase((value) => (value === "confirm" || value === "quit" ? "running" : value))}>
        <Mascot pose="think" className="cbt-dialog-mascot" />
        {phase === "quit" ? <>
          <h2 id="cbt-dialog-title">Quit this test?</h2>
          <p>Your answers won’t be marked or saved. You can start a new test any time.</p>
          <div className="cbt-dialog-actions">
            <button type="button" className="btn-navy small" onClick={() => setPhase("running")} autoFocus>Keep going</button>
            <Link href="/study/cbt" className="pill-outline small" onClick={() => { try { localStorage.removeItem(storageKey); } catch {} }}>Quit test</Link>
          </div>
        </> : <>
          <h2 id="cbt-dialog-title">Are you sure you want to submit?</h2>
          <p>
            You’ve answered <strong>{answered} of {questions.length}</strong>.
            {unanswered > 0 && <> {unanswered} {unanswered === 1 ? "question is" : "questions are"} still blank.</>}
            {flags.length > 0 && <> {flags.length} {flags.length === 1 ? "is" : "are"} flagged to check.</>}
            {" "}Time left: {clock(remaining)}.
          </p>
          <div className="cbt-dialog-actions">
            <button type="button" className="pill-outline small" onClick={() => setPhase("running")} autoFocus>Keep working</button>
            <button type="button" className="pill-button small" onClick={() => void submit()}>Yes, submit</button>
          </div>
        </>}
      </dialog>
    </div>
  );
}
