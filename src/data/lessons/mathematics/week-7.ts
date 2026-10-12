import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek7: Lesson = {
  id: "ss1-first-mathematics-week-7",
  week: "Week 07",
  title: "Mid-term review",
  subtitle: "Pull together Weeks 1 to 6 before the continuous assessment test: number bases, modular arithmetic, indices and logarithms, with a method sheet, common slips and a mixed set of practice questions.",
  source: "Written by Edify as a mid-term review for the SS1 First Term Mathematics scheme of work. The revision notes and practice questions are original.",
  objectives: [
    "Recall the main methods from Weeks 1 to 6.",
    "Choose the right method for a mixed question without being told the topic.",
    "Check answers by a second method, such as converting back to base ten or substituting.",
    "Avoid the common slips made in tests on these topics.",
    "Plan your time and set out working clearly in a continuous assessment test.",
  ],
  sections: [
    {
      heading: "1. About this week",
      paragraphs: [
        "Week 7 is the mid-term break and the continuous assessment test (CAT). No new topic is taught. Use the time to redo worked examples without looking at the solutions, correct your mistakes and practise with the mixed questions on this page. A good way to revise mathematics is to do problems, not just read notes: after reading a method, close your notes and try an example.",
      ],
    },
    {
      heading: "2. Weeks 1 and 2: number bases",
      paragraphs: [
        "Base b uses the digits 0 to b − 1 and place values that are powers of b. To change from base ten to base b, divide repeatedly by b and read the remainders from the bottom up (45₁₀ = 101101₂). To change from base b to base ten, expand using powers of b (2431₅ = 366). To move between two other bases, go through base ten, except that base two and base eight can be changed by grouping the binary digits in threes. Numbers with a radix point are converted by dividing the whole part and multiplying the fractional part.",
        "In addition, carry when a column total reaches the base. In subtraction, a borrowed 1 is worth the base. In multiplication, convert each product to the base before carrying. To solve an equation with an unknown base x, write every numeral as an expression in x (23ₓ = 2x + 3), solve, and reject any answer that is negative, not a whole number or not larger than every digit.",
      ],
    },
    {
      heading: "3. Week 3: modular arithmetic",
      paragraphs: [
        "In modulo n, the residues are 0, 1, …, n − 1. To compute, do the ordinary operation and then reduce modulo n; negative numbers are brought into range by adding multiples of n. Tables list all results and show identities and inverses. To solve an equation, add multiples of n to the right-hand side until you can divide, and check by substitution. Days of the week use modulo 7, clock times modulo 12 or 24, and repeating shifts use the length of the cycle.",
      ],
    },
    {
      heading: "4. Weeks 4 and 5: indices and logarithms",
      paragraphs: [
        "The laws of indices are a^m × a^n = a^(m + n), a^m ÷ a^n = a^(m − n), (a^m)^n = a^(mn), a⁰ = 1 and a^(−n) = 1/a^n. A fractional index is a root: a^(m/n) is the nth root of a raised to the power m. To solve an indicial equation, write both sides with the same base and equate the indices.",
        "A logarithm is an index: y = a^x means x = log_a y. The laws are log (xy) = log x + log y, log (x/y) = log x − log y and log x^n = n log x. To solve a logarithmic equation, combine into one logarithm, change to index form, and reject any value that makes a logarithm undefined. The change of base formula is log_a b = log_c b ÷ log_c a. A common logarithm has a characteristic (from standard form, bar if the number is less than 1) and a mantissa (from tables, always positive).",
      ],
    },
    {
      heading: "5. Week 6: four-figure tables",
      paragraphs: [
        "Read the log table with row, column and mean difference. Add logs to multiply, subtract to divide, multiply the log for a power and divide it for a root. The antilog table gives four digits, and the characteristic fixes the decimal point. For bar numbers, add and subtract the mantissas first, carry across to the characteristics, and rewrite the characteristic as a multiple of the root before dividing. Always set out the calculation in a ‘number’ and ‘log’ layout and check the size of the answer by estimation.",
      ],
    },
    {
      heading: "6. How to sit a test in mathematics",
      paragraphs: [
        "Read each question carefully and underline what is asked. Do the questions you are sure of first. Show every step of your working, because most marks are given for the method. Write the formula you are using, substitute, and then calculate. Give answers in the form asked (for example, ‘in base five’, or ‘correct to 4 significant figures’), and check by substituting back or by an estimate. If you cannot finish a question, write down what you know; partial working earns partial marks.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Digits in base b run from 0 to b − 1. A digit that equals or exceeds the base signals a mistake.",
    "Read the remainders upward when converting from base ten, and write the base as a subscript on every answer.",
    "For an unknown base, reject negative, fractional or too-small values of x.",
    "In modular arithmetic reduce negative answers by adding multiples of the modulus: −3 mod 7 = 4.",
    "a^(−n) is 1/a^n, not −a^n. And a⁰ = 1, whatever a is (except 0).",
    "The index laws apply to products and quotients, not sums: (a + b)² ≠ a² + b².",
    "There is no law for log (x + y). The solutions of log equations must be checked, since the number inside a log must be positive.",
    "The characteristic of a number less than 1 is negative (bar) but its mantissa is positive. Treat them separately when adding, subtracting and dividing.",
    "Show your working. In a test, a correct method with a slip earns most of the marks; a bare answer earns none if it is wrong.",
  ],
  summary:
    "Weeks 1 to 6 cover number bases (conversion, the four operations and unknown bases), modular arithmetic (residues, operations, tables, equations and applications), the laws of indices and indicial equations, logarithms and their laws, and the use of four-figure tables for multiplication, division, powers and roots. The common thread is working with powers and remainders, so check every answer with a second method. Use the mixed questions on this page to find the topics that need more work before the continuous assessment test.",
  quick: {
    intro: "A one-page tour of Weeks 1 to 6. If a line is not clear, go back to that week.",
    blocks: [
      {
        heading: "1. Weeks 1–2: Bases",
        points: [
          "Divide and read upward; expand to go back to base ten.",
          "Binary ↔ octal: group in threes. Other bases: via base ten.",
          "Carry the base; borrow the base; unknown base → equation in x.",
        ],
      },
      {
        heading: "2. Week 3: Modular arithmetic",
        points: [
          "Residues 0 to n − 1; reduce after each operation.",
          "Negative numbers: add multiples of n.",
          "Days: mod 7. Clock: mod 12 or 24. Cycles: remainder = position.",
        ],
      },
      {
        heading: "3. Weeks 4–5: Indices and logs",
        points: [
          "a^m × a^n = a^(m + n); a^m ÷ a^n = a^(m − n); (a^m)^n = a^(mn); a⁰ = 1; a^(−n) = 1/a^n.",
          "Same base, then equate indices.",
          "log xy = log x + log y; log x/y = log x − log y; log x^n = n log x.",
        ],
        warning: "Reject log solutions that make a log of zero or a negative number.",
      },
      {
        heading: "4. Week 6: Tables",
        points: [
          "Mantissa from tables; characteristic from standard form.",
          "× add; ÷ subtract; power × ; root ÷ .",
          "Bar numbers: separate characteristic and mantissa.",
        ],
      },
    ],
    likely: [
      { question: "Convert 37₁₀ to base two.", answer: "100101₂." },
      { question: "Find the sum of 111₂ and 1011₂.", answer: "10010₂." },
      { question: "Find (9 × 7) mod 8.", answer: "63 mod 8 = 7." },
      { question: "Evaluate 25^(3/2).", answer: "(√25)³ = 125." },
      { question: "Solve 3^(x − 1) = 27.", answer: "x − 1 = 3, so x = 4." },
      { question: "Simplify log 4 + log 25.", answer: "log 100 = 2." },
      { question: "Write log 72 in terms of log 2 and log 3.", answer: "72 = 8 × 9, so log 72 = 3 log 2 + 2 log 3." },
      { question: "Evaluate 2̄.5000 + 1̄.9000.", answer: "2̄.4000." },
      { question: "If today is Friday, what day is it 30 days from now?", answer: "30 mod 7 = 2, so Sunday." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Convert 37₁₀ to base two.", options: ["100101₂", "101001₂", "110001₂", "100011₂"], answer: "A", explanation: "32 + 4 + 1 = 37, so the binary digits are 100101." },
    { number: 2, kind: "Objective", prompt: "Convert 3142₅ to base ten.", options: ["412", "422", "442", "472"], answer: "B", explanation: "3 × 125 + 1 × 25 + 4 × 5 + 2 = 375 + 25 + 20 + 2 = 422." },
    { number: 3, kind: "Objective", prompt: "Evaluate 111₂ + 1011₂.", options: ["10100₂", "1110₂", "10010₂", "11001₂"], answer: "C", explanation: "7 + 11 = 18 and 18 = 10010₂." },
    { number: 4, kind: "Objective", prompt: "If 25ₓ = 17₁₀, find x.", options: ["4", "5", "7", "6"], answer: "D", explanation: "2x + 5 = 17, so x = 6." },
    { number: 5, kind: "Objective", prompt: "Evaluate (9 × 7) mod 8.", options: ["7", "6", "1", "3"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "If today is Friday, what day of the week will it be 30 days from today?", options: ["Saturday", "Sunday", "Monday", "Tuesday"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Simplify 2⁻³ × 2⁵ ÷ 2⁻¹.", options: ["2", "4", "8", "16"], answer: "C", explanation: "2^(−3 + 5 + 1) = 2³ = 8." },
    { number: 8, kind: "Objective", prompt: "Evaluate 25^(3/2).", options: ["15", "75", "10", "125"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "Solve 3^(x − 1) = 27.", options: ["4", "3", "2", "10"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "Evaluate log₂ 64 − log₂ 8.", options: ["2", "3", "8", "56"], answer: "B", explanation: "6 − 3 = 3, or log₂ (64 ÷ 8) = log₂ 8 = 3." },
    { number: 11, kind: "Objective", prompt: "Solve log₃ x = 4.", options: ["12", "64", "81", "7"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "Simplify log 4 + log 25.", options: ["29", "1", "3", "2"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Given that log 3 = 0.4771, find log 0.3.", options: ["1̄.4771", "0.4771", "−0.4771", "2̄.4771"], answer: "A", explanation: "0.3 = 3 × 10⁻¹, so log 0.3 = −1 + 0.4771 = 1̄.4771." },
    { number: 14, kind: "Objective", prompt: "Evaluate 2̄.5000 + 1̄.9000.", options: ["3̄.4000", "2̄.4000", "1̄.4000", "4̄.4000"], answer: "B", explanation: "Mantissas: 0.5 + 0.9 = 1.4, carry 1. Characteristics: −2 − 1 + 1 = −2. So 2̄.4000." },
    { number: 15, kind: "Theory", prompt: "Convert 1234₅ to base eight.", answer: "First to base ten: 1234₅ = 125 + 2 × 25 + 3 × 5 + 4 = 194. Then 194 ÷ 8 = 24 r 2; 24 ÷ 8 = 3 r 0; 3 ÷ 8 = 0 r 3. Reading upwards, 1234₅ = 302₈. Check: 3 × 64 + 0 + 2 = 194." },
    { number: 16, kind: "Theory", prompt: "Evaluate (a) 2314₅ − 1432₅ in base five and (b) 12₃ × 21₃ in base three.", answer: "(a) Column subtraction in base five gives 332₅. Check: 334 − 242 = 92 and 332₅ = 75 + 15 + 2 = 92. (b) 12₃ = 5 and 21₃ = 7, and 5 × 7 = 35 = 1 × 27 + 0 × 9 + 2 × 3 + 2, so 12₃ × 21₃ = 1022₃." },
    { number: 17, kind: "Theory", prompt: "(a) Find 200 mod 7. (b) Find the least positive whole number x such that 3x + 1 ≡ 2 (mod 5). (c) 1 January was a Thursday in a year with 365 days. On what day of the week was 1 March of the same year?", answer: "(a) 200 = 28 × 7 + 4, so 200 mod 7 = 4. (b) 3x ≡ 1 (mod 5); add 5 to get 6, so x = 2. Check: 3 × 2 + 1 = 7 and 7 mod 5 = 2. (c) 1 March is 31 + 28 = 59 days after 1 January. 59 mod 7 = 3, so three days after Thursday: Sunday." },
    { number: 18, kind: "Theory", prompt: "(a) Evaluate 16^(−3/4) × 2². (b) Solve 2^(2x) = 8^(x − 1).", answer: "(a) 16^(−3/4) = 1/(⁴√16)³ = 1/2³ = 1/8, so the product is (1/8) × 4 = 1/2. (b) 8^(x − 1) = 2^(3(x − 1)), so 2x = 3x − 3 and x = 3. Check: 2⁶ = 64 and 8² = 64." },
    { number: 19, kind: "Theory", prompt: "(a) Solve log₂ (x + 6) − log₂ x = 2. (b) Express log 72 in terms of log 2 and log 3.", answer: "(a) log₂ [(x + 6) ÷ x] = 2, so (x + 6) ÷ x = 4, giving x + 6 = 4x and x = 2. Check: log₂ 8 − log₂ 2 = 3 − 1 = 2. (b) 72 = 8 × 9 = 2³ × 3², so log 72 = 3 log 2 + 2 log 3." },
    { number: 20, kind: "Theory", prompt: "Use logarithms to evaluate 277.6 ÷ 7.892, given that log 277.6 = 2.4434 and log 7.892 = 0.8972.", answer: "Subtract the logs: 2.4434 − 0.8972 = 1.5462. The antilog of 0.5462 is 3517, and the characteristic 1 gives 35.17. Check: 280 ÷ 8 = 35, so the answer is sensible." },
  ] as PracticeQuestion[],
};
