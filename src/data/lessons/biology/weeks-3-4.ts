import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeeks34: Lesson = {
  id: "ss1-first-biology-weeks-3-4",
  week: "Weeks 03–04",
  title: "Classification of living things",
  subtitle: "See how millions of kinds of organisms are sorted into groups, named in a way that every scientist understands, and placed in five kingdoms.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define classification and taxonomy and give reasons for classifying organisms.",
    "Arrange the levels of the taxonomic hierarchy from the broadest to the narrowest and classify an organism through them.",
    "Explain binomial nomenclature and write scientific names correctly.",
    "Name the five kingdoms and state the main features and examples of each.",
    "Describe the major groups of plants and of animals.",
    "Distinguish monocotyledons from dicotyledons.",
  ],
  sections: [
    {
      heading: "1. Why classify?",
      paragraphs: [
        "More than a million kinds of living things are known, and new ones are still being found. Imagine a market with every item thrown together in one heap. It would be impossible to find anything. Classification is the arrangement of organisms into groups according to the features they share, and taxonomy is the science of classification.",
        "Classification makes the study of so many organisms manageable, helps us identify an unknown organism, shows how closely related different organisms are, gives each organism a name that scientists everywhere can use, and helps us to predict the features of a newly found organism from the group to which it belongs. Classification uses structure, body organisation, method of feeding, reproduction and, today, genetic information.",
      ],
    },
    {
      heading: "2. The taxonomic hierarchy",
      paragraphs: [
        "Organisms are placed in groups, and groups are placed in bigger groups, like boxes inside boxes. From the broadest group to the narrowest, the main levels (taxa) are: kingdom, phylum (called division in plants), class, order, family, genus and species. Organisms in the same kingdom share only a few general features, while organisms in the same species share nearly all of them.",
        "A species is a group of organisms that can breed with one another and produce fertile offspring. A mule, produced by a donkey and a horse, is sterile, which is why donkeys and horses belong to different species. The species is the basic unit of classification.",
        "Example: a human is in kingdom Animalia, phylum Chordata, class Mammalia, order Primates, family Hominidae, genus Homo, species sapiens. A maize plant is in kingdom Plantae, division Angiospermophyta, class Monocotyledonae, order Poales, family Poaceae, genus Zea, species mays.",
      ],
      points: [
        "Kingdom → Phylum (Division) → Class → Order → Family → Genus → Species.",
        "Broadest = kingdom; narrowest = species.",
        "Species: organisms that interbreed to produce fertile offspring.",
      ],
    },
    {
      heading: "3. Naming organisms: binomial nomenclature",
      paragraphs: [
        "Common names cause confusion. The same plant may have a different name in every Nigerian language and in every country, and the same name can be used for different organisms. In the 18th century the Swedish scientist Carolus Linnaeus introduced a system in which every organism is given a two-part Latin name. It is called binomial nomenclature (‘two-name naming’).",
        "The first part is the genus and the second is the species. Rules: the genus name begins with a capital letter; the species name begins with a small letter; the whole name is written in italics when printed, or each word is underlined when handwritten. Examples: human, Homo sapiens; maize, Zea mays; mango, Mangifera indica; cassava, Manihot esculenta; domestic cat, Felis catus; housefly, Musca domestica. After the name is given in full once, the genus can be shortened to its first letter: H. sapiens.",
      ],
    },
    {
      heading: "4. The five kingdoms",
      paragraphs: [
        "Most biologists use a system of five kingdoms. Monera contains the prokaryotes: organisms with no true nucleus, such as bacteria and cyanobacteria (blue-green algae). They are microscopic and mostly single-celled, and they reproduce by binary fission.",
        "Protista contains single-celled organisms with a true nucleus (eukaryotes). Some are plant-like (Chlamydomonas, Euglena), and some are animal-like (Amoeba, Paramecium, and the malaria parasite Plasmodium). Fungi contains organisms with no chlorophyll that feed by absorbing food from dead or living matter, with walls of chitin: yeast, Mucor, Rhizopus (bread mould) and mushrooms. Most are made of threads called hyphae.",
        "Plantae contains multicellular organisms with cellulose cell walls and chlorophyll, which make their own food by photosynthesis and do not move from place to place. Animalia contains multicellular organisms whose cells have no walls, which feed on other organisms (heterotrophic), and most of which can move.",
      ],
      diagram: "Draw a table with five columns headed Monera, Protista, Fungi, Plantae and Animalia. Add rows for ‘cell type’ (prokaryote or eukaryote), ‘cells’ (one or many), ‘feeding’ and ‘examples’, and fill them in.",
    },
    {
      heading: "5. Groups within the plant and animal kingdoms",
      paragraphs: [
        "Plants are divided into groups. Algae and their relatives (thallophytes) have no true roots, stems or leaves. Bryophytes (mosses and liverworts) are small, live in damp places and have no vascular (transport) tissue. Pteridophytes (ferns) have roots, stems and leaves and vascular tissue, but they reproduce by spores, not seeds. Spermatophytes are the seed-bearing plants. They are divided into gymnosperms, whose seeds are not enclosed in a fruit (for example pine and other conifers), and angiosperms, the flowering plants, whose seeds are enclosed in a fruit.",
        "Angiosperms are further divided into monocotyledons (monocots) and dicotyledons (dicots). A monocot such as maize, rice or grass has one seed leaf (cotyledon), parallel-veined leaves, a fibrous root system and scattered vascular bundles. A dicot such as beans, mango or hibiscus has two cotyledons, net-veined leaves, a tap root system and vascular bundles arranged in a ring.",
        "Animals are first divided into invertebrates (no backbone) and vertebrates (with a backbone). Arthropods, the largest group of invertebrates, have jointed legs and a hard outer skeleton: insects (six legs, three body parts), arachnids (eight legs, two body parts), crustaceans and myriapods. The five classes of vertebrates are fishes, amphibians, reptiles, birds and mammals. Birds have feathers, and mammals have hair and feed their young on milk.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The seven levels run from kingdom (broadest) to species (narrowest). Reversing them is the commonest loss of marks.",
    "Scientific names: Genus starts with a capital; species with a small letter; the pair is italic or underlined. ‘homo sapiens’ and ‘Homo Sapiens’ are both wrong.",
    "A species is defined by producing FERTILE offspring. Mules exist, but they are sterile.",
    "Bacteria belong to Monera (no true nucleus). Amoeba and Paramecium belong to Protista (have a nucleus).",
    "Fungi are not plants. They have no chlorophyll, have chitin walls and absorb their food.",
    "Ferns reproduce by spores, not seeds, so they are not spermatophytes.",
    "Gymnosperm seeds are ‘naked’ (not in a fruit); angiosperm seeds are enclosed in a fruit.",
    "Monocots: one cotyledon, parallel veins, fibrous roots. Dicots: two cotyledons, net veins, tap root. Learn both lists together.",
  ],
  summary:
    "Classification arranges living things into groups of related organisms, and taxonomy is its science. The hierarchy runs kingdom, phylum, class, order, family, genus, species, with the species as the basic unit. Linnaeus introduced binomial nomenclature, in which each organism has a genus name beginning with a capital letter and a species name in small letters. The five kingdoms are Monera, Protista, Fungi, Plantae and Animalia. Plants include algae, bryophytes, pteridophytes, gymnosperms and angiosperms (monocots and dicots), while animals divide into invertebrates, including arthropods, and the vertebrate classes.",
  quick: {
    intro: "Revision sheet for Weeks 3 and 4. Know the hierarchy, the naming rules and the features of each kingdom.",
    blocks: [
      {
        heading: "1. The hierarchy",
        points: [
          "Kingdom, Phylum (Division), Class, Order, Family, Genus, Species.",
          "Species: interbreed and produce fertile offspring.",
          "Taxonomy: the science of classification.",
        ],
        memory: "Kind Pupils Can Often Find Good Spellings: Kingdom, Phylum, Class, Order, Family, Genus, Species.",
      },
      {
        heading: "2. Scientific names",
        points: [
          "Two-part Latin name introduced by Linnaeus: Genus species.",
          "Genus with a capital, species with a small letter; italics or underline.",
          "Homo sapiens; Zea mays; Mangifera indica; Musca domestica.",
        ],
      },
      {
        heading: "3. Five kingdoms",
        points: [
          "Monera: prokaryotes (no true nucleus), bacteria, cyanobacteria.",
          "Protista: single-celled eukaryotes: Amoeba, Paramecium, Euglena, Chlamydomonas.",
          "Fungi: no chlorophyll, chitin walls, absorb food: yeast, Mucor, mushroom.",
          "Plantae: multicellular, chlorophyll, cellulose walls, photosynthesis.",
          "Animalia: multicellular, no cell walls, feed on other organisms, mostly mobile.",
        ],
      },
      {
        heading: "4. Plant groups",
        points: [
          "Algae (thallophytes): no true roots, stems or leaves.",
          "Bryophytes: mosses and liverworts; no vascular tissue.",
          "Pteridophytes: ferns; vascular; spores.",
          "Gymnosperms: naked seeds (conifers). Angiosperms: seeds in fruits (flowering plants).",
          "Monocots: 1 cotyledon, parallel veins, fibrous roots. Dicots: 2 cotyledons, net veins, tap root.",
        ],
      },
      {
        heading: "5. Animal groups",
        points: [
          "Invertebrates (no backbone) and vertebrates (backbone).",
          "Insects: 6 legs, 3 body parts. Arachnids: 8 legs, 2 body parts.",
          "Vertebrates: fishes, amphibians, reptiles, birds, mammals.",
        ],
      },
    ],
    likely: [
      { question: "Define classification and taxonomy.", answer: "Classification is the arrangement of organisms into groups according to shared features. Taxonomy is the science of classification." },
      { question: "State three reasons for classifying organisms.", answer: "To make the study of organisms easier; to show relationships between organisms; to help in identification; to give organisms universal names." },
      { question: "List the taxonomic levels from broadest to narrowest.", answer: "Kingdom, phylum (division), class, order, family, genus, species." },
      { question: "Define a species.", answer: "A group of organisms that can interbreed to produce fertile offspring." },
      { question: "Who introduced binomial nomenclature, and what are its rules?", answer: "Carolus Linnaeus. Each organism has a genus name (capital letter) and a species name (small letter), written in italics or underlined." },
      { question: "Write the scientific names of man, maize and the housefly.", answer: "Homo sapiens, Zea mays, Musca domestica." },
      { question: "Name the five kingdoms.", answer: "Monera, Protista, Fungi, Plantae and Animalia." },
      { question: "Give two features of fungi.", answer: "No chlorophyll and chitin cell walls; they feed by absorbing food (also: made of hyphae)." },
      { question: "Name the main groups of plants.", answer: "Algae (thallophytes), bryophytes, pteridophytes, gymnosperms and angiosperms." },
      { question: "State three differences between monocots and dicots.", answer: "Monocots: one cotyledon, parallel veins, fibrous roots. Dicots: two cotyledons, net veins, tap root." },
      { question: "What are the five classes of vertebrates?", answer: "Fishes, amphibians, reptiles, birds and mammals." },
      { question: "What is the difference between a gymnosperm and an angiosperm?", answer: "Gymnosperms have naked seeds not enclosed in a fruit; angiosperms have seeds enclosed in a fruit." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The science of classification is called", options: ["ecology", "taxonomy", "genetics", "physiology"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "The scientist who introduced the binomial system of naming organisms is", options: ["Darwin", "Mendel", "Linnaeus", "Pasteur"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "The broadest group in the taxonomic hierarchy is the", options: ["species", "genus", "kingdom", "family"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "Which order runs from the broadest to the narrowest taxon?", options: ["Genus, family, order, class", "Class, order, family, genus", "Species, genus, family, order", "Phylum, kingdom, class, order"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "Which is the correct way to write the scientific name of the mango?", options: ["mangifera Indica", "Mangifera indica", "Mangifera Indica", "mangifera indica"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "A species is a group of organisms that", options: ["look exactly alike", "live in the same place", "interbreed to produce fertile offspring", "feed on the same food"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "Organisms without a true nucleus, such as bacteria, belong to the kingdom", options: ["Protista", "Monera", "Fungi", "Plantae"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "Amoeba belongs to the kingdom", options: ["Monera", "Protista", "Fungi", "Animalia"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "Yeast and mushrooms belong to the kingdom", options: ["Plantae", "Fungi", "Protista", "Monera"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "Ferns belong to the group", options: ["bryophytes", "pteridophytes", "gymnosperms", "angiosperms"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Plants whose seeds are not enclosed in a fruit are", options: ["angiosperms", "gymnosperms", "bryophytes", "algae"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "A plant with parallel-veined leaves and fibrous roots is most likely a", options: ["monocotyledon", "dicotyledon", "gymnosperm", "moss"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "The vertebrate class whose members have feathers is", options: ["mammals", "reptiles", "birds", "amphibians"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "Insects are arthropods that have", options: ["four pairs of legs", "three pairs of legs", "two pairs of legs", "no legs"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define classification and state four reasons why organisms are classified.", answer: "Classification is the arrangement of organisms into groups on the basis of shared features. Reasons: it makes the study of many organisms easier; it helps in identification; it shows relationships; it gives each organism a universal name; it helps to predict features of newly found organisms." },
    { number: 16, kind: "Theory", prompt: "List the seven taxonomic levels in order from the broadest to the narrowest, and classify the human being through them.", answer: "Kingdom, phylum, class, order, family, genus, species. Human: Animalia, Chordata, Mammalia, Primates, Hominidae, Homo, sapiens." },
    { number: 17, kind: "Theory", prompt: "Explain binomial nomenclature and state the rules for writing a scientific name, giving two examples.", answer: "Every organism has a two-part Latin name, the genus followed by the species, introduced by Linnaeus. The genus begins with a capital letter, the species with a small letter, and the name is italicised or underlined. Examples: Homo sapiens, Zea mays." },
    { number: 18, kind: "Theory", prompt: "Name the five kingdoms and give one distinguishing feature and one example of each.", answer: "Monera: no true nucleus, e.g. bacteria. Protista: single-celled with a nucleus, e.g. Amoeba. Fungi: no chlorophyll, chitin walls, e.g. yeast. Plantae: multicellular with chlorophyll and cellulose walls, e.g. maize. Animalia: multicellular, no cell walls, feed on others, e.g. goat." },
    { number: 19, kind: "Theory", prompt: "Describe the main groups of plants and give an example of each.", answer: "Algae/thallophytes: no true roots, stems or leaves (Spirogyra). Bryophytes: mosses and liverworts, no vascular tissue. Pteridophytes: ferns, vascular, reproduce by spores. Gymnosperms: naked seeds (pine). Angiosperms: flowering plants with seeds in fruits (mango, maize)." },
    { number: 20, kind: "Theory", prompt: "State four differences between monocotyledons and dicotyledons, with an example of each.", answer: "Monocots: one cotyledon, parallel venation, fibrous roots, scattered vascular bundles, e.g. maize. Dicots: two cotyledons, net venation, tap root, vascular bundles in a ring, e.g. beans." },
  ] as PracticeQuestion[],
};
