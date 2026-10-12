import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek9: Lesson = {
  id: "ss1-first-mathematics-week-9",
  week: "Week 09",
  title: "Venn diagrams and applications",
  subtitle: "Draw two-set Venn diagrams, shade regions, use the formula for the number of elements in a union, and solve everyday word problems.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Draw a Venn diagram for two sets and name its four regions.",
    "Place elements or numbers of elements in the correct regions.",
    "Describe and shade regions such as A ∪ B, A ∩ B, A′ and A ∩ B′.",
    "Use n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
    "Solve word problems about two sets, including those that need an unknown x.",
  ],
  sections: [
    {
      heading: "1. The Venn diagram",
      paragraphs: [
        "A Venn diagram is a picture of sets. A rectangle stands for the universal set ξ, and each set is drawn as a circle or oval inside it. Everything outside every circle but inside the rectangle belongs to ξ only. For two sets A and B, the circles are drawn so that they overlap, because the overlap shows the elements that belong to both sets.",
        "The two overlapping circles divide the rectangle into four regions: (1) the overlap, which is A ∩ B (both sets); (2) the part of A that is outside B, called ‘A only’ (A ∩ B′); (3) the part of B that is outside A, called ‘B only’ (A′ ∩ B); and (4) the part of the rectangle outside both circles, which is (A ∪ B)′, the elements in neither set. Always draw the circles overlapping, even if you do not yet know whether the overlap has any elements; the overlap can be empty.",
      ],
      diagram: "Draw a rectangle labelled ξ with two overlapping circles labelled A and B. Write the numbers 1, 2, 3, 4 in the four regions to show which is which: 1 in A only, 2 in the overlap, 3 in B only and 4 outside both circles.",
    },
    {
      heading: "2. Putting elements into a diagram",
      paragraphs: [
        "Example 1: ξ = {1, 2, 3, …, 10}, A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. Start with the overlap, because its elements belong to both sets: A ∩ B = {4, 5}. Next, the elements of A that are not in B go in the rest of circle A: {1, 2, 3}. The elements of B that are not in A go in the rest of circle B: {6, 7}. Finally, the elements of ξ that are in neither set go outside the circles: {8, 9, 10}. Every element of ξ must appear exactly once.",
        "From the diagram we can read off many sets. A ∪ B = {1, 2, 3, 4, 5, 6, 7}, which is the three regions inside the circles. A′ = {6, 7, 8, 9, 10}, everything outside circle A. (A ∪ B)′ = {8, 9, 10}. A ∩ B′ = {1, 2, 3}, the part of A that is not in B.",
      ],
    },
    {
      heading: "3. Describing and shading regions",
      paragraphs: [
        "To shade a region, decide which of the four parts it contains. A ∪ B: all three parts inside the circles. A ∩ B: the overlap only. A′: everything outside circle A, which includes the part of B that is outside A. (A ∪ B)′: only the part outside both circles. A ∩ B′: the part of A that is not in B. A′ ∩ B: the part of B that is not in A. (A ∩ B)′: everything except the overlap.",
      ],
      points: [
        "A ∪ B: A only, overlap and B only.",
        "A ∩ B: the overlap.",
        "A′: B only and the outside region.",
        "(A ∪ B)′: the outside region only.",
        "A ∩ B′: A only. A′ ∩ B: B only.",
        "(A ∩ B)′: everything except the overlap.",
      ],
    },
    {
      heading: "4. Counting elements",
      paragraphs: [
        "In many problems we know how many elements each region has rather than the elements themselves. When we write numbers in the regions, the sum of all four numbers is n(ξ). The key formula is n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
        "The reason is that if we add n(A) and n(B), the elements in the overlap are counted twice, so we subtract n(A ∩ B) once to count them once. Other useful facts: n(A only) = n(A) − n(A ∩ B); n(B only) = n(B) − n(A ∩ B); and the number in neither set is n(ξ) − n(A ∪ B). For example, if n(A) = 20, n(B) = 25 and n(A ∩ B) = 8, then n(A ∪ B) = 20 + 25 − 8 = 37, and if n(ξ) = 50, then 50 − 37 = 13 elements are in neither set.",
      ],
    },
    {
      heading: "5. Word problems",
      paragraphs: [
        "Method: read the problem and identify the two sets and ξ; draw the diagram; fill in the overlap first (the number who do ‘both’), then the ‘only’ regions by subtraction, then the outside; check that the numbers add up to the total.",
        "Example 2: In a class of 40 students, 25 offer Mathematics, 18 offer Physics, and 5 offer neither. How many offer both? The number offering at least one subject is 40 − 5 = 35. So n(M ∩ P) = 25 + 18 − 35 = 8. Mathematics only: 25 − 8 = 17. Physics only: 18 − 8 = 10. Check: 17 + 8 + 10 + 5 = 40.",
        "Example 3: Of 60 traders in a market, 35 sell rice, 28 sell beans and 12 sell both. How many sell neither? n(R ∪ B) = 35 + 28 − 12 = 51, so 60 − 51 = 9 sell neither.",
        "Example 4: In a group of 50 students, 30 like football, 25 like basketball and 5 like neither. Let x be the number who like both. Football only: 30 − x. Basketball only: 25 − x. Adding all four regions gives (30 − x) + x + (25 − x) + 5 = 50. So 60 − x = 50 and x = 10. Football only is 20 and basketball only is 15; check 20 + 10 + 15 + 5 = 50.",
        "Example 5: In a survey of 80 people, x like tea only, 2x like coffee only, 10 like both and 10 like neither. Then x + 2x + 10 + 10 = 80, so 3x = 60 and x = 20. So 20 like tea only and 40 like coffee only; 30 like tea in all, and 50 like coffee in all.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Always draw the two circles overlapping and put the number for ‘both’ in the overlap first.",
    "‘n(A) = 25’ is the whole circle A, including the overlap. The number in ‘A only’ is n(A) − n(A ∩ B).",
    "n(A ∪ B) = n(A) + n(B) − n(A ∩ B). If you forget to subtract the overlap, you count it twice.",
    "‘Neither’ is outside both circles but inside the rectangle: n(ξ) − n(A ∪ B).",
    "The four numbers in a Venn diagram must add up to n(ξ). Always check this at the end.",
    "‘At least one’ means A ∪ B. ‘Both’ means A ∩ B. ‘Only A’ means A ∩ B′. ‘Exactly one’ means A only plus B only.",
    "When a problem uses an unknown such as x, write each region in terms of x, then form an equation from the total.",
    "Do not subtract the overlap from n(ξ). Subtract the union.",
  ],
  summary:
    "A Venn diagram uses a rectangle for ξ and overlapping circles for two sets, giving four regions: A only, both, B only and neither. Regions such as A ∪ B, A ∩ B, A′ and A ∩ B′ can be named and shaded. For counting, n(A ∪ B) = n(A) + n(B) − n(A ∩ B), because the overlap is counted twice otherwise, and the number in neither set is n(ξ) − n(A ∪ B). In word problems, fill in the overlap first, then the ‘only’ regions, then the outside, and use an unknown x when a number is not given.",
  quick: {
    intro: "Week 9 revision sheet. Draw the diagram every time and make the regions add up to n(ξ).",
    blocks: [
      {
        heading: "1. The four regions",
        points: [
          "A only = A ∩ B′; overlap = A ∩ B; B only = A′ ∩ B; outside = (A ∪ B)′.",
          "Fill the overlap first.",
          "All regions add up to n(ξ).",
        ],
      },
      {
        heading: "2. Formulas",
        points: [
          "n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",
          "n(A only) = n(A) − n(A ∩ B).",
          "Neither = n(ξ) − n(A ∪ B).",
        ],
        memory: "Add both circles, then take away the double-counted overlap once.",
      },
      {
        heading: "3. Word problems",
        points: [
          "Class of 40: 25 Maths, 18 Physics, 5 neither → both = 8.",
          "50 students: 30 football, 25 basketball, 5 neither → both x = 10.",
          "Let x be the unknown and form an equation from the total.",
        ],
        warning: "Check that the regions sum to the total.",
      },
    ],
    likely: [
      { question: "State the formula for n(A ∪ B).", answer: "n(A ∪ B) = n(A) + n(B) − n(A ∩ B)." },
      { question: "If n(A) = 20, n(B) = 25 and n(A ∩ B) = 8, find n(A ∪ B).", answer: "20 + 25 − 8 = 37." },
      { question: "If n(ξ) = 50 and n(A ∪ B) = 37, how many are in neither set?", answer: "50 − 37 = 13." },
      { question: "Which region is A ∩ B′?", answer: "The part of A that is outside B (A only)." },
      { question: "Why do we subtract n(A ∩ B) in the formula?", answer: "Because the overlap is counted twice when n(A) and n(B) are added." },
      { question: "In a class of 40, 25 take Maths, 18 take Physics and 5 take neither. How many take both?", answer: "8." },
      { question: "60 traders: 35 sell rice, 28 sell beans, 12 sell both. How many sell neither?", answer: "60 − (35 + 28 − 12) = 9." },
      { question: "Describe the region (A ∪ B)′.", answer: "The part of the rectangle outside both circles." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Let ξ = {1, 2, …, 10}, A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. The value of n(A ∩ B) is", options: ["1", "2", "3", "4"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "For the same sets, the elements in A only are", options: ["{1, 2, 3}", "{4, 5}", "{6, 7}", "{1, 2, 3, 4, 5}"], answer: "A" },
    { number: 3, kind: "Objective", prompt: "For the same sets, the elements that are in neither A nor B are", options: ["{6, 7}", "{4, 5}", "{1, 2, 3}", "{8, 9, 10}"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "For the same sets, n(A ∪ B) is", options: ["5", "9", "7", "6"], answer: "C", explanation: "A ∪ B = {1, 2, 3, 4, 5, 6, 7}, which has 7 elements. Or: 5 + 4 − 2 = 7." },
    { number: 5, kind: "Objective", prompt: "For the same sets, n(A′) is", options: ["5", "4", "6", "10"], answer: "A", explanation: "A′ = {6, 7, 8, 9, 10}, which has 5 elements." },
    { number: 6, kind: "Objective", prompt: "If n(A) = 20, n(B) = 25 and n(A ∩ B) = 8, then n(A ∪ B) is", options: ["45", "53", "37", "28"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "If n(ξ) = 50 and n(A ∪ B) = 37, the number of elements in neither A nor B is", options: ["87", "13", "37", "12"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "In a class of 40 students, 25 offer Mathematics, 18 offer Physics and 5 offer neither. The number who offer both is", options: ["10", "12", "7", "8"], answer: "D", explanation: "35 students offer at least one subject. 25 + 18 − 35 = 8 offer both." },
    { number: 9, kind: "Objective", prompt: "Of 60 traders, 35 sell rice, 28 sell beans and 12 sell both. The number who sell neither is", options: ["9", "7", "16", "21"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "If n(A) = 30 and n(A ∩ B) = 12, the number of elements in A only is", options: ["42", "12", "18", "30"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "Of 50 students, 30 like football, 25 like basketball and 5 like neither. The number who like both is", options: ["5", "10", "15", "20"], answer: "B", explanation: "(30 − x) + x + (25 − x) + 5 = 50 gives 60 − x = 50, so x = 10." },
    { number: 12, kind: "Objective", prompt: "In a school of 100 students, 45 study Chemistry, 50 study Physics and 20 study both. The number who study Physics only is", options: ["20", "25", "70", "30"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "If n(A ∪ B) = 65, n(A) = 40 and n(B) = 35, then n(A ∩ B) is", options: ["10", "75", "30", "5"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "The region represented by A ∩ B′ contains the elements that are", options: ["in B only", "in neither A nor B", "in A but not in B", "in both A and B"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Let ξ = {1, 2, …, 10}, A = {1, 2, 3, 4, 5} and B = {4, 5, 6, 7}. Draw a Venn diagram (describe it) showing the elements in each region, and list A ∪ B and (A ∪ B)′.", answer: "Draw a rectangle for ξ and two overlapping circles A and B. Overlap (A ∩ B): 4 and 5. A only: 1, 2 and 3. B only: 6 and 7. Outside both circles: 8, 9 and 10. A ∪ B = {1, 2, 3, 4, 5, 6, 7}. (A ∪ B)′ = {8, 9, 10}." },
    { number: 16, kind: "Theory", prompt: "State, in words, which region of a two-set Venn diagram is represented by (a) A ∪ B, (b) A ∩ B′, (c) (A ∪ B)′ and (d) A′ ∩ B.", answer: "(a) Everything inside either circle: A only, the overlap and B only. (b) The part of A outside B (A only). (c) The part of the rectangle outside both circles. (d) The part of B outside A (B only)." },
    { number: 17, kind: "Theory", prompt: "In a class of 40 students, 25 offer Mathematics, 18 offer Physics and 5 offer neither. Find the number who offer (a) both subjects, (b) Mathematics only and (c) Physics only.", answer: "At least one subject: 40 − 5 = 35. (a) Both = 25 + 18 − 35 = 8. (b) Mathematics only = 25 − 8 = 17. (c) Physics only = 18 − 8 = 10. Check: 17 + 8 + 10 + 5 = 40." },
    { number: 18, kind: "Theory", prompt: "Of 50 students, 30 like football, 25 like basketball and 5 like neither. Let x be the number who like both. Form an equation, solve it, and find the number who like football only and basketball only.", answer: "Football only = 30 − x, basketball only = 25 − x. (30 − x) + x + (25 − x) + 5 = 50, so 60 − x = 50 and x = 10. Football only = 20 and basketball only = 15. Check: 20 + 10 + 15 + 5 = 50." },
    { number: 19, kind: "Theory", prompt: "In a survey of 80 people, x like tea only, 2x like coffee only, 10 like both and 10 like neither. Find x, and the total number who like tea and the total who like coffee.", answer: "x + 2x + 10 + 10 = 80, so 3x = 60 and x = 20. Tea only = 20 and coffee only = 40. Total who like tea = 20 + 10 = 30. Total who like coffee = 40 + 10 = 50." },
    { number: 20, kind: "Theory", prompt: "Use A = {1, 2, 3, 4} and B = {3, 4, 5} to show that n(A ∪ B) = n(A) + n(B) − n(A ∩ B), and explain why the overlap is subtracted.", answer: "A ∪ B = {1, 2, 3, 4, 5}, so n(A ∪ B) = 5. n(A) = 4, n(B) = 3 and A ∩ B = {3, 4}, so n(A ∩ B) = 2. Then 4 + 3 − 2 = 5, which agrees. When we add n(A) and n(B), the elements 3 and 4 are counted twice, once in each set, so we subtract n(A ∩ B) to count them only once." },
  ] as PracticeQuestion[],
};
