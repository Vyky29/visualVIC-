import type { Routine } from "@/lib/types/routine";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";

const unsplash = (photoPath: string) =>
  `https://images.unsplash.com/${photoPath}?w=720&q=75&auto=format&fit=crop`;

/** Starter templates — aligns with mock routines where noted */
export const mockTemplates: Routine[] = [
  {
    id: "tpl-first-then-base",
    name: "First / Then — brushing",
    description: "Two-step clarity",
    tags: ["first-then"],
    homePreviewImageUrl: brushingTeethImageUrl("put-toothpaste"),
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
    tags: ["morning"],
    homePreviewImageUrl: unsplash("photo-1570172619643-d175fbde04da"),
    steps: [
      {
        id: "m1",
        title: "Wash face",
        imageUrl: unsplash("photo-1570172619643-d175fbde04da"),
      },
      {
        id: "m2",
        title: "Get dressed",
        imageUrl: gettingDressUndressImageUrl("tshirt-on"),
      },
      {
        id: "m3",
        title: "Breakfast",
        imageUrl: unsplash("photo-1525351484163-7529414344d8"),
      },
    ],
  },
];
