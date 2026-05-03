'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};

  ns.getDomRefs = function getDomRefs() {
    return {
      screens: {
        home: document.getElementById('screen-home'),
        quiz: document.getElementById('screen-quiz'),
        result: document.getElementById('screen-result'),
      },

      // home
      btnStart: document.getElementById('btn-start'),
      btnRanking: document.getElementById('btn-ranking'),
      categorySelector: document.getElementById('category-selector'),
      homeModeTabs: document.querySelectorAll('.mode-tab'),
      homeCategoryButtons: document.querySelectorAll('.cat-btn'),
      homeBestScores: document.querySelectorAll('.cat-best'),

      // quiz
      scoreVal: document.getElementById('score-val'),
      comboDisplay: document.getElementById('combo-display'),
      comboVal: document.getElementById('combo-val'),
      hintsLeft: document.getElementById('hints-left'),
      btnHint: document.getElementById('btn-hint'),
      btnPause: document.getElementById('btn-pause'),
      pauseOverlay: document.getElementById('pause-overlay'),
      btnResume: document.getElementById('btn-resume'),
      btnQuit: document.getElementById('btn-quit'),

      quizCategory: document.getElementById('quiz-category'),
      quizProgress: document.getElementById('quiz-progress'),
      progressBar: document.getElementById('progress-bar'),
      timerWrap: document.getElementById('timer-wrap'),
      timerBar: document.getElementById('timer-bar'),
      timeLeftText: document.getElementById('time-left-text'),
      questionCard: document.getElementById('question-card'),
      questionText: document.getElementById('question-text'),
      optionsContainer: document.getElementById('options-container'),
      feedbackBox: document.getElementById('feedback-box'),
      feedbackResult: document.getElementById('feedback-result'),
      feedbackScoreDetail: document.getElementById('feedback-score-detail'),
      feedbackExplanation: document.getElementById('feedback-explanation'),
      btnNext: document.getElementById('btn-next'),

      // result
      resultEmoji: document.getElementById('result-emoji'),
      resultTitle: document.getElementById('result-title'),
      resultGradeMsg: document.getElementById('result-grade-msg'),
      resultNewRecord: document.getElementById('result-new-record'),
      resultScore: document.getElementById('result-score'),
      resultCorrect: document.getElementById('result-correct'),
      statAccuracy: document.getElementById('stat-accuracy'),
      statAvgTime: document.getElementById('stat-avg-time'),
      statStreak: document.getElementById('stat-streak'),
      statHints: document.getElementById('stat-hints'),
      categoryBreakdownRows: document.getElementById('category-breakdown-rows'),
      btnRetry: document.getElementById('btn-retry'),
      btnHome: document.getElementById('btn-home'),

      // ranking modal
      rankingModal: document.getElementById('ranking-modal'),
      rankingClose: document.getElementById('ranking-close'),
      rankingTabs: document.getElementById('ranking-tabs'),
      rankingList: document.getElementById('ranking-list'),
      rankingEmpty: document.getElementById('ranking-empty'),
    };
  };

  ns.showScreen = function showScreen(refs, name) {
    Object.values(refs.screens).forEach((el) => {
      el.classList.remove('active');
    });
    refs.screens[name].classList.add('active');
    window.scrollTo(0, 0);
  };
})();
