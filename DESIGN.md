---
version: alpha
name: Edify
description: An editorial study space for Nigerian SS1 learners. Warm paper canvas, near-black ink, one deep crimson accent, Newsreader serif headlines with the key word in crimson italics and a thin underline, Geist for everything else, a floating pill header and a black footer. Inspired by the csca-90plus exam-prep site, adapted into Edify's own brand.

colors:
  brand: "#9b0000"
  brand-active: "#7a0000"
  on-brand: "#ffffff"
  ink: "#141413"
  body: "#3d3d3a"
  muted: "#6c6a64"
  soft: "#8e8b82"
  canvas: "#faf9f5"
  raised: "#fffefb"
  surface-soft: "#f5f0e8"
  surface-card: "#efe9de"
  dark: "#181715"
  hairline: "#e6dfd8"
  line-strong: "#d3c9ba"
  brand-soft: "#fbeeee"
  brand-soft-line: "#efc1ba"
  success: "#2f7d4f"
  success-soft: "#e9f1e6"
  success-line: "#b9d4b8"

typography:
  display-family: "Newsreader (next/font/google, --font-display), Georgia fallback"
  ui-family: "Geist (next/font/google, --font-geist), system-ui fallback"
  display: { family: display, size: "clamp(46px, 5.6vw, 72px)", weight: 400, tracking: "-0.025em", leading: 1.02 }
  h2: { family: display, size: "clamp(34px, 4.2vw, 52px)", weight: 400, tracking: "-0.025em", leading: 1.08 }
  emphasis: { family: display, style: italic, color: brand, underline: "0.06em at 30% brand, 0.14em offset" }
  app-heading: { family: ui, weight: 800, tracking: "-0.045em" }
  body: { family: ui, size: "16-19px", weight: 400, leading: 1.6 }
  kicker: { family: ui, size: "12px", weight: 700, tracking: "0.12em", transform: uppercase, color: brand }

radius:
  container: 16px
  card: 14px
  inner: 12px
  button: 10px
  chip: 999px

shadow:
  card: "0 1px 2px rgba(20,20,19,.04), 0 10px 28px -14px rgba(20,20,19,.16)"
  raised: "0 2px 4px rgba(20,20,19,.04), 0 28px 56px -28px rgba(20,20,19,.28)"
  brand: "0 8px 18px -10px rgba(155,0,0,.45)"
---

## Overview

Edify helps SS1 students revise every subject one week at a time: quick exam notes, full notes, hidden facts and WAEC-style practice. It should read like a well-made textbook: warm paper, crisp ink, serif headlines and one confident crimson. Light mode only. All tokens live as CSS variables on `:root` in `src/app/globals.css`; the account pages add `src/app/(account)/account.css`.

## Colors

### Brand & Accent
- **Crimson `#9b0000`** is the only accent: the emphasised headline word, kickers, links, primary buttons, active states and focus rings. Hover and pressed buttons darken to `#7a0000`.
- Soft crimson (`#fbeeee` / `#efc1ba`) marks selected items, the "up next" row and "Ready" pills.

### Surface
- Canvas `#faf9f5`; cards and panels are raised paper `#fffefb` with a `#e6dfd8` hairline.
- Neutral callouts (memory aids, diagrams to draw, stats) use `#f5f0e8`.
- `#181715` is the dark surface: the announcement bar and the footer. Text on it is `#faf9f5`, secondary `#a09d96`.

### Text
- Headlines `#141413`, paragraphs `#3d3d3a`, secondary `#6c6a64`. `#8e8b82` only for disabled or decorative text.

### Semantic
- Green (`#2f7d4f` on `#e9f1e6`) only means correct, completed or an A/B grade. Wrong answers use crimson on a soft red tint.

## Typography

### Font Family
- **Newsreader** for display headings on the home page, account pages and lesson reading pages (h1, section h2, lesson section headings), always weight 400.
- **Geist** for body text and all app UI. The study dashboard, quiz, buttons, forms and numbers stay in Geist (serif is not used for software UI).

### Hierarchy
- Display h1 in Newsreader with one key word in `.hl`: crimson italic serif with a thin 30% crimson underline.
- On the dashboard, `.hl` keeps Geist and only changes colour.
- Kicker above each heading: 12px uppercase, 0.12em tracking, crimson.
- Body 16–19px at 1.6–1.78 line height, max ~65ch.

### Principles
- `text-wrap: balance` on headings, `pretty` on paragraphs; `tabular-nums` for scores and progress.
- Real typographic characters: `…`, curly quotes, en dashes.

## Layout

### Spacing System
Multiples of 4px. Sections use 60–100px vertical padding; cards 22–44px.

### Grid & Container
`.shell` = `min(1180px, 100% - 64px)`, centred; 16px side gutter under 600px. CSS grid for every multi-column layout.

### Responsive Strategy
- ≤900px: two-column sections stack; the dashboard's "more subjects" panel drops below the paths.
- ≤600px: buttons go full width, floating hero chips hide, option grids become one column. No horizontal scroll at 375px.

## Elevation & Depth
- Two warm-ink shadow levels: `card` for resting cards, `raised` for hero and feature mock-ups, the greeting card and auth cards.
- The hero quiz card tilts −0.7°.
- A fixed, pointer-events-none grain overlay gives the canvas a paper feel.

## Shapes
- Containers 16px, cards 14px, inner elements 12px, buttons 10px, chips and the header fully rounded.
- Nested radii shrink inward. Avatars and the logo badge are rounded squares.

## Components

### Buttons
- **Primary**: solid crimson, white 700 text, 10px radius, lifts 1px on hover, scales to 0.98 on press. The small header CTA is a pill.
- **Outline**: raised paper, ink text, hairline border; tints on hover.
- **Text link**: crimson 700 with an underline on hover.
- Icons are inline SVGs from `src/components/icons.tsx` (2px stroke, `aria-hidden`). No emoji.

### Navigation
- A dark announcement bar on the home page, then a floating pill header (86% canvas, 18px blur, hairline, soft shadow) that sticks 12px from the top.
- Logo: crimson rounded-square badge with "e." and the "edify" wordmark.
- A skip link is the first focusable element.

### Footer
Full-width black (`#181715`): brand and one-line description, Study and Account link columns, and a base row with the copyright.

### Signature Components
- **Mock window**: a paper card with window dots showing a slice of the real UI.
- **Learning path** (dashboard): a dotted vertical line with a node per week: green tick (done), pulsing crimson (up next), crimson ring (ready), dashed grey (coming soon).
- **Progress ring** next to the greeting card.
- **Quiz result**: a WAEC grade badge (green for A/B, crimson for C, ink for D–F) with "Retry the ones I missed".
- **Reading progress bar**: a 3px crimson bar at the top of lesson pages, driven by CSS scroll timelines.

## Do's and Don'ts

### Do
- Keep copy subject-neutral. Edify covers every SS1 subject; Chemistry is only the first with content.
- Compute counts from the lesson registry (`src/data/catalog.ts`); never hard-code them.
- Use sentence case, active voice and numerals for counts.
- Give every interactive element a visible `:focus-visible` ring and hover and pressed states.
- Honour `prefers-reduced-motion`; animate only `transform` and `opacity`.

### Don't
- Add a second accent colour, purple/blue gradients or neon glows.
- Use emoji, pure black, cool greys or heavy serif weights.
- Use serif type inside the dashboard, quiz or forms.
- Use `transition: all`, or build three equal cards in a row.
