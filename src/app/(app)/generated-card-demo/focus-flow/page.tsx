"use client";

import { useMemo } from "react";
import { FocusMode } from "@/components/schedule/FocusMode";
import {
  HOTEL_GENERATED_CARD_PROPS,
  routineStepsFromGeneratedCardProps,
} from "@/lib/experimental/generated-pixto-demo-routine";
import type { Routine } from "@/lib/types/routine";

export default function GeneratedWowFocusFlowPage() {
  const routine = useMemo<Routine>(() => {
    const suffix =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : String(Date.now());

    return {
      id: `generated-wow-focus-flow-${suffix}`,
      name: "Generated wow focus flow",
      steps: routineStepsFromGeneratedCardProps(
        `generated-wow-focus-${suffix}`,
        HOTEL_GENERATED_CARD_PROPS.slice(0, 4),
      ),
    };
  }, []);

  return <FocusMode routine={routine} exitHref="/generated-card-demo" />;
}
