// Shared facts for /privacy, /terms and the sign-up consent record.
// Bump LEGAL_VERSION whenever either page changes in a way parents must agree to again;
// it is saved with each parent's consent in public.parent_consents.
export const LEGAL_VERSION = "2026-10-10-draft";
export const LEGAL_UPDATED = "10 October 2026";

// Filled in by the owner before launch. Shown on the pages as highlighted placeholders until then.
export const OPERATOR = { name: "", address: "", email: "" };
