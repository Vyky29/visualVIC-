/** PixtoLearn fitness library — soft 3D SVG bodies (531×648 viewBox). */
const STROKE = "#1a1a1a";

const SVG_DEFS = `
<defs>
  <filter id="softShadow" x="-20%" y="-10%" width="140%" height="130%">
    <feDropShadow dx="0" dy="14" stdDeviation="10" flood-color="#000000" flood-opacity="0.2"/>
  </filter>
  <radialGradient id="gBlueBall" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#A8C8F0"/>
    <stop offset="45%" stop-color="#6B98D4"/>
    <stop offset="100%" stop-color="#3D6A9E"/>
  </radialGradient>
  <radialGradient id="gRedBall" cx="30%" cy="26%" r="70%">
    <stop offset="0%" stop-color="#FF8A80"/>
    <stop offset="50%" stop-color="#E53935"/>
    <stop offset="100%" stop-color="#B71C1C"/>
  </radialGradient>
  <radialGradient id="gPurple" cx="35%" cy="30%" r="65%">
    <stop offset="0%" stop-color="#CEBCF5"/>
    <stop offset="55%" stop-color="#9B7ED8"/>
    <stop offset="100%" stop-color="#6A4FB8"/>
  </radialGradient>
  <radialGradient id="gCyan" cx="32%" cy="28%" r="68%">
    <stop offset="0%" stop-color="#B3E5FC"/>
    <stop offset="50%" stop-color="#4FC3F7"/>
    <stop offset="100%" stop-color="#0288D1"/>
  </radialGradient>
  <linearGradient id="gSilver" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#F5F5F5"/>
    <stop offset="40%" stop-color="#BDBDBD"/>
    <stop offset="100%" stop-color="#757575"/>
  </linearGradient>
  <linearGradient id="gDarkMetal" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#616161"/>
    <stop offset="50%" stop-color="#424242"/>
    <stop offset="100%" stop-color="#212121"/>
  </linearGradient>
  <linearGradient id="gMat" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#E0E0E0"/>
    <stop offset="100%" stop-color="#9E9E9E"/>
  </linearGradient>
  <linearGradient id="gWood" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#E8C99B"/>
    <stop offset="100%" stop-color="#A67C52"/>
  </linearGradient>
  <linearGradient id="gBlackPad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#4A4A4A"/>
    <stop offset="100%" stop-color="#1A1A1A"/>
  </linearGradient>
  <linearGradient id="gGreenBand" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" stop-color="#81C784"/>
    <stop offset="50%" stop-color="#43A047"/>
    <stop offset="100%" stop-color="#2E7D32"/>
  </linearGradient>
</defs>`;

/** @type {Record<string, string>} */
const ILLUSTRATIONS_3D = {
  "therapy-ball": `
    <ellipse cx="266" cy="518" rx="110" ry="16" fill="#000" opacity="0.12"/>
    <path d="M118 478 L414 478 L398 518 L134 518 Z" fill="url(#gMat)" stroke="${STROKE}" stroke-width="2.5" stroke-linejoin="round" opacity="0.95"/>
    <ellipse cx="266" cy="498" rx="86" ry="12" fill="#000" opacity="0.14"/>
    <circle cx="266" cy="300" r="132" fill="url(#gBlueBall)"/>
    <ellipse cx="220" cy="248" rx="38" ry="22" fill="#FFFFFF" opacity="0.35"/>
    <ellipse cx="318" cy="318" rx="48" ry="100" fill="#000" opacity="0.08"/>
    <path d="M158 228 Q266 248 374 228" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.25"/>
    <path d="M148 278 Q266 300 384 278" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.18"/>
    <path d="M142 328 Q266 352 390 328" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.12"/>
  `,
  trampoline: `
    <ellipse cx="266" cy="508" rx="118" ry="16" fill="#000" opacity="0.12"/>
    <g stroke="url(#gSilver)" stroke-width="8" stroke-linecap="round">
      <line x1="394" y1="308" x2="404" y2="352"/>
      <line x1="138" y1="308" x2="128" y2="352"/>
      <line x1="266" y1="278" x2="266" y2="322"/>
    </g>
    <rect x="398" y="350" width="14" height="42" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="120" y="350" width="14" height="42" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="259" y="320" width="14" height="38" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="266" cy="334" rx="152" ry="56" fill="url(#gDarkMetal)"/>
    <ellipse cx="266" cy="328" rx="130" ry="48" fill="#E8E8E8"/>
    <ellipse cx="266" cy="324" rx="98" ry="34" fill="url(#gDarkMetal)"/>
    <ellipse cx="240" cy="312" rx="28" ry="10" fill="#FFF" opacity="0.2"/>
    <g stroke="#555" stroke-width="1.5" opacity="0.5">
      <line x1="266" y1="280" x2="266" y2="368"/>
      <line x1="150" y1="308" x2="382" y2="348"/>
      <line x1="150" y1="348" x2="382" y2="308"/>
    </g>
  `,
  "step-platform": `
    <ellipse cx="266" cy="518" rx="128" ry="14" fill="#000" opacity="0.12"/>
    <rect x="104" y="432" width="68" height="80" rx="10" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="360" y="432" width="68" height="80" rx="10" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <path d="M404 312 L428 340 L428 432 L404 432 Z" fill="#A0A0A0" stroke="${STROKE}" stroke-width="2"/>
    <rect x="108" y="310" width="294" height="78" rx="14" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="116" y="258" width="286" height="58" rx="12" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="124" y="266" width="270" height="12" rx="4" fill="#FFF" opacity="0.15"/>
    <rect x="120" y="328" width="20" height="38" rx="5" fill="#B0B0B0" stroke="${STROKE}" stroke-width="1.5"/>
    <rect x="370" y="328" width="20" height="38" rx="5" fill="#B0B0B0" stroke="${STROKE}" stroke-width="1.5"/>
  `,
  treadmill: `
    <ellipse cx="278" cy="512" rx="140" ry="14" fill="#000" opacity="0.12"/>
    <rect x="108" y="382" width="48" height="68" rx="8" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="392" y="398" width="40" height="56" rx="6" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="142" y="402" width="258" height="40" rx="5" fill="#2A2A2A" stroke="${STROKE}" stroke-width="2"/>
    <rect x="148" y="408" width="246" height="28" rx="3" fill="url(#gDarkMetal)"/>
    <rect x="124" y="390" width="24" height="56" rx="5" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="396" y="404" width="20" height="52" rx="4" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="118" y="274" width="18" height="112" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="162" y="274" width="18" height="112" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="110" y="240" width="114" height="74" rx="12" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="122" y="254" width="78" height="32" rx="5" fill="#64B5F6" stroke="${STROKE}" stroke-width="1.5"/>
    <circle cx="152" cy="308" r="10" fill="#E53935" stroke="${STROKE}" stroke-width="2"/>
    <path d="M110 310 Q78 340 86 384" fill="none" stroke="url(#gDarkMetal)" stroke-width="12" stroke-linecap="round"/>
    <path d="M214 302 Q248 330 240 374" fill="none" stroke="url(#gDarkMetal)" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="86" cy="388" rx="12" ry="10" fill="#1A1A1A"/>
    <ellipse cx="240" cy="378" rx="12" ry="10" fill="#1A1A1A"/>
    <rect x="122" y="254" width="78" height="32" rx="5" fill="#42A5F5"/>
    <ellipse cx="148" cy="262" rx="18" ry="6" fill="#FFF" opacity="0.25"/>
  `,
  "exercise-machine": `
    <ellipse cx="266" cy="512" rx="130" ry="12" fill="#000" opacity="0.12"/>
    <rect x="130" y="472" width="272" height="14" rx="5" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="176" y="300" width="16" height="176" rx="4" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="340" y="300" width="16" height="176" rx="4" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="252" y="288" width="18" height="188" rx="4" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="164" y="280" width="208" height="14" rx="5" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="234" y="424" width="52" height="54" rx="5" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="226" y="372" width="68" height="14" rx="6" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="262" y="320" width="18" height="62" rx="7" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <path d="M184 280 Q174 320 192 354" fill="none" stroke="#888" stroke-width="12" stroke-linecap="round"/>
    <path d="M348 280 Q358 320 340 354" fill="none" stroke="#888" stroke-width="12" stroke-linecap="round"/>
    <rect x="176" y="346" width="38" height="24" rx="9" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="318" y="346" width="38" height="24" rx="9" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="347" cy="320" r="12" fill="#757575" stroke="${STROKE}" stroke-width="2"/>
    <line x1="347" y1="332" x2="272" y2="420" stroke="#555" stroke-width="3"/>
  `,
  weights: `
    <ellipse cx="280" cy="508" rx="120" ry="14" fill="#000" opacity="0.12"/>
    <circle cx="292" cy="310" r="80" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="296" cy="322" r="80" fill="#333" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="362" cy="328" r="56" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="366" cy="338" r="56" fill="#333" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="416" cy="344" r="40" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <polygon points="142,442 168,428 194,442 194,474 168,488 142,474" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="188" y="450" width="78" height="14" rx="7" fill="url(#gSilver)" transform="rotate(16 227 456)"/>
    <polygon points="256,458 282,444 308,458 308,490 282,504 256,490" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="220" cy="298" rx="20" ry="10" fill="#FFF" opacity="0.15"/>
  `,
  "row-machine": `
    <ellipse cx="260" cy="512" rx="140" ry="12" fill="#000" opacity="0.12"/>
    <rect x="96" y="474" width="328" height="12" rx="4" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="104" y="406" width="204" height="10" rx="3" fill="#D0D0D0" stroke="${STROKE}" stroke-width="2"/>
    <rect x="118" y="376" width="58" height="16" rx="5" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <path d="M236 384 L270 362 L270 426 L236 448 Z" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <path d="M274 384 L308 362 L308 426 L274 448 Z" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="344" y="286" width="16" height="190" rx="3" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="374" y="286" width="16" height="190" rx="3" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="352" y="386" width="34" height="76" rx="4" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="292" y="302" width="14" height="166" rx="3" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="298" cy="316" r="14" fill="#757575" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="276" cy="348" r="11" fill="#757575" stroke="${STROKE}" stroke-width="2"/>
    <path d="M254 406 L268 392 L282 406" fill="none" stroke="url(#gBlackPad)" stroke-width="12" stroke-linecap="round"/>
  `,
  skis: `
    <ellipse cx="266" cy="508" rx="110" ry="14" fill="#000" opacity="0.12"/>
    <path d="M156 424 Q196 284 236 204 L248 204 Q216 304 196 424 Z" fill="url(#gRedBall)" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M276 424 Q316 284 356 204 L368 204 Q336 304 316 424 Z" fill="url(#gBlueBall)" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="232" y="200" width="10" height="50" rx="2" fill="url(#gWood)" stroke="${STROKE}" stroke-width="1.5"/>
    <rect x="352" y="200" width="10" height="50" rx="2" fill="url(#gWood)" stroke="${STROKE}" stroke-width="1.5"/>
    <ellipse cx="244" cy="412" rx="18" ry="9" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="364" cy="412" rx="18" ry="9" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="210" cy="280" rx="16" ry="8" fill="#FFF" opacity="0.2"/>
  `,
  "exercise-bike": `
    <ellipse cx="262" cy="518" rx="122" ry="14" fill="#000" opacity="0.12"/>
    <rect x="128" y="474" width="188" height="14" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="208" y="462" width="176" height="14" rx="6" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="228" cy="394" r="92" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2.5"/>
    <circle cx="228" cy="394" r="62" fill="#616161" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="228" cy="394" r="26" fill="#9E9E9E" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M228 394 L296 278 L332 318 L228 394 Z" fill="#757575" stroke="${STROKE}" stroke-width="2"/>
    <rect x="172" y="304" width="14" height="118" rx="5" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="178" cy="290" rx="46" ry="20" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="304" y="264" width="14" height="162" rx="5" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="310" cy="350" r="13" fill="#E53935" stroke="${STROKE}" stroke-width="2"/>
    <rect x="292" y="250" width="52" height="36" rx="7" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="298" y="256" width="40" height="16" rx="3" fill="#64B5F6"/>
    <path d="M310 264 Q282 220 252 228" fill="none" stroke="url(#gBlackPad)" stroke-width="12" stroke-linecap="round"/>
    <path d="M322 264 Q362 226 382 238" fill="none" stroke="url(#gBlackPad)" stroke-width="12" stroke-linecap="round"/>
    <ellipse cx="200" cy="360" rx="24" ry="12" fill="#FFF" opacity="0.12"/>
  `,
  "exercise-mat": `
    <ellipse cx="278" cy="508" rx="134" ry="12" fill="#000" opacity="0.12"/>
    <path d="M198 374 L418 358 L418 472 L198 488 Z" fill="url(#gPurple)" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M106 374 L198 374 L198 488 L106 488 Z" fill="#7E5FC8" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="152" cy="362" rx="52" ry="22" fill="#B8A4E8" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="106" cy="431" rx="56" ry="56" fill="url(#gPurple)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="106" cy="431" rx="42" ry="42" fill="none" stroke="#FFF" stroke-width="1.5" opacity="0.2"/>
    <ellipse cx="106" cy="431" rx="28" ry="28" fill="none" stroke="#FFF" stroke-width="1.5" opacity="0.15"/>
    <circle cx="106" cy="431" r="10" fill="#4A148C"/>
    <ellipse cx="320" cy="380" rx="40" ry="12" fill="#FFF" opacity="0.18"/>
  `,
  "resistance-bands": `
    <ellipse cx="260" cy="518" rx="100" ry="12" fill="#000" opacity="0.1"/>
    <path d="M154 246 L382 302 L370 322 L142 266 Z" fill="#66BB6A" stroke="${STROKE}" stroke-width="2"/>
    <path d="M154 246 L382 302" fill="none" stroke="#FFF" stroke-width="2" opacity="0.2"/>
    <rect x="126" y="250" width="22" height="10" rx="4" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M120 234 L120 278" stroke="url(#gBlackPad)" stroke-width="13" stroke-linecap="round"/>
    <path d="M134 324 L362 380 L350 400 L122 344 Z" fill="#EF5350" stroke="${STROKE}" stroke-width="2"/>
    <rect x="106" y="328" width="22" height="10" rx="4" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M100 312 L100 356" stroke="url(#gBlackPad)" stroke-width="13" stroke-linecap="round"/>
    <path d="M114 404 L350 460 L338 480 L102 424 Z" fill="#FFEE58" stroke="${STROKE}" stroke-width="2"/>
    <rect x="86" y="408" width="22" height="10" rx="4" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M80 392 L80 436" stroke="url(#gBlackPad)" stroke-width="13" stroke-linecap="round"/>
    <circle cx="116" cy="332" r="5" fill="#FFB300" stroke="${STROKE}" stroke-width="1"/>
  `,
  "foam-roller": `
    <ellipse cx="266" cy="508" rx="130" ry="14" fill="#000" opacity="0.12"/>
    <rect x="128" y="330" width="276" height="74" rx="37" fill="url(#gCyan)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="128" cy="367" rx="22" ry="37" fill="#29B6F6" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="404" cy="367" rx="22" ry="37" fill="#0288D1" stroke="${STROKE}" stroke-width="2"/>
    <rect x="180" y="350" width="172" height="14" rx="4" fill="#FFF" opacity="0.25"/>
    <ellipse cx="220" cy="348" rx="48" ry="8" fill="#FFF" opacity="0.2"/>
  `,
  stretching: `
    <ellipse cx="266" cy="508" rx="90" ry="12" fill="#000" opacity="0.1"/>
    <path d="M160 362 Q220 282 280 302 Q340 322 372 262" fill="none" stroke="url(#gGreenBand)" stroke-width="16" stroke-linecap="round"/>
    <circle cx="160" cy="362" r="22" fill="#388E3C" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="372" cy="262" r="22" fill="#388E3C" stroke="${STROKE}" stroke-width="2"/>
  `,
  bosu: `
    <ellipse cx="266" cy="518" rx="120" ry="16" fill="#000" opacity="0.14"/>
    <ellipse cx="266" cy="468" rx="118" ry="28" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="266" cy="458" rx="104" ry="20" fill="#333"/>
    <path d="M162 468 Q266 280 370 468 Z" fill="url(#gBlueBall)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="220" cy="360" rx="36" ry="20" fill="#FFF" opacity="0.35"/>
    <ellipse cx="266" cy="468" rx="90" ry="14" fill="#000" opacity="0.15"/>
    <rect x="230" y="448" width="72" height="8" rx="3" fill="#555" opacity="0.5"/>
  `,
  kettlebell: `
    <ellipse cx="266" cy="518" rx="70" ry="12" fill="#000" opacity="0.14"/>
    <path d="M206 280 Q266 220 326 280 L326 300 Q266 260 206 300 Z" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="248" y="296" width="36" height="24" rx="6" fill="#424242" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="266" cy="400" rx="88" ry="96" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="240" cy="360" rx="28" ry="16" fill="#FFF" opacity="0.12"/>
    <ellipse cx="266" cy="496" rx="72" ry="10" fill="#000" opacity="0.1"/>
  `,
  "medicine-ball": `
    <ellipse cx="266" cy="518" rx="90" ry="14" fill="#000" opacity="0.14"/>
    <circle cx="266" cy="340" r="120" fill="url(#gRedBall)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="220" cy="288" rx="32" ry="18" fill="#FFF" opacity="0.3"/>
    <g stroke="#FFF" stroke-width="1.5" opacity="0.15">
      <path d="M176 300 Q266 320 356 300"/>
      <path d="M166 340 Q266 360 366 340"/>
      <path d="M176 380 Q266 400 356 380"/>
    </g>
  `,
  "jump-rope": `
    <ellipse cx="266" cy="518" rx="80" ry="12" fill="#000" opacity="0.1"/>
    <path d="M160 280 Q120 360 160 440 Q220 480 266 420 Q312 360 372 400 Q420 440 400 320 Q380 240 320 280"
      fill="none" stroke="#E53935" stroke-width="10" stroke-linecap="round"/>
    <rect x="148" y="260" width="28" height="48" rx="8" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <rect x="356" y="260" width="28" height="48" rx="8" fill="url(#gBlackPad)" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="162" cy="272" rx="8" ry="6" fill="#FFF" opacity="0.15"/>
    <ellipse cx="370" cy="272" rx="8" ry="6" fill="#FFF" opacity="0.15"/>
  `,
  "punching-bag": `
    <ellipse cx="266" cy="518" rx="60" ry="12" fill="#000" opacity="0.14"/>
    <path d="M254 180 L278 180 L274 220 L258 220 Z" fill="url(#gSilver)" stroke="${STROKE}" stroke-width="2"/>
    <path d="M266 220 L266 248" stroke="#888" stroke-width="4"/>
    <ellipse cx="266" cy="252" rx="18" ry="8" fill="#757575" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M210 252 Q266 248 322 252 L318 460 Q266 490 214 460 Z" fill="url(#gRedBall)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="240" cy="320" rx="24" ry="40" fill="#FFF" opacity="0.12"/>
    <path d="M230 380 Q266 390 302 380" fill="none" stroke="#FFF" stroke-width="2" opacity="0.1"/>
  `,
  "agility-ladder": `
    <ellipse cx="266" cy="508" rx="130" ry="14" fill="#000" opacity="0.12"/>
    <path d="M120 380 L412 380 L412 400 L120 400 Z" fill="#FDD835" stroke="${STROKE}" stroke-width="2"/>
    <path d="M120 440 L412 440 L412 460 L120 460 Z" fill="#FDD835" stroke="${STROKE}" stroke-width="2"/>
    <g fill="#FFC107" stroke="${STROKE}" stroke-width="2">
      <rect x="148" y="380" width="14" height="80" rx="2"/>
      <rect x="208" y="380" width="14" height="80" rx="2"/>
      <rect x="268" y="380" width="14" height="80" rx="2"/>
      <rect x="328" y="380" width="14" height="80" rx="2"/>
      <rect x="388" y="380" width="14" height="80" rx="2"/>
    </g>
    <rect x="120" y="378" width="292" height="4" rx="1" fill="#FFF" opacity="0.25"/>
  `,
  "balance-board": `
    <ellipse cx="266" cy="518" rx="100" ry="14" fill="#000" opacity="0.14"/>
    <path d="M186 468 Q266 420 346 468 Q266 500 186 468 Z" fill="url(#gDarkMetal)" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="266" cy="448" rx="120" ry="28" fill="url(#gWood)" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="240" cy="438" rx="36" ry="10" fill="#FFF" opacity="0.22"/>
    <ellipse cx="266" cy="448" rx="100" ry="18" fill="#000" opacity="0.06"/>
  `,
};

function illustrationSvg3d(body, w, h) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${SVG_DEFS}
  <g filter="url(#softShadow)">${body}</g>
</svg>`;
}

module.exports = { ILLUSTRATIONS_3D, illustrationSvg3d, SVG_DEFS };
