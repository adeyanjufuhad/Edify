import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek1: Lesson = {
  id: "ss1-first-mathematics-week-1",
  week: "Week 01",
  title: "Number bases (Part 1)",
  subtitle: "Review how our ordinary base ten numbers work, then learn to write numbers in other bases and change from one base to another.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain place value in base ten and in other bases, and say which digits a base can use.",
    "Convert a base ten number to another base by repeated division.",
    "Convert a number in any base to base ten by expansion.",
    "Convert between two non-decimal bases, and between base two and base eight by grouping.",
    "Convert simple numbers with a radix point (a ‘decimal point’) from one base to another.",
  ],
  sections: [
    {
      heading: "1. Counting in bases",
      paragraphs: [
        "In the number 3 456 each digit has a place value that is ten times larger than the place on its right: 3 456 = 3 × 10³ + 4 × 10² + 5 × 10¹ + 6 × 10⁰. We use ten digits, 0 to 9, and we regroup in tens, which is why this is called base ten (also denary or decimal). Base ten is natural for us only because we have ten fingers. Other bases are used too: a computer works in base two, a dozen eggs is a group of twelve, there are sixty minutes in an hour and seven days in a week.",
        "In base b we regroup in b’s. The digits available are 0, 1, 2, … up to b − 1, so base five uses only 0, 1, 2, 3 and 4, and base two uses only 0 and 1. The place values from the right are b⁰ = 1, b¹, b², b³ and so on. The numeral 3052₅ is therefore impossible, because the digit 5 does not exist in base five. The small number written below and to the right is the base. Always write it, because 101₂, 101₅ and 101₁₀ are three different numbers. When no base is written, it is base ten.",
      ],
    },
    {
      heading: "2. From base ten to another base",
      paragraphs: [
        "To change a base ten number into base b, divide it by b again and again, writing down the remainder each time, until the quotient is zero. Then read the remainders from the bottom upwards.",
        "Example 1: change 45₁₀ to base two. 45 ÷ 2 = 22 remainder 1; 22 ÷ 2 = 11 remainder 0; 11 ÷ 2 = 5 remainder 1; 5 ÷ 2 = 2 remainder 1; 2 ÷ 2 = 1 remainder 0; 1 ÷ 2 = 0 remainder 1. Reading the remainders upwards gives 45₁₀ = 101101₂. Check: 32 + 8 + 4 + 1 = 45.",
        "Example 2: change 100₁₀ to base five. 100 ÷ 5 = 20 remainder 0; 20 ÷ 5 = 4 remainder 0; 4 ÷ 5 = 0 remainder 4. So 100₁₀ = 400₅. Example 3: change 214₁₀ to base eight. 214 ÷ 8 = 26 remainder 6; 26 ÷ 8 = 3 remainder 2; 3 ÷ 8 = 0 remainder 3. So 214₁₀ = 326₈.",
      ],
      diagram: "Draw the vertical division ladder for 45 ÷ 2 with the divisor 2 on the left, the quotients 22, 11, 5, 2, 1, 0 down the middle and the remainders 1, 0, 1, 1, 0, 1 on the right. Draw an arrow pointing upwards beside the remainders.",
    },
    {
      heading: "3. From another base to base ten",
      paragraphs: [
        "To change a number from base b to base ten, write each digit multiplied by its place value (a power of b) and add. This is called expansion.",
        "Example 4: 10110₂ = 1 × 16 + 0 × 8 + 1 × 4 + 1 × 2 + 0 × 1 = 22₁₀. Example 5: 2431₅ = 2 × 125 + 4 × 25 + 3 × 5 + 1 × 1 = 250 + 100 + 15 + 1 = 366₁₀. Example 6: 1245₆ = 1 × 216 + 2 × 36 + 4 × 6 + 5 × 1 = 216 + 72 + 24 + 5 = 317₁₀.",
      ],
    },
    {
      heading: "4. Between two non-decimal bases",
      paragraphs: [
        "To change a number from one base that is not ten to another base that is not ten, go through base ten: first expand into base ten, then divide into the new base.",
        "Example 7: change 342₅ to base eight. 342₅ = 3 × 25 + 4 × 5 + 2 = 97₁₀. Then 97 ÷ 8 = 12 remainder 1; 12 ÷ 8 = 1 remainder 4; 1 ÷ 8 = 0 remainder 1. So 342₅ = 141₈. Example 8: change 1321₄ to base seven. 1321₄ = 64 + 48 + 8 + 1 = 121₁₀. Then 121 ÷ 7 = 17 remainder 2; 17 ÷ 7 = 2 remainder 3; 2 ÷ 7 = 0 remainder 2. So 1321₄ = 232₇.",
      ],
    },
    {
      heading: "5. A shortcut between base two and base eight",
      paragraphs: [
        "Because 8 = 2³, every octal digit stands for exactly three binary digits: 0 = 000, 1 = 001, 2 = 010, 3 = 011, 4 = 100, 5 = 101, 6 = 110 and 7 = 111. To change from binary to octal, group the binary digits in threes starting from the right (adding zeros on the left if needed) and replace each group by its octal digit. So 101101₂ = 101 | 101 = 55₈, and 1010111₂ = 001 | 010 | 111 = 127₈. To change from octal to binary, replace each digit by its three-digit group: 725₈ = 111 | 010 | 101 = 111010101₂. As a check, 55₈ = 5 × 8 + 5 = 45, which matches Example 1.",
      ],
    },
    {
      heading: "6. Numbers with a radix point",
      paragraphs: [
        "A number such as 6.375 has a whole part and a fractional part. To change it from base ten into base b, convert the whole part by division as before. For the fractional part, multiply it by b repeatedly. At each step the whole number that appears in front of the radix point is the next digit, and only the new fractional part is multiplied again. The digits are read from the top downwards.",
        "Example 9: change 6.375₁₀ to base two. The whole part 6 = 110₂. For 0.375: 0.375 × 2 = 0.75 (digit 0); 0.75 × 2 = 1.5 (digit 1); 0.5 × 2 = 1.0 (digit 1) and the fraction is now zero. So 0.375₁₀ = 0.011₂ and 6.375₁₀ = 110.011₂. If the fractional part never ends, stop after the number of places asked for.",
        "To change a number with a radix point from base b to base ten, the places after the radix point have values b⁻¹, b⁻², b⁻³. Example 10: 11.101₂ = 1 × 2 + 1 × 1 + 1 × ½ + 0 × ¼ + 1 × ⅛ = 2 + 1 + 0.5 + 0.125 = 3.625₁₀.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "In base b the digits run from 0 to b − 1. A digit equal to or bigger than the base is a sign of a mistake. 3052₅ is not a number.",
    "Read the remainders from the bottom up when you convert by division. Reading them from the top gives the digits in reverse.",
    "Always write the base as a small number after the answer. 101₂ and 101₁₀ are different numbers.",
    "The right-hand digit is multiplied by b⁰ = 1, not by b. The next digit is multiplied by b¹, and so on.",
    "To change between two bases that are both not ten, go through base ten. The only shortcut is grouping for base two and base eight.",
    "When you group binary digits in threes, start from the right and pad the left with zeros.",
    "In a fraction conversion, only the fractional part is multiplied again. The whole numbers produced are the digits, read from the top down.",
    "Check your answer by converting back to base ten. If the two base ten numbers match, the conversion is right.",
    "Do not do 1 + 1 = 2 in base two. In base two, 1 + 1 = 10₂, so there is always a carry.",
  ],
  summary:
    "A number base tells us how we regroup: base b uses the digits 0 to b − 1, and the place values from the right are powers of b. To change from base ten to base b, divide repeatedly by b and read the remainders from the bottom up. To change from base b to base ten, expand using powers of b. To change between two bases that are not ten, go through base ten, except that base two and base eight can be changed by grouping the binary digits in threes. Numbers with a radix point are converted by dividing the whole part and repeatedly multiplying the fractional part.",
  quick: {
    intro: "Week 1 revision sheet. Learn the two main methods and the digit rule.",
    blocks: [
      {
        heading: "1. Digits and place values",
        points: [
          "Base b uses the digits 0 to b − 1.",
          "Place values from the right: b⁰, b¹, b², b³, …",
          "Write the base as a subscript: 101₂ ≠ 101₁₀.",
        ],
      },
      {
        heading: "2. Base ten to base b",
        points: [
          "Divide by b repeatedly; write down each remainder.",
          "Read the remainders from the bottom up.",
          "45₁₀ = 101101₂; 100₁₀ = 400₅; 214₁₀ = 326₈.",
        ],
        memory: "Divide, then read upwards: ‘up the ladder’.",
      },
      {
        heading: "3. Base b to base ten",
        points: [
          "Expand: digit × place value, then add.",
          "2431₅ = 2 × 125 + 4 × 25 + 3 × 5 + 1 = 366.",
        ],
      },
      {
        heading: "4. Between other bases",
        points: [
          "Go through base ten: expand, then divide.",
          "Binary ↔ octal: group in threes (000 to 111).",
          "342₅ = 97₁₀ = 141₈; 101101₂ = 55₈.",
        ],
        warning: "Group binary digits from the right, not from the left.",
      },
      {
        heading: "5. Radix point",
        points: [
          "Whole part: divide. Fractional part: multiply by b and take the whole numbers from the top down.",
          "6.375₁₀ = 110.011₂; 11.101₂ = 3.625₁₀.",
        ],
      },
    ],
    likely: [
      { question: "State the digits that can be used in base six.", answer: "0, 1, 2, 3, 4 and 5." },
      { question: "Convert 45₁₀ to base two.", answer: "101101₂." },
      { question: "Convert 214₁₀ to base eight.", answer: "326₈." },
      { question: "Express 2431₅ as a base ten number.", answer: "366₁₀." },
      { question: "Convert 342₅ to base eight.", answer: "342₅ = 97₁₀ = 141₈." },
      { question: "Convert 1010111₂ to base eight by grouping.", answer: "001 | 010 | 111 = 127₈." },
      { question: "Convert 0.625₁₀ to base two.", answer: "0.625 × 2 = 1.25 (1); 0.25 × 2 = 0.5 (0); 0.5 × 2 = 1.0 (1). So 0.101₂." },
      { question: "Why is 3052₅ not a correct numeral?", answer: "The digit 5 cannot be used in base five." },
      { question: "How do you check a base conversion?", answer: "Convert the answer back to base ten and compare." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which of these is NOT a valid base five numeral?", options: ["2301₅", "4132₅", "3052₅", "1034₅"], answer: "C", explanation: "3052₅ contains the digit 5, which cannot be used in base five." },
    { number: 2, kind: "Objective", prompt: "The digits used in base seven are", options: ["1 to 7", "0 to 6", "0 to 7", "1 to 6"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Convert 45₁₀ to base two.", options: ["101101₂", "110101₂", "101011₂", "100111₂"], answer: "A", explanation: "32 + 8 + 4 + 1 = 45, so the binary digits are 101101." },
    { number: 4, kind: "Objective", prompt: "Express 100₁₀ in base five.", options: ["40₅", "100₅", "404₅", "400₅"], answer: "D", explanation: "100 ÷ 5 = 20 r 0; 20 ÷ 5 = 4 r 0; 4 ÷ 5 = 0 r 4. Reading upwards: 400₅." },
    { number: 5, kind: "Objective", prompt: "Convert 214₁₀ to base eight.", options: ["236₈", "623₈", "326₈", "362₈"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "Convert 10110₂ to base ten.", options: ["22", "44", "18", "26"], answer: "A", explanation: "16 + 4 + 2 = 22." },
    { number: 7, kind: "Objective", prompt: "Convert 2431₅ to base ten.", options: ["336", "366", "396", "1431"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Express 1245₆ as a base ten number.", options: ["245", "305", "317", "332"], answer: "C", explanation: "1 × 216 + 2 × 36 + 4 × 6 + 5 = 317." },
    { number: 9, kind: "Objective", prompt: "Convert 342₅ to base eight.", options: ["114₈", "411₈", "104₈", "141₈"], answer: "D", explanation: "342₅ = 97₁₀, and 97 = 1 × 64 + 4 × 8 + 1 = 141₈." },
    { number: 10, kind: "Objective", prompt: "Convert 1010111₂ to base eight.", options: ["127₈", "125₈", "237₈", "721₈"], answer: "A", explanation: "Group in threes from the right: 001 | 010 | 111 = 1, 2, 7." },
    { number: 11, kind: "Objective", prompt: "Convert 725₈ to base two.", options: ["101010111₂", "111010101₂", "111101010₂", "110010101₂"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Convert 1032₄ to base ten.", options: ["72", "76", "78", "84"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Convert 0.625₁₀ to base two.", options: ["0.011₂", "0.110₂", "0.001₂", "0.101₂"], answer: "D" },
    { number: 14, kind: "Objective", prompt: "Express 11.101₂ as a base ten number.", options: ["3.625", "3.5", "3.125", "5.625"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Write the numeral 2431₅ in expanded form, stating the place value of each digit, and find its value in base ten.", answer: "The place values from the right are 5⁰ = 1, 5¹ = 5, 5² = 25 and 5³ = 125. So 2431₅ = 2 × 125 + 4 × 25 + 3 × 5 + 1 × 1 = 250 + 100 + 15 + 1 = 366₁₀." },
    { number: 16, kind: "Theory", prompt: "Convert (a) 214₁₀ to base eight and (b) 100₁₀ to base five, showing the division in each case.", answer: "(a) 214 ÷ 8 = 26 r 6; 26 ÷ 8 = 3 r 2; 3 ÷ 8 = 0 r 3. Reading upwards, 214₁₀ = 326₈. (b) 100 ÷ 5 = 20 r 0; 20 ÷ 5 = 4 r 0; 4 ÷ 5 = 0 r 4. Reading upwards, 100₁₀ = 400₅." },
    { number: 17, kind: "Theory", prompt: "Convert 1321₄ to base seven.", answer: "First change to base ten: 1321₄ = 1 × 64 + 3 × 16 + 2 × 4 + 1 = 121₁₀. Then divide by 7: 121 ÷ 7 = 17 r 2; 17 ÷ 7 = 2 r 3; 2 ÷ 7 = 0 r 2. Reading upwards, 1321₄ = 232₇." },
    { number: 18, kind: "Theory", prompt: "Change 101101₂ to base eight by grouping the digits, and check your answer by converting both numbers to base ten.", answer: "Group in threes from the right: 101 | 101, which is 5 and 5, so 101101₂ = 55₈. Check: 101101₂ = 32 + 8 + 4 + 1 = 45 and 55₈ = 5 × 8 + 5 = 45. Both are 45₁₀, so the answer is correct." },
    { number: 19, kind: "Theory", prompt: "(a) Convert 6.375₁₀ to base two. (b) Convert 11.101₂ to base ten.", answer: "(a) The whole part 6 = 110₂. For 0.375: 0.375 × 2 = 0.75 (0); 0.75 × 2 = 1.5 (1); 0.5 × 2 = 1.0 (1). So 0.375 = 0.011₂ and 6.375₁₀ = 110.011₂. (b) 11.101₂ = 2 + 1 + ½ + 0 + ⅛ = 3.625₁₀." },
    { number: 20, kind: "Theory", prompt: "A pupil writes the number 3052₅. Explain why this is wrong. What is the smallest base in which 3052 could be a numeral, and what is its value in base ten in that base?", answer: "The digit 5 cannot occur in base five, because base five only uses the digits 0 to 4. The largest digit is 5, so the smallest possible base is six. In base six, 3052₆ = 3 × 216 + 0 × 36 + 5 × 6 + 2 = 648 + 30 + 2 = 680₁₀." },
  ] as PracticeQuestion[],
};
