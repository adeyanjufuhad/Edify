import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek9: Lesson = {
  id: "ss1-first-physics-week-9",
  week: "Week 09",
  title: "Graphical representation of motion",
  subtitle: "Read and draw distance–time, displacement–time and velocity–time graphs, and use their gradients and areas to find speed, velocity, acceleration and distance.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Draw motion graphs with correctly labelled axes, scales and units.",
    "Interpret distance–time and displacement–time graphs, including the gradient.",
    "Interpret velocity–time graphs and use the gradient to find acceleration.",
    "Calculate distance or displacement from the area under a velocity–time graph.",
    "Solve multi-stage problems and find average speed from a graph.",
  ],
  sections: [
    {
      heading: "1. Drawing and reading motion graphs",
      paragraphs: [
        "A graph shows at a glance how one quantity changes with another. In motion graphs, time is always on the horizontal axis. Label each axis with the quantity and its unit, choose a scale that uses most of the paper, plot points carefully and join them with a straight line or a smooth curve.",
        "The gradient (slope) of a straight line is the vertical change divided by the horizontal change between two points on the line, which is ‘rise ÷ run’. Choose two points far apart on the line to reduce error. The gradient has units: the unit of the vertical axis divided by the unit of the horizontal axis.",
      ],
      diagram: "Draw a pair of axes with time (s) along the bottom and velocity (m/s) up the side. Plot a straight line from (0, 0) to (10, 30). Mark a right-angled triangle under the line and label the rise (30 m/s) and the run (10 s).",
    },
    {
      heading: "2. Distance–time and displacement–time graphs",
      paragraphs: [
        "On a distance–time graph, the gradient is the speed, and on a displacement–time graph the gradient is the velocity. A horizontal line means the body is at rest, because its position does not change as time passes. A straight sloping line means constant speed (or constant velocity). The steeper the line, the faster the body moves.",
        "If the line is a curve, the speed is changing. A curve that gets steeper shows that the body is speeding up; one that flattens shows the body is slowing down. To find the speed at one instant on a curve, draw a tangent (a straight line that just touches the curve at that point) and find its gradient. A distance–time graph can never slope downwards, because distance never decreases. A displacement–time graph can slope downwards, because a body moving back towards the start has a decreasing displacement.",
        "Example: A student walks 60 m in 40 s, rests for 20 s and then returns the 60 m in 60 s. On the graph she has an upward line (gradient 60 ÷ 40 = 1.5 m/s), a horizontal line (0 m/s), and a line going down on a displacement graph (gradient −60 ÷ 60 = −1 m/s).",
      ],
      points: [
        "Horizontal line: at rest.",
        "Straight sloping line: uniform speed or velocity.",
        "Curve: changing speed; tangent gives the instantaneous value.",
        "Gradient of a distance–time graph = speed; of a displacement–time graph = velocity.",
      ],
    },
    {
      heading: "3. Velocity–time graphs",
      paragraphs: [
        "On a velocity–time graph, the gradient is the acceleration, and the area between the line and the time axis is the displacement. A horizontal line means constant velocity, so the acceleration is zero. A straight line sloping upwards means uniform acceleration. A straight line sloping downwards, while the velocity is still positive, means uniform retardation. A curve means the acceleration is changing.",
        "If a part of the graph lies below the time axis, the velocity is negative, which means the body is moving in the opposite direction. The area under that part counts as negative displacement. If you need the total distance travelled, add all the areas as positive numbers; if you need the net displacement, subtract the areas below the axis from the areas above it.",
      ],
      points: [
        "Gradient of v–t graph = acceleration.",
        "Area under v–t graph = displacement (distance if the velocity does not change direction).",
        "Horizontal line: uniform velocity, a = 0.",
        "Below the axis: motion in the opposite direction.",
      ],
    },
    {
      heading: "4. Finding areas",
      paragraphs: [
        "Split the region under the graph into simple shapes. A rectangle has area base × height. A triangle has area ½ × base × height. A trapezium, which has two parallel vertical sides of lengths a and b separated by width w, has area ½(a + b) × w. For example, a body that accelerates uniformly from rest to velocity v in time t covers a distance ½vt, the area of a triangle.",
        "Example: a car accelerates uniformly from rest to 20 m/s in 10 s, moves at 20 m/s for 30 s and then slows uniformly to rest in 5 s. The acceleration is 20 ÷ 10 = 2 m/s² and the retardation is 20 ÷ 5 = 4 m/s². The distance is the sum of three areas: triangle ½ × 10 × 20 = 100 m, rectangle 30 × 20 = 600 m and triangle ½ × 5 × 20 = 50 m. The total is 750 m in 45 s, so the average speed is 750 ÷ 45 ≈ 16.7 m/s. The same total can be found as a trapezium: ½(45 + 30) × 20 = 750 m.",
      ],
      diagram: "Draw the velocity–time graph for the car above: a rising line from (0, 0) to (10, 20), a flat line to (40, 20), and a falling line to (45, 0). Shade the three parts, label the triangle, rectangle and triangle, and write their areas.",
    },
    {
      heading: "5. Graphs for bodies falling or thrown upwards",
      paragraphs: [
        "A body dropped from rest has a velocity–time graph that is a straight line through the origin with gradient g = 10 m/s², because the acceleration is constant. A ball thrown upwards at 20 m/s has a straight line sloping downwards at −10 m/s² (gradient −10). It starts at +20 m/s, reaches zero after 2 s at the top, and continues to −20 m/s at 4 s as it comes back down. The area above the axis (+20 m) is the upward displacement, the area below the axis (−20 m) is the downward displacement, so the net displacement is zero and the total distance travelled is 40 m.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Always check which graph you have. The gradient of a distance–time graph is speed, but the gradient of a velocity–time graph is acceleration.",
    "The area under a velocity–time graph is distance or displacement. The area under a distance–time graph has no useful meaning.",
    "A horizontal line means ‘at rest’ on a distance–time graph, but ‘constant velocity’ on a velocity–time graph.",
    "A line sloping downwards on a velocity–time graph does not always mean the body is moving backwards. It means the velocity is decreasing. Backward motion is shown below the time axis.",
    "A distance–time graph can never slope downwards. A displacement–time graph can.",
    "For a curve, draw a tangent and find its gradient to get the value at one instant.",
    "Read the scale of each axis before calculating. Many marks are lost by counting squares instead of reading values.",
    "Remember the units of the gradient and of the area. Gradient of a v–t graph is m/s², area is metres.",
  ],
  summary:
    "Motion graphs have time on the horizontal axis. On a distance–time or displacement–time graph the gradient gives speed or velocity: horizontal means at rest, a straight slope means uniform motion and a curve means changing motion. On a velocity–time graph the gradient gives acceleration and the area under the graph gives distance or displacement. Rectangles, triangles and trapezia are used to find areas, and a part of the graph below the axis shows motion in the opposite direction. Average speed is total distance divided by total time.",
  quick: {
    intro: "Week 9 revision sheet. Learn what the gradient and the area mean on each graph.",
    blocks: [
      {
        heading: "1. Distance–time / displacement–time",
        points: [
          "Gradient = speed (or velocity).",
          "Horizontal line: at rest. Straight slope: uniform speed. Curve: changing speed.",
          "Instantaneous speed: gradient of the tangent.",
          "Distance–time never slopes down; displacement–time can.",
        ],
      },
      {
        heading: "2. Velocity–time",
        points: [
          "Gradient = acceleration. Area = distance or displacement.",
          "Horizontal line: uniform velocity (a = 0).",
          "Sloping up: acceleration. Sloping down: retardation.",
          "Below the axis: moving in the opposite direction.",
        ],
        memory: "On a v–t graph, Gradient gives the rate of change (acceleration) and Area gives the amount travelled (distance).",
      },
      {
        heading: "3. Areas",
        points: [
          "Rectangle: base × height. Triangle: ½ × base × height.",
          "Trapezium: ½ (sum of parallel sides) × width.",
          "Average speed = total distance ÷ total time.",
        ],
        warning: "Check the axes and units before using a graph.",
      },
    ],
    likely: [
      { question: "What does the gradient of a distance–time graph represent?", answer: "Speed." },
      { question: "What does the area under a velocity–time graph represent?", answer: "The distance travelled (or displacement)." },
      { question: "What shape of graph shows a body at rest on a distance–time graph?", answer: "A horizontal straight line." },
      { question: "Describe the velocity–time graph of a body moving with uniform acceleration from rest.", answer: "A straight line through the origin sloping upwards; the gradient equals the acceleration." },
      { question: "A v–t graph is a straight line from (0, 0) to (8 s, 24 m/s). Find the acceleration and the distance.", answer: "a = 24 ÷ 8 = 3 m/s²; distance = ½ × 8 × 24 = 96 m." },
      { question: "How do you find the speed at one instant from a curved distance–time graph?", answer: "Draw a tangent to the curve at that point and calculate its gradient." },
      { question: "Why can a distance–time graph never have a negative gradient?", answer: "Distance never decreases." },
      { question: "What does a part of a velocity–time graph below the time axis show?", answer: "The body is moving in the opposite direction (negative velocity)." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The gradient of a distance–time graph represents", options: ["speed", "acceleration", "distance", "time"], answer: "A" },
    { number: 2, kind: "Objective", prompt: "The area under a velocity–time graph represents", options: ["acceleration", "distance travelled", "force", "speed"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "A horizontal line on a distance–time graph shows that the body is", options: ["moving with uniform speed", "accelerating", "at rest", "retarding"], answer: "C" },
    { number: 4, kind: "Objective", prompt: "A horizontal line on a velocity–time graph shows that the body is", options: ["at rest", "moving with uniform velocity", "accelerating uniformly", "retarding uniformly"], answer: "B" },
    { number: 5, kind: "Objective", prompt: "A velocity–time graph is a straight line from (0 s, 0 m/s) to (10 s, 30 m/s). The acceleration is", options: ["300 m/s²", "30 m/s²", "0.33 m/s²", "3 m/s²"], answer: "D" },
    { number: 6, kind: "Objective", prompt: "The distance covered by the body in the last question is", options: ["150 m", "300 m", "15 m", "30 m"], answer: "A", explanation: "Area of the triangle = ½ × 10 × 30 = 150 m." },
    { number: 7, kind: "Objective", prompt: "A straight-line distance–time graph passes through the origin and the point (5 s, 40 m). The speed is", options: ["200 m/s", "0.125 m/s", "45 m/s", "8 m/s"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "A body accelerates uniformly from rest to 12 m/s in 4 s, moves at 12 m/s for 6 s and then slows uniformly to rest in 2 s. The total distance covered is", options: ["72 m", "96 m", "108 m", "144 m"], answer: "C", explanation: "24 m + 72 m + 12 m = 108 m." },
    { number: 9, kind: "Objective", prompt: "The retardation in the last stage of the motion in the previous question is", options: ["2 m/s²", "3 m/s²", "6 m/s²", "12 m/s²"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "A distance–time graph is a curve that becomes steeper with time. The body’s speed is", options: ["decreasing", "constant", "zero", "increasing"], answer: "D" },
    { number: 11, kind: "Objective", prompt: "A velocity–time graph slopes straight downwards from 20 m/s at 0 s to 0 m/s at 5 s. The retardation is", options: ["4 m/s²", "100 m/s²", "0.25 m/s²", "15 m/s²"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "A part of a velocity–time graph lies below the time axis. This shows that the body is", options: ["at rest", "no longer accelerating", "moving in the opposite direction", "moving faster than before"], answer: "C" },
    { number: 13, kind: "Objective", prompt: "A distance–time graph can never slope downwards because", options: ["time cannot be negative", "distance never decreases", "speed is a vector", "its gradient is the acceleration"], answer: "B" },
    { number: 14, kind: "Objective", prompt: "The speed of a body at one instant, from a curved distance–time graph, is found from", options: ["the area under the curve", "the gradient of the tangent at that point", "the length of the curve", "the height of the curve"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Describe the shape and the meaning of the following on (i) a distance–time graph and (ii) a velocity–time graph: (a) a body at rest, (b) uniform velocity, (c) uniform acceleration.", answer: "(a) Distance–time: horizontal line. Velocity–time: the line lies on the time axis (zero velocity). (b) Distance–time: straight sloping line with gradient equal to the velocity. Velocity–time: horizontal line above the axis (gradient zero). (c) Distance–time: a curve that gets steeper. Velocity–time: a straight sloping line, whose gradient is the acceleration." },
    { number: 16, kind: "Theory", prompt: "A body’s velocity is 0, 6, 12, 18 and 24 m/s at times 0, 2, 4, 6 and 8 s. (a) Describe the graph. (b) Find the acceleration. (c) Find the distance covered in 8 s. (d) Find the velocity at 5 s from the graph.", answer: "(a) A straight line through the origin sloping upwards, so the acceleration is uniform. (b) a = 24 ÷ 8 = 3 m/s². (c) Distance = area of the triangle = ½ × 8 × 24 = 96 m. (d) At 5 s the line reads v = 3 × 5 = 15 m/s." },
    { number: 17, kind: "Theory", prompt: "A car accelerates uniformly from rest to 20 m/s in 10 s, moves at 20 m/s for 30 s and then comes to rest uniformly in 5 s. Find (a) the acceleration, (b) the retardation, (c) the total distance and (d) the average speed for the whole journey.", answer: "(a) a = 20 ÷ 10 = 2 m/s². (b) Retardation = 20 ÷ 5 = 4 m/s². (c) Distance = ½ × 10 × 20 + 30 × 20 + ½ × 5 × 20 = 100 + 600 + 50 = 750 m. (d) Total time = 45 s; average speed = 750 ÷ 45 ≈ 16.7 m/s." },
    { number: 18, kind: "Theory", prompt: "A student walks 60 m in 40 s, rests for 20 s and then returns to her starting point in 60 s. Find her speed in each stage, her average speed and her average velocity for the whole 120 s.", answer: "Stage 1: 60 ÷ 40 = 1.5 m/s. Stage 2: 0 m/s. Stage 3: 60 ÷ 60 = 1 m/s. Total distance = 120 m in 120 s, so the average speed = 1 m/s. She ends where she began, so the displacement is zero and the average velocity is zero." },
    { number: 19, kind: "Theory", prompt: "A ball is thrown vertically upwards at 20 m/s (g = 10 m/s²). Describe its velocity–time graph for the first 4 s, and use the graph to find the maximum height, the total distance travelled and the net displacement.", answer: "The graph is a straight line with gradient −10 m/s², starting at +20 m/s, crossing the time axis at 2 s and reaching −20 m/s at 4 s. Area above the axis = ½ × 2 × 20 = 20 m (maximum height). Area below the axis = 20 m downwards. Total distance = 20 + 20 = 40 m; net displacement = 20 − 20 = 0." },
    { number: 20, kind: "Theory", prompt: "Explain how the velocity at a particular instant is found from a curved displacement–time graph. A tangent drawn at t = 4 s passes through (2 s, 2 m) and (4 s, 10 m); find the velocity at that instant.", answer: "Draw a tangent that just touches the curve at the point, choose two points far apart on the tangent and find the gradient (rise ÷ run), which is the instantaneous velocity. Here the gradient is (10 − 2) ÷ (4 − 2) = 8 ÷ 2 = 4 m/s." },
  ] as PracticeQuestion[],
};
