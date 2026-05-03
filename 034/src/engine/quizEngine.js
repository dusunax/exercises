'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};
  const { showScreen } = ns;
  const { shuffle } = ns.utils;
  const { GAME_MODES } = ns.constants;

  function createQuizEngine({ state, dom, storage, scoreManager }) {
    function getQuestions() {
      if (state.mode === 'category') {
        return QUESTIONS.filter((q) => q.category === state.selectedCategory);
      }

      if (state.mode === 'speed') {
        return shuffle(QUESTIONS).slice(0, GAME_MODES.speed.count);
      }

      return [...QUESTIONS];
    }

    function resetState() {
      state.questions = getQuestions();
      state.currentIndex = 0;
      state.totalScore = 0;
      state.correctCount = 0;
      state.consecutiveCorrect = 0;
      state.longestStreak = 0;
      state.responseTimes = [];
      state.hintsUsedTotal = 0;
      state.hintsLeft = 3;
      state.paused = false;
      state.categoryStats = {
        '여행': { correct: 0, total: 0 },
        '음식': { correct: 0, total: 0 },
        '일상': { correct: 0, total: 0 },
        '미술/예술': { correct: 0, total: 0 },
      };
      state.timerInterval = null;
    }

    function startGame() {
      if (state.mode === 'category' && !state.selectedCategory) return;

      resetState();
      dom.timerWrap.classList.toggle('hidden', state.mode !== 'speed');

      // 진행률 바 애니메이션을 위해 초기 상태로 리셋
      dom.progressBar.style.transition = 'none';
      dom.progressBar.style.width = '0%';

      showScreen(dom, 'quiz');
      loadQuestion();
    }

    function loadQuestion() {
      const q = state.questions[state.currentIndex];
      const total = state.questions.length;

      state.answered = false;
      state.hintUsed = false;
      state.questionStartTime = Date.now();

      dom.questionCard.dataset.num = String(state.currentIndex + 1).padStart(2, '0');
      dom.quizCategory.textContent = q.category;
      dom.quizProgress.textContent = `${state.currentIndex + 1} / ${total}`;
      dom.questionText.textContent = q.question;

      requestAnimationFrame(() => {
        dom.progressBar.style.transition = 'width .35s ease';
        dom.progressBar.style.width = `${(state.currentIndex / total) * 100}%`;
      });

      dom.optionsContainer.innerHTML = '';
      q.options.forEach((optionText, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = optionText;
        btn.addEventListener('click', () => handleAnswer(index));
        dom.optionsContainer.appendChild(btn);
      });

      dom.feedbackBox.className = 'feedback-box hidden';
      dom.btnNext.classList.add('hidden');
      dom.btnHint.disabled = false;
      dom.hintsLeft.textContent = state.hintsLeft;
      updateToolbar();

      if (state.mode === 'speed') startTimer();
    }

    function startTimer() {
      const limit = GAME_MODES[state.mode].timeLimit;
      if (!limit) return;

      state.timeLeft = limit;
      updateTimerDisplay();

      state.timerInterval = setInterval(() => {
        if (state.paused) return;

        state.timeLeft -= 1;
        updateTimerDisplay();

        if (state.timeLeft <= 0) {
          stopTimer();
          handleAnswer(-1);
        }
      }, 1000);
    }

    function stopTimer() {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }

    function updateTimerDisplay() {
      const limit = GAME_MODES[state.mode].timeLimit;
      dom.timeLeftText.textContent = state.timeLeft;
      dom.timerBar.style.width = `${(state.timeLeft / limit) * 100}%`;
      dom.timerBar.style.background =
        state.timeLeft <= 5 ? 'var(--wrong)' : state.timeLeft <= 10 ? 'var(--warn)' : 'var(--primary)';
      dom.timeLeftText.style.color = state.timeLeft <= 5 ? 'var(--wrong)' : 'var(--primary)';
    }

    function updateToolbar() {
      dom.scoreVal.textContent = state.totalScore;
      dom.hintsLeft.textContent = state.hintsLeft;
      if (state.consecutiveCorrect >= 2) {
        dom.comboDisplay.classList.remove('hidden');
        dom.comboVal.textContent = state.consecutiveCorrect;
      } else {
        dom.comboDisplay.classList.add('hidden');
      }
    }

    function showFeedback(isCorrect, timedOut, question, score, timeSpent) {
      dom.feedbackBox.classList.remove('hidden', 'correct', 'wrong', 'timeout');

      if (timedOut) {
        dom.feedbackBox.classList.add('timeout');
        dom.feedbackResult.textContent = '시간 초과';
        dom.feedbackScoreDetail.textContent = '+0점';
      } else if (isCorrect) {
        dom.feedbackBox.classList.add('correct');
        dom.feedbackResult.textContent = `정답 +${score}점`;
        dom.feedbackScoreDetail.textContent = scoreManager.describeBonus(
          timeSpent,
          state.consecutiveCorrect,
          state.hintUsed,
        );
      } else {
        dom.feedbackBox.classList.add('wrong');
        dom.feedbackResult.textContent = '오답 +0점';
        dom.feedbackScoreDetail.textContent = '';
      }

      dom.feedbackExplanation.textContent = question.explanation;
      dom.btnNext.classList.remove('hidden');
    }

    function handleAnswer(selectedIndex) {
      if (state.answered) return;
      state.answered = true;
      stopTimer();

      const question = state.questions[state.currentIndex];
      const isCorrect = selectedIndex === question.correctAnswer;
      const timeSpent = (Date.now() - state.questionStartTime) / 1000;
      const timedOut = selectedIndex === -1;

      state.responseTimes.push(timeSpent);
      state.categoryStats[question.category].total++;

      if (isCorrect) {
        state.correctCount++;
        state.consecutiveCorrect++;
        state.longestStreak = Math.max(state.longestStreak, state.consecutiveCorrect);
        state.categoryStats[question.category].correct++;
      } else {
        state.consecutiveCorrect = 0;
      }

      const earned = scoreManager.calculateScore(
        isCorrect,
        timeSpent,
        state.consecutiveCorrect,
        state.hintUsed,
      );
      state.totalScore += earned;

      [...dom.optionsContainer.querySelectorAll('.option-btn')].forEach((btn, index) => {
        btn.disabled = true;
        if (index === question.correctAnswer) btn.classList.add('correct');
        else if (index === selectedIndex && !isCorrect) btn.classList.add('wrong');
      });

      showFeedback(isCorrect, timedOut, question, earned, timeSpent);
      updateToolbar();
    }

    function nextQuestion() {
      state.currentIndex++;
      if (state.currentIndex >= state.questions.length) {
        endGame();
      } else {
        loadQuestion();
      }
    }

    function useHint() {
      if (state.hintsLeft <= 0 || state.answered || state.hintUsed) return;

      const question = state.questions[state.currentIndex];
      const btns = Array.from(dom.optionsContainer.querySelectorAll('.option-btn'));
      const wrongBtns = btns.filter((_, index) => index !== question.correctAnswer);

      shuffle(wrongBtns).slice(0, 2).forEach((btn) => {
        btn.classList.add('eliminated');
        btn.disabled = true;
      });

      state.hintUsed = true;
      state.hintsLeft -= 1;
      state.hintsUsedTotal += 1;
      dom.hintsLeft.textContent = state.hintsLeft;
      dom.btnHint.disabled = state.hintsLeft <= 0;
    }

    function pauseGame() {
      state.paused = true;
      dom.pauseOverlay.classList.remove('hidden');
    }

    function resumeGame() {
      state.paused = false;
      dom.pauseOverlay.classList.add('hidden');
    }

    function endGame() {
      const total = state.questions.length;
      const accuracy = (state.correctCount / total) * 100;
      const avgTime = state.responseTimes.length
        ? (state.responseTimes.reduce((a, b) => a + b, 0) / state.responseTimes.length).toFixed(1)
        : '—';

      const grades = [
        { min: 90, mark: 'S', title: '천재!', msg: '놀라운 상식을 가지고 있어요!' },
        { min: 70, mark: 'A', title: '우수!', msg: '상식이 풍부한 편이에요.' },
        { min: 50, mark: 'B', title: '보통!', msg: '꽤 괜찮은 상식이에요.' },
        { min: 0, mark: 'C', title: '분발!', msg: '더 공부하고 다시 도전해봐요.' },
      ];
      const grade = grades.find((g) => accuracy >= g.min);

      const saveResult =
        state.mode === 'category' && state.selectedCategory
          ? storage.saveScoreForCategory(state.selectedCategory, state.totalScore, state.mode)
          : { isNewRecord: false };

      dom.resultEmoji.textContent = grade.mark;
      dom.resultEmoji.setAttribute('data-grade', grade.mark);
      dom.resultTitle.textContent = grade.title;
      dom.resultGradeMsg.textContent = grade.msg;
      dom.resultScore.textContent = state.totalScore;
      dom.resultCorrect.textContent = `정답 ${state.correctCount} / ${total}문제`;
      dom.resultNewRecord.classList.toggle('hidden', !saveResult.isNewRecord);

      dom.statAccuracy.textContent = `${Math.round(accuracy)}%`;
      dom.statAvgTime.textContent = `${avgTime}초`;
      dom.statStreak.textContent = `${state.longestStreak}연속`;
      dom.statHints.textContent = `${3 - state.hintsLeft}회`;

      dom.categoryBreakdownRows.innerHTML = Object.entries(state.categoryStats)
        .filter(([, s]) => s.total > 0)
        .map(
          ([cat, s]) => `<div class="breakdown-row">
            <span class="breakdown-cat">${cat}</span>
            <span class="breakdown-score${s.correct === s.total ? ' perfect' : ''}">${s.correct} / ${s.total}</span>
          </div>`,
        )
        .join('');

      showScreen(dom, 'result');
    }

    return {
      startGame,
      loadQuestion,
      nextQuestion,
      handleAnswer,
      useHint,
      pauseGame,
      resumeGame,
      endGame,
      stopTimer,
      resetState,
    };
  }

  ns.createQuizEngine = createQuizEngine;
})();
