import type { CardLanguageCode } from "@/lib/preferences/card-language-preference";
import { effectiveDigitalUiLang } from "@/lib/preferences/card-language-preference";

function lc(s: string): string {
  return s.toLowerCase();
}

/** Slug stem from bundled Pixto illustration URLs. */
export function slugFromBundledIllustrationUrl(url: string): string | null {
  const u = url.toLowerCase();
  const airportHotel = u.match(/at%20the%20(?:airport|hotel)\/([^/?#]+)/);
  if (airportHotel?.[1]) {
    return airportHotel[1].replace(/\.(png|jpe?g)$/i, "");
  }
  const dayCentre = u.match(/day%20centre\/([^/?#]+)/);
  if (dayCentre?.[1]) {
    return dayCentre[1].replace(/\.(png|jpe?g)$/i, "");
  }
  const generic = u.match(/\/cards\/[^/]+\/([^/?#]+)/);
  if (generic?.[1] && !generic[1].startsWith("backcard") && !generic[1].startsWith("logo-")) {
    return generic[1].replace(/\.(png|jpe?g)$/i, "");
  }
  return null;
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
  // Day centre
  bus: { en: "take the bus", es: "subir al autobús" },
  walk: { en: "walk", es: "caminar" },
  "sit-down": { en: "sit down", es: "sentarse" },
  music: { en: "music", es: "música" },
  cafe: { en: "cafe", es: "cafetería" },
  park: { en: "park", es: "parque" },
  "park-and-swing": { en: "park and swing", es: "parque y columpio" },
  "hair-salon": { en: "hair salon", es: "peluquería" },
  "make-up": { en: "make up", es: "maquillaje" },
  pool: { en: "swimming pool", es: "piscina" },
  toilet: { en: "toilet", es: "baño" },
  "wash-hands": { en: "wash hands", es: "lavarse las manos" },
  "socks-on": { en: "put socks on", es: "ponerse los calcetines" },
  "shoes-on": { en: "put shoes on", es: "ponerse los zapatos" },
  walking: { en: "walking", es: "caminar" },
  shower: { en: "shower", es: "ducha" },
  "birthday-cake": { en: "birthday cake", es: "tarta de cumpleaños" },
  "birthday-party": { en: "birthday party", es: "fiesta de cumpleaños" },
  westfield: { en: "westfield", es: "westfield" },
  "hair-care": { en: "hair care", es: "cuidado del pelo" },
  library: { en: "library", es: "biblioteca" },
  breakfast: { en: "breakfast", es: "desayuno" },
  dinner: { en: "dinner", es: "cena" },
  "packed-lunch": { en: "packed lunch", es: "tupper cerrado" },
  lunch: { en: "lunch", es: "comida" },
  "bus-stop": { en: "bus stop", es: "parada de autobús" },
  "train-station": { en: "train station", es: "estación de tren" },
  home: { en: "home", es: "casa" },
  "community-centre": { en: "club sensational", es: "club sensational" },
  "hub-room": { en: "hub room", es: "sala hub" },
  "sensory-room": { en: "sensory room", es: "sala sensorial" },
  ipad: { en: "ipad", es: "ipad" },
  tablet: { en: "tablet", es: "tablet" },
  whiteboard: { en: "whiteboard", es: "pizarra" },
  laptop: { en: "laptop", es: "portátil" },
  shops: { en: "shops", es: "tiendas" },
  playground: { en: "playground", es: "parque infantil" },
  "swimming-pool": { en: "swimming pool", es: "piscina" },
  "bus-return": { en: "bus to day centre", es: "autobús al centro de día" },
  "bean-bag": { en: "relaxation bean bag", es: "puff de relajación" },
  "black-nail-varnish": {
    en: "buy black nail varnish",
    es: "comprar esmalte negro",
  },
  mcdonalds: { en: "mcdonald's", es: "mcdonald's" },
  cab: { en: "cab home", es: "taxi a casa" },
  "jigsaw-puzzle": { en: "jigsaw puzzle", es: "puzzle" },
  "mixing-bowl": { en: "mixing bowl", es: "bol de mezclar" },
  apron: { en: "apron", es: "delantal" },
  "wooden-spoon": { en: "wooden spoon", es: "cuchara de madera" },
  "rolling-pin": { en: "rolling pin", es: "rodillo" },
  flour: { en: "flour", es: "harina" },
  water: { en: "water", es: "agua" },
  mix: { en: "mix", es: "mezclar" },
  knead: { en: "knead", es: "amasar" },
  "pizza-dough": { en: "pizza dough", es: "masa de pizza" },
  cheese: { en: "cheese", es: "queso" },
  chorizo: { en: "chorizo", es: "chorizo" },
  oven: { en: "oven", es: "horno" },
  eat: { en: "eat", es: "comer" },
  "tidy-up": { en: "tidy up", es: "recoger" },
  peeling: { en: "peeling", es: "pelar" },
  "tomato-sauce": { en: "tomato sauce", es: "salsa de tomate" },
  pizza: { en: "pizza", es: "pizza" },
  painting: { en: "painting", es: "pintar" },
  market: { en: "market", es: "mercado" },
  "therapy-ball-bouncing": {
    en: "bounce on therapy ball",
    es: "rebotar en la pelota terapéutica",
  },
  treadmill: { en: "treadmill", es: "cinta de correr" },
  "row-machine": { en: "row machine", es: "máquina de remo" },
  "exercise-bike": { en: "exercise bike", es: "bici estática" },
  "sandbag-carry": { en: "walk with sandbag", es: "caminar con saco de arena" },
  "sandbag-shoulders": {
    en: "sandbag on shoulders",
    es: "saco de arena en hombros",
  },
  "weights-on-bosu": { en: "weights on BOSU", es: "pesas en BOSU" },
  "knees-up-on-top": {
    en: "knees up on box",
    es: "rodilla arriba al cajón",
  },
  "weight-ball": { en: "weight ball", es: "balón de peso" },
  "weight-ball-on-bench": {
    en: "weight ball on bench",
    es: "balón de peso en banco",
  },
  "therapy-ball": { en: "therapy ball", es: "pelota terapéutica" },
  sandbag: { en: "sandbag", es: "saco de arena" },
  weights: { en: "weights", es: "pesas" },
  "elastic-band": { en: "elastic band", es: "banda elástica" },
  "throwing-ball-on-bosu": {
    en: "throwing ball on BOSU",
    es: "lanzar balón en BOSU",
  },
  "cross-trainer": { en: "cross trainer", es: "elíptica" },
  "gym-with-michelle": {
    en: "gym with Michelle",
    es: "gimnasio con Michelle",
  },
  basketball: { en: "basketball", es: "baloncesto" },
  ladder: { en: "ladder", es: "escalera de agilidad" },
  hurdles: { en: "hurdles", es: "vallas" },
  parachute: { en: "parachute", es: "paracaídas" },
  "colour-balls": { en: "colour balls", es: "pelotas de colores" },
  "jump-rope": { en: "jump rope", es: "comba" },
  comb: { en: "comb", es: "peine" },
  stilts: { en: "bucket stilts", es: "zancos de bote" },
  football: { en: "football", es: "fútbol" },
  badminton: { en: "badminton", es: "bádminton" },
  cruzigramas: { en: "word search", es: "sopa de letras" },
  "word-search": { en: "word search", es: "sopa de letras" },
  "chocolate-cake": { en: "chocolate cake", es: "tarta de chocolate" },
  "washing-up": { en: "washing up", es: "fregar platos" },
  paintbrush: { en: "paintbrush", es: "pincel" },
  "paint-palette": { en: "paint palette", es: "paleta de pintura" },
  scissors: { en: "scissors", es: "tijeras" },
  "glue-stick": { en: "glue stick", es: "pegamento en barra" },
  "coloured-paper": { en: "coloured paper", es: "papel de colores" },
  pencils: { en: "pencils", es: "lápices" },
  pen: { en: "pen", es: "bolígrafo" },
  "colouring-pens": { en: "colouring pens", es: "rotuladores de colores" },
  "felt-tips": { en: "felt tips", es: "rotuladores de punta fina" },
  eraser: { en: "eraser", es: "goma de borrar" },
  sharpener: { en: "sharpener", es: "sacapuntas" },
  paint: { en: "paint", es: "pintura" },
  "table-work": { en: "table work", es: "trabajo en mesa" },
  spelling: { en: "spelling", es: "deletreo" },
  handwriting: { en: "handwriting", es: "escritura" },
  "vocational-activity": {
    en: "vocational activity",
    es: "actividad vocacional",
  },
  "picture-book": { en: "picture book", es: "libro de fotos" },
  "getting-dressed": { en: "getting dressed", es: "vestirse" },
  maths: { en: "maths", es: "matemáticas" },
  "circle-time": {
    en: "circle time",
    es: "tiempo de círculo",
  },
  "trunks-on": { en: "trunks on", es: "ponerse el bañador" },
  "changing-room": { en: "changing room", es: "vestuario" },
  "dry-body": { en: "dry body", es: "secar el cuerpo" },
  "vest-on": { en: "vest on", es: "ponerse el chaleco" },
  "home-with-munchie": {
    en: "home with munchie",
    es: "casa con muchie",
  },
  sports: { en: "sports", es: "deporte" },
  tennis: { en: "tennis", es: "tenis" },
  commenting: { en: "commenting", es: "comentar" },
  "colourful-semantics": {
    en: "colourful semantics",
    es: "semántica colorida",
  },
  "sitting-in-the-pool": {
    en: "sitting in the pool",
    es: "sentada en la piscina",
  },
  "swing-with-luliya": {
    en: "swing with Luliya",
    es: "columpio con Luliya",
  },
  "timi-fitness": { en: "timi fitness", es: "timi fitness" },
  "timi-foam": {
    en: "timi foam",
    es: "timi espuma",
  },
  "timi-motor-skills-with-raul": {
    en: "timi motor skills with Raul",
    es: "timi motricidad con Raul",
  },
  "timi-motor-skills": {
    en: "timi motor skills",
    es: "timi motricidad",
  },
  "timi-screwdriver": {
    en: "timi screwdriver",
    es: "timi destornillador",
  },
  "timi-puzzles-with-raul": {
    en: "timi puzzles with Raul",
    es: "timi puzzles con Raul",
  },
  "timi-puzzle-2": {
    en: "timi puzzle 2",
    es: "timi puzzle 2",
  },
  "timi-stacking-cubes": {
    en: "timi stacking cubes",
    es: "timi apilando cubos",
  },
  "timi-vocational-activity": {
    en: "timi vocational activity",
    es: "timi actividad vocacional",
  },
  "yellow-bib-walk": {
    en: "yellow bib walk",
    es: "caminar con chaleco amarillo",
  },
  "yellow-bib": { en: "yellow bib", es: "chaleco amarillo" },
  happy: { en: "happy", es: "contento" },
  skierg: { en: "ski machine", es: "máquina de esquí" },
  stretching: { en: "stretching", es: "estiramientos" },
  finished: { en: "finished", es: "terminado" },
};

type DigitalPackId = "airport" | "hotel" | "daycentre";

function digitalPackFromStrings(
  url: string,
  category: string,
): DigitalPackId | null {
  const c = category.toLowerCase();
  if (c.includes("day centre") || c.includes("day centre")) return "daycentre";
  const u = url.toLowerCase();
  if (u.includes("at%20the%20airport")) return "airport";
  if (u.includes("at%20the%20hotel")) return "hotel";
  if (u.includes("day%20centre")) return "daycentre";
  return null;
}

const CATEGORY_STRIP: Record<DigitalPackId, { en: string; es: string }> = {
  airport: { en: "at the airport", es: "en el aeropuerto" },
  hotel: { en: "at the hotel", es: "en el hotel" },
  daycentre: { en: "at the day centre", es: "en el centro de día" },
};

export function digitalCategoryStripLabel(
  pack: DigitalPackId,
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
  const pack = digitalPackFromStrings(illustrationUrl, category);

  let nextTitle = title;
  if (slug) {
    const row = DIGITAL_SLUG_TITLE[slug];
    if (row) {
      nextTitle = lc(ui === "es" ? row.es : row.en);
    }
  }

  let nextCategory = category;
  const categoryNorm = category.toLowerCase().trim();
  if (categoryNorm === "core" || categoryNorm.includes("core vocabulary")) {
    nextCategory = lc(
      ui === "es" ? "vocabulario core" : "core vocabulary",
    );
  } else if (pack) {
    if (category.toLowerCase().includes("ikram")) {
      nextCategory = lc(
        ui === "es" ? "ikram · rutinas a medida" : "ikram · tailored schedules",
      );
    } else if (category.toLowerCase().includes("serine")) {
      nextCategory = lc(
        ui === "es" ? "serine · rutinas a medida" : "serine · tailored schedules",
      );
    } else if (category.toLowerCase().includes("tailored")) {
      nextCategory = lc(
        ui === "es" ? "rutinas a medida" : "tailored schedules",
      );
    } else {
      const c = CATEGORY_STRIP[pack];
      nextCategory = lc(ui === "es" ? c.es : c.en);
    }
  }

  return { title: nextTitle, category: nextCategory };
}

const STOCK_ROUTINE_LABEL: Record<string, { en: string; es: string }> = {
  "brushing-teeth": {
    en: "Brushing teeth",
    es: "Lavarse los dientes",
  },
  "at-the-airport": {
    en: "At the airport",
    es: "En el aeropuerto",
  },
  "at-the-hotel": {
    en: "At the hotel",
    es: "En el hotel",
  },
  "at-the-day-centre": {
    en: "Day centre",
    es: "Centro de día",
  },
  "dc-mini-gym": {
    en: "Mini Gym · 2D",
    es: "Mini gym · 2D",
  },
  "dc-mini-gym-3d": {
    en: "Mini Gym · 3D",
    es: "Mini gym · 3D",
  },
  "dc-mini-gym-warmup": {
    en: "Mini Gym · Warm-up",
    es: "Mini gym · calentamiento",
  },
  "dc-mini-gym-cardio": {
    en: "Mini Gym · Cardio",
    es: "Mini gym · cardio",
  },
  "dc-mini-gym-strength": {
    en: "Mini Gym · Strength",
    es: "Mini gym · fuerza",
  },
  "dc-mini-gym-3d-warmup": {
    en: "Mini Gym · 3D warm-up",
    es: "Mini gym · calentamiento 3D",
  },
  "dc-bouldering": {
    en: "Bouldering · Full",
    es: "Boulder · completa",
  },
  "dc-bouldering-prep": {
    en: "Bouldering · Get ready",
    es: "Boulder · preparación",
  },
  "dc-bouldering-wall": {
    en: "Bouldering · On the wall",
    es: "Boulder · en el muro",
  },
  "dc-cooking": {
    en: "Cooking · Pizza day",
    es: "Cocina · día pizza",
  },
  "dc-cooking-prep": {
    en: "Cooking · Kitchen prep",
    es: "Cocina · preparación",
  },
  "dc-cooking-bake": {
    en: "Cooking · Bake & mix",
    es: "Cocina · hornear y mezclar",
  },
  "dc-community": {
    en: "Community · Westfield",
    es: "Comunidad · Westfield",
  },
  "dc-community-market": {
    en: "Community · Market day",
    es: "Comunidad · día de mercado",
  },
  "dc-community-park": {
    en: "Community · Park outing",
    es: "Comunidad · salida al parque",
  },
  "dc-premium-shower": {
    en: "Premium · Shower",
    es: "Premium · ducha",
  },
  "dc-premium-swim": {
    en: "Premium · Swim changing",
    es: "Premium · cambiarse para nadar",
  },
  "dc-premium-dress": {
    en: "Premium · Get dressed",
    es: "Premium · vestirse",
  },
  "dc-mixed": {
    en: "Mixed Day",
    es: "Día mixto",
  },
  "ikram-day-centre": {
    en: "Ikram · Day centre (avatar)",
    es: "Ikram · centro de día (avatar)",
  },
  "ikram-day-centre-items": {
    en: "Ikram · Day centre (items)",
    es: "Ikram · centro de día (objetos)",
  },
  "serine-day-centre": {
    en: "Serine Physical Activity (avatar)",
    es: "Serine · actividad física (avatar)",
  },
  "serine-gym-equipment-3d": {
    en: "Serine Physical Activity (items)",
    es: "Serine · actividad física (objetos)",
  },
  "ayaan-day-centre": {
    en: "Ayaan Physical Activity (avatar)",
    es: "Ayaan · actividad física (avatar)",
  },
  "ayaan-gym-equipment-3d": {
    en: "Ayaan Physical Activity (items)",
    es: "Ayaan · actividad física (objetos)",
  },
  "emmanuel-day-centre": {
    en: "Emmanuel · Day centre (avatar)",
    es: "Emmanuel · centro de día (avatar)",
  },
  "emmanuel-day-centre-items": {
    en: "Emmanuel · Day centre (items)",
    es: "Emmanuel · centro de día (objetos)",
  },
  "emmanuel-gym-avatar": {
    en: "Emmanuel · Gym (avatar)",
    es: "Emmanuel · gimnasio (avatar)",
  },
  "emmanuel-gym-equipment-3d": {
    en: "Emmanuel · Gym (items)",
    es: "Emmanuel · gimnasio (objetos)",
  },
  "cyrus-day-centre": {
    en: "Cyrus · Day centre (avatar)",
    es: "Cyrus · centro de día (avatar)",
  },
  "fadi-day-centre": {
    en: "Fadi · Day centre (avatar)",
    es: "Fadi · centro de día (avatar)",
  },
  "fadi-day-centre-items": {
    en: "Fadi · Day centre (items)",
    es: "Fadi · centro de día (objetos)",
  },
  "vassims-car": {
    en: "vassim's car",
    es: "coche de vassim",
  },
  "timi-day-centre": {
    en: "Timi · Day centre (avatar)",
    es: "Timi · centro de día (avatar)",
  },
  "timi-day-centre-items": {
    en: "Timi · Day centre (items)",
    es: "Timi · centro de día (objetos)",
  },
  physical: {
    en: "Physical Activity",
    es: "Actividad física",
  },
  "physical-3d": {
    en: "Physical Activity · 3D",
    es: "Actividad física · 3D",
  },
  "physical-3d-gym": {
    en: "Physical Activity · 3D gym",
    es: "Actividad física · 3D gimnasio",
  },
};

export function libraryTailoredParticipantFolderLabel(
  participant:
    | "ikram"
    | "serine"
    | "ayaan"
    | "emmanuel"
    | "cyrus"
    | "fadi"
    | "timi",
  language: CardLanguageCode,
): string {
  const ui = effectiveDigitalUiLang(language);
  const name =
    participant === "ikram"
      ? "Ikram"
      : participant === "serine"
        ? "Serine"
        : participant === "ayaan"
          ? "Ayaan"
          : participant === "emmanuel"
            ? "Emmanuel"
            : participant === "cyrus"
              ? "Cyrus"
              : participant === "fadi"
                ? "Fadi"
                : "Timi";
  if (ui === "es") return `Carpeta de ${name}`;
  return `${name}'s Folder`;
}

export function libraryDayCentreFolderLabel(
  folder: "mini-gym" | "bouldering" | "cooking" | "community" | "mixed",
  language: CardLanguageCode,
): string {
  const ui = effectiveDigitalUiLang(language);
  const en: Record<typeof folder, string> = {
    "mini-gym": "Mini Gym Folder",
    bouldering: "Bouldering Folder",
    cooking: "Cooking Folder",
    community: "Community Folder",
    mixed: "Mixed Folder",
  };
  const es: Record<typeof folder, string> = {
    "mini-gym": "Carpeta mini gym",
    bouldering: "Carpeta boulder",
    cooking: "Carpeta cocina",
    community: "Carpeta comunidad",
    mixed: "Carpeta mixta",
  };
  return ui === "es" ? es[folder] : en[folder];
}

export function libraryDayCentreIkramLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("ikram", language);
}

export function libraryDayCentreSerineLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("serine", language);
}

export function libraryDayCentreAyaanLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("ayaan", language);
}

export function libraryDayCentreEmmanuelLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("emmanuel", language);
}

export function libraryDayCentreCyrusLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("cyrus", language);
}

export function libraryDayCentreFadiLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("fadi", language);
}

export function libraryDayCentreTimiLabel(language: CardLanguageCode): string {
  return libraryTailoredParticipantFolderLabel("timi", language);
}

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
  pack: "airport" | "hotel" | "daycentre",
  language: CardLanguageCode,
): string {
  const id =
    pack === "airport"
      ? "at-the-airport"
      : pack === "hotel"
        ? "at-the-hotel"
        : "at-the-day-centre";
  return stockRoutineDisplayName(id, pack, language);
}
