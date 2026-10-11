import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const bioWeek1: Lesson = {
  id: "ss1-first-biology-week-1",
  week: "Week 01",
  title: "Introduction to Biology",
  subtitle: "Learn what biology studies, how its branches divide the work, how biologists test ideas, and why the subject matters in daily life.",
  source: "Written by Edify for the SS1 First Term Biology scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define biology and explain the Greek words it comes from.",
    "Name the two main branches of biology and some of the other branches.",
    "Arrange the steps of the scientific method in order and describe each step.",
    "Explain a controlled experiment, naming the variable, the control and the constant factors.",
    "Give uses of biology in agriculture, health, industry and the environment, and one way it can be misused.",
  ],
  sections: [
    {
      heading: "1. What is biology?",
      paragraphs: [
        "Biology is the science of living things. The word is built from two Greek words: bios, meaning life, and logos, meaning study. Everything that is alive, from a mango tree and a goat to a bacterium in a drop of pond water, is a subject for biology.",
        "Biology has two main branches. Botany is the study of plants and zoology is the study of animals. Many other branches grow out of them. Microbiology studies organisms too small to see without a microscope; ecology studies how living things relate to each other and to their surroundings; genetics studies how characteristics are passed from parents to offspring; physiology studies how the parts of an organism work; anatomy studies body structure; cytology studies cells; taxonomy studies the naming and grouping of organisms; and entomology studies insects.",
      ],
      diagram: "Draw a large box labelled BIOLOGY. Draw two boxes below it: BOTANY (plants) and ZOOLOGY (animals). Add small branches from them labelled ecology, genetics, microbiology, physiology and taxonomy.",
    },
    {
      heading: "2. How biologists find answers: the scientific method",
      paragraphs: [
        "Biologists do not rely on guesswork. They follow an organised way of working called the scientific method. It begins with an observation of something in nature and ends with the findings being shared so that other people can check them.",
        "Here is an example you could carry out in class. Observation: maize grains left in a dry tin do not sprout, but grains left in damp soil do. Hypothesis: seeds need water in order to germinate. Experiment: place equal numbers of the same kind of maize grain on cotton wool in two identical dishes. Keep one dish dry and keep the other moist, and leave both in the same warm place. Analysis: after five days the grains on moist cotton wool have sprouted and the dry ones have not. Conclusion: the results support the hypothesis. Share: write up the method and results so others can repeat it.",
        "A hypothesis that is repeatedly supported by tests can be developed into a theory, which explains why something happens. A scientific law describes a pattern that is found every time under the same conditions. Notice that the stages form an ordered cycle: if the results do not support the hypothesis, it is changed and tested again.",
      ],
      points: [
        "1. Observation: notice something and ask a question.",
        "2. Hypothesis: a testable explanation.",
        "3. Experiment: a planned test with controls.",
        "4. Analysis: record and study the results.",
        "5. Conclusion: accept, reject or modify the hypothesis.",
        "6. Communication: share the results so they can be checked.",
      ],
    },
    {
      heading: "3. Controlled experiments",
      paragraphs: [
        "For an experiment to be fair, only one factor is changed on purpose, and everything else is kept the same. The factor that is changed is the variable. In the maize experiment the variable is the amount of water (none or enough). The factors kept constant are the type and number of grains, the dishes, the cotton wool, the temperature and the time.",
        "The control is the set-up that shows what happens when the variable is not changed, or that serves as the standard for comparison. In our experiment, the moist dish is the control: it has everything the seeds normally need. The dry dish is the test. Comparing the two shows the effect of water alone.",
        "If two factors were changed at once, for example if the dry dish were also placed in a cold room, you could not tell which factor caused the result. A good experiment is also repeated to check that the result was not a chance event.",
      ],
      points: [
        "Variable: the one factor deliberately changed.",
        "Constant factors: everything else, kept the same.",
        "Control: the standard set-up used for comparison.",
        "Repeat the experiment to make the result reliable.",
      ],
    },
    {
      heading: "4. Why biology matters",
      paragraphs: [
        "Agriculture and food: biology helps farmers to breed crops and animals that give higher yields and resist diseases, to control pests, and to preserve food. Health: it explains how diseases spread, and has led to vaccines, antibiotics, blood transfusion, organ transplants and ways of preventing malaria and cholera. Industry: fermentation by yeast and bacteria gives bread, yoghurt, palm wine and some medicines. Environment: biology guides the protection of forests, rivers and wildlife and the safe treatment of waste.",
        "Biotechnology uses living things, or substances made by them, to make useful products. Examples are insulin and vaccines produced by microorganisms, and improved crop varieties developed by genetic engineering. Biology also supports careers such as medicine, nursing, pharmacy, agriculture, forestry, fisheries, laboratory science and teaching.",
        "Biology can also be misused. Disease-causing microbes can be turned into biological weapons, and careless release of organisms or chemicals can harm the environment. A balanced answer to a ‘discuss’ question mentions benefits and dangers.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Define biology as the study of living things (or life). Saying ‘plants and animals’ leaves out microorganisms such as bacteria and fungi.",
    "Botany studies plants and zoology studies animals. They are the two main branches, but not the only ones.",
    "Keep the steps of the scientific method in order. A common error is to put the conclusion before the experiment.",
    "One experiment does not ‘prove’ a hypothesis for ever. The results support it or they do not. Use words like ‘supports’ or ‘is consistent with’.",
    "A theory explains why something happens; a law describes what happens. A theory does not simply turn into a law once it is well tested.",
    "In a controlled experiment, change only ONE factor. If two factors differ, the result cannot be blamed on either one.",
    "The control is the comparison set-up. It is not always ‘nothing’ added; it is the standard against which the test is judged.",
    "Biotechnology is not a branch name like botany. It is the use of living organisms to make products or solve problems.",
  ],
  summary:
    "Biology is the study of living things. Its two main branches are botany and zoology, with many more such as ecology, genetics, microbiology and physiology. Biologists use the scientific method: observation, hypothesis, experiment, analysis, conclusion and communication. In a controlled experiment only one variable is changed, everything else is kept constant and a control set-up is used for comparison. Biology contributes to farming, health, industry and conservation, and can be misused.",
  quick: {
    intro: "Week 1 revision sheet. Learn the meaning of biology, the order of the scientific method and the vocabulary of experiments.",
    blocks: [
      {
        heading: "1. Meaning and branches",
        points: [
          "Biology = the study of living things (bios = life, logos = study).",
          "Main branches: botany (plants) and zoology (animals).",
          "Others: ecology, genetics, microbiology, physiology, anatomy, cytology, taxonomy, entomology.",
        ],
      },
      {
        heading: "2. Scientific method",
        points: [
          "Observation → hypothesis → experiment → analysis → conclusion → communication.",
          "Hypothesis: a testable explanation.",
          "Results support or do not support a hypothesis; they do not ‘prove’ it for ever.",
        ],
        memory: "Only Honest Experts Always Check Sources: Observe, Hypothesis, Experiment, Analyse, Conclude, Share.",
      },
      {
        heading: "3. Controlled experiments",
        points: [
          "Variable: the one factor changed on purpose.",
          "Constants: all other factors kept the same.",
          "Control: the standard for comparison.",
          "Repeat to be reliable.",
        ],
      },
      {
        heading: "4. Uses of biology",
        points: [
          "Agriculture: better crops and livestock, pest control.",
          "Health: vaccines, drugs, transplants, disease prevention.",
          "Industry: fermentation, biotechnology (insulin, vaccines).",
          "Environment: conservation and waste treatment.",
        ],
        warning: "Biology can be misused, for example in biological weapons. Mention this in discussion questions.",
      },
    ],
    likely: [
      { question: "Define biology.", answer: "Biology is the study of living things (life). It comes from the Greek words bios (life) and logos (study)." },
      { question: "Name the two main branches of biology.", answer: "Botany (the study of plants) and zoology (the study of animals)." },
      { question: "Name three other branches of biology and say what each studies.", answer: "Ecology: relationships between organisms and their environment. Genetics: inheritance of characteristics. Microbiology: microorganisms. (Others: physiology, anatomy, cytology, taxonomy.)" },
      { question: "List the steps of the scientific method in order.", answer: "Observation, hypothesis, experiment, analysis, conclusion, communication of results." },
      { question: "What is a hypothesis?", answer: "A testable explanation suggested for an observation." },
      { question: "What is a controlled experiment?", answer: "An experiment in which only one factor (the variable) is changed and all other factors are kept constant, with a control for comparison." },
      { question: "Why is it important to repeat an experiment?", answer: "To make sure the result was not a chance event and so that it is reliable." },
      { question: "What is the difference between a theory and a law?", answer: "A theory explains why something happens; a law describes a pattern of what happens. A theory does not turn into a law." },
      { question: "State four uses of biology.", answer: "Any four: improving crops and livestock; producing vaccines and drugs; preventing disease; fermentation in industry; biotechnology; conserving the environment." },
      { question: "What is biotechnology? Give one example.", answer: "The use of living organisms or their products to make useful things. Example: making insulin with microorganisms." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The Greek word ‘logos’, from which the word biology comes, means", options: ["life", "study", "plant", "animal"], answer: "B", explanation: "Bios means life and logos means study." },
    { number: 2, kind: "Objective", prompt: "The branch of biology that deals with plants is", options: ["zoology", "botany", "ecology", "genetics"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The study of animals is called", options: ["botany", "genetics", "zoology", "physiology"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "The branch of biology that studies how characteristics are passed from parents to offspring is", options: ["ecology", "genetics", "taxonomy", "anatomy"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "A student notices that ripe pawpaw seeds scattered on moist soil sprout, but those left in a dry drawer do not. The next scientific step is to", options: ["state a hypothesis", "share the results", "reject the observation", "write the conclusion"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "A hypothesis is", options: ["a proven law", "a testable explanation for an observation", "the result of an experiment", "a list of apparatus"], answer: "B" },
    { number: 7, kind: "Objective", prompt: "The correct order of the scientific method is", options: ["hypothesis, observation, conclusion, experiment", "observation, hypothesis, experiment, conclusion", "experiment, observation, hypothesis, conclusion", "conclusion, hypothesis, observation, experiment"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "In an experiment to find out whether seeds need water to germinate, the variable is", options: ["the number of seeds", "the type of seed", "the amount of water", "the temperature"], answer: "C" },
    { number: 9, kind: "Objective", prompt: "In the same experiment, which factor should be kept constant?", options: ["The amount of water", "The type of seed", "Whether the seeds germinate", "Whether the seeds are moist"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "The control in a controlled experiment is the", options: ["factor that is changed", "set-up used for comparison", "conclusion of the experiment", "apparatus used"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "Which statement about a theory is correct?", options: ["It is an untested guess", "It explains why something happens and is supported by evidence", "It becomes a law without further change", "It is the first step of the method"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Which of these is an example of biotechnology?", options: ["Mining of iron ore", "Making insulin with microorganisms", "Building a dam", "Drilling for oil"], answer: "B" },
    { number: 13, kind: "Objective", prompt: "Which of the following is a harmful use of biology?", options: ["Producing vaccines", "Making biological weapons", "Improving crop varieties", "Fermenting yoghurt"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "Changing two factors at the same time in an experiment is wrong because", options: ["it makes the experiment shorter", "it is not possible to tell which factor caused the result", "it is expensive", "it is only done in theory"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define biology and explain the meaning of the two Greek words from which it comes.", answer: "Biology is the study of living things (life). Bios means life and logos means study." },
    { number: 16, kind: "Theory", prompt: "Name the two main branches of biology and four other branches, saying what each of the four studies.", answer: "Botany (plants) and zoology (animals). Others: ecology (organisms and their environment), genetics (inheritance), microbiology (microorganisms), physiology (how body parts work), anatomy (body structure), cytology (cells), taxonomy (naming and grouping)." },
    { number: 17, kind: "Theory", prompt: "Describe the steps of the scientific method using a simple experiment on germination as an example.", answer: "Observation: seeds in dry storage do not sprout but those in damp soil do. Hypothesis: seeds need water to germinate. Experiment: set identical seeds on dry and moist cotton wool in the same conditions. Analysis: record which sprout. Conclusion: the moist seeds sprouted, so the hypothesis is supported. Communication: report the method and results so others can repeat it." },
    { number: 18, kind: "Theory", prompt: "Explain the terms variable, control and constant factors in a controlled experiment, using an example.", answer: "The variable is the one factor changed on purpose (e.g. amount of water for seeds). The control is the standard set-up for comparison (the moist dish). Constant factors are everything else kept the same (type and number of seeds, dish, temperature, time)." },
    { number: 19, kind: "Theory", prompt: "State four ways in which biology benefits people and one way in which it can be misused.", answer: "Benefits: better crops and livestock, vaccines and drugs, fermentation products such as bread and yoghurt, conservation of the environment. Misuse: making biological weapons from disease-causing microbes." },
    { number: 20, kind: "Theory", prompt: "Distinguish between a hypothesis, a theory and a law.", answer: "A hypothesis is a testable explanation suggested before an experiment. A theory is a well-tested explanation of why something happens. A law describes a pattern that is found every time under stated conditions." },
  ] as PracticeQuestion[],
};
