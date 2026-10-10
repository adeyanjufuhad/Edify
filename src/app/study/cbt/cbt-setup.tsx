"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Clock, Flag, Layers, Target } from "@/components/icons";
import type { BankSummary, CbtMode } from "@/lib/cbt";

const MODES: { id: CbtMode; label: string; text: string; icon: typeof Target }[] = [
  { id: "week", label: "Single week", text: "Test yourself on one week.", icon: Target },
  { id: "weeks", label: "Choose weeks", text: "Mix any weeks you pick.", icon: Layers },
  { id: "term", label: "Whole term", text: "Every week that’s ready.", icon: Flag },
  { id: "midterm", label: "Mid-term test", text: "Weeks 1–6, or your own range.", icon: Clock },
];
const DEFAULT_COUNT: Record<CbtMode, number> = { week: 20, weeks: 30, term: 40, midterm: 30 };
const COUNT_PRESETS = [5, 10, 20, 30, 40, 60, 80];

export default function CbtSetup({ banks }: { banks: BankSummary[] }) {
  const router = useRouter();
  const [bankKey, setBankKey] = useState(banks[0]?.key ?? "");
  const bank = banks.find((entry) => entry.key === bankKey) ?? banks[0];
  const lastWeek = Math.max(...bank.lessons.map((lesson) => lesson.to));
  const [mode, setMode] = useState<CbtMode>("week");
  const [single, setSingle] = useState(bank.lessons[0]?.id ?? "");
  const [chosen, setChosen] = useState<string[]>([]);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(Math.min(6, lastWeek));
  const [countChoice, setCountChoice] = useState<number | null>(null);
  const [minutesChoice, setMinutesChoice] = useState<number | null>(null);
  const [shuffle, setShuffle] = useState(true);
  const [starting, setStarting] = useState(false);

  const lessons = mode === "week" ? bank.lessons.filter((lesson) => lesson.id === single)
    : mode === "weeks" ? bank.lessons.filter((lesson) => chosen.includes(lesson.id))
    : mode === "term" ? bank.lessons
    : bank.lessons.filter((lesson) => lesson.from <= to && lesson.to >= from);
  const available = lessons.reduce((sum, lesson) => sum + lesson.count, 0);
  const count = Math.min(countChoice ?? DEFAULT_COUNT[mode], available);
  const minutes = minutesChoice ?? Math.max(count, 1);
  const presets = [...COUNT_PRESETS.filter((value) => value < available), available].filter((value) => value > 0);
  const problem = mode === "weeks" && !chosen.length ? "Tick at least one week." : mode === "midterm" && from > to ? "The first week must come before the last week." : !available ? "No questions are ready for that choice yet." : "";

  function start(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (problem) return;
    setStarting(true);
    const params = new URLSearchParams({ mode, bank: bank.key });
    if (mode === "week" || mode === "weeks") params.set("lessons", lessons.map((lesson) => lesson.id).join(","));
    if (mode === "midterm") { params.set("from", String(from)); params.set("to", String(to)); }
    params.set("count", String(count));
    params.set("shuffle", shuffle ? "1" : "0");
    params.set("minutes", String(minutes));
    params.set("seed", String(crypto.getRandomValues(new Uint32Array(1))[0] || 1));
    router.push(`/study/cbt/exam?${params}`);
  }

  const weekOptions = Array.from({ length: lastWeek }, (_, index) => index + 1);

  return (
    <form className="cbt-setup" onSubmit={start}>
      {banks.length > 1 && (
        <div className="field">
          <label htmlFor="cbt-bank">Subject</label>
          <select id="cbt-bank" value={bankKey} onChange={(event) => { setBankKey(event.target.value); setChosen([]); setSingle(banks.find((entry) => entry.key === event.target.value)?.lessons[0]?.id ?? ""); }}>
            {banks.map((entry) => <option key={entry.key} value={entry.key}>{entry.subject} · {entry.term}</option>)}
          </select>
        </div>
      )}

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">1</span>Choose a test</legend>
        <div className="cbt-modes">
          {MODES.map(({ id, label, text, icon: Icon }) => (
            <label key={id} className={`cbt-mode ${mode === id ? "is-on" : ""}`}>
              <input type="radio" name="mode" value={id} checked={mode === id} onChange={() => { setMode(id); setCountChoice(null); setMinutesChoice(null); }} />
              <span className="cbt-mode-icon" aria-hidden="true"><Icon size={20} /></span>
              <strong>{label}</strong>
              <small>{text}</small>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">2</span>{mode === "week" ? "Pick the week" : mode === "weeks" ? "Tick the weeks" : mode === "term" ? "What’s included" : "Set the week range"}</legend>
        {mode === "week" && (
          <div className="cbt-weeks">
            {bank.lessons.map((lesson) => (
              <label key={lesson.id} className="cbt-week">
                <input type="radio" name="week" value={lesson.id} checked={single === lesson.id} onChange={() => setSingle(lesson.id)} />
                <span className="week-tag">{lesson.label.replace("Weeks", "Wks").replace("Week", "Wk")}</span>
                <span className="cbt-week-topic">{lesson.topic}</span>
                <small>{lesson.count} Qs</small>
              </label>
            ))}
          </div>
        )}
        {mode === "weeks" && <>
          <div className="cbt-week-tools">
            <span>{chosen.length} of {bank.lessons.length} weeks ticked</span>
            <button type="button" className="text-button small" onClick={() => setChosen(chosen.length === bank.lessons.length ? [] : bank.lessons.map((lesson) => lesson.id))}>{chosen.length === bank.lessons.length ? "Clear all" : "Tick all"}</button>
          </div>
          <div className="cbt-weeks">
            {bank.lessons.map((lesson) => (
              <label key={lesson.id} className="cbt-week">
                <input type="checkbox" name="weeks" value={lesson.id} checked={chosen.includes(lesson.id)} onChange={(event) => setChosen((current) => (event.target.checked ? [...current, lesson.id] : current.filter((id) => id !== lesson.id)))} />
                <span className="week-tag">{lesson.label.replace("Weeks", "Wks").replace("Week", "Wk")}</span>
                <span className="cbt-week-topic">{lesson.topic}</span>
                <small>{lesson.count} Qs</small>
              </label>
            ))}
          </div>
        </>}
        {mode === "term" && <p className="cbt-summary">All {bank.lessons.length} ready weeks of {bank.subject}, {bank.term}: {available} questions to draw from.</p>}
        {mode === "midterm" && <>
          <div className="cbt-range">
            <div className="field">
              <label htmlFor="cbt-from">From week</label>
              <select id="cbt-from" value={from} onChange={(event) => setFrom(Number(event.target.value))}>{weekOptions.map((week) => <option key={week} value={week}>Week {week}</option>)}</select>
            </div>
            <div className="field">
              <label htmlFor="cbt-to">To week</label>
              <select id="cbt-to" value={to} onChange={(event) => setTo(Number(event.target.value))}>{weekOptions.map((week) => <option key={week} value={week}>Week {week}</option>)}</select>
            </div>
          </div>
          {from <= to && <p className="cbt-summary">Covers {lessons.length ? lessons.map((lesson) => lesson.label).join(", ") : "no ready lessons"}.</p>}
        </>}
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">3</span>Exam settings</legend>
        <div className="cbt-settings">
          <div className="field">
            <label htmlFor="cbt-count">Number of questions</label>
            <select id="cbt-count" value={count} disabled={!available} onChange={(event) => setCountChoice(Number(event.target.value))}>
              {presets.map((value) => <option key={value} value={value}>{value === available ? `All ${value}` : value}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="cbt-minutes">Time (minutes)</label>
            <input id="cbt-minutes" type="number" inputMode="numeric" min={1} max={180} value={minutes} onChange={(event) => setMinutesChoice(event.target.value ? Math.min(Math.max(Number(event.target.value), 1), 180) : null)} aria-describedby="cbt-minutes-help" />
            <span className="field-help" id="cbt-minutes-help">{minutesChoice === null ? "About 1 minute per question." : <button type="button" className="text-button small" onClick={() => setMinutesChoice(null)}>Use 1 minute per question</button>}</span>
          </div>
          <label className="cbt-switch">
            <input type="checkbox" checked={shuffle} onChange={(event) => setShuffle(event.target.checked)} />
            <span className="cbt-switch-track" aria-hidden="true" />
            <span><strong>Shuffle</strong><small>Mix up the questions and the A–D options.</small></span>
          </label>
        </div>
      </fieldset>

      <div className="cbt-start">
        <p aria-live="polite">{problem ? <span className="cbt-hint">{problem}</span> : <><strong>{count} questions</strong> · {minutes} min{shuffle ? " · shuffled" : ""}</>}</p>
        <button type="submit" className="pill-button" disabled={!!problem || starting}>{starting ? "Starting…" : "Start test"} <ArrowRight /></button>
      </div>
    </form>
  );
}
