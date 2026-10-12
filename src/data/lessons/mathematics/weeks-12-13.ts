import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeeks1213: Lesson = {
  id: "ss1-first-mathematics-weeks-12-13",
  week: "Weeks 12–13",
  title: "Revision & examination",
  subtitle: "Pull together Weeks 1 to 11: key methods, a formula sheet, common mistakes, exam technique and a 30-question mock paper.",
  source: "Written by Edify as revision for the SS1 First Term Mathematics scheme of work. The revision notes and the mock examination are original.",
  objectives: [
    "Recall the key methods and formulas from Weeks 1 to 11 of First Term Mathematics.",
    "Choose the right method for a question from any topic in the term.",
    "Set out calculations clearly, with correct units, bases and notation.",
    "Avoid the common mistakes that cost marks.",
    "Sit a timed mock paper and use the results to find the topics that need more revision.",
  ],
  sections: [
    {
      heading: "1. Key methods by week",
      paragraphs: [
        "Weeks 1 and 2, number bases: digits run from 0 to b − 1; divide repeatedly and read the remainders upwards to leave base ten; expand with powers of b to reach base ten; go through base ten between other bases, or group in threes between base two and base eight. Carry and borrow with the base; for an unknown base x, write each numeral in terms of x, solve, and reject impossible bases. Week 3, modular arithmetic: work with remainders after division by n; residues are 0 to n − 1; reduce after each operation; solve equations by adding multiples of n; use modulo 7 for days of the week.",
        "Weeks 4 to 6, indices and logarithms: a^m × a^n = a^(m + n), a^m ÷ a^n = a^(m − n), (a^m)^n = a^(mn), a⁰ = 1, a^(−n) = 1/a^n, and a^(m/n) is the nth root raised to the power m. For indicial equations, use the same base on both sides. Logarithms are indices: y = a^x means x = log_a y, with log xy = log x + log y, log x/y = log x − log y and log x^n = n log x. Reject log solutions that put a zero or negative number inside a logarithm. With four-figure tables, add logs to multiply, subtract to divide, multiply for powers and divide for roots, and treat bar numbers carefully.",
        "Weeks 8 to 11: n(A ∪ B) = n(A) + n(B) − n(A ∩ B); a set with n elements has 2ⁿ subsets; De Morgan’s laws are (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′; in a Venn word problem, fill in the overlap first and make the regions sum to n(ξ). For algebraic fractions, factorise, cancel factors only, use the LCM to add and subtract, and remember that a denominator can never be zero. For linear equations, expand, clear fractions with the LCM, collect terms and check. To change the subject of a formula, undo operations in reverse order, square both sides to remove a root, and if the subject appears twice, collect and factorise.",
      ],
    },
    {
      heading: "2. Formula and method sheet",
      paragraphs: [
        "Copy this out from memory every day for a week before the examination.",
      ],
      points: [
        "Place value in base b: …, b³, b², b¹, b⁰. Unknown base: 23ₓ = 2x + 3.",
        "Modulo n: residues 0, 1, …, n − 1. Days of the week: mod 7.",
        "a^m × a^n = a^(m + n); a^m ÷ a^n = a^(m − n); (a^m)^n = a^(mn); a⁰ = 1; a^(−n) = 1/a^n.",
        "log xy = log x + log y; log x/y = log x − log y; log x^n = n log x; log_a b = log_c b ÷ log_c a.",
        "Tables: × add, ÷ subtract, power ×, root ÷. Characteristic from standard form; mantissa from tables.",
        "n(A ∪ B) = n(A) + n(B) − n(A ∩ B); 2ⁿ subsets; n(A′) = n(ξ) − n(A).",
        "a² − b² = (a − b)(a + b); x² + bx + c = (x + p)(x + q) with pq = c and p + q = b.",
        "Change of subject: do the same to both sides; collect and factorise if the subject appears twice.",
      ],
    },
    {
      heading: "3. Common mistakes to avoid",
      paragraphs: [
        "Read the remainders from the top instead of the bottom when you convert from base ten, or write a digit that is larger than the base. Forget to reduce a negative number in a modular problem. Write (a + b)² = a² + b², or treat a negative index as a negative number. Write log (x + y) as log x + log y, or forget to reject a solution that makes a log undefined. Mix up the characteristic and mantissa of a bar number. Forget that n(A) includes the overlap, so ‘A only’ is smaller. Cancel terms instead of factors in a fraction. Forget the brackets when subtracting a fraction. Skip the final check by substitution, which would catch most of these.",
      ],
    },
    {
      heading: "4. Exam technique",
      paragraphs: [
        "Read each question twice and underline the command words. ‘Express’ and ‘simplify’ ask for a final form, ‘solve’ asks for the value of the unknown, ‘evaluate’ asks for a number, ‘show that’ asks you to reach a given result, and ‘make x the subject’ asks for x alone on one side. Write the formula, substitute, calculate and give the answer in the form asked (in base five, in standard form, to 4 significant figures). Show all your steps, because most marks are for method.",
        "In objective papers, answer the questions you are sure of first and mark any you skip, then return. Use the options to help: substitute each one into the question or work backwards. Never leave a question blank. In theory questions, check your answer by an independent method whenever there is time.",
      ],
    },
    {
      heading: "5. Using the mock paper",
      paragraphs: [
        "The 30 questions on this page form a mock paper. Try the 22 objective questions in about 30 minutes without help, then check your answers. Next, write full answers to the 8 theory questions in about 60 minutes before looking at the model answers. Mark yourself honestly, list the weeks in which you lost marks, and go back to those lessons. The Week 13 examination follows the same pattern of objective questions across all the topics, followed by theory questions.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "In base b, no digit can be b or larger. Read remainders from the bottom up. Always write the base.",
    "For an unknown base, convert every numeral into base ten first, and reject negative, fractional or too-small values.",
    "Modular: reduce after the operation. Negative numbers need multiples of n added. Days repeat every 7.",
    "a⁰ = 1 and a^(−n) = 1/a^n. The index laws work for products and quotients, never for sums.",
    "Same base on both sides, then equate the indices. A quadratic in disguise needs the substitution y = a^x.",
    "A logarithm needs a positive number inside. Check every solution of a log equation.",
    "Characteristics are negative for numbers below 1 and mantissas are always positive. Handle them separately.",
    "n(A) counts the whole of A, including the overlap. Fill the overlap first in a Venn diagram, and check the total.",
    "Cancel factors, not terms. Use brackets when subtracting a fraction. A denominator can never be zero.",
    "Clear fractions by multiplying every term by the LCM. Substitute your answer back to check it.",
  ],
  summary:
    "This revision brings together Weeks 1 to 11: number bases, modular arithmetic, indices, logarithms and four-figure tables, sets and Venn diagrams, algebraic fractions, and linear equations with change of subject. Learn the method sheet, watch for the common mistakes, set out your work clearly, and use the mock paper to decide where to revise before the examination.",
  quick: {
    intro: "A quick tour of the whole term. If a line is not clear, go back to that week.",
    blocks: [
      {
        heading: "1. Weeks 1–3: Bases and modular arithmetic",
        points: [
          "Base b: digits 0 to b − 1; divide and read upwards; expand to base ten.",
          "Carry the base; borrow the base; unknown base → equation in x.",
          "Modulo n: reduce after each operation; days mod 7.",
        ],
      },
      {
        heading: "2. Weeks 4–6: Indices and logarithms",
        points: [
          "Add, subtract, multiply the indices for × , ÷, power of power.",
          "log xy = log x + log y; log x/y = log x − log y; log x^n = n log x.",
          "Tables: characteristic from standard form, mantissa from tables.",
        ],
        memory: "Index laws and log laws are the same laws in two forms.",
      },
      {
        heading: "3. Weeks 8–11: Sets, fractions and formulae",
        points: [
          "n(A ∪ B) = n(A) + n(B) − n(A ∩ B); De Morgan: break the bar, change the sign.",
          "Algebraic fractions: factorise, cancel factors, use the LCM.",
          "Equations: clear fractions with the LCM. Formulae: undo operations in reverse.",
        ],
        warning: "Check by substitution before you move on.",
      },
    ],
    likely: [
      { question: "Convert 62₁₀ to base three.", answer: "2022₃." },
      { question: "Find x if 25ₓ + 14ₓ = 42ₓ.", answer: "(2x + 5) + (x + 4) = 4x + 2, so x = 7." },
      { question: "Evaluate (13 × 9) mod 7.", answer: "117 mod 7 = 5." },
      { question: "Solve 5^(2x − 3) = 125.", answer: "2x − 3 = 3, so x = 3." },
      { question: "Simplify log 5 + log 20.", answer: "log 100 = 2." },
      { question: "State De Morgan’s laws.", answer: "(A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′." },
      { question: "Simplify (x² − 25)/(x² − 5x).", answer: "(x + 5)/x." },
      { question: "Make m the subject of E = ½mv².", answer: "m = 2E/v²." },
      { question: "How many subsets has a set with 5 elements?", answer: "2⁵ = 32." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Convert 62₁₀ to base three.", options: ["2022₃", "2202₃", "2220₃", "2122₃"], answer: "A", explanation: "62 ÷ 3 = 20 r 2; 20 ÷ 3 = 6 r 2; 6 ÷ 3 = 2 r 0; 2 ÷ 3 = 0 r 2. Reading upwards: 2022₃." },
    { number: 2, kind: "Objective", prompt: "Evaluate 1011₂ × 101₂.", options: ["101101₂", "110111₂", "111011₂", "100111₂"], answer: "B", explanation: "11 × 5 = 55 and 55 = 32 + 16 + 4 + 2 + 1 = 110111₂." },
    { number: 3, kind: "Objective", prompt: "Find x if 23ₓ + 14ₓ = 41ₓ.", options: ["4", "5", "6", "7"], answer: "C", explanation: "(2x + 3) + (x + 4) = 4x + 1, so 3x + 7 = 4x + 1 and x = 6." },
    { number: 4, kind: "Objective", prompt: "Evaluate (13 × 9) mod 7.", options: ["2", "3", "4", "5"], answer: "D", explanation: "13 × 9 = 117 = 16 × 7 + 5." },
    { number: 5, kind: "Objective", prompt: "If today is Wednesday, what day of the week will it be 100 days from now?", options: ["Friday", "Thursday", "Saturday", "Sunday"], answer: "A", explanation: "100 mod 7 = 2, and two days after Wednesday is Friday." },
    { number: 6, kind: "Objective", prompt: "Evaluate (1/8)^(−2/3).", options: ["1/4", "4", "16", "1/16"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Simplify (3a²b⁻¹)² ÷ (a³b).", options: ["9a/b", "3a/b³", "9a/b³", "9ab³"], answer: "C", explanation: "(9a⁴b⁻²) ÷ (a³b) = 9a^(4 − 3) b^(−2 − 1) = 9a/b³." },
    { number: 8, kind: "Objective", prompt: "Solve 5^(2x − 3) = 125.", options: ["x = 0", "x = 2", "x = 6", "x = 3"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "Simplify log 5 + log 20 (base ten).", options: ["2", "25", "1", "100"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "Solve log₂ (x − 1) = 3.", options: ["8", "9", "7", "10"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Given that log 2 = 0.3010 and log 3 = 0.4771, find log 18.", options: ["0.7781", "1.0791", "1.2552", "1.6563"], answer: "C", explanation: "18 = 2 × 3², so log 18 = 0.3010 + 2(0.4771) = 1.2552." },
    { number: 12, kind: "Objective", prompt: "Evaluate 2 × 1̄.4000.", options: ["1̄.8000", "2̄.4000", "3̄.8000", "2̄.8000"], answer: "D", explanation: "2 × (−1 + 0.4) = −2 + 0.8, which is 2̄.8000." },
    { number: 13, kind: "Objective", prompt: "Let ξ = {1, 2, …, 10}, A = {2, 4, 6, 8, 10} and B = {1, 2, 3, 4, 5}. Then A ∩ B′ is", options: ["{6, 8, 10}", "{2, 4}", "{1, 3, 5}", "{7, 9}"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "The number of subsets of a set with 5 elements is", options: ["25", "32", "31", "10"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "If n(A) = 18, n(B) = 22 and n(A ∩ B) = 7, then n(A ∪ B) is", options: ["40", "29", "33", "47"], answer: "C" },
    { number: 16, kind: "Objective", prompt: "Simplify (x² − 25)/(x² − 5x).", options: ["(x − 5)/x", "(x + 5)/(x − 5)", "x + 5", "(x + 5)/x"], answer: "D" },
    { number: 17, kind: "Objective", prompt: "Express 1/(x − 2) + 1/(x + 2) as a single fraction.", options: ["2x/(x² − 4)", "2/(x² − 4)", "2/x", "1/x"], answer: "A" },
    { number: 18, kind: "Objective", prompt: "For what values of x is 3/(x² − 9) undefined?", options: ["x = 3 only", "x = 3 or x = −3", "x = 9", "x = 9 or x = −9"], answer: "B" },
    { number: 19, kind: "Objective", prompt: "Solve (2x + 1)/3 = (x + 4)/2.", options: ["8", "9", "10", "12"], answer: "C", explanation: "2(2x + 1) = 3(x + 4), so 4x + 2 = 3x + 12 and x = 10." },
    { number: 20, kind: "Objective", prompt: "Make m the subject of E = ½mv².", options: ["E/(2v²)", "2E/v", "Ev²/2", "2E/v²"], answer: "D" },
    { number: 21, kind: "Objective", prompt: "Make x the subject of 3x + 2y = 5x − y.", options: ["3y/2", "y/2", "2y/3", "3y"], answer: "A", explanation: "3y = 2x, so x = 3y/2." },
    { number: 22, kind: "Objective", prompt: "The sum of two numbers is 40 and one of them is 8 more than the other. The smaller number is", options: ["14", "16", "24", "32"], answer: "B" },
    { number: 23, kind: "Theory", prompt: "(a) Convert 1011101₂ to base eight and to base ten. (b) Find x if 25ₓ + 14ₓ = 42ₓ.", answer: "(a) Group in threes from the right: 001 | 011 | 101 = 1, 3, 5, so 1011101₂ = 135₈. In base ten, 135₈ = 64 + 24 + 5 = 93; check: 64 + 16 + 8 + 4 + 1 = 93. (b) (2x + 5) + (x + 4) = 4x + 2, so 3x + 9 = 4x + 2 and x = 7. Check in base seven: 25 + 14: 5 + 4 = 9 = 12₇, write 2 carry 1; 2 + 1 + 1 = 4; so 42." },
    { number: 24, kind: "Theory", prompt: "(a) Find the least positive whole number x such that 4x + 3 ≡ 1 (mod 6). (b) If today is Saturday, what day of the week will it be 75 days from now?", answer: "(a) 4x ≡ −2 ≡ 4 (mod 6), so x = 1. Check: 4 + 3 = 7 and 7 mod 6 = 1. (b) 75 = 10 × 7 + 5, so 75 mod 7 = 5. Five days after Saturday is Thursday." },
    { number: 25, kind: "Theory", prompt: "(a) Evaluate 27^(−2/3) × 9^(1/2). (b) Solve 4^(x + 1) = 8^(x − 1).", answer: "(a) 27^(−2/3) = 1/(∛27)² = 1/9 and 9^(1/2) = 3, so the product is 3/9 = 1/3. (b) Write with base 2: 2^(2(x + 1)) = 2^(3(x − 1)), so 2x + 2 = 3x − 3 and x = 5. Check: 4⁶ = 4096 and 8⁴ = 4096." },
    { number: 26, kind: "Theory", prompt: "(a) Simplify 2 log 5 + log 8 − log 2. (b) Solve log x + log (x + 9) = 1.", answer: "(a) log 25 + log 8 − log 2 = log (25 × 8 ÷ 2) = log 100 = 2. (b) log [x(x + 9)] = 1, so x(x + 9) = 10 and x² + 9x − 10 = 0. Then (x + 10)(x − 1) = 0, so x = −10 or x = 1. A logarithm of a negative number is not defined, so x = 1." },
    { number: 27, kind: "Theory", prompt: "Use logarithm tables to evaluate 63.27 × 0.0481, given that log 63.27 = 1.8012 and log 0.0481 = 2̄.6821.", answer: "Add the logs. Mantissas: 0.8012 + 0.6821 = 1.4833; carry 1. Characteristics: 1 + (−2) + 1 = 0. The sum is 0.4833. The antilog of 0.4833 is 3043, and a characteristic of 0 gives 3.043. So 63.27 × 0.0481 = 3.043. Check: 63 × 0.048 is about 3.0." },
    { number: 28, kind: "Theory", prompt: "In a class of 45 students, 28 like Biology, 20 like Chemistry and 8 like neither. Find the number who like (a) both subjects, (b) Biology only and (c) Chemistry only.", answer: "At least one subject: 45 − 8 = 37. (a) Both = 28 + 20 − 37 = 11. (b) Biology only = 28 − 11 = 17. (c) Chemistry only = 20 − 11 = 9. Check: 17 + 11 + 9 + 8 = 45." },
    { number: 29, kind: "Theory", prompt: "Simplify (a) (x² − 3x)/(x² − 9) and (b) 2/(x − 3) − 1/(x + 1).", answer: "(a) x² − 3x = x(x − 3) and x² − 9 = (x − 3)(x + 3), so the fraction is x/(x + 3). (b) [2(x + 1) − (x − 3)]/[(x − 3)(x + 1)] = (2x + 2 − x + 3)/[(x − 3)(x + 1)] = (x + 5)/[(x − 3)(x + 1)]." },
    { number: 30, kind: "Theory", prompt: "(a) Solve (x + 4)/3 − (x − 2)/4 = 2. (b) Make h the subject of S = 2πr(r + h).", answer: "(a) Multiply by 12: 4(x + 4) − 3(x − 2) = 24, so 4x + 16 − 3x + 6 = 24, x + 22 = 24 and x = 2. Check: 6/3 − 0/4 = 2. (b) Divide by 2πr: S/(2πr) = r + h, so h = S/(2πr) − r, which can also be written (S − 2πr²)/(2πr)." },
  ] as PracticeQuestion[],
};
