import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import type { RoutineStep } from "@/lib/types/routine";
import {
  AT_THE_AIRPORT_SEQUENCE,
  atTheAirportImageUrl,
  atTheAirportPackMarkUrl,
} from "@/lib/cards/at-the-airport-cards";
import {
  AT_THE_HOTEL_SEQUENCE,
  atTheHotelImageUrl,
  atTheHotelPackMarkUrl,
} from "@/lib/cards/at-the-hotel-cards";

/** Fallback coloured mark if pack `pixtolearn-mark.png` is missing — `public/brand/pixtolearn-logo.png`. */
export const GENERATED_PIXTO_COLOUR_MARK_FALLBACK_URL =
  "/brand/pixtolearn-logo.png" as const;

/** Airport category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR = "#F9DD9E" as const;

/** Hotel category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR = "#8C1E2E" as const;

function lc(s: string): string {
  return s.toLowerCase();
}

/** Every airport step PNG (order from {@link AT_THE_AIRPORT_SEQUENCE}). */
export const AIRPORT_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  AT_THE_AIRPORT_SEQUENCE.map((s) => ({
    illustrationUrl: atTheAirportImageUrl(s.slug),
    title: lc(s.title),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: atTheAirportPackMarkUrl(),
  }));

/** Every hotel step PNG (order from {@link AT_THE_HOTEL_SEQUENCE}). */
export const HOTEL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] =
  AT_THE_HOTEL_SEQUENCE.map((s) => ({
    illustrationUrl: atTheHotelImageUrl(s.slug),
    title: lc(s.title),
    category: lc("At the hotel"),
    categoryColour: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
    iconUrl: atTheHotelPackMarkUrl(),
  }));

/** Full demo sequence (airport → hotel) for `/generated-card-demo` only. */
export const GENERATED_PIXTO_DEMO_ROUTINE_STEPS: GeneratedPixtoCardProps[] = [
  ...AIRPORT_GENERATED_CARD_PROPS,
  ...HOTEL_GENERATED_CARD_PROPS,
];

export const GENERATED_PIXTO_DEMO_ROUTINE_NAME =
  "Airport → hotel (generated cards demo)" as const;

export function routineStepsFromGeneratedCardProps(
  idPrefix: string,
  cards: readonly GeneratedPixtoCardProps[],
): RoutineStep[] {
  return cards.map((c, i) => ({
    id: `${idPrefix}-step-${i}`,
    title: c.title,
    imageUrl: c.illustrationUrl,
    generatedPixto: {
      illustrationUrl: c.illustrationUrl,
      title: c.title,
      category: c.category,
      categoryColour: c.categoryColour,
      iconUrl: c.iconUrl,
      cardType: c.cardType,
    },
  }));
}
