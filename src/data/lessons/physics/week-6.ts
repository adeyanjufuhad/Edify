import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek6: Lesson = {
  id: "ss1-first-physics-week-6",
  week: "Week 06",
  title: "Speed, velocity and acceleration",
  subtitle: "Learn the difference between uniform and non-uniform motion, define speed, velocity and acceleration, and solve problems with the right units.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Distinguish between uniform and non-uniform motion.",
    "Define speed, velocity and acceleration and give their SI units.",
    "Calculate average speed, average velocity and acceleration.",
    "Explain retardation and the fact that a change of direction is also an acceleration.",
    "Solve numerical problems, converting units where necessary.",
  ],
  sections: [
    {
      heading: "1. Uniform and non-uniform motion",
      paragraphs: [
        "A body moves with uniform speed when it covers equal distances in equal intervals of time. A car that covers 20 m every second, second after second, is moving uniformly. If the distances covered in equal intervals of time are different, the motion is non-uniform. Most real journeys are non-uniform, because vehicles speed up, slow down and stop.",
      ],
    },
    {
      heading: "2. Speed",
      paragraphs: [
        "Speed is the distance covered per unit time. Speed = distance ÷ time, or v = s ÷ t. It is a scalar, with no direction. The SI unit is metre per second (m/s, written m s⁻¹). In everyday life we also use kilometre per hour (km/h). To change km/h to m/s, divide by 3.6; to change m/s to km/h, multiply by 3.6. So 90 km/h is 25 m/s.",
        "The speed calculated from the total distance and the total time is the average speed. Average speed = total distance ÷ total time. It is not the same as the average of the speeds. Suppose a minibus travels 60 km at 40 km/h and then another 60 km at 60 km/h. The times are 60 ÷ 40 = 1.5 h and 60 ÷ 60 = 1 h. The total distance is 120 km and the total time is 2.5 h, so the average speed is 120 ÷ 2.5 = 48 km/h, not 50 km/h. The reading on a car’s speedometer at one moment is the instantaneous speed.",
      ],
    },
    {
      heading: "3. Velocity",
      paragraphs: [
        "Velocity is the rate of change of displacement. Velocity = displacement ÷ time. It is a vector, so it has direction as well as size, and its unit is also m/s. A car moving at 20 m/s due north has a velocity of 20 m/s north. Velocity is uniform only if both the speed and the direction stay constant.",
        "Average velocity is the total displacement divided by the total time. A girl who runs 100 m east and then 100 m back west in 40 s has an average speed of 200 ÷ 40 = 5 m/s, but her average velocity is zero, because her displacement is zero. Speed is the size (magnitude) of velocity only when the motion is in a straight line without turning back.",
      ],
    },
    {
      heading: "4. Acceleration",
      paragraphs: [
        "Acceleration is the rate of change of velocity. Acceleration = change in velocity ÷ time taken, or a = (v − u) ÷ t, where u is the initial velocity and v is the final velocity. The SI unit is metre per second per second, written m/s² or m s⁻². An acceleration of 3 m/s² means the velocity increases by 3 m/s every second.",
        "If the velocity increases by equal amounts in equal times, the acceleration is uniform. If the velocity decreases, the change in velocity is negative, so the acceleration is negative. This is called retardation or deceleration. A car that slows from 30 m/s to rest in 6 s has a = (0 − 30) ÷ 6 = −5 m/s², that is, a retardation of 5 m/s². A body moving with uniform velocity has zero acceleration.",
        "Velocity is a vector, so the velocity changes if the direction changes even when the speed does not. A car going round a roundabout at a steady 10 m/s is accelerating, because its direction is always changing. Acceleration is also a vector.",
      ],
      points: [
        "Speed = distance ÷ time (scalar, m/s).",
        "Velocity = displacement ÷ time (vector, m/s).",
        "Acceleration = (v − u) ÷ t (vector, m/s²).",
        "Retardation: acceleration with a negative value, slowing a body down.",
      ],
    },
    {
      heading: "5. Average velocity in uniformly accelerated motion",
      paragraphs: [
        "When the acceleration is uniform, the average velocity is half of the sum of the starting and finishing velocities: average velocity = (u + v) ÷ 2. The distance travelled in a straight line is then average velocity × time. For example, a keke goes from 4 m/s to 16 m/s uniformly in 5 s. Its average velocity is (4 + 16) ÷ 2 = 10 m/s, so it covers 10 × 5 = 50 m in that time. The acceleration is (16 − 4) ÷ 5 = 2.4 m/s².",
      ],
    },
    {
      heading: "6. A method for solving problems",
      paragraphs: [
        "Write down what is given and what is wanted, with the units. Convert units so that they match: distances in metres, times in seconds, speeds in m/s. Choose the formula that links the quantities, substitute, calculate, and write the unit with the answer. Words like ‘starts from rest’ mean u = 0, and ‘comes to rest’ or ‘stops’ means v = 0.",
        "Example: A motorcycle starts from rest and reaches 18 m/s in 6 s. Its acceleration is (18 − 0) ÷ 6 = 3 m/s². Example: A runner covers 450 m in 90 s, so her average speed is 450 ÷ 90 = 5 m/s.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Average speed is total distance divided by total time. It is not the average of two speeds unless the times are equal.",
    "To change km/h to m/s divide by 3.6. To change m/s to km/h multiply by 3.6.",
    "Speed is a scalar, velocity is a vector. A runner who returns to the start has an average velocity of zero.",
    "Retardation is a positive number describing a negative acceleration. Never leave out the word ‘retardation’ or the minus sign when the question needs it.",
    "Constant speed does not mean constant velocity. Going round a bend at a steady speed is an acceleration.",
    "Zero velocity does not mean zero acceleration. A ball thrown up has zero velocity at the top, but its acceleration is still 10 m/s² downwards.",
    "‘Starts from rest’ means u = 0. ‘Comes to rest’ means v = 0.",
    "The unit of acceleration is m/s², not m/s.",
  ],
  summary:
    "Speed is distance per unit time and is a scalar; velocity is displacement per unit time and is a vector; both are measured in m/s. Average speed is total distance divided by total time. Acceleration is the rate of change of velocity, a = (v − u) ÷ t, in m/s²; a negative acceleration is called retardation. A change of direction at constant speed is also an acceleration. For uniform acceleration the average velocity is (u + v) ÷ 2. Convert all units before calculating.",
  quick: {
    intro: "Week 6 revision sheet. Learn the three definitions, their units and the traps.",
    blocks: [
      {
        heading: "1. Definitions and units",
        points: [
          "Speed = distance ÷ time; scalar; m/s.",
          "Velocity = displacement ÷ time; vector; m/s.",
          "Acceleration = (v − u) ÷ t; vector; m/s².",
          "Retardation: negative acceleration.",
        ],
      },
      {
        heading: "2. Averages and conversions",
        points: [
          "Average speed = total distance ÷ total time.",
          "Average velocity = total displacement ÷ total time.",
          "Uniform acceleration: average velocity = (u + v) ÷ 2.",
          "km/h ÷ 3.6 = m/s.",
        ],
      },
      {
        heading: "3. Key ideas",
        points: [
          "Uniform motion: equal distances in equal times.",
          "Uniform velocity means a = 0.",
          "Change of direction at constant speed is acceleration.",
          "‘From rest’: u = 0. ‘To rest’: v = 0.",
        ],
        warning: "Average speed is not the mean of two speeds.",
      },
    ],
    likely: [
      { question: "Define speed, velocity and acceleration.", answer: "Speed is the rate of change of distance, velocity is the rate of change of displacement, and acceleration is the rate of change of velocity." },
      { question: "State the SI unit of each of the three quantities.", answer: "Speed and velocity: m/s; acceleration: m/s²." },
      { question: "What is retardation?", answer: "Negative acceleration: a decrease of velocity with time." },
      { question: "A car moves 300 m in 15 s. Find its average speed.", answer: "300 ÷ 15 = 20 m/s." },
      { question: "Convert 108 km/h to m/s.", answer: "108 ÷ 3.6 = 30 m/s." },
      { question: "A bus increases its velocity from 5 m/s to 20 m/s in 10 s. Find its acceleration.", answer: "(20 − 5) ÷ 10 = 1.5 m/s²." },
      { question: "Why is a body in uniform circular motion accelerating?", answer: "Its direction, and so its velocity, is always changing even if the speed is constant." },
      { question: "Differentiate between speed and velocity.", answer: "Speed is a scalar (distance per time); velocity is a vector (displacement per time) and has direction." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Speed is defined as", options: ["distance covered per unit time", "displacement per unit time", "change in velocity per unit time", "distance multiplied by time"], answer: "A" },
    { number: 2, kind: "Objective", prompt: "Which of the following is a vector quantity?", options: ["Speed", "Velocity", "Distance", "Time"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "The SI unit of acceleration is", options: ["m/s", "m s", "m/s²", "N"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "A motorcyclist covers 450 m in 30 s. His average speed is", options: ["15 m/s", "0.07 m/s", "480 m/s", "13 500 m/s"], answer: "A", explanation: "Speed = 450 ÷ 30 = 15 m/s." },
    { number: 5, kind: "Objective", prompt: "A speed of 72 km/h is equal to", options: ["12 m/s", "20 m/s", "72 m/s", "259 m/s"], answer: "B", explanation: "72 ÷ 3.6 = 20 m/s." },
    { number: 6, kind: "Objective", prompt: "A car travels 120 km in 2 hours and then 80 km in 2 hours. Its average speed for the whole journey is", options: ["40 km/h", "45 km/h", "50 km/h", "100 km/h"], answer: "C", explanation: "Total distance 200 km ÷ total time 4 h = 50 km/h." },
    { number: 7, kind: "Objective", prompt: "A girl runs 100 m east and then 100 m west in 40 s. Her average velocity is", options: ["5 m/s east", "5 m/s west", "10 m/s", "zero"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "The velocity of a body changes from 5 m/s to 25 m/s in 8 s. Its acceleration is", options: ["2.5 m/s²", "3.75 m/s²", "0.4 m/s²", "160 m/s²"], answer: "A", explanation: "a = (25 − 5) ÷ 8 = 2.5 m/s²." },
    { number: 9, kind: "Objective", prompt: "A car moving at 20 m/s is brought to rest in 4 s. Its retardation is", options: ["80 m/s²", "5 m/s²", "0.2 m/s²", "16 m/s²"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "A body moving with uniform velocity has", options: ["increasing speed", "decreasing speed", "zero acceleration", "constant acceleration greater than zero"], answer: "C" },
    { number: 11, kind: "Objective", prompt: "A ball moves round a circle at a constant speed. Its velocity is changing because", options: ["its speed is changing", "its mass is changing", "friction is acting on it", "its direction is changing"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "A car starts from rest and accelerates at 3 m/s² for 6 s. Its final velocity is", options: ["0.5 m/s", "2 m/s", "18 m/s", "9 m/s"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "A runner keeps a steady speed of 8 m/s. The distance covered in 12 s is", options: ["96 m", "1.5 m", "20 m", "4 m"], answer: "A" },
    { number: 14, kind: "Objective", prompt: "A body accelerates uniformly from 6 m/s to 14 m/s. Its average velocity is", options: ["20 m/s", "10 m/s", "8 m/s", "84 m/s"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define speed, velocity and acceleration, stating the SI unit of each. State one difference between speed and velocity.", answer: "Speed is the distance covered per unit time (m/s). Velocity is the displacement per unit time (m/s). Acceleration is the rate of change of velocity, or change in velocity per unit time (m/s²). Difference: speed is a scalar with no direction while velocity is a vector with direction." },
    { number: 16, kind: "Theory", prompt: "A lorry covers the first 90 km of a journey at 45 km/h and the next 90 km at 90 km/h. Calculate its average speed for the whole journey.", answer: "Time for first part = 90 ÷ 45 = 2 h. Time for second part = 90 ÷ 90 = 1 h. Total distance = 180 km; total time = 3 h. Average speed = 180 ÷ 3 = 60 km/h (not 67.5 km/h, which is the average of the two speeds)." },
    { number: 17, kind: "Theory", prompt: "A runner completes one lap of a 400 m circular track in 80 s. Find her average speed and her average velocity for the lap.", answer: "Average speed = 400 ÷ 80 = 5 m/s. After one lap she is back at the start, so the displacement is zero and the average velocity = 0 ÷ 80 = 0." },
    { number: 18, kind: "Theory", prompt: "A train accelerates uniformly from 10 m/s to 30 m/s in 40 s. Calculate (a) its acceleration and (b) the distance it travels in this time.", answer: "(a) a = (30 − 10) ÷ 40 = 0.5 m/s². (b) Average velocity = (10 + 30) ÷ 2 = 20 m/s; distance = 20 × 40 = 800 m." },
    { number: 19, kind: "Theory", prompt: "A car moving at 25 m/s brakes and stops after 10 s. Assuming uniform retardation, find the retardation and the distance travelled while braking.", answer: "Retardation = (25 − 0) ÷ 10 = 2.5 m/s². Average velocity = (25 + 0) ÷ 2 = 12.5 m/s, so distance = 12.5 × 10 = 125 m." },
    { number: 20, kind: "Theory", prompt: "Explain, with an example, why a body can have a constant speed but a changing velocity.", answer: "Velocity includes direction. If a body’s direction keeps changing, its velocity changes even when the speed is constant. Example: a car going round a roundabout at a steady 10 m/s has a changing direction, so its velocity changes and it is accelerating." },
  ] as PracticeQuestion[],
};
