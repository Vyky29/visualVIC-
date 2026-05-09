import type { Routine } from "@/lib/types/routine";
import {
  BRUSHING_TEETH_SEQUENCE,
  brushingTeethImageUrl,
} from "@/lib/cards/brushing-teeth-cards";
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
    id: "shower-routine",
    name: "Shower Routine",
    description: "Predictable wash flow",
    tags: ["self-care"],
    steps: [
      {
        id: "sr1",
        title: "Set comfortable water temperature",
        imageUrl: unsplash("photo-1558618666-fcd25c85cd64"),
      },
      {
        id: "sr2",
        title: "Shampoo hair",
        imageUrl: unsplash("photo-1519823554368-69bcd4d7e7f7"),
      },
      {
        id: "sr3",
        title: "Wash body",
        imageUrl: unsplash("photo-1560750588-73207b17efdb"),
      },
      {
        id: "sr4",
        title: "Dry off & moisturise",
        imageUrl: unsplash("photo-1620916566398-39f1143ab7be"),
      },
    ],
  },
  {
    id: "swimming-routine",
    name: "Swimming Routine",
    description: "Pool visit flow",
    tags: ["activity"],
    steps: [
      {
        id: "sw1",
        title: "Change into swimwear",
        imageUrl: unsplash("photo-1530549387789-4c1017266635"),
      },
      {
        id: "sw2",
        title: "Quick rinse shower",
        imageUrl: unsplash("photo-1576610618956-51f697615843"),
      },
      {
        id: "sw3",
        title: "Swim session",
        imageUrl: unsplash("photo-1571902943202-507ec2618e8f"),
      },
      {
        id: "sw4",
        title: "Shower after pool",
        imageUrl: unsplash("photo-1558618666-fcd25c85cd64"),
      },
    ],
  },
];

export function getRoutineById(id: string): Routine | undefined {
  return mockRoutines.find((r) => r.id === id);
}

export function resolveRoutineById(id: string): Routine | undefined {
  return getRoutineById(id) ?? mockTemplates.find((t) => t.id === id);
}
