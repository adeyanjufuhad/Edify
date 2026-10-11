import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek6: Lesson = {
  id: "ss1-first-biology-week-6",
  week: "Week 06",
  title: "Energy: respiration and ATP",
  subtitle: "Find out how cells release the energy locked in food, what happens when oxygen is missing, and why ATP is called the energy currency.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain why living things need energy and define respiration.",
    "Write the word and chemical equations for aerobic respiration and describe where it happens.",
    "Describe anaerobic respiration in yeast and in muscle, and compare it with aerobic respiration.",
    "Describe the structure and role of ATP.",
    "Distinguish respiration from breathing and from photosynthesis, and describe how to test for carbon dioxide.",
  ],
  sections: [
    {
      heading: "1. Why living things need energy",
      paragraphs: [
        "Every living thing needs energy, all the time. A runner needs it to move, a seedling to grow, a nerve cell to send messages, a bird to keep its body warm, and every cell to build new proteins and to move substances across its membrane. Plants make their food using light energy, but the energy that cells actually use for their work comes from the food they have made or eaten, in a process called respiration.",
        "Respiration is the process by which food substances, usually glucose, are broken down in living cells to release energy. It takes place in all living cells, in plants as well as animals, day and night. It is not the same as breathing: breathing is the movement of air in and out of the lungs, which helps to supply the oxygen that respiration needs.",
      ],
    },
    {
      heading: "2. Aerobic respiration",
      paragraphs: [
        "Aerobic respiration uses oxygen to break down glucose completely. The products are carbon dioxide, water and a large amount of energy. In words: glucose + oxygen → carbon dioxide + water + energy. In symbols: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. One mole of glucose (180 g) releases about 2,870 kJ when it is fully broken down.",
        "It happens in two main stages. The first, glycolysis, takes place in the cytoplasm: a glucose molecule is split into two smaller molecules (pyruvate), releasing a little energy and needing no oxygen. The second stage takes place in the mitochondria, where the pyruvate is completely oxidised to carbon dioxide and water, releasing most of the energy. For this reason the mitochondrion is called the powerhouse of the cell. Cells that need a lot of energy, such as muscle cells, have many mitochondria.",
        "The energy is not released as one burst of heat, which would damage the cell. It is released in small steps controlled by enzymes, and much of it is stored in ATP. The rest is released as heat, which helps warm-blooded animals to keep their body temperature steady.",
      ],
      diagram: "Draw a cell with its cytoplasm and one mitochondrion. Write ‘glucose → 2 pyruvate (glycolysis, no oxygen)’ in the cytoplasm. Write ‘pyruvate + O₂ → CO₂ + H₂O + much energy’ in the mitochondrion. Add an arrow from the mitochondrion labelled ‘ATP’.",
    },
    {
      heading: "3. Anaerobic respiration",
      paragraphs: [
        "Anaerobic respiration is the release of energy from food without using oxygen. The glucose is only partly broken down, so much less energy is released: about 210 kJ per mole of glucose in yeast, compared with about 2,870 kJ in aerobic respiration.",
        "In yeast, and in some bacteria and plant tissues, the process is called alcoholic fermentation: glucose → ethanol + carbon dioxide + a little energy. It is used to make bread, which rises because of the carbon dioxide bubbles, and to make palm wine, beer and other alcoholic drinks. In animal muscle, when oxygen is used up faster than it can be supplied (for example during a sprint), the glucose is broken down to lactic acid: glucose → lactic acid + a little energy. Lactic acid builds up in the muscles and causes cramp and tiredness. Afterwards, the person breathes deeply to supply the extra oxygen needed to remove the lactic acid, which is called repaying the oxygen debt.",
      ],
      points: [
        "Aerobic: needs oxygen; complete breakdown; CO₂ and water; much energy (about 38 ATP per glucose).",
        "Anaerobic: no oxygen; incomplete breakdown; ethanol and CO₂ (yeast) or lactic acid (muscle); little energy (about 2 ATP per glucose).",
      ],
    },
    {
      heading: "4. ATP: the energy currency of the cell",
      paragraphs: [
        "Cells cannot use the energy in glucose directly. Instead, they use it to make a small energy-carrying molecule called ATP, which stands for adenosine triphosphate. ATP is made of the base adenine, the sugar ribose and three phosphate groups joined in a chain.",
        "When the last phosphate group is removed by a reaction with water, ATP becomes ADP (adenosine diphosphate) and a phosphate, and energy is released in a useful form for the cell. When respiration releases energy, it is used to join a phosphate back onto ADP to make ATP again: ADP + phosphate + energy ⇌ ATP. Since ATP is made when energy is available and broken down where energy is needed, it is called the energy currency of the cell. It powers muscle contraction, active transport, making proteins and nerve impulses.",
      ],
    },
    {
      heading: "5. Respiration compared with breathing and photosynthesis",
      paragraphs: [
        "Breathing (ventilation) moves air in and out of the lungs; respiration releases energy from food in cells. Gaseous exchange is the diffusion of oxygen into, and carbon dioxide out of, cells across a surface, and it links breathing to respiration.",
        "Photosynthesis and respiration are opposite processes. In photosynthesis, green plants use light energy to make glucose from carbon dioxide and water, and release oxygen: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂. Respiration uses glucose and oxygen and releases carbon dioxide, water and energy. Photosynthesis happens only in cells with chlorophyll and in the light; respiration happens in every living cell all the time. Together they keep the amounts of oxygen and carbon dioxide in the air fairly steady.",
      ],
    },
    {
      heading: "6. Testing for carbon dioxide",
      paragraphs: [
        "Carbon dioxide is detected with limewater (calcium hydroxide solution), which turns milky or cloudy when carbon dioxide is bubbled through it, or with hydrogencarbonate indicator solution, which changes from red to yellow in the presence of more carbon dioxide.",
        "Experiment: put yeast in a sugar solution in a flask closed with a stopper and delivery tube, and let the tube dip into limewater. After a while, the limewater turns milky, showing that the yeast has produced carbon dioxide in respiration. Another experiment: germinating seeds in a vacuum flask warm up, showing that respiration releases heat.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Respiration is not breathing. Respiration releases energy from food in the cells; breathing moves air in and out of the lungs.",
    "Plants respire all the time, including during the day when they are also photosynthesising.",
    "Write the equation for aerobic respiration correctly: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. Mistaking it for the equation for photosynthesis is a common error.",
    "Anaerobic respiration in yeast gives ethanol and carbon dioxide; in muscle it gives lactic acid. Never swap them.",
    "Aerobic respiration releases far more energy than anaerobic respiration, because the glucose is broken down completely.",
    "ATP is not stored energy in large amounts: it is the energy currency, made and used continually.",
    "Limewater turns milky with carbon dioxide. Hydrogencarbonate indicator turns from red to yellow.",
    "The mitochondrion is the powerhouse of the cell, but glycolysis takes place in the cytoplasm.",
  ],
  summary:
    "Respiration releases energy from food in living cells. Aerobic respiration uses oxygen to break down glucose completely to carbon dioxide and water, releasing much energy, mainly in the mitochondria. Anaerobic respiration works without oxygen and gives ethanol and carbon dioxide in yeast, or lactic acid in muscle, with far less energy. ATP, made from ADP and phosphate using this energy, carries energy to where cells need it. Respiration is different from breathing and is the reverse of photosynthesis, and carbon dioxide is detected with limewater or hydrogencarbonate indicator.",
  quick: {
    intro: "Week 6 revision. Be able to write the equations and compare aerobic with anaerobic respiration.",
    blocks: [
      {
        heading: "1. Respiration",
        points: [
          "Release of energy from food (usually glucose) in living cells.",
          "Happens in all living cells, all the time.",
          "Breathing is only the movement of air.",
        ],
      },
      {
        heading: "2. Aerobic respiration",
        points: [
          "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy.",
          "Glycolysis in cytoplasm; the rest in mitochondria.",
          "About 2,870 kJ per mole of glucose; about 38 ATP.",
        ],
      },
      {
        heading: "3. Anaerobic respiration",
        points: [
          "Yeast: glucose → ethanol + CO₂ + little energy (fermentation).",
          "Muscle: glucose → lactic acid + little energy; oxygen debt.",
          "About 210 kJ per mole; about 2 ATP.",
          "Uses: bread, palm wine, beer.",
        ],
      },
      {
        heading: "4. ATP",
        points: [
          "Adenosine triphosphate: adenine + ribose + 3 phosphates.",
          "ATP ⇌ ADP + phosphate + energy.",
          "The energy currency of the cell.",
        ],
      },
      {
        heading: "5. Testing for CO₂",
        points: [
          "Limewater turns milky.",
          "Hydrogencarbonate indicator: red → yellow.",
        ],
        warning: "Respiration and photosynthesis are opposite processes. Do not mix up the two equations.",
      },
    ],
    likely: [
      { question: "Define respiration.", answer: "The process by which food substances, such as glucose, are broken down in living cells to release energy." },
      { question: "Write the equation for aerobic respiration.", answer: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy." },
      { question: "Where does aerobic respiration take place in the cell?", answer: "Glycolysis in the cytoplasm, and the rest in the mitochondria." },
      { question: "What is anaerobic respiration?", answer: "The release of energy from food without using oxygen." },
      { question: "State the products of anaerobic respiration in yeast and in muscle.", answer: "Yeast: ethanol and carbon dioxide. Muscle: lactic acid." },
      { question: "Why does aerobic respiration release more energy than anaerobic respiration?", answer: "Because the glucose is completely oxidised to carbon dioxide and water." },
      { question: "What is ATP and why is it called the energy currency of the cell?", answer: "Adenosine triphosphate. It is made using energy from respiration and broken down to release energy wherever the cell needs it." },
      { question: "What is oxygen debt?", answer: "The extra oxygen needed after hard exercise to remove the lactic acid that built up during anaerobic respiration." },
      { question: "How is carbon dioxide detected?", answer: "Limewater turns milky; hydrogencarbonate indicator turns from red to yellow." },
      { question: "State two differences between respiration and photosynthesis.", answer: "Respiration releases energy and occurs in all living cells all the time; photosynthesis stores light energy in food and occurs only in cells with chlorophyll in the light." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Respiration is best defined as the", options: ["intake of oxygen into the lungs", "release of energy from food in living cells", "making of food by green plants", "removal of waste from the body"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Which of these are the products of aerobic respiration?", options: ["Glucose and oxygen", "Carbon dioxide, water and energy", "Ethanol and carbon dioxide", "Lactic acid and energy"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Most of the energy in aerobic respiration is released in the", options: ["nucleus", "mitochondria", "ribosomes", "cell wall"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The first stage of respiration, glycolysis, takes place in the", options: ["cytoplasm", "mitochondria", "nucleus", "vacuole"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "Yeast respiring anaerobically produces", options: ["lactic acid and water", "ethanol and carbon dioxide", "carbon dioxide and water", "oxygen and glucose"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "Muscle cramp after a sprint is caused by the build-up of", options: ["ethanol", "carbon dioxide", "lactic acid", "glucose"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Dough rises when yeast is added because", options: ["yeast produces oxygen", "carbon dioxide is produced by fermentation", "water evaporates", "starch changes to glucose"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Which statement about anaerobic respiration is correct?", options: ["It needs oxygen", "It releases less energy than aerobic respiration", "It releases more energy than aerobic respiration", "It occurs only in plants"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "ATP stands for", options: ["adenosine triphosphate", "adenine tri-phosphoric acid", "amino triphosphate", "active tissue phosphate"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "The breakdown of ATP to ADP and phosphate", options: ["releases energy for use by the cell", "stores energy", "needs oxygen", "makes glucose"], answer: "A" },
    { number: 11, kind: "Objective", prompt: "Which process is the reverse of respiration?", options: ["Digestion", "Photosynthesis", "Excretion", "Fermentation"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Limewater turns milky when which gas is passed through it?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Hydrogencarbonate indicator changes from red to yellow in the presence of more", options: ["oxygen", "carbon dioxide", "nitrogen", "water vapour"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Which statement is correct?", options: ["Plants respire only at night", "Breathing and respiration mean the same thing", "Respiration occurs in all living cells", "Only animals respire"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Define respiration. Explain why it is not the same as breathing.", answer: "Respiration is the breakdown of food substances in living cells to release energy. Breathing is the movement of air into and out of the lungs; it helps to supply the oxygen needed for respiration, but it does not itself release energy." },
    { number: 16, kind: "Theory", prompt: "Write the word and chemical equations for aerobic respiration and describe where in the cell it takes place.", answer: "Glucose + oxygen → carbon dioxide + water + energy; C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy. Glycolysis happens in the cytoplasm; the pyruvate is then oxidised in the mitochondria, where most of the energy is released." },
    { number: 17, kind: "Theory", prompt: "What is anaerobic respiration? Give the equations for yeast and for muscle cells.", answer: "The release of energy from food without oxygen. Yeast: glucose → ethanol + carbon dioxide + energy. Muscle: glucose → lactic acid + energy." },
    { number: 18, kind: "Theory", prompt: "State four differences between aerobic and anaerobic respiration.", answer: "Aerobic needs oxygen, anaerobic does not; aerobic breaks glucose down completely, anaerobic partly; aerobic gives CO₂ and water, anaerobic gives ethanol and CO₂ or lactic acid; aerobic releases much more energy (about 38 ATP against 2)." },
    { number: 19, kind: "Theory", prompt: "Describe the structure and function of ATP and explain why it is called the energy currency of the cell.", answer: "ATP (adenosine triphosphate) has adenine, ribose and three phosphate groups. Energy from respiration is used to make ATP from ADP and phosphate, and when ATP is broken down back to ADP and phosphate it releases energy for cell activities such as muscle contraction and protein making. It carries energy to wherever it is needed." },
    { number: 20, kind: "Theory", prompt: "Describe an experiment to show that yeast produces carbon dioxide during respiration.", answer: "Put yeast in sugar solution in a flask closed with a stopper and a delivery tube that dips into limewater. Keep the flask warm. After some time the limewater turns milky, showing that carbon dioxide has been produced." },
  ] as PracticeQuestion[],
};
