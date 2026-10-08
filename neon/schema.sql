-- Run in the Neon SQL editor after enabling Neon Auth for the branch.
-- Create separate Taiwo and Kehinde users in the Neon Auth console.
create table if not exists public.lesson_progress (
  user_id text not null,
  lesson_id text not null,
  completed boolean not null default false,
  notes text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

-- Only the server uses the database credential; client browsers call the
-- authenticated /api/progress route, which scopes every query by session user.
