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
- `src/app/study/app.css`: study app shell, dashboard, subjects, notes, lesson pages (imported by `src/app/study/layout.tsx`).
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
- App: 256px navy sidebar + content (max 1120px). Below 860px the sidebar becomes a navy top bar and a 4-item bottom tab bar.
- Breakpoints: 1100/1024px (stack two-column areas), 860px (app shell), 680/600px (phone).

## Components
- **Buttons**: `.pill-button` (solid red), `.pill-outline` (2px navy outline, fills navy on hover), `.btn-navy`, `.btn-light`/`.btn-line` on red. 8px radius, 48px tall, 40px small. Pressed: 1px down.
- **Panels**: white, 1px line, 16px radius, no shadow.
- **Stat tile**: label, big Outfit number, optional meter; the first tile is navy.
- **Meter**: 8px track in slate tint, red fill (`transform: scaleX`).
- **Learning path**: vertical line with nodes: navy filled with tick (done), red with a ring (up next, row tinted red), red outline (ready), dashed slate (coming soon).
- **Sidebar link**: icon + label; active is solid red.
- **Quiz**: options are 2px-bordered; correct turns solid navy, wrong turns red-tinted with a red border. Result card shows a WAEC grade badge (navy for A/B, red for C, slate for D–F).
- Icons are inline SVGs from `src/components/icons.tsx` (2px stroke, `aria-hidden`). No emoji.

## Fun layer
- **Edi** (`src/components/mascot.tsx`): an owl in a graduation cap with poses `wave` (greetings, hero, auth), `read` (empty states, lesson preview), `cheer` (A/B quiz grades, final CTA) and `think` (C–F grades, 404).
- **Doodles** (`src/components/doodles.tsx`): Star, Sparkle, Squiggle, Arrow, Atom, Pencil, a speech bubble and a `Wave` edge used where a section changes colour.
- Buttons are pills with a solid darker 4px bottom edge that presses down on click. Cards use 2px borders and 24–32px corners; a few accents tilt slightly (logo badge, step numbers, grade badge).
- Gentle `float` and `wiggle` animations only run when the user hasn't asked for reduced motion.

## Do's and Don'ts
### Do
- Keep copy subject-neutral; Chemistry is only the first subject with content.
- Compute counts from `src/data/catalog.ts`; never hard-code them.
- Give every interactive element a visible focus ring (red, white on dark/red backgrounds).
- Honour `prefers-reduced-motion`.

### Don't
- Add blurred shadows, gradients, glows, glass effects or grain.
- Use third-party clip art; draw new cartoon elements in the palette, in the same style as Edi.
- Introduce colours outside the palette (other than tints made from it).
- Use steel blue for body text, or use serif fonts.
