/**
 * Level 1 — Generic Day Centre fitness & stretching illustrations.
 * Equipment/objects only — no people.
 * Output: public/cards/day centre/general/{slug}.png
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const W = 531;
const H = 648;
const outDir = path.join(root, "public", "cards", "day centre", "general");
const STROKE = "#212121";

/** @type {Record<string, string>} */
const ILLUSTRATIONS = {
  "therapy-ball": `
    <path d="M124 478 L407 478 L392 518 L139 518 Z" fill="#C7C7C7" stroke="${STROKE}" stroke-width="4" stroke-linejoin="round"/>
    <ellipse cx="266" cy="492" rx="82" ry="15" fill="${STROKE}" opacity="0.16"/>
    <circle cx="266" cy="310" r="130" fill="#7098D3"/>
    <ellipse cx="318" cy="318" rx="62" ry="118" fill="#5B82BC" opacity="0.42"/>
    <g fill="none" stroke="${STROKE}" stroke-width="3.5" stroke-linecap="round">
      <path d="M168 228 Q266 242 364 228"/>
      <path d="M152 262 Q266 280 380 262"/>
      <path d="M144 298 Q266 318 388 298"/>
      <path d="M142 334 Q266 352 390 334"/>
      <path d="M148 370 Q266 386 384 370"/>
      <path d="M162 404 Q266 416 370 404"/>
    </g>
    <circle cx="266" cy="310" r="130" fill="none" stroke="${STROKE}" stroke-width="4"/>
  `,
  trampoline: `
    <ellipse cx="266" cy="498" rx="108" ry="14" fill="${STROKE}" opacity="0.1"/>
    <g stroke="${STROKE}" stroke-width="3.5" stroke-linecap="round">
      <line x1="394" y1="306" x2="404" y2="348"/>
      <line x1="138" y1="306" x2="128" y2="348"/>
      <line x1="266" y1="276" x2="266" y2="318"/>
    </g>
    <rect x="398" y="346" width="12" height="38" rx="5" fill="#BDBDBD" stroke="${STROKE}" stroke-width="3"/>
    <rect x="122" y="346" width="12" height="38" rx="5" fill="#BDBDBD" stroke="${STROKE}" stroke-width="3"/>
    <rect x="260" y="316" width="12" height="34" rx="5" fill="#BDBDBD" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="404" cy="388" rx="10" ry="5" fill="${STROKE}"/>
    <ellipse cx="128" cy="388" rx="10" ry="5" fill="${STROKE}"/>
    <ellipse cx="266" cy="354" rx="10" ry="5" fill="${STROKE}"/>
    <ellipse cx="266" cy="332" rx="150" ry="54" fill="#424242" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="266" cy="328" rx="128" ry="46" fill="#D5D5D5" stroke="${STROKE}" stroke-width="3"/>
    <g stroke="${STROKE}" stroke-width="2">
      <line x1="266" y1="282" x2="266" y2="374"/>
      <line x1="155" y1="304" x2="377" y2="352"/>
      <line x1="155" y1="352" x2="377" y2="304"/>
      <line x1="194" y1="288" x2="338" y2="368"/>
      <line x1="338" y1="288" x2="194" y2="368"/>
      <line x1="128" y1="328" x2="404" y2="328"/>
      <line x1="142" y1="296" x2="390" y2="360"/>
      <line x1="390" y1="296" x2="142" y2="360"/>
      <line x1="176" y1="284" x2="356" y2="372"/>
      <line x1="356" y1="284" x2="176" y2="372"/>
      <line x1="210" y1="280" x2="322" y2="376"/>
      <line x1="322" y1="280" x2="210" y2="376"/>
    </g>
    <ellipse cx="266" cy="322" rx="94" ry="32" fill="#353535" stroke="${STROKE}" stroke-width="3.5"/>
    <g stroke="${STROKE}" stroke-width="3.5" stroke-linecap="round">
      <line x1="266" y1="382" x2="266" y2="468"/>
      <line x1="360" y1="360" x2="378" y2="444"/>
      <line x1="172" y1="360" x2="154" y2="444"/>
    </g>
    <rect x="260" y="382" width="12" height="92" rx="5" fill="#CFCFCF" stroke="${STROKE}" stroke-width="3"/>
    <rect x="354" y="358" width="12" height="90" rx="5" fill="#CFCFCF" stroke="${STROKE}" stroke-width="3"/>
    <rect x="166" y="358" width="12" height="90" rx="5" fill="#CFCFCF" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="266" cy="478" rx="11" ry="6" fill="${STROKE}"/>
    <ellipse cx="378" cy="454" rx="11" ry="6" fill="${STROKE}"/>
    <ellipse cx="154" cy="454" rx="11" ry="6" fill="${STROKE}"/>
    <ellipse cx="266" cy="332" rx="150" ry="54" fill="none" stroke="${STROKE}" stroke-width="4"/>
  `,
  "step-platform": `
    <ellipse cx="266" cy="508" rx="124" ry="14" fill="${STROKE}" opacity="0.11"/>
    <rect x="108" y="428" width="66" height="78" rx="10" fill="#3A3A3A" stroke="${STROKE}" stroke-width="4"/>
    <line x1="108" y1="467" x2="174" y2="467" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="358" y="428" width="66" height="78" rx="10" fill="#3A3A3A" stroke="${STROKE}" stroke-width="4"/>
    <line x1="358" y1="467" x2="424" y2="467" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M402 308 L424 334 L424 428 L402 428 Z" fill="#B8B8B8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="112" y="308" width="290" height="76" rx="14" fill="#D6D6D6" stroke="${STROKE}" stroke-width="4"/>
    <rect x="120" y="326" width="18" height="36" rx="5" fill="#C6C6C6" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="376" y="326" width="18" height="36" rx="5" fill="#C6C6C6" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="116" y="256" width="286" height="56" rx="12" fill="#353535" stroke="${STROKE}" stroke-width="4"/>
    <rect x="116" y="304" width="286" height="10" rx="3" fill="#2A2A2A" opacity="0.35"/>
  `,
  treadmill: `
    <ellipse cx="278" cy="502" rx="136" ry="14" fill="${STROKE}" opacity="0.1"/>
    <rect x="392" y="394" width="38" height="54" rx="6" fill="#3A3A3A" stroke="${STROKE}" stroke-width="3.5"/>
    <rect x="108" y="378" width="46" height="66" rx="8" fill="#3A3A3A" stroke="${STROKE}" stroke-width="4"/>
    <rect x="142" y="398" width="256" height="38" rx="5" fill="#2A2A2A" stroke="${STROKE}" stroke-width="3"/>
    <g stroke="#404040" stroke-width="2">
      <line x1="154" y1="408" x2="386" y2="408"/>
      <line x1="154" y1="416" x2="386" y2="416"/>
      <line x1="154" y1="424" x2="386" y2="424"/>
    </g>
    <rect x="124" y="386" width="22" height="54" rx="5" fill="#D0D0D0" stroke="${STROKE}" stroke-width="3"/>
    <rect x="394" y="390" width="18" height="50" rx="4" fill="#BDBDBD" stroke="${STROKE}" stroke-width="3"/>
    <rect x="118" y="272" width="16" height="110" rx="6" fill="#D8D8D8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="118" y="272" width="7" height="110" rx="3" fill="#A8A8A8"/>
    <rect x="162" y="272" width="16" height="110" rx="6" fill="#D8D8D8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="162" y="272" width="7" height="110" rx="3" fill="#A8A8A8"/>
    <rect x="110" y="238" width="112" height="72" rx="12" fill="#424242" stroke="${STROKE}" stroke-width="4"/>
    <rect x="122" y="252" width="76" height="30" rx="5" fill="#42A5F5" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="126" y="290" width="24" height="13" rx="3" fill="#FDD835" stroke="${STROKE}" stroke-width="2"/>
    <rect x="174" y="290" width="24" height="13" rx="3" fill="#1E88E5" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="152" cy="306" r="9" fill="#E53935" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M110 308 Q78 336 86 378" fill="none" stroke="#353535" stroke-width="11" stroke-linecap="round"/>
    <path d="M214 300 Q248 326 240 368" fill="none" stroke="#353535" stroke-width="11" stroke-linecap="round"/>
    <ellipse cx="86" cy="382" rx="11" ry="9" fill="#2A2A2A" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="240" cy="372" rx="11" ry="9" fill="#2A2A2A" stroke="${STROKE}" stroke-width="2.5"/>
  `,
  "exercise-machine": `
    <rect x="132" y="470" width="268" height="14" rx="5" fill="#B8B8B8" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="132" cy="477" rx="10" ry="8" fill="${STROKE}"/>
    <ellipse cx="400" cy="477" rx="10" ry="8" fill="${STROKE}"/>
    <rect x="178" y="298" width="14" height="176" rx="4" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="340" y="298" width="14" height="176" rx="4" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="252" y="286" width="16" height="188" rx="4" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <rect x="164" y="278" width="204" height="14" rx="5" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="347" cy="318" r="11" fill="#686868" stroke="${STROKE}" stroke-width="2.5"/>
    <line x1="347" y1="329" x2="272" y2="418" stroke="#686868" stroke-width="2.5"/>
    <rect x="234" y="422" width="52" height="54" rx="5" fill="#424242" stroke="${STROKE}" stroke-width="3"/>
    <rect x="238" y="426" width="44" height="9" rx="2" fill="#525252" stroke="${STROKE}" stroke-width="1"/>
    <rect x="238" y="437" width="44" height="9" rx="2" fill="#424242" stroke="${STROKE}" stroke-width="1"/>
    <rect x="238" y="448" width="44" height="9" rx="2" fill="#525252" stroke="${STROKE}" stroke-width="1"/>
    <rect x="238" y="459" width="44" height="9" rx="2" fill="#424242" stroke="${STROKE}" stroke-width="1"/>
    <rect x="226" y="370" width="68" height="14" rx="6" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <rect x="262" y="318" width="18" height="62" rx="7" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <path d="M184 278 Q176 318 192 352" fill="none" stroke="#B0B0B0" stroke-width="11" stroke-linecap="round"/>
    <path d="M348 278 Q356 318 340 352" fill="none" stroke="#B0B0B0" stroke-width="11" stroke-linecap="round"/>
    <rect x="176" y="344" width="38" height="24" rx="9" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <rect x="318" y="344" width="38" height="24" rx="9" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <line x1="194" y1="356" x2="252" y2="422" stroke="#686868" stroke-width="2.5"/>
    <line x1="338" y1="356" x2="272" y2="422" stroke="#686868" stroke-width="2.5"/>
  `,
  weights: `
    <circle cx="292" cy="312" r="78" fill="#333333" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="292" cy="312" r="62" fill="none" stroke="#555555" stroke-width="2"/>
    <circle cx="292" cy="312" r="48" fill="none" stroke="#555555" stroke-width="1.5"/>
    <circle cx="292" cy="312" r="20" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="296" cy="322" r="78" fill="#2A2A2A" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="296" cy="322" r="62" fill="none" stroke="#555555" stroke-width="2"/>
    <circle cx="296" cy="322" r="20" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="362" cy="328" r="54" fill="#333333" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="362" cy="328" r="42" fill="none" stroke="#555555" stroke-width="2"/>
    <circle cx="362" cy="328" r="16" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="366" cy="336" r="54" fill="#2A2A2A" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="366" cy="336" r="16" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="416" cy="342" r="38" fill="#333333" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="416" cy="342" r="28" fill="none" stroke="#555555" stroke-width="2"/>
    <circle cx="416" cy="342" r="14" fill="#1A1A1A" stroke="${STROKE}" stroke-width="2"/>
    <polygon points="142,442 168,428 194,442 194,474 168,488 142,474" fill="#212121" stroke="${STROKE}" stroke-width="3.5" stroke-linejoin="round"/>
    <rect x="188" y="450" width="78" height="13" rx="6" fill="#B8B8B8" stroke="${STROKE}" stroke-width="2.5" transform="rotate(16 227 456)"/>
    <polygon points="256,458 282,444 308,458 308,490 282,504 256,490" fill="#212121" stroke="${STROKE}" stroke-width="3.5" stroke-linejoin="round"/>
  `,
  "row-machine": `
    <rect x="96" y="472" width="328" height="12" rx="4" fill="#ECECEC" stroke="${STROKE}" stroke-width="3"/>
    <rect x="96" y="460" width="12" height="24" rx="3" fill="#ECECEC" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="102" cy="486" rx="9" ry="7" fill="${STROKE}"/>
    <ellipse cx="418" cy="486" rx="9" ry="7" fill="${STROKE}"/>
    <rect x="104" y="404" width="204" height="10" rx="3" fill="#E0E0E0" stroke="${STROKE}" stroke-width="3"/>
    <rect x="118" y="374" width="58" height="16" rx="5" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <rect x="132" y="390" width="12" height="16" rx="3" fill="#C8C8C8" stroke="${STROKE}" stroke-width="2"/>
    <path d="M236 382 L270 360 L270 424 L236 446 Z" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <g stroke="#424242" stroke-width="2">
      <line x1="244" y1="368" x2="266" y2="434"/>
      <line x1="250" y1="365" x2="272" y2="431"/>
      <line x1="256" y1="362" x2="278" y2="428"/>
    </g>
    <path d="M274 382 L308 360 L308 424 L274 446 Z" fill="#212121" stroke="${STROKE}" stroke-width="3"/>
    <g stroke="#424242" stroke-width="2">
      <line x1="282" y1="368" x2="304" y2="434"/>
      <line x1="288" y1="365" x2="310" y2="431"/>
    </g>
    <rect x="344" y="284" width="14" height="188" rx="3" fill="#ECECEC" stroke="${STROKE}" stroke-width="3"/>
    <rect x="374" y="284" width="14" height="188" rx="3" fill="#ECECEC" stroke="${STROKE}" stroke-width="3"/>
    <rect x="358" y="294" width="6" height="168" rx="2" fill="#B8B8B8" stroke="${STROKE}" stroke-width="1.5"/>
    <rect x="368" y="294" width="6" height="168" rx="2" fill="#B8B8B8" stroke="${STROKE}" stroke-width="1.5"/>
    <rect x="352" y="384" width="34" height="74" rx="4" fill="#424242" stroke="${STROKE}" stroke-width="3"/>
    <rect x="356" y="388" width="26" height="10" rx="2" fill="#525252" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="400" width="26" height="10" rx="2" fill="#424242" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="412" width="26" height="10" rx="2" fill="#525252" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="424" width="26" height="10" rx="2" fill="#424242" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="436" width="26" height="10" rx="2" fill="#525252" stroke="${STROKE}" stroke-width="1"/>
    <rect x="292" y="300" width="12" height="166" rx="3" fill="#ECECEC" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="298" cy="314" r="13" fill="#686868" stroke="${STROKE}" stroke-width="2.5"/>
    <circle cx="276" cy="346" r="10" fill="#686868" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M298 327 L298 362 L276 354 L276 396" fill="none" stroke="#212121" stroke-width="2.5" stroke-linecap="round"/>
    <line x1="369" y1="384" x2="298" y2="314" stroke="#212121" stroke-width="2.5"/>
    <path d="M254 404 L268 390 L282 404" fill="none" stroke="#212121" stroke-width="11" stroke-linecap="round"/>
    <rect x="262" y="402" width="12" height="30" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2.5"/>
  `,
  skis: `
    <path d="M160 420 Q200 280 240 200 L252 200 Q220 300 200 420 Z" fill="#E53935" stroke="${STROKE}" stroke-width="4"/>
    <path d="M280 420 Q320 280 360 200 L372 200 Q340 300 320 420 Z" fill="#1E88E5" stroke="${STROKE}" stroke-width="4"/>
    <rect x="236" y="196" width="8" height="48" rx="2" fill="#5D4037" stroke="${STROKE}" stroke-width="1"/>
    <rect x="356" y="196" width="8" height="48" rx="2" fill="#5D4037" stroke="${STROKE}" stroke-width="1"/>
    <ellipse cx="248" cy="408" rx="16" ry="8" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
    <ellipse cx="368" cy="408" rx="16" ry="8" fill="#FFD54F" stroke="${STROKE}" stroke-width="2"/>
  `,
  "exercise-bike": `
    <ellipse cx="262" cy="512" rx="118" ry="14" fill="${STROKE}" opacity="0.1"/>
    <rect x="128" y="472" width="188" height="14" rx="6" fill="#C4C4C4" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="128" cy="479" rx="9" ry="11" fill="${STROKE}"/>
    <ellipse cx="316" cy="479" rx="9" ry="11" fill="${STROKE}"/>
    <rect x="208" y="460" width="176" height="14" rx="6" fill="#D2D2D2" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="208" cy="467" rx="9" ry="11" fill="${STROKE}"/>
    <ellipse cx="384" cy="467" rx="9" ry="11" fill="${STROKE}"/>
    <circle cx="228" cy="392" r="90" fill="#424242" stroke="${STROKE}" stroke-width="4"/>
    <circle cx="228" cy="392" r="60" fill="#686868" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="228" cy="392" r="24" fill="#8A8A8A" stroke="${STROKE}" stroke-width="2"/>
    <path d="M228 392 L292 278 L328 318 L228 392 Z" fill="#525252" stroke="${STROKE}" stroke-width="3"/>
    <rect x="172" y="302" width="12" height="118" rx="5" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="178" cy="288" rx="44" ry="19" fill="#212121" stroke="${STROKE}" stroke-width="3.5"/>
    <rect x="304" y="262" width="12" height="162" rx="5" fill="#C8C8C8" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="310" cy="348" r="12" fill="#E53935" stroke="${STROKE}" stroke-width="2.5"/>
    <path d="M310 262 Q282 218 252 226" fill="none" stroke="#212121" stroke-width="12" stroke-linecap="round"/>
    <path d="M322 262 Q362 224 382 236" fill="none" stroke="#212121" stroke-width="12" stroke-linecap="round"/>
    <rect x="292" y="248" width="50" height="34" rx="7" fill="#424242" stroke="${STROKE}" stroke-width="3"/>
    <rect x="298" y="254" width="38" height="15" rx="3" fill="#42A5F5" stroke="${STROKE}" stroke-width="1.5"/>
    <rect x="308" y="272" width="18" height="8" rx="2" fill="#FDD835" stroke="${STROKE}" stroke-width="1.5"/>
    <line x1="228" y1="392" x2="176" y2="424" stroke="#3A3A3A" stroke-width="7" stroke-linecap="round"/>
    <line x1="228" y1="392" x2="280" y2="434" stroke="#3A3A3A" stroke-width="7" stroke-linecap="round"/>
    <rect x="158" y="416" width="30" height="15" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2.5"/>
    <rect x="268" y="426" width="30" height="15" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2.5"/>
  `,
  "exercise-mat": `
    <ellipse cx="278" cy="498" rx="132" ry="12" fill="${STROKE}" opacity="0.1"/>
    <path d="M198 372 L418 356 L418 470 L198 486 Z" fill="#9B7ED8" stroke="${STROKE}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M106 372 L198 372 L198 486 L106 486 Z" fill="#8B73CC" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="152" cy="360" rx="50" ry="20" fill="#B8A4E8" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="106" cy="429" rx="54" ry="54" fill="#9B7ED8" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="106" cy="429" rx="42" ry="42" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="106" cy="429" rx="30" ry="30" fill="none" stroke="${STROKE}" stroke-width="2.5"/>
    <ellipse cx="106" cy="429" rx="18" ry="18" fill="none" stroke="${STROKE}" stroke-width="2"/>
    <circle cx="106" cy="429" r="9" fill="#5E35B1" stroke="${STROKE}" stroke-width="2"/>
  `,
  "resistance-bands": `
    <path d="M154 244 L382 300 L370 320 L142 264 Z" fill="#43A047" stroke="${STROKE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M166 256 L370 304" fill="none" stroke="${STROKE}" stroke-width="2" opacity="0.3"/>
    <rect x="126" y="248" width="22" height="10" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2"/>
    <path d="M120 232 L120 276" stroke="#212121" stroke-width="13" stroke-linecap="round"/>
    <path d="M120 232 Q104 254 120 276" fill="none" stroke="#212121" stroke-width="9" stroke-linecap="round"/>
    <circle cx="136" cy="252" r="4" fill="#FFB300" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M134 322 L362 378 L350 398 L122 342 Z" fill="#E53935" stroke="${STROKE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M146 334 L350 382" fill="none" stroke="${STROKE}" stroke-width="2" opacity="0.3"/>
    <rect x="106" y="326" width="22" height="10" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2"/>
    <path d="M100 310 L100 354" stroke="#212121" stroke-width="13" stroke-linecap="round"/>
    <path d="M100 310 Q84 332 100 354" fill="none" stroke="#212121" stroke-width="9" stroke-linecap="round"/>
    <circle cx="116" cy="330" r="4" fill="#FFB300" stroke="${STROKE}" stroke-width="1.5"/>
    <path d="M114 402 L350 458 L338 478 L102 422 Z" fill="#FDD835" stroke="${STROKE}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M126 414 L338 462" fill="none" stroke="${STROKE}" stroke-width="2" opacity="0.3"/>
    <rect x="86" y="406" width="22" height="10" rx="4" fill="#212121" stroke="${STROKE}" stroke-width="2"/>
    <path d="M80 390 L80 434" stroke="#212121" stroke-width="13" stroke-linecap="round"/>
    <path d="M80 390 Q64 412 80 434" fill="none" stroke="#212121" stroke-width="9" stroke-linecap="round"/>
    <circle cx="96" cy="410" r="4" fill="#FFB300" stroke="${STROKE}" stroke-width="1.5"/>
  `,
  "foam-roller": `
    <rect x="128" y="328" width="276" height="72" rx="36" fill="#4FC3F7" stroke="${STROKE}" stroke-width="4"/>
    <ellipse cx="128" cy="364" rx="20" ry="36" fill="#29B6F6" stroke="${STROKE}" stroke-width="3"/>
    <ellipse cx="404" cy="364" rx="20" ry="36" fill="#29B6F6" stroke="${STROKE}" stroke-width="3"/>
    <rect x="180" y="348" width="172" height="12" rx="4" fill="#B3E5FC" opacity="0.6"/>
  `,
  stretching: `
    <path d="M160 360 Q220 280 280 300 Q340 320 372 260" fill="none" stroke="#43A047" stroke-width="12" stroke-linecap="round"/>
    <circle cx="160" cy="360" r="20" fill="#2E7D32" stroke="${STROKE}" stroke-width="3"/>
    <circle cx="372" cy="260" r="20" fill="#2E7D32" stroke="${STROKE}" stroke-width="3"/>
    <rect x="148" y="400" width="236" height="24" rx="8" fill="#7E57C2" stroke="${STROKE}" stroke-width="2" opacity="0.35"/>
  `,
};

const SLUGS = Object.keys(ILLUSTRATIONS);

function illustrationSvg(body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="#FFFFFF"/>
  ${body}
</svg>`;
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  for (const slug of SLUGS) {
    const dest = path.join(outDir, `${slug}.png`);
    await sharp(Buffer.from(illustrationSvg(ILLUSTRATIONS[slug]))).png().toFile(dest);
    console.log("ok:", path.relative(root, dest));
  }

  console.log(`Done — ${SLUGS.length} fitness illustrations → ${outDir}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
