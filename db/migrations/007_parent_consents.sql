-- Records that a parent or guardian agreed to the privacy policy and terms of use (NOT yet applied to production).
-- legal_version is LEGAL_VERSION from src/data/legal.ts at the moment they agreed. A parent who has not agreed
-- to the current version is asked again before they can add learners, study or pay. Deleting the parent's
-- account deletes their consent records with it (on delete cascade).
create table if not exists public.parent_consents (
  parent_id uuid not null references neon_auth."user"(id) on delete cascade,
  legal_version text not null check (char_length(btrim(legal_version)) between 1 and 60),
  accepted_at timestamptz not null default now(),
  primary key (parent_id, legal_version)
);
-- Browser roles must never read or write consent records.
alter table public.parent_consents enable row level security;
