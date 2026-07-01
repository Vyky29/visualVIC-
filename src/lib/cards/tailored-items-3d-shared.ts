/**
 * Tailored schedules — items-only steps (3D library objects, no avatar).
 */
import {
  dayCentreEmmanuelIconUrl,
  dayCentreEmmanuelSceneUrl,
  dayCentreGeneralImageUrl,
  dayCentreIkramItemsImageUrl,
  dayCentreIkramSceneUrl,
} from "@/lib/cards/day-centre-shared";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import { showerImageUrl } from "@/lib/cards/shower-cards";
import { swimmingImageUrl } from "@/lib/cards/swimming-cards";
import {
  physical3dGymImageUrl,
  physical3dImageUrl,
} from "@/lib/cards/physical-cards";

export type TailoredItems3dLibrary =
  | "3d"
  | "3d-gym"
  | "general"
  | "ikram-items"
  | "dress"
  | "emmanuel-icons"
  | "emmanuel-scene"
  | "ikram-scene"
  | "shower"
  | "swimming";

export type TailoredItems3dStep = {
  id: string;
  slug: string;
  title: string;
  library: TailoredItems3dLibrary;
};

export function tailoredItems3dImageUrlForStep(step: TailoredItems3dStep): string {
  switch (step.library) {
    case "emmanuel-icons":
      return dayCentreEmmanuelIconUrl(step.slug);
    case "emmanuel-scene":
      return dayCentreEmmanuelSceneUrl(step.slug);
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "ikram-items":
      return dayCentreIkramItemsImageUrl(step.slug);
    case "dress":
      return gettingDressUndressImageUrl(step.slug);
    case "3d-gym":
      return physical3dGymImageUrl(step.slug);
    case "3d":
      return physical3dImageUrl(step.slug);
    case "shower":
      return showerImageUrl(step.slug);
    case "swimming":
      return swimmingImageUrl(step.slug);
    case "ikram-scene":
      return dayCentreIkramSceneUrl(step.slug);
  }
}
