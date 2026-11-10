"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Grid, Layers, Monitor, Note, Shield, Spark, Swap, Target, Users, Bolt } from "@/components/icons";
import Mascot from "@/components/mascot";
import "./welcome-guide.css";

// A short tour of Edify that opens by itself the first time someone arrives, and again from "Take the tour".
// Parents see it on /profiles, learners on their dashboard. "Seen" is remembered per person in this browser
// (localStorage), so a new phone shows it once more; nothing is stored on the server.

type Pose = "wave" | "read" | "cheer" | "think";
type Step = { title: string; text: string; icon: (props: { size?: number }) => React.ReactNode; pose: Pose; link?: { href: string; label: string } };

const VERSION = 1;

function parentSteps(): Step[] {
  return [
    { title: "Welcome to Edify", text: "Edify turns each week of the senior secondary scheme of work into short exam notes, full notes and practice that marks itself. One family account covers every child from SS1 to SS3.", icon: Spark, pose: "wave" },
    { title: "Add each child", text: "Give every learner a first name, their class and school, and their own 4-digit PIN. You can add up to six, and each one keeps their own progress and notes.", icon: Users, pose: "read" },
    { title: "Keep the grown-up controls locked", text: "Set a parent PIN. Children can still pick their name and study, but adding, editing or removing learners and deleting the account need your PIN.", icon: Shield, pose: "think" },
    { title: "Choose a plan for each learner", text: "Bronze, Silver or Gold, paid per child for 105 days by card or bank transfer through Monnify. Nothing renews by itself, and brothers and sisters can be on different plans.", icon: Target, pose: "read", link: { href: "/billing", label: "See the plans" } },
    { title: "Hand over the phone", text: "Your child taps their name on this page, enters their PIN and lands on their own dashboard, which has its own short tour. You can come back here any time to see how far each one has got.", icon: Swap, pose: "cheer" },
  ];
}

function learnerSteps(name: string, challenges: boolean): Step[] {
  const steps: Step[] = [
    { title: `Hi ${name}, I’m Edi!`, text: "This is your own study space. Your progress and notes are saved to you, so nobody else in the family can tick off your lessons. Here’s a quick look around.", icon: Spark, pose: "wave" },
    { title: "Your dashboard", text: "It shows your next lesson, how far through the term you are and your latest CBT scores. Tap Continue learning to pick up where you stopped.", icon: Grid, pose: "read" },
    { title: "Subjects and lessons", text: "Every subject is laid out week by week, just like school. Open a week to read the quick exam notes or the full notes, check the exam traps, then tick the lesson off.", icon: Layers, pose: "read", link: { href: "/study/subjects", label: "Open subjects" } },
    { title: "Practice that marks itself", text: "Each lesson ends with exam-style questions. Tap an answer to see straight away if you’re right, then get an A1 to F9 grade and retry only the ones you missed.", icon: Bolt, pose: "think" },
    { title: "Timed CBT tests", text: "Practise like the real exam: one question at a time with a countdown. When you submit, every answer is explained.", icon: Monitor, pose: "think", link: { href: "/study/cbt", label: "Try a CBT test" } },
    { title: "Your notes", text: "There’s a notes box at the end of every lesson. Whatever you write saves by itself, and My notes collects all of it on one page for revision.", icon: Note, pose: "read" },
  ];
  if (challenges) steps.push({ title: "Challenge your classmates", text: "Once a parent switches it on, you can challenge classmates from your own school and class to the same questions, and climb the class leaderboard.", icon: Target, pose: "cheer" });
  steps.push({ title: "You’re all set!", text: "On a phone, the bar at the bottom takes you around, and the round Menu button has the rest. Switch learner hands the phone to someone else. Take this tour again from your dashboard any time.", icon: Swap, pose: "cheer" });
  return steps;
}

export default function WelcomeGuide({ kind, id, name = "", challenges = false, trigger = true }: { kind: "parent" | "learner"; id: string; name?: string; challenges?: boolean; trigger?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const titleId = useId();
  const textId = useId();
  const key = `edify-guide-v${VERSION}:${kind}:${id}`;
  const steps = kind === "parent" ? parentSteps() : learnerSteps(name, challenges);
  const current = steps[Math.min(step, steps.length - 1)];
  const last = step >= steps.length - 1;

  const remember = useCallback(() => { try { localStorage.setItem(key, new Date().toISOString()); } catch {} }, [key]);
  const open = useCallback(() => { setStep(0); if (!dialog.current?.open) dialog.current?.showModal(); }, []);
  const close = useCallback(() => { remember(); dialog.current?.close(); }, [remember]);

  // First visit: open by itself, a moment after the page has drawn so it does not flash in before the page.
  useEffect(() => {
    let seen = true;
    try { seen = !!localStorage.getItem(key); } catch {}
    if (seen) return;
    const timer = window.setTimeout(open, 450);
    return () => window.clearTimeout(timer);
  }, [key, open]);

  return <>
    {trigger && <button type="button" className="guide-trigger" onClick={open}><Spark size={16} />Take the tour</button>}
    <dialog ref={dialog} className="guide" aria-labelledby={titleId} aria-describedby={textId}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div className="guide-card">
        <button type="button" className="guide-skip" onClick={close}>{last ? "Close" : "Skip tour"}</button>
        <div className="guide-art" key={`art-${step}`}>
          <Mascot pose={current.pose} className="guide-mascot" />
          <span className="guide-icon" aria-hidden="true"><current.icon size={20} /></span>
        </div>
        <div className="guide-body" key={`body-${step}`}>
          <span className="guide-count">Step {step + 1} of {steps.length}</span>
          <h2 id={titleId}>{current.title}</h2>
          <p id={textId}>{current.text}</p>
          {current.link && <Link href={current.link.href} className="text-link guide-link" onClick={close}>{current.link.label} <ArrowRight size={14} /></Link>}
        </div>
        <ol className="guide-dots" aria-label="Tour steps">
          {steps.map((item, index) => <li key={item.title}><button type="button" aria-label={`Step ${index + 1}: ${item.title}`} aria-current={index === step ? "step" : undefined} onClick={() => setStep(index)} /></li>)}
        </ol>
        <div className="guide-actions">
          {step > 0 ? <button type="button" className="pill-outline small" onClick={() => setStep(step - 1)}><ArrowLeft size={16} />Back</button> : <span />}
          {last
            ? <button type="button" className="pill-button small" onClick={close} autoFocus>{kind === "parent" ? "Got it" : "Let’s study"}</button>
            : <button type="button" className="pill-button small" onClick={() => setStep(step + 1)} autoFocus={step === 0}>Next<ArrowRight size={16} /></button>}
        </div>
      </div>
    </dialog>
  </>;
}
