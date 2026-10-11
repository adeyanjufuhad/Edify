import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek10: Lesson = {
  id: "ss1-first-biology-week-10",
  week: "Week 10",
  title: "Animal nutrition: heterotrophic nutrition",
  subtitle: "How animals and other non-green organisms get their food from other living things or dead matter: holozoic, saprophytic, symbiotic and parasitic nutrition.",
  source: "Original teaching notes based chiefly on Hidden Facts in SSCE Biology, Chapter Six, ‘Types of nutrition’ and Chapter Seven, ‘Feeding mechanism and digestive system’ (PDF pages 85–90). The explanations and practice questions below are newly written for Edify.",
  objectives: [
    "Define heterotrophic nutrition and name its four types.",
    "Classify holozoic animals as herbivores, carnivores and omnivores, and distinguish predators from scavengers.",
    "Describe saprophytic nutrition, with examples, and explain why its digestion is extracellular.",
    "Describe symbiosis, using lichen and cellulose-digesting bacteria as examples.",
    "Explain parasitism, distinguish ectoparasites from endoparasites and describe the adaptations of parasites.",
    "Describe the stages of holozoic nutrition in man.",
  ],
  sections: [
    {
      heading: "1. What is heterotrophic nutrition?",
      paragraphs: [
        "A heterotroph cannot make its own food, so it obtains organic food from other living things or from dead matter. All animals are heterotrophs, and so are plants and microorganisms that lack chlorophyll, such as fungi and bacteria. A few flowering plants that have lost their chlorophyll, such as dodder and mistletoe, are also heterotrophs.",
        "There are four main types of heterotrophic nutrition: holozoic, saprophytic, symbiotic and parasitic.",
      ],
    },
    {
      heading: "2. Holozoic nutrition",
      paragraphs: [
        "In holozoic nutrition, the organism takes in solid food, eats it, digests it and absorbs the digested food into the body. Holozoic animals have efficient digestive systems that break solid food into simple, soluble substances.",
        "Herbivores feed on plants, such as sheep, cows and horses. Carnivores feed on the flesh of other animals, such as leopards and dogs. Carnivores that hunt living prey are predators; those that feed on dead animals are scavengers. Omnivores eat both plants and animals, like man.",
        "In man, holozoic nutrition involves five stages. Ingestion is taking food into the mouth. Digestion breaks food into small soluble molecules by mechanical and chemical action. Absorption moves these molecules into the blood or lymph. Assimilation uses them to build and repair the body. Egestion removes undigested material from the body as faeces.",
      ],
    },
    {
      heading: "3. Saprophytic nutrition",
      paragraphs: [
        "Saprophytes feed on dead and decaying organic matter. They secrete enzymes onto the material, digest it outside their bodies, and then absorb the soluble products. This is called extracellular digestion. Examples include most fungi, such as Mucor, mushrooms and yeast, and many bacteria.",
      ],
    },
    {
      heading: "4. Symbiotic nutrition",
      paragraphs: [
        "In symbiosis, two organisms of different species live together and both benefit. Lichen is a classic example: a fungus and an alga live together. The fungus provides moisture, mineral salts and support, while the alga makes food by photosynthesis for both. Another example is the association between the hermit crab and the sea anemone. Herbivores also depend on cellulose-digesting bacteria living in their caecum and colon, which break down the cellulose that the animal itself cannot digest.",
      ],
    },
    {
      heading: "5. Parasitic nutrition",
      paragraphs: [
        "In parasitism, one organism, the parasite, obtains food, protection and shelter from another, the host, and the host is harmed. Ectoparasites live on the surface of the host, for example lice, ticks, fleas, bed-bugs and mites. Endoparasites live inside the host, for example Plasmodium (the malaria parasite), hookworm, Ascaris (roundworm), the tapeworm and the liver fluke.",
        "Parasites have adaptations. Organs of attachment such as hooks and suckers hold them in place: the tapeworm has four suckers on its scolex, supported by hooks, that fasten it to the wall of the small intestine. Its long, ribbon-like body is made of proglottids, which give a large surface area for absorbing digested food. Parasites often have a simple body, because they do not have to search for food. Some resist digestion, many produce large numbers of eggs, and some use an intermediate host, such as the mosquito for Plasmodium.",
        "Some plants are parasites too. Dodder (Cassytha filiformis) and mistletoe send special organs called haustoria into the vascular bundles of their host to draw off water and food.",
      ],
    },
    {
      heading: "6. Carnivorous plants",
      paragraphs: [
        "Pitcher plants and similar species have green leaves and make their own food by photosynthesis. They grow in soils poor in nitrogen. Their leaves are modified to attract, trap and digest insects, which supply nitrogen. Enzymes digest the insect, and the soluble nitrogen compounds are absorbed.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Holozoic nutrition is digestion inside the body (intracellular and in a digestive tract). Saprophytic nutrition is digestion outside the body. This contrast is a favourite exam question.",
    "A predator kills its prey; a scavenger eats dead animals. A vulture is a scavenger, not a predator.",
    "Symbiosis is the general term for two organisms living together. When both partners benefit, it is mutualism. In parasitism, one partner is harmed, so it is not symbiosis in the beneficial sense.",
    "Herbivores cannot digest cellulose themselves. Bacteria in the caecum and colon do it for them. Credit the bacteria, not the animal, when asked how cellulose is digested.",
    "Plasmodium, the malaria parasite, is a protist (a protozoan), not a worm, even though it is an endoparasite like the tapeworm and roundworm.",
    "Ectoparasites live on the surface of the host (lice, ticks, fleas); endoparasites live inside it (tapeworm, roundworm, Plasmodium).",
    "Carnivorous plants still make their food by photosynthesis. They trap insects for nitrogen, not for energy or carbon. Call them autotrophs that supplement their nitrogen.",
  ],
  summary: "Heterotrophs obtain food from other organisms or dead matter. Holozoic animals take in, digest and absorb solid food inside the body, and omnivores, herbivores and carnivores differ in what they eat. Saprophytes digest dead matter outside their bodies. Symbiosis is a partnership in which both partners benefit, as in lichen. Parasites live on or in a host and harm it, and they have hooks, suckers and other adaptations to survive.",
  quick: {
    intro: "The four types of heterotrophic nutrition, the human digestive stages, and the parasites and partners examiners ask about.",
    blocks: [
      {
        heading: "1. Four types",
        points: [
          "Holozoic: solid food, eaten and digested inside the body (animals).",
          "Saprophytic: dead and decaying matter, digested outside the body (fungi, bacteria).",
          "Symbiotic: both partners benefit (lichen: fungus and alga).",
          "Parasitic: one benefits, the host is harmed (tapeworm, Plasmodium).",
        ],
        memory: "H-S-S-P: Holozoic, Saprophytic, Symbiotic, Parasitic.",
      },
      {
        heading: "2. Holozoic feeders",
        points: [
          "Herbivore: plants (cow, sheep, horse).",
          "Carnivore: flesh (leopard, dog). Predator kills prey; scavenger eats dead animals.",
          "Omnivore: plants and animals (man).",
        ],
      },
      {
        heading: "3. Human digestion",
        points: [
          "Ingestion: taking food into the mouth.",
          "Digestion: breaking food into small soluble molecules.",
          "Absorption: moving the molecules into the blood or lymph.",
          "Assimilation: using them to build and repair.",
          "Egestion: removing undigested material as faeces.",
        ],
        memory: "I-D-A-A-E: Ingest, Digest, Absorb, Assimilate, Egest.",
      },
      {
        heading: "4. Parasites and partners",
        points: [
          "Ectoparasites (surface): lice, ticks, fleas, bed-bugs, mites.",
          "Endoparasites (inside): Plasmodium, hookworm, Ascaris, tapeworm, liver fluke.",
          "Tapeworm: four suckers and hooks on the scolex; proglottids for absorption.",
          "Plant parasites: dodder and mistletoe, using haustoria.",
          "Cellulose digestion: bacteria in the caecum and colon of herbivores.",
        ],
        warning: "Plasmodium is a protozoan, not a worm.",
      },
    ],
    likely: [
      { question: "Define heterotrophic nutrition.", answer: "The obtaining of food from other living things or from dead matter, because the organism cannot make its own food." },
      { question: "Name the four types of heterotrophic nutrition.", answer: "Holozoic, saprophytic, symbiotic and parasitic nutrition." },
      { question: "What is the difference between a herbivore, a carnivore and an omnivore?", answer: "Herbivores eat only plants; carnivores eat only flesh; omnivores eat both plants and animals." },
      { question: "What is the difference between a predator and a scavenger?", answer: "A predator kills and eats living prey; a scavenger feeds on dead animals." },
      { question: "Why is saprophytic digestion called extracellular?", answer: "Enzymes are released onto the food outside the organism’s body, and the digested products are then absorbed." },
      { question: "Give an example of symbiosis and state what each partner gets.", answer: "Lichen: the fungus gets food made by photosynthesis from the alga; the alga gets moisture, mineral salts and support from the fungus." },
      { question: "What is the difference between an ectoparasite and an endoparasite?", answer: "An ectoparasite lives on the surface of its host (e.g. lice, ticks); an endoparasite lives inside its host (e.g. tapeworm, Plasmodium)." },
      { question: "State two adaptations of the tapeworm for parasitism.", answer: "Any two of: four suckers and hooks on the scolex for attachment; proglottids giving a large surface area for absorption; production of large numbers of eggs." },
      { question: "State the five stages of holozoic nutrition in man.", answer: "Ingestion, digestion, absorption, assimilation and egestion." },
      { question: "What is a haustorium?", answer: "A special sucker-like organ that dodder and mistletoe send into the vascular bundles of their host to take water and food." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Heterotrophic nutrition means", options: ["making food from sunlight", "making food from carbon dioxide and water only", "fixing nitrogen from the air", "obtaining food from other organisms or dead matter"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "Which of these is a herbivore?", options: ["Lion", "Dog", "Cow", "Vulture"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "Man is an example of a", options: ["herbivore", "carnivore", "saprophyte", "omnivore"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "A vulture that feeds on dead animals is a", options: ["scavenger", "predator", "parasite", "saprophyte"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "Saprophytes digest their food", options: ["inside their bodies", "with bacteria in the gut", "in the stomach", "outside their bodies by secreting enzymes"], answer: "D" },
    { number: 6, kind: "Objective", prompt: "Mushrooms and bread moulds are examples of", options: ["parasites", "saprophytes", "autotrophs", "herbivores"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Lichen is an example of", options: ["parasitism", "symbiosis", "saprophytism", "carnivorous nutrition"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Bacteria in the caecum of herbivores help to digest", options: ["starch", "protein", "fat", "cellulose"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "An ectoparasite is one that", options: ["lives on the surface of the host", "lives inside the host", "is a plant parasite only", "digests food inside a plant"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "Which of these is an endoparasite?", options: ["Tick", "Tapeworm", "Flea", "Bed-bug"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "In parasitism, the organism that is harmed is the", options: ["parasite", "saprophyte", "host", "symbiont"], answer: "C" },
    { number: 12, kind: "Objective", prompt: "In which order do the stages of holozoic nutrition in man occur?", options: ["digestion, ingestion, absorption, egestion", "egestion, ingestion, digestion, absorption", "absorption, egestion, ingestion, digestion", "ingestion, digestion, absorption, assimilation, egestion"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Dodder and mistletoe absorb food from their host using", options: ["roots", "tendrils", "haustoria", "spines"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "Carnivorous plants trap insects mainly to obtain", options: ["carbon", "water", "nitrogen", "energy"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Define heterotrophic nutrition and name its four types.", answer: "Heterotrophic nutrition is obtaining food from other living things or from dead matter because the organism cannot make its own food. The four types are holozoic, saprophytic, symbiotic and parasitic." },
    { number: 16, kind: "Theory", prompt: "Differentiate between holozoic and saprophytic nutrition.", answer: "In holozoic nutrition, the organism takes in solid food, digests it inside its body and absorbs it (for example, in animals). In saprophytic nutrition, the organism feeds on dead and decaying matter, secreting enzymes onto it and digesting it outside its body (for example, fungi)." },
    { number: 17, kind: "Theory", prompt: "Explain the terms predator, scavenger and omnivore, giving one example of each.", answer: "A predator is a carnivore that hunts and kills living prey, for example a leopard. A scavenger is a carnivore that feeds on dead animals, for example a vulture. An omnivore eats both plants and animals, for example man." },
    { number: 18, kind: "Theory", prompt: "Describe the adaptations of the tapeworm to parasitism.", answer: "The tapeworm has four suckers and hooks on its scolex that attach it to the wall of the host’s small intestine. Its long, ribbon-like body made of proglottids gives a large surface area for absorbing digested food. It produces large numbers of eggs, which increases the chance of infecting new hosts." },
    { number: 19, kind: "Theory", prompt: "Explain why lichen is an example of symbiosis, and state what each partner gets from the association.", answer: "Lichen is a fungus and an alga living together, and both benefit, so it is a symbiotic association. The fungus gets food made by the alga through photosynthesis. The alga gets moisture, mineral salts and support from the fungus." },
    { number: 20, kind: "Theory", prompt: "Describe the stages of holozoic nutrition in man.", answer: "Ingestion takes food into the mouth. Digestion breaks food into small soluble molecules by mechanical and chemical action. Absorption moves these molecules into the blood or lymph. Assimilation uses them to build and repair body tissues. Egestion removes undigested material from the body as faeces." },
  ] as PracticeQuestion[],
};
