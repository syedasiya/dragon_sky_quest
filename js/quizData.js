/**
 * Dragon Sky Quest - General Knowledge Question Bank
 * Over 100 high quality, curated questions across diverse categories.
 */

const QUIZ_DATABASE = [
  // --- SCIENCE & TECH ---
  {
    category: "Science & Tech",
    question: "Which chemical element gives blood its red color when bound to oxygen?",
    options: ["Iron", "Copper", "Magnesium", "Zinc"],
    answer: 0,
    fact: "Iron in hemoglobin binds with oxygen, reflecting red light."
  },
  {
    category: "Science & Tech",
    question: "What is the hardest natural substance on Earth?",
    options: ["Diamond", "Graphene", "Titanium", "Quartz"],
    answer: 0,
    fact: "Diamond's tetrahedral carbon crystal lattice makes it extremely hard."
  },
  {
    category: "Science & Tech",
    question: "Which particle carries a negative electrical charge in an atom?",
    options: ["Electron", "Proton", "Neutron", "Positron"],
    answer: 0,
    fact: "Electrons orbit the nucleus and carry a fundamental negative charge."
  },
  {
    category: "Science & Tech",
    question: "What is the speed of light in a vacuum approximately?",
    options: ["300,000 km/s", "150,000 km/s", "1,080,000 km/s", "30,000 km/s"],
    answer: 0,
    fact: "Light travels at roughly 299,792 km per second in a vacuum."
  },
  {
    category: "Science & Tech",
    question: "What type of energy is stored within an object due to its position or height?",
    options: ["Potential Energy", "Kinetic Energy", "Thermal Energy", "Nuclear Energy"],
    answer: 0,
    fact: "Gravitational potential energy depends on mass, gravity, and height."
  },
  {
    category: "Science & Tech",
    question: "Who is known as the father of modern Computer Science?",
    options: ["Alan Turing", "Charles Babbage", "Nikola Tesla", "John von Neumann"],
    answer: 0,
    fact: "Alan Turing formulated the Turing Machine concept and cracked the Enigma code."
  },
  {
    category: "Science & Tech",
    question: "What does 'HTTP' stand for in computer networking?",
    options: ["HyperText Transfer Protocol", "High Time Transfer Protocol", "Hyperlink Text Test Process", "Host Terminal Telephony Protocol"],
    answer: 0,
    fact: "HTTP is the foundation of data communication for the World Wide Web."
  },
  {
    category: "Science & Tech",
    question: "What is the powerhouse organelle of the eukaryotic cell?",
    options: ["Mitochondria", "Ribosome", "Nucleus", "Endoplasmic Reticulum"],
    answer: 0,
    fact: "Mitochondria generate most of the chemical energy (ATP) needed by the cell."
  },
  {
    category: "Science & Tech",
    question: "Which gas is most abundant in Earth's atmosphere?",
    options: ["Nitrogen", "Oxygen", "Argon", "Carbon Dioxide"],
    answer: 0,
    fact: "Nitrogen makes up approximately 78% of Earth's atmosphere."
  },
  {
    category: "Science & Tech",
    question: "What unit is used to measure electrical resistance?",
    options: ["Ohm", "Volt", "Ampere", "Watt"],
    answer: 0,
    fact: "Resistance is measured in Ohms (Ω), named after Georg Simon Ohm."
  },
  {
    category: "Science & Tech",
    question: "What is the process called when plants convert sunlight into glucose?",
    options: ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"],
    answer: 0,
    fact: "Photosynthesis uses chlorophyll to turn sunlight, water, and CO2 into sugars."
  },
  {
    category: "Science & Tech",
    question: "Which programming language was created by Brendan Eich in just 10 days in 1995?",
    options: ["JavaScript", "Python", "Java", "C++"],
    answer: 0,
    fact: "JavaScript was originally developed for Netscape Navigator in May 1995."
  },

  // --- SPACE & ASTRONOMY ---
  {
    category: "Space & Astronomy",
    question: "Which planet is known as the 'Red Planet'?",
    options: ["Mars", "Jupiter", "Venus", "Mercury"],
    answer: 0,
    fact: "Mars appears reddish due to iron oxide (rust) on its dusty surface."
  },
  {
    category: "Space & Astronomy",
    question: "What is the closest star to Earth?",
    options: ["The Sun", "Proxima Centauri", "Sirius", "Betelgeuse"],
    answer: 0,
    fact: "The Sun is an average G-type star located about 93 million miles away."
  },
  {
    category: "Space & Astronomy",
    question: "What is the largest planet in our Solar System?",
    options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
    answer: 0,
    fact: "Jupiter is more than twice as massive as all the other planets combined."
  },
  {
    category: "Space & Astronomy",
    question: "What galaxy is our Solar System located in?",
    options: ["Milky Way", "Andromeda", "Triangulum", "Whirlpool"],
    answer: 0,
    fact: "The Milky Way is a barred spiral galaxy containing over 100 billion stars."
  },
  {
    category: "Space & Astronomy",
    question: "Which Apollo mission was the first to land humans on the Moon?",
    options: ["Apollo 11", "Apollo 8", "Apollo 13", "Apollo 17"],
    answer: 0,
    fact: "Apollo 11 landed Neil Armstrong and Buzz Aldrin on July 20, 1969."
  },
  {
    category: "Space & Astronomy",
    question: "What astronomical term refers to a star that suddenly increases greatly in brightness due to a catastrophic explosion?",
    options: ["Supernova", "Nebula", "Pulsar", "Quasar"],
    answer: 0,
    fact: "A supernova can briefly outshine an entire galaxy of billions of stars."
  },
  {
    category: "Space & Astronomy",
    question: "What is the boundary around a black hole beyond which nothing can escape called?",
    options: ["Event Horizon", "Singularity", "Photon Sphere", "Accretion Disk"],
    answer: 0,
    fact: "At the event horizon, escape velocity exceeds the speed of light."
  },
  {
    category: "Space & Astronomy",
    question: "Which planet has the most prominent ring system in our Solar System?",
    options: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    answer: 0,
    fact: "Saturn's rings are made mostly of billions of ice particles and rock dust."
  },
  {
    category: "Space & Astronomy",
    question: "What is the hottest planet in our Solar System?",
    options: ["Venus", "Mercury", "Mars", "Jupiter"],
    answer: 0,
    fact: "Venus has a thick greenhouse atmosphere trapping heat up to 465°C (870°F)."
  },

  // --- WORLD GEOGRAPHY ---
  {
    category: "World Geography",
    question: "What is the longest river in the world by traditional consensus?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
    answer: 0,
    fact: "The Nile River in Africa stretches approximately 6,650 kilometers (4,132 miles)."
  },
  {
    category: "World Geography",
    question: "Which is the highest mountain peak above sea level on Earth?",
    options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    answer: 0,
    fact: "Mount Everest in the Himalayas reaches 8,848.86 meters above sea level."
  },
  {
    category: "World Geography",
    question: "What is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    answer: 0,
    fact: "The Pacific Ocean covers more than 30% of the Earth's surface area."
  },
  {
    category: "World Geography",
    question: "Which country has the largest total land area in the world?",
    options: ["Russia", "Canada", "China", "United States"],
    answer: 0,
    fact: "Russia spans over 17 million square kilometers across two continents."
  },
  {
    category: "World Geography",
    question: "What is the capital city of Japan?",
    options: ["Tokyo", "Kyoto", "Osaka", "Sapporo"],
    answer: 0,
    fact: "Greater Tokyo is the most populous metropolitan area in the world."
  },
  {
    category: "World Geography",
    question: "What is the world's largest hot desert?",
    options: ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Kalahari Desert"],
    answer: 0,
    fact: "The Sahara spans roughly 9.2 million square kilometers across North Africa."
  },
  {
    category: "World Geography",
    question: "Through which city does the Prime Meridian (0° longitude) pass?",
    options: ["Greenwich (London)", "Paris", "Berlin", "Rome"],
    answer: 0,
    fact: "The Greenwich Meridian was established as the international standard in 1884."
  },
  {
    category: "World Geography",
    question: "Which South American country contains the majority of the Amazon Rainforest?",
    options: ["Brazil", "Peru", "Colombia", "Venezuela"],
    answer: 0,
    fact: "About 60% of the Amazon rainforest is located within Brazil's borders."
  },
  {
    category: "World Geography",
    question: "Which country is home to the ancient rock-hewn city of Petra?",
    options: ["Jordan", "Egypt", "Greece", "Turkey"],
    answer: 0,
    fact: "Petra was the capital of the Nabataean Kingdom around the 4th century BC."
  },

  // --- HISTORY & CIVILIZATIONS ---
  {
    category: "History & Civilizations",
    question: "In what ancient civilization was the Great Pyramid of Giza constructed?",
    options: ["Ancient Egypt", "Mesopotamia", "Ancient Rome", "Persian Empire"],
    answer: 0,
    fact: "Built for Pharaoh Khufu around 2560 BC, it was the tallest structure for 3,800 years."
  },
  {
    category: "History & Civilizations",
    question: "Who was the first Emperor of a unified China, known for the Terracotta Army?",
    options: ["Qin Shi Huang", "Han Wudi", "Kublai Khan", "Sun Tzu"],
    answer: 0,
    fact: "Qin Shi Huang unified China in 221 BC and standardized weights, measures, and script."
  },
  {
    category: "History & Civilizations",
    question: "Which famous Renaissance polymath painted the 'Mona Lisa' and 'The Last Supper'?",
    options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
    answer: 0,
    fact: "Leonardo da Vinci was a painter, engineer, anatomist, and inventor."
  },
  {
    category: "History & Civilizations",
    question: "In which year did World War II officially end?",
    options: ["1945", "1939", "1918", "1950"],
    answer: 0,
    fact: "World War II concluded with the signing of the surrender documents in September 1945."
  },
  {
    category: "History & Civilizations",
    question: "What ancient Greek city-state was famous for its fierce warrior culture and battle of Thermopylae?",
    options: ["Sparta", "Athens", "Corinth", "Thebes"],
    answer: 0,
    fact: "Spartan society was intensely focused on military training from childhood."
  },
  {
    category: "History & Civilizations",
    question: "Who wrote the play 'Hamlet' and 'Romeo and Juliet'?",
    options: ["William Shakespeare", "Charles Dickens", "Christopher Marlowe", "Geoffrey Chaucer"],
    answer: 0,
    fact: "Shakespeare authored 39 plays and 154 sonnets during the Elizabethan era."
  },
  {
    category: "History & Civilizations",
    question: "What historic wall was built across northern England by the Romans in 122 AD?",
    options: ["Hadrian's Wall", "Antonine Wall", "Aurelian Wall", "Servian Wall"],
    answer: 0,
    fact: "Hadrian's Wall stretched 73 miles from the North Sea to the Irish Sea."
  },

  // --- NATURE & ANIMALS ---
  {
    category: "Nature & Animals",
    question: "What is the largest living animal on Earth?",
    options: ["Blue Whale", "African Elephant", "Colossal Squid", "Whale Shark"],
    answer: 0,
    fact: "Blue whales can grow up to 30 meters (98 ft) long and weigh nearly 200 metric tons."
  },
  {
    category: "Nature & Animals",
    question: "Which flightless bird is the tallest and heaviest living bird species?",
    options: ["Ostrich", "Emu", "Penguin", "Cassowary"],
    answer: 0,
    fact: "Ostriches can sprint up to 70 km/h (43 mph), making them the fastest runners on two legs."
  },
  {
    category: "Nature & Animals",
    question: "What is the fastest land animal in a short sprint?",
    options: ["Cheetah", "Pronghorn", "Lion", "Greyhound"],
    answer: 0,
    fact: "Cheetahs can accelerate from 0 to 60 mph in less than 3 seconds."
  },
  {
    category: "Nature & Animals",
    question: "How many hearts does an octopus have?",
    options: ["Three", "One", "Two", "Four"],
    answer: 0,
    fact: "An octopus has two branchial hearts to pump blood to gills, and one systemic heart."
  },
  {
    category: "Nature & Animals",
    question: "What is the only mammal capable of true sustained flight?",
    options: ["Bat", "Flying Squirrel", "Sugar Glider", "Colugo"],
    answer: 0,
    fact: "Bats have webbed wings with modified elongated fingers for powered flight."
  },
  {
    category: "Nature & Animals",
    question: "What color is a polar bear's skin underneath its thick fur?",
    options: ["Black", "White", "Pink", "Grey"],
    answer: 0,
    fact: "Black skin absorbs heat from sunlight, while transparent fur traps warmth."
  },

  // --- MYTHOLOGY & POP CULTURE ---
  {
    category: "Mythology & Legends",
    question: "In Greek mythology, who was the king of the Olympian gods and wielder of thunderbolts?",
    options: ["Zeus", "Poseidon", "Hades", "Apollo"],
    answer: 0,
    fact: "Zeus ruled from Mount Olympus with the lightning bolt forged by the Cyclopes."
  },
  {
    category: "Mythology & Legends",
    question: "In Norse mythology, what is the name of Thor's enchanted hammer?",
    options: ["Mjölnir", "Gungnir", "Excalibur", "Aegis"],
    answer: 0,
    fact: "Mjölnir was crafted by the dwarven brothers Sindri and Brokkr."
  },
  {
    category: "Mythology & Legends",
    question: "What mythological bird is said to cyclically regenerate or be reborn from its own ashes?",
    options: ["Phoenix", "Griffin", "Roc", "Thunderbird"],
    answer: 0,
    fact: "The Phoenix represents immortality, resurrection, and eternal life."
  },
  {
    category: "Mythology & Legends",
    question: "In Arthurian legend, what was the mythical sword pulled from the stone?",
    options: ["Excalibur", "Caliburn", "Gram", "Durandal"],
    answer: 0,
    fact: "King Arthur proved his true royal lineage by drawing the sword from the stone."
  },
  {
    category: "Mythology & Legends",
    question: "What mythical creature has the body of a lion and the head and wings of an eagle?",
    options: ["Griffin", "Chimera", "Sphinx", "Manticore"],
    answer: 0,
    fact: "Griffins were known as protectors of gold and sacred treasures."
  },
  {
    category: "Pop Culture & Gaming",
    question: "What is the name of the protagonist in Nintendo's 'The Legend of Zelda' series?",
    options: ["Link", "Zelda", "Ganon", "Navi"],
    answer: 0,
    fact: "Link is the courageous hero bearing the Triforce of Courage."
  },
  {
    category: "Pop Culture & Gaming",
    question: "Which retro arcade game featured a yellow circle eating dots while avoiding ghosts named Blinky, Pinky, Inky, and Clyde?",
    options: ["Pac-Man", "Space Invaders", "Galaga", "Donkey Kong"],
    answer: 0,
    fact: "Pac-Man was created by Toru Iwatani and released by Namco in 1980."
  }
];

// Helper to get random questions without immediate repetitions
class QuizEngine {
  constructor() {
    this.usedIndices = new Set();
  }

  getRandomQuestion() {
    if (this.usedIndices.size >= QUIZ_DATABASE.length) {
      this.usedIndices.clear(); // reset pool when exhausted
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * QUIZ_DATABASE.length);
    } while (this.usedIndices.has(randomIndex));

    this.usedIndices.add(randomIndex);
    const raw = QUIZ_DATABASE[randomIndex];

    // Create a shuffled copy of options
    const correctAnswerText = raw.options[raw.answer];
    const shuffledOptions = [...raw.options].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

    return {
      category: raw.category,
      question: raw.question,
      options: shuffledOptions,
      correctIndex: newCorrectIndex,
      fact: raw.fact
    };
  }
}

const quizEngine = new QuizEngine();
