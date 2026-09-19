/**
 * Dragon Sky Quest - User Interface & Screen State Controller
 * Manages menus, HUD, leaderboards, customization drawers, and high scores.
 */

class UIManager {
  constructor(game) {
    this.game = game;

    // Screens
    this.screenStart = document.getElementById('screen-start');
    this.screenPause = document.getElementById('screen-pause');
    this.screenGameOver = document.getElementById('screen-gameover');
    this.screenHowToPlay = document.getElementById('screen-howtoplay');
    this.screenLeaderboard = document.getElementById('screen-leaderboard');
    this.hud = document.getElementById('game-hud');

    // HUD Elements
    this.heartsContainer = document.getElementById('hud-hearts');
    this.scoreVal = document.getElementById('hud-score-val');
    this.multiplierVal = document.getElementById('hud-multiplier-val');
    this.biomeName = document.getElementById('hud-biome-name');
    this.milestoneCount = document.getElementById('hud-milestone-count');
    this.milestoneFill = document.getElementById('hud-milestone-fill');
    this.fireChargeFill = document.getElementById('hud-fire-fill');
    this.powerupsList = document.getElementById('hud-powerups-list');

    // Audio Buttons
    this.btnSfx = document.getElementById('btn-toggle-sfx');
    this.btnMusic = document.getElementById('btn-toggle-music');

    this.bindEvents();
    this.initSkinSelector();
    this.updateAudioIcons();
  }

  bindEvents() {
    // Start Game
    document.getElementById('btn-start-game').addEventListener('click', () => {
      audio.playClick();
      this.game.startGame();
    });

    // How to Play
    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      audio.playClick();
      this.screenHowToPlay.classList.remove('hidden');
    });
    document.getElementById('btn-close-howtoplay').addEventListener('click', () => {
      audio.playClick();
      this.screenHowToPlay.classList.add('hidden');
    });

    // Leaderboard
    document.getElementById('btn-leaderboard').addEventListener('click', () => {
      audio.playClick();
      this.showLeaderboardModal();
    });
    document.getElementById('btn-close-leaderboard').addEventListener('click', () => {
      audio.playClick();
      this.screenLeaderboard.classList.add('hidden');
    });

    // Pause / Resume
    document.getElementById('btn-pause-toggle').addEventListener('click', () => {
      this.game.togglePause();
    });
    document.getElementById('btn-resume-game').addEventListener('click', () => {
      audio.playClick();
      this.game.togglePause();
    });
    document.getElementById('btn-restart-game').addEventListener('click', () => {
      audio.playClick();
      this.screenPause.classList.add('hidden');
      this.game.startGame();
    });
    document.getElementById('btn-menu-from-pause').addEventListener('click', () => {
      audio.playClick();
      this.screenPause.classList.add('hidden');
      this.showStartMenu();
    });

    // Game Over Buttons
    document.getElementById('btn-play-again').addEventListener('click', () => {
      audio.playClick();
      this.screenGameOver.classList.add('hidden');
      this.game.startGame();
    });
    document.getElementById('btn-menu-from-gameover').addEventListener('click', () => {
      audio.playClick();
      this.screenGameOver.classList.add('hidden');
      this.showStartMenu();
    });

    // Audio Toggles
    this.btnSfx.addEventListener('click', () => {
      const state = audio.toggleSfx();
      this.updateAudioIcons();
      if (state) audio.playClick();
    });
    this.btnMusic.addEventListener('click', () => {
      audio.toggleMusic();
      this.updateAudioIcons();
    });
  }

  updateAudioIcons() {
    this.btnSfx.innerHTML = audio.sfxEnabled ? '🔊' : '🔇';
    this.btnMusic.innerHTML = audio.musicEnabled ? '🎵' : '🎼';
  }

  initSkinSelector() {
    const container = document.getElementById('skin-selector-container');
    container.innerHTML = '';

    Object.keys(DRAGON_SKINS).forEach(key => {
      const skin = DRAGON_SKINS[key];
      const card = document.createElement('div');
      card.className = `skin-card ${this.game.dragon.skinKey === key ? 'active' : ''}`;
      card.innerHTML = `
        <div class="skin-icon" style="background: radial-gradient(circle, ${skin.glow} 0%, ${skin.primary} 70%, #000 100%);">
          🐉
        </div>
        <span class="skin-name">${skin.name.split(' ')[0]}</span>
      `;
      card.addEventListener('click', () => {
        audio.playClick();
        this.game.dragon.setSkin(key);
        container.querySelectorAll('.skin-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
      container.appendChild(card);
    });
  }

  showStartMenu() {
    this.game.state = 'MENU';
    this.screenStart.classList.remove('hidden');
    this.screenPause.classList.add('hidden');
    this.screenGameOver.classList.add('hidden');
    this.hud.style.display = 'none';
  }

  hideStartMenu() {
    this.screenStart.classList.add('hidden');
    this.hud.style.display = 'flex';
  }

  showPauseMenu() {
    this.screenPause.classList.remove('hidden');
  }

  hidePauseMenu() {
    this.screenPause.classList.add('hidden');
  }

  showGameOver(stats) {
    this.screenGameOver.classList.remove('hidden');
    this.hud.style.display = 'none';

    // Populate Stats
    document.getElementById('gameover-score').textContent = stats.score.toLocaleString();
    document.getElementById('gameover-distance').textContent = `${Math.floor(stats.distance)}m`;
    document.getElementById('gameover-coins').textContent = stats.coins;
    
    const accuracy = stats.quizzesAnswered > 0 
      ? Math.round((stats.quizzesCorrect / stats.quizzesAnswered) * 100) 
      : 0;
    document.getElementById('gameover-accuracy').textContent = `${accuracy}% (${stats.quizzesCorrect}/${stats.quizzesAnswered})`;
    document.getElementById('gameover-biome').textContent = stats.biomeReached;

    // Calculate Rank Title
    let rank = "Apprentice Drake";
    if (stats.score > 10000) rank = "Grand Celestial Wyrm";
    else if (stats.score > 5000) rank = "Sky Arch-Dragon";
    else if (stats.score > 2500) rank = "Storm Soarer";
    else if (stats.score > 1000) rank = "Sky Knight";
    document.getElementById('gameover-rank').textContent = rank;

    // Check & Save High Score
    const isNewHigh = this.saveHighScore(stats.score, stats.coins, rank);
    const highBanner = document.getElementById('high-score-banner');
    if (isNewHigh) {
      highBanner.style.display = 'inline-block';
      highBanner.textContent = '🏆 NEW HIGH SCORE RECORD! 🏆';
      this.game.particles.emitConfetti(this.game.canvas.width * 0.5, this.game.canvas.height * 0.3, 60);
    } else {
      highBanner.style.display = 'none';
    }
  }

  updateHUD(dragon, score, multiplier, coinsInMilestone, targetMilestone, currentBiome) {
    // 1. Hearts
    this.heartsContainer.innerHTML = '';
    for (let i = 0; i < dragon.maxLives; i++) {
      const heart = document.createElement('span');
      heart.className = `heart-icon ${i < dragon.lives ? '' : 'lost'}`;
      heart.innerHTML = '❤️';
      this.heartsContainer.appendChild(heart);
    }

    // 2. Score & Multiplier
    this.scoreVal.textContent = score.toLocaleString();
    this.multiplierVal.textContent = `${multiplier}x`;
    if (multiplier > 1) {
      this.multiplierVal.classList.add('active');
    } else {
      this.multiplierVal.classList.remove('active');
    }

    // 3. Biome Badge
    this.biomeName.textContent = currentBiome.name;

    // 4. Milestone Coin Progress
    this.milestoneCount.textContent = `${coinsInMilestone} / ${targetMilestone} Coins`;
    const milestonePct = Math.min(100, (coinsInMilestone / targetMilestone) * 100);
    this.milestoneFill.style.width = `${milestonePct}%`;

    // 5. Fireball Recharge Bar
    const chargePct = dragon.powerups.fireblastTimer > 0 
      ? 100 
      : ((dragon.fireCharges + (dragon.fireCharges < dragon.maxFireCharges ? dragon.fireRechargeTimer / dragon.fireRechargeRate : 0)) / dragon.maxFireCharges) * 100;
    this.fireChargeFill.style.width = `${chargePct}%`;

    // 6. Active Power-ups
    this.powerupsList.innerHTML = '';
    if (dragon.powerups.shield) {
      this.addPowerUpBadge('🛡️', 'Shield Active');
    }
    if (dragon.powerups.magnetTimer > 0) {
      this.addPowerUpBadge('🧲', `${Math.ceil(dragon.powerups.magnetTimer / 60)}s`);
    }
    if (dragon.powerups.timeSlowTimer > 0) {
      this.addPowerUpBadge('⏳', `${Math.ceil(dragon.powerups.timeSlowTimer / 60)}s`);
    }
    if (dragon.powerups.fireblastTimer > 0) {
      this.addPowerUpBadge('🔥', `${Math.ceil(dragon.powerups.fireblastTimer / 60)}s`);
    }
  }

  addPowerUpBadge(icon, timerText) {
    const pill = document.createElement('div');
    pill.className = 'powerup-pill';
    pill.innerHTML = `
      <span class="powerup-pill-icon">${icon}</span>
      <span class="powerup-pill-timer">${timerText}</span>
    `;
    this.powerupsList.appendChild(pill);
  }

  saveHighScore(score, coins, rank) {
    const scores = this.getLeaderboard();
    const isTop = scores.length === 0 || score > scores[0].score;
    scores.push({
      score: score,
      coins: coins,
      rank: rank,
      date: new Date().toLocaleDateString()
    });
    scores.sort((a, b) => b.score - a.score);
    const trimmed = scores.slice(0, 5);
    localStorage.setItem('dsq_high_scores', JSON.stringify(trimmed));
    return isTop;
  }

  getLeaderboard() {
    try {
      const data = localStorage.getItem('dsq_high_scores');
      return data ? JSON.parse(data) : [];
    } catch(e) {
      return [];
    }
  }

  showLeaderboardModal() {
    const tableBody = document.getElementById('leaderboard-tbody');
    tableBody.innerHTML = '';
    const scores = this.getLeaderboard();

    if (scores.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#94a3b8; padding: 20px;">No flights recorded yet. Soar into the sky and claim your legacy!</td></tr>';
    } else {
      scores.forEach((s, idx) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>#${idx + 1}</td>
          <td style="font-weight:700; color:var(--primary-gold);">${s.score.toLocaleString()}</td>
          <td>${s.coins} 🪙</td>
          <td>${s.rank}</td>
        `;
        tableBody.appendChild(row);
      });
    }
    this.screenLeaderboard.classList.remove('hidden');
  }
}
