import type { Routine } from "@/lib/types/routine";
import {
  BRUSHING_TEETH_SEQUENCE,
  brushingTeethImageUrl,
} from "@/lib/cards/brushing-teeth-cards";
import { CORE_SEQUENCE, coreImageUrl } from "@/lib/cards/core-cards";
import { CLIMBING_SEQUENCE, climbingImageUrl } from "@/lib/cards/climbing-cards";
import { SHOWER_SEQUENCE, showerImageUrl } from "@/lib/cards/shower-cards";
import { SWIMMING_SEQUENCE, swimmingImageUrl } from "@/lib/cards/swimming-cards";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import {
  buildGettingDressedRoutineSteps,
  buildGettingUndressedRoutineSteps,
} from "@/lib/cards/getting-dress-undress-registry";
import {
  buildBedtimeEveningSteps,
  buildClimbingPrepSteps,
  buildGettingReadyOutSteps,
  buildMorningModularRoutineSteps,
} from "@/lib/mock/mixed-demo-routine-steps";
import { mockTemplates } from "@/lib/mock/templates";
import {
  AIRPORT_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";

/** V1 mock routines — calm, visual-first sequences */
export const mockRoutines: Routine[] = [
  {
    id: "brushing-teeth",
    name: "Brushing Teeth",
    description: "Clear, repeatable steps — PixtoLearn visual cards",
    tags: ["self-care"],
    steps: BRUSHING_TEETH_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: brushingTeethImageUrl(s.slug),
    })),
  },
  {
    id: "morning-routine",
    name: "Morning Routine",
    description:
      "Modular demo — core, brushing, shower & dress cards from PixtoLearn libraries",
    tags: ["morning", "self-care", "home"],
    homePreviewImageUrl: coreImageUrl("eat"),
    steps: buildMorningModularRoutineSteps(),
  },
  {
    id: "demo-getting-ready-to-go-out",
    name: "Getting Ready to Go Out",
    description:
      "Modular demo — core cues plus dress layers (socks, shoes, jacket, cap)",
    tags: ["morning", "home", "self-care"],
    homePreviewImageUrl: coreImageUrl("walk"),
    steps: buildGettingReadyOutSteps(),
  },
  {
    id: "demo-climbing-preparation",
    name: "Climbing Preparation",
    description:
      "Modular demo — choose, comfortable clothes, then helmet, harness, shoes & wall",
    tags: ["activity", "home"],
    homePreviewImageUrl: climbingImageUrl("climbing-wall"),
    steps: buildClimbingPrepSteps(),
  },
  {
    id: "demo-bedtime-evening",
    name: "Bedtime Routine",
    description:
      "Modular demo — toilet, shower, teeth, undress & quiet wind-down",
    tags: ["self-care", "home"],
    homePreviewImageUrl: coreImageUrl("toilet"),
    steps: buildBedtimeEveningSteps(),
  },
  {
    id: "getting-dressed",
    name: "Getting Dressed",
    description: "PixtoLearn clothing cards — steps filter by profile sex",
    tags: ["self-care"],
    homePreviewImageUrl: gettingDressUndressImageUrl("tshirt-on"),
    steps: buildGettingDressedRoutineSteps(),
  },
  {
    id: "getting-undressed",
    name: "Getting Undressed",
    description: "PixtoLearn clothing cards — steps filter by profile sex",
    tags: ["self-care"],
    homePreviewImageUrl: gettingDressUndressImageUrl("trousers-off"),
    steps: buildGettingUndressedRoutineSteps(),
  },
  {
    id: "core-everyday",
    name: "Core actions",
    description: "PixtoLearn core visual cards — communication & daily steps",
    tags: ["home", "communication"],
    steps: CORE_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: coreImageUrl(s.slug),
    })),
  },
  {
    id: "shower-routine",
    name: "Shower Routine",
    description: "PixtoLearn shower visual cards — predictable wash flow",
    tags: ["self-care"],
    steps: SHOWER_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: showerImageUrl(s.slug),
    })),
  },
  {
    id: "climbing-routine",
    name: "Climbing",
    description: "PixtoLearn climbing visual cards — gear, rope and wall",
    tags: ["activity"],
    steps: CLIMBING_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: climbingImageUrl(s.slug),
    })),
  },
  {
    id: "swimming-routine",
    name: "Swimming",
    description: "PixtoLearn swimming visual cards — pool visit flow",
    tags: ["activity"],
    homePreviewImageUrl: swimmingImageUrl("goggles-on"),
    steps: SWIMMING_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: swimmingImageUrl(s.slug),
    })),
  },
  {
    id: "at-the-airport",
    name: "At the airport",
    description:
      "Visual steps for check-in, security, gate, seatbelt and flight — PixtoLearn cards",
    tags: ["home"],
    homePreviewImageUrl: AIRPORT_GENERATED_CARD_PROPS[0].illustrationUrl,
    steps: routineStepsFromGeneratedCardProps(
      "at-the-airport",
      AIRPORT_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "at-the-hotel",
    name: "At the hotel",
    description:
      "Arrival, front desk and room — PixtoLearn visual cards for hotel routines",
    tags: ["home"],
    homePreviewImageUrl: HOTEL_GENERATED_CARD_PROPS[0].illustrationUrl,
    steps: routineStepsFromGeneratedCardProps(
      "at-the-hotel",
      HOTEL_GENERATED_CARD_PROPS,
    ),
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}

export function resolveRoutineById(id: string): Routine | undefined {
  return getRoutineById(id) ?? mockTemplates.find((t) => t.id === id);
}
