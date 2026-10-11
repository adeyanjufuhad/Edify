import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week12: Lesson = {
  id: "ss1-first-chemistry-week-12",
  week: "Week 12",
  title: "Electronic Configuration",
  subtitle: "Go inside the shells: sub-shells, orbitals, the three filling rules, configurations of atoms and ions, and the four quantum numbers.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Distinguish shells, sub-shells and orbitals and state how many electrons each can hold.",
    "State and apply the Aufbau principle, Pauli exclusion principle and Hund’s rule.",
    "Write the electronic configuration of atoms up to zinc, including the exceptions chromium and copper.",
    "Write the configuration of common ions.",
    "State the four quantum numbers and their permitted values.",
    "Solve problems on unpaired electrons and quantum numbers.",
  ],
  sections: [
    {
      heading: "1. From shells to sub-shells and orbitals",
      paragraphs: [
        "Last week we placed electrons in shells. A closer look shows that each shell is divided into sub-shells, and each sub-shell is made of orbitals. An orbital is a region of space around the nucleus where there is a high probability of finding an electron, and an orbital can hold at most two electrons.",
        "The sub-shells are called s, p, d and f. An s sub-shell has 1 orbital (holding up to 2 electrons), a p sub-shell has 3 orbitals (up to 6 electrons), a d sub-shell has 5 orbitals (up to 10 electrons) and an f sub-shell has 7 orbitals (up to 14 electrons). Shell number n has n kinds of sub-shell: the first shell has only 1s; the second has 2s and 2p; the third has 3s, 3p and 3d; the fourth has 4s, 4p, 4d and 4f.",
        "An s orbital is spherical. A p orbital is dumbbell-shaped, and the three p orbitals in a sub-shell point along three perpendicular axes (px, py and pz). The three p orbitals of one shell have the same energy; orbitals of equal energy are called degenerate.",
      ],
      points: [
        "s: 1 orbital, 2 electrons.  p: 3 orbitals, 6 electrons.",
        "d: 5 orbitals, 10 electrons.  f: 7 orbitals, 14 electrons.",
        "Shell n holds 2n² electrons: 2, 8, 18, 32.",
      ],
    },
    {
      heading: "2. The three rules for filling orbitals",
      paragraphs: [
        "The Aufbau principle (building-up principle) says that electrons enter the orbital of lowest available energy first. The usual order of increasing energy is 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p. Notice that 4s is filled before 3d, because the 4s orbital has slightly lower energy until it is occupied.",
        "The Pauli exclusion principle says that no two electrons in an atom can have the same set of four quantum numbers. In practice, an orbital holds at most two electrons, and these must have opposite spins (shown as one arrow up and one arrow down).",
        "Hund’s rule says that when electrons enter a set of degenerate orbitals, such as the three 2p orbitals, each orbital is occupied by one electron (with the same spin) before any orbital gets a second electron. Electrons repel each other, so they stay apart as long as possible. This is why nitrogen (2p³) has three unpaired electrons.",
      ],
      diagram: "Draw boxes for orbitals in energy order: 1s, 2s, then three boxes for 2p, then 3s, then three boxes for 3p. Show nitrogen: 1s ↑↓, 2s ↑↓ and 2p ↑ ↑ ↑ in separate boxes. Then show oxygen: 2p ↑↓ ↑ ↑.",
    },
    {
      heading: "3. Writing the electronic configuration of atoms",
      paragraphs: [
        "A configuration is written as a list of occupied sub-shells with the number of electrons as a superscript: for example, 1s² 2s² 2p⁶. The total of the superscripts equals the atomic number. Use the filling order and stop when you run out of electrons.",
        "Examples: nitrogen (7) 1s² 2s² 2p³; oxygen (8) 1s² 2s² 2p⁴; sodium (11) 1s² 2s² 2p⁶ 3s¹; chlorine (17) 1s² 2s² 2p⁶ 3s² 3p⁵; potassium (19) 1s² 2s² 2p⁶ 3s² 3p⁶ 4s¹; iron (26) 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s². Writing 3d before 4s, in order of shell number, is normal and acceptable. A shorthand uses the previous noble gas in square brackets: sodium is [Ne] 3s¹ and iron is [Ar] 3d⁶ 4s².",
        "There are two famous exceptions. Chromium (24) is [Ar] 3d⁵ 4s¹, not 3d⁴ 4s², and copper (29) is [Ar] 3d¹⁰ 4s¹, not 3d⁹ 4s². A half-filled (3d⁵) or fully filled (3d¹⁰) d sub-shell is especially stable, so one electron moves from 4s to 3d.",
      ],
    },
    {
      heading: "4. Configuration of ions",
      paragraphs: [
        "To write the configuration of a positive ion, remove electrons from the outermost shell first. This means electrons are removed from 4s before 3d. So Fe is [Ar] 3d⁶ 4s², Fe²⁺ is [Ar] 3d⁶ (the two 4s electrons are lost) and Fe³⁺ is [Ar] 3d⁵. Copper(II): Cu is [Ar] 3d¹⁰ 4s¹, and Cu²⁺ is [Ar] 3d⁹. Zinc: Zn²⁺ is [Ar] 3d¹⁰.",
        "To write the configuration of a negative ion, add electrons to the next available orbital. Chloride, Cl⁻, is 1s² 2s² 2p⁶ 3s² 3p⁶, which is the same as argon. Oxide, O²⁻, is 1s² 2s² 2p⁶, the same as neon. Magnesium ion, Mg²⁺, is 1s² 2s² 2p⁶ and Na⁺ is 1s² 2s² 2p⁶.",
      ],
    },
    {
      heading: "5. The four quantum numbers",
      paragraphs: [
        "Every electron in an atom can be described by four quantum numbers. The principal quantum number n (1, 2, 3 …) gives the shell and its energy and size. The angular momentum (or azimuthal) quantum number l gives the sub-shell and the shape of the orbital: l can be any whole number from 0 to n − 1, where 0 = s, 1 = p, 2 = d and 3 = f.",
        "The magnetic quantum number mₗ gives the orientation of the orbital, and can have any whole-number value from −l to +l, including 0. So an s sub-shell has one orbital (mₗ = 0), a p sub-shell has three (−1, 0, +1) and a d sub-shell has five (−2, −1, 0, +1, +2). The spin quantum number mₛ describes the spin of the electron and can only be +½ or −½.",
        "Example: an electron in a 3s orbital has n = 3, l = 0, mₗ = 0 and mₛ = +½ or −½. An electron in a 2p orbital has n = 2, l = 1, mₗ = −1, 0 or +1, and mₛ = +½ or −½. A set such as n = 2, l = 2 is not allowed, because l must be less than n.",
      ],
    },
    {
      heading: "6. Putting it together: worked problems",
      paragraphs: [
        "Problem 1: how many unpaired electrons are in an iron atom, [Ar] 3d⁶ 4s²? In 3d⁶ the five orbitals receive one electron each (5), and the sixth pairs up, leaving 4 unpaired electrons. Problem 2: how many unpaired electrons are in manganese, [Ar] 3d⁵ 4s²? Five electrons occupy five 3d orbitals singly, so there are 5.",
        "Problem 3: how many electrons in neon have l = 1? Neon is 1s² 2s² 2p⁶, and l = 1 means p electrons, so there are 6. Problem 4: write the configuration of sulphur, Z = 16: 1s² 2s² 2p⁶ 3s² 3p⁴, which has 2 unpaired electrons in 3p.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "An orbital holds a maximum of two electrons, with opposite spins. Do not confuse it with a shell or a sub-shell.",
    "The sum of the superscripts must equal the atomic number (or the number of electrons for an ion).",
    "4s is filled before 3d, but when forming a positive ion, 4s electrons are lost first.",
    "Chromium and copper are exceptions: Cr is 3d⁵ 4s¹ and Cu is 3d¹⁰ 4s¹.",
    "Hund’s rule is about degenerate orbitals: single occupancy first, with parallel spins. This is why N has three unpaired electrons.",
    "l runs from 0 to n − 1 and mₗ from −l to +l. Spin is only +½ or −½.",
    "The Pauli principle in one line: no two electrons have the same four quantum numbers.",
    "For an anion such as Cl⁻, add electrons to the next orbital; Cl⁻ then has the same configuration as argon.",
  ],
  summary:
    "Shells are divided into sub-shells (s, p, d, f) made of orbitals, each holding at most two electrons with opposite spins. Electrons fill orbitals by the Aufbau order, obey the Pauli exclusion principle and, in degenerate orbitals, Hund’s rule. Configurations are written with sub-shell labels and superscripts, with chromium and copper as exceptions, and positive ions lose their outermost electrons first. Each electron is described by the quantum numbers n, l, mₗ and mₛ, which have defined permitted values.",
  quick: {
    intro: "Week 12 revision. Write configurations from the order of filling, then check the superscripts add up to the atomic number.",
    blocks: [
      {
        heading: "1. Sub-shells and orbitals",
        points: [
          "s: 1 orbital, 2 e⁻.  p: 3 orbitals, 6 e⁻.  d: 5 orbitals, 10 e⁻.  f: 7 orbitals, 14 e⁻.",
          "Orbital: maximum 2 electrons, opposite spins.",
          "Shell n holds 2n² electrons.",
        ],
      },
      {
        heading: "2. Order of filling and the rules",
        points: [
          "1s 2s 2p 3s 3p 4s 3d 4p 5s 4d 5p 6s.",
          "Aufbau: lowest energy first.",
          "Pauli: no two electrons with the same four quantum numbers; two per orbital.",
          "Hund: single electrons in degenerate orbitals first, with the same spin.",
        ],
      },
      {
        heading: "3. Configurations to know",
        points: [
          "N 1s² 2s² 2p³;  O 1s² 2s² 2p⁴;  Ne 1s² 2s² 2p⁶.",
          "Na [Ne] 3s¹;  Cl [Ne] 3s² 3p⁵;  K [Ar] 4s¹.",
          "Fe [Ar] 3d⁶ 4s²;  Zn [Ar] 3d¹⁰ 4s².",
          "Exceptions: Cr [Ar] 3d⁵ 4s¹;  Cu [Ar] 3d¹⁰ 4s¹.",
        ],
      },
      {
        heading: "4. Ions",
        points: [
          "Positive ions lose outer electrons first (4s before 3d).",
          "Fe²⁺ [Ar] 3d⁶;  Fe³⁺ [Ar] 3d⁵;  Cu²⁺ [Ar] 3d⁹;  Zn²⁺ [Ar] 3d¹⁰.",
          "Cl⁻ is like argon; O²⁻, F⁻, Na⁺, Mg²⁺ are like neon.",
        ],
      },
      {
        heading: "5. Quantum numbers",
        points: [
          "n = 1, 2, 3 …: shell.",
          "l = 0 to n − 1 (s 0, p 1, d 2, f 3): sub-shell and shape.",
          "mₗ = −l to +l: orbital orientation.",
          "mₛ = +½ or −½: spin.",
        ],
      },
      {
        heading: "6. Unpaired electrons",
        points: [
          "N 3; O 2; Fe 4; Mn 5; Zn 0.",
        ],
      },
    ],
    likely: [
      { question: "Distinguish between a shell, a sub-shell and an orbital.", answer: "A shell is a main energy level (n). A sub-shell (s, p, d, f) is a division of a shell. An orbital is a region in a sub-shell that holds at most two electrons." },
      { question: "State the Pauli exclusion principle.", answer: "No two electrons in an atom can have the same set of four quantum numbers; an orbital holds at most two electrons of opposite spin." },
      { question: "State Hund’s rule.", answer: "Electrons occupy degenerate orbitals singly, with parallel spins, before any orbital is doubly occupied." },
      { question: "State the Aufbau principle.", answer: "Electrons fill the orbitals of lowest energy first." },
      { question: "Write the electronic configuration of oxygen, sodium and chlorine.", answer: "O 1s² 2s² 2p⁴; Na 1s² 2s² 2p⁶ 3s¹; Cl 1s² 2s² 2p⁶ 3s² 3p⁵." },
      { question: "Write the configuration of Fe, Fe²⁺ and Fe³⁺.", answer: "Fe [Ar] 3d⁶ 4s²; Fe²⁺ [Ar] 3d⁶; Fe³⁺ [Ar] 3d⁵." },
      { question: "Why are chromium and copper exceptions?", answer: "A half-filled (3d⁵) or full (3d¹⁰) sub-shell is more stable, so one 4s electron moves into 3d." },
      { question: "State the four quantum numbers.", answer: "Principal (n), azimuthal or angular momentum (l), magnetic (mₗ) and spin (mₛ)." },
      { question: "What values can l take when n = 3?", answer: "0, 1 and 2 (s, p and d)." },
      { question: "How many orbitals are in a p sub-shell and in a d sub-shell?", answer: "3 and 5." },
      { question: "How many unpaired electrons does nitrogen have?", answer: "Three (2p³, one in each 2p orbital)." },
      { question: "Which is filled first, 4s or 3d, and which is lost first when forming a positive ion?", answer: "4s fills first; 4s electrons are lost first." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The maximum number of electrons in a p sub-shell is", options: ["2", "6", "10", "14"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "The number of orbitals in a d sub-shell is", options: ["1", "3", "5", "7"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "The principle which states that two electrons in the same orbital must have opposite spins is the", options: ["Aufbau principle", "Pauli exclusion principle", "Hund’s rule", "Le Chatelier’s principle"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Hund’s rule states that electrons", options: ["fill the highest energy orbital first", "occupy degenerate orbitals singly before pairing", "have the same four quantum numbers", "fill the 3d orbital before the 4s"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "The electronic configuration of oxygen (Z = 8) is", options: ["1s² 2s² 2p⁶", "1s² 2s² 2p⁴", "1s² 2s² 2p⁵", "1s² 2s¹ 2p⁵"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "After the 3p sub-shell is filled, the next to be filled is", options: ["3d", "4s", "4p", "4d"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The configuration of Na⁺ is", options: ["1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁶", "1s² 2s² 2p⁵", "1s² 2s² 2p⁶ 3s²"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The configuration of Cl⁻ is the same as that of", options: ["neon", "argon", "krypton", "sodium"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "The number of unpaired electrons in a nitrogen atom is", options: ["1", "2", "3", "0"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "The number of unpaired electrons in an oxygen atom is", options: ["1", "2", "3", "4"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "The configuration of potassium (Z = 19) is", options: ["[Ar] 4s¹", "[Ar] 3d¹", "[Ne] 3s²", "[Kr] 4s¹"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "Which is the correct configuration of iron (Z = 26)?", options: ["[Ar] 3d⁸", "[Ar] 3d⁶ 4s²", "[Ar] 3d⁵ 4s³", "[Ar] 4s² 4p⁶"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "The actual ground-state configuration of copper (Z = 29) is", options: ["[Ar] 3d⁹ 4s²", "[Ar] 3d¹⁰ 4s¹", "[Ar] 3d⁸ 4s²", "[Ar] 4s² 4p⁹"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The configuration of Fe³⁺ is", options: ["[Ar] 3d⁶", "[Ar] 3d⁵", "[Ar] 3d⁴ 4s¹", "[Ar] 3d³ 4s²"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "The quantum number that describes the shape of an orbital is", options: ["n", "l", "mₗ", "mₛ"], answer: "B" },
    { number: 16, kind: "Objective", prompt: "The possible values of l when n = 3 are", options: ["0 and 1", "0, 1 and 2", "1, 2 and 3", "0, 1, 2 and 3"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "The spin quantum number can have the values", options: ["0 and 1", "+½ and −½", "−1, 0 and +1", "1 and 2"], answer: "B" },
    { number: 18, kind: "Objective", prompt: "The total number of orbitals in the second shell is", options: ["2", "3", "4", "8"], answer: "C", explanation: "One 2s orbital and three 2p orbitals." },
    { number: 19, kind: "Objective", prompt: "Which set of quantum numbers (n, l, mₗ) is NOT allowed?", options: ["2, 1, 0", "3, 2, −2", "2, 2, 0", "1, 0, 0"], answer: "C" },
    { number: 20, kind: "Objective", prompt: "The maximum number of electrons in the third shell is", options: ["8", "10", "18", "32"], answer: "C" },
    { number: 21, kind: "Theory", prompt: "Define shell, sub-shell and orbital. State the number of orbitals and the maximum number of electrons in the s, p, d and f sub-shells.", answer: "A shell is a main energy level (n); a sub-shell (s, p, d, f) is a division of a shell; an orbital is a region of space that holds at most two electrons. s: 1 orbital, 2 electrons; p: 3 orbitals, 6 electrons; d: 5 orbitals, 10 electrons; f: 7 orbitals, 14 electrons." },
    { number: 22, kind: "Theory", prompt: "State the Aufbau principle, the Pauli exclusion principle and Hund’s rule, with one example of each.", answer: "Aufbau: electrons fill the lowest-energy orbitals first (1s before 2s). Pauli: no two electrons have the same four quantum numbers, so an orbital holds two electrons of opposite spin (1s²). Hund: degenerate orbitals are singly occupied before pairing (nitrogen 2p³ has three unpaired electrons)." },
    { number: 23, kind: "Theory", prompt: "Write the electronic configuration of (a) Mg (b) S (c) Ar (d) Ca (e) Cr.", answer: "(a) Mg 1s² 2s² 2p⁶ 3s². (b) S 1s² 2s² 2p⁶ 3s² 3p⁴. (c) Ar 1s² 2s² 2p⁶ 3s² 3p⁶. (d) Ca [Ar] 4s². (e) Cr [Ar] 3d⁵ 4s¹." },
    { number: 24, kind: "Theory", prompt: "Write the configuration of manganese (Z = 25) and zinc (Z = 30) and state the number of unpaired electrons in each.", answer: "Mn [Ar] 3d⁵ 4s²: 5 unpaired electrons. Zn [Ar] 3d¹⁰ 4s²: no unpaired electrons." },
    { number: 25, kind: "Theory", prompt: "Write the electronic configuration of (a) Mg²⁺ (b) S²⁻ (c) Fe²⁺ (d) Cu²⁺ (e) Zn²⁺.", answer: "(a) 1s² 2s² 2p⁶. (b) 1s² 2s² 2p⁶ 3s² 3p⁶. (c) [Ar] 3d⁶. (d) [Ar] 3d⁹. (e) [Ar] 3d¹⁰." },
    { number: 26, kind: "Theory", prompt: "Explain why the configurations of chromium and copper are exceptions to the filling order.", answer: "A half-filled (d⁵) or completely filled (d¹⁰) sub-shell has extra stability. So one electron moves from 4s to 3d, giving Cr [Ar] 3d⁵ 4s¹ and Cu [Ar] 3d¹⁰ 4s¹ instead of 3d⁴ 4s² and 3d⁹ 4s²." },
    { number: 27, kind: "Theory", prompt: "State the four quantum numbers with their permitted values, and give the values for an electron in a 3s orbital.", answer: "n = 1, 2, 3 …; l = 0 to n − 1; mₗ = −l to +l; mₛ = +½ or −½. For a 3s electron: n = 3, l = 0, mₗ = 0, mₛ = +½ or −½." },
    { number: 28, kind: "Theory", prompt: "Draw orbital (box) diagrams for the 2p sub-shell of carbon, nitrogen and oxygen and use them to explain Hund’s rule.", answer: "Carbon 2p²: ↑ ↑ ∅ (two orbitals singly occupied). Nitrogen 2p³: ↑ ↑ ↑. Oxygen 2p⁴: ↑↓ ↑ ↑. Electrons occupy separate degenerate p orbitals with parallel spins before any orbital receives a second electron, because this reduces electron repulsion." },
    { number: 29, kind: "Theory", prompt: "State the possible values of mₗ for a p sub-shell and a d sub-shell and the number of orbitals each represents.", answer: "p: mₗ = −1, 0, +1 (3 orbitals). d: mₗ = −2, −1, 0, +1, +2 (5 orbitals)." },
    { number: 30, kind: "Theory", prompt: "Explain why the 4s orbital is filled before the 3d orbital, yet electrons are removed from 4s first when iron forms Fe²⁺.", answer: "Before the 3d orbitals are occupied, the 4s orbital has slightly lower energy, so it fills first. Once 3d is occupied, the 4s electrons are in the outermost shell and are the first to be lost, so Fe [Ar] 3d⁶ 4s² forms Fe²⁺ [Ar] 3d⁶." },
  ] as PracticeQuestion[],
};
