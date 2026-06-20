// ================================
// 敵データ（各 *_SVG 定数 と STAGE_ENEMIES）
// このファイルは index.html で script.js より先に読み込まれる。
// 敵を追加するときは SVG 定数を作り、STAGE_ENEMIES に追記する。
// SVG 内の gradient id は敵ごとに重複させないこと。
// ================================
const SLIME_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="slimeGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#8de4ff"/>
      <stop offset="50%"  stop-color="#2299ee"/>
      <stop offset="100%" stop-color="#0c54a8"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.22)"/>
  <path d="M60 7 C76 7,104 23,104 51 C104 70,89 86,60 86 C31 86,16 70,16 51 C16 23,44 7,60 7 Z" fill="url(#slimeGrad)"/>
  <path d="M60 7 C76 7,104 23,104 51 C104 70,89 86,60 86 C31 86,16 70,16 51 C16 23,44 7,60 7 Z" fill="none" stroke="#094185" stroke-width="2.5"/>
  <ellipse cx="37" cy="26" rx="16" ry="8" fill="rgba(255,255,255,0.45)" transform="rotate(-25,37,26)"/>
  <ellipse cx="42" cy="53" rx="9" ry="10" fill="white"/>
  <ellipse cx="78" cy="53" rx="9" ry="10" fill="white"/>
  <circle cx="44" cy="55" r="5.5" fill="#1a1a1a"/>
  <circle cx="80" cy="55" r="5.5" fill="#1a1a1a"/>
  <circle cx="48" cy="51" r="2" fill="white"/>
  <circle cx="84" cy="51" r="2" fill="white"/>
  <path d="M43 68 Q60 78 77 68" stroke="#094185" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;
const GOBLIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="gobGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#90ee60"/>
      <stop offset="50%"  stop-color="#4caf20"/>
      <stop offset="100%" stop-color="#1a6000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="26" ry="4" fill="rgba(0,0,0,0.22)"/>
  <ellipse cx="60" cy="74" rx="16" ry="16" fill="url(#gobGrad)" stroke="#0d3d00" stroke-width="2"/>
  <ellipse cx="60" cy="50" rx="22" ry="20" fill="url(#gobGrad)" stroke="#0d3d00" stroke-width="2"/>
  <polygon points="37,46 25,30 40,40" fill="#4caf20" stroke="#0d3d00" stroke-width="1.5"/>
  <polygon points="83,46 95,30 80,40" fill="#4caf20" stroke="#0d3d00" stroke-width="1.5"/>
  <ellipse cx="51" cy="47" rx="7" ry="6.5" fill="#ffe000"/>
  <ellipse cx="69" cy="47" rx="7" ry="6.5" fill="#ffe000"/>
  <circle cx="52" cy="48" r="4.5" fill="#111"/>
  <circle cx="70" cy="48" r="4.5" fill="#111"/>
  <circle cx="54" cy="46" r="1.5" fill="white"/>
  <circle cx="72" cy="46" r="1.5" fill="white"/>
  <circle cx="57" cy="57" r="2" fill="#0d3d00"/>
  <circle cx="63" cy="57" r="2" fill="#0d3d00"/>
  <path d="M48 64 Q60 72 72 64" stroke="#0d3d00" stroke-width="2" fill="none"/>
  <rect x="53" y="64" width="3" height="6" rx="1" fill="white"/>
  <rect x="64" y="64" width="3" height="6" rx="1" fill="white"/>
  <ellipse cx="42" cy="34" rx="13" ry="6" fill="rgba(255,255,255,0.3)" transform="rotate(-20,42,34)"/>
</svg>`;

const GOLEM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="golGrad" cx="35%" cy="25%" r="70%">
      <stop offset="0%"   stop-color="#c8c0b0"/>
      <stop offset="50%"  stop-color="#857a6a"/>
      <stop offset="100%" stop-color="#3c3228"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="38" ry="5" fill="rgba(0,0,0,0.28)"/>
  <rect x="6"  y="52" width="24" height="32" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <rect x="90" y="52" width="24" height="32" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <ellipse cx="18"  cy="86" rx="12" ry="9" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <ellipse cx="102" cy="86" rx="12" ry="9" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2"/>
  <rect x="28" y="56" width="64" height="38" rx="6" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2.5"/>
  <rect x="30" y="20" width="60" height="44" rx="8" fill="url(#golGrad)" stroke="#1a1408" stroke-width="2.5"/>
  <path d="M57 22 L53 52" stroke="#1a1408" stroke-width="2" opacity="0.5"/>
  <ellipse cx="46" cy="38" rx="8" ry="7" fill="#ff7700"/>
  <ellipse cx="74" cy="38" rx="8" ry="7" fill="#ff7700"/>
  <ellipse cx="46" cy="38" rx="5" ry="4.5" fill="#ffcc00"/>
  <ellipse cx="74" cy="38" rx="5" ry="4.5" fill="#ffcc00"/>
  <rect x="43" y="54" width="34" height="5" rx="2.5" fill="#1a1408"/>
  <path d="M35 68 Q60 62 85 68" stroke="#1a1408" stroke-width="1" opacity="0.35" fill="none"/>
  <path d="M32 80 Q60 74 88 80" stroke="#1a1408" stroke-width="1" opacity="0.35" fill="none"/>
</svg>`;

const DRAGON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="drgGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#ff7755"/>
      <stop offset="50%"  stop-color="#cc2200"/>
      <stop offset="100%" stop-color="#5a0800"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="30" ry="4" fill="rgba(0,0,0,0.25)"/>
  <path d="M58 46 L8 12 L22 52 Z" fill="#7a1100" stroke="#3d0800" stroke-width="1.5"/>
  <path d="M62 46 L112 12 L98 52 Z" fill="#7a1100" stroke="#3d0800" stroke-width="1.5"/>
  <path d="M58 46 L14 18" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M58 46 L10 32" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M62 46 L106 18" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <path d="M62 46 L110 32" stroke="#3d0800" stroke-width="1" opacity="0.6"/>
  <ellipse cx="60" cy="76" rx="22" ry="18" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="2"/>
  <path d="M50 62 Q56 48 60 40 Q64 48 70 62 Q64 58 56 58Z" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="1.5"/>
  <ellipse cx="60" cy="34" rx="20" ry="14" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="2.5"/>
  <ellipse cx="60" cy="41" rx="10" ry="7" fill="url(#drgGrad)" stroke="#3d0800" stroke-width="1.5"/>
  <polygon points="48,24 41,6 52,22" fill="#3d0800"/>
  <polygon points="72,24 79,6 68,22" fill="#3d0800"/>
  <ellipse cx="50" cy="30" rx="6" ry="5.5" fill="#ffe000"/>
  <ellipse cx="70" cy="30" rx="6" ry="5.5" fill="#ffe000"/>
  <ellipse cx="51" cy="30" rx="3.5" ry="4" fill="#111"/>
  <ellipse cx="71" cy="30" rx="3.5" ry="4" fill="#111"/>
  <circle cx="52" cy="28" r="1.5" fill="white"/>
  <circle cx="72" cy="28" r="1.5" fill="white"/>
  <circle cx="55" cy="42" r="2" fill="#3d0800"/>
  <circle cx="65" cy="42" r="2" fill="#3d0800"/>
  <path d="M51 44 L53 49 L55 44" fill="white" stroke="#3d0800" stroke-width="0.5"/>
  <path d="M65 44 L67 49 L69 44" fill="white" stroke="#3d0800" stroke-width="0.5"/>
</svg>`;

const PHOENIX_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="phxGrad" cx="50%" cy="35%" r="65%">
      <stop offset="0%"   stop-color="#fff176"/>
      <stop offset="40%"  stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#dd2200"/>
    </radialGradient>
    <radialGradient id="phxWing" cx="50%" cy="50%" r="80%">
      <stop offset="0%"   stop-color="#ff9800"/>
      <stop offset="100%" stop-color="#bb2000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <path d="M60 80 Q44 90 32 100 Q48 86 55 77" fill="#ff6600" opacity="0.85"/>
  <path d="M60 80 Q60 92 58 100 Q62 88 65 78" fill="#ffaa00" opacity="0.9"/>
  <path d="M60 80 Q76 90 88 100 Q72 86 65 77" fill="#ff6600" opacity="0.85"/>
  <path d="M52 55 Q28 38 6 45 Q22 52 42 62 Z" fill="url(#phxWing)" stroke="#992200" stroke-width="1.5"/>
  <path d="M68 55 Q92 38 114 45 Q98 52 78 62 Z" fill="url(#phxWing)" stroke="#992200" stroke-width="1.5"/>
  <path d="M42 62 Q30 50 12 48" stroke="#cc4400" stroke-width="1" fill="none" opacity="0.6"/>
  <path d="M78 62 Q90 50 108 48" stroke="#cc4400" stroke-width="1" fill="none" opacity="0.6"/>
  <ellipse cx="60" cy="66" rx="18" ry="16" fill="url(#phxGrad)" stroke="#992200" stroke-width="2"/>
  <ellipse cx="60" cy="50" rx="9"  ry="7"  fill="url(#phxGrad)" stroke="#992200" stroke-width="1.5"/>
  <ellipse cx="60" cy="38" rx="16" ry="14" fill="url(#phxGrad)" stroke="#992200" stroke-width="2"/>
  <path d="M50 28 Q48 14 52 10 Q54 22 55 28" fill="#ffcc00" stroke="#cc8800" stroke-width="1"/>
  <path d="M60 26 Q60 10 62  7 Q64 18 65 26" fill="#ff9800" stroke="#cc6600" stroke-width="1"/>
  <path d="M70 28 Q72 14 68 10 Q66 22 65 28" fill="#ffcc00" stroke="#cc8800" stroke-width="1"/>
  <ellipse cx="52" cy="36" rx="5" ry="5" fill="white"/>
  <ellipse cx="68" cy="36" rx="5" ry="5" fill="white"/>
  <circle cx="52" cy="36" r="3.5" fill="#cc0000"/>
  <circle cx="68" cy="36" r="3.5" fill="#cc0000"/>
  <circle cx="53" cy="35" r="1.5" fill="white"/>
  <circle cx="69" cy="35" r="1.5" fill="white"/>
  <path d="M53 43 L60 49 L67 43" fill="#ff9800" stroke="#993300" stroke-width="1.5"/>
</svg>`;

const MAOU_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="maoGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#9b49b0"/>
      <stop offset="50%"  stop-color="#5a0080"/>
      <stop offset="100%" stop-color="#1a0028"/>
    </radialGradient>
    <radialGradient id="maoEye" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#ff6600"/>
      <stop offset="100%" stop-color="#aa0000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="34" ry="5" fill="rgba(60,0,80,0.4)"/>
  <path d="M26 96 L34 56 Q60 50 86 56 L94 96 Z" fill="#1a0028" stroke="#3a0050" stroke-width="1.5"/>
  <path d="M34 56 Q48 66 60 64 Q72 66 86 56 Q72 52 60 50 Q48 52 34 56Z" fill="#3a0050"/>
  <ellipse cx="60" cy="36" rx="30" ry="26" fill="rgba(80,0,120,0.18)"/>
  <ellipse cx="60" cy="36" rx="24" ry="22" fill="url(#maoGrad)" stroke="#3a0050" stroke-width="2.5"/>
  <path d="M42 22 Q36 6 42 2 Q46 14 48 20" fill="#2a0040" stroke="#1a0028" stroke-width="2"/>
  <path d="M78 22 Q84 6 78 2 Q74 14 72 20" fill="#2a0040" stroke="#1a0028" stroke-width="2"/>
  <path d="M43 20 Q39 10 42 4" stroke="#6a00a0" stroke-width="1" fill="none"/>
  <path d="M77 20 Q81 10 78 4" stroke="#6a00a0" stroke-width="1" fill="none"/>
  <ellipse cx="48" cy="34" rx="10" ry="9" fill="rgba(255,80,0,0.25)"/>
  <ellipse cx="72" cy="34" rx="10" ry="9" fill="rgba(255,80,0,0.25)"/>
  <ellipse cx="48" cy="34" rx="7" ry="6" fill="url(#maoEye)"/>
  <ellipse cx="72" cy="34" rx="7" ry="6" fill="url(#maoEye)"/>
  <ellipse cx="48" cy="34" rx="4" ry="3.5" fill="#ff8800"/>
  <ellipse cx="72" cy="34" rx="4" ry="3.5" fill="#ff8800"/>
  <path d="M56 44 L58 48 L62 48 L64 44" stroke="#3a0050" stroke-width="1.5" fill="none"/>
  <path d="M46 52 Q60 63 74 52" stroke="#1a0028" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <path d="M50 53 L48 58" stroke="#c060e0" stroke-width="2" stroke-linecap="round"/>
  <path d="M70 53 L72 58" stroke="#c060e0" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="46" cy="24" rx="12" ry="6" fill="rgba(255,255,255,0.15)" transform="rotate(-20,46,24)"/>
</svg>`;

const SLIME_KING_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="slkGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#ffe878"/>
      <stop offset="50%"  stop-color="#d49010"/>
      <stop offset="100%" stop-color="#7a5000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.22)"/>
  <polygon points="38,30 43,14 50,30" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <polygon points="55,27 60,10 65,27" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <polygon points="70,30 77,14 82,30" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <rect x="36" y="28" width="48" height="8" rx="2" fill="#ffd700" stroke="#a07800" stroke-width="1.5"/>
  <circle cx="60" cy="18" r="3.5" fill="#ff4444"/>
  <circle cx="44" cy="24" r="2.5" fill="#4488ff"/>
  <circle cx="76" cy="24" r="2.5" fill="#44cc44"/>
  <path d="M60 10 C76 10,104 26,104 54 C104 73,89 88,60 88 C31 88,16 73,16 54 C16 26,44 10,60 10 Z" fill="url(#slkGrad)"/>
  <path d="M60 10 C76 10,104 26,104 54 C104 73,89 88,60 88 C31 88,16 73,16 54 C16 26,44 10,60 10 Z" fill="none" stroke="#7a5000" stroke-width="2.5"/>
  <ellipse cx="37" cy="38" rx="14" ry="7" fill="rgba(255,255,255,0.4)" transform="rotate(-25,37,38)"/>
  <ellipse cx="42" cy="57" rx="9" ry="10" fill="white"/>
  <ellipse cx="78" cy="57" rx="9" ry="10" fill="white"/>
  <circle cx="44" cy="59" r="5.5" fill="#1a1a1a"/>
  <circle cx="80" cy="59" r="5.5" fill="#1a1a1a"/>
  <circle cx="48" cy="55" r="2" fill="white"/>
  <circle cx="84" cy="55" r="2" fill="white"/>
  <path d="M43 72 Q60 82 77 72" stroke="#7a5000" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>`;

const ORC_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="orcGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#88cc44"/>
      <stop offset="50%"  stop-color="#4a8a18"/>
      <stop offset="100%" stop-color="#1e4000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="36" ry="5" fill="rgba(0,0,0,0.28)"/>
  <ellipse cx="60" cy="78" rx="30" ry="16" fill="url(#orcGrad)" stroke="#1e4000" stroke-width="2"/>
  <ellipse cx="60" cy="48" rx="32" ry="28" fill="url(#orcGrad)" stroke="#1e4000" stroke-width="2.5"/>
  <path d="M30 40 Q60 30 90 40" stroke="#1e4000" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="46" cy="46" rx="8" ry="7" fill="#cc2200"/>
  <ellipse cx="74" cy="46" rx="8" ry="7" fill="#cc2200"/>
  <circle cx="47" cy="47" r="5" fill="#111"/>
  <circle cx="75" cy="47" r="5" fill="#111"/>
  <circle cx="49" cy="45" r="1.5" fill="white"/>
  <circle cx="77" cy="45" r="1.5" fill="white"/>
  <ellipse cx="60" cy="58" rx="10" ry="8" fill="#3a7010" stroke="#1e4000" stroke-width="1.5"/>
  <circle cx="55" cy="58" r="3" fill="#1e4000"/>
  <circle cx="65" cy="58" r="3" fill="#1e4000"/>
  <path d="M46 68 Q60 74 74 68" stroke="#1e4000" stroke-width="2" fill="none"/>
  <path d="M50 67 L47 80" stroke="#f0e0a0" stroke-width="5" stroke-linecap="round"/>
  <path d="M70 67 L73 80" stroke="#f0e0a0" stroke-width="5" stroke-linecap="round"/>
  <ellipse cx="42" cy="30" rx="14" ry="6" fill="rgba(255,255,255,0.25)" transform="rotate(-20,42,30)"/>
</svg>`;

const SKELETON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="skelGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#f0ece0"/>
      <stop offset="50%"  stop-color="#c8c0a8"/>
      <stop offset="100%" stop-color="#8a8070"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <line x1="60" y1="68" x2="60" y2="90" stroke="#c8c0a8" stroke-width="5"/>
  <path d="M60 72 Q44 76 40 86" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 72 Q76 76 80 86" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 80 Q42 84 38 92" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <path d="M60 80 Q78 84 82 92" stroke="#c8c0a8" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="44" rx="26" ry="28" fill="url(#skelGrad)" stroke="#8a8070" stroke-width="2.5"/>
  <path d="M36 60 Q60 74 84 60 L82 66 Q60 80 38 66 Z" fill="url(#skelGrad)" stroke="#8a8070" stroke-width="2"/>
  <ellipse cx="46" cy="42" rx="10" ry="11" fill="#1a1a1a"/>
  <ellipse cx="74" cy="42" rx="10" ry="11" fill="#1a1a1a"/>
  <ellipse cx="46" cy="42" rx="5.5" ry="6.5" fill="#22dd22" opacity="0.85"/>
  <ellipse cx="74" cy="42" rx="5.5" ry="6.5" fill="#22dd22" opacity="0.85"/>
  <path d="M56 52 L60 58 L64 52" fill="#1a1a1a"/>
  <rect x="46" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="54" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="62" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="70" y="63" width="5" height="8" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <ellipse cx="42" cy="28" rx="10" ry="5" fill="rgba(255,255,255,0.3)" transform="rotate(-20,42,28)"/>
</svg>`;

const TROLL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="trlGrad" cx="35%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#b0a0c8"/>
      <stop offset="50%"  stop-color="#6a5888"/>
      <stop offset="100%" stop-color="#2e2040"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="40" ry="5" fill="rgba(0,0,0,0.28)"/>
  <ellipse cx="16" cy="68" rx="14" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2"/>
  <ellipse cx="104" cy="68" rx="14" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2"/>
  <ellipse cx="60" cy="76" rx="36" ry="20" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2.5"/>
  <ellipse cx="60" cy="46" rx="36" ry="32" fill="url(#trlGrad)" stroke="#2e2040" stroke-width="2.5"/>
  <circle cx="28" cy="52" r="5" fill="#5a4a70" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="90" cy="50" r="4" fill="#5a4a70" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="48" cy="26" r="3.5" fill="#5a4a70" stroke="#2e2040" stroke-width="1"/>
  <ellipse cx="46" cy="42" rx="8" ry="7" fill="#cc6600"/>
  <ellipse cx="74" cy="42" rx="8" ry="7" fill="#cc6600"/>
  <circle cx="47" cy="43" r="5" fill="#111"/>
  <circle cx="75" cy="43" r="5" fill="#111"/>
  <circle cx="49" cy="41" r="1.5" fill="white"/>
  <circle cx="77" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="57" rx="14" ry="11" fill="#5a4878" stroke="#2e2040" stroke-width="1.5"/>
  <circle cx="54" cy="58" r="5" fill="#2e2040"/>
  <circle cx="66" cy="58" r="5" fill="#2e2040"/>
  <path d="M40 68 Q60 78 80 68" stroke="#2e2040" stroke-width="3" fill="none"/>
  <rect x="49" y="67" width="6" height="9" rx="2" fill="#f0e8c0"/>
  <rect x="65" y="67" width="6" height="9" rx="2" fill="#f0e8c0"/>
  <ellipse cx="40" cy="30" rx="14" ry="6" fill="rgba(255,255,255,0.2)" transform="rotate(-20,40,30)"/>
</svg>`;

const MINOTAUR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="minGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#a06040"/>
      <stop offset="50%"  stop-color="#603820"/>
      <stop offset="100%" stop-color="#2a1208"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="34" ry="5" fill="rgba(0,0,0,0.3)"/>
  <path d="M34 34 Q16 10 22 4 Q28 18 38 28" fill="#2a1208" stroke="#1a0a04" stroke-width="2"/>
  <path d="M86 34 Q104 10 98 4 Q92 18 82 28" fill="#2a1208" stroke="#1a0a04" stroke-width="2"/>
  <ellipse cx="24" cy="40" rx="11" ry="8" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2" transform="rotate(-20,24,40)"/>
  <ellipse cx="96" cy="40" rx="11" ry="8" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2" transform="rotate(20,96,40)"/>
  <ellipse cx="60" cy="74" rx="24" ry="18" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2"/>
  <ellipse cx="60" cy="46" rx="28" ry="26" fill="url(#minGrad)" stroke="#2a1208" stroke-width="2.5"/>
  <ellipse cx="60" cy="62" rx="16" ry="12" fill="#4a2810" stroke="#2a1208" stroke-width="2"/>
  <circle cx="54" cy="62" r="4.5" fill="#1a0a04"/>
  <circle cx="66" cy="62" r="4.5" fill="#1a0a04"/>
  <ellipse cx="46" cy="42" rx="8" ry="7" fill="#cc4400"/>
  <ellipse cx="74" cy="42" rx="8" ry="7" fill="#cc4400"/>
  <circle cx="47" cy="43" r="5" fill="#111"/>
  <circle cx="75" cy="43" r="5" fill="#111"/>
  <circle cx="49" cy="41" r="1.5" fill="white"/>
  <circle cx="77" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="70" rx="7" ry="4" fill="none" stroke="#c0a000" stroke-width="3.5"/>
  <path d="M48 72 Q60 78 72 72" stroke="#1a0a04" stroke-width="2.5" fill="none"/>
  <ellipse cx="42" cy="28" rx="12" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-25,42,28)"/>
</svg>`;

const MEDUSA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="medGrad" cx="40%" cy="32%" r="70%">
      <stop offset="0%"   stop-color="#90d8a0"/>
      <stop offset="50%"  stop-color="#3a9050"/>
      <stop offset="100%" stop-color="#0a4020"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="26" ry="4" fill="rgba(0,0,0,0.2)"/>
  <path d="M40 30 Q22 18 20 6" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M48 24 Q38 10 40 2" stroke="#44aa55" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M58 20 Q54 6 58 2" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M70 22 Q72 8 78 4" stroke="#44aa55" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M78 28 Q92 16 94 6" stroke="#2a8040" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="20" cy="6" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="40" cy="2" r="5" fill="#2a8040" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="58" cy="2" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="78" cy="4" r="5" fill="#2a8040" stroke="#0a4020" stroke-width="1.5"/>
  <circle cx="94" cy="6" r="5" fill="#1a6030" stroke="#0a4020" stroke-width="1.5"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#medGrad)" stroke="#0a4020" stroke-width="2.5"/>
  <ellipse cx="48" cy="54" rx="8" ry="7" fill="#ffd700"/>
  <ellipse cx="72" cy="54" rx="8" ry="7" fill="#ffd700"/>
  <ellipse cx="48" cy="54" rx="2.5" ry="6" fill="#111"/>
  <ellipse cx="72" cy="54" rx="2.5" ry="6" fill="#111"/>
  <circle cx="57" cy="64" r="2" fill="#0a4020"/>
  <circle cx="63" cy="64" r="2" fill="#0a4020"/>
  <path d="M46 70 Q60 78 74 70" stroke="#0a4020" stroke-width="2" fill="none"/>
  <path d="M60 74 L56 82 M60 74 L64 82" stroke="#ff4444" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="42" cy="42" rx="10" ry="5" fill="rgba(255,255,255,0.25)" transform="rotate(-20,42,42)"/>
</svg>`;

const CHIMERA_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="chiGrad" cx="38%" cy="30%" r="70%">
      <stop offset="0%"   stop-color="#e08050"/>
      <stop offset="50%"  stop-color="#a04820"/>
      <stop offset="100%" stop-color="#4a1a00"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="93" rx="34" ry="5" fill="rgba(0,0,0,0.28)"/>
  <path d="M44 42 Q16 22 8 36 Q24 46 44 54 Z" fill="#602000" stroke="#2a1000" stroke-width="1.5"/>
  <path d="M76 42 Q104 22 112 36 Q96 46 76 54 Z" fill="#602000" stroke="#2a1000" stroke-width="1.5"/>
  <path d="M44 42 Q22 28 14 34" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M44 42 Q26 32 18 38" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M76 42 Q98 28 106 34" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <path d="M76 42 Q94 32 102 38" stroke="#4a2000" stroke-width="1" fill="none" opacity="0.7"/>
  <ellipse cx="60" cy="42" rx="36" ry="30" fill="#cc7020" stroke="#4a1a00" stroke-width="2"/>
  <ellipse cx="60" cy="44" rx="26" ry="24" fill="url(#chiGrad)" stroke="#4a1a00" stroke-width="2.5"/>
  <polygon points="34,34 28,16 42,32" fill="#cc7020" stroke="#4a1a00" stroke-width="1.5"/>
  <polygon points="86,34 92,16 78,32" fill="#cc7020" stroke="#4a1a00" stroke-width="1.5"/>
  <ellipse cx="47" cy="42" rx="8" ry="7.5" fill="#ffd700"/>
  <ellipse cx="73" cy="42" rx="8" ry="7.5" fill="#ffd700"/>
  <circle cx="48" cy="43" r="5" fill="#111"/>
  <circle cx="74" cy="43" r="5" fill="#111"/>
  <circle cx="50" cy="41" r="1.5" fill="white"/>
  <circle cx="76" cy="41" r="1.5" fill="white"/>
  <ellipse cx="60" cy="57" rx="12" ry="9" fill="#b05520" stroke="#4a1a00" stroke-width="1.5"/>
  <circle cx="55" cy="57" r="3.5" fill="#4a1a00"/>
  <circle cx="65" cy="57" r="3.5" fill="#4a1a00"/>
  <path d="M48 64 Q60 72 72 64" stroke="#4a1a00" stroke-width="2" fill="none"/>
  <path d="M54 65 L52 73" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M68 65 L70 73" stroke="white" stroke-width="3.5" stroke-linecap="round"/>
  <path d="M80 84 Q92 78 96 86 Q98 92 94 94" stroke="#228840" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="38" cy="28" rx="12" ry="6" fill="rgba(255,255,255,0.2)" transform="rotate(-20,38,28)"/>
</svg>`;

const WYVERN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="wyvGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#7060a0"/>
      <stop offset="50%"  stop-color="#3a2070"/>
      <stop offset="100%" stop-color="#100028"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="28" ry="4" fill="rgba(0,0,0,0.3)"/>
  <path d="M48 40 L4 10 L20 52 Z" fill="#200858" stroke="#100028" stroke-width="1.5"/>
  <path d="M72 40 L116 10 L100 52 Z" fill="#200858" stroke="#100028" stroke-width="1.5"/>
  <path d="M48 40 L8 16" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M48 40 L10 28" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M48 40 L6 42" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L112 16" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L110 28" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M72 40 L114 42" stroke="#100028" stroke-width="1" opacity="0.7"/>
  <path d="M62 72 Q80 80 90 76 Q94 86 88 90" stroke="#3a2070" stroke-width="6" fill="none" stroke-linecap="round"/>
  <ellipse cx="60" cy="68" rx="20" ry="14" fill="url(#wyvGrad)" stroke="#100028" stroke-width="2"/>
  <ellipse cx="60" cy="42" rx="22" ry="18" fill="url(#wyvGrad)" stroke="#100028" stroke-width="2.5"/>
  <path d="M44 30 Q36 14 40 6 Q44 18 48 28" fill="#100028" stroke="#060010" stroke-width="1"/>
  <path d="M76 30 Q84 14 80 6 Q76 18 72 28" fill="#100028" stroke="#060010" stroke-width="1"/>
  <ellipse cx="48" cy="40" rx="7" ry="6" fill="#ff4400"/>
  <ellipse cx="72" cy="40" rx="7" ry="6" fill="#ff4400"/>
  <ellipse cx="48" cy="40" rx="3.5" ry="5" fill="#111"/>
  <ellipse cx="72" cy="40" rx="3.5" ry="5" fill="#111"/>
  <path d="M50 50 Q60 56 70 50 L68 58 Q60 62 52 58 Z" fill="#3a2070" stroke="#100028" stroke-width="1.5"/>
  <path d="M54 57 L52 66" stroke="#f0e8d0" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M66 57 L68 66" stroke="#f0e8d0" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="44" cy="28" rx="10" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-25,44,28)"/>
</svg>`;

const LICH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="licGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#e8e0d0"/>
      <stop offset="50%"  stop-color="#c8c0a8"/>
      <stop offset="100%" stop-color="#8a8070"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="28" ry="4" fill="rgba(20,0,40,0.4)"/>
  <path d="M28 68 Q22 86 26 96 Q60 88 94 96 Q98 86 92 68 Q76 74 60 74 Q44 74 28 68Z" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <line x1="60" y1="74" x2="60" y2="94" stroke="#2e0070" stroke-width="2"/>
  <path d="M28 68 Q14 60 10 72 Q18 80 28 74" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <path d="M92 68 Q106 60 110 72 Q102 80 92 74" fill="#1e0050" stroke="#100030" stroke-width="2"/>
  <path d="M10 72 L6 77 M10 72 L8 81 M10 72 L14 80" stroke="#c8c0a8" stroke-width="2" stroke-linecap="round"/>
  <path d="M110 72 L114 77 M110 72 L112 81 M110 72 L106 80" stroke="#c8c0a8" stroke-width="2" stroke-linecap="round"/>
  <rect x="52" y="56" width="16" height="16" rx="4" fill="#c8c0a8" stroke="#8a8070" stroke-width="1.5"/>
  <ellipse cx="60" cy="40" rx="26" ry="24" fill="url(#licGrad)" stroke="#8a8070" stroke-width="2.5"/>
  <polygon points="40,24 44,8 50,24" fill="#7700bb" stroke="#5500aa" stroke-width="1.5"/>
  <polygon points="56,21 60,4 64,21" fill="#9900ee" stroke="#7700cc" stroke-width="1.5"/>
  <polygon points="70,24 76,8 80,24" fill="#7700bb" stroke="#5500aa" stroke-width="1.5"/>
  <rect x="38" y="22" width="44" height="7" rx="2" fill="#8800cc" stroke="#6600bb" stroke-width="1.5"/>
  <circle cx="60" cy="12" r="3" fill="#ff0066"/>
  <circle cx="45" cy="18" r="2" fill="#0066ff"/>
  <circle cx="75" cy="18" r="2" fill="#00ff88"/>
  <ellipse cx="46" cy="40" rx="9" ry="10" fill="#111"/>
  <ellipse cx="74" cy="40" rx="9" ry="10" fill="#111"/>
  <ellipse cx="46" cy="40" rx="5" ry="6" fill="#aa00ff"/>
  <ellipse cx="74" cy="40" rx="5" ry="6" fill="#aa00ff"/>
  <path d="M56 50 L60 56 L64 50" fill="#111"/>
  <path d="M40 54 Q60 66 80 54" stroke="#8a8070" stroke-width="2" fill="none"/>
  <rect x="46" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="54" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="62" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
  <rect x="70" y="55" width="5" height="7" rx="1.5" fill="white" stroke="#8a8070" stroke-width="1"/>
</svg>`;

const DEMON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="100" viewBox="0 0 120 100">
  <defs>
    <radialGradient id="demGrad" cx="38%" cy="28%" r="70%">
      <stop offset="0%"   stop-color="#ff6040"/>
      <stop offset="50%"  stop-color="#cc1800"/>
      <stop offset="100%" stop-color="#500000"/>
    </radialGradient>
  </defs>
  <ellipse cx="60" cy="94" rx="30" ry="5" fill="rgba(40,0,0,0.35)"/>
  <path d="M44 48 L6 18 L22 58 Z" fill="#660000" stroke="#300000" stroke-width="1.5"/>
  <path d="M76 48 L114 18 L98 58 Z" fill="#660000" stroke="#300000" stroke-width="1.5"/>
  <path d="M44 48 L10 24" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M44 48 L8 36" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M44 48 L8 48" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L110 24" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L112 36" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M76 48 L112 48" stroke="#500000" stroke-width="1" opacity="0.7"/>
  <path d="M72 82 Q88 76 94 84 Q96 92 90 92 Q88 88 86 84 Q80 80 70 82" fill="#cc1800" stroke="#500000" stroke-width="1.5"/>
  <ellipse cx="60" cy="70" rx="22" ry="16" fill="url(#demGrad)" stroke="#500000" stroke-width="2"/>
  <ellipse cx="60" cy="44" rx="26" ry="24" fill="url(#demGrad)" stroke="#500000" stroke-width="2.5"/>
  <path d="M40 30 Q30 10 36 4 Q40 18 44 28" fill="#500000" stroke="#300000" stroke-width="1.5"/>
  <path d="M80 30 Q90 10 84 4 Q80 18 76 28" fill="#500000" stroke="#300000" stroke-width="1.5"/>
  <ellipse cx="47" cy="42" rx="9" ry="8" fill="#ffd700"/>
  <ellipse cx="73" cy="42" rx="9" ry="8" fill="#ffd700"/>
  <circle cx="48" cy="43" r="6" fill="#111"/>
  <circle cx="74" cy="43" r="6" fill="#111"/>
  <circle cx="50" cy="41" r="2" fill="white"/>
  <circle cx="76" cy="41" r="2" fill="white"/>
  <circle cx="56" cy="54" r="3.5" fill="#aa1400"/>
  <circle cx="64" cy="54" r="3.5" fill="#aa1400"/>
  <path d="M40 60 Q60 74 80 60" stroke="#500000" stroke-width="2.5" fill="none"/>
  <path d="M46 62 L44 70" stroke="#f0e8d0" stroke-width="3" stroke-linecap="round"/>
  <path d="M74 62 L76 70" stroke="#f0e8d0" stroke-width="3" stroke-linecap="round"/>
  <path d="M54 66 L52 74" stroke="#f0e8d0" stroke-width="2" stroke-linecap="round"/>
  <path d="M66 66 L68 74" stroke="#f0e8d0" stroke-width="2" stroke-linecap="round"/>
  <ellipse cx="42" cy="28" rx="12" ry="5" fill="rgba(255,255,255,0.2)" transform="rotate(-25,42,28)"/>
</svg>`;

const STAGE_ENEMIES = [
  { name: 'スライム',       emoji: SLIME_SVG      },
  { name: 'スライムキング', emoji: SLIME_KING_SVG  },
  { name: 'ゴブリン',       emoji: GOBLIN_SVG     },
  { name: 'オーク',         emoji: ORC_SVG        },
  { name: 'スケルトン',     emoji: SKELETON_SVG   },
  { name: 'トロール',       emoji: TROLL_SVG      },
  { name: 'ゴーレム',       emoji: GOLEM_SVG      },
  { name: 'ミノタウロス',   emoji: MINOTAUR_SVG   },
  { name: 'メデューサ',     emoji: MEDUSA_SVG     },
  { name: 'キメラ',         emoji: CHIMERA_SVG    },
  { name: 'ワイバーン',     emoji: WYVERN_SVG     },
  { name: 'ドラゴン',       emoji: DRAGON_SVG     },
  { name: 'リッチ',         emoji: LICH_SVG       },
  { name: 'デーモン',       emoji: DEMON_SVG      },
  { name: 'フェニックス',   emoji: PHOENIX_SVG    },
  { name: '魔王',           emoji: MAOU_SVG       },
];
