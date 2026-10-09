-- Run once in the Neon SQL editor.
-- user_id is the learner's profile slug ("taiwo" or "kehinde"; see src/lib/learners.ts).
create table if not exists public.lesson_progress (
  user_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  notes text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Only the server uses the database credential; browsers call /api/progress,
-- which scopes every query to the profile chosen on the home page.
