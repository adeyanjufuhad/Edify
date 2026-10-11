import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week10: Lesson = {
  id: "ss1-first-chemistry-week-10",
  week: "Week 10",
  title: "Constituents of the Atom",
  subtitle: "Count protons, neutrons and electrons, and use relative atomic and molecular masses in calculations.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Describe the three subatomic particles: their charge, relative mass and position in the atom.",
    "Define atomic number and mass number and use the notation ᴬ_Z X.",
    "Work out the numbers of protons, neutrons and electrons in atoms and ions.",
    "Work backwards from particle numbers to the atomic number, mass number or element.",
    "Define relative atomic mass and relative molecular mass and calculate them.",
    "Use relative masses to find percentage composition, masses of elements in compounds and unknown atomic masses.",
  ],
  sections: [
    {
      heading: "1. Inside the atom",
      paragraphs: [
        "An atom has a very small, dense nucleus at its centre and electrons moving around it in the space outside. The nucleus contains protons and neutrons, which are together called nucleons. Almost all the mass of the atom is in the nucleus, although the nucleus takes up only a tiny fraction of its volume. If an atom were enlarged to the size of a football stadium, the nucleus would be about the size of a pea at the centre.",
        "An ordinary atom is electrically neutral because the number of electrons equals the number of protons: the negative and positive charges cancel.",
      ],
    },
    {
      heading: "2. The three particles",
      paragraphs: [
        "The proton carries a charge of +1 and has a relative mass of 1. It is found in the nucleus. The neutron has no charge and a relative mass of 1. It is found in the nucleus. The electron carries a charge of −1, has a mass of only about 1/1840 of a proton (so its mass is usually ignored), and moves around the nucleus.",
        "The electron was discovered by J. J. Thomson in 1897, the proton by Ernest Rutherford in 1919 (building on earlier work by Goldstein) and the neutron by James Chadwick in 1932.",
      ],
      points: [
        "Proton: charge +1, relative mass 1, in the nucleus.",
        "Neutron: charge 0, relative mass 1, in the nucleus.",
        "Electron: charge −1, relative mass about 1/1840, outside the nucleus.",
      ],
    },
    {
      heading: "3. Atomic number and mass number",
      paragraphs: [
        "The atomic number (Z) is the number of protons in the nucleus of an atom. It identifies the element: every atom with 6 protons is carbon, and every atom with 11 protons is sodium. In a neutral atom the number of electrons equals Z.",
        "The mass number (A) is the total number of protons and neutrons in the nucleus: A = Z + number of neutrons. So the number of neutrons = A − Z.",
        "An atom is written with its mass number at the top left of its symbol and its atomic number at the bottom left. For sodium, ²³₁₁Na means A = 23 and Z = 11. It has 11 protons, 11 electrons and 23 − 11 = 12 neutrons.",
      ],
    },
    {
      heading: "4. Counting particles in atoms and ions",
      paragraphs: [
        "An ion has a different number of electrons from the neutral atom, but the nucleus does not change. To find the electrons in an ion, start from the atomic number and subtract the charge for a positive ion, or add the charge for a negative ion.",
        "Worked examples. Aluminium atom, ²⁷₁₃Al: 13 protons, 14 neutrons, 13 electrons. Aluminium ion, Al³⁺: it has lost 3 electrons, so 13 protons, 14 neutrons and 10 electrons. Chloride ion, ³⁵₁₇Cl⁻: it has gained 1 electron, so 17 protons, 18 neutrons and 18 electrons. Oxide ion, ¹⁶₈O²⁻: 8 protons, 8 neutrons and 10 electrons.",
        "Notice that Al³⁺, Na⁺, Mg²⁺, F⁻ and O²⁻ all have 10 electrons, even though they have different numbers of protons. Particles with the same number of electrons like these are called isoelectronic.",
      ],
    },
    {
      heading: "5. Working back to the atomic number",
      paragraphs: [
        "Sometimes the question gives you the particles, and you must find the element. Method: protons are the atomic number; protons plus neutrons are the mass number; for an ion, use the charge to adjust the electrons.",
        "Example 1: an atom has 16 neutrons and a mass number of 31. Z = 31 − 16 = 15, so the element is phosphorus. Example 2: an ion X²⁺ has 18 electrons and 20 neutrons. It has lost two electrons, so the neutral atom had 20 electrons and so 20 protons. Z = 20 (calcium) and A = 20 + 20 = 40. Example 3: an ion Y³⁻ has 10 electrons and its atom has a mass number of 14. The ion gained 3 electrons, so the neutral atom had 7 electrons and Z = 7 (nitrogen). The number of neutrons is 14 − 7 = 7.",
      ],
    },
    {
      heading: "6. Relative atomic mass",
      paragraphs: [
        "Atoms are too light to be weighed one by one in grams, so chemists compare their masses with a standard. The relative atomic mass (Aᵣ) of an element is the average mass of its atoms, compared with one-twelfth of the mass of one atom of carbon-12. It has no unit because it is a ratio.",
        "We take an average because most elements are mixtures of isotopes. Chlorine is about 75% ³⁵Cl and 25% ³⁷Cl, so its average Aᵣ is 35.5, which is why you never see a chlorine atom with a mass of 35.5. Approximate values used in calculations: H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32, Cl = 35.5, K = 39, Ca = 40, Fe = 56, Cu = 64, Zn = 65, Ag = 108.",
      ],
    },
    {
      heading: "7. Relative molecular mass and formula mass",
      paragraphs: [
        "The relative molecular mass (Mᵣ) of a substance is the sum of the relative atomic masses of all the atoms in its formula. For ionic compounds, which do not have molecules, the term formula mass is used, and it is calculated in the same way.",
        "Worked examples: H₂SO₄ = 2(1) + 32 + 4(16) = 98. Ca(OH)₂ = 40 + 2(16 + 1) = 74. (NH₄)₂SO₄ = 2(14 + 4) + 32 + 64 = 132. CuSO₄·5H₂O = 64 + 32 + 64 + 5(18) = 250. In a hydrated salt, the water of crystallisation is counted as well.",
      ],
    },
    {
      heading: "8. Using relative masses",
      paragraphs: [
        "Percentage composition by mass: percentage of an element = (number of atoms of the element × Aᵣ ÷ Mᵣ of the compound) × 100. Example: nitrogen in ammonium nitrate, NH₄NO₃ (Mᵣ = 80). Two nitrogen atoms give 28, so the percentage is 28 ÷ 80 × 100 = 35%. Example: iron in Fe₂O₃ (Mᵣ = 160): 112 ÷ 160 × 100 = 70%.",
        "Mass of an element in a given mass of compound: mass = (mass of element in one formula unit ÷ Mᵣ) × mass of compound. Example: iron in 80 g of Fe₂O₃ = 112 ÷ 160 × 80 = 56 g.",
        "Finding an unknown atomic mass: a divalent metal M forms a chloride MCl₂ with Mᵣ = 111. Then Aᵣ of M = 111 − 2(35.5) = 111 − 71 = 40, so M is calcium. Another: a metal oxide MO is 60% M by mass. Then M ÷ (M + 16) = 0.6, so M = 0.6M + 9.6, giving M = 24 (magnesium).",
      ],
    },
    {
      heading: "9. Summary of key relationships",
      paragraphs: [
        "Atomic number Z = number of protons = number of electrons in a neutral atom. Mass number A = protons + neutrons. Neutrons = A − Z. For a positive ion, electrons = Z − charge; for a negative ion, electrons = Z + charge. The number of protons never changes when an ion forms.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "A neutral atom: electrons = protons. An ion: protons stay the same; only electrons change.",
    "Neutrons = mass number − atomic number. Do not subtract the other way.",
    "Relative atomic mass has no units. Do not write ‘g’ after it.",
    "The Aᵣ of chlorine is 35.5 because it is an average of isotopes. No single chlorine atom has that mass.",
    "Electron mass is about 1/1840 of a proton: negligible. Do not say it is zero.",
    "In a hydrated salt, include the water of crystallisation when you work out the Mᵣ.",
    "Working with ions: Na⁺ has 10 electrons (11 − 1), Cl⁻ has 18 (17 + 1). The sign tells you which way to adjust.",
    "Show the workings in percentage-composition questions: the mass of the element in the formula, divided by Mᵣ, times 100.",
  ],
  summary:
    "An atom has a nucleus of protons and neutrons with electrons around it. The atomic number is the number of protons and identifies the element; the mass number is protons plus neutrons. Neutral atoms have equal protons and electrons, while ions have gained or lost electrons. Relative atomic mass is an average, compared with one-twelfth of carbon-12, and relative molecular mass is the sum of the atomic masses in a formula. These masses are used to find percentage composition, the mass of an element in a compound and unknown atomic masses.",
  quick: {
    intro: "Week 10 revision. Practise counting particles until it is automatic.",
    blocks: [
      {
        heading: "1. The three particles",
        points: [
          "Proton: +1, relative mass 1, nucleus.",
          "Neutron: 0, relative mass 1, nucleus.",
          "Electron: −1, relative mass about 1/1840, outside the nucleus.",
        ],
      },
      {
        heading: "2. Z and A",
        points: [
          "Atomic number Z = number of protons.",
          "Mass number A = protons + neutrons.",
          "Neutrons = A − Z.",
          "Notation: ᴬ_Z X, e.g. ²³₁₁Na.",
        ],
      },
      {
        heading: "3. Atoms and ions",
        points: [
          "Neutral atom: electrons = protons.",
          "Positive ion: electrons = Z − charge.",
          "Negative ion: electrons = Z + charge.",
          "Al³⁺: 13 p, 14 n, 10 e.  Cl⁻: 17 p, 18 n, 18 e.",
        ],
      },
      {
        heading: "4. Relative atomic mass",
        points: [
          "Average mass of an atom of the element ÷ (1/12 × mass of one carbon-12 atom).",
          "No unit.",
          "H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 64, Zn 65, Ag 108.",
        ],
      },
      {
        heading: "5. Relative molecular mass",
        points: [
          "Add the Aᵣ of every atom in the formula.",
          "H₂SO₄ = 98; Ca(OH)₂ = 74; (NH₄)₂SO₄ = 132; CuSO₄·5H₂O = 250.",
        ],
      },
      {
        heading: "6. Calculations",
        points: [
          "% element = (n × Aᵣ ÷ Mᵣ) × 100.",
          "N in NH₄NO₃ = 35%. Fe in Fe₂O₃ = 70%.",
          "Mass of element = (n × Aᵣ ÷ Mᵣ) × mass of compound.",
          "Unknown metal M in MCl₂ with Mᵣ 111: Aᵣ = 111 − 71 = 40 (Ca).",
        ],
      },
    ],
    likely: [
      { question: "State the charge, relative mass and position of the proton, neutron and electron.", answer: "Proton: +1, 1, nucleus. Neutron: 0, 1, nucleus. Electron: −1, about 1/1840, outside the nucleus." },
      { question: "Define atomic number and mass number.", answer: "Atomic number is the number of protons in the nucleus of an atom. Mass number is the total number of protons and neutrons." },
      { question: "How many neutrons are in ²³₁₁Na?", answer: "23 − 11 = 12 neutrons." },
      { question: "How many protons, neutrons and electrons are in ²⁷₁₃Al³⁺?", answer: "13 protons, 14 neutrons and 10 electrons." },
      { question: "Why is an atom electrically neutral?", answer: "It has equal numbers of protons (positive) and electrons (negative)." },
      { question: "Who discovered the neutron, and in which year?", answer: "James Chadwick, in 1932." },
      { question: "Define relative atomic mass.", answer: "The average mass of the atoms of an element compared with one-twelfth of the mass of a carbon-12 atom." },
      { question: "Why is the relative atomic mass of chlorine 35.5?", answer: "Chlorine is a mixture of isotopes, ³⁵Cl (about 75%) and ³⁷Cl (about 25%), so the average is 35.5." },
      { question: "Calculate the relative molecular mass of H₂SO₄.", answer: "2(1) + 32 + 4(16) = 98." },
      { question: "Calculate the percentage of nitrogen in NH₄NO₃. [H = 1, N = 14, O = 16]", answer: "Mᵣ = 80; N = 28; 28 ÷ 80 × 100 = 35%." },
      { question: "What mass of iron is in 80 g of Fe₂O₃? [Fe = 56, O = 16]", answer: "112 ÷ 160 × 80 = 56 g." },
      { question: "What are isoelectronic particles?", answer: "Particles with the same number of electrons, e.g. Na⁺, Mg²⁺, Al³⁺, F⁻ and O²⁻ (10 electrons each)." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which particle carries a negative charge?", options: ["Proton", "Neutron", "Electron", "Nucleus"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "Which particle has no charge?", options: ["Proton", "Neutron", "Electron", "Ion"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The mass of an electron compared with that of a proton is about", options: ["equal", "1/1840", "1840 times greater", "twice as much"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The nucleus of an atom contains", options: ["protons and electrons", "protons and neutrons", "neutrons and electrons", "electrons only"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "The atomic number of an atom is the number of", options: ["neutrons", "protons", "protons and neutrons", "electrons in an ion"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "The mass number of an atom is the total number of", options: ["protons and electrons", "protons and neutrons", "neutrons and electrons", "all particles including ions"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The number of neutrons in ²³₁₁Na is", options: ["11", "12", "23", "34"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The number of electrons in Mg²⁺ (atomic number 12) is", options: ["10", "12", "14", "24"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "The number of protons in Cl⁻ (atomic number 17) is", options: ["16", "17", "18", "35"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "An atom has 15 protons and 16 neutrons. Its mass number is", options: ["15", "16", "31", "1"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "An ion X²⁺ has 18 electrons. The atomic number of X is", options: ["16", "18", "20", "22"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "Which of these particles has the same number of electrons as Na⁺?", options: ["Cl⁻", "F⁻", "K⁺", "S²⁻"], answer: "B", explanation: "Na⁺ has 10 electrons, as does F⁻ (9 + 1)." },
    { number: 13, kind: "Objective", prompt: "The relative atomic mass of an element with isotopes is", options: ["the mass of its most abundant isotope", "the average of the isotope masses taking their abundance into account", "always a whole number", "the atomic number"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The relative atomic mass of chlorine is 35.5 because", options: ["it has a half neutron", "it is a mixture of ³⁵Cl and ³⁷Cl", "its atoms weigh 35.5 g", "it has 35.5 protons"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "The relative molecular mass of CO₂ is [C = 12, O = 16]", options: ["28", "32", "44", "56"], answer: "C" },
    { number: 16, kind: "Objective", prompt: "The relative formula mass of Ca(OH)₂ is [Ca = 40, O = 16, H = 1]", options: ["57", "58", "74", "114"], answer: "C" },
    { number: 17, kind: "Objective", prompt: "The relative formula mass of (NH₄)₂SO₄ is [H = 1, N = 14, O = 16, S = 32]", options: ["114", "118", "132", "142"], answer: "C" },
    { number: 18, kind: "Objective", prompt: "The percentage of nitrogen in NH₄NO₃ is [H = 1, N = 14, O = 16]", options: ["17.5%", "28%", "35%", "42%"], answer: "C" },
    { number: 19, kind: "Objective", prompt: "The percentage of iron in Fe₂O₃ is [Fe = 56, O = 16]", options: ["30%", "56%", "70%", "80%"], answer: "C" },
    { number: 20, kind: "Objective", prompt: "A divalent metal M forms a chloride MCl₂ of relative formula mass 111. The relative atomic mass of M is [Cl = 35.5]", options: ["24", "40", "56", "65"], answer: "B" },
    { number: 21, kind: "Theory", prompt: "State the charge, relative mass and position in the atom of each of the proton, the neutron and the electron.", answer: "Proton: charge +1, relative mass 1, in the nucleus. Neutron: charge 0, relative mass 1, in the nucleus. Electron: charge −1, relative mass about 1/1840, moving around the nucleus." },
    { number: 22, kind: "Theory", prompt: "Define atomic number and mass number. Write the symbol of an atom with 11 protons and 12 neutrons in the form ᴬ_Z X.", answer: "Atomic number is the number of protons in the nucleus; mass number is the total number of protons and neutrons. A = 11 + 12 = 23, Z = 11, so the atom is ²³₁₁Na." },
    { number: 23, kind: "Theory", prompt: "Calculate the numbers of protons, neutrons and electrons in each: ³⁹₁₉K, ³⁹₁₉K⁺, ³⁵₁₇Cl⁻, ¹⁶₈O²⁻ and ²⁷₁₃Al³⁺.", answer: "³⁹K: 19 p, 20 n, 19 e. K⁺: 19 p, 20 n, 18 e. ³⁵Cl⁻: 17 p, 18 n, 18 e. ¹⁶O²⁻: 8 p, 8 n, 10 e. ²⁷Al³⁺: 13 p, 14 n, 10 e." },
    { number: 24, kind: "Theory", prompt: "An atom of element X has a mass number of 39 and contains 20 neutrons. Find its atomic number, the number of electrons in the neutral atom, and name the element.", answer: "Z = 39 − 20 = 19. The neutral atom has 19 electrons. The element with atomic number 19 is potassium." },
    { number: 25, kind: "Theory", prompt: "Define relative atomic mass. Explain why the value for chlorine is 35.5.", answer: "Relative atomic mass is the average mass of the atoms of an element compared with one-twelfth of the mass of a carbon-12 atom. Chlorine consists of about 75% ³⁵Cl and 25% ³⁷Cl, so the average is about 35.5." },
    { number: 26, kind: "Theory", prompt: "Calculate the relative molecular (formula) mass of (a) H₂SO₄ (b) Al₂(SO₄)₃ (c) Na₂CO₃·10H₂O (d) Mg(NO₃)₂ (e) C₆H₁₂O₆. [H = 1, C = 12, N = 14, O = 16, Na = 23, Mg = 24, Al = 27, S = 32]", answer: "(a) 98. (b) 2(27) + 3(32 + 64) = 54 + 288 = 342. (c) 106 + 10(18) = 286. (d) 24 + 2(14 + 48) = 148. (e) 72 + 12 + 96 = 180." },
    { number: 27, kind: "Theory", prompt: "Calculate the percentage by mass of (a) nitrogen in (NH₄)₂SO₄ (b) water in MgSO₄·7H₂O (c) copper in CuO. [H = 1, N = 14, O = 16, Mg = 24, S = 32, Cu = 64]", answer: "(a) Mᵣ = 132; 28 ÷ 132 × 100 = 21.2%. (b) Mᵣ = 24 + 32 + 64 + 126 = 246; 126 ÷ 246 × 100 = 51.2%. (c) Mᵣ = 80; 64 ÷ 80 × 100 = 80%." },
    { number: 28, kind: "Theory", prompt: "A divalent metal M forms an oxide MO that contains 60% of M by mass. Find the relative atomic mass of M and name the metal. [O = 16]", answer: "M ÷ (M + 16) = 0.60, so M = 0.60M + 9.6 and 0.40M = 9.6, giving M = 24. The metal is magnesium." },
    { number: 29, kind: "Theory", prompt: "Calculate the mass of iron in 80 g of iron(III) oxide, Fe₂O₃. [Fe = 56, O = 16]", answer: "Mᵣ of Fe₂O₃ = 160. Iron in one formula unit = 112. Mass of iron = 112 ÷ 160 × 80 = 56 g." },
    { number: 30, kind: "Theory", prompt: "State three differences between a proton and an electron, and explain why the mass of an atom is considered to be in its nucleus.", answer: "A proton is positive (+1), has relative mass 1 and is found in the nucleus; an electron is negative (−1), has a mass of about 1/1840 and moves outside the nucleus. The electrons’ mass is negligible, so almost all of an atom’s mass is in the protons and neutrons of the nucleus." },
  ] as PracticeQuestion[],
};
