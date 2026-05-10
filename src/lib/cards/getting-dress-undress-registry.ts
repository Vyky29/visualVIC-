import type { ChildSex } from "@/lib/types/routine";
import type { Routine, RoutineStep } from "@/lib/types/routine";
import {
  GETTING_DRESS_UNDRESS_CARD_FILES,
  gettingDressUndressImageUrl,
} from "@/lib/cards/getting-dress-undress-cards";

const fileSet = new Set<string>(GETTING_DRESS_UNDRESS_CARD_FILES);

export type DressItemType = "object" | "action";
export type DressActionType = "on" | "off" | "object";
export type DressAppliesTo = "male" | "female" | "all";

export type DressRegistryCard = {
  slug: string;
  title: string;
  filename: string;
  imageUrl: string;
  itemType: DressItemType;
  actionType: DressActionType;
  appliesTo: DressAppliesTo;
  tags: readonly string[];
};

type DefInput = Omit<DressRegistryCard, "imageUrl">;

function toCard(def: DefInput): DressRegistryCard | null {
  if (!fileSet.has(def.filename)) {
    console.warn(
      `[getting-dress registry] Skipping slug "${def.slug}": file missing on disk → ${def.filename}`,
    );
    return null;
  }
  const stem = def.filename.replace(/\.png$/i, "");
  return {
    ...def,
    imageUrl: gettingDressUndressImageUrl(stem),
  };
}

/** Canonical definitions — filename must match disk exactly. */
const DEFS: readonly DefInput[] = [
  // Female-only (per spec)
  {
    slug: "bra",
    title: "Bra",
    filename: "18_bra.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "bra-on",
    title: "Put bra on",
    filename: "35_braon.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "bra-off",
    title: "Take bra off",
    filename: "36_braoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "knickers",
    title: "Knickers",
    filename: "19_knickers.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "knickers-on",
    title: "Put knickers on",
    filename: "37_knickerson.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "knickers-off",
    title: "Take knickers off",
    filename: "38_knickersoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "swimsuit",
    title: "Swimsuit",
    filename: "17_swimsuit.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "female",
    tags: ["swim"],
  },
  {
    slug: "swimsuit-on",
    title: "Put swimsuit on",
    filename: "33_swimsuiton.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "female",
    tags: ["swim"],
  },
  {
    slug: "swimsuit-off",
    title: "Take swimsuit off",
    filename: "34_swimsuitoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "female",
    tags: ["swim"],
  },
  // Male-only
  {
    slug: "trunks",
    title: "Trunks",
    filename: "16_trunks.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "male",
    tags: ["underwear"],
  },
  {
    slug: "trunks-on",
    title: "Put trunks on",
    filename: "31_trunkson.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "male",
    tags: ["underwear"],
  },
  {
    slug: "trunks-off",
    title: "Take trunks off",
    filename: "32_trunksoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "male",
    tags: ["underwear"],
  },
  // All genders (per spec)
  {
    slug: "gloves",
    title: "Gloves",
    filename: "14_gloves.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["hands"],
  },
  {
    slug: "gloves-on",
    title: "Put gloves on",
    filename: "27_gloveson.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["hands"],
  },
  {
    slug: "gloves-off",
    title: "Take gloves off",
    filename: "28_glovesoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["hands"],
  },
  {
    slug: "hat",
    title: "Hat",
    filename: "hat.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["head"],
  },
  {
    slug: "hat-on",
    title: "Put hat on",
    filename: "21_haton.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["head"],
  },
  {
    slug: "hat-off",
    title: "Take hat off",
    filename: "22_hatoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["head"],
  },
  {
    slug: "cap-off",
    title: "Take cap off",
    filename: "20_capoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["head"],
  },
  {
    slug: "cap-on",
    title: "Put cap on",
    filename: "19_capon.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["head"],
  },
  {
    slug: "scarf",
    title: "Scarf",
    filename: "15_scarf.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["neck"],
  },
  {
    slug: "scarf-on",
    title: "Put scarf on",
    filename: "29_scarfon.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["neck"],
  },
  {
    slug: "scarf-off",
    title: "Take scarf off",
    filename: "30_scarfoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["neck"],
  },
  {
    slug: "jacket",
    title: "Jacket",
    filename: "jacket.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["outer"],
  },
  {
    slug: "jacket-on",
    title: "Put jacket on",
    filename: "17_jacketon.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["outer"],
  },
  {
    slug: "jacket-off",
    title: "Take jacket off",
    filename: "18_jacketoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["outer"],
  },
  {
    slug: "jumper",
    title: "Jumper",
    filename: "jumper.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["layer"],
  },
  {
    slug: "jumper-on",
    title: "Put jumper on",
    filename: "15_jumperon.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["layer"],
  },
  {
    slug: "jumper-off",
    title: "Take jumper off",
    filename: "16_jumperoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["layer"],
  },
  {
    slug: "vest",
    title: "Vest (long undershirt)",
    filename: "vest.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "female",
    tags: ["top", "vest"],
  },
  {
    slug: "vest-on",
    title: "Put vest on",
    filename: "vest-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "female",
    tags: ["top", "vest"],
  },
  {
    slug: "vest-off",
    title: "Take vest off",
    filename: "vest-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "female",
    tags: ["top", "vest"],
  },
  {
    slug: "shirt",
    title: "Shirt",
    filename: "shirt.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "shirt-on",
    title: "Put shirt on",
    filename: "shirt-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "shirt-off",
    title: "Take shirt off",
    filename: "14_shirtoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "tshirt",
    title: "T-shirt",
    filename: "tshirt.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "tshirt-on",
    title: "Put t-shirt on",
    filename: "tshirt-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "tshirt-off",
    title: "Take t-shirt off",
    filename: "tshirt-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["top"],
  },
  {
    slug: "shorts",
    title: "Shorts",
    filename: "shorts.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "shorts-on",
    title: "Put shorts on",
    filename: "23_shortson.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "shorts-off",
    title: "Take shorts off",
    filename: "24_shortsoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "pants",
    title: "Pants (underpants)",
    filename: "pants.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "pants-on",
    title: "Put underpants on",
    filename: "pants-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "pants-off",
    title: "Take underpants off",
    filename: "pants-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "female",
    tags: ["underwear"],
  },
  {
    slug: "trousers",
    title: "Trousers",
    filename: "trousers.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "trousers-on",
    title: "Put trousers on",
    filename: "trousers-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "trousers-off",
    title: "Take trousers off",
    filename: "trousers-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["bottom"],
  },
  {
    slug: "socks",
    title: "Socks",
    filename: "socks.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "socks-on",
    title: "Put socks on",
    filename: "socks-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "socks-off",
    title: "Take socks off",
    filename: "socks-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "shoes",
    title: "Shoes",
    filename: "shoes.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "shoes-on",
    title: "Put shoes on",
    filename: "shoes-on.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "shoes-off",
    title: "Take shoes off",
    filename: "shoes-off.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "trainers",
    title: "Trainers",
    filename: "trainers.png",
    itemType: "object",
    actionType: "object",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "trainers-on",
    title: "Put trainers on",
    filename: "25_trainerson.png",
    itemType: "action",
    actionType: "on",
    appliesTo: "all",
    tags: ["feet"],
  },
  {
    slug: "trainers-off",
    title: "Take trainers off",
    filename: "26_trainersoff.png",
    itemType: "action",
    actionType: "off",
    appliesTo: "all",
    tags: ["feet"],
  },
] as const;

const hydrated: DressRegistryCard[] = [];
const slugToCard = new Map<string, DressRegistryCard>();

for (const def of DEFS) {
  const card = toCard(def);
  if (card) {
    hydrated.push(card);
    slugToCard.set(card.slug, card);
  }
}

/** All cards that resolved to an existing file on disk. */
export const GETTING_DRESS_REGISTRY: readonly DressRegistryCard[] = hydrated;

export function getDressRegistryCardBySlug(
  slug: string,
): DressRegistryCard | undefined {
  return slugToCard.get(slug);
}

const DRESS_PREFIX = "gd-dressed-";
const UNDRESS_PREFIX = "gd-undressed-";

export const GETTING_DRESS_ROUTINE_IDS = [
  "getting-dressed",
  "getting-undressed",
] as const;

/**
 * Getting dressed — coherent order (per clinical / home routine):
 * 1) Male: trunks. Female: knickers → underpants (pants-on) → bra.
 * 2) Socks (after underwear, before outer trousers).
 * 3) Outer legs: trousers.
 * 4) Torso: t-shirt then shirt.
 * 5) Female: long vest (undershirt) under jumper.
 * 6) Jumper then jacket.
 * 7) Complements: scarf, gloves, hat, cap.
 * 8) Shoes, then trainers / slippers last.
 * Shorts & swimsuit: registry only for other flows.
 */
export const GETTING_DRESSED_SLUG_ORDER: readonly string[] = [
  "trunks-on",
  "knickers-on",
  "pants-on",
  "bra-on",
  "socks-on",
  "trousers-on",
  "tshirt-on",
  "shirt-on",
  "vest-on",
  "jumper-on",
  "jacket-on",
  "scarf-on",
  "gloves-on",
  "hat-on",
  "cap-on",
  "shoes-on",
  "trainers-on",
];

/**
 * Getting undressed — inverse: trainers → shoes → head/acc → jacket → jumper →
 * vest → shirts → trousers → socks → underwear (trunks / bra / pants / knickers).
 */
export const GETTING_UNDRESSED_SLUG_ORDER: readonly string[] = [
  "trainers-off",
  "shoes-off",
  "cap-off",
  "hat-off",
  "gloves-off",
  "scarf-off",
  "jacket-off",
  "jumper-off",
  "vest-off",
  "shirt-off",
  "tshirt-off",
  "trousers-off",
  "socks-off",
  "trunks-off",
  "bra-off",
  "pants-off",
  "knickers-off",
];

function buildStepsFromSlugOrder(
  prefix: "dress" | "undress",
  slugs: readonly string[],
): RoutineStep[] {
  const p = prefix === "dress" ? DRESS_PREFIX : UNDRESS_PREFIX;
  const out: RoutineStep[] = [];
  for (const slug of slugs) {
    const card = getDressRegistryCardBySlug(slug);
    if (!card) {
      console.warn(
        `[getting-dress registry] Skipping unknown or unresolved slug in sequence: "${slug}"`,
      );
      continue;
    }
    out.push({
      id: `${p}${slug}`,
      title: card.title,
      imageUrl: card.imageUrl,
    });
  }
  return out;
}

export function buildGettingDressedRoutineSteps(): RoutineStep[] {
  return buildStepsFromSlugOrder("dress", GETTING_DRESSED_SLUG_ORDER);
}

export function buildGettingUndressedRoutineSteps(): RoutineStep[] {
  return buildStepsFromSlugOrder("undress", GETTING_UNDRESSED_SLUG_ORDER);
}

export function parseDressSlugFromStepId(stepId: string): string | null {
  if (stepId.startsWith(DRESS_PREFIX))
    return stepId.slice(DRESS_PREFIX.length);
  if (stepId.startsWith(UNDRESS_PREFIX))
    return stepId.slice(UNDRESS_PREFIX.length);
  return null;
}

export function cardAppliesToSex(
  appliesTo: DressAppliesTo,
  sex: ChildSex,
): boolean {
  if (sex === "unspecified") return true;
  if (appliesTo === "all") return true;
  if (sex === "male") return appliesTo === "male";
  if (sex === "female") return appliesTo === "female";
  return true;
}

export function filterGettingDressRoutineByProfileSex(
  routine: Routine,
  sex: ChildSex | undefined,
): Routine {
  const s: ChildSex = sex ?? "unspecified";
  const steps = routine.steps.filter((step) => {
    const slug = parseDressSlugFromStepId(step.id);
    if (!slug) return true;
    const card = getDressRegistryCardBySlug(slug);
    if (!card) return true;
    return cardAppliesToSex(card.appliesTo, s);
  });
  return { ...routine, steps };
}
