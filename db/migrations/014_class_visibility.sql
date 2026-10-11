-- "Visible to my class" (docs/challenges.md). Safe to run twice. Needs 010.
-- A parent can let their child appear, with first name and class only, to other children in the same school and class
-- whose parents made the same choice. Those children can then send a classmate request with a challenge. The request is a
-- link with status 'pending' (requested_by says who asked); it becomes 'active' when the other child accepts or starts
-- the challenge, and only active links can chat. Declining blocks quietly, so the same child can't ask again.
alter table public.learner_social_settings add column if not exists class_visible boolean not null default false;
alter table public.learner_social_settings drop constraint if exists learner_social_settings_class_visible_check;
alter table public.learner_social_settings add constraint learner_social_settings_class_visible_check check (not class_visible or challenges_on);

alter table public.classmate_links add column if not exists requested_by uuid references public.learner_profiles(id) on delete cascade;
alter table public.classmate_links drop constraint if exists classmate_links_status_check;
alter table public.classmate_links add constraint classmate_links_status_check check (status in ('active', 'blocked', 'pending'));
alter table public.classmate_links drop constraint if exists classmate_links_requested_by_check;
alter table public.classmate_links add constraint classmate_links_requested_by_check check (requested_by is null or requested_by in (learner_a, learner_b));
