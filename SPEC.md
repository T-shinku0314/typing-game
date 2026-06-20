# TypeRush 仕様書

> このファイルは **実装（script.js / index.html / style.css）に合わせた現状の仕様** です。
> 機能を変更したら、このファイルも必ず更新してください（地図と現地を一致させる）。

## 1. プロジェクト概要

- 日本語のお題をローマ字で入力するタイピングゲーム
- バニラ JS / HTML / CSS のみ（外部ライブラリなし・ビルド不要）
- モードは2種類
  - **練習モード**（`gameType: 'normal'`）… 60秒間でどれだけ多く打てるかを競う
  - **ステージ攻略モード**（`gameType: 'battle'`）… お題ごとの制限時間と戦うHPバトル
- 練習モードの難易度は **5段階**（Rookie / Fighter / Veteran / Elite / Legend）
- お題データ `WORD_LISTS` は **難易度レベル 1〜15** で管理（各レベル10語）

---

## 2. ファイル構成

```
index.html   — 画面構造（4画面）+ オーバーレイ + スクリプト読み込み
style.css    — スタイル + アニメーション定義
words.js     — お題データ（WORD_LISTS）。script.js より先に読み込む
enemies.js   — 敵データ（各 *_SVG 定数 + STAGE_ENEMIES）。script.js より先に読み込む
script.js    — ゲームロジック全体（CONFIG / state / 入力処理 など）
SPEC.md      — 本ファイル
DEVELOPMENT_RULES.md — 開発時のルール
assets/      — 背景画像など

※ words.js / enemies.js は普通の <script> として index.html で script.js より前に
  読み込む（ES module ではない）。top-level の const はスクリプト間で共有されるため、
  script.js から WORD_LISTS / STAGE_ENEMIES をそのまま参照できる。
  この読み込み順を変えると script.js がデータを見つけられず壊れるので注意。
```

### index.html の画面構成

| ID | 役割 |
|----|------|
| `#screen-start` | スタート画面（ゲームタイプ・難易度選択） |
| `#screen-game` | ゲーム画面 |
| `#screen-pause` | ポーズ画面 |
| `#screen-result` | 結果画面 |

### ゲーム画面内の主要要素（表示順）

1. `.game-header` — スコア（練習）/ ステージ表示（バトル）/ サウンドボタン / ポーズボタン
2. `#hp-area` — HP バー **2本**（上=敵HP赤 `#enemy-hp-bar` / 下=自分HP緑 `#player-hp-bar`、バトル時のみ）
3. `#battle-extras` — コンボ表示（バトルモード時のみ）
4. `#enemy-area` — 敵キャラ SVG + 敵名（バトルモード時のみ）
5. `.center-content` → `.word-area`（日本語 + ローマ字）+ `.timer-bar-wrap`（タイマーバー）
6. `.input-area` — 入力欄（`height: 0` で非表示、フォーカスは維持）

> 注：必殺技ゲージ・必殺技ボタンは **現状ありません**（将来追加候補）。

### オーバーレイ（`<body>` 直下、`position: fixed`）

- `#countdown-overlay` — バトル開始前の「3・2・1・START!」カウントダウン
- `#battle-flash` — ミスタイプ時の赤フラッシュ
- `#battle-end-overlay` — 「敗北...」の全画面オーバーレイ

---

## 3. 実装済み機能一覧

- ゲームタイプ選択（練習モード / ステージ攻略モード）
- 難易度選択 Rookie / Fighter / Veteran / Elite / Legend（練習モード時のみ表示）
- ローマ字入力（複数表記対応・「ん」の nn 入力対応）
- フリガナ（ruby タグ）表示
- 入力進捗のカラー表示（緑=正解済み、赤=誤り、グレー=未入力）
- タイピング効果音（key / miss / correct、Web Audio で生成）
- サウンドのオン/オフ切り替え（localStorage に保存）
- ポーズ機能（ESC キー対応）
- 練習モード: タイマー警告（残り10秒で赤く点滅）
- 練習モード: ベストスコア保存
- バトルモード: 開始前カウントダウン（3・2・1・START!）
- バトルモード: お題ごとの制限時間（タイマーバーが減っていく）
- バトルモード: ステージ進行（クリアで次ステージへ）
- バトルモード: 5ステージごとに敵キャラ交代（全16種をループ）
- バトルモード: プレイヤー HP バー、ミス時の被ダメージ演出
- バトルモード: コンボシステム
- バトルモード: 到達ステージ（最高記録）保存

---

## 4. 練習モード（通常タイピング）の仕様

- 制限時間: **60秒**（`CONFIG.gameDuration`）
- 正解するたびにスコア +1
- タイマーバーは残り時間に応じて減少、残り10秒（`CONFIG.warningThreshold`）で赤く点滅
- タイムアップで結果画面へ（`setTimeout` 350ms 後）
- 終了後、スコアに応じてメッセージ（`RESULT_MESSAGES`）とベストスコアを表示

### 難易度（5段階）とお題レベルの対応

`TIER_DEFS` で定義。各ティアは難易度レベル3つ分のお題をまとめて出題する。

| ティア | 出題レベル | 説明 |
|--------|-----------|------|
| Rookie  | 1, 2, 3    | やさしい文でウォームアップ！ |
| Fighter | 4, 5, 6    | 少し長めの文に挑戦！ |
| Veteran | 7, 8, 9    | 歯ごたえのある長文！ |
| Elite   | 10, 11, 12 | 上級者向けの難文！ |
| Legend  | 13, 14, 15 | 最高難度に挑め！ |

> お題は難易度レベルが上がるほどローマ字が長くなる（レベル1=数文字、レベル15=数十文字）。

---

## 5. ステージ攻略モード（HPバトル）の仕様

**1ステージ＝1体の敵**。お題を制限時間内に正しく打ち切ると敵にダメージを与え、敵 HP を 0 にすると撃破して次の敵（次ステージ）へ進む。

### 基本数値

| 項目 | 値 | 定数（CONFIG） |
|------|----|----|
| プレイヤー開始 HP | 100 | `CONFIG.maxHp` |
| 敵の最大 HP | 100 | `CONFIG.enemyMaxHp` |
| お題1つ正解の与ダメージ | -20（100 / 20 = 5語で撃破） | `CONFIG.wordDamage` |
| ミスタイプ時のダメージ | -5 | `CONFIG.missDamage` |
| ノーミス正解時の回復 | +5（HP < 100 のとき） | `CONFIG.healOnClear` |
| お題ごとの制限時間 | `calcWordTimeLimit()` で算出（最低4秒） | `CONFIG.minWordTime`（最低値） |

### 流れ

1. 開始前にカウントダウン（3・2・1・START!）
2. お題が1つ表示され、制限時間（タイマーバー）が減り始める
3. 時間内に正しく打ち切る → **敵に `wordDamage` ダメージ**（敵HPバーが減る・黄色の「-20」がポップ）
4. 敵 HP がまだ残っていれば **同じ敵のまま次のお題**（`nextWordSameEnemy`）
5. 敵 HP が 0 になったら **撃破アニメ → 次の敵（次ステージ）へ**（`enemyDefeated` → `advanceToNextStage`、`currentStage++`、敵HP満タンで再登場）
6. 敵が代わるたびに難易度レベルも 1 上がる
7. これを繰り返す（**魔王の先は周回するエンドレス。勝利という終わりは現状なし**）

### 難易度レベルと敵の決まり方（`getStageData`）

```
diffLevel = min(15, stage)            // 出題するお題レベル
enemyIdx  = (stage - 1) % 16          // 敵キャラ（STAGE_ENEMIES の番号）
```

- 1ステージごとに敵が交代し、難易度も1つ上がる（slime=Lv1 … 魔王=Lv15）
- 敵は `STAGE_ENEMIES`（16種）を順番に使い、一巡したら最初に戻る（難易度は15で頭打ち）
- 弱い順: スライム → スライムキング → ゴブリン → … → フェニックス → 魔王

### 制限時間の計算（`calcWordTimeLimit`）

お題のローマ字文字数 `roLength` と `diffLevel` から秒数を算出（最低4秒）。
難易度が上がるほど1文字あたりの猶予が短くなる。

| diffLevel | 計算式 |
|-----------|--------|
| 1〜3   | roLength × 0.325 + 3 |
| 4〜6   | roLength × 0.275 + 2.5 |
| 7〜9   | roLength × 0.24 + 2 |
| 10〜12 | roLength × 0.21 + 1.5 |
| 13〜15 | roLength × 0.18 + 1 |

### コンボシステム

- 正解ごとにコンボ +1
- ミスタイプでコンボ 0 にリセット
- 2コンボ以上で「🔥 N コンボ！」を表示

### ゲーム終了（敗北）のトリガー

1. **ミスタイプでプレイヤー HP が 0 になった**（即終了）
2. **お題の制限時間が切れた**（`timeLeft <= 0` → 即終了）

終了時は「敗北...」を全画面オーバーレイで1500ms表示 → 結果画面へ。
到達ステージが過去最高なら最高記録を更新する。

---

## 6. state オブジェクト（実際のフィールド）

```js
const state = {
  mode: 'rookie',           // 練習モードのティア（rookie/fighter/veteran/elite/legend）
  gameType: 'battle',       // 'normal'（練習） | 'battle'（ステージ攻略）
  diffLevel: 1,             // 現在のお題レベル（1〜15）
  score: 0,                 // 練習モードのスコア
  timeLeft: 60,             // 残り時間（カウントダウン）
  wordTimeLimit: 60,        // バトル: 現在のお題の制限時間
  currentWord: '',          // 現在の入力対象ローマ字（空文字=次の単語待ち）
  lastWord: '',             // 直前のお題（連続で同じお題を避ける用）
  currentWordAlts: [],      // generateAlternates() による全表記バリアント
  currentStage: 1,          // バトル: 現在のステージ番号（= 何体目の敵か）
  playerHp: 100,            // バトルのみ使用（自分のHP）
  enemyHp: 100,             // バトルのみ使用（現在の敵のHP。0で撃破）
  combo: 0,                 // バトルのみ使用
  isPlaying: false,
  timerId: null,            // setInterval（1秒ごと tick）
  barTimerId: null,         // setInterval（50ms、バトルのタイマーバー描画用）
  barStartMs: 0,            // バー描画の基準時刻
  wordTimerId: null,        // setTimeout（正解アニメ後に次のお題/ステージへ）
  countdownTimerId: null,   // setTimeout（カウントダウンの連鎖）
  countdownActive: false,
  soundEnabled: true,       // localStorage と連動
  totalKeystrokes: 0,       // 正確率の分母
  correctKeystrokes: 0,     // 正確率の分子
  _insertPending: false,    // beforeinput → input の打鍵カウント連携用
  currentWordMissed: false  // このお題でミスしたか（回復可否の判定）
};
```

> `enemyHp` / `specialGauge` / `enemyAttackTimerId` は **現状ありません**。

---

## 7. タイマー管理ルール

| タイマー | 種類 | 開始する関数 | 停止が必要な関数 |
|----------|------|------------|----------------|
| `timerId` | `setInterval` (1000ms) | `startTimer`（`beginBattle`/`resumeGame`/`advanceToNextStage`/練習の`startGame`から） | `stopTimer`（`endGame`/`pauseGame`/`resetToStart`） |
| `barTimerId` | `setInterval` (50ms) | `startTimer`（バトル時のみ） | `stopTimer` |
| `wordTimerId` | `setTimeout` (280ms) | 正解時 | `endGame` / `resetToStart` / `startGame` |
| `countdownTimerId` | `setTimeout`（連鎖） | `startCountdown` | `stopCountdown`（`endGame`/`pauseGame`/`resetToStart`/`startGame`から呼ぶ） |

**ルール:**
- 新しいタイマーを開始する前に必ず `clear〜` で既存を破棄する
- `endGame` では `stopTimer`（timerId + barTimerId）+ `stopCountdown` + `clearTimeout(wordTimerId)` をすべて行う
- バトルモード以外では `barTimerId` を起動しない（`startTimer` 内で分岐）

---

## 8. ミスタイプ判定の仕様

`handleTypingInput` 内、入力値が `state.currentWord` のプレフィックスでない場合：

1. `state.currentWordAlts` の中に入力プレフィックスと一致するものがあれば → `state.currentWord` をそのバリアントに切り替えて続行（ミスにしない）
2. どのバリアントにも一致しない場合 → **ミス**
   - `playSound('miss')`
   - `state.currentWordMissed = true`（このお題は回復対象外になる）
   - バトルモード: コンボリセット / 赤フラッシュ / プレイヤー HP -5（0 で `endGame`）
   - 入力値を「最後に正しかった位置」まで切り詰める

### ローマ字複数表記（`ROMAJI_ALTERNATES`）

入力はどちらの表記でも可。表示は左列（正規表記）で統一。

| 正規 | 代替 | 正規 | 代替 |
|------|------|------|------|
| si | shi | hu | fu |
| sya | sha | zi | ji |
| syu | shu | ja | jya |
| syo | sho | ju | jyu |
| tu | tsu | jo | jyo |
| ti | chi | di | dji |
| tya | cha | du | dzu |

加えて、小さい「っ ゃ ゅ ょ」を `ltu/xtu`・`lya/xya`・`lyu/xyu`・`lyo/xyo` で、
「ん」を `n` または `nn` で入力できるバリアントを `generateAlternates()` が自動生成する。

---

## 9. 機能追加時の注意点

- **バトル専用機能**は `state.gameType === 'battle'` の分岐内に収める
- **タイマー追加時**は `stopTimer` か、`endGame` / `pauseGame` / `resetToStart` すべてで停止処理を追加する
- **新しいアニメーション**は既存の `triggerAnimation(element, className)` を使う（classList リセット → offsetWidth 強制描画 → classList 追加の順）
- **ローマ字の追加・修正**は `words.js` の `WORD_LISTS` の `ro` フィールドを変更し、表示と入力が一致するか必ず確認する
- **お題を追加**するときは難易度レベルごとのローマ字の長さ傾向を保つ
- **敵を追加**するときは `enemies.js` で SVG 定数を作り、`STAGE_ENEMIES` 配列に追記する（gradient の `id` は全敵で重複させない）
- `state.currentWord = ''` のときは入力がブロックされる（`handleBeforeInput` の仕様）

---

## 10. 編集してよい範囲・避けるべき変更

### 編集しやすい箇所

- `words.js` の `WORD_LISTS` — お題の追加・変更
- `enemies.js` の `STAGE_ENEMIES` / 各 SVG 定数 — 敵キャラの追加・変更
- `CONFIG`（先頭の設定オブジェクト） — 制限時間・HP・ダメージ・回復などの数値調整はまずここ
- `calcWordTimeLimit` — お題の制限時間カーブ（難易度ごとの係数）の調整
- `style.css` のアニメーション・色・サイズ
- `RESULT_MESSAGES` — スコアに応じたメッセージ

### 注意が必要な箇所

- `handleTypingInput` — ミス判定・代替表記切り替え・コンボ/HP更新・正解処理が混在
- `endGame` — タイマー停止・バトル演出・結果画面遷移が一体
- `startTimer` / `stopTimer` — `timerId` と `barTimerId` の両方を扱う
- `.input-area` の `height: 0` — `display: none` に変えると入力が壊れる
- `state.currentWord = ''` のロック — 正解アニメ中の多重入力防止のために必要

### 避けるべき変更

- `state.currentWord` と `state.currentWordAlts` の更新ロジックの分離
- タイマー（`timerId` / `barTimerId` など）を関数外で直接操作すること
- `screens` オブジェクト以外の方法での画面切り替え

---

## 11. 既知の注意点・未実装機能

### 注意点

- **IME 抑制**: `inputmode="url"` + CSS `ime-mode: inactive` で日本語入力を抑制しているが、ブラウザ・OS 依存のため完全ではない
- **モバイルでのフォーカス**: ゲーム画面タップ時に `el.typingInput.focus()` を呼ぶことで対処済み
- **AudioContext の初期化**: 初回の `playSound` 呼び出し時に遅延生成して、ブラウザ警告を回避している

### 未実装（将来の改善候補）

- バトルモードの「勝利」条件・クリア演出（現状はエンドレス＆敗北のみ。魔王撃破で勝利、など）
- 必殺技・コンボによるダメージ倍率などのアクション要素
- お題のテーマ別カテゴリ選択
- ハイスコア・ランキングのオンライン保存
