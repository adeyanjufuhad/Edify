"use client";

import { useEffect, useId, useRef, useState } from "react";

// The section menu on phones and tablets, where the header's link row is hidden (styles in src/app/home.css).
// A square button that opens a white panel under the header; it closes on a link tap, Escape or a tap outside.
export default function HomeMenu({ items }: { items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onDown = (event: PointerEvent) => {
      if (!wrap.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div className="home-menu" ref={wrap}>
      <button ref={button} type="button" className="home-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls={id} onClick={() => setOpen((value) => !value)}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden="true" focusable="false">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav id={id} className="home-menu-panel" aria-label="Page sections" hidden={!open}>
        {items.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
      </nav>
    </div>
  );
}
