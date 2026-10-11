import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek6: Lesson = {
  id: "ss1-first-biology-week-6",
  week: "Week 06",
  title: "Energy: respiration and ATP",
  subtitle: "How living cells release the energy in food: aerobic and anaerobic respiration, the stages in the cell, and ATP as the cell’s energy currency.",
  source: "Original teaching notes based chiefly on Hidden Facts in SSCE Biology, Chapter Nine, ‘Cellular respiration’ (PDF pages 177–182). The explanations and practice questions below are newly written for Edify.",
  objectives: [
    "Define respiration and explain why every living cell needs energy.",
    "Write the word and chemical equations for aerobic respiration.",
    "Compare aerobic and anaerobic respiration, naming where each takes place and giving examples.",
    "Explain how energy is stored and released using ATP.",
    "Distinguish respiration from breathing (gaseous exchange) and from photosynthesis.",
  ],
  sections: [
    {
      heading: "1. Why living things need energy",
      paragraphs: [
        "Every activity of a living thing needs energy: movement, growth, reproduction, active transport and the building of new substances. This energy is locked in food, mainly in glucose, which is made by photosynthesis in plants and taken in as food by animals.",
        "Energy in food is released by respiration. Respiration is the process by which living things oxidise food substances, such as glucose, in a series of chemical reactions to release energy. Carbon dioxide and water are the by-products. Respiration takes place in every living cell, in plants as well as animals.",
      ],
    },
    {
      heading: "2. Aerobic respiration",
      paragraphs: [
        "In aerobic respiration, oxygen is used to oxidise glucose completely. The overall word equation is: glucose + oxygen → carbon dioxide + water + energy (stored as ATP). The chemical equation is C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.",
        "The process happens in two stages. The first stage is glycolysis, which takes place in the cytoplasm. Glucose is broken down into two molecules of pyruvic acid (pyruvate), and a small amount of ATP is made. Glycolysis does not need oxygen. The second stage is the Krebs cycle (also called the citric acid cycle), which takes place in the mitochondria and needs oxygen. Pyruvate is completely broken down into carbon dioxide and water, and most of the energy is released in this stage.",
        "The total yield for one glucose molecule is about 36 to 38 molecules of ATP, depending on the textbook. The number of ATP made in glycolysis itself is only two.",
      ],
      points: [
        "Stage 1, glycolysis: cytoplasm; glucose → pyruvate; small amount of ATP; no oxygen needed.",
        "Stage 2, Krebs cycle: mitochondria; oxygen needed; CO₂ and water released; most ATP made.",
      ],
      diagram: "Draw a vertical flow: GLUCOSE (cytoplasm) → GLYCOLYSIS → PYRUVATE → enters the MITOCHONDRION → KREBS CYCLE → CO₂ + H₂O + ATP. Label the arrow into the mitochondrion ‘oxygen needed’.",
    },
    {
      heading: "3. Anaerobic respiration",
      paragraphs: [
        "Anaerobic respiration releases energy from glucose without oxygen. It takes place in the cytoplasm and releases much less energy than aerobic respiration. In yeast, glucose is converted to ethyl alcohol and carbon dioxide, with a small amount of ATP: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ + energy. This is alcoholic fermentation, used in baking and brewing.",
        "Some animal muscles, during very hard exercise when oxygen runs short, convert glucose into lactic acid. Other organisms that respire anaerobically include yeast, some bacteria, fungi and endoparasites such as the tapeworm and the roundworm.",
      ],
    },
    {
      heading: "4. ATP: the energy currency of the cell",
      paragraphs: [
        "The energy released by respiration is not used directly. Instead it is captured in adenosine triphosphate (ATP), which the cell can use to do work. ATP is formed from adenosine diphosphate (ADP) and a phosphate group, storing energy in the bond that joins the phosphate. When that bond is broken, ATP becomes ADP and energy is released for the cell to use. Because ATP is used and remade constantly, it is called the energy currency of the cell.",
      ],
    },
    {
      heading: "5. Respiration, gaseous exchange and photosynthesis",
      paragraphs: [
        "Gaseous exchange is the physical movement of oxygen into an organism and carbon dioxide out of it, through the lungs, gills, stomata or lenticels. Breathing is one form of gaseous exchange. Respiration is a chemical process that happens inside cells and releases energy. Photosynthesis is the opposite of respiration: it uses energy from light to build glucose and releases oxygen.",
      ],
      points: [
        "Respiration: in cells; releases energy; uses oxygen (aerobic); decreases a plant’s dry weight.",
        "Gaseous exchange: physical movement of gases; no energy released; no enzymes.",
        "Photosynthesis: in chloroplasts; uses energy; releases oxygen; increases dry weight.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Respiration is not breathing. Breathing (inhalation and exhalation) moves air. Respiration happens inside the cells, in the mitochondria and cytoplasm, and releases energy.",
    "The ATP yield for aerobic respiration is given as 36 or 38 molecules in different textbooks. Learn the stage-by-stage picture and state the figure your teacher uses.",
    "Glycolysis does not need oxygen and happens in the cytoplasm. Only the Krebs cycle needs oxygen and takes place in the mitochondria. ‘All respiration takes place in the mitochondria’ is only partly right.",
    "Anaerobic respiration releases far less energy from glucose than aerobic respiration. Answer ‘why’ questions by explaining that much of the energy stays locked in the products (ethanol or lactic acid).",
    "Aerobic respiration takes place in the mitochondria; anaerobic respiration takes place in the cytoplasm. Use these two locations to answer questions about where each occurs.",
    "To show that respiration gives off carbon dioxide, bubble the gas from germinating seeds or a yeast mixture through limewater (calcium hydroxide). The limewater turns milky.",
    "Respiration makes a plant lose dry weight, because carbon leaves as carbon dioxide. Photosynthesis makes the plant gain dry weight. Do not mix these two statements up in comparisons.",
  ],
  summary: "Respiration releases the energy in food inside living cells. In aerobic respiration, glucose is completely oxidised with oxygen in two stages: glycolysis in the cytoplasm and the Krebs cycle in the mitochondria, giving carbon dioxide, water and about 36 to 38 ATP. Anaerobic respiration works without oxygen, gives much less energy, and produces alcohol or lactic acid. ATP stores the released energy for the cell to use.",
  quick: {
    intro: "Equations, locations and the numbers. The most common mistakes are mixing up breathing with respiration and putting the two stages in the wrong place.",
    blocks: [
      {
        heading: "1. Respiration: definition and equation",
        points: [
          "Respiration = the oxidation of food (glucose) in cells to release energy.",
          "Word equation: glucose + oxygen → carbon dioxide + water + energy.",
          "Chemical equation: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy (ATP).",
          "Happens in every living cell, in plants and animals, day and night.",
        ],
        memory: "Respiration RELEASES energy. Photosynthesis USES energy.",
      },
      {
        heading: "2. Aerobic stages",
        points: [
          "Glycolysis: cytoplasm; glucose → pyruvate; no oxygen; small ATP yield (2).",
          "Krebs (citric acid) cycle: mitochondria; oxygen needed; CO₂ and water released.",
          "Total for one glucose: about 36 to 38 ATP.",
          "Mitochondria = the ‘power house’ of the cell.",
        ],
        memory: "Glycolysis in the Cytoplasm, Krebs in the Mitochondria.",
      },
      {
        heading: "3. Anaerobic respiration",
        points: [
          "No oxygen. Takes place in the cytoplasm.",
          "Yeast: glucose → ethyl alcohol + carbon dioxide + energy (2 ATP).",
          "Muscles in hard exercise: glucose → lactic acid.",
          "Organisms: yeast, bacteria, fungi, endoparasites (tapeworm, roundworm).",
        ],
        warning: "Anaerobic respiration releases far less energy than aerobic respiration.",
      },
      {
        heading: "4. ATP",
        points: [
          "ATP = adenosine triphosphate; the energy currency of the cell.",
          "Energy is stored in the phosphate bond of ATP.",
          "ATP → ADP + phosphate releases energy for the cell’s work.",
        ],
      },
      {
        heading: "5. Testing for carbon dioxide",
        points: [
          "Bubble the gas from germinating seeds or yeast through limewater.",
          "Limewater (calcium hydroxide) turns milky: carbon dioxide is present.",
        ],
      },
    ],
    likely: [
      { question: "Define respiration.", answer: "The process by which living things oxidise organic food substances, such as glucose, to release energy for metabolic activities, with or without oxygen." },
      { question: "Where does aerobic respiration take place?", answer: "In the mitochondria of the cell (the Krebs cycle), and the first stage, glycolysis, in the cytoplasm." },
      { question: "Where does anaerobic respiration take place?", answer: "In the cytoplasm of the cell." },
      { question: "What is the energy carrier made in respiration?", answer: "Adenosine triphosphate (ATP)." },
      { question: "State two differences between aerobic and anaerobic respiration.", answer: "Aerobic respiration needs oxygen and releases much more energy; anaerobic respiration works without oxygen and releases less energy, producing alcohol or lactic acid." },
      { question: "Name two organisms that respire anaerobically.", answer: "Any two of: yeast, bacteria, fungi, endoparasites such as tapeworm and roundworm." },
      { question: "Why is ATP called the energy currency of the cell?", answer: "It stores energy in its phosphate bond and is constantly used and remade, carrying energy to wherever the cell needs it." },
      { question: "How can you show that respiration gives off carbon dioxide?", answer: "Pass the gas from germinating seeds or yeast into limewater; the limewater turns milky." },
      { question: "State the difference between breathing and respiration.", answer: "Breathing is the movement of air (gaseous exchange) into and out of the body. Respiration is the chemical release of energy from food inside the cells." },
      { question: "What happens to a plant’s dry weight during respiration?", answer: "It decreases, because carbon leaves the plant as carbon dioxide." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Respiration is best defined as", options: ["breathing", "the uptake of carbon dioxide", "the making of food by plants", "the process of releasing energy from food substances"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "The energy carrier produced by respiration is", options: ["glucose", "ATP", "oxygen", "starch"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Aerobic respiration takes place mainly in the", options: ["cytoplasm", "mitochondria", "nucleus", "chloroplast"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The first stage of respiration, which takes place in the cytoplasm, is", options: ["the Krebs cycle", "glycolysis", "photolysis", "transpiration"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Which of these organisms respires anaerobically?", options: ["A man at rest", "Yeast", "A lion", "A maize plant"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "The gas produced in respiration that turns limewater milky is", options: ["oxygen", "nitrogen", "carbon dioxide", "hydrogen"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "The equation for aerobic respiration shows that glucose reacts with", options: ["carbon dioxide", "nitrogen", "water only", "oxygen"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "The products of aerobic respiration are", options: ["oxygen and glucose", "starch and water", "nitrogen and carbon dioxide", "carbon dioxide, water and energy"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "Anaerobic respiration in yeast produces", options: ["alcohol and carbon dioxide", "lactic acid", "oxygen", "ATP only"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "ATP is described as", options: ["a type of sugar", "the energy currency of the cell", "a gas", "a mineral"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Which process releases oxygen into the atmosphere?", options: ["photosynthesis", "respiration", "breathing", "excretion"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "During respiration, the dry weight of a plant", options: ["decreases", "increases", "stays the same", "becomes zero"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "Gaseous exchange differs from aerobic respiration because gaseous exchange", options: ["releases energy", "is a chemical process", "is the physical movement of gases", "uses enzymes"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "The Krebs cycle takes place in the", options: ["cytoplasm", "nucleus", "cell wall", "mitochondria"], answer: "D" },
    { number: 15, kind: "Theory", prompt: "Define respiration and distinguish it from breathing.", answer: "Respiration is the oxidation of food substances, such as glucose, inside the cells to release energy. Breathing (gaseous exchange) is the physical movement of air into and out of the body. Respiration is chemical and happens in cells; breathing is physical." },
    { number: 16, kind: "Theory", prompt: "Write the word equation and the chemical equation for aerobic respiration.", answer: "Word: glucose + oxygen → carbon dioxide + water + energy (ATP). Chemical: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy." },
    { number: 17, kind: "Theory", prompt: "Describe the two stages of aerobic respiration, stating where each takes place.", answer: "Glycolysis takes place in the cytoplasm: glucose is broken down to pyruvate, with a small amount of ATP and without oxygen. The Krebs cycle takes place in the mitochondria and needs oxygen: pyruvate is completely broken down to carbon dioxide and water, and most of the ATP is made." },
    { number: 18, kind: "Theory", prompt: "Explain why anaerobic respiration releases less energy than aerobic respiration.", answer: "Anaerobic respiration does not completely break down glucose because oxygen is absent. Only glycolysis takes place, which gives two ATP. The products, alcohol or lactic acid, still contain a lot of unreleased energy, so much less energy is released." },
    { number: 19, kind: "Theory", prompt: "Give two reasons why ATP is important to living cells.", answer: "Any two of: ATP stores energy from respiration in its phosphate bonds; ATP releases energy for the cell’s activities such as movement and active transport; ATP is constantly made and used, so it carries energy around the cell." },
    { number: 20, kind: "Theory", prompt: "Describe an experiment to show that germinating seeds produce carbon dioxide during respiration.", answer: "Place germinating seeds in a flask connected by a tube to a test tube of limewater, sealed so that the gas is forced through the limewater. Observe that the limewater turns milky, which shows carbon dioxide is given off. A control of boiled (dead) seeds should not turn the limewater milky." },
  ] as PracticeQuestion[],
};
