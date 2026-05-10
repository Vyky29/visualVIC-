/**
 * PixtoLearn airport visual cards — `public/cards/at the airport/`
 * Folder name has spaces; URLs use encoded segment `/cards/at%20the%20airport/`.
 */

const AT_AIRPORT_DIR_SEG = encodeURIComponent("at the airport");

export const AT_THE_AIRPORT_PUBLIC_DIR = `/cards/${AT_AIRPORT_DIR_SEG}`;

/** Category flip / completion back — `public/cards/at the airport/backcard-airport.png`. */
export function atTheAirportBackCardUrl(): string {
  return `${AT_THE_AIRPORT_PUBLIC_DIR}/backcard-airport.png`;
}

/** Every shipped airport step PNG (exact casing for Linux hosts). */
export const AT_THE_AIRPORT_CARD_FILES = [
  "board-the-plane.PNG",
  "checkin-at-the-ariline-counter.PNG",
  "fasten-your-seatbelt.PNG",
  "find-your-gate.PNG",
  "flying-time.PNG",
  "get-your-boarding-pass.PNG",
  "go-through-security.PNG",
  "go-to-passport-contol.PNG",
  "leave-the-plane.PNG",
  "listen-to-music.PNG",
  "listen-to-the-safety-instuctions.PNG",
  "pickup-your-luggage.PNG",
  "ready-for-takeoff.PNG",
  "show-passport-and-tickect.PNG",
  "sleep-a-nap.PNG",
  "store-your-bag.PNG",
  "take-your-seat.PNG",
  "wait-for-boarding.PNG",
  "watch-a-movie-during-flight.PNG",
] as const;

export type AtTheAirportCardFile = (typeof AT_THE_AIRPORT_CARD_FILES)[number];

function stemOf(file: string): string {
  return file.replace(/\.(png|PNG)$/i, "").toLowerCase();
}

export function atTheAirportImageUrl(slug: string): string {
  const base = slug.replace(/\.(png|PNG)$/i, "").toLowerCase();
  const file = AT_THE_AIRPORT_CARD_FILES.find(
    (f) => stemOf(f) === base,
  ) as string | undefined;
  const name = file ?? `${base}.PNG`;
  return `${AT_THE_AIRPORT_PUBLIC_DIR}/${name}`;
}

/** Typical airport → flight → arrival flow. */
export const AT_THE_AIRPORT_SEQUENCE = [
  {
    id: "airport-boarding-pass",
    slug: "get-your-boarding-pass",
    title: "Get your boarding pass",
  },
  {
    id: "airport-airline-counter",
    slug: "checkin-at-the-ariline-counter",
    title: "Check in at the airline counter",
  },
  {
    id: "airport-passport-ticket",
    slug: "show-passport-and-tickect",
    title: "Show passport and ticket",
  },
  {
    id: "airport-security",
    slug: "go-through-security",
    title: "Go through security",
  },
  { id: "airport-gate", slug: "find-your-gate", title: "Find your gate" },
  {
    id: "airport-wait-boarding",
    slug: "wait-for-boarding",
    title: "Wait for boarding",
  },
  { id: "airport-board", slug: "board-the-plane", title: "Board the plane" },
  { id: "airport-seat", slug: "take-your-seat", title: "Take your seat" },
  {
    id: "airport-bag",
    slug: "store-your-bag",
    title: "Store your bag",
  },
  {
    id: "airport-seatbelt",
    slug: "fasten-your-seatbelt",
    title: "Fasten your seatbelt",
  },
  {
    id: "airport-safety",
    slug: "listen-to-the-safety-instuctions",
    title: "Listen to the safety instructions",
  },
  {
    id: "airport-takeoff",
    slug: "ready-for-takeoff",
    title: "Ready for takeoff",
  },
  { id: "airport-flying", slug: "flying-time", title: "Flying time" },
  {
    id: "airport-movie",
    slug: "watch-a-movie-during-flight",
    title: "Watch a movie during flight",
  },
  {
    id: "airport-music",
    slug: "listen-to-music",
    title: "Listen to music",
  },
  { id: "airport-nap", slug: "sleep-a-nap", title: "Sleep a nap" },
  {
    id: "airport-leave",
    slug: "leave-the-plane",
    title: "Leave the plane",
  },
  {
    id: "airport-passport-control",
    slug: "go-to-passport-contol",
    title: "Go to passport control",
  },
  {
    id: "airport-luggage",
    slug: "pickup-your-luggage",
    title: "Pick up your luggage",
  },
] as const;
