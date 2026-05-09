import type { Routine } from "@/lib/types/routine";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";

const unsplash = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?w=720&q=75&auto=format&fit=crop`;

/** Starter templates — aligns with mock routines where noted */
export const mockTemplates: Routine[] = [
  {
    id: "tpl-first-then-base",
    name: "First / Then — brushing",
    description: "Two-step clarity",
    tags: ["first-then"],
    steps: [
      {
        id: "t1",
        title: "Put toothpaste on brush",
        imageUrl: brushingTeethImageUrl("put-toothpaste"),
      },
      {
        id: "t2",
        title: "Brush for two minutes",
        imageUrl: brushingTeethImageUrl("brush-top-teeth"),
      },
    ],
  },
  {
    id: "tpl-morning-mini",
    name: "Mini morning",
    description: "Three gentle steps",
    steps: [
      {
        id: "m1",
        title: "Wash face",
        imageUrl: unsplash("photo-1570172619643-d175fbde04da"),
      },
      {
        id: "m2",
        title: "Get dressed",
        imageUrl: unsplash("photo-1523381210438-271e8be1f52b"),
      },
      {
        id: "m3",
        title: "Breakfast",
        imageUrl: unsplash("photo-1525351484163-7529414344d8"),
      },
    ],
  },
];
