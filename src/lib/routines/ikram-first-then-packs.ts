import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import {
  DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS,
  DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS,
  GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
} from "@/lib/experimental/generated-pixto-demo-routine";
import {
  DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL,
  DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE,
  DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE,
} from "@/lib/cards/day-centre-ikram-cards";
import {
  dayCentreHubRoomImageUrl,
  dayCentreIkramPackMarkUrl,
} from "@/lib/cards/day-centre-shared";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import {
  firstThenDemoIkramHomeThenTitle,
  ikramFirstThenPackTitle,
} from "@/lib/i18n/app-shell-locale";

export const IKRAM_FIRST_THEN_PACK_IDS = [
  "ikram-sit-walk",
  "ikram-toilet-hub",
  "ikram-cab-home",
] as const;

export type IkramFirstThenPackId = (typeof IKRAM_FIRST_THEN_PACK_IDS)[number];

export type IkramFirstThenPackSpec = {
  id: IkramFirstThenPackId;
  firstSlug: string;
  secondSlug: string;
  /** When set, overrides the second card title (e.g. home with muchie). */
  secondTitleKey?: "home-with-muchie";
  /** Use hub-room illustration instead of an Ikram library slug. */
  secondUsesHubRoom?: boolean;
};

export const IKRAM_FIRST_THEN_PACKS: readonly IkramFirstThenPackSpec[] = [
  {
    id: "ikram-sit-walk",
    firstSlug: "sit-down",
    secondSlug: "walk",
  },
  {
    id: "ikram-toilet-hub",
    firstSlug: "toilet",
    secondSlug: "hub-room",
    secondUsesHubRoom: true,
  },
  {
    id: "ikram-cab-home",
    firstSlug: "cab",
    secondSlug: "home",
    secondTitleKey: "home-with-muchie",
  },
] as const;

function lc(s: string): string {
  return s.toLowerCase();
}

function ikramLibraryCard(slug: string): GeneratedPixtoCardProps {
  const index = DAY_CENTRE_IKRAM_LIBRARY_SEQUENCE.findIndex((s) => s.slug === slug);
  const card = DAY_CENTRE_IKRAM_GENERATED_CARD_PROPS[index];
  if (!card) {
    throw new Error(`Missing Ikram library card for slug: ${slug}`);
  }
  return card;
}

function ikramScheduleCard(slug: string): GeneratedPixtoCardProps {
  const index = DAY_CENTRE_IKRAM_SCHEDULE_SEQUENCE.findIndex((s) => s.slug === slug);
  const card = DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS[index];
  if (!card) {
    throw new Error(`Missing Ikram schedule card for slug: ${slug}`);
  }
  return card;
}

function ikramHubRoomCard(lang: CardLanguageCode): GeneratedPixtoCardProps {
  return {
    illustrationUrl: dayCentreHubRoomImageUrl(),
    title: lc(lang === "es" ? "sala hub" : "hub room"),
    category: lc(DAY_CENTRE_IKRAM_CARD_CATEGORY_LABEL),
    categoryColour: GENERATED_PIXTO_TAILORED_SCHEDULES_CATEGORY_COLOUR,
    iconUrl: dayCentreIkramPackMarkUrl(),
  };
}

function ikramFirstThenCard(
  slug: string,
  options?: { schedule?: boolean; titleOverride?: string },
): GeneratedPixtoCardProps {
  const base = options?.schedule ? ikramScheduleCard(slug) : ikramLibraryCard(slug);
  if (!options?.titleOverride) return base;
  return { ...base, title: lc(options.titleOverride) };
}

export function isIkramFirstThenPackId(value: string): value is IkramFirstThenPackId {
  return (IKRAM_FIRST_THEN_PACK_IDS as readonly string[]).includes(value);
}

export function normalizeIkramFirstThenPackId(
  raw: string | null | undefined,
): IkramFirstThenPackId | null {
  if (raw === "ikram-home") return "ikram-cab-home";
  if (raw && isIkramFirstThenPackId(raw)) return raw;
  return null;
}

export function resolveIkramFirstThenPack(
  packId: IkramFirstThenPackId,
  lang: CardLanguageCode,
): { first: GeneratedPixtoCardProps; second: GeneratedPixtoCardProps } {
  const spec = IKRAM_FIRST_THEN_PACKS.find((p) => p.id === packId);
  if (!spec) {
    throw new Error(`Unknown Ikram First & Then pack: ${packId}`);
  }

  const first = ikramFirstThenCard(spec.firstSlug, {
    schedule: spec.id === "ikram-cab-home",
  });

  let second: GeneratedPixtoCardProps;
  if (spec.secondUsesHubRoom) {
    second = ikramHubRoomCard(lang);
  } else if (spec.secondTitleKey === "home-with-muchie") {
    second = ikramFirstThenCard(spec.secondSlug, {
      schedule: true,
      titleOverride: firstThenDemoIkramHomeThenTitle(lang),
    });
  } else {
    second = ikramFirstThenCard(spec.secondSlug);
  }

  return { first, second };
}

export function ikramFirstThenPackPreviewUrl(packId: IkramFirstThenPackId): string {
  return resolveIkramFirstThenPack(packId, "en").second.illustrationUrl;
}

export function ikramFirstThenPackDisplayTitle(
  packId: IkramFirstThenPackId,
  lang: CardLanguageCode,
): string {
  return ikramFirstThenPackTitle(packId, lang);
}

export function ikramFirstThenPackHref(
  packId: IkramFirstThenPackId,
  from = "/tailored/ikram",
): string {
  const params = new URLSearchParams({
    pack: packId,
    from,
    onlyFirstThen: "1",
  });
  return `/first-then?${params.toString()}`;
}
