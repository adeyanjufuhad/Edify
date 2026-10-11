// Senior secondary streams. Parents choose one for each SS1 to SS3 learner; JSS learners have no stream.
export const STREAMS = [
  { id: "science", label: "Science" },
  { id: "technical", label: "Technical" },
  { id: "arts", label: "Arts" },
  { id: "business", label: "Business" },
] as const;

export type StreamId = (typeof STREAMS)[number]["id"];

const SENIOR_CLASSES: readonly string[] = ["SS1", "SS2", "SS3"];

export function isSeniorClass(classLevel: string) {
  return SENIOR_CLASSES.includes(classLevel);
}

export function isStreamId(value: unknown): value is StreamId {
  return STREAMS.some((stream) => stream.id === value);
}

export function streamLabel(id: StreamId | null | undefined) {
  return STREAMS.find((stream) => stream.id === id)?.label ?? null;
}
