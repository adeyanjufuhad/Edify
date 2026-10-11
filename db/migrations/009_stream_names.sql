-- Renames two streams: 'science' becomes 'medical' and 'technical' becomes 'technology' (applied to production 2026-10-11).
-- Existing values are moved across before the check constraint changes, so no row is left holding an old name.
alter table public.learner_profiles drop constraint if exists learner_profiles_stream_check;
update public.learner_profiles set stream = case stream when 'science' then 'medical' when 'technical' then 'technology' else stream end
  where stream in ('science', 'technical');
alter table public.learner_profiles add constraint learner_profiles_stream_check
  check (stream is null or stream in ('medical', 'technology', 'arts', 'business'));
