import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek5: Lesson = {
  id: "ss1-first-mathematics-week-5",
  week: "Week 05",
  title: "Logarithms (Part 1)",
  subtitle: "See how logarithms are the reverse of indices, learn the three laws of logarithms, change the base, solve simple logarithmic equations and meet characteristics and mantissas.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Change statements between index form and logarithmic form.",
    "State and use the product, quotient and power laws of logarithms.",
    "Simplify logarithmic expressions and evaluate them from given values.",
    "Solve simple logarithmic equations and reject answers that make a logarithm undefined.",
    "Explain the characteristic and mantissa of a base ten logarithm.",
  ],
  sections: [
    {
      heading: "1. From indices to logarithms",
      paragraphs: [
        "We know that 2⁵ = 32. A logarithm answers the question, ‘To what power must the base 2 be raised to get 32?’ The answer is 5, and we write it log₂ 32 = 5. In general, if y = a^x then x = log_a y, where a is the base. The two statements say the same thing in different ways: y = a^x ⟺ x = log_a y.",
        "Examples. 2⁷ = 128 means log₂ 128 = 7. 10⁻² = 0.01 means log₁₀ 0.01 = −2. 9^(1/2) = 3 means log₉ 3 = 1/2. Going the other way, log₅ 125 = 3 means 5³ = 125, and log₂ (1/8) = −3 means 2⁻³ = 1/8. Two facts follow directly: log_a a = 1 (because a¹ = a) and log_a 1 = 0 (because a⁰ = 1). The base must be positive and not 1, and logarithms exist only for positive numbers, because a positive base raised to any power is always positive. So log of zero or of a negative number is undefined.",
      ],
    },
    {
      heading: "2. The laws of logarithms",
      paragraphs: [
        "The laws of logarithms come from the laws of indices. Since a^m × a^n = a^(m + n), logarithms of products add. Since a^m ÷ a^n = a^(m − n), logarithms of quotients subtract. Since (a^m)^n = a^(mn), logarithms of powers multiply. All the logarithms in a law must use the same base.",
      ],
      points: [
        "Product law: log_a (xy) = log_a x + log_a y.",
        "Quotient law: log_a (x/y) = log_a x − log_a y.",
        "Power law: log_a (x^n) = n log_a x. In particular, log_a (1/x) = −log_a x.",
        "log_a a = 1 and log_a 1 = 0.",
      ],
    },
    {
      heading: "3. Simplifying logarithmic expressions",
      paragraphs: [
        "Example 1: log₂ 8 + log₂ 4 = 3 + 2 = 5. Using the product law instead, log₂ 8 + log₂ 4 = log₂ 32 = 5, and the two methods agree. Example 2: log₁₀ 50 + log₁₀ 2 = log₁₀ 100 = 2. Example 3: log₃ 54 − log₃ 2 = log₃ 27 = 3. Example 4: log 12 + log 5 − log 6 = log (12 × 5 ÷ 6) = log 10 = 1. Example 5: 2 log 5 + log 4 = log 25 + log 4 = log 100 = 2.",
        "When the base is not written, it is understood to be 10. Use the laws to combine several terms into one logarithm, and then evaluate if the answer is a simple power of the base. The usual mistake is to write log (x + y) as log x + log y; there is no law for the logarithm of a sum.",
      ],
    },
    {
      heading: "4. Solving simple logarithmic equations",
      paragraphs: [
        "To solve a logarithmic equation, combine the logarithms into one, then change to index form. Always check afterwards, because a logarithm is not defined for zero or negative numbers, and any answer that makes the number inside a logarithm zero or negative must be rejected.",
        "Example 6: log₅ x = 3 means x = 5³ = 125. Example 7: log_x 64 = 3 means x³ = 64, so x = 4. Example 8: log₃ (2x + 1) = 2 means 2x + 1 = 3² = 9, so x = 4. Example 9: log x + log (x − 3) = 1. Combine: log [x(x − 3)] = 1, so x(x − 3) = 10¹ = 10, giving x² − 3x − 10 = 0. Factorising, (x − 5)(x + 2) = 0. So x = 5 or x = −2. If x = −2, then log x is not defined, so x = −2 is rejected, and x = 5.",
        "Example 10: log₂ (x + 3) + log₂ (x − 3) = 4. Combine: log₂ (x² − 9) = 4, so x² − 9 = 2⁴ = 16 and x² = 25. So x = 5 or x = −5. For x = −5, the numbers x + 3 and x − 3 are negative, so only x = 5 is accepted.",
      ],
    },
    {
      heading: "5. Changing the base",
      paragraphs: [
        "A logarithm to one base can be written in terms of logarithms to another base c: log_a b = log_c b ÷ log_c a. Use a convenient base. Example 11: log₈ 32 = log₂ 32 ÷ log₂ 8 = 5 ÷ 3 = 5/3. Check: 8^(5/3) = (∛8)⁵ = 2⁵ = 32. Example 12: solve log₂ x + log₄ x = 3. Since log₄ x = log₂ x ÷ log₂ 4 = (log₂ x) ÷ 2, the equation becomes 1.5 log₂ x = 3, so log₂ x = 2 and x = 4. Check: log₂ 4 = 2 and log₄ 4 = 1, which sum to 3.",
      ],
    },
    {
      heading: "6. Common logarithms: characteristic and mantissa",
      paragraphs: [
        "Logarithms to base 10 are called common logarithms. They are written log without a base. Since log 10 = 1, log 100 = 2 and log 1000 = 3, the log of a number between 10 and 100 lies between 1 and 2, and so on. We write the logarithm of a number as a whole number part, called the characteristic, and a positive decimal part between 0 and 1, called the mantissa. For example, log 50 = 1.6990, so the characteristic is 1 and the mantissa is 0.6990.",
        "To find the characteristic, write the number in standard form A × 10ⁿ. The characteristic is the power n. So log 5 = 0.6990, log 50 = 1.6990 and log 500 = 2.6990: the mantissa is the same because the digits are the same, and only the characteristic changes. For a number less than 1, the characteristic is negative. log 0.5 = log (5 × 10⁻¹) = −1 + 0.6990. We write this as 1̄.6990, read ‘bar one point six nine nine zero’, with the minus sign on the characteristic only; the mantissa stays positive. So 1̄.6990 = −1 + 0.6990 = −0.3010. In the same way, 0.0082 = 8.2 × 10⁻³ so log 0.0082 = 3̄.9138.",
        "You can combine this with the laws. If log 2 = 0.3010, then log 8 = 3 × 0.3010 = 0.9030 and log 5 = log (10 ÷ 2) = 1 − 0.3010 = 0.6990. Your four-figure tables (Week 6) give the mantissa for any four-digit number.",
      ],
      points: [
        "Characteristic = the power of 10 in standard form.",
        "Mantissa = the positive decimal part, taken from tables.",
        "Numbers with the same digits have the same mantissa.",
        "For numbers less than 1, write the characteristic with a bar: 1̄, 2̄, 3̄.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "y = a^x and x = log_a y say exactly the same thing. Practise switching between the forms until it is automatic.",
    "log_a a = 1 and log_a 1 = 0, whatever the base.",
    "You cannot take the logarithm of zero or of a negative number. Always check solutions of log equations and reject invalid ones.",
    "There is no law for log (x + y). It is not log x + log y. The product law is for log (xy).",
    "log (x²) means 2 log x. But (log x)² is something different.",
    "When no base is written, the base is 10.",
    "In 1̄.6990 only the 1 is negative. The decimal part 0.6990 is positive. So 1̄.6990 = −1 + 0.6990 = −0.3010, not −1.6990.",
    "Numbers that differ by a power of 10 have the same mantissa. Only the characteristic changes.",
    "To change base use log_a b = log_c b ÷ log_c a. Choose a base that makes the numbers easy.",
  ],
  summary:
    "A logarithm is an index: y = a^x is the same as x = log_a y. The laws are log (xy) = log x + log y, log (x/y) = log x − log y and log (x^n) = n log x, with log_a a = 1 and log_a 1 = 0. Logarithmic equations are solved by combining the terms and changing to index form, and answers that make a logarithm undefined are rejected. The base can be changed with log_a b = log_c b ÷ log_c a. A base ten logarithm has a characteristic (the power of 10 in standard form) and a positive mantissa; for numbers below 1 the characteristic is written with a bar.",
  quick: {
    intro: "Week 5 revision sheet. Learn the index–log link, the three laws and the characteristic rule.",
    blocks: [
      {
        heading: "1. Index form and log form",
        points: [
          "y = a^x ⟺ x = log_a y.",
          "log_a a = 1; log_a 1 = 0.",
          "No logarithm of zero or of a negative number.",
        ],
        memory: "‘The log is the index.’",
      },
      {
        heading: "2. The laws",
        points: [
          "log (xy) = log x + log y.",
          "log (x/y) = log x − log y.",
          "log (x^n) = n log x.",
          "Change of base: log_a b = log_c b ÷ log_c a.",
        ],
        warning: "log (x + y) is not log x + log y.",
      },
      {
        heading: "3. Equations",
        points: [
          "Combine into one log, change to index form, solve.",
          "Reject any value that makes a log undefined.",
          "log x + log (x − 3) = 1 gives x = 5 (reject −2).",
        ],
      },
      {
        heading: "4. Characteristic and mantissa",
        points: [
          "Characteristic: power of 10 in standard form. Mantissa: decimal part, 0 to 1.",
          "log 5 = 0.6990, log 50 = 1.6990, log 0.5 = 1̄.6990.",
          "log 2 = 0.3010 gives log 8 = 0.9030 and log 5 = 0.6990.",
        ],
      },
    ],
    likely: [
      { question: "Write 2⁷ = 128 in logarithmic form.", answer: "log₂ 128 = 7." },
      { question: "State the three laws of logarithms.", answer: "log xy = log x + log y; log (x/y) = log x − log y; log x^n = n log x." },
      { question: "Simplify log 12 + log 5 − log 6.", answer: "log (12 × 5 ÷ 6) = log 10 = 1." },
      { question: "Evaluate log₈ 32.", answer: "log₂ 32 ÷ log₂ 8 = 5/3." },
      { question: "Solve log₅ x = 3.", answer: "x = 5³ = 125." },
      { question: "Solve log x + log (x − 3) = 1.", answer: "x(x − 3) = 10, so x = 5 or −2. Reject −2, so x = 5." },
      { question: "Given log 2 = 0.3010, find log 8 and log 5.", answer: "log 8 = 3 × 0.3010 = 0.9030; log 5 = 1 − 0.3010 = 0.6990." },
      { question: "State the characteristic of log 4560 and of log 0.00472.", answer: "3 and 3̄ (that is, −3)." },
      { question: "What is meant by the mantissa?", answer: "The positive decimal part of a logarithm, between 0 and 1." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Evaluate log₂ 32.", options: ["4", "6", "5", "16"], answer: "C", explanation: "2⁵ = 32, so log₂ 32 = 5." },
    { number: 2, kind: "Objective", prompt: "Evaluate log₃ 81.", options: ["4", "3", "27", "81"], answer: "A" },
    { number: 3, kind: "Objective", prompt: "Evaluate log₁₀ 0.001.", options: ["3", "−2", "1/3", "−3"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "Evaluate log₂ 8 + log₂ 4.", options: ["6", "5", "12", "32"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Evaluate log₃ 54 − log₃ 2.", options: ["52", "2", "3", "4"], answer: "C", explanation: "log₃ (54 ÷ 2) = log₃ 27 = 3." },
    { number: 6, kind: "Objective", prompt: "Evaluate log₄ 64.", options: ["3", "4", "16", "8"], answer: "A" },
    { number: 7, kind: "Objective", prompt: "Solve log₅ x = 3.", options: ["15", "8", "243", "125"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "Solve log_x 64 = 3.", options: ["2", "4", "8", "21.3"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Solve log x + log (x − 3) = 1, where the base is ten.", options: ["−2", "2", "5", "10"], answer: "C", explanation: "x(x − 3) = 10 gives x = 5 or −2. A logarithm cannot have a negative number inside it, so x = 5." },
    { number: 10, kind: "Objective", prompt: "Evaluate log₈ 32.", options: ["5/3", "3/5", "4", "24"], answer: "A", explanation: "log₈ 32 = log₂ 32 ÷ log₂ 8 = 5 ÷ 3." },
    { number: 11, kind: "Objective", prompt: "Given that log 2 = 0.3010, find log 8.", options: ["0.6020", "0.9030", "1.2040", "2.4080"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Given that log 2 = 0.3010, find log 5.", options: ["0.1505", "0.2010", "0.3010", "0.6990"], answer: "D", explanation: "log 5 = log (10 ÷ 2) = 1 − 0.3010 = 0.6990." },
    { number: 13, kind: "Objective", prompt: "The characteristic of log 4560 is", options: ["3", "4", "2", "0.4560"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "The characteristic of log 0.00472 is", options: ["3", "3̄", "2̄", "4̄"], answer: "B", explanation: "0.00472 = 4.72 × 10⁻³, so the characteristic is −3, written 3̄." },
    { number: 15, kind: "Theory", prompt: "Write in logarithmic form (a) 2⁷ = 128, (b) 10⁻² = 0.01 and (c) 9^(1/2) = 3, and in index form (d) log₅ 125 = 3 and (e) log₂ (1/8) = −3.", answer: "(a) log₂ 128 = 7. (b) log₁₀ 0.01 = −2. (c) log₉ 3 = 1/2. (d) 5³ = 125. (e) 2⁻³ = 1/8." },
    { number: 16, kind: "Theory", prompt: "State the product, quotient and power laws of logarithms. Use them to simplify log 12 + log 5 − log 6.", answer: "Product law: log xy = log x + log y. Quotient law: log (x/y) = log x − log y. Power law: log x^n = n log x. Then log 12 + log 5 − log 6 = log (12 × 5 ÷ 6) = log 10 = 1." },
    { number: 17, kind: "Theory", prompt: "Given that log 2 = 0.3010 and log 3 = 0.4771, find (a) log 6, (b) log 1.5, (c) log 24 and (d) log 0.2.", answer: "(a) log 6 = log 2 + log 3 = 0.7781. (b) log 1.5 = log 3 − log 2 = 0.1761. (c) 24 = 8 × 3, so log 24 = 3(0.3010) + 0.4771 = 1.3801. (d) log 0.2 = log 2 − log 10 = 0.3010 − 1 = −0.6990, which is written 1̄.3010." },
    { number: 18, kind: "Theory", prompt: "Solve (a) log₃ (2x + 1) = 2 and (b) log₂ (x + 3) + log₂ (x − 3) = 4.", answer: "(a) 2x + 1 = 3² = 9, so x = 4. (b) log₂ (x² − 9) = 4, so x² − 9 = 16 and x² = 25, giving x = 5 or −5. For x = −5, x − 3 is negative and the logarithm is not defined, so x = 5." },
    { number: 19, kind: "Theory", prompt: "Solve log₂ x + log₄ x = 3.", answer: "log₄ x = log₂ x ÷ log₂ 4 = (log₂ x) ÷ 2. So log₂ x + ½ log₂ x = 3, that is 1.5 log₂ x = 3, so log₂ x = 2 and x = 4. Check: log₂ 4 = 2 and log₄ 4 = 1, and 2 + 1 = 3." },
    { number: 20, kind: "Theory", prompt: "Given that log 3.06 = 0.4857, write down the characteristic and the mantissa of log 0.0306, and the values of log 306 and log 30.6.", answer: "0.0306 = 3.06 × 10⁻², so log 0.0306 = 2̄.4857. The characteristic is −2 (written 2̄) and the mantissa is 0.4857. log 306 = 2.4857 and log 30.6 = 1.4857, because the mantissa is the same and only the characteristic changes." },
  ] as PracticeQuestion[],
};
