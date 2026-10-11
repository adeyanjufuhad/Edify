import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek11: Lesson = {
  id: "ss1-first-biology-week-11",
  week: "Week 11",
  title: "Revision & examination",
  subtitle: "Weeks 1–10 in one place: the key facts to recall, the equations and diagrams to know, and a 20-question mock examination with the answers explained.",
  source: "Original revision notes compiled from Edify’s Weeks 1–10, which are based chiefly on Hidden Facts in SSCE Biology. The revision notes and the mock examination are newly written for Edify.",
  objectives: [
    "Recall the key definitions and facts from Weeks 1–10 of First Term Biology.",
    "Write the equations for photosynthesis and aerobic respiration from memory.",
    "Draw and label the diagrams most often asked for, including the leaf, the carbon cycle and the hierarchy.",
    "Answer a mixed set of objective and theory questions under timed conditions.",
  ],
  sections: [
    {
      heading: "1. Key facts by week",
      paragraphs: [
        "Week 1 is about biology as the study of life, with botany (plants) and zoology (animals) as its two main branches. The scientific method runs: observation, hypothesis, experiment, analysis, conclusion, sharing results. A controlled experiment changes one variable and keeps the rest constant.",
        "Week 2 lists the ten characteristics of living things (MR NIGER CAD). Plants make their own food and are fixed; animals feed on others and move their whole body. Viruses are the link between living and non-living things.",
        "Weeks 3–4 cover classification: kingdom, phylum (division), class, order, family, genus, species. Linnaeus introduced binomial nomenclature. The five kingdoms are Monera, Protista, Fungi, Plantae and Animalia. Humans are Homo sapiens.",
        "Week 5 covers the levels of organisation: cell, tissue, organ, system and organism. Complexity brings specialisation and efficiency, but it reduces cell independence and makes diffusion too slow for the whole body.",
        "Week 6 covers respiration. Aerobic respiration takes place in two stages: glycolysis in the cytoplasm and the Krebs cycle in the mitochondria. Anaerobic respiration gives much less energy. ATP is the energy currency of the cell.",
        "Weeks 7–8 cover autotrophic nutrition. Photosynthesis uses light and chlorophyll to make glucose and oxygen. The light stage (grana) makes ATP and NADPH₂; the dark stage (stroma) fixes carbon dioxide into sugar. Chemosynthesis uses chemical energy, as sulphur bacteria do.",
        "Week 9 covers nutrient cycles. Photosynthesis removes carbon dioxide; respiration, decay and burning return it. Water is recycled by evaporation, condensation and transpiration. Nitrogen gas must be fixed by bacteria such as Rhizobium before plants can use it.",
        "Week 10 covers heterotrophic nutrition: holozoic (herbivores, carnivores, omnivores), saprophytic (external digestion), symbiotic (lichen) and parasitic (ectoparasites and endoparasites, with adaptations such as the tapeworm’s hooks and suckers).",
      ],
    },
    {
      heading: "2. Equations to memorise",
      paragraphs: [
        "Photosynthesis: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in light and chlorophyll).",
        "Aerobic respiration: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP).",
        "Anaerobic respiration in yeast: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy.",
        "Sulphur bacteria chemosynthesis: 2H₂S + O₂ → 2S + 2H₂O + chemical energy.",
      ],
    },
    {
      heading: "3. Diagrams to draw",
      paragraphs: [
        "Draw the scientific method as a cycle, the hierarchy of classification as nested boxes, the four levels of organisation as stacked boxes, the leaf in cross-section (palisade mesophyll, stoma, xylem and phloem), the carbon cycle around an atmosphere circle, the nitrogen cycle, and the stages of holozoic nutrition in man.",
      ],
    },
    {
      heading: "4. Exam technique",
      paragraphs: [
        "Read the question twice and underline the command word: define, state, list, describe, explain, or distinguish. ‘State’ and ‘list’ need short answers; ‘explain’ and ‘describe’ need reasons and steps. Give the number of points asked for, no more and no fewer.",
        "In objective questions, eliminate the options that are clearly wrong first. Watch for ‘NOT’ in the question. In theory answers, write the equation with its arrow and its conditions, and label every diagram with a title.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The most common lost marks across this term are the order of the scientific method, the position of the lowest and highest levels of classification, and the place where each stage of respiration happens.",
    "Breathing is not respiration. Respiration happens in the cells and releases energy; breathing moves air.",
    "Put the photosynthesis conditions over the arrow (light and chlorophyll) and say that the oxygen comes from water.",
    "Keep the two nitrifying bacteria straight: Nitrosomonas makes nitrite; Nitrobacter makes nitrate.",
    "Ferns are not seed plants, fungi are not plants, and Plasmodium is a protozoan. Each of these is a common trap in classification questions.",
    "Holozoic digestion is inside the body; saprophytic digestion is outside it. Give this contrast in one sentence.",
    "The water cycle is not a permanent loss. Transpiration belongs to the water cycle, not the carbon cycle.",
  ],
  summary: "First Term Biology is the study of life and how living things are organised, classified, respire, feed and interact with their environment. Remember the ten characteristics, the levels of organisation, the five kingdoms, the two equations of photosynthesis and respiration, and the four types of heterotrophic nutrition. Practise drawing the diagrams and writing the equations under time.",
  quick: {
    intro: "Revision by block. Read each block, close the book, and say the points aloud before you check.",
    blocks: [
      {
        heading: "1. Weeks 1–2: Introduction and characteristics",
        points: [
          "Biology = study of life; botany (plants), zoology (animals).",
          "Scientific method: O-H-E-A-C-S.",
          "Ten characteristics: MR NIGER CAD.",
          "Plants make food; animals take food.",
          "Viruses: link between living and non-living.",
        ],
      },
      {
        heading: "2. Weeks 3–5: Classification and organisation",
        points: [
          "Hierarchy: King Philip Came Over For Good Soup.",
          "Five kingdoms: Monera, Protista, Fungi, Plantae, Animalia.",
          "Homo sapiens; Linnaeus; binomial nomenclature.",
          "Levels: cell, tissue, organ, system, organism.",
          "Complexity: advantages and disadvantages, surface area to volume ratio.",
        ],
      },
      {
        heading: "3. Week 6: Respiration and ATP",
        points: [
          "Aerobic: glycolysis (cytoplasm), Krebs cycle (mitochondria), 36 to 38 ATP.",
          "Anaerobic: yeast gives ethyl alcohol and CO₂; muscles give lactic acid.",
          "ATP = energy currency.",
          "Test for CO₂: limewater turns milky.",
        ],
      },
      {
        heading: "4. Weeks 7–8: Photosynthesis and chemosynthesis",
        points: [
          "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (light and chlorophyll).",
          "Light stage in grana; dark stage in stroma.",
          "Leaf: BROAD leaf, THIN skin, STOMATA, PALISADE, VEINS.",
          "Chemosynthesis: sulphur bacteria, chemical energy.",
          "Starch test: boil, alcohol, iodine (blue-black).",
        ],
      },
      {
        heading: "5. Week 9: Nutrient cycles",
        points: [
          "Carbon: photosynthesis removes CO₂; respiration, decay and burning return it.",
          "Water: evaporation, condensation, transpiration.",
          "Nitrogen: lightning, fixation (Rhizobium, Azotobacter), nitrification, ammonification, denitrification, leaching.",
        ],
      },
      {
        heading: "6. Week 10: Heterotrophic nutrition",
        points: [
          "H-S-S-P: Holozoic, Saprophytic, Symbiotic, Parasitic.",
          "I-D-A-A-E: Ingest, Digest, Absorb, Assimilate, Egest.",
          "Ectoparasite (surface), endoparasite (inside), Plasmodium is a protozoan.",
          "Lichen: fungus and alga, both benefit.",
        ],
      },
    ],
    likely: [
      { question: "Name the four levels of organisation of life.", answer: "Cell, tissue, organ and system." },
      { question: "State the five kingdoms.", answer: "Monera, Protista, Fungi, Plantae and Animalia." },
      { question: "Write the chemical equation for photosynthesis.", answer: "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (in light and chlorophyll)." },
      { question: "Where does the Krebs cycle take place?", answer: "In the mitochondria, and it needs oxygen." },
      { question: "Name the two stages of aerobic respiration and where each takes place.", answer: "Glycolysis in the cytoplasm; the Krebs cycle in the mitochondria." },
      { question: "What is the difference between a predator and a scavenger?", answer: "A predator kills living prey; a scavenger feeds on dead animals." },
      { question: "Name two nitrogen-fixing bacteria.", answer: "Rhizobium (root nodules of legumes), Azotobacter or Clostridium (free-living)." },
      { question: "State the stages of holozoic nutrition in man.", answer: "Ingestion, digestion, absorption, assimilation and egestion." },
      { question: "State three characteristics of fungi.", answer: "Any three of: heterotrophic decomposers; chitin cell walls; glycogen stored; no chlorophyll; non-motile." },
      { question: "What is the function of the palisade mesophyll?", answer: "It is the main site of photosynthesis: it contains the most chloroplasts and lies just under the upper epidermis." },
      { question: "Which process returns carbon dioxide to the air?", answer: "Respiration, decay and burning of fuel." },
      { question: "What is the energy currency of the cell?", answer: "ATP (adenosine triphosphate)." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Biology is best defined as the study of", options: ["the earth", "plants only", "life", "animals only"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "Which of these is NOT one of the ten characteristics of living things?", options: ["Crystallisation", "Irritability", "Growth", "Excretion"], answer: "A" },
    { number: 3, kind: "Objective", prompt: "Aerobic respiration takes place mainly in the", options: ["cytoplasm", "mitochondria", "nucleus", "vacuole"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Which sequence is from simplest to most complex?", options: ["tissue, cell, organ, system", "organ, system, cell, tissue", "cell, tissue, organ, system", "system, organ, tissue, cell"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "The kingdom that contains bacteria is", options: ["Protista", "Fungi", "Plantae", "Monera"], answer: "D" },
    { number: 6, kind: "Objective", prompt: "ATP is best described as", options: ["a type of gas", "a mineral", "the energy currency of the cell", "a sugar"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Which process removes carbon dioxide from the atmosphere?", options: ["respiration", "photosynthesis", "decay", "combustion"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Rhizobium fixes nitrogen in", options: ["the leaves", "root nodules of leguminous plants", "the stomata", "the xylem"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Chemosynthesis is carried out by", options: ["maize", "sulphur bacteria", "mushrooms", "grasshoppers"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The stage of holozoic nutrition that removes undigested material is", options: ["ingestion", "egestion", "digestion", "absorption"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "A scavenger is", options: ["a lion that hunts zebras", "a tapeworm in a host", "a mushroom growing on wood", "a vulture that eats dead animals"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "The stomata of a leaf allow", options: ["water to be stored", "chlorophyll to be made", "carbon dioxide in and oxygen out", "the leaf to be held up"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Which of these is an endoparasite?", options: ["Tick", "Tapeworm", "Flea", "Mite"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Oxygen makes up about what percentage of the air?", options: ["0.03%", "78%", "50%", "21%"], answer: "D" },
    { number: 15, kind: "Theory", prompt: "Define respiration and write its chemical equation for aerobic respiration.", answer: "Respiration is the oxidation of food substances, such as glucose, inside the cells to release energy. Chemical equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP)." },
    { number: 16, kind: "Theory", prompt: "Describe the scientific method in order, from observation to sharing results.", answer: "Observation of a natural event; a hypothesis to explain it; design and carry out an experiment to test the hypothesis; analyse the results; draw a conclusion and accept, reject or modify the hypothesis; share the results so that others can verify them." },
    { number: 17, kind: "Theory", prompt: "Explain why multicellular organisms need transport systems, using surface area to volume ratio.", answer: "Multicellular organisms have a small surface area to volume ratio, so substances cannot reach all cells efficiently by diffusion alone. Transport systems, such as blood and the xylem and phloem, move substances around the body quickly enough to supply every cell." },
    { number: 18, kind: "Theory", prompt: "Describe the light stage and the dark stage of photosynthesis, stating where each takes place.", answer: "The light stage takes place in the grana of the chloroplast and needs light: water is split (photolysis), oxygen is released, and ATP and NADPH₂ are made. The dark stage takes place in the stroma and does not need light directly: it uses ATP and NADPH₂ to fix carbon dioxide into sugar." },
    { number: 19, kind: "Theory", prompt: "Describe four processes of the nitrogen cycle.", answer: "Any four of: lightning (nitrogen oxides dissolve in rain to form nitrates); nitrogen fixation (Rhizobium in root nodules, or free-living Azotobacter); nitrification (Nitrosomonas makes nitrite, Nitrobacter makes nitrate); ammonification (decay produces ammonium compounds); denitrification (nitrates reduced to nitrogen gas); leaching (nitrogen washed out by rain)." },
    { number: 20, kind: "Theory", prompt: "Classify man through the hierarchy, from kingdom to species.", answer: "Kingdom Animalia; phylum Chordata; subphylum Vertebrata; class Mammalia; order Primates; family Hominidae; genus Homo; species sapiens. The scientific name is Homo sapiens." },
  ] as PracticeQuestion[],
};
