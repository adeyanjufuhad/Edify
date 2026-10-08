"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { week1 } from "@/data/lessons/week-1";
import { authClient, displayName } from "@/lib/auth/client";

export default function WeekOnePage() {
  const router = useRouter();
  const [learner, setLearner] = useState<string | null>(null);
  const [complete, setComplete] = useState(false);
  const [note, setNote] = useState("");
  const [openAnswers, setOpenAnswers] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  useEffect(() => {
    authClient.getSession().then(async ({ data }) => {
      if (!data?.user) { router.replace("/login"); return; }
      setLearner(displayName(data.user.name));
      try { const response = await fetch(`/api/progress?lessonId=${encodeURIComponent(week1.id)}`); if (!response.ok) throw new Error(); const { record } = await response.json(); setComplete(record?.completed || false); setNote(record?.notes || ""); }
      catch { setSaveStatus("Your saved notes could not be loaded. Please refresh."); }
    });
  }, [router]);
  async function save(nextComplete = complete) {
    setSaveStatus("Saving…");
    try { const response = await fetch("/api/progress", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId: week1.id, completed: nextComplete, notes: note }) }); if (!response.ok) throw new Error(); setComplete(nextComplete); setSaveStatus("Saved to your account."); }
    catch { setSaveStatus("Could not save. Check your connection and try again."); }
  }
  if (!learner) return <main className="account-page" />;
  return <main className="lesson-page"><header className="site-header shell"><Link href="/" className="brand"><span className="brand-mark">e.</span><span>edify<span className="brand-period">.</span></span></Link><div className="dashboard-nav"><span className="nav-avatar">{learner[0]}</span><span>{learner}</span><button onClick={async () => { await authClient.signOut(); router.push("/login"); }}>Log out</button></div></header>
    <div className="shell lesson-shell"><Link href="/study" className="back-link">← Back to study space</Link><div className="lesson-head"><span className="section-kicker">SS1 / FIRST TERM / CHEMISTRY / {week1.week.toUpperCase()}</span><h1>{week1.title}<span>.</span></h1><p>{week1.subtitle}</p><div className="lesson-head-actions"><a href="#notes" className="button button-red">Read the lesson ↓</a><a href="#practice" className="text-link">Jump to practice →</a></div></div>
      <div className="lesson-columns"><aside className="lesson-toc"><strong>IN THIS LESSON</strong><a href="#objectives">Learning objectives</a><a href="#notes">Full notes</a><a href="#hidden-facts">Exam tips</a><a href="#summary">Key summary</a><a href="#practice">30 practice questions</a><a href="#my-notes">My notes</a></aside><div className="lesson-content">
        <section id="objectives" className="lesson-section"><span className="section-kicker">01 / WHAT YOU&apos;LL LEARN</span><h2>Learning objectives</h2><ul className="check-list">{week1.objectives.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section id="notes" className="lesson-section"><span className="section-kicker">02 / THE FULL LESSON</span><h2>Let&apos;s understand it</h2>{week1.sections.map((section) => <article className="note-section" key={section.heading}><h3>{section.heading}</h3>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}{section.diagram && <div className="diagram-description"><strong>Diagram to draw</strong><p>{section.diagram}</p></div>}</article>)}</section>
        <section id="hidden-facts" className="lesson-section"><span className="section-kicker">03 / EXAM SMARTS</span><h2>Hidden facts & exam tips</h2><ol className="tips-list">{week1.hiddenFacts.map((tip) => <li key={tip}>{tip}</li>)}</ol></section>
        <section id="summary" className="lesson-section summary-box"><span className="section-kicker">04 / KEEP THIS IN MIND</span><h2>One-minute recap</h2><p>{week1.summary}</p></section>
        <section id="practice" className="lesson-section"><span className="section-kicker">05 / TEST YOURSELF</span><h2>30 WAEC-style questions</h2><p className="practice-intro">Try each one before revealing the answer. Questions 1–20 are objective; 21–30 are theory.</p><button className="answer-toggle" onClick={() => setOpenAnswers(!openAnswers)}>{openAnswers ? "Hide all answers" : "Show all answers"}</button><div className="questions">{week1.questions.map((q) => <article className="question-card" key={q.number}><div className="question-meta"><span>{String(q.number).padStart(2, "0")}</span><span>{q.kind}</span></div><h3>{q.prompt}</h3>{q.options && <ol className="options" type="A">{q.options.map((option) => <li key={option}>{option}</li>)}</ol>}{openAnswers && <div className="answer"><strong>Answer: {q.answer}</strong>{q.explanation && <p>{q.explanation}</p>}</div>}</article>)}</div></section>
        <section id="my-notes" className="lesson-section"><span className="section-kicker">06 / YOUR SPACE</span><h2>My notes</h2><p>Write down a question, example, or idea you want to remember. Save it to your private account so it is available on your other devices.</p><textarea aria-label="My lesson notes" value={note} onChange={(event) => { setNote(event.target.value); setSaveStatus(""); }} placeholder="What stood out to you?" /><div className="note-actions"><button className="answer-toggle" onClick={() => save()}>Save notes</button><button className={`complete-button ${complete ? "completed" : ""}`} onClick={() => save(!complete)}>{complete ? "✓ Lesson completed" : "Mark lesson complete"}</button></div><p role="status" className="save-status">{saveStatus}</p></section>
        <p className="source-note">{week1.source}</p>
      </div></div>
    </div>
  </main>;
}
