import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek4: Lesson = {
  id: "ss1-first-mathematics-week-4",
  week: "Week 04",
  title: "Indices (laws of indices)",
  subtitle: "Learn what an index means, the laws that let you simplify powers, how fractional and negative indices work, and how to solve simple equations with the unknown in the power.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain the meaning of a power, base and index.",
    "State and apply the laws of indices, including zero and negative indices.",
    "Evaluate expressions with fractional indices.",
    "Simplify expressions with numbers and letters raised to powers.",
    "Solve basic indicial equations by writing both sides with the same base.",
  ],
  sections: [
    {
      heading: "1. What an index is",
      paragraphs: [
        "When a number is multiplied by itself several times, we write the repeated product with an index (also called a power or an exponent). In 2⁵ = 2 × 2 × 2 × 2 × 2 = 32, the number 2 is the base and 5 is the index. In general, a^n means n copies of a multiplied together. Indices make long products short and allow us to work with very large and very small numbers, such as the distance between towns in millimetres or the size of a germ.",
        "The laws below are written with letters, so a^m means ‘a to the power m’ and a^(m + n) means ‘a to the power (m + n)’. They hold for any base a that is not zero.",
      ],
    },
    {
      heading: "2. The laws of indices",
      paragraphs: [
        "Law 1 (multiplying): a^m × a^n = a^(m + n). When you multiply powers of the same base, add the indices. Example: 2³ × 2⁴ = 2⁷ = 128. Law 2 (dividing): a^m ÷ a^n = a^(m − n). When you divide, subtract the indices. Example: 5⁶ ÷ 5² = 5⁴ = 625. Law 3 (power of a power): (a^m)^n = a^(mn). Multiply the indices. Example: (3²)³ = 3⁶ = 729.",
        "Law 4 (zero index): a⁰ = 1, for any a that is not zero. This follows from Law 2: a^m ÷ a^m = a^(m − m) = a⁰, but anything divided by itself is 1. Law 5 (negative index): a^(−n) = 1 ÷ a^n. A negative index means ‘take the reciprocal’. Example: 3⁻² = 1/3² = 1/9. Also, 1/a^(−n) = a^n, so (1/4)^(−1) = 4.",
        "Law 6 (products and quotients): (ab)^n = a^n b^n and (a/b)^n = a^n/b^n. Example: (2a²b)³ = 2³ × a⁶ × b³ = 8a⁶b³. Note that these laws work for multiplication and division inside the brackets. They do NOT work for addition or subtraction: (a + b)² is not a² + b².",
      ],
      points: [
        "a^m × a^n = a^(m + n)",
        "a^m ÷ a^n = a^(m − n)",
        "(a^m)^n = a^(mn)",
        "a⁰ = 1 and a^(−n) = 1/a^n",
        "(ab)^n = a^n b^n and (a/b)^n = a^n/b^n",
      ],
    },
    {
      heading: "3. Fractional indices",
      paragraphs: [
        "A fractional index stands for a root. a^(1/n) is the nth root of a, so 9^(1/2) = √9 = 3 and 27^(1/3) = ∛27 = 3. More generally, a^(m/n) = (the nth root of a) raised to the power m. It is usually easier to take the root first and then the power, since the numbers stay small.",
        "Examples: 8^(2/3) = (∛8)² = 2² = 4. 16^(3/4) = (⁴√16)³ = 2³ = 8. For a negative fractional index, take the reciprocal as well: 27^(−2/3) = 1/27^(2/3) = 1/(∛27)² = 1/3² = 1/9. And (1/4)^(−1/2) = 4^(1/2) = 2, since the negative index flips the fraction. For a fraction raised to a fractional power, apply the power to the top and the bottom: (27/8)^(−2/3) = (8/27)^(2/3) = (2/3)² = 4/9.",
      ],
    },
    {
      heading: "4. Simplifying with numbers and letters",
      paragraphs: [
        "To simplify a numerical expression, write all the numbers as powers of the same base. Example: 2⁵ × 4² ÷ 8. Write 4 = 2² and 8 = 2³. Then 2⁵ × (2²)² ÷ 2³ = 2⁵ × 2⁴ ÷ 2³ = 2^(5 + 4 − 3) = 2⁶ = 64.",
        "With letters, deal with the numbers, then each letter separately. Example: (2a²b)³ ÷ (4ab²) = (8a⁶b³) ÷ (4ab²) = 2a^(6 − 1) b^(3 − 2) = 2a⁵b. Example with negative indices: (a³b⁻²)⁻² × (a⁻¹b)³ = a⁻⁶b⁴ × a⁻³b³ = a⁻⁹b⁷ = b⁷/a⁹. Always give the final answer with positive indices unless told otherwise.",
      ],
    },
    {
      heading: "5. Solving indicial equations",
      paragraphs: [
        "An indicial equation has the unknown in the index. The method: write both sides as a power of the same base, then equate the indices, because if a^p = a^q then p = q.",
        "Example 1: 2^(x + 1) = 32. Write 32 = 2⁵, so x + 1 = 5 and x = 4. Example 2: 9^x = 27. Write both with base 3: 3^(2x) = 3³, so 2x = 3 and x = 3/2. Example 3: 4^x = 1/8. Write both with base 2: 2^(2x) = 2^(−3), so 2x = −3 and x = −3/2. Example 4: 3^(2x − 1) = 81 = 3⁴, so 2x − 1 = 4, 2x = 5 and x = 5/2.",
        "Some equations are quadratic in disguise. Solve 2^(2x) − 5(2^x) + 4 = 0. Let y = 2^x, so 2^(2x) = y². The equation becomes y² − 5y + 4 = 0, which factorises as (y − 1)(y − 4) = 0. So y = 1 or y = 4. If 2^x = 1 then x = 0; if 2^x = 4 then x = 2. Check: for x = 2, 16 − 20 + 4 = 0, and for x = 0, 1 − 5 + 4 = 0.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "To multiply powers of the same base, add the indices. To divide, subtract. To raise a power to a power, multiply. Do not mix these up.",
    "Anything (except zero) raised to the power 0 is 1. So 7⁰ = 1, and 2 × 5⁰ = 2, not 0.",
    "A negative index does not make the number negative. 2⁻³ = 1/8, not −8.",
    "−3² = −9 but (−3)² = 9. The brackets decide what is squared.",
    "The index laws apply to products and quotients, never to sums. (a + b)² = a² + 2ab + b², not a² + b².",
    "For a^(m/n), take the root first, then the power. 8^(2/3) is (∛8)² = 4, which is easier than ∛64.",
    "To solve an indicial equation, change both sides to the same base first, then equate the indices.",
    "Quadratic-looking indicial equations such as 2^(2x) − 5(2^x) + 4 = 0 are solved by letting y = 2^x. Remember to go back and solve for x.",
    "Give the final answer with positive indices unless the question says otherwise.",
  ],
  summary:
    "An index tells how many times a base is multiplied by itself. The laws are a^m × a^n = a^(m + n), a^m ÷ a^n = a^(m − n), (a^m)^n = a^(mn), a⁰ = 1, a^(−n) = 1/a^n, (ab)^n = a^n b^n and (a/b)^n = a^n/b^n. Fractional indices are roots: a^(1/n) is the nth root of a and a^(m/n) is the nth root raised to the power m. To simplify numerical powers, write them with a common base, and to solve an indicial equation, write both sides with the same base and equate the indices.",
  quick: {
    intro: "Week 4 revision sheet. Learn the six laws and the method for indicial equations.",
    blocks: [
      {
        heading: "1. The laws",
        points: [
          "a^m × a^n = a^(m + n); a^m ÷ a^n = a^(m − n); (a^m)^n = a^(mn).",
          "a⁰ = 1; a^(−n) = 1/a^n.",
          "(ab)^n = a^n b^n; (a/b)^n = a^n/b^n.",
        ],
        memory: "Multiply → add; divide → subtract; power of a power → multiply.",
      },
      {
        heading: "2. Fractional indices",
        points: [
          "a^(1/n) = nth root of a.",
          "a^(m/n) = (nth root of a)^m.",
          "8^(2/3) = 4; 16^(3/4) = 8; 27^(−2/3) = 1/9; (1/4)^(−1/2) = 2.",
        ],
      },
      {
        heading: "3. Simplifying",
        points: [
          "Numbers: write them with the same base (4 = 2², 8 = 2³).",
          "2⁵ × 4² ÷ 8 = 2⁶ = 64.",
          "(2a²b)³ ÷ (4ab²) = 2a⁵b.",
        ],
        warning: "(a + b)² ≠ a² + b².",
      },
      {
        heading: "4. Indicial equations",
        points: [
          "Same base on both sides, then equate the indices.",
          "2^(x + 1) = 32 gives x = 4; 9^x = 27 gives x = 3/2.",
          "Quadratic form: let y = 2^x, solve for y, then for x.",
        ],
      },
    ],
    likely: [
      { question: "State the law for multiplying powers of the same base.", answer: "a^m × a^n = a^(m + n): add the indices." },
      { question: "Evaluate 6⁰ + 2⁻².", answer: "1 + 1/4 = 5/4." },
      { question: "Evaluate 8^(2/3).", answer: "(∛8)² = 2² = 4." },
      { question: "Evaluate 27^(−2/3).", answer: "1/(∛27)² = 1/9." },
      { question: "Simplify (2a²b)³ ÷ (4ab²).", answer: "8a⁶b³ ÷ 4ab² = 2a⁵b." },
      { question: "Solve 2^(x + 1) = 32.", answer: "2^(x + 1) = 2⁵, so x + 1 = 5 and x = 4." },
      { question: "Solve 9^x = 27.", answer: "3^(2x) = 3³, so x = 3/2." },
      { question: "Solve 4^x = 1/8.", answer: "2^(2x) = 2^(−3), so x = −3/2." },
      { question: "What is wrong with (a + b)² = a² + b²?", answer: "The index laws do not apply to sums. The correct expansion is a² + 2ab + b²." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Evaluate 2³ × 2⁴.", options: ["128", "64", "256", "4 096"], answer: "A", explanation: "Add the indices: 2³ × 2⁴ = 2⁷ = 128." },
    { number: 2, kind: "Objective", prompt: "Simplify 5⁶ ÷ 5².", options: ["5³", "5⁴", "5⁸", "1⁴"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Simplify (3²)³.", options: ["3⁵", "3⁸", "3⁶", "9⁵"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "Evaluate 6⁰ + 2⁻².", options: ["8", "1/4", "3/4", "5/4"], answer: "D", explanation: "6⁰ = 1 and 2⁻² = 1/4, so the sum is 1¼ = 5/4." },
    { number: 5, kind: "Objective", prompt: "Evaluate 3⁻².", options: ["1/9", "−9", "−6", "1/6"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Evaluate 8^(2/3).", options: ["2", "4", "16", "64"], answer: "B", explanation: "The cube root of 8 is 2 and 2² = 4." },
    { number: 7, kind: "Objective", prompt: "Evaluate 16^(3/4).", options: ["2", "4", "8", "12"], answer: "C" },
    { number: 8, kind: "Objective", prompt: "Evaluate 27^(−2/3).", options: ["−18", "1/18", "9", "1/9"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "Evaluate (1/4)^(−1/2).", options: ["2", "1/2", "−2", "16"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "Simplify (2a²b)³ ÷ (4ab²).", options: ["8a⁵b", "2a⁵b", "2a⁶b", "4a⁵b"], answer: "B", explanation: "(2a²b)³ = 8a⁶b³, and dividing by 4ab² gives 2a⁵b." },
    { number: 11, kind: "Objective", prompt: "Solve the equation 2^(x + 1) = 32.", options: ["x = 3", "x = 5", "x = 4", "x = 16"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "Solve the equation 9^x = 27.", options: ["x = 3", "x = 2", "x = 1/2", "x = 3/2"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Solve the equation 4^x = 1/8.", options: ["x = −3/2", "x = −2", "x = 3/2", "x = −3"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Solve the equation 3^(2x − 1) = 81.", options: ["x = 2", "x = 5/2", "x = 3", "x = 3/2"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "State the laws of indices for a^m × a^n, a^m ÷ a^n, (a^m)^n, a⁰ and a^(−n), giving a numerical example of each.", answer: "a^m × a^n = a^(m + n), for example 2³ × 2⁴ = 2⁷. a^m ÷ a^n = a^(m − n), for example 5⁶ ÷ 5² = 5⁴. (a^m)^n = a^(mn), for example (3²)³ = 3⁶. a⁰ = 1, for example 7⁰ = 1. a^(−n) = 1/a^n, for example 3⁻² = 1/9." },
    { number: 16, kind: "Theory", prompt: "Evaluate without a calculator: (a) (27/8)^(−2/3), (b) 2⁵ × 4² ÷ 8 and (c) 0.25^(−1/2).", answer: "(a) (27/8)^(−2/3) = (8/27)^(2/3) = (2/3)² = 4/9. (b) 2⁵ × (2²)² ÷ 2³ = 2^(5 + 4 − 3) = 2⁶ = 64. (c) 0.25 = 1/4, so 0.25^(−1/2) = 4^(1/2) = 2." },
    { number: 17, kind: "Theory", prompt: "Simplify (a³b⁻²)⁻² × (a⁻¹b)³, leaving your answer with positive indices.", answer: "(a³b⁻²)⁻² = a⁻⁶b⁴ and (a⁻¹b)³ = a⁻³b³. Multiplying, a⁻⁶b⁴ × a⁻³b³ = a⁻⁹b⁷ = b⁷/a⁹." },
    { number: 18, kind: "Theory", prompt: "Solve (a) 2^(3x − 1) = 16 and (b) 3^(x + 2) = 1/27.", answer: "(a) 16 = 2⁴, so 3x − 1 = 4, 3x = 5 and x = 5/3. (b) 1/27 = 3⁻³, so x + 2 = −3 and x = −5." },
    { number: 19, kind: "Theory", prompt: "Solve 2^(2x) − 5(2^x) + 4 = 0.", answer: "Let y = 2^x. Then y² − 5y + 4 = 0, so (y − 1)(y − 4) = 0 and y = 1 or y = 4. If 2^x = 1 then x = 0; if 2^x = 4 then x = 2. So x = 0 or x = 2." },
    { number: 20, kind: "Theory", prompt: "Show that (2^(n + 2) − 2^n) ÷ 2^n = 3 for every value of n.", answer: "2^(n + 2) = 2^n × 2² = 4 × 2^n, so 2^(n + 2) − 2^n = 4 × 2^n − 2^n = 3 × 2^n. Dividing by 2^n gives 3 × 2^n ÷ 2^n = 3, whatever the value of n." },
  ] as PracticeQuestion[],
};
