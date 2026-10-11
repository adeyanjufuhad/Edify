import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek9: Lesson = {
  id: "ss1-first-biology-week-9",
  week: "Week 09",
  title: "Nutrient cycles: carbon, nitrogen and water",
  subtitle: "Trace how carbon, oxygen, water and nitrogen are used again and again as they pass between the air, the soil, water and living things.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain why nutrients must be recycled in nature.",
    "Describe the carbon cycle, naming the processes that add and remove carbon dioxide.",
    "Explain how photosynthesis and respiration keep the oxygen balance.",
    "Describe the water cycle and the roles of plants and animals in it.",
    "Describe the nitrogen cycle, naming the processes and the bacteria involved.",
    "State how human activities affect these cycles.",
  ],
  sections: [
    {
      heading: "1. Why nutrients are recycled",
      paragraphs: [
        "The Earth receives energy from the Sun, but it receives almost no new matter. The atoms in your body were once part of plants, animals, soil and air, and they will be used again after you. Nutrient cycling is the movement of elements such as carbon, nitrogen and oxygen, and of water, in loops between the living world (plants, animals, microorganisms) and the non-living world (air, water, soil, rocks).",
        "Without cycling, the supply of nutrients would be used up and life would stop. Producers take nutrients from the environment, consumers get them by feeding, and decomposers (bacteria and fungi) break down dead remains and wastes and return the nutrients to the soil and the air.",
      ],
    },
    {
      heading: "2. The carbon cycle",
      paragraphs: [
        "Carbon is the key element in all organic compounds: carbohydrates, proteins, fats and nucleic acids. The main store of carbon in the air is carbon dioxide, which is only about 0.04% of the air. Carbon dioxide is also dissolved in oceans and rivers, and carbon is locked in limestone, in the shells of sea animals and in fossil fuels.",
        "Removal of carbon dioxide from the air: green plants and algae absorb it in photosynthesis and turn the carbon into carbohydrates. Animals get carbon by eating plants or other animals. Return of carbon dioxide to the air: respiration by plants, animals and microorganisms; decomposition of dead plants and animals by bacteria and fungi, which respire as they feed; and combustion of wood, charcoal and fossil fuels such as petrol and coal. Volcanoes also release carbon dioxide.",
        "Dead organisms that are buried and compressed for millions of years can form coal, oil and natural gas (fossil fuels). Burning them quickly returns the carbon that was locked away for a very long time. Human activities such as burning fuels and clearing forests, which remove the plants that absorb carbon dioxide, have raised the level of carbon dioxide in the air. Carbon dioxide traps heat, so this contributes to the greenhouse effect and global warming.",
      ],
      diagram: "Draw a box labelled ‘CO₂ in the air’ in the centre. Draw arrows into plants (photosynthesis), from plants to animals (feeding), from plants, animals and decomposers back up to the air (respiration), from dead remains to decomposers (decay), and from fuels and fires to the air (combustion).",
    },
    {
      heading: "3. Oxygen and the balance with carbon dioxide",
      paragraphs: [
        "About 21% of the air is oxygen. Oxygen is added to the air by photosynthesis and used by respiration, combustion and rusting. Because photosynthesis uses carbon dioxide and releases oxygen, while respiration and burning do the opposite, the two processes keep the proportions of the two gases fairly steady. The carbon cycle and the oxygen cycle are therefore linked.",
        "Forests and oceans (through microscopic algae) are the main producers of oxygen. Large-scale cutting of forests and burning of fuels disturb the balance.",
      ],
    },
    {
      heading: "4. The water cycle",
      paragraphs: [
        "Water moves continuously between the oceans, the air, the land and living things. The Sun’s heat evaporates water from oceans, rivers and the soil, and plants lose water vapour from their leaves by transpiration. The water vapour rises, cools and condenses into tiny droplets that make clouds. When the droplets join and become large, they fall as precipitation (rain, hail or snow).",
        "Some of the rain runs off the land into streams and rivers and returns to the sea (run-off). Some soaks into the ground (infiltration) and becomes ground water, which plants absorb through their roots and which may come out again at springs and wells. Animals take in water by drinking and food, and lose it in urine, sweat, breath and faeces. Plants and animals also make water in respiration.",
        "Water is important because it is the medium in which life processes happen, a raw material for photosynthesis, and a solvent that carries minerals into plants and food and wastes around bodies. Deforestation reduces transpiration and rainfall and increases run-off and soil erosion.",
      ],
      diagram: "Draw the Sun, the sea, a cloud, a mountain, a tree and a river. Use arrows labelled evaporation (from sea and land), transpiration (from the tree), condensation (in the cloud), precipitation (rain falling), run-off (to the river) and infiltration (into the soil).",
    },
    {
      heading: "5. The nitrogen cycle",
      paragraphs: [
        "Nitrogen makes up about 78% of the air, but most organisms cannot use it in this form. Plants need nitrogen to make proteins, nucleic acids and chlorophyll, and they take it up from the soil as nitrates (and to some extent ammonium salts). Animals obtain nitrogen by eating plants or other animals. The nitrogen cycle shows how nitrogen is converted between the usable and unusable forms.",
        "Nitrogen fixation turns nitrogen gas into compounds. Nitrogen-fixing bacteria such as Rhizobium live in swellings (nodules) on the roots of legumes such as beans, groundnut and cowpea, and Azotobacter lives free in the soil. Lightning also combines nitrogen with oxygen to make nitrogen oxides, which are washed into the soil by rain as nitrates. Ammonification (decay): when plants and animals die, and when animals pass urine or faeces, decomposers convert nitrogen compounds (proteins, urea) into ammonia and ammonium salts.",
        "Nitrification: nitrifying bacteria in the soil change ammonia to nitrites (Nitrosomonas), and then nitrites to nitrates (Nitrobacter), which plants can absorb. Assimilation: plants absorb nitrates and build them into proteins, which animals then obtain by feeding. Denitrification: in waterlogged, oxygen-poor soil, denitrifying bacteria (such as Pseudomonas) change nitrates back into nitrogen gas, which returns to the air and is lost to plants.",
        "Farmers keep the soil fertile by planting legumes, by crop rotation, by adding manure or compost, and by adding nitrogen fertilisers. Too much fertiliser can be washed into streams (leaching), causing water pollution.",
      ],
      diagram: "Draw a cycle: N₂ in the air → (nitrogen-fixing bacteria and lightning) → nitrates and ammonium in the soil → (plants absorb) → plant proteins → (animals eat) → animal proteins → (death, urine) → ammonia → (Nitrosomonas then Nitrobacter) → nitrates; and an arrow from nitrates back to N₂ labelled denitrification.",
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Nitrogen gas makes up about 78% of the air, but most plants cannot use it. They need nitrates from the soil.",
    "Nitrification (ammonia → nitrite → nitrate) and denitrification (nitrate → nitrogen gas) are opposite processes. Do not swap them.",
    "Nitrosomonas makes nitrites; Nitrobacter makes nitrates. Rhizobium fixes nitrogen in legume nodules.",
    "Decomposers return carbon (as carbon dioxide) and nitrogen (as ammonia) to the environment. Without them, nutrients would stay locked in dead remains.",
    "Carbon dioxide is removed by photosynthesis and added by respiration, decay and burning. Include all three additions in an answer.",
    "Transpiration is loss of water vapour from the leaves. It is part of the water cycle but is not the same as evaporation from the sea.",
    "Deforestation reduces photosynthesis and transpiration, so it raises carbon dioxide and reduces rainfall.",
    "Leguminous crops enrich the soil with nitrogen because of nitrogen-fixing bacteria in their root nodules.",
  ],
  summary:
    "Matter is recycled between the living and non-living parts of the environment, with decomposers returning nutrients. In the carbon cycle, carbon dioxide is removed by photosynthesis and returned by respiration, decay and combustion. Photosynthesis and respiration keep oxygen and carbon dioxide in balance. In the water cycle, water evaporates and transpires, condenses, falls as precipitation and returns by run-off and ground water. In the nitrogen cycle, nitrogen is fixed, converted to ammonia by decay, to nitrite and nitrate by nitrification, taken up by plants and returned to the air by denitrification. Human activity affects all these cycles.",
  quick: {
    intro: "Week 9 revision. Draw each cycle from memory and label every process.",
    blocks: [
      {
        heading: "1. Recycling",
        points: [
          "Energy flows one way; matter is recycled.",
          "Producers take up nutrients; consumers feed; decomposers return them.",
        ],
      },
      {
        heading: "2. Carbon cycle",
        points: [
          "Removed from the air by photosynthesis.",
          "Returned by respiration, decay and combustion.",
          "Stored in fossil fuels, limestone, shells and organisms.",
          "Burning fuels and deforestation raise the CO₂ level and add to global warming.",
        ],
      },
      {
        heading: "3. Oxygen",
        points: [
          "About 21% of air. Made by photosynthesis; used by respiration, combustion and rusting.",
          "Photosynthesis and respiration keep the balance.",
        ],
      },
      {
        heading: "4. Water cycle",
        points: [
          "Evaporation, transpiration, condensation, precipitation, run-off, infiltration.",
          "Plants absorb water by roots and lose it by transpiration.",
        ],
      },
      {
        heading: "5. Nitrogen cycle",
        points: [
          "N₂ (78% of air) → fixation → nitrates and ammonium → plants → animals.",
          "Fixation: Rhizobium (legume nodules), Azotobacter, lightning.",
          "Ammonification: decay gives ammonia.",
          "Nitrification: Nitrosomonas (ammonia → nitrite), Nitrobacter (nitrite → nitrate).",
          "Denitrification: nitrate → N₂ (Pseudomonas).",
        ],
      },
    ],
    likely: [
      { question: "Why is the recycling of nutrients important?", answer: "The Earth has a fixed amount of matter. Recycling returns elements to the environment so that they can be used again by living things." },
      { question: "State two processes that remove carbon dioxide from the air and three that add it.", answer: "Removal: photosynthesis and dissolving in oceans. Addition: respiration, decay and combustion." },
      { question: "What is the role of decomposers in nutrient cycles?", answer: "They break down dead plants, animals and wastes, releasing carbon dioxide and ammonia and returning nutrients to the soil and air." },
      { question: "How do photosynthesis and respiration keep the oxygen balance?", answer: "Photosynthesis releases oxygen and uses carbon dioxide; respiration and burning use oxygen and release carbon dioxide, so the two balance." },
      { question: "State the main processes of the water cycle.", answer: "Evaporation, transpiration, condensation, precipitation, run-off and infiltration." },
      { question: "What is transpiration?", answer: "The loss of water vapour from the leaves and other aerial parts of a plant, mainly through the stomata." },
      { question: "What is nitrogen fixation? Name two agents of it.", answer: "The conversion of nitrogen gas into nitrogen compounds. Rhizobium in legume root nodules and lightning (also Azotobacter)." },
      { question: "What is nitrification? Name the bacteria involved.", answer: "The conversion of ammonia to nitrites by Nitrosomonas and nitrites to nitrates by Nitrobacter." },
      { question: "What is denitrification?", answer: "The conversion of nitrates in the soil to nitrogen gas by denitrifying bacteria, especially in waterlogged soil." },
      { question: "Why are legumes grown in crop rotation?", answer: "Nitrogen-fixing bacteria in their root nodules increase the nitrogen compounds in the soil, making it more fertile." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which organisms return nutrients from dead remains to the soil and air?", options: ["Producers", "Primary consumers", "Decomposers", "Herbivores"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "Carbon dioxide is removed from the air by", options: ["respiration", "photosynthesis", "combustion", "decay"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Which process does NOT add carbon dioxide to the air?", options: ["Respiration", "Burning of fuel", "Photosynthesis", "Decay of dead plants"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "Fossil fuels such as coal and oil were formed from the", options: ["remains of ancient plants and animals", "rocks only", "water vapour", "volcanic ash"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "Clearing large areas of forest raises the amount of carbon dioxide in the air because", options: ["fewer plants are left to absorb carbon dioxide", "trees produce carbon dioxide only", "water is lost", "it makes the soil acidic"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "About what percentage of the air is oxygen?", options: ["0.04%", "21%", "78%", "99%"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The loss of water vapour from the leaves of a plant is called", options: ["transpiration", "condensation", "precipitation", "infiltration"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "Clouds form when water vapour", options: ["evaporates", "condenses", "melts", "is absorbed by roots"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Rain, hail and snow are forms of", options: ["transpiration", "precipitation", "infiltration", "evaporation"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The percentage of nitrogen in the air is about", options: ["21%", "78%", "0.04%", "50%"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Bacteria that live in the root nodules of legumes are", options: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Pseudomonas"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "The conversion of nitrites to nitrates is carried out by", options: ["Nitrobacter", "Nitrosomonas", "Rhizobium", "denitrifying bacteria"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "The conversion of nitrates back to nitrogen gas is", options: ["nitrification", "nitrogen fixation", "denitrification", "ammonification"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "Plants take up nitrogen from the soil mainly as", options: ["nitrogen gas", "nitrates", "ammonia gas", "urea gas"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Explain why nutrients must be recycled in nature, and state the role of decomposers.", answer: "The Earth has a limited amount of matter, so elements must be used again. Decomposers break down dead organisms and wastes, releasing carbon dioxide and ammonia so the nutrients return to the soil and air for producers to use." },
    { number: 16, kind: "Theory", prompt: "Describe the carbon cycle, naming the processes that remove carbon dioxide from the air and those that return it.", answer: "Plants and algae remove carbon dioxide by photosynthesis and make carbohydrates; animals get carbon by feeding. Carbon dioxide returns to the air by respiration, decay of dead remains by decomposers, and burning of wood and fossil fuels. Some carbon is stored in fossil fuels, limestone and shells." },
    { number: 17, kind: "Theory", prompt: "Explain how photosynthesis and respiration keep the proportions of oxygen and carbon dioxide in the air steady, and state two ways in which human activities upset this balance.", answer: "Photosynthesis removes carbon dioxide and releases oxygen; respiration, burning and decay use oxygen and release carbon dioxide, so the two balance. Humans upset it by burning fossil fuels and by clearing forests." },
    { number: 18, kind: "Theory", prompt: "Describe the water cycle and state the importance of water to living things.", answer: "Water evaporates from seas, rivers and soil, and transpires from plants; the vapour condenses into clouds and falls as rain; it runs off into rivers and the sea or soaks into the ground and is taken up by plants. Water is a medium for life processes, a raw material for photosynthesis and a solvent for transport." },
    { number: 19, kind: "Theory", prompt: "Describe the nitrogen cycle, naming the processes and the organisms involved.", answer: "Nitrogen gas is fixed by Rhizobium (legume nodules), Azotobacter and lightning into nitrogen compounds. Plants absorb nitrates and make proteins, which animals eat. Decay turns proteins and urea into ammonia; Nitrosomonas converts ammonia to nitrites and Nitrobacter converts nitrites to nitrates; denitrifying bacteria convert nitrates back to nitrogen gas." },
    { number: 20, kind: "Theory", prompt: "State four ways in which farmers keep the soil rich in nitrogen and one problem of using too much fertiliser.", answer: "Growing legumes; crop rotation; adding manure or compost; using nitrogen fertilisers. Too much fertiliser may be washed (leached) into streams and pollute the water." },
  ] as PracticeQuestion[],
};
