// Shared facts for /privacy, /terms and the sign-up consent record.
// Bump LEGAL_VERSION whenever either page changes in a way parents must agree to again;
// it is saved with each parent's consent in public.parent_consents.
export const LEGAL_VERSION = "2026-10-11-2-draft";
export const LEGAL_UPDATED = "11 October 2026";

// Filled in by the owner before launch. Anything left empty shows on the pages as a highlighted placeholder.
// The contact email was added on 2026-10-11 (the owner's own address, given in chat). Adding it did not change the
// meaning of either page, so LEGAL_VERSION was not bumped.
export const OPERATOR = {
  name: "BRANDING KORNER GLOBAL CONSULT LIMITED",
  address: "No. 5 Martins Ajani Street, Ijaiye, Ahmadiyyah, Lagos State, Nigeria",
  email: "adeyanjufuhad@gmail.com",
};
