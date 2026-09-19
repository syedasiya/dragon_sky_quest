/**
 * Dragon Sky Quest - Dragon Player Entity & Fireball System
 * Handles procedural dragon vector animation, physics, skin customization, abilities, and fire breath.
 */

const DRAGON_SKINS = {
  crimson: {
    name: "Crimson Blaze",
    primary: "#ff4757",
    secondary: "#ffa502",
    belly: "#ffeaa7",
    wingMembrane: "rgba(255, 71, 87, 0.75)",
    glow: "#ff6b81",
    trailColor: "#ff9f43",
    fireColor: "#ff4757"
  },
  sapphire: {
    name: "Sapphire Frost",
    primary: "#0984e3",
    secondary: "#00cec9",
    belly: "#dfe6e9",
    wingMembrane: "rgba(9, 132, 227, 0.75)",
    glow: "#74b9ff",
    trailColor: "#00d2d3",
    fireColor: "#00d2d3"
  },
  emerald: {
    name: "Emerald Sprite",
    primary: "#2ed573",
    secondary: "#7bed9f",
    belly: "#f1f2f6",
    wingMembrane: "rgba(46, 213, 115, 0.75)",
    glow: "#2ed573",
    trailColor: "#7bed9f",
    fireColor: "#2ed573"
  },
  void: {
    name: "Void Shadow",
    primary: "#6c5ce7",
    secondary: "#a29bfe",
    belly: "#fd79a8",
    wingMembrane: "rgba(108, 92, 231, 0.75)",
    glow: "#a29bfe",
    trailColor: "#d63031",
    fireColor: "#a29bfe"
  },
  golden: {
    name: "Celestial Gold",
    primary: "#f1c40f",
    secondary: "#f39c12",
    belly: "#ffffff",
    wingMembrane: "rgba(241, 196, 15, 0.8)",
    glow: "#ffeaa7",
    trailColor: "#f1c40f",
    fireColor: "#ffd700"
  }
};

class Fireball {
  constructor(x, y, color = '#ff4757') {
    this.x = x;
    this.y = y;
    this.vx = 14;
    this.radius = 14;
    this.color = color;
    this.life = 120; // frames
    this.dead = false;
  }

  update(dt, particles) {
    this.x += this.vx * dt;
    this.life -= dt;
    if (this.life <= 0) this.dead = true;

    // Emit fire particle trail
    particles.emitFireTrail(this.x - 10, this.y);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const grad = ctx.createRadialGradient(0, 0, 2, 0, 0, this.radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.3, '#ffd700');
    grad.addColorStop(0.8, this.color);
    grad.addColorStop(1, 'rgba(255, 69, 0, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class Dragon {
  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 180;
    this.y = canvasHeight * 0.45;
    this.vy = 0;
    this.gravity = 0.38;
    this.flapImpulse = -8.2;
    this.diveImpulse = 0.55;
    this.rotation = 0;
    this.radius = 24; // Collision circle radius
    
    // Animation
    this.wingAngle = 0;
    this.wingSpeed = 0.15;
    this.isFlapping = false;
    
    // Customization Skin
    this.skinKey = 'crimson';
    this.skin = DRAGON_SKINS.crimson;

    // Health & Invulnerability
    this.maxLives = 3;
    this.lives = 3;
    this.invulnerableTimer = 0;

    // Fire Breath Charges
    this.maxFireCharges = 3;
    this.fireCharges = 3;
    this.fireRechargeTimer = 0;
    this.fireRechargeRate = 180; // frames to regenerate 1 fireball (~3s)
    this.fireballs = [];

    // Active Power-ups { shield: 0, magnet: 0, timeSlow: 0, fireblast: 0 }
    this.powerups = {
      shield: false,
      magnetTimer: 0,
      timeSlowTimer: 0,
      fireblastTimer: 0 // Infinite fireballs during duration
    };

    // Load saved skin
    const savedSkin = localStorage.getItem('dsq_dragon_skin');
    if (savedSkin && DRAGON_SKINS[savedSkin]) {
      this.setSkin(savedSkin);
    }
  }

  setSkin(key) {
    if (DRAGON_SKINS[key]) {
      this.skinKey = key;
      this.skin = DRAGON_SKINS[key];
      localStorage.setItem('dsq_dragon_skin', key);
    }
  }

  reset(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = 180;
    this.y = canvasHeight * 0.45;
    this.vy = 0;
    this.rotation = 0;
    this.lives = this.maxLives;
    this.invulnerableTimer = 0;
    this.fireCharges = this.maxFireCharges;
    this.fireRechargeTimer = 0;
    this.fireballs = [];
    this.powerups = {
      shield: false,
      magnetTimer: 0,
      timeSlowTimer: 0,
      fireblastTimer: 0
    };
  }

  flap() {
    this.vy = this.flapImpulse;
    this.isFlapping = true;
    audio.playFlap();
  }

  dive() {
    this.vy += this.diveImpulse;
  }

  shootFireball() {
    if (this.powerups.fireblastTimer > 0 || this.fireCharges > 0) {
      if (this.powerups.fireblastTimer <= 0) {
        this.fireCharges--;
      }
      this.fireballs.push(new Fireball(this.x + 36, this.y - 2, this.skin.fireColor));
      audio.playFireball();
      return true;
    }
    return false;
  }

  applyPowerup(type, duration = 600) {
    if (type === 'shield') {
      this.powerups.shield = true;
      audio.playPowerup();
    } else if (type === 'magnet') {
      this.powerups.magnetTimer = duration; // 10 seconds
      audio.playPowerup();
    } else if (type === 'time_slow') {
      this.powerups.timeSlowTimer = duration;
      audio.playPowerup();
    } else if (type === 'fireblast') {
      this.powerups.fireblastTimer = duration;
      this.fireCharges = this.maxFireCharges;
      audio.playPowerup();
    } else if (type === 'heart') {
      if (this.lives < this.maxLives) {
        this.lives++;
        audio.playPowerup();
      }
    }
  }

  takeDamage() {
    if (this.invulnerableTimer > 0) return false;

    // Check shield first
    if (this.powerups.shield) {
      this.powerups.shield = false;
      this.invulnerableTimer = 60; // 1 sec invulnerability
      audio.playExplosion();
      return 'shield_saved';
    }

    this.lives--;
    this.invulnerableTimer = 100; // ~1.7 sec invulnerability
    audio.playHit();
    return this.lives <= 0 ? 'dead' : 'hit';
  }

  update(dt, particles) {
    // 1. Vertical Physics
    this.vy += this.gravity * dt;
    this.y += this.vy * dt;

    // Boundaries clamping
    if (this.y < 35) {
      this.y = 35;
      this.vy = 0;
    }
    if (this.y > this.canvasHeight - 35) {
      this.y = this.canvasHeight - 35;
      this.vy = 0;
    }

    // 2. Dynamic Rotation tilt
    const targetRotation = Math.max(-0.6, Math.min(0.7, this.vy * 0.05));
    this.rotation += (targetRotation - this.rotation) * 0.15 * dt;

    // 3. Wing Flapping Animation
    if (this.vy < 0) {
      this.wingAngle += 0.35 * dt; // Flap vigorously when ascending
    } else {
      this.wingAngle += 0.1 * dt;  // Glide rhythmically when descending
    }

    // 4. Invulnerability Countdown
    if (this.invulnerableTimer > 0) {
      this.invulnerableTimer -= dt;
    }

    // 5. Fireball Recharge
    if (this.fireCharges < this.maxFireCharges) {
      this.fireRechargeTimer += dt;
      if (this.fireRechargeTimer >= this.fireRechargeRate) {
        this.fireCharges++;
        this.fireRechargeTimer = 0;
      }
    }

    // 6. Power-up Timers
    if (this.powerups.magnetTimer > 0) this.powerups.magnetTimer -= dt;
    if (this.powerups.timeSlowTimer > 0) this.powerups.timeSlowTimer -= dt;
    if (this.powerups.fireblastTimer > 0) this.powerups.fireblastTimer -= dt;

    // 7. Emit dragon flight particles
    particles.emitTrail(this.x - 28, this.y + 4, this.skin.trailColor, this.vy < -2);

    // 8. Update Fireballs
    for (let i = this.fireballs.length - 1; i >= 0; i--) {
      const fb = this.fireballs[i];
      fb.update(dt, particles);
      if (fb.dead || fb.x > this.canvasWidth + 50) {
        this.fireballs.splice(i, 1);
      }
    }
  }

  draw(ctx) {
    // 1. Draw Active Fireballs
    for (const fb of this.fireballs) {
      fb.draw(ctx);
    }

    // 2. Invulnerability Flashing
    if (this.invulnerableTimer > 0 && Math.floor(this.invulnerableTimer / 5) % 2 === 0) {
      return; // Skip drawing frame for flashing effect
    }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    // --- DRAW MAGNET AURA IF ACTIVE ---
    if (this.powerups.magnetTimer > 0) {
      ctx.save();
      const pulse = Math.sin(Date.now() * 0.008) * 6;
      ctx.strokeStyle = 'rgba(0, 210, 211, 0.4)';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // --- DRAW SHIELD BUBBLE IF ACTIVE ---
    if (this.powerups.shield) {
      ctx.save();
      const shieldGlow = ctx.createRadialGradient(0, 0, 20, 0, 0, 48);
      shieldGlow.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      shieldGlow.addColorStop(0.8, 'rgba(56, 189, 248, 0.5)');
      shieldGlow.addColorStop(1, 'rgba(125, 211, 252, 0.85)');
      ctx.fillStyle = shieldGlow;
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(0, 0, 44, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // --- PROCEDURAL DRAGON VECTOR ART ---

    // 1. Tail with spiked crest
    ctx.fillStyle = this.skin.primary;
    ctx.beginPath();
    ctx.moveTo(-15, 6);
    ctx.quadraticCurveTo(-38, 12 + Math.sin(this.wingAngle) * 4, -55, 8 + Math.sin(this.wingAngle) * 6);
    ctx.lineTo(-58, 2);
    ctx.quadraticCurveTo(-36, -2, -15, -4);
    ctx.closePath();
    ctx.fill();

    // Tail fin / arrow tip
    ctx.fillStyle = this.skin.secondary;
    ctx.beginPath();
    ctx.moveTo(-52, 8 + Math.sin(this.wingAngle) * 6);
    ctx.lineTo(-65, 0);
    ctx.lineTo(-50, -4);
    ctx.closePath();
    ctx.fill();

    // 2. Main Body Ellipse
    ctx.fillStyle = this.skin.primary;
    ctx.beginPath();
    ctx.ellipse(0, 2, 28, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Belly Scale Underbody
    ctx.fillStyle = this.skin.belly;
    ctx.beginPath();
    ctx.ellipse(2, 8, 20, 10, 0.1, 0, Math.PI);
    ctx.fill();

    // 4. Dragon Head & Snout
    ctx.fillStyle = this.skin.primary;
    ctx.beginPath();
    ctx.moveTo(18, -6);
    ctx.lineTo(38, -4); // Top snout
    ctx.quadraticCurveTo(45, 0, 42, 6); // Nose curve
    ctx.lineTo(26, 10); // Lower jaw
    ctx.lineTo(16, 8);
    ctx.closePath();
    ctx.fill();

    // Nostril smoke / glow
    ctx.fillStyle = this.skin.glow;
    ctx.beginPath();
    ctx.arc(38, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    // 5. Crown Horns
    ctx.fillStyle = this.skin.secondary;
    ctx.beginPath();
    ctx.moveTo(14, -8);
    ctx.quadraticCurveTo(2, -26, -6, -24);
    ctx.quadraticCurveTo(8, -14, 22, -6);
    ctx.closePath();
    ctx.fill();

    // 6. Glowing Fierce Eye
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(25, -2, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(26, -2, 2.5, 0, Math.PI * 2);
    ctx.fill();
    // Eye gleam
    ctx.fillStyle = this.skin.glow;
    ctx.beginPath();
    ctx.arc(27, -3, 1, 0, Math.PI * 2);
    ctx.fill();

    // 7. Articulated Wings (Animated flapping)
    const wingFlap = Math.sin(this.wingAngle);
    const wingHeight = -36 + wingFlap * 22;

    // Far Wing (Behind)
    ctx.fillStyle = this.skin.secondary;
    ctx.beginPath();
    ctx.moveTo(-6, -6);
    ctx.lineTo(-2, wingHeight - 8);
    ctx.lineTo(-24, wingHeight);
    ctx.closePath();
    ctx.fill();

    // Near Wing (Front Main Wing)
    ctx.fillStyle = this.skin.wingMembrane;
    ctx.beginPath();
    ctx.moveTo(2, -4);
    ctx.quadraticCurveTo(12, wingHeight - 12, -8, wingHeight - 18);
    ctx.lineTo(-28, wingHeight + 4);
    ctx.lineTo(-14, 2);
    ctx.closePath();
    ctx.fill();

    // Wing Bone Struts
    ctx.strokeStyle = this.skin.primary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(2, -4);
    ctx.lineTo(-8, wingHeight - 18);
    ctx.lineTo(-28, wingHeight + 4);
    ctx.stroke();

    ctx.restore();
  }
}
