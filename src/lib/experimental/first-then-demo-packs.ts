import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { HOTEL_GENERATED_CARD_PROPS } from "@/lib/experimental/generated-pixto-demo-routine";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  EMMANUEL_FIRST_THEN_PACK_IDS,
  isEmmanuelFirstThenPackId,
  normalizeEmmanuelFirstThenPackId,
  resolveEmmanuelFirstThenPack,
  type EmmanuelFirstThenPackId,
} from "@/lib/routines/emmanuel-first-then-packs";
import {
  IKRAM_FIRST_THEN_PACK_IDS,
  isIkramFirstThenPackId,
  normalizeIkramFirstThenPackId,
  resolveIkramFirstThenPack,
  type IkramFirstThenPackId,
} from "@/lib/routines/ikram-first-then-packs";

export type FirstThenDemoPackId =
  | "hotel"
  | IkramFirstThenPackId
  | EmmanuelFirstThenPackId;

export type FirstThenDemoLayoutId = "1" | "2" | "3";

export function parseFirstThenDemoLayout(
  raw: string | null | undefined,
): FirstThenDemoLayoutId {
  if (raw === "2" || raw === "stack") return "2";
  if (raw === "3" || raw === "timeline") return "3";
  return "1";
}

export type FirstThenDemoPack = {
  id: FirstThenDemoPackId;
  first: GeneratedPixtoCardProps;
  second: GeneratedPixtoCardProps;
};

export function parseFirstThenDemoPackId(
  raw: string | null | undefined,
): FirstThenDemoPackId {
  if (raw === "hotel") return "hotel";
  const ikram = normalizeIkramFirstThenPackId(raw);
  if (ikram) return ikram;
  const emmanuel = normalizeEmmanuelFirstThenPackId(raw);
  if (emmanuel) return emmanuel;
  return "ikram-cab-home";
}

export function resolveFirstThenDemoPack(
  packId: FirstThenDemoPackId,
  lang: CardLanguageCode,
): FirstThenDemoPack {
  if (packId === "hotel") {
    return {
      id: "hotel",
      first: HOTEL_GENERATED_CARD_PROPS[3],
      second: HOTEL_GENERATED_CARD_PROPS[4],
    };
  }

  if (isEmmanuelFirstThenPackId(packId)) {
    const { first, second } = resolveEmmanuelFirstThenPack(packId, lang);
    return { id: packId, first, second };
  }

  const { first, second } = resolveIkramFirstThenPack(packId, lang);
  return { id: packId, first, second };
}

/** Player route to return to after Focus (schedule context). */
export function firstThenDemoPackRoutineHref(packId: FirstThenDemoPackId): string {
  if (isIkramFirstThenPackId(packId)) return "/tailored/ikram";
  if (isEmmanuelFirstThenPackId(packId)) return "/tailored/emmanuel";
  return "/player/at-the-hotel";
}

/**
 * Routine target from Focus sidebar.
 * `onlyFirstThen` — 2-card-only routine → home when finished.
 * `from` — explicit `/player/...` when opened from schedule Focus.
 */
export function resolveFirstThenDemoRoutineHref(
  packId: FirstThenDemoPackId,
  options?: {
    from?: string | null;
    onlyFirstThen?: boolean;
  },
): string {
  if (options?.onlyFirstThen) {
    const from = options?.from?.trim();
    if (
      from &&
      (/^\/tailored\/[\w-]+$/.test(from) ||
        from === "/dashboard" ||
        from.startsWith("/day-centre"))
    ) {
      return from;
    }
    if (isIkramFirstThenPackId(packId)) return "/tailored/ikram";
    if (isEmmanuelFirstThenPackId(packId)) return "/tailored/emmanuel";
    return "/dashboard";
  }
  const from = options?.from?.trim();
  if (from && /^\/player\/[\w-]+$/.test(from)) return from;
  return firstThenDemoPackRoutineHref(packId);
}

export function parseFirstThenDemoOnlyFirstThen(
  raw: string | null | undefined,
): boolean {
  return raw === "1" || raw === "true" || raw === "only";
}

/** Preview image for dashboard / menu tiles. */
export function firstThenDemoPackPreviewUrl(packId: FirstThenDemoPackId): string {
  return resolveFirstThenDemoPack(packId, "en").second.illustrationUrl;
}

export {
  IKRAM_FIRST_THEN_PACK_IDS,
  type IkramFirstThenPackId,
  EMMANUEL_FIRST_THEN_PACK_IDS,
  type EmmanuelFirstThenPackId,
};
