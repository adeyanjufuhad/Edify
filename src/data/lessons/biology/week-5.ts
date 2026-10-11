import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek5: Lesson = {
  id: "ss1-first-biology-week-5",
  week: "Week 05",
  title: "Organisation of life",
  subtitle: "From a single cell to a whole organism: the four levels of organisation, the tissues of plants and humans, and the advantages and disadvantages of complexity.",
  source: "Original teaching notes based chiefly on Hidden Facts in SSCE Biology, Chapter Two, ‘Organization of Life’ and ‘Advantages and disadvantages of complexity’ (PDF pages 18–22). The explanations and practice questions below are newly written for Edify.",
  objectives: [
    "Name the four levels of organisation of life and give an example of each.",
    "Identify the main tissues in humans and in plants and state the job of each.",
    "Place cells, tissues, organs and systems in the correct order from simplest to most complex.",
    "Explain at least four advantages of complexity in higher organisms.",
    "Explain at least four disadvantages of complexity and link them to surface area and transport.",
  ],
  sections: [
    {
      heading: "1. Four levels of organisation",
      paragraphs: [
        "Living things are organised in levels. The cell is the smallest unit of life and the basic structural and functional unit of every organism. Cells that perform the same job form a tissue. Tissues that work together to perform a function form an organ, and organs that work together to perform a main function form a system. The systems work together to make up a whole organism.",
        "Some organisms exist at only one level. Amoeba, Euglena and Paramecium are single cells. Hydra and sponges are at the tissue level. Simple plants such as Spirogyra are filaments of cells, and Volvox is a colony of cells, but they are still at the cellular level.",
      ],
      diagram: "Draw four stacked boxes from bottom to top: CELL, TISSUE, ORGAN, SYSTEM. Under the top box, write ORGANISM. Add one example beside each level: Amoeba, muscle, heart, digestive system.",
    },
    {
      heading: "2. Tissues in humans and plants",
      paragraphs: [
        "Human tissues include epithelial tissue, which lines and protects body surfaces and forms the skin; blood, which transports food and oxygen; skeletal (supporting) tissue, which supports the body and aids movement; connective tissue, which binds other tissues together; nerve tissue, which coordinates and transmits impulses; and muscle tissue, which produces movement.",
        "Plant tissues include vascular tissue, where the xylem carries water and mineral salts up from the roots and the phloem carries manufactured food from the leaves to the rest of the plant by translocation. Strengthening tissues such as collenchyma and sclerenchyma support the plant body. Photosynthetic tissue makes food, epidermal tissue protects the surface, and packing (storage) tissue stores materials.",
      ],
    },
    {
      heading: "3. Organs and systems",
      paragraphs: [
        "An organ is a group of tissues that work together to perform a specific function. Examples in animals are the skin, eyes, stomach, brain, heart, liver and kidney. Examples in plants are the root, stem, leaf, flower and fruit, and storage organs such as an onion bulb.",
        "A system is a group of organs that work together to perform a main function. The kidney, ureters, urinary bladder and urethra make up the excretory system of a mammal. Other animal systems include the digestive, reproductive, respiratory, skeletal, nervous and circulatory systems. In plants, the root system and the shoot system make up the whole plant.",
      ],
    },
    {
      heading: "4. Advantages of complexity",
      paragraphs: [
        "Complexity allows cells to differentiate. Similar cells group into tissues that do one job well. Internal specialisation follows, with tissues and organs each doing one or more specific functions. Division of labour means the cells depend on one another, so the whole organism works efficiently.",
        "Efficiency in turn lets multicellular organisms survive in many habitats and adapt to harsh conditions. Complexity also allows growth in size, because the spaces between cells make room for growth. Reproduction does not break the parent apart, since only specialised reproductive organs such as testes and ovaries are involved. Specialised, efficient organs mean complex organisms often live much longer than unicellular ones.",
      ],
    },
    {
      heading: "5. Disadvantages of complexity",
      paragraphs: [
        "The main disadvantage is that individual cells lose their independence and depend on one another. A unicellular organism has a large surface area compared with its volume, so substances move in and out by diffusion. A multicellular organism has a small surface area to volume ratio, so diffusion is too slow for the whole body. That is why complex organisms developed transport systems such as the blood and xylem and phloem, but a fault in such a system can endanger the whole organism.",
        "Complexity also slows the removal of waste products from the cells, makes reproduction more difficult, and reduces the ability to regenerate lost parts. These disadvantages are the price paid for the efficiency gained from specialisation.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The order from simplest to most complex is cell, tissue, organ, system, then organism. A common error is to put tissue before cell.",
    "An onion bulb is an organ, not a tissue. Euglena is a cell, not a tissue. Blood is a tissue, while its component cells (white cells, red cells and platelets) are cells.",
    "Volvox and Pandorina are colonies of cells, but they are still at the cellular level. A colony is not a tissue unless the cells are organised to do one function.",
    "Epidermis is a tissue in both plants and animals and protects the surface. Dermis (the layer beneath the epidermis of the skin) occurs in animals and not in plants.",
    "Hydra and sponges are at the tissue level of organisation. Do not put them at the organ level.",
    "Advantages and disadvantages must be explained, not just named. ‘Complexity leads to efficiency’ is not enough; say that specialised tissues carry out functions more effectively.",
    "The surface area to volume ratio explains why multicellular organisms need a transport system. Mention it in any answer about disadvantages.",
  ],
  summary: "Living things are organised as cells, tissues, organs and systems, which together make up an organism. Unicellular organisms such as Amoeba are single cells; Hydra is at the tissue level. Complexity brings specialisation, efficiency, the ability to live in more habitats and a longer life, but it also makes cells dependent on one another, makes diffusion too slow for the whole body and reduces regeneration.",
  quick: {
    intro: "The four levels, the tissues, and the advantages and disadvantages of complexity. Most questions on this topic ask you to place an example at the right level.",
    blocks: [
      {
        heading: "1. The four levels",
        points: [
          "Cell: the smallest unit of life. Example: Amoeba, Euglena, Paramecium.",
          "Tissue: a group of similar cells doing one job. Example: epidermis, blood, hydra.",
          "Organ: a group of tissues doing one job. Example: heart, stomach, onion bulb, ginger rhizome.",
          "System: a group of organs doing one main job. Example: digestive system, root system.",
        ],
        memory: "Cells Make Tissues, Tissues Make Organs, Organs Make Systems, Systems Make an Organism.",
      },
      {
        heading: "2. Tissues to know",
        points: [
          "Human: epithelial (covers and protects), blood (transports), skeletal (supports), connective (binds), nerve (carries impulses), muscle (movement).",
          "Plant: xylem (water and minerals up), phloem (food, by translocation), strengthening, photosynthetic, epidermal, packing or storage.",
        ],
      },
      {
        heading: "3. Advantages of complexity",
        points: [
          "Cellular differentiation and tissue formation.",
          "Specialised tissues and organs.",
          "Division of labour; efficiency.",
          "Survival in different habitats and adverse conditions.",
          "Increase in size; longer lifespan.",
          "Reproduction without breaking the parent apart.",
        ],
      },
      {
        heading: "4. Disadvantages of complexity",
        points: [
          "Cells lose independence and depend on each other.",
          "Small surface area to volume ratio, so diffusion is too slow: transport systems are needed.",
          "Slower removal of waste products.",
          "Difficulty in reproduction.",
          "Reduced ability to regenerate.",
        ],
        warning: "The main disadvantage linked to a question on surface area is that diffusion is slow in multicellular organisms.",
      },
    ],
    likely: [
      { question: "Name the four levels of organisation of life.", answer: "Cell, tissue, organ and system." },
      { question: "What is a tissue?", answer: "A group of similar cells that perform a particular function together." },
      { question: "At what level of organisation is Amoeba?", answer: "The cellular level: it is a single cell." },
      { question: "Name two tissues in man.", answer: "Any two of: epithelial, blood, skeletal, connective, nerve, muscle." },
      { question: "Name two tissues in plants.", answer: "Any two of: xylem, phloem, strengthening (sclerenchyma, collenchyma), photosynthetic, epidermal, packing." },
      { question: "What is an organ? Give an example from a plant and from an animal.", answer: "A group of tissues performing a specific function, such as an onion bulb (plant) or the heart (animal)." },
      { question: "What is a system? Name the excretory system of a mammal.", answer: "A group of organs working together to perform a main function. The excretory system includes the kidney, ureters, urinary bladder and urethra." },
      { question: "State three advantages of complexity in higher organisms.", answer: "Any three of: cellular differentiation; specialisation; division of labour and efficiency; survival in different habitats; increased size; longer life span." },
      { question: "Why is diffusion not efficient for transport in multicellular organisms?", answer: "They have a small surface area to volume ratio, so diffusion alone is too slow to supply the whole body." },
      { question: "What does the phloem transport?", answer: "Manufactured food from the leaves to other parts of the plant, by translocation." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The lowest level of organisation in living things is the", options: ["system", "tissue", "organ", "cell"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "A group of similar cells that performs a particular function is called a", options: ["organ", "tissue", "system", "organelle"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The onion bulb is an example of which level of organisation?", options: ["organ", "cell", "tissue", "system"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "Amoeba is organised at the", options: ["cellular level", "tissue level", "organ level", "system level"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "Blood is classified as a", options: ["cell", "organ", "system", "tissue"], answer: "D" },
    { number: 6, kind: "Objective", prompt: "Which of these is NOT a plant tissue?", options: ["Phloem", "Dermis", "Xylem", "Epidermis"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Which sequence is correct from simplest to most complex?", options: ["system, organ, tissue, cell", "organ, cell, system, tissue", "cell, tissue, organ, system", "tissue, system, cell, organ"], answer: "C" },
    { number: 8, kind: "Objective", prompt: "The phloem transports", options: ["manufactured food", "water and mineral salts", "oxygen", "waste products"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "The xylem transports", options: ["food from the leaves to other parts", "hormones", "water and mineral salts from the roots to the leaves", "blood"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "Which is an advantage of complexity in higher organisms?", options: ["They cannot regenerate", "Their cells become more dependent on each other", "They have a shorter lifespan", "Specialised tissues carry out functions more efficiently"], answer: "D" },
    { number: 11, kind: "Objective", prompt: "A disadvantage of complexity in higher organisms is", options: ["an unlimited lifespan", "greater independence of cells", "an increased ability to regenerate", "a slower expulsion of waste products from the cells"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "The tissue that lines and protects the body surface is", options: ["epithelial tissue", "nerve tissue", "muscle tissue", "blood tissue"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "Which organism is at the cellular filament level?", options: ["Spirogyra", "Hydra", "A mammal", "An onion bulb"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Which of these is a system?", options: ["Heart", "Xylem", "Digestive system", "Kidney"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Name the four levels of organisation of life.", answer: "Cell, tissue, organ and system." },
    { number: 16, kind: "Theory", prompt: "Explain the term tissue and give two examples of tissues in man.", answer: "A tissue is a group of similar cells that perform a particular function together. Two examples: epithelial tissue (lines and protects surfaces) and blood (transports food and oxygen). Other human tissues include nerve, muscle, skeletal and connective tissue." },
    { number: 17, kind: "Theory", prompt: "State the level of organisation of Euglena, the onion bulb and blood.", answer: "Euglena is at the cellular level (it is a single cell). The onion bulb is at the organ level. Blood is at the tissue level." },
    { number: 18, kind: "Theory", prompt: "Arrange these from the simplest to the most complex: rabbit, mitochondrion, heart, neuron, alimentary canal, muscle.", answer: "Mitochondrion (organelle), neuron (cell), muscle (tissue), heart (organ), alimentary canal (system), rabbit (organism)." },
    { number: 19, kind: "Theory", prompt: "Explain any two advantages of complexity in multicellular organisms.", answer: "Any two of: specialised tissues and organs carry out their functions more efficiently; division of labour between cells makes the organism efficient; complex organisms can survive in different habitats and adverse conditions; complexity allows increase in size; complex organisms have longer lifespans." },
    { number: 20, kind: "Theory", prompt: "Explain the disadvantage of complexity that is linked to surface area to volume ratio.", answer: "Multicellular organisms have a small surface area to volume ratio. Substances therefore cannot move through the whole body efficiently by diffusion alone. Complex organisms have evolved transport systems to overcome this, but a fault in the transport system can endanger the organism." },
  ] as PracticeQuestion[],
};
