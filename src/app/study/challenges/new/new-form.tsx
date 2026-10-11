"use client";

import { useActionState, useState } from "react";
import { ArrowRight } from "@/components/icons";
import { createChallengeAction, type ActionState } from "../actions";

type Subject = { slug: string; name: string; terms: { slug: string; name: string; questions: number }[] };
type Props = { classmates: { linkId: string; name: string; classLevel: string }[]; subjects: Subject[]; counts: number[]; initialLink: string; validDays: number };

export default function NewChallengeForm({ classmates, subjects, counts, initialLink, validDays }: Props) {
  const [state, action, pending] = useActionState<ActionState, FormData>(createChallengeAction, {});
  const [linkId, setLinkId] = useState(initialLink || classmates[0]?.linkId || "");
  const [subjectSlug, setSubjectSlug] = useState(subjects[0]?.slug ?? "");
  const subject = subjects.find((entry) => entry.slug === subjectSlug) ?? subjects[0];
  // "All terms" is only offered when more than one term has questions.
  const termChoices = subject ? [...(subject.terms.length > 1 ? [{ slug: "all", name: "All terms", questions: subject.terms.reduce((sum, term) => sum + term.questions, 0) }] : []), ...subject.terms] : [];
  const [termSlug, setTermSlug] = useState("");
  const term = termChoices.find((entry) => entry.slug === termSlug) ?? termChoices[0];
  const [count, setCount] = useState(counts[1] ?? counts[0] ?? 10);
  const enough = (term?.questions ?? 0) >= 5;
  const opponent = classmates.find((entry) => entry.linkId === linkId);

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
            <select id="challenge-subject" name="subject" value={subject?.slug ?? ""} onChange={(event) => { setSubjectSlug(event.target.value); setTermSlug(""); }} required>
              {subjects.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="challenge-term">Term</label>
            <select id="challenge-term" name="term" value={term?.slug ?? ""} onChange={(event) => setTermSlug(event.target.value)} required>
              {termChoices.map((entry) => <option key={entry.slug} value={entry.slug}>{entry.name} ({entry.questions} questions)</option>)}
            </select>
            <span className="field-help">{subject && subject.terms.length > 1 ? "Pick one term, or all of them." : "More terms appear here as their lessons are published."}</span>
          </div>
        </div>
      </fieldset>

      <fieldset className="cbt-step">
        <legend><span className="cbt-step-num">3</span> How many questions?</legend>
        <div className="choice-row" role="radiogroup" aria-label="Number of questions">
          {counts.map((value) => (
            <label key={value} className="choice"><input type="radio" name="count" value={value} checked={count === value} onChange={() => setCount(value)} />{value} questions</label>
          ))}
        </div>
      </fieldset>

      {state.error && <p role="alert" className="form-error">{state.error}</p>}
      <div className="cbt-start">
        <p>
          {opponent ? <><strong>{opponent.name}</strong> gets {validDays} days to start. </> : null}
          You both get <strong>{count} minutes</strong> once you start.
          {!enough && <span className="cbt-hint"> There are not enough questions for that choice yet.</span>}
        </p>
        <button type="submit" className="pill-button" disabled={pending || !enough || !classmates.length}>{pending ? "Sending…" : <>Send challenge <ArrowRight /></>}</button>
      </div>
    </form>
  );
}
