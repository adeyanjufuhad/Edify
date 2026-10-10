---
version: alpha
name: Edify
description: A warm, confident study space for Nigerian SS1 learners. Near-white paper canvas, one deep crimson accent, heavy Geist headlines with a soft crimson underline on the key word, pill buttons and soft warm-shadowed cards. Inspired by csca.id's exam-prep look, adapted into Edify's own brand.

colors:
  brand: "#961313"
  brand-gradient-start: "#ab1d1d"
  brand-gradient-end: "#8a1010"
  on-brand: "#ffffff"
  ink: "#1c1917"
  text: "#292524"
  body: "#57534e"
  strong: "#44403c"
  muted: "#78716c"
  soft: "#a8a29e"
  canvas: "#fffdf9"
  surface: "#ffffff"
  hairline: "#ece5dd"
  stone-100: "#f5f5f4"
  stone-200: "#e7e5e4"
  tint: "#f7f2ec"
  tint-line: "#ebe2d8"
  brand-soft: "#fbefee"
  brand-soft-line: "#f1d2d0"
  success: "#15803d"
  success-soft: "#ecfdf3"
  success-line: "#bbf7d0"

typography:
  family: "Geist (next/font/google), system-ui fallback"
  display: { size: "clamp(44px, 5.4vw, 72px)", weight: 800, tracking: "-0.045em", leading: 1.02 }
  h2: { size: "clamp(34px, 4.2vw, 52px)", weight: 800, tracking: "-0.04em", leading: 1.08 }
  h3: { size: "clamp(28px, 3vw, 40px)", weight: 800, tracking: "-0.035em" }
  body: { size: "16-19px", weight: 400, leading: 1.6 }
  kicker: { size: "12px", weight: 700, tracking: "0.12em", transform: uppercase, color: brand }

radius:
  container: 24px
  card: 20px
  inner: 14px
  control: 999px

shadow:
  card: "0 1px 2px rgba(68,40,28,.05), 0 12px 32px -12px rgba(68,40,28,.14)"
  raised: "0 2px 4px rgba(68,40,28,.05), 0 30px 60px -24px rgba(68,40,28,.22)"
  brand: "0 10px 24px -10px rgba(150,19,19,.6)"
---

## Overview

Edify helps SS1 students revise every subject one week at a time: quick exam notes, full notes, hidden facts and WAEC-style practice. The interface should feel like a well-kept exercise book: warm paper, crisp dark ink and one confident crimson. Everything is light mode. All tokens live as CSS variables on `:root` in `src/app/globals.css`.

## Colors

### Brand & Accent
- **Crimson `#961313`** is the only accent. Use it for the key word in a headline, kickers, links, primary buttons, active states and focus rings.
- Primary surfaces that need weight use the vertical gradient `#ab1d1d → #961313 → #8a1010` (`--grad`).
- Soft crimson (`#fbefee` / `#f1d2d0`) is for selected chips, "Ready" pills and the quiz score badge.

### Surface
- Canvas `#fffdf9` (warm off-white). Cards are pure white with a warm hairline `#ece5dd`.
- Neutral callouts (memory aids, diagrams to draw) use the warm tint `#f7f2ec` with a crimson label, not a second hue.

### Text
- Headlines `#1c1917`, paragraphs `#57534e`, secondary text `#78716c`. `#a8a29e` is only for disabled or decorative text; it fails contrast for reading.
- All greys come from the warm stone family. Never mix in cool greys.

### Semantic
- Green (`#15803d` on `#ecfdf3`) only means correct, completed or ready-count. Wrong answers use crimson on `#fff5f5`.

## Typography

### Font Family
Geist via `next/font/google` (`--font-geist`). No serif anywhere; no Inter.

### Hierarchy
- Display h1: 800 weight, tight negative tracking, one key word wrapped in `.hl` (crimson text with a rounded 0.26em underline bar at 22% opacity).
- Section h2: same treatment, often split over two lines with the second line highlighted.
- Kicker above each heading: 12px uppercase, 0.12em tracking, crimson.
- Body 16–19px at 1.6–1.78 line height, max ~65ch.

### Principles
- `text-wrap: balance` on headings, `pretty` on paragraphs.
- Numbers that change or are compared (scores, progress) use `tabular-nums`.
- Use real typographic characters: `…`, curly quotes, en dashes.

## Layout

### Spacing System
Multiples of 4px. Sections breathe with 60–100px vertical padding; cards use 22–44px padding.

### Grid & Container
`.shell` = `min(1180px, 100% - 64px)`, centred; 16px side gutter under 600px. CSS grid for every multi-column layout.

### Responsive Strategy
- ≤900px: every two-column section stacks; the dashboard puts lessons before the term list.
- ≤600px: buttons go full width, floating hero chips are hidden, option grids become one column. No horizontal scroll at 375px.

## Elevation & Depth
- Two shadow levels, both tinted warm brown, never black or navy: `card` for resting cards, `raised` for hero/feature mock-ups and the "why" panel.
- Crimson buttons carry a crimson-tinted drop shadow.
- A fixed, pointer-events-none grain overlay (3.5% opacity, multiply) gives the canvas a paper feel.

## Shapes
- Containers 24px, cards 20px, inner elements 12–16px, controls fully rounded (pills).
- Nested radii shrink inward. Avatars are rounded squares (16px), small nav avatars are circles.

## Components

### Buttons
- **Primary pill**: crimson gradient, white 700 text, 16px/30px padding, lifts 2px on hover, scales to 0.98 on press.
- **Outline pill**: white, crimson text, soft crimson border; tints on hover.
- **Text link**: crimson 700 with an underline on hover.
- Icons are inline SVGs from `src/components/icons.tsx` (2px stroke, `aria-hidden`). No emoji or dingbat glyphs.

### Cards & Containers
White, warm hairline, `card` shadow. Use cards when elevation means something (a lesson, a subject, a question), not for every block of text.

### Navigation
A sticky white header (95% opacity, 12px blur) with a hairline bottom border. A crimson announcement bar above it on the home page. A skip link is the first focusable element.

### Signature Components
- **Mock window**: a white card with three small window dots showing a slice of the real UI (quiz question, quick notes, progress). Used in the hero and the feature rows.
- **Continue card**: a full-width crimson gradient card that links to the next unfinished lesson.
- **Status pills**: "Ready" (soft crimson), "Review" (green), "Coming soon" (stone).
- **Option buttons**: A–D letter badges; green when correct, crimson when wrong.
- **Skeletons**: warm shimmer blocks shaped like the dashboard or the lesson.

## Do's and Don'ts

### Do
- Keep copy subject-neutral. Edify covers every SS1 subject; Chemistry is only the first with content.
- Compute counts from the lesson registry (`src/data/catalog.ts`) and never hard-code them.
- Use sentence case for headings and buttons, active voice, numerals for counts.
- Give every interactive element a visible `:focus-visible` ring and hover and pressed states.
- Honour `prefers-reduced-motion` and animate only `transform` and `opacity`.

### Don't
- Add a second accent colour, purple/blue gradients or neon glows.
- Use emoji, pure black, cool greys or navy-tinted shadows.
- Use `transition: all`, serif fonts or oversized type beyond the scale above.
- Build three equal cards in a row; use zig-zag rows or asymmetric grids.
