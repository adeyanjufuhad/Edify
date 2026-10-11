import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const weeks45: Lesson = {
  id: "ss1-first-chemistry-weeks-4-5",
  week: "Weeks 04–05",
  title: "Chemical Symbols & Formulae",
  subtitle: "Write the language of chemistry: symbols, formulae, names, oxidation numbers and balanced equations.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Write the symbols of common elements, including those from Latin names.",
    "Explain atomicity and write the formulae of common elements and compounds.",
    "State the valencies of common elements and radicals and use them to write formulae.",
    "Name compounds using the IUPAC system and work out oxidation numbers.",
    "Calculate empirical and molecular formulae from percentage composition.",
    "State the laws of chemical combination and balance simple chemical equations.",
  ],
  sections: [
    {
      heading: "1. Chemical symbols",
      paragraphs: [
        "A chemical symbol is a short way of writing the name of an element. Symbols are the same in every country, so a chemist in Lagos and one in Tokyo read them in the same way. Most symbols come from the English name: H for hydrogen, C for carbon, O for oxygen, N for nitrogen, S for sulphur. When several elements start with the same letter, a second small letter is added: Ca for calcium, Cl for chlorine, Co for cobalt, Cu for copper.",
        "Two rules always apply. The first letter is a capital letter. The second letter, if there is one, is small. That is why Co (cobalt) and CO (carbon monoxide, a compound of carbon and oxygen) mean different things, and why Cl, not CL, stands for chlorine.",
        "Some symbols come from the Latin names of the elements, which were used for many centuries. You need to know the common ones: sodium Na (natrium), potassium K (kalium), iron Fe (ferrum), copper Cu (cuprum), silver Ag (argentum), gold Au (aurum), lead Pb (plumbum), mercury Hg (hydrargyrum), tin Sn (stannum), antimony Sb (stibium) and tungsten W (wolfram).",
      ],
    },
    {
      heading: "2. Chemical formulae and atomicity",
      paragraphs: [
        "A chemical formula shows the elements present in a substance and the number of atoms of each. The small number written below and to the right of a symbol (the subscript) tells how many atoms of that element are in one unit. In H₂O there are two hydrogen atoms and one oxygen atom; when there is no number, it is 1.",
        "Atomicity is the number of atoms in one molecule of an element. Noble gases such as helium, neon and argon exist as single atoms (monatomic). Hydrogen, nitrogen, oxygen, fluorine, chlorine, bromine and iodine exist as pairs of atoms (diatomic): H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂. Ozone is O₃ (triatomic), phosphorus is P₄ and sulphur is S₈. Metals such as iron and copper and carbon are written simply as Fe, Cu and C.",
        "For an ionic compound the formula shows the simplest ratio of ions, called the formula unit. In NaCl one sodium ion pairs with one chloride ion; in CaCl₂ one calcium ion pairs with two chloride ions. Brackets show a group of atoms taken together: Ca(OH)₂ has one calcium, two oxygen and two hydrogen atoms.",
      ],
    },
    {
      heading: "3. Valency, ions and radicals",
      paragraphs: [
        "The valency of an element is its combining power: the number of electrons an atom loses, gains or shares when it forms a compound. Sodium has valency 1 because it loses one electron; oxygen has valency 2 because it gains two electrons; carbon has valency 4 because it shares four electrons. Some elements have more than one valency: iron can be 2 or 3 and copper 1 or 2, and these are shown in the name by a Roman numeral, as in iron(III) oxide.",
        "An ion is an atom or group of atoms that carries an electrical charge. A positive ion (cation) is formed when atoms lose electrons, and a negative ion (anion) when they gain electrons. A radical is a group of atoms that stays together through a reaction and carries a charge, for example the hydroxide ion OH⁻, the nitrate ion NO₃⁻, the carbonate ion CO₃²⁻, the sulphate ion SO₄²⁻ and the ammonium ion NH₄⁺. Its valency is the size of its charge.",
      ],
      points: [
        "Valency 1: H, Li, Na, K, Ag, F, Cl, Br, I, and the radicals OH⁻, NO₃⁻, HCO₃⁻, MnO₄⁻, NH₄⁺.",
        "Valency 2: Mg, Ca, Ba, Zn, O, S, and the radicals CO₃²⁻, SO₄²⁻, SO₃²⁻, CrO₄²⁻, Cr₂O₇²⁻.",
        "Valency 3: Al, N (in ammonia), P, and the radical PO₄³⁻.",
        "Valency 4: C and Si.",
        "Variable valency: Fe (2, 3), Cu (1, 2), Pb (2, 4), Sn (2, 4), Mn (2 to 7).",
      ],
    },
    {
      heading: "4. Writing a formula by exchanging valencies",
      paragraphs: [
        "A compound has no overall charge, so the total positive charge equals the total negative charge. To write a formula: (1) write the symbols, with the positive part first; (2) write the valency of each; (3) exchange the valencies, so that the valency of one becomes the subscript of the other; (4) cancel any common factor and leave out the number 1.",
        "Example 1: potassium oxide. K has valency 1 and O has 2. Exchanging gives K₂O₁, so the formula is K₂O. Example 2: aluminium sulphate. Al has valency 3 and SO₄ has valency 2. Exchanging gives Al₂(SO₄)₃. The brackets are needed because the radical is taken three times. Example 3: calcium oxide. Ca has valency 2 and O has 2. Exchanging gives Ca₂O₂, which simplifies to CaO. Example 4: zinc trioxonitrate(V). Zn has valency 2 and NO₃ has 1. Exchanging gives Zn(NO₃)₂.",
        "Check your answer: in Al₂(SO₄)₃ the positive charge is 2 × 3 = +6 and the negative charge is 3 × 2 = −6, so the compound is neutral. If the totals do not match, an error has been made.",
      ],
    },
    {
      heading: "5. Naming compounds and oxidation numbers",
      paragraphs: [
        "In the IUPAC system a compound of a metal and a non-metal is named with the metal first and the non-metal second, ending in -ide: sodium chloride, magnesium oxide, calcium sulphide. If the metal has more than one valency, a Roman numeral shows which: iron(II) chloride is FeCl₂ and iron(III) chloride is FeCl₃; copper(I) oxide is Cu₂O and copper(II) oxide is CuO.",
        "Radicals that contain oxygen are named by counting the oxygen atoms with a prefix (di-, tri-, tetra-) followed by the central element with its oxidation number in brackets. So NO₃⁻ is trioxonitrate(V), SO₄²⁻ is tetraoxosulphate(VI), CO₃²⁻ is trioxocarbonate(IV), SO₃²⁻ is trioxosulphate(IV), PO₄³⁻ is tetraoxophosphate(V) and MnO₄⁻ is tetraoxomanganate(VII). Thus CaCO₃ is calcium trioxocarbonate(IV) and Na₂SO₄ is sodium tetraoxosulphate(VI).",
        "The oxidation number of an atom is the charge it would have if all its bonds were ionic. Rules: (1) an atom in an uncombined element is 0 (Cl₂, Fe, S₈); (2) a simple ion has an oxidation number equal to its charge (Mg²⁺ is +2); (3) in compounds, Group 1 metals are +1 and Group 2 metals are +2; (4) hydrogen is +1 (except in metal hydrides, −1); (5) oxygen is −2 (except in peroxides, −1); (6) the sum of the oxidation numbers is 0 in a neutral compound and equals the charge in an ion.",
        "Worked example: the oxidation number of phosphorus in H₃PO₄. Let it be x. Then 3(+1) + x + 4(−2) = 0, so 3 + x − 8 = 0 and x = +5. The name of the radical is therefore tetraoxophosphate(V). Another: chromium in Cr₂O₇²⁻. 2x + 7(−2) = −2, so 2x = +12 and x = +6.",
      ],
    },
    {
      heading: "6. Empirical and molecular formulae",
      paragraphs: [
        "The empirical formula shows the simplest whole-number ratio of atoms in a compound. The molecular formula shows the actual number of atoms in one molecule and is a whole-number multiple of the empirical formula. Glucose has the molecular formula C₆H₁₂O₆ and the empirical formula CH₂O. Ethene (C₂H₄) has the empirical formula CH₂.",
        "To find an empirical formula from percentage composition: (1) write the percentage (or mass) of each element; (2) divide each by its relative atomic mass to get the number of moles of atoms; (3) divide all by the smallest to get a ratio; (4) if a ratio is not whole, multiply all by the smallest number that makes them whole. To get the molecular formula, divide the relative molecular mass by the empirical formula mass to find the multiplier n.",
        "Worked example: a compound contains 85.7% carbon and 14.3% hydrogen and has relative molecular mass 28 (C = 12, H = 1). Moles: C = 85.7 ÷ 12 = 7.14, H = 14.3 ÷ 1 = 14.3. Dividing by 7.14 gives C : H = 1 : 2, so the empirical formula is CH₂ with mass 14. Then n = 28 ÷ 14 = 2 and the molecular formula is C₂H₄.",
      ],
    },
    {
      heading: "7. Laws of chemical combination",
      paragraphs: [
        "The law of conservation of mass says that matter can be neither created nor destroyed in a chemical reaction, so the total mass of the reactants equals the total mass of the products. When 25.0 g of calcium carbonate is heated strongly and 14.0 g of calcium oxide remains, 25.0 − 14.0 = 11.0 g of carbon dioxide escaped as gas.",
        "The law of constant composition says that a pure compound always contains the same elements in the same proportion by mass, however it is made. Water from a river, a well or burning hydrogen always contains hydrogen and oxygen in a mass ratio of 1 : 8.",
        "The law of multiple proportions says that when two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a simple whole-number ratio. Carbon forms CO and CO₂. In CO, 12 g of carbon combines with 16 g of oxygen; in CO₂ it combines with 32 g. The ratio of the oxygen masses is 16 : 32 = 1 : 2.",
      ],
    },
    {
      heading: "8. Balancing chemical equations",
      paragraphs: [
        "A chemical equation shows reactants on the left and products on the right, joined by an arrow. By the law of conservation of mass, the number of atoms of each element must be the same on both sides. We balance by writing numbers (coefficients) in front of formulae, never by changing the subscripts inside a formula.",
        "Steps: write the correct formulae; count the atoms of each element on both sides; balance the elements that appear in only one substance on each side first, leaving hydrogen and oxygen until last; check again. Gases such as O₂, H₂, N₂ and Cl₂ are written as diatomic molecules.",
        "Worked example: aluminium burning in oxygen. Al + O₂ → Al₂O₃. Oxygen has 2 atoms on the left and 3 on the right, so make both 6 by writing 3O₂ and 2Al₂O₃. Now the right side has 4 aluminium atoms, so write 4Al on the left: 4Al + 3O₂ → 2Al₂O₃. Another: burning propane. C₃H₈ + O₂ → CO₂ + H₂O. Balance carbon with 3CO₂, hydrogen with 4H₂O, then count oxygen on the right (6 + 4 = 10), so use 5O₂: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Symbols: the first letter is capital, the second small. Co is cobalt; CO is carbon monoxide. Graders mark this.",
    "Do not change a subscript to balance an equation. That changes the substance. Only change coefficients.",
    "Atomicity: H₂, N₂, O₂, F₂, Cl₂, Br₂ and I₂ are diatomic. A free atom written as O or H in an equation is usually wrong.",
    "When a radical is needed more than once, put it in brackets: Ca(OH)₂, not CaOH₂.",
    "A Roman numeral in a name is the oxidation number or valency of the metal: iron(III) chloride is FeCl₃, not Fe₃Cl.",
    "In IUPAC names of oxo-radicals, the number in brackets is the oxidation number of the central element, not the charge: SO₄²⁻ is tetraoxosulphate(VI).",
    "After you cross-multiply valencies, always simplify: Ca₂O₂ becomes CaO. Check the charges add to zero.",
    "For the molecular formula you need the relative molecular mass. The empirical formula alone is not enough.",
  ],
  summary:
    "Symbols use one capital letter or a capital followed by a small one, and some come from Latin names. Formulae show the number of atoms; some elements are diatomic. Valency is combining power, and exchanging valencies gives formulae that must have zero total charge. Compounds are named by IUPAC rules, using Roman numerals and oxidation numbers worked out from fixed rules. Empirical formulae come from percentage composition and molecular formulae need the relative molecular mass. The laws of conservation of mass, constant composition and multiple proportions explain why equations must be balanced using coefficients.",
  quick: {
    intro: "Revision sheet for Weeks 4 and 5. Learn the valency table and the working steps. Most marks are for method.",
    blocks: [
      {
        heading: "1. Symbols",
        points: [
          "First letter capital, second small: Co ≠ CO.",
          "Latin: Na natrium, K kalium, Fe ferrum, Cu cuprum, Ag argentum, Au aurum, Pb plumbum, Hg hydrargyrum, Sn stannum, Sb stibium, W wolfram.",
        ],
      },
      {
        heading: "2. Formulae and atomicity",
        points: [
          "Monatomic: He, Ne, Ar. Diatomic: H₂, N₂, O₂, F₂, Cl₂, Br₂, I₂. Also O₃, P₄, S₈.",
          "Subscript = number of atoms. Brackets group a radical: Ca(OH)₂.",
        ],
      },
      {
        heading: "3. Valency table",
        points: [
          "1: H, Li, Na, K, Ag, F, Cl, Br, I; OH⁻, NO₃⁻, HCO₃⁻, MnO₄⁻, NH₄⁺.",
          "2: Mg, Ca, Ba, Zn, O, S; CO₃²⁻, SO₄²⁻, SO₃²⁻, CrO₄²⁻, Cr₂O₇²⁻.",
          "3: Al, P (in phosphides), N (in ammonia); PO₄³⁻.  4: C, Si.",
          "Variable: Fe 2 or 3, Cu 1 or 2, Pb 2 or 4, Sn 2 or 4.",
        ],
      },
      {
        heading: "4. Writing a formula",
        points: [
          "Symbols → valencies → exchange → simplify → check charge = 0.",
          "Al³⁺ + SO₄²⁻ → Al₂(SO₄)₃. Ca²⁺ + O²⁻ → CaO (not Ca₂O₂).",
        ],
      },
      {
        heading: "5. Oxidation numbers and names",
        points: [
          "Element = 0; simple ion = its charge; group 1 = +1; group 2 = +2; H = +1; O = −2; sum = 0 (or the ion charge).",
          "NO₃⁻ trioxonitrate(V); SO₄²⁻ tetraoxosulphate(VI); CO₃²⁻ trioxocarbonate(IV); SO₃²⁻ trioxosulphate(IV); PO₄³⁻ tetraoxophosphate(V); MnO₄⁻ tetraoxomanganate(VII).",
        ],
        warning: "Peroxides have oxygen at −1 and metal hydrides have hydrogen at −1.",
      },
      {
        heading: "6. Empirical and molecular formula",
        points: [
          "% → ÷ atomic mass → ÷ smallest → whole-number ratio = empirical formula.",
          "n = relative molecular mass ÷ empirical formula mass. Molecular formula = (empirical formula)ₙ.",
        ],
      },
      {
        heading: "7. Laws and equations",
        points: [
          "Conservation of mass: mass of reactants = mass of products.",
          "Constant composition: a pure compound has fixed proportions by mass.",
          "Multiple proportions: simple whole-number ratios (CO and CO₂: 1 : 2 for oxygen).",
          "Balance with coefficients only; hydrogen and oxygen last.",
        ],
      },
    ],
    likely: [
      { question: "Write the symbols for sodium, potassium, silver, lead and mercury and give the Latin names.", answer: "Na natrium, K kalium, Ag argentum, Pb plumbum, Hg hydrargyrum." },
      { question: "State two rules for writing chemical symbols.", answer: "The first letter is a capital letter and the second letter, if any, is small." },
      { question: "What is atomicity? Give two diatomic and two monatomic examples.", answer: "The number of atoms in a molecule of an element. Diatomic: O₂, Cl₂. Monatomic: He, Ne." },
      { question: "Define valency. State the valencies of Na, Mg, Al, C, OH, SO₄ and PO₄.", answer: "Valency is the combining power of an element or radical. Na 1, Mg 2, Al 3, C 4, OH 1, SO₄ 2, PO₄ 3." },
      { question: "Write the formulae of calcium hydroxide, aluminium oxide and ammonium sulphate.", answer: "Ca(OH)₂, Al₂O₃ and (NH₄)₂SO₄." },
      { question: "What is an oxidation number? State three rules for finding it.", answer: "The charge an atom would have if its bonds were ionic. Elements are 0; oxygen is −2 (except peroxides); hydrogen is +1 (except metal hydrides); the sum is 0 in a neutral compound and equals the charge in an ion." },
      { question: "Name the compounds: FeCl₃, CuO, CaCO₃, Na₂SO₄.", answer: "Iron(III) chloride, copper(II) oxide, calcium trioxocarbonate(IV), sodium tetraoxosulphate(VI)." },
      { question: "Define empirical formula and molecular formula.", answer: "The empirical formula is the simplest whole-number ratio of atoms. The molecular formula gives the actual number of atoms in one molecule." },
      { question: "State the law of conservation of mass.", answer: "Matter can be neither created nor destroyed in a chemical reaction; the total mass of reactants equals the total mass of products." },
      { question: "State the law of constant composition.", answer: "A pure compound always contains the same elements combined in the same proportion by mass." },
      { question: "State the law of multiple proportions with an example.", answer: "When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio, e.g. CO and CO₂ (oxygen masses 16 g and 32 g per 12 g carbon, ratio 1 : 2)." },
      { question: "Balance: Al + O₂ → Al₂O₃.", answer: "4Al + 3O₂ → 2Al₂O₃." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The symbol for potassium is", options: ["P", "K", "Po", "Pt"], answer: "B", explanation: "K comes from the Latin name kalium." },
    { number: 2, kind: "Objective", prompt: "The symbol Pb stands for", options: ["phosphorus", "lead", "potassium", "platinum"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Which symbol represents silver?", options: ["Si", "Sn", "Ag", "Au"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "The formula of oxygen gas is", options: ["O", "O₂", "O₃", "2O"], answer: "B", explanation: "Oxygen is diatomic." },
    { number: 5, kind: "Objective", prompt: "The valency of aluminium is", options: ["1", "2", "3", "4"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "The formula of calcium chloride is", options: ["CaCl", "CaCl₂", "Ca₂Cl", "Ca₂Cl₂"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The formula of aluminium oxide is", options: ["AlO", "Al₂O₃", "Al₃O₂", "AlO₃"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The formula of sodium trioxocarbonate(IV) is", options: ["NaCO₃", "Na₂CO₃", "Na₂(CO₃)₂", "Na(CO₃)₂"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "The formula of ammonium sulphate is", options: ["NH₄SO₄", "(NH₄)₂SO₄", "NH₄(SO₄)₂", "(NH₃)₂SO₄"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The oxidation number of sulphur in H₂SO₄ is", options: ["+2", "+4", "+6", "−2"], answer: "C", explanation: "2(+1) + x + 4(−2) = 0, so x = +6." },
    { number: 11, kind: "Objective", prompt: "The oxidation number of manganese in KMnO₄ is", options: ["+2", "+5", "+6", "+7"], answer: "D", explanation: "(+1) + x + 4(−2) = 0, so x = +7." },
    { number: 12, kind: "Objective", prompt: "The name of Fe₂O₃ is", options: ["iron(II) oxide", "iron(III) oxide", "iron trioxide", "diiron oxide"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "The IUPAC name of CaCO₃ is", options: ["calcium carbonate(IV)", "calcium trioxocarbonate(IV)", "calcium tetraoxocarbonate(IV)", "calcium carbon trioxide"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The empirical formula of benzene, C₆H₆, is", options: ["CH", "C₂H₂", "C₃H₃", "C₆H₆"], answer: "A" },
    { number: 15, kind: "Objective", prompt: "A compound has empirical formula CH₂ and relative molecular mass 56. Its molecular formula is [H = 1, C = 12]", options: ["C₂H₄", "C₃H₆", "C₄H₈", "C₅H₁₀"], answer: "C", explanation: "n = 56 ÷ 14 = 4." },
    { number: 16, kind: "Objective", prompt: "The law which states that matter can neither be created nor destroyed in a chemical reaction is the law of", options: ["constant composition", "multiple proportions", "conservation of mass", "reciprocal proportions"], answer: "C" },
    { number: 17, kind: "Objective", prompt: "Water from a river and from a well both contain hydrogen and oxygen in the mass ratio 1 : 8. This illustrates the law of", options: ["conservation of mass", "constant composition", "multiple proportions", "gaseous volumes"], answer: "B" },
    { number: 18, kind: "Objective", prompt: "In CO and CO₂, 12 g of carbon combines with 16 g and 32 g of oxygen respectively. The ratio 1 : 2 illustrates the law of", options: ["multiple proportions", "constant composition", "conservation of mass", "definite volumes"], answer: "A" },
    { number: 19, kind: "Objective", prompt: "Which equation is balanced?", options: ["H₂ + O₂ → H₂O", "2H₂ + O₂ → 2H₂O", "H₂ + 2O₂ → 2H₂O", "2H₂ + 2O₂ → 2H₂O"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "In the equation C₃H₈ + xO₂ → 3CO₂ + 4H₂O, the value of x is", options: ["3", "4", "5", "7"], answer: "C" },
    { number: 21, kind: "Theory", prompt: "(a) Write the symbol and Latin name for sodium, potassium, iron, copper and lead. (b) State two rules for writing chemical symbols. (c) Explain the difference between Co and CO.", answer: "(a) Na natrium, K kalium, Fe ferrum, Cu cuprum, Pb plumbum. (b) The first letter is a capital letter; the second letter, if any, is small. (c) Co is the element cobalt; CO is the compound carbon monoxide made of carbon (C) and oxygen (O)." },
    { number: 22, kind: "Theory", prompt: "(a) Define valency and radical. (b) Write the name, formula and charge of the radicals hydroxide, nitrate, carbonate, sulphate and ammonium.", answer: "(a) Valency is the combining power of an element or radical. A radical is a group of atoms that stays together in reactions and carries a charge. (b) Hydroxide OH⁻; nitrate NO₃⁻; carbonate CO₃²⁻; sulphate SO₄²⁻; ammonium NH₄⁺." },
    { number: 23, kind: "Theory", prompt: "Write the formula of each compound: (a) potassium oxide (b) zinc chloride (c) iron(III) hydroxide (d) magnesium trioxonitrate(V) (e) sodium tetraoxosulphate(VI) (f) ammonium chloride.", answer: "(a) K₂O (b) ZnCl₂ (c) Fe(OH)₃ (d) Mg(NO₃)₂ (e) Na₂SO₄ (f) NH₄Cl." },
    { number: 24, kind: "Theory", prompt: "(a) Describe the steps for writing a chemical formula by exchanging valencies. (b) Element P has valency 4 and element Q has valency 1. Write the formula of the compound they form and give a real example.", answer: "(a) Write the symbols with the positive part first; write each valency; exchange them as subscripts; simplify and check that the charges add up to zero. (b) PQ₄, for example CCl₄ (carbon tetrachloride)." },
    { number: 25, kind: "Theory", prompt: "Calculate the oxidation number of (a) N in HNO₃ (b) Cr in CrO₄²⁻ (c) S in SO₃²⁻ (d) Cl in HClO₄ (e) C in CO₂.", answer: "(a) 1 + x − 6 = 0, x = +5. (b) x − 8 = −2, x = +6. (c) x − 6 = −2, x = +4. (d) 1 + x − 8 = 0, x = +7. (e) x − 4 = 0, x = +4." },
    { number: 26, kind: "Theory", prompt: "Write the IUPAC name of (a) Fe(OH)₂ (b) CuO (c) K₂Cr₂O₇ (d) Na₂SO₃ (e) NH₄NO₃ (f) Pb(NO₃)₂.", answer: "(a) Iron(II) hydroxide (b) copper(II) oxide (c) potassium heptaoxodichromate(VI) (d) sodium trioxosulphate(IV) (e) ammonium trioxonitrate(V) (f) lead(II) trioxonitrate(V)." },
    { number: 27, kind: "Theory", prompt: "A compound contains 40.0% carbon, 6.7% hydrogen and 53.3% oxygen and has relative molecular mass 180. Calculate its empirical formula and molecular formula. [H = 1, C = 12, O = 16]", answer: "Moles: C = 40.0 ÷ 12 = 3.33; H = 6.7 ÷ 1 = 6.7; O = 53.3 ÷ 16 = 3.33. Dividing by 3.33 gives C : H : O = 1 : 2 : 1, so the empirical formula is CH₂O (mass 30). n = 180 ÷ 30 = 6, so the molecular formula is C₆H₁₂O₆." },
    { number: 28, kind: "Theory", prompt: "A hydrocarbon contains 85.7% carbon and 14.3% hydrogen and has relative molecular mass 56. Find its empirical and molecular formulae. [H = 1, C = 12]", answer: "C = 85.7 ÷ 12 = 7.14; H = 14.3 ÷ 1 = 14.3. Dividing by 7.14 gives C : H = 1 : 2, so the empirical formula is CH₂ (mass 14). n = 56 ÷ 14 = 4, so the molecular formula is C₄H₈." },
    { number: 29, kind: "Theory", prompt: "Balance each equation: (a) Mg + O₂ → MgO (b) Al + O₂ → Al₂O₃ (c) Fe₂O₃ + CO → Fe + CO₂ (d) C₂H₆ + O₂ → CO₂ + H₂O (e) Ca(OH)₂ + HCl → CaCl₂ + H₂O.", answer: "(a) 2Mg + O₂ → 2MgO (b) 4Al + 3O₂ → 2Al₂O₃ (c) Fe₂O₃ + 3CO → 2Fe + 3CO₂ (d) 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O (e) Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O." },
    { number: 30, kind: "Theory", prompt: "(a) State the law of conservation of mass. (b) When 25.0 g of calcium carbonate is heated strongly, 14.0 g of calcium oxide remains. Calculate the mass of carbon dioxide given off. (c) State the law of multiple proportions and give an example.", answer: "(a) Matter is neither created nor destroyed in a chemical reaction, so the total mass of the reactants equals the total mass of the products. (b) 25.0 − 14.0 = 11.0 g of carbon dioxide. (c) When two elements form more than one compound, the masses of one that combine with a fixed mass of the other are in a simple whole-number ratio; e.g. CO and CO₂, where 12 g of carbon combines with 16 g and 32 g of oxygen, a ratio of 1 : 2." },
  ] as PracticeQuestion[],
};
