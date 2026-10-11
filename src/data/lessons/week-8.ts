import type { Lesson, LessonSection, PracticeQuestion } from "./types";

export const week8: Lesson = {
  id: "ss1-first-chemistry-week-8",
  week: "Week 08",
  title: "Particulate Nature of Matter",
  subtitle: "See how the idea that everything is made of moving particles explains states of matter, changes of state, diffusion and gas behaviour.",
  source: "Written by Edify for the SS1 First Term Chemistry scheme of work. The explanations, worked examples and practice questions are original.",
  objectives: [
    "Give evidence that matter is made of particles and state the main points of the kinetic theory.",
    "Describe the arrangement, motion and attraction of particles in solids, liquids and gases.",
    "Explain melting, freezing, evaporation, boiling, condensation and sublimation using particle ideas.",
    "Interpret a heating curve and explain latent heat.",
    "Describe Brownian motion and diffusion and explain what they show.",
    "Explain gas pressure and use Graham’s law to compare rates of diffusion of gases.",
  ],
  sections: [
    {
      heading: "1. Matter is made of particles",
      paragraphs: [
        "Everything you can touch is made of extremely small particles (atoms, molecules or ions) that are far too small to see directly. We believe this because many everyday observations are easy to explain if matter is particulate. A single crystal of potassium manganate(VII) placed in a beaker of water slowly colours all the water purple, even without stirring: the crystal broke into particles that spread through the water. A drop of ink spreads through a glass of water. The smell of frying onions reaches the next room.",
        "Solutions give more evidence. When sugar dissolves in tea the volume hardly changes, and the tea tastes sweet everywhere, showing that the sugar has broken into particles that fit in between the particles of water.",
      ],
    },
    {
      heading: "2. The kinetic theory of matter",
      paragraphs: [
        "The kinetic theory states that: (1) all matter is made of tiny particles; (2) the particles are always moving, and the hotter the substance, the faster they move on average; (3) there are spaces between the particles; (4) there are forces of attraction between particles, which become stronger as they get closer.",
        "Temperature is a measure of how fast the particles move on average, that is, of their average kinetic energy. Heating a substance gives its particles more energy and makes them move faster; cooling does the opposite. At the lowest possible temperature, absolute zero (0 K or −273 °C), the motion of particles would be at a minimum.",
      ],
    },
    {
      heading: "3. The three states of matter",
      paragraphs: [
        "In a solid the forces of attraction are strong and the particles are packed closely in a regular pattern. They cannot move from place to place but vibrate about fixed positions. This explains the fixed shape and volume and why solids are hard to compress.",
        "In a liquid the particles are still close, and the attraction is strong enough to hold them together but not to keep them in fixed positions. They slide over one another, so a liquid flows and takes the shape of its container, while its volume stays fixed.",
        "In a gas the particles are very far apart, moving rapidly in random directions, and the forces of attraction are almost zero. A gas therefore spreads to fill any container and can be compressed easily, because most of its volume is empty space.",
      ],
      diagram: "Draw three boxes. Solid: particles in neat rows, touching, with small arrows marking vibration. Liquid: particles touching but jumbled, with curved arrows. Gas: a few particles widely spaced with long straight arrows. Label each box with its state.",
    },
    {
      heading: "4. Changes of state",
      paragraphs: [
        "Melting happens when a solid is heated. The particles vibrate more strongly, and at the melting point they gain enough energy to break out of their fixed positions. The temperature stays steady while melting is taking place. Freezing is the reverse: as a liquid cools, the particles slow down and settle into fixed positions at the freezing point.",
        "Boiling happens when the liquid is heated to its boiling point: bubbles of vapour form throughout the liquid. The particles gain enough energy to overcome the forces of attraction altogether and escape as a gas. Condensation is the reverse change from gas to liquid on cooling. Sublimation is the direct change from solid to gas (and back) without going through the liquid state; it occurs in solids with weak forces between particles, such as iodine and ammonium chloride.",
        "Evaporation differs from boiling. It takes place from the surface of a liquid at any temperature, when the fastest-moving particles at the surface break free. It is faster when the liquid is warmer, when its surface area is larger, when the air is dry and when there is a draught. Because the most energetic particles escape, the liquid left behind cools. This is why a wet cloth or sweating cools the body, and why water in a clay pot stays cool.",
      ],
    },
    {
      heading: "5. Heating curve and latent heat",
      paragraphs: [
        "If a block of ice is heated steadily and its temperature is plotted against time, the graph is not a straight line. The temperature rises while the ice is solid; it stops at 0 °C while the ice melts, and then rises as liquid water; it stops again at 100 °C while the water boils; then it rises again as steam. The flat parts are where a change of state is taking place.",
        "During the flat parts, heat is still being supplied, but the temperature does not rise because the energy is being used to overcome the forces of attraction between particles, not to make them move faster. This hidden energy is called latent heat: latent heat of fusion for melting and latent heat of vaporisation for boiling. The same energy is released when the substance freezes or condenses.",
      ],
      diagram: "Draw a graph with time on the horizontal axis and temperature on the vertical axis. Show a rising line from below 0 °C, a flat line at 0 °C labelled ‘melting’, a rising line to 100 °C, a flat line at 100 °C labelled ‘boiling’, then a final rising line labelled ‘steam’.",
    },
    {
      heading: "6. Brownian motion",
      paragraphs: [
        "In 1827 the botanist Robert Brown saw pollen grains in water zigzagging constantly under a microscope. The same happens to smoke particles in air. This random movement is called Brownian motion. It occurs because the visible particles are being hit unevenly from different sides by the fast-moving, invisible particles of the water or air. It is strong evidence that particles of matter exist and are always moving, and it is more vigorous at higher temperatures.",
      ],
    },
    {
      heading: "7. Diffusion",
      paragraphs: [
        "Diffusion is the spreading of particles of one substance through another, from where there is more of it to where there is less, until they are evenly mixed. It happens because particles move randomly. Gases diffuse fastest because their particles are far apart and move quickly; liquids diffuse slowly; solids diffuse extremely slowly. Diffusion is faster at higher temperatures, and a lighter gas diffuses faster than a heavier gas.",
        "Demonstration: place a cotton wool pad soaked in concentrated ammonia solution at one end of a long dry glass tube and a pad soaked in concentrated hydrochloric acid at the other, and seal both ends. A white ring of ammonium chloride forms after a few minutes, but nearer the hydrochloric acid end. Ammonia (relative molecular mass 17) is lighter than hydrogen chloride (36.5), so it diffuses faster and travels further before they meet.",
      ],
      diagram: "Draw a horizontal glass tube. At the left end draw a pad labelled HCl, at the right end a pad labelled NH₃. Mark a white ring about two-thirds of the way along towards the HCl end, and label it ‘NH₄Cl forms here’.",
    },
    {
      heading: "8. Kinetic theory of gases and Graham’s law",
      paragraphs: [
        "In the kinetic theory of gases the particles are treated as tiny points moving randomly and fast in straight lines, colliding with one another and with the walls of the container without losing energy. Gas pressure is caused by these collisions with the walls. If the same gas is squeezed into a smaller volume, the particles hit the walls more often, so pressure rises; if the gas is heated, the particles move faster and hit the walls harder and more often, so pressure rises or the gas expands.",
        "Graham’s law states that at the same temperature and pressure the rate of diffusion of a gas is inversely proportional to the square root of its relative molecular mass (or density). For two gases: rate₁ ÷ rate₂ = √(M₂ ÷ M₁). Worked example: how many times faster does hydrogen (M = 2) diffuse than oxygen (M = 32)? Rate ratio = √(32 ÷ 2) = √16 = 4. Hydrogen diffuses four times as fast.",
        "Second example: a gas X diffuses 2 times as fast as sulphur dioxide (M = 64). Then 2 = √(64 ÷ M), so 4 = 64 ÷ M and M = 16. Gas X could be methane, CH₄.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Evaporation happens at any temperature from the surface only. Boiling happens at one fixed temperature throughout the liquid.",
    "Temperature stays constant during a change of state even though heat is being supplied. That heat is latent heat.",
    "Brownian motion is the movement of visible particles (pollen, smoke) caused by invisible particles hitting them. Do not say the pollen ‘moves by itself’.",
    "Diffusion needs no stirring or wind. It happens because particles move randomly.",
    "In the ammonia and hydrogen chloride tube, the white ring forms nearer the HCl end because NH₃ is lighter and faster.",
    "Graham’s law uses the square root of the relative molecular mass. The lighter gas diffuses faster, so the ratio is √(heavier ÷ lighter) for the lighter gas.",
    "Gas pressure is caused by particles hitting the walls of the container, not by particles hitting one another.",
    "Solids keep their volume and shape; liquids keep only volume; gases keep neither. Do not mix up the list in an objective question.",
  ],
  summary:
    "Matter is made of tiny particles in constant motion with spaces between them and forces of attraction, and temperature measures their average kinetic energy. Solids have particles in fixed positions that vibrate, liquids have particles that slide over one another, and gases have far-apart fast-moving particles. Changes of state occur when heating or cooling alters the balance between particle energy and attraction; temperature stays steady while the latent heat is absorbed or released. Evaporation takes place at the surface at any temperature, boiling throughout the liquid at one temperature. Brownian motion and diffusion are evidence for moving particles, gas pressure is caused by collisions with walls, and Graham’s law relates the rate of diffusion of gases to their relative molecular masses.",
  quick: {
    intro: "Week 8 in short. Remember particle pictures for every question, then link them to what you observe.",
    blocks: [
      {
        heading: "1. Kinetic theory",
        points: [
          "Matter is made of tiny particles.",
          "They are always moving. Hotter means faster on average.",
          "There are spaces between particles and forces of attraction.",
          "Temperature measures average kinetic energy.",
        ],
      },
      {
        heading: "2. States",
        points: [
          "Solid: close, fixed positions, vibrate; fixed shape and volume.",
          "Liquid: close, slide past each other; fixed volume, no fixed shape.",
          "Gas: far apart, fast and random; no fixed shape or volume; easily compressed.",
        ],
      },
      {
        heading: "3. Changes of state",
        points: [
          "Melting: solid → liquid. Freezing: liquid → solid.",
          "Boiling and evaporation: liquid → gas. Condensation: gas → liquid.",
          "Sublimation: solid ⇌ gas (iodine, ammonium chloride).",
          "Evaporation: surface only, any temperature, cools the liquid. Boiling: whole liquid, fixed temperature.",
        ],
      },
      {
        heading: "4. Heating curve",
        points: [
          "Flat parts at melting point (0 °C for ice) and boiling point (100 °C for water).",
          "Heat taken in without a temperature rise = latent heat.",
          "Latent heat of fusion (melting); latent heat of vaporisation (boiling).",
        ],
      },
      {
        heading: "5. Brownian motion and diffusion",
        points: [
          "Brownian motion: random zigzag of visible particles (smoke, pollen) hit by invisible particles; evidence for particles.",
          "Diffusion: spreading of particles from high to low concentration; fastest in gases; faster when hot; lighter gases diffuse faster.",
          "NH₃ + HCl tube: white NH₄Cl ring forms nearer the HCl end.",
        ],
      },
      {
        heading: "6. Gases and Graham’s law",
        points: [
          "Pressure comes from particles colliding with the walls.",
          "Smaller volume or higher temperature gives more collisions and higher pressure.",
          "Graham’s law: rate₁ ÷ rate₂ = √(M₂ ÷ M₁).",
          "H₂ diffuses 4 times as fast as O₂.",
        ],
      },
    ],
    likely: [
      { question: "State the main assumptions of the kinetic theory of matter.", answer: "Matter is made of tiny particles that are always moving, with spaces between them and forces of attraction. Hotter particles move faster on average." },
      { question: "Describe the arrangement of particles in a solid, a liquid and a gas.", answer: "Solid: closely packed in fixed positions vibrating. Liquid: close together and sliding past each other. Gas: far apart, moving fast and randomly." },
      { question: "Explain why a gas can be compressed but a liquid cannot.", answer: "The particles of a gas are far apart with much empty space between them, while the particles of a liquid are already close together." },
      { question: "What is the difference between evaporation and boiling?", answer: "Evaporation occurs at the surface at any temperature and is slow. Boiling occurs throughout the liquid at a fixed temperature, with bubbles of vapour." },
      { question: "Why does evaporation cause cooling?", answer: "The most energetic particles escape from the surface, so the average energy of those left behind falls." },
      { question: "What is latent heat?", answer: "The heat energy absorbed or released during a change of state without a change in temperature." },
      { question: "Why does the temperature stay constant while ice melts?", answer: "The energy supplied is used to break the forces holding the particles in the solid, not to raise the temperature." },
      { question: "What is Brownian motion and what does it show?", answer: "The random zigzag motion of small visible particles in a fluid. It shows that the fluid is made of fast-moving particles that collide with them." },
      { question: "Define diffusion and give an example.", answer: "The spreading of one substance through another because of the random motion of its particles, e.g. the smell of perfume spreading in a room." },
      { question: "In the experiment with ammonia and hydrogen chloride in a tube, where does the white ring form and why?", answer: "Nearer the hydrochloric acid end, because ammonia is lighter and diffuses faster." },
      { question: "State Graham’s law.", answer: "At the same temperature and pressure, the rate of diffusion of a gas is inversely proportional to the square root of its relative molecular mass (or density)." },
      { question: "How is gas pressure explained?", answer: "By the collisions of gas particles with the walls of the container." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "A crystal of potassium manganate(VII) slowly colours the whole of a beaker of water. This shows that matter", options: ["is made of particles that move", "has no mass", "is made of atoms that never move", "dissolves in everything"], answer: "A" },
    { number: 2, kind: "Objective", prompt: "According to the kinetic theory, the temperature of a substance measures the", options: ["size of its particles", "average kinetic energy of its particles", "number of its particles", "mass of its particles"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "In a solid the particles", options: ["move freely and randomly", "vibrate about fixed positions", "are far apart", "have no forces between them"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "A liquid has", options: ["fixed shape and fixed volume", "fixed volume but no fixed shape", "no fixed volume and no fixed shape", "fixed shape but no fixed volume"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Gases can be compressed easily because", options: ["their particles are tiny", "there is a lot of space between their particles", "their particles attract strongly", "they are light"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "The change of a solid directly to a gas is", options: ["melting", "boiling", "sublimation", "condensation"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Which statement about evaporation is correct?", options: ["It occurs only at the boiling point", "It occurs at the surface at any temperature", "It occurs throughout the liquid", "It makes the liquid hotter"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Sweating cools the body because", options: ["sweat is cold", "the most energetic particles leave the surface as vapour", "water absorbs light", "sweat condenses"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "While ice is melting at 0 °C and heat is still being supplied, the temperature", options: ["rises steadily", "falls", "stays constant", "doubles"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "The heat absorbed during melting without a change in temperature is called", options: ["specific heat", "latent heat of fusion", "heat of combustion", "latent heat of vaporisation"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "The flat part of a heating curve for water at 100 °C represents", options: ["melting", "boiling", "freezing", "dissolving"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Brownian motion is the", options: ["random motion of visible particles caused by collisions with invisible particles", "movement of particles in a straight line", "falling of particles under gravity", "change of state of a particle"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "Diffusion is fastest in", options: ["solids", "liquids", "gases", "crystals"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "A white ring of ammonium chloride forms nearer the hydrochloric acid end of a tube because", options: ["HCl is lighter", "NH₃ diffuses faster", "HCl diffuses faster", "NH₃ is heavier"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "Gas pressure is caused by", options: ["particles colliding with the walls of the container", "particles attracting each other", "particles being heavy", "light passing through the gas"], answer: "A" },
    { number: 16, kind: "Objective", prompt: "Heating a gas in a rigid container increases its pressure because the particles", options: ["become heavier", "move faster and hit the walls more often and harder", "stop moving", "attract one another more"], answer: "B" },
    { number: 17, kind: "Objective", prompt: "How many times faster does hydrogen (M = 2) diffuse than oxygen (M = 32)?", options: ["2", "4", "8", "16"], answer: "B", explanation: "Rate ratio = √(32 ÷ 2) = 4." },
    { number: 18, kind: "Objective", prompt: "Which gas diffuses fastest at the same temperature? [H = 1, C = 12, N = 14, O = 16]", options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"], answer: "D" },
    { number: 19, kind: "Objective", prompt: "A gas diffuses twice as fast as sulphur dioxide (M = 64). Its relative molecular mass is", options: ["8", "16", "32", "128"], answer: "B", explanation: "2 = √(64 ÷ M), so M = 16." },
    { number: 20, kind: "Objective", prompt: "The temperature at which the particles of a substance would have the least motion is", options: ["0 °C", "100 °C", "−273 °C", "25 °C"], answer: "C" },
    { number: 21, kind: "Theory", prompt: "State four points of the kinetic theory of matter and give two pieces of evidence that matter is made of particles.", answer: "Matter is made of tiny particles; they are always moving and move faster when hotter; there are spaces between them; there are forces of attraction between them. Evidence: a crystal of potassium manganate(VII) colours water without stirring; ink spreads through water; perfume or cooking smells spread through a room." },
    { number: 22, kind: "Theory", prompt: "Compare the arrangement, movement and forces between particles in solids, liquids and gases.", answer: "Solids: particles close, in fixed positions, vibrating; strong forces. Liquids: particles close but sliding past one another; weaker forces. Gases: particles far apart, moving rapidly and randomly; almost no forces." },
    { number: 23, kind: "Theory", prompt: "Explain, in terms of particles, what happens when (a) a solid melts and (b) a liquid boils.", answer: "(a) Heating makes the particles vibrate more; at the melting point they have enough energy to leave their fixed positions and slide over each other. (b) At the boiling point the particles have enough energy to overcome the forces between them completely, and vapour forms throughout the liquid." },
    { number: 24, kind: "Theory", prompt: "Distinguish between evaporation and boiling. State three factors that increase the rate of evaporation.", answer: "Evaporation takes place from the surface at any temperature; boiling takes place throughout the liquid at a fixed temperature. Evaporation is faster with a higher temperature, a larger surface area, a draught or dry air." },
    { number: 25, kind: "Theory", prompt: "Sketch and describe the heating curve of ice heated until it becomes steam, and explain why parts of it are flat.", answer: "Temperature rises as ice warms, stays at 0 °C while ice melts, rises as liquid water warms, stays at 100 °C while water boils, then rises as steam is heated. The flat parts are changes of state; the heat supplied (latent heat) is used to overcome the forces between particles instead of raising the temperature." },
    { number: 26, kind: "Theory", prompt: "What is Brownian motion? Explain how it supports the kinetic theory.", answer: "It is the random zigzag motion of visible particles such as pollen grains or smoke in a fluid. It occurs because they are hit unevenly by the invisible, fast-moving particles of the fluid, which shows that those particles exist and are always moving." },
    { number: 27, kind: "Theory", prompt: "Describe the experiment with ammonia and hydrogen chloride in a tube, state what is seen and explain the result.", answer: "Cotton wool pads soaked in concentrated ammonia solution and in concentrated hydrochloric acid are placed at opposite ends of a dry sealed glass tube. A white ring of ammonium chloride forms nearer the hydrochloric acid end. Ammonia particles (M = 17) are lighter than hydrogen chloride particles (M = 36.5), so they diffuse faster and travel further before meeting." },
    { number: 28, kind: "Theory", prompt: "Explain, using the kinetic theory, why (a) a gas exerts pressure and (b) the pressure of a gas in a closed container rises when it is heated.", answer: "(a) Gas particles collide with the walls of the container, and these collisions produce a force on the walls. (b) Heating makes the particles move faster, so they hit the walls more often and with greater force." },
    { number: 29, kind: "Theory", prompt: "State Graham’s law. Calculate how many times faster methane (CH₄) diffuses than sulphur dioxide (SO₂). [H = 1, C = 12, O = 16, S = 32]", answer: "At the same temperature and pressure, the rate of diffusion of a gas is inversely proportional to the square root of its relative molecular mass. M(CH₄) = 16 and M(SO₂) = 64, so rate ratio = √(64 ÷ 16) = √4 = 2. Methane diffuses twice as fast." },
    { number: 30, kind: "Theory", prompt: "A gas X diffuses 1.5 times as fast as a gas Y. If the relative molecular mass of Y is 36, find the relative molecular mass of X.", answer: "rate X ÷ rate Y = √(M_Y ÷ M_X), so 1.5 = √(36 ÷ M_X). Squaring: 2.25 = 36 ÷ M_X, so M_X = 36 ÷ 2.25 = 16." },
  ] as PracticeQuestion[],
};
