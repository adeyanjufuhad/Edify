import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek3: Lesson = {
  id: "ss1-first-physics-week-3",
  week: "Week 03",
  title: "Position, distance and displacement",
  subtitle: "Learn how to say exactly where something is, the difference between how far it travelled and how far it ended up from its start, and the idea of scalars and vectors.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Describe the position of an object using a reference point and coordinates.",
    "Give directions using three-figure bearings and compass bearings.",
    "Distinguish between distance and displacement and calculate both.",
    "Distinguish between scalar and vector quantities and give examples of each.",
    "Add two vectors that act along the same line or at right angles.",
  ],
  sections: [
    {
      heading: "1. Position and frame of reference",
      paragraphs: [
        "If you tell a friend, ‘Meet me 50 metres away,’ she will not know where to go. You must also say from where and in which direction. The position of an object is its location compared with a chosen reference point, called the origin. The origin together with a way of measuring distances and directions from it is called a frame of reference.",
        "On a straight road we can use one number line: the school gate is the origin (0), points to the east are positive and points to the west are negative. On a flat surface we use two axes, x (horizontal) and y (vertical), and give a position as a pair of coordinates (x, y). The point (3, 2) is 3 units right and 2 units up from the origin. In space we need three axes, x, y and z.",
        "The straight-line distance d between two points (x₁, y₁) and (x₂, y₂) is found with Pythagoras’ theorem: d = √[(x₂ − x₁)² + (y₂ − y₁)²]. For example, the distance between (1, 2) and (5, 5) is √(4² + 3²) = √25 = 5 units.",
      ],
      diagram: "Draw x and y axes from −5 to 5. Mark the points A(1, 2), B(5, 5) and C(−3, −1). Join A to B with a straight line and draw the right-angled triangle that shows the horizontal and vertical steps.",
    },
    {
      heading: "2. Giving direction: bearings",
      paragraphs: [
        "A bearing tells you the direction of one place from another. The three-figure bearing is the angle measured clockwise from the north line at the starting point, always written with three digits. North is 000°, east is 090°, south is 180° and west is 270°. A bearing of 045° points north-east. In compass bearing, the angle is measured from north or south towards east or west; 045° is written N45°E, and 210° is written S30°W.",
        "To find the back bearing, which is the direction of the return journey, add 180° to a bearing smaller than 180°, or subtract 180° from a bearing larger than 180°. The back bearing of 050° is 230°, and the back bearing of 300° is 120°.",
      ],
      diagram: "Draw a north arrow at point A and a second point B to the north-east. Mark the angle between the north line and AB, measured clockwise, and write ‘bearing of B from A = 045°’.",
    },
    {
      heading: "3. Distance",
      paragraphs: [
        "Distance is the total length of the path an object travels. It tells you how far you have gone, not which way. Distance is never negative and it keeps growing as long as the object moves, even if the object turns back. The SI unit is the metre (m); the odometer of a car records distance travelled in kilometres.",
        "Suppose Ngozi walks from the school gate 60 m east to the library, then 20 m back west to the canteen. The distance she has travelled is 60 + 20 = 80 m.",
      ],
    },
    {
      heading: "4. Displacement",
      paragraphs: [
        "Displacement is the change in position of an object. It is the shortest straight-line distance from the starting point to the finishing point, together with the direction from the start to the finish. The SI unit is also the metre, but a full statement needs a direction, such as ‘40 m north’ or ‘60 m on a bearing of 070°’.",
        "In Ngozi’s journey the canteen is 40 m east of the gate, so her displacement is 40 m east, although she walked 80 m. If she walks 40 m north and then 30 m east, the distance is 70 m, but the displacement is the hypotenuse of a right-angled triangle: √(40² + 30²) = 50 m. Its bearing is tan⁻¹(30 ÷ 40) ≈ 37°, so the displacement is 50 m on a bearing of 037°.",
        "Displacement can be zero, or negative if you choose a direction to be positive. When a runner completes one lap of a 400 m track, the distance is 400 m, but the displacement is zero because she ends where she began. Displacement can never be greater than distance; the two are equal only when the object moves in a straight line without turning back.",
      ],
      points: [
        "Distance: scalar, total path length, always positive, no direction.",
        "Displacement: vector, change in position, can be zero or negative, needs a direction.",
        "Distance ≥ magnitude of displacement.",
      ],
    },
    {
      heading: "5. Scalars and vectors",
      paragraphs: [
        "A scalar quantity has size (magnitude) only. Examples are distance, speed, mass, time, temperature, density, volume and energy. A vector quantity has both magnitude and direction. Examples are displacement, velocity, acceleration, force, weight and momentum. To describe a vector you must give its direction; ‘a force of 20 N’ is incomplete, but ‘a force of 20 N upwards’ is complete.",
        "We draw a vector as an arrow whose length is proportional to its magnitude and whose arrowhead shows the direction. Scalars are added by ordinary arithmetic: 5 kg plus 3 kg is 8 kg. Vectors must be added with their directions in mind. When two vectors act along the same line in the same direction, add the magnitudes: 5 N and 3 N give a resultant of 8 N. When they act in opposite directions, subtract: 5 N and 3 N give 2 N in the direction of the larger. When they act at right angles, use Pythagoras: 3 N and 4 N give √(9 + 16) = 5 N.",
      ],
      points: [
        "Scalars: distance, speed, mass, time, temperature, energy, volume, density.",
        "Vectors: displacement, velocity, acceleration, force, weight, momentum.",
        "The sum of two vectors is called their resultant.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Distance is a scalar and displacement is a vector. If the question says ‘how far from the starting point’, it wants displacement.",
    "In a complete round trip the displacement is zero, but the distance is not.",
    "Displacement is never larger than distance for the same journey.",
    "A three-figure bearing is measured clockwise from north and has three digits: write 045°, not 45°.",
    "To get a back bearing, add or subtract 180°.",
    "Weight is a vector (it is a force), but mass is a scalar. Do not mix them up.",
    "Pythagoras’ theorem adds vectors that are at right angles. It does not work for ordinary scalars.",
    "A negative sign on a displacement shows direction only. It does not mean a smaller quantity.",
  ],
  summary:
    "The position of an object is given relative to a reference point using a number line, or x and y coordinates. Bearings measured clockwise from north describe direction. Distance is the total path length and is a scalar. Displacement is the straight-line change in position with direction and is a vector. Scalars have magnitude only; vectors have magnitude and direction and are added with their directions in mind: along a line by adding or subtracting, and at right angles by Pythagoras’ theorem.",
  quick: {
    intro: "Week 3 revision sheet. Be ready to find both distance and displacement for the same journey.",
    blocks: [
      {
        heading: "1. Position and bearings",
        points: [
          "Position: where an object is relative to a reference point (origin).",
          "Coordinates: (x, y) in a plane; d = √[(x₂ − x₁)² + (y₂ − y₁)²].",
          "Bearing: clockwise from north, three figures. N 000°, E 090°, S 180°, W 270°.",
          "Back bearing = bearing ± 180°.",
        ],
      },
      {
        heading: "2. Distance and displacement",
        points: [
          "Distance: total path length, scalar, always positive.",
          "Displacement: straight line from start to finish with direction, vector.",
          "Round trip: displacement = 0.",
          "Displacement ≤ distance.",
        ],
        memory: "Distance = ‘how much ground covered’; displacement = ‘how far out of place’.",
      },
      {
        heading: "3. Scalars and vectors",
        points: [
          "Scalar: magnitude only. Vector: magnitude and direction.",
          "Same line, same direction: add. Opposite directions: subtract.",
          "Right angles: resultant = √(a² + b²).",
        ],
        warning: "Always give the direction when stating a vector.",
      },
    ],
    likely: [
      { question: "Define position.", answer: "The position of an object is its location relative to a chosen reference point." },
      { question: "Differentiate between distance and displacement.", answer: "Distance is the total length of the path travelled and is a scalar. Displacement is the shortest straight-line change in position with direction and is a vector." },
      { question: "Give three examples each of scalars and vectors.", answer: "Scalars: distance, speed, mass. Vectors: displacement, velocity, force." },
      { question: "A girl walks 30 m north then 40 m east. Find the distance and the displacement.", answer: "Distance 70 m; displacement √(30² + 40²) = 50 m." },
      { question: "State the displacement of a runner who completes one lap of a track.", answer: "Zero, because she finishes at the starting point." },
      { question: "What is the back bearing of 070°?", answer: "070° + 180° = 250°." },
      { question: "Find the resultant of two forces of 5 N and 12 N acting at right angles.", answer: "√(5² + 12²) = 13 N." },
      { question: "Why is the statement ‘the force is 20 N’ incomplete?", answer: "Force is a vector, so its direction must also be stated." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The position of an object is described by giving", options: ["its speed only", "its mass and size", "its distance and direction from a reference point", "the time it has spent moving"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "A scalar quantity has", options: ["direction only", "magnitude only", "both magnitude and direction", "neither magnitude nor direction"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Which of these is a vector quantity?", options: ["Mass", "Time", "Distance", "Displacement"], answer: "D" },
    { number: 4, kind: "Objective", prompt: "A boy walks 8 m east and then 6 m north. His displacement from the start is", options: ["10 m", "14 m", "2 m", "48 m"], answer: "A", explanation: "Displacement = √(8² + 6²) = √100 = 10 m." },
    { number: 5, kind: "Objective", prompt: "For the boy in the last question, the distance he travelled is", options: ["10 m", "2 m", "14 m", "48 m"], answer: "C", explanation: "Distance = 8 + 6 = 14 m." },
    { number: 6, kind: "Objective", prompt: "A runner completes one lap of a circular track of length 400 m. Her displacement is", options: ["200 m", "400 m", "800 m", "zero"], answer: "D" },
    { number: 7, kind: "Objective", prompt: "The three-figure bearing of due east is", options: ["000°", "090°", "180°", "270°"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The back bearing of 050° is", options: ["040°", "130°", "310°", "230°"], answer: "D", explanation: "Add 180°: 050° + 180° = 230°." },
    { number: 9, kind: "Objective", prompt: "The distance between the points (1, 2) and (4, 6) is", options: ["5 units", "7 units", "25 units", "3 units"], answer: "A", explanation: "d = √(3² + 4²) = 5." },
    { number: 10, kind: "Objective", prompt: "Which statement about displacement and distance for the same journey is true?", options: ["Displacement is always greater than distance.", "They are always equal.", "Displacement is never greater than distance.", "Distance can be negative."], answer: "C" },
    { number: 11, kind: "Objective", prompt: "Two forces of 6 N and 8 N act at right angles to each other on a body. Their resultant is", options: ["14 N", "10 N", "2 N", "48 N"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "Two displacements of 5 m and 3 m act in opposite directions along the same line. The magnitude of the resultant is", options: ["15 m", "8 m", "4 m", "2 m"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Which of the following is a scalar quantity?", options: ["Weight", "Velocity", "Temperature", "Force"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "A student walks 30 m due north and then 30 m due south. Her total distance and her displacement are", options: ["60 m and 0", "0 and 60 m", "60 m and 60 m", "0 and 0"], answer: "A" },
    { number: 15, kind: "Theory", prompt: "Define (a) position, (b) distance and (c) displacement, and state two differences between distance and displacement.", answer: "(a) Position is the location of an object relative to a reference point. (b) Distance is the total length of the path travelled. (c) Displacement is the change in position: the straight-line distance from start to finish in a stated direction. Differences: distance is a scalar and displacement is a vector; distance is always positive but displacement can be zero or negative; displacement is never greater than distance." },
    { number: 16, kind: "Theory", prompt: "A pupil walks 40 m north and then 30 m east. Calculate (a) the distance travelled, (b) the magnitude of her displacement and (c) the bearing of her final position from the start.", answer: "(a) Distance = 40 + 30 = 70 m. (b) Displacement = √(40² + 30²) = √2500 = 50 m. (c) The angle from north is tan⁻¹(30 ÷ 40) = 36.9°, so the bearing is about 037°." },
    { number: 17, kind: "Theory", prompt: "Find the distance between the points P(−3, −1) and Q(2, 11).", answer: "The horizontal difference is 2 − (−3) = 5 and the vertical difference is 11 − (−1) = 12. Distance = √(5² + 12²) = √169 = 13 units." },
    { number: 18, kind: "Theory", prompt: "Distinguish between scalar and vector quantities and give three examples of each.", answer: "A scalar has magnitude only and is added by ordinary arithmetic; examples are distance, speed, mass, time and temperature. A vector has magnitude and direction and is added by taking direction into account; examples are displacement, velocity, acceleration, force and weight." },
    { number: 19, kind: "Theory", prompt: "A taxi driver goes 12 km east from A to B and then 5 km north from B to C. State the distance travelled and the magnitude and bearing of the displacement of C from A.", answer: "Distance = 12 + 5 = 17 km. Displacement = √(12² + 5²) = 13 km. The angle from north is tan⁻¹(12 ÷ 5) = 67.4°, so the bearing is about 067°." },
    { number: 20, kind: "Theory", prompt: "Explain, with an example, how the displacement of an object can be zero even though the distance it has travelled is large.", answer: "Displacement depends only on the start and finish positions. If the object ends where it began, the displacement is zero whatever the path. Example: a runner who completes two laps of a 400 m track has travelled 800 m but has returned to the start, so her displacement is zero." },
  ] as PracticeQuestion[],
};
