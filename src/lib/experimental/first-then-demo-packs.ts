import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE } from "@/lib/cards/day-centre-ikram-cards";
import {
  DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
} from "@/lib/experimental/generated-pixto-demo-routine";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { firstThenDemoIkramHomeThenTitle } from "@/lib/i18n/app-shell-locale";

export type FirstThenDemoPackId = "hotel" | "ikram-home";

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

function ikramScheduleCard(slug: string): GeneratedPixtoCardProps {
  const index = DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.findIndex((s) => s.slug === slug);
  const card = DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS[index];
  if (!card) {
    throw new Error(`Missing Ikram schedule card for slug: ${slug}`);
  }
  return card;
}

function lc(s: string): string {
  return s.toLowerCase();
}

export function parseFirstThenDemoPackId(
  raw: string | null | undefined,
): FirstThenDemoPackId {
  return raw === "ikram-home" ? "ikram-home" : "hotel";
}

export function resolveFirstThenDemoPack(
  packId: FirstThenDemoPackId,
  lang: CardLanguageCode,
): FirstThenDemoPack {
  if (packId === "ikram-home") {
    return {
      id: "ikram-home",
      first: ikramScheduleCard("cab"),
      second: {
        ...ikramScheduleCard("home"),
        title: lc(firstThenDemoIkramHomeThenTitle(lang)),
      },
    };
  }

  return {
    id: "hotel",
    first: HOTEL_GENERATED_CARD_PROPS[3],
    second: HOTEL_GENERATED_CARD_PROPS[4],
  };
}

/** Player route to return to after Focus (schedule context). */
export function firstThenDemoPackRoutineHref(packId: FirstThenDemoPackId): string {
  return packId === "ikram-home" ? "/player/ikram-day-centre" : "/player/at-the-hotel";
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
  if (options?.onlyFirstThen) return "/dashboard";
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
