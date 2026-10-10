-- Each learner's school, asked for when a parent adds them (applied to production 2026-10-10).
-- Nullable so learners added before this column existed keep working.
alter table public.learner_profiles
  add column if not exists school text
  check (school is null or char_length(btrim(school)) between 2 and 80);
