/**
 * ============================================================================
 * DRAGON SKY QUEST - Complete 2D Arcade Engine (game.js)
 * Realistic Fantasy Dragon Flight Physics & GK Quiz Adventure
 * Tagline: "Fly. Collect. Think. Survive."
 * ============================================================================
 */

/* ----------------------------------------------------------------------------
 * 1. GENERAL KNOWLEDGE QUESTION BANK (120+ Curated Questions across 12 Categories)
 * ---------------------------------------------------------------------------- */
const GK_QUESTION_BANK = [
  // India
  { q: "What is the national animal of India?", opts: ["Royal Bengal Tiger", "Indian Lion", "Asian Elephant", "Peacock"], ans: 0, cat: "India" },
  { q: "Which city is known as the 'Pink City' of India?", opts: ["Jaipur", "Udaipur", "Jodhpur", "Bhopal"], ans: 0, cat: "India" },
  { q: "Which is the longest river flowing entirely within India?", opts: ["Ganga", "Godavari", "Yamuna", "Narmada"], ans: 0, cat: "India" },
  { q: "In which year did India gain independence from British rule?", opts: ["1947", "1950", "1942", "1935"], ans: 0, cat: "India" },
  { q: "Who is known as the 'Father of the Indian Constitution'?", opts: ["Dr. B. R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"], ans: 0, cat: "India" },
  { q: "Which state in India is known as the 'Spice Garden of India'?", opts: ["Kerala", "Karnataka", "Tamil Nadu", "Assam"], ans: 0, cat: "India" },
  { q: "What is the national aquatic animal of India?", opts: ["Ganges River Dolphin", "Gharial", "Blue Whale", "Dugong"], ans: 0, cat: "India" },
  { q: "Which monument in India was built by Emperor Shah Jahan in memory of his wife?", opts: ["Taj Mahal", "Qutub Minar", "Red Fort", "Hawa Mahal"], ans: 0, cat: "India" },
  { q: "What is the highest civilian award in India?", opts: ["Bharat Ratna", "Padma Vibhushan", "Param Vir Chakra", "Padma Bhushan"], ans: 0, cat: "India" },
  { q: "Which Indian city is famously known as the 'Silicon Valley of India'?", opts: ["Bengaluru", "Hyderabad", "Pune", "Gurugram"], ans: 0, cat: "India" },

  // World Geography & Landmarks
  { q: "What is the capital of Australia?", opts: ["Canberra", "Sydney", "Melbourne", "Brisbane"], ans: 0, cat: "Geography" },
  { q: "Which is the largest ocean on Earth?", opts: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"], ans: 0, cat: "Geography" },
  { q: "What is the tallest mountain peak above sea level on Earth?", opts: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"], ans: 0, cat: "Geography" },
  { q: "Which country has the largest total land area in the world?", opts: ["Russia", "Canada", "China", "United States"], ans: 0, cat: "Geography" },
  { q: "What is the longest river in the world by traditional consensus?", opts: ["Nile", "Amazon", "Yangtze", "Mississippi"], ans: 0, cat: "Geography" },
  { q: "Which desert is the largest hot desert in the world?", opts: ["Sahara Desert", "Gobi Desert", "Kalahari Desert", "Thar Desert"], ans: 0, cat: "Geography" },
  { q: "What is the capital city of Japan?", opts: ["Tokyo", "Kyoto", "Osaka", "Nagoya"], ans: 0, cat: "Geography" },
  { q: "Which European country is shaped like a boot?", opts: ["Italy", "Spain", "Greece", "Portugal"], ans: 0, cat: "Geography" },
  { q: "In which country can you find the ancient ruins of Machu Picchu?", opts: ["Peru", "Chile", "Brazil", "Mexico"], ans: 0, cat: "Geography" },
  { q: "Which strait separates the continents of Asia and North America?", opts: ["Bering Strait", "Gibraltar Strait", "Malacca Strait", "Bosphorus"], ans: 0, cat: "Geography" },
  { q: "What is the smallest independent state in the world by area?", opts: ["Vatican City", "Monaco", "Nauru", "San Marino"], ans: 0, cat: "Geography" },
  { q: "Which country is called the 'Land of the Rising Sun'?", opts: ["Japan", "Norway", "Thailand", "New Zealand"], ans: 0, cat: "Geography" },

  // Science & Technology
  { q: "What is the chemical symbol for Gold?", opts: ["Au", "Ag", "Fe", "Gd"], ans: 0, cat: "Science" },
  { q: "What gas do green plants absorb from the air during photosynthesis?", opts: ["Carbon Dioxide", "Oxygen", "Nitrogen", "Methane"], ans: 0, cat: "Science" },
  { q: "What is the hardest naturally occurring mineral found on Earth?", opts: ["Diamond", "Corundum", "Quartz", "Topaz"], ans: 0, cat: "Science" },
  { q: "Who formulated the theory of General Relativity?", opts: ["Albert Einstein", "Isaac Newton", "Niels Bohr", "Galileo Galilei"], ans: 0, cat: "Science" },
  { q: "What is the powerhouse organelle of the eukaryotic cell?", opts: ["Mitochondria", "Nucleus", "Ribosome", "Endoplasmic Reticulum"], ans: 0, cat: "Science" },
  { q: "Which blood group is known as the universal donor in humans?", opts: ["O Negative", "AB Positive", "A Positive", "B Negative"], ans: 0, cat: "Science" },
  { q: "What is the speed of light in a vacuum approximately?", opts: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"], ans: 0, cat: "Science" },
  { q: "Who invented the telephone in 1876?", opts: ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"], ans: 0, cat: "Inventions" },
  { q: "What does 'CPU' stand for in computer systems?", opts: ["Central Processing Unit", "Computer Power Unit", "Core Program Unit", "Central Peripheral Utility"], ans: 0, cat: "Technology" },
  { q: "Which metal is in a liquid state at standard room temperature?", opts: ["Mercury", "Gallium", "Lead", "Bromine"], ans: 0, cat: "Science" },
  { q: "What is the pH level of pure neutral distilled water?", opts: ["7", "5", "9", "0"], ans: 0, cat: "Science" },
  { q: "Who discovered Penicillin, the world's first true antibiotic?", opts: ["Alexander Fleming", "Louis Pasteur", "Edward Jenner", "Robert Koch"], ans: 0, cat: "Inventions" },

  // Space & Astronomy
  { q: "Which planet is known as the 'Red Planet'?", opts: ["Mars", "Venus", "Jupiter", "Mercury"], ans: 0, cat: "Space" },
  { q: "What is the closest star to planet Earth?", opts: ["The Sun", "Proxima Centauri", "Sirius", "Alpha Centauri A"], ans: 0, cat: "Space" },
  { q: "What is the largest planet in our solar system?", opts: ["Jupiter", "Saturn", "Neptune", "Uranus"], ans: 0, cat: "Space" },
  { q: "Which planet is famous for having the most prominent ring system?", opts: ["Saturn", "Jupiter", "Uranus", "Neptune"], ans: 0, cat: "Space" },
  { q: "Who was the first human to step onto the surface of the Moon in 1969?", opts: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Michael Collins"], ans: 0, cat: "Space" },
  { q: "What galaxy is home to our solar system?", opts: ["Milky Way", "Andromeda", "Triangulum", "Whirlpool"], ans: 0, cat: "Space" },
  { q: "What is the hottest planet in our solar system due to greenhouse gases?", opts: ["Venus", "Mercury", "Mars", "Jupiter"], ans: 0, cat: "Space" },
  { q: "What celestial phenomenon occurs when the Moon passes directly between the Sun and Earth?", opts: ["Solar Eclipse", "Lunar Eclipse", "Supermoon", "Equinox"], ans: 0, cat: "Space" },

  // History & Famous Personalities
  { q: "Who was the first President of the United States?", opts: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "Benjamin Franklin"], ans: 0, cat: "History" },
  { q: "In which year did World War II conclude?", opts: ["1945", "1939", "1918", "1950"], ans: 0, cat: "History" },
  { q: "Who painted the world-famous masterpiece 'Mona Lisa'?", opts: ["Leonardo da Vinci", "Michelangelo", "Vincent van Gogh", "Pablo Picasso"], ans: 0, cat: "History" },
  { q: "What ancient civilization built the Great Pyramids of Giza?", opts: ["Ancient Egyptians", "Mesopotamians", "Ancient Romans", "Persians"], ans: 0, cat: "History" },
  { q: "Who was the legendary playwright who wrote 'Romeo and Juliet' and 'Hamlet'?", opts: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Homer"], ans: 0, cat: "History" },
  { q: "Which French military commander was defeated at the Battle of Waterloo in 1815?", opts: ["Napoleon Bonaparte", "Louis XIV", "Charles de Gaulle", "Joan of Arc"], ans: 0, cat: "History" },

  // Nature & Animals
  { q: "What is the largest living animal species on Earth?", opts: ["Blue Whale", "African Bush Elephant", "Colossal Squid", "Whale Shark"], ans: 0, cat: "Animals" },
  { q: "Which flightless bird is the fastest runner on land?", opts: ["Ostrich", "Emu", "Roadrunner", "Cassowary"], ans: 0, cat: "Animals" },
  { q: "What is the only mammal naturally capable of true sustained flight?", opts: ["Bat", "Flying Squirrel", "Sugar Glider", "Colugo"], ans: 0, cat: "Animals" },
  { q: "How many hearts does an octopus have?", opts: ["Three", "One", "Two", "Four"], ans: 0, cat: "Animals" },
  { q: "What is the fastest land animal in a short sprint?", opts: ["Cheetah", "Lion", "Pronghorn Antelope", "Greyhound"], ans: 0, cat: "Animals" },
  { q: "Which animal is popularly known as the 'Ship of the Desert'?", opts: ["Camel", "Horse", "Llama", "Donkey"], ans: 0, cat: "Animals" },

  // Sports & General Awareness
  { q: "How many players are on the field for each team in standard soccer (football)?", opts: ["11", "9", "10", "12"], ans: 0, cat: "Sports" },
  { q: "How many rings are featured in the official Olympic symbol?", opts: ["5", "4", "6", "7"], ans: 0, cat: "Sports" },
  { q: "In cricket, how many runs are scored when the ball crosses the boundary rope on the full?", opts: ["6", "4", "5", "8"], ans: 0, cat: "Sports" },
  { q: "Which country won the FIFA Men's World Cup in 2022?", opts: ["Argentina", "France", "Brazil", "Germany"], ans: 0, cat: "Sports" },
  { q: "In chess, which piece can only move diagonally across the board?", opts: ["Bishop", "Knight", "Rook", "Pawn"], ans: 0, cat: "Sports" },
  { q: "What is the standard duration of a marathon race in kilometers?", opts: ["42.195 km", "21.1 km", "50 km", "35 km"], ans: 0, cat: "Sports" }
];

/* ----------------------------------------------------------------------------
 * 2. PROCEDURAL SOUND SYNTHESIZER (Web Audio API)
 * ---------------------------------------------------------------------------- */
class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    const saved = localStorage.getItem('dsq_sound_enabled');
    if (saved !== null) this.enabled = saved === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('dsq_sound_enabled', this.enabled);
    if (this.enabled) this.playClick();
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch(e) {}
  }

  playCoin() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sine';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(987.77, t); // B5
      osc1.frequency.setValueAtTime(1318.51, t + 0.07); // E6
      osc2.frequency.setValueAtTime(1975.53, t); // B6
      osc2.frequency.setValueAtTime(2637.02, t + 0.07); // E7
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.3);
      osc2.stop(t + 0.3);
    } catch(e) {}
  }

  playBirdHit() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      // Impact thump
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(200, t);
      osc.frequency.exponentialRampToValueAtTime(35, t + 0.25);
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);

      // Bird screech / cry
      const screech = this.ctx.createOscillator();
      const screechGain = this.ctx.createGain();
      screech.type = 'triangle';
      screech.frequency.setValueAtTime(800, t);
      screech.frequency.linearRampToValueAtTime(1350, t + 0.08);
      screech.frequency.exponentialRampToValueAtTime(350, t + 0.28);
      screechGain.gain.setValueAtTime(0.3, t);
      screechGain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
      screech.connect(screechGain);
      screechGain.connect(this.ctx.destination);
      screech.start(t);
      screech.stop(t + 0.28);
    } catch(e) {}
  }

  playRockHit() {
    this.playBirdHit();
  }

  playGroundCrash() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.exponentialRampToValueAtTime(20, t + 0.5);
      gain.gain.setValueAtTime(0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    } catch(e) {}
  }

  playCorrect() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.1);
        gain.gain.setValueAtTime(0.25, t + idx * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.1 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + idx * 0.1);
        osc.stop(t + idx * 0.1 + 0.3);
      });
    } catch(e) {}
  }

  playWrong() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.setValueAtTime(130, t + 0.15);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.35);
    } catch(e) {}
  }

  playPowerUp() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.25);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch(e) {}
  }

  playGameOver() {
    if (!this.enabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const sadNotes = [440, 415.3, 392, 349.23];
      sadNotes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + i * 0.25);
        gain.gain.setValueAtTime(0.3, t + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.25 + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t + i * 0.25);
        osc.stop(t + i * 0.25 + 0.35);
      });
    } catch(e) {}
  }
}

const sounds = new SoundSystem();

/* ----------------------------------------------------------------------------
 * 2.6. OBSTACLE BIRD SPECIES
 * ---------------------------------------------------------------------------- */
const BIRD_SPECIES = [
  {
    type: 'falcon',
    name: 'Sky Falcon',
    radius: 20,
    speedFactor: 1.22,
    bodyColor: '#334155',
    bellyColor: '#f1f5f9',
    wingColor: '#1e293b',
    wingTipColor: '#0f172a',
    beakColor: '#f59e0b',
    eyeColor: '#fbbf24',
    featherCount: 4,
    flapSpeed: 0.28
  },
  {
    type: 'hawk',
    name: 'Canyon Hawk',
    radius: 26,
    speedFactor: 1.0,
    bodyColor: '#78350f',
    bellyColor: '#fef3c7',
    wingColor: '#92400e',
    wingTipColor: '#451a03',
    beakColor: '#f59e0b',
    eyeColor: '#f59e0b',
    featherCount: 5,
    flapSpeed: 0.20
  },
  {
    type: 'raven',
    name: 'Shadow Raven',
    radius: 24,
    speedFactor: 1.1,
    bodyColor: '#0f172a',
    bellyColor: '#1e1b4b',
    wingColor: '#1e293b',
    wingTipColor: '#581c87',
    beakColor: '#cbd5e1',
    eyeColor: '#c084fc',
    featherCount: 5,
    flapSpeed: 0.22
  },
  {
    type: 'eagle',
    name: 'Golden Eagle',
    radius: 32,
    speedFactor: 0.95,
    bodyColor: '#451a03',
    bellyColor: '#d97706',
    wingColor: '#78350f',
    wingTipColor: '#fbbf24',
    beakColor: '#f59e0b',
    eyeColor: '#fde047',
    featherCount: 6,
    flapSpeed: 0.16
  },
  {
    type: 'roc',
    name: 'Storm Roc',
    radius: 40,
    speedFactor: 0.85,
    bodyColor: '#1e1b4b',
    bellyColor: '#38bdf8',
    wingColor: '#0f172a',
    wingTipColor: '#818cf8',
    beakColor: '#38bdf8',
    eyeColor: '#67e8f9',
    featherCount: 7,
    flapSpeed: 0.14
  }
];

/* ----------------------------------------------------------------------------
 * 3. SKY WORLD STAGES & PARALLAX BACKGROUND
 * ---------------------------------------------------------------------------- */
const SKY_STAGES = [
  {
    name: "Stage 1: Azure Sky",
    skyGradient: ["#0369a1", "#0284c7", "#38bdf8", "#7dd3fc", "#bae6fd"],
    sunColor: "rgba(255, 250, 204, 0.95)",
    sunGlow: "rgba(251, 191, 36, 0.28)",
    sunPos: { x: 0.78, y: 0.18, r: 42 },
    farMountainColor: "rgba(12, 74, 96, 0.45)",
    mountainColor: "#0f766e",
    midHillColor: "#115e59",
    cloudColor: "rgba(255, 255, 255, 0.88)",
    cloudShadow: "rgba(186, 230, 253, 0.50)",
    groundColor: "#1e3a2f",
    soilBaseColor: "#17252a",
    grassColors: ["#22c55e", "#16a34a", "#15803d", "#4ade80"],
    flowerColors: ["#fbbf24", "#f43f5e", "#ffffff", "#c084fc"],
    rockFill: "#576574",
    rockBorder: "#222f3e"
  },
  {
    name: "Stage 2: Sunset Horizon",
    skyGradient: ["#31103f", "#6b114d", "#9d174d", "#ea580c", "#f97316", "#fde047"],
    sunColor: "rgba(254, 240, 138, 0.95)",
    sunGlow: "rgba(249, 115, 22, 0.35)",
    sunPos: { x: 0.72, y: 0.30, r: 52 },
    farMountainColor: "rgba(74, 4, 78, 0.50)",
    mountainColor: "#701a75",
    midHillColor: "#581c87",
    cloudColor: "rgba(254, 205, 211, 0.85)",
    cloudShadow: "rgba(157, 23, 77, 0.45)",
    groundColor: "#3b1706",
    soilBaseColor: "#1c0b02",
    grassColors: ["#ea580c", "#d97706", "#65a30d", "#facc15"],
    flowerColors: ["#fb7185", "#fde047", "#f43f5e", "#fed7aa"],
    rockFill: "#b45309",
    rockBorder: "#78350f"
  },
  {
    name: "Stage 3: Storm Peaks",
    skyGradient: ["#020617", "#0f172a", "#1e293b", "#334155", "#475569"],
    sunColor: "rgba(226, 232, 240, 0.75)",
    sunGlow: "rgba(148, 163, 184, 0.20)",
    sunPos: { x: 0.82, y: 0.20, r: 35 },
    farMountainColor: "rgba(15, 23, 42, 0.65)",
    mountainColor: "#0f172a",
    midHillColor: "#1e293b",
    cloudColor: "rgba(148, 163, 184, 0.85)",
    cloudShadow: "rgba(30, 41, 59, 0.70)",
    groundColor: "#1e293b",
    soilBaseColor: "#090d16",
    grassColors: ["#475569", "#10b981", "#059669", "#334155"],
    flowerColors: ["#38bdf8", "#94a3b8", "#e2e8f0"],
    rockFill: "#334155",
    rockBorder: "#0f172a"
  },
  {
    name: "Stage 4: Mystic Aurora",
    skyGradient: ["#030712", "#110e2b", "#1e1b4b", "#3b0764", "#581c87", "#701a75"],
    sunColor: "rgba(192, 132, 252, 0.85)",
    sunGlow: "rgba(168, 85, 247, 0.35)",
    sunPos: { x: 0.68, y: 0.16, r: 40 },
    farMountainColor: "rgba(30, 27, 75, 0.60)",
    mountainColor: "#2e1065",
    midHillColor: "#3b0764",
    cloudColor: "rgba(233, 213, 255, 0.75)",
    cloudShadow: "rgba(88, 28, 135, 0.50)",
    groundColor: "#1e0b36",
    soilBaseColor: "#110520",
    grassColors: ["#a855f7", "#06b6d4", "#2dd4bf", "#c084fc"],
    flowerColors: ["#38bdf8", "#f472b6", "#a7f3d0", "#e879f9"],
    rockFill: "#6b21a8",
    rockBorder: "#3b0764"
  },
  {
    name: "Stage 5: Cosmic Void",
    skyGradient: ["#000000", "#090414", "#180928", "#380e54", "#6b21a8"],
    sunColor: "rgba(244, 114, 182, 0.90)",
    sunGlow: "rgba(217, 70, 239, 0.30)",
    sunPos: { x: 0.75, y: 0.22, r: 44 },
    farMountainColor: "rgba(24, 9, 40, 0.75)",
    mountainColor: "#1e0b36",
    midHillColor: "#2a0845",
    cloudColor: "rgba(240, 171, 252, 0.55)",
    cloudShadow: "rgba(107, 33, 168, 0.55)",
    groundColor: "#160524",
    soilBaseColor: "#0a0210",
    grassColors: ["#ec4899", "#8b5cf6", "#06b6d4", "#f43f5e"],
    flowerColors: ["#f472b6", "#67e8f9", "#fef08a", "#e879f9"],
    rockFill: "#831843",
    rockBorder: "#500724"
  }
];

/* ----------------------------------------------------------------------------
 * 3.5. MYTHICAL DRAGON CUSTOMIZATION SKINS
 * ---------------------------------------------------------------------------- */
const DRAGON_SKINS = {
  emerald: {
    id: 'emerald',
    name: 'Emerald Drake',
    desc: 'Ancient guardian of the verdant high peaks with jade scales and gold belly.',
    bodyBase: '#1b4332',
    bodyMid: '#2d6a4f',
    bodyHighlight: '#52b788',
    border: '#0d2818',
    bellyBase: '#fef08a',
    bellyGroove: '#d97706',
    wingOuter: '#143628',
    wingGrad1: 'rgba(45, 106, 79, 0.92)',
    wingGrad2: 'rgba(74, 222, 128, 0.78)',
    wingGrad3: 'rgba(27, 67, 50, 0.90)',
    wingSpar: '#0d2818',
    wingVein: 'rgba(255, 255, 255, 0.25)',
    horn: '#d97706',
    hornBorder: '#92400e',
    hornCheek: '#b45309',
    hornTip: '#fde047',
    eyeIris: '#fde047',
    eyePupil: '#000000',
    claws: '#d97706',
    tailSpade: '#d97706',
    palette: ['#2d6a4f', '#52b788', '#fef08a', '#d97706']
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson Inferno',
    desc: 'Forged inside molten volcanic fissures with blazing flame membranes.',
    bodyBase: '#450a0a',
    bodyMid: '#7f1d1d',
    bodyHighlight: '#ef4444',
    border: '#2a0404',
    bellyBase: '#fbbf24',
    bellyGroove: '#dc2626',
    wingOuter: '#2a0404',
    wingGrad1: 'rgba(185, 28, 28, 0.95)',
    wingGrad2: 'rgba(249, 115, 22, 0.85)',
    wingGrad3: 'rgba(127, 29, 29, 0.92)',
    wingSpar: '#450a0a',
    wingVein: 'rgba(254, 240, 138, 0.35)',
    horn: '#1c1917',
    hornBorder: '#ef4444',
    hornCheek: '#7f1d1d',
    hornTip: '#fbbf24',
    eyeIris: '#f97316',
    eyePupil: '#000000',
    claws: '#fbbf24',
    tailSpade: '#ef4444',
    palette: ['#7f1d1d', '#ef4444', '#f97316', '#fbbf24']
  },
  shadow: {
    id: 'shadow',
    name: 'Shadow Wyrm',
    desc: 'Ethereal phantom wyrm cloaked in midnight void and glowing amethysts.',
    bodyBase: '#09090b',
    bodyMid: '#18181b',
    bodyHighlight: '#a855f7',
    border: '#000000',
    bellyBase: '#e9d5ff',
    bellyGroove: '#9333ea',
    wingOuter: '#0f051d',
    wingGrad1: 'rgba(88, 28, 135, 0.95)',
    wingGrad2: 'rgba(192, 132, 252, 0.80)',
    wingGrad3: 'rgba(30, 27, 75, 0.95)',
    wingSpar: '#3b0764',
    wingVein: 'rgba(233, 213, 255, 0.35)',
    horn: '#6b21a8',
    hornBorder: '#3b0764',
    hornCheek: '#9333ea',
    hornTip: '#c084fc',
    eyeIris: '#c084fc',
    eyePupil: '#000000',
    claws: '#a855f7',
    tailSpade: '#c084fc',
    palette: ['#18181b', '#581c87', '#c084fc', '#e9d5ff']
  },
  frost: {
    id: 'frost',
    name: 'Glacial Frost Wyrm',
    desc: 'Chill monarch of blizzard summits with crystal scales and arctic breath.',
    bodyBase: '#0c4a6e',
    bodyMid: '#0284c7',
    bodyHighlight: '#38bdf8',
    border: '#082f49',
    bellyBase: '#f0fdf4',
    bellyGroove: '#0284c7',
    wingOuter: '#082f49',
    wingGrad1: 'rgba(14, 116, 144, 0.92)',
    wingGrad2: 'rgba(125, 211, 252, 0.82)',
    wingGrad3: 'rgba(3, 105, 161, 0.90)',
    wingSpar: '#075985',
    wingVein: 'rgba(255, 255, 255, 0.45)',
    horn: '#e0f2fe',
    hornBorder: '#0284c7',
    hornCheek: '#7dd3fc',
    hornTip: '#bae6fd',
    eyeIris: '#38bdf8',
    eyePupil: '#082f49',
    claws: '#7dd3fc',
    tailSpade: '#38bdf8',
    palette: ['#0284c7', '#38bdf8', '#bae6fd', '#f0fdf4']
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Sun Wyrm',
    desc: 'Radiant solar deity endowed with pure golden scales and aurora brilliance.',
    bodyBase: '#78350f',
    bodyMid: '#b45309',
    bodyHighlight: '#fde047',
    border: '#451a03',
    bellyBase: '#fffbeb',
    bellyGroove: '#f59e0b',
    wingOuter: '#451a03',
    wingGrad1: 'rgba(217, 119, 6, 0.95)',
    wingGrad2: 'rgba(254, 240, 138, 0.85)',
    wingGrad3: 'rgba(180, 83, 9, 0.90)',
    wingSpar: '#78350f',
    wingVein: 'rgba(255, 255, 255, 0.50)',
    horn: '#fef08a',
    hornBorder: '#ca8a04',
    hornCheek: '#eab308',
    hornTip: '#fde047',
    eyeIris: '#38bdf8',
    eyePupil: '#451a03',
    claws: '#fde047',
    tailSpade: '#facc15',
    palette: ['#b45309', '#f59e0b', '#fde047', '#fffbeb']
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Rift Wyrm',
    desc: 'Ancient titan forged in dark obsidian stone, pulsing with electric-blue fissures, multi-pronged horns, and a piercing crimson eye.',
    bodyBase: '#0d0e14',
    bodyMid: '#181a24',
    bodyHighlight: '#38bdf8',
    border: '#050608',
    bellyBase: '#12141c',
    bellyGroove: '#0284c7',
    wingOuter: '#0a0b10',
    wingGrad1: 'rgba(20, 22, 32, 0.96)',
    wingGrad2: 'rgba(32, 36, 50, 0.90)',
    wingGrad3: 'rgba(10, 11, 16, 0.95)',
    wingSpar: '#10121a',
    wingRidge: '#d97706',
    wingVein: 'rgba(56, 189, 248, 0.70)',
    horn: '#141620',
    hornBorder: '#06070a',
    hornCheek: '#1e212f',
    hornTip: '#ca8a04',
    eyeIris: '#ef4444',
    eyePupil: '#000000',
    claws: '#0a0b10',
    tailSpade: '#38bdf8',
    hasLightningVeins: true,
    palette: ['#0d0e14', '#181a24', '#38bdf8', '#ef4444']
  }
};

/* ----------------------------------------------------------------------------
 * 4. MASTER GAME ENGINE CLASS
 * ---------------------------------------------------------------------------- */
const QUIZ_INTERVAL = 50;

class DragonGame {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.getElementById('game-container');
    this.flashOverlay = document.getElementById('flash-overlay');

    // Virtual Internal Resolution (16:9 HD)
    this.width = 1280;
    this.height = 720;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Ground level boundary (Section 3: Ground Touch = Immediate Game Over)
    this.groundLevel = this.height - 65; // At 655px
    this.groundOffset = 0;

    // Game States: 'MENU', 'PLAYING', 'QUIZ', 'PAUSED', 'GAME_OVER'
    this.state = 'MENU';

    // Core Metrics
    this.score = 0;
    this.coins = 0;
    this.distance = 0;
    this.lives = 3;
    this.maxLives = 3;

    // Customization Skins (Persisted in LocalStorage)
    this.selectedDragonSkin = localStorage.getItem('dsq_dragon_skin') || 'emerald';
    if (!DRAGON_SKINS[this.selectedDragonSkin]) this.selectedDragonSkin = 'emerald';

    // Live Skin Preview Animation Variables
    this.previewWingAngle = 0;
    this.previewTime = 0;

    // Milestone Quiz Trigger (Starts at 50, triggers every 50 coins)
    this.quizInterval = QUIZ_INTERVAL;
    this.nextQuizMilestone = QUIZ_INTERVAL;
    this.nextQuizCoins = QUIZ_INTERVAL; // Compatibility alias
    this.quizTimer = 10;
    this.quizTimerInterval = null;
    this.currentQuiz = null;
    this.quizAnswered = false;

    // Stats Tracker for Game Over Screen
    this.stats = {
      quizzesCompleted: 0,
      correctAnswers: 0
    };

    // Parallax World Offsets & Stage
    this.mountainOffset = 0;
    this.cloudOffset = 0;
    this.currentStageIndex = 0;
    this.clouds = this.generateClouds(5);
    this.birds = this.generateBirds(4);

    // Environmental Wind Zones
    this.windZones = [];
    this.windSpawnTimer = 300;
    this.windParticles = [];

    // Realistic Dragon Entity & Flight Physics
    this.dragon = {
      x: 220,
      y: 340,
      vx: 0,
      vy: 0,
      gravity: 0.38,         // Constant gravitational downward pull
      liftForce: 0.92,       // Upward aerodynamic lift when UP pressed
      diveForce: 0.70,       // Downward acceleration when DOWN pressed
      horizontalAccel: 0.80,
      horizontalSpeed: 5.8,
      drag: 0.90,            // Air resistance momentum damping
      maxVerticalSpeed: 9.5,
      radius: 24,            // Forgiving central collision circle
      wingAngle: 0,
      flapSpeed: 0.18,
      isClimbing: false,
      tilt: 0,               // Realistic flight pitch tilt
      bank: 0,               // Realistic turning bank
      invulnerableTimer: 0,
      // Power-up states
      shield: false,
      magnetTimer: 0,
      speedBoostTimer: 0
    };

    // Spawner Entities & Timers
    this.rocks = [];
    this.coinsList = [];
    this.powerupsList = [];
    this.particles = [];
    this.scorePopups = [];

    this.rockSpawnTimer = 80;
    this.coinSpawnTimer = 20;
    this.powerupSpawnTimer = 350;
    this.windSpawnTimer = 300;

    // Inputs
    this.keys = {};
    this.touchDirections = { up: false, down: false, left: false, right: false };

    // Delta Time
    this.lastTime = 0;

    this.initUI();
    this.bindEvents();

    // Start Animation Loop
    requestAnimationFrame((t) => this.gameLoop(t));
  }

  /* --------------------------------------------------------------------------
   * INITIALIZATION & EVENT BINDINGS
   * -------------------------------------------------------------------------- */
  initUI() {
    this.screenStart = document.getElementById('screen-start');
    this.screenSkins = document.getElementById('screen-skins');
    this.screenPause = document.getElementById('screen-pause');
    this.screenGameOver = document.getElementById('screen-gameover');
    this.screenHowToPlay = document.getElementById('screen-howtoplay');
    this.screenQuiz = document.getElementById('quiz-overlay');
    this.hud = document.getElementById('game-hud');

    this.hudHearts = document.getElementById('hud-hearts');
    this.hudCoins = document.getElementById('hud-coins');
    this.hudScore = document.getElementById('hud-score');
    this.hudDistance = document.getElementById('hud-distance');
    this.hudSpeed = document.getElementById('hud-speed');
    this.hudMilestoneText = document.getElementById('hud-milestone-text');
    this.hudMilestoneFill = document.getElementById('hud-milestone-fill');
    this.hudPowerups = document.getElementById('hud-powerups-list');

    this.btnSound = document.getElementById('btn-sound-toggle');
    this.btnSound.textContent = sounds.enabled ? "🔊 SOUND ON" : "🔇 SOUND OFF";

    // Skins Modal Elements
    this.dragonSkinsGrid = document.getElementById('dragon-skins-grid');
    this.previewDragonName = document.getElementById('preview-dragon-name');
    this.previewCanvas = document.getElementById('skin-preview-canvas');
    this.previewCtx = this.previewCanvas ? this.previewCanvas.getContext('2d') : null;

    this.renderSkinCards();
    this.updatePreviewBadge();
    this.updateHUD();
  }

  renderSkinCards() {
    // Render Dragon Skins
    if (this.dragonSkinsGrid) {
      this.dragonSkinsGrid.innerHTML = '';
      Object.values(DRAGON_SKINS).forEach(skin => {
        const isSelected = skin.id === this.selectedDragonSkin;
        const card = document.createElement('div');
        card.className = `skin-card ${isSelected ? 'selected' : ''}`;
        card.setAttribute('data-id', skin.id);

        const swatches = skin.palette.map(c => `<div class="skin-swatch" style="background-color: ${c}"></div>`).join('');

        card.innerHTML = `
          <div class="skin-card-header">
            <span class="skin-card-title">${skin.name}</span>
            <span class="skin-card-badge">${isSelected ? 'Equipped' : 'Select'}</span>
          </div>
          <p class="skin-card-desc">${skin.desc}</p>
          <div class="skin-palette">${swatches}</div>
        `;
        card.addEventListener('click', () => {
          this.selectDragonSkin(skin.id);
        });
        this.dragonSkinsGrid.appendChild(card);
      });
    }
  }

  selectDragonSkin(skinId) {
    if (!DRAGON_SKINS[skinId]) return;
    this.selectedDragonSkin = skinId;
    localStorage.setItem('dsq_dragon_skin', skinId);
    sounds.playClick();
    this.renderSkinCards();
    this.updatePreviewBadge();
  }

  updatePreviewBadge() {
    const dSkin = DRAGON_SKINS[this.selectedDragonSkin] || DRAGON_SKINS.emerald;
    if (this.previewDragonName) this.previewDragonName.textContent = dSkin.name;
  }

  renderSkinPreview() {
    if (!this.previewCtx || !this.previewCanvas) return;
    const ctx = this.previewCtx;
    const w = this.previewCanvas.width;
    const h = this.previewCanvas.height;

    ctx.clearRect(0, 0, w, h);

    // Subtle atmospheric glow background
    const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 20, w * 0.5, h * 0.5, w * 0.6);
    bgGrad.addColorStop(0, '#1e1b4b');
    bgGrad.addColorStop(0.65, '#0f172a');
    bgGrad.addColorStop(1, '#020617');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Distant sparkling stars
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 15; i++) {
      const starX = (i * 37 + this.previewTime * 5) % w;
      const starY = (i * 23) % h;
      ctx.fillRect(starX, starY, 1.5, 1.5);
    }

    // Floating soft clouds
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    const cloud1X = ((this.previewTime * 15) % (w + 120)) - 60;
    ctx.beginPath();
    ctx.arc(cloud1X, 50, 24, 0, Math.PI * 2);
    ctx.arc(cloud1X + 22, 45, 30, 0, Math.PI * 2);
    ctx.arc(cloud1X + 48, 52, 22, 0, Math.PI * 2);
    ctx.fill();

    // Render Dragon animated preview in center
    const hoverY = h * 0.54 + Math.sin(this.previewTime * 2.5) * 6;
    const gentleTilt = Math.sin(this.previewTime * 2.5) * 0.06;

    this.renderDragon(
      ctx,
      w * 0.52,
      hoverY,
      gentleTilt,
      0,
      this.previewWingAngle,
      this.selectedDragonSkin,
      { isPreview: true }
    );
  }

  bindEvents() {
    // Keyboard Event Listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // Pause toggle (P or Escape)
      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (this.state === 'PLAYING') this.pauseGame();
        else if (this.state === 'PAUSED') this.resumeGame();
      }

      // Quiz keyboard options (1,2,3,4 or A,B,C,D)
      if (this.state === 'QUIZ' && !this.quizAnswered) {
        let optIndex = -1;
        if (e.key === '1' || e.key === 'a' || e.key === 'A') optIndex = 0;
        if (e.key === '2' || e.key === 'b' || e.key === 'B') optIndex = 1;
        if (e.key === '3' || e.key === 'c' || e.key === 'C') optIndex = 2;
        if (e.key === '4' || e.key === 'd' || e.key === 'D') optIndex = 3;
        if (optIndex >= 0 && optIndex < 4) {
          this.answerQuiz(optIndex);
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Start Screen Buttons
    document.getElementById('btn-play').addEventListener('click', () => {
      sounds.playClick();
      this.startGame();
    });
    
    // Skins / Customization Open Button
    const btnSkins = document.getElementById('btn-skins');
    if (btnSkins) {
      btnSkins.addEventListener('click', () => {
        sounds.playClick();
        this.screenStart.classList.add('hidden');
        this.screenSkins.classList.remove('hidden');
        this.renderSkinCards();
        this.updatePreviewBadge();
      });
    }


    // Save / Close Skins Modal Buttons
    const btnSaveSkins = document.getElementById('btn-save-skins');
    if (btnSaveSkins) {
      btnSaveSkins.addEventListener('click', () => {
        sounds.playPowerUp();
        this.screenSkins.classList.add('hidden');
        this.startGame();
      });
    }

    const btnCloseSkins = document.getElementById('btn-close-skins');
    if (btnCloseSkins) {
      btnCloseSkins.addEventListener('click', () => {
        sounds.playClick();
        this.screenSkins.classList.add('hidden');
        this.screenStart.classList.remove('hidden');
      });
    }

    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      sounds.playClick();
      this.screenHowToPlay.classList.remove('hidden');
    });
    document.getElementById('btn-close-howtoplay').addEventListener('click', () => {
      sounds.playClick();
      this.screenHowToPlay.classList.add('hidden');
    });

    // Pause Screen Buttons
    document.getElementById('btn-pause-toggle').addEventListener('click', () => {
      if (this.state === 'PLAYING') this.pauseGame();
      else if (this.state === 'PAUSED') this.resumeGame();
    });
    document.getElementById('btn-resume').addEventListener('click', () => {
      sounds.playClick();
      this.resumeGame();
    });
    document.getElementById('btn-restart').addEventListener('click', () => {
      sounds.playClick();
      this.screenPause.classList.add('hidden');
      this.startGame();
    });
    document.getElementById('btn-menu-from-pause').addEventListener('click', () => {
      sounds.playClick();
      this.screenPause.classList.add('hidden');
      this.state = 'MENU';
      this.screenStart.classList.remove('hidden');
      this.hud.style.display = 'none';
    });

    // Game Over Buttons
    document.getElementById('btn-play-again').addEventListener('click', () => {
      sounds.playClick();
      this.screenGameOver.classList.add('hidden');
      this.startGame();
    });
    document.getElementById('btn-menu-from-gameover').addEventListener('click', () => {
      sounds.playClick();
      this.screenGameOver.classList.add('hidden');
      this.state = 'MENU';
      this.screenStart.classList.remove('hidden');
      this.hud.style.display = 'none';
    });

    // Sound Toggle Button
    this.btnSound.addEventListener('click', () => {
      const state = sounds.toggle();
      this.btnSound.textContent = state ? "🔊 SOUND ON" : "🔇 SOUND OFF";
    });

    // Mobile D-Pad Touch Listeners
    const bindTouch = (id, direction) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.touchDirections[direction] = true;
      });
      el.addEventListener('pointerup', (e) => {
        e.preventDefault();
        this.touchDirections[direction] = false;
      });
      el.addEventListener('pointercancel', (e) => {
        e.preventDefault();
        this.touchDirections[direction] = false;
      });
    };
    bindTouch('dpad-up', 'up');
    bindTouch('dpad-down', 'down');
    bindTouch('dpad-left', 'left');
    bindTouch('dpad-right', 'right');
  }

  generateClouds(count = 5) {
    const clouds = [];
    for (let i = 0; i < count; i++) {
      clouds.push({
        x: Math.random() * 1600,
        y: Math.random() * 240 + 40,
        scale: Math.random() * 0.4 + 0.65,
        speed: Math.random() * 0.5 + 0.6
      });
    }
    return clouds;
  }

  generateBirds(count) {
    const birds = [];
    for (let i = 0; i < count; i++) {
      birds.push({
        x: Math.random() * 1600 + 1280,
        y: Math.random() * 220 + 50,
        speed: Math.random() * 2 + 3.5,
        wingPhase: Math.random() * Math.PI
      });
    }
    return birds;
  }

  /* --------------------------------------------------------------------------
   * GAME STATE METHODS
   * -------------------------------------------------------------------------- */
  startGame() {
    this.resetGame();
    this.state = 'PLAYING';
    this.screenStart.classList.add('hidden');
    this.screenPause.classList.add('hidden');
    this.screenGameOver.classList.add('hidden');
    this.screenQuiz.classList.add('hidden');
    this.hud.style.display = 'flex';
  }

  resetGame() {
    this.score = 0;
    this.coins = 0;
    this.distance = 0;
    this.lives = this.maxLives;
    this.nextQuizMilestone = QUIZ_INTERVAL;
    this.nextQuizCoins = QUIZ_INTERVAL;
    this.currentStageIndex = 0;
    this.clouds = this.generateClouds(5);

    this.stats = {
      quizzesCompleted: 0,
      correctAnswers: 0
    };

    this.dragon.x = 220;
    this.dragon.y = 340;
    this.dragon.vx = 0;
    this.dragon.vy = 0;
    this.dragon.tilt = 0;
    this.dragon.bank = 0;
    this.dragon.wingAngle = 0;
    this.dragon.invulnerableTimer = 0;
    this.dragon.shield = false;
    this.dragon.magnetTimer = 0;
    this.dragon.speedBoostTimer = 0;

    this.rocks = [];
    this.coinsList = [];
    this.powerupsList = [];
    this.particles = [];
    this.scorePopups = [];
    this.windZones = [];
    this.windParticles = [];

    this.rockSpawnTimer = 80;
    this.coinSpawnTimer = 20;
    this.powerupSpawnTimer = 350;
    this.windSpawnTimer = 300;

    this.updateHUD();
  }

  pauseGame() {
    if (this.state !== 'PLAYING') return;
    this.state = 'PAUSED';
    this.screenPause.classList.remove('hidden');
  }

  resumeGame() {
    if (this.state !== 'PAUSED') return;
    this.state = 'PLAYING';
    this.screenPause.classList.add('hidden');
  }

  gameOver(isGroundCrash = false) {
    this.state = 'GAME_OVER';
    if (isGroundCrash) {
      sounds.playGroundCrash();
    } else {
      sounds.playGameOver();
    }

    // Populate Game Over Screen Elements ("DRAGON DOWN")
    document.getElementById('go-score').textContent = this.score.toLocaleString();
    document.getElementById('go-coins').textContent = this.coins.toLocaleString();
    document.getElementById('go-distance').textContent = `${Math.floor(this.distance)} m`;
    document.getElementById('go-quizzes').textContent = this.stats.quizzesCompleted;
    document.getElementById('go-correct').textContent = this.stats.correctAnswers;

    this.screenGameOver.classList.remove('hidden');
    this.hud.style.display = 'none';
  }

  /* --------------------------------------------------------------------------
   * GENERAL KNOWLEDGE QUIZ SYSTEM (Exact 500 Milestones)
   * -------------------------------------------------------------------------- */
  generateRandomQuiz() {
    const raw = GK_QUESTION_BANK[Math.floor(Math.random() * GK_QUESTION_BANK.length)];
    const correctText = raw.opts[raw.ans];
    const shuffledOpts = [...raw.opts].sort(() => Math.random() - 0.5);
    const newCorrectIndex = shuffledOpts.indexOf(correctText);

    return {
      category: raw.cat,
      question: raw.q,
      options: shuffledOpts,
      correctIndex: newCorrectIndex
    };
  }

  showQuiz() {
    this.state = 'QUIZ';
    this.quizAnswered = false;
    this.currentQuiz = this.generateRandomQuiz();
    this.quizTimer = 10;

    // Completely pause flight and update DOM
    document.getElementById('quiz-milestone-indicator').textContent = `Coins reached: ${this.nextQuizMilestone}`;
    document.getElementById('quiz-question-display').textContent = this.currentQuiz.question;
    document.getElementById('quiz-timer-num').textContent = `TIME: 10`;
    document.getElementById('quiz-timer-bar-fill').style.width = '100%';

    const feedbackBox = document.getElementById('quiz-feedback-result');
    feedbackBox.className = 'quiz-feedback';
    feedbackBox.style.display = 'none';

    // Populate Option Buttons
    const optsContainer = document.getElementById('quiz-options-box');
    optsContainer.innerHTML = '';
    const keyLabels = ['A', 'B', 'C', 'D'];

    this.currentQuiz.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span class="quiz-opt-key">${keyLabels[index]}</span> <span>${optText}</span>`;
      btn.addEventListener('click', () => {
        if (!this.quizAnswered) this.answerQuiz(index);
      });
      optsContainer.appendChild(btn);
    });

    this.screenQuiz.classList.remove('hidden');

    // 10-Second Countdown Timer
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    this.quizTimerInterval = setInterval(() => {
      if (this.state !== 'QUIZ' || this.quizAnswered) return;
      this.quizTimer -= 0.1;
      if (this.quizTimer <= 0) {
        this.quizTimer = 0;
        this.updateQuizTimerDisplay();
        clearInterval(this.quizTimerInterval);
        this.handleQuizTimeout();
      } else {
        this.updateQuizTimerDisplay();
      }
    }, 100);
  }

  updateQuizTimerDisplay() {
    document.getElementById('quiz-timer-num').textContent = `TIME: ${Math.ceil(this.quizTimer)}`;
    const pct = Math.max(0, (this.quizTimer / 10) * 100);
    document.getElementById('quiz-timer-bar-fill').style.width = `${pct}%`;
  }

  answerQuiz(selectedIndex) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);

    this.stats.quizzesCompleted++;
    const buttons = document.querySelectorAll('.quiz-opt-btn');
    const isCorrect = selectedIndex === this.currentQuiz.correctIndex;

    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === this.currentQuiz.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    const feedbackBox = document.getElementById('quiz-feedback-result');

    if (isCorrect) {
      sounds.playCorrect();
      this.stats.correctAnswers++;
      this.score += 100;

      feedbackBox.className = 'quiz-feedback show correct';
      feedbackBox.innerHTML = `<strong>CORRECT! 🎉 (+100 Points)</strong>`;

      // Trigger Confetti
      this.emitConfetti(this.width * 0.5, this.height * 0.4, 40);

      setTimeout(() => {
        this.finishQuiz();
      }, 1600);
    } else {
      sounds.playWrong();
      this.lives--;

      feedbackBox.className = 'quiz-feedback show wrong';
      const correctText = this.currentQuiz.options[this.currentQuiz.correctIndex];
      feedbackBox.innerHTML = `<strong>WRONG! ❤️ -1 LIFE</strong><br><span style="font-size:0.85rem; color:#fca5a5;">Correct: ${correctText}</span>`;

      setTimeout(() => {
        if (this.lives <= 0) {
          this.screenQuiz.classList.add('hidden');
          this.gameOver();
        } else {
          this.finishQuiz();
        }
      }, 2000);
    }
  }

  handleQuizTimeout() {
    this.quizAnswered = true;
    this.stats.quizzesCompleted++;
    this.lives--;
    sounds.playWrong();

    const buttons = document.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === this.currentQuiz.correctIndex) {
        btn.classList.add('correct');
      }
    });

    const feedbackBox = document.getElementById('quiz-feedback-result');
    feedbackBox.className = 'quiz-feedback show wrong';
    const correctText = this.currentQuiz.options[this.currentQuiz.correctIndex];
    feedbackBox.innerHTML = `<strong>TIME OUT! ❤️ -1 LIFE</strong><br><span style="font-size:0.85rem; color:#fca5a5;">Correct: ${correctText}</span>`;

    setTimeout(() => {
      if (this.lives <= 0) {
        this.screenQuiz.classList.add('hidden');
        this.gameOver();
      } else {
        this.finishQuiz();
      }
    }, 2000);
  }

  finishQuiz() {
    if (this.quizTimerInterval) clearInterval(this.quizTimerInterval);
    this.screenQuiz.classList.add('hidden');
    this.nextQuizMilestone += QUIZ_INTERVAL;
    this.nextQuizCoins = this.nextQuizMilestone;

    // Remove any rocks immediately ahead of dragon to give a fair clean runway
    this.rocks = this.rocks.filter(r => r.x < this.dragon.x - 60 || r.x > this.dragon.x + 350);
    this.rockSpawnTimer = Math.max(90, this.rockSpawnTimer);

    // Brief invulnerability grace window on resume
    this.dragon.invulnerableTimer = Math.max(this.dragon.invulnerableTimer, 60);

    // Resume gameplay
    this.state = 'PLAYING';
    this.updateHUD();
  }

  /* --------------------------------------------------------------------------
   * ENTITY SPAWNERS & OVERLAP PREVENTION
   * -------------------------------------------------------------------------- */
  isPositionClearOfRocks(x, y, radius = 24, margin = 45) {
    for (const rock of this.rocks) {
      const dx = rock.x - x;
      const dy = rock.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < (rock.radius + radius + margin)) {
        return false;
      }
    }
    return true;
  }

  isPositionClearOfCoins(x, y, radius = 30, margin = 45) {
    for (const coin of this.coinsList) {
      const dx = coin.x - x;
      const dy = coin.y - y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < (coin.radius + radius + margin)) {
        return false;
      }
    }
    return true;
  }

  spawnCoin() {
    const pattern = Math.floor(Math.random() * 3);
    const startX = this.width + 60;
    const minY = 90;
    const maxY = this.groundLevel - 210;

    let bestCoinBatch = [];
    let bestClearCount = -1;

    // Try multiple candidate altitudes to find a completely rock-free corridor
    for (let attempt = 0; attempt < 8; attempt++) {
      const testY = minY + Math.random() * (maxY - minY);
      const batch = [];

      if (pattern === 0) {
        // Wave arc of 6 coins
        for (let i = 0; i < 6; i++) {
          const cx = startX + i * 36;
          const cy = testY + Math.sin((i / 6) * Math.PI) * -55;
          batch.push({
            x: cx,
            y: cy,
            baseY: cy,
            radius: 14,
            spin: Math.random() * Math.PI,
            bobTimer: Math.random() * 10
          });
        }
      } else if (pattern === 1) {
        // Horizontal line of 5 coins
        for (let i = 0; i < 5; i++) {
          const cx = startX + i * 40;
          const cy = testY;
          batch.push({
            x: cx,
            y: cy,
            baseY: cy,
            radius: 14,
            spin: Math.random() * Math.PI,
            bobTimer: Math.random() * 10
          });
        }
      } else {
        // Diamond cluster of 4 coins
        batch.push({ x: startX, y: testY, baseY: testY, radius: 14, spin: 0, bobTimer: 0 });
        batch.push({ x: startX + 32, y: testY - 22, baseY: testY - 22, radius: 14, spin: 0.5, bobTimer: 0 });
        batch.push({ x: startX + 32, y: testY + 22, baseY: testY + 22, radius: 14, spin: 1.0, bobTimer: 0 });
        batch.push({ x: startX + 64, y: testY, baseY: testY, radius: 14, spin: 1.5, bobTimer: 0 });
      }

      // Check which coins are completely clear of all obstacle rocks
      const clearCoins = batch.filter(c => this.isPositionClearOfRocks(c.x, c.y, c.radius, 45));
      if (clearCoins.length > bestClearCount) {
        bestClearCount = clearCoins.length;
        bestCoinBatch = clearCoins;
        if (bestClearCount === batch.length) break; // Found 100% clean corridor
      }
    }

    // Add only verified non-overlapping coins
    for (const coin of bestCoinBatch) {
      this.coinsList.push(coin);
    }
  }

  spawnRock() {
    const species = BIRD_SPECIES[Math.floor(Math.random() * BIRD_SPECIES.length)];
    const spawnX = this.width + 70;
    const minY = 80;
    const maxY = this.groundLevel - 190;

    let bestY = minY + Math.random() * (maxY - minY);

    // Find altitude clear of any existing coins
    for (let attempt = 0; attempt < 8; attempt++) {
      const testY = minY + Math.random() * (maxY - minY);
      if (this.isPositionClearOfCoins(spawnX, testY, species.radius, 45)) {
        bestY = testY;
        break;
      }
    }

    // Filter out any coin that might be in this bird's boundary
    this.coinsList = this.coinsList.filter(c => Math.hypot(c.x - spawnX, c.y - bestY) >= species.radius + c.radius + 40);

    this.rocks.push({
      x: spawnX,
      y: bestY,
      radius: species.radius,
      species: species,
      speedFactor: species.speedFactor,
      wingPhase: Math.random() * Math.PI * 2,
      flapSpeed: species.flapSpeed,
      bobTimer: Math.random() * 10,
      bobSpeed: 0.04 + Math.random() * 0.02
    });

    // V-Formation Flock (rare, higher distance)
    if (Math.random() < 0.10 && this.distance > 1200) {
      const flockSpecies = BIRD_SPECIES[0]; // Falcons for high speed formation
      const gapY = Math.random() * (this.groundLevel - 300) + 130;
      const topBirdY = gapY - 75;
      const btmBirdY = gapY + 75;

      this.coinsList = this.coinsList.filter(c =>
        Math.hypot(c.x - (spawnX + 60), c.y - topBirdY) >= flockSpecies.radius + c.radius + 40 &&
        Math.hypot(c.x - (spawnX + 60), c.y - btmBirdY) >= flockSpecies.radius + c.radius + 40
      );

      this.rocks.push({
        x: spawnX + 60,
        y: topBirdY,
        radius: flockSpecies.radius,
        species: flockSpecies,
        speedFactor: flockSpecies.speedFactor,
        wingPhase: Math.random() * Math.PI * 2,
        flapSpeed: flockSpecies.flapSpeed,
        bobTimer: 1.0,
        bobSpeed: 0.05
      });
      this.rocks.push({
        x: spawnX + 60,
        y: btmBirdY,
        radius: flockSpecies.radius,
        species: flockSpecies,
        speedFactor: flockSpecies.speedFactor,
        wingPhase: Math.random() * Math.PI * 2,
        flapSpeed: flockSpecies.flapSpeed,
        bobTimer: 2.5,
        bobSpeed: 0.05
      });
    }
  }

  spawnPowerUp() {
    const types = ['shield', 'magnet', 'speed', 'life'];
    const type = types[Math.floor(Math.random() * types.length)];
    const minY = 90;
    const maxY = this.groundLevel - 200;
    const spawnX = this.width + 50;

    let bestY = minY + Math.random() * (maxY - minY);
    for (let attempt = 0; attempt < 8; attempt++) {
      const testY = minY + Math.random() * (maxY - minY);
      if (this.isPositionClearOfRocks(spawnX, testY, 20, 50)) {
        bestY = testY;
        break;
      }
    }

    const icons = { shield: '🛡️', magnet: '🧲', speed: '⚡', life: '❤️' };
    const colors = { shield: '#38bdf8', magnet: '#f59e0b', speed: '#a855f7', life: '#ec4899' };

    this.powerupsList.push({
      x: spawnX,
      y: bestY,
      radius: 20,
      type: type,
      icon: icons[type],
      color: colors[type],
      pulse: 0
    });
  }

  spawnWindZone() {
    const types = ['updraft', 'downdraft', 'crosswind'];
    const type = types[Math.floor(Math.random() * types.length)];
    const y = Math.random() * (this.groundLevel - 250) + 90;

    this.windZones.push({
      x: this.width + 60,
      y: y,
      w: 220,
      h: 180,
      type: type,
      forceX: type === 'crosswind' ? 1.8 : 0,
      forceY: type === 'updraft' ? -1.6 : (type === 'downdraft' ? 1.4 : 0)
    });
  }

  /* --------------------------------------------------------------------------
   * REALISTIC FLIGHT PHYSICS ENGINE (Section 2 & 3)
   * -------------------------------------------------------------------------- */
  updateDragon(dt) {
    const d = this.dragon;

    // 1. Continuous Natural Gravity Pulling Dragon Down
    d.vy += d.gravity * dt;

    const speedRatio = this.speedMultiplier || 1.0;

    // 2. Upward Lift Physics (W / UP / Touch) -> Generates Lift against gravity
    const isLiftActive = this.keys['ArrowUp'] || this.keys['KeyW'] || this.touchDirections.up;
    const liftPower = d.liftForce * Math.min(1.35, 0.85 + speedRatio * 0.15);
    const divePower = d.diveForce * Math.min(1.35, 0.85 + speedRatio * 0.15);

    if (isLiftActive) {
      d.vy -= liftPower * dt;
      d.isClimbing = true;
    } else {
      d.isClimbing = false;
    }

    // 3. User Dive (S / DOWN / Touch) -> Streamlines and accelerates downward
    const isDiveActive = this.keys['ArrowDown'] || this.keys['KeyS'] || this.touchDirections.down;
    if (isDiveActive) {
      d.vy += divePower * dt;
    }

    // 4. Horizontal Movement & Banking (A / D / Touch)
    let moveX = 0;
    if (this.keys['ArrowLeft'] || this.keys['KeyA'] || this.touchDirections.left) moveX -= 1;
    if (this.keys['ArrowRight'] || this.keys['KeyD'] || this.touchDirections.right) moveX += 1;

    const maxHorizSpeed = (d.speedBoostTimer > 0 ? d.horizontalSpeed * 1.35 : d.horizontalSpeed) * Math.min(1.4, 0.85 + speedRatio * 0.15);
    const targetVx = moveX * maxHorizSpeed;
    d.vx += (targetVx - d.vx) * d.horizontalAccel * dt;
    d.vx *= Math.pow(d.drag, dt);

    // 5. Environmental Wind Influence
    for (const w of this.windZones) {
      if (d.x > w.x && d.x < w.x + w.w && d.y > w.y && d.y < w.y + w.h) {
        d.vx += w.forceX * 0.15 * dt;
        d.vy += w.forceY * 0.15 * dt;
      }
    }

    // 6. Terminal Velocity Clamping
    d.vy = Math.max(-d.maxVerticalSpeed, Math.min(d.maxVerticalSpeed, d.vy));

    // 7. Update Positions with Smooth Momentum
    d.x += d.vx * dt;
    d.y += d.vy * dt;

    // 8. Upper Sky Boundary Limit (Section 4)
    if (d.y < 45) {
      d.y = 45;
      if (d.vy < 0) d.vy = 0;
    }
    d.x = Math.max(70, Math.min(this.width - 90, d.x));

    // 9. GROUND TOUCH = IMMEDIATE GAME OVER (Section 3)
    if (d.y >= this.groundLevel) {
      d.y = this.groundLevel;
      this.emitRockDebris(d.x, d.y, 45);
      this.triggerScreenFlash();
      this.triggerScreenShake();
      this.gameOver(true); // Immediate Game Over on ground touch!
      return;
    }

    // 10. Pitch & Banking Angles
    // Climb pitch (tilts head up) / Dive pitch (tilts head down)
    const targetTilt = (d.vy / d.maxVerticalSpeed) * 0.46;
    d.tilt += (targetTilt - d.tilt) * 0.22 * dt;

    // Banking roll
    const targetBank = (d.vx / maxHorizSpeed) * 0.28;
    d.bank += (targetBank - d.bank) * 0.22 * dt;

    // 11. Synchronized Wing-Flap Cycle (tempo dynamically scales with climb/dive velocity)
    if (isLiftActive) {
      d.wingAngle += 0.42 * Math.min(2.2, 1.0 + speedRatio * 0.25) * dt; // Active vigorous flapping power strokes
    } else if (isDiveActive) {
      d.wingAngle = Math.PI * 0.45 + Math.sin(Date.now() * 0.02) * 0.12; // Streamlined aerodynamic dive dart posture
    } else {
      d.wingAngle += 0.20 * Math.min(1.8, 0.9 + speedRatio * 0.2) * dt; // Smooth rhythmic flight glide strokes
    }

    // Invulnerability Frames
    if (d.invulnerableTimer > 0) d.invulnerableTimer -= dt;

    // Power-up Timers
    if (d.magnetTimer > 0) d.magnetTimer -= dt;
    if (d.speedBoostTimer > 0) d.speedBoostTimer -= dt;

    // Flight Streamline Sparks, Lightning Embers & High-speed Wind Streaks
    const streakChance = 0.50 + Math.max(0, (speedRatio - 1.0) * 0.3);
    if (Math.random() < streakChance) {
      const curSpd = this.currentSpeed || 4.8;
      // Electric blue sparks from tail / wingtips
      this.particles.push({
        x: d.x - 36 - Math.random() * 20,
        y: d.y + (Math.random() - 0.5) * 30,
        vx: -(curSpd * 1.8 + Math.random() * 4),
        vy: (Math.random() - 0.5) * 2.0,
        size: Math.random() * (2.2 + speedRatio * 0.8) + 1.2,
        color: d.speedBoostTimer > 0 ? '#a855f7' : (Math.random() < 0.6 ? '#38bdf8' : '#67e8f9'),
        life: Math.max(10, Math.floor(22 / Math.max(1, speedRatio))),
        maxLife: Math.max(10, Math.floor(22 / Math.max(1, speedRatio)))
      });
    }
  }

  /* --------------------------------------------------------------------------
   * GAME UPDATES & ENTITY MANAGEMENT
   * -------------------------------------------------------------------------- */
  updateGame(dt) {
    // Subway Surfers style progressive speed scaling with score
    // Accelerates smoothly as score increases (starts at 4.8, scaling up to ~13.5)
    const scoreSpeedFactor = Math.min(8.5, Math.log10(1 + this.score * 0.002) * 4.6 + (this.score * 0.00075));
    const baseSpeed = 4.8 + scoreSpeedFactor;
    const currentSpeed = (this.dragon.speedBoostTimer > 0 ? baseSpeed * 1.45 : baseSpeed);
    this.currentSpeed = currentSpeed;
    this.speedMultiplier = (currentSpeed / 4.8);
    const speedRatio = this.speedMultiplier || 1.0;

    this.distance += currentSpeed * 0.18 * dt;
    this.score += Math.round(currentSpeed * 0.12);

    // Evolve Sky Stage based on distance
    this.currentStageIndex = Math.floor(this.distance / 1200) % SKY_STAGES.length;

    // Parallax Scrolling scales with progressive speed
    this.mountainOffset += currentSpeed * 0.4 * dt;
    this.cloudOffset += currentSpeed * 0.8 * dt;
    this.groundOffset += currentSpeed * 1.2 * dt;

    // Birds in background
    for (const b of this.birds) {
      b.x -= b.speed * (0.8 + speedRatio * 0.2) * dt;
      b.wingPhase += 0.15 * dt;
      if (b.x < -60) {
        b.x = this.width + Math.random() * 400 + 100;
        b.y = Math.random() * 200 + 50;
      }
    }

    // Update Player Dragon Physics
    this.updateDragon(dt);
    if (this.state !== 'PLAYING') return; // If ground touch triggered game over, exit early

    // Spawners
    this.rockSpawnTimer -= dt;
    if (this.rockSpawnTimer <= 0) {
      this.spawnRock();
      this.rockSpawnTimer = Math.max(75, 140 - Math.min(50, this.distance * 0.01));
    }

    this.coinSpawnTimer -= dt;
    if (this.coinSpawnTimer <= 0) {
      this.spawnCoin();
      this.coinSpawnTimer = Math.random() * 80 + 90;
    }

    this.powerupSpawnTimer -= dt;
    if (this.powerupSpawnTimer <= 0) {
      this.spawnPowerUp();
      this.powerupSpawnTimer = Math.random() * 600 + 650;
    }

    this.windSpawnTimer -= dt;
    if (this.windSpawnTimer <= 0) {
      this.spawnWindZone();
      this.windSpawnTimer = Math.random() * 400 + 450;
    }

    // Update Obstacle Birds
    for (let i = this.rocks.length - 1; i >= 0; i--) {
      const bird = this.rocks[i];
      const speedMult = bird.speedFactor || 1.0;
      bird.x -= (currentSpeed * speedMult) * dt;
      bird.wingPhase = (bird.wingPhase || 0) + (bird.flapSpeed || 0.22) * dt;
      bird.bobTimer = (bird.bobTimer || 0) + (bird.bobSpeed || 0.04) * dt;
      bird.y += Math.sin(bird.bobTimer) * 0.5 * dt;

      if (bird.x < -100) this.rocks.splice(i, 1);
    }

    // Update Coins
    for (let i = this.coinsList.length - 1; i >= 0; i--) {
      const coin = this.coinsList[i];
      coin.x -= currentSpeed * dt;
      coin.spin += 0.08 * dt;
      coin.bobTimer += 0.05 * dt;
      coin.y = coin.baseY + Math.sin(coin.bobTimer) * 4;

      // Magnet attraction
      if (this.dragon.magnetTimer > 0) {
        const dx = this.dragon.x - coin.x;
        const dy = this.dragon.y - coin.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 260) {
          coin.x += (dx / dist) * 10 * dt;
          coin.y += (dy / dist) * 10 * dt;
          coin.baseY = coin.y;
        }
      }

      // Dynamic obstacle avoidance: Keep coins smoothly routed outside rock boundaries
      for (const rock of this.rocks) {
        const dx = coin.x - rock.x;
        const dy = coin.y - rock.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = rock.radius + coin.radius + 18;
        if (dist < minDist && dist > 0.001) {
          const pushAmount = (minDist - dist);
          coin.x += (dx / dist) * pushAmount;
          coin.y += (dy / dist) * pushAmount;
          coin.baseY = coin.y;
        }
      }

      if (coin.x < -50) this.coinsList.splice(i, 1);
    }

    // Update Power-ups
    for (let i = this.powerupsList.length - 1; i >= 0; i--) {
      const p = this.powerupsList[i];
      p.x -= currentSpeed * dt;
      p.pulse += 0.08 * dt;
      if (p.x < -50) this.powerupsList.splice(i, 1);
    }

    // Update Wind Zones & Wind Particles
    for (let i = this.windZones.length - 1; i >= 0; i--) {
      const w = this.windZones[i];
      w.x -= currentSpeed * dt;
      if (Math.random() < 0.35) {
        this.windParticles.push({
          x: w.x + Math.random() * w.w,
          y: w.y + Math.random() * w.h,
          vx: -(currentSpeed + 2) + w.forceX * 2,
          vy: w.forceY * 2,
          life: 25,
          maxLife: 25
        });
      }
      if (w.x + w.w < -50) this.windZones.splice(i, 1);
    }

    for (let i = this.windParticles.length - 1; i >= 0; i--) {
      const wp = this.windParticles[i];
      wp.x += wp.vx * dt;
      wp.y += wp.vy * dt;
      wp.life -= dt;
      if (wp.life <= 0) this.windParticles.splice(i, 1);
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.life -= dt;
      if (pt.life <= 0) this.particles.splice(i, 1);
    }

    // Update Score Popups
    for (let i = this.scorePopups.length - 1; i >= 0; i--) {
      const sp = this.scorePopups[i];
      sp.y -= 1.2 * dt;
      sp.life -= dt;
      if (sp.life <= 0) this.scorePopups.splice(i, 1);
    }

    // Check Collisions
    this.checkCollisions();

    // Check Milestone Quiz Rule (50, 100, 150, 200...)
    if (this.coins >= this.nextQuizMilestone) {
      this.showQuiz();
      return;
    }

    // Update HUD
    this.updateHUD();
  }

  /* --------------------------------------------------------------------------
   * COLLISION DETECTION & EFFECTS
   * -------------------------------------------------------------------------- */
  checkCollisions() {
    const d = this.dragon;

    // Obstacle Bird Collisions
    for (let i = this.rocks.length - 1; i >= 0; i--) {
      const bird = this.rocks[i];
      const dx = d.x - bird.x;
      const dy = d.y - bird.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < (d.radius + bird.radius * 0.75)) {
        if (d.invulnerableTimer <= 0) {
          const birdColor = bird.species ? bird.species.bodyColor : '#475569';
          if (d.shield) {
            d.shield = false;
            d.invulnerableTimer = 60;
            this.emitFeatherBurst(bird.x, bird.y, 25, birdColor);
            this.rocks.splice(i, 1);
            sounds.playPowerUp();
          } else {
            this.lives--;
            d.invulnerableTimer = 90;
            sounds.playBirdHit();
            this.triggerScreenFlash();
            this.triggerScreenShake();
            this.emitFeatherBurst(bird.x, bird.y, 30, birdColor);

            if (this.lives <= 0) {
              this.gameOver(false);
              return;
            }
          }
        }
      }
    }

    // Coin Collisions
    for (let i = this.coinsList.length - 1; i >= 0; i--) {
      const coin = this.coinsList[i];
      const dx = d.x - coin.x;
      const dy = d.y - coin.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < (d.radius + coin.radius + 6)) {
        this.collectCoin(coin.x, coin.y);
        this.coinsList.splice(i, 1);
      }
    }

    // Power-up Collisions
    for (let i = this.powerupsList.length - 1; i >= 0; i--) {
      const p = this.powerupsList[i];
      const dx = d.x - p.x;
      const dy = d.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < (d.radius + p.radius + 8)) {
        this.collectPowerUp(p);
        this.powerupsList.splice(i, 1);
      }
    }
  }

  collectCoin(x, y) {
    this.coins++;
    this.score += 10;
    sounds.playCoin();

    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 4 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: Math.random() * 3 + 2,
        color: '#ffd700',
        life: 20,
        maxLife: 20
      });
    }

    this.scorePopups.push({
      x: x,
      y: y - 10,
      text: `+10`,
      color: '#ffd700',
      life: 25,
      maxLife: 25
    });
  }

  collectPowerUp(p) {
    sounds.playPowerUp();
    if (p.type === 'shield') {
      this.dragon.shield = true;
    } else if (p.type === 'magnet') {
      this.dragon.magnetTimer = 600;
    } else if (p.type === 'speed') {
      this.dragon.speedBoostTimer = 480;
    } else if (p.type === 'life') {
      if (this.lives < this.maxLives) this.lives++;
    }

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 5 + 2;
      this.particles.push({
        x: p.x,
        y: p.y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        size: Math.random() * 4 + 2,
        color: p.color,
        life: 25,
        maxLife: 25
      });
    }
  }

  emitFeatherBurst(x, y, count = 24, color = '#f1f5f9') {
    const featherColors = [color, '#ffffff', '#cbd5e1', '#94a3b8', '#d97706'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1.2,
        size: Math.random() * 4 + 2.5,
        color: featherColors[Math.floor(Math.random() * featherColors.length)],
        isFeather: true,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.2,
        life: 35,
        maxLife: 35
      });
    }
  }

  emitRockDebris(x, y, radius) {
    this.emitFeatherBurst(x, y, 22, '#475569');
  }

  emitConfetti(x, y, count = 40) {
    const colors = ['#ffd700', '#ff4757', '#2ed573', '#38bdf8', '#a855f7'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 7 + 3;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 2,
        size: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 45,
        maxLife: 45
      });
    }
  }

  triggerScreenFlash() {
    this.flashOverlay.classList.add('active');
    setTimeout(() => this.flashOverlay.classList.remove('active'), 150);
  }

  triggerScreenShake() {
    this.container.classList.add('shake');
    setTimeout(() => this.container.classList.remove('shake'), 300);
  }

  /* --------------------------------------------------------------------------
   * HUD SYNCHRONIZATION
   * -------------------------------------------------------------------------- */
  updateHUD() {
    let heartsHtml = '';
    for (let i = 0; i < this.maxLives; i++) {
      heartsHtml += i < this.lives ? '❤️ ' : '🖤 ';
    }
    this.hudHearts.innerHTML = heartsHtml;

    this.hudCoins.textContent = this.coins.toLocaleString();
    this.hudScore.textContent = this.score.toLocaleString();
    this.hudDistance.textContent = `${Math.floor(this.distance)} m`;
    if (this.hudSpeed) {
      this.hudSpeed.textContent = `${(this.speedMultiplier || 1.0).toFixed(1)}x`;
    }

    const prevMilestone = this.nextQuizMilestone - QUIZ_INTERVAL;
    const progressInCycle = this.coins - prevMilestone;
    const pct = Math.min(100, Math.max(0, (progressInCycle / QUIZ_INTERVAL) * 100));
    this.hudMilestoneText.textContent = `${this.nextQuizMilestone} Coins`;
    this.hudMilestoneFill.style.width = `${pct}%`;

    this.hudPowerups.innerHTML = '';
    if (this.dragon.shield) {
      this.addPowerUpBadge('🛡️', 'Shield');
    }
    if (this.dragon.magnetTimer > 0) {
      this.addPowerUpBadge('🧲', `${Math.ceil(this.dragon.magnetTimer / 60)}s`);
    }
    if (this.dragon.speedBoostTimer > 0) {
      this.addPowerUpBadge('⚡', `${Math.ceil(this.dragon.speedBoostTimer / 60)}s`);
    }
  }

  addPowerUpBadge(icon, label) {
    const pill = document.createElement('div');
    pill.className = 'powerup-pill';
    pill.innerHTML = `<span>${icon}</span> <span>${label}</span>`;
    this.hudPowerups.appendChild(pill);
  }

  /* --------------------------------------------------------------------------
   * CANVAS DRAWING ENGINE (Parallax Skies, Mountains, Baby Plants & Grass Land)
   * -------------------------------------------------------------------------- */
  drawParallax(stage) {
    const ctx = this.ctx;

    // 1. Realistic Multi-Stop Sky Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, this.height);
    for (let i = 0; i < stage.skyGradient.length; i++) {
      skyGrad.addColorStop(i / (stage.skyGradient.length - 1), stage.skyGradient[i]);
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // 2. Distant Celestial Body (Sun / Moon with realistic corona & atmospheric scattering)
    const sunX = this.width * (stage.sunPos ? stage.sunPos.x : 0.75);
    const sunY = this.height * (stage.sunPos ? stage.sunPos.y : 0.22);
    const sunR = stage.sunPos ? stage.sunPos.r : 45;

    const sunCorona = ctx.createRadialGradient(sunX, sunY, sunR * 0.15, sunX, sunY, sunR * 3.2);
    sunCorona.addColorStop(0, stage.sunColor || 'rgba(255, 250, 204, 0.95)');
    sunCorona.addColorStop(0.32, stage.sunGlow || 'rgba(251, 191, 36, 0.28)');
    sunCorona.addColorStop(1, 'transparent');
    ctx.fillStyle = sunCorona;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 3.2, 0, Math.PI * 2);
    ctx.fill();

    // 3. Far Mountain Silhouettes (Layer 1 - Atmospheric Distant Peaks)
    ctx.save();
    ctx.fillStyle = stage.farMountainColor || 'rgba(12, 74, 96, 0.45)';
    ctx.beginPath();
    const farShift = (this.mountainOffset * 0.25) % this.width;
    ctx.moveTo(-this.width, this.height);
    for (let rep = -1; rep <= 2; rep++) {
      const baseX = rep * this.width - farShift;
      ctx.lineTo(baseX, this.height - 240);
      ctx.lineTo(baseX + 160, this.height - 380);
      ctx.lineTo(baseX + 340, this.height - 260);
      ctx.lineTo(baseX + 540, this.height - 410);
      ctx.lineTo(baseX + 780, this.height - 280);
      ctx.lineTo(baseX + 1020, this.height - 430);
      ctx.lineTo(baseX + 1280, this.height - 290);
    }
    ctx.lineTo(this.width * 2, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Midground Foothills & Canyon Ridges (Layer 2)
    ctx.save();
    ctx.fillStyle = stage.mountainColor;
    ctx.beginPath();
    const midShift = (this.mountainOffset * 0.55) % this.width;
    ctx.moveTo(-this.width, this.height);
    for (let rep = -1; rep <= 2; rep++) {
      const baseX = rep * this.width - midShift;
      ctx.lineTo(baseX, this.height - 180);
      ctx.lineTo(baseX + 220, this.height - 280);
      ctx.lineTo(baseX + 440, this.height - 170);
      ctx.lineTo(baseX + 700, this.height - 310);
      ctx.lineTo(baseX + 960, this.height - 190);
      ctx.lineTo(baseX + 1280, this.height - 240);
    }
    ctx.lineTo(this.width * 2, this.height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 5. Realistic Volumetric Clouds with Ambient Shading
    for (const c of this.clouds) {
      const curX = ((c.x - this.cloudOffset * c.speed) % (this.width + 360)) - 180;
      const drawX = curX < -180 ? curX + this.width + 360 : curX;
      const r = 36 * c.scale;

      ctx.save();
      // Cloud base ambient shadow
      ctx.fillStyle = stage.cloudShadow || 'rgba(186, 230, 253, 0.45)';
      ctx.beginPath();
      ctx.arc(drawX, c.y + 4, r, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.85, c.y - r * 0.35 + 4, r * 0.95, 0, Math.PI * 2);
      ctx.arc(drawX + r * 1.7, c.y + 4, r * 0.85, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.8, c.y + r * 0.25 + 4, r * 0.75, 0, Math.PI * 2);
      ctx.fill();

      // Cloud sunlit main body
      ctx.fillStyle = stage.cloudColor || 'rgba(255, 255, 255, 0.88)';
      ctx.beginPath();
      ctx.arc(drawX, c.y, r, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.85, c.y - r * 0.35, r * 0.95, 0, Math.PI * 2);
      ctx.arc(drawX + r * 1.7, c.y, r * 0.85, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.8, c.y + r * 0.25, r * 0.75, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 6. Background Flying Birds
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    for (const b of this.birds) {
      const wingY = Math.sin(b.wingPhase) * 6;
      ctx.beginPath();
      ctx.moveTo(b.x - 12, b.y + wingY);
      ctx.quadraticCurveTo(b.x - 6, b.y - 5, b.x, b.y);
      ctx.quadraticCurveTo(b.x + 6, b.y - 5, b.x + 12, b.y + wingY);
      ctx.stroke();
    }

    // 7. Visible Realistic Ground Terrain with Baby Plants, Small Grass & Pebbles
    this.drawGroundTerrain(ctx, stage);
  }

  drawGroundTerrain(ctx, stage) {
    ctx.save();
    const gY = this.groundLevel;

    // 1. Rich Layered Subsurface Soil & Bedrock
    const soilGrad = ctx.createLinearGradient(0, gY, 0, this.height);
    soilGrad.addColorStop(0, stage.groundColor || '#1e3a2f');
    soilGrad.addColorStop(0.28, stage.soilBaseColor || '#17252a');
    soilGrad.addColorStop(1, '#090d16');
    ctx.fillStyle = soilGrad;

    ctx.beginPath();
    ctx.moveTo(-60, this.height);
    ctx.lineTo(-60, gY);

    // Calculate detailed terrain curve points
    const step = 16;
    const terrainPoints = [];
    for (let x = -60; x <= this.width + 60; x += step) {
      const curX = x;
      const worldX = x + this.groundOffset;
      const bump = Math.sin(worldX * 0.015) * 8 + Math.cos(worldX * 0.04) * 5 + Math.sin(worldX * 0.08) * 2;
      const curY = gY + bump;
      terrainPoints.push({ x: curX, y: curY, worldX: worldX });
      ctx.lineTo(curX, curY);
    }
    ctx.lineTo(this.width + 60, this.height);
    ctx.closePath();
    ctx.fill();

    // 2. Earthy Topsoil Crust & Strata Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.45)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Render Smooth River Pebbles along the Soil Line
    for (let i = 0; i < terrainPoints.length; i += 4) {
      const pt = terrainPoints[i];
      const pWorld = Math.floor(pt.worldX);
      if ((pWorld % 9) < 3) {
        const pSize = 3 + (pWorld % 4);
        ctx.save();
        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.ellipse(pt.x + (pWorld % 12), pt.y + 4, pSize, pSize * 0.55, (pWorld % 30) * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#94a3b8';
        ctx.beginPath();
        ctx.ellipse(pt.x + (pWorld % 12) - 1, pt.y + 3, pSize * 0.45, pSize * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // 4. Render Natural Tufts of Small Grass & Bending Blades
    const grassColors = stage.grassColors || ["#22c55e", "#16a34a", "#15803d", "#4ade80"];
    const sway = Math.sin(this.distance * 0.05) * 3.5;

    for (let i = 0; i < terrainPoints.length; i++) {
      const pt = terrainPoints[i];
      const wX = pt.worldX;
      const tuftSeed = Math.abs(Math.sin(wX * 12.9898)) * 1000;
      const bladeCount = 3 + Math.floor(tuftSeed % 3);

      for (let b = 0; b < bladeCount; b++) {
        const lean = (b - (bladeCount - 1) / 2) * 3.2 + sway * 0.8;
        const bHeight = 8 + ((tuftSeed + b * 7) % 11);
        const bColor = grassColors[(Math.floor(tuftSeed + b) % grassColors.length)];

        ctx.strokeStyle = bColor;
        ctx.lineWidth = 1.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        const rootX = pt.x + (b * 4) - (bladeCount * 2);
        const rootY = pt.y + 1;
        ctx.moveTo(rootX, rootY);
        ctx.quadraticCurveTo(rootX + lean * 0.5, rootY - bHeight * 0.6, rootX + lean, rootY - bHeight);
        ctx.stroke();
      }
    }

    // 5. Render Baby Plants (Seedlings with 2 Cotyledon Leaves & Little Blossoms)
    for (let i = 0; i < terrainPoints.length; i += 3) {
      const pt = terrainPoints[i];
      const plantSeed = Math.abs(Math.cos(pt.worldX * 7.123)) * 100;
      if (plantSeed > 40) {
        const plantX = pt.x + (plantSeed % 12) - 6;
        const plantY = pt.y;
        const plantHeight = 14 + (plantSeed % 8);
        const plantSway = Math.sin(this.distance * 0.04 + plantX * 0.05) * 2;

        ctx.save();
        // Slender curved sprout stem
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(plantX, plantY);
        const tipX = plantX + plantSway;
        const tipY = plantY - plantHeight;
        ctx.quadraticCurveTo(plantX + plantSway * 0.3, plantY - plantHeight * 0.5, tipX, tipY);
        ctx.stroke();

        // Left baby cotyledon leaf
        ctx.fillStyle = '#4ade80';
        ctx.beginPath();
        ctx.ellipse(tipX - 5, tipY + 2, 5, 2.8, -0.35, 0, Math.PI * 2);
        ctx.fill();

        // Right baby cotyledon leaf
        ctx.fillStyle = '#86efac';
        ctx.beginPath();
        ctx.ellipse(tipX + 5, tipY + 1, 5, 2.8, 0.35, 0, Math.PI * 2);
        ctx.fill();

        // Tiny Flower Blossom on some baby plants
        if (plantSeed > 70) {
          const flowerColors = stage.flowerColors || ['#fbbf24', '#f43f5e', '#ffffff'];
          const fColor = flowerColors[Math.floor(plantSeed) % flowerColors.length];
          ctx.fillStyle = fColor;
          ctx.beginPath();
          ctx.arc(tipX, tipY - 2, 2.8, 0, Math.PI * 2);
          ctx.fill();
          // Blossom center
          ctx.fillStyle = '#fef08a';
          ctx.beginPath();
          ctx.arc(tipX, tipY - 2, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // 6. Ground Danger Warning Ambient Mist & Atmospheric Low Fog
    const groundMist = ctx.createLinearGradient(0, gY - 28, 0, gY + 12);
    groundMist.addColorStop(0, 'rgba(239, 68, 68, 0)');
    groundMist.addColorStop(0.5, 'rgba(239, 68, 68, 0.15)');
    groundMist.addColorStop(0.85, 'rgba(239, 68, 68, 0.38)');
    groundMist.addColorStop(1, 'rgba(239, 68, 68, 0.65)');
    ctx.fillStyle = groundMist;
    ctx.fillRect(0, gY - 28, this.width, 50);

    ctx.restore();
  }

  /* --------------------------------------------------------------------------
   * REALISTIC LIVING FANTASY DRAGON RENDERING ENGINE
   * -------------------------------------------------------------------------- */
  drawDragon() {
    const d = this.dragon;

    // Invulnerability Flashing
    if (d.invulnerableTimer > 0 && Math.floor(d.invulnerableTimer / 6) % 2 === 0) {
      return;
    }

    this.renderDragon(
      this.ctx,
      d.x,
      d.y,
      d.tilt,
      d.bank,
      d.wingAngle,
      this.selectedDragonSkin,
      {
        shield: d.shield,
        magnetTimer: d.magnetTimer,
        speedBoostTimer: d.speedBoostTimer
      }
    );
  }

  renderDragon(ctx, x, y, tilt, bank, wingAngle, dSkinKey, options = {}) {
    const dSkin = DRAGON_SKINS[dSkinKey] || DRAGON_SKINS.emerald;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate((tilt || 0) + (bank || 0));

    // Speed Boost Lines (in-game only)
    if (options.speedBoostTimer > 0) {
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const yOff = (i - 1.5) * 16;
        ctx.beginPath();
        ctx.moveTo(-40 - Math.random() * 20, yOff);
        ctx.lineTo(-90 - Math.random() * 40, yOff);
        ctx.stroke();
      }
    }

    // Magnet Aura Effect
    if (options.magnetTimer > 0) {
      ctx.save();
      const pulse = Math.sin(Date.now() * 0.008) * 5;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 75 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Shield Barrier Bubble
    if (options.shield) {
      ctx.save();
      const shieldGlow = ctx.createRadialGradient(0, 0, 15, 0, 0, 48);
      shieldGlow.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      shieldGlow.addColorStop(0.8, 'rgba(56, 189, 248, 0.45)');
      shieldGlow.addColorStop(1, 'rgba(125, 211, 252, 0.9)');
      ctx.fillStyle = shieldGlow;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 46, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    const flapCycle = Math.sin(wingAngle);
    const flapCos = Math.cos(wingAngle);

    // Living Aerodynamic Flight Heave & Respiration
    const heaveY = flapCycle * 3.0;
    ctx.translate(0, heaveY);

    // ========================================================================
    // 1. TOP / FAR WING (Dynamic Flapping Bat-Wing on Far Shoulder)
    // ========================================================================
    this.drawAnatomicalWing(ctx, true, wingAngle, dSkin);

    // B. UNDULATING SERPENTINE TAIL (Kinematic Segment Chain)
    ctx.save();
    const tailSegments = 7;
    let prevX = -16;
    let prevY = 3;

    ctx.fillStyle = dSkin.bodyBase;
    ctx.strokeStyle = dSkin.border;
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY - 6);

    for (let i = 1; i <= tailSegments; i++) {
      const segX = -16 - i * 11;
      const segY = 3 + Math.sin(wingAngle - i * 0.45) * (i * 2.2);
      ctx.lineTo(segX, segY - (6 - i * 0.7));
    }

    // Aerodynamic Steering Fluke / Spade
    const tipX = -16 - tailSegments * 11;
    const tipY = 3 + Math.sin(wingAngle - tailSegments * 0.45) * (tailSegments * 2.2);
    ctx.lineTo(tipX - 18, tipY - 8);
    ctx.lineTo(tipX - 28, tipY);
    ctx.lineTo(tipX - 18, tipY + 8);

    for (let i = tailSegments; i >= 1; i--) {
      const segX = -16 - i * 11;
      const segY = 3 + Math.sin(wingAngle - i * 0.45) * (i * 2.2);
      ctx.lineTo(segX, segY + (6 - i * 0.7));
    }
    ctx.lineTo(prevX, prevY + 6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Dorsal Spine Spikes along Tail
    ctx.fillStyle = dSkin.hornBorder || dSkin.border;
    for (let i = 1; i <= tailSegments - 1; i++) {
      const segX = -16 - i * 11;
      const segY = 3 + Math.sin(wingAngle - i * 0.45) * (i * 2.2);
      ctx.beginPath();
      ctx.moveTo(segX + 4, segY - (6 - i * 0.7));
      ctx.lineTo(segX, segY - (12 - i * 1.0));
      ctx.lineTo(segX - 4, segY - (6 - i * 0.7));
      ctx.closePath();
      ctx.fill();
    }

    // Tail Electric Blue Fissures (Obsidian Wyrm)
    if (dSkin.hasLightningVeins) {
      ctx.save();
      const pulse = 0.8 + Math.sin(Date.now() * 0.007) * 0.2;
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.3;
      ctx.globalAlpha = pulse;
      for (let i = 1; i < tailSegments; i++) {
        const segX = -16 - i * 11;
        const segY = 3 + Math.sin(wingAngle - i * 0.45) * (i * 2.2);
        ctx.beginPath();
        ctx.moveTo(segX - 2, segY - 3);
        ctx.lineTo(segX + 2, segY);
        ctx.lineTo(segX - 1, segY + 3);
        ctx.stroke();
      }
      ctx.restore();
    }

    // Tail Spade Accent
    ctx.fillStyle = dSkin.tailSpade;
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(tipX - 20, tipY - 10);
    ctx.lineTo(tipX - 28, tipY);
    ctx.lineTo(tipX - 20, tipY + 10);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // C. MUSCULAR MAIN BODY & TORSO
    ctx.save();
    const bodyGrad = ctx.createLinearGradient(0, -18, 0, 18);
    bodyGrad.addColorStop(0, dSkin.bodyBase);
    bodyGrad.addColorStop(0.45, dSkin.bodyMid);
    bodyGrad.addColorStop(1, dSkin.bodyBase);

    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(2, 2, 32, 17, 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = dSkin.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Overlapping Diamond Scales Texture on Flank
    ctx.strokeStyle = dSkin.bodyHighlight;
    ctx.lineWidth = 1.2;
    for (let row = -1; row <= 1; row++) {
      for (let col = -2; col <= 2; col++) {
        const sx = col * 9 + (row % 2) * 4;
        const sy = row * 6 + 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy - 3);
        ctx.lineTo(sx + 4, sy);
        ctx.lineTo(sx, sy + 3);
        ctx.stroke();
      }
    }

    // Segmented Underbelly Armor Plates (Gastrosteges)
    ctx.fillStyle = dSkin.bellyBase;
    ctx.beginPath();
    ctx.ellipse(3, 8, 23, 10, 0.06, 0, Math.PI);
    ctx.fill();

    // Underbelly Segment Grooves
    ctx.strokeStyle = dSkin.bellyGroove;
    ctx.lineWidth = 1.4;
    for (let bx = -14; bx <= 18; bx += 6) {
      ctx.beginPath();
      ctx.moveTo(bx, 8);
      ctx.quadraticCurveTo(bx + 2, 13, bx + 1, 18);
      ctx.stroke();
    }

    // Dynamic Electric Blue Magma/Lightning Fissures (Chest, Pectorals, Shoulder)
    if (dSkin.hasLightningVeins) {
      ctx.save();
      const pulse = 0.8 + Math.sin(Date.now() * 0.007) * 0.2;
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 8;
      ctx.lineWidth = 1.8;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = pulse;

      ctx.beginPath();
      // Shoulder & pectoral fissure
      ctx.moveTo(-6, -4);
      ctx.lineTo(2, 0);
      ctx.lineTo(8, -5);
      ctx.lineTo(14, -2);
      // Lower chest fissure
      ctx.moveTo(2, 0);
      ctx.lineTo(4, 6);
      ctx.lineTo(11, 10);
      // Flank branch
      ctx.moveTo(-2, 3);
      ctx.lineTo(-8, 7);
      ctx.lineTo(-14, 4);
      ctx.stroke();

      // Bright inner core
      ctx.strokeStyle = '#e0f2fe';
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    ctx.restore(); // restore torso save

    // D. TUCKED TALONS / CLAWS
    ctx.save();
    ctx.fillStyle = dSkin.bodyBase;
    ctx.strokeStyle = dSkin.claws;
    ctx.lineWidth = 1.6;

    ctx.beginPath();
    ctx.moveTo(-10, 11);
    ctx.lineTo(-6, 18);
    ctx.lineTo(-2, 14);
    ctx.lineTo(2, 18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(12, 9);
    ctx.lineTo(16, 17);
    ctx.lineTo(20, 11);
    ctx.lineTo(24, 17);
    ctx.stroke();

    // Talon energy tips
    if (dSkin.hasLightningVeins) {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(-6, 18, 1.4, 0, Math.PI * 2);
      ctx.arc(2, 18, 1.4, 0, Math.PI * 2);
      ctx.arc(16, 17, 1.4, 0, Math.PI * 2);
      ctx.arc(24, 17, 1.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // E. DETAILED SCULPTED DRAGON HEAD & NECK
    ctx.save();
    ctx.fillStyle = dSkin.bodyMid;
    ctx.beginPath();
    ctx.moveTo(18, -6);
    ctx.quadraticCurveTo(26, -14, 34, -11);
    ctx.lineTo(40, -7);
    ctx.lineTo(26, 7);
    ctx.lineTo(16, 5);
    ctx.closePath();
    ctx.fill();

    // Sculpted Head & Snout
    ctx.fillStyle = dSkin.bodyMid;
    ctx.beginPath();
    ctx.moveTo(24, -11);
    ctx.lineTo(46, -8);
    ctx.quadraticCurveTo(55, -2, 50, 5);
    ctx.lineTo(32, 9);
    ctx.lineTo(22, 6);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = dSkin.border;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Nostril
    ctx.fillStyle = dSkin.border;
    ctx.beginPath();
    ctx.arc(46, -3, 1.8, 0, Math.PI * 2);
    ctx.fill();

    // Needle Teeth / Fangs
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(40, 2);
    ctx.lineTo(42, 6);
    ctx.lineTo(44, 2);
    ctx.moveTo(34, 3);
    ctx.lineTo(36, 7);
    ctx.lineTo(38, 3);
    ctx.fill();

    // Chin Barb / Beard Spike (from user image)
    ctx.fillStyle = dSkin.border;
    ctx.beginPath();
    ctx.moveTo(28, 8);
    ctx.lineTo(33, 14);
    ctx.lineTo(36, 7);
    ctx.closePath();
    ctx.fill();

    // Swept Horns (Ancient Curved Drake Crown)
    ctx.fillStyle = dSkin.horn;
    ctx.beginPath();
    ctx.moveTo(24, -11);
    ctx.quadraticCurveTo(16, -26, -4, -23);
    ctx.quadraticCurveTo(14, -16, 32, -9);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = dSkin.hornBorder;
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // Golden / Amber Horn Tip Accent (from user image)
    if (dSkin.hornTip) {
      ctx.fillStyle = dSkin.hornTip;
      ctx.beginPath();
      ctx.moveTo(6, -20);
      ctx.quadraticCurveTo(1, -22, -4, -23);
      ctx.quadraticCurveTo(2, -18, 8, -17);
      ctx.closePath();
      ctx.fill();
    }

    // Secondary Upper Crown Horn
    ctx.fillStyle = dSkin.hornCheek;
    ctx.beginPath();
    ctx.moveTo(20, -10);
    ctx.quadraticCurveTo(12, -20, 2, -16);
    ctx.quadraticCurveTo(13, -13, 24, -7);
    ctx.closePath();
    ctx.fill();

    // Third Lower Cheek Horn
    ctx.fillStyle = dSkin.horn;
    ctx.beginPath();
    ctx.moveTo(22, -3);
    ctx.lineTo(8, -10);
    ctx.lineTo(26, -5);
    ctx.closePath();
    ctx.fill();

    // Electric Blue Lightning Fissures on Snout / Cheek
    if (dSkin.hasLightningVeins) {
      ctx.save();
      ctx.strokeStyle = '#38bdf8';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.moveTo(25, -5);
      ctx.lineTo(33, -3);
      ctx.lineTo(43, -6);
      ctx.moveTo(33, -3);
      ctx.lineTo(37, 2);
      ctx.stroke();
      ctx.restore();
    }

    // Predator Eye with Brow & Slit Pupil
    ctx.fillStyle = dSkin.border;
    ctx.beginPath();
    ctx.moveTo(27, -12);
    ctx.lineTo(39, -8);
    ctx.lineTo(34, -4);
    ctx.fill();

    // Glowing Red/Colored Iris with Specular Flare
    ctx.save();
    ctx.shadowColor = dSkin.eyeIris;
    ctx.shadowBlur = 8;
    ctx.fillStyle = dSkin.eyeIris;
    ctx.beginPath();
    ctx.ellipse(33, -5, 4.4, 3.2, 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = dSkin.eyePupil;
    ctx.beginPath();
    ctx.ellipse(33.4, -5, 1.2, 2.9, 0.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(34.6, -6.2, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.restore(); // restore head save

    // F. BOTTOM / NEAR WING (Realistic anatomical bat wing with horizontal sweep)
    this.drawAnatomicalWing(ctx, false, wingAngle, dSkin);

    ctx.restore(); // restore master dragon transform
  }

  /* --------------------------------------------------------------------------
   * REALISTIC ANATOMICAL DRAGON WING RENDERER (Aerodynamic & Proportional)
   * Sweeps naturally outward and back, avoiding oversized towering sails
   * -------------------------------------------------------------------------- */
  drawAnatomicalWing(ctx, isFar, wingAngle, dSkin) {
    ctx.save();
    const scale = isFar ? 0.88 : 1.0;
    const phase = isFar ? (wingAngle + 0.16) : wingAngle;
    const flapSin = Math.sin(phase);
    const flapCos = Math.cos(phase);

    // Realistic Shoulder Attachment on Dragon Flank
    const shoulderX = isFar ? -4 : 4;
    const shoulderY = isFar ? -8 : -1;

    // Dynamic Rotational Wing Flapping around Shoulder Joint
    const flapRot = flapSin * 0.44;
    ctx.translate(shoulderX, shoulderY);
    ctx.rotate(flapRot);
    ctx.translate(-shoulderX, -shoulderY);

    // 1. Upper Arm (Humerus) curving naturally back
    const elbowX = shoulderX + (-8 + flapCos * 3) * scale;
    const elbowY = shoulderY + (-14 + flapSin * 4) * scale;

    // 2. Forearm (Radius/Ulna) reaching forward-up to Wrist
    const wristX = elbowX + (16 + flapCos * 2) * scale;
    const wristY = elbowY + (-12 + flapSin * 3) * scale;

    // 3. Four Natural Bat-Wing Finger Phalanges (Proportional, aerodynamic span)
    // Digit 1: Lead Wingtip Spar
    const tip1X = wristX + (26 + flapCos * 3) * scale;
    const tip1Y = wristY + (-6 + flapSin * 2) * scale;

    // Digit 2: Upper High Spar
    const tip2X = wristX + (10 + flapCos * 2) * scale;
    const tip2Y = wristY + (-18 + flapSin * 10) * scale;

    // Digit 3: Mid Rib Spar
    const tip3X = wristX + (-10 + flapCos * 2) * scale;
    const tip3Y = wristY + (-14 + flapSin * 8) * scale;

    // Digit 4: Trailing Inner Spar
    const tip4X = wristX + (-28 + flapCos * 2) * scale;
    const tip4Y = wristY + (-2 + flapSin * 6) * scale;

    // Wing Flank Base Attachment
    const flankBaseX = shoulderX - 16 * scale;
    const flankBaseY = shoulderY + 5 * scale;

    // 4. Flight Membrane Gradient
    const memGrad = ctx.createLinearGradient(shoulderX, shoulderY, tip1X - 20, tip1Y + 20);
    if (isFar) {
      memGrad.addColorStop(0, dSkin.wingOuter);
      memGrad.addColorStop(0.6, dSkin.wingGrad1);
      memGrad.addColorStop(1, dSkin.wingOuter);
    } else {
      memGrad.addColorStop(0, dSkin.wingGrad1);
      memGrad.addColorStop(0.5, dSkin.wingGrad2);
      memGrad.addColorStop(1, dSkin.wingGrad3);
    }

    ctx.fillStyle = memGrad;
    ctx.beginPath();
    // Leading edge: Shoulder -> Elbow -> Wrist -> Tip 1
    ctx.moveTo(shoulderX, shoulderY);
    ctx.quadraticCurveTo(shoulderX - 3 * scale, shoulderY - 8 * scale, elbowX, elbowY);
    ctx.quadraticCurveTo(elbowX + 8 * scale, elbowY - 6 * scale, wristX, wristY);
    ctx.lineTo(tip1X, tip1Y);

    // Scalloped trailing edges between fingers
    ctx.quadraticCurveTo(wristX + 16 * scale, wristY - 14 * scale, tip2X, tip2Y);
    ctx.quadraticCurveTo(wristX - 2 * scale, wristY - 16 * scale, tip3X, tip3Y);
    ctx.quadraticCurveTo(wristX - 20 * scale, wristY - 8 * scale, tip4X, tip4Y);
    ctx.quadraticCurveTo(flankBaseX - 6 * scale, flankBaseY - 2 * scale, flankBaseX, flankBaseY);
    ctx.lineTo(shoulderX, shoulderY);
    ctx.closePath();
    ctx.fill();

    // 5. Delicate Wing Membrane Veins / Electric Blue Current
    if (dSkin.hasLightningVeins) {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.shadowColor = '#00e5ff';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.1 * scale;
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX + 12 * scale, wristY - 7 * scale, (tip1X + tip2X) * 0.5, (tip1Y + tip2Y) * 0.5);
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX - 1 * scale, wristY - 9 * scale, (tip2X + tip3X) * 0.5, (tip2Y + tip3Y) * 0.5);
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX - 15 * scale, wristY - 3 * scale, (tip3X + tip4X) * 0.5, (tip3Y + tip4Y) * 0.5);
      ctx.stroke();
      ctx.restore();
    } else {
      ctx.strokeStyle = isFar ? 'rgba(0, 0, 0, 0.25)' : dSkin.wingVein;
      ctx.lineWidth = 0.8 * scale;
      ctx.beginPath();
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX + 10 * scale, wristY - 8 * scale, (tip1X + tip2X) * 0.5, (tip1Y + tip2Y) * 0.5);
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX - 2 * scale, wristY - 10 * scale, (tip2X + tip3X) * 0.5, (tip2Y + tip3Y) * 0.5);
      ctx.moveTo(wristX, wristY);
      ctx.quadraticCurveTo(wristX - 16 * scale, wristY - 4 * scale, (tip3X + tip4X) * 0.5, (tip3Y + tip4Y) * 0.5);
      ctx.stroke();
    }

    // 6. Articulated Bone Spars (Humerus, Forearm, and 4 Finger Bones)
    ctx.strokeStyle = dSkin.wingSpar;
    ctx.lineWidth = (isFar ? 2.0 : 2.6) * scale;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.quadraticCurveTo(shoulderX - 3 * scale, shoulderY - 8 * scale, elbowX, elbowY);
    ctx.quadraticCurveTo(elbowX + 8 * scale, elbowY - 6 * scale, wristX, wristY);
    ctx.lineTo(tip1X, tip1Y);
    ctx.moveTo(wristX, wristY);
    ctx.lineTo(tip2X, tip2Y);
    ctx.moveTo(wristX, wristY);
    ctx.lineTo(tip3X, tip3Y);
    ctx.moveTo(wristX, wristY);
    ctx.lineTo(tip4X, tip4Y);
    ctx.stroke();

    // 7. Golden / Amber Wing Ridge Crest (Matching User Image)
    if (dSkin.wingRidge) {
      ctx.strokeStyle = dSkin.wingRidge;
      ctx.lineWidth = (isFar ? 2.0 : 2.6) * scale;
      ctx.beginPath();
      ctx.moveTo(elbowX, elbowY);
      ctx.quadraticCurveTo(elbowX + 8 * scale, elbowY - 6 * scale, wristX, wristY);
      ctx.lineTo(tip2X, tip2Y);
      ctx.stroke();
    }

    // 8. Sharp Hooked Thumb Claw (Alula) at Wrist Joint
    ctx.fillStyle = dSkin.claws;
    ctx.beginPath();
    ctx.moveTo(wristX, wristY);
    ctx.lineTo(wristX + 3.5 * scale, wristY - 4.5 * scale);
    ctx.lineTo(wristX + 0.8 * scale, wristY);
    ctx.closePath();
    ctx.fill();

    // 9. Specular Highlight Ridge on Main Arm Bone (for Near Wing)
    if (!isFar && !dSkin.wingRidge) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.0 * scale;
      ctx.beginPath();
      ctx.moveTo(shoulderX, shoulderY - 1);
      ctx.quadraticCurveTo(shoulderX - 3 * scale, shoulderY - 9 * scale, elbowX, elbowY - 1);
      ctx.quadraticCurveTo(elbowX + 8 * scale, elbowY - 7 * scale, wristX, wristY - 1);
      ctx.stroke();
    }

    ctx.restore();
  }

  /* --------------------------------------------------------------------------
   * OBSTACLE BIRDS RENDERING ENGINE (Animated Raptor Species)
   * -------------------------------------------------------------------------- */
  drawObstacleBird(bird) {
    const ctx = this.ctx;
    const sp = bird.species || BIRD_SPECIES[1];
    const s = (bird.radius || 26) / 26; // Normalization scale
    const wingFlap = Math.sin(bird.wingPhase || 0);
    const tilt = Math.sin(bird.bobTimer || 0) * 0.08;

    ctx.save();
    ctx.translate(bird.x, bird.y);
    ctx.rotate(tilt);
    ctx.scale(s, s);

    // 1. Fan Tail Feathers (pointing right +X)
    ctx.save();
    ctx.fillStyle = sp.wingTipColor;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(28, -8);
    ctx.lineTo(24, -2);
    ctx.lineTo(32, 0);
    ctx.lineTo(24, 2);
    ctx.lineTo(28, 8);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = sp.wingColor;
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(22, -5);
    ctx.lineTo(25, 0);
    ctx.lineTo(22, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 2. Back Wing (Underwing during flap cycle)
    ctx.save();
    const backWingFlap = wingFlap * 0.85;
    const backWingY = -12 + backWingFlap * 22;
    ctx.fillStyle = sp.wingTipColor;
    ctx.beginPath();
    ctx.moveTo(-4, -6);
    ctx.quadraticCurveTo(8, backWingY * 0.6, 12, backWingY);
    ctx.lineTo(16, backWingY + 8);
    ctx.lineTo(8, backWingY + 12);
    ctx.lineTo(0, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Main Muscular Torso & Belly
    ctx.save();
    const bodyGrad = ctx.createLinearGradient(-16, -10, 16, 10);
    bodyGrad.addColorStop(0, sp.bodyColor);
    bodyGrad.addColorStop(0.55, sp.wingColor);
    bodyGrad.addColorStop(1, sp.bellyColor);
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 9, -0.08, 0, Math.PI * 2);
    ctx.fill();

    // Feather texture strokes on breast
    ctx.strokeStyle = sp.bellyColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-8, 3);
    ctx.quadraticCurveTo(-4, 6, 0, 4);
    ctx.moveTo(-4, 5);
    ctx.quadraticCurveTo(0, 8, 4, 6);
    ctx.stroke();
    ctx.restore();

    // 4. Head & Predatory Hooked Beak (facing left -X)
    ctx.save();
    // Head dome
    ctx.fillStyle = sp.bodyColor;
    ctx.beginPath();
    ctx.arc(-14, -3, 8, 0, Math.PI * 2);
    ctx.fill();

    // Crest / Nape feathers
    ctx.fillStyle = sp.wingColor;
    ctx.beginPath();
    ctx.moveTo(-12, -10);
    ctx.lineTo(-6, -14);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.fill();

    // Hooked Raptor Beak
    ctx.fillStyle = sp.beakColor;
    ctx.beginPath();
    ctx.moveTo(-20, -4);
    ctx.lineTo(-30, -1);
    ctx.quadraticCurveTo(-32, 4, -28, 6);
    ctx.lineTo(-20, 1);
    ctx.closePath();
    ctx.fill();

    // Piercing Raptor Eye
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(-16, -4, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = sp.eyeColor;
    ctx.beginPath();
    ctx.arc(-16, -4, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(-16, -4, 1.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(-16.8, -4.8, 0.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 5. Tucked Claws / Talons
    ctx.save();
    ctx.fillStyle = sp.beakColor;
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#b45309';
    ctx.beginPath();
    ctx.moveTo(0, 7);
    ctx.lineTo(-4, 12);
    ctx.lineTo(-1, 10);
    ctx.lineTo(2, 12);
    ctx.lineTo(3, 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // 6. Front Main Articulated Wing
    ctx.save();
    const frontWingTipY = -18 + wingFlap * 26;
    const frontWingTipX = 6 + wingFlap * 4;

    const wingGrad = ctx.createLinearGradient(-6, -4, frontWingTipX + 10, frontWingTipY + 20);
    wingGrad.addColorStop(0, sp.wingColor);
    wingGrad.addColorStop(0.65, sp.bodyColor);
    wingGrad.addColorStop(1, sp.wingTipColor);

    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(-6, -3);
    ctx.quadraticCurveTo(frontWingTipX * 0.5, frontWingTipY * 0.7 - 6, frontWingTipX, frontWingTipY);

    // Primary Flight Feathers
    const fCount = sp.featherCount || 5;
    for (let f = 0; f < fCount; f++) {
      const fX = frontWingTipX + (f * 5) - 4;
      const fY = frontWingTipY + (f * 6) + 6;
      ctx.lineTo(fX, fY);
      ctx.lineTo(fX - 4, fY + 2);
    }
    ctx.quadraticCurveTo(4, 2, -6, 2);
    ctx.closePath();
    ctx.fill();

    // Wing Coverts / Feather Ridge lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(-4, -2);
    ctx.quadraticCurveTo(frontWingTipX * 0.5, frontWingTipY * 0.5, frontWingTipX - 2, frontWingTipY + 8);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  drawEntities() {
    const ctx = this.ctx;

    // 1. Draw Environmental Wind Zones
    for (const w of this.windZones) {
      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 6]);
      ctx.strokeRect(w.x, w.y, w.w, w.h);
      ctx.restore();
    }

    for (const wp of this.windParticles) {
      ctx.save();
      ctx.strokeStyle = `rgba(255, 255, 255, ${wp.life / wp.maxLife * 0.5})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(wp.x, wp.y);
      ctx.lineTo(wp.x - wp.vx * 3, wp.y - wp.vy * 3);
      ctx.stroke();
      ctx.restore();
    }

    // 2. Draw Obstacle Birds
    for (const bird of this.rocks) {
      this.drawObstacleBird(bird);
    }

    // 3. Draw Coins
    for (const coin of this.coinsList) {
      ctx.save();
      ctx.translate(coin.x, coin.y);
      const scaleX = Math.cos(coin.spin);

      ctx.fillStyle = '#ffd700';
      ctx.strokeStyle = '#b45309';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.max(2, Math.abs(scaleX) * coin.radius), coin.radius, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      if (Math.abs(scaleX) > 0.4) {
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.ellipse(0, 0, Math.abs(scaleX) * (coin.radius * 0.5), coin.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 4. Draw Power-ups
    for (const p of this.powerupsList) {
      ctx.save();
      ctx.translate(p.x, p.y);

      const glowR = p.radius + Math.sin(p.pulse * 2) * 4;
      const grad = ctx.createRadialGradient(0, 0, 6, 0, 0, glowR);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, p.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, glowR * 1.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '16px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.icon, 0, 1);

      ctx.restore();
    }

    // 5. Draw Particles (Feather & Spark dynamics)
    for (const pt of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx.fillStyle = pt.color;
      if (pt.isFeather) {
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot || 0);
        ctx.beginPath();
        ctx.ellipse(0, 0, pt.size * 2, pt.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // 6. Draw Score Popups
    for (const sp of this.scorePopups) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, sp.life / sp.maxLife);
      ctx.fillStyle = sp.color;
      ctx.font = 'bold 16px "Nunito", sans-serif';
      ctx.textAlign = 'center';
      ctx.shadowColor = '#000000';
      ctx.shadowBlur = 6;
      ctx.fillText(sp.text, sp.x, sp.y);
      ctx.restore();
    }
  }

  drawGame() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const currentStage = SKY_STAGES[this.currentStageIndex];
    this.drawParallax(currentStage);

    if (this.state === 'PLAYING' || this.state === 'PAUSED' || this.state === 'QUIZ') {
      this.drawEntities();
      this.drawDragon();
    }
  }

  /* --------------------------------------------------------------------------
   * MAIN GAME LOOP
   * -------------------------------------------------------------------------- */
  gameLoop(timestamp) {
    if (!this.lastTime) this.lastTime = timestamp;
    const elapsed = timestamp - this.lastTime;
    this.lastTime = timestamp;

    const dt = Math.min(2.5, elapsed / 16.666);

    if (this.state === 'PLAYING') {
      this.updateGame(dt);
    } else if (this.state === 'MENU') {
      this.mountainOffset += 1.0 * dt;
      this.cloudOffset += 1.8 * dt;
      this.groundOffset += 2.0 * dt;
    }

    // Always update live skin preview when skins screen is active
    if (this.previewCtx && this.screenSkins && !this.screenSkins.classList.contains('hidden')) {
      this.previewWingAngle += 0.14 * dt;
      this.previewTime += 0.03 * dt;
      this.renderSkinPreview();
    }

    this.drawGame();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
}

/* ----------------------------------------------------------------------------
 * 5. INITIALIZE ENGINE WHEN PAGE LOADS
 * ---------------------------------------------------------------------------- */
window.addEventListener('DOMContentLoaded', () => {
  window.game = new DragonGame();
});
