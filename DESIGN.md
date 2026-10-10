---
version: alpha
name: Edify
description: A flat, confident study space for Nigerian SS1 learners. Solid colour blocks in navy, steel blue, cream and red; no shadows, gradients or decoration. Outfit for headings, Geist for text. The study app has a navy sidebar; the marketing site alternates cream, white, navy and red sections.

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
  display: "Outfit (next/font/google, --font-display), weights 700-800"
  text: "Geist (next/font/google, --font-geist), 400-600"
  h1-marketing: { size: "clamp(40px, 5.2vw, 64px)", weight: 800, tracking: "-0.03em", leading: 1.04 }
  h1-app: { size: "clamp(30px, 3.6vw, 40px)", weight: 700 }
  h2: { size: "clamp(30px, 3.6vw, 44px)", weight: 700 }
  body: { size: "16-19px", leading: 1.6 }
  kicker: { size: "13px", weight: 700, tracking: "0.08em", transform: uppercase, color: red }

radius: { small: 8px, default: 12px, large: 16px }
shadow: none
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
- Outfit for headings and big numbers; Geist for everything else, including question text.
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

## Do's and Don'ts
### Do
- Keep copy subject-neutral; Chemistry is only the first subject with content.
- Compute counts from `src/data/catalog.ts`; never hard-code them.
- Give every interactive element a visible focus ring (red, white on dark/red backgrounds).
- Honour `prefers-reduced-motion`.

### Don't
- Add shadows, gradients, glows, blur, grain, rotated cards or floating decorative chips.
- Introduce colours outside the palette (other than tints made from it).
- Use slate for body text, or use serif fonts.
