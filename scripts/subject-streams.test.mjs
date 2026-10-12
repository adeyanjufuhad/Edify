import assert from "node:assert/strict";
import { test } from "node:test";
import { curriculum, subjectOpenTo } from "../src/data/curriculum.ts";

const subjects = curriculum.flatMap((term) => term.subjects);
const bySlug = (slug) => subjects.find((subject) => subject.slug === slug);

test("Mathematics is offered to every department except Arts", () => {
  const maths = bySlug("mathematics");
  assert.ok(maths, "the Mathematics subject exists");
  assert.equal(subjectOpenTo(maths, "arts"), false);
  for (const stream of ["medical", "technology", "business"]) assert.equal(subjectOpenTo(maths, stream), true, stream);
});

test("a learner with no department (JSS, or a senior who has not chosen one) sees Mathematics", () => {
  const maths = bySlug("mathematics");
  assert.equal(subjectOpenTo(maths, null), true);
  assert.equal(subjectOpenTo(maths, undefined), true);
});

test("subjects without an exclusion stay open to every department, Arts included", () => {
  for (const slug of ["chemistry", "biology", "physics"]) {
    const subject = bySlug(slug);
    assert.ok(subject, slug);
    for (const stream of ["medical", "technology", "arts", "business", null]) assert.equal(subjectOpenTo(subject, stream), true, `${slug} / ${stream}`);
  }
});

test("only known departments are ever excluded", () => {
  const known = ["medical", "technology", "arts", "business"];
  for (const subject of subjects) for (const stream of subject.excludedStreams ?? []) assert.ok(known.includes(stream), `${subject.slug}: ${stream}`);
});
