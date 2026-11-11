"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Shield, Spark, Swap, Target, Users } from "@/components/icons";
import Mascot from "@/components/mascot";
import "./welcome-guide.css";

// A short tour of Edify that opens by itself the first time someone arrives, and again from "Take the tour".
// Parents see it on /profiles (learners have the spotlight tour in nav-tour.tsx). "Seen" is remembered per person in this browser
// (localStorage), so a new phone shows it once more; nothing is stored on the server.

type Pose = "wave" | "read" | "cheer" | "think";
type Step = { title: string; text: string; icon: (props: { size?: number }) => React.ReactNode; pose: Pose; link?: { href: string; label: string } };

const VERSION = 1;

function parentSteps(): Step[] {
  return [
    { title: "Welcome to Edify", text: "Edify turns each week of the senior secondary scheme of work into short exam notes, full notes and practice that marks itself. One family account covers every child from SS1 to SS3.", icon: Spark, pose: "wave" },
    { title: "Add each child", text: "Give every learner a first name, their class and school, and their own 4-digit PIN. You can add up to six, and each one keeps their own progress and notes.", icon: Users, pose: "read" },
    { title: "Keep the grown-up controls locked", text: "Set a parent PIN. Children can still pick their name and study, but adding, editing or removing learners and deleting the account need your PIN.", icon: Shield, pose: "think" },
    { title: "Choose a plan for each learner", text: "Bronze, Silver or Gold, paid per child for 105 days by card or bank transfer. Nothing renews by itself, and brothers and sisters can be on different plans.", icon: Target, pose: "read", link: { href: "/billing", label: "See the plans" } },
    { title: "Hand over the phone", text: "Your child taps their name on this page, enters their PIN and lands on their own dashboard, which has its own short tour. You can come back here any time to see how far each one has got.", icon: Swap, pose: "cheer" },
  ];
}

export default function WelcomeGuide({ kind, id, autoOpen, trigger = true }: { kind: "parent"; id: string; autoOpen: boolean; trigger?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState(0);
  const titleId = useId();
  const textId = useId();
  const key = `edify-guide-v${VERSION}:${kind}:${id}`;
  const steps = parentSteps();
  const current = steps[Math.min(step, steps.length - 1)];
  const last = step >= steps.length - 1;

  const remember = useCallback(() => { try { localStorage.setItem(key, new Date().toISOString()); } catch {} }, [key]);
  const open = useCallback(() => { setStep(0); if (!dialog.current?.open) dialog.current?.showModal(); }, []);
  const close = useCallback(() => { remember(); dialog.current?.close(); }, [remember]);

  // New sign-ups only (autoOpen): open by itself, a moment after the page has drawn so it does not flash in before the page.
  useEffect(() => {
    if (!autoOpen) return;
    let seen = true;
    try { seen = !!localStorage.getItem(key); } catch {}
    if (seen) return;
    const timer = window.setTimeout(open, 450);
    return () => window.clearTimeout(timer);
  }, [autoOpen, key, open]);

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
            ? <button type="button" className="pill-button small" onClick={close} autoFocus>Got it</button>
            : <button type="button" className="pill-button small" onClick={() => setStep(step + 1)} autoFocus={step === 0}>Next<ArrowRight size={16} /></button>}
        </div>
      </div>
    </dialog>
  </>;
}
