'use strict';

(function () {
  const ns = window.QuizApp = window.QuizApp || {};
  const { formatDate } = ns.utils;

  function createRankingController({ dom, storage }) {
    const tabs = Array.from(dom.rankingTabs.querySelectorAll('.ranking-tab'));

    function render(category) {
      const list = storage.loadRanking(category);
      dom.rankingList.innerHTML = '';
      dom.rankingEmpty.classList.toggle('hidden', list.length > 0);

      if (!list.length) return;

      dom.rankingList.innerHTML = list
        .map((item, index) => `
          <div class="ranking-entry">
            <span class="ranking-rank">${index + 1}</span>
            <span class="ranking-score${index === 0 ? ' best' : ''}">${item.score}점</span>
            <span class="ranking-date">${formatDate(item.date)}</span>
          </div>
        `)
        .join('');
    }

    function setCategory(category) {
      tabs.forEach((tab) => {
        tab.classList.toggle('active', tab.dataset.rankCat === category);
      });
      render(category);
    }

    function open(initialCategory) {
      setCategory(initialCategory);
      dom.rankingModal.classList.remove('hidden');
    }

    function close() {
      dom.rankingModal.classList.add('hidden');
    }

    function bind() {
      dom.rankingClose.addEventListener('click', close);
      dom.rankingModal.addEventListener('click', (e) => {
        if (e.target === dom.rankingModal) close();
      });
      dom.rankingTabs.addEventListener('click', (e) => {
        if (!e.target.matches('.ranking-tab')) return;
        setCategory(e.target.dataset.rankCat);
      });
    }

    return {
      bind,
      open,
      close,
      setCategory,
    };
  }

  ns.createRankingController = createRankingController;
})();
