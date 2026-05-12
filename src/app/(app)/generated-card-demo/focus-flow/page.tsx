import { FocusMode } from "@/components/schedule/FocusMode";
import {
  HOTEL_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import type { Routine } from "@/lib/types/routine";

const routine: Routine = {
  id: "generated-wow-focus-flow",
  name: "Generated wow focus flow",
  steps: routineStepsFromGeneratedCardProps(
    "generated-wow-focus",
    HOTEL_GENERATED_CARD_PROPS.slice(0, 4),
  ),
};

export default function GeneratedWowFocusFlowPage() {
  return <FocusMode routine={routine} exitHref="/generated-card-demo" />;
}
