import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek4: Lesson = {
  id: "ss1-first-physics-week-4",
  week: "Week 04",
  title: "Measurement instruments and techniques",
  subtitle: "Choose the right instrument for length, volume, mass, weight and time, read vernier calipers and a micrometer screw gauge, and understand errors and significant figures.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Select a suitable instrument for measuring length, volume, mass, weight and time.",
    "Read a metre rule, vernier calipers and micrometer screw gauge, including zero error.",
    "Measure the volume of regular and irregular solids and of liquids.",
    "Distinguish between mass and weight and between the instruments that measure them.",
    "Describe systematic, random and parallax errors and give the number of significant figures in a value.",
  ],
  sections: [
    {
      heading: "1. Choosing an instrument",
      paragraphs: [
        "To measure something is to compare it with an agreed standard. No measurement is perfect, so we choose the instrument that matches the size of the object and the accuracy we need. The smallest division on an instrument, called its least count, limits how accurately it can be read. A metre rule cannot tell you the thickness of a hair, and a micrometer is a waste of time for measuring a football pitch.",
      ],
    },
    {
      heading: "2. Measuring length",
      paragraphs: [
        "A measuring tape measures long lengths such as the length of a room or a plot of land. A metre rule or ruler is graduated in centimetres and millimetres, so its least count is 1 mm (0.1 cm). To avoid error, place the zero mark on the edge of the object, or start at a whole-number mark and subtract, because the end of a worn rule is not reliable.",
        "Vernier calipers measure to 0.01 cm (0.1 mm). They have a fixed main scale and a sliding vernier scale. Ten divisions of the vernier scale span exactly 9 mm of the main scale, so each vernier division is 0.1 mm shorter than a main-scale division. To read them: note the main-scale reading just before the zero of the vernier scale (for example 4.2 cm); find the vernier division that lines up exactly with a main-scale division (for example the 6th); multiply that number by 0.01 cm and add. Reading = 4.2 + 6 × 0.01 = 4.26 cm. The outside jaws measure the thickness of an object, the small upper jaws measure the inside diameter of a tube, and the depth rod measures the depth of a hole.",
        "The micrometer screw gauge measures to 0.01 mm. Each turn of the thimble moves the spindle 0.5 mm, and the thimble has 50 divisions, so one division equals 0.5 ÷ 50 = 0.01 mm. Close the gap on the object using the ratchet only, so that you do not squeeze too hard. Reading = last visible mark on the sleeve (in mm and half-mm) + thimble division in line with the sleeve’s datum line × 0.01 mm. For example, a sleeve reading of 3.5 mm and a thimble reading of 17 gives 3.5 + 0.17 = 3.67 mm. It is used for very small lengths such as the diameter of a wire.",
        "Zero error exists when the instrument does not read zero with its jaws closed. If it reads +0.02 cm, every reading is too large by 0.02 cm, so subtract 0.02 cm. If it reads −0.03 mm, every reading is too small, so add 0.03 mm. In general, true reading = observed reading − zero error (with its sign).",
      ],
      diagram: "Draw a vernier calipers with the main scale reading 4.2 cm and the 6th vernier division lined up with a main-scale division. Label the main scale, vernier scale, outside jaws, inside jaws and depth rod.",
    },
    {
      heading: "3. Measuring volume",
      paragraphs: [
        "The volume of a regular solid is calculated from its dimensions: a cuboid is length × breadth × height, a cylinder is πr²h and a sphere is (4/3)πr³. The volume of a liquid is measured with a measuring cylinder, a pipette or a burette. Place the cylinder on a level surface, bring your eye level with the liquid and read the bottom of the curved surface (the meniscus) of water. Reading from above or below causes a parallax error.",
        "To find the volume of an irregular solid such as a stone, use the displacement method. Part-fill a measuring cylinder with water and read the volume V₁. Lower the stone on a thread until it is fully covered and read V₂. The volume of the stone is V₂ − V₁. For a stone too large for the cylinder, fill a Eureka (overflow) can to its spout, lower the stone in and collect the displaced water in a measuring cylinder; the volume of water collected equals the volume of the stone.",
      ],
    },
    {
      heading: "4. Measuring mass and weight",
      paragraphs: [
        "Mass is the quantity of matter in a body. Its SI unit is the kilogram, and it is measured with a beam balance, lever balance or electronic balance, which compare an unknown mass with known masses. Mass is a scalar and it does not change from place to place. Weight is the force of gravity on a body. It is measured in newtons with a spring balance (a newton meter). Weight is a vector pointing towards the centre of the Earth, and W = mg, where g is the strength of gravity, about 10 N/kg on Earth.",
        "Because g depends on place, weight depends on place. On the Moon, g is about 1.6 N/kg, so a 60 kg person has a weight of about 600 N on Earth but only about 96 N on the Moon. The mass of the person is 60 kg in both places.",
      ],
      points: [
        "Mass: amount of matter; kilogram; scalar; same everywhere; beam or electronic balance.",
        "Weight: pull of gravity; newton; vector; changes with g; spring balance.",
      ],
    },
    {
      heading: "5. Measuring time",
      paragraphs: [
        "Time is measured with clocks, wristwatches and stopwatches. An analogue stopwatch reads to 0.1 s and a digital one to 0.01 s, but your own reaction time in starting and stopping it is about 0.2 s, which is much larger. To reduce this error when timing a swinging pendulum, time many oscillations, for example 20, and divide the total time by 20 to get the period T. The 0.2 s error is then shared among 20 swings and becomes only about 0.01 s per swing. Start the count as the bob passes the middle of its swing, because it is moving fastest there and its position is easy to judge.",
      ],
    },
    {
      heading: "6. Errors in measurement",
      paragraphs: [
        "An error is the difference between a measured value and the true value. Systematic errors push every reading in the same direction by about the same amount. Examples are zero error, a wrongly calibrated instrument, a stretched tape and a worn end of a rule. Repeating the readings does not remove them; you must correct them, for example by allowing for the zero error.",
        "Random errors change from reading to reading in an unpredictable way. Examples are reaction time and judging the position of a pointer. They can be reduced by taking many readings and finding the average. Parallax error is the wrong reading you get when your eye is not directly in front of the mark or pointer you are reading; always look at the scale from a position at right angles to it.",
        "An accurate result is close to the true value. A precise set of results are close to each other. A precise result can still be inaccurate if there is a systematic error. The percentage error is (error ÷ measured value) × 100%.",
      ],
    },
    {
      heading: "7. Significant figures",
      paragraphs: [
        "Significant figures (s.f.) show how carefully a measurement was made. The rules are: all non-zero digits count; zeros between non-zero digits count; zeros at the start of a decimal number do not count; and zeros at the end of a decimal number do count. So 0.004050 has four significant figures (4, 0, 5, 0) and 2.50 cm has three. For a whole number such as 3000, the zeros are not clear, so use standard form: 3.0 × 10³ has two significant figures and 3.000 × 10³ has four.",
        "To round to a given number of significant figures, look at the next digit: if it is 5 or more, round up; if less than 5, leave the last digit unchanged. Thus 5.0472 to three s.f. is 5.05, and 0.0206 to two s.f. is 0.021. In multiplication and division, give the answer to the same number of s.f. as the least precise value used.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Vernier calipers read to two decimal places in centimetres (0.01 cm). The micrometer reads to two decimal places in millimetres (0.01 mm).",
    "Correct for zero error by subtracting it with its sign. A negative zero error is added.",
    "Read a water meniscus from the bottom of the curve with your eye level with it.",
    "The spring balance measures weight in newtons. The beam balance compares masses and gives the same answer on the Moon.",
    "Reaction time is a random error. Timing 20 oscillations instead of 1 reduces its effect on each period.",
    "A systematic error is not reduced by averaging. A random error is.",
    "Accuracy and precision are different. Results can agree with each other (precise) and still be wrong (inaccurate).",
    "Zeros after a decimal point are significant: 2.50 has three s.f. but 0.0025 has two.",
    "Use the ratchet on a micrometer. Tightening it by hand can damage the object and the instrument.",
  ],
  summary:
    "The right instrument depends on the size of the object and the accuracy needed. Metre rules read to 0.1 cm, vernier calipers to 0.01 cm and micrometer screw gauges to 0.01 mm, with zero error corrected by subtracting it with its sign. Volume is measured with a measuring cylinder, or found by displacement for irregular solids. Mass is measured with a balance in kilograms, and weight with a spring balance in newtons. Time is best measured by timing many oscillations. Systematic, random and parallax errors affect results, and significant figures show the precision of a value.",
  quick: {
    intro: "Week 4 revision sheet. Practise reading the scales and correcting for zero error.",
    blocks: [
      {
        heading: "1. Length",
        points: [
          "Metre rule: 0.1 cm. Vernier calipers: 0.01 cm. Micrometer: 0.01 mm.",
          "Vernier: main scale reading + (coinciding division × 0.01 cm).",
          "Micrometer: sleeve reading + (thimble division × 0.01 mm). One turn = 0.5 mm; 50 divisions.",
          "True reading = observed reading − zero error (with its sign).",
        ],
      },
      {
        heading: "2. Volume, mass, weight, time",
        points: [
          "Regular solid: calculate. Irregular solid: displacement of water (V₂ − V₁), or Eureka can.",
          "Mass (kg): beam/electronic balance, never changes. Weight (N): spring balance, W = mg.",
          "Time: stopwatch; time 20 oscillations and divide to find the period.",
        ],
      },
      {
        heading: "3. Errors",
        points: [
          "Systematic: zero error, faulty calibration; correct it.",
          "Random: reaction time, judgement; repeat and average.",
          "Parallax: eye not in line with the mark; look straight at it.",
          "Accuracy = closeness to true value; precision = closeness of readings to each other.",
        ],
        warning: "Averaging does not remove a systematic error.",
      },
      {
        heading: "4. Significant figures",
        points: [
          "Non-zero digits and zeros between them count. Leading zeros do not. Trailing zeros after a decimal point count.",
          "0.004050 has 4 s.f.; 2.50 has 3 s.f.",
          "Round up if the next digit is 5 or more.",
        ],
      },
    ],
    likely: [
      { question: "State the least count of a metre rule, vernier calipers and micrometer screw gauge.", answer: "Metre rule 0.1 cm (1 mm); vernier calipers 0.01 cm (0.1 mm); micrometer screw gauge 0.01 mm." },
      { question: "A vernier caliper has main scale reading 2.6 cm and the 4th vernier division coincides. What is the reading?", answer: "2.6 + 4 × 0.01 = 2.64 cm." },
      { question: "What is zero error and how is it corrected?", answer: "It is the reading shown when the instrument should read zero. Subtract it (with its sign) from every observed reading." },
      { question: "How do you find the volume of an irregular stone?", answer: "Use a part-filled measuring cylinder, note the water level before and after lowering the stone on a thread; the difference is the volume. Or use a Eureka can and collect the displaced water." },
      { question: "State three differences between mass and weight.", answer: "Mass is the quantity of matter, weight is the pull of gravity; mass is in kg and weight in N; mass is a scalar and weight a vector; mass is constant but weight varies with g; mass uses a balance, weight a spring balance." },
      { question: "What is parallax error and how can it be reduced?", answer: "An error from viewing a mark at a slant. Put the eye directly in front of the mark, at right angles to the scale." },
      { question: "Why should a pendulum be timed for many oscillations?", answer: "The reaction-time error is shared among many swings, so the error in one period is small." },
      { question: "Give the number of significant figures in 0.0306.", answer: "Three (3, 0, 6)." },
      { question: "Distinguish between systematic and random errors.", answer: "Systematic errors are in one direction every time and need correcting. Random errors vary unpredictably and can be reduced by averaging." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The most suitable instrument for measuring the diameter of a thin copper wire is the", options: ["metre rule", "vernier calipers", "micrometer screw gauge", "measuring tape"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "The accuracy (least count) of a vernier calipers is", options: ["0.1 cm", "0.01 cm", "0.001 cm", "1 cm"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "A vernier calipers has a main scale reading of 4.2 cm and the 6th division on the vernier scale coincides with a main-scale division. The reading is", options: ["4.62 cm", "4.20 cm", "4.60 cm", "4.26 cm"], answer: "D", explanation: "Reading = 4.2 + 6 × 0.01 = 4.26 cm." },
    { number: 4, kind: "Objective", prompt: "A micrometer screw gauge shows a sleeve reading of 3.5 mm and a thimble reading of 17. The measurement is", options: ["3.67 mm", "3.17 mm", "3.50 mm", "20.5 mm"], answer: "A", explanation: "3.5 + 17 × 0.01 = 3.67 mm." },
    { number: 5, kind: "Objective", prompt: "A vernier calipers reads +0.02 cm when its jaws are closed. A rod gives a reading of 3.45 cm. The correct length is", options: ["3.43 cm", "3.47 cm", "3.45 cm", "3.65 cm"], answer: "A", explanation: "Subtract the zero error: 3.45 − 0.02 = 3.43 cm." },
    { number: 6, kind: "Objective", prompt: "A micrometer screw gauge reads −0.03 mm when closed. It reads 2.41 mm on a wire. The correct diameter is", options: ["2.38 mm", "2.41 mm", "2.44 mm", "2.71 mm"], answer: "C", explanation: "True reading = 2.41 − (−0.03) = 2.44 mm." },
    { number: 7, kind: "Objective", prompt: "Which instrument is used to measure the weight of an object directly?", options: ["Spring balance", "Beam balance", "Stopwatch", "Measuring cylinder"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "When reading a measuring cylinder holding water, the eye should be", options: ["above the water surface", "level with the bottom of the meniscus", "below the water surface", "at any angle that is comfortable"], answer: "B" },
    { number: 9, kind: "Objective", prompt: "A stone is lowered into a measuring cylinder. The water level rises from 40 cm³ to 52 cm³. The volume of the stone is", options: ["92 cm³", "52 cm³", "40 cm³", "12 cm³"], answer: "D" },
    { number: 10, kind: "Objective", prompt: "Which statement about mass is correct?", options: ["It is measured with a spring balance.", "It varies from place to place.", "Its SI unit is the kilogram.", "It is a vector quantity."], answer: "C" },
    { number: 11, kind: "Objective", prompt: "The error caused by a student’s reaction time in starting a stopwatch is a", options: ["systematic error", "random error", "zero error", "calibration error"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "The number of significant figures in 0.004050 is", options: ["2", "3", "5", "4"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "To find the period of a simple pendulum accurately, a student should", options: ["time one oscillation carefully", "time half an oscillation and double it", "time 20 oscillations and divide the time by 20", "time 20 oscillations and multiply the time by 20"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "5.0472 rounded to three significant figures is", options: ["5.05", "5.04", "5.047", "5.1"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Describe how you would measure the diameter of a metal wire with a micrometer screw gauge, including how you would deal with zero error.", answer: "Close the jaws with the ratchet and note the reading, which is the zero error. Place the wire between the jaws and turn the thimble using the ratchet only until it clicks. Read the sleeve (to the nearest half-millimetre) and add the thimble division in line with the datum line multiplied by 0.01 mm. Subtract the zero error with its sign. Repeat at different places along the wire and at right angles, then find the average." },
    { number: 16, kind: "Theory", prompt: "A vernier calipers has a main scale reading of 5.3 cm, with the 8th vernier division coinciding with a main-scale division. When the jaws are closed it reads −0.02 cm. Find the correct length.", answer: "Observed reading = 5.3 + 8 × 0.01 = 5.38 cm. Zero error = −0.02 cm. Correct length = 5.38 − (−0.02) = 5.40 cm." },
    { number: 17, kind: "Theory", prompt: "(a) State four differences between mass and weight. (b) A man has a mass of 60 kg. Find his weight on Earth (g = 10 N/kg) and on the Moon (g = 1.6 N/kg).", answer: "(a) Mass is the quantity of matter, weight is the force of gravity on a body; mass is in kilograms and weight in newtons; mass is a scalar and weight a vector; mass is the same everywhere but weight depends on g; mass is measured with a balance and weight with a spring balance. (b) On Earth W = 60 × 10 = 600 N. On the Moon W = 60 × 1.6 = 96 N." },
    { number: 18, kind: "Theory", prompt: "Distinguish between systematic and random errors. Give two examples of each and state how each type can be reduced.", answer: "Systematic errors affect all readings in the same direction, for example zero error and a wrongly calibrated scale; they are reduced by correcting for them or recalibrating. Random errors vary unpredictably from reading to reading, for example reaction time and reading a pointer between marks; they are reduced by repeating readings and averaging." },
    { number: 19, kind: "Theory", prompt: "Describe how to find the density of an irregular stone using a balance and a measuring cylinder. In one experiment the water level rose from 55 cm³ to 79 cm³ and the stone had a mass of 62.4 g. Calculate its density.", answer: "Measure the mass of the stone on the balance. Part-fill a measuring cylinder with water and read V₁, lower the stone on a thread, read V₂, and subtract to get the volume. Density = mass ÷ volume. Here volume = 79 − 55 = 24 cm³ and density = 62.4 ÷ 24 = 2.6 g/cm³." },
    { number: 20, kind: "Theory", prompt: "A pupil measures 20 oscillations of a pendulum as 36.4 s. (a) Find the period. (b) Explain why timing 20 oscillations is better than timing one. (c) How many significant figures are in 36.4 s?", answer: "(a) Period = 36.4 ÷ 20 = 1.82 s. (b) The reaction-time error of about 0.2 s is the same whether one or twenty swings are timed, but when 20 are timed it is divided among 20 swings, so the error in one period is only about 0.01 s instead of 0.2 s. (c) Three." },
  ] as PracticeQuestion[],
};
