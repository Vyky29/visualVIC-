import type { Routine } from "@/lib/types/routine";

export type RoutineVisualTone =
  | "brushing"
  | "shower"
  | "climbing"
  | "dress"
  | "core"
  | "swimming"
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
    home: "ring-2 ring-[#91C24C]/90 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#91C24C]/90 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#91C24C]/85 shadow-[0_8px_32px_-12px_rgba(145,194,76,0.38)]",
    scheduleNext:
      "ring-2 ring-[#91C24C]/78 shadow-[0_6px_22px_-12px_rgba(145,194,76,0.32)]",
    scheduleFocus:
      "ring-2 ring-[#91C24C]/88 shadow-[0_8px_32px_-12px_rgba(145,194,76,0.42)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#91C24C]/55 pl-3 ring-1 ring-[#91C24C]/22 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(145,194,76,0.45)]",
  },
  shower: {
    home: "ring-2 ring-[#143d66]/92 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#143d66]/92 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#143d66]/88 shadow-[0_8px_32px_-12px_rgba(20,61,102,0.38)]",
    scheduleNext:
      "ring-2 ring-[#143d66]/82 shadow-[0_6px_22px_-12px_rgba(20,61,102,0.3)]",
    scheduleFocus:
      "ring-2 ring-[#143d66]/90 shadow-[0_8px_32px_-12px_rgba(20,61,102,0.42)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#143d66]/55 pl-3 ring-1 ring-[#143d66]/28 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(20,61,102,0.38)]",
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
    home: "ring-2 ring-[#6B4E9E]/90 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#6B4E9E]/90 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#6B4E9E]/85 shadow-[0_8px_32px_-12px_rgba(107,78,158,0.35)]",
    scheduleNext:
      "ring-2 ring-[#6B4E9E]/78 shadow-[0_6px_22px_-12px_rgba(107,78,158,0.28)]",
    scheduleFocus:
      "ring-2 ring-[#6B4E9E]/88 shadow-[0_8px_32px_-12px_rgba(107,78,158,0.4)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#6B4E9E]/55 pl-3 ring-1 ring-[#6B4E9E]/28 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_40px_-10px_rgba(107,78,158,0.38)]",
  },
  core: {
    home: "ring-2 ring-[#4a6572]/88 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#4a6572]/88 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#4a6572]/85 shadow-[0_8px_32px_-12px_rgba(74,101,114,0.32)]",
    scheduleNext:
      "ring-2 ring-[#4a6572]/78 shadow-[0_6px_22px_-12px_rgba(74,101,114,0.26)]",
    scheduleFocus:
      "ring-2 ring-[#4a6572]/88 shadow-[0_8px_32px_-12px_rgba(74,101,114,0.36)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#4a6572]/50 pl-3 ring-1 ring-[#4a6572]/25 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(74,101,114,0.35)]",
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
    home: "ring-2 ring-[#4a8fa8]/88 ring-offset-2 ring-offset-canvas",
    homeDashboard:
      "ring-1 ring-[#4a8fa8]/88 ring-offset-1 ring-offset-canvas",
    scheduleNow:
      "ring-2 ring-[#4a8fa8]/85 shadow-[0_8px_32px_-12px_rgba(74,143,168,0.32)]",
    scheduleNext:
      "ring-2 ring-[#4a8fa8]/78 shadow-[0_6px_22px_-12px_rgba(74,143,168,0.26)]",
    scheduleFocus:
      "ring-2 ring-[#4a8fa8]/88 shadow-[0_8px_32px_-12px_rgba(74,143,168,0.36)]",
    scheduleCompact:
      "ml-0.5 border-l-[3px] border-dashed border-[#4a8fa8]/50 pl-3 ring-1 ring-[#4a8fa8]/28 ring-offset-2 ring-offset-cream",
    hoverGlow:
      "group-hover:shadow-[0_0_36px_-12px_rgba(74,143,168,0.35)]",
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

function dominantToneFromSteps(r: Routine): RoutineVisualTone | null {
  let b = 0;
  let s = 0;
  let cl = 0;
  let d = 0;
  let co = 0;
  let sw = 0;
  for (const st of r.steps) {
    const u = st.imageUrl ?? "";
    if (u.includes("/brushing-teeth/")) b++;
    else if (u.includes("/shower/")) s++;
    else if (u.includes("/climbing/")) cl++;
    else if (u.includes("getting-dress") || u.includes("undress")) d++;
    else if (u.includes("/cards/core/")) co++;
    else if (u.includes("/cards/swimming/")) sw++;
  }
  const ranked: [RoutineVisualTone, number][] = [
    ["brushing", b],
    ["shower", s],
    ["dress", d],
    ["climbing", cl],
    ["core", co],
    ["swimming", sw],
  ];
  const max = Math.max(b, s, d, cl, co, sw);
  if (max <= 0) return null;
  const top = ranked.filter(([, n]) => n === max).map(([k]) => k);
  const priority: RoutineVisualTone[] = [
    "brushing",
    "shower",
    "dress",
    "climbing",
    "core",
    "swimming",
  ];
  for (const p of priority) {
    if (top.includes(p)) return p;
  }
  return top[0] ?? null;
}

/**
 * Visual category for outlines / accents — from routine id, tags, or step image paths.
 */
export function routineVisualTone(r: Routine): RoutineVisualTone {
  if (!isStockPackRoutine(r)) return "custom";

  const id = r.id.toLowerCase();

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

export function routineAccentRings(r: Routine): RoutineAccentRings {
  return PALETTE[routineVisualTone(r)];
}

/** Sage fallback when `SwipeableStepCard` is used outside a routine context. */
export const DEFAULT_ROUTINE_ACCENT_RINGS: RoutineAccentRings =
  PALETTE.default;

/**
 * Schedule Player index (`/player`) and other list tiles:
 * catalog packs keep category color; modular demos / templates / custom use black (`custom`).
 */
export function routineHomeRoutineCardClass(r: Routine): string {
  const p = routineAccentRings(r);
  return `${p.home} ${p.hoverGlow}`;
}

/** Dashboard Home “Routines” 2×2 grid — slimmer ring than {@link routineHomeRoutineCardClass}. */
export function routineDashboardHomeGridTileClass(r: Routine): string {
  const p = routineAccentRings(r);
  return `${p.homeDashboard} ${p.hoverGlow}`;
}

/** Explicit alias for the vertical routine list on `/player` — same styling as {@link routineHomeRoutineCardClass}. */
export function routineSchedulePlayerIndexCardClass(r: Routine): string {
  return routineHomeRoutineCardClass(r);
}

/**
 * @deprecated Use {@link routineHomeRoutineCardClass} + {@link routineAccentRings} for schedule/focus.
 * Kept as alias for hover-only glow on tiles that already set their own ring.
 */
export function routineTileHoverAccentClass(r: Routine): string {
  return routineAccentRings(r).hoverGlow;
}
