---
version: alpha
name: Edify
description: A flat, playful study space for secondary school students in Nigeria (JSS1 to SS3). Solid colour blocks in navy, steel blue, cream and red; no shadows, gradients or decoration. Fredoka (rounded) for headings, Nunito for text, and Edi the owl mascot plus hand-drawn doodles for a playful, kid-friendly feel. The study app has a navy sidebar; the marketing site alternates cream, white, navy and red sections.

colors:
  navy: "#003049"
  slate: "#669bbc"
  mist: "#fdf0d5"
  red: "#c1121f"
  red-deep: "#780000"
  white: "#ffffff"
  ink-2: "rgba(0,48,73,.76)"
  ink-3: "rgba(0,48,73,.62)"
  line: "rgba(102,155,188,.38)"
  tint-red: "rgba(193,18,31,.09)"
  tint-slate: "rgba(102,155,188,.16)"

typography:
  display: "Fredoka (next/font/google, --font-display), weight 600-700"
  text: "Nunito (next/font/google, --font-body), 500-700"
  h1-marketing: { size: "clamp(40px, 5.2vw, 64px)", weight: 800, tracking: "-0.03em", leading: 1.04 }
  h1-app: { size: "clamp(30px, 3.6vw, 40px)", weight: 700 }
  h2: { size: "clamp(30px, 3.6vw, 44px)", weight: 700 }
  body: { size: "16-19px", leading: 1.6 }
  kicker: { size: "13px", weight: 700, tracking: "0.08em", transform: uppercase, color: red }

radius: { small: 12px, default: 18px, large: 24px, xl: 32px, buttons: 999px }
shadow: "only a solid 4px bottom edge on buttons (no blur)"
---

## Overview

Flat design: depth comes from solid colour blocks and 1px lines, never from shadows, gradients, blur, grain or tilted cards. Warm cream page background (`#fdf0d5`), white panels, navy for weight, red for action. All tokens are CSS variables on `:root` in `src/app/globals.css`.

## Files
- `src/app/globals.css`: tokens, base, buttons, status pills, forms, skeletons, 404.
- `src/app/home.css`: landing page (imported by `src/app/page.tsx`).
- `src/app/motion.css`: motion tokens (easing), shared keyframes, the scroll-reveal system, button hover lift and the account-page entrances (imported by the root layout).
- `src/app/home-motion.css`: everything that moves on the landing page (imported by `src/app/page.tsx`).
- `src/app/study/motion.css`: dashboard, learning path, quiz and CBT motion (imported by `src/app/study/layout.tsx`).
- `src/app/study/app.css`: study app shell, dashboard, subjects, notes, lesson pages (imported by `src/app/study/layout.tsx`).
- `src/app/study/cbt/cbt.css`: CBT setup, the exam screen, results and the recent-attempts list (imported by the CBT pages and the dashboard).
- `src/app/(account)/account.css`: sign-up, log-in, verify, reset and learner profiles.

## Colors
- **Navy `#003049`**: text, the app sidebar, the footer, stat bands and "weight" tiles; also means *correct* and *completed* (checks, correct options, done nodes).
- **Red `#c1121f`**: primary buttons, the active sidebar link, the next lesson, kickers and highlighted words. Hover/pressed is `#780000`. Also means *wrong* on quiz options (with a red tint).
- **Steel blue `#669bbc`**: secondary marks on navy, dashed "coming soon" nodes, one bento tile. Never body text on mist (too little contrast).
- **Cream `#fdf0d5`**: page background and inner wells. **White** for panels and cards.
- Secondary text uses navy at 76% (`--ink-2`), tertiary at 62% (`--ink-3`).

## Typography
- Fredoka for headings and big numbers; Nunito for everything else, including question text.
- Highlighted words (`.hl`) are red with a wavy red underline.
- Sentence case. Kickers are the only uppercase text besides small metadata labels.
- `text-wrap: balance` on headings, `pretty` on paragraphs, `tabular-nums` on numbers.

## Layout
- Marketing: `.shell` = `min(1160px, 100% - 64px)`; sections 88px tall padding on desktop, 56px on phones. Bento feature grid on 6 columns (4+2, 2+2+2, 3+3).
- App: 256px navy sidebar + content (max 1120px). Below 860px the sidebar becomes a navy top bar and a 5-item bottom tab bar (Home, Subjects, CBT, Notes, Family). The CBT exam screen hides the sidebar and tab bar (`.app:has(.cbt-exam)`) so the test fills the screen.
- Breakpoints: 1100/1024px (stack two-column areas), 860px (app shell), 680/600px (phone).

## Components
- **Logo** (`src/components/brand.tsx`, favicon `src/app/icon.svg`): a cream "e." in a red badge tilted −6°, wearing a navy graduation cap with a steel-blue tassel; the cap has a cream edge so it shows on navy. The "edify" wordmark is Fredoka 700 with a red star in place of the dot on the i. Draw the "e" as a path, never as font text, so the badge and favicon match.
- **Buttons**: `.pill-button` (solid red), `.pill-outline` (2px navy outline, fills navy on hover), `.btn-navy`, `.btn-light`/`.btn-line` on red. 8px radius, 48px tall, 40px small. Pressed: 1px down.
- **Panels**: white, 1px line, 16px radius, no shadow.
- **Stat tile**: label, big Outfit number, optional meter; the first tile is navy.
- **Meter**: 8px track in slate tint, red fill (`transform: scaleX`).
- **Learning path**: vertical line with nodes: navy filled with tick (done), red with a ring (up next, row tinted red), red outline (ready), dashed slate (coming soon).
- **Sidebar link**: icon + label; active is solid red.
- **Quiz**: options are 2px-bordered; correct turns solid navy, wrong turns red-tinted with a red border. Result card shows an A1–F9 grade badge (navy for A/B, red for C, slate for D–F); the bands live in `src/lib/grades.ts`.
- **CBT exam**: sticky navy bar with the countdown (turns red in the last minute) and Submit; one question at a time with big A–D option buttons (picked = solid navy with a red letter); a numbered grid (answered = navy, flagged = red border and dot, current = red ring). On phones the grid folds behind "Show all numbers" and Previous / Flag / Next stick to the bottom.
- **Plans** (landing page): a staircase of wide rows, Bronze → Silver → Gold, each with a flat medal (red-deep, steel blue, red) and its features as chips; Gold is the navy row, Silver carries a tilted "Most popular" sticker, and a dashed red "Pay securely with Paystack" stamp (Edi cheering) sits beside them. **Plan badge**: a small pill on profile cards and in the sidebar ("Gold · sponsored").
- Icons are inline SVGs from `src/components/icons.tsx` (2px stroke, `aria-hidden`). No emoji.

## Fun layer
- **Edi** (`src/components/mascot.tsx`, artwork `src/assets/edi.png`, supplied by the owner): an owl in a red graduation cap. The `pose` prop (`wave`, `read`, `cheer`, `think`) only changes extras; `cheer` adds stars. On navy or red backgrounds wrap him in `.mascot-badge` (cream circle) so his navy body and red cap stay visible.
- **Doodles** (`src/components/doodles.tsx`): Star, Sparkle, Squiggle, Arrow, Atom, Pencil, a speech bubble and a `Wave` edge used where a section changes colour.
- Buttons are pills with a solid darker 4px bottom edge that presses down on click. Cards use 2px borders and 24–32px corners; a few accents tilt slightly (logo badge, step numbers, grade badge).
- Gentle `float` and `wiggle` animations only run when the user hasn't asked for reduced motion.

## Motion
Movement is part of the playful feel, but it stays flat: only `transform` and `opacity` animate (plus tiny one-off colour swaps). No blur, glow or gradient, and nothing animates `width`, `height`, `top` or `left`.

- **Tokens** (`src/app/motion.css`): `--ease-out` (settles softly, for entrances), `--ease-spring` (small overshoot, for pops and presses), `--ease-soft` (shakes).
- **Individual transform properties.** Keyframes use `translate`, `rotate` and `scale`, never `transform`, so they compose with the static `transform: rotate(...)` many pieces already have (step numbers, grade badge, plan cards). The exception is SVG groups that carry a `transform` attribute: scale a child path or a wrapping `<g>`, never the element with the attribute.
- **Scroll reveal.** Mark one element `data-reveal` (variants `left`, `right`, `fade`, `stamp`, `none`) or a group `data-stagger` (`fast`, `stairs`); its direct children rise in one after another. `src/components/scroll-motion.tsx` (mounted once on the landing page) adds `.is-pending` only to groups that start below the fold, then swaps to `.is-in` when they scroll into view, using `IntersectionObserver` only (no scroll listeners). Anything already on screen is never hidden, and without JavaScript nothing is hidden at all. Chain extra effects off `.is-in` in CSS (for example `.bento.is-in .progress-demo span`).
- **Count-ups** use `data-count` (optional `data-prefix`, `data-suffix`); the real number is always in the HTML and is restored when the count ends. They only run for numbers that start below the fold, so nothing flashes.
- **Ambient loops** (float, bob, sway, twinkle, spin, ticker, drifting waves) are slow and limited to decorations. Keep them out of reading areas such as lesson text.
- **Landing page:** staggered hero entrance, tablet illustration that assembles and drifts, a ticker band, drifting wave dividers, count-up numbers, a scroll-progress line and active-section nav link in the header.
- **Study app:** CSS only. Each page's blocks enter in a short cascade; meters fill from empty; the next lesson's path node pulses; correct answers pop and wrong ones shake; CBT questions slide in and the timer pulses in the last minute.
- **Reduced motion.** Every animation lives inside `@media (prefers-reduced-motion: no-preference)` and `ScrollMotion` does nothing for people who prefer reduced motion, so they get the finished, static page. The global reduce rule also forces one iteration so no loop can strobe.
- Hover lifts sit behind `(hover: hover)` so touch screens don't get stuck hover states.

## Do's and Don'ts
### Do
- Keep copy subject-neutral; Chemistry is only the first subject with content.
- Compute counts from `src/data/catalog.ts`; never hard-code them.
- Give every interactive element a visible focus ring (red, white on dark/red backgrounds).
- Honour `prefers-reduced-motion`: new animation goes inside `@media (prefers-reduced-motion: no-preference)`.

### Don't
- Add blurred shadows, gradients, glows, glass effects or grain.
- Use third-party clip art; new cartoon elements should match Edi's flat style and the palette.
- Introduce colours outside the palette (other than tints made from it).
- Use steel blue for body text, or use serif fonts.
