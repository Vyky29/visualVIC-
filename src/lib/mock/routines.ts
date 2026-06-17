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
  DAY_CENTRE_BOULDERING_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_COMMUNITY_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_COOKING_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_GENERAL_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_MIXED_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_SERINE_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_AYAAN_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_SCHEDULE_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
  PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { dayCentreFolderIconUrl } from "@/lib/routines/day-centre-folders";
import { DAY_CENTRE_IKRAM_ROUTINE_NAME } from "@/lib/cards/day-centre-ikram-cards";
import { DAY_CENTRE_SERINE_ROUTINE_NAME } from "@/lib/cards/day-centre-serine-cards";
import { DAY_CENTRE_AYAAN_ROUTINE_NAME } from "@/lib/cards/day-centre-ayaan-cards";
import { DAY_CENTRE_EMMANUEL_ROUTINE_NAME } from "@/lib/cards/day-centre-emmanuel-cards";
import {
  tailoredScheduleCloseUpPreviewUrl,
} from "@/lib/routines/resolve-routine-home-preview";

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
  {
    id: "dc-mini-gym",
    name: "Mini Gym Routine",
    description: "Mini gym equipment — therapy ball, treadmill, weights and stretching",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("mini-gym"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym",
      DAY_CENTRE_MINI_GYM_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-bouldering",
    name: "Bouldering Routine",
    description: "Boulder wall — shoes, holds and climbing steps",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("bouldering"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-bouldering",
      DAY_CENTRE_BOULDERING_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-cooking",
    name: "Cooking Activity",
    description: "Kitchen materials and food preparation",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("cooking"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-cooking",
      DAY_CENTRE_COOKING_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-community",
    name: "Community Outing",
    description: "Westfield, McDonald's and community transport",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("community"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-community",
      DAY_CENTRE_COMMUNITY_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mixed",
    name: "Mixed Day",
    description:
      "Composite schedule — karaoke, cafe, swimming, choosing, cab and home",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("mixed"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mixed",
      DAY_CENTRE_MIXED_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "at-the-day-centre",
    name: "Day centre",
    description:
      "Mixed illustrated cards — breakfast, activities, cooking, outing and relaxation",
    tags: ["home", "activity"],
    homePreviewImageUrl:
      DAY_CENTRE_GENERAL_SCHEDULE_GENERATED_CARD_PROPS[0].illustrationUrl,
    steps: routineStepsFromGeneratedCardProps(
      "at-the-day-centre",
      DAY_CENTRE_GENERAL_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "physical",
    name: "Physical Activity",
    description:
      "Mixed 2D and 3D fitness cards — equipment, gym and stretching",
    tags: ["activity"],
    homePreviewImageUrl: PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS[0].illustrationUrl,
    steps: routineStepsFromGeneratedCardProps(
      "physical",
      PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ikram-day-centre",
    name: DAY_CENTRE_IKRAM_ROUTINE_NAME,
    description:
      "Saturday at day centre — cafe, Westfield shopping, McDonald's, cab home (personalised photos)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("ikram-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "ikram-day-centre",
      DAY_CENTRE_IKRAM_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "serine-day-centre",
    name: DAY_CENTRE_SERINE_ROUTINE_NAME,
    description:
      "Gym routine — therapy ball, treadmill, rower, bike, sandbags, stretching (personalised cartoon)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("serine-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "serine-day-centre",
      DAY_CENTRE_SERINE_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ayaan-day-centre",
    name: DAY_CENTRE_AYAAN_ROUTINE_NAME,
    description:
      "Gym routine — therapy ball, elastic band, sandbag, weights, weight ball, BOSU, treadmill (personalised cartoon)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("ayaan-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "ayaan-day-centre",
      DAY_CENTRE_AYAAN_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "emmanuel-day-centre",
    name: DAY_CENTRE_EMMANUEL_ROUTINE_NAME,
    description:
      "Gym routine — cross trainer and basketball (personalised cartoon)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("emmanuel-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "emmanuel-day-centre",
      DAY_CENTRE_EMMANUEL_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}

export function resolveRoutineById(id: string): Routine | undefined {
  return getRoutineById(id) ?? mockTemplates.find((t) => t.id === id);
}
