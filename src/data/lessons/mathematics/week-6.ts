import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek6: Lesson = {
  id: "ss1-first-mathematics-week-6",
  week: "Week 06",
  title: "Logarithms (Part 2): four-figure tables",
  subtitle: "Use four-figure logarithm and antilogarithm tables to multiply, divide, find powers and roots, including numbers that are less than one.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Read the logarithm of a four-figure number from the log table, using the mean difference columns.",
    "Find the number that has a given logarithm, using the antilogarithm table.",
    "Multiply and divide numbers greater than and less than one by adding and subtracting logarithms.",
    "Find powers and roots by multiplying or dividing logarithms, including roots of numbers less than one.",
    "Set out a calculation in a clear table of ‘number’ and ‘log’.",
  ],
  sections: [
    {
      heading: "1. Why logarithms help",
      paragraphs: [
        "Before calculators, long multiplications were done with logarithms. The idea is simple: logarithms turn multiplication into addition, division into subtraction, powers into multiplication and roots into division. So to multiply two numbers, find their logarithms, add them, and then find the number that has this logarithm (the antilogarithm). Bring your four-figure tables to this lesson, because the working below uses them. If your tables differ from the figures here by 1 in the last place, that is normal; always give the final answer to 4 significant figures.",
      ],
    },
    {
      heading: "2. Reading the logarithm table",
      paragraphs: [
        "The log table gives the mantissa (the decimal part) of the logarithm of any number with up to four digits, ignoring the decimal point. To find the mantissa of 3.456, take the first two digits 34 from the left-hand column. Then move across to the column headed 5 (the third digit). Next, in the mean (or ‘difference’) columns on the right, look under the column headed 6 (the fourth digit) in the same row, and add this to the number you found.",
        "Example 1: for 3.456 the row 34, column 5 entry is 0.5378. The mean difference for 6 in this row is 8, which is 0.0008 in the fourth decimal place. So the mantissa is 0.5378 + 0.0008 = 0.5386. Next find the characteristic from standard form. 3.456 = 3.456 × 10⁰, so log 3.456 = 0.5386. Also 345.6 = 3.456 × 10², so log 345.6 = 2.5386, and 0.03456 = 3.456 × 10⁻², so log 0.03456 = 2̄.5386. The mantissa is the same each time.",
      ],
    },
    {
      heading: "3. Reading the antilogarithm table",
      paragraphs: [
        "To go back from a logarithm to a number, use the antilog table. It uses the mantissa only. Take the first two decimal digits as the row, the third digit as the column, and the fourth digit from the mean difference columns. The table gives a four-digit number, and the characteristic tells you where to put the decimal point.",
        "Example 2: find the antilog of 0.5386. The row .53, column 8 entry is 3451, and the mean difference for 6 is 5, so the digits are 3451 + 5 = 3456. A characteristic of 0 means the number has one digit before the decimal point: 3.456. If the characteristic is 2, the number is 345.6, since the decimal point moves two places to the right. If the logarithm is 2̄.5386, the number is 3.456 × 10⁻² = 0.03456, with one zero after the decimal point.",
      ],
    },
    {
      heading: "4. Multiplying and dividing",
      paragraphs: [
        "Set out your work in two columns, number and log. Example 3: evaluate 13.37 × 5.182. Logs: log 13.37 = 1.1261 and log 5.182 = 0.7145. Add: 1.1261 + 0.7145 = 1.8406. The antilog of 0.8406 is 6928 (row .84, column 0 gives 6918 and the mean difference for 6 adds 10). The characteristic 1 puts the decimal point after two digits, so 13.37 × 5.182 = 69.28.",
        "Example 4: evaluate 387.6 ÷ 4.572. Logs: log 387.6 = 2.5884 and log 4.572 = 0.6601. Subtract: 2.5884 − 0.6601 = 1.9283. The antilog of 0.9283 is 8478. The characteristic 1 gives two digits before the decimal point, so 387.6 ÷ 4.572 = 84.78. Always check the size of your answer with a rough calculation: 400 ÷ 4.5 is about 89, which is close to 84.78.",
      ],
    },
    {
      heading: "5. Powers and roots",
      paragraphs: [
        "To find a power, multiply the logarithm by the power. Example 5: evaluate 3.213³. log 3.213 = 0.5069. Multiply by 3: 1.5207. The antilog of 0.5207 is 3317 and the characteristic is 1, so 3.213³ = 33.17. To find a root, divide the logarithm by the root. Example 6: evaluate the cube root of 71.05. log 71.05 = 1.8516. Divide by 3: 0.6172. The antilog is 4142, with characteristic 0, so the cube root of 71.05 = 4.142.",
      ],
    },
    {
      heading: "6. Numbers less than one",
      paragraphs: [
        "Numbers less than 1 have a bar characteristic. To add or subtract bar numbers, treat the characteristic and the mantissa separately. Remember that the characteristic is negative and the mantissa is positive.",
        "Example 7: evaluate 0.7254 × 0.00817. log 0.7254 = 1̄.8606 and log 0.00817 = 3̄.9122. Add the mantissas: 0.8606 + 0.9122 = 1.7728. Carry the 1 to the characteristics: −1 + (−3) + 1 = −3. The sum is 3̄.7728. The antilog of 0.7728 is 5927, and a characteristic of −3 gives 0.005927. So 0.7254 × 0.00817 = 0.005927.",
        "Example 8: evaluate 0.00603 ÷ 0.388. log 0.00603 = 3̄.7803 and log 0.388 = 1̄.5888. Subtract the mantissas: 0.7803 − 0.5888 = 0.1915. Subtract the characteristics: −3 − (−1) = −2. The result is 2̄.1915, whose antilog is 0.01554. So 0.00603 ÷ 0.388 = 0.01554.",
        "Example 9: evaluate the cube root of 0.049. log 0.049 = 2̄.6902 = −2 + 0.6902. To divide by 3, we need the characteristic to be a multiple of 3, so write −2 + 0.6902 = −3 + 1.6902. Now divide each part by 3: −1 + 0.5634 = 1̄.5634. The antilog is 0.3659, so the cube root of 0.049 = 0.3659.",
        "Multiplying a bar number by a whole number: 3 × 2̄.4000 = 3 × (−2 + 0.4) = −6 + 1.2 = −5 + 0.2 = 5̄.2000.",
      ],
    },
    {
      heading: "7. Joint calculations",
      paragraphs: [
        "In a longer calculation, find the log of the top line (add the logs of everything multiplied), find the log of the bottom line, then subtract. Example 10: evaluate (18.38 × 8.91) ÷ 0.771. log 18.38 = 1.2643, log 8.91 = 0.9499 and log 0.771 = 1̄.8871. The top: 1.2643 + 0.9499 = 2.2142. Subtract the bottom: 2.2142 − 1̄.8871 = 2.2142 + 1 − 0.8871 = 2.3271. The antilog of 0.3271 is 2124 and the characteristic 2 gives three digits before the decimal point: 212.4. So (18.38 × 8.91) ÷ 0.771 = 212.4.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The mantissa comes from the table and is positive. The characteristic comes from standard form (the power of 10) and is not in the table.",
    "Add the mean difference. Row and column give three digits; the mean difference column gives the fourth digit.",
    "Subtracting a bar number needs care: 2.2142 − 1̄.8871 = 2.2142 + 1 − 0.8871, because 1̄.8871 is −1 + 0.8871.",
    "To divide a bar number by a whole number, first rewrite the characteristic as a multiple of that number, adding the same amount to the mantissa. 2̄.6902 = 3̄ + 1.6902, so the cube root has characteristic 1̄.",
    "The characteristic of the answer fixes the position of the decimal point. Do a quick estimate to check that the answer is sensible.",
    "The antilog table gives four digits only. A characteristic of 0 means one digit before the point; of 2, three digits; of 1̄, none and no zero after the point; of 2̄, one zero after the point.",
    "Give answers to four significant figures. Your tables may differ in the last digit from someone else’s.",
    "Set out your work as ‘number’ and ‘log’ columns, with a line for each step. The marks are for the method as well as the answer.",
  ],
  summary:
    "Four-figure tables turn multiplication, division, powers and roots into addition, subtraction, multiplication and division of logarithms. The mantissa is read from the log table using the row, column and mean difference; the characteristic is the power of 10 in standard form. After the arithmetic on the logs, the antilog table gives four digits and the characteristic fixes the decimal point. Numbers less than one have a bar characteristic that is negative while the mantissa stays positive, so bar numbers need careful addition, subtraction and division. Check each result by estimation.",
  quick: {
    intro: "Week 6 revision sheet. Have your tables open and repeat the examples.",
    blocks: [
      {
        heading: "1. Using the tables",
        points: [
          "Log table: row = first two digits, column = third digit, mean difference = fourth digit. Add them.",
          "Characteristic from standard form. log 3.456 = 0.5386; log 345.6 = 2.5386; log 0.03456 = 2̄.5386.",
          "Antilog table: row and column from the mantissa, mean difference for the fourth digit; the characteristic places the point.",
        ],
      },
      {
        heading: "2. The four operations",
        points: [
          "× : add logs. ÷ : subtract logs.",
          "Power: log × power. Root: log ÷ root.",
          "13.37 × 5.182 = 69.28; 387.6 ÷ 4.572 = 84.78; 3.213³ = 33.17; cube root of 71.05 = 4.142.",
        ],
        memory: "× + ÷ − ; power ×, root ÷ (one step up the ladder).",
      },
      {
        heading: "3. Numbers less than 1",
        points: [
          "Bar characteristic negative; mantissa positive.",
          "1̄.8606 + 3̄.9122 = 3̄.7728.",
          "3̄.7803 − 1̄.5888 = 2̄.1915.",
          "3 × 2̄.4000 = 5̄.2000. For roots, rewrite 2̄.6902 as 3̄ + 1.6902 before dividing by 3.",
        ],
        warning: "Subtracting a bar number means adding its positive equivalent.",
      },
    ],
    likely: [
      { question: "What is the characteristic of log 0.0456?", answer: "−2, written 2̄." },
      { question: "Given that log 5.623 = 0.7500, find log 56 230 and log 0.005623.", answer: "4.7500 and 3̄.7500." },
      { question: "What number has the logarithm 2.7500, given log 5.623 = 0.7500?", answer: "562.3." },
      { question: "Evaluate 1̄.4000 + 2̄.8000.", answer: "2̄.2000." },
      { question: "Evaluate 3 × 2̄.4000.", answer: "5̄.2000." },
      { question: "Evaluate 2̄.7000 ÷ 3.", answer: "Write it as 3̄ + 1.7000, so the answer is 1̄.5667." },
      { question: "Use tables to evaluate 13.37 × 5.182.", answer: "1.1261 + 0.7145 = 1.8406, antilog 69.28." },
      { question: "Why must the characteristic be rewritten before finding a cube root of a bar number?", answer: "So that it is exactly divisible by 3 and the mantissa absorbs the remainder." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The characteristic of log 4567 is", options: ["3", "4", "2", "0.4567"], answer: "A" },
    { number: 2, kind: "Objective", prompt: "The characteristic of log 0.0456 is", options: ["2", "2̄", "1̄", "3̄"], answer: "B", explanation: "0.0456 = 4.56 × 10⁻², so the characteristic is −2, written 2̄." },
    { number: 3, kind: "Objective", prompt: "Given that log 5.623 = 0.7500, find log 56 230.", options: ["3.7500", "5.7500", "4.7500", "0.7500"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "Given that log 5.623 = 0.7500, find log 0.005623.", options: ["2̄.7500", "4̄.7500", "0.7500", "3̄.7500"], answer: "D" },
    { number: 5, kind: "Objective", prompt: "Given that log 5.623 = 0.7500, the value of x for which log x = 2.7500 is", options: ["562.3", "56.23", "5 623", "5.623"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Given that log 5.623 = 0.7500, the value of x for which log x = 1̄.7500 is", options: ["5.623", "0.05623", "0.5623", "56.23"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "In the log table the row 34, column 5 entry is 0.5378 and the mean difference for 6 is 8. The value of log 3.456 is", options: ["0.5378", "0.5386", "0.5458", "3.5386"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Evaluate 1̄.4000 + 2̄.8000.", options: ["3̄.2000", "1̄.2000", "4̄.2000", "2̄.2000"], answer: "D", explanation: "(−1 + 0.4) + (−2 + 0.8) = −3 + 1.2 = −1.8 = −2 + 0.2, which is 2̄.2000." },
    { number: 9, kind: "Objective", prompt: "Evaluate 1̄.2000 − 2̄.6000.", options: ["0.6000", "1̄.6000", "1̄.4000", "0.4000"], answer: "A", explanation: "(−1 + 0.2) − (−2 + 0.6) = −0.8 + 1.4 = 0.6." },
    { number: 10, kind: "Objective", prompt: "Evaluate 3 × 2̄.4000.", options: ["6̄.2000", "4̄.2000", "5̄.2000", "6̄.4000"], answer: "C", explanation: "3 × (−2 + 0.4) = −6 + 1.2 = −5 + 0.2 = 5̄.2000." },
    { number: 11, kind: "Objective", prompt: "Evaluate 2̄.7000 ÷ 3.", options: ["1̄.9000", "1̄.2333", "2̄.2333", "1̄.5667"], answer: "D", explanation: "Write 2̄.7000 = −3 + 1.7000. Dividing by 3 gives −1 + 0.5667 = 1̄.5667." },
    { number: 12, kind: "Objective", prompt: "Given that log 13.37 = 1.1261 and log 5.182 = 0.7145, the value of 13.37 × 5.182 is", options: ["6.928", "69.28", "692.8", "18.54"], answer: "B", explanation: "1.1261 + 0.7145 = 1.8406, and the antilog is 69.28." },
    { number: 13, kind: "Objective", prompt: "Given that log 3.213 = 0.5069, the value of 3.213³ is", options: ["33.17", "9.639", "3.317", "331.7"], answer: "A", explanation: "3 × 0.5069 = 1.5207, and the antilog of 1.5207 is 33.17." },
    { number: 14, kind: "Objective", prompt: "Given that log 71.05 = 1.8516, the cube root of 71.05 is", options: ["2.368", "8.428", "4.142", "23.68"], answer: "C", explanation: "1.8516 ÷ 3 = 0.6172, and the antilog is 4.142." },
    { number: 15, kind: "Theory", prompt: "In the log table, the row 34, column 5 entry is 0.5378 and the mean difference for 6 is 8. Write down log 3.456, log 345.6 and log 0.03456. State the number whose logarithm is 2.5386.", answer: "The mantissa is 0.5378 + 0.0008 = 0.5386. log 3.456 = 0.5386. 345.6 = 3.456 × 10², so log 345.6 = 2.5386. 0.03456 = 3.456 × 10⁻², so log 0.03456 = 2̄.5386. The number whose logarithm is 2.5386 is 345.6." },
    { number: 16, kind: "Theory", prompt: "Use logarithms to evaluate 13.37 × 5.182, given that log 13.37 = 1.1261 and log 5.182 = 0.7145.", answer: "Number | log: 13.37 | 1.1261; 5.182 | 0.7145; add: 1.8406. The antilog of 0.8406 is 6928, and with the characteristic 1 the answer is 69.28." },
    { number: 17, kind: "Theory", prompt: "Use logarithms to evaluate 387.6 ÷ 4.572, given that log 387.6 = 2.5884 and log 4.572 = 0.6601.", answer: "Subtract the logs: 2.5884 − 0.6601 = 1.9283. The antilog of 0.9283 is 8478, so with the characteristic 1 the answer is 84.78. A quick check: 400 ÷ 4.5 is about 89, so the answer is sensible." },
    { number: 18, kind: "Theory", prompt: "Evaluate 0.7254 × 0.00817, given that log 0.7254 = 1̄.8606 and log 0.00817 = 3̄.9122.", answer: "Add the mantissas: 0.8606 + 0.9122 = 1.7728. Carry 1 to the characteristics: −1 + (−3) + 1 = −3. The sum is 3̄.7728. The antilog of 0.7728 is 5927, and the characteristic −3 gives 0.005927." },
    { number: 19, kind: "Theory", prompt: "Find the cube root of 0.049, given that log 0.049 = 2̄.6902.", answer: "Write 2̄.6902 = −2 + 0.6902 = −3 + 1.6902. Divide by 3: −1 + 0.5634 = 1̄.5634. The antilog of 0.5634 is 3659, and the characteristic 1̄ gives 0.3659." },
    { number: 20, kind: "Theory", prompt: "Evaluate (18.38 × 8.91) ÷ 0.771, given that log 18.38 = 1.2643, log 8.91 = 0.9499 and log 0.771 = 1̄.8871.", answer: "Top line: 1.2643 + 0.9499 = 2.2142. Subtract log 0.771: 2.2142 − (−1 + 0.8871) = 2.2142 + 1 − 0.8871 = 2.3271. The antilog of 0.3271 is 2124, and the characteristic 2 gives 212.4." },
  ] as PracticeQuestion[],
};
