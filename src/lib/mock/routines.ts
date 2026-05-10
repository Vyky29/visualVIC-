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
import { mockTemplates } from "@/lib/mock/templates";

/** Thumbnail-friendly Unsplash params — lighter on mobile / 5G than w=900 */
const unsplash = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?w=720&q=75&auto=format&fit=crop`;

/** V1 mock routines — calm, visual-first sequences */
export const mockRoutines: Routine[] = [
  {
    id: "morning-routine",
    name: "Morning Routine",
    description: "A gentle start",
    tags: ["morning"],
    steps: [
      {
        id: "mr1",
        title: "Wake up & stretch",
        imageUrl: unsplash("photo-1506905925346-21bda4d32df4"),
      },
      {
        id: "mr2",
        title: "Wash face",
        imageUrl: unsplash("photo-1570172619643-d175fbde04da"),
      },
      {
        id: "mr3",
        title: "Breakfast",
        imageUrl: unsplash("photo-1525351484163-7529414344d8"),
      },
      {
        id: "mr4",
        title: "Get dressed",
        imageUrl: unsplash("photo-1523381210438-271e8be1f52b"),
      },
    ],
  },
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
    name: "Swimming Routine",
    description: "PixtoLearn swimming visual cards — pool visit flow",
    tags: ["activity"],
    homePreviewImageUrl: swimmingImageUrl("pool"),
    steps: SWIMMING_SEQUENCE.map((s) => ({
      id: s.id,
      title: s.title,
      imageUrl: swimmingImageUrl(s.slug),
    })),
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}

export function resolveRoutineById(id: string): Routine | undefined {
  return getRoutineById(id) ?? mockTemplates.find((t) => t.id === id);
}
