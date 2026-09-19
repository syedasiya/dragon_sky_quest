/**
 * Dragon Sky Quest - Quiz Portal State & UI Controller
 * Manages modal display, timer countdown, streak multiplier, rewards, and biome advancement.
 */

class QuizPortalManager {
  constructor(game) {
    this.game = game;
    this.isOpen = false;
    this.currentQuestion = null;
    this.timer = 15;
    this.maxTime = 15;
    this.timerInterval = null;
    this.answered = false;

    // DOM Elements
    this.overlay = document.getElementById('quiz-overlay');
    this.categoryTag = document.getElementById('quiz-category-tag');
    this.questionText = document.getElementById('quiz-question-text');
    this.optionsContainer = document.getElementById('quiz-options-container');
    this.timerText = document.getElementById('quiz-timer-text');
    this.timerBar = document.getElementById('quiz-timer-bar');
    this.feedbackBox = document.getElementById('quiz-feedback-box');

    this.bindKeyboardShortcuts();
  }

  bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (!this.isOpen || this.answered) return;
      const key = e.key.toUpperCase();
      let selectedIndex = -1;
      if (key === '1' || key === 'A') selectedIndex = 0;
      if (key === '2' || key === 'B') selectedIndex = 1;
      if (key === '3' || key === 'C') selectedIndex = 2;
      if (key === '4' || key === 'D') selectedIndex = 3;

      if (selectedIndex >= 0 && selectedIndex < 4) {
        this.selectOption(selectedIndex);
      }
    });
  }

  openQuiz() {
    this.isOpen = true;
    this.answered = false;
    this.currentQuestion = quizEngine.getRandomQuestion();
    this.timer = this.maxTime;

    audio.playQuizPortal();

    // Populate UI
    this.categoryTag.textContent = this.currentQuestion.category;
    this.questionText.textContent = this.currentQuestion.question;
    this.feedbackBox.className = 'quiz-feedback-box';
    this.feedbackBox.style.display = 'none';

    // Clear and build option buttons
    this.optionsContainer.innerHTML = '';
    const keyLabels = ['A', 'B', 'C', 'D'];
    this.currentQuestion.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span class="quiz-opt-key">${keyLabels[index]}</span> <span>${optText}</span>`;
      btn.addEventListener('click', () => {
        if (!this.answered) this.selectOption(index);
      });
      this.optionsContainer.appendChild(btn);
    });

    // Update timer bar & show overlay
    this.updateTimerDisplay();
    this.overlay.classList.remove('hidden');

    // Start 15s countdown
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timer -= 0.1;
      if (this.timer <= 0) {
        this.timer = 0;
        this.updateTimerDisplay();
        clearInterval(this.timerInterval);
        if (!this.answered) {
          this.handleTimeout();
        }
      } else {
        this.updateTimerDisplay();
      }
    }, 100);
  }

  updateTimerDisplay() {
    this.timerText.textContent = `${Math.ceil(this.timer)}s`;
    const percent = Math.max(0, (this.timer / this.maxTime) * 100);
    this.timerBar.style.width = `${percent}%`;
  }

  selectOption(selectedIndex) {
    if (this.answered) return;
    this.answered = true;
    if (this.timerInterval) clearInterval(this.timerInterval);

    const buttons = this.optionsContainer.querySelectorAll('.quiz-opt-btn');
    const isCorrect = selectedIndex === this.currentQuestion.correctIndex;

    // Highlight options
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === this.currentQuestion.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    // Handle outcome
    if (isCorrect) {
      this.handleCorrect();
    } else {
      this.handleWrong();
    }
  }

  handleTimeout() {
    this.answered = true;
    const buttons = this.optionsContainer.querySelectorAll('.quiz-opt-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === this.currentQuestion.correctIndex) {
        btn.classList.add('correct');
      }
    });
    this.handleWrong(true);
  }

  handleCorrect() {
    audio.playCorrect();
    this.game.stats.quizzesAnswered++;
    this.game.stats.quizzesCorrect++;
    this.game.streakMultiplier = Math.min(5, this.game.streakMultiplier + 1);
    
    // Reward bonus score
    const bonus = 500 * this.game.streakMultiplier;
    this.game.score += bonus;

    // Recharge fireball charges
    this.game.dragon.fireCharges = this.game.dragon.maxFireCharges;

    // Advance to next magical biome
    this.game.parallaxBg.advanceBiome();
    this.game.particles.initWeather(this.game.canvas.width, this.game.canvas.height, this.game.parallaxBg.targetBiomeIndex);

    // Confetti particles
    this.game.particles.emitConfetti(this.game.canvas.width * 0.5, this.game.canvas.height * 0.4, 45);

    // Show Feedback Box
    this.feedbackBox.className = 'quiz-feedback-box show correct';
    this.feedbackBox.innerHTML = `<strong>✨ Glorious Wisdom! (+${bonus} pts & Biome Advance)</strong><br>${this.currentQuestion.fact}`;

    // Auto resume after 2.2 seconds
    setTimeout(() => {
      this.closeQuiz();
    }, 2200);
  }

  handleWrong(isTimeout = false) {
    audio.playWrong();
    this.game.stats.quizzesAnswered++;
    this.game.streakMultiplier = 1; // Reset streak

    this.feedbackBox.className = 'quiz-feedback-box show wrong';
    const message = isTimeout ? "⏰ Time Expired Ancient Portal Closes!" : "❌ Incorrect Knowledge!";
    this.feedbackBox.innerHTML = `<strong>${message}</strong><br>${this.currentQuestion.fact}`;

    // Auto resume after 2.5 seconds
    setTimeout(() => {
      this.closeQuiz();
    }, 2500);
  }

  closeQuiz() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.isOpen = false;
    this.overlay.classList.add('hidden');
    this.game.resumeFromQuiz();
  }
}
