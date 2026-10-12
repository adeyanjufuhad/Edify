import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek7: Lesson = {
  id: "ss1-first-physics-week-7",
  week: "Week 07",
  title: "Mid-term review",
  subtitle: "Pull together Weeks 1 to 6 before the continuous assessment test: key facts, formulas, common slips and a mixed set of practice questions.",
  source: "Written by Edify as a mid-term review for the SS1 First Term Physics scheme of work. The revision notes and practice questions are original.",
  objectives: [
    "Recall the main definitions, units and examples from Weeks 1 to 6.",
    "Use the formulas for speed, velocity, acceleration, displacement and relative speed correctly.",
    "Read vernier and micrometer scales and correct for zero error.",
    "Avoid the common mistakes made in tests on these topics.",
    "Plan your time and present calculations well in a continuous assessment test.",
  ],
  sections: [
    {
      heading: "1. About this week",
      paragraphs: [
        "Week 7 is the mid-term break and the continuous assessment test (CAT). No new topic is taught. Use the time to go back over the first six weeks, fix the weak points and practise with questions. A good rule is to revise a topic, close the book, and try to write down everything you remember about it before checking.",
      ],
    },
    {
      heading: "2. Weeks 1 and 2: introduction, quantities and units",
      paragraphs: [
        "Physics is the science of matter and energy and how they interact. Its branches are mechanics, heat, optics, acoustics, electricity and magnetism, atomic and nuclear physics, and electronics. Physics is applied in power generation, communication, transport, medicine and construction. Scientists work by observing, forming a hypothesis, testing it with a controlled experiment, analysing the results and drawing a conclusion. Laboratory safety rules and first aid matter in every practical.",
        "A quantity is something that can be measured, and a measurement needs a number and a unit. The seven SI base quantities are length (m), mass (kg), time (s), electric current (A), temperature (K), amount of substance (mol) and luminous intensity (cd). All other quantities are derived, and their units come from their defining equations: newton = kg m s⁻², joule = kg m² s⁻², watt = kg m² s⁻³ and pascal = kg m⁻¹ s⁻². Dimensions use L, M and T and can show that an equation is wrong. Know the prefixes (kilo, mega, milli, micro, nano), standard form and conversions such as km/h to m/s.",
      ],
    },
    {
      heading: "3. Weeks 3 and 4: position, displacement and measurement",
      paragraphs: [
        "Position is given relative to a reference point, using a number line or (x, y) coordinates, and direction is given by bearings measured clockwise from north. Distance is the total path length (scalar). Displacement is the straight-line change in position with direction (vector), and it is zero after a complete round trip. Vectors on one line are added or subtracted; vectors at right angles combine by Pythagoras’ theorem.",
        "Metre rules read to 0.1 cm, vernier calipers to 0.01 cm and micrometer screw gauges to 0.01 mm. A zero error is subtracted from readings with its sign. The volume of an irregular solid is found by displacement of water. Mass (kg) is measured with a balance and is constant; weight (N) is measured with a spring balance and equals mg. Systematic errors are corrected, random errors are reduced by averaging, and parallax is avoided by looking straight at the scale. Count significant figures carefully.",
      ],
    },
    {
      heading: "4. Weeks 5 and 6: motion, speed, velocity and acceleration",
      paragraphs: [
        "Motion is the change of position of a body with time and is relative to a reference point. The four types are translational, rotational, oscillatory and random. For relative motion along a line, subtract speeds when bodies go the same way and add them when they go in opposite ways.",
        "Speed = distance ÷ time (scalar). Velocity = displacement ÷ time (vector). Acceleration = (v − u) ÷ t, in m/s². Average speed is total distance ÷ total time. Average velocity for uniform acceleration is (u + v) ÷ 2. A change of direction at constant speed is also an acceleration.",
      ],
    },
    {
      heading: "5. Formulas and units to know",
      paragraphs: [
        "Write these on a card and test yourself until you can write them without looking.",
      ],
      points: [
        "Speed v = s ÷ t (m/s); velocity = displacement ÷ t (m/s).",
        "Acceleration a = (v − u) ÷ t (m/s²).",
        "Average velocity for uniform acceleration = (u + v) ÷ 2.",
        "Weight W = mg (newtons), with g = 10 N/kg on Earth.",
        "Density = mass ÷ volume (kg/m³).",
        "Distance between two points: d = √[(x₂ − x₁)² + (y₂ − y₁)²].",
        "Vernier reading = main scale + (division × 0.01 cm); micrometer = sleeve + (division × 0.01 mm).",
        "km/h ÷ 3.6 = m/s.",
      ],
    },
    {
      heading: "6. How to sit a test",
      paragraphs: [
        "Read each question carefully and underline what is asked. In objective questions, do the easy ones first, then return to the longer calculations. In calculations, set your work out in the same order every time: list what is given, write the formula, substitute with units, calculate and state the answer with the unit. Check that the size of your answer is sensible; a person cannot run at 200 m/s. In theory questions, give as many separate points as there are marks.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "A definition must be complete. Say ‘matter and energy’ in the definition of physics, ‘rate of change of displacement’ for velocity.",
    "Always convert to SI units first. Kilometres per hour, minutes and grams are common traps.",
    "Displacement is zero for a round trip, but distance is not. The two are not interchangeable.",
    "Correct zero error by subtracting it with its sign, not by always subtracting a positive number.",
    "Mass stays the same everywhere. Weight changes with the value of g.",
    "Average speed is total distance over total time, not the average of two speeds.",
    "Relative speed: same direction subtract, opposite directions add.",
    "Retardation is deceleration. Zero acceleration means constant velocity, not zero velocity.",
  ],
  summary:
    "Weeks 1 to 6 cover what physics is, the SI base and derived units, dimensions, position, distance and displacement, scalars and vectors, measuring instruments and errors, the types of motion, relative motion, and the definitions and calculations of speed, velocity and acceleration. Revise by recall, practise calculations with units, and use the mixed questions on this page to check what you have kept.",
  quick: {
    intro: "A one-page tour of Weeks 1 to 6. If a line is not clear, go back to that week.",
    blocks: [
      {
        heading: "1. Weeks 1–2",
        points: [
          "Physics: matter, energy and their interactions; branches; safety.",
          "Seven base units: m, kg, s, A, K, mol, cd.",
          "N = kg m s⁻²; J = kg m² s⁻²; W = kg m² s⁻³; Pa = kg m⁻¹ s⁻².",
          "Dimensions: velocity LT⁻¹, force MLT⁻², energy ML²T⁻².",
        ],
      },
      {
        heading: "2. Weeks 3–4",
        points: [
          "Distance (scalar) vs displacement (vector).",
          "Bearings: clockwise from north, three figures.",
          "Vernier 0.01 cm; micrometer 0.01 mm; correct zero error.",
          "Mass (kg, balance) vs weight (N, spring balance).",
        ],
      },
      {
        heading: "3. Weeks 5–6",
        points: [
          "Types of motion: translational, rotational, oscillatory, random.",
          "Relative motion: same way subtract, opposite way add.",
          "v = s ÷ t; a = (v − u) ÷ t; average velocity = (u + v) ÷ 2.",
          "Retardation = negative acceleration.",
        ],
        warning: "Check units before you substitute.",
      },
    ],
    likely: [
      { question: "State two differences between distance and displacement.", answer: "Distance is a scalar and displacement a vector; distance is never negative or zero for a moving body but displacement can be zero." },
      { question: "Write the SI base units of force.", answer: "kg m s⁻²." },
      { question: "A girl’s vernier calipers reads 4.52 cm with a zero error of +0.04 cm. What is the true length?", answer: "4.52 − 0.04 = 4.48 cm." },
      { question: "State the difference between mass and weight.", answer: "Mass is the quantity of matter in a body (kg) and is constant; weight is the force of gravity on it (N) and varies with g." },
      { question: "What type of motion does a swinging pendulum have?", answer: "Oscillatory motion." },
      { question: "Two boys cycle in the same direction at 7 m/s and 5 m/s. Find the velocity of the faster boy relative to the slower one.", answer: "7 − 5 = 2 m/s." },
      { question: "A car travels 90 km in 1.5 h. Find the average speed in km/h and m/s.", answer: "90 ÷ 1.5 = 60 km/h; 60 ÷ 3.6 = 16.7 m/s." },
      { question: "A body’s velocity falls from 20 m/s to 5 m/s in 5 s. Find its acceleration.", answer: "(5 − 20) ÷ 5 = −3 m/s², a retardation of 3 m/s²." },
      { question: "Name three vectors and three scalars.", answer: "Vectors: displacement, velocity, force. Scalars: distance, speed, mass." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The branch of physics that deals with sound is", options: ["optics", "mechanics", "thermal physics", "acoustics"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "If oil catches fire in the laboratory, the correct action is to", options: ["pour water on it", "smother it with sand or a fire blanket", "blow it out", "leave the room without telling anyone"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Which of the following is NOT a fundamental quantity?", options: ["Time", "Length", "Speed", "Temperature"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "The watt is equivalent to", options: ["J s⁻¹", "N m", "kg m s⁻²", "N m⁻²"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "The dimensions of force are", options: ["ML²T⁻²", "MLT⁻¹", "MLT⁻²", "ML⁻¹T⁻²"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "A length of 4.5 × 10⁻² m is the same as", options: ["0.45 cm", "4.5 cm", "45 cm", "450 cm"], answer: "B", explanation: "4.5 × 10⁻² m = 0.045 m = 4.5 cm." },
    { number: 7, kind: "Objective", prompt: "A girl walks 9 m east and then 12 m north. The magnitude of her displacement is", options: ["15 m", "21 m", "3 m", "108 m"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "Which of the following is a vector quantity?", options: ["Speed", "Energy", "Time", "Force"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "A vernier calipers shows a main scale reading of 1.7 cm and the 3rd vernier division coincides with a main-scale division. The reading is", options: ["1.37 cm", "1.70 cm", "1.73 cm", "4.70 cm"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "A body has a mass of 5 kg on Earth. On the Moon, where g = 1.6 N/kg, its mass and weight are", options: ["5 kg and 8 N", "5 kg and 50 N", "0.8 kg and 8 N", "8 kg and 50 N"], answer: "A", explanation: "Mass does not change. Weight = 5 × 1.6 = 8 N." },
    { number: 11, kind: "Objective", prompt: "The motion of the prongs of a vibrating tuning fork is", options: ["rotational", "oscillatory", "random", "translational"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Two boys cycle in the same direction at 6 m/s and 4 m/s. The velocity of the faster boy relative to the slower boy is", options: ["10 m/s", "5 m/s", "24 m/s", "2 m/s"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "A man cycles 6 km in 20 minutes and then 6 km in 40 minutes. His average speed is", options: ["9 km/h", "10 km/h", "12 km/h", "18 km/h"], answer: "C", explanation: "Total distance 12 km in a total time of 1 hour is 12 km/h." },
    { number: 14, kind: "Objective", prompt: "The velocity of a body changes from 8 m/s to 2 m/s in 3 s. Its acceleration is", options: ["−2 m/s²", "2 m/s²", "−6 m/s²", "3.3 m/s²"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Name three branches of physics and give one practical application of each.", answer: "Mechanics: brakes and vehicle design. Optics: spectacles, cameras and fibre-optic communication. Electricity and magnetism: electric generators and motors. (Also acceptable: acoustics, ultrasound scans; heat, refrigerators; nuclear physics, cancer treatment.)" },
    { number: 16, kind: "Theory", prompt: "(a) Derive the SI unit of density. (b) Find the dimensions of density. (c) Convert 13.6 g/cm³ to kg/m³.", answer: "(a) Density = mass ÷ volume = kg ÷ m³ = kg m⁻³. (b) [Density] = M ÷ L³ = ML⁻³. (c) 13.6 × 1000 = 13 600 kg/m³." },
    { number: 17, kind: "Theory", prompt: "A boy walks 60 m east and then 80 m north. Find the distance he walked, the magnitude of his displacement and the bearing of his final position from the start.", answer: "Distance = 60 + 80 = 140 m. Displacement = √(60² + 80²) = 100 m. The angle from north is tan⁻¹(60 ÷ 80) = 36.9°, so the bearing is about 037°." },
    { number: 18, kind: "Theory", prompt: "A vernier calipers has a main scale reading of 3.4 cm and the 5th vernier division coincides with a main-scale division. The zero error is +0.03 cm. (a) Find the correct reading. (b) State one random and one systematic error that might affect the measurement.", answer: "(a) Observed = 3.4 + 5 × 0.01 = 3.45 cm. Correct reading = 3.45 − 0.03 = 3.42 cm. (b) Systematic: the zero error itself, or a worn jaw. Random: judging which vernier line coincides, or squeezing the object with different force each time." },
    { number: 19, kind: "Theory", prompt: "Train X moves at 90 km/h and train Y at 60 km/h on parallel tracks. Find the velocity of X relative to Y when they move (a) in the same direction and (b) in opposite directions. State the type of motion of a train wheel.", answer: "(a) 90 − 60 = 30 km/h. (b) 90 + 60 = 150 km/h. A train wheel has rotational motion about its axle together with the translational motion of the train." },
    { number: 20, kind: "Theory", prompt: "A cyclist accelerates uniformly from rest to 12 m/s in 8 s and then moves at 12 m/s for 10 s. Calculate (a) the acceleration, (b) the distance in the first 8 s, (c) the total distance and (d) the average speed for the 18 s.", answer: "(a) a = 12 ÷ 8 = 1.5 m/s². (b) Average velocity = (0 + 12) ÷ 2 = 6 m/s; distance = 6 × 8 = 48 m. (c) Second stage = 12 × 10 = 120 m; total = 48 + 120 = 168 m. (d) Average speed = 168 ÷ 18 ≈ 9.3 m/s." },
  ] as PracticeQuestion[],
};
