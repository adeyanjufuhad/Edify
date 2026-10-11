-- Classmate links, challenges and the parent controls (phase 1 of docs/challenges.md). NOT applied to production.
-- Apply by hand in the Neon SQL editor before setting CHALLENGES_ENABLED=true. Safe to run twice.
--
-- Every table here belongs to a learner or a parent and is removed with them (on delete cascade). The browser roles
-- must never read or write these tables: row level security is on and no policy is created, so only the server's
-- database role (the table owner) can use them.

-- What each parent has switched on for each learner. No row means everything is off. Chat needs challenges and voice
-- notes need chat, so a parent cannot leave a feature on that depends on one they turned off.
create table if not exists public.learner_social_settings (
  learner_id uuid primary key references public.learner_profiles(id) on delete cascade,
  challenges_on boolean not null default false,
  presence_on boolean not null default false,
  chat_on boolean not null default false,
  voice_on boolean not null default false,
  updated_at timestamptz not null default now(),
  check (not presence_on or challenges_on),
  check (not chat_on or challenges_on),
  check (not voice_on or chat_on)
);

-- One-time classmate codes. Only the SHA-256 of the code is stored, so a leaked copy of the table cannot be used.
create table if not exists public.classmate_invites (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references public.learner_profiles(id) on delete cascade,
  parent_id uuid not null references neon_auth."user"(id) on delete cascade,
  code_hash text not null unique check (char_length(code_hash) = 64),
  expires_at timestamptz not null,
  used_at timestamptz,
  used_by_learner uuid references public.learner_profiles(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists classmate_invites_learner_idx on public.classmate_invites (learner_id);
create index if not exists classmate_invites_parent_idx on public.classmate_invites (parent_id, created_at desc);

-- A link between two learners whose parents agreed (one made a code, the other used it). The pair is stored in a fixed
-- order (learner_a < learner_b) so there is at most one link per pair.
create table if not exists public.classmate_links (
  id uuid primary key default gen_random_uuid(),
  learner_a uuid not null references public.learner_profiles(id) on delete cascade,
  learner_b uuid not null references public.learner_profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active', 'blocked')),
  blocked_by uuid references public.learner_profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  check (learner_a < learner_b),
  check (blocked_by is null or blocked_by in (learner_a, learner_b)),
  unique (learner_a, learner_b)
);
create index if not exists classmate_links_b_idx on public.classmate_links (learner_b);

-- A challenge. `paper` is a frozen copy of the questions and answers (an array of { key, prompt, options[], answer,
-- explanation }) so both players get exactly the same paper even if the lessons are edited later. term_slug is null
-- for "all terms". status: 'open' covers invited, in progress and finished (finished_at says when both handed in).
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  challenger_id uuid not null references public.learner_profiles(id) on delete cascade,
  opponent_id uuid not null references public.learner_profiles(id) on delete cascade,
  subject_slug text not null check (char_length(subject_slug) between 1 and 60),
  subject_name text not null check (char_length(subject_name) between 1 and 80),
  term_slug text check (term_slug is null or char_length(term_slug) between 1 and 60),
  term_name text not null check (char_length(term_name) between 1 and 80),
  question_count integer not null check (question_count between 5 and 40),
  minutes integer not null check (minutes between 1 and 60),
  paper jsonb not null,
  status text not null default 'open' check (status in ('open', 'declined', 'cancelled')),
  expires_at timestamptz not null,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  check (challenger_id <> opponent_id)
);
create index if not exists challenges_challenger_idx on public.challenges (challenger_id, created_at desc);
create index if not exists challenges_opponent_idx on public.challenges (opponent_id, created_at desc);

-- Each player's try at a challenge. started_at is stamped by the server when the player starts, so reloading the page
-- never restarts the clock. answers: [{ q, picked: "A".."D" | null, correct }].
create table if not exists public.challenge_entries (
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  learner_id uuid not null references public.learner_profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  score integer,
  total integer,
  duration_seconds integer,
  answers jsonb,
  primary key (challenge_id, learner_id),
  check (submitted_at is null or (score is not null and total is not null and duration_seconds is not null)),
  check (score is null or (score >= 0 and score <= total)),
  check (duration_seconds is null or duration_seconds >= 0)
);
create index if not exists challenge_entries_learner_idx on public.challenge_entries (learner_id, submitted_at desc);

-- Reports a learner sent about a classmate. There is no admin screen: the owner reads this table (see docs/challenges.md).
-- message_id points at a chat message (phase 3) without a foreign key, so the report outlives the message; the text is
-- copied into message_excerpt for that reason.
create table if not exists public.classmate_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null references public.learner_profiles(id) on delete cascade,
  reported_id uuid not null references public.learner_profiles(id) on delete cascade,
  reason text not null check (reason in ('unkind', 'personal-details', 'unsafe', 'cheating', 'other')),
  note text check (note is null or char_length(note) <= 300),
  message_id uuid,
  message_excerpt text check (message_excerpt is null or char_length(message_excerpt) <= 500),
  created_at timestamptz not null default now()
);
create index if not exists classmate_reports_created_idx on public.classmate_reports (created_at desc);

-- Rate limiting: one row per action, counted over a short window and purged after two days. Each row belongs to a
-- learner or to a parent (never both) and goes with them.
create table if not exists public.social_events (
  id bigint generated always as identity primary key,
  learner_id uuid references public.learner_profiles(id) on delete cascade,
  parent_id uuid references neon_auth."user"(id) on delete cascade,
  kind text not null check (char_length(kind) between 1 and 40),
  created_at timestamptz not null default now(),
  check ((learner_id is not null) <> (parent_id is not null))
);
create index if not exists social_events_learner_idx on public.social_events (learner_id, kind, created_at desc) where learner_id is not null;
create index if not exists social_events_parent_idx on public.social_events (parent_id, kind, created_at desc) where parent_id is not null;

alter table public.learner_social_settings enable row level security;
alter table public.classmate_invites enable row level security;
alter table public.classmate_links enable row level security;
alter table public.challenges enable row level security;
alter table public.challenge_entries enable row level security;
alter table public.classmate_reports enable row level security;
alter table public.social_events enable row level security;
