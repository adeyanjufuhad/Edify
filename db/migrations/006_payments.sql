-- Paystack orders are the source of truth for paid access, not browser callbacks.
create table if not exists public.payments (
  reference text primary key,
  parent_id uuid references neon_auth."user"(id) on delete set null,
  profile_id uuid references public.learner_profiles(id) on delete set null,
  plan text not null check (plan in ('bronze', 'silver', 'gold')),
  amount integer not null check (amount > 0),
  currency text not null default 'NGN' check (currency = 'NGN'),
  customer_email text not null,
  term_end timestamptz,
  mode text not null check (mode in ('test', 'live')),
  status text not null default 'pending' check (status in ('pending', 'success')),
  paystack_id text unique,
  checkout_url text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists payments_access_idx on public.payments (profile_id, term_end) where status = 'success';
create index if not exists payments_parent_idx on public.payments (parent_id, created_at desc);
create unique index if not exists payments_pending_idx on public.payments (profile_id, plan, mode) where status = 'pending';
-- Browser roles must never create or mark payments as successful.
alter table public.payments enable row level security;
