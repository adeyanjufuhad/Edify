"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Spark } from "@/components/icons";
import Mascot from "@/components/mascot";
import "./welcome-guide.css";
import "./nav-tour.css";

// A spotlight walkthrough of the study app's navigation. Each step dims the page, cuts a hole around one button
// (found by its data-tour attribute in src/components/app-sidebar.tsx) and explains it in a card beside it.
// It opens by itself on a learner's first visit to their dashboard, and again from "Take the tour".
//
// Steps are built when the tour opens, from what is on screen: a button that isn't rendered (classmate features
// switched off) is skipped, and on phones the buttons that live inside the Menu are gathered into one Menu step.
// "Seen" is kept per learner in this browser (localStorage); bump VERSION to show a changed tour to everyone again.

const VERSION = 2;

type Info = { key: string; title: string; text: string };
type Step = { key: string | null; title: string; text: string; list?: string[] };

const BUTTONS: Info[] = [
  { key: "dashboard", title: "Dashboard", text: "Your home in Edify. It shows your next lesson, how far through the term you are and your latest CBT scores." },
  { key: "subjects", title: "Subjects & lessons", text: "Every subject, laid out week by week like school. Open a week for quick notes, full notes, exam traps and practice questions, then tick it off." },
  { key: "cbt", title: "CBT tests", text: "Practise like the real exam: one question at a time with a countdown. When you submit, every answer is explained." },
  { key: "notes", title: "My notes", text: "Everything you write in the notes box at the end of a lesson, collected on one page for revision." },
  { key: "challenges", title: "Challenges", text: "Challenge a classmate from your own school and class to the same questions. The higher score wins." },
  { key: "chats", title: "Chats", text: "Message the classmates you study with. Parents can read every chat." },
  { key: "leaderboard", title: "Leaderboard", text: "See who has won the most challenges among the classmates you are linked with." },
  { key: "learners", title: "Learners", text: "Back to the family page, where a parent adds learners, changes PINs and chooses plans." },
  { key: "classmate-settings", title: "Classmate settings", text: "Where a parent chooses which classmate features you can use." },
  { key: "switch", title: "Switch learner", text: "Hand the device to a brother or sister. They pick their own name and enter their own PIN." },
];

const visible = (element: Element) => {
  const box = element.getBoundingClientRect();
  return box.width > 0 && box.height > 0 && getComputedStyle(element).visibility !== "hidden";
};
const target = (key: string) => Array.from(document.querySelectorAll(`[data-tour="${key}"]`)).find(visible) ?? null;

function buildSteps(name: string): Step[] {
  const shown: Step[] = [];
  const inMenu: string[] = [];
  for (const info of BUTTONS) {
    const all = document.querySelectorAll(`[data-tour="${info.key}"]`);
    if (!all.length) continue; // switched off for this learner
    if (target(info.key)) shown.push(info);
    else inMenu.push(info.title);
  }
  if (inMenu.length && target("menu")) shown.push({ key: "menu", title: "Menu", text: "Tap the round button for everything else:", list: inMenu });
  return [
    { key: null, title: `Hi ${name}! Let me show you around.`, text: "These buttons take you everywhere in Edify. I’ll point at each one and say what it’s for." },
    ...shown,
    { key: null, title: "That’s everything!", text: "You can take this walkthrough again from your dashboard any time. Now, let’s study." },
  ];
}

type Box = { top: number; left: number; width: number; height: number };
const PAD = 6;

export default function NavTour({ id, name, autoOpen }: { id: string; name: string; autoOpen: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [index, setIndex] = useState(0);
  const [hole, setHole] = useState<Box | null>(null);
  const [place, setPlace] = useState<{ top: number; left: number; side: "right" | "above" | "center" }>({ top: 0, left: 0, side: "center" });
  const titleId = useId();
  const textId = useId();
  const key = `edify-guide-v${VERSION}:learner:${id}`;
  const step = steps[index];
  const last = index === steps.length - 1;

  const open = useCallback(() => {
    setSteps(buildSteps(name));
    setIndex(0);
    if (!dialog.current?.open) dialog.current?.showModal();
  }, [name]);
  const close = useCallback(() => {
    try { localStorage.setItem(key, new Date().toISOString()); } catch {}
    dialog.current?.close();
    setSteps([]);
  }, [key]);

  // Only a newly signed-up learner gets it by itself (autoOpen), once, after the page has drawn. Everyone else uses "Take the tour".
  useEffect(() => {
    if (!autoOpen) return;
    let seen = true;
    try { seen = !!localStorage.getItem(key); } catch {}
    if (seen) return;
    const timer = window.setTimeout(open, 500);
    return () => window.clearTimeout(timer);
  }, [autoOpen, key, open]);

  // Find this step's button, bring it into view and measure it; again whenever the window changes size.
  const measure = useCallback(() => {
    const element = step?.key ? target(step.key) : null;
    if (!element) { setHole(null); return; }
    const box = element.getBoundingClientRect();
    setHole({ top: box.top - PAD, left: box.left - PAD, width: box.width + PAD * 2, height: box.height + PAD * 2 });
  }, [step]);

  useLayoutEffect(() => {
    if (step?.key) target(step.key)?.scrollIntoView({ block: "nearest" });
    // Reading the button's position from the DOM into state is exactly what a layout effect is for.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    measure();
  }, [step, measure]);

  useEffect(() => {
    if (!steps.length) return;
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps.length, measure]);

  // Put the card beside the hole: to the right of a sidebar button, above a phone tab-bar button, or centred.
  useLayoutEffect(() => {
    const height = card.current?.offsetHeight ?? 0;
    const width = Math.min(hole ? 320 : 380, innerWidth - 32); // the card widths in nav-tour.css
    const margin = 16;
    const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), Math.max(min, max));
    const next: typeof place = !hole ? { top: clamp((innerHeight - height) / 2, margin, innerHeight - height - margin), left: clamp((innerWidth - width) / 2, margin, innerWidth), side: "center" }
      : hole.left + hole.width + 14 + width + margin <= innerWidth ? { top: clamp(hole.top + hole.height / 2 - 40, margin, innerHeight - height - margin), left: hole.left + hole.width + 14, side: "right" }
      : { top: clamp(hole.top - height - 14, margin, innerHeight - height - margin), left: clamp(hole.left + hole.width / 2 - width / 2, margin, innerWidth - width - margin), side: "above" };
    setPlace((now) => (now.top === next.top && now.left === next.left && now.side === next.side ? now : next));
  }, [hole, index, steps, place.side]);

  // Where the little pointer on the card sits, so it aims at the middle of the button.
  const pointer = hole && place.side === "right" ? { top: Math.min(Math.max(hole.top + hole.height / 2 - place.top - 8, 18), 140) }
    : hole && place.side === "above" ? { left: Math.max(hole.left + hole.width / 2 - place.left - 8, 10) } : null;

  return <>
    <button type="button" className="guide-trigger" onClick={open}><Spark size={16} />Take the tour</button>
    <dialog ref={dialog} className="nav-tour" aria-labelledby={titleId} aria-describedby={textId} onCancel={(event) => { event.preventDefault(); close(); }}>
      {step && <>
        <div className={`nav-tour-scrim${hole ? " has-hole" : ""}`} aria-hidden="true" style={hole ? { transform: `translate(${hole.left}px, ${hole.top}px)`, width: hole.width, height: hole.height } : undefined} />
        <div ref={card} className={`nav-tour-card is-${hole ? place.side : "center"}`} style={{ top: place.top, left: place.left }} key={index}>
          {pointer && <span className="nav-tour-pointer" style={pointer} aria-hidden="true" />}
          {!hole && <Mascot pose={last ? "cheer" : "wave"} className="nav-tour-mascot" />}
          <span className="nav-tour-count">{index + 1} of {steps.length}</span>
          <h2 id={titleId}>{step.title}</h2>
          <div id={textId}>
            <p>{step.text}</p>
            {step.list && <ul>{step.list.map((item) => <li key={item}>{item}</li>)}</ul>}
          </div>
          <div className="nav-tour-actions">
            {!last && <button type="button" className="nav-tour-skip" onClick={close}>Skip</button>}
            {index > 0 && <button type="button" className="pill-outline small" onClick={() => setIndex(index - 1)} aria-label="Back"><ArrowLeft size={16} /></button>}
            {last
              ? <button type="button" className="pill-button small" onClick={close} autoFocus>Let’s study</button>
              : <button type="button" className="pill-button small" onClick={() => setIndex(index + 1)} autoFocus>Next<ArrowRight size={16} /></button>}
          </div>
        </div>
      </>}
    </dialog>
  </>;
}
