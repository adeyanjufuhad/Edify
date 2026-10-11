import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek11: Lesson = {
  id: "ss1-first-biology-week-11",
  week: "Week 11",
  title: "Revision & examination",
  subtitle: "Pull together Weeks 1 to 10: key facts, equations, diagrams to practise, exam technique and a 20-question mock paper.",
  source: "Written by Edify as revision for the SS1 First Term Biology scheme of work. The revision notes and the mock examination are original.",
  objectives: [
    "Recall the key definitions and facts from Weeks 1 to 10 of First Term Biology.",
    "Write the equations for photosynthesis and respiration from memory.",
    "Draw and label the diagrams most often asked for.",
    "Use good technique to answer objective and theory questions in a timed paper.",
  ],
  sections: [
    {
      heading: "1. Key facts by week",
      paragraphs: [
        "Weeks 1 and 2: biology is the study of living things; botany and zoology are its main branches. The scientific method runs observation, hypothesis, experiment, analysis, conclusion, communication, and a controlled experiment changes only one variable. Living things show movement, respiration, nutrition, irritability, growth, excretion and reproduction (and also competition, adaptation and death). Viruses link the living and non-living worlds.",
        "Weeks 3 to 5: classification groups organisms from kingdom to species; Linnaeus introduced two-part names (genus with a capital, species with a small letter). The five kingdoms are Monera, Protista, Fungi, Plantae and Animalia. Life is organised as cell, tissue, organ, system and organism; complexity brings specialisation but a small surface area to volume ratio.",
        "Weeks 6 to 8: respiration releases energy from food in cells, aerobically (with oxygen, much energy) or anaerobically (little energy). ATP is the energy currency. Photosynthesis makes glucose from carbon dioxide and water using light and chlorophyll; the leaf is adapted for it; chemosynthesis uses energy from inorganic reactions. Weeks 9 and 10: carbon, oxygen, water and nitrogen are recycled; heterotrophs feed holozoically, saprophytically, parasitically or symbiotically.",
      ],
    },
    {
      heading: "2. Equations to memorise",
      paragraphs: [
        "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light, chlorophyll). Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. Anaerobic respiration in yeast: glucose → ethanol + carbon dioxide + a little energy. Anaerobic respiration in muscle: glucose → lactic acid + a little energy. ATP: ADP + phosphate + energy ⇌ ATP.",
        "Notice that aerobic respiration is the reverse of photosynthesis, with energy released instead of absorbed. Practise writing both until you cannot confuse them.",
      ],
    },
    {
      heading: "3. Diagrams to draw",
      paragraphs: [
        "Practise these until you can draw and label them in under two minutes: a section through a leaf; the carbon cycle; the nitrogen cycle; the water cycle; the human alimentary canal; the taxonomic hierarchy for the human being; the levels of organisation; and a starch test of a leaf. Use a sharp pencil, draw large, label with straight lines that touch the part, and give the diagram a title.",
      ],
      diagram: "Draw a leaf section and label cuticle, upper epidermis, palisade mesophyll, spongy mesophyll, vein, lower epidermis and stoma with guard cells. Beside it, draw a cycle with CO₂ in the air, plants, animals, decomposers and fossil fuels.",
    },
    {
      heading: "4. Exam technique",
      paragraphs: [
        "Read every question twice, underline the command word and watch for words such as ‘not’ and ‘except’. In an objective paper, answer all the questions you are sure of first, then return to the harder ones, and never leave a blank. In theory questions, write in short, clear points: ‘state’ needs the fact, ‘describe’ needs the steps or features, ‘explain’ needs a reason, and ‘compare’ needs both sides (use ‘whereas’ or a table).",
        "Marks are given for correct terms: say ‘photosynthesis’ not ‘making food’; ‘differentiation’ not ‘changing’. Manage time: if a part carries 2 marks, give two points. Leave a few minutes at the end to check spelling of scientific names and equations.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Biology is the study of living things, not only ‘plants and animals’.",
    "Respiration is not breathing. Respiration releases energy from food in cells.",
    "Scientific names: genus with a capital, species with a small letter; italic or underlined.",
    "Order of organisation: cell, tissue, organ, system, organism.",
    "Aerobic respiration: glucose + oxygen → carbon dioxide + water + energy. Photosynthesis is its reverse in matter, but it stores energy.",
    "The oxygen from photosynthesis comes from water. The dark stage does not need darkness.",
    "Nitrification and denitrification are opposites. Nitrosomonas makes nitrites; Nitrobacter makes nitrates.",
    "Egestion is not excretion. One removes undigested food; the other removes metabolic wastes.",
    "In mutualism both partners gain; in commensalism one gains; in parasitism one gains and the other is harmed.",
    "Draw diagrams large, label with lines that touch the part, and give them titles.",
  ],
  summary:
    "This week brings together Weeks 1 to 10. Know the definitions, the two key energy equations, the cycles and the types of nutrition; practise the diagrams; and use sound exam technique. Use the mock examination to find the topics that still need revision.",
  quick: {
    intro: "A quick tour of the term. If any line is unfamiliar, go back to that week.",
    blocks: [
      {
        heading: "1. Weeks 1–2: Introduction and characteristics",
        points: [
          "Biology = study of living things; botany and zoology.",
          "Scientific method: observation → hypothesis → experiment → analysis → conclusion → communication.",
          "Controlled experiment: one variable, constants, control.",
          "Characteristics: movement, respiration, nutrition, irritability, growth, excretion, reproduction.",
        ],
      },
      {
        heading: "2. Weeks 3–5: Classification and organisation",
        points: [
          "Kingdom → phylum → class → order → family → genus → species.",
          "Five kingdoms: Monera, Protista, Fungi, Plantae, Animalia.",
          "Cell → tissue → organ → system → organism.",
          "Complexity: specialisation, but small surface area to volume ratio.",
        ],
      },
      {
        heading: "3. Week 6: Respiration and ATP",
        points: [
          "Aerobic: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.",
          "Anaerobic: yeast gives ethanol and CO₂; muscle gives lactic acid.",
          "ATP: the energy currency.",
        ],
      },
      {
        heading: "4. Weeks 7–8: Photosynthesis and chemosynthesis",
        points: [
          "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.",
          "Light stage in grana; dark stage in stroma.",
          "Chemosynthesis: bacteria, energy from inorganic oxidation.",
          "Starch test: blue-black with iodine.",
        ],
      },
      {
        heading: "5. Week 9: Nutrient cycles",
        points: [
          "Carbon: photosynthesis removes CO₂; respiration, decay, burning return it.",
          "Water: evaporation, transpiration, condensation, precipitation.",
          "Nitrogen: fixation, ammonification, nitrification, denitrification.",
        ],
      },
      {
        heading: "6. Week 10: Heterotrophic nutrition",
        points: [
          "Holozoic, saprophytic, parasitic, symbiotic.",
          "Digestion: mouth (amylase), stomach (pepsin), duodenum (bile, lipase, trypsin), ileum (absorption).",
          "Mutualism, commensalism, parasitism.",
        ],
      },
    ],
    likely: [
      { question: "Define biology and name its main branches.", answer: "The study of living things; botany and zoology." },
      { question: "State the steps of the scientific method.", answer: "Observation, hypothesis, experiment, analysis, conclusion, communication." },
      { question: "Differentiate between respiration and breathing.", answer: "Respiration releases energy from food in cells; breathing is the movement of air into and out of the lungs." },
      { question: "State the levels of the taxonomic hierarchy.", answer: "Kingdom, phylum, class, order, family, genus, species." },
      { question: "List the five kingdoms.", answer: "Monera, Protista, Fungi, Plantae, Animalia." },
      { question: "Arrange the levels of organisation.", answer: "Cell, tissue, organ, system, organism." },
      { question: "Write the equation for aerobic respiration.", answer: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy." },
      { question: "Write the equation for photosynthesis.", answer: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ in light and chlorophyll." },
      { question: "What is chemosynthesis?", answer: "Making food from carbon dioxide and water using energy from the oxidation of inorganic substances, by some bacteria." },
      { question: "State the roles of Nitrosomonas, Nitrobacter and Rhizobium.", answer: "Nitrosomonas: ammonia to nitrite. Nitrobacter: nitrite to nitrate. Rhizobium: fixes nitrogen in legume root nodules." },
      { question: "List the types of heterotrophic nutrition.", answer: "Holozoic, saprophytic, parasitic and symbiotic." },
      { question: "State the end products of digestion.", answer: "Glucose, amino acids, fatty acids and glycerol." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The branch of biology that studies how living things interact with their environment is", options: ["genetics", "ecology", "taxonomy", "anatomy"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "A plant is kept in the dark for two days before an experiment on photosynthesis so that", options: ["it grows taller", "any starch found later was made during the experiment", "it produces more oxygen", "it loses water"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The ability to detect and respond to changes in the surroundings is called", options: ["growth", "irritability", "excretion", "nutrition"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Which of these is a correctly written scientific name?", options: ["homo sapiens", "Homo Sapiens", "Homo sapiens", "HOMO sapiens"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "Organisms whose cell walls contain chitin belong to the kingdom", options: ["Plantae", "Fungi", "Monera", "Animalia"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "A fern is classified as a", options: ["bryophyte", "pteridophyte", "gymnosperm", "angiosperm"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The heart is an example of", options: ["a cell", "a tissue", "an organ", "a system"], answer: "C" },
    { number: 8, kind: "Objective", prompt: "The plant tissue that carries water upward from the roots is the", options: ["phloem", "xylem", "epidermis", "meristem"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Which equation represents anaerobic respiration in yeast?", options: ["Glucose → lactic acid + energy", "Glucose → ethanol + carbon dioxide + energy", "Glucose + oxygen → carbon dioxide + water + energy", "Carbon dioxide + water → glucose + oxygen"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "ATP is made from ADP and", options: ["glucose", "phosphate", "oxygen", "water"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "The oxygen released in photosynthesis comes from", options: ["carbon dioxide", "water", "glucose", "chlorophyll"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "The bacteria that convert nitrites to nitrates are", options: ["Rhizobium", "Nitrosomonas", "Nitrobacter", "Azotobacter"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Starch in the mouth is digested by", options: ["pepsin", "salivary amylase", "lipase", "trypsin"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "A relationship in which both organisms benefit is", options: ["parasitism", "commensalism", "mutualism", "saprophytism"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "State seven characteristics of living things and distinguish respiration from breathing.", answer: "Movement, respiration, nutrition, irritability, growth, excretion, reproduction. Respiration is the release of energy from food in cells; breathing is the movement of air in and out of the lungs." },
    { number: 16, kind: "Theory", prompt: "Write the taxonomic levels from broadest to narrowest, the rules for writing a scientific name, and the names of the five kingdoms.", answer: "Kingdom, phylum, class, order, family, genus, species. Genus with a capital letter, species with a small letter, italic or underlined (Zea mays). Monera, Protista, Fungi, Plantae, Animalia." },
    { number: 17, kind: "Theory", prompt: "Explain two advantages and two disadvantages of being a complex multicellular organism.", answer: "Advantages: division of labour among specialised cells makes the body efficient; the organism can grow large and live in many habitats. Disadvantages: cells depend on each other; the small surface area to volume ratio makes diffusion too slow, so transport systems are needed." },
    { number: 18, kind: "Theory", prompt: "Compare aerobic and anaerobic respiration, giving the equation for aerobic respiration.", answer: "Aerobic respiration needs oxygen, breaks glucose down completely, gives carbon dioxide and water and releases much energy: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. Anaerobic respiration needs no oxygen, breaks glucose down partly, gives ethanol and carbon dioxide (yeast) or lactic acid (muscle) and releases little energy." },
    { number: 19, kind: "Theory", prompt: "Write the equation for photosynthesis, state four adaptations of the leaf for it, and describe an experiment to show that chlorophyll is needed.", answer: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ in light. Adaptations: broad thin blade, transparent cuticle, palisade cells with chloroplasts, air spaces, stomata, veins. Experiment: test a variegated leaf for starch; only the green parts turn blue-black." },
    { number: 20, kind: "Theory", prompt: "Describe the nitrogen cycle and name the four types of heterotrophic nutrition with an example of each.", answer: "Nitrogen is fixed by Rhizobium and lightning; plants absorb nitrates; animals eat plants; decay produces ammonia; Nitrosomonas and Nitrobacter produce nitrites and nitrates; denitrifying bacteria return nitrogen to the air. Heterotrophic nutrition: holozoic (goat), saprophytic (Mucor), parasitic (tapeworm), symbiotic (lichen)." },
  ] as PracticeQuestion[],
};
