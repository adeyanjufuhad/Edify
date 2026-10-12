// The parent PIN numbers, shared by the server (src/lib/parent-lock.ts) and the forms that explain them.
export const PARENT_PIN_PATTERN = /^\d{4,8}$/;
// How long one unlock of the parent area lasts.
export const UNLOCK_MINUTES = 15;
// How recent a sign-in must be to choose a new parent PIN without the old one (a forgotten PIN).
export const FRESH_SIGN_IN_MINUTES = 10;
