import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek5: Lesson = {
  id: "ss1-first-biology-week-5",
  week: "Week 05",
  title: "Organisation of life",
  subtitle: "Follow life from a single cell up to whole organisms, and weigh the benefits and costs of being a complex, many-celled creature.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Arrange the levels of organisation of life from simplest to most complex and give an example of each.",
    "Name the main tissues of animals and plants and state the function of each.",
    "Give examples of organs and systems in animals and plants.",
    "Explain the advantages of complexity in multicellular organisms.",
    "Explain the disadvantages of complexity using the idea of surface area to volume ratio.",
  ],
  sections: [
    {
      heading: "1. Levels of organisation",
      paragraphs: [
        "Life is organised in levels, with each level built from the one below it. The cell is the basic unit of structure and function of all living things. A group of similar cells that carry out the same job forms a tissue. A group of different tissues that work together to perform a particular function forms an organ. A group of organs that work together to perform a major function forms a system, and all the systems working together make up the whole organism.",
        "Not every organism has all the levels. Amoeba, Paramecium and Euglena are single cells that carry out every life process themselves. Volvox is a hollow ball of many cells living together as a colony, but its cells are not organised into tissues. In Hydra and in sponges the cells are grouped into tissues, but there are no true organs. In a human being or a maize plant, all four levels are present.",
      ],
      diagram: "Draw a staircase of five steps going up: CELL, TISSUE, ORGAN, SYSTEM, ORGANISM. Beside each step write an example: muscle cell, muscle tissue, the heart, the circulatory system, a human being.",
    },
    {
      heading: "2. Tissues in animals and plants",
      paragraphs: [
        "In animals there are four main kinds of tissue. Epithelial tissue covers and lines surfaces, such as the skin and the lining of the gut, and protects them. Connective tissue joins and supports other tissues and includes blood (which transports materials), bone and cartilage (which support the body), tendons and ligaments (which attach muscles to bones and bones to each other) and fat (which stores energy). Muscle tissue contracts to cause movement and may be skeletal, smooth or cardiac (heart) muscle. Nervous tissue carries messages as nerve impulses and coordinates the body.",
        "In plants, meristematic tissue at the tips of roots and shoots divides to make new cells, and so produces growth. Epidermis forms a protective covering over the leaves, stems and roots. Parenchyma is made of thin-walled cells that store food and, in leaves, carry out photosynthesis. Collenchyma and sclerenchyma are supporting tissues with thickened walls. The vascular tissues are xylem, which carries water and mineral salts upward from the roots (and also supports the plant), and phloem, which carries the sugars made in the leaves to other parts of the plant.",
      ],
      points: [
        "Animal tissues: epithelial, connective, muscle, nervous.",
        "Plant tissues: meristem, epidermis, parenchyma, collenchyma, sclerenchyma, xylem, phloem.",
        "Blood is a tissue; red cells, white cells and platelets are cells within it.",
      ],
    },
    {
      heading: "3. Organs and systems",
      paragraphs: [
        "In animals, examples of organs are the skin, eye, brain, heart, lungs, stomach, liver and kidney. In plants, the main organs are the root, stem, leaf, flower and fruit, and storage organs such as an onion bulb or a yam tuber.",
        "Examples of animal systems: the digestive system (mouth, oesophagus, stomach, intestines, liver, pancreas) breaks down food; the respiratory system (nose, trachea, lungs) exchanges gases; the circulatory system (heart and blood vessels) transports materials; the excretory system (kidneys, ureters, bladder) removes wastes; the nervous system (brain, spinal cord and nerves) coordinates; the skeletal and muscular systems support and move the body; the reproductive system produces offspring. A flowering plant has two systems: the root system, which anchors it and absorbs water and minerals, and the shoot system, made of the stem, leaves and flowers.",
      ],
    },
    {
      heading: "4. Advantages of complexity",
      paragraphs: [
        "When an organism is made of many cells, the cells can become different from each other, a process called differentiation. Because each type of cell does only one kind of job, it can do the job better. This is division of labour. For example, red blood cells are shaped to carry oxygen, nerve cells to carry messages and muscle cells to contract.",
        "As a result, a complex organism can be bigger, live longer, resist harsh conditions and live in a wide range of habitats, since it is not at the mercy of its surroundings in the way a single cell is. If some cells are damaged, others can carry on. It can also reproduce without destroying itself, because only special reproductive organs are involved. Finally, specialised organs allow organisms to have senses, move quickly and control their internal conditions.",
      ],
    },
    {
      heading: "5. Disadvantages of complexity",
      paragraphs: [
        "In a complex organism, cells depend on each other, so the failure of one organ can affect the whole body. A single-celled organism such as Amoeba has a large surface area compared with its volume, so oxygen and food can reach every part by diffusion across its surface. A large organism has a much smaller surface area compared with its volume, so diffusion alone is too slow, and it needs special transport and exchange systems such as blood vessels, lungs and a gut.",
        "Imagine a cube of side 1 cm, with a surface area of 6 cm² and a volume of 1 cm³, so a ratio of 6 : 1. A cube of side 2 cm has a surface area of 24 cm² and a volume of 8 cm³, giving a ratio of 3 : 1. A cube of side 4 cm has 96 cm² of surface for 64 cm³ of volume, a ratio of 1.5 : 1. The bigger the organism, the less surface it has for each unit of volume.",
        "Other disadvantages are that waste products take longer to be removed from the deeper cells, reproduction takes more time and energy, complex organisms usually have a smaller capacity to regenerate lost parts, and they need more food and energy to keep so many specialised systems running.",
      ],
      diagram: "Draw three cubes of increasing size (1 cm, 2 cm and 4 cm). Under each, write the surface area, the volume and the ratio, and add an arrow showing the ratio falling as the size rises.",
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Order from simplest to most complex: cell, tissue, organ, system, organism. Do not put tissue before cell.",
    "Amoeba, Paramecium and Euglena are single cells, not tissues. Volvox is a colony of cells without tissues.",
    "Hydra and sponges are usually placed at the tissue level of organisation, not the organ level.",
    "Blood is a tissue. Red cells, white cells and platelets are cells inside the tissue.",
    "An onion bulb and a yam tuber are plant organs. They are not tissues.",
    "Xylem carries water and minerals upward; phloem carries sugars made in the leaves. Do not swap them.",
    "In an answer on the disadvantages of complexity, explain the surface area to volume ratio and say why it forces large organisms to have transport systems.",
    "Name AND explain each advantage: ‘specialised cells do one job better’ is worth more than ‘efficiency’ alone.",
  ],
  summary:
    "Life is organised into cells, tissues, organs and systems that together form an organism. Single-celled organisms perform all life processes in one cell, while multicellular organisms have specialised cells grouped into tissues, organs and systems. Complexity allows division of labour, larger size, longer life and survival in many habitats. It also makes cells dependent on each other and, because large bodies have a small surface area for their volume, requires transport and exchange systems and slows the removal of wastes.",
  quick: {
    intro: "Week 5 revision. Place examples at the right level and be ready to explain advantages and disadvantages.",
    blocks: [
      {
        heading: "1. The levels",
        points: [
          "Cell → tissue → organ → system → organism.",
          "Cell: Amoeba, Paramecium, a muscle cell.",
          "Tissue: muscle, blood, xylem, epidermis.",
          "Organ: heart, kidney, leaf, root.",
          "System: digestive, circulatory, root system.",
        ],
        memory: "Can Tiny Owls Sing Songs? Cell, Tissue, Organ, System, Organism.",
      },
      {
        heading: "2. Tissues",
        points: [
          "Animal: epithelial (covers), connective (joins and supports, includes blood and bone), muscle (movement), nervous (impulses).",
          "Plant: meristem (new cells), epidermis (protects), parenchyma (stores, photosynthesis), collenchyma and sclerenchyma (support), xylem (water up), phloem (food).",
        ],
      },
      {
        heading: "3. Advantages of complexity",
        points: [
          "Differentiation and division of labour.",
          "Greater efficiency.",
          "Larger size and longer life.",
          "Can survive in many habitats and harsh conditions.",
          "Reproduction without destroying the parent.",
        ],
      },
      {
        heading: "4. Disadvantages of complexity",
        points: [
          "Cells depend on each other.",
          "Small surface area to volume ratio, so diffusion is too slow: transport systems needed.",
          "Slower removal of wastes.",
          "Needs more energy and food.",
          "Less ability to regenerate.",
        ],
        warning: "Cube of side 1, 2, 4 cm: ratio 6, 3, 1.5. Big things have less surface for their volume.",
      },
    ],
    likely: [
      { question: "List the levels of organisation of life from simplest to most complex.", answer: "Cell, tissue, organ, system and organism." },
      { question: "Define a tissue and an organ, with an example of each.", answer: "A tissue is a group of similar cells that perform the same function, e.g. muscle. An organ is a group of tissues that work together to perform a specific function, e.g. the heart." },
      { question: "Name the four types of animal tissue.", answer: "Epithelial, connective, muscle and nervous tissue." },
      { question: "What is the function of xylem and phloem?", answer: "Xylem carries water and mineral salts up the plant; phloem carries manufactured food from the leaves to other parts." },
      { question: "Give two examples of organs in plants and two in animals.", answer: "Plants: root, leaf. Animals: heart, kidney." },
      { question: "Name the two systems of a flowering plant.", answer: "The root system and the shoot system." },
      { question: "State four advantages of complexity.", answer: "Specialisation of cells into tissues and organs; division of labour and efficiency; larger size and longer life; survival in many habitats; reproduction without breaking up the parent." },
      { question: "State three disadvantages of complexity.", answer: "Cells depend on one another; small surface area to volume ratio means diffusion is too slow; slower removal of wastes; less regeneration." },
      { question: "Why do large organisms need transport systems?", answer: "Because their surface area to volume ratio is small, so diffusion cannot supply all cells quickly enough." },
      { question: "At which level of organisation are Amoeba and Hydra?", answer: "Amoeba: cell level. Hydra: tissue level." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The basic unit of structure and function of living things is the", options: ["tissue", "organ", "cell", "system"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "The correct order from simplest to most complex is", options: ["tissue, cell, organ, system", "cell, tissue, organ, system", "organ, tissue, cell, system", "cell, organ, tissue, system"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "A group of similar cells that perform the same function is a", options: ["tissue", "organ", "system", "colony"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "Which of these is an organ?", options: ["Blood", "Muscle", "The heart", "A nerve cell"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "Amoeba is an example of an organism at the", options: ["cell level", "tissue level", "organ level", "system level"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "The tissue that covers and lines body surfaces is", options: ["epithelial tissue", "muscle tissue", "nervous tissue", "connective tissue"], answer: "A" },
    { number: 7, kind: "Objective", prompt: "Which plant tissue carries water and mineral salts upward?", options: ["Phloem", "Xylem", "Epidermis", "Parenchyma"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Food made in the leaves is carried to other parts of the plant by the", options: ["xylem", "phloem", "epidermis", "meristem"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "The kidneys, ureters, bladder and urethra together form the", options: ["digestive system", "excretory system", "nervous system", "skeletal system"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The two systems of a flowering plant are the", options: ["root and shoot systems", "xylem and phloem systems", "leaf and flower systems", "stem and fruit systems"], answer: "A" },
    { number: 11, kind: "Objective", prompt: "Which is an advantage of being a complex multicellular organism?", options: ["Cells depend on each other", "Division of labour among specialised cells", "Slower removal of waste", "A larger surface area compared with volume"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Which is a disadvantage of complexity?", options: ["Specialised organs", "Longer life", "A small surface area to volume ratio", "Division of labour"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "A cube of side 2 cm has a volume of 8 cm³ and a surface area of 24 cm². Its surface area to volume ratio is", options: ["1 : 3", "3 : 1", "6 : 1", "12 : 1"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Large organisms need transport systems because", options: ["diffusion is too slow to supply all their cells", "they have no cells", "they do not respire", "they have no surface area"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Arrange the levels of organisation from simplest to most complex and give one example of each in a mammal.", answer: "Cell (muscle cell), tissue (muscle tissue), organ (the heart), system (the circulatory system), organism (the whole animal)." },
    { number: 16, kind: "Theory", prompt: "Name four types of tissue in animals and state the function of each.", answer: "Epithelial: covers and protects surfaces. Connective: joins and supports (includes blood, bone). Muscle: contracts to produce movement. Nervous: carries impulses and coordinates the body." },
    { number: 17, kind: "Theory", prompt: "Name four plant tissues and state the function of each.", answer: "Meristem: divides to form new cells. Epidermis: protects the surface. Xylem: carries water and minerals up and supports. Phloem: carries manufactured food. (Also parenchyma: storage and photosynthesis; collenchyma and sclerenchyma: support.)" },
    { number: 18, kind: "Theory", prompt: "Explain four advantages of being a complex multicellular organism.", answer: "Specialised cells do one job better (division of labour); tissues and organs make the body more efficient; the body can grow bigger and live longer; the organism can live in many habitats and withstand harsh conditions; reproduction does not destroy the parent." },
    { number: 19, kind: "Theory", prompt: "Explain why a large multicellular organism needs a transport system but an Amoeba does not.", answer: "An Amoeba has a large surface area compared with its volume, so substances reach every part by diffusion. A large organism has a small surface area to volume ratio and its inner cells are far from the surface, so diffusion is too slow and transport systems are needed." },
    { number: 20, kind: "Theory", prompt: "Calculate the surface area to volume ratio of cubes of side 1 cm and 4 cm and explain what the results show.", answer: "1 cm cube: surface area 6 cm², volume 1 cm³, ratio 6 : 1. 4 cm cube: surface area 96 cm², volume 64 cm³, ratio 1.5 : 1. The ratio falls as size increases, so larger organisms have relatively less surface for exchange." },
  ] as PracticeQuestion[],
};
