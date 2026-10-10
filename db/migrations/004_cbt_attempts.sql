-- Computer-based test (CBT) attempts, one row per submitted test (applied to production 2026-10-10).
-- lesson_ids are the lessons the paper drew from; answers holds every question as
-- { q: "<lesson id>#<question number>", picked: "A".."D" | null, correct: "A".."D", flagged: bool, order: "BDAC" }
-- where `order` is the original option letters in the order they were shown.
create table if not exists public.cbt_attempts (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learner_profiles(id) on delete cascade,
  mode text not null check (mode in ('week', 'weeks', 'term', 'midterm')),
  lesson_ids text[] not null check (cardinality(lesson_ids) > 0),
  total integer not null check (total between 1 and 200),
  score integer not null check (score between 0 and total),
  duration_seconds integer not null check (duration_seconds >= 0),
  answers jsonb not null,
  created_at timestamptz not null default now()
);
create index if not exists cbt_attempts_learner_idx on public.cbt_attempts (learner_id, created_at desc);
