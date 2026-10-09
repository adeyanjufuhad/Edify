# Edify

An SS1 study space for Brainfield School, built with Next.js App Router, TypeScript and Tailwind CSS. The first published lesson is **First Term Chemistry · Week 1: Introduction to Chemistry**.

## Run locally

1. Run `npm install`.
2. Copy `.env.example` to `.env.local` and fill in the Neon values.
3. Run `neon/schema.sql` in the Neon SQL editor.
4. Run `npm run dev` and open `http://localhost:3000`.

The landing page can render without Neon. Login, saved notes and progress require a Neon project with Neon Auth enabled and two separate email/password users named **Taiwo** and **Kehinde**. Keep `DATABASE_URL` and `NEON_AUTH_COOKIE_SECRET` server-side; do not commit `.env.local`. Set `NEXT_PUBLIC_NEON_AUTH_READY=true` only after Neon Auth and the database table are configured. Configure your deployed site's origin in Neon Auth's trusted domains.

For the existing Edify Neon project, Taiwo and Kehinde's users have been created and public sign-up is disabled. Each learner must use **Set or reset your password** on the login page and complete the email link personally before their first login. A local reset link points to `localhost`, so open it on the same computer while the development server runs; after deployment, request a fresh link from the live site. Passwords should never be stored in this repository.

## Add lessons

1. **Map** — `src/data/curriculum.ts` lists every term, subject and week (each week has a URL `slug`). Add new subjects or terms there.
2. **Write** — create the lesson data file (copy `src/data/lessons/week-1.ts`; it must satisfy the `Lesson` type in `src/data/lessons/types.ts`, with a unique `id`).
3. **Register** — add it to `src/data/lessons/index.ts` under `"<term>/<subject>/<week slug>"`, e.g. `"first-term/chemistry/week-2"`.

That's all: the dashboard, the `/study/ss1/<term>/<subject>/<week>` page, the "up next" link and the `/api/progress` allow-list all read from the registry, so no route or API changes are needed. Pages under `/study` are protected on the server and redirect to `/login` when signed out.

The lesson text is original teaching material based on *Hidden Facts in SSCE Chemistry*, pp. 1–3 (PDF pages 3–5). The source PDF is not redistributed in this repository.
