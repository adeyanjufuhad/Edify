import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeeks78: Lesson = {
  id: "ss1-first-biology-weeks-7-8",
  week: "Weeks 07–08",
  title: "Plant nutrition: photosynthesis and chemosynthesis",
  subtitle: "How green plants make their own food from light, water and carbon dioxide, how the leaf is built for the job, and how some bacteria make food from chemicals instead.",
  source: "Original teaching notes based chiefly on Hidden Facts in SSCE Biology, Chapter Six, ‘Types of nutrition’ and ‘Plant nutrition (photosynthesis)’ (PDF pages 85–96). The explanations and practice questions below are newly written for Edify.",
  objectives: [
    "Define nutrition and distinguish autotrophic from heterotrophic nutrition.",
    "Write the word and chemical equations for photosynthesis and name its raw materials, products and conditions.",
    "Describe the light stage and the dark stage of photosynthesis and say where each takes place.",
    "Explain at least four adaptations of the leaf for photosynthesis.",
    "Describe chemosynthesis using sulphur bacteria and compare it with photosynthesis.",
    "Describe the starch test on a leaf and explain the reason for each step.",
  ],
  sections: [
    {
      heading: "1. Nutrition and metabolism",
      paragraphs: [
        "Nutrition is the supply of materials and energy that a living thing needs for growth, respiration, reproduction and the other activities of life. Food is the source of the nutrients that supply energy to the cells.",
        "Metabolism is all the chemical processes in a living organism. Catabolism breaks complex substances into simpler ones and releases energy. Anabolism builds complex substances from simpler ones and stores energy. Metabolic reactions are controlled by enzymes.",
      ],
    },
    {
      heading: "2. Types of nutrition",
      paragraphs: [
        "In autotrophic nutrition, an organism makes its own food from simple inorganic substances. It has two forms: photosynthesis, which uses light energy and chlorophyll, and chemosynthesis, which uses energy from chemical reactions.",
        "In heterotrophic nutrition, an organism obtains its food from other living things or from dead matter. Animals and fungi are heterotrophs. Heterotrophic nutrition is covered in Week 10.",
      ],
    },
    {
      heading: "3. Photosynthesis",
      paragraphs: [
        "Photosynthesis is the process by which green plants make food, a simple sugar (glucose), from carbon dioxide and water, using energy absorbed from sunlight by chlorophyll. Oxygen is released as a by-product. The word equation is: carbon dioxide + water → glucose + oxygen, in the presence of light and chlorophyll. The chemical equation is 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
        "Glucose is the first stable product. It is changed into starch for storage, used in respiration, converted to proteins (with nitrogen and sulphur), or made into lipids and cellulose. The oxygen that leaves the plant comes from the water that is split, not from the carbon dioxide.",
        "Although any green part of a plant can photosynthesise, the leaf is the main organ. Most photosynthesis happens in the palisade mesophyll, because those cells contain the most chloroplasts and lie just below the upper epidermis, where they receive the most light. Other pigments, such as carotenoids (orange), xanthophylls (yellow) and anthocyanins, are accessory pigments. They are masked by chlorophyll until the leaves die in autumn.",
      ],
      diagram: "Draw a leaf cross-section. Mark the upper epidermis, palisade mesophyll (many chloroplasts), spongy mesophyll, stoma in the lower epidermis, and a vein with xylem (water in) and phloem (food out).",
    },
    {
      heading: "4. Adaptations of the leaf",
      paragraphs: [
        "A broad leaf lamina gives a large surface for light absorption. The stomata let carbon dioxide diffuse in and oxygen diffuse out. The epidermis is thin and transparent, so light reaches the palisade cells. Those cells contain many chloroplasts to absorb as much light as possible.",
        "A thin lamina gives carbon dioxide a short distance to diffuse. A thin waxy cuticle protects the leaf and cuts water loss without blocking light. The xylem brings water into the leaf, the phloem takes manufactured food away, and a network of veins supports the leaf. Chlorophyll absorbs sunlight and converts it to chemical energy.",
      ],
    },
    {
      heading: "5. The light stage and the dark stage",
      paragraphs: [
        "The light stage needs light and takes place in the grana of the chloroplast. The chlorophyll absorbs light and becomes energised. This energy splits water in a process called photolysis, releasing oxygen. The hydrogen from the water is picked up by the coenzyme NADP, which becomes NADPH₂. Energy not used in splitting water is used to make ATP from ADP. The light stage therefore produces ATP, NADPH₂ and oxygen.",
        "The dark stage, also called the Calvin cycle, takes place in the stroma of the chloroplast. It does not need light directly, but it uses the ATP and NADPH₂ made in the light stage. Carbon dioxide is reduced, with hydrogen from NADPH₂, through a series of enzyme-controlled steps to form sugar.",
      ],
      points: [
        "Light stage: grana; needs light; photolysis of water; produces ATP, NADPH₂ and O₂.",
        "Dark stage: stroma; does not need light directly; uses ATP and NADPH₂; fixes carbon dioxide into sugar.",
      ],
    },
    {
      heading: "6. Chemosynthesis",
      paragraphs: [
        "In chemosynthesis, organisms make food from simple inorganic substances such as carbon dioxide, water and hydrogen sulphide, using energy released by chemical reactions rather than light. Sulphur bacteria oxidise hydrogen sulphide to release energy: 2H₂S + O₂ → 2S + 2H₂O + chemical energy. That energy is used to combine hydrogen sulphide with carbon dioxide and water to form sugar, sulphur and water. Nitrifying bacteria oxidise ammonia to nitrites and then to nitrates, releasing energy that is used to make sugar.",
        "Chemosynthesis and photosynthesis both make organic food from carbon dioxide and water, but chemosynthesis uses chemical energy and photosynthesis uses light energy. Chemosynthesis does not produce oxygen.",
      ],
    },
    {
      heading: "7. Testing a leaf for starch",
      paragraphs: [
        "Pick a leaf from a plant that has been in sunlight, then boil it in water for about five minutes. Boiling kills the cells, stops enzymes, and bursts the starch grains so that the iodine can reach them. Put the leaf in a tube of alcohol in a water bath to remove chlorophyll; the leaf turns colourless. Never heat alcohol over a naked flame. Soften the leaf in warm water, then place it in dilute iodine solution. Starch present in the leaf turns blue-black.",
        "Monocotyledons, such as grasses, often convert their sugar to soluble forms and move it out, so a negative starch result does not always mean that no photosynthesis took place.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Write both equations: the word equation and the chemical equation. The arrow for photosynthesis should show light and chlorophyll. Missing the conditions costs marks.",
    "The oxygen released in photosynthesis comes from splitting water, not from carbon dioxide. Carbon dioxide provides the carbon for the sugar.",
    "‘Dark reaction’ is a misleading name. It does not happen only in the dark; it simply does not need light directly. It is also called the light-independent stage.",
    "The palisade mesophyll is the main site of photosynthesis, because it has the most chloroplasts and lies just under the upper epidermis.",
    "Chemosynthesis uses chemical energy from inorganic reactions, not sunlight. Sulphur bacteria are the standard example. Chemosynthesis does not release oxygen.",
    "For the starch test, boil the leaf first, then use alcohol to remove chlorophyll, then iodine. Remember that a leaf kept in the dark beforehand gives a clearer result, because it has used up its starch.",
    "Carnivorous plants such as the pitcher plant are green and make their own food by photosynthesis. They trap insects only to obtain nitrogen. Do not call them heterotrophs in answers about photosynthesis.",
  ],
  summary: "Autotrophic organisms make their own food. Green plants use photosynthesis: light energy, chlorophyll, carbon dioxide and water make glucose and oxygen. The leaf is built for this task. The light stage in the grana makes ATP, NADPH₂ and oxygen; the dark stage in the stroma uses them to fix carbon dioxide into sugar. Chemosynthetic bacteria use the energy of chemical reactions, such as the oxidation of hydrogen sulphide, to make food.",
  quick: {
    intro: "Equations, the leaf, the two stages and the starch test. Learn the equations in full and the reason for each step of the starch test.",
    blocks: [
      {
        heading: "1. Types of nutrition",
        points: [
          "Autotrophic: makes its own food from simple inorganic substances (photosynthesis or chemosynthesis).",
          "Heterotrophic: obtains food from other organisms (Week 10).",
          "Catabolism releases energy; anabolism stores energy.",
        ],
        memory: "AUTO = self-feeding. HETERO = other-feeding.",
      },
      {
        heading: "2. Photosynthesis",
        points: [
          "Word: carbon dioxide + water → glucose + oxygen (light and chlorophyll needed).",
          "Chemical: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
          "First stable product: glucose. Stored as starch.",
          "Main site: palisade mesophyll.",
        ],
        memory: "Light and chlorophyll go over the arrow. Oxygen comes from WATER.",
      },
      {
        heading: "3. Leaf adaptations",
        points: [
          "Broad lamina: large surface for light.",
          "Stomata: carbon dioxide in, oxygen out.",
          "Thin, transparent epidermis: light reaches palisade cells.",
          "Palisade cells: many chloroplasts.",
          "Thin lamina: short diffusion path.",
          "Thin waxy cuticle: protects without blocking light.",
          "Veins with xylem (water in) and phloem (food out).",
        ],
        memory: "BROAD leaf, THIN skin, STOMATA, PALISADE, VEINS.",
      },
      {
        heading: "4. Light and dark stages",
        points: [
          "Light stage: grana; needs light; photolysis of water; makes ATP, NADPH₂ and O₂.",
          "Dark stage: stroma; no direct need for light; uses ATP and NADPH₂ to fix CO₂ into sugar.",
        ],
        warning: "The dark stage does not need light directly, but it still depends on products of the light stage.",
      },
      {
        heading: "5. Chemosynthesis",
        points: [
          "Energy from chemical reactions, not sunlight.",
          "Sulphur bacteria: 2H₂S + O₂ → 2S + 2H₂O + chemical energy.",
          "Nitrifying bacteria: oxidise ammonia to nitrites and nitrates, releasing energy.",
          "No oxygen is produced.",
        ],
      },
      {
        heading: "6. Starch test",
        points: [
          "Boil the leaf: kills cells, stops enzymes, bursts starch grains.",
          "Alcohol in a water bath: removes chlorophyll (never a naked flame).",
          "Soften in warm water, then dilute iodine.",
          "Starch present: blue-black.",
        ],
      },
    ],
    likely: [
      { question: "Define photosynthesis.", answer: "The process by which green plants manufacture glucose from carbon dioxide and water, using energy absorbed from sunlight by chlorophyll, with oxygen released as a by-product." },
      { question: "State the raw materials and products of photosynthesis.", answer: "Raw materials: carbon dioxide and water (with light and chlorophyll). Products: glucose and oxygen." },
      { question: "Where does most photosynthesis take place in a leaf?", answer: "In the palisade mesophyll, because it has the most chloroplasts and lies just under the upper epidermis." },
      { question: "Name two adaptations of a leaf for photosynthesis.", answer: "Any two of: broad lamina, stomata, thin transparent epidermis, palisade cells with many chloroplasts, thin lamina, thin waxy cuticle, veins with xylem and phloem." },
      { question: "Where does the light stage take place and what does it make?", answer: "In the grana of the chloroplast. It makes ATP, NADPH₂ and oxygen." },
      { question: "What happens in the dark stage?", answer: "Carbon dioxide is reduced by hydrogen from NADPH₂, using ATP, to form sugar. It takes place in the stroma." },
      { question: "What is chemosynthesis? Give an example.", answer: "Making food from simple inorganic substances using energy from chemical reactions. Example: sulphur bacteria oxidising hydrogen sulphide." },
      { question: "What is the function of the stomata in a leaf?", answer: "They allow carbon dioxide to diffuse into the leaf and oxygen to diffuse out." },
      { question: "Why must a leaf be boiled before the starch test?", answer: "Boiling kills the cells, stops enzymes and bursts the starch grains so that iodine can reach the starch." },
      { question: "What colour does starch turn with iodine?", answer: "Blue-black." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Autotrophic nutrition means", options: ["feeding on other organisms", "absorbing dead matter", "living inside a host", "making own food from simple inorganic substances"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "Photosynthesis takes place mainly in the", options: ["stem", "root", "palisade mesophyll of the leaf", "flower"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "The gas released during photosynthesis is", options: ["oxygen", "carbon dioxide", "nitrogen", "hydrogen sulphide"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "The pigment that absorbs sunlight for photosynthesis is", options: ["haemoglobin", "keratin", "chlorophyll", "melanin"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "Which of these is NOT a direct raw material for photosynthesis?", options: ["Nitrogen gas", "Water", "Carbon dioxide", "Light"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "The first stable product of photosynthesis is", options: ["starch", "glucose", "protein", "oil"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Which leaf tissue carries water into the leaf?", options: ["phloem", "xylem", "epidermis", "cuticle"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Which adaptation lets carbon dioxide diffuse into the leaf?", options: ["stomata", "thick cuticle", "waxy surface", "thick epidermis"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "The light stage of photosynthesis takes place in the", options: ["grana of the chloroplast", "stroma", "nucleus", "vacuole"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "The dark stage of photosynthesis", options: ["needs light only", "does not need light directly but uses ATP and NADPH₂", "occurs only at night", "occurs in the mitochondria"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Chemosynthesis is carried out by", options: ["mushrooms", "sulphur bacteria", "maize", "grasshoppers"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Chemosynthesis obtains its energy from", options: ["sunlight", "chemical reactions", "heat only", "electricity"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "A leaf that contains starch turns, with iodine, to", options: ["green", "blue-black", "red", "white"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Why must a leaf be boiled in water before the starch test?", options: ["To add colour", "To kill cells, inactivate enzymes and burst starch grains", "To produce oxygen", "To remove water from the leaf"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define nutrition and distinguish between autotrophic and heterotrophic nutrition.", answer: "Nutrition is the supply of materials and energy an organism needs for its life processes. Autotrophic nutrition is making food from simple inorganic substances; heterotrophic nutrition is obtaining food from other living things or dead matter." },
    { number: 16, kind: "Theory", prompt: "Write the word equation and the chemical equation for photosynthesis, naming the raw materials and products.", answer: "Word: carbon dioxide + water → glucose + oxygen (in light and chlorophyll). Chemical: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Raw materials: carbon dioxide and water. Products: glucose and oxygen." },
    { number: 17, kind: "Theory", prompt: "Describe four adaptations of a leaf for photosynthesis.", answer: "Any four, with a reason each: broad lamina (large surface for light absorption); stomata (allow carbon dioxide in and oxygen out); thin transparent epidermis (lets light reach the palisade cells); palisade cells with many chloroplasts (absorb more light); thin lamina (short diffusion path); thin waxy cuticle (reduces water loss without blocking light); xylem and phloem in veins (supply water and remove food)." },
    { number: 18, kind: "Theory", prompt: "Describe the light stage of photosynthesis: where it occurs, what it needs and the products it makes.", answer: "The light stage takes place in the grana of the chloroplast and needs light. Chlorophyll absorbs light and becomes energised, which splits water (photolysis) and releases oxygen. Hydrogen is carried by NADP to form NADPH₂. Energy is used to make ATP from ADP. Products: ATP, NADPH₂ and oxygen." },
    { number: 19, kind: "Theory", prompt: "Describe chemosynthesis using sulphur bacteria, and state one difference between chemosynthesis and photosynthesis.", answer: "Sulphur bacteria oxidise hydrogen sulphide: 2H₂S + O₂ → 2S + 2H₂O + chemical energy. This energy is used to combine hydrogen sulphide and carbon dioxide to form sugar. Difference: chemosynthesis uses energy from chemical reactions, while photosynthesis uses light energy from the sun (and chemosynthesis releases no oxygen)." },
    { number: 20, kind: "Theory", prompt: "Describe how you would test a green leaf for starch, giving the reason for each step.", answer: "Boil the leaf in water for about five minutes (kills cells, stops enzymes, bursts starch grains). Place it in warm alcohol in a water bath to remove the chlorophyll (the leaf turns colourless). Soften it in warm water. Place it in dilute iodine solution; blue-black colour shows starch is present." },
  ] as PracticeQuestion[],
};
