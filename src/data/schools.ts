// Schools suggested when a parent adds a learner. Any other school can be typed in.
export const SUGGESTED_SCHOOLS = ["Brainfield School", "Adams College"] as const;

// Tidy what a parent typed, and use the suggested spelling when it matches one ignoring case.
export function normalizeSchool(value: string) {
  const school = value.trim().replace(/\s+/g, " ");
  return SUGGESTED_SCHOOLS.find((name) => name.toLowerCase() === school.toLowerCase()) ?? school;
}
