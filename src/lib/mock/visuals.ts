import type { VisualAsset } from "@/lib/types/routine";
import { brushingTeethImageUrl } from "@/lib/cards/brushing-teeth-cards";

const base = "https://images.unsplash.com";

export const mockVisualLibrary: VisualAsset[] = [
  {
    id: "v-morning",
    label: "Morning light",
    category: "home",
    thumbnailUrl: `${base}/photo-1506905925346-21bda4d32df4?w=400&q=80`,
  },
  {
    id: "v-brush",
    label: "Brush teeth",
    category: "self-care",
    thumbnailUrl: brushingTeethImageUrl("get-toothbrush"),
  },
  {
    id: "v-shower",
    label: "Shower",
    category: "self-care",
    thumbnailUrl: `${base}/photo-1558618666-fcd25c85cd64?w=400&q=80`,
  },
  {
    id: "v-swim",
    label: "Swimming",
    category: "activity",
    thumbnailUrl: `${base}/photo-1571902943202-507ec2618e8f?w=400&q=80`,
  },
  {
    id: "v-hands",
    label: "Wash hands",
    category: "self-care",
    thumbnailUrl: `${base}/photo-1584464491033-0667f109d080?w=400&q=80`,
  },
  {
    id: "v-snack",
    label: "Snack time",
    category: "home",
    thumbnailUrl: `${base}/photo-1509440159596-0249088772ff?w=400&q=80`,
  },
];
