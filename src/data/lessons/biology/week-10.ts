import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek10: Lesson = {
  id: "ss1-first-biology-week-10",
  week: "Week 10",
  title: "Animal nutrition: heterotrophic nutrition",
  subtitle: "See how animals, fungi and other organisms that cannot make their own food obtain it: by eating, by absorbing, by living on others, and by sharing.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define heterotrophic nutrition and name its four types.",
    "Describe the stages of holozoic nutrition and the feeding of herbivores, carnivores and omnivores.",
    "Describe how food is digested and absorbed in the human alimentary canal.",
    "Describe saprophytic, parasitic and symbiotic nutrition with examples.",
    "Explain how carnivorous plants are adapted to trapping insects.",
  ],
  sections: [
    {
      heading: "1. What is heterotrophic nutrition?",
      paragraphs: [
        "Heterotrophic nutrition is the kind of feeding in which an organism obtains ready-made organic food from other living or dead organisms. Animals, fungi, most bacteria and some plants are heterotrophs. They cannot make their own food from carbon dioxide and water, so they depend directly or indirectly on green plants.",
        "There are four main types. In holozoic nutrition the organism takes in solid or liquid food and digests it inside its body, as most animals do. In saprophytic nutrition, an organism feeds on dead organic matter. In parasitic nutrition, an organism lives on or in another living organism (the host) and feeds at its expense. In symbiotic nutrition, two organisms live together and at least one of them gains from the partnership.",
      ],
    },
    {
      heading: "2. Holozoic nutrition",
      paragraphs: [
        "Holozoic nutrition has five stages. Ingestion: taking food into the body. Digestion: breaking large, insoluble food molecules into small, soluble ones by enzymes. Absorption: movement of the soluble products into the blood. Assimilation: use of the absorbed food by the cells for energy, growth and repair. Egestion: removal of undigested material as faeces.",
        "Animals feed in different ways. Herbivores such as goats and cattle eat plants; they have broad, ridged premolars and molars for grinding, and incisors (and in ruminants a horny pad instead of upper incisors) for cutting, and a long gut with bacteria that digest cellulose. Carnivores such as lions and dogs eat flesh; they have sharp pointed canines for stabbing and gripping and carnassial teeth for shearing meat, and a shorter gut. Omnivores such as humans and pigs eat both plant and animal food and have all kinds of teeth. Fluid feeders such as mosquitoes and butterflies have mouthparts adapted for sucking blood or nectar. Scavengers such as vultures feed on dead animals.",
        "Human teeth: incisors (chisel-shaped) cut, canines (pointed) tear, premolars and molars (broad with ridges) crush and grind. The adult dental formula for one side of the jaw is I 2/2, C 1/1, PM 2/2, M 3/3, giving 32 teeth in all.",
      ],
      points: [
        "Ingestion → digestion → absorption → assimilation → egestion.",
        "Herbivore: grinding teeth and long gut. Carnivore: sharp canines, shorter gut. Omnivore: all types of teeth.",
      ],
    },
    {
      heading: "3. Digestion in the human alimentary canal",
      paragraphs: [
        "In the mouth, the teeth chew food into small pieces and saliva moistens it. Saliva contains the enzyme salivary amylase, which starts to break down starch into maltose. The tongue rolls the food into a ball (bolus), which is swallowed, and in the oesophagus it is pushed down by waves of muscle contraction called peristalsis.",
        "In the stomach, muscular walls churn the food. The glands of the stomach wall release hydrochloric acid, which kills bacteria and gives the right acidity, and the enzyme pepsin, which begins to digest proteins into shorter chains (peptides). The liquid food, called chyme, passes in small amounts into the duodenum, the first part of the small intestine.",
        "In the duodenum, bile from the liver (stored in the gall bladder) breaks fats into tiny droplets (emulsification) and neutralises the acid. Pancreatic juice, from the pancreas, contains amylase (starch to maltose), proteases such as trypsin (proteins to peptides) and lipase (fats to fatty acids and glycerol). The small intestine wall also makes enzymes that complete digestion: maltose to glucose, peptides to amino acids.",
        "The final products of digestion are glucose, amino acids, and fatty acids and glycerol. They are absorbed in the ileum, the last part of the small intestine, which is long and has finger-like villi that give it a large surface area, a thin wall and a rich blood supply. Glucose and amino acids pass into blood capillaries and go to the liver in the hepatic portal vein; fatty acids and glycerol enter the lacteal. The large intestine absorbs most of the remaining water, and the undigested material is stored in the rectum and egested through the anus.",
      ],
      diagram: "Draw the alimentary canal in order: mouth, oesophagus, stomach, small intestine (duodenum and ileum), large intestine, rectum, anus. Add the liver, gall bladder and pancreas beside the duodenum, and label the enzyme or secretion produced at each place.",
    },
    {
      heading: "4. Saprophytic nutrition",
      paragraphs: [
        "Saprophytes feed on dead organic matter such as rotting wood, dead leaves, bread and decaying food. Mucor, Rhizopus (bread mould), mushrooms and many bacteria are saprophytes. They release digestive enzymes onto the food (extracellular digestion), and then absorb the soluble products into their bodies.",
        "Saprophytes are useful as decomposers: they decay dead plants and animals and recycle carbon and nitrogen. They are used to make bread, cheese and antibiotics. They are harmful when they spoil food, rot timber and damage leather and cloth.",
      ],
    },
    {
      heading: "5. Parasitic nutrition",
      paragraphs: [
        "A parasite lives on or in another organism, the host, and feeds on it, harming it. Ectoparasites live on the outside: ticks, fleas, lice and the mistletoe that grows on trees. Endoparasites live inside the host: the tapeworm (Taenia) and the roundworm (Ascaris) in the intestines, and Plasmodium, the malaria parasite, in the blood and liver. Among plants, Cuscuta (dodder) and Striga (witchweed, a serious weed of maize and sorghum fields in Nigeria) take their food from other plants.",
        "Parasites are adapted to their way of life. The tapeworm has hooks and suckers to hold on to the gut wall, a thick cuticle that resists digestive enzymes, no gut of its own (it absorbs digested food from the host) and a very high reproductive output. A parasite usually weakens its host but does not kill it quickly, because it depends on it.",
      ],
    },
    {
      heading: "6. Symbiotic nutrition",
      paragraphs: [
        "Symbiosis is a close relationship between two different organisms. In mutualism, both partners benefit. Examples: nitrogen-fixing Rhizobium bacteria in the root nodules of legumes (the bacteria get food and shelter and the plant gets nitrogen compounds); a lichen, in which an alga makes food by photosynthesis and a fungus gives support and water; and bacteria in the gut of cattle and goats that digest cellulose, while the animal provides food and a home.",
        "In commensalism, one partner benefits and the other is neither helped nor harmed. For example, an orchid growing on the branch of a tree obtains light and support from it without harming it, and the cattle egret feeds on insects disturbed by grazing cattle.",
      ],
    },
    {
      heading: "7. Carnivorous plants",
      paragraphs: [
        "Some green plants live in soils that lack nitrogen, so in addition to photosynthesis they trap and digest small animals, usually insects, to get nitrogen compounds. The pitcher plant (Nepenthes) has leaves shaped like a jug with a slippery rim; insects fall in and drown in the liquid, where enzymes digest them. The sundew (Drosera) has leaves covered with sticky hairs that trap insects. The Venus flytrap (Dionaea) has leaf halves that snap shut, and the bladderwort (Utricularia) traps tiny water animals in bladders. Since these plants make their own food as well, they are partly autotrophic.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Holozoic nutrition has five stages in order: ingestion, digestion, absorption, assimilation, egestion.",
    "Egestion removes undigested food. It is not excretion, which removes metabolic wastes.",
    "Starch digestion starts in the mouth. Protein digestion starts in the stomach. Fat digestion begins in the duodenum with bile and lipase.",
    "Bile is not an enzyme. It emulsifies fat; lipase digests fat.",
    "Most absorption of digested food takes place in the ileum, which has villi. The large intestine mainly absorbs water.",
    "A parasite harms its host; a commensal does not. In mutualism both partners gain.",
    "A lichen is a mutualistic partnership between an alga and a fungus.",
    "Carnivorous plants still photosynthesise. They trap insects for nitrogen compounds, not for energy.",
  ],
  summary:
    "Heterotrophs obtain organic food from other organisms. Holozoic feeders ingest, digest, absorb, assimilate and egest, with teeth and guts suited to a plant, flesh or mixed diet. In the human gut, enzymes in the mouth, stomach, duodenum and small intestine digest starch, protein and fat to glucose, amino acids, fatty acids and glycerol, which are absorbed in the ileum. Saprophytes digest dead matter outside their bodies, parasites live at the expense of a host, and symbiotic partners live together, either both gaining (mutualism) or one gaining without harming the other (commensalism). Carnivorous plants supplement their nitrogen by trapping animals.",
  quick: {
    intro: "Week 10 revision. Learn the four types with examples, and the gut with its enzymes.",
    blocks: [
      {
        heading: "1. Four types",
        points: [
          "Holozoic: solid food taken in and digested inside (most animals).",
          "Saprophytic: dead organic matter (Mucor, mushrooms).",
          "Parasitic: lives on or in a host and harms it (tapeworm, Plasmodium, ticks, Striga).",
          "Symbiotic: close partnership (Rhizobium and legumes, lichens).",
        ],
      },
      {
        heading: "2. Holozoic stages and feeders",
        points: [
          "Ingestion → digestion → absorption → assimilation → egestion.",
          "Herbivores: grinding teeth, long gut. Carnivores: sharp canines, short gut. Omnivores: all teeth.",
          "Human dental formula: I 2/2, C 1/1, PM 2/2, M 3/3 = 32.",
        ],
      },
      {
        heading: "3. Human digestion",
        points: [
          "Mouth: salivary amylase (starch → maltose).",
          "Stomach: HCl, pepsin (protein → peptides).",
          "Duodenum: bile (emulsifies fat), pancreatic amylase, trypsin, lipase.",
          "Ileum: final digestion and absorption through villi.",
          "Large intestine: absorbs water. Rectum: stores faeces.",
        ],
        memory: "End products: glucose, amino acids, fatty acids and glycerol.",
      },
      {
        heading: "4. Parasites and partners",
        points: [
          "Ectoparasites: tick, flea, louse, mistletoe. Endoparasites: tapeworm, roundworm, Plasmodium.",
          "Tapeworm adaptations: hooks, suckers, thick cuticle, no gut, many eggs.",
          "Mutualism: both gain (lichen, Rhizobium). Commensalism: one gains, the other unaffected (orchid on a tree).",
        ],
      },
      {
        heading: "5. Carnivorous plants",
        points: [
          "Pitcher plant, sundew, Venus flytrap, bladderwort.",
          "Grow in nitrogen-poor soil; trap insects for nitrogen compounds; still photosynthesise.",
        ],
      },
    ],
    likely: [
      { question: "Define heterotrophic nutrition and name its types.", answer: "Feeding on ready-made organic food from other organisms. Types: holozoic, saprophytic, parasitic and symbiotic." },
      { question: "List the stages of holozoic nutrition.", answer: "Ingestion, digestion, absorption, assimilation and egestion." },
      { question: "State the functions of incisors, canines and molars.", answer: "Incisors cut; canines tear; molars (and premolars) crush and grind." },
      { question: "Where does the digestion of starch, protein and fat begin?", answer: "Starch in the mouth; protein in the stomach; fat in the duodenum." },
      { question: "What are the end products of digestion of carbohydrates, proteins and fats?", answer: "Glucose; amino acids; fatty acids and glycerol." },
      { question: "State the role of bile.", answer: "It emulsifies fats into small droplets and neutralises the stomach acid. It contains no enzyme." },
      { question: "Describe how the ileum is adapted for absorption.", answer: "It is long, has villi that give a large surface area, a thin wall and a rich blood supply." },
      { question: "What is a saprophyte? Give two examples.", answer: "An organism that feeds on dead organic matter, e.g. Mucor and mushrooms." },
      { question: "Differentiate between an ectoparasite and an endoparasite.", answer: "An ectoparasite lives on the outside of its host (tick); an endoparasite lives inside (tapeworm)." },
      { question: "Differentiate between mutualism and commensalism.", answer: "In mutualism both organisms benefit; in commensalism one benefits and the other is unaffected." },
      { question: "Why do carnivorous plants trap insects?", answer: "To obtain nitrogen compounds that are scarce in the soil where they grow." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Organisms that depend on other organisms for ready-made food are", options: ["autotrophs", "heterotrophs", "producers", "chemosynthetic bacteria"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "The correct order of the stages of holozoic nutrition is", options: ["digestion, ingestion, absorption, assimilation, egestion", "ingestion, digestion, absorption, assimilation, egestion", "ingestion, absorption, digestion, egestion, assimilation", "assimilation, digestion, ingestion, absorption, egestion"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The teeth used for tearing flesh are the", options: ["incisors", "canines", "molars", "premolars"], answer: "B" },
    { number: 4, kind: "Objective", prompt: "The human dental formula for one side of the jaw is I 2/2, C 1/1, PM 2/2, M 3/3. The total number of teeth is", options: ["20", "28", "32", "36"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "The digestion of starch begins in the", options: ["stomach", "mouth", "duodenum", "ileum"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "The enzyme in the stomach that begins the digestion of protein is", options: ["amylase", "pepsin", "lipase", "maltase"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "Bile helps in the digestion of", options: ["starch", "protein", "fats", "vitamins"], answer: "C" },
    { number: 8, kind: "Objective", prompt: "The end products of protein digestion are", options: ["glucose", "amino acids", "fatty acids", "glycerol"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Most of the absorption of digested food takes place in the", options: ["stomach", "ileum", "large intestine", "oesophagus"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The large intestine mainly absorbs", options: ["amino acids", "fatty acids", "water", "glucose"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "A tapeworm in the intestine of a human is an example of", options: ["an ectoparasite", "an endoparasite", "a saprophyte", "a commensal"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "A lichen is a partnership between an alga and a fungus in which both benefit. This is", options: ["parasitism", "commensalism", "mutualism", "saprophytism"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "Mucor feeds on dead bread. It is therefore a", options: ["parasite", "saprophyte", "holozoic feeder", "producer"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The pitcher plant traps insects mainly to obtain", options: ["carbon dioxide", "water", "nitrogen compounds", "light"], answer: "C" },
    { number: 15, kind: "Theory", prompt: "Define heterotrophic nutrition and describe its four types, with one example each.", answer: "Heterotrophic nutrition is feeding on ready-made organic food from other organisms. Holozoic: food is ingested and digested inside (goat). Saprophytic: feeding on dead organic matter (Mucor). Parasitic: living on or in a host and harming it (tapeworm). Symbiotic: a close partnership between two organisms (Rhizobium and legumes)." },
    { number: 16, kind: "Theory", prompt: "Describe the five stages of holozoic nutrition.", answer: "Ingestion: taking food in. Digestion: enzymes break large insoluble molecules into small soluble ones. Absorption: the soluble products pass into the blood. Assimilation: cells use the food for energy, growth and repair. Egestion: undigested material is removed as faeces." },
    { number: 17, kind: "Theory", prompt: "Compare the teeth and guts of a herbivore and a carnivore.", answer: "Herbivores have broad, ridged premolars and molars for grinding plant material and a long gut with bacteria that digest cellulose. Carnivores have sharp pointed canines and carnassial teeth for tearing and cutting flesh and a shorter gut because meat is easier to digest." },
    { number: 18, kind: "Theory", prompt: "Describe where, and by what, the digestion of starch, protein and fat takes place in the human alimentary canal.", answer: "Starch: salivary amylase in the mouth, then pancreatic amylase in the duodenum, and maltase in the small intestine. Protein: pepsin in the stomach, trypsin in the duodenum, and peptidases in the small intestine. Fat: bile emulsifies it and lipase digests it in the duodenum and small intestine." },
    { number: 19, kind: "Theory", prompt: "State four ways in which the ileum is adapted for absorption of food.", answer: "It is long; the inner wall is folded into many villi that give a large surface area; the wall is thin (one cell thick), so food passes quickly; each villus has a rich supply of blood capillaries and a lacteal." },
    { number: 20, kind: "Theory", prompt: "Explain how a tapeworm is adapted to its way of life as a parasite, and distinguish mutualism from commensalism.", answer: "A tapeworm has hooks and suckers to attach to the gut wall, a thick cuticle that resists digestion, no gut because it absorbs digested food, and very high egg output. In mutualism both partners benefit (lichen); in commensalism one benefits and the other is unaffected (orchid on a tree)." },
  ] as PracticeQuestion[],
};
