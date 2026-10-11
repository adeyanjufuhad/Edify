"use client";

import { useActionState, useState } from "react";
import { ArrowRight, Calendar, Layers } from "@/components/icons";
import { createChallengeAction, type ActionState } from "../actions";

type Week = { id: string; label: string; topic: string; questions: number };
type Term = { slug: string; name: string; questions: number; weeks: Week[] };
type Subject = { slug: string; name: string; terms: Term[] };
type Props = { classmates: { linkId: string; name: string; classLevel: string }[]; subjects: Subject[]; counts: number[]; initialLink: string; validDays: number };

export default function NewChallengeForm({ classmates, subjects, counts, initialLink, validDays }: Props) {
  const [state, action, pending] = useActionState<ActionState, FormData>(createChallengeAction, {});
  // `?with=` can name a classmate who is no longer on the list (blocked or removed); then start with the first one.
  const [linkId, setLinkId] = useState(classmates.some((entry) => entry.linkId === initialLink) ? initialLink : classmates[0]?.linkId ?? "");
  const [subjectSlug, setSubjectSlug] = useState(subjects[0]?.slug ?? "");
  const subject = subjects.find((entry) => entry.slug === subjectSlug) ?? subjects[0];
  // "All terms" is only offered when more than one term has questions.
  const termChoices: Term[] = subject ? [...(subject.terms.length > 1 ? [{ slug: "all", name: "All terms", questions: subject.terms.reduce((sum, term) => sum + term.questions, 0), weeks: [] }] : []), ...subject.terms] : [];
  const [termSlug, setTermSlug] = useState("");
  const term = termChoices.find((entry) => entry.slug === termSlug) ?? termChoices[0];
  const [cover, setCover] = useState<"term" | "weeks">("term");
  const [picked, setPicked] = useState<string[]>([]);
  const [count, setCount] = useState(counts[1] ?? counts[0] ?? 10);

  const canPickWeeks = !!term && term.slug !== "all" && term.weeks.length > 1;
  const byWeeks = cover === "weeks" && canPickWeeks;
  const available = byWeeks ? term.weeks.filter((week) => picked.includes(week.id)).reduce((sum, week) => sum + week.questions, 0) : term?.questions ?? 0;
  const questions = Math.min(count, available);
  const ready = available >= 5 && (!byWeeks || picked.length > 0);
  const opponent = classmates.find((entry) => entry.linkId === linkId);
  const resetWeeks = () => { setPicked([]); setCover("term"); };

  return (
    <form action={action} className="cbt-setup">
      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">1</span> Who do you challenge?</legend>
        <div className="field">
          <label htmlFor="challenge-who">Classmate</label>
          <select id="challenge-who" name="linkId" value={linkId} onChange={(event) => setLinkId(event.target.value)} required>
            {classmates.map((classmate) => <option key={classmate.linkId} value={classmate.linkId}>{classmate.name} · {classmate.classLevel}</option>)}
          </select>
        </div>
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">2</span> Which subject and term?</legend>
        <div className="cbt-settings">
          <div className="field">
            <label htmlFor="challenge-subject">Subject</label>
            <select id="challenge-subject" name="subject" value={subject?.slug ?? ""} onChange={(event) => { setSubjectSlug(event.target.value); setTermSlug(""); resetWeeks(); }} required>
              {subjects.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="challenge-term">Term</label>
            <select id="challenge-term" name="term" value={term?.slug ?? ""} onChange={(event) => { setTermSlug(event.target.value); resetWeeks(); }} required>
              {termChoices.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name} ({entry.questions} questions)</option>)}
            </select>
            <span className="field-help">{subject && subject.terms.length > 1 ? "Pick one term, or all of them." : "More terms appear here as their lessons are published."}</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">3</span> Which weeks?</legend>
        <div className="cbt-modes">
          <label className={`cbt-mode ${!byWeeks ? "is-on" : ""}`}>
            <input type="radio" name="cover" value="term" checked={!byWeeks} onChange={() => setCover("term")} />
            <span className="cbt-mode-icon"><Layers size={20} /></span>
            <strong>{term?.slug === "all" ? "Every term" : "The whole term"}</strong>
            <small>Questions from every week that is ready.</small>
          </label>
          <label className={`cbt-mode ${byWeeks ? "is-on" : ""} ${canPickWeeks ? "" : "is-disabled"}`}>
            <input type="radio" name="cover" value="weeks" checked={byWeeks} disabled={!canPickWeeks} onChange={() => setCover("weeks")} />
            <span className="cbt-mode-icon"><Calendar size={20} /></span>
            <strong>Choose weeks</strong>
            <small>{canPickWeeks ? "Only the weeks you tick." : "Pick a single term first."}</small>
          </label>
        </div>
        {byWeeks && (
          <>
            <div className="cbt-week-tools">
              <span>{picked.length ? `${picked.length} of ${term.weeks.length} weeks ticked` : "Tick the weeks you have both studied."}</span>
              <button type="button" className="text-button small" onClick={() => setPicked(picked.length === term.weeks.length ? [] : term.weeks.map((week) => week.id))}>{picked.length === term.weeks.length ? "Clear all" : "Tick all"}</button>
            </div>
            <div className="cbt-weeks" role="group" aria-label="Weeks to include">
              {term.weeks.map((week) => (
                <label key={week.id} className="cbt-week">
                  <input type="checkbox" name="lesson" value={week.id} checked={picked.includes(week.id)} onChange={(event) => setPicked((current) => event.target.checked ? [...current, week.id] : current.filter((id) => id !== week.id))} />
                  <span className="week-tag">{week.label.replace("Weeks", "Wks").replace("Week", "Wk")}</span>
                  <span className="cbt-week-topic">{week.topic}</span>
                  <small>{week.questions} questions</small>
                </label>
              ))}
            </div>
          </>
        )}
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">4</span> How many questions?</legend>
        <div className="choice-row" role="radiogroup" aria-label="Number of questions">
          {counts.map((value) => (
            <label key={value} className="choice"><input type="radio" name="count" value={value} checked={count === value} onChange={() => setCount(value)} />{value} questions</label>
          ))}
        </div>
        {ready && available < count && <p className="cbt-summary">Those weeks have {available} questions, so the paper will have {available}.</p>}
      </fieldset>

      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div className="cbt-start">
        <p>
          {opponent ? <><strong>{opponent.name}</strong> gets {validDays} days to start. </> : null}
          {ready ? <>You both get <strong>{questions} questions in {questions} minutes</strong> once you start.</> : null}
          {!ready && <span className="cbt-hint">{byWeeks && !picked.length ? "Tick at least one week." : "There are not enough questions for that choice yet. Add more weeks."}</span>}
        </p>
        <button type="submit" className="pill-button" disabled={pending || !ready || !classmates.length}>{pending ? "Sending…" : <>Send challenge <ArrowRight /></>}</button>
      </div>
    </form>
  );
}
