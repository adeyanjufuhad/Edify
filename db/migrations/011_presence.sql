-- "Online now" (phase 2 of docs/challenges.md). NOT applied to production. Needs 010 first.
-- One timestamp per learner, overwritten by a heartbeat every 30 seconds while the learner's tab is open and their
-- parent has switched presence on. A learner counts as online when it is under 75 seconds old. Removed with the
-- learner, and deleted when a parent switches presence off.
create table if not exists public.learner_presence (
  learner_id uuid primary key references public.learner_profiles(id) on delete cascade,
  last_seen_at timestamptz not null default now()
);

alter table public.learner_presence enable row level security;
