import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek2: Lesson = {
  id: "ss1-first-mathematics-week-2",
  week: "Week 02",
  title: "Number bases (Part 2)",
  subtitle: "Add, subtract and multiply numbers in bases other than ten, and solve simple equations in which the base itself is the unknown.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Add two or more numbers in a given base using carrying.",
    "Subtract in a given base using borrowing.",
    "Multiply in a given base and add the partial products in that base.",
    "Divide in a given base by converting through base ten.",
    "Solve equations in which the base is an unknown x, and reject answers that are not possible bases.",
  ],
  sections: [
    {
      heading: "1. Adding in a base",
      paragraphs: [
        "Addition in base b works exactly like ordinary addition, column by column from the right. The only difference is when to carry. In base ten you carry when a column reaches ten; in base b you carry when the column total reaches b. To handle a column total, divide it by b: the remainder is the digit you write and the quotient is the amount you carry.",
        "Example 1: 1101₂ + 1011₂. Right column: 1 + 1 = 2 = 10₂, write 0 and carry 1. Next: 0 + 1 + 1 = 2, write 0 and carry 1. Next: 1 + 0 + 1 = 2, write 0 and carry 1. Next: 1 + 1 + 1 = 3 = 11₂, write 1 and carry 1. The last carry becomes the leftmost digit. The answer is 11000₂. Check in base ten: 13 + 11 = 24, and 11000₂ = 16 + 8 = 24.",
        "Example 2: 324₅ + 143₅. Units: 4 + 3 = 7 = 1 × 5 + 2, write 2 and carry 1. Fives: 2 + 4 + 1 = 7, write 2 and carry 1. Twenty-fives: 3 + 1 + 1 = 5 = 1 × 5 + 0, write 0 and carry 1. The final carry is written as 1. So 324₅ + 143₅ = 1022₅. Check: 89 + 48 = 137 and 1022₅ = 125 + 10 + 2 = 137.",
      ],
    },
    {
      heading: "2. Subtracting in a base",
      paragraphs: [
        "When a digit on top is too small, borrow 1 from the next column on the left. A borrowed 1 is worth b in the column you are working on (not ten). So in base five, if you borrow, the top digit becomes the digit plus 5.",
        "Example 3: 4023₅ − 1344₅. Units: 3 − 4 is impossible, so borrow from the fives column (digit 2, which becomes 1): 3 + 5 = 8, and 8 − 4 = 4. Fives: 1 − 4 is impossible; the next digit (0) has nothing to lend, so borrow from the thousands (4 becomes 3), making the hundreds column 5, which then lends 1 (leaving 4), so the fives column becomes 1 + 5 = 6, and 6 − 4 = 2. Hundreds: 4 − 3 = 1. Thousands: 3 − 1 = 2. The answer is 2124₅. Check: 513 − 224 = 289 and 2124₅ = 250 + 25 + 10 + 4 = 289.",
        "Example 4: 10110₂ − 1101₂. Units: 0 − 1, borrow from the twos digit: 2 − 1 = 1. Twos: 0 left after lending, minus 0 = 0. Fours: 1 − 1 = 0. Eights: 0 − 1, borrow from the sixteens digit: 2 − 1 = 1. Sixteens: 1 lent, 0 left. The answer is 1001₂. Check: 22 − 13 = 9 = 1001₂.",
      ],
    },
    {
      heading: "3. Multiplying in a base",
      paragraphs: [
        "Multiply as in long multiplication. Work out each single-digit product in base ten, then convert it to the base: the remainder is written and the quotient is carried. Then add the partial products in the base, using the carrying rule of that base.",
        "Example 5: 101₂ × 11₂. Multiplying by the right-hand 1 gives 101. Multiplying by the next 1 gives 101 shifted one place, which is 1010. Adding in base two: 101 + 1010 = 1111₂. Check: 5 × 3 = 15 = 1111₂.",
        "Example 6: 43₅ × 12₅. First multiply by 2: 3 × 2 = 6 = 11₅, write 1 and carry 1; 4 × 2 = 8, plus the carry 1 is 9 = 14₅, write 4 and carry 1; so the first line is 141₅. Next multiply by 1 and shift: 430₅. Add in base five: 141₅ + 430₅: units 1 + 0 = 1; fives 4 + 3 = 7 = 12₅, write 2 carry 1; next 1 + 4 + 1 = 6 = 11₅, write 1 carry 1; then 1. The answer is 1121₅. Check: 23 × 7 = 161 and 1121₅ = 125 + 25 + 10 + 1 = 161.",
      ],
    },
    {
      heading: "4. Division in a base",
      paragraphs: [
        "Long division in other bases is awkward, so it is usually easier to convert both numbers to base ten, divide, and convert the answer back. For example, 11110₂ ÷ 110₂: 11110₂ = 30 and 110₂ = 6, so 30 ÷ 6 = 5, and 5 = 101₂. The answer is 101₂.",
      ],
    },
    {
      heading: "5. Equations in which the base is unknown",
      paragraphs: [
        "When the base is an unknown x, you cannot add or subtract the numerals directly. Instead, change every numeral into base ten using x as the place value, and solve the resulting equation. A numeral such as 23ₓ means 2 × x + 3, and 121ₓ means 1 × x² + 2 × x + 1.",
        "Example 7: 31ₓ = 25₁₀. Then 3x + 1 = 25, so 3x = 24 and x = 8. Example 8: 45₆ = 35ₓ. The left side is 4 × 6 + 5 = 29. So 3x + 5 = 29, 3x = 24 and x = 8. Example 9: 34ₓ + 25ₓ = 62ₓ. Then (3x + 4) + (2x + 5) = 6x + 2, so 5x + 9 = 6x + 2 and x = 7.",
        "Example 10: find the base in which 24 + 43 = 100. In base x, (2x + 4) + (4x + 3) = x². So 6x + 7 = x², which gives x² − 6x − 7 = 0. Factorising, (x − 7)(x + 1) = 0, so x = 7 or x = −1. A base cannot be negative, so x = 7. Check in base seven: 24 + 43 = 4 + 3 = 7 = 10, write 0 carry 1; 2 + 4 + 1 = 7 = 10; so 100. Example 11: 121ₓ = 36₁₀. Then x² + 2x + 1 = 36, so (x + 1)² = 36, x + 1 = 6 and x = 5. All the digits (1 and 2) are smaller than 5, so the answer is acceptable.",
      ],
      points: [
        "The unknown base must be a whole number greater than every digit in the equation.",
        "Reject negative roots and fractional roots of the equation.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Carry when a column total reaches the base, not when it reaches ten. In base five, a total of 7 is written 2 with a carry of 1.",
    "When you borrow in base b, a borrowed 1 is worth b in the next column to the right. In base two, it is worth 2.",
    "Never write a digit that is equal to or larger than the base in your answer. If you see 5 in a base five answer, something is wrong.",
    "Add the partial products in the same base as the question. It is easy to slip back into base ten at this stage.",
    "To solve for an unknown base, convert everything into base ten first. 23ₓ means 2x + 3.",
    "The base must be bigger than every digit used in the equation, and it must be a positive whole number. Reject other roots.",
    "Check every answer by converting the numbers to base ten and doing the same operation there.",
    "For division, converting to base ten and back is quicker and safer than long division in the base.",
  ],
  summary:
    "Addition, subtraction and multiplication in a base follow the usual column methods, but carrying and borrowing are done in that base: when a column total reaches b you write the remainder and carry the quotient, and when you borrow, the borrowed 1 is worth b. Division is easiest by converting to base ten and back. For equations with an unknown base x, write every numeral as an expression in x, solve, and keep only a whole number greater than the largest digit. Always check by working in base ten.",
  quick: {
    intro: "Week 2 revision sheet. Do each operation in the base, and check in base ten.",
    blocks: [
      {
        heading: "1. Addition and subtraction",
        points: [
          "Addition: total ÷ b gives the carry; the remainder is the digit written.",
          "Subtraction: borrowing 1 adds b to the digit on its right.",
          "1101₂ + 1011₂ = 11000₂; 324₅ + 143₅ = 1022₅.",
          "4023₅ − 1344₅ = 2124₅; 10110₂ − 1101₂ = 1001₂.",
        ],
        memory: "Carry when you reach the base; borrow the base.",
      },
      {
        heading: "2. Multiplication and division",
        points: [
          "Multiply digit by digit, convert each product to the base, then add the partial products in the base.",
          "101₂ × 11₂ = 1111₂; 43₅ × 12₅ = 1121₅.",
          "Division: change to base ten, divide, and change back.",
        ],
      },
      {
        heading: "3. Unknown base",
        points: [
          "Write each numeral in terms of x: 23ₓ = 2x + 3; 121ₓ = x² + 2x + 1.",
          "Solve; reject negative or fractional x, and any x not larger than every digit.",
          "34ₓ + 25ₓ = 62ₓ gives x = 7. 24 + 43 = 100 gives x = 7.",
        ],
        warning: "A base must be larger than the biggest digit.",
      },
    ],
    likely: [
      { question: "Evaluate 1101₂ + 1011₂.", answer: "11000₂." },
      { question: "Evaluate 324₅ + 143₅.", answer: "1022₅." },
      { question: "Evaluate 10110₂ − 1101₂.", answer: "1001₂." },
      { question: "Evaluate 43₅ × 12₅.", answer: "1121₅." },
      { question: "Find x if 31ₓ = 25₁₀.", answer: "3x + 1 = 25, so x = 8." },
      { question: "Find x if 34ₓ + 25ₓ = 62ₓ.", answer: "5x + 9 = 6x + 2, so x = 7." },
      { question: "Find the base in which 24 + 43 = 100.", answer: "x² − 6x − 7 = 0, so x = 7 (reject −1)." },
      { question: "Why is a negative root rejected when solving for a base?", answer: "A base must be a positive whole number greater than every digit." },
      { question: "Evaluate 11110₂ ÷ 110₂.", answer: "30 ÷ 6 = 5 = 101₂." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Evaluate 1101₂ + 1011₂.", options: ["11000₂", "10110₂", "11100₂", "10100₂"], answer: "A", explanation: "13 + 11 = 24 and 24 = 11000₂." },
    { number: 2, kind: "Objective", prompt: "Evaluate 324₅ + 143₅.", options: ["467₅", "1022₅", "1012₅", "1122₅"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Evaluate 4023₅ − 1344₅.", options: ["2234₅", "2134₅", "2124₅", "3124₅"], answer: "C", explanation: "513 − 224 = 289 and 289 = 2 × 125 + 1 × 25 + 2 × 5 + 4 = 2124₅." },
    { number: 4, kind: "Objective", prompt: "Evaluate 10110₂ − 1101₂.", options: ["1111₂", "1011₂", "1100₂", "1001₂"], answer: "D" },
    { number: 5, kind: "Objective", prompt: "Evaluate 101₂ × 11₂.", options: ["1111₂", "1001₂", "1011₂", "111₂"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Evaluate 43₅ × 12₅.", options: ["1111₅", "1121₅", "1221₅", "1211₅"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Evaluate 34₇ + 25₇.", options: ["52₇", "61₇", "62₇", "63₇"], answer: "C", explanation: "4 + 5 = 9 = 12₇, write 2 carry 1; 3 + 2 + 1 = 6. So 62₇." },
    { number: 8, kind: "Objective", prompt: "Evaluate 653₈ + 274₈.", options: ["1137₈", "1157₈", "1047₈", "1147₈"], answer: "D", explanation: "427 + 188 = 615 and 615 = 1 × 512 + 1 × 64 + 4 × 8 + 7 = 1147₈." },
    { number: 9, kind: "Objective", prompt: "Evaluate 52₆ − 14₆.", options: ["34₆", "44₆", "42₆", "33₆"], answer: "A", explanation: "32 − 10 = 22 = 3 × 6 + 4 = 34₆." },
    { number: 10, kind: "Objective", prompt: "If 31ₓ = 25₁₀, find x.", options: ["5", "7", "8", "9"], answer: "C", explanation: "3x + 1 = 25, so x = 8." },
    { number: 11, kind: "Objective", prompt: "If 45₆ = 35ₓ, find x.", options: ["5", "6", "7", "8"], answer: "D", explanation: "45₆ = 29, so 3x + 5 = 29 and x = 8." },
    { number: 12, kind: "Objective", prompt: "In which base is 24 + 43 = 100?", options: ["6", "7", "8", "9"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "If 121ₓ = 36₁₀, find x.", options: ["3", "4", "5", "6"], answer: "C", explanation: "x² + 2x + 1 = 36, so (x + 1)² = 36, x + 1 = 6 and x = 5." },
    { number: 14, kind: "Objective", prompt: "Evaluate 11₂ × 111₂.", options: ["10101₂", "10011₂", "11001₂", "1111₂"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Find 2341₅ + 1432₅, leaving your answer in base five, and check it in base ten.", answer: "Units: 1 + 2 = 3. Fives: 4 + 3 = 7 = 12₅, write 2 carry 1. Twenty-fives: 3 + 4 + 1 = 8 = 13₅, write 3 carry 1. Hundred-and-twenty-fives: 2 + 1 + 1 = 4. So the sum is 4323₅. Check: 346 + 242 = 588 and 4323₅ = 4 × 125 + 3 × 25 + 2 × 5 + 3 = 500 + 75 + 10 + 3 = 588." },
    { number: 16, kind: "Theory", prompt: "Evaluate (a) 11000₂ − 1011₂ in base two and (b) 5203₈ − 2764₈ in base eight.", answer: "(a) 24 − 11 = 13, and column subtraction gives 1101₂. (b) Column subtraction in base eight gives 2217₈. Check: 5203₈ = 2691, 2764₈ = 1524, 2691 − 1524 = 1167, and 2217₈ = 2 × 512 + 2 × 64 + 1 × 8 + 7 = 1167." },
    { number: 17, kind: "Theory", prompt: "Multiply 213₄ by 12₄, giving your answer in base four.", answer: "213₄ × 2: 3 × 2 = 6 = 12₄, write 2 carry 1; 1 × 2 + 1 = 3; 2 × 2 = 4 = 10₄; so 1032₄. 213₄ × 1 shifted = 2130₄. Adding in base four: 1032₄ + 2130₄ = 3222₄. Check: 39 × 6 = 234 and 3222₄ = 192 + 32 + 8 + 2 = 234." },
    { number: 18, kind: "Theory", prompt: "Find x if 34ₓ + 25ₓ = 62ₓ.", answer: "Change to base ten: (3x + 4) + (2x + 5) = 6x + 2. So 5x + 9 = 6x + 2, which gives x = 7. All the digits are less than 7, so this is acceptable. Check in base seven: 34 + 25 = 62." },
    { number: 19, kind: "Theory", prompt: "Find the base in which 24 + 43 = 100.", answer: "Let the base be x. Then (2x + 4) + (4x + 3) = x², so x² − 6x − 7 = 0. Factorising, (x − 7)(x + 1) = 0, so x = 7 or x = −1. A base cannot be negative, so the base is 7." },
    { number: 20, kind: "Theory", prompt: "A pupil says that 123₄ + 321₄ = 444₄. Explain her mistake and find the correct answer.", answer: "The digit 4 cannot appear in base four, so 444₄ cannot be correct. She added in base ten and forgot to carry. Correctly: 3 + 1 = 4 = 10₄, write 0 carry 1; 2 + 2 + 1 = 5 = 11₄, write 1 carry 1; 1 + 3 + 1 = 5 = 11₄, write 11. So the sum is 1110₄. Check: 27 + 57 = 84 and 1110₄ = 64 + 16 + 4 = 84." },
  ] as PracticeQuestion[],
};
