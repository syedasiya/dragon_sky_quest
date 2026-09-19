/**
 * Dragon Sky Quest - Obstacles, Collectibles & Power-ups Manager
 * Generates fair, dynamic procedural sky hazards, coin waves, gems, and power-up orbs.
 */

// Obstacle (Sky Rocks & Floating Crags)
class Obstacle {
  constructor(x, y, radius, type = 'rock', isDestructible = true) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.type = type; // 'rock', 'crystal', 'cloud'
    this.isDestructible = isDestructible;
    this.hp = type === 'crystal' ? 2 : 1;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 0.03;
    this.dead = false;

    // Generate jagged rock polygon vertices
    this.points = [];
    const numPoints = 8;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * Math.PI * 2;
      const r = radius * (0.75 + Math.random() * 0.45);
      this.points.push({
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r
      });
    }
  }

  update(dt, gameSpeed) {
    this.x -= gameSpeed * dt;
    this.rotation += this.rotSpeed * dt;
    if (this.x < -100) this.dead = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.type === 'rock') {
      // Shaded Rock Polygon
      ctx.fillStyle = '#4a5568';
      ctx.strokeStyle = '#2d3748';
      ctx.lineWidth = 3;

      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);
      for (let i = 1; i < this.points.length; i++) {
        ctx.lineTo(this.points[i].x, this.points[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rock highlights / cracks
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.points[0].x * 0.5, this.points[0].y * 0.5);
      ctx.lineTo(this.points[2].x * 0.4, this.points[2].y * 0.4);
      ctx.lineTo(this.points[4].x * 0.5, this.points[4].y * 0.5);
      ctx.stroke();

    } else if (this.type === 'crystal') {
      // Glowing Floating Crystal Cluster
      const crystalGlow = ctx.createRadialGradient(0, 0, 5, 0, 0, this.radius);
      crystalGlow.addColorStop(0, '#e0e7ff');
      crystalGlow.addColorStop(0.6, '#818cf8');
      crystalGlow.addColorStop(1, '#4338ca');
      ctx.fillStyle = crystalGlow;
      ctx.strokeStyle = '#c7d2fe';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(0, -this.radius * 1.3);
      ctx.lineTo(this.radius * 0.8, 0);
      ctx.lineTo(0, this.radius * 1.3);
      ctx.lineTo(-this.radius * 0.8, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  }
}

// Collectible Coin
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 14;
    this.baseY = y;
    this.floatTimer = Math.random() * 10;
    this.dead = false;
    this.spin = Math.random() * Math.PI;
  }

  update(dt, gameSpeed, dragon) {
    this.x -= gameSpeed * dt;
    this.floatTimer += 0.05 * dt;
    this.y = this.baseY + Math.sin(this.floatTimer) * 4;
    this.spin += 0.08 * dt;

    // Magnetic pull toward dragon
    if (dragon && dragon.powerups.magnetTimer > 0) {
      const dx = (dragon.x + 10) - this.x;
      const dy = dragon.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260) {
        const pullSpeed = 9 * dt;
        this.x += (dx / dist) * pullSpeed;
        this.y += (dy / dist) * pullSpeed;
        this.baseY = this.y;
      }
    }

    if (this.x < -50) this.dead = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const scaleX = Math.cos(this.spin);

    // Outer Golden Ring
    ctx.fillStyle = '#ffd700';
    ctx.strokeStyle = '#b45309';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, Math.max(2, Math.abs(scaleX) * this.radius), this.radius, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Inner Emblem / Star
    if (Math.abs(scaleX) > 0.4) {
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.ellipse(0, 0, Math.abs(scaleX) * (this.radius * 0.55), this.radius * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// Rare High-Value Gem
class Gem {
  constructor(x, y, type = 'sapphire') {
    this.x = x;
    this.y = y;
    this.radius = 16;
    this.type = type; // 'sapphire' (+50), 'diamond' (+100)
    this.points = type === 'diamond' ? 100 : 50;
    this.color = type === 'diamond' ? '#ffffff' : '#00d2d3';
    this.glow = type === 'diamond' ? 'rgba(255,255,255,0.8)' : 'rgba(0,210,211,0.8)';
    this.dead = false;
    this.bob = Math.random() * 10;
  }

  update(dt, gameSpeed, dragon) {
    this.x -= gameSpeed * dt;
    this.bob += 0.06 * dt;
    this.y += Math.sin(this.bob) * 0.5;

    // Magnetic pull
    if (dragon && dragon.powerups.magnetTimer > 0) {
      const dx = (dragon.x + 10) - this.x;
      const dy = dragon.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 260) {
        const pullSpeed = 8 * dt;
        this.x += (dx / dist) * pullSpeed;
        this.y += (dy / dist) * pullSpeed;
      }
    }

    if (this.x < -50) this.dead = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Glowing aura
    ctx.shadowColor = this.glow;
    ctx.shadowBlur = 15;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;

    // Diamond polygon shape
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.radius * 0.8, -this.radius * 0.3);
    ctx.lineTo(0, this.radius);
    ctx.lineTo(-this.radius * 0.8, -this.radius * 0.3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  }
}

// Power-up Orb
class PowerUpItem {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.type = type; // 'shield', 'magnet', 'time_slow', 'fireblast', 'heart'
    this.dead = false;
    this.pulse = 0;

    const meta = {
      shield: { icon: '🛡️', color: '#38bdf8' },
      magnet: { icon: '🧲', color: '#f59e0b' },
      time_slow: { icon: '⏳', color: '#a855f7' },
      fireblast: { icon: '🔥', color: '#ef4444' },
      heart: { icon: '❤️', color: '#ec4899' }
    };
    this.meta = meta[type] || meta.shield;
  }

  update(dt, gameSpeed) {
    this.x -= gameSpeed * dt;
    this.pulse += 0.08 * dt;
    this.y += Math.sin(this.pulse) * 0.8;
    if (this.x < -60) this.dead = true;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Outer pulsating halo
    const glowRadius = this.radius + Math.sin(this.pulse * 2) * 4;
    const grad = ctx.createRadialGradient(0, 0, 8, 0, 0, glowRadius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
    grad.addColorStop(0.5, this.meta.color);
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, glowRadius * 1.3, 0, Math.PI * 2);
    ctx.fill();

    // Inner Glass Bubble
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.strokeStyle = this.meta.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Emoji Icon
    ctx.font = '16px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.meta.icon, 0, 1);

    ctx.restore();
  }
}

// Master Obstacle & Item Manager
class ObstacleManager {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.obstacles = [];
    this.coins = [];
    this.gems = [];
    this.powerups = [];

    this.spawnTimer = 0;
    this.spawnInterval = 110; // frames between obstacle spawns
    this.coinPatternTimer = 0;
    this.powerupTimer = 0;
  }

  reset(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.obstacles = [];
    this.coins = [];
    this.gems = [];
    this.powerups = [];
    this.spawnTimer = 40;
    this.coinPatternTimer = 20;
    this.powerupTimer = 300;
  }

  update(dt, gameSpeed, dragon, particles) {
    // 1. Spawn Obstacles
    this.spawnTimer -= dt;
    if (this.spawnTimer <= 0) {
      this.spawnObstacleBatch();
      // Dynamically tighten spawn intervals with distance
      this.spawnTimer = Math.max(65, this.spawnInterval - Math.min(40, gameSpeed * 5));
    }

    // 2. Spawn Coin Patterns
    this.coinPatternTimer -= dt;
    if (this.coinPatternTimer <= 0) {
      this.spawnCoinPattern();
      this.coinPatternTimer = Math.random() * 100 + 120;
    }

    // 3. Spawn Power-ups
    this.powerupTimer -= dt;
    if (this.powerupTimer <= 0) {
      this.spawnRandomPowerUp();
      this.powerupTimer = Math.random() * 600 + 700; // Every 12-20 sec
    }

    // 4. Update Entities
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.update(dt, gameSpeed);
      if (obs.dead) this.obstacles.splice(i, 1);
    }

    for (let i = this.coins.length - 1; i >= 0; i--) {
      const c = this.coins[i];
      c.update(dt, gameSpeed, dragon);
      if (c.dead) this.coins.splice(i, 1);
    }

    for (let i = this.gems.length - 1; i >= 0; i--) {
      const g = this.gems[i];
      g.update(dt, gameSpeed, dragon);
      if (g.dead) this.gems.splice(i, 1);
    }

    for (let i = this.powerups.length - 1; i >= 0; i--) {
      const p = this.powerups[i];
      p.update(dt, gameSpeed);
      if (p.dead) this.powerups.splice(i, 1);
    }
  }

  spawnObstacleBatch() {
    const pattern = Math.random();
    const spawnX = this.canvasWidth + 60;

    if (pattern < 0.45) {
      // Single floating rock (high, mid, or low)
      const y = Math.random() * (this.canvasHeight - 160) + 80;
      const radius = Math.random() * 18 + 26;
      this.obstacles.push(new Obstacle(spawnX, y, radius, 'rock', true));
    } else if (pattern < 0.8) {
      // Rock gate (top and bottom with safe gap in middle)
      const gapY = Math.random() * (this.canvasHeight - 260) + 130;
      const gapSize = 175;
      this.obstacles.push(new Obstacle(spawnX, gapY - gapSize * 0.7, 34, 'rock', true));
      this.obstacles.push(new Obstacle(spawnX, gapY + gapSize * 0.7, 34, 'rock', true));
    } else {
      // Crystal formation
      const y = Math.random() * (this.canvasHeight - 180) + 90;
      this.obstacles.push(new Obstacle(spawnX, y, 30, 'crystal', true));
    }
  }

  spawnCoinPattern() {
    const patternType = Math.floor(Math.random() * 3);
    const startX = this.canvasWidth + 50;
    const startY = Math.random() * (this.canvasHeight - 260) + 120;

    if (patternType === 0) {
      // Arc / Wave of coins
      const count = 7;
      for (let i = 0; i < count; i++) {
        const x = startX + i * 36;
        const y = startY + Math.sin((i / count) * Math.PI) * -65;
        this.coins.push(new Coin(x, y));
      }
      // Chance of rare gem at the crest of the arc
      if (Math.random() < 0.4) {
        this.gems.push(new Gem(startX + 3 * 36, startY - 75, Math.random() < 0.3 ? 'diamond' : 'sapphire'));
      }
    } else if (patternType === 1) {
      // Straight horizontal stream
      for (let i = 0; i < 5; i++) {
        this.coins.push(new Coin(startX + i * 38, startY));
      }
    } else {
      // Diamond / Box cluster
      this.coins.push(new Coin(startX, startY));
      this.coins.push(new Coin(startX + 32, startY - 24));
      this.coins.push(new Coin(startX + 32, startY + 24));
      this.coins.push(new Coin(startX + 64, startY));
      if (Math.random() < 0.5) {
        this.gems.push(new Gem(startX + 32, startY, 'sapphire'));
      }
    }
  }

  spawnRandomPowerUp() {
    const types = ['shield', 'magnet', 'fireblast', 'time_slow', 'heart'];
    const selected = types[Math.floor(Math.random() * types.length)];
    const y = Math.random() * (this.canvasHeight - 200) + 100;
    this.powerups.push(new PowerUpItem(this.canvasWidth + 50, y, selected));
  }

  draw(ctx) {
    for (const c of this.coins) c.draw(ctx);
    for (const g of this.gems) g.draw(ctx);
    for (const p of this.powerups) p.draw(ctx);
    for (const obs of this.obstacles) obs.draw(ctx);
  }
}
