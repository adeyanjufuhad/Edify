-- Parent PIN (an optional second lock on the parent area: changing or removing learners, their PINs and details, the
-- classmate settings, and deleting the account). Safe to run twice. Needs 001 (neon_auth."user").
-- Wrong PIN tries are counted in public.social_events (010). Where 010 is not applied, the learner PIN still works
-- without a try limit, and the parent PIN refuses to unlock until it is (see src/lib/pin-tries.ts).
--
-- One row per parent who has set a PIN. pin_hash is "<salt hex>:<scrypt hash hex>", the same format as the learner
-- PINs; null means no parent PIN. The row goes with the parent's sign-in (on delete cascade), and account deletion
-- also removes it explicitly (src/lib/account-deletion-sql.ts). Row level security is on with no policy, so only the
-- server's database role (the table owner) can read or write it.
create table if not exists public.parent_settings (
  parent_id uuid primary key references neon_auth."user"(id) on delete cascade,
  pin_hash text check (pin_hash is null or char_length(pin_hash) between 16 and 200),
  updated_at timestamptz not null default now()
);

alter table public.parent_settings enable row level security;
