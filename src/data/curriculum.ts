import type { StreamId } from "./streams";

// Nigerian secondary school classes. Lessons are published class by class; SS1 is first.
export const CLASS_LEVELS = ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"] as const;
export type ClassLevel = (typeof CLASS_LEVELS)[number];
export const CURRICULUM_CLASS: ClassLevel = "SS1";

export function isClassLevel(value: string): value is ClassLevel {
  return (CLASS_LEVELS as readonly string[]).includes(value);
}

export type Week = { slug: string; label: string; topic: string };
// `excludedStreams` lists the senior departments a subject is NOT offered to. A subject with none is for everyone.
export type Subject = { slug: string; name: string; weeks: Week[]; excludedStreams?: readonly StreamId[] };
export type Term = { slug: string; name: string; subjects: Subject[] };

export const curriculum: Term[] = [
  {
    slug: "first-term", name: "First Term", subjects: [
      { slug: "chemistry", name: "Chemistry", weeks: [
        { slug: "week-1", label: "Week 01", topic: "Introduction to Chemistry" },
        { slug: "week-2", label: "Week 02", topic: "Familiarization with laboratory apparatus" },
        { slug: "week-3", label: "Week 03", topic: "Nature of matter" },
        { slug: "weeks-4-5", label: "Weeks 04–05", topic: "Chemical symbols & chemical formulas" },
        { slug: "weeks-6-7", label: "Weeks 06–07", topic: "Separation techniques" },
        { slug: "week-8", label: "Week 08", topic: "Particulate nature of matter" },
        { slug: "week-9", label: "Week 09", topic: "Dalton’s atomic theory & its modifications" },
        { slug: "week-10", label: "Week 10", topic: "Constituents of the atom" },
        { slug: "week-11", label: "Week 11", topic: "Electronic structure; isotopy" },
        { slug: "week-12", label: "Week 12", topic: "Electronic configuration" },
        { slug: "week-13", label: "Week 13", topic: "Revision & examination" },
      ] },
      { slug: "biology", name: "Biology", weeks: [
        { slug: "week-1", label: "Week 01", topic: "Introduction to Biology" },
        { slug: "week-2", label: "Week 02", topic: "Characteristics of living things" },
        { slug: "weeks-3-4", label: "Weeks 03–04", topic: "Classification of living things" },
        { slug: "week-5", label: "Week 05", topic: "Organisation of life" },
        { slug: "week-6", label: "Week 06", topic: "Energy: respiration and ATP" },
        { slug: "weeks-7-8", label: "Weeks 07–08", topic: "Plant nutrition: photosynthesis and chemosynthesis" },
        { slug: "week-9", label: "Week 09", topic: "Nutrient cycles" },
        { slug: "week-10", label: "Week 10", topic: "Animal nutrition: heterotrophic nutrition" },
        { slug: "week-11", label: "Week 11", topic: "Revision & examination" },
      ] },
      { slug: "physics", name: "Physics", weeks: [
        { slug: "week-1", label: "Week 01", topic: "Introduction to Physics" },
        { slug: "week-2", label: "Week 02", topic: "Fundamental and derived quantities and units" },
        { slug: "week-3", label: "Week 03", topic: "Position, distance and displacement" },
        { slug: "week-4", label: "Week 04", topic: "Measurement instruments and techniques" },
        { slug: "week-5", label: "Week 05", topic: "Concept of motion" },
        { slug: "week-6", label: "Week 06", topic: "Speed, velocity and acceleration" },
        { slug: "week-7", label: "Week 07", topic: "Mid-term review" },
        { slug: "week-8", label: "Week 08", topic: "Equations of uniformly accelerated motion" },
        { slug: "week-9", label: "Week 09", topic: "Graphical representation of motion" },
        { slug: "week-10", label: "Week 10", topic: "Forces and friction" },
        { slug: "week-11", label: "Week 11", topic: "Circular motion, density and relative density" },
        { slug: "weeks-12-13", label: "Weeks 12–13", topic: "Revision & examination" },
      ] },
      { slug: "mathematics", name: "Mathematics", excludedStreams: ["arts"], weeks: [
        { slug: "week-1", label: "Week 01", topic: "Number bases (Part 1)" },
        { slug: "week-2", label: "Week 02", topic: "Number bases (Part 2)" },
        { slug: "week-3", label: "Week 03", topic: "Modular arithmetic" },
        { slug: "week-4", label: "Week 04", topic: "Indices (laws of indices)" },
        { slug: "week-5", label: "Week 05", topic: "Logarithms (Part 1)" },
        { slug: "week-6", label: "Week 06", topic: "Logarithms (Part 2): four-figure tables" },
        { slug: "week-7", label: "Week 07", topic: "Mid-term review" },
        { slug: "week-8", label: "Week 08", topic: "Sets (theory and notation)" },
        { slug: "week-9", label: "Week 09", topic: "Venn diagrams and applications" },
        { slug: "week-10", label: "Week 10", topic: "Simple algebraic fractions" },
        { slug: "week-11", label: "Week 11", topic: "Linear equations and change of subject of a formula" },
        { slug: "weeks-12-13", label: "Weeks 12–13", topic: "Revision & examination" },
      ] },
    ],
  },
  { slug: "second-term", name: "Second Term", subjects: [] },
  { slug: "third-term", name: "Third Term", subjects: [] },
];

// Whether a learner in this department can see the subject. A learner with no department (JSS, or a senior
// profile that has not chosen one yet) sees every subject.
export function subjectOpenTo(subject: Subject, stream: StreamId | null | undefined) {
  return !stream || !subject.excludedStreams?.includes(stream);
}

export function lessonPath(term: Term, subject: Subject, week: Week) {
  return `/study/ss1/${term.slug}/${subject.slug}/${week.slug}`;
}
