// Turns Neon Auth (Better Auth) error codes into messages that say how to fix the problem.
export function authErrorMessage(error: { code?: string; message?: string; status?: number } | null | undefined, fallback: string) {
  switch (error?.code) {
    case "USER_ALREADY_EXISTS":
    case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL":
      return "An account with this email already exists. Log in instead, or reset your password.";
    case "INVALID_EMAIL_OR_PASSWORD":
    case "INVALID_PASSWORD":
    case "INVALID_EMAIL":
      return "That email or password isn’t right. Check them and try again.";
    case "PASSWORD_TOO_SHORT":
      return "Use a password with at least 8 characters.";
    case "PASSWORD_TOO_LONG":
      return "Use a shorter password (up to 128 characters).";
    case "EMAIL_PASSWORD_SIGN_UP_DISABLED":
      return "New sign-ups are paused for a moment. Try again later today.";
    case "INVALID_OTP":
      return "That code isn’t right. Check the latest email and try again.";
    case "OTP_EXPIRED":
      return "That code has expired. Send a new one and try again.";
    case "TOO_MANY_ATTEMPTS":
      return "Too many tries. Send a new code and try again.";
    default:
      return error?.status === 429 ? "Too many tries. Wait a minute, then try again." : fallback;
  }
}

export const VERIFY_EMAIL_KEY = "edify_verify_email";
