import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import { DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE } from "@/lib/cards/day-centre-ikram-cards";
import {
  DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
} from "@/lib/experimental/generated-pixto-demo-routine";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { firstThenDemoIkramHomeThenTitle } from "@/lib/i18n/app-shell-locale";

export type FirstThenDemoPackId = "hotel" | "ikram-home";

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

/** Preview image for dashboard / menu tiles. */
export function firstThenDemoPackPreviewUrl(packId: FirstThenDemoPackId): string {
  return resolveFirstThenDemoPack(packId, "en").second.illustrationUrl;
}
