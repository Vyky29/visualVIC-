import type { Routine, RoutineStep } from "@/lib/types/routine";
import { GETTING_DRESS_ROUTINE_IDS } from "@/lib/cards/getting-dress-undress-registry";

export type RoutineVisualTone =
  | "brushing"
  | "shower"
  | "climbing"
  | "dress"
  | "core"
  | "swimming"
  | "airport"
  | "hotel"
  | "daycentre"
  | "finish"
  /** Custom, plantillas y demos modulares — borde negro en Home / reproductor. */
  | "custom"
  | "default";

/** Rutinas “de serie”: un solo pack PixtoLearn (colores por categoría). */
const STOCK_PACK_IDS = new Set<string>([
  "brushing-teeth",
  "getting-dressed",
  "getting-undressed",
  "core-everyday",
  "shower-routine",
  "climbing-routine",
  "swimming-routine",
  "at-the-airport",
  "at-the-hotel",
  "at-the-day-centre",
  "physical",
  "physical-3d",
  "physical-3d-gym",
  "ikram-day-centre",
]);

export function isStockPackRoutine(r: Routine): boolean {
  return STOCK_PACK_IDS.has(r.id);
}

export type RoutineAccentRings = {
  home: string;
  /** Dashboard Home “Routines” grid — same hues, thinner ring than `home`. */
  homeDashboard: string;
  scheduleNow: string;
  scheduleNext: string;
  scheduleFocus: string;
  scheduleCompact: string;
  hoverGlow: string;
};

const PALETTE: Record<RoutineVisualTone, RoutineAccentRings> = {
  brushing: {
    home: "ring-2 ring-[#D4E1C2] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#D4E1C2] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#D4E1C2] shadow-[0_8px_32px_-12px_rgba(212,225,194,0.42)]",
    scheduleNext:
      "ring-2 ring-[#D4E1C2] shadow-[0_6px_22px_-12px_rgba(212,225,194,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#D4E1C2] shadow-[0_8px_32px_-12px_rgba(212,225,194,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#D4E1C2] pl-3 ring-1 ring-[#D4E1C2] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(212,225,194,0.55)]",
  },
  shower: {
    home: "ring-2 ring-[#A6C1F4] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#A6C1F4] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#A6C1F4] shadow-[0_8px_32px_-12px_rgba(166,193,244,0.42)]",
    scheduleNext:
      "ring-2 ring-[#A6C1F4] shadow-[0_6px_22px_-12px_rgba(166,193,244,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#A6C1F4] shadow-[0_8px_32px_-12px_rgba(166,193,244,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#A6C1F4] pl-3 ring-1 ring-[#A6C1F4] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(166,193,244,0.55)]",
  },
  climbing: {
    home: "ring-2 ring-[#E9AE2E]/95 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#E9AE2E]/95 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#E9AE2E]/88 shadow-[0_8px_32px_-12px_rgba(233,174,46,0.42)]",
    scheduleNext:
      "ring-2 ring-[#E9AE2E]/82 shadow-[0_6px_22px_-12px_rgba(233,174,46,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#E9AE2E]/90 shadow-[0_8px_32px_-12px_rgba(233,174,46,0.45)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#E9AE2E]/65 pl-3 ring-1 ring-[#E9AE2E]/35 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(233,174,46,0.42)]",
  },
  dress: {
    home: "ring-2 ring-[#A194BE] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#A194BE] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#A194BE] shadow-[0_8px_32px_-12px_rgba(161,148,190,0.4)]",
    scheduleNext:
      "ring-2 ring-[#A194BE] shadow-[0_6px_22px_-12px_rgba(161,148,190,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#A194BE] shadow-[0_8px_32px_-12px_rgba(161,148,190,0.44)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#A194BE] pl-3 ring-1 ring-[#A194BE] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(161,148,190,0.5)]",
  },
  core: {
    home: "ring-2 ring-[#CBCBC9] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#CBCBC9] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#CBCBC9] shadow-[0_8px_32px_-12px_rgba(203,203,201,0.42)]",
    scheduleNext:
      "ring-2 ring-[#CBCBC9] shadow-[0_6px_22px_-12px_rgba(203,203,201,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#CBCBC9] shadow-[0_8px_32px_-12px_rgba(203,203,201,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#CBCBC9] pl-3 ring-1 ring-[#CBCBC9] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(203,203,201,0.5)]",
  },
  custom: {
    home: "ring-2 ring-ink ring-offset-2 ring-offset-canvas",
    homeDashboard: "ring-1 ring-ink ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-ink/90 shadow-[0_8px_32px_-12px_rgba(28,36,32,0.22)]",
    scheduleNext:
      "ring-2 ring-ink/82 shadow-[0_6px_22px_-12px_rgba(28,36,32,0.18)]",
    scheduleFocus:
      "ring-2 ring-ink/92 shadow-[0_8px_32px_-12px_rgba(28,36,32,0.24)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-ink/35 pl-3 ring-1 ring-ink/15 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_28px_-10px_rgba(28,36,32,0.22)]",
  },
  swimming: {
    home: "ring-2 ring-[#B8E3F4] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#B8E3F4] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#B8E3F4] shadow-[0_8px_32px_-12px_rgba(184,227,244,0.42)]",
    scheduleNext:
      "ring-2 ring-[#B8E3F4] shadow-[0_6px_22px_-12px_rgba(184,227,244,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#B8E3F4] shadow-[0_8px_32px_-12px_rgba(184,227,244,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#B8E3F4] pl-3 ring-1 ring-[#B8E3F4] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(184,227,244,0.5)]",
  },
  airport: {
    home: "ring-2 ring-[#F9DD9F] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#F9DD9F] ring-offset-1 ring-offset-canvas",
    /** Schedule: no ring-offset — matches other packs so the ring hugs the card shell (HTML cards looked “gappy”). */
    scheduleNow:
      "ring-2 ring-[#F9DD9F] shadow-[0_8px_32px_-12px_rgba(249,221,159,0.44)]",
    scheduleNext:
      "ring-2 ring-[#F9DD9F] shadow-[0_6px_22px_-12px_rgba(249,221,159,0.36)]",
    scheduleFocus:
      "ring-2 ring-[#F9DD9F] shadow-[0_8px_32px_-12px_rgba(249,221,159,0.48)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#F9DD9F] pl-3 ring-1 ring-[#F9DD9F] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(249,221,159,0.52)]",
  },
  hotel: {
    home: "ring-2 ring-[#EBA29C] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#EBA29C] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#EBA29C] shadow-[0_8px_32px_-12px_rgba(235,162,156,0.42)]",
    scheduleNext:
      "ring-2 ring-[#EBA29C] shadow-[0_6px_22px_-12px_rgba(235,162,156,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#EBA29C] shadow-[0_8px_32px_-12px_rgba(235,162,156,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#EBA29C] pl-3 ring-1 ring-[#EBA29C] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(235,162,156,0.52)]",
  },
  daycentre: {
    home: "ring-2 ring-[#E05C9A] ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#E05C9A] ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#E05C9A] shadow-[0_8px_32px_-12px_rgba(224,92,154,0.42)]",
    scheduleNext:
      "ring-2 ring-[#E05C9A] shadow-[0_6px_22px_-12px_rgba(224,92,154,0.34)]",
    scheduleFocus:
      "ring-2 ring-[#E05C9A] shadow-[0_8px_32px_-12px_rgba(224,92,154,0.46)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#E05C9A] pl-3 ring-1 ring-[#E05C9A] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(224,92,154,0.52)]",
  },
  finish: {
    home: "ring-2 ring-[#9aa3a8]/88 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#9aa3a8]/88 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#9aa3a8]/90 shadow-[0_8px_32px_-12px_rgba(111,121,128,0.28)]",
    scheduleNext:
      "ring-2 ring-[#9aa3a8]/84 shadow-[0_6px_22px_-12px_rgba(111,121,128,0.22)]",
    scheduleFocus:
      "ring-2 ring-[#9aa3a8]/92 shadow-[0_8px_32px_-12px_rgba(111,121,128,0.3)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#9aa3a8]/55 pl-3 ring-1 ring-[#9aa3a8]/28 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_32px_-12px_rgba(111,121,128,0.26)]",
  },
  default: {
    home: "ring-2 ring-[#7d9b87]/75 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#7d9b87]/75 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-sage/80 shadow-[0_8px_32px_-12px_rgba(28,36,32,0.2)]",
    scheduleNext:
      "ring-2 ring-sage/75 shadow-[0_6px_22px_-12px_rgba(42,86,58,0.2)]",
    scheduleFocus:
      "ring-2 ring-sage/80 shadow-[0_8px_32px_-12px_rgba(28,36,32,0.2)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-ink/15 pl-3 ring-1 ring-ink/[0.06] ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_32px_-14px_rgba(125,155,135,0.32)]",
  },
};

function safeLowerDecoded(value: string | undefined | null): string {
  if (!value) return "";
  try {
    return decodeURIComponent(value).toLowerCase();
  } catch {
    return value.toLowerCase();
  }
}

function includesAny(haystack: string, needles: readonly string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function isFinishLikeStepData(step: RoutineStep, haystack: string): boolean {
  const id = step.id.trim().toLowerCase();
  const title = step.title.trim().toLowerCase();
  return (
    id === "__playback-finish__" ||
    id === "core-finish" ||
    title === "finish" ||
    includesAny(haystack, ["/cards/core/finish.png", " core finish "])
  );
}

/**
 * Category tone from a **single step** image URL — outlines on Now / Next / Focus / compact.
 */
export function stepCardVisualTone(step: RoutineStep): RoutineVisualTone {
  if (step.generatedPixto) {
    const c = step.generatedPixto.category.toLowerCase();
    if (c.includes("day centre")) return "daycentre";
    if (c.includes("hotel")) return "hotel";
    if (c.includes("airport")) return "airport";
    return "airport";
  }
  const u = safeLowerDecoded(step.imageUrl);
  const id = step.id.trim().toLowerCase();
  const title = step.title.trim().toLowerCase();
  const haystack = `${u} ${id} ${title}`;

  if (isFinishLikeStepData(step, haystack)) return "finish";

  // Mixed demo routines are composed from stock-pack steps; their ids are the
  // most reliable source for category tone and should win before looser text
  // matching. This fixes cases like `core-eat` inside Morning Routine.
  if (id.startsWith("core-")) return "core";
  if (id.startsWith("bt-")) return "brushing";
  if (id.startsWith("shower-")) return "shower";
  if (id.startsWith("climb-")) return "climbing";
  if (id.startsWith("swim-")) return "swimming";
  if (id.startsWith("gd-dressed-") || id.startsWith("gd-undressed-")) {
    return "dress";
  }

  if (
    includesAny(haystack, [
      "/brushing-teeth/",
      "toothbrush",
      "toothpaste",
      "top-teeth",
      "bottom-teeth",
      "brush-top-teeth",
      "brush-bottom-teeth",
      "brush tongue",
      "brush-tongue",
      "teeth",
      "mouth",
      "tongue",
      "rinse-mouth",
      "spit-out-water",
    ])
  ) {
    return "brushing";
  }
  if (
    includesAny(haystack, [
      "/shower/",
      "shower",
      "shampoo",
      "conditioner",
      "sponge",
      "comb",
      "hair-dryer",
      "massage-hair",
      "wet-hair",
      "wash-body",
      "wash-hair",
      "dry-body",
      "dry-hair",
      "rinse-body",
      "rinse-hair",
      "hydratate-body",
      "body-lotion",
      "brush-hair",
    ])
  ) {
    return "shower";
  }
  if (
    includesAny(haystack, [
      "/cards/getting-dress",
      "getting-dress-&-undress",
      "getting-dress-undress",
      "dress",
      "undress",
      "tshirt",
      "shirt",
      "trousers",
      "pants",
      "shoes",
      "socks",
      "jacket",
      "jumper",
      "hat",
      "scarf",
      "shorts",
      "trainers",
      "bra",
      "knickers",
      "vest",
      "gloves",
    ])
  ) {
    return "dress";
  }
  if (
    includesAny(haystack, [
      "/climbing/",
      "climb",
      "carabiner",
      "harness",
      "helmet",
      "grigri",
      "rope",
      "boulder",
      "magnesium",
      "hold",
      "knot",
    ])
  ) {
    return "climbing";
  }
  if (
    includesAny(haystack, [
      "/cards/core/",
      "wash-hands",
      "wash hands",
      "toilet",
      "eat",
      "drink",
      "walk",
      "listen",
      "quiet",
      "speak",
      "stand",
      "sit-down",
      "sit down",
      "stop",
      "wait",
      "look",
    ])
  ) {
    return "core";
  }
  if (
    includesAny(haystack, [
      "/cards/swimming/",
      "swim",
      "pool",
      "goggles",
      "googles",
      "flip-flops",
      "sinkers",
      "changing-room",
      "swimming-costume",
      "blow-bubbles",
      "kick-legs",
      "float",
      "splash",
    ])
  ) {
    return "swimming";
  }
  if (includesAny(haystack, ["at the airport", "airport"])) return "airport";
  if (includesAny(haystack, ["at the hotel", "hotel"])) return "hotel";
  if (includesAny(haystack, ["day centre", "day%20centre", "daycentre"])) {
    return "daycentre";
  }
  return "default";
}

/** Ring palette for this step; uses URL category, else `fallback` (e.g. routine-level). */
export function stepCardAccentRings(
  step: RoutineStep,
  fallback: RoutineAccentRings,
): RoutineAccentRings {
  const t = stepCardVisualTone(step);
  if (t !== "default") return PALETTE[t];
  return fallback;
}

function dominantToneFromSteps(r: Routine): RoutineVisualTone | null {
  let b = 0;
  let s = 0;
  let cl = 0;
  let d = 0;
  let co = 0;
  let sw = 0;
  let ap = 0;
  let ho = 0;
  let dc = 0;
  for (const st of r.steps) {
    const t = stepCardVisualTone(st);
    if (t === "brushing") b++;
    else if (t === "shower") s++;
    else if (t === "dress") d++;
    else if (t === "climbing") cl++;
    else if (t === "core") co++;
    else if (t === "swimming") sw++;
    else if (t === "airport") ap++;
    else if (t === "hotel") ho++;
    else if (t === "daycentre") dc++;
  }
  const ranked: [RoutineVisualTone, number][] = [
    ["brushing", b],
    ["shower", s],
    ["dress", d],
    ["climbing", cl],
    ["core", co],
    ["swimming", sw],
    ["airport", ap],
    ["hotel", ho],
    ["daycentre", dc],
  ];
  const max = Math.max(b, s, d, cl, co, sw, ap, ho, dc);
  if (max <= 0) return null;
  const top = ranked.filter(([, n]) => n === max).map(([k]) => k);
  const priority: RoutineVisualTone[] = [
    "brushing",
    "shower",
    "dress",
    "climbing",
    "core",
    "swimming",
    "airport",
    "hotel",
    "daycentre",
  ];
  for (const p of priority) {
    if (top.includes(p)) return p;
  }
  return top[0] ?? null;
}

/**
 * Tone for **Home** and **Schedule Player index** tiles: catalog packs keep colour;
 * everything else (`custom`) uses black rings to mark “not a single stock pack”.
 */
export function routineVisualTone(r: Routine): RoutineVisualTone {
  if (!isStockPackRoutine(r)) return "custom";

  const id = r.id.trim().toLowerCase();

  if (id === "at-the-airport") return "airport";
  if (id === "at-the-hotel") return "hotel";
  if (
    id === "at-the-day-centre" ||
    id === "physical" ||
    id === "physical-3d" ||
    id === "physical-3d-gym" ||
    id === "ikram-day-centre"
  )
    return "daycentre";

  if (id.includes("brush") || id.includes("teeth")) return "brushing";
  if (id.includes("shower")) return "shower";
  if (id.includes("swim")) return "swimming";
  if (id.includes("climb")) return "climbing";
  if (
    id.includes("dress") ||
    id.includes("undress") ||
    id === "getting-dressed" ||
    id === "getting-undressed"
  ) {
    return "dress";
  }
  if (id.includes("core")) return "core";

  const fromSteps = dominantToneFromSteps(r);
  if (fromSteps) return fromSteps;

  return "default";
}

/**
 * Tone while **playing** a routine (Now / Next / Focus / step cards): follows
 * content (id hints + dominant step imagery), so e.g. `demo-climbing-preparation` is yellow climbing, not list black.
 */
export function routinePlaybackVisualTone(r: Routine): RoutineVisualTone {
  const id = r.id.trim().toLowerCase();

  /** Stock dress packs — must win before `includes("swim")` / dominant mix (e.g. trunks, swimsuit slugs). */
  if ((GETTING_DRESS_ROUTINE_IDS as readonly string[]).includes(id)) {
    return "dress";
  }

  if (id.includes("brush") || id.includes("teeth")) return "brushing";
  if (id.includes("shower")) return "shower";
  if (id.includes("swim")) return "swimming";
  if (id.includes("climb")) return "climbing";
  if (
    id.includes("dress") ||
    id.includes("undress") ||
    id === "getting-dressed" ||
    id === "getting-undressed"
  ) {
    return "dress";
  }
  if (id === "at-the-airport") return "airport";
  if (id === "at-the-hotel") return "hotel";
  if (
    id === "at-the-day-centre" ||
    id === "physical" ||
    id === "physical-3d" ||
    id === "physical-3d-gym" ||
    id === "ikram-day-centre"
  )
    return "daycentre";
  if (id.includes("core")) return "core";

  const fromSteps = dominantToneFromSteps(r);
  if (fromSteps) return fromSteps;

  return "default";
}

export function routineAccentRings(r: Routine): RoutineAccentRings {
  return PALETTE[routinePlaybackVisualTone(r)];
}

/** Schedule Player header chrome (progress, counter, Focus CTA, “Now” label). */
export type RoutineSchedulePlayerChrome = {
  focusCta: string;
  progressFill: string;
  counterPill: string;
  nowDot: string;
  nowLabel: string;
};

const SCHEDULE_PLAYER_CHROME: Record<RoutineVisualTone, RoutineSchedulePlayerChrome> =
  {
    brushing: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-sage-mist to-sage-mist/70 text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#91C24C]/40 transition active:scale-[0.99]",
      progressFill: "bg-[#91C24C]",
      counterPill:
        "rounded-full bg-sage-mist/90 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#91C24C]/28",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#91C24C] ring-2 ring-[#91C24C]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6a8f3a]",
    },
    shower: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#e8eef5] to-[#d6e3f0] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#143d66]/35 transition active:scale-[0.99]",
      progressFill: "bg-[#143d66]",
      counterPill:
        "rounded-full bg-[#e8eef5]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#143d66]/28",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#143d66] ring-2 ring-[#143d66]/30",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#143d66]",
    },
    climbing: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#faf6ea] to-[#f3ecd8] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#E9AE2E]/45 transition active:scale-[0.99]",
      progressFill: "bg-[#E9AE2E]",
      counterPill:
        "rounded-full bg-[#faf6ea]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#E9AE2E]/40",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#E9AE2E] ring-2 ring-[#E9AE2E]/40",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7820]",
    },
    dress: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#f2edf8] to-[#e8e0f2] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#6B4E9E]/38 transition active:scale-[0.99]",
      progressFill: "bg-[#6B4E9E]",
      counterPill:
        "rounded-full bg-[#f0ebf7]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#6B4E9E]/30",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#6B4E9E] ring-2 ring-[#6B4E9E]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5c4488]",
    },
    core: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#e9eef1] to-[#dce4ea] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#4a6572]/35 transition active:scale-[0.99]",
      progressFill: "bg-[#4a6572]",
      counterPill:
        "rounded-full bg-[#e9eef1]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#4a6572]/28",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#4a6572] ring-2 ring-[#4a6572]/30",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4a6572]",
    },
    swimming: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#e8f4f7] to-[#d9ecf2] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#4a8fa8]/40 transition active:scale-[0.99]",
      progressFill: "bg-[#4a8fa8]",
      counterPill:
        "rounded-full bg-[#e8f4f7]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#4a8fa8]/32",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#4a8fa8] ring-2 ring-[#4a8fa8]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#3d7a8f]",
    },
    finish: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#eef1f2] to-[#e2e7ea] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#9aa3a8]/40 transition active:scale-[0.99]",
      progressFill: "bg-[#9aa3a8]",
      counterPill:
        "rounded-full bg-[#eef1f2]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#9aa3a8]/32",
      nowDot:
        "h-2 w-2 shrink-0 rounded-full bg-[#9aa3a8] ring-2 ring-[#9aa3a8]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7c858b]",
    },
    airport: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#fff9ed] to-[#F9DD9E]/75 text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#d4a017]/35 transition active:scale-[0.99]",
      progressFill: "bg-[#d4a017]",
      counterPill:
        "rounded-full bg-[#fff9ed]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#F9DD9E]/45",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#d4a017] ring-2 ring-[#F9DD9E]/45",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a7208]",
    },
    hotel: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#fdeef0] to-[#f8d5da] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#8C1E2E]/35 transition active:scale-[0.99]",
      progressFill: "bg-[#8C1E2E]",
      counterPill:
        "rounded-full bg-[#fdeef0]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#8C1E2E]/28",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#8C1E2E] ring-2 ring-[#8C1E2E]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8C1E2E]",
    },
    daycentre: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-[#fde8f4] to-[#f9c8e0] text-[15px] font-semibold text-ink shadow-card ring-1 ring-[#E05C9A]/35 transition active:scale-[0.99]",
      progressFill: "bg-[#E05C9A]",
      counterPill:
        "rounded-full bg-[#fde8f4]/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-[#E05C9A]/28",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-[#E05C9A] ring-2 ring-[#E05C9A]/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-[#E05C9A]",
    },
    custom: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-canvas-muted to-canvas-muted/70 text-[15px] font-semibold text-ink shadow-card ring-1 ring-ink/22 transition active:scale-[0.99]",
      progressFill: "bg-ink/75",
      counterPill:
        "rounded-full bg-canvas-muted/95 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-ink/15",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-ink/70 ring-2 ring-ink/20",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-ink-subtle",
    },
    default: {
      focusCta:
        "min-h-touch w-full bg-gradient-to-b from-sage-mist to-sage-mist/70 text-[15px] font-semibold text-ink shadow-card ring-1 ring-sage/35 transition active:scale-[0.99]",
      progressFill: "bg-sage",
      counterPill:
        "rounded-full bg-sage-mist/90 px-3 py-1.5 text-[12px] font-medium tabular-nums text-ink ring-1 ring-sage/25",
      nowDot: "h-2 w-2 shrink-0 rounded-full bg-sage ring-2 ring-sage/35",
      nowLabel:
        "text-[11px] font-semibold uppercase tracking-[0.22em] text-sage",
    },
  };

export function routineSchedulePlayerChrome(
  r: Routine,
): RoutineSchedulePlayerChrome {
  return SCHEDULE_PLAYER_CHROME[routinePlaybackVisualTone(r)];
}

/** Sage fallback when `SwipeableStepCard` is used outside a routine context. */
export const DEFAULT_ROUTINE_ACCENT_RINGS: RoutineAccentRings =
  PALETTE.default;

/**
 * Schedule Player index (`/player`) list tiles — uses {@link routineVisualTone} (black for non-catalog).
 */
export function routineHomeRoutineCardClass(r: Routine): string {
  const p = PALETTE[routineVisualTone(r)];
  return `${p.home} ${p.hoverGlow}`;
}

/** Dashboard Home “Routines” 2×2 grid — slimmer ring than {@link routineHomeRoutineCardClass}. */
export function routineDashboardHomeGridTileClass(r: Routine): string {
  const p = PALETTE[routineVisualTone(r)];
  return `${p.homeDashboard} ${p.hoverGlow}`;
}

/** Explicit alias for the vertical routine list on `/player` — same styling as {@link routineHomeRoutineCardClass}. */
export function routineSchedulePlayerIndexCardClass(r: Routine): string {
  return routineHomeRoutineCardClass(r);
}

function routineHasMixedStepCategoryTones(r: Routine): boolean {
  const tones = new Set<RoutineVisualTone>();
  for (const st of r.steps) {
    const t = stepCardVisualTone(st);
    if (t === "finish") continue;
    tones.add(t);
    if (tones.size > 1) return true;
  }
  return false;
}

/**
 * Dashboard Home “Continue” tile under Schedule Player: white shell; ring matches
 * routine grid tiles, or black when the routine is not a single stock pack or
 * steps mix multiple category tones.
 */
export function routineDashboardScheduleContinueCardClass(r: Routine): string {
  const tone: RoutineVisualTone =
    !isStockPackRoutine(r) || routineHasMixedStepCategoryTones(r)
      ? "custom"
      : routineVisualTone(r);
  const p = PALETTE[tone];
  return `${p.homeDashboard} ${p.hoverGlow}`;
}

/**
 * @deprecated Prefer {@link routineHomeRoutineCardClass} + {@link routineAccentRings}.
 * Hover glow from {@link routinePlaybackVisualTone} for in-flow tiles.
 */
export function routineTileHoverAccentClass(r: Routine): string {
  return PALETTE[routinePlaybackVisualTone(r)].hoverGlow;
}
