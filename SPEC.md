# TypeRush 仕様書

## 1. プロジェクト概要

- 日本語のお題をローマ字で入力するタイピングゲーム
- バニラ JS / HTML / CSS のみ（外部ライブラリなし）
- 「練習モード」（通常タイピング）と「レベル攻略モード」（HPバトル）の2種類
- 難易度は easy / normal / hard の3段階（練習モードのみ）

---

## 2. ファイル構成

```
index.html   — 画面構造（4画面）+ バトル演出オーバーレイ
style.css    — スタイル + アニメーション定義
script.js    — ゲームロジック全体（単一ファイル）
SPEC.md      — 本ファイル
```

### index.html の画面構成

| ID | 役割 |
|----|------|
| `#screen-start` | スタート画面（ゲームタイプ・難易度選択） |
| `#screen-game` | ゲーム画面 |
| `#screen-pause` | ポーズ画面 |
| `#screen-result` | 結果画面 |

### ゲーム画面内の主要要素（表示順）

1. `.game-header` — タイマー / スコア / ポーズボタン
2. `#hp-area` — HP バー 2本（バトルモード時のみ表示）
3. `#battle-extras` — コンボ表示 + 必殺技ゲージ + 必殺技ボタン（バトルモード時のみ）
4. `#enemy-area` — 敵キャラ 👾（バトルモード時のみ）
5. `.word-area` — お題（日本語 + ローマ字）
6. `.input-area` — 入力欄（`height: 0` で非表示、フォーカスは維持）

### バトル演出オーバーレイ（`<body>` 直下、`position: fixed`）

- `#battle-flash` — ミス・敵自動攻撃時の赤フラッシュ
- `#special-flash` — 必殺技使用時のフラッシュ
- `#battle-end-overlay` — 勝利・敗北の全画面オーバーレイ

---

## 3. 実装済み機能一覧

- ゲームタイプ選択（練習モード / レベル攻略モード）
- 難易度選択（easy / normal / hard）（練習モード時のみ表示）
- ローマ字入力（複数表記対応）
- フリガナ（ruby タグ）表示
- 入力進捗のカラー表示（緑=正解済み、赤=誤り、グレー=未入力）
- タイピング効果音（key / miss / correct）
- ポーズ機能（ESC キー対応）
- タイマー警告（残り10秒で赤く点滅）
- バトルモード: HP バー、敵キャラ、攻撃演出
- バトルモード: コンボシステム
- バトルモード: 必殺技ゲージ＋必殺技ボタン
- バトルモード: 敵自動攻撃（3秒ごと）

---

## 4. 練習モード（通常タイピング）の仕様

- 制限時間: **60秒**
- 正解するたびにスコア +1
- タイムアップで結果画面へ（`setTimeout` 350ms 後）
- ゲーム終了後、スコアに応じてメッセージを表示

### 難易度とお題の長さ

| 難易度 | ローマ字の文字数 |
|--------|----------------|
| easy   | 11文字以下      |
| normal | 12〜17文字      |
| hard   | 18文字以上      |

---

## 5. レベル攻略モード（HPバトル）の仕様

### 基本数値

| 項目 | 値 |
|------|----|
| 開始時 HP（双方） | 100 |
| 正解時の敵ダメージ | -10 |
| ミスタイプ時のプレイヤーダメージ | -5 |
| 敵自動攻撃ダメージ | -5 |
| 敵自動攻撃間隔 | 3000ms |
| 必殺技ダメージ | -30 |

### コンボシステム

- 正解ごとにコンボ +1
- ミスタイプでコンボ 0 にリセット
- 2コンボ以上で「🔥 N コンボ！」を表示

### 必殺技ゲージ

- 正解ごとに `10 + floor(combo / 5)` 増加（上限 100）
- ゲージ 100 到達で必殺技ボタンが有効化・ピンク点滅
- 使用後ゲージは 0 にリセット
- ミスタイプではゲージを消費しない

### 敵自動攻撃のタイマーリセット

- **正解時**: `startEnemyAttack()` を呼び出してタイマーをリセット  
  → 正解直後の3秒間は攻撃されない（正解への報酬）

### ゲーム終了のトリガー

1. 敵 HP が 0 になった（即終了）
2. プレイヤー HP が 0 になった（即終了）
3. タイムアップ（HP比較で勝敗判定）

### ゲーム終了時の演出

- 「勝利！」（緑）または「敗北...」（赤）または「引き分け」（黄）を全画面オーバーレイで1500ms表示
- その後結果画面に遷移

---

## 6. state オブジェクト

```js
const state = {
  mode: 'easy',             // 'easy' | 'normal' | 'hard'
  gameType: 'normal',       // 'normal' | 'battle'
  score: 0,
  timeLeft: 60,             // GAME_DURATION からカウントダウン
  currentWord: '',          // 現在の入力対象ローマ字（空文字=次の単語待ち）
  currentWordAlts: [],      // generateAlternates() による全表記バリアント
  playerHp: 100,            // バトルのみ使用
  enemyHp: 100,             // バトルのみ使用
  combo: 0,                 // バトルのみ使用
  specialGauge: 0,          // バトルのみ使用
  isPlaying: false,
  timerId: null,            // setInterval (1秒ごと tick)
  wordTimerId: null,        // setTimeout (正解アニメ後に次の単語)
  enemyAttackTimerId: null  // setInterval (敵自動攻撃、バトルのみ)
};
```

---

## 7. タイマー管理ルール

| タイマー | 種類 | 開始 | 停止が必要な関数 |
|----------|------|------|----------------|
| `timerId` | `setInterval` (1000ms) | `beginBattle` / `resumeGame` / `startGame`(通常) | `endGame` / `pauseGame` / `resetToStart` |
| `wordTimerId` | `setTimeout` (280ms) | 正解時 | `endGame` / `resetToStart` / `startGame` |
| `enemyAttackTimerId` | `setInterval` (3000ms) | `beginBattle` / `resumeGame` / 正解時リセット | `endGame` / `pauseGame` / `resetToStart` |
| `countdownTimerId` | `setTimeout` (連鎖) | `startCountdown` | `stopCountdown`（`endGame` / `pauseGame` / `resetToStart` / `startGame` から呼ぶ） |

**ルール:**
- 新しいタイマーを開始する前に必ず `clear〜` で既存を破棄する
- `endGame` では3つすべて停止する
- バトルモード以外では `enemyAttackTimerId` を起動しない

---

## 8. 勝敗判定の仕様

バトルモードの `endGame()` 内で以下の順に判定：

```
敵HP <= 0          → 勝利
プレイヤーHP <= 0  → 敗北
プレイヤーHP > 敵HP → 勝利
プレイヤーHP < 敵HP → 敗北
同点               → 引き分け
```

---

## 9. ミスタイプ判定の仕様

`handleTypingInput` 内、入力値が `state.currentWord` のプレフィックスでない場合：

1. `state.currentWordAlts` の中に入力プレフィックスと一致するものがあれば → `state.currentWord` をそのバリアントに切り替えて続行（ミスにしない）
2. どのバリアントにも一致しない場合 → **ミス**
   - `playSound('miss')`
   - バトルモード: コンボリセット / 赤フラッシュ / プレイヤー HP -5
   - 入力値を「最後に正しかった位置」まで切り詰める

### ローマ字複数表記（ROMAJI_ALTERNATES）

| 正規表記 | 代替表記 |
|---------|---------|
| si      | shi     |
| sya     | sha     |
| syu     | shu     |
| syo     | sho     |
| tu      | tsu     |
| ti      | chi     |
| tya     | cha     |
| hu      | fu      |

表示は正規表記（左列）で統一。入力はどちらでも可。

---

## 10. 機能追加時の注意点

- **バトル専用機能**は `state.gameType === 'battle'` の分岐内に収める
- **タイマー追加時**は `endGame` / `pauseGame` / `resetToStart` すべてで停止処理を追加する
- **新しいアニメーション**は既存の `triggerAnimation(element, className)` を使う（classList リセット → offsetWidth 強制描画 → classList 追加の順）
- **ローマ字の追加・修正**は `WORD_LISTS` の `ro` フィールドを変更し、表示と入力が一致するか必ず確認する
- **お題を追加**するときは難易度ごとのローマ字文字数の範囲を守る（easy ≤11 / normal 12-17 / hard 18+）
- `state.currentWord = ''` のときは入力がブロックされる（`handleBeforeInput` の仕様）

---

## 11. 編集してよい範囲・避けるべき変更

### 編集しやすい箇所

- `WORD_LISTS` — お題の追加・変更
- `GAME_DURATION` / `BATTLE_*` / `SPECIAL_*` / `ENEMY_ATTACK_*` — 数値調整
- `style.css` のアニメーション・色・サイズ
- `RESULT_MESSAGES` — スコアに応じたメッセージ

### 注意が必要な箇所

- `handleTypingInput` — ミス判定・代替表記切り替え・コンボ/HP更新が混在
- `endGame` — タイマー停止・バトル演出・結果画面遷移が一体
- `.input-area` の `height: 0` — `display: none` に変えると入力が壊れる
- `state.currentWord = ''` のロック — 正解アニメ中の多重入力防止のために必要

### 避けるべき変更

- `state.currentWord` と `state.currentWordAlts` の更新ロジックの分離
- `timerId` / `enemyAttackTimerId` の管理を関数外で直接操作
- `screens` オブジェクト以外の方法での画面切り替え

---

## 12. 既知の注意点・未実装機能

### 注意点

- **IME 抑制**: `inputmode="url"` + CSS `ime-mode: inactive` で日本語入力を抑制しているが、ブラウザ・OS 依存のため完全ではない
- **モバイルでのフォーカス**: ゲーム画面タップ時に `el.typingInput.focus()` を呼ぶことで対処済み。ポーズボタン・必殺技ボタンのクリック後もフォーカスを戻すよう対応済み
- **AudioContext の初期化**: ユーザー操作前に `AudioContext` を生成するとブラウザに警告される。初回の `playSound` 呼び出し時に遅延生成することで対処済み

### 未実装

- ハイスコア・ランキング保存
- バトルモードの難易度別バランス調整
- モバイル向けの仮想キーボード対策
- ゲームタイプ間でのオプション設定の独立化（現在は難易度が共通）
