export type Week = { number: number; label: string; topic: string; available: boolean };
export type Subject = { slug: string; name: string; weeks: Week[] };
export type Term = { slug: string; name: string; subjects: Subject[] };

export const curriculum: Term[] = [
  {
    slug: "first-term", name: "First Term", subjects: [
      { slug: "chemistry", name: "Chemistry", weeks: [
        { number: 1, label: "Week 01", topic: "Introduction to Chemistry", available: true },
        { number: 2, label: "Week 02", topic: "Familiarization with laboratory apparatus", available: false },
        { number: 3, label: "Week 03", topic: "Nature of matter", available: false },
        { number: 4, label: "Weeks 04–05", topic: "Chemical symbols & chemical formulas", available: false },
        { number: 6, label: "Weeks 06–07", topic: "Separation techniques", available: false },
        { number: 8, label: "Week 08", topic: "Particulate nature of matter", available: false },
        { number: 9, label: "Week 09", topic: "Dalton’s atomic theory & its modifications", available: false },
        { number: 10, label: "Week 10", topic: "Constituents of the atom", available: false },
        { number: 11, label: "Week 11", topic: "Electronic structure; isotopy", available: false },
        { number: 12, label: "Week 12", topic: "Electronic configuration", available: false },
        { number: 13, label: "Week 13", topic: "Revision & examination", available: false },
      ] },
    ],
  },
  { slug: "second-term", name: "Second Term", subjects: [] },
  { slug: "third-term", name: "Third Term", subjects: [] },
];

export const firstTermChemistry = curriculum[0].subjects[0];
