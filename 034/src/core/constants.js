'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};

  ns.constants = {
    CATEGORIES: ['여행', '음식', '일상', '미술/예술'],

    CAT_META: {
      '여행': { max: 10 },
      '음식': { max: 10 },
      '일상': { max: 10 },
      '미술/예술': { max: 10 },
    },

    GAME_MODES: {
      full: { count: 40, timeLimit: null },
      category: { count: 10, timeLimit: null },
      speed: { count: 20, timeLimit: 15 },
    },

    RANKING_STORAGE_KEY: 'quiz-quiz034-rankings-v1',
  };
})();
