# Privacy and terms completion record

Reviewed: 13 October 2026. Owner/contact: Adeyanju Fuhad.

The public pages remain drafts. This document records evidence and outstanding work; it is not a legal sign-off.

## Completed policy decisions

- Change-of-mind refund requests: within 72 hours of payment, with a receipt containing the payment session ID. If no session ID was issued, help identify the payment using the receipt and transaction reference.
- Acknowledge requests within two working days. Adeyanju Fuhad approves refunds. Submit approved refunds through Paystack within 24 hours of approval; bank settlement is separate.
- Privacy requests: target acknowledgement in two working days and substantive response within 30 calendar days, subject to applicable law.
- Routine support correspondence: target deletion 12 months after closure unless a dispute or legal obligation requires retention. This is a manual operating policy, not an implemented email-deletion job.
- Planned closure and sponsorship termination: normally 30 calendar days' notice. Refund unused paid access proportionately on closure.

## Technical evidence and remaining checks

| Item | Evidence or next action |
| --- | --- |
| Social cleanup schedule | `vercel.json` schedules `/api/cron/social-purge` at 03:17 UTC daily. |
| Production credentials | Production `CRON_SECRET` metadata exists, checked 13 October 2026 without revealing its value. Its presence alone does not prove successful authentication or execution. |
| Successful cleanup | Not verified. Vercel rejected the 24-hour log query because the Hobby plan retains only one hour. Check a scheduled invocation during its retained log window and confirm success, not merely HTTP 200: the route can return a skipped response when challenges are disabled. Do not run a destructive purge just to obtain evidence. |
| Retention | Values live in `src/lib/social-rules.ts`; deletion queries are in `src/lib/social-queries.ts`. Confirm each category is removed, including voice data and reported-message handling. |
| Payments | Account deletion unlinks payment records but retains email. No approved financial retention period or automatic payment cleanup exists. Obtain accounting/legal advice before implementing deletion or masking; do not apply Paystack's own retention period automatically to Edify. |
| Access controls | Review actual Neon project members, database roles, Vercel members and support mailbox access; record who can access children's data. Verify audit logging rather than assuming it exists. |
| Backups | Confirm the current Neon restore-history setting before relying on the public six-hour statement. |
| Support mailbox | Gmail handles receipts and support correspondence. Keep access restricted, avoid passwords/PINs/full card details, and perform the manual retention review. |

## Refund operating procedure

1. Record the received date, account email, receipt, session ID or alternative transaction reference, amount and reason. Preserve the original request date while seeking missing information.
2. Match the request against the payment record and Paystack transaction. Do not approve from a screenshot alone. Investigate duplicate charges and missing access separately from change-of-mind eligibility.
3. Record Adeyanju Fuhad's decision, approval time and amount. Submit the approved refund through Paystack within 24 hours and retain its reference.
4. Verify the provider's status before telling the customer it is completed. Explain bank settlement timing separately.
5. Reconcile the refund with learner access. The existing webhook handles successful charges; these policy changes do not add automated refund handling or access revocation. Any manual adjustment must target the correct purchase and must not cancel a later valid purchase.

## Evidence needed before removing draft status

- Nigerian legal review of lawful bases, children's consent and verification, classmate discovery, messages, voice notes, safeguarding and whether a DPIA is required.
- Determine NDPC registration, filing and DPO obligations for this business; retain the actual determination and any registration/appointment evidence.
- Review international transfers and provider agreements for Neon, Vercel, Google and Paystack.
- Approve financial retention periods, unpaid-order cleanup, legal holds, report retention and deletion procedures.
- Review consumer refund rights and the liability limitation; a general rights-saving sentence is not proof that every clause is enforceable.
- Audit rights to every lesson, question, diagram, logo and other asset; original wording alone is not proof that all rights are cleared.
- Document breach escalation, assessment, notification duties and responsibilities with qualified Nigerian advice.

## Sources checked

- [Paystack privacy policy](https://website-v4.paystack.co/privacy-policy): provider processing and international transfers; checked 13 October 2026.
- [Paystack refund guidance](https://support.paystack.com/en/articles/2127106): refund submission and bank settlement are separate.
- [NDPC GAID source](https://ndpc.gov.ng/wp-content/uploads/2025/07/NDP-ACT-GAID-2025-MARCH-20TH.pdf): official search result found, but direct retrieval returned 403 during this review. No legal sign-off is inferred from that search result.

After substantive policy changes, update `src/data/legal.ts` so the existing consent flow requests the new version. Keep review items visible until the evidence above is recorded.
