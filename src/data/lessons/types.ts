export type LessonSection = { heading: string; paragraphs: string[]; points?: string[]; diagram?: string };
export type PracticeQuestion = { number: number; kind: "Objective" | "Theory"; prompt: string; options?: string[]; answer: string; explanation?: string };

export type Lesson = {
  id: string;
  week: string;
  title: string;
  subtitle: string;
  source: string;
  objectives: string[];
  sections: LessonSection[];
  hiddenFacts: string[];
  summary: string;
  questions: PracticeQuestion[];
};
