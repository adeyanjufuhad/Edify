import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek1: Lesson = {
  id: "ss1-first-physics-week-1",
  week: "Week 01",
  title: "Introduction to Physics",
  subtitle: "Find out what physics studies, meet its branches, see how it shapes the things you use every day and learn how to stay safe in the laboratory.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define physics and describe its scope.",
    "Name the main branches of physics and say what each one studies.",
    "Give examples of the use of physics in homes, transport, communication, medicine and industry.",
    "Describe the steps a scientist follows when investigating a problem.",
    "State and apply the safety rules of the physics laboratory, and recognise common hazard symbols.",
  ],
  sections: [
    {
      heading: "1. What is physics?",
      paragraphs: [
        "Why does a ball thrown upwards come back down? How does your voice reach a friend through a phone? Why does ice float on water while a coin sinks? Questions like these belong to physics. Physics is the branch of science that studies matter and energy and the ways in which they affect each other. The word comes from the Greek physis, which means nature.",
        "Physicists try to describe nature in numbers. They measure quantities such as length, time and temperature, look for patterns in the results and write the patterns as laws and equations. The scope of physics is very wide. It reaches from the tiny particles inside an atom to the stars and galaxies, and it covers motion, forces, heat, light, sound, electricity and magnetism. Because everything in nature is made of matter and takes part in energy changes, physics is the foundation of chemistry, engineering, medicine and technology.",
      ],
    },
    {
      heading: "2. Branches of physics",
      paragraphs: [
        "Physics is such a large subject that it is divided into branches. Each branch studies one group of related happenings. You will meet most of them in the senior secondary school.",
      ],
      points: [
        "Mechanics: motion, forces and energy, for example a car braking or a ball falling.",
        "Heat (thermal physics): temperature, heat flow, expansion and change of state.",
        "Optics: light, shadows, reflection in mirrors, refraction in lenses and colour.",
        "Acoustics (sound): vibrations, sound waves, echoes, pitch and loudness.",
        "Electricity and magnetism: electric charges, currents, circuits, magnets and the fields around them.",
        "Atomic and nuclear physics: the structure of the atom, radioactivity and nuclear energy.",
        "Electronics: the behaviour of electrons in devices such as diodes and transistors, which are found in phones and radios.",
        "Other areas: astronomy and astrophysics (stars and planets), geophysics (the Earth), medical physics and biophysics (physics applied to living things).",
      ],
    },
    {
      heading: "3. Physics in everyday life and technology",
      paragraphs: [
        "Almost every machine around you works because someone understood a physical principle. Transport uses engines, brakes that rely on friction, and streamlined shapes that let vehicles and aircraft cut through the air. Electricity comes from generating stations such as the hydroelectric dams on the River Niger, where falling water turns turbines, and it is carried by cables, transformers and fuses. Solar panels and inverters are physics too.",
        "Communication depends on radio waves and light: mobile phones, television, radio, satellites and fibre-optic cables. In hospitals, thermometers, X-rays, ultrasound scans, lasers and radiotherapy all come from physics. Builders use levers, pulleys and hydraulic jacks, while a refrigerator, a fan, a pressing iron and a microwave oven are all applications of heat, electricity and magnetism. Careers that need physics include engineering, aviation, radiography, architecture, telecommunications, renewable energy and weather forecasting.",
      ],
    },
    {
      heading: "4. How a physicist investigates a problem",
      paragraphs: [
        "Physicists follow a method that you can also use in your practical work. First observe something and ask a question. Next make a hypothesis, which is a guess that can be tested. Then plan an experiment, taking care to change only one thing at a time and to keep everything else the same. Record your measurements in a table, draw a graph if it helps, and look for a pattern. Finally write a conclusion and say whether the hypothesis was supported.",
        "If many different experiments support an explanation over a long time, it becomes a theory. A law is a short statement or equation that describes what always happens under given conditions. Good scientists repeat their measurements, because one result could be a mistake.",
      ],
    },
    {
      heading: "5. Laboratory safety rules and procedures",
      paragraphs: [
        "A laboratory has electricity, heat, glass and chemicals, so careless behaviour can cause injury. Know where the exits, the fire extinguisher, the sand bucket and the first aid box are before you start any practical.",
      ],
      points: [
        "Enter and leave the laboratory only when the teacher is present, and walk; never run or play.",
        "Read the instructions and listen to the teacher before touching any apparatus.",
        "Do not eat, drink or taste anything in the laboratory.",
        "Tie back long hair, keep bags away from walkways, and wear protective clothing when told to.",
        "Never touch a switch, plug or socket with wet hands, and switch off the supply before changing a connection.",
        "Point the mouth of a heated tube away from people, and handle hot objects with tongs or a cloth.",
        "Never look directly at the Sun, a laser or a bright lamp, even through a lens.",
        "Report every accident, breakage or injury to the teacher at once.",
        "At the end, switch off equipment, return apparatus, clean the bench and wash your hands.",
      ],
      diagram: "Draw four hazard symbols and name what each warns about: a flame (flammable), a skull (toxic), a drop on a hand (corrosive) and a three-bladed trefoil (radioactive).",
    },
    {
      heading: "6. First aid and fire safety basics",
      paragraphs: [
        "For a burn, cool the area under running water for at least ten minutes and then cover it with a clean dry cloth. For a small cut, wash it, press on it to stop the bleeding and cover it. If a person is being shocked by an electrical appliance, switch off the supply first; touching the person while the current is still flowing can shock you too.",
        "A small fire can be smothered with sand or a fire blanket. Never pour water on an electrical fire or on burning oil. A carbon dioxide extinguisher is suitable for electrical fires. If a fire cannot be controlled quickly, leave the room, warn others and call for help.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "A definition of physics should mention matter and energy and how they interact. ‘The study of nature’ alone is too vague to score full marks.",
    "Do not confuse optics (light) with acoustics (sound). Mechanics covers motion and forces.",
    "A hypothesis is a testable guess made before the experiment. A theory is an explanation supported by a great deal of evidence.",
    "In a good experiment only one factor is changed at a time. The other factors are kept constant.",
    "Never put water on an electrical fire or on burning oil. Use sand, a fire blanket or a carbon dioxide extinguisher.",
    "In an electric shock, switch off the supply before you touch the victim.",
    "When asked for applications, name the use and the branch of physics behind it, for example ‘ultrasound scan: sound waves’.",
    "A single reading can be wrong. Repeating a measurement and taking the average is part of good practice.",
  ],
  summary:
    "Physics is the science of matter and energy and how they interact. Its branches include mechanics, heat, optics, acoustics, electricity and magnetism, atomic and nuclear physics and electronics. Physics is applied in transport, power generation, communication, medicine and construction. Physicists observe, make a hypothesis, test it by controlled experiments, analyse the results and draw conclusions. Safe behaviour in the laboratory, a knowledge of hazard symbols and simple first aid protect everyone who works there.",
  quick: {
    intro: "Week 1 revision sheet. Learn the definition, the branches with one example each, and the safety rules.",
    blocks: [
      {
        heading: "1. Definition and scope",
        points: [
          "Physics: the science that studies matter, energy and how they interact.",
          "Scope: from atoms to galaxies; motion, forces, heat, light, sound, electricity, magnetism.",
          "It is the basis of engineering, medicine and technology.",
        ],
      },
      {
        heading: "2. Branches",
        points: [
          "Mechanics: motion and forces.",
          "Heat: temperature and heat flow.",
          "Optics: light. Acoustics: sound.",
          "Electricity and magnetism: charges, currents, magnets.",
          "Atomic and nuclear: atom, radioactivity.",
          "Electronics: devices like diodes and transistors.",
        ],
        memory: "Think M-H-O-A-E-A-E: Mechanics, Heat, Optics, Acoustics, Electricity & magnetism, Atomic & nuclear, Electronics.",
      },
      {
        heading: "3. Applications",
        points: [
          "Transport: engines, brakes, streamlining.",
          "Power: hydroelectric dams, generators, solar panels.",
          "Communication: radio waves, satellites, optical fibres.",
          "Medicine: X-rays, ultrasound, lasers.",
          "Construction: levers, pulleys, hydraulic jacks.",
        ],
      },
      {
        heading: "4. Scientific method",
        points: [
          "Observe → ask a question → hypothesis → experiment → results → conclusion.",
          "Change one factor at a time; repeat readings.",
        ],
      },
      {
        heading: "5. Safety",
        points: [
          "No running, eating or tasting; tie hair; read instructions.",
          "Dry hands for electricity; switch off before changing circuits.",
          "Burns: cool under running water. Shock: switch off first.",
          "Electrical or oil fire: sand, blanket or CO₂ extinguisher, never water.",
        ],
        warning: "Never look straight at the Sun or a laser.",
      },
    ],
    likely: [
      { question: "Define physics.", answer: "Physics is the branch of science that studies matter and energy and how they interact." },
      { question: "Name five branches of physics.", answer: "Mechanics, heat, optics, acoustics, electricity and magnetism, atomic and nuclear physics, electronics (any five)." },
      { question: "Give three applications of physics in daily life.", answer: "Generating electricity, mobile phone communication, X-ray and ultrasound in hospitals, vehicle brakes, refrigerators (any three)." },
      { question: "What is a hypothesis?", answer: "A guess or proposed explanation that can be tested by experiment." },
      { question: "State the steps of the scientific method.", answer: "Observation, question, hypothesis, experiment, recording and analysing results, conclusion." },
      { question: "State four rules of laboratory safety.", answer: "No running or playing, no eating or tasting, read instructions first, report accidents, tie long hair, keep hands dry near electricity (any four)." },
      { question: "What would you do if a person is being shocked by an electrical appliance?", answer: "Switch off the supply first, then move the person away and call for help. Do not touch them while the current is flowing." },
      { question: "Which fire extinguishers or materials are suitable for an electrical fire?", answer: "Carbon dioxide extinguisher, dry sand or a fire blanket, after switching off the supply. Never water." },
      { question: "What does a flame symbol on a bottle warn about?", answer: "The substance is flammable and can catch fire easily." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Physics is the branch of science that studies", options: ["living organisms and their habitats", "substances and the way they react", "matter, energy and the way they interact", "the structure and history of the Earth"], answer: "C", explanation: "Physics deals with matter and energy and the relationships between them." },
    { number: 2, kind: "Objective", prompt: "The branch of physics that deals with light is", options: ["optics", "acoustics", "mechanics", "thermal physics"], answer: "A", explanation: "Optics studies light, mirrors, lenses and colour." },
    { number: 3, kind: "Objective", prompt: "The study of motion and the forces that cause it belongs to", options: ["optics", "electronics", "nuclear physics", "mechanics"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "Radioactivity and the structure of the nucleus are studied in", options: ["thermal physics", "atomic and nuclear physics", "acoustics", "mechanics"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "An ultrasound scan used to look at an unborn baby is mainly an application of", options: ["sound waves", "magnetism", "chemical reactions", "nuclear fission"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "The first step in the scientific method is to", options: ["write the report", "draw the conclusion", "make an observation and ask a question", "repeat the experiment"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "A guess that can be tested by an experiment is called a", options: ["law", "theory", "conclusion", "hypothesis"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "Which of these must NEVER be used to put out an electrical fire?", options: ["Dry sand", "Water", "A carbon dioxide extinguisher", "A fire blanket"], answer: "B", explanation: "Water conducts electricity and can give the person a shock." },
    { number: 9, kind: "Objective", prompt: "A student is being shocked by a faulty appliance. The first thing to do is to", options: ["pull the student away with bare hands", "pour water on the appliance", "switch off the electricity supply", "wait for the teacher to arrive"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "Looking directly at the Sun during an experiment with a lens is dangerous because it can", options: ["permanently damage the eyes", "melt the lens", "make the lens dirty", "spoil the result of the experiment"], answer: "A" },
    { number: 11, kind: "Objective", prompt: "Which of these is NOT safe practice in a physics laboratory?", options: ["Tying back long hair", "Tasting a liquid to identify it", "Reporting broken glass immediately", "Reading the instructions before starting"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "A flame symbol on a container warns that the contents are", options: ["toxic", "corrosive", "radioactive", "flammable"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "A hydroelectric station on the River Niger produces electricity by using the energy of", options: ["burning coal", "nuclear fission", "falling water", "sunlight"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "Which pairing of branch and topic is correct?", options: ["Electricity: the flow of charge in a circuit", "Optics: the motion of vehicles", "Acoustics: the expansion of metals", "Mechanics: images in mirrors"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Define physics and list five of its branches, saying briefly what each one studies.", answer: "Physics is the branch of science that studies matter and energy and how they interact. Branches: mechanics (motion and forces); heat (temperature and heat flow); optics (light); acoustics (sound); electricity and magnetism (charges, currents, magnets); atomic and nuclear physics (the atom and radioactivity)." },
    { number: 16, kind: "Theory", prompt: "Give four examples of the application of physics in everyday life or technology, naming the physical idea behind each.", answer: "Hydroelectric power: falling water turns turbines (mechanical energy to electrical energy). Mobile phones and radio: radio waves carry signals. Hospitals: X-rays and ultrasound use radiation and sound waves. Vehicle brakes: friction slows the wheels. Hydraulic jack: pressure in liquids lifts heavy loads." },
    { number: 17, kind: "Theory", prompt: "A student wants to find out whether a heavier ball takes longer to fall than a lighter one. Describe the steps of the scientific method she should follow.", answer: "Observe and ask the question; make a hypothesis (for example, mass does not change the time of fall); plan an experiment in which the balls are released from the same height and only the mass is changed; time the fall several times and record the results; calculate averages and compare; state a conclusion and say whether the hypothesis was supported." },
    { number: 18, kind: "Theory", prompt: "State six safety rules that must be obeyed in a physics laboratory.", answer: "Do not run or play; do not eat, drink or taste anything; read instructions and listen to the teacher before starting; tie back long hair and keep bags clear; keep hands dry and switch off the supply before touching electrical connections; point heated tubes away from people; report accidents at once; clean up and wash hands afterwards." },
    { number: 19, kind: "Theory", prompt: "One pupil has been burnt by a hot metal rod and another is being shocked by a faulty extension cord. Describe what you would do in each case.", answer: "Burn: cool the burnt part under running water for about ten minutes, cover it with a clean dry cloth and tell the teacher. Shock: switch off the supply at the socket or main switch first, then move the pupil away from the cord using a dry non-metal object if needed, and call the teacher and for medical help." },
    { number: 20, kind: "Theory", prompt: "Name four hazard symbols found in a laboratory and state what each one warns about.", answer: "Flame: flammable substance. Skull and crossbones: toxic or poisonous. Drop on a hand or metal: corrosive. Three-bladed trefoil: radioactive. (Also acceptable: lightning arrow for electrical hazard, exclamation mark for harmful or irritant.)" },
  ] as PracticeQuestion[],
};
