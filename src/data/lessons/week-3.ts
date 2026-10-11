import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week3: Lesson = {
  id: "ss1-first-chemistry-week-3",
  week: "Week 03",
  title: "Nature of Matter",
  subtitle: "Sort matter into solids, liquids and gases, and into elements, compounds and mixtures, and tell physical changes from chemical changes.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Describe the three states of matter and the arrangement of particles in each.",
    "Distinguish physical properties from chemical properties.",
    "Explain the differences between physical and chemical changes with examples.",
    "Define element, compound and mixture and classify common materials.",
    "Compare compounds with mixtures under several headings.",
    "Identify the types of mixture and relate them to ways of separating them.",
  ],
  sections: [
    {
      heading: "1. Matter and its three states",
      paragraphs: [
        "Everything around us that has mass and occupies space is matter, and it normally exists in one of three states: solid, liquid or gas. The state depends on how closely the particles are packed and how strongly they attract one another.",
        "In a solid the particles are very close together, held in fixed positions and only vibrate. A solid therefore has a definite shape and a definite volume, and is hard to compress. In a liquid the particles are close but can slide past each other. A liquid has a definite volume but takes the shape of its container, and is almost impossible to compress. In a gas the particles are far apart and move quickly in all directions. A gas has no definite shape or volume, fills any container it is put in and is easy to compress.",
        "Water shows all three states: ice, liquid water and steam. The same substance changes state when it is heated or cooled, and it is still water in each state.",
      ],
      points: [
        "Solid: fixed shape, fixed volume, particles vibrate in fixed places.",
        "Liquid: fixed volume, takes the container’s shape, particles slide past each other.",
        "Gas: no fixed shape or volume, particles far apart and move freely, easily compressed.",
      ],
      diagram: "Draw three boxes. In the first, draw particles tightly packed in rows. In the second, draw particles close together but jumbled. In the third, draw a few particles far apart with arrows showing movement. Label them solid, liquid and gas.",
    },
    {
      heading: "2. Physical and chemical properties",
      paragraphs: [
        "A physical property is a feature we can observe or measure without changing the substance into another one. Examples: colour, smell, state, density, melting point, boiling point, hardness, solubility, and electrical conductivity. The ability of copper to be drawn into wires (ductility) and of gold to be hammered into sheets (malleability) are physical properties.",
        "A chemical property describes how a substance reacts, that is, how it changes into new substances. Examples: iron rusts in damp air, magnesium burns in air with a bright white flame, petrol is flammable, and zinc reacts with dilute acid to give hydrogen. We can only observe a chemical property by carrying out a reaction.",
      ],
    },
    {
      heading: "3. Physical changes",
      paragraphs: [
        "In a physical change no new substance is formed. Only the appearance, state, shape or size changes, and the change can usually be reversed. Melting, freezing, boiling, evaporation, condensation, dissolving sugar in water, breaking a stick and stretching a spring are physical changes.",
        "Sublimation is also a physical change: a solid changes directly to a gas on heating, and the gas turns back to a solid on cooling without passing through a liquid. Ammonium chloride, iodine and dry ice (solid carbon dioxide) sublime.",
      ],
    },
    {
      heading: "4. Chemical changes",
      paragraphs: [
        "In a chemical change one or more new substances are formed which have different properties from the starting materials. Burning charcoal, rusting of iron, rotting of fruit, souring of milk, cooking of food, digestion, photosynthesis and the action of an acid on a metal are chemical changes.",
        "Signs that a chemical change may have happened are: a new colour, a gas given off, a solid (precipitate) forming in a liquid, a change in temperature, or light given out. These signs are clues, not proof. The proof is that a new substance exists.",
      ],
    },
    {
      heading: "5. Physical change compared with chemical change",
      paragraphs: [
        "A physical change forms no new substance, is usually easy to reverse, involves little or no energy change that is noticeable, and the mass of each substance is unchanged. A chemical change forms new substances, is usually hard to reverse, is normally accompanied by a noticeable energy change (heat or light given out or taken in), and the new substances have different properties from the starting ones.",
        "Worked example: when a magnesium ribbon is heated it burns with a bright white flame and leaves a white powder. The ribbon cannot be recovered from the powder, a new substance (magnesium oxide) has formed and light and heat were given out, so this is a chemical change. When wax is warmed it melts to a liquid and solidifies again on cooling. It is still wax, so this is a physical change.",
      ],
    },
    {
      heading: "6. Elements",
      paragraphs: [
        "An element is a pure substance that cannot be split into anything simpler by ordinary chemical methods. Each element is made of only one kind of atom. Examples are hydrogen, oxygen, carbon, iron, copper, sodium, sulphur, gold and chlorine. Over a hundred elements are known.",
        "Elements are usually grouped as metals and non-metals. Metals are generally shiny, good conductors of heat and electricity, malleable and ductile, for example iron and copper. Non-metals are generally dull when solid, poor conductors, and brittle, for example sulphur and carbon. Some elements are called metalloids and show properties of both.",
      ],
    },
    {
      heading: "7. Compounds",
      paragraphs: [
        "A compound is a pure substance made up of two or more elements chemically combined in a fixed proportion by mass. Water is a compound of hydrogen and oxygen; common salt (sodium chloride) is a compound of sodium and chlorine; carbon dioxide is a compound of carbon and oxygen.",
        "The properties of a compound are different from those of the elements in it. Sodium is a soft, reactive metal and chlorine is a poisonous gas, but sodium chloride is a harmless white solid used in food. A compound can only be broken down into its elements by a chemical change, such as electrolysis or strong heating.",
      ],
    },
    {
      heading: "8. Mixtures",
      paragraphs: [
        "A mixture contains two or more substances that are only physically combined. The parts can be present in any proportion, they keep their own properties, and they can be separated by physical methods such as filtration, evaporation or magnets. Air, sea water, soil, brass, a mixture of sand and salt and a cup of tea are mixtures.",
        "A homogeneous mixture has the same composition throughout, so it looks like one thing: salt dissolved in water, air, and alloys such as brass are examples. A heterogeneous mixture has parts that can be seen or told apart: sand in water, oil and water, and soil.",
      ],
    },
    {
      heading: "9. Compounds compared with mixtures",
      paragraphs: [
        "Compare the two with iron filings and sulphur powder. Stirred together they make a mixture: you can see yellow and grey grains, a magnet pulls out the iron, and the proportions can be anything. Heat the same two together and they combine to form iron(II) sulphide, a compound, which is a dark solid that the magnet no longer separates, with a fixed ratio of iron to sulphur, and with properties unlike either element. Heat was given out as it formed.",
      ],
      points: [
        "Composition: a compound has a fixed ratio; a mixture has any ratio.",
        "Formation: a compound forms by chemical change with energy change; a mixture forms by physical mixing with little or none.",
        "Properties: a compound has new properties; a mixture’s parts keep theirs.",
        "Separation: a compound needs a chemical change; a mixture needs only physical methods.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Dissolving sugar or salt in water is a physical change: the substance can be recovered by evaporation.",
    "Water, carbon dioxide and sodium chloride are compounds. Air, sea water, brass and soil are mixtures. Examiners like to mix these in one question.",
    "Do not say a compound is ‘mixed’ elements. It is chemically combined in a fixed ratio.",
    "Sublimation goes straight from solid to gas (and back). Do not describe a liquid stage.",
    "A colour change or bubbles may be a clue, but ask whether a new substance forms. Dissolving a coloured crystal can change the colour of water without a chemical change.",
    "Most chemical changes are hard to reverse, but ‘irreversible’ is a tendency, not a definition. The definition is: new substance formed.",
    "Metals, non-metals and metalloids are groups of elements. Do not use them to describe compounds.",
    "To classify a material, ask: one kind of atom (element), two or more elements fixed together (compound), or two or more substances just mixed (mixture)?",
  ],
  summary:
    "Matter exists as solid, liquid or gas, depending on how particles are packed and move. Physical properties can be observed without changing the substance; chemical properties describe how it reacts. A physical change forms no new substance and is often reversible; a chemical change forms new substances with different properties and usually involves an energy change. Elements contain one kind of atom, compounds contain elements chemically combined in a fixed ratio with new properties, and mixtures are physically combined substances in any ratio that keep their own properties and can be separated physically.",
  quick: {
    intro: "Week 3 in short. The key skill is classifying: state, change, and element, compound or mixture.",
    blocks: [
      {
        heading: "1. States of matter",
        points: [
          "Solid: fixed shape and volume; particles close, vibrate in place.",
          "Liquid: fixed volume, no fixed shape; particles close and slide past each other.",
          "Gas: no fixed shape or volume; particles far apart, move fast, easily compressed.",
        ],
      },
      {
        heading: "2. Properties",
        points: [
          "Physical: colour, density, melting and boiling points, solubility, hardness, conductivity, malleability, ductility.",
          "Chemical: flammability, rusting, reaction with acids, burning in air.",
        ],
      },
      {
        heading: "3. Physical or chemical change",
        points: [
          "Physical: melting, freezing, boiling, dissolving, sublimation, cutting. No new substance.",
          "Chemical: burning, rusting, rotting, cooking, souring, photosynthesis. New substance, energy change.",
          "Signs of chemical change are clues; the proof is a new substance.",
        ],
      },
      {
        heading: "4. Element, compound, mixture",
        points: [
          "Element: one kind of atom; cannot be broken down chemically (iron, oxygen, carbon).",
          "Compound: elements chemically combined in a fixed ratio; new properties (water, salt, carbon dioxide).",
          "Mixture: substances physically mixed in any ratio; keep their properties (air, sea water, brass, soil).",
        ],
      },
      {
        heading: "5. Compound vs mixture (iron + sulphur)",
        points: [
          "Mixture: magnet removes the iron; any proportions; no heat change.",
          "Compound (iron(II) sulphide): not magnetic; fixed ratio; heat given out; new properties.",
        ],
      },
      {
        heading: "6. Types of mixture",
        points: [
          "Homogeneous: uniform throughout (salt solution, air, brass).",
          "Heterogeneous: parts distinguishable (sand and water, soil, oil and water).",
        ],
      },
    ],
    likely: [
      { question: "What are the three states of matter?", answer: "Solid, liquid and gas." },
      { question: "Describe the arrangement of particles in a solid, a liquid and a gas.", answer: "Solid: tightly packed and vibrating in fixed places. Liquid: close together but able to slide past each other. Gas: far apart and moving freely." },
      { question: "Distinguish between physical and chemical properties.", answer: "Physical properties can be observed without changing the substance (colour, melting point, density); chemical properties describe how a substance reacts to form new substances (flammability, rusting)." },
      { question: "Give two examples each of a physical change and a chemical change.", answer: "Physical: melting of ice, dissolving of sugar. Chemical: burning of wood, rusting of iron." },
      { question: "State three differences between a physical and a chemical change.", answer: "A physical change forms no new substance, is easily reversed and involves little energy change. A chemical change forms new substances, is usually hard to reverse and usually involves a noticeable energy change." },
      { question: "Define an element, a compound and a mixture.", answer: "An element has only one kind of atom. A compound has two or more elements chemically combined in a fixed ratio. A mixture has two or more substances physically combined in any proportion." },
      { question: "Classify: air, water, iron, brass, sodium chloride.", answer: "Air: mixture. Water: compound. Iron: element. Brass: mixture (an alloy). Sodium chloride: compound." },
      { question: "What is sublimation? Give two examples.", answer: "The direct change of a solid to a gas on heating (and back to a solid on cooling). Examples: ammonium chloride, iodine, dry ice." },
      { question: "How can a mixture of iron filings and sulphur be separated? Why not if they are heated together?", answer: "A magnet removes the iron filings. When heated together they form the compound iron(II) sulphide, which is not magnetic and cannot be separated by physical means." },
      { question: "What is the difference between a homogeneous and a heterogeneous mixture?", answer: "A homogeneous mixture has the same composition throughout (salt solution). A heterogeneous mixture has distinguishable parts (sand and water)." },
      { question: "Give two properties of metals and two of non-metals.", answer: "Metals: shiny, good conductors, malleable, ductile. Non-metals: dull, poor conductors, brittle (when solid)." },
      { question: "Why is the burning of magnesium a chemical change?", answer: "A new substance, magnesium oxide, forms with heat and light given out, and the magnesium cannot be recovered by a physical method." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "A substance with a definite shape and definite volume is", options: ["a gas", "a liquid", "a solid", "a vapour"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "In which state are the particles furthest apart?", options: ["Solid", "Liquid", "Gas", "Ice"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "A liquid", options: ["has no fixed volume", "takes the shape of its container", "cannot flow", "has particles in fixed positions"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Which is a physical property?", options: ["Rusting", "Flammability", "Melting point", "Reaction with acid"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "Which is a chemical property?", options: ["Colour", "Density", "Burning in air", "Hardness"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "Which of these is a physical change?", options: ["Burning of paper", "Rusting of a nail", "Melting of candle wax", "Souring of milk"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Which of these is a chemical change?", options: ["Dissolving sugar in water", "Cooking rice", "Breaking a plate", "Evaporation of water"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "A solid changing directly to a gas on heating is called", options: ["melting", "boiling", "sublimation", "condensation"], answer: "C" },
    { number: 9, kind: "Objective", prompt: "Which substance sublimes on heating?", options: ["Sodium chloride", "Iodine", "Sand", "Copper"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "A pure substance that cannot be broken down into simpler substances by chemical methods is", options: ["a mixture", "a compound", "an element", "a solution"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "Which of these is a compound?", options: ["Oxygen", "Carbon dioxide", "Air", "Iron"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Which of these is a mixture?", options: ["Water", "Sodium chloride", "Brass", "Sulphur"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "A compound differs from a mixture because the compound", options: ["can be separated by a magnet", "has its components in any proportion", "has a fixed composition and new properties", "keeps the properties of its components"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "A homogeneous mixture is one that", options: ["has visibly different parts", "has the same composition throughout", "contains only one element", "cannot be separated"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "Which pair is a heterogeneous mixture?", options: ["Salt and water in solution", "Sand and water", "Air", "Brass"], answer: "B" },
    { number: 16, kind: "Objective", prompt: "A mixture of iron filings and sulphur is heated strongly and a dark solid forms that is not attracted by a magnet. This shows that", options: ["a mixture has formed", "a compound has formed", "the iron has evaporated", "no change has taken place"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "Which is NOT a sign that a chemical change may have occurred?", options: ["A gas is given off", "A new colour forms", "Heat or light is given out", "A solid changes its shape when hammered"], answer: "D" },
    { number: 18, kind: "Objective", prompt: "Which of the following is a property of metals?", options: ["They are brittle", "They are good conductors of electricity", "They are poor conductors of heat", "They are dull when polished"], answer: "B" },
    { number: 19, kind: "Objective", prompt: "Which statement about the change of liquid water to steam is correct?", options: ["A new substance is formed", "It is a physical change", "It is a chemical change", "The water is destroyed"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "Which of the following is a compound of hydrogen and oxygen?", options: ["Air", "Water", "Brass", "Soil"], answer: "B" },
    { number: 21, kind: "Theory", prompt: "Describe the arrangement and movement of particles in a solid, a liquid and a gas, and use this to explain why a gas can be compressed but a solid cannot.", answer: "Solid: particles tightly packed in fixed positions, vibrating. Liquid: particles close but able to slide past each other. Gas: particles far apart and moving rapidly in all directions. A gas can be compressed because there is a lot of empty space between its particles, while the particles of a solid are already in contact." },
    { number: 22, kind: "Theory", prompt: "Distinguish between physical and chemical properties, giving two examples of each.", answer: "Physical properties can be observed or measured without forming a new substance, e.g. colour and melting point. Chemical properties describe how a substance reacts to form new substances, e.g. iron rusts and petrol burns." },
    { number: 23, kind: "Theory", prompt: "State four differences between a physical change and a chemical change.", answer: "Physical: no new substance, usually reversible, little energy change, properties of the substance remain the same. Chemical: new substance formed, usually hard to reverse, usually noticeable energy change (heat or light), new properties." },
    { number: 24, kind: "Theory", prompt: "Classify each change as physical or chemical and give a reason: (a) melting wax, (b) burning kerosene, (c) dissolving salt in water, (d) rusting of a bucket.", answer: "(a) Physical: wax is still wax. (b) Chemical: new substances (carbon dioxide and water) form with heat and light. (c) Physical: the salt can be recovered by evaporation. (d) Chemical: rust is a new substance." },
    { number: 25, kind: "Theory", prompt: "Define element, compound and mixture. Give two examples of each.", answer: "Element: a pure substance made of one kind of atom (iron, oxygen). Compound: a pure substance of two or more elements chemically combined in a fixed ratio (water, sodium chloride). Mixture: two or more substances physically combined in any proportion (air, brass)." },
    { number: 26, kind: "Theory", prompt: "Describe an experiment using iron filings and sulphur that shows the difference between a mixture and a compound.", answer: "Mix iron filings and sulphur: the grains stay separate, and a magnet picks out the iron, so it is a mixture. Heat the mixture strongly: it glows and forms a dark solid, iron(II) sulphide. The magnet no longer attracts it and it has a fixed ratio of iron to sulphur, so a compound has formed with heat given out." },
    { number: 27, kind: "Theory", prompt: "Give five differences between a compound and a mixture.", answer: "Compound: fixed composition; formed by chemical change; new properties; components cannot be separated by physical means; energy change on formation. Mixture: variable composition; formed by physical mixing; components keep their properties; can be separated physically; little or no energy change." },
    { number: 28, kind: "Theory", prompt: "Explain what is meant by (a) a homogeneous mixture and (b) a heterogeneous mixture, with two examples of each.", answer: "(a) A mixture with the same composition throughout, e.g. salt solution, air. (b) A mixture with parts that can be seen or tell apart, e.g. sand and water, soil." },
    { number: 29, kind: "Theory", prompt: "Classify the following as element, compound or mixture and give a reason: sea water, sulphur, carbon dioxide, brass.", answer: "Sea water: mixture of water and dissolved salts. Sulphur: element (one kind of atom). Carbon dioxide: compound of carbon and oxygen in a fixed ratio. Brass: mixture (alloy) of copper and zinc in variable proportions." },
    { number: 30, kind: "Theory", prompt: "A student says that dissolving sugar in water is a chemical change because the sugar disappears. Evaluate this claim.", answer: "The claim is wrong. The sugar is still present in the water and can be recovered by evaporating the water. No new substance forms, so dissolving is a physical change." },
  ] as PracticeQuestion[],
};
