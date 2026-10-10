"use client";

import { useEffect } from "react";

// Landing-page motion that CSS alone can't do: reveal-on-scroll, count-up numbers, the header's
// "scrolled" state and the active nav link. It renders nothing and only adds classes, so the page
// is fully visible without JavaScript and for people who prefer reduced motion (it does nothing for them).
//
// Markup contract (styles live in src/app/motion.css and src/app/home-motion.css):
//   [data-reveal]          one element that animates in when it scrolls into view
//   [data-stagger]         a group whose direct children animate in one after another
//   [data-count="1234"]    a number that counts up from 0 (optional data-prefix / data-suffix)
//   [data-header]          the sticky header; gets .is-scrolled once the page moves
//   [data-sentinel]        a 1px marker at the very top that tells us the page has scrolled
//   [data-spy]             a nav whose #links get .is-active for the section on screen

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function startCount(el: HTMLElement) {
  const final = el.textContent ?? "";
  const target = Number(el.dataset.count);
  if (!Number.isFinite(target)) return () => {};
  const prefix = el.dataset.prefix ?? "";
  const suffix = el.dataset.suffix ?? "";
  const grouped = final.includes(",");
  const format = (n: number) => `${prefix}${grouped ? Math.round(n).toLocaleString("en-NG") : Math.round(n)}${suffix}`;
  const duration = 1400;
  const startedAt = performance.now();
  let frame = 0;
  const tick = (now: number) => {
    const t = Math.min(1, (now - startedAt) / duration);
    if (t >= 1) { el.textContent = final; return; }
    el.textContent = format(target * easeOutExpo(t));
    frame = requestAnimationFrame(tick);
  };
  el.textContent = format(0);
  frame = requestAnimationFrame(tick);
  return () => { cancelAnimationFrame(frame); el.textContent = final; };
}

export default function ScrollMotion() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    const undo: (() => void)[] = [];
    const below = (el: Element) => el.getBoundingClientRect().top >= window.innerHeight;

    // Scroll reveal: only groups that start below the fold are hidden, so nothing visible ever flashes.
    const groups = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger]"));
    for (const group of groups) {
      if (group.hasAttribute("data-stagger")) Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
    }
    const pending = groups.filter(below);
    pending.forEach((el) => el.classList.add("is-pending"));
    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.remove("is-pending");
        entry.target.classList.add("is-in");
        reveal.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -10% 0px" });
    pending.forEach((el) => reveal.observe(el));
    undo.push(() => { reveal.disconnect(); pending.forEach((el) => el.classList.remove("is-pending", "is-in")); });

    // Numbers count up the first time they scroll into view.
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]")).filter(below);
    const stops: (() => void)[] = [];
    const count = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        stops.push(startCount(entry.target as HTMLElement));
        count.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });
    counters.forEach((el) => count.observe(el));
    undo.push(() => { count.disconnect(); stops.forEach((stop) => stop()); });

    // Header shrinks a little once the page has moved.
    const header = document.querySelector<HTMLElement>("[data-header]");
    const sentinel = document.querySelector<HTMLElement>("[data-sentinel]");
    if (header && sentinel) {
      const watch = new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting));
      watch.observe(sentinel);
      undo.push(() => { watch.disconnect(); header.classList.remove("is-scrolled"); });
    }

    // The nav link for the section in the middle of the screen is highlighted.
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-spy] a[href^='#']"));
    const byId = new Map(links.map((link) => [link.hash.slice(1), link]));
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section"));
    if (links.length && sections.length) {
      const spy = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const active = byId.get(entry.target.id);
          for (const link of links) {
            link.classList.toggle("is-active", link === active);
            if (link === active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
          }
        }
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach((section) => spy.observe(section));
      undo.push(() => { spy.disconnect(); links.forEach((link) => { link.classList.remove("is-active"); link.removeAttribute("aria-current"); }); });
    }

    root.classList.add("motion-ok");
    undo.push(() => root.classList.remove("motion-ok"));
    return () => undo.forEach((fn) => fn());
  }, []);

  return null;
}
