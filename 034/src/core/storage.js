'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};
  const { RANKING_STORAGE_KEY } = ns.constants;

  function getRankingData() {
    try {
      const raw = localStorage.getItem(RANKING_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? parsed
        : {};
    } catch {
      return {};
    }
  }

  function saveRankingData(data) {
    try {
      localStorage.setItem(RANKING_STORAGE_KEY, JSON.stringify(data));
    } catch {
      // 저장소가 불가능한 환경을 무시
    }
  }

  function getCategoryRanking(category) {
    const data = getRankingData();
    const raw = Array.isArray(data[category]) ? data[category] : [];

    return raw
      .map((item) => ({
        score: Number(item.score),
        date: typeof item.date === 'string' ? item.date : new Date(0).toISOString(),
        mode: item.mode || 'category',
      }))
      .filter((item) => Number.isFinite(item.score))
      .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }

  function loadRanking(category) {
    return getCategoryRanking(category);
  }

  function saveScoreForCategory(category, score, mode) {
    if (!category || !Number.isFinite(score)) return { isNewRecord: false };

    const rankingData = getRankingData();
    const list = getCategoryRanking(category);
    const bestBefore = list[0]?.score ?? -1;

    list.push({
      score,
      date: new Date().toISOString(),
      mode,
    });

    rankingData[category] = list
      .sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    saveRankingData(rankingData);
    return { isNewRecord: score > bestBefore };
  }

  function getCategoryBestScore(category) {
    const ranking = getCategoryRanking(category);
    return ranking.length ? ranking[0].score : null;
  }

  ns.storage = {
    getRankingData,
    saveRankingData,
    loadRanking,
    saveScoreForCategory,
    getCategoryBestScore,
  };
})();
