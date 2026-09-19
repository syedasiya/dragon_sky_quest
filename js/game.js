/**
 * Dragon Sky Quest - Master Game Engine
 * Coordinates canvas rendering, input listeners, physics updates, collisions, and state machines.
 */

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');

    // Internal Native Canvas Resolution (16:9 HD)
    this.width = 1280;
    this.height = 720;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Subsystems
    this.particles = new ParticleManager();
    this.parallaxBg = new ParallaxBackground();
    this.dragon = new Dragon(this.width, this.height);
    this.obstacles = new ObstacleManager(this.width, this.height);
    this.quizManager = new QuizPortalManager(this);
    this.ui = new UIManager(this);

    // State & Gameplay Variables
    this.state = 'MENU'; // 'MENU', 'PLAYING', 'QUIZ', 'PAUSED', 'GAMEOVER'
    this.score = 0;
    this.distance = 0;
    this.baseSpeed = 4.5;
    this.currentSpeed = 4.5;
    this.streakMultiplier = 1;

    // Quiz Milestone Tracking
    this.targetMilestone = 10; // 10 coins to first quiz
    this.coinsInCurrentMilestone = 0;
    this.totalCoinsCollected = 0;

    // Stats for Run Summary
    this.stats = {
      score: 0,
      distance: 0,
      coins: 0,
      quizzesAnswered: 0,
      quizzesCorrect: 0,
      biomeReached: "Azure Meadows"
    };

    // Delta Time
    this.lastTime = 0;

    // Input States
    this.keys = {};
    this.isPointerDown = false;

    this.bindInputs();
    this.particles.initWeather(this.width, this.height, 0);

    // Start Game Loop
    requestAnimationFrame((t) => this.loop(t));
  }

  bindInputs() {
    // Keyboard Listeners
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      if (e.code === 'KeyP' || e.code === 'Escape') {
        if (this.state === 'PLAYING' || this.state === 'PAUSED') {
          this.togglePause();
        }
      }

      if (this.state === 'PLAYING') {
        if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'KeyK') {
          this.dragon.flap();
        }
        if (e.code === 'KeyF' || e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'KeyJ') {
          this.dragon.shootFireball();
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    // Pointer / Mouse / Touch on Canvas
    this.canvas.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      if (this.state === 'PLAYING') {
        if (e.button === 2) {
          // Right click = fireball
          this.dragon.shootFireball();
        } else {
          this.dragon.flap();
        }
      }
    });

    // Context menu prevent
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Mobile UI Buttons
    const mobFlap = document.getElementById('mobile-btn-flap');
    const mobFire = document.getElementById('mobile-btn-fire');
    if (mobFlap) {
      mobFlap.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.state === 'PLAYING') this.dragon.flap();
      });
    }
    if (mobFire) {
      mobFire.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        if (this.state === 'PLAYING') this.dragon.shootFireball();
      });
    }
  }

  startGame() {
    this.state = 'PLAYING';
    this.score = 0;
    this.distance = 0;
    this.baseSpeed = 4.5;
    this.streakMultiplier = 1;
    this.coinsInCurrentMilestone = 0;
    this.totalCoinsCollected = 0;
    this.targetMilestone = 10;

    this.stats = {
      score: 0,
      distance: 0,
      coins: 0,
      quizzesAnswered: 0,
      quizzesCorrect: 0,
      biomeReached: "Azure Meadows"
    };

    this.dragon.reset(this.width, this.height);
    this.obstacles.reset(this.width, this.height);
    this.particles.reset();
    this.parallaxBg.setBiome(0);
    this.particles.initWeather(this.width, this.height, 0);

    this.ui.hideStartMenu();
    this.ui.updateHUD(this.dragon, this.score, this.streakMultiplier, this.coinsInCurrentMilestone, this.targetMilestone, this.parallaxBg.getCurrentBiome());

    audio.startMusic();
  }

  togglePause() {
    if (this.state === 'PLAYING') {
      this.state = 'PAUSED';
      this.ui.showPauseMenu();
    } else if (this.state === 'PAUSED') {
      this.state = 'PLAYING';
      this.ui.hidePauseMenu();
    }
  }

  triggerQuizPortal() {
    this.state = 'QUIZ';
    this.quizManager.openQuiz();
  }

  resumeFromQuiz() {
    this.state = 'PLAYING';
    this.coinsInCurrentMilestone = 0;
    // Next milestone requires slightly more coins (10 -> 12 -> 15...)
    this.targetMilestone = Math.min(20, this.targetMilestone + 2);
    this.ui.updateHUD(this.dragon, this.score, this.streakMultiplier, this.coinsInCurrentMilestone, this.targetMilestone, this.parallaxBg.getCurrentBiome());
  }

  gameOver() {
    this.state = 'GAMEOVER';
    audio.playGameOver();

    this.stats.score = this.score;
    this.stats.distance = this.distance;
    this.stats.coins = this.totalCoinsCollected;
    this.stats.biomeReached = this.parallaxBg.getCurrentBiome().name;

    this.ui.showGameOver(this.stats);
  }

  update(dt) {
    // Continuous down arrow diving
    if (this.state === 'PLAYING') {
      if (this.keys['ArrowDown'] || this.keys['KeyS']) {
        this.dragon.dive();
      }
    }

    // Dynamic Game Speed Calculation
    let speed = this.baseSpeed + Math.min(4.0, this.distance * 0.0008);
    if (this.dragon.powerups.timeSlowTimer > 0) {
      speed *= 0.55; // Time Slow
    }
    this.currentSpeed = speed;

    if (this.state === 'PLAYING') {
      this.distance += speed * 0.15 * dt;
      this.score += Math.round(speed * 0.1 * this.streakMultiplier);
    }

    // Parallax background updates always (smooth in menu too)
    this.parallaxBg.update(dt, this.state === 'PLAYING' ? this.currentSpeed : 1.5);

    if (this.state === 'PLAYING') {
      // 1. Update Player Dragon
      this.dragon.update(dt, this.particles);

      // 2. Update Obstacles & Items
      this.obstacles.update(dt, this.currentSpeed, this.dragon, this.particles);

      // 3. Collision Checks
      this.checkCollisions();

      // 4. Milestone Check for Quiz Portal
      if (this.coinsInCurrentMilestone >= this.targetMilestone) {
        this.triggerQuizPortal();
      }

      // 5. HUD Sync
      this.ui.updateHUD(this.dragon, this.score, this.streakMultiplier, this.coinsInCurrentMilestone, this.targetMilestone, this.parallaxBg.getCurrentBiome());
    }

    // Update Particles
    this.particles.update(dt, this.width, this.height, this.parallaxBg.biomeIndex);
  }

  checkCollisions() {
    const dragon = this.dragon;

    // 1. Fireballs vs Obstacles
    for (const fb of dragon.fireballs) {
      if (fb.dead) continue;
      for (const obs of this.obstacles.obstacles) {
        if (obs.dead) continue;
        const dx = fb.x - obs.x;
        const dy = fb.y - obs.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < fb.radius + obs.radius) {
          fb.dead = true;
          obs.hp--;
          if (obs.hp <= 0) {
            obs.dead = true;
            this.particles.emitRockExplosion(obs.x, obs.y, obs.radius);
            audio.playExplosion();
            this.score += 50 * this.streakMultiplier;
          } else {
            audio.playHit();
          }
          break;
        }
      }
    }

    // 2. Dragon vs Obstacles
    for (const obs of this.obstacles.obstacles) {
      if (obs.dead) continue;
      const dx = (dragon.x + 8) - obs.x;
      const dy = dragon.y - obs.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      // Forgiving collision check for great player feel
      if (dist < (dragon.radius + obs.radius * 0.72)) {
        const outcome = dragon.takeDamage();
        if (outcome === 'shield_saved') {
          obs.dead = true;
          this.particles.emitRockExplosion(obs.x, obs.y, obs.radius);
        } else if (outcome === 'dead') {
          this.particles.emitRockExplosion(dragon.x, dragon.y, 45);
          this.gameOver();
          return;
        } else if (outcome === 'hit') {
          this.streakMultiplier = 1; // Reset streak
          this.particles.emitRockExplosion(dragon.x, dragon.y, 25);
        }
      }
    }

    // 3. Dragon vs Coins
    for (const c of this.obstacles.coins) {
      if (c.dead) continue;
      const dx = (dragon.x + 8) - c.x;
      const dy = dragon.y - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < dragon.radius + c.radius + 6) {
        c.dead = true;
        this.coinsInCurrentMilestone++;
        this.totalCoinsCollected++;
        this.score += 10 * this.streakMultiplier;
        audio.playCoin();
        this.particles.emitCoinSparkles(c.x, c.y);
      }
    }

    // 4. Dragon vs Gems
    for (const g of this.obstacles.gems) {
      if (g.dead) continue;
      const dx = (dragon.x + 8) - g.x;
      const dy = dragon.y - g.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < dragon.radius + g.radius + 8) {
        g.dead = true;
        this.score += g.points * this.streakMultiplier;
        audio.playGem();
        this.particles.emitGemSparkles(g.x, g.y, g.color);
      }
    }

    // 5. Dragon vs Power-ups
    for (const p of this.obstacles.powerups) {
      if (p.dead) continue;
      const dx = (dragon.x + 8) - p.x;
      const dy = dragon.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < dragon.radius + p.radius + 10) {
        p.dead = true;
        dragon.applyPowerup(p.type);
        this.particles.emitGemSparkles(p.x, p.y, p.meta.color);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Parallax Background
    this.parallaxBg.draw(this.ctx, this.width, this.height);

    // 2. Draw Obstacles, Coins, Gems, Power-ups
    if (this.state === 'PLAYING' || this.state === 'PAUSED' || this.state === 'QUIZ') {
      this.obstacles.draw(this.ctx);
    }

    // 3. Draw Player Dragon
    if (this.state === 'PLAYING' || this.state === 'PAUSED' || this.state === 'QUIZ') {
      this.dragon.draw(this.ctx);
    }

    // 4. Draw Particles (Weather & Effects)
    this.particles.draw(this.ctx);
  }

  loop(timestamp) {
    if (!this.lastTime) this.lastTime = timestamp;
    const elapsed = timestamp - this.lastTime;
    this.lastTime = timestamp;

    // Normalize delta time (capped to prevent huge physics jumps)
    const dt = Math.min(2.5, elapsed / 16.666);

    if (this.state !== 'PAUSED' && this.state !== 'QUIZ') {
      this.update(dt);
    }

    this.draw();
    requestAnimationFrame((t) => this.loop(t));
  }
}

// Instantiate engine when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  window.game = new GameEngine();
});
