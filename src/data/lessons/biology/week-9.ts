import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek9: Lesson = {
  id: "ss1-first-biology-week-9",
  week: "Week 09",
  title: "Nutrient cycles: carbon, nitrogen and water",
  subtitle: "How carbon, nitrogen and water circulate through living things and the environment, and why the cycles keep an ecosystem going.",
  source: "Original teaching notes based chiefly on Hidden Facts in SSCE Biology, Chapter Twenty-Three, ‘Nutrient cycling in nature’ (PDF pages 558–567). The explanations and practice questions below are newly written for Edify.",
  objectives: [
    "Define nutrient cycling and explain why cycles matter to an ecosystem.",
    "Describe the carbon cycle, naming the processes that add carbon dioxide to the air and remove it.",
    "Describe the water cycle and state at least four ways water is important to living things.",
    "Describe the nitrogen cycle, including nitrogen fixation, nitrification, denitrification and ammonification.",
    "Explain how human activities affect the carbon and oxygen balance of the atmosphere.",
  ],
  sections: [
    {
      heading: "1. Nutrient cycling",
      paragraphs: [
        "Nutrient cycling is the movement of elements such as carbon, nitrogen and water from the environment into living organisms and back to the environment. The path an element follows through this movement is called a cycle. Energy, by contrast, is not recycled: it flows through an ecosystem and is lost as heat.",
        "The cycles show that an ecosystem is dynamic. Decomposers and the processes of living things return materials to the soil and air so that they can be used again.",
      ],
    },
    {
      heading: "2. The carbon cycle",
      paragraphs: [
        "Carbon exists as a solid (charcoal, coal, diamond), as the gas carbon dioxide, which makes up about 0.03% of air, and in compounds such as carbonates, carbohydrates and fats. Carbon dioxide is recycled mainly by photosynthesis, respiration and decay, all carried out by living organisms.",
        "In the cycle, plants absorb carbon dioxide for photosynthesis and build it into biomolecules. Animals eat plants and take the carbon into their bodies. Carbon returns to the air when plants and animals respire, and when they die and decompose. Some carbon is locked into fossil fuels, which release it when burnt. Burning fuel and volcanic activity also release carbon dioxide.",
      ],
      diagram: "Draw a circle labelled ATMOSPHERE (CO₂). Arrows: plants take CO₂ IN (photosynthesis); animals and plants give CO₂ OUT (respiration, decay, burning). Add fossil fuels as a side loop.",
    },
    {
      heading: "3. Oxygen and the carbon-oxygen balance",
      paragraphs: [
        "Oxygen makes up about 21% of the air. Photosynthesis releases oxygen into the atmosphere. Respiration, decay and combustion remove it. The photosynthetic and respiratory activities of plants and animals keep the level of oxygen and carbon dioxide roughly constant.",
        "A small fall in oxygen, of about two to eight per cent, has little effect. A small rise in carbon dioxide, however, can increase the greenhouse effect, trapping more of the sun’s heat and warming the earth. Deforestation and burning fuel are human activities that upset this balance. In water, pollution increases the activity of decomposers, which uses up dissolved oxygen and can kill fish.",
      ],
    },
    {
      heading: "4. The water cycle",
      paragraphs: [
        "The water cycle is the continuous movement of water from the atmosphere to the earth and back. It is maintained mainly by evaporation (water changing to vapour from seas, lakes, rivers and soil) and condensation (vapour cooling and forming droplets, clouds, rain or dew). Plants take up water through their roots and lose most of it by transpiration.",
        "Water is important to living things. It provides the medium for dissolving and absorbing mineral salts, it is a raw material for photosynthesis, it is the solvent for chemical reactions in the body, it transports nutrients and waste, it helps regulate body temperature, and it maintains the osmotic balance of tissues. A large part of blood is water.",
      ],
    },
    {
      heading: "5. The nitrogen cycle",
      paragraphs: [
        "Nitrogen makes up about 78% of the air, but plants cannot use nitrogen gas directly. They absorb it as nitrates or ammonium compounds from the soil, and use it to make proteins and chlorophyll. Animals get nitrogen by eating plants.",
        "Nitrogen enters the soil in several ways. During lightning, nitrogen and oxygen combine to form nitrogen oxides, which dissolve in rain to form nitric and nitrous acids, and then nitrates in the soil. Nitrogen-fixing bacteria convert nitrogen gas into usable compounds. Free-living bacteria such as Azotobacter and Clostridium, and cyanobacteria such as Nostoc, fix nitrogen without partners. Rhizobium lives in root nodules of leguminous plants such as beans and groundnut, and gets its carbohydrate from the plant.",
        "Other processes return or move nitrogen. In nitrification, Nitrosomonas converts ammonium compounds to nitrite, and Nitrobacter converts nitrite to nitrate. In ammonification, decomposers convert nitrogen in dead organic matter into ammonium compounds. Denitrifying bacteria reduce nitrates back to nitrogen gas, which escapes to the air. Leaching washes nitrogen compounds out of the soil in rainwater.",
      ],
      points: [
        "Lightning: N₂ + O₂ → nitrogen oxides → nitrates in soil.",
        "Nitrogen fixation: Azotobacter, Clostridium, Nostoc (free-living); Rhizobium (root nodules of legumes).",
        "Nitrification: Nitrosomonas (ammonium → nitrite); Nitrobacter (nitrite → nitrate).",
        "Ammonification: decay of dead matter → ammonium compounds.",
        "Denitrification: nitrates → nitrogen gas, by denitrifying bacteria.",
        "Leaching: nitrogen compounds washed out of the soil by rain.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Photosynthesis removes carbon dioxide from the air. Respiration, decay, burning fuel and volcanic activity add it. Transpiration is a water process, not a carbon process, so it is not part of the carbon cycle.",
    "Plants cannot use nitrogen gas. They absorb nitrates and ammonium compounds from the soil. Only fixing bacteria can turn nitrogen gas into these forms.",
    "Remember the two nitrifying bacteria in order: Nitrosomonas makes nitrite (from ammonium), and Nitrobacter makes nitrate (from nitrite). Students often swap them.",
    "Rhizobium is a nitrogen fixer in root nodules of legumes; Azotobacter and Clostridium fix nitrogen while free-living. Denitrifying bacteria do the opposite, removing nitrogen from the soil.",
    "The water cycle is not a one-way loss. The book’s statement that water removed from the oceans is permanently lost is incorrect: water is recycled continuously.",
    "Energy is not recycled. Nutrients (carbon, nitrogen, water) cycle; energy flows through and leaves as heat.",
    "A small rise in atmospheric carbon dioxide can alter the climate through the greenhouse effect, but a small fall in oxygen has little effect. Give both points when asked about the carbon-oxygen balance.",
  ],
  summary: "Nutrient cycling returns carbon, nitrogen and water to the environment so they can be used again, while energy flows through and is lost as heat. Photosynthesis removes carbon dioxide; respiration, decay and burning return it. Water is recycled by evaporation, condensation and transpiration. Nitrogen gas must be fixed by bacteria before plants can use it, and nitrification, ammonification, denitrification and leaching move it around.",
  quick: {
    intro: "Each cycle has a set of processes you must name. Learn which processes add to the cycle and which remove from it.",
    blocks: [
      {
        heading: "1. Nutrient cycles",
        points: [
          "Nutrient cycling: movement of elements from the environment into organisms and back.",
          "Nutrients recycle. Energy does not: it is lost as heat.",
          "Cycles: carbon, oxygen, water and nitrogen.",
        ],
        warning: "Transpiration belongs to the water cycle, not the carbon cycle.",
      },
      {
        heading: "2. Carbon cycle",
        points: [
          "Carbon dioxide is about 0.03% of air.",
          "Removed by: photosynthesis.",
          "Added by: respiration, decay, burning fuel, volcanic eruption.",
          "Some carbon becomes fossil fuel.",
        ],
        memory: "CO₂ IN = photosynthesis. CO₂ OUT = respiration, decay, burning.",
      },
      {
        heading: "3. Oxygen and water",
        points: [
          "Oxygen is about 21% of air.",
          "Released by photosynthesis; removed by respiration, decay and combustion.",
          "Water cycle: evaporation, condensation, transpiration.",
          "Water roles: solvent, medium of transport, raw material for photosynthesis, temperature control, osmotic balance.",
        ],
      },
      {
        heading: "4. Nitrogen cycle",
        points: [
          "Nitrogen is 78% of air but plants use nitrates and ammonium compounds.",
          "Lightning: nitrogen oxides that dissolve in rain to make nitrates.",
          "Fixation: Azotobacter, Clostridium, Nostoc (free-living); Rhizobium (root nodules of beans and groundnut).",
          "Nitrification: Nitrosomonas (ammonium → nitrite); Nitrobacter (nitrite → nitrate).",
          "Ammonification: decay produces ammonium compounds.",
          "Denitrification: nitrates → nitrogen gas. Leaching: nitrogen washed out by rain.",
        ],
        memory: "Lightning, Fix, Nitrify, Ammonify, Denitrify, Leach.",
      },
    ],
    likely: [
      { question: "Define nutrient cycling.", answer: "The movement of nutrient elements such as carbon, nitrogen and water from the environment into living organisms and back to the environment." },
      { question: "Which process removes carbon dioxide from the atmosphere?", answer: "Photosynthesis." },
      { question: "Name two processes that return carbon dioxide to the atmosphere.", answer: "Any two of: respiration, decay (decomposition), burning of fuel, volcanic eruption." },
      { question: "What percentage of air is oxygen and what percentage is carbon dioxide?", answer: "Oxygen about 21%; carbon dioxide about 0.03%." },
      { question: "What is transpiration and which cycle is it part of?", answer: "The loss of water vapour from plants through the stomata. It is part of the water cycle." },
      { question: "State four importance of water to living organisms.", answer: "Any four of: medium for absorbing mineral salts; raw material for photosynthesis; solvent for chemical reactions; transport medium; regulation of body temperature; maintenance of osmotic balance; excretion." },
      { question: "Why can plants not use nitrogen gas from the air directly?", answer: "They can only absorb nitrogen as nitrates or ammonium compounds from the soil." },
      { question: "What is nitrogen fixation? Name a root-nodule bacterium.", answer: "Converting atmospheric nitrogen into compounds plants can use. Rhizobium is a root-nodule bacterium of leguminous plants." },
      { question: "What does Nitrobacter do in the nitrogen cycle?", answer: "It converts nitrite to nitrate, which plants can absorb." },
      { question: "What is denitrification?", answer: "The reduction of nitrates in the soil to nitrogen gas, which escapes into the atmosphere, by denitrifying bacteria." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which process removes carbon dioxide from the atmosphere?", options: ["Photosynthesis", "Respiration", "Decay", "Combustion"], answer: "A" },
    { number: 2, kind: "Objective", prompt: "Which substance is NOT recycled in an ecosystem?", options: ["Carbon", "Energy", "Nitrogen", "Water"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The percentage of carbon dioxide in the air is about", options: ["0.03%", "21%", "78%", "0.9%"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "Oxygen makes up about what percentage of the air?", options: ["78%", "1%", "0.03%", "21%"], answer: "D" },
    { number: 5, kind: "Objective", prompt: "Water vapour that cools and forms droplets has undergone", options: ["evaporation", "condensation", "transpiration", "respiration"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "Water is lost from plant leaves mainly through", options: ["combustion", "transpiration", "decay", "respiration"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Which organism fixes nitrogen in the root nodules of leguminous plants?", options: ["Rhizobium", "Azotobacter", "Nitrobacter", "Nitrosomonas"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "Which bacterium converts ammonium compounds to nitrite?", options: ["Nitrosomonas", "Nitrobacter", "Rhizobium", "Clostridium"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "Nitrates in the soil are reduced back to nitrogen gas by", options: ["Rhizobium", "denitrifying bacteria", "Nostoc", "Nitrosomonas"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "Plants can absorb nitrogen from the soil in the form of", options: ["nitrogen gas", "proteins", "nitrates and ammonium salts", "chlorophyll"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "During lightning, nitrogen is made available to the soil by", options: ["destroying nitrates", "forming nitrogen oxides that dissolve in rain", "making chlorophyll", "killing decomposers"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Which process returns carbon dioxide to the atmosphere?", options: ["photosynthesis", "absorption by roots", "respiration", "sunlight"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Which of these is a free-living nitrogen-fixing bacterium?", options: ["Nitrosomonas", "Azotobacter", "Nitrobacter", "denitrifying bacteria"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Which process takes place during decay?", options: ["ammonification (production of ammonium compounds)", "fixation", "photosynthesis", "transpiration"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Define nutrient cycling and explain why cycles are important to an ecosystem.", answer: "Nutrient cycling is the movement of nutrient elements such as carbon, nitrogen and water from the environment into organisms and back to the environment. Cycles are important because they make sure the nutrients are reused, so the supply does not run out and the ecosystem can keep working." },
    { number: 16, kind: "Theory", prompt: "Describe the carbon cycle, naming the processes that add carbon dioxide to the air and remove it.", answer: "Plants remove carbon dioxide from the air by photosynthesis and build it into biomolecules. Animals eat plants, taking in carbon. Carbon dioxide returns to the air by respiration in plants and animals, by decay of dead matter, and by burning fuel. Some carbon becomes fossil fuel." },
    { number: 17, kind: "Theory", prompt: "Describe the water cycle, using labelled points or a diagram.", answer: "Water evaporates from seas, lakes, rivers and soil into the atmosphere. Water vapour cools and condenses into clouds, which fall as rain. Plants take up water from the soil and lose it by transpiration. Water runs back to the seas and lakes, and the cycle repeats." },
    { number: 18, kind: "Theory", prompt: "Describe four ways nitrogen can be made available to the soil for plant growth.", answer: "Any four of: lightning (nitrogen oxides in rain); nitrogen fixation by free-living bacteria such as Azotobacter; symbiotic fixation by Rhizobium in root nodules; nitrification by Nitrosomonas and Nitrobacter; ammonification from decay of dead matter; application of artificial fertilisers." },
    { number: 19, kind: "Theory", prompt: "Explain the roles of Rhizobium and Nitrobacter in the nitrogen cycle.", answer: "Rhizobium lives in the root nodules of leguminous plants and fixes nitrogen gas from the air into compounds the plant can use; the plant provides carbohydrate. Nitrobacter converts nitrite into nitrate, a form that plants can absorb from the soil." },
    { number: 20, kind: "Theory", prompt: "Explain how a rise in atmospheric carbon dioxide can affect the climate, and how the carbon cycle helps to balance it.", answer: "Carbon dioxide traps heat from the sun. A rise in its level can strengthen the greenhouse effect, warming the earth, melting polar ice and changing climates. The carbon cycle balances it: photosynthesis removes carbon dioxide from the air, while the oxygen released by photosynthesis keeps the atmosphere in balance." },
  ] as PracticeQuestion[],
};
