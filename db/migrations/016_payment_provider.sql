-- Monnify replaced Paystack as the payment provider (November 2026). The column that holds the provider's own
-- transaction id gets a neutral name. Apply this BEFORE setting the Monnify keys on the server: confirming a
-- payment writes to provider_id. Safe to run twice.
do $$
begin
  if exists (select 1 from information_schema.columns
             where table_schema = 'public' and table_name = 'payments' and column_name = 'paystack_id') then
    alter table public.payments rename column paystack_id to provider_id;
  end if;
end $$;
