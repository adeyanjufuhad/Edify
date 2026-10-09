export type LearnerProfile = { slug: string; name: string };

// The learners who use Edify. Progress is stored under each slug.
export const LEARNERS: LearnerProfile[] = [
  { slug: "taiwo", name: "Taiwo" },
  { slug: "kehinde", name: "Kehinde" },
];

export const LEARNER_COOKIE = "edify_learner";

export function findLearner(slug: string | undefined | null): LearnerProfile | undefined {
  return LEARNERS.find((learner) => learner.slug === slug);
}
