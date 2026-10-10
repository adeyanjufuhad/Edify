import assert from "node:assert/strict";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) process.loadEnvFile(".env.local");
const sql = neon(process.env.DATABASE_URL);
// Clone only the schema into a transaction-local temporary table. No customer rows are touched.
const results = await sql.transaction([
  sql`create temporary table payment_checks (like public.payments including all) on commit drop`,
  sql`insert into payment_checks (reference, profile_id, plan, amount, customer_email, mode)
    values ('first', '00000000-0000-0000-0000-000000000001', 'silver', 300000, 'test@example.invalid', 'live')`,
  sql`insert into payment_checks (reference, profile_id, plan, amount, customer_email, mode)
    values ('retry', '00000000-0000-0000-0000-000000000001', 'silver', 300000, 'test@example.invalid', 'live')
    on conflict (profile_id, plan, mode) where status = 'pending' do update set profile_id = excluded.profile_id returning reference`,
  sql`update payment_checks set status = 'success', paid_at = now(), term_end = now() + interval '105 days', paystack_id = 'test-1'
    where reference = 'first' and status = 'pending' returning reference`,
  sql`update payment_checks set status = 'success', paid_at = now(), term_end = now() + interval '105 days', paystack_id = 'test-1'
    where reference = 'first' and status = 'pending' returning reference`,
  sql`insert into payment_checks (reference, profile_id, plan, amount, customer_email, mode, status, term_end)
    values ('expired', '00000000-0000-0000-0000-000000000001', 'gold', 500000, 'test@example.invalid', 'live', 'success', now() - interval '1 second'),
           ('test-only', '00000000-0000-0000-0000-000000000001', 'gold', 500000, 'test@example.invalid', 'test', 'success', now() + interval '105 days')`,
  sql`select plan from payment_checks where profile_id = '00000000-0000-0000-0000-000000000001'
    and status = 'success' and term_end > now() and mode = 'live'
    order by case plan when 'gold' then 3 when 'silver' then 2 else 1 end desc, term_end desc limit 1`,
]);
assert.equal(results[2][0].reference, "first", "retries must reuse the existing pending order");
assert.equal(results[3].length, 1, "first confirmation must update the order");
assert.equal(results[4].length, 0, "repeated confirmation must not grant access twice");
assert.equal(results[6][0].plan, "silver", "expired and test orders must not grant live access");
console.log("Database checks passed: pending-order reuse, idempotent confirmation, expiry and live-mode access.");
