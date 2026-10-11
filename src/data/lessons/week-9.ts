import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week9: Lesson = {
  id: "ss1-first-chemistry-week-9",
  week: "Week 09",
  title: "Dalton’s Atomic Theory & Its Modifications",
  subtitle: "Follow the idea of the atom from ancient Greece to Dalton, see why parts of his theory had to change, and meet the models that came next.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Outline the history of the idea of the atom up to Dalton.",
    "Define atom, molecule and ion and give examples of each.",
    "State the postulates of Dalton’s atomic theory.",
    "Explain how the laws of chemical combination support the theory.",
    "State the modifications that later discoveries forced on Dalton’s theory.",
    "Describe the atomic models of Thomson, Rutherford and Bohr and the evidence for the nucleus, and count atoms in formulae and equations.",
  ],
  sections: [
    {
      heading: "1. From ‘atomos’ to Dalton",
      paragraphs: [
        "More than 2,400 years ago the Greek thinker Democritus suggested that if you kept cutting a piece of matter into smaller and smaller parts you would eventually reach a particle that could not be cut again. He called it atomos, meaning ‘uncuttable’. It was only an idea, because he had no experiments to test it. For many centuries most thinkers followed Aristotle, who believed matter was continuous.",
        "In the 1700s careful measurement turned chemistry into a quantitative science. Antoine Lavoisier showed that mass is conserved in a reaction. Joseph Proust showed that a pure compound always has the same composition. In 1803 the English teacher John Dalton used these results to propose an atomic theory that explained them, and he published it in full in 1808. It was the first theory of the atom to be built on experimental evidence.",
      ],
    },
    {
      heading: "2. Atoms, molecules and ions",
      paragraphs: [
        "An atom is the smallest particle of an element that can take part in a chemical reaction. Atoms are so small that about a hundred million of them side by side would measure only a centimetre.",
        "A molecule is a group of two or more atoms joined together by chemical bonds. A molecule of an element contains atoms of the same kind (O₂, N₂, S₈); a molecule of a compound contains atoms of different elements (H₂O, CO₂, CH₄). Noble gases consist of single atoms.",
        "An ion is an atom, or group of atoms, that has gained or lost electrons and so carries a charge. An atom that loses electrons becomes a positive ion (cation), such as Na⁺ or Mg²⁺. An atom that gains electrons becomes a negative ion (anion), such as Cl⁻ or O²⁻. Groups of atoms can also carry a charge, such as OH⁻ and NH₄⁺. Ionic compounds like sodium chloride are made of oppositely charged ions.",
      ],
    },
    {
      heading: "3. Dalton’s atomic theory",
      paragraphs: [
        "Dalton explained his ideas in a set of statements, which we call postulates. In modern wording they are:",
      ],
      points: [
        "All matter is built from extremely small particles called atoms, which Dalton believed could not be divided further.",
        "Atoms are neither made nor destroyed in a chemical change; they are only rearranged.",
        "All atoms of one element are exactly alike, in mass and in every other property, and they differ from the atoms of every other element.",
        "Atoms of different elements join in simple whole-number ratios to form compounds, and a given compound always has the same ratio.",
        "A chemical reaction is the joining, separating or regrouping of atoms.",
      ],
    },
    {
      heading: "4. Evidence for Dalton’s theory: the laws of chemical combination",
      paragraphs: [
        "The theory explained three laws. Law of conservation of mass: if atoms are only rearranged and never created or destroyed, the total mass cannot change. Law of constant composition: if a compound is made from atoms joined in a fixed ratio, its elements are always present in the same proportions by mass. Law of multiple proportions: if atoms combine in simple whole-number ratios, then when two elements form several compounds, the masses of one element combining with a fixed mass of the other form a simple ratio.",
        "Worked example: sulphur forms two oxides. In sulphur dioxide, 32 g of sulphur combines with 32 g of oxygen; in sulphur trioxide, 32 g of sulphur combines with 48 g of oxygen. The masses of oxygen that combine with the same 32 g of sulphur are 32 : 48 = 2 : 3, a simple whole-number ratio, as the law predicts. Dalton’s atoms give the reason: SO₂ has two oxygen atoms for each sulphur, and SO₃ has three.",
      ],
    },
    {
      heading: "5. Modifications of Dalton’s theory",
      paragraphs: [
        "Later work showed that some of Dalton’s postulates were not completely correct. His theory remains a very useful starting point, but we now state it with these changes:",
      ],
      points: [
        "Atoms can be divided. They are made of smaller particles: protons, neutrons and electrons, and even smaller particles inside protons and neutrons.",
        "Atoms of the same element need not be identical. Isotopes are atoms of the same element with the same number of protons but different numbers of neutrons, and so different masses (for example ³⁵Cl and ³⁷Cl).",
        "Atoms of different elements can have the same mass number. Such atoms are called isobars (for example ⁴⁰Ar and ⁴⁰Ca).",
        "Atoms can be changed in nuclear reactions. In radioactive decay and nuclear fission or fusion, one element can turn into another and a small amount of mass changes into energy.",
        "Atoms do not always combine in simple whole-number ratios. Some compounds, such as certain iron oxides, have slightly variable composition (non-stoichiometric compounds).",
        "Atoms are not always bonded in separate molecules. Substances such as sodium chloride or diamond are giant structures with no single molecule.",
      ],
    },
    {
      heading: "6. The models that followed Dalton",
      paragraphs: [
        "J. J. Thomson discovered the electron in 1897 from experiments with cathode rays. In his model, the atom is a ball of positive charge with negative electrons embedded in it, like seeds in a watermelon or raisins in a pudding, so the atom is neutral.",
        "In 1909 Ernest Rutherford’s team fired fast, positively charged alpha particles at a very thin gold foil. Most went straight through, so an atom is mostly empty space. A few were deflected through large angles and a very few bounced almost straight back. This could only happen if all the positive charge and most of the mass were concentrated in a tiny dense centre, the nucleus, with the electrons far outside it. This is the nuclear model.",
        "Niels Bohr (1913) improved it by placing electrons in fixed circular paths, called shells or energy levels, around the nucleus. An electron stays in its shell without losing energy and gains or loses energy only when it jumps between shells. The modern wave-mechanical model describes regions of space, called orbitals, where an electron is most likely to be found.",
      ],
      diagram: "Draw Rutherford’s experiment: a source of alpha particles on the left firing a beam at a thin gold foil. Draw most arrows passing straight through, a few bending away and one bouncing back. Label ‘nucleus’ as a tiny dot inside one gold atom.",
    },
    {
      heading: "7. Counting atoms in formulae and equations",
      paragraphs: [
        "To count atoms, multiply the number in front of a formula (the coefficient) by each subscript, and multiply by the number outside brackets. In Ca(OH)₂ there is 1 calcium, 2 oxygen and 2 hydrogen atoms. In 3Ca(OH)₂ there are 3 calcium, 6 oxygen and 6 hydrogen atoms.",
        "Worked example: 2Al₂(SO₄)₃. Inside one unit: Al = 2, S = 3, O = 4 × 3 = 12. Multiply by 2: Al = 4, S = 6, O = 24. A balanced equation has the same number of each kind of atom on both sides, which is Dalton’s second postulate in action.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Dalton’s theory has errors that you must be able to state: atoms are divisible, isotopes exist, and atoms of different elements can have the same mass.",
    "Do not write that Dalton discovered the electron, proton or nucleus. Thomson found the electron; Rutherford found the nucleus.",
    "Isotopes: same atomic number, different mass number. Isobars: different elements with the same mass number.",
    "Rutherford’s result is explained by three observations: most particles pass through (empty space), a few are deflected (positive nucleus), very few rebound (dense, small nucleus).",
    "Conservation of mass is a property of ordinary chemical reactions. In nuclear reactions a small amount of mass becomes energy.",
    "An ion is not just any charged particle in general. It is an atom or group of atoms that has gained or lost electrons.",
    "In counting atoms, a coefficient multiplies the whole formula, including everything inside the brackets.",
    "Noble gases (helium, neon, argon) are monatomic: their particles are single atoms, not pairs like H₂ or O₂.",
  ],
  summary:
    "The idea of the atom began with Democritus, but Dalton gave the first experimental theory in 1803–1808: matter is made of indivisible atoms, atoms are not created or destroyed, atoms of an element are identical, atoms combine in simple whole-number ratios, and reactions are rearrangements of atoms. The laws of conservation of mass, constant composition and multiple proportions support it. Discoveries of subatomic particles, isotopes, isobars and nuclear reactions led to modifications. Thomson’s plum pudding model, Rutherford’s nuclear model based on the gold-foil experiment and Bohr’s shell model led to the modern orbital model. Atoms in formulae and equations can be counted by combining coefficients and subscripts.",
  quick: {
    intro: "Week 9 revision. Remember Dalton’s ideas, what was wrong with them, and who found what.",
    blocks: [
      {
        heading: "1. Dalton’s postulates",
        points: [
          "Matter is made of tiny atoms that Dalton thought were indivisible.",
          "Atoms are not made or destroyed; reactions only rearrange them.",
          "Atoms of one element are identical; they differ from those of other elements.",
          "Atoms combine in simple whole-number ratios to make compounds.",
          "A chemical reaction is the regrouping of atoms.",
        ],
      },
      {
        heading: "2. What had to change",
        points: [
          "Atoms are divisible (protons, neutrons, electrons).",
          "Isotopes: same element, different masses.",
          "Isobars: different elements, same mass number (⁴⁰Ar, ⁴⁰Ca).",
          "Nuclear reactions change one element into another.",
          "Some compounds are not in exact simple ratios; some substances are giant structures.",
        ],
      },
      {
        heading: "3. Atoms, molecules, ions",
        points: [
          "Atom: smallest particle of an element that can take part in a reaction.",
          "Molecule: atoms bonded together (O₂, H₂O).",
          "Ion: charged atom or group; cation is positive, anion is negative.",
        ],
      },
      {
        heading: "4. Who found what",
        points: [
          "Democritus: the idea of atomos.",
          "Dalton: the first experimental atomic theory.",
          "Thomson: the electron; plum pudding model.",
          "Rutherford: the nucleus (gold foil, alpha particles).",
          "Bohr: electrons in shells.",
        ],
      },
      {
        heading: "5. Gold foil experiment",
        points: [
          "Most alpha particles pass straight through: atoms are mostly empty space.",
          "A few are deflected: the nucleus is positive.",
          "Very few bounce back: the nucleus is tiny and dense.",
        ],
      },
      {
        heading: "6. Laws and counting",
        points: [
          "Conservation of mass; constant composition; multiple proportions (SO₂ and SO₃: oxygen masses 2 : 3 per 32 g S).",
          "Counting atoms: coefficient × subscript × bracket number.",
          "2Al₂(SO₄)₃: Al = 4, S = 6, O = 24.",
        ],
      },
    ],
    likely: [
      { question: "State Dalton’s atomic theory.", answer: "Matter is made of indivisible atoms; atoms are not created or destroyed; atoms of an element are identical and differ from those of other elements; atoms combine in simple whole-number ratios; a reaction is a rearrangement of atoms." },
      { question: "State four modifications made to Dalton’s theory.", answer: "Atoms are divisible; isotopes exist; isobars exist; atoms can be changed in nuclear reactions (also: some compounds have variable composition)." },
      { question: "Define atom, molecule and ion.", answer: "An atom is the smallest particle of an element that can take part in a chemical reaction. A molecule is two or more atoms bonded together. An ion is an atom or group of atoms that carries a charge because it has gained or lost electrons." },
      { question: "What are isotopes? Give an example.", answer: "Atoms of the same element with the same number of protons but different numbers of neutrons, e.g. ³⁵Cl and ³⁷Cl." },
      { question: "What are isobars? Give an example.", answer: "Atoms of different elements with the same mass number, e.g. ⁴⁰Ar and ⁴⁰Ca." },
      { question: "Which scientist discovered the electron, and how?", answer: "J. J. Thomson, using cathode ray tubes (1897)." },
      { question: "Describe Rutherford’s experiment and what it showed.", answer: "Alpha particles were fired at thin gold foil. Most passed through, a few were deflected and very few bounced back, showing that the atom is mostly empty space with a tiny, dense, positive nucleus." },
      { question: "Describe Bohr’s model.", answer: "Electrons move in fixed circular paths (shells or energy levels) around the nucleus and gain or lose energy only when they jump between shells." },
      { question: "Which laws does Dalton’s theory explain?", answer: "The laws of conservation of mass, constant composition and multiple proportions." },
      { question: "How many atoms of each element are in 3Ca(OH)₂?", answer: "3 calcium, 6 oxygen and 6 hydrogen." },
      { question: "What is the thin gold foil experiment evidence for?", answer: "The existence of a small, dense, positively charged nucleus." },
      { question: "Why is the conservation of mass not strictly true in nuclear reactions?", answer: "A small amount of mass is converted into energy." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The Greek word ‘atomos’ means", options: ["small", "uncuttable", "round", "heavy"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Who first put forward an atomic theory based on experimental evidence?", options: ["Democritus", "Aristotle", "John Dalton", "Niels Bohr"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "Which of the following is NOT part of Dalton’s theory?", options: ["Atoms are not created or destroyed in a chemical reaction", "Atoms of one element are identical", "Atoms are made of electrons, protons and neutrons", "Atoms combine in simple whole-number ratios"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "A group of two or more atoms joined together is a", options: ["molecule", "nucleus", "proton", "shell"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "An atom that has lost electrons is a", options: ["negative ion", "positive ion", "molecule", "neutron"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "Which of these is an anion?", options: ["Na⁺", "Mg²⁺", "Cl⁻", "NH₄⁺"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Atoms of the same element with different mass numbers are called", options: ["isobars", "isotopes", "allotropes", "isomers"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "⁴⁰Ar and ⁴⁰Ca are examples of", options: ["isotopes", "isobars", "isomers", "ions"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "The discovery of isotopes showed that Dalton was wrong to say that", options: ["atoms combine in ratios", "all atoms of an element are identical", "atoms exist", "matter has mass"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The electron was discovered by", options: ["Rutherford", "Dalton", "Thomson", "Bohr"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "In Rutherford’s gold foil experiment, most alpha particles passed straight through. This shows that the atom", options: ["is mostly empty space", "is solid", "has no nucleus", "has no electrons"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "A few alpha particles bounced back in Rutherford’s experiment. This shows that", options: ["electrons are heavy", "there is a small, dense, positive nucleus", "the foil was too thick", "alpha particles are neutral"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "Bohr suggested that electrons", options: ["are embedded in the nucleus", "move in fixed energy levels around the nucleus", "have no energy", "are positively charged"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The plum pudding model was proposed by", options: ["Thomson", "Dalton", "Rutherford", "Chadwick"], answer: "A" },
    { number: 15, kind: "Objective", prompt: "The law that supports the idea that atoms are neither created nor destroyed is the law of", options: ["constant composition", "multiple proportions", "conservation of mass", "gaseous volumes"], answer: "C" },
    { number: 16, kind: "Objective", prompt: "In SO₂ and SO₃, the masses of oxygen that combine with a fixed mass of sulphur are in the ratio", options: ["1 : 1", "2 : 3", "1 : 2", "3 : 4"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "The number of oxygen atoms in 2Al₂(SO₄)₃ is", options: ["12", "14", "24", "6"], answer: "C" },
    { number: 18, kind: "Objective", prompt: "How many atoms are in one molecule of H₂SO₄?", options: ["3", "5", "7", "9"], answer: "C" },
    { number: 19, kind: "Objective", prompt: "Which statement is a modification of Dalton’s theory?", options: ["Atoms are indivisible", "Atoms can be changed in nuclear reactions", "All atoms of an element are identical", "Atoms are never rearranged"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "Noble gases exist as", options: ["diatomic molecules", "single atoms", "triatomic molecules", "ions"], answer: "B" },
    { number: 21, kind: "Theory", prompt: "State the postulates of Dalton’s atomic theory.", answer: "Matter is made of tiny indivisible atoms; atoms are neither created nor destroyed in a chemical reaction; all atoms of one element are identical and differ from those of other elements; atoms combine in simple whole-number ratios to form compounds; a chemical reaction is the rearrangement of atoms." },
    { number: 22, kind: "Theory", prompt: "State four ways in which Dalton’s atomic theory was later modified, giving the evidence for two of them.", answer: "Atoms are divisible (discovery of the electron, proton and neutron); isotopes exist (atoms of one element with different masses, e.g. ³⁵Cl and ³⁷Cl); isobars exist; nuclear reactions can change one element into another." },
    { number: 23, kind: "Theory", prompt: "Define atom, molecule and ion, with two examples of ions.", answer: "Atom: the smallest particle of an element that can take part in a chemical reaction. Molecule: a group of atoms bonded together. Ion: an atom or group of atoms that has gained or lost electrons. Examples: Na⁺ and Cl⁻ (also Mg²⁺, O²⁻, OH⁻, NH₄⁺)." },
    { number: 24, kind: "Theory", prompt: "Explain how the law of multiple proportions supports Dalton’s theory, using sulphur dioxide and sulphur trioxide as an example.", answer: "If atoms combine in small whole-number ratios, masses of one element combining with a fixed mass of another must be in simple ratios. In SO₂ and SO₃, 32 g of sulphur combines with 32 g and 48 g of oxygen, a ratio of 2 : 3, which fits two and three oxygen atoms per sulphur atom." },
    { number: 25, kind: "Theory", prompt: "Describe Rutherford’s gold foil experiment and the conclusions drawn from the three observations.", answer: "Alpha particles were fired at a very thin gold foil. Most passed straight through: the atom is mostly empty space. A few were deflected through large angles: the nucleus is positively charged. Very few rebounded: the nucleus is very small and dense, with most of the mass." },
    { number: 26, kind: "Theory", prompt: "Compare the atomic models of Thomson, Rutherford and Bohr.", answer: "Thomson: a positive sphere with electrons embedded in it. Rutherford: a tiny dense positive nucleus with electrons moving around it in empty space. Bohr: electrons move in fixed energy levels (shells) around the nucleus and absorb or emit energy when they jump between them." },
    { number: 27, kind: "Theory", prompt: "Distinguish between isotopes and isobars with an example of each.", answer: "Isotopes are atoms of the same element with the same atomic number but different mass numbers, e.g. ³⁵Cl and ³⁷Cl. Isobars are atoms of different elements with the same mass number but different atomic numbers, e.g. ⁴⁰Ar and ⁴⁰Ca." },
    { number: 28, kind: "Theory", prompt: "Count the atoms of each element in (a) 3Ca(OH)₂ (b) 2Al₂(SO₄)₃ (c) 4NH₄NO₃.", answer: "(a) Ca 3, O 6, H 6. (b) Al 4, S 6, O 24. (c) N 8, H 16, O 12." },
    { number: 29, kind: "Theory", prompt: "In an experiment 6.0 g of magnesium burns to give 10.0 g of magnesium oxide. (a) Find the mass of oxygen that combined. (b) Which law does this illustrate?", answer: "(a) 10.0 − 6.0 = 4.0 g of oxygen. (b) The law of conservation of mass: the total mass of the products equals the total mass of the reactants." },
    { number: 30, kind: "Theory", prompt: "Explain why the law of conservation of mass does not hold exactly for nuclear reactions.", answer: "In nuclear reactions such as fission and fusion a small amount of mass is converted into a large amount of energy, so the mass of the products is slightly less than that of the reactants, unlike ordinary chemical reactions." },
  ] as PracticeQuestion[],
};
