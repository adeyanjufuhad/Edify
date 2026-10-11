import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const weeks67: Lesson = {
  id: "ss1-first-chemistry-weeks-6-7",
  week: "Weeks 06–07",
  title: "Separation Techniques",
  subtitle: "Learn how to pull a mixture apart by choosing the physical property that makes its parts different.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Explain why mixtures are separated and the idea behind every method.",
    "Describe decantation, filtration, evaporation, crystallisation, distillation, sublimation and the use of a separating funnel and a magnet.",
    "Describe paper chromatography and calculate an Rf value.",
    "Choose a suitable method for a given mixture and describe the apparatus.",
    "Use melting point, boiling point and chromatography to judge whether a substance is pure.",
    "Plan the separation of a mixture of several substances in the correct order.",
  ],
  sections: [
    {
      heading: "1. The idea behind every separation",
      paragraphs: [
        "The parts of a mixture are only physically mixed, so they keep their own properties. A separation method works by finding a physical property in which the parts differ, such as size of particles, solubility, boiling point, magnetism or the ability to sublime, and then using that difference. Always ask first: how are the substances different from each other?",
        "We separate mixtures for three main reasons: to obtain a useful substance, to remove an unwanted one (such as sand from water), and to check how pure a substance is. Almost all separations are physical changes, so the separated parts are chemically unchanged.",
      ],
    },
    {
      heading: "2. Insoluble solid from a liquid",
      paragraphs: [
        "Sedimentation and decantation: if a solid is heavy it settles at the bottom when the mixture is left standing. The liquid can then be poured off carefully without disturbing the solid, which is decantation. Mud settling out of river water and starch settling from grated cassava soaked in water are examples. It is quick but not complete.",
        "Filtration: the mixture is poured through filter paper in a funnel. Small liquid particles pass through the tiny holes in the paper, but the larger solid particles are trapped. The solid left on the paper is the residue and the clear liquid that passes through is the filtrate. Filtration separates sand from water, chalk powder from water and tea leaves from tea.",
        "Centrifugation spins a mixture quickly so the denser solid is thrown to the bottom of the tube. It is used in hospitals to separate blood cells from plasma.",
      ],
      diagram: "Draw a conical flask with a filter funnel resting in its neck. Draw folded filter paper in the funnel with sand (residue) on the paper and clear liquid (filtrate) dripping into the flask. Label residue, filter paper, funnel and filtrate.",
    },
    {
      heading: "3. A dissolved solid from a solution",
      paragraphs: [
        "A dissolved solid passes straight through filter paper, so we use differences in boiling point instead. Evaporation to dryness: the solution is heated in an evaporating dish until all the water has gone and the solid is left. It is used when only the solid is wanted and heating will not damage it. Large amounts of salt are made from sea water in shallow pans by the heat of the sun.",
        "Crystallisation: when the solid would be damaged by strong heating, or when we want large, pure crystals, the solution is heated only until it is saturated (the first crystals begin to appear on a glass rod dipped in the solution). It is then left to cool slowly. Less solid dissolves in cold water, so crystals form and are filtered off, washed with a little cold water and dried between filter papers. Copper(II) sulphate crystals are made this way.",
      ],
    },
    {
      heading: "4. Separating liquids from each other",
      paragraphs: [
        "Immiscible liquids (liquids that do not mix), such as palm oil and water, form two layers. A separating funnel is used: the stopper is removed, the tap opened and the lower, denser liquid run out into a beaker. Close the tap before the upper liquid follows.",
        "Simple distillation separates a liquid from a dissolved solid, or a pure liquid from a mixture where the other substances boil at much higher temperatures. The solution is heated in a distillation flask. The liquid boils, and its vapour passes into a Liebig condenser, where it is cooled by water flowing in at the bottom and out at the top, and condenses into the pure liquid called the distillate. The solid stays behind. The thermometer bulb is placed level with the side arm to read the temperature of the vapour. Distilled water is made from tap water in this way, and fresh water can be obtained from sea water.",
        "Fractional distillation separates liquids that mix and boil at different but close temperatures. A fractionating column packed with glass beads is fitted between the flask and condenser. Vapour rises through the column, the less volatile liquid condenses and runs back, and the more volatile liquid reaches the top first. Ethanol (boiling point 78 °C) can be separated from water (100 °C) this way, as in the production of strong spirits from palm wine. The same principle is used on a huge scale to separate crude oil into petrol, kerosene, diesel and other fractions, and to separate liquid air into nitrogen, argon and oxygen.",
      ],
      diagram: "Draw a round-bottom flask on a tripod and gauze with a Bunsen burner below. Fit a thermometer in the neck with its bulb level with the side arm. Connect a Liebig condenser sloping downwards, with water in at the bottom and out at the top, and a receiving flask at the end for the distillate.",
    },
    {
      heading: "5. Separating solids from solids",
      paragraphs: [
        "Using magnetism: iron, cobalt and nickel are attracted to a magnet, so iron filings can be pulled out of a mixture with sulphur or sand. Using sublimation: a mixture containing ammonium chloride, iodine or naphthalene can be heated gently; the one that sublimes turns directly to vapour and re-forms as a solid on a cold surface, such as a cold watch glass or funnel above the dish.",
        "Using solubility: if one solid dissolves in water and the other does not, add water, stir, filter and then evaporate the filtrate. Sand and salt are separated in this way: sand is the residue and salt is recovered from the filtrate. Other methods include sieving (different particle sizes, such as sand and gravel), winnowing (the wind blows away light chaff from heavier grain), hand-picking stones from beans, and flotation.",
      ],
    },
    {
      heading: "6. Chromatography",
      paragraphs: [
        "Chromatography separates substances dissolved in a mixture, such as the dyes in an ink or in a food colouring. In paper chromatography a small spot of the mixture is placed on a pencil line (the baseline) near the bottom of a strip of filter paper. The strip hangs in a covered container so that the bottom edge dips in a solvent, below the baseline. The solvent creeps up the paper and carries the dyes with it. Each dye travels at its own speed because it dissolves in the solvent to a different extent and is held on the paper to a different extent. The substance that is more soluble and less strongly held travels further.",
        "The baseline is drawn in pencil, not in ink, because ink would itself separate into coloured spots. When the solvent front is near the top, the paper is removed and the position of the front marked at once. The result is a chromatogram. A pure substance gives one spot; a mixture gives more than one.",
        "The Rf value compares how far a substance travelled with how far the solvent travelled: Rf = distance moved by the substance ÷ distance moved by the solvent front. Both distances are measured from the baseline, and Rf has no unit and is always less than 1. Worked example: a dye spot is 3.0 cm from the baseline and the solvent front is 8.0 cm from it, so Rf = 3.0 ÷ 8.0 = 0.375 (about 0.38). The same substance gives the same Rf in the same solvent, so it can be used to identify unknown dyes. Chromatography is also used to test drugs and food additives and to identify amino acids.",
      ],
      diagram: "Draw a tall jar with a lid. Inside, show a paper strip hanging from the lid with its lower edge in a shallow solvent. Draw a pencil baseline above the solvent level with three coloured spots on it, and a solvent front near the top. Mark the distance of one spot and of the solvent front from the baseline.",
    },
    {
      heading: "7. How do we know a substance is pure?",
      paragraphs: [
        "A pure substance contains only one kind of substance. It has a sharp, fixed melting point and boiling point. Pure ice melts at exactly 0 °C and pure water boils at 100 °C at normal pressure. Impurities lower the melting point, raise the boiling point and make the change happen over a range of temperatures instead of at a single point. Salt is added to roads in cold countries because it lowers the melting point of ice.",
        "A single spot on a chromatogram is another sign of purity. Chemists use melting and boiling points to check purity, because even a small amount of impurity changes them.",
      ],
    },
    {
      heading: "8. Planning a separation, and why air is a mixture",
      paragraphs: [
        "To separate several substances, remove them in an order that uses one property at a time. Worked example: a mixture of iron filings, ammonium chloride, sodium chloride and sand. (1) Pass a magnet over the mixture to remove the iron. (2) Heat the remainder gently; ammonium chloride sublimes and collects on a cold surface. (3) Add water to what is left and stir; the sodium chloride dissolves. (4) Filter; sand is the residue. (5) Evaporate the filtrate to recover sodium chloride.",
        "Air is a mixture, not a compound. Its gases are mixed in no fixed ratio, they keep their own properties, and they can be separated by physical means, by cooling air to a liquid and then fractionally distilling it. Roughly four-fifths of air is nitrogen and one-fifth is oxygen, with small amounts of argon, carbon dioxide, water vapour and other gases.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Learn the three words: residue (what stays on the filter paper), filtrate (what passes through) and distillate (what is collected from a condenser).",
    "Filtration will not separate a dissolved solid from water. Use evaporation, crystallisation or distillation.",
    "For simple distillation, the thermometer bulb is level with the side arm. It measures the vapour, not the liquid.",
    "Condenser water enters at the bottom and leaves at the top.",
    "Use fractional distillation when both liquids mix and boil at close temperatures. Use simple distillation for a solid dissolved in a liquid.",
    "Chromatography baseline: pencil, not ink, and above the solvent level. Rf = distance moved by substance ÷ distance moved by solvent front, so it is less than 1 and has no unit.",
    "Crystallisation stops when the solution is saturated; evaporation to dryness removes all the water. Do not confuse them.",
    "In planning an order of separation, use the physical property that removes only one substance at a time, starting with the easiest (magnet, sublimation) and ending with evaporation.",
  ],
  summary:
    "Mixtures are separated by using physical differences between their parts. Decantation, filtration and centrifugation separate insoluble solids from liquids. Evaporation and crystallisation recover dissolved solids. A separating funnel splits immiscible liquids; simple distillation separates a liquid from a dissolved solid; fractional distillation separates miscible liquids with different boiling points. Magnets, sublimation, solubility and sieving separate solids. Chromatography separates dissolved substances, with Rf = distance moved by substance ÷ distance moved by solvent. Pure substances have sharp melting and boiling points. Several substances are separated one property at a time, and air is a mixture that can be separated physically.",
  quick: {
    intro: "Revision sheet for Weeks 6 and 7. For each question, name the mixture, then the property that differs, then the method.",
    blocks: [
      {
        heading: "1. Method → mixture → property",
        points: [
          "Decantation: heavy insoluble solid in liquid; density.",
          "Filtration: insoluble solid in liquid; particle size.",
          "Evaporation: dissolved solid wanted; solid does not boil.",
          "Crystallisation: pure crystals; solubility falls on cooling.",
          "Simple distillation: solvent from a solution; boiling point.",
          "Fractional distillation: mixed liquids with close boiling points.",
          "Separating funnel: immiscible liquids; density.",
          "Chromatography: dissolved substances; different solubility and attraction to the paper.",
        ],
      },
      {
        heading: "2. Solid + solid",
        points: [
          "Magnet: iron, cobalt, nickel.",
          "Sublimation: ammonium chloride, iodine, naphthalene.",
          "Dissolve, filter, evaporate: salt and sand.",
          "Sieving: different particle sizes. Winnowing: chaff and grain.",
        ],
      },
      {
        heading: "3. Chromatography",
        points: [
          "Pencil baseline above the solvent; cover the container.",
          "Rf = distance moved by substance ÷ distance moved by solvent front.",
          "One spot = probably pure. Same Rf in the same solvent = same substance.",
        ],
      },
      {
        heading: "4. Separate iron + ammonium chloride + sodium chloride + sand",
        points: [
          "1: magnet removes iron.",
          "2: heat gently; ammonium chloride sublimes.",
          "3: add water to dissolve sodium chloride.",
          "4: filter; sand is the residue.",
          "5: evaporate the filtrate to get sodium chloride.",
        ],
      },
      {
        heading: "5. Purity",
        points: [
          "Pure: sharp melting point (ice 0 °C) and boiling point (water 100 °C).",
          "Impure: melting point lowered, boiling point raised, change over a range.",
        ],
      },
      {
        heading: "6. Air and industry",
        points: [
          "Air is a mixture: about 78% nitrogen, 21% oxygen, plus argon, CO₂, water vapour.",
          "Fractional distillation: crude oil fractions; liquid air gives N₂, Ar, O₂.",
          "Sea water: evaporation (salt) or distillation (fresh water).",
        ],
      },
    ],
    likely: [
      { question: "State the principle behind the separation of mixtures.", answer: "The parts of a mixture have different physical properties (such as boiling point, solubility or particle size), and a method is chosen that uses that difference." },
      { question: "Define residue, filtrate and distillate.", answer: "Residue: the solid left on the filter paper. Filtrate: the liquid that passes through. Distillate: the liquid collected from the condenser." },
      { question: "How can sand be separated from water?", answer: "By filtration (or decantation after settling)." },
      { question: "How is common salt obtained from sea water?", answer: "By evaporating the water, as in shallow pans heated by the sun; the salt is left behind." },
      { question: "Describe how to obtain pure water from salt water.", answer: "Simple distillation: heat in a distillation flask, pass the vapour through a condenser and collect the pure water as the distillate; the salt remains in the flask." },
      { question: "What is the difference between simple and fractional distillation?", answer: "Simple distillation separates a liquid from a dissolved solid. Fractional distillation uses a fractionating column to separate miscible liquids with close boiling points." },
      { question: "Which method separates oil from water?", answer: "A separating funnel, because the two liquids do not mix." },
      { question: "How can a mixture of iron filings and sand be separated?", answer: "Use a magnet to remove the iron filings." },
      { question: "Name two solids that sublime.", answer: "Ammonium chloride and iodine (also naphthalene and dry ice)." },
      { question: "Define Rf value.", answer: "The distance moved by a substance from the baseline divided by the distance moved by the solvent front from the baseline." },
      { question: "Why is the baseline in chromatography drawn in pencil?", answer: "Pencil does not dissolve in the solvent, whereas ink would separate and give false spots." },
      { question: "Give two ways of showing that a substance is pure.", answer: "It has a sharp fixed melting point and boiling point; it gives a single spot on a chromatogram." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Separation of a mixture depends on", options: ["differences in chemical symbols", "differences in physical properties of the parts", "the colour of the container", "the age of the mixture"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Sand can be separated from water by", options: ["evaporation", "filtration", "sublimation", "chromatography"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The solid left on the filter paper after filtration is called the", options: ["filtrate", "residue", "distillate", "solute"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Which method can be used to recover salt from sea water?", options: ["Filtration", "Evaporation", "Use of a magnet", "Decantation"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Large, pure crystals of copper(II) sulphate are best obtained by", options: ["heating the solution to dryness", "cooling a saturated solution slowly", "filtering the solution", "boiling the solution"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "Pure water can be obtained from sea water by", options: ["filtration", "simple distillation", "using a magnet", "chromatography"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "In a Liebig condenser the cooling water enters", options: ["at the top", "at the bottom", "through the thermometer", "at the side arm"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The liquid collected from a condenser is the", options: ["residue", "filtrate", "distillate", "precipitate"], answer: "C" },
    { number: 9, kind: "Objective", prompt: "Ethanol and water, which mix, are best separated by", options: ["a separating funnel", "fractional distillation", "filtration", "sublimation"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "Palm oil and water can be separated using", options: ["a separating funnel", "a magnet", "evaporation", "sublimation"], answer: "A" },
    { number: 11, kind: "Objective", prompt: "Which pair of substances can be separated by sublimation?", options: ["Sand and salt", "Iron and sulphur", "Ammonium chloride and sodium chloride", "Sugar and water"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "A magnet can separate iron filings from", options: ["sulphur", "iron(II) sulphide", "water that has dissolved iron", "rust that has dissolved"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "In a chromatogram, a spot is 2.4 cm from the baseline and the solvent front is 6.0 cm from it. The Rf value is", options: ["0.25", "0.40", "2.50", "3.60"], answer: "B", explanation: "Rf = 2.4 ÷ 6.0 = 0.40." },
    { number: 14, kind: "Objective", prompt: "The baseline in paper chromatography is drawn with a pencil because", options: ["pencil is cheaper", "pencil does not dissolve in the solvent", "ink spreads too slowly", "pencil makes the paper wet"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "A pure solid", options: ["melts over a wide range of temperatures", "has a sharp melting point", "has no melting point", "always dissolves in water"], answer: "B" },
    { number: 16, kind: "Objective", prompt: "The presence of impurities in a liquid", options: ["lowers its boiling point", "raises its boiling point", "has no effect", "makes it a gas"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "Which separation uses the ability of a substance to dissolve?", options: ["Dissolving salt from a salt-and-sand mixture, then filtering", "Using a magnet", "Winnowing", "Sublimation"], answer: "A" },
    { number: 18, kind: "Objective", prompt: "The correct first step in separating a mixture of iron filings, ammonium chloride, sodium chloride and sand is to", options: ["add water", "use a magnet", "evaporate", "filter"], answer: "B" },
    { number: 19, kind: "Objective", prompt: "Air is a mixture because", options: ["it contains oxygen", "its gases are mixed in no fixed ratio and keep their properties", "it is a gas", "it cannot be liquefied"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "Crude oil is separated into petrol, kerosene and diesel by", options: ["filtration", "fractional distillation", "decantation", "chromatography"], answer: "B" },
    { number: 21, kind: "Theory", prompt: "Explain why mixtures are separated and state the principle on which all separation methods are based.", answer: "Mixtures are separated to obtain useful substances, to remove unwanted ones and to check purity. The principle is that the parts of a mixture keep their own physical properties, so a method is chosen that uses a property in which they differ, such as particle size, solubility, boiling point, magnetism or ability to sublime." },
    { number: 22, kind: "Theory", prompt: "Describe how you would separate sand from a mixture of sand and water. Name the residue and the filtrate and draw the set-up.", answer: "Fold a filter paper into a funnel placed in a flask, pour the mixture through, and wash the residue. The sand is the residue on the paper and the clear water that passes through is the filtrate. The diagram shows a funnel with filter paper above a conical flask." },
    { number: 23, kind: "Theory", prompt: "Describe how pure crystals of copper(II) sulphate can be obtained from its solution.", answer: "Heat the solution gently until it is saturated (crystals begin to form on a glass rod). Allow it to cool slowly so that crystals form. Filter off the crystals, wash with a little cold distilled water and dry them between filter papers." },
    { number: 24, kind: "Theory", prompt: "Describe how pure water can be obtained from sea water by simple distillation. Mention the position of the thermometer and the direction of the cooling water.", answer: "Heat the sea water in a distillation flask. The water boils and the vapour passes into a Liebig condenser, where cold water flows in at the bottom and out at the top, so the vapour condenses and the distillate is collected in a receiver. The salt stays behind. The thermometer bulb is placed level with the side arm to measure the temperature of the vapour." },
    { number: 25, kind: "Theory", prompt: "Distinguish between simple distillation and fractional distillation, and state one use of each.", answer: "Simple distillation separates a liquid from a dissolved solid, e.g. pure water from salt water. Fractional distillation uses a fractionating column to separate miscible liquids with different boiling points, e.g. ethanol from water or crude oil into its fractions." },
    { number: 26, kind: "Theory", prompt: "How would you separate a mixture of ammonium chloride, sodium chloride and sand? Give the steps in order.", answer: "Heat the mixture gently; the ammonium chloride sublimes and condenses on a cold surface. Add water to the remainder and stir to dissolve the sodium chloride. Filter: the sand is the residue. Evaporate the filtrate to recover the sodium chloride." },
    { number: 27, kind: "Theory", prompt: "Describe how you would use paper chromatography to find out whether a black ink contains more than one dye.", answer: "Draw a pencil baseline near the bottom of a strip of filter paper and place a spot of the ink on it. Stand the strip in a covered container with a little solvent below the baseline. When the solvent has risen near the top, remove the paper, mark the solvent front and dry it. More than one spot shows that the ink contains several dyes." },
    { number: 28, kind: "Theory", prompt: "In a chromatography experiment the solvent front moved 9.0 cm. Substance X moved 3.6 cm and substance Y moved 6.3 cm. Calculate the Rf value of each and state which is more strongly held by the paper.", answer: "Rf of X = 3.6 ÷ 9.0 = 0.40. Rf of Y = 6.3 ÷ 9.0 = 0.70. X moved less, so it is held more strongly by the paper (and is less soluble in the solvent)." },
    { number: 29, kind: "Theory", prompt: "State how melting point and boiling point can be used to decide whether a substance is pure, and say what impurities do to each.", answer: "A pure substance melts and boils at sharp, fixed temperatures (ice melts at 0 °C, water boils at 100 °C). Impurities lower the melting point, raise the boiling point and make each change occur over a range of temperatures." },
    { number: 30, kind: "Theory", prompt: "Explain why air is classed as a mixture and name one method that is used to separate its gases.", answer: "Its gases are mixed in no fixed proportion, each keeps its own properties and they can be separated by physical methods. Air is cooled until it becomes liquid and is then separated by fractional distillation into nitrogen, argon and oxygen." },
  ] as PracticeQuestion[],
};
