/**
 * Dragon Sky Quest - High Performance Canvas Particle System
 * Manages trails, bursts, weather, sparks, explosions, and celebratory confetti.
 */

class Particle {
  constructor(x, y, vx, vy, size, color, life, shape = 'circle', fade = true, gravity = 0) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = size;
    this.initialSize = size;
    this.color = color;
    this.maxLife = life;
    this.life = life;
    this.shape = shape;
    this.fade = fade;
    this.gravity = gravity;
    this.rotation = Math.random() * Math.PI * 2;
    this.vRot = (Math.random() - 0.5) * 0.2;
  }

  update(dt = 1) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.vy += this.gravity * dt;
    this.rotation += this.vRot * dt;
    this.life -= dt;
    if (this.fade) {
      this.size = this.initialSize * Math.max(0, this.life / this.maxLife);
    }
  }

  draw(ctx) {
    if (this.life <= 0 || this.size <= 0) return;
    const alpha = Math.max(0, Math.min(1, this.life / this.maxLife));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.shape === 'circle') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.shape === 'spark') {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size, -this.size * 0.25, this.size * 2, this.size * 0.5);
      ctx.fillRect(-this.size * 0.25, -this.size, this.size * 0.5, this.size * 2);
    } else if (this.shape === 'rock_shard') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.moveTo(-this.size, -this.size * 0.5);
      ctx.lineTo(this.size * 0.8, -this.size);
      ctx.lineTo(this.size, this.size * 0.7);
      ctx.lineTo(-this.size * 0.4, this.size);
      ctx.closePath();
      ctx.fill();
    } else if (this.shape === 'confetti') {
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size, -this.size * 0.5, this.size * 2, this.size);
    } else if (this.shape === 'rain') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-this.vx * 3, -this.vy * 3);
      ctx.stroke();
    }

    ctx.restore();
  }
}

class ParticleManager {
  constructor() {
    this.particles = [];
    this.weatherParticles = [];
  }

  reset() {
    this.particles = [];
    this.weatherParticles = [];
  }

  // --- EMITTERS ---

  // Dragon Flight Trail
  emitTrail(x, y, color = '#ffd700', isBoosting = false) {
    const count = isBoosting ? 4 : 2;
    for (let i = 0; i < count; i++) {
      const vx = -(Math.random() * 3 + 3);
      const vy = (Math.random() - 0.5) * 1.5;
      const size = Math.random() * 4 + 2;
      const life = Math.random() * 20 + 15;
      this.particles.push(new Particle(x, y, vx, vy, size, color, life, 'circle', true, -0.02));
    }
  }

  // Collectible Coin Picked Up
  emitCoinSparkles(x, y) {
    const colors = ['#ffd700', '#ffea79', '#ffffff', '#ff9900'];
    for (let i = 0; i < 18; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 4 + 2;
      const life = Math.random() * 25 + 15;
      this.particles.push(new Particle(x, y, vx, vy, size, color, life, 'spark', true, 0.08));
    }
  }

  // Gem Picked Up
  emitGemSparkles(x, y, color = '#00d2d3') {
    for (let i = 0; i < 26; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 6 + 3;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = Math.random() * 5 + 3;
      const life = Math.random() * 30 + 20;
      this.particles.push(new Particle(x, y, vx, vy, size, color, life, 'spark', true, 0.05));
    }
  }

  // Rock Destruction / Blast
  emitRockExplosion(x, y, radius = 30) {
    const shardColors = ['#576574', '#8395a7', '#222f3e', '#ee5253'];
    for (let i = 0; i < 22; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 2;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const color = shardColors[Math.floor(Math.random() * shardColors.length)];
      const size = Math.random() * (radius * 0.25) + 3;
      const life = Math.random() * 30 + 20;
      this.particles.push(new Particle(x, y, vx, vy, size, color, life, 'rock_shard', true, 0.25));
    }
    // Fiery smoke ring
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push(new Particle(x, y, Math.cos(angle)*speed, Math.sin(angle)*speed, 12, 'rgba(255,100,0,0.7)', 25, 'circle', true, -0.05));
    }
  }

  // Fireball Trail
  emitFireTrail(x, y) {
    for (let i = 0; i < 3; i++) {
      const vx = -(Math.random() * 4 + 2);
      const vy = (Math.random() - 0.5) * 2;
      const size = Math.random() * 6 + 4;
      const colors = ['#ff4757', '#ffa502', '#ff6b81', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push(new Particle(x, y, vx, vy, size, color, 15, 'circle', true));
    }
  }

  // Confetti celebration (Milestone Quiz victory / Game Over High Score)
  emitConfetti(x, y, count = 50) {
    const colors = ['#ffd700', '#ff4757', '#2ed573', '#1e90ff', '#a55eea', '#ffa502'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed - 2;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 6 + 4;
      const life = Math.random() * 50 + 35;
      this.particles.push(new Particle(x, y, vx, vy, size, color, life, 'confetti', true, 0.15));
    }
  }

  // --- WEATHER & BIOME ATMOSPHERE ---
  initWeather(canvasWidth, canvasHeight, biomeIndex) {
    this.weatherParticles = [];
    const count = biomeIndex === 2 ? 120 : 40; // More for rain in storm biome
    for (let i = 0; i < count; i++) {
      this.spawnWeatherParticle(canvasWidth, canvasHeight, biomeIndex, true);
    }
  }

  spawnWeatherParticle(w, h, biomeIndex, initialScatter = false) {
    const x = initialScatter ? Math.random() * w : w + 20;
    const y = Math.random() * h;

    if (biomeIndex === 0) {
      // Azure Meadows: Floating dandelion seeds
      this.weatherParticles.push(new Particle(x, y, -(Math.random() * 1.5 + 0.8), (Math.random() - 0.5) * 0.5, Math.random() * 2.5 + 1.5, 'rgba(255,255,255,0.65)', 300, 'circle', false));
    } else if (biomeIndex === 1) {
      // Sunset: Warm glowing dust motes
      this.weatherParticles.push(new Particle(x, y, -(Math.random() * 2 + 1), (Math.random() - 0.5) * 0.8, Math.random() * 3 + 2, 'rgba(255, 215, 0, 0.7)', 260, 'circle', false));
    } else if (biomeIndex === 2) {
      // Storm Peaks: Fast angled rain streaks
      this.weatherParticles.push(new Particle(x, y, -(Math.random() * 4 + 7), Math.random() * 5 + 9, Math.random() * 2 + 1, 'rgba(165, 210, 255, 0.65)', 100, 'rain', false));
    } else if (biomeIndex === 3) {
      // Mystic Aurora: Shimmering stardust
      this.weatherParticles.push(new Particle(x, y, -(Math.random() * 1.2 + 0.5), (Math.random() - 0.5) * 0.4, Math.random() * 3 + 1, 'rgba(168, 85, 247, 0.8)', 280, 'spark', false));
    } else if (biomeIndex === 4) {
      // Magma Rift: Rising volcanic embers
      this.weatherParticles.push(new Particle(x, y, -(Math.random() * 2.5 + 1), -(Math.random() * 2 + 1), Math.random() * 3.5 + 1.5, 'rgba(255, 75, 43, 0.85)', 200, 'circle', true));
    }
  }

  update(dt, w, h, biomeIndex) {
    // Update main effect particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update & recycle weather particles
    for (let i = this.weatherParticles.length - 1; i >= 0; i--) {
      const p = this.weatherParticles[i];
      p.update(dt);
      if (p.x < -30 || p.y > h + 30 || p.y < -30 || p.life <= 0) {
        this.weatherParticles.splice(i, 1);
        this.spawnWeatherParticle(w, h, biomeIndex, false);
      }
    }
  }

  draw(ctx) {
    // Draw weather particles first
    for (const wp of this.weatherParticles) {
      wp.draw(ctx);
    }
    // Draw foreground effect particles
    for (const p of this.particles) {
      p.draw(ctx);
    }
  }
}
