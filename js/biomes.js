/**
 * Dragon Sky Quest - Biomes & Parallax Background Engine
 * Features multi-layer infinite scrolling, smooth sky gradients, dynamic terrain & lighting.
 */

const BIOMES = [
  {
    name: "Azure Meadows",
    skyGradient: ["#0369a1", "#0284c7", "#38bdf8", "#bae6fd"],
    sunColor: "rgba(255, 245, 180, 0.8)",
    sunGlow: "rgba(255, 215, 0, 0.3)",
    mountainFar: "#155e75",
    mountainMid: "#0e7490",
    cloudColor: "rgba(255, 255, 255, 0.75)",
    themeColor: "#38bdf8"
  },
  {
    name: "Sunset Horizon",
    skyGradient: ["#3b0764", "#831843", "#c2410c", "#fde047"],
    sunColor: "rgba(255, 180, 50, 0.9)",
    sunGlow: "rgba(255, 80, 0, 0.4)",
    mountainFar: "#4c0519",
    mountainMid: "#881337",
    cloudColor: "rgba(255, 190, 160, 0.65)",
    themeColor: "#f97316"
  },
  {
    name: "Storm Peaks",
    skyGradient: ["#020617", "#0f172a", "#1e293b", "#334155"],
    sunColor: "rgba(148, 163, 184, 0.3)",
    sunGlow: "rgba(56, 189, 248, 0.15)",
    mountainFar: "#090d16",
    mountainMid: "#111827",
    cloudColor: "rgba(71, 85, 105, 0.8)",
    themeColor: "#818cf8"
  },
  {
    name: "Mystic Aurora",
    skyGradient: ["#050515", "#1e1b4b", "#3b0764", "#4c1d95"],
    sunColor: "rgba(216, 180, 254, 0.7)",
    sunGlow: "rgba(168, 85, 247, 0.4)",
    mountainFar: "#180a32",
    mountainMid: "#2e1065",
    cloudColor: "rgba(192, 132, 252, 0.4)",
    themeColor: "#c084fc"
  },
  {
    name: "Magma Rift",
    skyGradient: ["#1c0404", "#450a0a", "#7f1d1d", "#ea580c"],
    sunColor: "rgba(254, 202, 202, 0.6)",
    sunGlow: "rgba(239, 68, 68, 0.4)",
    mountainFar: "#2d0b0b",
    mountainMid: "#491010",
    cloudColor: "rgba(120, 40, 40, 0.6)",
    themeColor: "#ef4444"
  }
];

class ParallaxBackground {
  constructor() {
    this.biomeIndex = 0;
    this.targetBiomeIndex = 0;
    this.transitionProgress = 1.0;
    
    this.layer1Offset = 0; // Far mountains (speed ~0.2)
    this.layer2Offset = 0; // Mid mountains (speed ~0.5)
    this.cloudOffset = 0;  // Foreground clouds (speed ~0.8)

    // Lightning flash timer for Storm Peaks biome
    this.lightningAlpha = 0;
    this.lightningTimer = 0;

    // Procedural mountain seed points
    this.farMountainPoints = this.generateMountainPoints(18, 120, 220);
    this.midMountainPoints = this.generateMountainPoints(24, 180, 320);
    this.clouds = this.generateClouds(10);
  }

  generateMountainPoints(count, minY, maxY) {
    const points = [];
    for (let i = 0; i <= count + 2; i++) {
      points.push({
        xRel: i / count,
        y: Math.random() * (maxY - minY) + minY
      });
    }
    return points;
  }

  generateClouds(count) {
    const clouds = [];
    for (let i = 0; i < count; i++) {
      clouds.push({
        x: Math.random() * 1600,
        y: Math.random() * 320 + 40,
        scale: Math.random() * 0.6 + 0.7,
        alpha: Math.random() * 0.3 + 0.4,
        speedMultiplier: Math.random() * 0.4 + 0.8
      });
    }
    return clouds;
  }

  setBiome(index) {
    if (index === this.biomeIndex) return;
    this.targetBiomeIndex = index % BIOMES.length;
    this.transitionProgress = 0;
  }

  advanceBiome() {
    this.setBiome((this.biomeIndex + 1) % BIOMES.length);
  }

  update(dt, gameSpeed) {
    // Parallax scrolling
    this.layer1Offset += gameSpeed * 0.25 * dt;
    this.layer2Offset += gameSpeed * 0.6 * dt;
    this.cloudOffset += gameSpeed * 0.9 * dt;

    // Biome transition blend
    if (this.transitionProgress < 1.0) {
      this.transitionProgress += 0.02 * dt;
      if (this.transitionProgress >= 1.0) {
        this.transitionProgress = 1.0;
        this.biomeIndex = this.targetBiomeIndex;
      }
    }

    // Storm Peaks lightning generator
    if (this.biomeIndex === 2 || this.targetBiomeIndex === 2) {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        this.lightningTimer = Math.random() * 180 + 120; // Every 2-5 sec
        this.lightningAlpha = Math.random() * 0.45 + 0.35;
      }
      if (this.lightningAlpha > 0) {
        this.lightningAlpha -= 0.04 * dt;
      }
    }
  }

  getCurrentBiome() {
    return BIOMES[this.biomeIndex];
  }

  draw(ctx, width, height) {
    const cur = BIOMES[this.biomeIndex];
    const nxt = BIOMES[this.targetBiomeIndex];
    const t = this.transitionProgress;

    // 1. Draw Sky Gradient
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    for (let i = 0; i < 4; i++) {
      const stop = i / 3;
      // If transitioning, we could do a simple crossfade or use current biome
      grad.addColorStop(stop, t >= 1 ? cur.skyGradient[i] : (t < 0.5 ? cur.skyGradient[i] : nxt.skyGradient[i]));
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Draw Sun / Celestial Orb / Aurora
    if (this.biomeIndex === 3) {
      // Mystic Aurora Shimmer Waves
      this.drawAurora(ctx, width, height);
    } else {
      ctx.save();
      const sunGrad = ctx.createRadialGradient(width * 0.75, height * 0.28, 10, width * 0.75, height * 0.28, 160);
      sunGrad.addColorStop(0, cur.sunColor);
      sunGrad.addColorStop(0.4, cur.sunGlow);
      sunGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width * 0.75, height * 0.28, 160, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 3. Draw Distant Mountains (Layer 1)
    this.drawMountainLayer(ctx, width, height, this.farMountainPoints, this.layer1Offset, cur.mountainFar, 0.7);

    // 4. Draw Midground Mountains (Layer 2)
    this.drawMountainLayer(ctx, width, height, this.midMountainPoints, this.layer2Offset, cur.mountainMid, 1.0);

    // 5. Draw Drift Clouds
    this.drawClouds(ctx, width, height, cur.cloudColor);

    // 6. Draw Lightning Flash if active
    if (this.lightningAlpha > 0.01) {
      ctx.save();
      ctx.fillStyle = `rgba(255, 255, 255, ${this.lightningAlpha})`;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();
    }
  }

  drawAurora(ctx, width, height) {
    ctx.save();
    const time = Date.now() * 0.001;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * 0.15 + i * 40);
      for (let x = 0; x <= width; x += 30) {
        const y = height * 0.2 + i * 40 + Math.sin(x * 0.004 + time + i) * 35 + Math.cos(x * 0.008 - time * 0.5) * 20;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height * 0.6);
      ctx.lineTo(0, height * 0.6);
      ctx.closePath();

      const auroraGrad = ctx.createLinearGradient(0, height * 0.1, 0, height * 0.5);
      auroraGrad.addColorStop(0, i === 0 ? 'rgba(34, 197, 94, 0.25)' : (i === 1 ? 'rgba(168, 85, 247, 0.25)' : 'rgba(56, 189, 248, 0.2)'));
      auroraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auroraGrad;
      ctx.fill();
    }
    ctx.restore();
  }

  drawMountainLayer(ctx, width, height, points, offset, color, heightFactor) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    
    const segmentWidth = width / (points.length - 2);
    const shift = (offset % width);

    ctx.moveTo(-width, height);

    for (let rep = -1; rep <= 2; rep++) {
      const baseX = rep * width - shift;
      for (let i = 0; i < points.length; i++) {
        const px = baseX + i * segmentWidth;
        const py = height - (points[i].y * heightFactor);
        if (i === 0 && rep === -1) {
          ctx.lineTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
      }
    }

    ctx.lineTo(width * 2, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  drawClouds(ctx, width, height, cloudColor) {
    ctx.save();
    for (const c of this.clouds) {
      const curX = ((c.x - this.cloudOffset * c.speedMultiplier) % (width + 300)) - 150;
      const drawX = curX < -150 ? curX + width + 300 : curX;
      
      ctx.fillStyle = cloudColor;
      ctx.beginPath();
      // Draw fluffy cloud puffs
      const r = 35 * c.scale;
      ctx.arc(drawX, c.y, r, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.8, c.y - r * 0.4, r * 0.9, 0, Math.PI * 2);
      ctx.arc(drawX + r * 1.6, c.y, r * 0.8, 0, Math.PI * 2);
      ctx.arc(drawX + r * 0.7, c.y + r * 0.2, r * 0.7, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}
