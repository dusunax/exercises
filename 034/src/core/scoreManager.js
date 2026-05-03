'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};

  class ScoreManager {
    calculateScore(isCorrect, timeSpent, consecutiveCorrect, hintUsed) {
      if (!isCorrect) return 0;

      let score = 10;
      if (timeSpent < 10) score += 3;
      if (!hintUsed) score += 2;
      score += this.getConsecutiveBonus(consecutiveCorrect);
      return score;
    }

    getConsecutiveBonus(count) {
      if (count >= 5) return 5;
      if (count >= 3) return 3;
      if (count >= 2) return 1;
      return 0;
    }

    describeBonus(timeSpent, consecutiveCorrect, hintUsed) {
      const parts = ['기본 +10'];
      if (timeSpent < 10) parts.push('빠른 답변 +3');
      if (!hintUsed) parts.push('노힌트 +2');
      const bonus = this.getConsecutiveBonus(consecutiveCorrect);
      if (bonus > 0) parts.push(`콤보 +${bonus}`);
      return parts.join(' · ');
    }
  }

  ns.ScoreManager = ScoreManager;
})();
