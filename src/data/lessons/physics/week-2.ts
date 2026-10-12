import type { Lesson, LessonSection, PracticeQuestion } from "../types";

export const phyWeek2: Lesson = {
  id: "ss1-first-physics-week-2",
  week: "Week 02",
  title: "Fundamental and derived quantities and units",
  subtitle: "Learn what a physical quantity is, name the seven SI base quantities, build derived units from them and use dimensions, prefixes and standard form with confidence.",
  source: "Written by Edify for the SS1 First Term Physics scheme of work. The explanations, examples and practice questions are original.",
  objectives: [
    "Explain what is meant by a physical quantity and a unit, and why standard units are needed.",
    "List the seven fundamental quantities with their SI units and symbols.",
    "Define derived quantities and derive their units from defining equations.",
    "Find the dimensions of a quantity and use them to test whether an equation is consistent.",
    "Use SI prefixes and standard form, and convert between units.",
  ],
  sections: [
    {
      heading: "1. Quantities and units",
      paragraphs: [
        "A physical quantity is a property of an object or event that can be measured. Length, mass, time, speed and temperature are physical quantities; beauty and kindness are not, because they cannot be measured. Every measurement has two parts, a number and a unit. ‘The table is 2’ means nothing, but ‘The table is 2 metres long’ does.",
        "In the past, different towns used different units, such as arm lengths and baskets, so trade and science became confusing. Today scientists in every country use the International System of Units, called the SI (from the French Système International). It is built on the metric system and makes sure that a measurement made in Lagos means exactly the same thing in Lisbon.",
      ],
    },
    {
      heading: "2. Fundamental quantities and units",
      paragraphs: [
        "Fundamental (or base) quantities are the quantities that cannot be defined in terms of other quantities. Every other quantity can be built from them. The SI has seven. The unit of a fundamental quantity is a fundamental (base) unit.",
      ],
      points: [
        "Length: metre (m).",
        "Mass: kilogram (kg).",
        "Time: second (s).",
        "Electric current: ampere (A).",
        "Thermodynamic temperature: kelvin (K); a temperature in kelvin equals the Celsius temperature plus 273.",
        "Amount of substance: mole (mol).",
        "Luminous intensity: candela (cd).",
      ],
    },
    {
      heading: "3. Derived quantities and units",
      paragraphs: [
        "A derived quantity is formed by multiplying or dividing fundamental quantities. Its unit, the derived unit, is formed in the same way from base units. Speed is length divided by time, so its unit is metre per second. Some derived units are given special names to save writing: the newton, joule, watt and pascal are named after scientists.",
        "To derive a unit, follow these steps. (1) Write the defining equation. (2) Replace each quantity with the base quantities it is made of. (3) Put in the base units. (4) Simplify and write the answer with indices. For example, force = mass × acceleration, and acceleration = velocity ÷ time = length ÷ time². So the unit of force is kg × m ÷ s² = kg m s⁻², which is called the newton (N). Pressure is force ÷ area, so its unit is kg m s⁻² ÷ m² = kg m⁻¹ s⁻², called the pascal (Pa).",
      ],
      points: [
        "Area: length × breadth, m². Volume: length × breadth × height, m³.",
        "Density: mass ÷ volume, kg m⁻³. Speed and velocity: m s⁻¹. Acceleration: m s⁻².",
        "Force: mass × acceleration, newton, N = kg m s⁻².",
        "Work and energy: force × distance, joule, J = N m = kg m² s⁻².",
        "Power: work ÷ time, watt, W = J s⁻¹ = kg m² s⁻³.",
        "Pressure: force ÷ area, pascal, Pa = N m⁻² = kg m⁻¹ s⁻².",
        "Momentum: mass × velocity, kg m s⁻¹. Frequency: cycles per second, hertz, Hz = s⁻¹.",
      ],
    },
    {
      heading: "4. Dimensions",
      paragraphs: [
        "The dimensions of a quantity show how it depends on the basic quantities. In mechanics, only three are needed: length [L], mass [M] and time [T]. We write the dimensions of a quantity in square brackets, for example [velocity] = LT⁻¹, because velocity is length divided by time.",
        "Using the same steps as for units, [acceleration] = LT⁻², [force] = MLT⁻², [work or energy] = ML²T⁻², [power] = ML²T⁻³, [density] = ML⁻³ and [pressure] = ML⁻¹T⁻². Some quantities have no dimensions at all. They are ratios of two similar quantities, such as relative density, refractive index, efficiency and angles measured in radians. Numbers like 2, ½ and π also have no dimensions.",
      ],
    },
    {
      heading: "5. Using dimensions to test an equation",
      paragraphs: [
        "A correct physical equation must be dimensionally consistent: every term that is added or subtracted, and both sides of the equals sign, must have the same dimensions. Take s = ut + ½at². The dimension of s is L. For ut, it is LT⁻¹ × T = L. For ½at², it is LT⁻² × T² = L. Every term has dimension L, so the equation passes the test. Now test v = u + at². Here [v] = LT⁻¹, but [at²] = LT⁻² × T² = L. The terms do not match, so the equation must be wrong.",
        "Dimensions have limits. They can show that an equation is wrong, but not that it is complete, because they cannot detect pure numbers such as ½ or 2π. They also cannot tell apart quantities that have the same dimensions. Work and torque, for example, both have dimensions ML²T⁻².",
      ],
    },
    {
      heading: "6. Prefixes, standard form and conversions",
      paragraphs: [
        "Prefixes are placed before a unit to show multiples or fractions of it. Standard form writes a number as A × 10ⁿ, where A is at least 1 and less than 10 and n is a whole number. For example, 4 500 000 W = 4.5 × 10⁶ W and 0.00032 m = 3.2 × 10⁻⁴ m.",
      ],
      points: [
        "giga (G) = 10⁹, mega (M) = 10⁶, kilo (k) = 10³.",
        "deci (d) = 10⁻¹, centi (c) = 10⁻², milli (m) = 10⁻³.",
        "micro (µ) = 10⁻⁶, nano (n) = 10⁻⁹.",
        "Speed: to change km/h to m/s, multiply by 1000 and divide by 3600 (that is, divide by 3.6). So 72 km/h = 20 m/s.",
        "Density: 1 g/cm³ = 1000 kg/m³, so 2.7 g/cm³ = 2700 kg/m³.",
        "Area and volume: 1 m² = 10 000 cm² and 1 m³ = 1 000 000 cm³, because the conversion factor must be squared or cubed.",
        "Time: 1 hour = 3600 s. Volume: 1 litre = 1000 cm³.",
      ],
    },
  ] as LessonSection[],
  hiddenFacts: [
    "The kilogram, not the gram, is the SI base unit of mass. It is the only base unit with a prefix.",
    "The name of a unit written in full begins with a small letter (newton), but its symbol is a capital when the unit is named after a person (N).",
    "A newton is the same as kg m s⁻². A joule is N m and a watt is J s⁻¹. Know how to rewrite them in base units.",
    "Relative density, angles, efficiency and refractive index have no units and no dimensions.",
    "Dimensions can prove an equation wrong but cannot prove it right. Missing numbers such as ½ are invisible to them.",
    "When converting area or volume, square or cube the length factor: 1 m² is 10 000 cm², not 100 cm².",
    "Minutes, hours and kilometres per hour are not SI. Convert to seconds, and to metres per second, before substituting into equations.",
    "Kelvin is written K, with no degree sign. 0 °C is 273 K.",
  ],
  summary:
    "Physical quantities are measurable properties and every measurement needs a number and a unit. The SI has seven fundamental quantities: length, mass, time, electric current, temperature, amount of substance and luminous intensity, with the units metre, kilogram, second, ampere, kelvin, mole and candela. Derived quantities such as area, density, velocity, force, energy, power and pressure are built from them, and their units come from their defining equations. Dimensions L, M and T test whether an equation is consistent. Prefixes, standard form and correct conversion factors keep calculations accurate.",
  quick: {
    intro: "Week 2 revision sheet. Learn the seven base units, the common derived units in base form, and the dimension of each mechanical quantity.",
    blocks: [
      {
        heading: "1. Fundamental quantities (SI)",
        points: [
          "Length m · Mass kg · Time s.",
          "Current A · Temperature K · Amount of substance mol · Luminous intensity cd.",
        ],
        memory: "Seven base units: Metre, Kilogram, Second, Ampere, Kelvin, Mole, Candela, like ‘MKS-AKMC’.",
      },
      {
        heading: "2. Derived units",
        points: [
          "Velocity m s⁻¹ · acceleration m s⁻² · density kg m⁻³.",
          "Force N = kg m s⁻² · pressure Pa = kg m⁻¹ s⁻².",
          "Work/energy J = kg m² s⁻² · power W = kg m² s⁻³.",
          "Momentum kg m s⁻¹ · frequency Hz = s⁻¹.",
        ],
      },
      {
        heading: "3. Dimensions",
        points: [
          "Velocity LT⁻¹ · acceleration LT⁻² · force MLT⁻².",
          "Energy ML²T⁻² · power ML²T⁻³ · pressure ML⁻¹T⁻² · density ML⁻³.",
          "No dimensions: relative density, angles, efficiency, refractive index.",
          "Check an equation: every term must have the same dimensions.",
        ],
        warning: "Dimensions cannot detect a missing number like ½ or 2π.",
      },
      {
        heading: "4. Prefixes and conversions",
        points: [
          "k = 10³, M = 10⁶, G = 10⁹, c = 10⁻², m = 10⁻³, µ = 10⁻⁶, n = 10⁻⁹.",
          "km/h ÷ 3.6 = m/s. 1 g/cm³ = 1000 kg/m³.",
          "Standard form: A × 10ⁿ with 1 ≤ A < 10.",
        ],
      },
    ],
    likely: [
      { question: "Define a fundamental quantity and give three examples.", answer: "A fundamental quantity is one that cannot be expressed in terms of other quantities. Examples: length, mass and time." },
      { question: "List the seven SI base units.", answer: "Metre, kilogram, second, ampere, kelvin, mole, candela." },
      { question: "What is a derived unit? Give two examples with their base-unit forms.", answer: "A unit obtained by combining base units. Newton = kg m s⁻²; joule = kg m² s⁻²; also watt = kg m² s⁻³." },
      { question: "Derive the SI unit of pressure.", answer: "Pressure = force ÷ area = (kg m s⁻²) ÷ m² = kg m⁻¹ s⁻² = pascal (Pa)." },
      { question: "Find the dimensions of power.", answer: "Power = work ÷ time = ML²T⁻² ÷ T = ML²T⁻³." },
      { question: "Name two quantities that have no dimensions.", answer: "Relative density and refractive index (also efficiency and angles)." },
      { question: "Convert 108 km/h to m/s.", answer: "108 × 1000 ÷ 3600 = 30 m/s." },
      { question: "Write 0.00072 s in standard form.", answer: "7.2 × 10⁻⁴ s." },
      { question: "Test the equation v = u + at for dimensional consistency.", answer: "[v] = LT⁻¹; [u] = LT⁻¹; [at] = LT⁻² × T = LT⁻¹. All terms match, so the equation is consistent." },
    ],
  },
  questions: [
    { number: 1, kind: "Objective", prompt: "Which of the following is a fundamental quantity?", options: ["Area", "Mass", "Force", "Velocity"], answer: "B", explanation: "Mass is one of the seven base quantities. The others listed are built from base quantities." },
    { number: 2, kind: "Objective", prompt: "The SI unit of electric current is the", options: ["volt", "coulomb", "watt", "ampere"], answer: "D" },
    { number: 3, kind: "Objective", prompt: "Which pair correctly gives a fundamental quantity and its SI base unit?", options: ["Time and second", "Mass and gram", "Length and kilometre", "Temperature and degree Celsius"], answer: "A" },
    { number: 4, kind: "Objective", prompt: "Which of these is a derived unit?", options: ["kilogram", "metre", "newton", "second"], answer: "C" },
    { number: 5, kind: "Objective", prompt: "The SI unit of density, in base units, is", options: ["kg m⁻³", "kg m³", "g cm⁻³", "kg m⁻²"], answer: "A" },
    { number: 6, kind: "Objective", prompt: "The newton, written in base units, is", options: ["kg m s⁻¹", "kg m² s⁻²", "kg m⁻¹ s⁻²", "kg m s⁻²"], answer: "D", explanation: "Force = mass × acceleration, so its unit is kg × m s⁻² = kg m s⁻²." },
    { number: 7, kind: "Objective", prompt: "The dimensions of velocity are", options: ["LT", "LT⁻¹", "L⁻¹T", "LT⁻²"], answer: "B" },
    { number: 8, kind: "Objective", prompt: "The dimensions of pressure are", options: ["MLT⁻²", "ML²T⁻²", "ML⁻¹T⁻²", "ML⁻²T⁻²"], answer: "C", explanation: "Pressure = force ÷ area = MLT⁻² ÷ L² = ML⁻¹T⁻²." },
    { number: 9, kind: "Objective", prompt: "Which of these quantities has no dimensions?", options: ["Relative density", "Density", "Pressure", "Speed"], answer: "A" },
    { number: 10, kind: "Objective", prompt: "3.5 km expressed in metres, in standard form, is", options: ["3.5 × 10⁻³ m", "3.5 × 10² m", "3.5 × 10⁴ m", "3.5 × 10³ m"], answer: "D" },
    { number: 11, kind: "Objective", prompt: "A bus moves at 54 km/h. Its speed in m/s is", options: ["5", "15", "54", "194"], answer: "B", explanation: "54 ÷ 3.6 = 15 m/s." },
    { number: 12, kind: "Objective", prompt: "A metal has a density of 2.5 g/cm³. In kg/m³ this is", options: ["0.0025", "25", "2 500", "250 000"], answer: "C", explanation: "1 g/cm³ = 1000 kg/m³, so 2.5 g/cm³ = 2500 kg/m³." },
    { number: 13, kind: "Objective", prompt: "Which of these equations is dimensionally correct? (v and u are velocities, a is acceleration, s is distance and t is time.)", options: ["v² = u² + 2as", "v = u + at²", "s = ut + at", "s = vt²"], answer: "A", explanation: "In v² = u² + 2as every term has dimensions L²T⁻²." },
    { number: 14, kind: "Objective", prompt: "The prefix ‘micro’ means", options: ["10⁻³", "10⁻⁹", "10⁶", "10⁻⁶"], answer: "D" },
    { number: 15, kind: "Theory", prompt: "(a) Define a fundamental quantity and a derived quantity. (b) List the seven fundamental quantities with their SI units and symbols.", answer: "(a) A fundamental quantity cannot be defined in terms of other quantities; a derived quantity is obtained by combining fundamental quantities. (b) Length, metre, m; mass, kilogram, kg; time, second, s; electric current, ampere, A; temperature, kelvin, K; amount of substance, mole, mol; luminous intensity, candela, cd." },
    { number: 16, kind: "Theory", prompt: "Derive the SI unit of (a) pressure and (b) power in terms of base units.", answer: "(a) Pressure = force ÷ area. Force = kg m s⁻², area = m², so pressure = kg m s⁻² ÷ m² = kg m⁻¹ s⁻² (pascal). (b) Power = work ÷ time. Work = force × distance = kg m s⁻² × m = kg m² s⁻², so power = kg m² s⁻² ÷ s = kg m² s⁻³ (watt)." },
    { number: 17, kind: "Theory", prompt: "Find the dimensions of (a) density, (b) force and (c) work.", answer: "(a) Density = mass ÷ volume = M ÷ L³ = ML⁻³. (b) Force = mass × acceleration = M × LT⁻² = MLT⁻². (c) Work = force × distance = MLT⁻² × L = ML²T⁻²." },
    { number: 18, kind: "Theory", prompt: "Show that the equation s = ut + ½at² is dimensionally consistent. State one limitation of the dimensional method.", answer: "[s] = L. [ut] = LT⁻¹ × T = L. [½at²] = LT⁻² × T² = L (the ½ has no dimensions). All three terms have dimension L, so the equation is consistent. Limitation: it cannot detect numerical factors such as ½, so an equation can pass the test and still be wrong." },
    { number: 19, kind: "Theory", prompt: "Convert (a) 90 km/h to m/s, (b) 0.8 g/cm³ to kg/m³ and (c) 5 cm² to m².", answer: "(a) 90 × 1000 ÷ 3600 = 25 m/s. (b) 0.8 × 1000 = 800 kg/m³. (c) 1 cm = 10⁻² m, so 1 cm² = 10⁻⁴ m² and 5 cm² = 5 × 10⁻⁴ m²." },
    { number: 20, kind: "Theory", prompt: "Write in standard form: (a) 0.000056 m, (b) 7 200 000 W and (c) 0.0305 s.", answer: "(a) 5.6 × 10⁻⁵ m. (b) 7.2 × 10⁶ W. (c) 3.05 × 10⁻² s." },
  ] as PracticeQuestion[],
};
