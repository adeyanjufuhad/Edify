-- Each learner's plan, and the referral code that sponsored it (applied to production 2026-10-10).
-- Plans are display only during the beta; a valid referral code sets 'gold'.
alter table public.learner_profiles
  add column if not exists plan text not null default 'free' check (plan in ('free', 'bronze', 'silver', 'gold')),
  add column if not exists referral_code text check (referral_code is null or char_length(referral_code) between 1 and 40);
