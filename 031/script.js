const STATES = {
  IDLE: "idle",
  LISTENING_CASE: "listening_case",
  CASE_READY: "case_ready",
  COURT_IN_SESSION: "court_in_session",
  LISTENING_VERDICT: "listening_verdict",
  VERDICT_READY: "verdict_ready",
  VERDICT_READING: "verdict_reading",
  DONE: "done",
  ERROR: "error",
};

const STORAGE_KEY = "voice-court-031-settings";

const GAUGE = {
  MIN: 0,
  MAX: 100,
  STEP_CLICK: 6,
  STEP_KEYWORD: 5,
  GUILTY_THRESHOLD: 50,
  POSITIVE_KEYWORDS: [
    "이의 있음",
    "찬성",
    "동의",
    "타당",
    "합리",
    "근거 충분",
    "설득",
    "증거",
    "정당",
    "필요",
    "유익",
    "효과",
    "가능",
    "실현",
    "현실적",
    "옳다",
    "맞다",
    "좋다",
    "도입",
    "진행",
    "승인",
    "통과",
    "가결",
    "채택",
    "허용",
    "무죄",
    "문제없",
    "안전",
    "개선",
    "해결",
    "보완 가능",
    "성공",
    "이득",
    "플러스",
    "맞음",
    "맞아",
    "네",
    "그래",
    "yes",
    "ok",
    "go",
  ],
  NEGATIVE_KEYWORDS: [
    "반론",
    "반대",
    "비동의",
    "기각",
    "각하",
    "부결",
    "거부",
    "불가",
    "불가능",
    "무리",
    "위험",
    "리스크",
    "허점",
    "모순",
    "과장",
    "편향",
    "불공정",
    "문제",
    "문제있",
    "실패",
    "손해",
    "부작용",
    "비효율",
    "비현실",
    "시기상조",
    "근거 부족",
    "증거 부족",
    "불신",
    "유죄",
    "중단",
    "철회",
    "취소",
    "마이너스",
    "틀렸",
    "아니",
    "아닌",
    "뭔데",
    "뭐야",
    "바보",
    "no",
    "야냐",
    "stop",
  ],
};
const ROUND = {
  TOTAL_MS: 60 * 1000,
};
const VERDICT_RESPONSE_LIMIT_MS = 10 * 1000;
const DAMAGE = {
  MIN: 1,
  MAX: 10,
  CRITICAL_MIN: 8,
};

const CHARACTER = {
  defense: {
    id: "defense",
    label: "변호",
    cardId: "card-defense",
    cue: "[이의 있음!]",
    rateOffset: 0.06,
    pitchOffset: 0.08,
  },
  prosecutor: {
    id: "prosecutor",
    label: "검사",
    cardId: "card-prosecutor",
    cue: "[반론!]",
    rateOffset: -0.02,
    pitchOffset: -0.05,
  },
  judge: {
    id: "judge",
    label: "판사",
    cardId: "card-judge",
    cue: "[배심원은 정숙하십시오.]",
    rateOffset: -0.06,
    pitchOffset: -0.08,
  },
  system: {
    id: "system",
    label: "시스템",
    cardId: "",
    cue: "",
    rateOffset: 0,
    pitchOffset: 0,
  },
};

const BGM_PROFILES = {
  pre: {
    tempoMs: 210,
    gain: 0.017,
    leadWave: "square",
    bassWave: "triangle",
    melody: [523.25, 659.25, 587.33, 659.25, 698.46, 659.25, 587.33, 523.25],
    bass: [130.81, 130.81, 146.83, 146.83, 130.81, 130.81, 98, 98],
  },
  court: {
    tempoMs: 170,
    gain: 0.02,
    leadWave: "square",
    bassWave: "sawtooth",
    melody: [659.25, 783.99, 880, 783.99, 698.46, 659.25, 783.99, 880],
    bass: [98, 98, 110, 110, 123.47, 123.47, 130.81, 130.81],
  },
  tense: {
    tempoMs: 130,
    gain: 0.024,
    leadWave: "square",
    bassWave: "square",
    melody: [880, 0, 932.33, 0, 987.77, 0, 1046.5, 0],
    bass: [130.81, 130.81, 123.47, 123.47, 116.54, 116.54, 110, 110],
  },
  verdict: {
    tempoMs: 240,
    gain: 0.016,
    leadWave: "triangle",
    bassWave: "triangle",
    melody: [523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 392],
    bass: [98, 0, 98, 0, 110, 0, 98, 0],
  },
  done: {
    tempoMs: 320,
    gain: 0.012,
    leadWave: "triangle",
    bassWave: "triangle",
    melody: [392, 440, 523.25, 659.25, 523.25, 440, 392, 329.63],
    bass: [98, 0, 98, 0, 82.41, 0, 82.41, 0],
  },
  error: {
    tempoMs: 280,
    gain: 0.012,
    leadWave: "sawtooth",
    bassWave: "sawtooth",
    melody: [220, 207.65, 196, 185, 174.61, 164.81, 155.56, 146.83],
    bass: [82.41, 0, 82.41, 0, 77.78, 0, 73.42, 0],
  },
};

const app = {
  state: STATES.IDLE,
  caseTopic: "",
  verdictRaw: "",
  verdictType: "",
  turnQueue: [],
  logs: [],
  historyTurns: [],
  isSpeaking: false,
  skipRequested: false,
  currentUtterance: null,
  recognitionBusy: false,
  keywordMonitorActive: false,
  keywordRecognition: null,
  keywordAutoRestart: false,
  activeSpeaker: "",
  gauge: 50,
  gaugeFxTimer: null,
  bubbleLocks: {
    defense: 0,
    prosecutor: 0,
    judge: 0,
  },
  audioUnlocked: false,
  round: {
    deadlineAt: 0,
    timerId: null,
  },
  bgm: {
    ctx: null,
    gain: null,
    timer: null,
    step: 0,
    isRunning: false,
    isLoading: false,
    mode: "pre",
    profile: BGM_PROFILES.pre,
  },
  settings: {
    sfxOn: true,
    recentCase: "",
  },
  subtitleHideTimer: null,
  subtitleIntroTimer: null,
  keywordStats: {
    positive: 0,
    negative: 0,
  },
};

const els = {
  caseTitle: document.getElementById("caseTitle"),
  statusBadge: document.getElementById("statusBadge"),
  sfxToggleBtn: document.getElementById("sfxToggleBtn"),
  readyBtn: document.getElementById("readyBtn"),
  listenCaseBtn: document.getElementById("listenCaseBtn"),
  startCourtBtn: document.getElementById("startCourtBtn"),
  listenVerdictBtn: document.getElementById("listenVerdictBtn"),
  stopBtn: document.getElementById("stopBtn"),
  skipBtn: document.getElementById("skipBtn"),
  replayLastBtn: document.getElementById("replayLastBtn"),
  replayAllBtn: document.getElementById("replayAllBtn"),
  arcadeClickers: document.getElementById("arcadeClickers"),
  clickerUpBtn: document.getElementById("clickerUpBtn"),
  clickerDownBtn: document.getElementById("clickerDownBtn"),
  gaugeFill: document.getElementById("gaugeFill"),
  gaugeValue: document.getElementById("gaugeValue"),
  gaugeTier: document.getElementById("gaugeTier"),
  hpDefense: document.getElementById("hpDefense"),
  hpProsecutor: document.getElementById("hpProsecutor"),
  duelGaugeTrack: document.getElementById("duelGaugeTrack"),
  arcadeState: document.getElementById("arcadeState"),
  roundTimer: document.getElementById("roundTimer"),
  arcadeCallout: document.getElementById("arcadeCallout"),
  arcadeArena: document.getElementById("arcadeArena"),
  keywordBoostFx: document.getElementById("keywordBoostFx"),
  bubbleDefense: document.getElementById("bubbleDefense"),
  bubbleProsecutor: document.getElementById("bubbleProsecutor"),
  bubbleJudge: document.getElementById("bubbleJudge"),
  damageDefense: document.getElementById("damageDefense"),
  damageProsecutor: document.getElementById("damageProsecutor"),
  spriteDefense: document.querySelector("#charDefense .sprite"),
  spriteProsecutor: document.querySelector("#charProsecutor .sprite"),
  spriteJudge: document.querySelector("#charJudge .sprite"),
  keywordCheck: document.getElementById("keywordCheck"),
  logList: document.getElementById("logList"),
  judgmentText: document.getElementById("judgmentText"),
  startPromptPanel: document.getElementById("startPromptPanel"),
  startPromptText: document.getElementById("startPromptText"),
  startPromptYesBtn: document.getElementById("startPromptYesBtn"),
  startPromptNoBtn: document.getElementById("startPromptNoBtn"),
  resultPopup: document.getElementById("resultPopup"),
  resultPopupVerdict: document.getElementById("resultPopupVerdict"),
  resultPopupScore: document.getElementById("resultPopupScore"),
  resultPopupText: document.getElementById("resultPopupText"),
  juryPositiveCount: document.getElementById("juryPositiveCount"),
  juryNegativeCount: document.getElementById("juryNegativeCount"),
  resultPositiveCount: document.getElementById("resultPositiveCount"),
  resultNegativeCount: document.getElementById("resultNegativeCount"),
  retryResultPopupBtn: document.getElementById("retryResultPopupBtn"),
  closeResultPopupBtn: document.getElementById("closeResultPopupBtn"),
  userSubtitleBar: document.getElementById("userSubtitleBar"),
  userSubtitleText: document.getElementById("userSubtitleText"),
  verdictBurst: document.getElementById("verdictBurst"),
  verdictBurstText: document.getElementById("verdictBurstText"),
  juryDeadlineHint: document.getElementById("juryDeadlineHint"),
};

function safeText(text) {
  return String(text || "").replace(/[<>]/g, "").trim();
}

function nowTime() {
  return new Date().toLocaleTimeString();
}

function showUserSubtitle(text) {
  const t = safeText(text);
  if (!els.userSubtitleBar || !els.userSubtitleText || !t) return;
  if (app.subtitleHideTimer) {
    clearTimeout(app.subtitleHideTimer);
    app.subtitleHideTimer = null;
  }
  els.userSubtitleText.textContent = t;
  els.userSubtitleBar.hidden = false;
}

function clearSubtitleIntroTimer() {
  if (app.subtitleIntroTimer) {
    clearTimeout(app.subtitleIntroTimer);
    app.subtitleIntroTimer = null;
  }
}

function hideUserSubtitle(delayMs = 1200) {
  if (!els.userSubtitleBar) return;
  clearSubtitleIntroTimer();
  if (app.subtitleHideTimer) {
    clearTimeout(app.subtitleHideTimer);
    app.subtitleHideTimer = null;
  }
  if (delayMs <= 0) {
    els.userSubtitleBar.hidden = true;
    if (els.userSubtitleText) els.userSubtitleText.textContent = "";
    return;
  }
  app.subtitleHideTimer = setTimeout(() => {
    els.userSubtitleBar.hidden = true;
    if (els.userSubtitleText) els.userSubtitleText.textContent = "";
    app.subtitleHideTimer = null;
  }, delayMs);
}

function clampGauge(value) {
  return Math.max(GAUGE.MIN, Math.min(GAUGE.MAX, value));
}

function renderKeywordStats() {
  const pos = app.keywordStats.positive;
  const neg = app.keywordStats.negative;
  if (els.juryPositiveCount) els.juryPositiveCount.textContent = String(pos);
  if (els.juryNegativeCount) els.juryNegativeCount.textContent = String(neg);
  if (els.resultPositiveCount) els.resultPositiveCount.textContent = String(pos);
  if (els.resultNegativeCount) els.resultNegativeCount.textContent = String(neg);
}

function resetKeywordStats() {
  app.keywordStats.positive = 0;
  app.keywordStats.negative = 0;
  renderKeywordStats();
}

function getGaugeBasedVerdict() {
  return app.gauge > GAUGE.GUILTY_THRESHOLD ? "무죄" : "유죄";
}

function getFinalVerdict() {
  if (app.verdictType === "유죄" || app.verdictType === "무죄") {
    return app.verdictType;
  }
  return getGaugeBasedVerdict();
}

function randomDamage() {
  return Math.floor(Math.random() * (DAMAGE.MAX - DAMAGE.MIN + 1)) + DAMAGE.MIN;
}

function showDamageEffect(target, damage, critical = false) {
  const pop = target === "defense" ? els.damageDefense : els.damageProsecutor;
  const card = target === "defense" ? document.getElementById("charDefense") : document.getElementById("charProsecutor");
  if (!pop || !card) return;
  pop.textContent = critical ? `CRITICAL -${damage}` : `-${damage}`;
  pop.classList.remove("show", "critical");
  void pop.offsetWidth;
  pop.classList.add("show");
  if (critical) {
    pop.classList.add("critical");
    card.classList.add("hit-critical");
    setTimeout(() => card.classList.remove("hit-critical"), 360);
  }
}

function applyTurnDamage(attacker) {
  if (attacker !== "defense" && attacker !== "prosecutor") return;
  const damage = randomDamage();
  const critical = damage >= DAMAGE.CRITICAL_MIN;
  const target = attacker === "defense" ? "prosecutor" : "defense";
  const delta = attacker === "defense" ? damage : -damage;
  const attackerLabel = attacker === "defense" ? "변호" : "검사";
  const targetLabel = target === "defense" ? "변호" : "검사";

  adjustGauge(delta, `${attackerLabel} 공격 데미지 ${damage}`);
  showDamageEffect(target, damage, critical);
  addLog("system", `${attackerLabel} 공격! ${targetLabel}에게 ${damage} 데미지${critical ? " (CRITICAL!)" : ""}`);
}

function gaugeTier(value) {
  if (value >= 70) return { label: "과열", className: "hot" };
  if (value <= 30) return { label: "냉각", className: "cool" };
  return { label: "중립", className: "neutral" };
}

function formatMsAsClock(ms) {
  const safe = Math.max(0, ms);
  const totalSec = Math.ceil(safe / 1000);
  const min = Math.floor(totalSec / 60)
    .toString()
    .padStart(2, "0");
  const sec = (totalSec % 60).toString().padStart(2, "0");
  return `${min}:${sec}`;
}

function renderRoundTimer() {
  if (!els.roundTimer) return;
  if (app.state !== STATES.COURT_IN_SESSION || !app.round.deadlineAt) {
    els.roundTimer.textContent = "01:00";
    els.roundTimer.classList.remove("danger");
    return;
  }
  const remain = app.round.deadlineAt - Date.now();
  const elapsed = ROUND.TOTAL_MS - Math.max(0, remain);
  els.roundTimer.textContent = formatMsAsClock(remain);
  els.roundTimer.classList.toggle("danger", elapsed >= 50 * 1000);
}

function stopRoundTimer() {
  if (app.round.timerId) {
    clearInterval(app.round.timerId);
    app.round.timerId = null;
  }
  app.round.deadlineAt = 0;
  renderRoundTimer();
}

function handleRoundTimeout() {
  if (app.state !== STATES.COURT_IN_SESSION) return;
  stopRoundTimer();
  app.turnQueue = [];
  app.skipRequested = true;
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  addLog("system", "라운드 제한 시간 60초가 종료되었습니다. 평결 단계로 이동합니다.");
}

function startRoundTimer() {
  stopRoundTimer();
  app.round.deadlineAt = Date.now() + ROUND.TOTAL_MS;
  renderRoundTimer();
  app.round.timerId = setInterval(() => {
    if (app.state !== STATES.COURT_IN_SESSION) {
      stopRoundTimer();
      return;
    }
    const remain = app.round.deadlineAt - Date.now();
    renderRoundTimer();
    updateCharacterSpriteStates();
    if (remain <= 0) {
      handleRoundTimeout();
    }
  }, 250);
}

function renderArcadeHud() {
  const defenseHp = clampGauge(app.gauge);
  const prosecutorHp = clampGauge(100 - app.gauge);
  if (els.hpDefense) els.hpDefense.style.width = `${defenseHp}%`;
  if (els.hpProsecutor) els.hpProsecutor.style.width = `${prosecutorHp}%`;
  if (els.arcadeState) els.arcadeState.textContent = app.state.toUpperCase();

  let callout = "READY?";
  if (app.activeSpeaker === "defense") callout = "OBJECTION COMBO!";
  else if (app.activeSpeaker === "prosecutor") callout = "COUNTER RUSH!";
  else if (app.activeSpeaker === "judge") callout = "FINAL JUDGMENT!";
  else if (app.state === STATES.COURT_IN_SESSION) callout = "FIGHT!";
  else if (app.state === STATES.DONE) callout = `${getFinalVerdict()}!`;

  if (els.arcadeCallout && app.state !== STATES.LISTENING_CASE) {
    els.arcadeCallout.textContent = callout;
  }
  if (els.arcadeArena) {
    els.arcadeArena.classList.remove("turn-defense", "turn-prosecutor", "turn-judge");
    if (app.activeSpeaker === "defense") els.arcadeArena.classList.add("turn-defense");
    if (app.activeSpeaker === "prosecutor") els.arcadeArena.classList.add("turn-prosecutor");
    if (app.activeSpeaker === "judge") els.arcadeArena.classList.add("turn-judge");
  }
}

function setSpriteState(spriteEl, state) {
  if (!spriteEl) return;
  spriteEl.classList.remove(
    "state-basic",
    "state-crisis",
    "state-defeat",
    "state-success",
    "state-sleep",
    "state-alert"
  );
  spriteEl.classList.add(`state-${state}`);
}

function updateCharacterSpriteStates() {
  let defenseState = "basic";
  let prosecutorState = "basic";
  let judgeState = "basic";
  const defenseHp = clampGauge(app.gauge);
  const prosecutorHp = clampGauge(100 - app.gauge);

  if (defenseHp <= 30) defenseState = "crisis";
  if (prosecutorHp <= 30) prosecutorState = "crisis";

  if (defenseHp >= 90) {
    defenseState = "success";
    prosecutorState = "defeat";
  }
  if (prosecutorHp >= 90) {
    prosecutorState = "success";
    defenseState = "defeat";
  }

  if (defenseHp >= 90 || prosecutorHp >= 90) {
    judgeState = "alert";
  } else if (app.state === STATES.COURT_IN_SESSION && app.round.deadlineAt) {
    const elapsedMs = ROUND.TOTAL_MS - Math.max(0, app.round.deadlineAt - Date.now());
    if (elapsedMs >= 30 * 1000) {
      judgeState = "alert";
    } else if (elapsedMs >= 15 * 1000) {
      judgeState = "sleep";
    }
  }

  if (app.state === STATES.DONE || app.state === STATES.VERDICT_READING) {
    const finalVerdict = getFinalVerdict();
    if (finalVerdict === "유죄") {
      prosecutorState = "success";
      defenseState = "defeat";
    } else {
      defenseState = "success";
      prosecutorState = "defeat";
    }
    judgeState = "alert";
  }

  setSpriteState(els.spriteDefense, defenseState);
  setSpriteState(els.spriteProsecutor, prosecutorState);
  setSpriteState(els.spriteJudge, judgeState);
}

function bubbleText(text, fallback) {
  const oneLine = safeText(text).split("\n")[0];
  if (!oneLine) return fallback;
  return oneLine.length > 42 ? `${oneLine.slice(0, 42)}...` : oneLine;
}

function setCharacterBubble(speaker, text, options = {}) {
  const { force = false, holdMs = 0 } = options;
  const now = Date.now();
  if (!force && app.bubbleLocks[speaker] && app.bubbleLocks[speaker] > now) {
    return;
  }

  const content = bubbleText(text, "...");
  if (speaker === "defense") els.bubbleDefense.textContent = content;
  if (speaker === "prosecutor") els.bubbleProsecutor.textContent = content;
  if (speaker === "judge") els.bubbleJudge.textContent = content;

  if (holdMs > 0 && app.bubbleLocks[speaker] !== undefined) {
    app.bubbleLocks[speaker] = now + holdMs;
  }
}

function triggerKeywordBooster(text, kind) {
  const el = els.keywordBoostFx;
  if (!el) return;
  el.textContent = text;
  el.classList.remove("show", "up", "down", "neutral");
  void el.offsetWidth;
  el.classList.add("show", kind);
  setTimeout(() => {
    el.classList.remove("show", kind);
  }, 1650);
}

function triggerKeywordBubbleEffect(speaker, fxClass) {
  const bubble =
    speaker === "defense"
      ? els.bubbleDefense
      : speaker === "prosecutor"
        ? els.bubbleProsecutor
        : els.bubbleJudge;
  if (!bubble) return;
  bubble.classList.remove("fx-up", "fx-down", "fx-neutral");
  void bubble.offsetWidth;
  bubble.classList.add(fxClass);
  setTimeout(() => {
    bubble.classList.remove(fxClass);
  }, 360);
}

function resetCharacterBubbles() {
  els.bubbleDefense.textContent = "이의 있음!";
  els.bubbleProsecutor.textContent = "반론!";
  els.bubbleJudge.textContent = "배심원은 정숙하십시오.";
  app.bubbleLocks.defense = 0;
  app.bubbleLocks.prosecutor = 0;
  app.bubbleLocks.judge = 0;
  els.bubbleDefense.classList.remove("fx-up", "fx-down", "fx-neutral");
  els.bubbleProsecutor.classList.remove("fx-up", "fx-down", "fx-neutral");
  els.bubbleJudge.classList.remove("fx-up", "fx-down", "fx-neutral");
}

function determineBgmMode() {
  if (app.state === STATES.ERROR) return "error";
  if (app.state === STATES.VERDICT_READING) return "verdict";
  if (app.state === STATES.DONE) return "done";
  if (app.state === STATES.COURT_IN_SESSION || app.state === STATES.LISTENING_VERDICT) {
    if (app.gauge >= 75 || app.gauge <= 25) return "tense";
    return "court";
  }
  return "pre";
}

function stopBgmTimer() {
  if (app.bgm.timer) {
    clearInterval(app.bgm.timer);
    app.bgm.timer = null;
  }
}

function setSfxLoading(loading) {
  app.bgm.isLoading = Boolean(loading);
  if (!els.sfxToggleBtn) return;
  els.sfxToggleBtn.classList.toggle("is-loading", app.bgm.isLoading);
  if (app.bgm.isLoading) {
    els.sfxToggleBtn.setAttribute("aria-busy", "true");
  } else {
    els.sfxToggleBtn.removeAttribute("aria-busy");
  }
}

function playBgmStep() {
  if (!app.bgm.ctx || !app.bgm.gain || !app.bgm.profile) return;
  const profile = app.bgm.profile;
  const i = app.bgm.step % profile.melody.length;
  const now = app.bgm.ctx.currentTime;
  const stepSec = profile.tempoMs / 1000;

  const leadFreq = profile.melody[i];
  if (leadFreq > 0) {
    const lead = app.bgm.ctx.createOscillator();
    const leadGain = app.bgm.ctx.createGain();
    lead.type = profile.leadWave;
    lead.frequency.value = leadFreq;
    leadGain.gain.setValueAtTime(0.0001, now);
    leadGain.gain.exponentialRampToValueAtTime(0.5, now + Math.min(0.025, stepSec * 0.18));
    leadGain.gain.exponentialRampToValueAtTime(0.0001, now + stepSec * 0.72);
    lead.connect(leadGain);
    leadGain.connect(app.bgm.gain);
    lead.start(now);
    lead.stop(now + stepSec * 0.74);
  }

  const bassFreq = profile.bass[i % profile.bass.length];
  if (bassFreq > 0) {
    const bass = app.bgm.ctx.createOscillator();
    const bassGain = app.bgm.ctx.createGain();
    bass.type = profile.bassWave;
    bass.frequency.value = bassFreq;
    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.exponentialRampToValueAtTime(0.34, now + Math.min(0.03, stepSec * 0.22));
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + stepSec * 0.62);
    bass.connect(bassGain);
    bassGain.connect(app.bgm.gain);
    bass.start(now);
    bass.stop(now + stepSec * 0.64);
  }

  app.bgm.step += 1;
}

function startBgmTimer() {
  stopBgmTimer();
  app.bgm.timer = setInterval(playBgmStep, app.bgm.profile.tempoMs);
}

function ensureBgmPlayback() {
  if (!app.bgm.ctx || !app.bgm.gain) {
    setSfxLoading(false);
    return;
  }
  const startLoop = () => {
    if (!app.bgm.timer) {
      playBgmStep();
      startBgmTimer();
    }
    app.bgm.isRunning = true;
    setSfxLoading(false);
  };

  if (app.bgm.ctx.state === "suspended") {
    setSfxLoading(true);
    app.bgm.ctx
      .resume()
      .then(startLoop)
      .catch(() => {
        app.bgm.isRunning = false;
        setSfxLoading(false);
      });
    return;
  }

  startLoop();
}

function resumeBgmContext() {
  if (!app.bgm.ctx) return;
  ensureBgmPlayback();
}

function stop8BitBgm() {
  stopBgmTimer();
  if (app.bgm.ctx) {
    try {
      app.bgm.ctx.close();
    } catch (_) {
      // ignore
    }
  }
  app.bgm.ctx = null;
  app.bgm.gain = null;
  app.bgm.step = 0;
  app.bgm.isRunning = false;
  setSfxLoading(false);
}

function setBgmMode(mode) {
  const profile = BGM_PROFILES[mode] || BGM_PROFILES.pre;
  app.bgm.mode = mode;
  app.bgm.profile = profile;
  if (app.bgm.gain) {
    app.bgm.gain.gain.setTargetAtTime(profile.gain, app.bgm.ctx.currentTime, 0.06);
  }
  if (app.bgm.isRunning) {
    startBgmTimer();
  }
}

function start8BitBgm() {
  if (!app.settings.sfxOn || app.bgm.isRunning || !app.audioUnlocked) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const gain = ctx.createGain();
  const mode = determineBgmMode();
  const profile = BGM_PROFILES[mode] || BGM_PROFILES.pre;

  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(profile.gain, ctx.currentTime + 0.45);
  gain.connect(ctx.destination);

  app.bgm.ctx = ctx;
  app.bgm.gain = gain;
  app.bgm.step = 0;
  app.bgm.isRunning = false;
  app.bgm.mode = mode;
  app.bgm.profile = profile;
  setSfxLoading(true);
  ensureBgmPlayback();
}

function updateBgmByContext() {
  if (!app.settings.sfxOn) {
    stop8BitBgm();
    return;
  }
  if (!app.audioUnlocked) return;

  if (!app.bgm.isRunning) {
    start8BitBgm();
    return;
  }

  resumeBgmContext();
  setBgmMode(determineBgmMode());
  ensureBgmPlayback();
}

function triggerBgmEffect(kind = "objection") {
  if (!app.settings.sfxOn || !app.bgm.ctx || !app.bgm.gain) return;
  const now = app.bgm.ctx.currentTime;

  if (kind === "objection") {
    const osc = app.bgm.ctx.createOscillator();
    const gain = app.bgm.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(980, now + 0.12);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(app.bgm.gain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  if (kind === "error") {
    const osc = app.bgm.ctx.createOscillator();
    const gain = app.bgm.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(app.bgm.gain);
    osc.start(now);
    osc.stop(now + 0.25);
  }
}

function setKeywordCheck(text, type = "neutral") {
  if (!els.keywordCheck) return;
  els.keywordCheck.textContent = `키워드 감시: ${text}`;
  els.keywordCheck.className = `keyword-check ${type}`;
}

function addLog(speaker, text) {
  const entry = { speaker, text: safeText(text), at: nowTime() };
  app.logs.push(entry);

  const item = document.createElement("li");
  item.className = `log-item ${speaker}`;
  if (entry.text.includes("STT")) {
    item.classList.add("stt-log");
  }
  if (entry.text.includes("평결 음성 STT:")) {
    item.classList.add("verdict-stt");
  }

  const head = document.createElement("div");
  head.className = "log-head";
  head.innerHTML = `<strong>${CHARACTER[speaker]?.label || "시스템"}</strong><span>${entry.at}</span>`;

  const body = document.createElement("div");
  body.className = "log-body";
  body.textContent = entry.text;

  item.appendChild(head);
  item.appendChild(body);
  els.logList.prepend(item);
  els.logList.scrollTop = 0;
}

function renderGauge() {
  const value = clampGauge(app.gauge);
  const tier = gaugeTier(value);
  if (els.gaugeFill) els.gaugeFill.style.width = `${value}%`;
  if (els.gaugeValue) els.gaugeValue.textContent = String(value);
  if (els.gaugeTier) {
    els.gaugeTier.textContent = tier.label;
    els.gaugeTier.className = `gauge-tier ${tier.className}`;
  }
  renderArcadeHud();
  updateCharacterSpriteStates();
  updateBgmByContext();
}

function triggerGaugeEffect(amount) {
  if (!els.duelGaugeTrack || amount === 0) return;

  const up = amount > 0;
  const grow = up ? els.hpDefense : els.hpProsecutor;
  const shrink = up ? els.hpProsecutor : els.hpDefense;

  els.duelGaugeTrack.classList.remove("fx-up", "fx-down");
  grow.classList.remove("surge");
  shrink.classList.remove("drain");
  void els.duelGaugeTrack.offsetWidth;

  els.duelGaugeTrack.classList.add(up ? "fx-up" : "fx-down");
  grow.classList.add("surge");
  shrink.classList.add("drain");

  if (app.gaugeFxTimer) clearTimeout(app.gaugeFxTimer);
  app.gaugeFxTimer = setTimeout(() => {
    els.duelGaugeTrack.classList.remove("fx-up", "fx-down");
    grow.classList.remove("surge");
    shrink.classList.remove("drain");
  }, 320);
}

function adjustGauge(amount, reason) {
  const prev = app.gauge;
  app.gauge = clampGauge(app.gauge + amount);
  renderGauge();
  triggerGaugeEffect(amount);
  const sign = amount > 0 ? "+" : "";
  addLog("system", `게이지 ${sign}${amount} (${prev} → ${app.gauge}) · ${reason}`);
}

function analyzeKeywords(transcript) {
  const text = safeText(transcript);
  const positiveMatches = GAUGE.POSITIVE_KEYWORDS.filter((word) => text.includes(word));
  const negativeMatches = GAUGE.NEGATIVE_KEYWORDS.filter((word) => text.includes(word));
  const delta = (positiveMatches.length - negativeMatches.length) * GAUGE.STEP_KEYWORD;
  return { positiveMatches, negativeMatches, delta };
}

function applyKeywordGauge(transcript, source = "사용자 STT") {
  const text = safeText(transcript);
  if (!text) return { positiveMatches: [], negativeMatches: [], delta: 0 };

  const { positiveMatches, negativeMatches, delta } = analyzeKeywords(text);
  app.keywordStats.positive += positiveMatches.length;
  app.keywordStats.negative += negativeMatches.length;
  renderKeywordStats();
  if (delta !== 0) {
    adjustGauge(delta, `${source} 키워드 반영`);
  }
  return { positiveMatches, negativeMatches, delta };
}

function applyKeywordResultLog(transcript, sourceLabel) {
  const keywordResult = applyKeywordGauge(transcript, sourceLabel);
  const matched = [
    ...keywordResult.positiveMatches.map((word) => `+${word}`),
    ...keywordResult.negativeMatches.map((word) => `-${word}`),
  ];

  if (matched.length > 0) {
    setKeywordCheck(`사용자 키워드 감지됨 (${matched.join(", ")})`, "hit");
    addLog("system", `${sourceLabel}: ${transcript} → ${matched.join(", ")}`);
  } else {
    setKeywordCheck("사용자 키워드 미감지", "miss");
    addLog("system", `${sourceLabel}: ${transcript} → 감지된 키워드 없음`);
  }

  if (keywordResult.delta > 0) {
    triggerKeywordBubbleEffect("defense", "fx-up");
    triggerKeywordBooster(`BOOST ${matched.join(" ")}`, "up");
  } else if (keywordResult.delta < 0) {
    triggerKeywordBubbleEffect("prosecutor", "fx-down");
    triggerKeywordBooster(`BREAK ${matched.join(" ")}`, "down");
  } else {
    triggerKeywordBubbleEffect("judge", "fx-neutral");
    triggerKeywordBooster("NO KEYWORD", "neutral");
  }
}

function setState(next) {
  const prev = app.state;
  app.state = next;
  if (els.statusBadge) {
    els.statusBadge.textContent = next;
    els.statusBadge.className = `status ${next}`;
  }
  if (prev === STATES.COURT_IN_SESSION && next !== STATES.COURT_IN_SESSION) {
    stopRoundTimer();
  }
  renderRoundTimer();
  renderArcadeHud();
  updateCharacterSpriteStates();
  updateBgmByContext();
  syncControls();
}

function openStartPrompt(topic) {
  if (!els.startPromptPanel) return;
  if (els.startPromptText) {
    els.startPromptText.textContent = `사건 '${topic || app.caseTopic}' 접수 완료. Y/N으로 개정 시작을 선택하세요.`;
  }
  els.startPromptPanel.hidden = false;
}

function closeStartPrompt() {
  if (!els.startPromptPanel) return;
  els.startPromptPanel.hidden = true;
}

function computeFinalScore(finalVerdict) {
  const defenseGauge = clampGauge(app.gauge);
  const prosecutorGauge = clampGauge(100 - app.gauge);
  const score = finalVerdict === "유죄" ? prosecutorGauge * 100 : defenseGauge * 100;
  return { defenseGauge, prosecutorGauge, score };
}

function showResultPopup(judgmentText) {
  if (!els.resultPopup || !els.resultPopupVerdict || !els.resultPopupScore || !els.resultPopupText) {
    return;
  }
  const finalVerdict = getFinalVerdict();
  const { defenseGauge, prosecutorGauge, score } = computeFinalScore(finalVerdict);
  els.resultPopupVerdict.textContent = finalVerdict;
  els.resultPopupVerdict.className = `result-popup-verdict ${finalVerdict === "유죄" ? "guilty" : "not-guilty"}`;
  els.resultPopupScore.textContent = `SCORE ${score.toLocaleString()}`;
  els.resultPopupText.textContent = [
    `[최종 판결] ${finalVerdict}`,
    `- 변호 게이지: ${defenseGauge}`,
    `- 검사 게이지: ${prosecutorGauge}`,
    "",
    judgmentText,
  ].join("\n");
  els.resultPopup.hidden = false;
}

function resolveBurstVerdictLabel() {
  return getFinalVerdict();
}

function playVerdictMusic(verdictLabel) {
  if (!app.settings.sfxOn || !app.audioUnlocked) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = app.bgm.ctx || new AudioContextClass();
  if (ctx.state === "suspended") {
    ctx.resume().catch(() => {});
  }
  const gain = ctx.createGain();
  gain.connect(ctx.destination);
  const startAt = ctx.currentTime + 0.02;
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.09);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 4.9);

  const isGuilty = verdictLabel === "유죄";
  const notes = isGuilty
    ? [330, 370, 311, 349, 294, 330, 277, 311, 247, 277, 220, 247, 196]
    : [262, 294, 330, 392, 440, 392, 523, 587, 659, 587, 523, 659, 784];
  const step = 0.34;

  notes.forEach((freq, i) => {
    const now = startAt + i * step;
    const osc = ctx.createOscillator();
    const og = ctx.createGain();
    osc.type = isGuilty ? "sawtooth" : "square";
    osc.frequency.setValueAtTime(freq, now);
    og.gain.setValueAtTime(0.0001, now);
    og.gain.exponentialRampToValueAtTime(0.24, now + 0.03);
    og.gain.exponentialRampToValueAtTime(0.0001, now + step * 0.9);
    osc.connect(og);
    og.connect(gain);
    osc.start(now);
    osc.stop(now + step * 0.92);
  });

  const wow = ctx.createOscillator();
  const wowGain = ctx.createGain();
  wow.type = "square";
  wow.frequency.setValueAtTime(isGuilty ? 210 : 440, startAt + 0.6);
  wow.frequency.exponentialRampToValueAtTime(isGuilty ? 520 : 220, startAt + 1.5);
  wow.frequency.exponentialRampToValueAtTime(isGuilty ? 230 : 520, startAt + 2.4);
  wow.frequency.exponentialRampToValueAtTime(isGuilty ? 560 : 260, startAt + 3.3);
  wowGain.gain.setValueAtTime(0.0001, startAt + 0.6);
  wowGain.gain.exponentialRampToValueAtTime(0.08, startAt + 0.72);
  wowGain.gain.exponentialRampToValueAtTime(0.0001, startAt + 4.7);
  wow.connect(wowGain);
  wowGain.connect(gain);
  wow.start(startAt + 0.6);
  wow.stop(startAt + 4.72);

  const crash = ctx.createOscillator();
  const crashGain = ctx.createGain();
  const crashAt = startAt + 4.1;
  crash.type = "triangle";
  crash.frequency.setValueAtTime(isGuilty ? 140 : 520, crashAt);
  crash.frequency.exponentialRampToValueAtTime(isGuilty ? 60 : 920, crashAt + 0.75);
  crashGain.gain.setValueAtTime(0.0001, crashAt);
  crashGain.gain.exponentialRampToValueAtTime(0.18, crashAt + 0.05);
  crashGain.gain.exponentialRampToValueAtTime(0.0001, crashAt + 0.92);
  crash.connect(crashGain);
  crashGain.connect(gain);
  crash.start(crashAt);
  crash.stop(crashAt + 0.95);
}

function playVerdictBurst() {
  if (!els.verdictBurst || !els.verdictBurstText) return Promise.resolve();
  const verdictLabel = resolveBurstVerdictLabel();
  const mode = verdictLabel === "유죄" ? "guilty" : "not-guilty";

  setBgmMode("verdict");
  ensureBgmPlayback();
  playVerdictMusic(verdictLabel);
  els.verdictBurstText.textContent = verdictLabel;
  els.verdictBurst.hidden = false;
  els.verdictBurst.classList.remove("show", "guilty", "not-guilty");
  void els.verdictBurst.offsetWidth;
  els.verdictBurst.classList.add("show", mode);

  return new Promise((resolve) => {
    setTimeout(() => {
      els.verdictBurst.classList.remove("show", "guilty", "not-guilty");
      els.verdictBurst.hidden = true;
      resolve();
    }, 5000);
  });
}

function updateReadyListeningUi() {
  const listeningCase = app.state === STATES.LISTENING_CASE;
  const listeningVerdict = app.state === STATES.LISTENING_VERDICT;
  const heroMode =
    app.state === STATES.IDLE || listeningCase || listeningVerdict;
  const speakerLabelMap = {
    defense: "DEFENSE",
    prosecutor: "PROSECUTOR",
    judge: "JUDGE",
  };
  if (!els.readyBtn) return;
  els.readyBtn.classList.toggle("is-hero", heroMode);
  els.readyBtn.classList.toggle("is-listening", listeningCase || listeningVerdict);
  if (listeningCase || listeningVerdict) {
    els.readyBtn.textContent = "LISTENING...";
    els.readyBtn.setAttribute("aria-busy", "true");
  } else {
    els.readyBtn.removeAttribute("aria-busy");
    const speakerLabel = speakerLabelMap[app.activeSpeaker] || "";
    els.readyBtn.textContent = speakerLabel ? `CASE FILE: ${speakerLabel}` : "CASE FILE";
  }
}

function syncControls() {
  const hasCase = Boolean(app.caseTopic);
  const inSession = app.state === STATES.COURT_IN_SESSION;
  const listening =
    app.state === STATES.LISTENING_CASE ||
    app.state === STATES.LISTENING_VERDICT ||
    app.recognitionBusy;
  const jurySpeaking =
    app.state === STATES.LISTENING_CASE ||
    app.state === STATES.LISTENING_VERDICT ||
    app.keywordMonitorActive;
  const clickerActive = jurySpeaking && app.activeSpeaker !== "judge";

  if (els.startCourtBtn) els.startCourtBtn.disabled = !hasCase || inSession || listening;
  if (els.listenCaseBtn) els.listenCaseBtn.disabled = inSession || listening;
  if (els.readyBtn) els.readyBtn.disabled = inSession || listening;
  if (els.startPromptYesBtn) els.startPromptYesBtn.disabled = !hasCase || inSession || listening;
  if (els.startPromptNoBtn) els.startPromptNoBtn.disabled = inSession || listening;
  if (els.listenVerdictBtn) {
    els.listenVerdictBtn.disabled = inSession || listening || app.historyTurns.length === 0;
  }
  if (els.stopBtn) els.stopBtn.disabled = !inSession && !app.isSpeaking;
  if (els.skipBtn) els.skipBtn.disabled = !inSession && !app.isSpeaking;
  if (els.replayLastBtn) els.replayLastBtn.disabled = app.historyTurns.length === 0;
  if (els.replayAllBtn) els.replayAllBtn.disabled = app.historyTurns.length === 0;
  if (els.arcadeClickers) {
    els.arcadeClickers.classList.toggle("is-hidden", !clickerActive);
  }
  els.clickerUpBtn.disabled = !clickerActive;
  els.clickerDownBtn.disabled = !clickerActive;
  updateReadyListeningUi();
}

function activateCharacter(characterId, message) {
  app.activeSpeaker = characterId || "";
  [CHARACTER.defense, CHARACTER.prosecutor, CHARACTER.judge].forEach((char) => {
    const card = document.getElementById(char.cardId);
    if (!card) return;
    const stateEl = card.querySelector(".char-state");
    const defaultText = stateEl?.dataset.default || "대기 중";
    if (char.id === characterId) {
      card.classList.add("active");
      if (stateEl) stateEl.textContent = message || "말하는 중";
    } else {
      card.classList.remove("active");
      if (stateEl) stateEl.textContent = defaultText;
    }
  });
  renderArcadeHud();
}

function resetCharacterState() {
  activateCharacter("", "");
  resetCharacterBubbles();
}

function beep(kind = "normal") {
  if (!app.settings.sfxOn || !app.audioUnlocked) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const f = kind === "objection" ? 860 : kind === "error" ? 180 : 420;
  osc.frequency.value = f;
  osc.type = kind === "error" ? "sawtooth" : "square";
  gain.gain.value = 0.03;

  osc.start();
  osc.stop(ctx.currentTime + 0.09);

  triggerBgmEffect(kind);
}

function playClickHitSound(side = "defense") {
  if (!app.settings.sfxOn || !app.audioUnlocked) return;
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const ctx = new AudioContextClass();
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const click = ctx.createOscillator();
  const clickGain = ctx.createGain();

  const isDefense = side === "defense";
  osc.type = "square";
  osc.frequency.setValueAtTime(isDefense ? 220 : 170, now);
  osc.frequency.exponentialRampToValueAtTime(isDefense ? 460 : 320, now + 0.055);

  click.type = "triangle";
  click.frequency.setValueAtTime(isDefense ? 860 : 720, now);
  click.frequency.exponentialRampToValueAtTime(90, now + 0.07);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);

  clickGain.gain.setValueAtTime(0.001, now);
  clickGain.gain.exponentialRampToValueAtTime(0.038, now + 0.01);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);
  click.connect(clickGain);
  clickGain.connect(ctx.destination);

  osc.start(now);
  click.start(now);
  osc.stop(now + 0.09);
  click.stop(now + 0.07);
}

function loadSettings() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    app.settings = { ...app.settings, ...parsed };
  } catch (_) {
    // ignore broken localStorage
  }
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(app.settings));
}

function refreshSettingUi() {
  const on = Boolean(app.settings.sfxOn);
  els.sfxToggleBtn.setAttribute("aria-pressed", on ? "true" : "false");
  els.sfxToggleBtn.setAttribute("aria-label", on ? "효과음 끄기" : "효과음 켜기");
  els.sfxToggleBtn.classList.toggle("off", !on);
  els.sfxToggleBtn.title = on ? "효과음 ON" : "효과음 OFF";

  if (on) {
    updateBgmByContext();
  } else {
    stop8BitBgm();
  }
  if (!on) setSfxLoading(false);
}

function normalizeCaseTopic(input) {
  const raw = safeText(input)
    .replace(/(저는|음|어|그|이제|사건은|주제는)/g, "")
    .replace(/[?!.]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  const fallback = "AI 면접 도입은 공정한가";
  if (!raw) return fallback;

  if (
    raw.includes("해야") ||
    raw.includes("좋다") ||
    raw.includes("할까") ||
    raw.includes("필요") ||
    raw.includes("맞나")
  ) {
    return raw;
  }

  return `${raw} 해야 하는가`;
}

function classifyVerdict(text) {
  const t = safeText(text);
  if (!t) return "미결";

  const guiltyWords = ["유죄", "guilty", "yes", "y", "인정"];
  if (guiltyWords.some((word) => t.toLowerCase().includes(word))) return "유죄";

  const notGuiltyWords = ["무죄", "not guilty", "no", "n", "불인정"];
  if (notGuiltyWords.some((word) => t.toLowerCase().includes(word))) return "무죄";

  return "미결";
}

function hasSpeechRecognition() {
  return Boolean(window.SpeechRecognition || window.webkitSpeechRecognition);
}

function stopKeywordMonitor(statusText = "개정 대기 중") {
  app.keywordAutoRestart = false;
  app.keywordMonitorActive = false;
  if (app.keywordRecognition) {
    try {
      app.keywordRecognition.stop();
    } catch (_) {
      // ignore
    }
  }
  app.keywordRecognition = null;
  app.recognitionBusy = false;
  setKeywordCheck(statusText, "neutral");
  hideUserSubtitle(0);
  syncControls();
}

function startKeywordMonitor() {
  if (!hasSpeechRecognition()) {
    addLog("system", "자동 키워드 STT를 지원하지 않는 브라우저입니다.");
    setKeywordCheck("브라우저 미지원", "miss");
    return;
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Recognition();
  rec.lang = "ko-KR";
  rec.continuous = true;
  rec.interimResults = false;
  rec.maxAlternatives = 1;

  app.keywordMonitorActive = true;
  app.keywordAutoRestart = true;
  app.keywordRecognition = rec;
  app.recognitionBusy = true;
  setKeywordCheck("개정 중 자동 키워드 STT 감시 중", "neutral");
  syncControls();

  rec.onresult = (event) => {
    for (let i = event.resultIndex; i < event.results.length; i += 1) {
      const result = event.results[i];
      if (!result?.isFinal) continue;
      const transcript = safeText(result[0]?.transcript || "");
      if (!transcript) continue;
      showUserSubtitle(`배심원: ${transcript}`);
      applyKeywordResultLog(transcript, "사용자 키워드 자동 STT");
    }
  };

  rec.onerror = (event) => {
    if (!app.keywordMonitorActive) return;
    if (event.error !== "aborted" && event.error !== "no-speech") {
      addLog("system", `자동 키워드 STT 오류: ${event.error}`);
    }
  };

  rec.onend = () => {
    if (!app.keywordMonitorActive || !app.keywordAutoRestart) {
      app.recognitionBusy = false;
      syncControls();
      return;
    }
    setTimeout(() => {
      if (!app.keywordMonitorActive || !app.keywordAutoRestart) return;
      try {
        app.recognitionBusy = true;
        rec.start();
        syncControls();
      } catch (_) {
        app.recognitionBusy = false;
        syncControls();
      }
    }, 150);
  };

  try {
    rec.start();
    showUserSubtitle("배심원 발화 감지 중...");
    addLog("system", "자동 키워드 STT 시작: 개정 중 사용자 발화를 계속 감지합니다.");
  } catch (_) {
    stopKeywordMonitor("자동 STT 시작 실패");
    addLog("system", "자동 키워드 STT 시작에 실패했습니다.");
  }
}

function listenOnce(mode = "case") {
  if (!hasSpeechRecognition()) {
    return Promise.reject(new Error("이 브라우저는 STT(Web Speech)를 지원하지 않습니다."));
  }

  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const rec = new Recognition();
  rec.lang = "ko-KR";
  rec.interimResults = true;
  rec.maxAlternatives = 1;
  rec.continuous = true;

  app.recognitionBusy = true;
  if (mode === "case") {
    showUserSubtitle("판사: 그럼, 재판을 시작합니다.");
    clearSubtitleIntroTimer();
    app.subtitleIntroTimer = setTimeout(() => {
      showUserSubtitle("판사: 이번 사건은...");
      app.subtitleIntroTimer = null;
    }, 1000);
  } else if (mode === "verdict") {
    showUserSubtitle("판사: 배심원 평결을 말씀해 주십시오. (유죄/무죄)");
  } else {
    showUserSubtitle("사용자 발화를 듣는 중...");
  }
  syncControls();

  return new Promise((resolve, reject) => {
    let settled = false;
    let timeoutId = null;
    let heardSpeech = false;
    let interimTranscript = "";

    const cleanup = () => {
      clearSubtitleIntroTimer();
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      try {
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.onspeechstart = null;
        rec.onnomatch = null;
      } catch (_) {
        // ignore
      }
      app.recognitionBusy = false;
      hideUserSubtitle(1500);
      syncControls();
    };

    const finishResolve = (value) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(value);
    };

    const finishReject = (error) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(error);
    };

    rec.onresult = (event) => {
      clearSubtitleIntroTimer();
      const speakerTag = mode === "case" ? "판사" : "배심원";
      let finalText = "";
      let latestInterim = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const result = event.results[i];
        const transcript = safeText(result?.[0]?.transcript || "");
        if (!transcript) continue;
        if (result.isFinal) finalText += `${transcript} `;
        else latestInterim = transcript;
      }

      if (latestInterim) interimTranscript = latestInterim;
      if (latestInterim) showUserSubtitle(`${speakerTag}: ${latestInterim}`);
      const normalizedFinal = safeText(finalText);
      if (normalizedFinal) {
        showUserSubtitle(`${speakerTag}: ${normalizedFinal}`);
        finishResolve(normalizedFinal);
      }
    };

    rec.onspeechstart = () => {
      heardSpeech = true;
      if (!timeoutId) return;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (settled) return;
        try {
          rec.stop();
        } catch (_) {
          // ignore
        }
        finishReject(new Error("음성 인식 시간이 초과되었습니다. 다시 시도해 주세요."));
      }, 13000);
    };

    rec.onnomatch = () => {
      if (interimTranscript) {
        finishResolve(interimTranscript);
      }
    };

    rec.onerror = (event) => {
      const code = event.error || "unknown";
      if (code === "aborted") {
        finishReject(new Error("음성 인식이 중단되었습니다. 다시 시도해 주세요."));
        return;
      }
      finishReject(new Error(`STT 오류: ${code}`));
    };

    rec.onend = () => {
      if (!settled) {
        if (interimTranscript) {
          finishResolve(interimTranscript);
          return;
        }
        finishReject(
          new Error(
            heardSpeech
              ? "발화는 감지됐지만 텍스트 변환에 실패했습니다. 더 천천히 또렷하게 말씀해 주세요."
              : "음성이 인식되지 않았습니다. 다시 시도해 주세요."
          )
        );
      }
    };

    try {
      rec.start();
      timeoutId = setTimeout(() => {
        if (settled) return;
        try {
          rec.stop();
        } catch (_) {
          // ignore
        }
        finishReject(new Error("음성 인식 시간이 초과되었습니다. 다시 시도해 주세요."));
      }, 9000);
      addLog(
        "system",
        mode === "case"
          ? "사건 주제를 말해 주세요."
          : mode === "verdict"
            ? "배심원 평결을 말해 주세요. (유죄 / 무죄)"
            : "예/아니오로 개정 시작 여부를 말해 주세요. (Y/N 가능)"
      );
    } catch (error) {
      finishReject(new Error("STT 시작에 실패했습니다. 권한을 확인해 주세요."));
    }
  });
}

function speakTurn(turn) {
  if (!window.speechSynthesis) return Promise.resolve();

  window.speechSynthesis.cancel();

  const char = CHARACTER[turn.speaker] || CHARACTER.system;
  const utterance = new SpeechSynthesisUtterance(turn.text);
  utterance.lang = "ko-KR";
  utterance.rate = Math.min(2, Math.max(0.1, 1.1 + char.rateOffset));
  utterance.pitch = Math.min(2, Math.max(0, 1 + char.pitchOffset));

  app.currentUtterance = utterance;
  app.isSpeaking = true;
  syncControls();

  return new Promise((resolve, reject) => {
    utterance.onend = () => {
      app.isSpeaking = false;
      app.currentUtterance = null;
      syncControls();
      resolve();
    };
    utterance.onerror = () => {
      app.isSpeaking = false;
      app.currentUtterance = null;
      syncControls();
      reject(new Error("TTS 재생 실패"));
    };
    window.speechSynthesis.speak(utterance);
  });
}

function makeDefenseOpening(topic) {
  return [
    `${CHARACTER.defense.cue} '${topic}'은 단계적 도입이면 실익이 큽니다.`,
    "핵심 근거: 작은 파일럿으로 비용과 실패 리스크를 동시에 통제할 수 있습니다.",
  ].join("\n");
}

function makeProsecutorCounter(topic) {
  return [
    `${CHARACTER.prosecutor.cue} '${topic}'은 반례가 반복됐고 과신은 위험합니다.`,
    "핵심 리스크: 책임 불명확과 편향 누적이 겹치면 사후 복구 비용이 급증합니다.",
  ].join("\n");
}

function makeDefenseRebuttal(topic) {
  return [
    `${CHARACTER.defense.cue} 그래서 '${topic}'은 전면 도입이 아니라 조건부 파일럿으로 갑니다.`,
    "보완책: 책임자 지정, 편향 지표 공개, 중단 기준 선명화.",
  ].join("\n");
}

function makeJudgePrompt() {
  return [
    `${CHARACTER.judge.cue} 양측 핵심을 접수했습니다.`,
    "배심원은 지금 '유죄' 또는 '무죄'로 평결을 말씀해 주십시오.",
  ].join("\n");
}

function buildDebateTurns(topic) {
  return [
    { speaker: "defense", text: makeDefenseOpening(topic) },
    { speaker: "prosecutor", text: makeProsecutorCounter(topic) },
    { speaker: "defense", text: makeDefenseRebuttal(topic) },
    { speaker: "judge", text: makeJudgePrompt() },
  ];
}

async function processTurnQueue() {
  while (app.turnQueue.length > 0 && app.state === STATES.COURT_IN_SESSION) {
    const turn = app.turnQueue.shift();
    if (!turn) break;

    activateCharacter(turn.speaker, "발언 중");
    setCharacterBubble(turn.speaker, turn.text);
    addLog(turn.speaker, turn.text);
    applyTurnDamage(turn.speaker);
    app.historyTurns.push(turn);

    if (turn.text.includes("이의 있음") || turn.text.includes("반론")) {
      beep("objection");
    }

    try {
      await speakTurn(turn);
    } catch (_) {
      addLog("system", "TTS 실패: 텍스트 로그만 계속 진행합니다.");
    }

    if (app.skipRequested) {
      app.skipRequested = false;
    }
  }

  resetCharacterState();

  if (app.state === STATES.COURT_IN_SESSION) {
    stopKeywordMonitor("평결 수집 중");
    setState(STATES.LISTENING_VERDICT);
    addLog("judge", "배심원 평결을 말씀해 주세요. 예: 유죄 / 무죄");
    try {
      const result = await listenOnce("verdict");
      app.verdictRaw = result;
      app.verdictType = classifyVerdict(result);
      applyKeywordResultLog(result, "평결 음성 STT");
      await playVerdictBurst();
      setState(STATES.VERDICT_READY);
      await renderAndReadJudgment();
    } catch (error) {
      handleError(error);
    }
  }
}

function summarizeLogsBySpeaker(speaker, maxLines) {
  const rows = app.logs.filter((log) => log.speaker === speaker).slice(-maxLines);
  return rows.map((row) => `- ${row.text.split("\n")[0]}`).join("\n");
}

function buildJudgeVerdictLines(verdictType) {
  const finalVerdict = getFinalVerdict();
  const directVerdict = verdictType === "유죄" || verdictType === "무죄";
  const common = [
    directVerdict
      ? `1) 배심원 평결 '${verdictType}'를 직접 채택하여 '${finalVerdict}'를 선고합니다.`
      : `1) 배심원 평결이 미결이므로 게이지 ${app.gauge}점 기준으로 '${finalVerdict}'를 선고합니다.`,
    "2) 보조 규칙: 유죄/무죄가 아닌 응답일 때만 게이지 판정을 적용합니다. (50:50은 유죄)",
  ];

  if (finalVerdict === "유죄") {
    return [...common, "3) 다만 과잉 집행 방지를 위해 사후 검증 절차를 의무화합니다."];
  }
  return [...common, "3) 합리적 의심이 남아 무죄로 판단하며, 보강 증거 제출 시 재심을 허가합니다."];
}

function buildJudgmentText() {
  const topic = app.caseTopic || "사건 미정";
  const defenseSummary = summarizeLogsBySpeaker("defense", 3) || "- 요약 없음";
  const prosecutorSummary = summarizeLogsBySpeaker("prosecutor", 3) || "- 요약 없음";
  const verdictLine = `${app.verdictRaw || "평결 미입력"} (${app.verdictType || "미결"})`;
  const finalVerdict = getFinalVerdict();
  const ruling = buildJudgeVerdictLines(app.verdictType || "미결").join("\n");

  return [
    `사건: ${topic}`,
    "",
    "[쟁점]",
    `- '${topic}'의 도입 타당성과 위험 통제 가능성`,
    "- 단기 효용과 장기 부작용 중 무엇을 우선할 것인지",
    "",
    "[변호 요지]",
    defenseSummary,
    "",
    "[검사 요지]",
    prosecutorSummary,
    "",
    "[사용자 평결]",
    `- ${verdictLine}`,
    "",
    "[게이지 최종 판결]",
    `- 최종 게이지: ${app.gauge}`,
    `- 판결: ${finalVerdict}`,
    "",
    "[판사 판결문]",
    ruling,
  ].join("\n");
}

async function renderAndReadJudgment() {
  const judgment = buildJudgmentText();
  if (els.judgmentText) els.judgmentText.textContent = judgment;

  setState(STATES.VERDICT_READING);
  activateCharacter("judge", "판결문 낭독");
  setCharacterBubble("judge", judgment);
  addLog("judge", `최종 판결 ${getFinalVerdict()}를 선고합니다.`);
  showResultPopup(judgment);

  resetCharacterState();
  stopKeywordMonitor("판결 완료");
  setState(STATES.DONE);
  setBgmMode("done");
  ensureBgmPlayback();
}

function stopAll() {
  app.turnQueue = [];
  app.skipRequested = false;
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  app.isSpeaking = false;
  closeStartPrompt();
  stopKeywordMonitor("개정 대기 중");
  setState(app.caseTopic ? STATES.CASE_READY : STATES.IDLE);
  resetCharacterState();
  addLog("system", "진행을 중지했습니다.");
}

async function replayLast() {
  const last = app.historyTurns[app.historyTurns.length - 1];
  if (!last) return;
  activateCharacter(last.speaker, "다시 듣기");
  setCharacterBubble(last.speaker, last.text);
  try {
    await speakTurn(last);
  } catch (_) {
    addLog("system", "다시 듣기에 실패했습니다.");
  }
  resetCharacterState();
}

async function replayAll() {
  for (const turn of app.historyTurns) {
    activateCharacter(turn.speaker, "전체 다시");
    setCharacterBubble(turn.speaker, turn.text);
    try {
      await speakTurn(turn);
    } catch (_) {
      addLog("system", "전체 다시 중 TTS 실패가 발생했습니다.");
      break;
    }
  }
  resetCharacterState();
}

function handleError(error) {
  stopKeywordMonitor("오류 발생");
  const msg = error?.message || "알 수 없는 오류";
  setState(STATES.ERROR);
  beep("error");
  addLog("system", `오류: ${msg}`);
}

function attachEvents() {
  const on = (el, event, handler) => {
    if (!el) return;
    el.addEventListener(event, handler);
  };

  const unlockAudio = () => {
    if (!app.audioUnlocked) {
      app.audioUnlocked = true;
    }
    if (!app.bgm.ctx && app.settings.sfxOn) {
      start8BitBgm();
    }
    resumeBgmContext();
    updateBgmByContext();
  };

  document.addEventListener("pointerdown", unlockAudio, { once: true });
  document.addEventListener("click", unlockAudio, { once: true });
  document.addEventListener("touchstart", unlockAudio, { once: true, passive: true });
  document.addEventListener("keydown", unlockAudio, { once: true });

  on(els.sfxToggleBtn, "click", () => {
    unlockAudio();
    app.settings.sfxOn = !app.settings.sfxOn;
    refreshSettingUi();
    saveSettings();
    addLog("system", app.settings.sfxOn ? "8bit 사운드 ON" : "8bit 사운드 OFF");
  });

  on(els.clickerUpBtn, "click", () => {
    unlockAudio();
    adjustGauge(GAUGE.STEP_CLICK, "클리커 +");
    playClickHitSound("defense");
  });

  on(els.clickerDownBtn, "click", () => {
    unlockAudio();
    adjustGauge(-GAUGE.STEP_CLICK, "클리커 -");
    playClickHitSound("prosecutor");
  });

  async function startCaseReception(openCourtPopup = false) {
    setState(STATES.LISTENING_CASE);
    try {
      const transcript = await listenOnce("case");
      setKeywordCheck("사건 접수 중에는 키워드 판정을 하지 않습니다.", "neutral");
      addLog("system", `사건 접수 음성 STT: ${transcript}`);
      const topic = normalizeCaseTopic(transcript);
      app.caseTopic = topic;
      app.settings.recentCase = topic;
      saveSettings();
      if (els.caseTitle) els.caseTitle.textContent = topic;
      setState(STATES.CASE_READY);
      addLog("system", `사건 접수 완료: ${topic}`);
      beep("normal");
      if (openCourtPopup) {
        openStartPrompt(topic);
      }
    } catch (error) {
      handleError(error);
    }
  }

  function beginCourtSession() {
    if (!app.caseTopic) {
      addLog("system", "먼저 사건을 접수해 주세요.");
      return;
    }

    app.turnQueue = buildDebateTurns(app.caseTopic);
    resetKeywordStats();
    startKeywordMonitor();
    setState(STATES.COURT_IN_SESSION);
    startRoundTimer();
    addLog("system", `개정: '${app.caseTopic}' 사건 심리를 시작합니다.`);
    addLog("system", "총 라운드 시간은 1분입니다.");
    processTurnQueue();
  }

  on(els.readyBtn, "click", async () => {
    unlockAudio();
    closeStartPrompt();
    stopKeywordMonitor("개정 대기 중");
    app.caseTopic = "";
    resetKeywordStats();
    if (els.caseTitle) els.caseTitle.textContent = "사건 접수 중...";
    els.readyBtn.textContent = "LISTENING...";
    addLog("system", "CASE FILE: 사건 접수를 시작합니다. 주제를 말씀해 주세요.");
    try {
      await startCaseReception(true);
    } finally {
      els.readyBtn.textContent = "CASE FILE";
    }
  });

  on(els.listenCaseBtn, "click", async () => {
    unlockAudio();
    await startCaseReception(false);
  });

  on(els.startCourtBtn, "click", () => {
    unlockAudio();
    if (!app.caseTopic) {
      addLog("system", "먼저 사건을 접수해 주세요.");
      return;
    }
    openStartPrompt(app.caseTopic);
  });

  on(els.listenVerdictBtn, "click", async () => {
    unlockAudio();
    stopKeywordMonitor("평결 수집 중");
    setState(STATES.LISTENING_VERDICT);
    try {
      const verdict = await listenOnce("verdict");
      app.verdictRaw = verdict;
      app.verdictType = classifyVerdict(verdict);
      applyKeywordResultLog(verdict, "평결 음성 STT");
      await playVerdictBurst();
      setState(STATES.VERDICT_READY);
      await renderAndReadJudgment();
    } catch (error) {
      handleError(error);
    }
  });

  on(els.stopBtn, "click", stopAll);
  on(els.skipBtn, "click", () => {
    app.skipRequested = true;
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    app.isSpeaking = false;
    syncControls();
  });

  on(els.replayLastBtn, "click", replayLast);
  on(els.replayAllBtn, "click", replayAll);
  on(els.startPromptYesBtn, "click", () => {
    unlockAudio();
    closeStartPrompt();
    beginCourtSession();
  });
  on(els.startPromptNoBtn, "click", () => {
    closeStartPrompt();
    addLog("system", "개정을 보류했습니다.");
  });
  on(els.retryResultPopupBtn, "click", () => {
    if (els.resultPopup) els.resultPopup.hidden = true;
    stopKeywordMonitor("재심 준비");
    app.verdictRaw = "";
    app.verdictType = "";
    app.turnQueue = [];
    app.skipRequested = false;
    app.gauge = 50;
    resetKeywordStats();
    renderGauge();
    setState(app.caseTopic ? STATES.CASE_READY : STATES.IDLE);
    if (app.caseTopic) {
      openStartPrompt(app.caseTopic);
    }
    addLog("system", "재심을 준비합니다.");
  });
  on(els.closeResultPopupBtn, "click", () => {
    if (els.resultPopup) els.resultPopup.hidden = true;
  });
  document.addEventListener("keydown", (event) => {
    const promptOpen = els.startPromptPanel && !els.startPromptPanel.hidden;
    if (!promptOpen) return;
    if (app.state === STATES.COURT_IN_SESSION || app.recognitionBusy) return;
    const key = (event.key || "").toLowerCase();
    const code = event.code || "";
    const isSpace = code === "Space" || event.key === " ";
    const isYes = key === "y" || code === "KeyY";
    const isNo = key === "n" || code === "KeyN";
    if (!isSpace && !isYes && !isNo) return;
    unlockAudio();
    event.preventDefault();
    if (isNo) {
      closeStartPrompt();
      addLog("system", "개정을 보류했습니다. (N)");
      return;
    }
    closeStartPrompt();
    beginCourtSession();
  });
}

function boot() {
  loadSettings();
  refreshSettingUi();
  attachEvents();

  renderGauge();
  renderKeywordStats();
  renderRoundTimer();
  resetCharacterBubbles();
  setKeywordCheck("개정 대기 중", "neutral");
  addLog("system", "Voice Court 준비 완료. '사건 접수'를 눌러 시작하세요.");
  syncControls();
}

boot();
