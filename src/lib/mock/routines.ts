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
  DAY_CENTRE_MINI_GYM_3D_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_WARMUP_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_CARDIO_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_STRENGTH_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_3D_WARMUP_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_3D_CARDIO_GENERATED_CARD_PROPS,
  DAY_CENTRE_MINI_GYM_3D_STRENGTH_GENERATED_CARD_PROPS,
  DAY_CENTRE_BOULDERING_PREP_GENERATED_CARD_PROPS,
  DAY_CENTRE_BOULDERING_WALL_GENERATED_CARD_PROPS,
  DAY_CENTRE_COOKING_PREP_GENERATED_CARD_PROPS,
  DAY_CENTRE_COOKING_BAKE_GENERATED_CARD_PROPS,
  DAY_CENTRE_COMMUNITY_MARKET_GENERATED_CARD_PROPS,
  DAY_CENTRE_COMMUNITY_PARK_GENERATED_CARD_PROPS,
  DAY_CENTRE_PREMIUM_SHOWER_GENERATED_CARD_PROPS,
  DAY_CENTRE_PREMIUM_SWIM_GENERATED_CARD_PROPS,
  DAY_CENTRE_PREMIUM_DRESS_GENERATED_CARD_PROPS,
  DAY_CENTRE_MIXED_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_SERINE_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_AYAAN_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_AYAAN_MACHINERY_3D_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_DAILY_AVATAR_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_GYM_AVATAR_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_GENERATED_CARD_PROPS,
  DAY_CENTRE_EMMANUEL_MACHINERY_3D_GENERATED_CARD_PROPS,
  DAY_CENTRE_CYRUS_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_FADI_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_FADI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_TIMI_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_TIMI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS,
  DAY_CENTRE_IKRAM_ITEMS_GENERATED_CARD_PROPS,
  DAY_CENTRE_SERINE_MACHINERY_3D_GENERATED_CARD_PROPS,
  HOTEL_GENERATED_CARD_PROPS,
  PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import { dayCentreFolderIconUrl } from "@/lib/routines/day-centre-folders";
import { physical3dGymImageUrl, physical3dImageUrl } from "@/lib/cards/physical-cards";
import {
  dayCentreGeneralImageUrl,
  dayCentreHubRoomImageUrl,
} from "@/lib/cards/day-centre-shared";
import {
  DAY_CENTRE_SERINE_MACHINERY_ROUTINE_NAME,
  DAY_CENTRE_SERINE_ROUTINE_NAME,
} from "@/lib/cards/day-centre-serine-cards";
import {
  DAY_CENTRE_AYAAN_MACHINERY_ROUTINE_NAME,
  DAY_CENTRE_AYAAN_ROUTINE_NAME,
} from "@/lib/cards/day-centre-ayaan-cards";
import {
  DAY_CENTRE_EMMANUEL_AVATAR_ROUTINE_NAME,
  DAY_CENTRE_EMMANUEL_GYM_AVATAR_ROUTINE_NAME,
  DAY_CENTRE_EMMANUEL_GYM_ITEMS_ROUTINE_NAME,
  DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME,
} from "@/lib/cards/day-centre-emmanuel-cards";
import { DAY_CENTRE_CYRUS_ROUTINE_NAME } from "@/lib/cards/day-centre-cyrus-cards";
import {
  DAY_CENTRE_FADI_AVATAR_ROUTINE_NAME,
  DAY_CENTRE_FADI_ITEMS_ROUTINE_NAME,
} from "@/lib/cards/day-centre-fadi-cards";
import {
  DAY_CENTRE_TIMI_AVATAR_ROUTINE_NAME,
  DAY_CENTRE_TIMI_ITEMS_ROUTINE_NAME,
} from "@/lib/cards/day-centre-timi-cards";
import {
  DAY_CENTRE_IKRAM_ITEMS_ROUTINE_NAME,
  DAY_CENTRE_IKRAM_ROUTINE_NAME,
} from "@/lib/cards/day-centre-ikram-cards";
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
    homePreviewImageUrl: swimmingImageUrl("swimming-pool"),
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
    name: "Mini Gym · 2D",
    description: "Mini gym equipment — flat 2D objects only (no people)",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("mini-gym"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym",
      DAY_CENTRE_MINI_GYM_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-3d",
    name: "Mini Gym · 3D",
    description: "Mini gym equipment — soft 3D objects (`library-3d/`)",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("therapy-ball"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-3d",
      DAY_CENTRE_MINI_GYM_3D_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-warmup",
    name: "Mini Gym · Warm-up",
    description: "Therapy ball, mat and bands — 2D objects",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("mini-gym"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-warmup",
      DAY_CENTRE_MINI_GYM_WARMUP_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-cardio",
    name: "Mini Gym · Cardio",
    description: "Treadmill, bike, trampoline and steps — 2D objects",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("treadmill"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-cardio",
      DAY_CENTRE_MINI_GYM_CARDIO_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-strength",
    name: "Mini Gym · Strength",
    description: "Weights, bells, steps and foam roller — 2D objects",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("weights"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-strength",
      DAY_CENTRE_MINI_GYM_STRENGTH_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-3d-warmup",
    name: "Mini Gym · 3D warm-up",
    description: "Therapy ball, mat, bands and BOSU — 3D library",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("therapy-ball"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-3d-warmup",
      DAY_CENTRE_MINI_GYM_3D_WARMUP_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-3d-cardio",
    name: "Mini Gym · 3D cardio",
    description: "Treadmill, bike, trampoline, steps and rower — 3D library",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("treadmill"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-3d-cardio",
      DAY_CENTRE_MINI_GYM_3D_CARDIO_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-mini-gym-3d-strength",
    name: "Mini Gym · 3D strength",
    description: "Weights, kettlebell, medicine ball, steps and foam roller — 3D",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("weights"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-mini-gym-3d-strength",
      DAY_CENTRE_MINI_GYM_3D_STRENGTH_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-bouldering",
    name: "Bouldering · Full",
    description: "Shoes, chalk, holds and boulder wall — full sequence",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("bouldering"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-bouldering",
      DAY_CENTRE_BOULDERING_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-bouldering-prep",
    name: "Bouldering · Get ready",
    description: "Climbing shoes, magnesium and rub palms",
    tags: ["extra"],
    homePreviewImageUrl: climbingImageUrl("put-climbing-shoes-on"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-bouldering-prep",
      DAY_CENTRE_BOULDERING_PREP_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-bouldering-wall",
    name: "Bouldering · On the wall",
    description: "Boulder wall, holds, grab and step on holds",
    tags: ["extra"],
    homePreviewImageUrl: climbingImageUrl("boulder-wall"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-bouldering-wall",
      DAY_CENTRE_BOULDERING_WALL_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-cooking",
    name: "Cooking · Pizza day",
    description:
      "Wash hands, apron, mix dough, top pizza, bake, eat, tidy up and washing up",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("wash-hands"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-cooking",
      DAY_CENTRE_COOKING_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-cooking-prep",
    name: "Cooking · Kitchen prep",
    description: "Wash hands, apron, chopping board, peeler and peeling",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("wash-hands"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-cooking-prep",
      DAY_CENTRE_COOKING_PREP_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-cooking-bake",
    name: "Cooking · Bake & mix",
    description:
      "Wash hands, apron, flour, water, knead dough, roll, top and bake pizza",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("wash-hands"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-cooking-bake",
      DAY_CENTRE_COOKING_BAKE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-community",
    name: "Community · Westfield",
    description: "Bus, Westfield shopping, McDonald's and taxi home",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreFolderIconUrl("community"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-community",
      DAY_CENTRE_COMMUNITY_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-community-market",
    name: "Community · Market day",
    description: "Bus to market, basket, pay and home",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("market"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-community-market",
      DAY_CENTRE_COMMUNITY_MARKET_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-community-park",
    name: "Community · Park outing",
    description: "Walk to park, playground, cafe and taxi home",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("park"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-community-park",
      DAY_CENTRE_COMMUNITY_PARK_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-premium-shower",
    name: "Premium · Shower",
    description: "Shampoo, sponge, rinse and dry — shower basics",
    tags: ["extra"],
    homePreviewImageUrl: showerImageUrl("squeeze-shampoo"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-premium-shower",
      DAY_CENTRE_PREMIUM_SHOWER_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-premium-swim",
    name: "Premium · Swim changing",
    description: "Shoes off, trunks, flip-flops and goggles",
    tags: ["extra"],
    homePreviewImageUrl: swimmingImageUrl("swimming-pool"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-premium-swim",
      DAY_CENTRE_PREMIUM_SWIM_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "dc-premium-dress",
    name: "Premium · Get dressed",
    description: "Pants, socks, trousers, t-shirt and shoes",
    tags: ["extra"],
    homePreviewImageUrl: gettingDressUndressImageUrl("tshirt-on"),
    steps: routineStepsFromGeneratedCardProps(
      "dc-premium-dress",
      DAY_CENTRE_PREMIUM_DRESS_GENERATED_CARD_PROPS,
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
    tags: ["extra"],
    homePreviewImageUrl: dayCentreHubRoomImageUrl(),
    steps: routineStepsFromGeneratedCardProps(
      "at-the-day-centre",
      DAY_CENTRE_GENERAL_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "physical",
    name: "Physical Activity",
    description:
      "Full 3D library — 13 fitness items and 17 gym machines (30 steps)",
    tags: ["activity"],
    homePreviewImageUrl: physical3dImageUrl("therapy-ball"),
    steps: routineStepsFromGeneratedCardProps(
      "physical",
      PHYSICAL_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ikram-day-centre",
    name: DAY_CENTRE_IKRAM_ROUTINE_NAME,
    description:
      "Ikram · Day centre — music, circle time, cafe, swimming, shower, park, swing, restaurant, birthday party, cab and home with munchie (avatar art)",
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
      "Gym routine with Serine — treadmill, rower, sandbags, weights and weight ball (3D avatar scenes)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("serine-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "serine-day-centre",
      DAY_CENTRE_SERINE_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "serine-gym-equipment-3d",
    name: DAY_CENTRE_SERINE_MACHINERY_ROUTINE_NAME,
    description:
      "Physical activity items only — treadmill, rower, sandbags, weights, BOSU and steps (3D library)",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("treadmill"),
    steps: routineStepsFromGeneratedCardProps(
      "serine-gym-equipment-3d",
      DAY_CENTRE_SERINE_MACHINERY_3D_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ayaan-day-centre",
    name: DAY_CENTRE_AYAAN_ROUTINE_NAME,
    description:
      "Physical activity with Ayaan — snack, therapy ball, elastic band, sandbag, weights, BOSU, treadmill (personalised 3D scenes)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("ayaan-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "ayaan-day-centre",
      DAY_CENTRE_AYAAN_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ayaan-gym-equipment-3d",
    name: DAY_CENTRE_AYAAN_MACHINERY_ROUTINE_NAME,
    description:
      "Physical activity items only — Ayaan snack (metal tupperware), treadmill, therapy ball, sandbags, dumbbells, steps, weight ball (3D library)",
    tags: ["extra"],
    homePreviewImageUrl: physical3dGymImageUrl("sandbag-stack"),
    steps: routineStepsFromGeneratedCardProps(
      "ayaan-gym-equipment-3d",
      DAY_CENTRE_AYAAN_MACHINERY_3D_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "emmanuel-day-centre",
    name: DAY_CENTRE_EMMANUEL_AVATAR_ROUTINE_NAME,
    description:
      "Emmanuel · Mon/Tue/Wed — word search, gym, swimming, shower, shampoo, changing room, lunch, bean bag, handwriting, vocational activity, sports, chocolate cake, washing up, picture book and home (avatar art)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("emmanuel-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "emmanuel-day-centre",
      DAY_CENTRE_EMMANUEL_DAILY_AVATAR_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "emmanuel-day-centre-items",
    name: DAY_CENTRE_EMMANUEL_ITEMS_ROUTINE_NAME,
    description:
      "Emmanuel · Mon/Tue/Wed — word search, gym, swimming, shower, shampoo, changing room, lunch, bean bag, handwriting, vocational activity, sports, chocolate cake, washing up, picture book and home (object / icon art)",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("community-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "emmanuel-day-centre-items",
      DAY_CENTRE_EMMANUEL_DAILY_ITEMS_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "emmanuel-gym-avatar",
    name: DAY_CENTRE_EMMANUEL_GYM_AVATAR_ROUTINE_NAME,
    description:
      "Gym with Emmanuel — cross trainer, gym with Michelle, basketball, finished and swimming (3D avatar)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("emmanuel-gym-avatar"),
    steps: routineStepsFromGeneratedCardProps(
      "emmanuel-gym-avatar",
      DAY_CENTRE_EMMANUEL_GYM_AVATAR_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "emmanuel-gym-equipment-3d",
    name: DAY_CENTRE_EMMANUEL_GYM_ITEMS_ROUTINE_NAME,
    description:
      "Gym equipment only — cross trainer, bike, treadmill, mat, therapy ball, finished and swimming (3D objects)",
    tags: ["extra"],
    homePreviewImageUrl: physical3dGymImageUrl("elliptical"),
    steps: routineStepsFromGeneratedCardProps(
      "emmanuel-gym-equipment-3d",
      DAY_CENTRE_EMMANUEL_GYM_ITEMS_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "cyrus-day-centre",
    name: DAY_CENTRE_CYRUS_ROUTINE_NAME,
    description:
      "Cyrus's day-centre items routine — snack, iPad, table work, climbing, basketball and home",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("cyrus-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "cyrus-day-centre",
      DAY_CENTRE_CYRUS_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "fadi-day-centre",
    name: DAY_CENTRE_FADI_AVATAR_ROUTINE_NAME,
    description:
      "Fadi's day-centre routine — day centre, swimming, snack, table work, Co-op and Vassim's car (avatar art)",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("fadi-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "fadi-day-centre",
      DAY_CENTRE_FADI_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "fadi-day-centre-items",
    name: DAY_CENTRE_FADI_ITEMS_ROUTINE_NAME,
    description:
      "Fadi's day-centre routine — day centre, swimming, snack, table work, Co-op and Vassim's car (3D items)",
    tags: ["extra"],
    homePreviewImageUrl: physical3dImageUrl("vassims-car"),
    steps: routineStepsFromGeneratedCardProps(
      "fadi-day-centre-items",
      DAY_CENTRE_FADI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "timi-day-centre",
    name: DAY_CENTRE_TIMI_AVATAR_ROUTINE_NAME,
    description:
      "Timi's day-centre routine — sensory room, motor skills, changing room, shower, swimming, hub room, snack, puzzles and home",
    tags: ["extra"],
    homePreviewImageUrl: tailoredScheduleCloseUpPreviewUrl("timi-day-centre"),
    steps: routineStepsFromGeneratedCardProps(
      "timi-day-centre",
      DAY_CENTRE_TIMI_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "timi-day-centre-items",
    name: DAY_CENTRE_TIMI_ITEMS_ROUTINE_NAME,
    description:
      "Timi's day-centre routine — sensory room, motor skills, changing room, shower, swimming, hub room, snack, puzzles, Timi's Car and home (items)",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("sensory-room"),
    steps: routineStepsFromGeneratedCardProps(
      "timi-day-centre-items",
      DAY_CENTRE_TIMI_ITEMS_SCHEDULE_GENERATED_CARD_PROPS,
    ),
  },
  {
    id: "ikram-day-centre-items",
    name: DAY_CENTRE_IKRAM_ITEMS_ROUTINE_NAME,
    description:
      "Ikram · Day centre — music, circle time, cafe, swimming, shower, park, swing, restaurant, birthday party, cab and home with munchie (object / icon art)",
    tags: ["extra"],
    homePreviewImageUrl: dayCentreGeneralImageUrl("circle-time"),
    steps: routineStepsFromGeneratedCardProps(
      "ikram-day-centre-items",
      DAY_CENTRE_IKRAM_ITEMS_GENERATED_CARD_PROPS,
    ),
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}

export function resolveRoutineById(id: string): Routine | undefined {
  return getRoutineById(id) ?? mockTemplates.find((t) => t.id === id);
}
