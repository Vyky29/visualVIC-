import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import {
  DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL,
  DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
  dayCentreEmmanuelPackMarkUrl,
} from "@/lib/cards/day-centre-emmanuel-cards";
import {
  dayCentreEmmanuelSceneFocusUrl,
  dayCentreEmmanuelSceneUrl,
} from "@/lib/cards/day-centre-shared";
import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { emmanuelFirstThenPackTitle } from "@/lib/i18n/app-shell-locale";

export const EMMANUEL_FIRST_THEN_PACK_IDS = [
  "emmanuel-word-search-circle-time",
] as const;

export type EmmanuelFirstThenPackId =
  (typeof EMMANUEL_FIRST_THEN_PACK_IDS)[number];

export type EmmanuelFirstThenPackSpec = {
  id: EmmanuelFirstThenPackId;
  firstTitle: string;
  firstSceneSlug: string;
  secondTitle: string;
  secondSceneSlug: string;
};

export const EMMANUEL_FIRST_THEN_PACKS: readonly EmmanuelFirstThenPackSpec[] = [
  {
    id: "emmanuel-word-search-circle-time",
    firstTitle: "Word search",
    /** Avatar scene for Word Search (cruzigramas). */
    firstSceneSlug: "cruzigramas",
    secondTitle: "Circle time",
    secondSceneSlug: "circle-time",
  },
] as const;

function lc(s: string): string {
  return s.toLowerCase();
}

function emmanuelSceneCard(
  title: string,
  sceneSlug: string,
): GeneratedPixtoCardProps {
  const focusIllustrationUrl = dayCentreEmmanuelSceneFocusUrl(sceneSlug);
  return {
    illustrationUrl: dayCentreEmmanuelSceneUrl(sceneSlug),
    title: lc(title),
    category: lc(DAY_CENTRE_EMMANUEL_CARD_CATEGORY_LABEL),
    categoryColour: DAY_CENTRE_EMMANUEL_CATEGORY_COLOUR,
    iconUrl: dayCentreEmmanuelPackMarkUrl(),
    ...(focusIllustrationUrl ? { focusIllustrationUrl } : {}),
  };
}

export function isEmmanuelFirstThenPackId(
  value: string,
): value is EmmanuelFirstThenPackId {
  return (EMMANUEL_FIRST_THEN_PACK_IDS as readonly string[]).includes(value);
}

export function normalizeEmmanuelFirstThenPackId(
  raw: string | null | undefined,
): EmmanuelFirstThenPackId | null {
  if (raw && isEmmanuelFirstThenPackId(raw)) return raw;
  return null;
}

export function resolveEmmanuelFirstThenPack(
  packId: EmmanuelFirstThenPackId,
  _lang: CardLanguageCode,
): { first: GeneratedPixtoCardProps; second: GeneratedPixtoCardProps } {
  const spec = EMMANUEL_FIRST_THEN_PACKS.find((p) => p.id === packId);
  if (!spec) {
    throw new Error(`Unknown Emmanuel First & Then pack: ${packId}`);
  }
  return {
    first: emmanuelSceneCard(spec.firstTitle, spec.firstSceneSlug),
    second: emmanuelSceneCard(spec.secondTitle, spec.secondSceneSlug),
  };
}

export function emmanuelFirstThenPackPreviewUrl(
  packId: EmmanuelFirstThenPackId,
): string {
  return resolveEmmanuelFirstThenPack(packId, "en").second.illustrationUrl;
}

export function emmanuelFirstThenPackDisplayTitle(
  packId: EmmanuelFirstThenPackId,
  lang: CardLanguageCode,
): string {
  return emmanuelFirstThenPackTitle(packId, lang);
}

export function emmanuelFirstThenPackHref(
  packId: EmmanuelFirstThenPackId,
  from = "/tailored/emmanuel",
): string {
  const params = new URLSearchParams({
    pack: packId,
    from,
    onlyFirstThen: "1",
  });
  return `/first-then?${params.toString()}`;
}
