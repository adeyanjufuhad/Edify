import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeeks78: Lesson = {
  id: "ss1-first-biology-weeks-7-8",
  week: "Weeks 07–08",
  title: "Plant nutrition: photosynthesis and chemosynthesis",
  subtitle: "Discover how green plants make their own food from air, water and light, how the leaf is built for the job, and how some bacteria make food without light.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define nutrition and metabolism and name the classes of food substances.",
    "Distinguish autotrophic from heterotrophic nutrition.",
    "Define photosynthesis, state its requirements and products and write its equation.",
    "Describe how the leaf is adapted for photosynthesis.",
    "Describe the light stage and the dark stage of photosynthesis.",
    "Describe chemosynthesis and name the bacteria involved.",
    "Describe experiments to show that light, chlorophyll and carbon dioxide are needed, and test a leaf for starch.",
  ],
  sections: [
    {
      heading: "1. Nutrition and metabolism",
      paragraphs: [
        "Nutrition is the process by which an organism obtains food and uses it for energy, growth, repair and the control of body processes. Metabolism is the sum of all the chemical reactions in the body of an organism. Reactions that build up complex substances from simple ones, such as photosynthesis, are called anabolic. Reactions that break down complex substances, such as respiration, are catabolic.",
        "The food substances that organisms need are carbohydrates, proteins, fats and oils, vitamins, mineral salts and water, and animals also need roughage (dietary fibre). Green plants make their carbohydrates themselves and then use them, with minerals taken from the soil, to make proteins, fats and everything else they need.",
      ],
    },
    {
      heading: "2. Types of nutrition",
      paragraphs: [
        "Organisms that make their own food from simple inorganic substances are autotrophs, and the nutrition is called autotrophic. It is of two kinds: photosynthesis, which uses light energy (green plants, algae and some bacteria), and chemosynthesis, which uses energy from chemical reactions (some bacteria).",
        "Organisms that cannot make their own food and so depend on other living or dead organisms are heterotrophs, and the nutrition is heterotrophic. Its forms are holozoic (taking in solid food and digesting it, as animals do), saprophytic (absorbing food from dead organic matter, as mushrooms and moulds do), parasitic and symbiotic. You will study these in Week 10.",
      ],
    },
    {
      heading: "3. Photosynthesis",
      paragraphs: [
        "Photosynthesis is the process by which green plants make carbohydrates (glucose) from carbon dioxide and water, using light energy absorbed by chlorophyll, and release oxygen as a by-product. In words: carbon dioxide + water → glucose + oxygen (in the presence of light and chlorophyll). In symbols: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
        "The raw materials are carbon dioxide, which enters the leaf from the air through the stomata, and water, which is absorbed by the roots and carried to the leaves in the xylem. The energy comes from sunlight, captured by the green pigment chlorophyll, which is found in the chloroplasts of the leaf cells.",
        "The glucose made may be used at once in respiration, converted to starch for storage, changed into sucrose for transport in the phloem, or turned into cellulose for cell walls. With nitrates and other minerals from the soil, it is used to make proteins, and it can also be converted to fats and oils. The rate of photosynthesis increases with light intensity, carbon dioxide concentration and temperature, up to a limit, and it needs adequate water and chlorophyll. The factor in shortest supply limits the rate.",
        "Importance: photosynthesis is the starting point of nearly every food chain, it adds oxygen to the air and removes carbon dioxide, and the fuels formed from the remains of ancient plants (coal, oil and gas) store energy trapped by photosynthesis long ago.",
      ],
    },
    {
      heading: "4. Adaptations of the leaf",
      paragraphs: [
        "The leaf is the main organ of photosynthesis, and its structure fits its job. It is broad and thin, which gives a large surface area for light and a short distance for gases to diffuse. The upper epidermis is covered by a thin, transparent cuticle that lets light pass through while reducing water loss. The palisade layer just below it has tall cells packed with chloroplasts, placed where the light is strongest.",
        "Beneath it, the spongy mesophyll has loosely packed cells with air spaces between them, so carbon dioxide can diffuse to the cells and oxygen can diffuse away. The lower epidermis contains many pores called stomata, each opened and closed by two guard cells, which allow gases in and out. Xylem brings water, and phloem carries away the sugars, and both are found in the veins, which also support the leaf blade. Leaves are arranged in a leaf mosaic so that they shade each other as little as possible.",
      ],
      diagram: "Draw a section through a leaf. From top to bottom label: cuticle, upper epidermis, palisade mesophyll (chloroplasts), spongy mesophyll (air spaces), vein (xylem and phloem), lower epidermis, a stoma with two guard cells.",
    },
    {
      heading: "5. The light stage and the dark stage",
      paragraphs: [
        "Photosynthesis takes place in two linked stages, both in the chloroplast. The light stage (light-dependent stage) happens in the grana, the stacks of membranes in which chlorophyll is found. Chlorophyll absorbs light energy, which is used to split water into hydrogen and oxygen (photolysis). The oxygen is released into the air, and the hydrogen is picked up by a carrier. Light energy is also used to make ATP.",
        "The dark stage (light-independent stage) happens in the fluid stroma of the chloroplast and does not need light directly, but it uses the ATP and hydrogen made in the light stage. In this stage carbon dioxide is taken in and converted, step by step, into glucose, which may then be turned into starch. It continues for a time after dark, which is why it is called the dark stage and not because it only happens at night.",
      ],
    },
    {
      heading: "6. Chemosynthesis",
      paragraphs: [
        "Chemosynthesis is the making of carbohydrates from carbon dioxide and water by some bacteria, using the energy released by the oxidation of simple inorganic substances instead of light. These bacteria have no chlorophyll.",
        "Examples: the nitrifying bacteria in the soil. Nitrosomonas oxidises ammonia to nitrites, and Nitrobacter oxidises nitrites to nitrates, which plants can absorb. Sulphur bacteria oxidise hydrogen sulphide to sulphur, and iron bacteria oxidise iron(II) compounds to iron(III) compounds. Chemosynthetic bacteria are also the base of food chains around deep-sea hot vents, where there is no sunlight.",
      ],
      points: [
        "Photosynthesis: energy from light; chlorophyll needed; oxygen released.",
        "Chemosynthesis: energy from oxidation of inorganic compounds; no chlorophyll; bacteria only.",
      ],
    },
    {
      heading: "7. Experiments and the starch test",
      paragraphs: [
        "Because starch is made from the glucose produced, testing a leaf for starch shows whether photosynthesis has taken place. Method: (1) dip the leaf in boiling water for about a minute to kill it and soften it; (2) warm it in ethanol in a water bath (never over a naked flame) until the green colour is removed; (3) rinse it in warm water to soften it again; (4) spread it on a white tile and add iodine solution. A blue-black colour shows the presence of starch; a brown (iodine colour) result shows that starch is absent.",
        "To show that light is needed, first destarch a potted plant by keeping it in the dark for about two days. Then cover part of a leaf with black paper, put the plant in the light for several hours, and test the leaf: only the uncovered part turns blue-black. To show that chlorophyll is needed, test a variegated leaf (with green and white patches): only the green patches turn blue-black. To show that carbon dioxide is needed, enclose a destarched plant with a dish of potassium hydroxide solution or soda lime, which absorbs carbon dioxide, and compare it with a control plant. To show that oxygen is released, collect the gas given off by a water plant such as Hydrilla under an inverted funnel and test it with a glowing splint, which relights.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Photosynthesis needs four things: light, chlorophyll, carbon dioxide and water. Name all four and say where each comes from.",
    "The oxygen released in photosynthesis comes from the splitting of water, not from carbon dioxide.",
    "The ‘dark stage’ does not need darkness. It does not need light directly, but it uses the products of the light stage.",
    "Remove chlorophyll with hot ethanol in a water bath, not over a naked flame. Ethanol is flammable.",
    "Iodine turns blue-black with starch. It does not test for glucose.",
    "Destarch the plant before testing the effect of light, otherwise starch made earlier will give a false positive.",
    "Chemosynthetic bacteria have no chlorophyll. They use energy from oxidising inorganic substances.",
    "Stomata are mainly on the lower surface of most leaves, which reduces water loss.",
  ],
  summary:
    "Nutrition provides energy and materials, and metabolism is the sum of the body’s chemical reactions. Autotrophs make their own food by photosynthesis (using light and chlorophyll) or chemosynthesis (using energy from inorganic oxidation); heterotrophs depend on other organisms. In photosynthesis, carbon dioxide and water form glucose and oxygen, in a light stage in the grana that splits water and makes ATP, and a dark stage in the stroma that builds glucose. The leaf is adapted by being thin and broad, with a transparent cuticle, palisade cells full of chloroplasts, air spaces, stomata and veins. Experiments with destarched plants, variegated leaves and the iodine test show what photosynthesis needs.",
  quick: {
    intro: "Revision sheet for Weeks 7 and 8. Know the equation, the leaf adaptations and the starch test step by step.",
    blocks: [
      {
        heading: "1. Types of nutrition",
        points: [
          "Autotrophic: photosynthesis (light, chlorophyll) and chemosynthesis (chemical energy).",
          "Heterotrophic: holozoic, saprophytic, parasitic, symbiotic.",
          "Metabolism: all the body’s chemical reactions (anabolism and catabolism).",
        ],
      },
      {
        heading: "2. Photosynthesis",
        points: [
          "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll).",
          "CO₂ enters by stomata; water comes up the xylem; chlorophyll is in the chloroplasts.",
          "Glucose → respiration, starch (storage), sucrose (transport), cellulose, proteins (with nitrates).",
          "Rate rises with light, CO₂ and temperature up to a limit.",
        ],
      },
      {
        heading: "3. Leaf adaptations",
        points: [
          "Broad and thin: large surface, short diffusion path.",
          "Transparent cuticle and epidermis: let light through.",
          "Palisade cells with many chloroplasts at the top.",
          "Spongy mesophyll with air spaces.",
          "Stomata with guard cells; veins with xylem and phloem.",
        ],
      },
      {
        heading: "4. Light and dark stages",
        points: [
          "Light stage (grana): chlorophyll absorbs light; water splits (photolysis); oxygen released; ATP made.",
          "Dark stage (stroma): CO₂ is built into glucose using ATP and hydrogen; no light needed directly.",
        ],
      },
      {
        heading: "5. Chemosynthesis",
        points: [
          "Bacteria make food using energy from oxidising inorganic substances.",
          "Nitrosomonas: ammonia → nitrite. Nitrobacter: nitrite → nitrate.",
          "Sulphur and iron bacteria; deep-sea vents.",
        ],
      },
      {
        heading: "6. Starch test",
        points: [
          "Boil the leaf in water, warm it in ethanol in a water bath, rinse in warm water, add iodine.",
          "Blue-black = starch present.",
          "Destarch the plant first; use a control; variegated leaf shows chlorophyll is needed.",
        ],
        warning: "Never heat ethanol over a naked flame.",
      },
    ],
    likely: [
      { question: "Define photosynthesis.", answer: "The process by which green plants make carbohydrates from carbon dioxide and water using light energy absorbed by chlorophyll, with oxygen released." },
      { question: "Write the equation for photosynthesis.", answer: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in light, with chlorophyll)." },
      { question: "State four factors that affect the rate of photosynthesis.", answer: "Light intensity, carbon dioxide concentration, temperature and water (also chlorophyll)." },
      { question: "State four ways in which the leaf is adapted for photosynthesis.", answer: "Broad thin blade; transparent cuticle and epidermis; palisade cells with many chloroplasts; air spaces in the spongy layer; stomata for gas exchange; veins for water and food transport." },
      { question: "What happens in the light stage?", answer: "Chlorophyll absorbs light, water is split to release oxygen and hydrogen, and ATP is made." },
      { question: "What happens in the dark stage?", answer: "Carbon dioxide is converted into glucose using the ATP and hydrogen from the light stage; it takes place in the stroma." },
      { question: "What is chemosynthesis? Name two bacteria involved.", answer: "The making of food from carbon dioxide and water using energy from oxidising inorganic substances. Nitrosomonas and Nitrobacter (also sulphur and iron bacteria)." },
      { question: "Describe the starch test on a leaf.", answer: "Boil in water, warm in ethanol in a water bath to remove chlorophyll, rinse in warm water and add iodine solution; a blue-black colour shows starch." },
      { question: "Why must a plant be destarched before an experiment on photosynthesis?", answer: "So that any starch found later was made during the experiment and not earlier." },
      { question: "How can you show that chlorophyll is necessary for photosynthesis?", answer: "Test a variegated leaf for starch: only the green parts turn blue-black." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The sum of all chemical reactions that take place in an organism is called", options: ["nutrition", "metabolism", "excretion", "growth"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Organisms that make their own food from inorganic substances are", options: ["heterotrophs", "autotrophs", "parasites", "saprophytes"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The raw materials of photosynthesis are", options: ["glucose and oxygen", "carbon dioxide and water", "oxygen and water", "starch and carbon dioxide"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The green pigment that absorbs light for photosynthesis is", options: ["haemoglobin", "chlorophyll", "melanin", "carotene"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Photosynthesis takes place in the", options: ["mitochondria", "chloroplasts", "nucleus", "vacuole"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "The gas released as a by-product of photosynthesis comes from the splitting of", options: ["carbon dioxide", "glucose", "water", "starch"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Carbon dioxide enters the leaf through the", options: ["stomata", "cuticle", "veins", "root hairs"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "Which leaf layer contains the most chloroplasts?", options: ["Cuticle", "Palisade mesophyll", "Lower epidermis", "Spongy mesophyll"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Air spaces in the spongy mesophyll of a leaf are there to", options: ["store water", "allow gases to diffuse to and from the cells", "support the leaf", "absorb light"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The light stage of photosynthesis takes place in the", options: ["grana", "stroma", "nucleus", "cell wall"], answer: "A" },
    { number: 11, kind: "Objective", prompt: "The dark stage of photosynthesis", options: ["can only happen at night", "uses ATP and hydrogen made in the light stage", "releases oxygen", "needs no carbon dioxide"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Which bacteria change ammonia to nitrite?", options: ["Nitrobacter", "Nitrosomonas", "Rhizobium", "Azotobacter"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "To remove chlorophyll from a leaf for the starch test, it is warmed in", options: ["water", "iodine solution", "ethanol in a water bath", "dilute acid"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "A leaf that has made starch turns ___ when iodine is added.", options: ["red", "blue-black", "colourless", "yellow"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define photosynthesis and write its equation. State where each of the raw materials comes from.", answer: "Photosynthesis is the making of carbohydrates from carbon dioxide and water, using light energy absorbed by chlorophyll, with oxygen released: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Carbon dioxide comes from the air through the stomata; water is absorbed by the roots and carried by the xylem." },
    { number: 16, kind: "Theory", prompt: "Describe how the leaf is adapted for photosynthesis.", answer: "It is broad and thin for a large surface area and short diffusion path; the cuticle and epidermis are transparent; palisade cells are packed with chloroplasts near the top; spongy mesophyll has air spaces for gas movement; stomata with guard cells control gas exchange; veins supply water and carry away food." },
    { number: 17, kind: "Theory", prompt: "Describe the light stage and the dark stage of photosynthesis.", answer: "Light stage (grana): chlorophyll absorbs light, water is split releasing oxygen and hydrogen, and ATP is made. Dark stage (stroma): carbon dioxide is built up into glucose using the ATP and hydrogen from the light stage; it does not need light directly." },
    { number: 18, kind: "Theory", prompt: "Compare photosynthesis with chemosynthesis.", answer: "Both make food from carbon dioxide and water. Photosynthesis uses light energy and chlorophyll in green plants, algae and some bacteria and releases oxygen. Chemosynthesis uses energy from oxidising inorganic compounds, needs no light or chlorophyll and occurs only in some bacteria." },
    { number: 19, kind: "Theory", prompt: "Describe the experiment to show that light is necessary for photosynthesis.", answer: "Destarch a potted plant by keeping it in the dark for two days. Cover part of a leaf with black paper (or a stencil) and put the plant in the light for several hours. Remove the leaf, boil it in water, remove chlorophyll in warm ethanol, rinse and add iodine. Only the uncovered part turns blue-black, showing that starch was made only where there was light." },
    { number: 20, kind: "Theory", prompt: "Explain how you would show that chlorophyll and carbon dioxide are needed for photosynthesis.", answer: "Chlorophyll: test a variegated leaf for starch; only the green parts turn blue-black. Carbon dioxide: put a destarched plant under a bell jar with potassium hydroxide solution or soda lime, which absorbs carbon dioxide, with a control plant without it, then test leaves for starch; the plant without carbon dioxide gives no starch." },
  ] as PracticeQuestion[],
};
