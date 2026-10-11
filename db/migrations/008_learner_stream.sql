-- Each senior secondary learner's stream (Science, Technical, Arts or Business), asked for when a parent adds an SS1 to SS3 learner.
-- Nullable: JSS learners have no stream, and learners added before this column existed keep working.
alter table public.learner_profiles
  add column if not exists stream text
  check (stream is null or stream in ('science', 'technical', 'arts', 'business'));
