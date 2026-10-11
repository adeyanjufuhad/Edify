import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week11: Lesson = {
  id: "ss1-first-chemistry-week-11",
  week: "Week 11",
  title: "Electronic Structure & Isotopy",
  subtitle: "Place electrons in shells for the first 20 elements, link the arrangement to group, period and valency, and understand isotopes.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "State the maximum number of electrons in each shell and write the electronic structure of the first 20 elements.",
    "Link the outer electrons to group, the number of shells to period, and both to valency.",
    "Explain how atoms form ions with a noble-gas arrangement.",
    "Define isotopy and describe common isotopes.",
    "Calculate relative atomic mass from isotopic abundances and the reverse.",
    "Describe how isotopes are detected and state their uses.",
  ],
  sections: [
    {
      heading: "1. Electron shells",
      paragraphs: [
        "Electrons move around the nucleus in regions called shells or energy levels, numbered 1, 2, 3 and so on outwards from the nucleus (also called K, L, M, N). Electrons in shells close to the nucleus have less energy and are held more strongly. Each shell can hold only a limited number of electrons: the maximum is 2n², where n is the shell number. So the first shell holds up to 2, the second up to 8, the third up to 18 and the fourth up to 32.",
        "For the first 20 elements we use a simple rule of filling: shells are filled from the inside outwards, the first holds 2, the second holds 8, and the third is filled to 8 before the fourth shell starts to fill. This is why potassium (19 electrons) is 2, 8, 8, 1 and not 2, 8, 9.",
      ],
    },
    {
      heading: "2. The first 20 elements",
      paragraphs: [
        "Write electrons shell by shell, separated by commas. Hydrogen 1; helium 2; lithium 2,1; beryllium 2,2; boron 2,3; carbon 2,4; nitrogen 2,5; oxygen 2,6; fluorine 2,7; neon 2,8; sodium 2,8,1; magnesium 2,8,2; aluminium 2,8,3; silicon 2,8,4; phosphorus 2,8,5; sulphur 2,8,6; chlorine 2,8,7; argon 2,8,8; potassium 2,8,8,1; calcium 2,8,8,2.",
        "To work out an arrangement, start from the atomic number, which equals the number of electrons in a neutral atom, and fill the shells in order. Example: for aluminium, Z = 13: put 2 in shell 1 (11 left), 8 in shell 2 (3 left), and 3 in shell 3, giving 2,8,3.",
      ],
      diagram: "Draw the atom of sodium as a small nucleus labelled ‘11p, 12n’ with three circles around it. Put two dots on the first circle, eight on the second and one on the third. Label the arrangement 2,8,1.",
    },
    {
      heading: "3. Outer electrons, group, period and valency",
      paragraphs: [
        "The electrons in the outermost shell are the valence electrons, and they decide how an element reacts. For the first 20 elements, the number of outer electrons is the group number (1 to 7, with the noble gases in the last group, which has 8, except helium, which has 2). The number of occupied shells is the period number. Sodium, 2,8,1, is in Group 1 and Period 3. Chlorine, 2,8,7, is in Group 7 and Period 3. Calcium, 2,8,8,2, is in Group 2 and Period 4.",
        "Valency is the number of electrons an atom loses, gains or shares to get a full outer shell. If an atom has 1, 2 or 3 outer electrons it usually loses them, so the valency equals the group number (Na 1, Mg 2, Al 3). If it has 5, 6 or 7 outer electrons it tends to gain electrons, so the valency is 8 minus the group number (N 3, O 2, Cl 1). Carbon and silicon, with 4, share electrons and have valency 4. Noble gases already have a full outer shell, so their valency is zero.",
      ],
    },
    {
      heading: "4. Ions and the noble-gas arrangement",
      paragraphs: [
        "Noble gases are very unreactive because their outer shells are full (2 for helium, 8 for the others). Other atoms react to reach the same stable arrangement. A metal atom loses its outer electrons to become a positive ion. Sodium, 2,8,1, loses one to give Na⁺, 2,8, the same as neon. Magnesium loses two to give Mg²⁺ (2,8) and aluminium loses three to give Al³⁺ (2,8).",
        "A non-metal atom gains electrons to become a negative ion. Chlorine, 2,8,7, gains one to give Cl⁻, 2,8,8, the same as argon. Oxygen, 2,6, gains two to give O²⁻ (2,8) and sulphur, 2,8,6, gains two to give S²⁻ (2,8,8). Potassium and calcium ions, K⁺ and Ca²⁺, are 2,8,8 like argon.",
      ],
    },
    {
      heading: "5. Isotopy",
      paragraphs: [
        "Isotopes are atoms of the same element that have the same number of protons but different numbers of neutrons. They have the same atomic number but different mass numbers. The phenomenon is called isotopy.",
        "Hydrogen has three isotopes: protium, ¹H (1 proton, no neutron); deuterium, ²H (1 proton, 1 neutron); and tritium, ³H (1 proton, 2 neutrons). Carbon has ¹²C, ¹³C and ¹⁴C, with 6, 7 and 8 neutrons. Chlorine has ³⁵Cl and ³⁷Cl, and neon has ²⁰Ne and ²²Ne.",
        "Isotopes of an element have identical chemical properties, because chemical reactions depend on electrons and all isotopes have the same number of electrons and the same arrangement. They have different physical properties that depend on mass, such as density, rate of diffusion and, in some cases, melting and boiling points. Some isotopes are unstable and radioactive.",
      ],
    },
    {
      heading: "6. Relative atomic mass from isotopes",
      paragraphs: [
        "Relative atomic mass is the weighted average of the isotope masses. Multiply each mass number by its percentage abundance, add, and divide by 100.",
        "Example 1: chlorine is 75% ³⁵Cl and 25% ³⁷Cl. Aᵣ = (75 × 35 + 25 × 37) ÷ 100 = (2625 + 925) ÷ 100 = 35.5. Example 2: boron is 20% ¹⁰B and 80% ¹¹B, so Aᵣ = (20 × 10 + 80 × 11) ÷ 100 = 10.8. Example 3, in reverse: copper has two isotopes, ⁶³Cu and ⁶⁵Cu, and Aᵣ = 63.5. Let x be the percentage of ⁶³Cu: (63x + 65(100 − x)) ÷ 100 = 63.5, so 6500 − 2x = 6350 and x = 75. The abundances are 75% ⁶³Cu and 25% ⁶⁵Cu.",
      ],
    },
    {
      heading: "7. Detecting isotopes, and what they are used for",
      paragraphs: [
        "A mass spectrometer detects isotopes and measures their masses. The sample is vaporised and bombarded with electrons to turn its atoms into positive ions. The ions are accelerated, then deflected by a magnetic field: lighter ions are deflected more than heavier ones. A detector records how many ions of each mass arrive, giving the mass and the relative abundance of each isotope.",
        "Uses of isotopes: carbon-14 is used to find the age of ancient wood, bones and cloth (radiocarbon dating); iodine-131 is used to treat and study thyroid gland disease; cobalt-60 gives gamma rays to treat cancer and to sterilise hospital equipment; uranium-235 is the fuel in nuclear reactors; and radioactive tracers are used to follow the movement of fertilisers in plants or to find leaks in pipes.",
      ],
    },
    {
      heading: "8. Putting it together: chlorine molecules",
      paragraphs: [
        "Because chlorine has two isotopes, a Cl₂ molecule can contain two ³⁵Cl atoms (mass 70), one of each (mass 72) or two ³⁷Cl atoms (mass 74). With abundances of 75% and 25%, the probability of each combination is 0.75 × 0.75 = 0.5625, 2 × 0.75 × 0.25 = 0.375 and 0.25 × 0.25 = 0.0625. The ratio of molecules with masses 70 : 72 : 74 is therefore 9 : 6 : 1, which is what a mass spectrometer shows.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Shell capacity is 2n²: 2, 8, 18, 32. But for the first 20 elements the third shell stops at 8 before the fourth starts.",
    "The group number equals the outer electrons (for Groups 1 to 7); the period number equals the number of shells.",
    "For valency, count loss for 1 to 3 outer electrons and gain for 5 to 7 outer electrons (8 minus the group). Carbon and silicon share four.",
    "Na⁺ is 2,8 (like neon), not 2,8,1. Cl⁻ is 2,8,8 (like argon). Always rewrite the arrangement after the charge.",
    "Isotopes: same Z, different A. They have the same chemical properties and different physical properties.",
    "Relative atomic mass is a weighted average: multiply by percentage abundance, add up, divide by 100.",
    "In the mass spectrometer, lighter ions are deflected more by the magnetic field.",
    "The isotopes of hydrogen differ only in neutrons: ¹H has none, ²H has one and ³H has two.",
  ],
  summary:
    "Electrons occupy shells holding 2, 8, 18 and 32 electrons at most, and for the first 20 elements the shells fill 2,8,8,2. The outer electrons give the group number, the number of shells gives the period, and atoms react to reach a noble-gas arrangement, forming positive ions by losing electrons and negative ions by gaining them. Isotopes have the same number of protons but different numbers of neutrons, the same chemical properties and different physical ones. Relative atomic mass is a weighted average of isotope masses. Isotopes are detected with a mass spectrometer and used in dating, medicine, industry and nuclear power.",
  quick: {
    intro: "Week 11 revision. Learn the first 20 arrangements; every other question follows from them.",
    blocks: [
      {
        heading: "1. Shells",
        points: [
          "Maximum electrons: 2n² (2, 8, 18, 32).",
          "First 20 elements: 2, then 8, then 8, then the rest.",
        ],
      },
      {
        heading: "2. First 20 elements",
        points: [
          "H 1; He 2; Li 2,1; Be 2,2; B 2,3; C 2,4; N 2,5; O 2,6; F 2,7; Ne 2,8.",
          "Na 2,8,1; Mg 2,8,2; Al 2,8,3; Si 2,8,4; P 2,8,5; S 2,8,6; Cl 2,8,7; Ar 2,8,8.",
          "K 2,8,8,1; Ca 2,8,8,2.",
        ],
      },
      {
        heading: "3. Group, period, valency",
        points: [
          "Outer electrons = group number (Groups 1 to 7).",
          "Number of shells = period number.",
          "Valency: loses 1 to 3 (valency = outer electrons); gains 5 to 7 (valency = 8 − outer electrons); shares 4.",
        ],
      },
      {
        heading: "4. Ions",
        points: [
          "Na⁺ 2,8 (neon); Mg²⁺ 2,8; Al³⁺ 2,8.",
          "Cl⁻ 2,8,8 (argon); O²⁻ 2,8; S²⁻ 2,8,8.",
          "K⁺ and Ca²⁺ are 2,8,8.",
        ],
      },
      {
        heading: "5. Isotopes",
        points: [
          "Same Z, different A (different neutrons).",
          "Same chemical properties; different physical properties.",
          "H: ¹H, ²H, ³H. C: ¹²C, ¹³C, ¹⁴C. Cl: ³⁵Cl, ³⁷Cl.",
        ],
      },
      {
        heading: "6. Calculating Aᵣ",
        points: [
          "Aᵣ = Σ (mass number × % abundance) ÷ 100.",
          "Cl: (75 × 35 + 25 × 37) ÷ 100 = 35.5.",
          "B: (20 × 10 + 80 × 11) ÷ 100 = 10.8.",
        ],
      },
      {
        heading: "7. Detection and uses",
        points: [
          "Mass spectrometer: vaporise → ionise → accelerate → deflect (lighter ions deflect more) → detect.",
          "Uses: carbon-14 dating; iodine-131 for the thyroid; cobalt-60 for cancer treatment and sterilising; uranium-235 for nuclear fuel; tracers.",
        ],
      },
    ],
    likely: [
      { question: "State the maximum number of electrons in the first, second and third shells.", answer: "2, 8 and 18 (2n²); for the first 20 elements the third shell is filled to 8 first." },
      { question: "Write the electronic arrangement of nitrogen, magnesium and chlorine.", answer: "N 2,5; Mg 2,8,2; Cl 2,8,7." },
      { question: "How are group and period related to electronic structure?", answer: "The group number equals the number of outer electrons (for Groups 1 to 7); the period number equals the number of shells." },
      { question: "What is valency in terms of electrons?", answer: "The number of electrons an atom loses, gains or shares to complete its outer shell." },
      { question: "What is the electronic arrangement of Na⁺ and Cl⁻?", answer: "Na⁺ is 2,8 and Cl⁻ is 2,8,8." },
      { question: "Why are noble gases unreactive?", answer: "Their outer shells are full (2 or 8 electrons), which is a stable arrangement." },
      { question: "Define isotopes. Give two examples.", answer: "Atoms of the same element with the same atomic number but different mass numbers (different numbers of neutrons), e.g. ¹²C and ¹⁴C; ³⁵Cl and ³⁷Cl." },
      { question: "Why do isotopes have the same chemical properties?", answer: "They have the same number of electrons and the same electronic arrangement." },
      { question: "Name the three isotopes of hydrogen and their neutrons.", answer: "Protium (0 neutrons), deuterium (1 neutron) and tritium (2 neutrons)." },
      { question: "Calculate the relative atomic mass of boron if it is 20% ¹⁰B and 80% ¹¹B.", answer: "(20 × 10 + 80 × 11) ÷ 100 = 10.8." },
      { question: "Describe briefly how a mass spectrometer works.", answer: "The sample is vaporised and ionised, the ions are accelerated and deflected by a magnetic field (lighter ions more), and a detector records the mass and abundance of each ion." },
      { question: "State three uses of radioactive isotopes.", answer: "Carbon-14 dating, iodine-131 for thyroid treatment, cobalt-60 for cancer treatment and sterilising equipment (also nuclear fuel and tracers)." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The maximum number of electrons in the second shell is", options: ["2", "8", "18", "32"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "The electronic arrangement of magnesium (atomic number 12) is", options: ["2,8,1", "2,8,2", "2,10", "2,2,8"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The electronic arrangement of chlorine (atomic number 17) is", options: ["2,8,6", "2,8,7", "2,8,8", "2,7,8"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "An element with the electronic arrangement 2,8,5 is in", options: ["Group 5, Period 3", "Group 3, Period 5", "Group 8, Period 2", "Group 5, Period 2"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "The valency of an element with the electronic arrangement 2,8,6 is", options: ["2", "4", "6", "8"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "Which element has a stable octet in its outer shell?", options: ["Sodium", "Chlorine", "Neon", "Oxygen"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "The electronic arrangement of Na⁺ is", options: ["2,8,1", "2,8", "2,8,2", "2,7"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The electronic arrangement of Cl⁻ is", options: ["2,8,7", "2,8,8", "2,8", "2,8,6"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Isotopes of an element have the same", options: ["mass number", "number of neutrons", "number of protons", "relative atomic mass"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "Isotopes of the same element differ in the number of", options: ["protons", "electrons", "neutrons", "shells"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "The number of neutrons in the isotope ³H is", options: ["0", "1", "2", "3"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "Isotopes have identical chemical properties because they have the same", options: ["number of neutrons", "mass", "electronic arrangement", "density"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Neon exists as 90% ²⁰Ne and 10% ²²Ne. Its relative atomic mass is", options: ["20.0", "20.2", "21.0", "21.8"], answer: "B", explanation: "(90 × 20 + 10 × 22) ÷ 100 = 20.2." },
    { number: 14, kind: "Objective", prompt: "A sample of element X is 25% ³⁷X and 75% ³⁵X. Its relative atomic mass is", options: ["35.5", "36.0", "36.5", "37.0"], answer: "A" },
    { number: 15, kind: "Objective", prompt: "In a mass spectrometer, ions are separated according to their", options: ["colour", "mass", "boiling point", "solubility"], answer: "B" },
    { number: 16, kind: "Objective", prompt: "The age of ancient wood can be found using the isotope", options: ["iodine-131", "cobalt-60", "carbon-14", "uranium-235"], answer: "C" },
    { number: 17, kind: "Objective", prompt: "Which isotope is used in treating thyroid disease?", options: ["Iodine-131", "Carbon-14", "Uranium-235", "Hydrogen-1"], answer: "A" },
    { number: 18, kind: "Objective", prompt: "An element with the arrangement 2,8,8,1 is", options: ["sodium", "potassium", "calcium", "argon"], answer: "B" },
    { number: 19, kind: "Objective", prompt: "The electronic arrangement of Ca²⁺ is", options: ["2,8,8,2", "2,8,8", "2,8,6", "2,8,10"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "The number of outer electrons in atoms of the Group 7 elements is", options: ["1", "5", "7", "8"], answer: "C" },
    { number: 21, kind: "Theory", prompt: "Write the electronic arrangement of (a) nitrogen (b) silicon (c) argon (d) potassium (e) calcium, and state the group and period of each.", answer: "(a) N 2,5: Group 5, Period 2. (b) Si 2,8,4: Group 4, Period 3. (c) Ar 2,8,8: Group 8 (noble gases), Period 3. (d) K 2,8,8,1: Group 1, Period 4. (e) Ca 2,8,8,2: Group 2, Period 4." },
    { number: 22, kind: "Theory", prompt: "Explain, in terms of electrons, how sodium atoms and chlorine atoms form ions. State the electronic arrangement of each ion and the noble gas it resembles.", answer: "A sodium atom (2,8,1) loses one electron to form Na⁺ (2,8), like neon. A chlorine atom (2,8,7) gains one electron to form Cl⁻ (2,8,8), like argon. Each ion has a full outer shell." },
    { number: 23, kind: "Theory", prompt: "Define isotopy. Give the numbers of protons, neutrons and electrons in ¹²C and ¹⁴C.", answer: "Isotopy is the existence of atoms of the same element with the same atomic number but different mass numbers. ¹²C: 6 protons, 6 neutrons, 6 electrons. ¹⁴C: 6 protons, 8 neutrons, 6 electrons." },
    { number: 24, kind: "Theory", prompt: "Explain why isotopes of an element have the same chemical properties but different physical properties.", answer: "Chemical properties depend on the electrons, and isotopes have the same number and arrangement of electrons. Physical properties such as density and rate of diffusion depend on mass, which differs because the number of neutrons differs." },
    { number: 25, kind: "Theory", prompt: "Boron has two isotopes, ¹⁰B (20%) and ¹¹B (80%). Calculate its relative atomic mass.", answer: "(20 × 10 + 80 × 11) ÷ 100 = (200 + 880) ÷ 100 = 10.8." },
    { number: 26, kind: "Theory", prompt: "Copper has two isotopes, ⁶³Cu and ⁶⁵Cu, and its relative atomic mass is 63.5. Calculate the percentage abundance of each isotope.", answer: "Let x = % of ⁶³Cu. (63x + 65(100 − x)) ÷ 100 = 63.5, so 6500 − 2x = 6350, giving x = 75. The abundances are 75% ⁶³Cu and 25% ⁶⁵Cu." },
    { number: 27, kind: "Theory", prompt: "Describe the stages in the working of a mass spectrometer.", answer: "The sample is vaporised; atoms are bombarded with electrons to form positive ions; the ions are accelerated; a magnetic field deflects them (lighter ions are deflected more); a detector records the mass and relative abundance of each ion." },
    { number: 28, kind: "Theory", prompt: "State four uses of isotopes.", answer: "Carbon-14 for dating ancient objects; iodine-131 to study and treat thyroid disease; cobalt-60 to treat cancer and to sterilise equipment; uranium-235 as nuclear fuel; radioactive tracers to follow chemicals in plants or find leaks (any four)." },
    { number: 29, kind: "Theory", prompt: "Chlorine consists of ³⁵Cl (75%) and ³⁷Cl (25%). Explain why chlorine gas (Cl₂) shows molecules of mass 70, 72 and 74 in the ratio 9 : 6 : 1.", answer: "A molecule can contain two ³⁵Cl (mass 70), one ³⁵Cl and one ³⁷Cl (mass 72) or two ³⁷Cl (mass 74). The probabilities are 0.75 × 0.75 = 0.5625, 2 × 0.75 × 0.25 = 0.375 and 0.25 × 0.25 = 0.0625, which are in the ratio 9 : 6 : 1." },
    { number: 30, kind: "Theory", prompt: "Magnesium has three isotopes: ²⁴Mg (79%), ²⁵Mg (10%) and ²⁶Mg (11%). Calculate its relative atomic mass to two decimal places.", answer: "(79 × 24 + 10 × 25 + 11 × 26) ÷ 100 = (1896 + 250 + 286) ÷ 100 = 24.32." },
  ] as PracticeQuestion[],
};
