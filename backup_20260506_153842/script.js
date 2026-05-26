// ================================
// Data
// ================================
// 難易度はローマ字の文字数で分類: easy≤11, normal 12-17, hard 18+
const WORD_LISTS = {
  easy: [
    { ja: '猫がいる',     ro: 'nekogairu',    ruby: '<ruby>猫<rt>ねこ</rt></ruby>がいる' },
    { ja: '空は青い',     ro: 'sorahaaoi',    ruby: '<ruby>空<rt>そら</rt></ruby>は<ruby>青<rt>あお</rt></ruby>い' },
    { ja: '雨が降る',     ro: 'amegahuru',    ruby: '<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る' },
    { ja: '海は広い',     ro: 'umihahiroi',   ruby: '<ruby>海<rt>うみ</rt></ruby>は<ruby>広<rt>ひろ</rt></ruby>い' },
    { ja: '花が咲く',     ro: 'hanagasaku',   ruby: '<ruby>花<rt>はな</rt></ruby>が<ruby>咲<rt>さ</rt></ruby>く' },
    { ja: '風が吹く',     ro: 'kazegahuku',   ruby: '<ruby>風<rt>かぜ</rt></ruby>が<ruby>吹<rt>ふ</rt></ruby>く' },
    { ja: '水を飲む',     ro: 'mizuwonomu',   ruby: '<ruby>水<rt>みず</rt></ruby>を<ruby>飲<rt>の</rt></ruby>む' },
    { ja: '雪が降る',     ro: 'yukigahuru',   ruby: '<ruby>雪<rt>ゆき</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>る' },
    { ja: '日が沈む',     ro: 'higasizumu',   ruby: '<ruby>日<rt>ひ</rt></ruby>が<ruby>沈<rt>しず</rt></ruby>む' },
    { ja: '鳥が飛ぶ',     ro: 'torigatobu',   ruby: '<ruby>鳥<rt>とり</rt></ruby>が<ruby>飛<rt>と</rt></ruby>ぶ' },
    { ja: '木が茂る',     ro: 'kigasigeru',   ruby: '<ruby>木<rt>き</rt></ruby>が<ruby>茂<rt>しげ</rt></ruby>る' },
    { ja: '月が出る',     ro: 'tukigaderu',   ruby: '<ruby>月<rt>つき</rt></ruby>が<ruby>出<rt>で</rt></ruby>る' },
    { ja: '雲が湧く',     ro: 'kumogawaku',   ruby: '<ruby>雲<rt>くも</rt></ruby>が<ruby>湧<rt>わ</rt></ruby>く' },
    { ja: '虫が鳴く',     ro: 'musiganaku',   ruby: '<ruby>虫<rt>むし</rt></ruby>が<ruby>鳴<rt>な</rt></ruby>く' },
    { ja: '春が来た',     ro: 'harugakita',   ruby: '<ruby>春<rt>はる</rt></ruby>が<ruby>来<rt>き</rt></ruby>た' },
    { ja: '夏が来る',     ro: 'natugakuru',   ruby: '<ruby>夏<rt>なつ</rt></ruby>が<ruby>来<rt>く</rt></ruby>る' },
    { ja: '犬が走る',     ro: 'inugahasiru',  ruby: '<ruby>犬<rt>いぬ</rt></ruby>が<ruby>走<rt>はし</rt></ruby>る' },
    { ja: '山が高い',     ro: 'yamagatakai',  ruby: '<ruby>山<rt>やま</rt></ruby>が<ruby>高<rt>たか</rt></ruby>い' },
    { ja: '学校に行く',   ro: 'gakkouniiku',  ruby: '<ruby>学校<rt>がっこう</rt></ruby>に<ruby>行<rt>い</rt></ruby>く' },
    { ja: '掃除をする',   ro: 'soujiwosuru',  ruby: '<ruby>掃除<rt>そうじ</rt></ruby>をする' },
    { ja: 'ピアノを弾く', ro: 'pianowohiku',  ruby: 'ピアノを<ruby>弾<rt>ひ</rt></ruby>く' },
  ],
  normal: [
    { ja: '星が光る',         ro: 'hosigahikaru',     ruby: '<ruby>星<rt>ほし</rt></ruby>が<ruby>光<rt>ひか</rt></ruby>る' },
    { ja: '音楽を聴く',       ro: 'ongakuwokiku',     ruby: '<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聴<rt>き</rt></ruby>く' },
    { ja: 'コーヒーを飲む',   ro: 'ko-hi-wonomu',     ruby: 'コーヒーを<ruby>飲<rt>の</rt></ruby>む' },
    { ja: '手紙を書く',       ro: 'tegamiwokaku',     ruby: '<ruby>手紙<rt>てがみ</rt></ruby>を<ruby>書<rt>か</rt></ruby>く' },
    { ja: '電車に乗る',       ro: 'densyaninoru',     ruby: '<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>乗<rt>の</rt></ruby>る' },
    { ja: '買い物に行く',     ro: 'kaimononiiku',     ruby: '<ruby>買<rt>か</rt></ruby>い<ruby>物<rt>もの</rt></ruby>に<ruby>行<rt>い</rt></ruby>く' },
    { ja: '映画を見に行く',   ro: 'eigawominiiku',    ruby: '<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>く' },
    { ja: 'スポーツをする',   ro: 'supo-tuwosuru',    ruby: 'スポーツをする' },
    { ja: 'ご飯を食べる',     ro: 'gohanwotaberu',    ruby: 'ご<ruby>飯<rt>はん</rt></ruby>を<ruby>食<rt>た</rt></ruby>べる' },
    { ja: '早起きをする',     ro: 'hayaokiwosuru',    ruby: '<ruby>早起<rt>はやお</rt></ruby>きをする' },
    { ja: '川が流れる',       ro: 'kawaganagareru',   ruby: '<ruby>川<rt>かわ</rt></ruby>が<ruby>流<rt>なが</rt></ruby>れる' },
    { ja: '宿題をする',       ro: 'syukudaiwosuru',   ruby: '<ruby>宿題<rt>しゅくだい</rt></ruby>をする' },
    { ja: '料理を作る',       ro: 'ryouriwotukuru',   ruby: '<ruby>料理<rt>りょうり</rt></ruby>を<ruby>作<rt>つく</rt></ruby>る' },
    { ja: '友達と遊ぶ',       ro: 'tomodatitoasobu',  ruby: '<ruby>友達<rt>ともだち</rt></ruby>と<ruby>遊<rt>あそ</rt></ruby>ぶ' },
    { ja: '散歩に出かける',   ro: 'sanponidekakeru',  ruby: '<ruby>散歩<rt>さんぽ</rt></ruby>に<ruby>出<rt>で</rt></ruby>かける' },
    { ja: '絵を描くのが好き', ro: 'ewokakunogasuki',  ruby: '<ruby>絵<rt>え</rt></ruby>を<ruby>描<rt>か</rt></ruby>くのが<ruby>好<rt>す</rt></ruby>き' },
    { ja: '日本語を学ぶ',     ro: 'nihongowomanabu',  ruby: '<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>学<rt>まな</rt></ruby>ぶ' },
    { ja: '今日はいい天気です', ro: 'kyouhaiitenkidesu', ruby: '<ruby>今日<rt>きょう</rt></ruby>はいい<ruby>天気<rt>てんき</rt></ruby>です' },
    { ja: '本を読むのが好き',  ro: 'honwoyomunogasuki', ruby: '<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>むのが<ruby>好<rt>す</rt></ruby>き' },
  ],
  hard: [
    { ja: '今日の天気はとてもいいですね',       ro: 'kyounotenkihatotemoiidesune',              ruby: '<ruby>今日<rt>きょう</rt></ruby>の<ruby>天気<rt>てんき</rt></ruby>はとてもいいですね' },
    { ja: '青い空に白い雲が浮かんでいる',       ro: 'aoisoranisiroikumogaukandeiru',             ruby: '<ruby>青<rt>あお</rt></ruby>い<ruby>空<rt>そら</rt></ruby>に<ruby>白<rt>しろ</rt></ruby>い<ruby>雲<rt>くも</rt></ruby>が<ruby>浮<rt>う</rt></ruby>かんでいる' },
    { ja: '図書館で本を借りて読んだ',           ro: 'tosyokandehonwokariteyonda',                ruby: '<ruby>図書館<rt>としょかん</rt></ruby>で<ruby>本<rt>ほん</rt></ruby>を<ruby>借<rt>か</rt></ruby>りて<ruby>読<rt>よ</rt></ruby>んだ' },
    { ja: '友達と一緒に映画を見に行く',         ro: 'tomodatitoissyonieigawominiiku',             ruby: '<ruby>友達<rt>ともだち</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>映画<rt>えいが</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>く' },
    { ja: '毎朝早起きして散歩する習慣がある',   ro: 'maiasahayaokisitesanposurusyuukangaaru',    ruby: '<ruby>毎朝<rt>まいあさ</rt></ruby><ruby>早起<rt>はやお</rt></ruby>きして<ruby>散歩<rt>さんぽ</rt></ruby>する<ruby>習慣<rt>しゅうかん</rt></ruby>がある' },
    { ja: '新しい言語を学ぶのは楽しい',         ro: 'atarasiigengowomanabunohatanosii',          ruby: '<ruby>新<rt>あたら</rt></ruby>しい<ruby>言語<rt>げんご</rt></ruby>を<ruby>学<rt>まな</rt></ruby>ぶのは<ruby>楽<rt>たの</rt></ruby>しい' },
    { ja: '春になると桜の花がきれいに咲く',     ro: 'haruninarutosakuranohanagakireinisaku',     ruby: '<ruby>春<rt>はる</rt></ruby>になると<ruby>桜<rt>さくら</rt></ruby>の<ruby>花<rt>はな</rt></ruby>がきれいに<ruby>咲<rt>さ</rt></ruby>く' },
    { ja: '電車の中で音楽を聴きながら本を読む', ro: 'densyanonakadeongakuwokikinagarahonwoyomu', ruby: '<ruby>電車<rt>でんしゃ</rt></ruby>の<ruby>中<rt>なか</rt></ruby>で<ruby>音楽<rt>おんがく</rt></ruby>を<ruby>聴<rt>き</rt></ruby>きながら<ruby>本<rt>ほん</rt></ruby>を<ruby>読<rt>よ</rt></ruby>む' },
    { ja: '料理をするのが趣味のひとつです',     ro: 'ryouriwosurunogasyuminohitotudesu',         ruby: '<ruby>料理<rt>りょうり</rt></ruby>をするのが<ruby>趣味<rt>しゅみ</rt></ruby>のひとつです' },
    { ja: '夕日が山の向こうに沈んでいった',     ro: 'yuuhigayamanomukounisizundeitta',           ruby: '<ruby>夕日<rt>ゆうひ</rt></ruby>が<ruby>山<rt>やま</rt></ruby>の<ruby>向<rt>む</rt></ruby>こうに<ruby>沈<rt>しず</rt></ruby>んでいった' },
    { ja: '週末は家族でピクニックに行く予定だ', ro: 'syuumatuhakazokudepikunikuniikuyoteida',    ruby: '<ruby>週末<rt>しゅうまつ</rt></ruby>は<ruby>家族<rt>かぞく</rt></ruby>でピクニックに<ruby>行<rt>い</rt></ruby>く<ruby>予定<rt>よてい</rt></ruby>だ' },
    { ja: '海の波の音を聞きながら散歩した',     ro: 'uminonaminootowokikinagarasanposita',       ruby: '<ruby>海<rt>うみ</rt></ruby>の<ruby>波<rt>なみ</rt></ruby>の<ruby>音<rt>おと</rt></ruby>を<ruby>聞<rt>き</rt></ruby>きながら<ruby>散歩<rt>さんぽ</rt></ruby>した' },
    { ja: '冬の寒い朝に温かいお茶を飲む',       ro: 'huyunosamuiasaniatatakaiotyawonomu',       ruby: '<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>寒<rt>さむ</rt></ruby>い<ruby>朝<rt>あさ</rt></ruby>に<ruby>温<rt>あたた</rt></ruby>かいお<ruby>茶<rt>ちゃ</rt></ruby>を<ruby>飲<rt>の</rt></ruby>む' },
    { ja: '夜空に輝く星を眺めるのが好きだ',     ro: 'yozoranikagayakuhosiwonagamerunogasukida',  ruby: '<ruby>夜空<rt>よぞら</rt></ruby>に<ruby>輝<rt>かがや</rt></ruby>く<ruby>星<rt>ほし</rt></ruby>を<ruby>眺<rt>なが</rt></ruby>めるのが<ruby>好<rt>す</rt></ruby>きだ' },
    { ja: '努力すれば必ず夢はかなうと思う',     ro: 'doryokusurebakanarazuyumehakanautoomou',    ruby: '<ruby>努力<rt>どりょく</rt></ruby>すれば<ruby>必<rt>かなら</rt></ruby>ず<ruby>夢<rt>ゆめ</rt></ruby>はかなうと<ruby>思<rt>おも</rt></ruby>う' },
  ]
};

const MODE_DESCRIPTIONS = {
  easy:   '短い文（ローマ字10文字前後）',
  normal: '中くらいの文（ローマ字12〜17文字）',
  hard:   '長い文（ローマ字18文字以上）'
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
];

function generateAlternates(ro) {
  const variants = new Set([ro]);
  for (const [a, b] of ROMAJI_ALTERNATES) {
    for (const v of [...variants]) {
      if (v.includes(a)) variants.add(v.replace(new RegExp(a, 'g'), b));
      if (v.includes(b)) variants.add(v.replace(new RegExp(b, 'g'), a));
    }
  }
  return [...variants];
}

const GAME_DURATION = 60;
const WARNING_THRESHOLD = 10;
const CORRECT_ANIM_MS = 280; // style.css の anim-correct (0.28s) と対応

const BATTLE_MAX_HP        = 100;
const BATTLE_DAMAGE_ENEMY  = 10;
const BATTLE_DAMAGE_PLAYER = 5;
const SPECIAL_DAMAGE          = 30;
const SPECIAL_GAUGE_MAX       = 100;
const SPECIAL_GAUGE_BASE      = 10;
const LEVELS = [
  { id: 1, name: 'スライム',     emoji: '🟢', hp: 80,  attack: 4,  interval: 3500, desc: 'はじめての相手' },
  { id: 2, name: '強化スライム', emoji: '🟢', hp: 100, attack: 5,  interval: 3200, desc: '少し強くなったスライム' },
  { id: 3, name: 'ゴーレム',     emoji: '🗿', hp: 120, attack: 6,  interval: 4000, desc: 'HPが高い岩の敵' },
  { id: 4, name: '強化ゴーレム', emoji: '🗿', hp: 150, attack: 7,  interval: 3600, desc: '攻守ともに強い敵' },
  { id: 5, name: 'ドラゴン',     emoji: '🐉', hp: 180, attack: 8,  interval: 3000, desc: '強力なボス', boss: true,
    phase2: { name: '怒れるドラゴン', emoji: '🔥🐉', attack: 11, interval: 2500 } },
  { id: 6, name: '真ドラゴン',   emoji: '🐲', hp: 220, attack: 10, interval: 2800, desc: '最終ボス', boss: true,
    phase2: { name: '真ドラゴン・覚醒', emoji: '💀🐲', attack: 13, interval: 2300 } },
];

const STORAGE_KEY = 'typeRushUnlockedLevel';
function getUnlockedLevel() { return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10); }
function setUnlockedLevel(idx) { localStorage.setItem(STORAGE_KEY, String(idx)); }

let audioCtx = null;
function playSound(type) {
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
  mode: 'easy',
  gameType: 'normal',
  score: 0,
  timeLeft: GAME_DURATION,
  currentWord: '',
  currentWordAlts: [],
  selectedLevel: 0,
  playerHp: BATTLE_MAX_HP,
  enemyHp: BATTLE_MAX_HP,
  combo: 0,
  specialGauge: 0,
  phase2Triggered: false,
  isPlaying: false,
  timerId: null,
  wordTimerId: null,
  enemyAttackTimerId: null
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
  gametypeBtnGroup: document.querySelector('.gametype-selector'),
  modeButtonGroup:  document.querySelector('.mode-buttons'),
  modeDescription:  document.getElementById('mode-description'),
  startBtn:         document.getElementById('start-btn'),
  timerValue:       document.getElementById('timer-value'),
  scoreValue:       document.getElementById('score-value'),
  currentWordJa:    document.getElementById('current-word-ja'),
  currentWord:      document.getElementById('current-word'),
  typingInput:      document.getElementById('typing-input'),
  hpArea:           document.getElementById('hp-area'),
  enemyHpLabel:     document.getElementById('enemy-hp-label'),
  playerHpBar:      document.getElementById('player-hp-bar'),
  playerHpValue:    document.getElementById('player-hp-value'),
  enemyHpBar:       document.getElementById('enemy-hp-bar'),
  enemyHpValue:     document.getElementById('enemy-hp-value'),
  finalScoreValue:  document.getElementById('final-score-value'),
  resultMessage:    document.getElementById('result-message'),
  battleResult:     document.getElementById('battle-result'),
  battleEnemyInfo:  document.getElementById('battle-enemy-info'),
  battleOutcome:    document.getElementById('battle-outcome'),
  battleHpSummary:  document.getElementById('battle-hp-summary'),
  enemyArea:        document.getElementById('enemy-area'),
  levelSelector:    document.getElementById('level-selector'),
  levelList:        document.getElementById('level-list'),
  levelProgress:    document.getElementById('level-progress'),
  levelClearMsg:    document.getElementById('level-clear-msg'),
  battleExtras:     document.getElementById('battle-extras'),
  comboDisplay:     document.getElementById('combo-display'),
  specialGaugeBar:  document.getElementById('special-gauge-bar'),
  specialBtn:       document.getElementById('special-btn'),
  battleFlash:      document.getElementById('battle-flash'),
  specialFlash:     document.getElementById('special-flash'),
  battleEndOverlay: document.getElementById('battle-end-overlay'),
  battleEndText:    document.getElementById('battle-end-text'),
  phase2Msg:        document.getElementById('phase2-msg'),
  restartBtn:       document.getElementById('restart-btn'),
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
function renderTimer() {
  el.timerValue.textContent = state.timeLeft;
  el.timerValue.classList.toggle('warning', state.timeLeft <= WARNING_THRESHOLD);
}

function renderScore() {
  el.scoreValue.textContent = state.score;
}

function renderHp() {
  const p = Math.max(0, state.playerHp);
  const e = Math.max(0, state.enemyHp);
  const maxEnemyHp = LEVELS[state.selectedLevel].hp;
  el.playerHpBar.style.width   = p + '%';
  el.playerHpValue.textContent = p;
  el.enemyHpBar.style.width    = Math.round(e / maxEnemyHp * 100) + '%';
  el.enemyHpValue.textContent  = e;
}

function enemyCurrentData() {
  const lv = LEVELS[state.selectedLevel];
  return (state.phase2Triggered && lv.phase2) ? lv.phase2 : lv;
}

function startEnemyAttack() {
  clearInterval(state.enemyAttackTimerId);
  state.enemyAttackTimerId = setInterval(enemyAttack, enemyCurrentData().interval);
}

function stopEnemyAttack() {
  clearInterval(state.enemyAttackTimerId);
  state.enemyAttackTimerId = null;
}

function enemyAttack() {
  if (!state.isPlaying) return;
  triggerAnimation(el.battleFlash, 'anim-flash');
  state.playerHp = Math.max(0, state.playerHp - enemyCurrentData().attack);
  renderHp();
  if (state.playerHp <= 0) endGame();
}

function renderCombo() {
  el.comboDisplay.textContent = state.combo >= 2 ? `🔥 ${state.combo} コンボ！` : '';
}

function renderSpecialGauge() {
  const pct = Math.min(SPECIAL_GAUGE_MAX, state.specialGauge);
  el.specialGaugeBar.style.width = pct + '%';
  const ready = pct >= SPECIAL_GAUGE_MAX;
  el.specialBtn.disabled = !ready;
  el.specialBtn.classList.toggle('ready', ready);
}

function triggerAnimation(element, className) {
  element.classList.remove(className);
  void element.offsetWidth; // DOMの再描画を強制してアニメーションをリセット
  element.classList.add(className);
}

function checkPhase2() {
  if (state.phase2Triggered) return;
  const lv = LEVELS[state.selectedLevel];
  if (!lv.boss) return;
  if (state.enemyHp <= lv.hp * 0.5) triggerPhase2();
}

function triggerPhase2() {
  state.phase2Triggered = true;
  const p2 = LEVELS[state.selectedLevel].phase2;
  el.enemyArea.textContent    = p2.emoji;
  el.enemyHpLabel.textContent = p2.name;
  el.phase2Msg.textContent    = '⚡ 第2形態！';
  el.phase2Msg.style.display  = 'block';
  triggerAnimation(el.phase2Msg, 'anim-phase2');
  setTimeout(() => { el.phase2Msg.style.display = 'none'; }, 2000);
  startEnemyAttack();
}

function renderLevelSelector() {
  const unlocked = getUnlockedLevel();
  el.levelProgress.textContent = `最高到達: Lv ${unlocked + 1}`;
  el.levelList.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    const isUnlocked = i <= unlocked;
    const isSelected = i === state.selectedLevel;
    const btn = document.createElement('button');
    btn.className = 'level-card' + (isUnlocked ? '' : ' locked') + (isSelected ? ' active' : '');
    if (!isUnlocked) btn.disabled = true;
    btn.dataset.level = i;
    btn.innerHTML =
      `<span class="lv-badge">Lv ${lv.id}</span>` +
      `<span class="lv-emoji">${isUnlocked ? lv.emoji : '🔒'}</span>` +
      `<span class="lv-name">${isUnlocked ? lv.name : '???'}</span>` +
      `<span class="lv-desc">${isUnlocked ? lv.desc : 'まだ未解放'}</span>`;
    el.levelList.appendChild(btn);
  });
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
  const words = WORD_LISTS[state.mode];
  let word;
  do {
    word = words[Math.floor(Math.random() * words.length)];
  } while (word.ro === state.currentWord && words.length > 1);
  return word;
}

function showNextWord() {
  const word = pickRandomWord();
  state.currentWord = word.ro;
  state.currentWordAlts = generateAlternates(word.ro);
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
  renderTimer();
  if (state.timeLeft <= 0) {
    endGame();
  }
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(tick, 1000);
}

function stopTimer() {
  clearInterval(state.timerId);
  state.timerId = null;
}

// ================================
// Game Flow
// ================================
function startGame() {
  clearTimeout(state.wordTimerId);
  state.score = 0;
  state.timeLeft = GAME_DURATION;
  state.isPlaying = true;

  if (state.gameType === 'battle') {
    const lv = LEVELS[state.selectedLevel];
    state.playerHp        = BATTLE_MAX_HP;
    state.enemyHp         = lv.hp;
    state.combo           = 0;
    state.specialGauge    = 0;
    state.phase2Triggered = false;
    el.enemyArea.textContent      = lv.emoji;
    el.enemyHpLabel.textContent   = lv.name;
    renderHp();
    renderCombo();
    renderSpecialGauge();
    el.hpArea.style.display        = 'flex';
    el.enemyArea.style.display     = 'block';
    el.battleExtras.style.display  = 'flex';
    startEnemyAttack();
  } else {
    el.hpArea.style.display        = 'none';
    el.enemyArea.style.display     = 'none';
    el.battleExtras.style.display  = 'none';
  }
  el.battleEndOverlay.style.display = 'none';

  renderTimer();
  renderScore();

  el.typingInput.value = '';
  el.typingInput.disabled = false;

  showScreen('game');
  showNextWord();

  // 画面表示後にフォーカス
  setTimeout(() => el.typingInput.focus(), 80);
  startTimer();
}

function endGame() {
  stopTimer();
  stopEnemyAttack();
  clearTimeout(state.wordTimerId);
  state.wordTimerId = null;
  state.isPlaying = false;

  el.typingInput.disabled = true;

  el.finalScoreValue.textContent = state.score;

  if (state.gameType === 'battle') {
    const p = Math.max(0, state.playerHp);
    const e = Math.max(0, state.enemyHp);
    const lv = LEVELS[state.selectedLevel];
    let outcome;
    const bossKill = e <= 0 && lv.boss && state.phase2Triggered;
    if (bossKill)        outcome = '完全勝利！！';
    else if (e <= 0)     outcome = '勝利！';
    else if (p <= 0)     outcome = '敗北...';
    else if (p > e)      outcome = '勝利！';
    else if (p < e)      outcome = '敗北...';
    else                 outcome = '引き分け';
    el.battleEnemyInfo.textContent = `${lv.emoji} ${lv.name} との戦い`;
    el.battleOutcome.textContent   = outcome;
    el.battleHpSummary.textContent = `あなた: ${p}HP  /  てき: ${e}HP`;
    el.resultMessage.textContent   = '';
    el.battleResult.style.display  = 'block';

    const isWin = outcome === '勝利！' || outcome === '完全勝利！！';
    if (isWin) {
      const unlockedLevel = getUnlockedLevel();
      const nextIdx = state.selectedLevel + 1;
      if (nextIdx < LEVELS.length && nextIdx > unlockedLevel) {
        setUnlockedLevel(nextIdx);
        el.levelClearMsg.textContent = `⭐ Level ${lv.id} クリア！ → Level ${nextIdx + 1} 解放！`;
      } else if (nextIdx >= LEVELS.length) {
        el.levelClearMsg.textContent = `🏆 全レベル制覇！ 最強のタイピスト！`;
      } else {
        el.levelClearMsg.textContent = `⭐ Level ${lv.id} クリア！`;
      }
      el.levelClearMsg.style.display = 'block';
    } else {
      el.levelClearMsg.style.display = 'none';
    }

    el.battleEndText.textContent = outcome;
    el.battleEndText.style.color = outcome === '完全勝利！！' ? 'var(--accent)'
      : isWin ? 'var(--easy)'
      : outcome === '引き分け' ? 'var(--accent)'
      : 'var(--hard)';
    el.battleEndOverlay.style.display = 'flex';
    setTimeout(() => {
      el.battleEndOverlay.style.display = 'none';
      showScreen('result');
    }, 1500);
  } else {
    el.resultMessage.textContent  = getResultMessage(state.score);
    el.battleResult.style.display = 'none';
    setTimeout(() => showScreen('result'), 350);
  }
}

function resetToStart() {
  stopTimer();
  stopEnemyAttack();
  clearTimeout(state.wordTimerId);
  state.isPlaying = false;
  if (state.gameType === 'battle') {
    renderLevelSelector();
    el.levelSelector.style.display = 'block';
  }
  showScreen('start');
}

function pauseGame() {
  if (!state.isPlaying) return;
  stopTimer();
  stopEnemyAttack();
  state.isPlaying = false;
  showScreen('pause');
}

function resumeGame() {
  state.isPlaying = true;
  showScreen('game');
  startTimer();
  if (state.gameType === 'battle') startEnemyAttack();
  setTimeout(() => el.typingInput.focus(), 50);
}

// ================================
// Input Handling
// ================================
function handleTypingInput(event) {
  if (!state.isPlaying) return;
  if (!state.currentWord) return; // 次の単語を待機中

  const typed = event.target.value;

  // 間違えた文字を即座に除去して最後の正しいプレフィックスに戻す
  if (!state.currentWord.startsWith(typed)) {
    const alt = state.currentWordAlts.find(a => a.startsWith(typed));
    if (alt) {
      state.currentWord = alt;
      // fall through to render and completion check
    } else {
      playSound('miss');
      if (state.gameType === 'battle') {
        state.combo = 0;
        renderCombo();
        triggerAnimation(el.battleFlash, 'anim-flash');
        state.playerHp = Math.max(0, state.playerHp - BATTLE_DAMAGE_PLAYER);
        renderHp();
        if (state.playerHp <= 0) { endGame(); return; }
      }
      let i = 0;
      while (i < typed.length && typed[i] === state.currentWord[i]) i++;
      el.typingInput.value = typed.slice(0, i);
      renderWordProgress(el.typingInput.value);
      return;
    }
  }

  renderWordProgress(typed);

  if (typed !== state.currentWord) {
    playSound('key');
    return;
  }

  // 正解
  playSound('correct');
  state.score++;
  renderScore();

  if (state.gameType === 'battle') {
    state.combo++;
    const gaugeGain = SPECIAL_GAUGE_BASE + Math.floor(state.combo / 5);
    state.specialGauge = Math.min(SPECIAL_GAUGE_MAX, state.specialGauge + gaugeGain);
    renderCombo();
    renderSpecialGauge();
    triggerAnimation(el.enemyArea, 'anim-enemy-hit');
    state.enemyHp = Math.max(0, state.enemyHp - BATTLE_DAMAGE_ENEMY);
    renderHp();
    if (state.enemyHp <= 0) { endGame(); return; }
    checkPhase2();
    startEnemyAttack();
  }

  const correctWord = state.currentWord;
  state.currentWord = ''; // 待機中に同じ単語を再入力してもマッチしないようにロック
  el.typingInput.value = '';

  el.currentWord.textContent = correctWord; // spanを外してアニメーションのため平テキストに戻す
  triggerAnimation(el.currentWord, 'anim-correct');

  // 既存の予約をキャンセルしてから新たに予約（多重呼び出し防止）
  clearTimeout(state.wordTimerId);
  state.wordTimerId = setTimeout(showNextWord, CORRECT_ANIM_MS);
}

function useSpecial() {
  if (!state.isPlaying || state.specialGauge < SPECIAL_GAUGE_MAX) return;
  state.specialGauge = 0;
  renderSpecialGauge();
  triggerAnimation(el.specialFlash, 'anim-special');
  triggerAnimation(el.enemyArea, 'anim-enemy-hit');
  state.enemyHp = Math.max(0, state.enemyHp - SPECIAL_DAMAGE);
  renderHp();
  if (state.enemyHp <= 0) { endGame(); return; }
  checkPhase2();
  setTimeout(() => el.typingInput.focus(), 50);
}

function handleBeforeInput(event) {
  if (!state.isPlaying) return;
  if (!event.inputType.startsWith('insert')) return; // 削除系は常に許可
  if (!state.currentWord) event.preventDefault(); // 待機中はすべての入力をブロック
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
    document.querySelectorAll('.gametype-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (state.gameType === 'battle') {
      renderLevelSelector();
      el.levelSelector.style.display = 'block';
    } else {
      el.levelSelector.style.display = 'none';
    }
  });
  el.levelList.addEventListener('click', (event) => {
    const btn = event.target.closest('.level-card');
    if (!btn || btn.disabled) return;
    state.selectedLevel = parseInt(btn.dataset.level, 10);
    el.levelList.querySelectorAll('.level-card').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
  el.modeButtonGroup.addEventListener('click', handleModeSelection);
  el.startBtn.addEventListener('click', startGame);
  el.typingInput.addEventListener('beforeinput', handleBeforeInput);
  el.typingInput.addEventListener('input', handleTypingInput);
  el.restartBtn.addEventListener('click', resetToStart);
  screens.game.addEventListener('click', () => {
    if (state.isPlaying) el.typingInput.focus();
  });
  el.specialBtn.addEventListener('click', useSpecial);
  el.pauseBtn.addEventListener('click', pauseGame);
  el.resumeBtn.addEventListener('click', resumeGame);
  el.retryBtn.addEventListener('click', startGame);
  el.homeBtn.addEventListener('click', resetToStart);
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (state.isPlaying) pauseGame();
    else if (screens.pause.classList.contains('active')) resumeGame();
  });
}

// ================================
// Init
// ================================
function init() {
  initEventListeners();
  showScreen('start');
}

init();
