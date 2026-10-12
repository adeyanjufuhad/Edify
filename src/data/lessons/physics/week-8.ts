import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek8: Lesson = {
  id: "ss1-first-physics-week-8",
  week: "Week 08",
  title: "Equations of uniformly accelerated motion",
  subtitle: "Derive the four equations of motion for constant acceleration in a straight line, choose the right one for a problem, and apply them to braking cars and objects falling under gravity.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "State the meaning of the symbols u, v, a, s and t and the conditions under which the equations apply.",
    "Derive v = u + at, s = ½(u + v)t, s = ut + ½at² and v² = u² + 2as.",
    "Choose the correct equation for a problem from the quantities given and missing.",
    "Solve problems on starting, braking and uniformly accelerated vehicles.",
    "Apply the equations to bodies falling freely or thrown upwards, using g = 10 m/s².",
  ],
  sections: [
    {
      heading: "1. Uniform acceleration and the symbols",
      paragraphs: [
        "When a body moves in a straight line and its velocity changes by equal amounts in equal times, it has uniform (constant) acceleration. The equations of motion link five quantities: u is the initial velocity, v the final velocity, a the acceleration, s the displacement and t the time. They are true only for motion in a straight line with constant acceleration, not for a car whose acceleration keeps changing.",
        "Choose one direction as positive, usually the direction of motion. A quantity in the opposite direction is negative. So when a car is slowing down, a is negative; this is retardation.",
      ],
    },
    {
      heading: "2. Deriving the equations",
      paragraphs: [
        "First equation. By definition, a = (v − u) ÷ t. Multiplying both sides by t gives at = v − u, so v = u + at. (1)",
        "Second equation. With uniform acceleration the average velocity is (u + v) ÷ 2, and displacement is average velocity multiplied by time, so s = ½(u + v)t. (2)",
        "Third equation. Replace v in equation (2) with u + at from equation (1): s = ½(u + u + at)t = ½(2u + at)t, which gives s = ut + ½at². (3)",
        "Fourth equation. From equation (1), t = (v − u) ÷ a. Put this into equation (2): s = ½(u + v)(v − u) ÷ a = (v² − u²) ÷ 2a. Rearranging gives v² = u² + 2as. (4)",
      ],
      points: [
        "v = u + at (no s).",
        "s = ½(u + v)t (no a).",
        "s = ut + ½at² (no v).",
        "v² = u² + 2as (no t).",
      ],
    },
    {
      heading: "3. Choosing the right equation",
      paragraphs: [
        "List the values you are given and the one you must find. Notice which of the five quantities is neither given nor wanted. That is the quantity the correct equation does not contain. If time is not involved, use v² = u² + 2as. If the final velocity is not involved, use s = ut + ½at². If the acceleration is not involved, use s = ½(u + v)t. If the distance is not involved, use v = u + at.",
        "Remember the hidden values in the wording: ‘starts from rest’ means u = 0; ‘comes to rest’ or ‘stops’ means v = 0; ‘constant speed’ means a = 0.",
      ],
    },
    {
      heading: "4. Worked examples",
      paragraphs: [
        "Example 1. A bus starts from rest and accelerates at 2.5 m/s². Find its velocity and the distance covered after 8 s. Here u = 0, a = 2.5, t = 8. v = u + at = 0 + 2.5 × 8 = 20 m/s. s = ut + ½at² = 0 + ½ × 2.5 × 64 = 80 m.",
        "Example 2. A lorry travelling at 30 m/s brakes with a retardation of 6 m/s². Find its stopping distance and stopping time. Here u = 30, v = 0, a = −6. Using v² = u² + 2as: 0 = 900 − 12s, so s = 75 m. Using v = u + at: 0 = 30 − 6t, so t = 5 s.",
        "Example 3. A tricycle increases its speed from 5 m/s to 15 m/s over a distance of 100 m. Find its acceleration and the time taken. Here u = 5, v = 15, s = 100. v² = u² + 2as gives 225 = 25 + 200a, so a = 1 m/s². Then t = (15 − 5) ÷ 1 = 10 s. As a check, s = ½(5 + 15) × 10 = 100 m.",
      ],
    },
    {
      heading: "5. Motion under gravity: free fall",
      paragraphs: [
        "Near the Earth’s surface, every body that is free to fall accelerates downwards at the same rate if air resistance is ignored. This acceleration due to gravity is written g. Its value is about 9.8 m/s², and in most school problems we take g = 10 m/s². A heavy stone and a light stone released together from the same height reach the ground at the same time. A feather falls more slowly only because of air resistance; in a vacuum a feather and a coin fall together.",
        "The same four equations apply with a replaced by g (or by −g, depending on your sign convention) and s replaced by the height h. If upward is taken as positive, then a = −10 m/s² for a body moving up or down. For a body released from rest, u = 0. For a body thrown upwards, v = 0 at the highest point.",
        "Example 4. A stone is dropped from the top of a cliff and hits the ground after 4 s. Taking downward as positive: h = ½gt² = ½ × 10 × 16 = 80 m; v = gt = 10 × 4 = 40 m/s.",
        "Example 5. A ball is thrown upwards at 20 m/s. Taking upward as positive, a = −10 m/s². At the top v = 0, so the time to reach the top is t = (0 − 20) ÷ (−10) = 2 s. The maximum height is H = u² ÷ 2g = 400 ÷ 20 = 20 m. The ball takes the same time to fall back, so the total time in the air is 4 s, and it returns to the thrower’s hand with the same speed of 20 m/s, now downwards.",
      ],
      points: [
        "At the top of the flight v = 0, but a is still 10 m/s² downwards.",
        "Time up = time down (when it lands at the same level).",
        "Maximum height H = u² ÷ 2g; total time of flight = 2u ÷ g.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The equations only work for constant acceleration along a straight line. They fail if the acceleration changes.",
    "‘Starts from rest’ means u = 0; ‘stops’ means v = 0. These hidden values are given in words, not numbers.",
    "Use the equation that leaves out the quantity you are not given and do not need. Do not waste time on two-step methods.",
    "Convert km/h to m/s before substituting. A common loss of marks is to use 72 instead of 20.",
    "At the top of its flight the velocity of a thrown ball is zero, but its acceleration is not zero.",
    "Ignoring air resistance, a heavy and a light object fall together. Say ‘air resistance’ when explaining why a feather is slow.",
    "Distance fallen in n seconds is not the distance fallen in the nth second. In the 3rd second a dropped stone falls 45 − 20 = 25 m, not 45 m.",
    "Retardation is a negative a. When braking, put a as a negative number or write v = u − at.",
  ],
  summary:
    "For constant acceleration in a straight line, v = u + at, s = ½(u + v)t, s = ut + ½at² and v² = u² + 2as. Choose the equation that contains the three known quantities and the one wanted. Words such as ‘from rest’ and ‘stops’ give u = 0 and v = 0. In free fall, a = g ≈ 10 m/s² and the same equations are used with h in place of s. A thrown ball has zero velocity at the top, takes equal times to rise and fall, and returns with its launch speed.",
  quick: {
    intro: "Week 8 revision sheet. Learn the four equations and the steps for choosing one.",
    blocks: [
      {
        heading: "1. The four equations",
        points: [
          "v = u + at.",
          "s = ½(u + v)t.",
          "s = ut + ½at².",
          "v² = u² + 2as.",
        ],
        memory: "Missing quantity: s, a, v, t (in that order) for the four equations above.",
      },
      {
        heading: "2. Method",
        points: [
          "List u, v, a, s, t: mark which are known and which is wanted.",
          "‘From rest’: u = 0. ‘Stops’: v = 0. ‘Constant speed’: a = 0.",
          "Convert units to SI; put a negative for retardation.",
        ],
      },
      {
        heading: "3. Free fall (g = 10 m/s²)",
        points: [
          "Dropped: u = 0, h = ½gt², v = gt, v² = 2gh.",
          "Thrown up: H = u² ÷ 2g; time up = u ÷ g; time of flight = 2u ÷ g.",
          "At the top v = 0 but a = g downwards.",
          "Heavy and light bodies fall together when air resistance is ignored.",
        ],
        warning: "Distance in the nth second is not the distance in n seconds.",
      },
    ],
    likely: [
      { question: "State the four equations of uniformly accelerated motion.", answer: "v = u + at; s = ½(u + v)t; s = ut + ½at²; v² = u² + 2as." },
      { question: "Derive v² = u² + 2as.", answer: "From v = u + at, t = (v − u) ÷ a. Put it in s = ½(u + v)t: s = (v² − u²) ÷ 2a, so v² = u² + 2as." },
      { question: "A car starts from rest and reaches 20 m/s in 8 s. Find its acceleration and the distance covered.", answer: "a = 20 ÷ 8 = 2.5 m/s²; s = ½ × 20 × 8 = 80 m." },
      { question: "A cyclist moving at 12 m/s brakes to a stop in 6 s. Find the braking distance.", answer: "s = ½ × (12 + 0) × 6 = 36 m." },
      { question: "A stone is dropped from a 45 m high building. Find the time of fall and speed on landing (g = 10 m/s²).", answer: "t = √(2h ÷ g) = √9 = 3 s; v = gt = 30 m/s." },
      { question: "A ball is thrown vertically up at 30 m/s. Find the maximum height.", answer: "H = u² ÷ 2g = 900 ÷ 20 = 45 m." },
      { question: "Why do a feather and a coin fall at different rates in air but together in a vacuum?", answer: "Air resistance affects the light feather far more; with no air both have the same acceleration g." },
      { question: "What is the velocity and acceleration of a ball at the top of its flight?", answer: "Velocity is zero; acceleration is g (10 m/s²) downwards." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which equation of motion does NOT contain time?", options: ["v = u + at", "s = ½(u + v)t", "s = ut + ½at²", "v² = u² + 2as"], answer: "D" },
    { number: 2, kind: "Objective", prompt: "A car starts from rest and accelerates uniformly at 4 m/s². Its velocity after 6 s is", options: ["10 m/s", "24 m/s", "1.5 m/s", "0.67 m/s"], answer: "B", explanation: "v = u + at = 0 + 4 × 6 = 24 m/s." },
    { number: 3, kind: "Objective", prompt: "A body with initial velocity 5 m/s accelerates at 2 m/s² for 4 s. The distance covered is", options: ["20 m", "28 m", "36 m", "52 m"], answer: "C", explanation: "s = ut + ½at² = 5 × 4 + ½ × 2 × 16 = 20 + 16 = 36 m." },
    { number: 4, kind: "Objective", prompt: "A car travelling at 20 m/s brakes and stops with a retardation of 5 m/s². The braking distance is", options: ["40 m", "80 m", "4 m", "20 m"], answer: "A", explanation: "v² = u² + 2as gives 0 = 400 − 10s, so s = 40 m." },
    { number: 5, kind: "Objective", prompt: "A body starts from rest and covers 200 m in 10 s with uniform acceleration. The acceleration is", options: ["2 m/s²", "8 m/s²", "20 m/s²", "4 m/s²"], answer: "D", explanation: "s = ½at², so 200 = ½ × a × 100 and a = 4 m/s²." },
    { number: 6, kind: "Objective", prompt: "A tricycle increases its speed from 10 m/s to 20 m/s over a distance of 75 m. Its acceleration is", options: ["1 m/s²", "2 m/s²", "4 m/s²", "6 m/s²"], answer: "B", explanation: "400 = 100 + 2 × a × 75, so a = 300 ÷ 150 = 2 m/s²." },
    { number: 7, kind: "Objective", prompt: "A stone dropped from a tower takes 5 s to reach the ground. The height of the tower is (g = 10 m/s²)", options: ["125 m", "250 m", "50 m", "25 m"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "A ball is thrown vertically upwards at 30 m/s. The maximum height reached is (g = 10 m/s²)", options: ["30 m", "60 m", "45 m", "90 m"], answer: "C" },
    { number: 9, kind: "Objective", prompt: "The ball in the last question returns to the thrower’s hand after", options: ["3 s", "4.5 s", "9 s", "6 s"], answer: "D", explanation: "Time up = 30 ÷ 10 = 3 s and time down is also 3 s, so the total is 6 s." },
    { number: 10, kind: "Objective", prompt: "A stone is dropped from a height of 80 m. Its speed just before hitting the ground is (g = 10 m/s²)", options: ["20 m/s", "40 m/s", "80 m/s", "160 m/s"], answer: "B" },
    { number: 11, kind: "Objective", prompt: "A body’s velocity changes uniformly from 4 m/s to 12 m/s in 5 s. The distance covered is", options: ["20 m", "80 m", "40 m", "8 m"], answer: "C", explanation: "s = ½(u + v)t = ½ × 16 × 5 = 40 m." },
    { number: 12, kind: "Objective", prompt: "Which statement about free fall is correct, if air resistance is ignored?", options: ["All bodies fall with the same acceleration.", "Heavier bodies fall faster than lighter ones.", "The acceleration of a rising body is upwards.", "The acceleration is zero at the top of the flight."], answer: "A" },
    { number: 13, kind: "Objective", prompt: "At the highest point of its flight, a ball thrown upwards has", options: ["zero velocity and zero acceleration", "a velocity of 10 m/s upwards and zero acceleration", "a velocity of 10 m/s downwards and zero acceleration", "zero velocity and an acceleration of 10 m/s² downwards"], answer: "D" },
    { number: 14, kind: "Objective", prompt: "A stone is thrown upwards at 20 m/s. The time taken to reach the highest point is (g = 10 m/s²)", options: ["1 s", "2 s", "4 s", "20 s"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Starting from the definition of acceleration, derive the equations v = u + at and s = ut + ½at² for a body moving with uniform acceleration.", answer: "By definition a = (v − u) ÷ t, so v = u + at. The average velocity is (u + v) ÷ 2, so the displacement s = ½(u + v)t. Substituting v = u + at gives s = ½(2u + at)t = ut + ½at²." },
    { number: 16, kind: "Theory", prompt: "A car starts from rest and accelerates uniformly at 3 m/s² for 10 s. It then moves at constant velocity for 20 s. Calculate (a) its velocity after 10 s, (b) the distance covered in the first 10 s and (c) the total distance covered.", answer: "(a) v = u + at = 0 + 3 × 10 = 30 m/s. (b) s = ½at² = ½ × 3 × 100 = 150 m. (c) At constant velocity, distance = 30 × 20 = 600 m. Total = 150 + 600 = 750 m." },
    { number: 17, kind: "Theory", prompt: "A cyclist moving at 12 m/s applies the brakes and stops in 6 s. Calculate the retardation and the distance covered while braking.", answer: "a = (v − u) ÷ t = (0 − 12) ÷ 6 = −2 m/s², so the retardation is 2 m/s². Distance = ½(u + v)t = ½ × 12 × 6 = 36 m." },
    { number: 18, kind: "Theory", prompt: "A stone is dropped from the top of a building and hits the ground 3 s later. Calculate the height of the building and the speed with which the stone hits the ground. (g = 10 m/s²)", answer: "h = ½gt² = ½ × 10 × 9 = 45 m. v = gt = 10 × 3 = 30 m/s." },
    { number: 19, kind: "Theory", prompt: "A ball is thrown vertically upwards at 25 m/s. Calculate (a) the time to reach the highest point, (b) the maximum height and (c) the total time in the air before it returns to the thrower’s hand. (g = 10 m/s²)", answer: "(a) t = u ÷ g = 25 ÷ 10 = 2.5 s. (b) H = u² ÷ 2g = 625 ÷ 20 = 31.25 m. (c) Time up equals time down, so the total time is 2 × 2.5 = 5 s." },
    { number: 20, kind: "Theory", prompt: "A pupil says that a heavy stone must reach the ground before a light stone dropped from the same height at the same time. Explain whether she is right, and why a feather falls more slowly than a stone in air.", answer: "She is wrong. If air resistance is negligible, all bodies fall with the same acceleration g, because the force of gravity on a body is proportional to its mass and so the extra mass cancels out. The two stones land together. A feather falls slowly because air resistance is large compared with its weight; in a vacuum the feather and the stone would fall together." },
  ] as PracticeQuestion[],
};
