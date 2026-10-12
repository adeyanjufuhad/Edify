import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek5: Lesson = {
  id: "ss1-first-physics-week-5",
  week: "Week 05",
  title: "Concept of motion",
  subtitle: "Learn what motion is, why it is always described relative to something, the four types of motion, and how to work out the motion of one body as seen from another.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define motion and explain why rest and motion are relative.",
    "State what causes motion and name the two branches of mechanics that study it.",
    "Describe translational, rotational, oscillatory and random motion with examples.",
    "Explain linear motion and recognise motions that combine two types.",
    "Calculate the relative velocity of two bodies moving along the same line.",
  ],
  sections: [
    {
      heading: "1. What is motion?",
      paragraphs: [
        "Motion is the change in position of a body with time. A bus leaving the motor park, a ball rolling down a slope and the Earth going round the Sun are all in motion. A body that does not change its position with time is at rest.",
        "Motion can only be described by comparing a body with something else, called a reference point or frame of reference. A passenger sitting in a moving bus is at rest relative to the bus, but is moving relative to the road, a tree or a person standing at the roadside. Even a tree is moving relative to the Sun, since the Earth is in motion. So rest and motion are relative: there is no absolute rest. Whenever you say something is moving, ask yourself, ‘Compared with what?’",
      ],
    },
    {
      heading: "2. What causes motion?",
      paragraphs: [
        "A body at rest starts moving only when a force acts on it. A force is a push or a pull. A moving body keeps moving in a straight line at constant speed unless a force acts on it; this property of matter is called inertia. A force can set a body in motion, stop it, speed it up, slow it down or change its direction.",
        "The part of mechanics that describes how bodies move, without asking why, is called kinematics. This is what you study in the next few weeks. The part that deals with the forces causing motion is called dynamics.",
      ],
    },
    {
      heading: "3. Types of motion",
      paragraphs: [
        "Translational motion is the movement of a body from one place to another without turning. Every part of the body moves the same distance in the same direction at the same time. A car on a straight road, a bird flying from one tree to another and a lift going up a building are examples. The path may be straight (linear or rectilinear motion) or curved (curvilinear motion), such as a car going round a bend.",
        "Rotational motion is the spinning of a body about a fixed line called the axis of rotation, with every point of the body moving in a circle about that axis. Examples are the blades of a ceiling fan, a spinning top, a merry-go-round and the Earth turning about its axis.",
        "Oscillatory (or vibratory) motion is a to-and-fro movement about a fixed point that repeats at regular intervals. Examples are the swinging bob of a pendulum, the prongs of a vibrating tuning fork, a child on a swing, a plucked guitar string and a mass bouncing on a spring.",
        "Random motion is irregular movement in all directions with no fixed pattern. Smoke particles and dust in the air, and pollen grains on water, jiggle about because they are constantly hit by the fast-moving molecules of the air or water around them. This is called Brownian motion, and it is evidence that matter is made of tiny moving particles. The molecules of a gas also move randomly.",
        "Many real motions combine two types. A wheel of a moving bicycle rotates about its axle and, at the same time, the whole wheel moves forward, so it has rotational and translational motion. A stone whirled on a string moves in a circle; this circular motion is studied in Week 11.",
      ],
      diagram: "Draw four small sketches and label them: a car on a road (translational), a ceiling fan (rotational), a pendulum swinging between two extreme positions (oscillatory) and a smoke particle with a zigzag path (random).",
    },
    {
      heading: "4. Relative motion",
      paragraphs: [
        "Relative motion is the motion of one body as seen from another body. If two bodies move along the same straight line, choose one direction as positive and subtract velocities: the velocity of A relative to B is the velocity of A minus the velocity of B. In practice this gives two simple rules. When two bodies move in the same direction, subtract their speeds. When they move in opposite directions, add their speeds.",
        "Example 1: A bus moves at 60 km/h and a car overtaking it moves at 80 km/h in the same direction. A passenger in the bus sees the car pulling away at 80 − 60 = 20 km/h. Example 2: If the car were instead coming towards the bus at 80 km/h, the passenger would see it approach at 80 + 60 = 140 km/h.",
        "Example 3: A boy runs at 4 m/s along the corridor of a train towards the front. The train moves at 20 m/s. Relative to the ground, the boy moves at 20 + 4 = 24 m/s. If he runs towards the back, his speed relative to the ground is 20 − 4 = 16 m/s.",
        "Example 4: A boat can travel at 6 m/s in still water. The river current flows at 2 m/s. Going downstream, the current carries the boat along, so its speed relative to the bank is 6 + 2 = 8 m/s. Going upstream, the current opposes it, so the speed is 6 − 2 = 4 m/s. The same method works for an aeroplane moving with or against the wind.",
      ],
      points: [
        "Same direction: relative speed = difference of the speeds.",
        "Opposite directions: relative speed = sum of the speeds.",
        "Convert all speeds to the same units before adding or subtracting.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "Motion is always relative. A statement that something is moving or at rest needs a reference point.",
    "Relative motion is a way of describing motion; it is not one of the four types of motion.",
    "Translational motion does not have to be in a straight line. A car going round a bend is still translational.",
    "A rolling wheel has two motions together: rotation about its axle and translation of the axle.",
    "Oscillation is a to-and-fro motion about a fixed position that repeats. A pendulum oscillates; it does not rotate.",
    "Brownian motion is random and is evidence for the particle nature of matter.",
    "For bodies moving in the same direction subtract speeds; for opposite directions add them. A river boat going upstream is slower than going downstream.",
    "Kinematics describes motion; dynamics explains it using forces.",
  ],
  summary:
    "Motion is the change of position of a body with time, and it is always described relative to a reference point, so rest and motion are relative. Motion is caused by forces, and kinematics describes it without the forces, while dynamics studies the forces. The four types of motion are translational, rotational, oscillatory and random; a body can combine two types, such as a rolling wheel. For two bodies moving along a line, relative speed is found by subtracting the speeds when the bodies move in the same direction and adding them when they move in opposite directions.",
  quick: {
    intro: "Week 5 revision sheet. Know the four types of motion with two examples each and practise relative-speed calculations.",
    blocks: [
      {
        heading: "1. Motion and reference",
        points: [
          "Motion: change in position of a body with time.",
          "Rest and motion are relative to a reference point.",
          "Cause of motion: a force (push or pull).",
          "Kinematics: describes motion. Dynamics: studies the forces causing it.",
        ],
      },
      {
        heading: "2. Types of motion",
        points: [
          "Translational: car on a road, bird in flight, lift.",
          "Rotational: fan blades, spinning top, Earth on its axis.",
          "Oscillatory: pendulum, swing, tuning fork, plucked string.",
          "Random: smoke or pollen particles (Brownian), gas molecules.",
        ],
        memory: "T-R-O-R: Translate, Rotate, Oscillate, Random.",
      },
      {
        heading: "3. Relative motion",
        points: [
          "Same direction: subtract speeds. Opposite: add speeds.",
          "Boat: downstream = boat + current; upstream = boat − current.",
          "Relative velocity of A to B = v(A) − v(B).",
        ],
        warning: "Relative motion is not a type of motion.",
      },
    ],
    likely: [
      { question: "Define motion.", answer: "Motion is the change in position of a body with time." },
      { question: "Why is motion said to be relative?", answer: "Because a body can be at rest compared with one object and moving compared with another, so we always need a reference point." },
      { question: "Name the four types of motion with an example of each.", answer: "Translational (a car on a road), rotational (a ceiling fan), oscillatory (a pendulum), random (smoke particles)." },
      { question: "What is Brownian motion?", answer: "The random zigzag movement of tiny particles suspended in a fluid, caused by collisions with fast-moving molecules of the fluid." },
      { question: "What is the difference between kinematics and dynamics?", answer: "Kinematics describes motion without regard to its cause; dynamics studies the forces that cause the motion." },
      { question: "Two cars move towards each other at 60 km/h and 40 km/h. At what speed do they approach?", answer: "60 + 40 = 100 km/h." },
      { question: "A boat moves at 5 m/s in still water in a river whose current is 1 m/s. Find its speed upstream.", answer: "5 − 1 = 4 m/s." },
      { question: "Why does a bicycle wheel have two types of motion?", answer: "It rotates about its axle and the whole wheel also moves forward, so it has rotational and translational motion." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Motion is defined as", options: ["the force acting on a body", "the change in position of a body with time", "the speed of a body in a straight line", "the distance travelled by a body"], answer: "B" },
    { number: 2, kind: "Objective", prompt: "The branch of mechanics that describes motion without considering the forces that cause it is called", options: ["dynamics", "statics", "kinematics", "optics"], answer: "C" },
    { number: 3, kind: "Objective", prompt: "The motion of the blades of a ceiling fan is", options: ["rotational", "oscillatory", "random", "translational"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "The motion of the bob of a simple pendulum swinging to and fro is", options: ["rotational", "random", "translational", "oscillatory"], answer: "D" },
    { number: 5, kind: "Objective", prompt: "The zigzag movement of smoke particles in air, seen under a microscope, is an example of", options: ["oscillatory motion", "random motion", "rotational motion", "translational motion"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "A car moving along a straight road has", options: ["rotational motion", "oscillatory motion", "translational motion", "random motion"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "The wheel of a bicycle moving along a straight road has", options: ["rotational and translational motion", "oscillatory and random motion", "rotational and oscillatory motion", "only rotational motion"], answer: "A" },
    { number: 8, kind: "Objective", prompt: "A passenger sits in a moving bus. She is", options: ["moving relative to both the bus and the road", "at rest relative to the road but moving relative to the bus", "moving relative to the bus but at rest relative to the road", "at rest relative to the bus but moving relative to the road"], answer: "D" },
    { number: 9, kind: "Objective", prompt: "Two cars travel towards each other along a straight road at 70 km/h and 50 km/h. The speed at which they approach each other is", options: ["20 km/h", "70 km/h", "120 km/h", "60 km/h"], answer: "C", explanation: "They move in opposite directions, so add the speeds: 70 + 50 = 120 km/h." },
    { number: 10, kind: "Objective", prompt: "Car A is behind car B on a straight road. A moves at 90 km/h and B at 60 km/h in the same direction. The velocity of A relative to B is", options: ["30 km/h", "60 km/h", "90 km/h", "150 km/h"], answer: "A", explanation: "Same direction, so subtract: 90 − 60 = 30 km/h." },
    { number: 11, kind: "Objective", prompt: "A boat that can travel at 6 m/s in still water moves downstream in a river whose current is 2 m/s. Its speed relative to the river bank is", options: ["4 m/s", "8 m/s", "12 m/s", "3 m/s"], answer: "B" },
    { number: 12, kind: "Objective", prompt: "The same boat now travels upstream. Its speed relative to the river bank is", options: ["8 m/s", "12 m/s", "2 m/s", "4 m/s"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "Which of the following is a way of describing motion rather than a type of motion?", options: ["Rotational motion", "Oscillatory motion", "Random motion", "Relative motion"], answer: "D" },
    { number: 14, kind: "Objective", prompt: "The tip of the second hand of a wall clock moves along", options: ["a straight line", "a circle", "a random zigzag path", "a to-and-fro line"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define motion. Explain why rest and motion are said to be relative, using an example.", answer: "Motion is the change in position of a body with time. A body can be at rest compared with one object and moving compared with another. Example: a passenger in a moving bus is at rest relative to the bus but moving relative to the road, so we must always state the reference point." },
    { number: 16, kind: "Theory", prompt: "Describe four types of motion, giving two examples of each.", answer: "Translational: a body moves from one place to another without turning (a car on a road, a bird flying). Rotational: a body spins about an axis (fan blades, a spinning top). Oscillatory: to-and-fro movement about a fixed point (pendulum, tuning fork prongs). Random: irregular movement in all directions (smoke particles, gas molecules)." },
    { number: 17, kind: "Theory", prompt: "A bus moves at 72 km/h. A boy runs inside the bus at 4 m/s relative to the bus. Find his speed relative to the road when he runs (a) towards the front and (b) towards the back.", answer: "72 km/h = 72 ÷ 3.6 = 20 m/s. (a) Towards the front: 20 + 4 = 24 m/s. (b) Towards the back: 20 − 4 = 16 m/s." },
    { number: 18, kind: "Theory", prompt: "Train A moves at 100 km/h and train B at 80 km/h on parallel tracks. Find the velocity of A relative to B when they travel (a) in the same direction and (b) in opposite directions.", answer: "(a) Same direction: 100 − 80 = 20 km/h. (b) Opposite directions: 100 + 80 = 180 km/h." },
    { number: 19, kind: "Theory", prompt: "A boat has a speed of 5.5 m/s in still water. A river flows at 1.5 m/s. Find the time the boat takes to travel 120 m (a) downstream and (b) upstream.", answer: "(a) Speed downstream = 5.5 + 1.5 = 7.0 m/s, so time = 120 ÷ 7.0 ≈ 17.1 s. (b) Speed upstream = 5.5 − 1.5 = 4.0 m/s, so time = 120 ÷ 4.0 = 30 s." },
    { number: 20, kind: "Theory", prompt: "Explain why the motion of a rolling wheel is a combination of two types of motion, and why the swinging of a pendulum is oscillatory and not rotational.", answer: "A rolling wheel turns about its axle (rotational) while the axle itself moves forward (translational). A pendulum bob moves to and fro about a fixed central position, repeating its path at regular intervals. It does not turn about its own axis in a complete circle, so it is oscillatory." },
  ] as PracticeQuestion[],
};
