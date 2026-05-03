'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};
  const { CAT_META } = ns.constants;

  function createCategoryStats() {
    return Object.keys(CAT_META).reduce((acc, category) => {
      acc[category] = { correct: 0, total: 0 };
      return acc;
    }, {});
  }

  ns.createState = function createState() {
    return {
      mode: 'full',
      selectedCategory: null,
      selectedRankingCategory: '여행',

      questions: [],
      currentIndex: 0,

      totalScore: 0,
      correctCount: 0,
      consecutiveCorrect: 0,
      longestStreak: 0,
      responseTimes: [],
      hintsUsedTotal: 0,

      answered: false,
      hintUsed: false,
      hintsLeft: 3,
      questionStartTime: 0,

      timeLeft: 15,
      timerInterval: null,
      paused: false,

      categoryStats: createCategoryStats(),
      categoryMeta: CAT_META,
    };
  };
})();
