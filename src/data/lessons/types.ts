export type LessonSection = { heading: string; paragraphs: string[]; points?: string[]; diagram?: string };
export type PracticeQuestion = { number: number; kind: "Objective" | "Theory"; prompt: string; options?: string[]; answer: string; explanation?: string };

export type QuickBlock = { heading: string; points: string[]; memory?: string; warning?: string };
export type QuickQuestion = { question: string; answer: string };
export type QuickNotes = { intro: string; blocks: QuickBlock[]; likely: QuickQuestion[] };

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
  quick?: QuickNotes;
  questions: PracticeQuestion[];
};
