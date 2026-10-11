import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek2: Lesson = {
  id: "ss1-first-biology-week-2",
  week: "Week 02",
  title: "Characteristics of living things",
  subtitle: "Learn the features that all living things share, compare plants with animals and living with non-living things, and see where viruses fit.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "List the characteristics of living things and define each one with examples.",
    "Distinguish respiration from breathing, and excretion from egestion.",
    "Compare plants with animals using clear points.",
    "Distinguish living from non-living things and explain why some non-living things seem to show life.",
    "Explain why viruses are described as the link between living and non-living things.",
  ],
  sections: [
    {
      heading: "1. What makes a thing alive?",
      paragraphs: [
        "A cat, a mango tree, a mushroom and a bacterium are all alive, while a stone, a river and a motorbike are not. What is the difference? Living things are made of cells, take in materials and use them to release energy and to build themselves, respond to their surroundings, grow, produce more of their own kind, and eventually die. Together, the chemical reactions that go on in living cells are called metabolism.",
        "No single feature on its own tells you that something is alive. A motorbike moves and a fire uses oxygen, but neither is made of cells, neither grows from the inside nor reproduces. To decide whether something is living, check it against all the characteristics.",
      ],
    },
    {
      heading: "2. The characteristics of living things",
      paragraphs: [
        "Movement is a change of position of the whole organism or of a part of it. Animals usually move from place to place (locomotion) to find food, escape danger or find a mate. Plants cannot move from place to place, but they move parts: stems bend towards light, roots grow downward, flowers open and close, and the leaflets of the sensitive plant (Mimosa pudica, called ‘touch-me-not’) fold when touched.",
        "Respiration is the process in which food, such as glucose, is broken down in the cells of an organism to release energy. It happens in every living cell all the time, in plants as well as animals. Do not confuse it with breathing, which only brings air into and out of the lungs and is a part of gaseous exchange. Nutrition is the taking in, or making, of food and its use for energy, growth and repair. Green plants make their own food; animals feed on other organisms.",
        "Irritability, also called sensitivity, is the ability to detect changes in the surroundings, called stimuli, and to respond to them. You pull your hand away from a hot pot, a plant root grows towards water and a lizard runs when a shadow falls on it. Growth is a permanent increase in size or dry mass, brought about by increase in the number and size of cells. Reproduction is the production of new individuals of the same kind, which keeps the species in existence.",
        "Excretion is the removal of the waste products of metabolism from the body. Examples are carbon dioxide and water vapour from respiration, urea in urine, and in plants oxygen from photosynthesis and substances stored in leaves that fall. Excretion is different from egestion, which is the removal of undigested food (faeces) that never entered the cells.",
        "Three further characteristics are often added. Competition: organisms struggle for limited resources such as food, water, light, space and mates. Adaptation: organisms have features of structure, function or behaviour that suit them to where they live, for example the thick fleshy stem of a cactus that stores water, or the webbed feet of a duck. Death: every living thing has a limited life span, and when life processes stop, the organism dies.",
      ],
      points: [
        "Movement, respiration, nutrition, irritability (sensitivity), growth, excretion, reproduction.",
        "Often added: competition, adaptation and death.",
        "Respiration is not breathing; excretion is not egestion.",
      ],
    },
    {
      heading: "3. Plants and animals compared",
      paragraphs: [
        "Most plants contain chlorophyll, make their food by photosynthesis and are therefore autotrophic. Animals cannot make their own food and are heterotrophic, feeding on plants or on other animals. Plant cells have a cellulose cell wall; animal cells have only a thin cell membrane. Plants store extra food as starch (and sugars and oils), while animals store it as glycogen and fat.",
        "Plants usually grow at the tips of roots and shoots and keep growing through life, while animals grow all over the body to a definite size. Animals move from place to place and have sense organs and a nervous system, so they respond quickly. Plants are mostly fixed, have no nervous system and respond slowly, mainly by growth.",
      ],
    },
    {
      heading: "4. Living and non-living things",
      paragraphs: [
        "Living things are made of cells, take in and use food, respire, excrete, respond to stimuli, grow, reproduce and die. Non-living things, such as rocks, water, plastic and machines, do none of these by themselves.",
        "Some non-living things appear to show life. A car moves and burns fuel, but it moves only when driven and does not reproduce or grow. A crystal of salt grows, but only by new material being added to the outside, whereas living things grow from inside by making new cells from absorbed food. A fire consumes fuel and oxygen, but it is not made of cells and it cannot reproduce itself.",
      ],
    },
    {
      heading: "5. Viruses: the link between living and non-living",
      paragraphs: [
        "Viruses are extremely small particles, seen only with an electron microscope. A virus has no cell structure: it has genetic material (either DNA or RNA, never both) inside a protein coat. Examples are the viruses that cause influenza, measles, polio and HIV/AIDS. A virus that attacks bacteria is called a bacteriophage.",
        "Outside a host cell, a virus does not feed, respire, grow or move, and some can be crystallised, like a non-living substance. Inside a living host cell, it takes over the cell’s machinery and makes copies of itself, which is a feature of living things. Because it has both kinds of features, scientists describe the virus as the link between living and non-living things.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Respiration is the release of energy from food in the cells. Breathing is only the movement of air. Do not use the two words as if they mean the same.",
    "Plants respire all the time, day and night. Never write that plants ‘do not respire’.",
    "Excretion removes wastes made in the body’s cells. Egestion removes undigested food that never entered the cells.",
    "Plants do move, but only parts of the plant, not the whole plant from place to place.",
    "Crystals ‘grow’ only by adding new material from outside. Living things grow from inside by making new cells.",
    "A single feature does not prove life. A car moves; a flame uses oxygen. Check all the characteristics.",
    "Viruses are not cells and cannot be called plants or animals. Say what features they show inside and outside a host.",
    "Growth is a permanent increase. A stomach full of food or a swollen leg is not growth.",
  ],
  summary:
    "Living things share movement, respiration, nutrition, irritability, growth, excretion and reproduction, and also show competition, adaptation and death. Respiration releases energy from food in cells, while breathing only moves air. Plants and animals differ in nutrition, cell structure, food storage, growth, movement and response. Living things differ from non-living things in being made of cells and in growing from inside. Viruses show living features only inside host cells, so they link the living and non-living worlds.",
  quick: {
    intro: "Week 2 revision sheet. Know each characteristic with a definition and an example.",
    blocks: [
      {
        heading: "1. Characteristics",
        points: [
          "Movement: change of position of the whole body or a part.",
          "Respiration: breakdown of food in cells to release energy (all living cells, all the time).",
          "Nutrition: getting and using food.",
          "Irritability: detecting stimuli and responding.",
          "Growth: permanent increase in size or dry mass.",
          "Excretion: removal of metabolic wastes.",
          "Reproduction: producing offspring of the same kind.",
          "Also: competition, adaptation, death.",
        ],
        memory: "MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition.",
      },
      {
        heading: "2. Plants and animals",
        points: [
          "Plants: make food (autotrophs), chlorophyll, cellulose cell wall, store starch, grow at tips throughout life, slow response.",
          "Animals: feed on others (heterotrophs), no chlorophyll, no cell wall, store glycogen, grow to a fixed size, move about, fast response.",
        ],
        warning: "Plants do respire and do move (parts). Say it carefully.",
      },
      {
        heading: "3. Living and non-living",
        points: [
          "Living: cells, respire, feed, excrete, respond, grow from inside, reproduce, die.",
          "Non-living: none of these. Crystals only grow by external addition.",
        ],
      },
      {
        heading: "4. Viruses",
        points: [
          "No cells; DNA or RNA in a protein coat; seen only with an electron microscope.",
          "Outside a host: no feeding, respiration or growth; can crystallise.",
          "Inside a host: reproduces.",
          "Bacteriophage: a virus that attacks bacteria.",
        ],
      },
    ],
    likely: [
      { question: "List the characteristics of living things.", answer: "Movement, respiration, nutrition, irritability (sensitivity), growth, excretion, reproduction, and also competition, adaptation and death." },
      { question: "Define respiration. How is it different from breathing?", answer: "Respiration is the release of energy by the breakdown of food in the cells. Breathing is the movement of air into and out of the lungs." },
      { question: "Define irritability and give an example.", answer: "The ability to detect stimuli and respond to them, e.g. withdrawing a hand from a hot object." },
      { question: "Differentiate between excretion and egestion.", answer: "Excretion is the removal of metabolic wastes from cells, such as carbon dioxide and urea. Egestion is the removal of undigested food from the gut." },
      { question: "Give three differences between plants and animals.", answer: "Plants make their own food and animals do not; plant cells have cellulose walls and animal cells do not; plants grow at the tips throughout life while animals grow to a fixed size." },
      { question: "Name three ways in which living things differ from non-living things.", answer: "Living things are made of cells, respire, and reproduce; non-living things are not made of cells and do none of these." },
      { question: "Why is a crystal not considered a living thing, although it grows?", answer: "It grows only by new material being added from outside, not by making new cells from inside; it does not respire, feed, excrete or reproduce." },
      { question: "State two features of a virus that are like living things and two that are like non-living things.", answer: "Living-like: reproduces inside a host cell; has genetic material. Non-living-like: can be crystallised; shows no life processes outside a host." },
      { question: "What is a bacteriophage?", answer: "A virus that infects bacteria." },
      { question: "Name two examples of adaptation.", answer: "A cactus stem that stores water; webbed feet of a duck for swimming." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The chemical reactions that take place in living cells are together called", options: ["growth", "metabolism", "irritability", "excretion"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "Which of the following is a characteristic of all living things?", options: ["Moving from place to place", "Respiration", "Having a skeleton", "Making food by photosynthesis"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Respiration in cells is the", options: ["intake of air into the lungs", "release of energy from food", "removal of undigested food", "increase in size of an organism"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The folding of the leaflets of Mimosa pudica when touched is an example of", options: ["growth", "irritability", "excretion", "reproduction"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "A permanent increase in the size or dry mass of an organism is", options: ["movement", "respiration", "growth", "nutrition"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "Which of these is excretion?", options: ["Passing out faeces", "Passing out urea in urine", "Vomiting food", "Sweating after eating"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The removal of undigested food from the body is", options: ["excretion", "egestion", "respiration", "secretion"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "A cactus has a thick fleshy stem that stores water. This is an example of", options: ["competition", "adaptation", "reproduction", "excretion"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Which feature is found in plants but NOT in animals?", options: ["Cell membrane", "Cellulose cell wall", "Cytoplasm", "Nucleus"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "Plants store excess carbohydrate as starch, but animals store it as", options: ["cellulose", "glycogen", "glucose only", "protein"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Which statement best distinguishes the growth of a living thing from that of a crystal?", options: ["A crystal does not get bigger", "A living thing grows by making new cells from inside", "A crystal grows by making new cells", "Both grow in exactly the same way"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "A virus can be crystallised outside a host. This is a feature of", options: ["living things", "non-living things", "bacteria", "plants"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "A virus that infects bacteria is called a", options: ["bacteriophage", "virion", "fungus", "protozoan"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Which of the following is NOT a characteristic of living things?", options: ["Reproduction", "Growth by addition of material from outside only", "Excretion", "Irritability"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "State seven characteristics of living things and give one example of each.", answer: "Movement (a lizard runs; a stem bends towards light); respiration (energy released from glucose); nutrition (a goat feeds on grass; a leaf makes food); irritability (withdrawing a hand from heat); growth (a seedling becomes a tree); excretion (urea in urine); reproduction (a hen lays eggs)." },
    { number: 16, kind: "Theory", prompt: "Distinguish between (a) respiration and breathing and (b) excretion and egestion.", answer: "(a) Respiration is the release of energy from food in cells; breathing is the movement of air into and out of the lungs. (b) Excretion is the removal of metabolic wastes made in cells; egestion is the removal of undigested food that was never absorbed." },
    { number: 17, kind: "Theory", prompt: "Give five differences between plants and animals.", answer: "Plants make their own food, animals feed on others; plant cells have cellulose walls, animal cells do not; plants contain chlorophyll, animals do not; plants store starch, animals store glycogen; plants grow at the tips throughout life, animals reach a fixed size; plants are mostly fixed and respond slowly, animals move about and respond quickly." },
    { number: 18, kind: "Theory", prompt: "State four differences between living and non-living things.", answer: "Living things are made of cells; respire; feed; excrete; respond to stimuli; grow from inside; reproduce; die. Non-living things are not made of cells and do none of these, and grow, if at all, by addition from outside." },
    { number: 19, kind: "Theory", prompt: "Explain why a car and a fire are not considered to be alive although they appear to show some characteristics of living things.", answer: "A car moves and burns fuel, and a fire uses oxygen and fuel, but neither is made of cells, neither grows from inside, reproduces, excretes or responds on its own. A living thing shows all the characteristics, not just one or two." },
    { number: 20, kind: "Theory", prompt: "Explain why viruses are called the link between living and non-living things.", answer: "Outside a host cell a virus shows no life processes and can be crystallised, like a non-living thing. Inside a host cell it takes over the cell’s machinery and reproduces, which is a living feature. Viruses therefore show characteristics of both." },
  ] as PracticeQuestion[],
};
