import type { Routine, RoutineStep } from "@/lib/types/routine";
import { GETTING_DRESS_ROUTINE_IDS } from "@/lib/cards/getting-dress-undress-registry";

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

/**
 * Category tone from a **single step** image URL — outlines on Now / Next / Focus / compact.
 */
export function stepCardVisualTone(step: RoutineStep): RoutineVisualTone {
  const u = step.imageUrl ?? "";
  if (u.includes("/brushing-teeth/")) return "brushing";
  if (u.includes("/shower/")) return "shower";
  if (
    u.includes("/cards/getting-dress") ||
    u.includes("getting-dress-%26-undress") ||
    u.includes("getting-dress-&-undress")
  ) {
    return "dress";
  }
  if (u.includes("/climbing/")) return "climbing";
  if (u.includes("/cards/core/")) return "core";
  if (u.includes("/cards/swimming/")) return "swimming";
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
  for (const st of r.steps) {
    const t = stepCardVisualTone(st);
    if (t === "brushing") b++;
    else if (t === "shower") s++;
    else if (t === "dress") d++;
    else if (t === "climbing") cl++;
    else if (t === "core") co++;
    else if (t === "swimming") sw++;
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
 * Tone for **Home** and **Schedule Player index** tiles: catalog packs keep colour;
 * everything else (`custom`) uses black rings to mark “not a single stock pack”.
 */
export function routineVisualTone(r: Routine): RoutineVisualTone {
  if (!isStockPackRoutine(r)) return "custom";

  const id = r.id.trim().toLowerCase();

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

/**
 * @deprecated Prefer {@link routineHomeRoutineCardClass} + {@link routineAccentRings}.
 * Hover glow from {@link routinePlaybackVisualTone} for in-flow tiles.
 */
export function routineTileHoverAccentClass(r: Routine): string {
  return PALETTE[routinePlaybackVisualTone(r)].hoverGlow;
}
