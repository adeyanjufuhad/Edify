export type Week = { slug: string; label: string; topic: string };
export type Subject = { slug: string; name: string; weeks: Week[] };
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
    ],
  },
  { slug: "second-term", name: "Second Term", subjects: [] },
  { slug: "third-term", name: "Third Term", subjects: [] },
];

export function lessonPath(term: Term, subject: Subject, week: Week) {
  return `/study/ss1/${term.slug}/${subject.slug}/${week.slug}`;
}
