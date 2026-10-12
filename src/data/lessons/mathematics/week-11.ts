import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek11: Lesson = {
  id: "ss1-first-mathematics-week-11",
  week: "Week 11",
  title: "Linear equations and change of subject of a formula",
  subtitle: "Solve linear equations with brackets and fractions, put numbers into formulae, and rearrange formulae involving powers, roots and fractions to make a different letter the subject.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Solve linear equations with brackets, unknowns on both sides and fractions.",
    "Form and solve a linear equation from a word problem.",
    "Substitute values into a formula and evaluate it correctly.",
    "Change the subject of a formula involving powers, roots and fractions.",
    "Change the subject when the new subject appears more than once in the formula.",
  ],
  sections: [
    {
      heading: "1. Solving linear equations",
      paragraphs: [
        "A linear equation has the unknown to the power 1 only. To solve it, keep the equation balanced: whatever you do to one side you must do to the other. The aim is to get the unknown on its own. First remove brackets, then collect the unknown terms on one side and the numbers on the other, then divide by the coefficient of the unknown.",
        "Example 1: 3x − 7 = 11. Add 7: 3x = 18, so x = 6. Example 2: 5(x − 2) = 3x + 4. Expand: 5x − 10 = 3x + 4. Subtract 3x: 2x − 10 = 4. Add 10: 2x = 14, so x = 7. Check: left side 5 × 5 = 25, right side 21 + 4 = 25. Always check by substituting your answer back.",
      ],
    },
    {
      heading: "2. Equations with fractions",
      paragraphs: [
        "To clear fractions, multiply every term on both sides by the lowest common multiple of the denominators. Example 3: (x + 1)/2 + (x − 2)/3 = 4. The LCM of 2 and 3 is 6, so 3(x + 1) + 2(x − 2) = 24. Expand: 3x + 3 + 2x − 4 = 24, so 5x − 1 = 24, 5x = 25 and x = 5. Example 4: x/3 − (x − 1)/4 = 2. Multiply by 12: 4x − 3(x − 1) = 24. Be careful with the minus sign: 4x − 3x + 3 = 24, so x + 3 = 24 and x = 21. Check: 21/3 − 20/4 = 7 − 5 = 2.",
        "When the unknown is in a denominator, cross-multiply (or multiply both sides by both denominators). Example 5: 3/(x − 1) = 2/(x + 2). Then 3(x + 2) = 2(x − 1), so 3x + 6 = 2x − 2 and x = −8. Check: 3/(−9) = −1/3 and 2/(−6) = −1/3. We must make sure the answer does not make a denominator zero; here x − 1 = −9 and x + 2 = −6, so it is fine.",
      ],
    },
    {
      heading: "3. Word problems",
      paragraphs: [
        "To solve a word problem, let a letter stand for the unknown, write the information as an equation, solve it, and state the answer in words. Example 6: Tunde is 4 years older than Ngozi and the sum of their ages is 28. Let Ngozi’s age be x. Then Tunde’s is x + 4 and x + (x + 4) = 28, so 2x = 24 and x = 12. Ngozi is 12 and Tunde is 16. Example 7: A trader buys 5 bags of rice at ₦x each and pays ₦2,500 for transport. The total is ₦37,500. Then 5x + 2 500 = 37 500, so 5x = 35 000 and x = 7 000. Each bag cost ₦7,000.",
        "Example 8: The length of a rectangle is 3 m more than its width, and its perimeter is 34 m. Let the width be w, so the length is w + 3 and the perimeter is 2[w + (w + 3)] = 34. Then 4w + 6 = 34, so w = 7 and the length is 10 m, which gives an area of 70 m².",
      ],
    },
    {
      heading: "4. Substitution in formulae",
      paragraphs: [
        "A formula is a rule written with letters. To use it, replace each letter by its value (put each value in brackets if it is negative) and calculate, following the order of operations: brackets, powers and roots, multiplication and division, then addition and subtraction.",
        "Example 9: v = u + at, with u = 12, a = 3 and t = 5. Then v = 12 + 3 × 5 = 27. Example 10: F = 9C/5 + 32, with C = 25. Then F = 9 × 25 ÷ 5 + 32 = 45 + 32 = 77. Example 11: S = ut + ½at², with u = −2, a = 4 and t = 3. Then S = (−2)(3) + ½(4)(3²) = −6 + 18 = 12. Example 12: A = πr², with π = 22/7 and r = 7. Then A = (22/7) × 49 = 154.",
      ],
    },
    {
      heading: "5. Changing the subject of a formula",
      paragraphs: [
        "The subject of a formula is the letter that stands alone on one side, such as v in v = u + at. To change the subject, treat the formula like an equation and undo the operations around the new subject in reverse order, always doing the same thing to both sides.",
        "Example 13: make t the subject of v = u + at. Subtract u: v − u = at. Divide by a: t = (v − u)/a. Example 14: A = ½bh gives b = 2A/h. Example 15: V = πr²h. Divide by πh: r² = V/(πh), so r = √[V/(πh)] (taking the positive root, since r is a length). Example 16: T = 2π√(l/g). Divide by 2π: T/(2π) = √(l/g). Square both sides: T²/(4π²) = l/g. Multiply by g: l = gT²/(4π²). Example 17: S = ut + ½at². Subtract ut: S − ut = ½at². Multiply by 2: 2(S − ut) = at². Divide by t²: a = 2(S − ut)/t². Example 18: a = √(b² + c²). Square both sides: a² = b² + c². So c² = a² − b² and c = √(a² − b²).",
        "When the new subject appears twice, collect all the terms containing it on one side, factorise it out, and then divide. Example 19: make x the subject of ax + b = cx + d. Then ax − cx = d − b, so x(a − c) = d − b and x = (d − b)/(a − c). Example 20: make x the subject of y = (x + 1)/(x − 1). Multiply by (x − 1): y(x − 1) = x + 1, so xy − y = x + 1. Collect the x terms: xy − x = y + 1. Factorise: x(y − 1) = y + 1, so x = (y + 1)/(y − 1). Example 21: make v the subject of 1/f = 1/u + 1/v. Then 1/v = 1/f − 1/u = (u − f)/(uf), so v = uf/(u − f).",
        "Once you have the rearranged formula, you can substitute. From F = 9C/5 + 32 we get F − 32 = 9C/5, so C = 5(F − 32)/9. When F = 95, C = 5 × 63 ÷ 9 = 35.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Whatever you do to one side of an equation you must do to the other. Do the same to every term.",
    "To clear fractions, multiply every term, including whole-number terms, by the LCM of the denominators.",
    "When you expand −3(x − 1), the result is −3x + 3. The minus sign changes both signs inside.",
    "Check every answer by substituting it back into the original equation, especially with fractions.",
    "If the unknown is in a denominator, make sure your answer does not make that denominator zero.",
    "To change the subject, undo operations in reverse order. If the subject is in a square root, square both sides.",
    "If the new subject appears more than once, collect those terms on one side and factorise before dividing.",
    "In a formula, put negative values in brackets when you substitute. (−2)² = 4, not −4.",
    "Do not leave your answer in a form with the subject on both sides. The subject must stand alone.",
  ],
  summary:
    "A linear equation is solved by keeping both sides balanced: remove brackets, clear fractions with the LCM, collect the unknown terms, and divide. Word problems are turned into equations by letting a letter stand for the unknown. In a formula, substitute values carefully, using brackets for negative numbers. To change the subject, reverse the operations around the new subject (squaring both sides to remove a root); if the new subject appears twice, collect its terms on one side and factorise. Check solutions by substitution.",
  quick: {
    intro: "Week 11 revision sheet. Balance, clear fractions, collect, divide; then rearrange.",
    blocks: [
      {
        heading: "1. Solving equations",
        points: [
          "Expand brackets; collect x terms on one side, numbers on the other.",
          "Fractions: multiply every term by the LCM.",
          "5(x − 2) = 3x + 4 → x = 7; (x + 1)/2 + (x − 2)/3 = 4 → x = 5.",
          "3/(x − 1) = 2/(x + 2) → cross-multiply → x = −8.",
        ],
        memory: "‘Same to both sides, then check.’",
      },
      {
        heading: "2. Word problems and substitution",
        points: [
          "Let a letter stand for the unknown; write an equation; solve; answer in words.",
          "Substitute with brackets for negative values: (−2)² = 4.",
          "v = u + at: u = 12, a = 3, t = 5 → v = 27.",
        ],
      },
      {
        heading: "3. Change of subject",
        points: [
          "v = u + at → t = (v − u)/a. A = ½bh → b = 2A/h.",
          "V = πr²h → r = √[V/(πh)]. T = 2π√(l/g) → l = gT²/(4π²).",
          "Subject twice: collect, factorise, divide. ax + b = cx + d → x = (d − b)/(a − c).",
          "y = (x + 1)/(x − 1) → x = (y + 1)/(y − 1).",
        ],
        warning: "Square both sides to remove a root, but only after the root is alone.",
      },
    ],
    likely: [
      { question: "Solve 5(x − 2) = 3x + 4.", answer: "5x − 10 = 3x + 4, so 2x = 14 and x = 7." },
      { question: "Solve (x + 1)/2 + (x − 2)/3 = 4.", answer: "3(x + 1) + 2(x − 2) = 24, so 5x − 1 = 24 and x = 5." },
      { question: "Solve 3/(x − 1) = 2/(x + 2).", answer: "3x + 6 = 2x − 2, so x = −8." },
      { question: "Make t the subject of v = u + at.", answer: "t = (v − u)/a." },
      { question: "Make r the subject of V = πr²h.", answer: "r = √[V/(πh)]." },
      { question: "Make l the subject of T = 2π√(l/g).", answer: "l = gT²/(4π²)." },
      { question: "Make x the subject of ax + b = cx + d.", answer: "x = (d − b)/(a − c)." },
      { question: "Find C when F = 95 in F = 9C/5 + 32.", answer: "C = 5(95 − 32)/9 = 35." },
      { question: "Why do we check an answer to an equation with a fraction?", answer: "To catch mistakes with signs and to make sure no denominator becomes zero." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Solve 3x − 7 = 11.", options: ["4", "5", "6", "18"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "Solve 5(x − 2) = 3x + 4.", options: ["7", "12", "3", "−3"], answer: "A", explanation: "5x − 10 = 3x + 4 gives 2x = 14, so x = 7." },
    { number: 3, kind: "Objective", prompt: "Solve (x + 1)/2 + (x − 2)/3 = 4.", options: ["3", "4", "6", "5"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "Solve x/3 − (x − 1)/4 = 2.", options: ["12", "21", "7", "27"], answer: "B", explanation: "Multiply by 12: 4x − 3(x − 1) = 24, so x + 3 = 24 and x = 21." },
    { number: 5, kind: "Objective", prompt: "Solve 3/(x − 1) = 2/(x + 2).", options: ["−8", "8", "−4", "4"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Tunde is 4 years older than Ngozi and the sum of their ages is 28. Ngozi’s age is", options: ["10 years", "11 years", "12 years", "16 years"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "A trader buys 5 bags of rice at ₦x each and pays ₦2,500 for transport. The total cost is ₦37,500. The value of x is", options: ["₦6,000", "₦8,000", "₦7,500", "₦7,000"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "If v = u + at, find v when u = 12, a = 3 and t = 5.", options: ["15", "27", "180", "47"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "If F = 9C/5 + 32, find F when C = 25.", options: ["77", "57", "45", "103"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "Make t the subject of the formula v = u + at.", options: ["v − u + a", "(v + u)/a", "(v − u)/a", "a(v − u)"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "Make b the subject of the formula A = ½bh.", options: ["A/2h", "2h/A", "Ah/2", "2A/h"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "Make r (a positive length) the subject of V = πr²h.", options: ["V/(πh)", "√[V/(πh)]", "[V/(πh)]²", "√(Vπh)"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "Make x the subject of ax + b = cx + d.", options: ["(d − b)/(a − c)", "(d + b)/(a + c)", "(b − d)/(a − c)", "(d − b)/(a + c)"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Make c the subject of a = √(b² + c²).", options: ["a − b", "√(a² + b²)", "√(a² − b²)", "a² − b²"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Solve (a) 4(2x − 3) = 3(x + 6) and (b) (x + 3)/2 − (x − 1)/5 = 2.", answer: "(a) 8x − 12 = 3x + 18, so 5x = 30 and x = 6. (b) Multiply by 10: 5(x + 3) − 2(x − 1) = 20, so 5x + 15 − 2x + 2 = 20, 3x = 3 and x = 1. Check: 4/2 − 0/5 = 2." },
    { number: 16, kind: "Theory", prompt: "Solve 2/(x + 1) = 3/(x − 2).", answer: "Cross-multiply: 2(x − 2) = 3(x + 1), so 2x − 4 = 3x + 3 and x = −7. Check: 2/(−6) = −1/3 and 3/(−9) = −1/3. Neither denominator is zero, so x = −7." },
    { number: 17, kind: "Theory", prompt: "(a) The length of a rectangle is 3 m more than its width and its perimeter is 34 m. Find its area. (b) A father is three times as old as his son. In 10 years the sum of their ages will be 80. Find their present ages.", answer: "(a) Let the width be w. Then 2[w + (w + 3)] = 34, so 4w + 6 = 34 and w = 7. The length is 10 m and the area is 70 m². (b) Let the son’s age be s, so the father’s is 3s. In 10 years: (3s + 10) + (s + 10) = 80, so 4s + 20 = 80 and s = 15. The son is 15 and the father is 45." },
    { number: 18, kind: "Theory", prompt: "(a) Find S when S = ut + ½at², with u = −2, a = 4 and t = 3. (b) Make C the subject of F = 9C/5 + 32 and find C when F = 95.", answer: "(a) S = (−2)(3) + ½(4)(9) = −6 + 18 = 12. (b) F − 32 = 9C/5, so C = 5(F − 32)/9. When F = 95, C = 5 × 63 ÷ 9 = 35." },
    { number: 19, kind: "Theory", prompt: "Make (a) a the subject of S = ut + ½at² and (b) l the subject of T = 2π√(l/g).", answer: "(a) S − ut = ½at², so 2(S − ut) = at² and a = 2(S − ut)/t². (b) T/(2π) = √(l/g). Square both sides: T²/(4π²) = l/g. Multiply by g: l = gT²/(4π²)." },
    { number: 20, kind: "Theory", prompt: "Make (a) x the subject of y = (x + 1)/(x − 1) and (b) v the subject of 1/f = 1/u + 1/v.", answer: "(a) y(x − 1) = x + 1, so xy − y = x + 1. Then xy − x = y + 1, so x(y − 1) = y + 1 and x = (y + 1)/(y − 1). (b) 1/v = 1/f − 1/u = (u − f)/(uf). Taking the reciprocal, v = uf/(u − f)." },
  ] as PracticeQuestion[],
};
