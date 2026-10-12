import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek11: Lesson = {
  id: "ss1-first-physics-week-11",
  week: "Week 11",
  title: "Circular motion, density and relative density",
  subtitle: "Study bodies moving in circles with angular speed, centripetal acceleration and force, meet force fields, and learn to measure mass, weight, density and relative density.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Describe uniform circular motion and define period, frequency and angular speed.",
    "Use v = ωr, a = v²/r and F = mv²/r in calculations.",
    "Explain centripetal and centrifugal forces and give examples of what supplies the centripetal force.",
    "Name the three kinds of force field.",
    "Define density and relative density, and describe how to measure them for solids and liquids.",
  ],
  sections: [
    {
      heading: "1. Uniform circular motion",
      paragraphs: [
        "A body moves in uniform circular motion when it travels round a circle at constant speed. Examples are a stone whirled on a string, a point on the blade of a fan, a child on a merry-go-round, the Moon going round the Earth and a car going round a roundabout at a steady speed.",
        "Even though the speed is constant, the direction of motion changes all the time, so the velocity changes. At any instant the velocity is along the tangent to the circle at that point. Because the velocity is changing, the body has an acceleration, even though its speed is constant, and so there must be a force acting on it.",
      ],
      diagram: "Draw a circle with centre O and a body at point P on the circle. Draw the radius OP, the velocity v along the tangent at P, and the acceleration a pointing from P towards O. Repeat at a second point to show that the direction of v changes.",
    },
    {
      heading: "2. Period, frequency and angular speed",
      paragraphs: [
        "The period T is the time for one complete revolution, in seconds. The frequency f is the number of revolutions per second, in hertz (Hz), and f = 1 ÷ T. If a wheel turns 30 times in 60 s, then f = 0.5 Hz and T = 2 s.",
        "Angles in physics are measured in radians. One radian is the angle at the centre of a circle subtended by an arc equal in length to the radius. A full turn is 2π radians, which is 360°, so 1 rad ≈ 57.3°. If an arc of length s on a circle of radius r subtends an angle θ, then θ = s ÷ r.",
        "Angular speed ω is the angle swept out per second: ω = θ ÷ t, in rad/s. For one complete revolution, θ = 2π and t = T, so ω = 2π ÷ T = 2πf. The linear speed v of the body is related to ω by v = ωr. A point twice as far from the centre moves at twice the speed. For a wheel turning at 5 revolutions per second, ω = 2π × 5 = 10π ≈ 31.4 rad/s. To change revolutions per minute to rad/s, multiply by 2π ÷ 60.",
      ],
    },
    {
      heading: "3. Centripetal acceleration and force",
      paragraphs: [
        "The acceleration of a body in uniform circular motion is directed towards the centre of the circle and is called centripetal acceleration: a = v² ÷ r = ω²r. By Newton’s second law, the force needed to produce it, the centripetal force, is also directed towards the centre: F = mv² ÷ r = mω²r.",
        "The centripetal force is not a special new force. It is the name for whatever force acts towards the centre. For a stone whirled on a string, it is the tension in the string. For a car on a level bend, it is friction between the tyres and the road. For the Moon and satellites, it is gravity. A centripetal force is always at right angles to the velocity, so it changes the direction of the motion but not the speed.",
        "Example 1: A 0.4 kg stone is whirled on a string in a horizontal circle of radius 0.5 m at 5 m/s. Centripetal acceleration a = v² ÷ r = 25 ÷ 0.5 = 50 m/s². The tension is F = ma = 0.4 × 50 = 20 N. If the speed is doubled, the force becomes four times as large; if the radius is halved at the same speed, the force doubles.",
      ],
      points: [
        "a = v² ÷ r = ω²r, towards the centre.",
        "F = mv² ÷ r = mω²r, towards the centre.",
        "Supplied by: tension (string), friction (car on a bend), gravity (satellite).",
        "Doubling the speed gives four times the force (F ∝ v²).",
      ],
    },
    {
      heading: "4. Centrifugal force and daily life",
      paragraphs: [
        "When you whirl a stone on a string, you feel the string pulling outwards on your hand. This outward pull is called the centrifugal force. Textbooks describe it as the reaction to the centripetal force: equal in size and opposite in direction, and it acts on the hand or on the centre, not on the stone. It is not a force that pushes the stone away from the centre. If the string breaks, the stone does not fly straight out along the radius; it moves off along the tangent in a straight line, because of its inertia.",
        "Circular motion explains the washing-machine dryer and the centrifuge, which spin liquids so that heavier particles move to the outside; the banking of racing tracks and roads at bends; and the way riders on a fast roundabout feel pressed outwards. Passengers in a car on a bend feel thrown to the outside only because their bodies tend to keep going in a straight line.",
      ],
    },
    {
      heading: "5. Force fields",
      paragraphs: [
        "A force field is a region in which a body experiences a force without touching the source of the force. The three kinds you must know are the gravitational field around a mass, which pulls other masses towards it; the electric field around a charged body, which acts on other charges; and the magnetic field around a magnet or a wire carrying current, which acts on magnets and magnetic materials. Gravitational field strength is the force per kilogram: g = F ÷ m, about 10 N/kg near the Earth. Field lines are drawn to show the direction of a field, and the closer they are, the stronger the field.",
      ],
    },
    {
      heading: "6. Mass, weight and density",
      paragraphs: [
        "Mass is the quantity of matter in a body, measured in kilograms, and it stays the same everywhere. Weight is the gravitational force on a body, measured in newtons, with W = mg. A 5 kg mass weighs 50 N on Earth, where g = 10 N/kg.",
        "Density ρ (the Greek letter rho) is the mass per unit volume: ρ = m ÷ V. The SI unit is kg/m³, and the laboratory unit is g/cm³; 1 g/cm³ = 1000 kg/m³. The density of water is 1000 kg/m³ (1 g/cm³). Typical values: kerosene about 800, ice 920, aluminium 2700, iron 7800, copper 8900, lead 11 300 and mercury 13 600 kg/m³; air is only about 1.2 kg/m³. A substance whose density is less than that of a liquid floats on it, and one with greater density sinks.",
        "To measure density, find the mass with a balance and the volume by the method suited to the object. For a regular solid, calculate the volume from its dimensions, for example length × breadth × height. For an irregular solid, use the displacement of water in a measuring cylinder. For a liquid, find the mass of an empty cylinder (m₁), pour in a known volume V and weigh again (m₂); then ρ = (m₂ − m₁) ÷ V.",
      ],
    },
    {
      heading: "7. Relative density",
      paragraphs: [
        "Relative density (R.D.) is the ratio of the density of a substance to the density of water. It is also the ratio of the mass of a substance to the mass of an equal volume of water. Because it is a ratio of two similar quantities, it has no unit. The R.D. of copper is 8.9 and of kerosene is 0.8. To change R.D. to density in kg/m³, multiply by 1000.",
        "With a density bottle, weigh it empty (m₁), full of the liquid (m₂) and full of water (m₃). Then R.D. of the liquid = (m₂ − m₁) ÷ (m₃ − m₁). For example, if m₁ = 25.0 g, m₂ = 75.0 g and m₃ = 65.0 g, the R.D. = 50.0 ÷ 40.0 = 1.25, so the liquid’s density is 1250 kg/m³.",
        "Using upthrust (Archimedes’ principle), a solid that sinks has R.D. = weight in air ÷ (weight in air − weight in water). A metal weighing 3.0 N in air and 2.0 N when fully immersed has an R.D. of 3.0 ÷ 1.0 = 3.0. A hydrometer measures the R.D. of a liquid directly: it floats lower in a less dense liquid. Hydrometers are used to test the acid in car batteries and the quality of milk.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "In uniform circular motion the speed is constant but the velocity is not, because its direction keeps changing.",
    "Centripetal acceleration and force always point towards the centre. The velocity is along the tangent, at 90° to them.",
    "Centripetal force is the net force towards the centre, such as tension, friction or gravity. It is not an extra force added to those.",
    "If the string breaks, the body moves off along the tangent, not along the radius.",
    "Angular speed is in rad/s. Convert rev/min by multiplying by 2π ÷ 60 before using v = ωr.",
    "Doubling the speed multiplies the centripetal force by four, because F is proportional to v².",
    "Density has the unit kg/m³ (or g/cm³). Relative density has no unit. 1 g/cm³ equals 1000 kg/m³.",
    "Convert cm³ to m³ before using kg/m³: 1 cm³ = 10⁻⁶ m³.",
    "A body floats in water if its relative density is less than 1. Steel ships float because the hollow hull gives a low average density.",
    "Mass is constant; weight changes with g. Weight is a vector (force) and mass is a scalar.",
  ],
  summary:
    "A body in uniform circular motion has constant speed but changing velocity, so it accelerates towards the centre. The period T and frequency f describe the rotation, and the angular speed is ω = 2πf, with v = ωr. Centripetal acceleration is v² ÷ r and the centripetal force is mv² ÷ r, supplied by tension, friction or gravity; centrifugal force is the outward reaction. Gravitational, electric and magnetic fields are force fields. Density is mass per unit volume (kg/m³), and relative density is the ratio of the density of a substance to that of water and has no unit; both can be found by weighing and by displacement or a density bottle.",
  quick: {
    intro: "Week 11 revision sheet. Learn the circular motion formulas and the density methods.",
    blocks: [
      {
        heading: "1. Circular motion formulas",
        points: [
          "f = 1 ÷ T. ω = 2π ÷ T = 2πf (rad/s). v = ωr.",
          "a = v² ÷ r = ω²r (towards the centre).",
          "F = mv² ÷ r = mω²r (centripetal force).",
          "2π rad = 360°.",
        ],
      },
      {
        heading: "2. Concepts",
        points: [
          "Velocity is along the tangent; acceleration and force point to the centre.",
          "Centripetal force is supplied by tension, friction or gravity.",
          "Centrifugal force: the outward reaction (on the string or hand).",
          "Fields: gravitational, electric, magnetic.",
        ],
        warning: "A string that breaks sends the body along the tangent.",
      },
      {
        heading: "3. Density and relative density",
        points: [
          "ρ = m ÷ V; kg/m³; 1 g/cm³ = 1000 kg/m³; water = 1000 kg/m³.",
          "R.D. = density of substance ÷ density of water; no unit.",
          "Density bottle: R.D. = (m₂ − m₁) ÷ (m₃ − m₁).",
          "Sinking solid: R.D. = weight in air ÷ (weight in air − weight in water).",
        ],
        memory: "Floats if R.D. < 1, sinks if R.D. > 1 (in water).",
      },
    ],
    likely: [
      { question: "Why is a body moving in a circle at constant speed said to be accelerating?", answer: "Its direction, and so its velocity, changes continuously." },
      { question: "State the direction of the velocity and acceleration of a body in uniform circular motion.", answer: "Velocity along the tangent; acceleration (and force) towards the centre." },
      { question: "Write the formula for centripetal force.", answer: "F = mv² ÷ r = mω²r." },
      { question: "A wheel turns at 3 revolutions per second. Find ω.", answer: "ω = 2π × 3 = 6π ≈ 18.8 rad/s." },
      { question: "State what supplies the centripetal force for a stone whirled on a string, and for a satellite.", answer: "The tension in the string; the gravitational pull of the Earth." },
      { question: "Define density and relative density.", answer: "Density is mass per unit volume. Relative density is the ratio of the density of a substance to the density of water." },
      { question: "A block has mass 600 g and volume 300 cm³. Find its density in g/cm³ and kg/m³.", answer: "600 ÷ 300 = 2 g/cm³ = 2000 kg/m³." },
      { question: "State the units of density and relative density.", answer: "Density: kg/m³ (or g/cm³). Relative density: no unit." },
      { question: "Name the three types of force field.", answer: "Gravitational, electric and magnetic fields." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "In uniform circular motion, the velocity of the body at any point is directed", options: ["towards the centre", "away from the centre", "along the tangent to the circle", "opposite to the acceleration"], answer: "C" },
    { number: 2, kind: "Objective", prompt: "The centripetal acceleration of a body moving in a circle is directed", options: ["along the tangent", "towards the centre of the circle", "away from the centre", "opposite to the velocity"], answer: "B" },
    { number: 3, kind: "Objective", prompt: "A body moves at 6 m/s round a circle of radius 3 m. Its centripetal acceleration is", options: ["2 m/s²", "18 m/s²", "36 m/s²", "12 m/s²"], answer: "D", explanation: "a = v² ÷ r = 36 ÷ 3 = 12 m/s²." },
    { number: 4, kind: "Objective", prompt: "A 2 kg mass moves at 5 m/s round a circle of radius 0.5 m. The centripetal force is", options: ["100 N", "20 N", "10 N", "25 N"], answer: "A", explanation: "F = mv² ÷ r = 2 × 25 ÷ 0.5 = 100 N." },
    { number: 5, kind: "Objective", prompt: "A wheel rotates at a frequency of 4 Hz. Its angular speed is", options: ["4π rad/s", "8π rad/s", "2π rad/s", "16π rad/s"], answer: "B" },
    { number: 6, kind: "Objective", prompt: "A fan completes 30 revolutions in 60 s. Its period is", options: ["0.5 s", "30 s", "2 s", "60 s"], answer: "C" },
    { number: 7, kind: "Objective", prompt: "A mass moves in a circle of fixed radius. If its speed is doubled, the centripetal force required becomes", options: ["doubled", "halved", "unchanged", "four times as large"], answer: "D" },
    { number: 8, kind: "Objective", prompt: "A stone is whirled in a horizontal circle on a string and the string suddenly breaks. The stone moves", options: ["along the tangent to the circle", "towards the centre", "away from the centre along the radius", "in a smaller circle"], answer: "A" },
    { number: 9, kind: "Objective", prompt: "Which of the following is a vector quantity?", options: ["Mass", "Volume", "Weight", "Density"], answer: "C" },
    { number: 10, kind: "Objective", prompt: "The weight of a 5 kg object on Earth (g = 10 N/kg) is", options: ["5 N", "0.5 N", "500 N", "50 N"], answer: "D" },
    { number: 11, kind: "Objective", prompt: "A block has a mass of 540 g and a volume of 200 cm³. Its density is", options: ["2.7 g/cm³", "0.37 g/cm³", "108 g/cm³", "340 g/cm³"], answer: "A" },
    { number: 12, kind: "Objective", prompt: "A liquid has a density of 0.8 g/cm³. In kg/m³ this is", options: ["0.8", "8", "8000", "800"], answer: "D" },
    { number: 13, kind: "Objective", prompt: "The volume of 4 kg of a liquid of density 800 kg/m³ is", options: ["0.005 m³", "0.2 m³", "200 m³", "3200 m³"], answer: "A", explanation: "V = m ÷ ρ = 4 ÷ 800 = 0.005 m³." },
    { number: 14, kind: "Objective", prompt: "A liquid has a density of 800 kg/m³. Its relative density is", options: ["800", "0.8", "0.08", "1.25"], answer: "B" },
    { number: 15, kind: "Objective", prompt: "A density bottle has a mass of 20 g when empty, 68 g when full of a liquid and 60 g when full of water. The relative density of the liquid is", options: ["0.83", "1.2", "1.5", "3.4"], answer: "B", explanation: "R.D. = (68 − 20) ÷ (60 − 20) = 48 ÷ 40 = 1.2." },
    { number: 16, kind: "Objective", prompt: "A solid will float in water if its relative density is", options: ["greater than 1", "equal to 10", "less than 1", "exactly 2"], answer: "C" },
    { number: 17, kind: "Theory", prompt: "Define uniform circular motion. Explain why a body moving in a circle at constant speed is accelerating, and state the direction of the acceleration.", answer: "Uniform circular motion is motion round a circle at constant speed. Velocity is a vector; although the speed is constant, the direction changes continuously, so the velocity changes. A changing velocity means acceleration. The acceleration (centripetal acceleration) is directed towards the centre of the circle." },
    { number: 18, kind: "Theory", prompt: "A stone of mass 0.4 kg is whirled in a horizontal circle of radius 0.5 m at a speed of 5 m/s. Calculate (a) its centripetal acceleration and (b) the tension in the string.", answer: "(a) a = v² ÷ r = 25 ÷ 0.5 = 50 m/s². (b) The tension supplies the centripetal force: T = ma = 0.4 × 50 = 20 N." },
    { number: 19, kind: "Theory", prompt: "A wheel rotates 240 times per minute. Find (a) its frequency, (b) its period, (c) its angular speed and (d) the speed of a point 0.3 m from the axis. (Take π = 3.14)", answer: "(a) f = 240 ÷ 60 = 4 Hz. (b) T = 1 ÷ 4 = 0.25 s. (c) ω = 2πf = 2 × 3.14 × 4 = 25.1 rad/s. (d) v = ωr = 25.1 × 0.3 ≈ 7.5 m/s." },
    { number: 20, kind: "Theory", prompt: "Explain the terms centripetal force and centrifugal force, and name what supplies the centripetal force for (a) a stone whirled on a string and (b) the Moon going round the Earth.", answer: "Centripetal force is the force directed towards the centre that keeps a body moving in a circle. Centrifugal force is the outward reaction to it, acting on the string or the hand, not on the body, and it is not what makes the body leave the circle. (a) The tension in the string. (b) The gravitational attraction of the Earth." },
    { number: 21, kind: "Theory", prompt: "Define density and relative density, state the units of each and give one difference between them.", answer: "Density is the mass per unit volume of a substance, with unit kg/m³ (or g/cm³). Relative density is the ratio of the density of a substance to the density of water. Density has a unit but relative density has no unit." },
    { number: 22, kind: "Theory", prompt: "Describe how to find the density of a liquid using a measuring cylinder and a balance. In an experiment the empty cylinder had a mass of 85 g, and with 50 cm³ of liquid its mass was 125 g. Calculate the density.", answer: "Find the mass of the empty measuring cylinder (m₁). Pour in a volume V of the liquid, reading the volume at the bottom of the meniscus, and find the mass again (m₂). Density = (m₂ − m₁) ÷ V = (125 − 85) ÷ 50 = 0.8 g/cm³, which is 800 kg/m³." },
    { number: 23, kind: "Theory", prompt: "A rectangular block measures 5 cm by 4 cm by 10 cm and has a mass of 1.6 kg. Calculate its density in kg/m³ and its relative density.", answer: "Volume = 5 × 4 × 10 = 200 cm³ = 2.0 × 10⁻⁴ m³. Density = 1.6 ÷ (2.0 × 10⁻⁴) = 8000 kg/m³. Relative density = 8000 ÷ 1000 = 8." },
    { number: 24, kind: "Theory", prompt: "Describe how to find the relative density of a liquid with a density bottle. In an experiment the empty bottle had a mass of 25.0 g, full of liquid 75.0 g and full of water 65.0 g. Calculate the relative density and the density of the liquid.", answer: "Weigh the dry empty bottle (m₁), then full of the liquid (m₂), then empty, rinse, dry, and weigh full of water (m₃). R.D. = (m₂ − m₁) ÷ (m₃ − m₁) = 50.0 ÷ 40.0 = 1.25. Density = 1.25 × 1000 = 1250 kg/m³." },
  ] as PracticeQuestion[],
};
