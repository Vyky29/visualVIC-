/**
 * PixtoLearn hotel visual cards — `public/cards/at the hotel/`
 * Folder name has spaces; URLs use encoded segment `/cards/at%20the%20hotel/`.
 */

const AT_HOTEL_DIR_SEG = encodeURIComponent("at the hotel");

export const AT_THE_HOTEL_PUBLIC_DIR = `/cards/${AT_HOTEL_DIR_SEG}`;

/** Every shipped hotel step PNG (exact casing for Linux hosts). */
export const AT_THE_HOTEL_CARD_FILES = [
  "arrive-at-the-hotel.PNG",
  "breakfast-time.PNG",
  "checkin-at-front-desk.PNG",
  "check-in-at-front-desk.PNG",
  "enter-your-room.PNG",
  "receive-your-room-key.PNG",
] as const;

export type AtTheHotelCardFile = (typeof AT_THE_HOTEL_CARD_FILES)[number];

function stemOf(file: string): string {
  return file.replace(/\.(png|PNG)$/i, "").toLowerCase();
}

export function atTheHotelImageUrl(slug: string): string {
  const base = slug.replace(/\.(png|PNG)$/i, "").toLowerCase();
  const file = AT_THE_HOTEL_CARD_FILES.find(
    (f) => stemOf(f) === base,
  ) as string | undefined;
  const name = file ?? `${base}.PNG`;
  return `${AT_THE_HOTEL_PUBLIC_DIR}/${name}`;
}

/** Typical arrival → check-in → room flow. */
export const AT_THE_HOTEL_SEQUENCE = [
  {
    id: "hotel-arrive",
    slug: "arrive-at-the-hotel",
    title: "Arrive at the hotel",
  },
  {
    id: "hotel-checkin-counter",
    slug: "checkin-at-front-desk",
    title: "Check in at front desk",
  },
  {
    id: "hotel-checkin-sign",
    slug: "check-in-at-front-desk",
    title: "Check in at the desk",
  },
  {
    id: "hotel-key",
    slug: "receive-your-room-key",
    title: "Receive your room key",
  },
  {
    id: "hotel-room",
    slug: "enter-your-room",
    title: "Enter your room",
  },
  {
    id: "hotel-breakfast",
    slug: "breakfast-time",
    title: "Breakfast time",
  },
] as const;
