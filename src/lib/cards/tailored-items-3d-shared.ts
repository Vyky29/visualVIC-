/**
 * Tailored schedules — items-only steps (3D library objects, no avatar).
 */
import {
  dayCentreEmmanuelIconUrl,
  dayCentreGeneralImageUrl,
} from "@/lib/cards/day-centre-shared";
import { gettingDressUndressImageUrl } from "@/lib/cards/getting-dress-undress-cards";
import {
  physical3dGymImageUrl,
  physical3dImageUrl,
} from "@/lib/cards/physical-cards";

export type TailoredItems3dLibrary =
  | "3d"
  | "3d-gym"
  | "general"
  | "dress"
  | "emmanuel-icons";

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
    case "general":
      return dayCentreGeneralImageUrl(step.slug);
    case "dress":
      return gettingDressUndressImageUrl(step.slug);
    case "3d-gym":
      return physical3dGymImageUrl(step.slug);
    case "3d":
      return physical3dImageUrl(step.slug);
  }
}
