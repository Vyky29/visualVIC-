import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";

function lc(s: string): string {
  return s.toLowerCase();
}

/** Slug stem from `/cards/at%20the%20airport/…` or hotel (matches bundled PNG URLs). */
export function slugFromBundledIllustrationUrl(url: string): string | null {
  const u = url.toLowerCase();
  const m = u.match(/at%20the%20(airport|hotel)\/([^/?#]+)/);
  if (!m?.[2]) return null;
  return m[2].replace(/\.(png|jpe?g)$/i, "");
}

const DIGITAL_SLUG_TITLE: Record<string, { en: string; es: string }> = {
  // Airport (order matches shipped slugs)
  "get-your-boarding-pass": {
    en: "get your boarding pass",
    es: "consigue tu tarjeta de embarque",
  },
  "checkin-at-the-ariline-counter": {
    en: "check in at the airline counter",
    es: "facturación en el mostrador de la aerolínea",
  },
  "show-passport-and-tickect": {
    en: "show passport and ticket",
    es: "muestra el pasaporte y el billete",
  },
  "go-through-security": {
    en: "go through security",
    es: "pasa el control de seguridad",
  },
  "find-your-gate": {
    en: "find your gate",
    es: "encuentra tu puerta de embarque",
  },
  "wait-for-boarding": {
    en: "wait for boarding",
    es: "espera al embarque",
  },
  "board-the-plane": {
    en: "board the plane",
    es: "sube al avión",
  },
  "take-your-seat": {
    en: "take your seat",
    es: "toma tu asiento",
  },
  "store-your-bag": {
    en: "store your bag",
    es: "guarda tu bolso o maleta de mano",
  },
  "fasten-your-seatbelt": {
    en: "fasten your seatbelt",
    es: "abróchate el cinturón",
  },
  "listen-to-the-safety-instuctions": {
    en: "listen to the safety instructions",
    es: "escucha las instrucciones de seguridad",
  },
  "ready-for-takeoff": {
    en: "ready for takeoff",
    es: "listos para el despegue",
  },
  "flying-time": {
    en: "flying time",
    es: "en pleno vuelo",
  },
  "watch-a-movie-during-flight": {
    en: "watch a movie during flight",
    es: "mira una película durante el vuelo",
  },
  "listen-to-music": {
    en: "listen to music",
    es: "escucha música",
  },
  "sleep-a-nap": {
    en: "sleep a nap",
    es: "echa una siesta",
  },
  "leave-the-plane": {
    en: "leave the plane",
    es: "baja del avión",
  },
  "go-to-passport-contol": {
    en: "go to passport control",
    es: "ve al control de pasaportes",
  },
  "pickup-your-luggage": {
    en: "pick up your luggage",
    es: "recoge tu equipaje",
  },
  // Hotel
  "arrive-at-the-hotel": {
    en: "arrive at the hotel",
    es: "llegada al hotel",
  },
  "checkin-at-front-desk": {
    en: "check in at front desk",
    es: "registro en recepción",
  },
  "check-in-at-front-desk": {
    en: "check in at the desk",
    es: "registro en el mostrador",
  },
  "receive-your-room-key": {
    en: "receive your room key",
    es: "recibe la llave de la habitación",
  },
  "enter-your-room": {
    en: "enter your room",
    es: "entra en tu habitación",
  },
  "breakfast-time": {
    en: "breakfast time",
    es: "hora del desayuno",
  },
};

function digitalPackFromUrl(url: string): "airport" | "hotel" | null {
  const u = url.toLowerCase();
  if (u.includes("at%20the%20airport")) return "airport";
  if (u.includes("at%20the%20hotel")) return "hotel";
  return null;
}

const CATEGORY_STRIP: Record<
  "airport" | "hotel",
  { en: string; es: string }
> = {
  airport: { en: "at the airport", es: "en el aeropuerto" },
  hotel: { en: "at the hotel", es: "en el hotel" },
};

export function digitalCategoryStripLabel(
  pack: "airport" | "hotel",
  language: CardLanguageCode,
): string {
  const ui = effectiveDigitalUiLang(language);
  const row = CATEGORY_STRIP[pack];
  return lc(ui === "es" ? row.es : row.en);
}

export function resolveDigitalPixtoStrings(
  illustrationUrl: string,
  title: string,
  category: string,
  language: CardLanguageCode,
): { title: string; category: string } {
  const ui = effectiveDigitalUiLang(language);
  const slug = slugFromBundledIllustrationUrl(illustrationUrl);
  const pack = digitalPackFromUrl(illustrationUrl);

  let nextTitle = title;
  if (slug) {
    const row = DIGITAL_SLUG_TITLE[slug];
    if (row) {
      nextTitle = lc(ui === "es" ? row.es : row.en);
    }
  }

  let nextCategory = category;
  if (pack) {
    const c = CATEGORY_STRIP[pack];
    nextCategory = lc(ui === "es" ? c.es : c.en);
  }

  return { title: nextTitle, category: nextCategory };
}

const STOCK_ROUTINE_LABEL: Record<string, { en: string; es: string }> = {
  "at-the-airport": {
    en: "At the airport",
    es: "En el aeropuerto",
  },
  "at-the-hotel": {
    en: "At the hotel",
    es: "En el hotel",
  },
};

export function stockRoutineDisplayName(
  routineId: string,
  fallback: string,
  language: CardLanguageCode,
): string {
  const ui = effectiveDigitalUiLang(language);
  const row = STOCK_ROUTINE_LABEL[routineId];
  if (!row) return fallback;
  return ui === "es" ? row.es : row.en;
}

/** Library section headers for airport / hotel packs (Title Case). */
export function libraryAirportHotelLabel(
  pack: "airport" | "hotel",
  language: CardLanguageCode,
): string {
  const id = pack === "airport" ? "at-the-airport" : "at-the-hotel";
  return stockRoutineDisplayName(id, pack, language);
}
