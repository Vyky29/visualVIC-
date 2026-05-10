import type { GeneratedPixtoCardProps } from "@/components/experimental/GeneratedPixtoCard";

/** Black 1×1 mark for corner slot (`public/brand/logo1x1.JPEG`). */
export const GENERATED_PIXTO_DEMO_LOGO_URL = "/brand/logo1x1.JPEG";

const AIR = "/cards/at%20the%20airport";
const HOT = "/cards/at%20the%20hotel";

/**
 * Demo “routine” for {@link GeneratedPixtoCard} — retouched illustration PNGs only
 * (no baked card chrome). Order: airport journey → hotel arrival.
 */
export const GENERATED_PIXTO_DEMO_ROUTINE_STEPS: GeneratedPixtoCardProps[] = [
  {
    illustrationUrl: `${AIR}/checkin-at-the-ariline-counter.PNG`,
    title: "Check in at the airline counter",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/go-through-security.PNG`,
    title: "Go through security",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/find-your-gate.PNG`,
    title: "Find your gate",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/fasten-your-seatbelt.PNG`,
    title: "Fasten your seatbelt",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${AIR}/flying-time.PNG`,
    title: "Flying time",
    category: "At the airport",
    categoryColour: "#5a7d9a",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${HOT}/arrive-at-the-hotel.PNG`,
    title: "Arrive at the hotel",
    category: "At the hotel",
    categoryColour: "#a67c52",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${HOT}/check-in-at-front-desk.PNG`,
    title: "Check in at the front desk",
    category: "At the hotel",
    categoryColour: "#a67c52",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
  {
    illustrationUrl: `${HOT}/enter-your-room.PNG`,
    title: "Enter your room",
    category: "At the hotel",
    categoryColour: "#a67c52",
    iconUrl: GENERATED_PIXTO_DEMO_LOGO_URL,
  },
];

export const GENERATED_PIXTO_DEMO_ROUTINE_NAME =
  "Airport → hotel (generated cards demo)" as const;
