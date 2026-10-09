export function displayName(name: string | null | undefined, email?: string | null): string {
  const fromName = name?.trim().split(/\s+/)[0];
  if (fromName) return fromName;
  const fromEmail = email?.split("@")[0]?.replace(/[^a-zA-Z]/g, "");
  return fromEmail ? fromEmail[0].toUpperCase() + fromEmail.slice(1).toLowerCase() : "Learner";
}
