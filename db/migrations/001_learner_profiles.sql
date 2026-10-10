-- Child profiles under a parent's Neon Auth account (applied to production 2026-10-10).
-- lesson_progress.user_id holds the profile id (as text) for these learners.
create table if not exists public.learner_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references neon_auth."user"(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 40),
  class_level text not null default 'SS1',
  pin_hash text not null,
  created_at timestamptz not null default now()
);
create index if not exists learner_profiles_parent_idx on public.learner_profiles (parent_id);
