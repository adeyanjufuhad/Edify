// Shared facts for /privacy, /terms and the sign-up consent record.
// Bump LEGAL_VERSION whenever either page changes in a way parents must agree to again;
// it is saved with each parent's consent in public.parent_consents.
export const LEGAL_VERSION = "2026-10-10-draft";
export const LEGAL_UPDATED = "10 October 2026";

// Filled in by the owner before launch. Shown on the pages as highlighted placeholders until then.
// The email is still to come: until it is set, the pages show a highlighted gap for it.
export const OPERATOR = {
  name: "BRANDING KORNER GLOBAL CONSULT LIMITED",
  address: "No. 5 Martins Ajani Street, Ijaiye, Ahmadiyyah, Lagos State, Nigeria",
  email: "",
};
