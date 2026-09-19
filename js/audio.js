/**
 * Dragon Sky Quest - Procedural Audio Engine (Web Audio API)
 * Fully synthesized sound effects & dynamic background music with zero external audio assets!
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.musicEnabled = true;
    this.isMusicPlaying = false;
    this.musicInterval = null;
    this.currentStep = 0;
    
    // Master Gain Nodes
    this.sfxGain = null;
    this.musicGain = null;

    // Load user preferences
    const savedSfx = localStorage.getItem('dsq_sfx');
    const savedMusic = localStorage.getItem('dsq_music');
    if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';
    if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.value = this.sfxEnabled ? 0.35 : 0;
        this.sfxGain.connect(this.ctx.destination);

        this.musicGain = this.ctx.createGain();
        this.musicGain.gain.value = this.musicEnabled ? 0.18 : 0;
        this.musicGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSfx() {
    this.sfxEnabled = !this.sfxEnabled;
    localStorage.setItem('dsq_sfx', this.sfxEnabled);
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.sfxEnabled ? 0.35 : 0, this.ctx.currentTime);
    }
    return this.sfxEnabled;
  }

  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    localStorage.setItem('dsq_music', this.musicEnabled);
    if (this.musicGain && this.ctx) {
      this.musicGain.gain.setValueAtTime(this.musicEnabled ? 0.18 : 0, this.ctx.currentTime);
    }
    if (this.musicEnabled && !this.isMusicPlaying) {
      this.startMusic();
    }
    return this.musicEnabled;
  }

  // --- SOUND EFFECTS ---

  playClick() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);
      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);
      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch(e) {}
  }

  playFlap() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      // White noise buffer for whoosh
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, t);
      filter.frequency.exponentialRampToValueAtTime(150, t + 0.15);
      filter.Q.value = 2.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.15);
    } catch (e) {}
  }

  playCoin() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(987.77, t); // B5
      osc1.frequency.setValueAtTime(1318.51, t + 0.08); // E6

      osc2.frequency.setValueAtTime(1975.53, t); // B6
      osc2.frequency.setValueAtTime(2637.02, t + 0.08); // E7

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);

      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.35);
      osc2.stop(t + 0.35);
    } catch(e) {}
  }

  playGem() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const notes = [1046.50, 1318.51, 1567.98, 2093.00]; // C6, E6, G6, C7
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.04);
        gain.gain.setValueAtTime(0.25, t + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.04 + 0.25);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t + idx * 0.04);
        osc.stop(t + idx * 0.04 + 0.25);
      });
    } catch(e) {}
  }

  playFireball() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(350, t);
      osc.frequency.exponentialRampToValueAtTime(80, t + 0.25);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.25);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.exponentialRampToValueAtTime(200, t + 0.25);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(t);
      osc.stop(t + 0.25);
    } catch(e) {}
  }

  playExplosion() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(400, t);
      filter.frequency.exponentialRampToValueAtTime(60, t + 0.4);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.5, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.sfxGain);

      noise.start(t);
      noise.stop(t + 0.4);
    } catch(e) {}
  }

  playHit() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.exponentialRampToValueAtTime(40, t + 0.3);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch(e) {}
  }

  playPowerup() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.06);
        gain.gain.setValueAtTime(0.3, t + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + 0.2);
      });
    } catch(e) {}
  }

  playQuizPortal() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.6);

      gain.gain.setValueAtTime(0.1, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.65);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.65);
    } catch(e) {}
  }

  playCorrect() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      // Majestic triumphant fanfare: G4 -> C5 -> E5 -> G5 -> C6
      const fanfare = [
        { f: 392.00, start: 0, dur: 0.12 },
        { f: 523.25, start: 0.12, dur: 0.12 },
        { f: 659.25, start: 0.24, dur: 0.12 },
        { f: 783.99, start: 0.36, dur: 0.15 },
        { f: 1046.50, start: 0.51, dur: 0.5 }
      ];
      fanfare.forEach(note => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, t + note.start);
        gain.gain.setValueAtTime(0.35, t + note.start);
        gain.gain.exponentialRampToValueAtTime(0.001, t + note.start + note.dur);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t + note.start);
        osc.stop(t + note.start + note.dur);
      });
    } catch(e) {}
  }

  playWrong() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(190, t);
      osc1.frequency.exponentialRampToValueAtTime(110, t + 0.35);
      osc2.frequency.setValueAtTime(180, t);
      osc2.frequency.exponentialRampToValueAtTime(105, t + 0.35);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.35);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.sfxGain);
      osc1.start(t);
      osc2.start(t);
      osc1.stop(t + 0.35);
      osc2.stop(t + 0.35);
    } catch(e) {}
  }

  playGameOver() {
    if (!this.sfxEnabled) return;
    this.init();
    try {
      const t = this.ctx.currentTime;
      const sadNotes = [440, 415.3, 392, 349.23]; // A4, Ab4, G4, F4
      sadNotes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, t + i * 0.25);
        gain.gain.setValueAtTime(0.3, t + i * 0.25);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.25 + 0.4);
        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(t + i * 0.25);
        osc.stop(t + i * 0.25 + 0.4);
      });
    } catch(e) {}
  }

  // --- PROCEDURAL BACKGROUND ARCADE MUSIC ---

  startMusic() {
    if (this.isMusicPlaying) return;
    this.init();
    this.isMusicPlaying = true;
    
    // 16-step melodic loop pattern (Fantasy Chiptune / Arcade Style)
    // Scale: D Dorian / Minor (D4, E4, F4, G4, A4, C5, D5)
    const melody = [
      587.33, 0, 783.99, 880.00,  1046.50, 880.00, 783.99, 587.33,
      698.46, 0, 880.00, 1046.50, 1174.66, 1046.50, 880.00, 698.46
    ];
    const bass = [
      146.83, 146.83, 146.83, 146.83, 174.61, 174.61, 174.61, 174.61,
      196.00, 196.00, 196.00, 196.00, 220.00, 220.00, 146.83, 146.83
    ];

    const stepDuration = 180; // ms per 16th note (~166 BPM)

    this.musicInterval = setInterval(() => {
      if (!this.musicEnabled || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const noteFreq = melody[this.currentStep % 16];
        const bassFreq = bass[this.currentStep % 16];

        // Play Lead Melody Note
        if (noteFreq > 0) {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(noteFreq, t);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
          osc.connect(gain);
          gain.connect(this.musicGain);
          osc.start(t);
          osc.stop(t + 0.16);
        }

        // Play Bass Note (on quarter notes)
        if (this.currentStep % 2 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'sine';
          bassOsc.frequency.setValueAtTime(bassFreq, t);
          bassGain.gain.setValueAtTime(0.2, t);
          bassGain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);
          bassOsc.connect(bassGain);
          bassGain.connect(this.musicGain);
          bassOsc.start(t);
          bassOsc.stop(t + 0.3);
        }

        this.currentStep++;
      } catch (e) {}
    }, stepDuration);
  }

  stopMusic() {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    this.isMusicPlaying = false;
  }
}

// Global Sound Instance
const audio = new SoundEngine();
