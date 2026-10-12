import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek3: Lesson = {
  id: "ss1-first-mathematics-week-3",
  week: "Week 03",
  title: "Modular arithmetic",
  subtitle: "Learn the arithmetic of remainders, often called clock arithmetic, and use it for days of the week, work shifts and repeating cycles.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain modular arithmetic as the arithmetic of remainders and name the possible remainders for a modulus.",
    "Reduce any whole number, including a negative number, to its residue modulo n.",
    "Add, subtract and multiply in modular systems.",
    "Complete and use operation tables, and solve simple equations modulo n.",
    "Apply modular arithmetic to days of the week, clock times, shifts and cycles.",
  ],
  sections: [
    {
      heading: "1. Clock arithmetic and remainders",
      paragraphs: [
        "On a 12-hour clock, 10 o’clock plus 5 hours is 3 o’clock, not 15 o’clock. After 12 the hands start again from the beginning. Mathematicians call this arithmetic ‘modulo 12’. In modulo n arithmetic we only care about the remainder when a number is divided by n. The number n is called the modulus.",
        "The possible remainders when dividing by n are the numbers 0, 1, 2, …, n − 1. These are called the residues. For modulus 4 they are {0, 1, 2, 3}, for modulus 5 they are {0, 1, 2, 3, 4}, and for modulus 7 they are {0, 1, 2, 3, 4, 5, 6}. A residue is never as large as the modulus.",
      ],
    },
    {
      heading: "2. Notation and reducing numbers",
      paragraphs: [
        "We write a ≡ b (mod n), read ‘a is congruent to b modulo n’, when a and b leave the same remainder on division by n. For instance, 17 ≡ 5 (mod 12), because both leave remainder 5 when divided by 12. Some textbooks use an equals sign instead of ≡. In this subject, ‘x mod n’ means the remainder when x is divided by n.",
        "To reduce a number, divide by n and keep the remainder. 47 mod 5 = 2, because 47 = 9 × 5 + 2. 128 mod 9 = 2, because 128 = 14 × 9 + 2. Any multiple of n reduces to 0, so 36 mod 9 = 0. For a negative number, add multiples of n until the result lies between 0 and n − 1: −3 mod 7 = 4, because −3 + 7 = 4, and −9 mod 5 = 1, because −9 + 10 = 1.",
      ],
    },
    {
      heading: "3. Addition, subtraction and multiplication",
      paragraphs: [
        "To add, subtract or multiply modulo n, do the operation in the ordinary way and then reduce the answer modulo n. Example 1: (8 + 9) mod 12 = 17 mod 12 = 5. Example 2: (3 − 8) mod 7 = −5 mod 7 = 2. Example 3: (7 × 8) mod 9 = 56 mod 9 = 2, because 56 = 6 × 9 + 2. Example 4: (6 × 5) mod 11 = 30 mod 11 = 8.",
        "You may also reduce first and then operate, which keeps the numbers small. For example, to find (47 + 38) mod 5, reduce 47 to 2 and 38 to 3: 2 + 3 = 5, which is 0 (mod 5). Check: 47 + 38 = 85, which is a multiple of 5.",
      ],
    },
    {
      heading: "4. Operation tables",
      paragraphs: [
        "We can show all results of an operation in a table. To build the multiplication table modulo 5 for the numbers 1, 2, 3 and 4, multiply each row number by each column number and reduce mod 5. The rows read: row 1: 1, 2, 3, 4; row 2: 2, 4, 1, 3; row 3: 3, 1, 4, 2; row 4: 4, 3, 2, 1. For example, 3 × 4 = 12, and 12 mod 5 = 2, so the entry in row 3, column 4 is 2.",
        "A table helps you solve problems quickly. To solve 2n ≡ 3 (mod 5), look along row 2 for the entry 3; it is under column 4, so n = 4. The number 1 is the identity for multiplication, because it leaves every number unchanged. The inverse of a number is the number that multiplies with it to give the identity 1. In the table, 3 × 2 = 1, so the inverse of 3 is 2. For addition modulo n, the identity is 0.",
      ],
    },
    {
      heading: "5. Equations in modular arithmetic",
      paragraphs: [
        "To solve an equation modulo n, try values, or add multiples of n to the right-hand side until you can divide. Example 5: x + 5 ≡ 2 (mod 8). Adding 8 to the right gives x + 5 = 10, so x = 5. Check: 5 + 5 = 10, and 10 mod 8 = 2. Example 6: 3x ≡ 2 (mod 7). Adding 7 to 2 gives 9, and 9 ÷ 3 = 3, so x = 3. Check: 3 × 3 = 9, and 9 mod 7 = 2.",
        "Example 7: find the least whole number x such that 2x + 1 ≡ 4 (mod 7). Take 1 from both sides: 2x ≡ 3 (mod 7). The right side, 3, cannot be divided by 2, so add 7 to get 10. Then x = 5. Test the smaller values: x = 0, 1, 2, 3, 4 give 1, 3, 5, 0, 2 (mod 7), none of which is 4, so the least value is 5. Equations modulo n have infinitely many solutions, because x + n, x + 2n, … also work. The question usually asks for the least or the positive one.",
      ],
    },
    {
      heading: "6. Practical uses: days, shifts and cycles",
      paragraphs: [
        "Days of the week repeat every 7 days, so day-of-week questions use modulo 7. If today is Tuesday, find the day after 45 days: 45 mod 7 = 3, so we move 3 days on from Tuesday, which is Friday. To find the day 100 days after a Monday: 100 mod 7 = 2, so it is Wednesday.",
        "Clock times use modulo 12 (or 24 on a 24-hour clock). If it is 9 o’clock now, then 50 hours later it is (9 + 50) mod 12 = 59 mod 12 = 11, so 11 o’clock. A security guard whose shifts follow a 4-day pattern, a repeating line of bead colours or a bus that runs a cycle of 6 routes are all modulo problems: find the remainder when the position number is divided by the length of the cycle. If the remainder is 0, you are at the last place of the cycle.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "A residue modulo n is one of 0, 1, 2, …, n − 1. It is always smaller than n. The residue is never n itself.",
    "To reduce a negative number, add multiples of n. −3 mod 7 is 4, not 3 and not −3.",
    "You can reduce before or after you operate. Reducing first keeps the numbers small.",
    "When the remainder is 0 in a cycle problem, you are at the last item of the cycle, not the first.",
    "For days of the week, divide by 7 and count forward the remainder. A remainder of 0 means the same day.",
    "Modular equations have many solutions. Read the question for ‘least’ or ‘positive’ and check by substituting back.",
    "In a table, the identity element leaves each number unchanged, and the inverse of a number gives the identity when combined with it.",
    "Do not divide both sides by a number when working modulo n unless it divides the right-hand side exactly. Add multiples of n first.",
  ],
  summary:
    "Modular arithmetic works with remainders. In modulo n, the residues are 0, 1, …, n − 1. To compute a result, do the ordinary operation and reduce modulo n; negative numbers are reduced by adding multiples of n. Operation tables list every result, show identities and inverses, and help solve equations. Equations are solved by adding multiples of n to the right side until a division is possible, and answers are checked by substitution. Days of the week, clock times, work shifts and repeating patterns are practical uses.",
  quick: {
    intro: "Week 3 revision sheet. Everything is about the remainder after dividing by n.",
    blocks: [
      {
        heading: "1. Basics",
        points: [
          "x mod n = remainder when x is divided by n.",
          "Residues: 0, 1, 2, …, n − 1.",
          "a ≡ b (mod n): a and b leave the same remainder.",
          "Negative numbers: add multiples of n. −3 mod 7 = 4.",
        ],
      },
      {
        heading: "2. Operations",
        points: [
          "Operate normally, then reduce mod n.",
          "(8 + 9) mod 12 = 5; (3 − 8) mod 7 = 2.",
          "(7 × 8) mod 9 = 2; (6 × 5) mod 11 = 8.",
        ],
        memory: "Do the sum, then ‘wrap round the clock’.",
      },
      {
        heading: "3. Tables and equations",
        points: [
          "Table mod 5: row 2 reads 2, 4, 1, 3; row 3 reads 3, 1, 4, 2.",
          "Identity for × is 1; for + it is 0. Inverse: the pair that gives the identity.",
          "Equation: add multiples of n to the right side until you can divide.",
          "3x ≡ 2 (mod 7) gives x = 3; 2x + 1 ≡ 4 (mod 7) gives x = 5 (least).",
        ],
        warning: "Check your answer by putting it back into the equation.",
      },
      {
        heading: "4. Applications",
        points: [
          "Days: divide by 7 and count on the remainder.",
          "Clock: mod 12 (or 24).",
          "Cycles: divide the position by the length of the cycle.",
        ],
      },
    ],
    likely: [
      { question: "What are the residues modulo 6?", answer: "0, 1, 2, 3, 4 and 5." },
      { question: "Find 128 mod 9.", answer: "128 = 14 × 9 + 2, so the answer is 2." },
      { question: "Evaluate (3 − 8) mod 7.", answer: "−5 + 7 = 2." },
      { question: "Evaluate (7 × 8) mod 9.", answer: "56 mod 9 = 2." },
      { question: "Solve 3x ≡ 2 (mod 7).", answer: "3x = 2 + 7 = 9, so x = 3." },
      { question: "Find the least x such that 2x + 1 ≡ 4 (mod 7).", answer: "2x ≡ 3 (mod 7), so 2x = 10 and x = 5." },
      { question: "If today is Tuesday, what day is it 45 days from now?", answer: "45 mod 7 = 3, so Friday." },
      { question: "What is 9 o’clock plus 50 hours on a 12-hour clock?", answer: "59 mod 12 = 11, so 11 o’clock." },
      { question: "In multiplication modulo 5, what is the inverse of 3?", answer: "2, because 3 × 2 = 6 ≡ 1." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Find 47 mod 5.", options: ["1", "2", "3", "4"], answer: "B", explanation: "47 = 9 × 5 + 2, so the remainder is 2." },
    { number: 2, kind: "Objective", prompt: "Evaluate 128 (mod 9).", options: ["2", "5", "7", "14"], answer: "A" },
    { number: 3, kind: "Objective", prompt: "Evaluate (8 + 9) mod 12.", options: ["3", "4", "5", "6"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "Evaluate (3 − 8) mod 7.", options: ["−5", "1", "5", "2"], answer: "D", explanation: "3 − 8 = −5 and −5 + 7 = 2." },
    { number: 5, kind: "Objective", prompt: "Evaluate (7 × 8) mod 9.", options: ["2", "5", "6", "8"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Evaluate (6 × 5) mod 11.", options: ["3", "5", "8", "19"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Find the least positive value of x such that x + 5 ≡ 2 (mod 8).", options: ["−3", "3", "4", "5"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "Solve 3x ≡ 2 (mod 7), where x is the least whole number.", options: ["3", "4", "5", "6"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "Find the least whole number x such that 2x + 1 ≡ 4 (mod 7).", options: ["3", "5", "6", "7"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "If today is Tuesday, what day of the week will it be 45 days from today?", options: ["Wednesday", "Thursday", "Friday", "Saturday"], answer: "C", explanation: "45 mod 7 = 3, and three days after Tuesday is Friday." },
    { number: 11, kind: "Objective", prompt: "A 12-hour clock shows 9 o’clock. What time will it show 50 hours later?", options: ["11 o’clock", "10 o’clock", "12 o’clock", "1 o’clock"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "The set of residues modulo 6 is", options: ["{1, 2, 3, 4, 5, 6}", "{0, 1, 2, 3, 4, 5, 6}", "{1, 2, 3, 4, 5}", "{0, 1, 2, 3, 4, 5}"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Which of the following is NOT congruent to 3 (mod 5)?", options: ["8", "13", "19", "23"], answer: "C", explanation: "19 leaves remainder 4 on division by 5. The others leave remainder 3." },
    { number: 14, kind: "Objective", prompt: "A multiplication table modulo 5 is drawn for the numbers 1, 2, 3 and 4. The entry for 3 × 4 is", options: ["1", "2", "3", "4"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "(a) Explain what is meant by modulo n arithmetic and by a residue. (b) Find 100 mod 7, 365 mod 7 and −9 mod 5.", answer: "(a) Modulo n arithmetic uses only the remainder after division by n. The residues are the possible remainders 0, 1, 2, …, n − 1. (b) 100 = 14 × 7 + 2, so 100 mod 7 = 2. 365 = 52 × 7 + 1, so 365 mod 7 = 1. −9 + 10 = 1, so −9 mod 5 = 1." },
    { number: 16, kind: "Theory", prompt: "Draw up the multiplication table modulo 5 for the numbers 1, 2, 3 and 4. Use it to solve 2n ≡ 3 and to find the inverse of 3.", answer: "Row 1: 1, 2, 3, 4. Row 2: 2, 4, 1, 3. Row 3: 3, 1, 4, 2. Row 4: 4, 3, 2, 1. In row 2, the entry 3 is in column 4, so n = 4. The identity is 1. In row 3, the entry 1 is in column 2, so the inverse of 3 is 2." },
    { number: 17, kind: "Theory", prompt: "Ada works a repeating 4-day rota. Day 1 is a morning shift, day 2 is an afternoon shift, day 3 is a night shift and day 4 is a rest day, and then the rota starts again. What will she be doing on day 30?", answer: "The rota repeats every 4 days, so find 30 mod 4. 30 = 7 × 4 + 2, so the remainder is 2. Day 30 matches day 2 of the rota, so she works the afternoon shift." },
    { number: 18, kind: "Theory", prompt: "Find the least positive whole number x such that 5x + 2 ≡ 3 (mod 7).", answer: "Subtract 2: 5x ≡ 1 (mod 7). Add 7 repeatedly to the right side: 1, 8, 15. Only 15 is divisible by 5, so x = 3. Check: 5 × 3 + 2 = 17 and 17 mod 7 = 3." },
    { number: 19, kind: "Theory", prompt: "Today is Thursday. What day of the week will it be (a) 59 days from now and (b) what day was it 59 days ago?", answer: "59 = 8 × 7 + 3, so 59 mod 7 = 3. (a) Three days after Thursday is Sunday. (b) Three days before Thursday is Monday." },
    { number: 20, kind: "Theory", prompt: "An operation ⊕ is defined on the set {0, 1, 2, 3, 4, 5} by x ⊕ y = (x + y) mod 6. Find (a) 4 ⊕ 5, (b) the value of m if 3 ⊕ m = 1 and (c) the identity element.", answer: "(a) 4 ⊕ 5 = 9 mod 6 = 3. (b) 3 + m ≡ 1 (mod 6), so 3 + m = 7 and m = 4. Check: 3 ⊕ 4 = 7 mod 6 = 1. (c) The identity e satisfies x ⊕ e = x for all x, so e = 0." },
  ] as PracticeQuestion[],
};
