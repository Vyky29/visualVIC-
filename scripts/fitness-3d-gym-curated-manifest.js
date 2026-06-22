/**
 * Curated gym sheet picks (16) — one step, one sandbag, one air bike; row 5 skipped.
 * Grid positions are 0-based (col, row) on the designer 5×5 sheet.
 *
 * @type {{ slug: string; title: string; col: number; row: number }[]}
 */
const FITNESS_3D_GYM_CURATED_SHEET = [
  // Row 1 — step + sandbags (single picks only)
  { slug: "aerobic-step", title: "Aerobic step", col: 0, row: 0 },
  { slug: "sandbag-stack", title: "Sandbags", col: 3, row: 0 },
  // Row 2 — strength machines
  { slug: "leg-press", title: "Leg press", col: 0, row: 1 },
  { slug: "chest-press", title: "Chest press", col: 1, row: 1 },
  { slug: "lat-pulldown", title: "Lat pulldown", col: 2, row: 1 },
  { slug: "cable-crossover", title: "Cable crossover", col: 3, row: 1 },
  { slug: "smith-machine", title: "Smith machine", col: 4, row: 1 },
  // Row 3 — benches & racks
  { slug: "bench-press", title: "Bench press", col: 0, row: 2 },
  { slug: "incline-bench", title: "Incline bench", col: 1, row: 2 },
  { slug: "squat-rack", title: "Squat rack", col: 2, row: 2 },
  { slug: "power-cage", title: "Power cage", col: 3, row: 2 },
  { slug: "seated-row", title: "Seated row", col: 4, row: 2 },
  // Row 4 — cardio (single air bike)
  { slug: "elliptical", title: "Elliptical", col: 0, row: 3 },
  { slug: "stair-climber", title: "Stair climber", col: 1, row: 3 },
  { slug: "skierg", title: "SkiErg", col: 2, row: 3 },
  { slug: "air-bike", title: "Air bike", col: 3, row: 3 },
];

module.exports = { FITNESS_3D_GYM_CURATED_SHEET };
