'use strict';

(function () {
  const ns = window.QuizApp;
  if (!ns) return;

  const {
    CATEGORIES,
    GAME_MODES,
  } = ns.constants;

  const dom = ns.getDomRefs();
  const state = ns.createState();
  const engine = ns.createQuizEngine({
    state,
    dom,
    storage: ns.storage,
    scoreManager: new ns.ScoreManager(),
  });

  const ranking = ns.createRankingController({
    dom,
    storage: ns.storage,
  });

  function renderHomeCategoryScores() {
    dom.homeBestScores.forEach((label) => {
      const category = label.dataset.catScore;
      const best = ns.storage.getCategoryBestScore(category);
      label.textContent = best == null ? '최고점 —' : `최고 ${best}점`;
    });
  }

  function showHome() {
    renderHomeCategoryScores();
    engine.stopTimer();
    ns.showScreen(dom, 'home');
  }

  function initModeTabs() {
    dom.homeModeTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        dom.homeModeTabs.forEach((item) => item.classList.remove('active'));
        tab.classList.add('active');

        state.mode = tab.dataset.mode;
        state.selectedCategory = null;
        dom.homeCategoryButtons.forEach((btn) => btn.classList.remove('active'));
        dom.categorySelector.classList.toggle('hidden', state.mode !== 'category');
        dom.btnStart.disabled = state.mode === 'category';
      });
    });

    dom.homeCategoryButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        dom.homeCategoryButtons.forEach((other) => other.classList.remove('active'));
        btn.classList.add('active');

        state.selectedCategory = btn.dataset.cat;
        dom.btnStart.disabled = false;
      });
    });
  }

  function bindCommonButtons() {
    dom.btnStart.addEventListener('click', () => engine.startGame());
    dom.btnNext.addEventListener('click', () => engine.nextQuestion());

    dom.btnHint.addEventListener('click', () => engine.useHint());
    dom.btnPause.addEventListener('click', () => engine.pauseGame());
    dom.btnResume.addEventListener('click', () => engine.resumeGame());
    dom.btnQuit.addEventListener('click', () => {
      engine.stopTimer();
      engine.resumeGame();
      showHome();
    });

    dom.btnRetry.addEventListener('click', () => {
      engine.startGame();
    });
    dom.btnHome.addEventListener('click', () => {
      showHome();
    });

    dom.btnRanking.addEventListener('click', () => {
      ranking.open(state.selectedRankingCategory || CATEGORIES[0]);
    });

    ranking.bind();

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !dom.rankingModal.classList.contains('hidden')) {
        ranking.close();
      }
    });
  }

  function bindModeDefaults() {
    // 기본 모드는 full (카테고리 선택 불필요)
    dom.categorySelector.classList.add('hidden');
    dom.btnStart.disabled = false;
    state.selectedCategory = null;
  }

  function updateRankingCategoryOnResult() {
    if (state.mode === 'category' && state.selectedCategory) {
      state.selectedRankingCategory = state.selectedCategory;
    }
  }

  function init() {
    // 퀴즈 결과에서 홈 이동 시 카테고리 탭 반영
    const originalEndGame = engine.endGame;
    engine.endGame = function () {
      originalEndGame();
      updateRankingCategoryOnResult();
    };

    showHome();
    bindModeDefaults();
    initModeTabs();
    bindCommonButtons();
  }

  init();
})();
