import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek10: Lesson = {
  id: "ss1-first-mathematics-week-10",
  week: "Week 10",
  title: "Simple algebraic fractions",
  subtitle: "Factorise, simplify, multiply, divide, add and subtract algebraic fractions, and find the values of the unknown for which a fraction is undefined.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Factorise common factors, differences of two squares and simple trinomials.",
    "Simplify algebraic fractions by cancelling common factors.",
    "Multiply and divide algebraic fractions.",
    "Add and subtract fractions with monomial and binomial denominators using the lowest common multiple.",
    "Find the values of the variable for which a fraction is undefined, or equal to zero.",
  ],
  sections: [
    {
      heading: "1. Factorising first",
      paragraphs: [
        "An algebraic fraction is a fraction in which the numerator, the denominator or both contain letters, such as (x + 1)/(x − 2). Nearly every question on algebraic fractions begins with factorising, so we begin with a quick review of the three types you need.",
        "Common factor: 2x + 6 = 2(x + 3) and x² + 3x = x(x + 3). Difference of two squares: a² − b² = (a − b)(a + b), so x² − 9 = (x − 3)(x + 3) and x² − 4 = (x − 2)(x + 2). Trinomials: to factorise x² + bx + c, find two numbers that multiply to give c and add to give b. For x² − 5x + 6, the numbers are −2 and −3, so x² − 5x + 6 = (x − 2)(x − 3). For x² + x − 12, the numbers are 4 and −3, so x² + x − 12 = (x + 4)(x − 3).",
      ],
    },
    {
      heading: "2. Simplifying an algebraic fraction",
      paragraphs: [
        "To simplify, factorise the numerator and the denominator completely, then cancel the factors that appear in both. You may only cancel factors (things multiplied together), never terms (things added or subtracted).",
        "Example 1: (x² − 9)/(x + 3) = (x − 3)(x + 3)/(x + 3) = x − 3. Example 2: (2x + 6)/(x² + 3x) = 2(x + 3)/[x(x + 3)] = 2/x. Example 3: (x² − 5x + 6)/(x² − 4) = (x − 2)(x − 3)/[(x − 2)(x + 2)] = (x − 3)/(x + 2). Example 4: 3a²b/(6ab²) = a/(2b), by cancelling 3, a and b. Note that in (x + 3)/x you cannot cancel the x, because x + 3 is not a product; the fraction is already in its simplest form.",
      ],
    },
    {
      heading: "3. Multiplying and dividing",
      paragraphs: [
        "To multiply fractions, multiply the numerators and multiply the denominators, but first factorise and cancel to keep the work small. To divide by a fraction, turn it upside down and multiply.",
        "Example 5: (x² − 1)/(x + 2) × (x + 2)/(x + 1) = (x − 1)(x + 1)/(x + 2) × (x + 2)/(x + 1) = x − 1. Example 6: 6a/(5b) ÷ 3a²/(10b) = 6a/(5b) × 10b/(3a²) = 60ab/(15a²b) = 4/a. Example 7: 3/(2x) × 4x²/9 = 12x²/(18x) = 2x/3.",
      ],
    },
    {
      heading: "4. Adding and subtracting",
      paragraphs: [
        "To add or subtract fractions, write them over a common denominator, which is the lowest common multiple (LCM) of the denominators. Then add or subtract the numerators, and simplify. Take care with the brackets when you subtract.",
        "Example 8 (monomial denominators): a/3 + a/4 = 4a/12 + 3a/12 = 7a/12. Example 9: 1/x − 1/y = y/(xy) − x/(xy) = (y − x)/(xy). Example 10 (binomial denominators): 2/x + 3/(x + 1). The LCM is x(x + 1). So we get [2(x + 1) + 3x]/[x(x + 1)] = (5x + 2)/[x(x + 1)]. Example 11: 3/(x − 1) − 2/(x + 2) = [3(x + 2) − 2(x − 1)]/[(x − 1)(x + 2)] = (3x + 6 − 2x + 2)/[(x − 1)(x + 2)] = (x + 8)/[(x − 1)(x + 2)]. Notice that the minus sign multiplies both terms in the bracket, so −2(x − 1) = −2x + 2.",
        "When a denominator can be factorised, do it first, because it may reveal a common factor. Example 12: 5/(x² − 1) + 2/(x + 1). Since x² − 1 = (x − 1)(x + 1), the LCM is (x − 1)(x + 1). So we get [5 + 2(x − 1)]/[(x − 1)(x + 1)] = (2x + 3)/(x² − 1). Example 13 (numerators with x): (x + 1)/2 + (x − 2)/3 = [3(x + 1) + 2(x − 2)]/6 = (5x − 1)/6.",
      ],
    },
    {
      heading: "5. When a fraction is undefined or zero",
      paragraphs: [
        "A fraction is undefined when its denominator equals zero, because we cannot divide by zero. To find the values that make it undefined, set the denominator equal to zero and solve. (x + 2)/(x − 3) is undefined when x − 3 = 0, that is, when x = 3. 5/(x² − 4) is undefined when x² − 4 = 0, that is (x − 2)(x + 2) = 0, so x = 2 or x = −2. 4/[x(x − 2)] is undefined when x = 0 or x = 2.",
        "A fraction equals zero when its numerator is zero and its denominator is not zero. (x − 2)/(x + 5) = 0 when x − 2 = 0, so x = 2. Since the denominator is then 7, which is not zero, the value x = 2 is acceptable. (x² − 4)/(x + 1) = 0 when x² − 4 = 0, so x = 2 or x = −2.",
        "Substitution works the same as for any expression. For (3x − 1)/(x + 2) when x = 4, the value is (12 − 1)/(4 + 2) = 11/6.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Factorise first, then cancel. You can cancel factors, never terms. (x + 3)/x cannot be reduced to 3.",
    "Check that a cancelled expression is a factor of the whole numerator and the whole denominator.",
    "To divide by a fraction, multiply by its reciprocal. Flip only the second fraction.",
    "For addition and subtraction use the lowest common denominator. Do not just multiply the denominators if they have a common factor.",
    "When you subtract a fraction, the minus sign applies to every term in the numerator. Use brackets.",
    "A fraction is undefined where the denominator is zero. A fraction is zero where the numerator is zero and the denominator is not.",
    "Use a² − b² = (a − b)(a + b) whenever you see a difference of two squares such as x² − 9.",
    "Check your simplified answer by substituting a convenient value of x into both the original fraction and the answer.",
  ],
  summary:
    "To simplify an algebraic fraction, factorise the numerator and denominator (common factor, difference of two squares, trinomial) and cancel common factors, never terms. To multiply, cancel across and multiply; to divide, multiply by the reciprocal. To add or subtract, find the LCM of the denominators, express each fraction over it, combine the numerators carefully with brackets and simplify. A fraction is undefined where its denominator is zero and equals zero where its numerator is zero and its denominator is not.",
  quick: {
    intro: "Week 10 revision sheet. Factorise, cancel factors, and use the LCM.",
    blocks: [
      {
        heading: "1. Factorising",
        points: [
          "Common factor: 2x + 6 = 2(x + 3).",
          "a² − b² = (a − b)(a + b).",
          "x² + bx + c: find two numbers with product c and sum b.",
        ],
      },
      {
        heading: "2. Simplify, multiply, divide",
        points: [
          "Factorise, then cancel factors only.",
          "(x² − 9)/(x + 3) = x − 3; (2x + 6)/(x² + 3x) = 2/x.",
          "÷ by a fraction = × its reciprocal.",
        ],
        warning: "(x + 3)/x does not simplify to 3.",
      },
      {
        heading: "3. Add and subtract",
        points: [
          "Common denominator = LCM. Use brackets for subtraction.",
          "a/3 + a/4 = 7a/12; 2/x + 3/(x + 1) = (5x + 2)/[x(x + 1)].",
          "3/(x − 1) − 2/(x + 2) = (x + 8)/[(x − 1)(x + 2)].",
        ],
      },
      {
        heading: "4. Undefined and zero",
        points: [
          "Undefined: denominator = 0.",
          "Zero: numerator = 0 and denominator ≠ 0.",
          "5/(x² − 4) is undefined at x = ±2.",
        ],
      },
    ],
    likely: [
      { question: "Simplify (x² − 9)/(x + 3).", answer: "x − 3." },
      { question: "Simplify (2x + 6)/(x² + 3x).", answer: "2/x." },
      { question: "Simplify a/3 + a/4.", answer: "7a/12." },
      { question: "Write 2/x + 3/(x + 1) as one fraction.", answer: "(5x + 2)/[x(x + 1)]." },
      { question: "Simplify 3/(x − 1) − 2/(x + 2).", answer: "(x + 8)/[(x − 1)(x + 2)]." },
      { question: "For what value of x is (x + 2)/(x − 3) undefined?", answer: "x = 3." },
      { question: "For what values of x is 5/(x² − 4) undefined?", answer: "x = 2 or x = −2." },
      { question: "For what value of x is (x − 2)/(x + 5) equal to zero?", answer: "x = 2." },
      { question: "Why can’t x be cancelled in (x + 3)/x?", answer: "x is a term in the numerator, not a factor of the whole numerator." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Simplify (x² − 9)/(x + 3).", options: ["x + 3", "x − 3", "x² − 3", "3"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Simplify (2x + 6)/(x² + 3x).", options: ["x/2", "2x", "(2x + 6)/x", "2/x"], answer: "D" },
    { number: 3, kind: "Objective", prompt: "Simplify (x² − 5x + 6)/(x² − 4).", options: ["(x − 3)/(x + 2)", "(x + 3)/(x − 2)", "(x − 2)/(x + 3)", "(x − 3)/(x − 2)"], answer: "A", explanation: "The numerator is (x − 2)(x − 3) and the denominator is (x − 2)(x + 2). Cancel x − 2." },
    { number: 4, kind: "Objective", prompt: "Simplify a/3 + a/4.", options: ["2a/7", "a/7", "7a/12", "a/12"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "Express 2/x + 3/(x + 1) as a single fraction.", options: ["(5x + 2)/[x(x + 1)]", "5/(x + 1)", "5/[x(x + 1)]", "(5x + 3)/[x(x + 1)]"], answer: "A", explanation: "[2(x + 1) + 3x]/[x(x + 1)] = (5x + 2)/[x(x + 1)]." },
    { number: 6, kind: "Objective", prompt: "Simplify 3/(x − 1) − 2/(x + 2).", options: ["1/[(x − 1)(x + 2)]", "(x − 4)/[(x − 1)(x + 2)]", "(5x + 4)/[(x − 1)(x + 2)]", "(x + 8)/[(x − 1)(x + 2)]"], answer: "D", explanation: "[3(x + 2) − 2(x − 1)]/[(x − 1)(x + 2)] = (3x + 6 − 2x + 2)/… = (x + 8)/…" },
    { number: 7, kind: "Objective", prompt: "Simplify 6a/(5b) ÷ 3a²/(10b).", options: ["a/4", "4/a", "2/a", "4a"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Simplify (x² − 1)/(x + 2) × (x + 2)/(x + 1).", options: ["x + 1", "x² − 1", "x − 1", "1"], answer: "C" },
    { number: 9, kind: "Objective", prompt: "For what value of x is (x + 2)/(x − 3) undefined?", options: ["x = 3", "x = −2", "x = 2", "x = −3"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "For what values of x is 5/(x² − 4) undefined?", options: ["x = 4 only", "x = 2 only", "x = 2 or x = −2", "x = 0"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "For what value of x is (x − 2)/(x + 5) equal to zero?", options: ["−5", "−2", "0", "2"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "Find the value of (3x − 1)/(x + 2) when x = 4.", options: ["5/2", "11/6", "13/6", "11/2"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "Simplify 1/x − 1/y.", options: ["(y − x)/(xy)", "(x − y)/(xy)", "0", "1/(x − y)"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Simplify 3/(2x) × 4x²/9.", options: ["2/(3x)", "x/6", "2x/3", "6x"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Simplify (a) (x² − 16)/(x² + x − 12) and (b) (3x² + 6x)/(x² − 4).", answer: "(a) x² − 16 = (x − 4)(x + 4) and x² + x − 12 = (x + 4)(x − 3), so the fraction is (x − 4)/(x − 3). (b) 3x² + 6x = 3x(x + 2) and x² − 4 = (x − 2)(x + 2), so the fraction is 3x/(x − 2)." },
    { number: 16, kind: "Theory", prompt: "Simplify (a) (x² − 4)/(x² − x − 6) × (x − 3)/(x + 2) and (b) 2x/(3y) ÷ 4x²/(9y²).", answer: "(a) x² − 4 = (x − 2)(x + 2) and x² − x − 6 = (x − 3)(x + 2). So the product is (x − 2)(x + 2)/[(x − 3)(x + 2)] × (x − 3)/(x + 2) = (x − 2)/(x + 2). (b) 2x/(3y) × 9y²/(4x²) = 18xy²/(12x²y) = 3y/(2x)." },
    { number: 17, kind: "Theory", prompt: "Express as single fractions (a) 3/(x + 1) + 2/(x − 2) and (b) 5/(x² − 1) + 2/(x + 1).", answer: "(a) [3(x − 2) + 2(x + 1)]/[(x + 1)(x − 2)] = (3x − 6 + 2x + 2)/[(x + 1)(x − 2)] = (5x − 4)/[(x + 1)(x − 2)]. (b) x² − 1 = (x − 1)(x + 1), so the LCM is (x − 1)(x + 1): [5 + 2(x − 1)]/[(x − 1)(x + 1)] = (2x + 3)/(x² − 1)." },
    { number: 18, kind: "Theory", prompt: "Simplify (a) (2x − 1)/3 − (x + 2)/4 and (b) (x + 1)/2 + (x − 2)/3.", answer: "(a) The common denominator is 12: [4(2x − 1) − 3(x + 2)]/12 = (8x − 4 − 3x − 6)/12 = (5x − 10)/12 = 5(x − 2)/12. (b) The common denominator is 6: [3(x + 1) + 2(x − 2)]/6 = (3x + 3 + 2x − 4)/6 = (5x − 1)/6." },
    { number: 19, kind: "Theory", prompt: "Find the values of x for which (a) (x − 1)/(x² − 9) is undefined, (b) 4/[x(x − 2)] is undefined and (c) (x² − 4)/(x + 1) is zero.", answer: "(a) x² − 9 = 0 gives x = 3 or x = −3. (b) x(x − 2) = 0 gives x = 0 or x = 2. (c) The fraction is zero when x² − 4 = 0, so x = 2 or x = −2; for both values the denominator, x + 1, is not zero." },
    { number: 20, kind: "Theory", prompt: "A pupil cancels x in (x + 3)/x and writes 3. Explain the mistake, and show that the answer is wrong by substituting x = 2. Then evaluate (2x² − 3)/(x − 1) when x = −2.", answer: "Only factors can be cancelled, and x is a term of the numerator x + 3, not a factor of all of it. When x = 2, (x + 3)/x = 5/2, not 3, so the answer 3 is wrong. For the second part: (2(−2)² − 3)/(−2 − 1) = (8 − 3)/(−3) = −5/3." },
  ] as PracticeQuestion[],
};
