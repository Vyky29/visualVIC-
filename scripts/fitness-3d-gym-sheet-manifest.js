/**
 * Provisional slug order for the 5×5 gym equipment sheet (row-major).
 * Update titles when the designer confirms names left→right, top→bottom.
 */
/** @type {{ slug: string; title: string }[]} */
const FITNESS_3D_GYM_SHEET = [
  // Row 1 — steps & sandbags
  { slug: "aerobic-step", title: "Aerobic step" },
  { slug: "adjustable-step", title: "Adjustable step" },
  { slug: "sandbag-pink", title: "Sandbag" },
  { slug: "sandbag-stack", title: "Sandbag stack" },
  { slug: "sandbag-blue", title: "Sandbag" },
  // Row 2 — strength machines
  { slug: "leg-press", title: "Leg press" },
  { slug: "chest-press", title: "Chest press" },
  { slug: "lat-pulldown", title: "Lat pulldown" },
  { slug: "cable-crossover", title: "Cable crossover" },
  { slug: "smith-machine", title: "Smith machine" },
  // Row 3 — benches & racks
  { slug: "bench-press", title: "Bench press" },
  { slug: "incline-bench", title: "Incline bench" },
  { slug: "squat-rack", title: "Squat rack" },
  { slug: "power-cage", title: "Power cage" },
  { slug: "seated-row", title: "Seated row" },
  // Row 4 — cardio
  { slug: "elliptical", title: "Elliptical" },
  { slug: "stair-climber", title: "Stair climber" },
  { slug: "skierg", title: "SkiErg" },
  { slug: "air-bike", title: "Air bike" },
  { slug: "air-bike-2", title: "Air bike" },
  // Row 5 — accessories
  { slug: "lifting-belt", title: "Lifting belt" },
  { slug: "dip-belt", title: "Dip belt" },
  { slug: "lifting-straps", title: "Lifting straps" },
  { slug: "wraps", title: "Wraps" },
  { slug: "lifting-belt-2", title: "Lifting belt" },
];

module.exports = { FITNESS_3D_GYM_SHEET };
