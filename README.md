# Edify

An SS1 study space for Brainfield School, built with Next.js App Router, TypeScript and Tailwind CSS. The first published lesson is **First Term Chemistry · Week 1: Introduction to Chemistry**.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and set `DATABASE_URL` to your Neon connection string.
3. Run `neon/schema.sql` in the Neon SQL editor.
4. Run `npm run dev` and open `http://localhost:3000`.

There are no passwords or emails. The home page asks "Is this Taiwo or Kehinde?"; tapping a name stores that choice in a cookie and opens that learner's study space. Progress and notes are saved in Neon under the learner's slug, so each brother has separate memory on any device. This is a deliberate trade-off for a family site: anyone with the link can open either profile. To add a learner, add them to `src/lib/learners.ts`.

## Add lessons

1. **Map** — `src/data/curriculum.ts` lists every term, subject and week (each week has a URL `slug`). Add new subjects or terms there.
2. **Write** — create the lesson data file (copy `src/data/lessons/week-1.ts`; it must satisfy the `Lesson` type in `src/data/lessons/types.ts`, with a unique `id`).
3. **Register** — add it to `src/data/lessons/index.ts` under `"<term>/<subject>/<week slug>"`, e.g. `"first-term/chemistry/week-2"`.

That's all: the dashboard, the `/study/ss1/<term>/<subject>/<week>` page, the "up next" link and the `/api/progress` allow-list all read from the registry, so no route or API changes are needed. Pages under `/study` redirect to the home page until a learner has been picked.

The lesson text is original teaching material based on *Hidden Facts in SSCE Chemistry*, pp. 1–3 (PDF pages 3–5). The source PDF is not redistributed in this repository.
