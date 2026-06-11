/** Shared London red double-decker bus — PixtoLearn flat 2D SVG body. */

export const LONDON_RED = "#DC241F";
export const LONDON_RED_DARK = "#9B1C1C";

/** Side-view Routemaster-style bus, centred ~y=324, fills most of 531×648. */
export const LONDON_BUS_BODY = `
  <rect width="531" height="648" fill="#FFFFFF"/>
  <!-- main body -->
  <rect x="64" y="228" width="384" height="212" rx="18" fill="${LONDON_RED}" stroke="${LONDON_RED_DARK}" stroke-width="4"/>
  <!-- upper deck -->
  <rect x="80" y="244" width="352" height="88" rx="10" fill="${LONDON_RED}" stroke="${LONDON_RED_DARK}" stroke-width="3"/>
  <!-- upper windows -->
  <rect x="96" y="258" width="48" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="152" y="258" width="48" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="208" y="258" width="48" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="264" y="258" width="48" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="320" y="258" width="48" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="376" y="258" width="40" height="56" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <!-- deck band -->
  <rect x="64" y="332" width="384" height="14" fill="${LONDON_RED_DARK}"/>
  <!-- lower deck -->
  <rect x="80" y="354" width="352" height="70" rx="10" fill="${LONDON_RED}" stroke="${LONDON_RED_DARK}" stroke-width="3"/>
  <!-- lower windows -->
  <rect x="96" y="366" width="48" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="152" y="366" width="48" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="208" y="366" width="48" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="264" y="366" width="48" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="320" y="366" width="48" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="376" y="366" width="40" height="46" rx="6" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <!-- open rear platform -->
  <path d="M64 354 L64 300 L36 300 L36 424 L64 424 Z" fill="#B71C1C" stroke="${LONDON_RED_DARK}" stroke-width="3"/>
  <rect x="36" y="354" width="28" height="70" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2" opacity="0.5"/>
  <!-- rounded front cab -->
  <path d="M448 228 Q492 248 492 296 L492 420 Q492 452 448 440 L448 228 Z"
    fill="${LONDON_RED}" stroke="${LONDON_RED_DARK}" stroke-width="4"/>
  <rect x="452" y="268" width="34" height="80" rx="8" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <rect x="452" y="368" width="34" height="52" rx="8" fill="#D6ECFF" stroke="#64B5F6" stroke-width="2"/>
  <!-- wheels -->
  <circle cx="152" cy="472" r="32" fill="#212121" stroke="#000" stroke-width="3"/>
  <circle cx="152" cy="472" r="12" fill="#BDBDBD"/>
  <circle cx="392" cy="472" r="32" fill="#212121" stroke="#000" stroke-width="3"/>
  <circle cx="392" cy="472" r="12" fill="#BDBDBD"/>
`;

export function londonBusSvg(height = 648) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="531" height="${height}" viewBox="0 0 531 648">
  ${LONDON_BUS_BODY}
</svg>`;
}
