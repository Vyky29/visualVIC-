import type { RoutineStep } from "@/lib/types/routine";
import {
  BRUSHING_TEETH_SEQUENCE,
  brushingTeethImageUrl,
} from "@/lib/cards/brushing-teeth-cards";
import { CLIMBING_SEQUENCE, climbingImageUrl } from "@/lib/cards/climbing-cards";
import { CORE_SEQUENCE, coreImageUrl } from "@/lib/cards/core-cards";
import { SHOWER_SEQUENCE, showerImageUrl } from "@/lib/cards/shower-cards";
import { getDressRegistryCardBySlug } from "@/lib/cards/getting-dress-undress-registry";

type MixedRef =
  | { kind: "core"; slug: string }
  | { kind: "bt"; slug: string }
  | { kind: "shower"; slug: string }
  | { kind: "climb"; slug: string }
  | { kind: "dress"; slug: string };

function resolveRef(ref: MixedRef): RoutineStep | null {
  switch (ref.kind) {
    case "core": {
      const s = CORE_SEQUENCE.find((x) => x.slug === ref.slug);
      if (!s) return null;
      return {
        id: s.id,
        title: s.title,
        imageUrl: coreImageUrl(s.slug),
      };
    }
    case "bt": {
      const s = BRUSHING_TEETH_SEQUENCE.find((x) => x.slug === ref.slug);
      if (!s) return null;
      return {
        id: s.id,
        title: s.title,
        imageUrl: brushingTeethImageUrl(s.slug),
      };
    }
    case "shower": {
      const s = SHOWER_SEQUENCE.find((x) => x.slug === ref.slug);
      if (!s) return null;
      return {
        id: s.id,
        title: s.title,
        imageUrl: showerImageUrl(s.slug),
      };
    }
    case "climb": {
      const s = CLIMBING_SEQUENCE.find((x) => x.slug === ref.slug);
      if (!s) return null;
      return {
        id: s.id,
        title: s.title,
        imageUrl: climbingImageUrl(s.slug),
      };
    }
    case "dress": {
      const card = getDressRegistryCardBySlug(ref.slug);
      if (!card) return null;
      const isOff = ref.slug.endsWith("-off");
      const id = isOff ? `gd-undressed-${ref.slug}` : `gd-dressed-${ref.slug}`;
      return {
        id,
        title: card.title,
        imageUrl: card.imageUrl,
      };
    }
    default:
      return null;
  }
}

function buildSteps(refs: readonly MixedRef[]): RoutineStep[] {
  const out: RoutineStep[] = [];
  for (const ref of refs) {
    const step = resolveRef(ref);
    if (step) out.push(step);
  }
  return out;
}

/** Morning — core + brushing + shower + getting dressed (PixtoLearn cards only). */
export function buildMorningModularRoutineSteps(): RoutineStep[] {
  return buildSteps([
    { kind: "core", slug: "eat" },
    { kind: "core", slug: "wash-hands" },
    { kind: "bt", slug: "get-toothbrush" },
    { kind: "bt", slug: "put-toothpaste" },
    { kind: "bt", slug: "brush-top-teeth" },
    { kind: "shower", slug: "shower" },
    { kind: "shower", slug: "wash-body" },
    { kind: "shower", slug: "towel" },
    { kind: "dress", slug: "socks-on" },
    { kind: "dress", slug: "tshirt-on" },
    { kind: "dress", slug: "trousers-on" },
  ]);
}

/** Getting ready to go out — core + dress layers / shoes. */
export function buildGettingReadyOutSteps(): RoutineStep[] {
  return buildSteps([
    { kind: "core", slug: "wait" },
    { kind: "core", slug: "walk" },
    { kind: "dress", slug: "socks-on" },
    { kind: "dress", slug: "shoes-on" },
    { kind: "dress", slug: "jacket-on" },
    { kind: "dress", slug: "cap-on" },
  ]);
}

/** Climbing prep — core + dress (comfort) + climbing safety flow. */
export function buildClimbingPrepSteps(): RoutineStep[] {
  return buildSteps([
    { kind: "core", slug: "choose" },
    { kind: "dress", slug: "tshirt-on" },
    { kind: "dress", slug: "trousers-on" },
    { kind: "climb", slug: "rub-your-palms" },
    { kind: "climb", slug: "put-helmet-on" },
    { kind: "climb", slug: "put-harness-on" },
    { kind: "climb", slug: "put-climbing-shoes-on" },
    { kind: "climb", slug: "climbing-wall" },
  ]);
}

/** Bedtime / evening — core + shower + brushing + undress + wind-down. */
export function buildBedtimeEveningSteps(): RoutineStep[] {
  return buildSteps([
    { kind: "core", slug: "toilet" },
    { kind: "shower", slug: "shower" },
    { kind: "shower", slug: "rinse-body" },
    { kind: "shower", slug: "dry-body" },
    { kind: "bt", slug: "get-toothbrush" },
    { kind: "bt", slug: "put-toothpaste" },
    { kind: "bt", slug: "brush-bottom-teeth" },
    { kind: "bt", slug: "put-toothbrush-away" },
    { kind: "dress", slug: "socks-off" },
    { kind: "dress", slug: "tshirt-off" },
    { kind: "dress", slug: "trousers-off" },
    { kind: "core", slug: "quiet" },
    { kind: "core", slug: "sit-down" },
  ]);
}
