import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const matWeek8: Lesson = {
  id: "ss1-first-mathematics-week-8",
  week: "Week 08",
  title: "Sets (theory and notation)",
  subtitle: "Learn the language of sets: how to write them, the different types of sets and subsets, and the operations of union, intersection and complement.",
  source: "Written by Edify for the SS1 First Term Mathematics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define a set and write it by listing and in set-builder notation.",
    "Distinguish finite, infinite, empty, universal, equal and disjoint sets.",
    "Explain subsets and proper subsets and count them.",
    "Find the union, intersection and complement of sets.",
    "State and use the laws that connect these operations, including De Morgan’s laws.",
  ],
  sections: [
    {
      heading: "1. What is a set?",
      paragraphs: [
        "A set is a collection of objects that is clearly defined, so that we can always tell whether a given object belongs to it. The objects are called the members or elements of the set. The days of the week, the vowels of the English alphabet and the six geopolitical zones of Nigeria are examples of sets. ‘The tall girls in your class’ is not a set, because ‘tall’ is not clearly defined.",
        "We name a set with a capital letter and write its elements inside curly brackets, separated by commas. Writing the elements out is called listing. For example, V = {a, e, i, o, u}. We write a ∈ V, read ‘a belongs to V’, and b ∉ V, read ‘b does not belong to V’. The number of elements of a set A is written n(A). Here n(V) = 5. The order in which the elements are written does not matter, and an element is never listed twice.",
        "A set can also be described by a rule. This is called set-builder notation. For example, A = {x : x is a prime number and 10 < x < 20}. The colon is read ‘such that’. Listing gives A = {11, 13, 17, 19} and n(A) = 4.",
      ],
    },
    {
      heading: "2. Types of sets",
      paragraphs: [
        "A finite set has a countable number of elements, like the months of the year. An infinite set goes on without end, like the set of multiples of 5, {5, 10, 15, …}. The empty set (or null set) has no elements. It is written { } or ∅. A set with exactly one element is a singleton. Note that {0} is not the empty set, because it contains the number 0, and {∅} is not empty either, because it contains one element.",
        "The universal set, written ξ (or U), is the set of all elements being discussed in a particular problem. Every other set in the problem is part of it. Changing the problem changes the universal set. Two sets are equal if they have exactly the same elements, whatever the order. Two sets are equivalent if they have the same number of elements. Two sets with no element in common are called disjoint sets.",
      ],
      points: [
        "Finite set: the elements can be counted. Infinite set: they cannot.",
        "Empty set: ∅ or { }. {0} is not empty.",
        "Universal set ξ: contains everything under discussion.",
        "Disjoint sets: no common element.",
      ],
    },
    {
      heading: "3. Subsets",
      paragraphs: [
        "A is a subset of B, written A ⊆ B, if every element of A is also an element of B. If, in addition, A is not equal to B, then A is a proper subset of B, written A ⊂ B. For instance, P = {1, 2, 3} is a proper subset of Q = {1, 2, 3, 4, 5}, so P ⊂ Q. The empty set is a subset of every set, and every set is a subset of itself.",
        "To list all the subsets of {a, b, c}, we take: the empty set ∅; the single-element sets {a}, {b}, {c}; the two-element sets {a, b}, {a, c}, {b, c}; and the whole set {a, b, c}. That is 8 subsets, which is 2³. In general, a set with n elements has 2ⁿ subsets. Of these, all except the set itself are proper subsets, so there are 2ⁿ − 1 proper subsets. A set with 4 elements has 2⁴ = 16 subsets and 15 proper subsets.",
      ],
    },
    {
      heading: "4. Operations on sets",
      paragraphs: [
        "The union of A and B, written A ∪ B, is the set of all elements that belong to A or to B or to both. The intersection, A ∩ B, is the set of elements that belong to both A and B. The complement of A, written A′, is the set of all elements of the universal set that are not in A. The difference A − B is the set of elements in A that are not in B.",
        "Let ξ = {1, 2, 3, …, 12}, A = {2, 4, 6, 8, 10, 12} and B = {3, 6, 9, 12}. Then A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}, because we list every element that appears in at least one set, writing each once. A ∩ B = {6, 12}, the elements that appear in both. A′ = {1, 3, 5, 7, 9, 11}. A − B = {2, 4, 8, 10}. (A ∪ B)′ = {1, 5, 7, 11}: the elements of ξ that are in neither A nor B.",
        "Counting helps: n(A) = 6, n(B) = 4, n(A ∩ B) = 2 and n(A ∪ B) = 8. Notice that 6 + 4 − 2 = 8; this idea is used in Week 9. Also n(A′) = n(ξ) − n(A) = 12 − 6 = 6.",
      ],
    },
    {
      heading: "5. Laws of sets",
      paragraphs: [
        "Several laws are always true. A ∪ A′ = ξ and A ∩ A′ = ∅ (a set and its complement together make up the universal set and have nothing in common). (A′)′ = A. A ∪ ∅ = A, A ∩ ∅ = ∅, A ∪ ξ = ξ and A ∩ ξ = A. The order of the sets does not matter: A ∪ B = B ∪ A and A ∩ B = B ∩ A.",
        "De Morgan’s laws connect complements with unions and intersections: (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′. In words, the complement of a union is the intersection of the complements, and the complement of an intersection is the union of the complements. Check with the sets above: (A ∪ B)′ = {1, 5, 7, 11}, and A′ ∩ B′ = {1, 3, 5, 7, 9, 11} ∩ {1, 2, 4, 5, 7, 8, 10, 11} = {1, 5, 7, 11}. Both give the same set.",
      ],
      points: [
        "A ∪ A′ = ξ; A ∩ A′ = ∅; (A′)′ = A.",
        "(A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′.",
        "n(A′) = n(ξ) − n(A).",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "A set is clearly defined. ‘Beautiful girls’ is not a set. ‘Girls whose names begin with A’ is.",
    "Write each element only once, and the order does not matter. {1, 2, 3} = {3, 2, 1} = {1, 1, 2, 3}.",
    "{0} and ∅ are different. {0} has one element; ∅ has none.",
    "The empty set is a subset of every set. A set with n elements has 2ⁿ subsets and 2ⁿ − 1 proper subsets.",
    "The union lists everything that is in either set, once. The intersection lists only what is in both.",
    "The complement is always taken relative to the universal set ξ. Change ξ and the complement changes.",
    "De Morgan: break the bar and change the sign. (A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′.",
    "∈ connects an element to a set (3 ∈ A). ⊂ connects a set to a set (P ⊂ Q). Do not mix them.",
  ],
  summary:
    "A set is a well-defined collection of elements, written by listing or in set-builder notation, and n(A) counts its elements. Sets can be finite, infinite, empty, singleton or universal, and two sets can be equal, equivalent or disjoint. A is a subset of B if every element of A is in B; a set with n elements has 2ⁿ subsets, of which 2ⁿ − 1 are proper. Union, intersection and complement combine sets, and they obey laws such as A ∪ A′ = ξ, A ∩ A′ = ∅ and De Morgan’s laws.",
  quick: {
    intro: "Week 8 revision sheet. Learn the symbols; they are most of the topic.",
    blocks: [
      {
        heading: "1. Notation",
        points: [
          "Elements inside { }. ∈ belongs to; ∉ does not belong to.",
          "n(A): number of elements. Order does not matter; no repeats.",
          "Set-builder: {x : x is a prime number, 10 < x < 20} = {11, 13, 17, 19}.",
        ],
      },
      {
        heading: "2. Types",
        points: [
          "Finite, infinite, empty (∅), singleton, universal (ξ).",
          "Equal: same elements. Equivalent: same number of elements.",
          "Disjoint: A ∩ B = ∅.",
        ],
        warning: "{0} is not the empty set.",
      },
      {
        heading: "3. Subsets",
        points: [
          "A ⊆ B: every element of A is in B. A ⊂ B: and A ≠ B.",
          "n elements → 2ⁿ subsets, 2ⁿ − 1 proper subsets.",
          "∅ is a subset of every set.",
        ],
      },
      {
        heading: "4. Operations and laws",
        points: [
          "A ∪ B: in A or B. A ∩ B: in both. A′: in ξ but not in A.",
          "A ∪ A′ = ξ; A ∩ A′ = ∅; n(A′) = n(ξ) − n(A).",
          "(A ∪ B)′ = A′ ∩ B′; (A ∩ B)′ = A′ ∪ B′.",
        ],
        memory: "De Morgan: break the bar, change the sign.",
      },
    ],
    likely: [
      { question: "Define a set.", answer: "A well-defined collection of objects, called its elements or members." },
      { question: "List {x : x is a prime number and 10 < x < 20}.", answer: "{11, 13, 17, 19}." },
      { question: "How many subsets has a set with 4 elements? How many are proper?", answer: "2⁴ = 16 subsets; 15 are proper." },
      { question: "Is {0} the empty set?", answer: "No. It has one element, 0." },
      { question: "State De Morgan’s laws.", answer: "(A ∪ B)′ = A′ ∩ B′ and (A ∩ B)′ = A′ ∪ B′." },
      { question: "If n(ξ) = 30 and n(A) = 12, find n(A′).", answer: "30 − 12 = 18." },
      { question: "What are disjoint sets?", answer: "Sets with no element in common: A ∩ B = ∅." },
      { question: "Differentiate between ∈ and ⊂.", answer: "∈ links an element to a set; ⊂ links a set to a larger set that contains it." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "If A = {2, 4, 6, 8, 10, 12}, then n(A) is", options: ["12", "5", "6", "7"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "Let ξ = {1, 2, 3, …, 12}, A = {2, 4, 6, 8, 10, 12} and B = {3, 6, 9, 12}. Then A ∩ B is", options: ["{6, 12}", "{3, 6, 9, 12}", "{2, 3, 4}", "{12}"], answer: "A" },
    { number: 3, kind: "Objective", prompt: "For the sets in the last question, A ∪ B is", options: ["{6, 12}", "{2, 4, 6, 8, 10, 12}", "{3, 6, 9, 12}", "{2, 3, 4, 6, 8, 9, 10, 12}"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "For the same sets, A′ is", options: ["{1, 3, 5, 7, 9}", "{1, 3, 5, 7, 9, 11}", "{2, 4, 6, 8, 10, 12}", "{3, 6, 9, 12}"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "For the same sets, (A ∪ B)′ is", options: ["{1, 5, 7, 11}", "{1, 3, 5, 7, 9, 11}", "{6, 12}", "{1, 5, 7, 9, 11}"], answer: "A", explanation: "A ∪ B = {2, 3, 4, 6, 8, 9, 10, 12}, so the elements of ξ left over are 1, 5, 7 and 11." },
    { number: 6, kind: "Objective", prompt: "Let ξ = {1, 2, 3, …, 12}, B = {3, 6, 9, 12} and C = {1, 2, 3, 4, 5, 6}. Then B′ ∩ C is", options: ["{1, 2, 3, 4, 5, 6}", "{3, 6}", "{1, 2, 4, 5}", "{7, 8, 10, 11}"], answer: "C", explanation: "B′ = {1, 2, 4, 5, 7, 8, 10, 11}. Its elements that are also in C are 1, 2, 4 and 5." },
    { number: 7, kind: "Objective", prompt: "The number of subsets of a set that has 4 elements is", options: ["4", "8", "12", "16"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "The number of proper subsets of {a, b, c} is", options: ["8", "7", "6", "3"], answer: "B", explanation: "The set has 2³ = 8 subsets, and all but the set itself are proper: 7." },
    { number: 9, kind: "Objective", prompt: "Which of the following is an empty set?", options: ["{x : x is a whole number and 3 < x < 4}", "{0}", "{2}", "{x : x is an even prime number}"], answer: "A", explanation: "There is no whole number between 3 and 4. {x : x is an even prime number} = {2}, which has one element." },
    { number: 10, kind: "Objective", prompt: "The set {x : x is a prime number and 10 < x < 20} is", options: ["{11, 13, 15, 17, 19}", "{11, 13, 19}", "{11, 13, 17, 19}", "{13, 17, 19}"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "Which of the following is an infinite set?", options: ["The months of the year", "The states in Nigeria", "The digits in base ten", "The multiples of 5"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "If P = {1, 2, 3} and Q = {1, 2, 3, 4, 5}, then", options: ["Q ⊂ P", "P ⊂ Q", "P = Q", "P ∩ Q = ∅"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "If n(ξ) = 30 and n(A) = 12, then n(A′) is", options: ["18", "42", "12", "360"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Which of the following statements is true for all sets A and B?", options: ["(A ∩ B)′ = A′ ∩ B′", "(A ∪ B)′ = A′ ∪ B′", "(A ∩ B)′ = A′ ∪ B′", "A ∪ A′ = ∅"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "List the elements of (a) {x : x is a factor of 12}, (b) {x : x is a prime number less than 20} and (c) {x : x is an even number and 10 < x < 20}.", answer: "(a) {1, 2, 3, 4, 6, 12}. (b) {2, 3, 5, 7, 11, 13, 17, 19}. (c) {12, 14, 16, 18}." },
    { number: 16, kind: "Theory", prompt: "Define (a) a finite set, (b) an infinite set, (c) an empty set and (d) a universal set, giving an example of each.", answer: "(a) A set whose elements can be counted, for example the days of the week. (b) A set whose elements cannot all be counted, for example the multiples of 5. (c) A set with no elements, for example {x : x is a whole number and 3 < x < 4}. (d) The set of all elements under discussion in a problem, for example the whole numbers from 1 to 12." },
    { number: 17, kind: "Theory", prompt: "List all the subsets of {a, b, c}. How many are there, and how many are proper subsets? How many subsets has a set with 5 elements?", answer: "The subsets are ∅, {a}, {b}, {c}, {a, b}, {a, c}, {b, c} and {a, b, c}. There are 8 = 2³, of which 7 are proper (all except {a, b, c}). A set with 5 elements has 2⁵ = 32 subsets." },
    { number: 18, kind: "Theory", prompt: "Given ξ = {1, 2, …, 10}, P = {2, 3, 5, 7} and Q = {1, 3, 5, 7, 9}, find P ∪ Q, P ∩ Q, P′, Q′ and (P ∪ Q)′. Verify that (P ∪ Q)′ = P′ ∩ Q′.", answer: "P ∪ Q = {1, 2, 3, 5, 7, 9}. P ∩ Q = {3, 5, 7}. P′ = {1, 4, 6, 8, 9, 10}. Q′ = {2, 4, 6, 8, 10}. (P ∪ Q)′ = {4, 6, 8, 10}. Also P′ ∩ Q′ = {4, 6, 8, 10}, which equals (P ∪ Q)′, so De Morgan’s law is verified." },
    { number: 19, kind: "Theory", prompt: "Given ξ = {1, 2, 3, 4, 5, 6}, A = {1, 2, 3, 4} and B = {3, 4, 5, 6}, verify that (A ∩ B)′ = A′ ∪ B′.", answer: "A ∩ B = {3, 4}, so (A ∩ B)′ = {1, 2, 5, 6}. A′ = {5, 6} and B′ = {1, 2}, so A′ ∪ B′ = {1, 2, 5, 6}. The two sets are equal." },
    { number: 20, kind: "Theory", prompt: "Explain why the empty set is a subset of every set and why {0} and ∅ are different sets.", answer: "A is a subset of B if every element of A is in B. The empty set has no elements, so there is no element of ∅ that is missing from B; the condition holds for every set. {0} has one element, the number 0, whereas ∅ has no elements, so n({0}) = 1 and n(∅) = 0." },
  ] as PracticeQuestion[],
};
