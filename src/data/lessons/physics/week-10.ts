import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek10: Lesson = {
  id: "ss1-first-physics-week-10",
  week: "Week 10",
  title: "Forces and friction",
  subtitle: "Learn what forces are and the difference between contact and field forces, then study solid friction, its laws, the coefficient of friction and how friction helps and harms us.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Define force, state its unit and describe its effects.",
    "Distinguish between contact forces and field forces, with examples.",
    "Explain friction, and distinguish static (limiting) friction from kinetic friction.",
    "State the laws of solid friction and use F = μR in calculations.",
    "Give the advantages and disadvantages of friction and the ways of reducing it.",
  ],
  sections: [
    {
      heading: "1. What is a force?",
      paragraphs: [
        "A force is a push or a pull. It is a vector, so it has both a size and a direction. The SI unit is the newton (N), measured with a spring balance (a newton meter). One newton is the force that gives a mass of 1 kg an acceleration of 1 m/s², so 1 N = 1 kg m/s².",
        "A force can start a body moving, stop a moving body, speed it up, slow it down, change its direction, or change its shape and size, like squeezing a sponge or stretching a rubber band. When several forces act on a body, they can be replaced by one force called the resultant (or net) force. If the resultant force is zero, the forces are balanced, and the body stays at rest or keeps moving at constant velocity. If the resultant force is not zero, the body accelerates according to F = ma, where F is the resultant force, m the mass and a the acceleration.",
      ],
    },
    {
      heading: "2. Contact forces and field forces",
      paragraphs: [
        "A contact force acts only when two bodies touch. Examples are the push or pull from a hand, the tension in a rope, the normal reaction of a floor on a block resting on it, friction, upthrust in a liquid and air resistance.",
        "A field force acts through space without contact. It is produced by a field around a body. Gravitational force pulls any mass towards the Earth, electric force acts on charges, and magnetic force acts on magnets and magnetic materials. The weight of a body is the gravitational force on it: W = mg. A 4 kg bag has a weight of 4 × 10 = 40 N.",
      ],
      points: [
        "Contact forces: push, pull, tension, normal reaction, friction, upthrust, air resistance.",
        "Field forces: gravitational, electric, magnetic.",
        "Weight W = mg, a field force pointing towards the centre of the Earth.",
      ],
    },
    {
      heading: "3. Friction",
      paragraphs: [
        "Friction is the force that opposes the motion, or the tendency to move, of one surface over another in contact. It acts along the surfaces, in the direction opposite to the motion. It arises because even smooth-looking surfaces have tiny bumps that lock into each other. Friction is why a book does not slide off a slightly tilted desk, and why a rolling football eventually stops.",
        "Static friction is the friction between surfaces that are not moving relative to each other. It adjusts itself to match the force that tries to move the body, up to a maximum value called limiting friction. At this limit the body is just about to slide. Kinetic (or dynamic) friction acts when the surfaces are sliding over each other. For the same surfaces, kinetic friction is slightly smaller than limiting friction, which is why it takes more effort to start a heavy box moving than to keep it moving.",
        "Other kinds of friction include rolling friction, which is much smaller than sliding friction (this is why wheels are useful), and fluid friction, such as air resistance and the drag on a boat, which acts on a body moving through a fluid.",
      ],
      diagram: "Draw a wooden block on a table with four arrows: weight W downwards, normal reaction R upwards, pulling force P to the right and friction F to the left. Show a spring balance on the string.",
    },
    {
      heading: "4. Laws of solid friction",
      paragraphs: [
        "Experiments with blocks and spring balances lead to the following laws.",
      ],
      points: [
        "Friction opposes the motion, or the tendency of motion, between two surfaces in contact.",
        "Friction depends on the nature (roughness) of the two surfaces.",
        "Friction is independent of the area of contact, if the load stays the same.",
        "Friction is directly proportional to the normal reaction between the surfaces.",
        "Limiting friction is greater than kinetic friction for the same surfaces.",
      ],
    },
    {
      heading: "5. Coefficient of friction",
      paragraphs: [
        "Since friction F is proportional to the normal reaction R, the ratio F ÷ R is constant for two given surfaces. This ratio is the coefficient of friction μ (the Greek letter mu): μ = F ÷ R, so F = μR. Because it is a ratio of two forces, μ has no unit. With limiting friction we get the coefficient of static friction, and with kinetic friction the coefficient of kinetic friction.",
        "On a horizontal surface with no other vertical force, R equals the weight of the body, R = mg. Example 1: A 10 kg box rests on a floor where μ = 0.4. Then R = 10 × 10 = 100 N and the limiting friction is F = 0.4 × 100 = 40 N. A pull of 30 N will not move it, because friction would be 30 N, just balancing the pull. A pull of more than 40 N will make it slide.",
        "Example 2: A force of 24 N is just enough to make an 80 N block start sliding. Then R = 80 N and μ = 24 ÷ 80 = 0.3.",
        "Example 3: A 5 kg block is pulled along a table by a 30 N horizontal force. The friction is 10 N. The net force is 30 − 10 = 20 N, so the acceleration is a = 20 ÷ 5 = 4 m/s².",
        "To find μ by experiment, place a wooden block on a horizontal table and pull it with a spring balance. Note the largest reading just before it moves; this is the limiting friction. Add known masses to the block to increase R = (weight of block plus load), repeat, and plot F against R. The graph is a straight line through the origin, and its gradient is the coefficient of static friction.",
      ],
    },
    {
      heading: "6. Uses and problems of friction, and how to change it",
      paragraphs: [
        "Friction is useful: it lets us walk without slipping, grips the tyres of a vehicle on the road, makes the brakes work, keeps nails and screws in place, holds a belt on a pulley and lets us light a match. Friction is also a nuisance: it wears away machine parts, wastes energy as heat, and makes engines hot and less efficient.",
        "To reduce friction, use oil or grease as a lubricant, use ball bearings or rollers, polish the surfaces, and streamline the shape of vehicles, aeroplanes and boats so they pass through air and water easily. To increase friction, use rough surfaces, such as the treads on tyres, studs on football boots and sand on a slippery path.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The unit of force is the newton. The unit of mass is the kilogram. Weight is a force, so it is measured in newtons.",
    "Friction acts to oppose motion or the tendency of motion; it does not always slow bodies down. Without friction between your feet and the ground you could not walk.",
    "Limiting friction is greater than kinetic friction. That is why it is harder to start a box moving than to keep it moving.",
    "The coefficient of friction has no unit. It is a ratio of two forces measured in the same unit.",
    "For solids, friction does not depend on the area of contact but on the roughness and the normal reaction.",
    "R = mg only when the surface is level and there is no other vertical force. Do not use R = mg on a slope without thinking.",
    "Before the block moves, the friction equals the pull, and it can be less than the limiting value. Do not just use μR for a block that is not moving.",
    "Balanced forces do not mean a body is at rest. It can move at constant velocity.",
  ],
  summary:
    "A force is a push or pull, a vector measured in newtons, which can change the speed, direction or shape of a body. Contact forces need touching; field forces (gravity, electric, magnetic) act at a distance. Friction opposes the motion between two surfaces. Limiting (static) friction is greater than kinetic friction. Friction depends on the surfaces and the normal reaction, not on the area of contact, and F = μR with μ having no unit. Friction is useful for walking, gripping and braking, but wastes energy and causes wear, so it is reduced by lubrication, bearings, polishing and streamlining.",
  quick: {
    intro: "Week 10 revision sheet. Know the types of force, the laws of friction and the calculations with F = μR.",
    blocks: [
      {
        heading: "1. Force",
        points: [
          "Force: push or pull; vector; newton (N = kg m/s²).",
          "Effects: start, stop, speed up, slow down, change direction or shape.",
          "Resultant force F = ma. Weight W = mg.",
          "Contact: push, pull, tension, reaction, friction. Field: gravitational, electric, magnetic.",
        ],
      },
      {
        heading: "2. Friction and its laws",
        points: [
          "Friction opposes motion; limiting friction > kinetic friction.",
          "Depends on the nature of the surfaces and on R.",
          "Independent of the area of contact.",
          "F = μR, with μ having no unit.",
        ],
        memory: "μ = F ÷ R: ‘friction over reaction’.",
      },
      {
        heading: "3. Using friction",
        points: [
          "Advantages: walking, braking, tyre grip, holding nails and screws.",
          "Disadvantages: wear, wasted heat energy, lower efficiency.",
          "Reduce: lubricants, ball bearings, polishing, streamlining.",
          "Increase: rough surfaces, tyre treads, sand.",
        ],
        warning: "Static friction equals the pull until the limit is reached.",
      },
    ],
    likely: [
      { question: "Define a force and state its SI unit.", answer: "A force is a push or a pull. Its SI unit is the newton (N)." },
      { question: "Distinguish between contact and field forces with two examples each.", answer: "Contact forces need touching, e.g. tension and friction. Field forces act at a distance, e.g. gravitational and magnetic force." },
      { question: "Define friction.", answer: "The force that opposes the motion, or the tendency to move, of one surface over another in contact." },
      { question: "Differentiate between static and kinetic friction.", answer: "Static friction acts between surfaces at rest, up to a maximum (limiting) value. Kinetic friction acts between surfaces that are sliding and is smaller than limiting friction." },
      { question: "State the laws of solid friction.", answer: "Friction opposes the motion; it depends on the nature of the surfaces; it is independent of the area of contact; it is proportional to the normal reaction." },
      { question: "A 6 kg block rests on a surface with μ = 0.5. Find the limiting friction. (g = 10 m/s²)", answer: "R = 60 N, so F = 0.5 × 60 = 30 N." },
      { question: "Give three ways of reducing friction.", answer: "Lubricating with oil or grease, using ball bearings or rollers, polishing, and streamlining the shape." },
      { question: "Give two advantages and two disadvantages of friction.", answer: "Advantages: it enables us to walk and makes brakes work. Disadvantages: it wears out machine parts and wastes energy as heat." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "The SI unit of force is the", options: ["kilogram", "joule", "newton", "watt"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "One newton is equivalent to", options: ["kg m s⁻¹", "kg m s⁻²", "kg m² s⁻²", "kg m⁻¹ s⁻²"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "Which of the following is a field force?", options: ["Gravitational force", "Tension in a rope", "Friction", "Air resistance"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "Which of the following is a contact force?", options: ["Tension in a string", "Magnetic force", "Gravitational force", "Electric force on a charge"], answer: "A" },
    { number: 5, kind: "Objective", prompt: "The force of friction between two surfaces acts", options: ["in the direction of the motion", "perpendicular to the surfaces", "opposite to the motion or tendency to move, along the surfaces", "downwards"], answer: "C" },
    { number: 6, kind: "Objective", prompt: "A 10 kg block rests on a level floor. The normal reaction of the floor on it is (g = 10 m/s²)", options: ["1 N", "10 N", "1000 N", "100 N"], answer: "D" },
    { number: 7, kind: "Objective", prompt: "The coefficient of friction between a box and the floor is 0.4 and the normal reaction is 50 N. The limiting friction is", options: ["12.5 N", "20 N", "50.4 N", "125 N"], answer: "B", explanation: "F = μR = 0.4 × 50 = 20 N." },
    { number: 8, kind: "Objective", prompt: "A 5 kg block is pulled along a table by a horizontal force of 30 N against a friction of 10 N. Its acceleration is", options: ["2 m/s²", "6 m/s²", "8 m/s²", "4 m/s²"], answer: "D", explanation: "Net force = 30 − 10 = 20 N; a = 20 ÷ 5 = 4 m/s²." },
    { number: 9, kind: "Objective", prompt: "The coefficient of friction", options: ["has the unit newton", "has no unit", "has the unit kg", "has the unit N/m²"], answer: "B" },
    { number: 10, kind: "Objective", prompt: "A force of 24 N is just enough to make a block of weight 80 N slide. The coefficient of limiting friction is", options: ["0.30", "3.3", "0.24", "56"], answer: "A", explanation: "μ = F ÷ R = 24 ÷ 80 = 0.3." },
    { number: 11, kind: "Objective", prompt: "A box on a level floor is pulled with a horizontal force of 60 N and moves at constant speed. The friction on it is", options: ["0 N", "6 N", "30 N", "60 N"], answer: "D" },
    { number: 12, kind: "Objective", prompt: "Which of the following will reduce friction between two surfaces?", options: ["Adding oil between them", "Pressing them together harder", "Making them rougher", "Increasing the load"], answer: "A" },
    { number: 13, kind: "Objective", prompt: "According to the laws of solid friction, friction between two surfaces is independent of", options: ["the nature of the surfaces", "the normal reaction", "the area of contact", "the presence of a lubricant"], answer: "C" },
    { number: 14, kind: "Objective", prompt: "A 2 kg mass is acted on by an unbalanced force of 6 N. Its acceleration is", options: ["12 m/s²", "3 m/s²", "0.33 m/s²", "8 m/s²"], answer: "B" },
    { number: 15, kind: "Theory", prompt: "Define force and list four effects that a force can have on a body. Distinguish between contact forces and field forces, giving two examples of each.", answer: "A force is a push or pull. It can start motion, stop a moving body, change its speed, change its direction or change its shape or size. Contact forces act only when bodies touch, e.g. tension in a rope and friction. Field forces act at a distance, e.g. gravitational force and magnetic force." },
    { number: 16, kind: "Theory", prompt: "Define friction. Explain the difference between limiting (static) friction and kinetic friction, and say which is larger.", answer: "Friction is the force that opposes the motion, or the tendency of motion, of one surface over another. Limiting friction is the maximum friction between surfaces which are about to slide. Kinetic friction acts when they are sliding. Limiting friction is larger than kinetic friction." },
    { number: 17, kind: "Theory", prompt: "State the laws of solid friction.", answer: "1. Friction opposes the motion or tendency of motion between the surfaces. 2. Friction depends on the nature of the surfaces in contact. 3. Friction is independent of the area of contact (for the same load). 4. Friction is directly proportional to the normal reaction between the surfaces. 5. Limiting friction is greater than kinetic friction." },
    { number: 18, kind: "Theory", prompt: "A block of mass 8 kg rests on a rough horizontal surface where the coefficient of static friction is 0.5. (a) Find the limiting friction. (b) A horizontal force of 60 N is then applied and the kinetic friction is 30 N. Find the acceleration. (g = 10 m/s²)", answer: "(a) R = mg = 8 × 10 = 80 N; limiting friction F = μR = 0.5 × 80 = 40 N. (b) Net force = 60 − 30 = 30 N; a = F ÷ m = 30 ÷ 8 = 3.75 m/s²." },
    { number: 19, kind: "Theory", prompt: "Describe an experiment to find the coefficient of static friction between a wooden block and a table, and explain how the result is obtained from a graph.", answer: "Weigh the block. Place it on the horizontal table and attach a spring balance. Pull gradually and record the largest reading just before the block moves (the limiting friction F). Add known masses to the block, find the new normal reaction R (the total weight), and repeat. Plot F against R. The graph is a straight line through the origin, and its gradient F ÷ R is the coefficient of static friction." },
    { number: 20, kind: "Theory", prompt: "State three advantages and three disadvantages of friction, and four ways of reducing it.", answer: "Advantages: it makes walking possible; it makes brakes and tyre grip work; it keeps nails and screws in place. Disadvantages: it wears out moving parts; it wastes energy as heat; it makes machines less efficient. Ways to reduce it: lubricate with oil or grease; use ball bearings or rollers; polish the surfaces; streamline the body." },
  ] as PracticeQuestion[],
};
