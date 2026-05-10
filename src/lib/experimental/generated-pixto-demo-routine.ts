import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";
import type { RoutineStep } from "@/lib/types/routine";

/** Black 1×1 mark (`public/brand/logo1x1.JPEG`). */
export const GENERATED_PIXTO_DEMO_LOGO_URL = "/brand/logo1x1.JPEG";

/** Airport category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR = "#F9DD9E" as const;

/** Hotel category accent — ribbon + schedule chrome. */
export const GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR = "#8C1E2E" as const;

const AIR = "/cards/at%20the%20airport";
const HOT = "/cards/at%20the%20hotel";

function lc(s: string): string {
  return s.toLowerCase();
}

/** Airport-only generated card props (retouched illustration PNGs). */
export const AIRPORT_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] = [
  {
    illustrationUrl: `${AIR}/checkin-at-the-ariline-counter.PNG`,
    title: lc("Check in at the airline counter"),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/go-through-security.PNG`,
    title: lc("Go through security"),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/find-your-gate.PNG`,
    title: lc("Find your gate"),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/fasten-your-seatbelt.PNG`,
    title: lc("Fasten your seatbelt"),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/flying-time.PNG`,
    title: lc("Flying time"),
    category: lc("At the airport"),
    categoryColour: GENERATED_PIXTO_AIRPORT_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
];

/** Hotel-only generated card props. */
export const HOTEL_GENERATED_CARD_PROPS: GeneratedPixtoCardProps[] = [
  {
    illustrationUrl: `${HOT}/arrive-at-the-hotel.PNG`,
    title: lc("Arrive at the hotel"),
    category: lc("At the hotel"),
    categoryColour: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${HOT}/check-in-at-front-desk.PNG`,
    title: lc("Check in at the front desk"),
    category: lc("At the hotel"),
    categoryColour: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${HOT}/enter-your-room.PNG`,
    title: lc("Enter your room"),
    category: lc("At the hotel"),
    categoryColour: GENERATED_PIXTO_HOTEL_CATEGORY_COLOUR,
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
];

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
