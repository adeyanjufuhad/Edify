// The A1–F9 grade bands used in Nigerian secondary school exams, so a practice score reads like a real result.
const GRADES: [number, string, string][] = [
  [75, "A1", "Excellent. You know this topic well."],
  [70, "B2", "Very good. Review the few you missed."],
  [65, "B3", "Good. One more pass and you’re there."],
  [60, "C4", "Credit. Go over the misses, then retry them."],
  [55, "C5", "Credit. Reread the quick notes for the misses."],
  [50, "C6", "Credit, just. Study the exam tips, then retry."],
  [45, "D7", "Pass. Read the full notes, then try again."],
  [40, "E8", "Pass, just. Work through the full notes first."],
  [0, "F9", "Not yet. Read the lesson again, then retry."],
];

export function examGrade(percent: number) {
  const [, grade, advice] = GRADES.find(([min]) => percent >= min) ?? GRADES[GRADES.length - 1];
  return { grade, advice, great: grade[0] === "A" || grade[0] === "B" };
}
