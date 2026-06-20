// ================================
// Data
// ================================
// 難易度はローマ字の文字数で分類: easy≤11, normal 12-17, hard 18+
// Rookie(1-3): easy語, Fighter(4-6): normal語, Veteran(7-9): hard語
// Elite(10-12) / Legend(13-15) は暫定でhard語を流用。お題を指定して追加可能。
// お題データ（WORD_LISTS）は words.js に分離。index.html で先に読み込む。


const TIER_DEFS = [
  { id: 'rookie',  label: 'Rookie',  levels: [1, 2, 3],    desc: 'やさしい文でウォームアップ！' },
  { id: 'fighter', label: 'Fighter', levels: [4, 5, 6],    desc: '少し長めの文に挑戦！' },
  { id: 'veteran', label: 'Veteran', levels: [7, 8, 9],    desc: '歯ごたえのある長文！' },
  { id: 'elite',   label: 'Elite',   levels: [10, 11, 12], desc: '上級者向けの難文！' },
  { id: 'legend',  label: 'Legend',  levels: [13, 14, 15], desc: '最高難度に挑め！' },
];

const MODE_DESCRIPTIONS = {
  rookie:  'やさしい文でウォームアップ！',
  fighter: '少し長めの文に挑戦！',
  veteran: '歯ごたえのある長文！',
  elite:   '上級者向けの難文！',
  legend:  '最高難度に挑め！',
};

const RESULT_MESSAGES = [
  { threshold: 0,  text: 'まだまだこれから！練習あるのみ！' },
  { threshold: 6,  text: 'いい感じ！もっと速くなれる！' },
  { threshold: 13, text: 'すごい！タイピングが上手だね！' },
  { threshold: 21, text: '爆速！本物のタイピストだ！' },
  { threshold: 31, text: '伝説級！人間じゃないかも！？' }
];

const ROMAJI_ALTERNATES = [
  ['si', 'shi'],
  ['sya', 'sha'],
  ['syu', 'shu'],
  ['syo', 'sho'],
  ['tu', 'tsu'],
  ['ti', 'chi'],
  ['tya', 'cha'],
  ['hu', 'fu'],
  ['zi', 'ji'],
  ['ja', 'jya'],
  ['ju', 'jyu'],
  ['jo', 'jyo'],
  ['ltu', 'xtu'],  // っ を直接入力する方法 (ltu / xtu)
  ['lya', 'xya'],  // ゃ
  ['lyu', 'xyu'],  // ゅ
  ['lyo', 'xyo'],  // ょ
  ['di', 'dji'],   // ぢ
  ['du', 'dzu'],   // づ
];

function generateAlternates(ro) {
  const variants = new Set([ro]);
  for (const [a, b] of ROMAJI_ALTERNATES) {
    for (const v of [...variants]) {
      if (v.includes(a)) variants.add(v.replace(new RegExp(a, 'g'), b));
      if (v.includes(b)) variants.add(v.replace(new RegExp(b, 'g'), a));
    }
  }
  // ん を "nn" でも入力できるバリアントを生成（各ん位置を独立に展開）
  // 対象: 子音前・語末 の n、および n+母音（の/な/に等）の直前の n
  const base = [...variants];
  for (const v of base) {
    const positions = [];
    for (let i = 0; i < v.length; i++) {
      if (v[i] !== 'n') continue;
      const nxt  = v[i + 1];
      const nxt2 = v[i + 2];
      const standardCase  = nxt === undefined || !/[aeiouyn]/.test(nxt);
      const beforeNVowel  = nxt === 'n' && nxt2 !== undefined && /[aeiou]/.test(nxt2);
      if (standardCase || beforeNVowel) positions.push(i);
    }
    if (positions.length === 0) continue;
    for (let mask = 1; mask < (1 << positions.length); mask++) {
      let s = v;
      let offset = 0;
      for (let b = 0; b < positions.length; b++) {
        if (mask & (1 << b)) {
          const pos = positions[b] + offset;
          s = s.slice(0, pos) + 'nn' + s.slice(pos + 1);
          offset++;
        }
      }
      variants.add(s);
    }
  }
  return [...variants];
}

// ================================
// CONFIG — ゲームの調整値はここに集約
// ゲームの手応え・難易度を変えたいときは、まずこのオブジェクトを編集する
// ================================
const CONFIG = {
  // --- 練習モード ---
  gameDuration:     60,   // 制限時間（秒）
  warningThreshold: 10,   // 残りこの秒数でタイマーバーが赤く点滅

  // --- バトルモード ---
  maxHp:            100,  // プレイヤーの開始HP
  missDamage:       5,    // ミスタイプ1回で減るHP
  healOnClear:      5,    // ノーミスでお題をクリアしたときに回復するHP（HP満タン未満のとき）
  minWordTime:      4,    // お題1つあたりの最低制限時間（秒）
  enemyMaxHp:       100,  // 敵の最大HP
  wordDamage:       20,   // お題を1つ正解するごとに敵へ与えるダメージ（100 / 20 = 5語で撃破）

  // --- 演出 ---
  correctAnimMs:    280,  // 正解アニメの長さ（ミリ秒）。style.css の anim-correct (0.28s) と合わせる
};
// 敵データ（*_SVG + STAGE_ENEMIES）は enemies.js に分離。index.html で先に読み込む。
function getStageData(stage) {
  // 1ステージ = 1体の敵。stage が進むごとに敵が交代し、難易度も1つ上がる。
  const enemyIdx = (stage - 1) % STAGE_ENEMIES.length;
  const template = STAGE_ENEMIES[enemyIdx];
  return {
    name:      template.name,
    emoji:     template.emoji,
    diffLevel: Math.min(15, stage),
  };
}

function calcWordTimeLimit(roLength, diffLevel) {
  let seconds;
  if (diffLevel <= 3)       seconds = roLength * 0.325 + 3;
  else if (diffLevel <= 6)  seconds = roLength * 0.275 + 2.5;
  else if (diffLevel <= 9)  seconds = roLength * 0.24 + 2;
  else if (diffLevel <= 12) seconds = roLength * 0.21 + 1.5;
  else                      seconds = roLength * 0.18 + 1;
  return Math.max(CONFIG.minWordTime, Math.round(seconds));
}

const STAGE_STORAGE_KEY = 'typeRushBestStage';
function getBestStage() {
  try { return parseInt(localStorage.getItem(STAGE_STORAGE_KEY) || '0', 10); }
  catch { return 0; }
}
function setBestStage(stage) {
  try { localStorage.setItem(STAGE_STORAGE_KEY, String(stage)); }
  catch { /* ignore */ }
}

const BEST_SCORE_KEY = 'typeRushBestScore';
function getBestScore() {
  try { return parseInt(localStorage.getItem(BEST_SCORE_KEY) || '0', 10); }
  catch { return 0; }
}
function setBestScore(score) {
  try { localStorage.setItem(BEST_SCORE_KEY, String(score)); }
  catch { /* ignore */ }
}

let audioCtx = null;
const SOUND_KEY = 'typeRushSound';

function playSound(type) {
  if (!state.soundEnabled) return;
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const ctx = audioCtx;
  const now = ctx.currentTime;

  if (type === 'key') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
    osc.start(now); osc.stop(now + 0.07);

  } else if (type === 'miss') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.value = 180;
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.start(now); osc.stop(now + 0.12);

  } else if (type === 'correct') {
    // 長三和音（ド・ミ・ソ）を時間差で鳴らして開放感を出す
    [[523, 0], [659, 0.06], [784, 0.12]].forEach(([freq, delay]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);
      osc.start(now + delay); osc.stop(now + delay + 0.6);
    });
  }
}

// ================================
// State
// ================================
const state = {
  mode: 'rookie',
  gameType: 'battle',
  diffLevel: 1,
  score: 0,
  timeLeft: CONFIG.gameDuration,
  wordTimeLimit: CONFIG.gameDuration,
  currentWord: '',
  lastWord: '',
  currentWordAlts: [],
  currentStage: 1,
  playerHp: CONFIG.maxHp,
  enemyHp: CONFIG.enemyMaxHp,
  combo: 0,
  isPlaying: false,
  timerId: null,
  barTimerId: null,
  barStartMs: 0,
  wordTimerId: null,
  countdownTimerId: null,
  countdownActive: false,
  soundEnabled: localStorage.getItem(SOUND_KEY) !== 'off',
  totalKeystrokes: 0,
  correctKeystrokes: 0,
  _insertPending: false,
  currentWordMissed: false
};

// ================================
// DOM References
// ================================
const screens = {
  start:  document.getElementById('screen-start'),
  game:   document.getElementById('screen-game'),
  pause:  document.getElementById('screen-pause'),
  result: document.getElementById('screen-result')
};

const el = {
  container:        document.querySelector('.container'),
  gametypeBtnGroup: document.querySelector('.gametype-selector'),
  modeSelector:     document.querySelector('.mode-selector'),
  modeButtonGroup:  document.querySelector('.mode-buttons'),
  modeDescription:  document.getElementById('mode-description'),
  startBtn:         document.getElementById('start-btn'),
  timerBar:         document.getElementById('timer-bar'),
  scoreBox:         document.getElementById('score-box'),
  scoreValue:       document.getElementById('score-value'),
  currentWordJa:    document.getElementById('current-word-ja'),
  currentWord:      document.getElementById('current-word'),
  typingInput:      document.getElementById('typing-input'),
  hpArea:           document.getElementById('hp-area'),
  playerHpBar:      document.getElementById('player-hp-bar'),
  playerHpValue:    document.getElementById('player-hp-value'),
  enemyHpBar:       document.getElementById('enemy-hp-bar'),
  enemyHpValue:     document.getElementById('enemy-hp-value'),
  finalScoreValue:  document.getElementById('final-score-value'),
  resultStats:      document.getElementById('result-stats'),
  resultMessage:    document.getElementById('result-message'),
  bestScoreInfo:    document.getElementById('best-score-info'),
  battleResult:     document.getElementById('battle-result'),
  reachedStageInfo: document.getElementById('reached-stage-info'),
  bestStageInfo:    document.getElementById('best-stage-info'),
  battleHpSummary:  document.getElementById('battle-hp-summary'),
  enemyArea:        document.getElementById('enemy-area'),
  enemyEmoji:       document.getElementById('enemy-emoji'),
  enemyName:        document.getElementById('enemy-name'),
  stageIndicator:   document.getElementById('stage-indicator'),
  stageValue:       document.getElementById('stage-value'),
  diffLevelValue:   document.getElementById('diff-level-value'),
  battleExtras:     document.getElementById('battle-extras'),
  comboDisplay:     document.getElementById('combo-display'),
  countdownOverlay: document.getElementById('countdown-overlay'),
  countdownText:    document.getElementById('countdown-text'),
  battleFlash:      document.getElementById('battle-flash'),
  battleEndOverlay: document.getElementById('battle-end-overlay'),
  battleEndText:    document.getElementById('battle-end-text'),
  restartBtn:       document.getElementById('restart-btn'),
  soundBtn:         document.getElementById('sound-btn'),
  pauseBtn:         document.getElementById('pause-btn'),
  resumeBtn:        document.getElementById('resume-btn'),
  retryBtn:         document.getElementById('retry-btn'),
  homeBtn:          document.getElementById('home-btn'),
};

// ================================
// Screen Management
// ================================
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

// ================================
// Display Helpers
// ================================
// 2色を t（0〜1）で混ぜて rgb 文字列を返す
function lerpColor(c1, c2, t) {
  const r = Math.round(c1[0] + (c2[0] - c1[0]) * t);
  const g = Math.round(c1[1] + (c2[1] - c1[1]) * t);
  const b = Math.round(c1[2] + (c2[2] - c1[2]) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

// タイマーバーの色を残量比率（ratio: 1=満タン, 0=空）から計算（青→黄→赤）
function timerColor(ratio) {
  const r = Math.max(0, Math.min(1, ratio));
  const CYAN   = [0, 212, 255];
  const YELLOW = [255, 204, 0];
  const RED    = [255, 68, 102];
  return r > 0.5
    ? lerpColor(YELLOW, CYAN, (r - 0.5) / 0.5)  // 0.5〜1.0 : 黄 → 青
    : lerpColor(RED, YELLOW, r / 0.5);          // 0〜0.5   : 赤 → 黄
}

function renderTimer() {
  if (state.gameType === 'battle') {
    const threshold = Math.max(3, Math.round(state.wordTimeLimit * 0.2));
    el.timerBar.classList.toggle('warning', state.timeLeft <= threshold);
    return;
  }
  const ratio = state.timeLeft / CONFIG.gameDuration;
  el.timerBar.style.width = (ratio * 100) + '%';
  el.timerBar.style.background = timerColor(ratio);
  el.timerBar.classList.toggle('warning', state.timeLeft <= CONFIG.warningThreshold);
}

function renderScore() {
  el.scoreValue.textContent = state.score;
}

function renderHp() {
  const p = Math.max(0, state.playerHp);
  el.playerHpBar.style.width   = Math.round(p / CONFIG.maxHp * 100) + '%';
  el.playerHpValue.textContent = p;
}

function renderEnemyHp() {
  const e = Math.max(0, state.enemyHp);
  el.enemyHpBar.style.width   = Math.round(e / CONFIG.enemyMaxHp * 100) + '%';
  el.enemyHpValue.textContent = e;
}

function renderCombo() {
  el.comboDisplay.textContent = state.combo >= 2 ? `🔥 ${state.combo} コンボ！` : '';
  el.comboDisplay.classList.toggle('combo-hot', state.combo >= 5);
  el.comboDisplay.classList.toggle('combo-blaze', state.combo >= 10);
}

// HP の増減を数字でフワッとポップ表示する（バトルモードの演出）
// kind: 'damage'（赤・自分が被ダメ） | 'heal'（緑・自分が回復） | 'hit'（黄・敵に与ダメ）
// anchorEl: 数字を出す基準要素（省略時は自分のHPエリア）
function popFloatingText(text, kind, anchorEl = el.hpArea) {
  const node = document.createElement('div');
  node.className = `float-text float-${kind}`;
  node.textContent = text;
  const rect = anchorEl.getBoundingClientRect();
  node.style.left = (rect.left + rect.width / 2) + 'px';
  node.style.top  = rect.top + 'px';
  document.body.appendChild(node);
  node.addEventListener('animationend', () => node.remove());
}

// 指定要素の中心から小さな粒子を弾けさせる（ヒット演出）
function spawnParticles(anchorEl, opts = {}) {
  const {
    count  = 12,
    colors = ['#ffcc00', '#ffffff', '#00d4ff'],
    spread = 75,
    size   = 7,
  } = opts;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const angle = Math.random() * Math.PI * 2;
    const dist  = spread * (0.45 + Math.random() * 0.85);
    const s     = size * (0.6 + Math.random() * 0.9);
    const color = colors[i % colors.length];
    p.style.cssText =
      `left:${cx}px; top:${cy}px; width:${s}px; height:${s}px;` +
      `background:${color}; color:${color};` +
      `--dx:${(Math.cos(angle) * dist).toFixed(1)}px; --dy:${(Math.sin(angle) * dist).toFixed(1)}px;`;
    document.body.appendChild(p);
    p.addEventListener('animationend', () => p.remove());
  }
}

// 画面をブルッと揺らす（kind: 'light' | 'mid' | 'hard'）
function screenShake(kind = 'light') {
  const t = el.container;
  t.classList.remove('shake-light', 'shake-mid', 'shake-hard');
  void t.offsetWidth; // リフローでアニメをリセット
  t.classList.add('shake-' + kind);
  clearTimeout(t._shakeTimer);
  t._shakeTimer = setTimeout(() => t.classList.remove('shake-' + kind), 520);
}

function triggerAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // DOMの再描画を強制してアニメーションをリセット
  element.classList.add(className);
}

function renderStage() {
  el.stageValue.textContent = state.currentStage;
}

function renderDiffLevel() {
  el.diffLevelValue.textContent = state.diffLevel;
}

function renderWordProgress(typed) {
  const target = state.currentWord;
  const html = target.split('').map((char, i) => {
    let cls = 'char-pending';
    if (i < typed.length) {
      cls = typed[i] === char ? 'char-correct' : 'char-wrong';
    }
    return `<span class="${cls}">${char}</span>`;
  }).join('');
  el.currentWord.innerHTML = html;
}

// ================================
// Word Logic
// ================================
function pickRandomWord() {
  let words;
  if (state.gameType === 'battle') {
    words = WORD_LISTS[state.diffLevel];
  } else {
    const tier = TIER_DEFS.find(t => t.id === state.mode);
    words = tier.levels.flatMap(l => WORD_LISTS[l]);
  }
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (word.ro === (state.currentWord || state.lastWord) && words.length > 1);
  return word;
}

function showNextWord() {
  const word = pickRandomWord();
  state.currentWord = word.ro;
  state.currentWordAlts = generateAlternates(word.ro);
  state.currentWordMissed = false;
  if (state.gameType === 'battle') {
    state.wordTimeLimit = calcWordTimeLimit(word.ro.length, state.diffLevel);
    state.timeLeft = state.wordTimeLimit;
    el.timerBar.style.width = '100%';
    el.timerBar.style.background = '';
    el.timerBar.classList.remove('warning');
  }
  el.currentWordJa.innerHTML = word.ruby || word.ja;
  el.typingInput.value = '';
  renderWordProgress('');
  triggerAnimation(el.currentWord, 'anim-appear');
  triggerAnimation(el.currentWordJa, 'anim-appear');
}

function getResultMessage(score) {
  let message = RESULT_MESSAGES[0].text;
  for (const entry of RESULT_MESSAGES) {
    if (score >= entry.threshold) message = entry.text;
  }
  return message;
}

// ================================
// Timer Logic
// ================================
function tick() {
  state.timeLeft--;
  if (state.gameType === 'battle') state.barStartMs = Date.now();
  renderTimer();
  if (state.timeLeft <= 0) {
    endGame();
  }
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(tick, 1000);
  if (state.gameType === 'battle') {
    state.barStartMs = Date.now();
    clearInterval(state.barTimerId);
    state.barTimerId = setInterval(() => {
      const secsGone = (Date.now() - state.barStartMs) / 1000;
      const remaining = Math.max(0, state.timeLeft - secsGone);
      const ratio = remaining / state.wordTimeLimit;
      el.timerBar.style.width = (ratio * 100) + '%';
      el.timerBar.style.background = timerColor(ratio);
    }, 50);
  }
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
  clearInterval(state.barTimerId);
  state.barTimerId = null;
}

// ================================
// Game Flow
// ================================
function syncStartScreenUI() {
  el.modeSelector.style.display = state.gameType === 'normal' ? 'block' : 'none';
}

function updateGameUI() {
  const isBattle = state.gameType === 'battle';
  el.scoreBox.style.display       = isBattle ? 'none' : '';
  el.stageIndicator.style.display = isBattle ? 'block' : 'none';
  el.hpArea.style.display         = isBattle ? 'flex'  : 'none';
  el.enemyArea.style.display      = isBattle ? 'block' : 'none';
  el.battleExtras.style.display   = isBattle ? 'flex'  : 'none';
}

function startGame() {
  clearTimeout(state.wordTimerId);
  clearInterval(state.barTimerId);
  state.barTimerId = null;
  stopCountdown();
  state.score             = 0;
  state.currentStage      = 1;
  state.timeLeft          = CONFIG.gameDuration;
  state.totalKeystrokes   = 0;
  state.correctKeystrokes = 0;
  el.timerBar.style.width = '100%';
  el.timerBar.style.background = '';
  el.timerBar.style.transition = state.gameType === 'battle' ? 'none' : 'width 0.9s linear, background 0.9s linear';

  updateGameUI();

  if (state.gameType === 'battle') {
    const stageData   = getStageData(state.currentStage);
    state.diffLevel   = stageData.diffLevel;
    state.playerHp    = CONFIG.maxHp;
    state.enemyHp     = CONFIG.enemyMaxHp;
    state.combo       = 0;
    el.enemyEmoji.innerHTML    = stageData.emoji;
    el.enemyName.textContent   = stageData.name;
    renderHp();
    renderEnemyHp();
    renderCombo();
    renderStage();
    renderDiffLevel();
  }
  el.battleEndOverlay.style.display = 'none';

  renderTimer();
  renderScore();

  el.typingInput.value    = '';
  el.typingInput.disabled = true;

  showScreen('game');

  if (state.gameType === 'battle') {
    startCountdown();
  } else {
    state.isPlaying = true;
    el.typingInput.disabled = false;
    showNextWord();
    setTimeout(() => el.typingInput.focus(), 80);
    startTimer();
  }
}

function startCountdown() {
  state.countdownActive = true;
  el.countdownOverlay.style.display = 'flex';
  const steps = ['3', '2', '1', 'START!'];
  let i = 0;
  function next() {
    if (!state.countdownActive) return;
    el.countdownText.textContent = steps[i];
    el.countdownText.classList.toggle('start', steps[i] === 'START!');
    triggerAnimation(el.countdownText, 'anim-countdown');
    i++;
    state.countdownTimerId = setTimeout(
      i < steps.length ? next : beginBattle,
      i < steps.length ? 1000 : 700
    );
  }
  next();
}

function stopCountdown() {
  state.countdownActive = false;
  clearTimeout(state.countdownTimerId);
  state.countdownTimerId = null;
  el.countdownOverlay.style.display = 'none';
}

// 次の敵へ（1ステージ進める）。新しい敵は満タンHPで登場する。
function advanceToNextStage() {
  state.currentStage++;
  if (state.currentStage > getBestStage()) setBestStage(state.currentStage);
  const stageData  = getStageData(state.currentStage);
  state.diffLevel  = stageData.diffLevel;
  state.enemyHp    = CONFIG.enemyMaxHp;   // 新しい敵は満タン
  // playerHp とコンボは引き継ぎ

  el.enemyEmoji.innerHTML = stageData.emoji;
  el.enemyName.textContent  = stageData.name;
  renderHp();
  renderEnemyHp();
  renderStage();
  renderDiffLevel();

  state.isPlaying = true;
  el.typingInput.disabled = false;
  showNextWord();
  setTimeout(() => el.typingInput.focus(), 50);
  startTimer();
}

// 敵を撃破 → 撃破アニメを見せてから次の敵を出す
function enemyDefeated() {
  spawnParticles(el.enemyArea, { count: 26, colors: ['#ffcc00', '#ff7a00', '#ffffff', '#00d4ff'], spread: 120, size: 9 });
  screenShake('hard');
  el.enemyArea.classList.remove('anim-enemy-appear');
  triggerAnimation(el.enemyArea, 'anim-enemy-defeat');
  setTimeout(() => {
    el.enemyArea.classList.remove('anim-enemy-defeat');
    advanceToNextStage();
    void el.enemyArea.offsetWidth;
    el.enemyArea.classList.add('anim-enemy-appear');
  }, 850);
}

// 同じ敵のまま次のお題へ（敵はまだ生きている）
function nextWordSameEnemy() {
  state.isPlaying = true;
  el.typingInput.disabled = false;
  showNextWord();
  setTimeout(() => el.typingInput.focus(), 50);
  startTimer();
}

function beginBattle() {
  state.countdownActive = false;
  el.countdownOverlay.style.display = 'none';
  state.isPlaying = true;
  el.typingInput.disabled = false;
  showNextWord();
  setTimeout(() => el.typingInput.focus(), 80);
  startTimer();
}

function endGame() {
  stopTimer();
  stopCountdown();
  clearTimeout(state.wordTimerId);
  state.wordTimerId = null;
  state.isPlaying = false;

  el.timerBar.style.width = '0%';
  el.timerBar.classList.remove('warning');
  el.typingInput.disabled = true;

  el.finalScoreValue.textContent = state.score;

  const acc = state.totalKeystrokes > 0
    ? Math.round(state.correctKeystrokes / state.totalKeystrokes * 100)
    : 100;
  const kpm = state.totalKeystrokes; // 60秒ゲームなので打鍵数 = 打鍵/分

  if (state.gameType === 'battle') {
    if (state.currentStage > getBestStage()) setBestStage(state.currentStage);
    const best = getBestStage();
    el.reachedStageInfo.textContent   = `到達ステージ: Stage ${state.currentStage}`;
    el.bestStageInfo.textContent      = `最高記録: Stage ${best}`;
    el.battleHpSummary.textContent    = `残りHP: ${Math.max(0, state.playerHp)}`;
    el.resultStats.innerHTML          = `<span class="stat-pill">正確率 ${acc}%</span>`;
    el.resultMessage.textContent      = '';
    el.bestScoreInfo.textContent      = '';
    el.battleResult.style.display     = 'block';
    el.battleEndText.textContent      = '敗北...';
    el.battleEndText.style.color      = 'var(--hard)';
    el.battleEndOverlay.style.display = 'flex';
    setTimeout(() => {
      el.battleEndOverlay.style.display = 'none';
      showScreen('result');
    }, 1500);
  } else {
    const prev = getBestScore();
    const isNew = state.score > prev;
    if (isNew) setBestScore(state.score);
    const best = isNew ? state.score : prev;
    el.resultStats.innerHTML      = `<span class="stat-pill">打鍵速度 ${kpm} 打/分</span><span class="stat-pill">正確率 ${acc}%</span>`;
    el.resultMessage.textContent  = getResultMessage(state.score);
    el.bestScoreInfo.textContent  = isNew && state.score > 0
      ? `🎉 新記録！ ベスト: ${best} 語`
      : best > 0 ? `ベスト: ${best} 語` : '';
    el.battleResult.style.display = 'none';
    setTimeout(() => showScreen('result'), 350);
  }
}

function resetToStart() {
  stopTimer();
  stopCountdown();
  clearTimeout(state.wordTimerId);
  state.isPlaying    = false;
  state.currentStage = 1;
  el.modeSelector.style.display = state.gameType === 'battle' ? 'none' : 'block';
  showScreen('start');
}

function pauseGame() {
  if (state.countdownActive) {
    stopCountdown();
    showScreen('pause');
    return;
  }
  if (!state.isPlaying) return;
  stopTimer();
  state.isPlaying = false;
  showScreen('pause');
}

function resumeGame() {
  showScreen('game');
  if (!state.currentWord) {
    // カウントダウン中にポーズした場合はカウントダウンをやり直す
    startCountdown();
    return;
  }
  state.isPlaying = true;
  startTimer();
  setTimeout(() => el.typingInput.focus(), 50);
}

// ================================
// Input Handling
// ================================
function handleTypingInput(event) {
  if (!state.isPlaying) return;
  if (!state.currentWord) return; // 次の単語を待機中

  const typed = event.target.value;
  const isInsertion = state._insertPending;
  state._insertPending = false;
  if (isInsertion) state.totalKeystrokes++;

  // 間違えた文字を即座に除去して最後の正しいプレフィックスに戻す
  if (!state.currentWord.startsWith(typed)) {
    const alt = state.currentWordAlts.find(a => a.startsWith(typed));
    if (alt) {
      state.currentWord = alt;
      // fall through to render and completion check
    } else {
      playSound('miss');
      state.currentWordMissed = true;
      if (state.gameType === 'battle') {
        state.combo = 0;
        renderCombo();
        triggerAnimation(el.battleFlash, 'anim-flash');
        screenShake('mid');
        state.playerHp = Math.max(0, state.playerHp - CONFIG.missDamage);
        renderHp();
        popFloatingText(`-${CONFIG.missDamage}`, 'damage');
        if (state.playerHp <= 0) { endGame(); return; }
      }
      let i = 0;
      while (i < typed.length && typed[i] === state.currentWord[i]) i++;
      el.typingInput.value = typed.slice(0, i);
      renderWordProgress(el.typingInput.value);
      return;
    }
  }

  if (isInsertion) state.correctKeystrokes++;
  renderWordProgress(typed);

  if (typed !== state.currentWord) {
    playSound('key');
    return;
  }

  // 正解
  playSound('correct');
  state.score++;
  renderScore();

  const correctWord = state.currentWord;
  state.lastWord = state.currentWord;
  state.currentWord = '';
  el.typingInput.value = '';
  el.currentWord.textContent = correctWord;
  triggerAnimation(el.currentWord, 'anim-correct');

  if (state.gameType === 'battle') {
    state.combo++;
    renderCombo();
    if (state.combo >= 2) triggerAnimation(el.comboDisplay, 'anim-combo-pop');
    if (!state.currentWordMissed && state.playerHp < CONFIG.maxHp) {
      state.playerHp = Math.min(CONFIG.maxHp, state.playerHp + CONFIG.healOnClear);
      renderHp();
      popFloatingText(`+${CONFIG.healOnClear}`, 'heal');
    }
    triggerAnimation(el.enemyArea, 'anim-enemy-hit');
    state.enemyHp = Math.max(0, state.enemyHp - CONFIG.wordDamage);
    renderEnemyHp();
    popFloatingText(`-${CONFIG.wordDamage}`, 'hit', el.enemyArea);
    spawnParticles(el.enemyArea, { count: 10 + Math.min(state.combo * 2, 16) });
    screenShake('light');
    state.isPlaying = false;
    stopTimer();
    state.timeLeft = state.wordTimeLimit;
    renderTimer();
    el.typingInput.disabled = true;
    clearTimeout(state.wordTimerId);
    if (state.enemyHp <= 0) {
      state.wordTimerId = setTimeout(enemyDefeated, CONFIG.correctAnimMs);   // 撃破→次の敵
    } else {
      state.wordTimerId = setTimeout(nextWordSameEnemy, CONFIG.correctAnimMs); // 同じ敵の次のお題
    }
    return;
  }

  clearTimeout(state.wordTimerId);
  state.wordTimerId = setTimeout(showNextWord, CONFIG.correctAnimMs);
}

function handleBeforeInput(event) {
  if (!state.isPlaying) return;
  if (!event.inputType.startsWith('insert')) return;
  if (!state.currentWord) { event.preventDefault(); return; }
  state._insertPending = true;
}

// ================================
// Mode Selection
// ================================
function handleModeSelection(event) {
  const btn = event.target.closest('.mode-btn');
  if (!btn) return;

  state.mode = btn.dataset.mode;

  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  el.modeDescription.textContent = MODE_DESCRIPTIONS[state.mode];
}

// ================================
// Event Listeners
// ================================
function initEventListeners() {
  el.gametypeBtnGroup.addEventListener('click', (event) => {
    const btn = event.target.closest('.gametype-btn');
    if (!btn) return;
    state.gameType = btn.dataset.type;
    el.gametypeBtnGroup.querySelectorAll('.gametype-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    syncStartScreenUI();
  });
  el.modeButtonGroup.addEventListener('click', handleModeSelection);
  el.startBtn.addEventListener('click', startGame);
  el.typingInput.addEventListener('beforeinput', handleBeforeInput);
  el.typingInput.addEventListener('input', handleTypingInput);
  el.restartBtn.addEventListener('click', resetToStart);
  screens.game.addEventListener('click', () => {
    if (state.isPlaying) el.typingInput.focus();
  });
  el.soundBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    try { localStorage.setItem(SOUND_KEY, state.soundEnabled ? 'on' : 'off'); } catch { /* ignore */ }
    el.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
    el.soundBtn.classList.toggle('muted', !state.soundEnabled);
  });
  el.pauseBtn.addEventListener('click', pauseGame);
  el.resumeBtn.addEventListener('click', resumeGame);
  el.retryBtn.addEventListener('click', startGame);
  el.homeBtn.addEventListener('click', resetToStart);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (state.isPlaying || state.countdownActive) pauseGame();
    else if (screens.pause.classList.contains('active')) resumeGame();
  });
}

// ================================
// Init
// ================================
function init() {
  initEventListeners();
  el.soundBtn.textContent = state.soundEnabled ? '🔊' : '🔇';
  el.soundBtn.classList.toggle('muted', !state.soundEnabled);
  showScreen('start');
}

init();
