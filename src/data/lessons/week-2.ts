import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week2: Lesson = {
  id: "ss1-first-chemistry-week-2",
  week: "Week 02",
  title: "Laboratory Apparatus",
  subtitle: "Learn the safety rules of the laboratory and match each piece of apparatus to the job it does.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "State and explain the safety rules of a chemistry laboratory and recognise common hazard symbols.",
    "Name common apparatus and state the use of each.",
    "Choose suitable measuring apparatus for a given volume, mass, time or temperature.",
    "Describe the parts of a Bunsen burner and compare its luminous and non-luminous flames.",
    "Choose suitable heating, holding, separating and storage apparatus for a simple practical.",
    "Name the apparatus used in a titration and the precautions taken.",
  ],
  sections: [
    {
      heading: "1. Why a laboratory has rules",
      paragraphs: [
        "A school laboratory is a workplace where heat, glass, flammable liquids and harmful chemicals are used together. Its rules exist to protect you, your classmates and the results of your experiment. The rules are not a list to memorise for an exam only: each one prevents a particular accident.",
        "Before any practical, read the instructions, know where the exits, water supply, sand bucket, fire blanket and first-aid box are, and listen to your teacher. If you do not understand a step, ask before you do it.",
      ],
    },
    {
      heading: "2. Safety rules and hazard symbols",
      paragraphs: [
        "Wear a laboratory coat and, where told, safety goggles. Tie back long hair and keep loose clothing away from flames. Never eat, drink or run in the laboratory. Do not taste chemicals, and smell a gas only by wafting a little of it towards your nose with your hand. Never point the mouth of a heated test tube at anyone, including yourself.",
        "Add acid to water, never water to acid, because the mixing releases heat and can make the liquid spit. Keep flammable liquids such as ethanol away from flames. Use a fume cupboard for poisonous gases. Label every container. Return chemicals to their correct bottles only if your teacher says so, since mixing them can contaminate the stock. Wash your hands at the end.",
        "First aid: for a chemical splash on the skin or in the eye, wash at once with plenty of cold running water and tell the teacher. For a small burn, cool it under running water. Smother a small fire with a damp cloth, a fire blanket or sand. Never use water on an oil or electrical fire.",
        "Hazard symbols on bottles warn you of the main danger. A flame means flammable; a skull and crossbones means toxic; a corrosive symbol shows a liquid eating into a hand and a surface; an exclamation mark means irritant or harmful; a flame over a circle means oxidising; an exploding bomb means explosive.",
      ],
      points: [
        "Eyes in danger: wear goggles and wash splashes away with water.",
        "Fire danger: tie hair back, keep flammable liquids far from flames.",
        "Poison danger: never taste, and use a fume cupboard for toxic gases.",
        "Heat danger: use tongs or a holder, and point test tubes away from people.",
      ],
    },
    {
      heading: "3. Measuring apparatus",
      paragraphs: [
        "The tool you choose depends on how accurate the measurement needs to be. For volume of liquid, a beaker gives only a rough value. A measuring cylinder is better, usually reading to the nearest cm³ or half cm³. A pipette delivers one exact volume, such as 25.0 cm³, and a burette delivers any volume you choose from a tap, read to about the nearest 0.05 cm³. A volumetric flask holds one exact volume and is used to prepare solutions of a known concentration.",
        "When you read a liquid in glass, bring your eye level with the liquid surface. Water curves upwards at the edges to form a meniscus, so read the bottom of the curve. Reading from above or below gives a wrong value.",
        "Other measuring tools: the thermometer measures temperature in °C; the balance measures mass (in g or kg, usually to two decimal places on a laboratory balance); the stopwatch measures time; a ruler measures length.",
      ],
      points: [
        "Rough volume: beaker.",
        "Better volume: measuring cylinder.",
        "Exact fixed volume: pipette or volumetric flask.",
        "Variable volume with high accuracy: burette.",
        "Mass: balance. Temperature: thermometer. Time: stopwatch.",
      ],
      diagram: "Draw a measuring cylinder with water in it. Mark a meniscus curving up at the wall, and draw an eye at the same level as the bottom of the curve with a dotted line showing the correct reading position.",
    },
    {
      heading: "4. Heating apparatus and the Bunsen burner",
      paragraphs: [
        "The Bunsen burner is the usual heat source. It has a base, a gas inlet tube joined to the gas supply, a barrel (chimney), and an air hole in the collar at the bottom of the barrel. The collar can be turned to open or close the air hole. To light it, strike a match first, hold it above the barrel, then turn on the gas.",
        "With the air hole closed, the gas burns with a yellow, luminous flame. Combustion is incomplete, tiny carbon particles glow, the flame is cooler and leaves soot on glassware. It is easy to see, so it is the safety flame used when the burner is not in use. With the air hole open, enough air mixes with the gas for complete combustion. The flame is blue, non-luminous, silent or with a slight roar, and much hotter. It is the flame used for heating.",
        "The non-luminous flame has zones. The inner dark cone contains unburnt gas and is the coolest. The pale-blue outer region burns the gas completely and is the hottest, and so the hottest part for heating is just above the tip of the inner cone.",
        "Other heating tools: a tripod stand holds containers over the flame, a wire gauze spreads the heat evenly, a pipe-clay triangle holds a crucible, a spirit lamp gives a gentle flame, and a water bath heats a substance gently to no more than 100 °C. For heating small amounts in a test tube, hold the tube with a holder, heat the side and shake gently.",
      ],
      points: [
        "Air hole closed: yellow, luminous, sooty, cooler (safety flame).",
        "Air hole open: blue, non-luminous, clean, hotter (heating flame).",
        "Hottest zone: the outer edge just above the tip of the inner cone.",
      ],
      diagram: "Draw a Bunsen burner and label base, gas inlet, barrel, collar and air hole. Beside it draw a non-luminous flame with the inner cone, the outer pale-blue zone and the hottest region marked.",
    },
    {
      heading: "5. Holding and supporting apparatus",
      paragraphs: [
        "A retort stand (a metal rod fixed in a heavy base) supports apparatus, with a boss and clamp holding flasks, burettes or condensers at the height you need. A test-tube rack stands test tubes upright, and a test-tube holder lets you hold a hot tube. A tripod and gauze hold a beaker over a flame. Crucible tongs pick up hot crucibles and evaporating dishes. A pipe-clay triangle supports a crucible on a tripod.",
      ],
    },
    {
      heading: "6. Containers and reaction vessels",
      paragraphs: [
        "A test tube holds small amounts for simple tests; a boiling tube is wider and stronger for heating larger amounts. A beaker holds, mixes and gently heats liquids, but cannot measure accurately. A conical flask (Erlenmeyer) can be swirled without spilling, so it is used in titrations. A round-bottom flask heats liquids evenly and is used in distillation; a flat-bottom flask can stand on a bench. An evaporating dish is used to evaporate a solution to dryness, a crucible to heat solids to very high temperatures, and a watch glass to cover a beaker, weigh small samples or dry crystals. A gas jar collects gases, and a reagent bottle with a stopper stores chemicals.",
      ],
    },
    {
      heading: "7. Apparatus for separating and handling",
      paragraphs: [
        "A filter funnel with filter paper separates an insoluble solid from a liquid. A separating funnel separates two liquids that do not mix, such as oil and water. A distillation flask and a Liebig condenser, with cold water entering at the bottom and leaving at the top, are used to distil a liquid. A teat pipette (dropper) moves small volumes of liquid, a wash bottle holds distilled water for rinsing, and a spatula lifts small amounts of solid.",
        "A glass rod stirs and guides liquids during pouring. A mortar and pestle grind solids to powder. A delivery tube carries gas from a reaction vessel to a gas jar or a trough of water, and a thistle or dropping funnel adds liquid to a flask while it is stoppered. A deflagrating spoon lowers a burning solid into a gas jar. A desiccator keeps substances dry.",
      ],
    },
    {
      heading: "8. Apparatus for titration (preview)",
      paragraphs: [
        "A titration finds how much of one solution reacts exactly with another. A burette holds one solution and delivers it drop by drop, a pipette measures a fixed volume of the other into a conical flask, and a few drops of an indicator show the end point by changing colour. A white tile under the flask makes the colour change easier to see, and a small funnel helps fill the burette.",
        "Precautions: rinse the burette with the solution it will hold, remove the funnel before reading, make sure there are no air bubbles below the tap, read the bottom of the meniscus at eye level, swirl the flask while adding, and add the last portion drop by drop near the end point.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "When asked for the use of a piece of apparatus, give the job and a specific example: ‘pipette: measures a fixed volume, such as 25.0 cm³, of a solution’.",
    "A beaker has markings but is not a measuring instrument. Do not name it as the apparatus for accurate volumes.",
    "The yellow flame is luminous and cooler; the blue flame is non-luminous and hotter. Examiners often swap the two.",
    "Light the match BEFORE turning on the gas, and open the air hole only after the burner is lit.",
    "Add acid to water, not water to acid. State the reason: heat is released.",
    "In a condenser, the cold water goes in at the bottom and out at the top so that the jacket stays full.",
    "Read a meniscus at eye level, from the bottom of the curve for water.",
    "The burette is rinsed with the solution it will hold. The conical flask is rinsed with distilled water only.",
  ],
  summary:
    "Laboratory rules prevent accidents: wear protection, never taste chemicals, handle heat and flammables carefully, add acid to water and know the first-aid steps and hazard symbols. Measuring apparatus is chosen by accuracy: beaker (rough), measuring cylinder, pipette and volumetric flask (fixed exact volume) and burette (accurate variable volume), with the balance, thermometer and stopwatch for mass, temperature and time. The Bunsen burner gives a yellow luminous flame with the air hole closed and a hotter blue non-luminous flame with it open. Other apparatus holds, supports, contains, separates or transfers materials, and the titration set-up uses a burette, pipette, conical flask, indicator and white tile.",
  quick: {
    intro: "Revision sheet for Week 2. Be ready to name an item from its job, and its job from its name.",
    blocks: [
      {
        heading: "1. Safety",
        points: [
          "Coat and goggles on; long hair tied back; no eating, drinking or running.",
          "Never taste chemicals; waft gases gently; never point a heated tube at anyone.",
          "Add acid to water. Keep flammables away from flames.",
          "Chemical in eye or on skin: wash with plenty of running water. Small fire: damp cloth, fire blanket or sand.",
          "Symbols: flammable (flame), toxic (skull), corrosive, irritant (!), oxidising, explosive.",
        ],
      },
      {
        heading: "2. Measuring",
        points: [
          "Rough volume: beaker. Better: measuring cylinder.",
          "Fixed exact volume: pipette, volumetric flask.",
          "Variable accurate volume: burette (to 0.05 cm³).",
          "Mass: balance. Temperature: thermometer. Time: stopwatch.",
          "Read the meniscus at eye level, at the bottom of the curve for water.",
        ],
      },
      {
        heading: "3. Heating and the Bunsen flame",
        points: [
          "Parts: base, gas inlet, barrel, collar with air hole.",
          "Air hole closed: yellow, luminous, sooty, cooler (safety flame).",
          "Air hole open: blue, non-luminous, clean, hotter.",
          "Support: tripod and gauze; crucible on a pipe-clay triangle; tongs for hot items.",
        ],
      },
      {
        heading: "4. Holding and containers",
        points: [
          "Retort stand + boss + clamp: supports flasks and burettes.",
          "Test-tube rack: stores tubes. Holder: grips a hot tube.",
          "Conical flask: titrations. Round-bottom flask: distillation.",
          "Evaporating dish: evaporating to dryness. Crucible: high-temperature heating. Watch glass: covering and drying.",
        ],
      },
      {
        heading: "5. Separating and handling",
        points: [
          "Funnel + filter paper: insoluble solid from liquid.",
          "Separating funnel: two liquids that do not mix.",
          "Liebig condenser: cools vapour (water in at the bottom, out at the top).",
          "Teat pipette, spatula, glass rod, mortar and pestle, delivery tube, desiccator.",
        ],
      },
      {
        heading: "6. Titration apparatus and care",
        points: [
          "Burette, pipette, conical flask, white tile, indicator, small funnel.",
          "Rinse the burette with its solution; remove the funnel before reading.",
          "No air bubbles below the tap; swirl; add the last drops one at a time.",
        ],
      },
    ],
    likely: [
      { question: "State five laboratory safety rules.", answer: "Any five: wear a coat and goggles; tie back long hair; never taste chemicals; add acid to water; keep flammables away from flames; do not eat, drink or run; point test tubes away from people; label containers; wash hands after the practical." },
      { question: "What should you do if a corrosive liquid splashes on your skin?", answer: "Wash it at once with plenty of cold running water and tell the teacher." },
      { question: "Name the apparatus for measuring (a) a fixed 25.0 cm³ of solution, (b) a variable volume accurately, (c) mass.", answer: "(a) Pipette, (b) burette, (c) balance." },
      { question: "Why is the air hole of a Bunsen burner opened for heating?", answer: "It lets air mix with the gas so that combustion is complete, giving a hotter, blue, non-sooty flame." },
      { question: "Compare the luminous and non-luminous Bunsen flames.", answer: "Luminous: air hole closed, yellow, sooty, cooler, incomplete combustion. Non-luminous: air hole open, blue, no soot, hotter, complete combustion." },
      { question: "State the use of a retort stand, tripod stand and evaporating dish.", answer: "Retort stand supports apparatus such as burettes and flasks. Tripod stand supports a container being heated. Evaporating dish is used to evaporate a solution to dryness." },
      { question: "Which apparatus separates two liquids that do not mix?", answer: "A separating funnel." },
      { question: "State the direction of water flow in a Liebig condenser and give a reason.", answer: "Water enters at the bottom and leaves at the top so that the cooling jacket is always full." },
      { question: "List the apparatus needed for a titration.", answer: "Burette, pipette, conical flask, indicator, white tile, small funnel and retort stand." },
      { question: "State two precautions when using a burette.", answer: "Rinse it with the solution it will hold; remove the funnel and any air bubbles before reading; read the meniscus at eye level." },
      { question: "Why must acid be added to water and not water to acid?", answer: "Mixing releases heat; adding acid slowly to a large amount of water keeps the heat controlled and prevents splashing." },
      { question: "What is a meniscus and how is it read?", answer: "The curved surface of a liquid in a narrow tube. Read it with the eye level with the liquid, at the bottom of the curve for water." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which action is a good laboratory safety practice?", options: ["Tasting a chemical to identify it", "Adding acid slowly to water", "Running between benches", "Pointing a heated test tube at a friend"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "A student gets a drop of acid on her hand. The first thing she should do is", options: ["wipe it on her coat", "wash it with plenty of running water", "ignore it", "rub it with a dry cloth"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "A hazard symbol of a skull and crossbones on a bottle means the substance is", options: ["flammable", "toxic", "oxidising", "explosive"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "Which apparatus gives the most accurate fixed volume of 25.0 cm³ of a liquid?", options: ["Beaker", "Measuring cylinder", "Pipette", "Test tube"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "A burette is used to", options: ["deliver a variable volume of liquid accurately", "heat a liquid", "store a gas", "filter a solid"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "To read the volume of water in a measuring cylinder correctly, the eye should be", options: ["above the liquid", "below the liquid", "level with the bottom of the meniscus", "level with the top of the cylinder"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Which instrument measures mass?", options: ["Thermometer", "Balance", "Stopwatch", "Burette"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "When the air hole of a Bunsen burner is closed, the flame is", options: ["blue and hot", "yellow and sooty", "colourless and noisy", "invisible"], answer: "B", explanation: "Incomplete combustion produces glowing carbon particles (soot) and a cooler yellow flame." },
    { number: 9, kind: "Objective", prompt: "The flame normally used for heating in the laboratory is", options: ["the luminous flame", "the non-luminous flame", "the safety flame", "a smoky flame"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The hottest part of the non-luminous Bunsen flame is", options: ["the inner dark cone", "just above the tip of the inner cone", "the base of the flame", "inside the barrel"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Which of these holds a conical flask above a Bunsen burner?", options: ["Test-tube rack", "Tripod stand and wire gauze", "Spatula", "Watch glass"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "A student wants to heat a solid to a very high temperature. The best container is a", options: ["beaker", "crucible", "measuring cylinder", "gas jar"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "Which apparatus is used to evaporate a salt solution to dryness?", options: ["Evaporating dish", "Gas jar", "Pipette", "Burette"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "Which apparatus separates an insoluble solid from a liquid?", options: ["Separating funnel", "Filter funnel with filter paper", "Liebig condenser", "Retort stand"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "Oil and water can be separated using a", options: ["separating funnel", "mortar and pestle", "crucible", "thermometer"], answer: "A" },
    { number: 16, kind: "Objective", prompt: "In a Liebig condenser the cooling water should enter", options: ["at the top and leave at the bottom", "at the bottom and leave at the top", "at either end", "through the flask"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "A mortar and pestle is used to", options: ["measure volume", "grind solids into powder", "heat liquids", "collect gases"], answer: "B" },
    { number: 18, kind: "Objective", prompt: "Which pair of apparatus is needed to hold and measure the solution during a titration?", options: ["Beaker and test tube", "Burette and pipette", "Crucible and tongs", "Watch glass and spatula"], answer: "B" },
    { number: 19, kind: "Objective", prompt: "The white tile placed under the conical flask in a titration helps to", options: ["heat the flask", "make the colour change easier to see", "stop the flask rolling", "cool the solution"], answer: "B" },
    { number: 20, kind: "Objective", prompt: "A gas jar is used to", options: ["collect a gas", "weigh a solid", "filter a liquid", "measure temperature"], answer: "A" },
    { number: 21, kind: "Theory", prompt: "State six safety rules that should be observed in a chemistry laboratory and give a reason for any two.", answer: "Any six: wear a coat and goggles (protect skin and eyes); tie back hair (prevents it catching fire); never taste chemicals (many are poisonous); add acid to water (mixing releases heat); do not point a heated tube at anyone (liquid may spurt out); keep flammables away from flames; do not run; label containers; wash hands after use." },
    { number: 22, kind: "Theory", prompt: "Describe what to do in each case: (a) a chemical splashes into the eye, (b) a small fire starts in a beaker, (c) a thermometer breaks.", answer: "(a) Rinse the eye at once with plenty of clean running water and inform the teacher. (b) Cover it with a damp cloth, fire blanket or sand to cut off air; do not use water on an oil fire. (c) Do not touch the glass or mercury; tell the teacher, who will clear it safely." },
    { number: 23, kind: "Theory", prompt: "Name the apparatus you would use to (a) measure exactly 25.0 cm³ of solution, (b) add acid drop by drop from a tap, (c) measure 5.0 g of solid, (d) measure the temperature of a liquid.", answer: "(a) Pipette, (b) burette, (c) balance, (d) thermometer." },
    { number: 24, kind: "Theory", prompt: "Draw and label a Bunsen burner and explain what happens to the flame when the air hole is closed.", answer: "Labelled parts: base, gas inlet, barrel (chimney), collar and air hole. With the air hole closed there is little air, combustion is incomplete, carbon particles glow and the flame is yellow, luminous, sooty and cooler." },
    { number: 25, kind: "Theory", prompt: "Compare the luminous and non-luminous flames of a Bunsen burner under four headings.", answer: "Air hole: closed (luminous), open (non-luminous). Colour: yellow, blue. Combustion: incomplete, complete. Temperature: cooler, hotter. Soot: yes, none. Use: safety flame, heating flame." },
    { number: 26, kind: "Theory", prompt: "State the use of each: retort stand, tripod stand, test-tube holder, crucible tongs, wash bottle.", answer: "Retort stand: supports apparatus such as burettes and flasks. Tripod stand: supports a container over a flame. Test-tube holder: grips a hot test tube. Crucible tongs: pick up hot crucibles or dishes. Wash bottle: holds distilled water for rinsing." },
    { number: 27, kind: "Theory", prompt: "Choose suitable apparatus for each task: (a) evaporating a salt solution to dryness, (b) separating oil from water, (c) collecting a gas, (d) heating a solid very strongly.", answer: "(a) Evaporating dish on a tripod and gauze; (b) separating funnel; (c) gas jar with a delivery tube; (d) crucible on a pipe-clay triangle, held with tongs." },
    { number: 28, kind: "Theory", prompt: "Describe how a Liebig condenser works, including the direction of the water flow.", answer: "Hot vapour passes through the inner tube and is cooled by cold water in the outer jacket, so it condenses to a liquid and drips into the receiver. Water enters at the bottom and leaves at the top so the jacket stays full and cooling is efficient." },
    { number: 29, kind: "Theory", prompt: "List the apparatus required for a titration and state three precautions.", answer: "Burette, pipette, conical flask, retort stand, white tile, small funnel and indicator. Precautions: rinse the burette with its solution, remove air bubbles and the funnel before reading, read the meniscus at eye level, swirl the flask and add the last drops slowly." },
    { number: 30, kind: "Theory", prompt: "A student says the beaker is the best apparatus for measuring 25 cm³ of liquid accurately. Do you agree? Explain.", answer: "No. A beaker has rough markings and is not designed to measure accurately. A measuring cylinder is better, and a pipette is best for exactly 25.0 cm³ because it delivers one fixed volume with high accuracy." },
  ] as PracticeQuestion[],
};
