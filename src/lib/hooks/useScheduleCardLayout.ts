"use client";

import { useSyncExternalStore } from "react";
import {
  GENERATED_PIXTO_SCHEDULE_NEXT_W,
  GENERATED_PIXTO_SCHEDULE_NOW_W,
} from "@/lib/constants/generated-pixto-card-sizes";
import {
  TABLET_LAYOUT_MEDIA,
  TABLET_SCHEDULE_NEXT_CARD_MAX_W_PX,
  TABLET_SCHEDULE_NOW_CARD_MAX_W_PX,
} from "@/lib/constants/app-shell-layout";

function subscribeTabletLayout(onChange: () => void) {
  const mq = window.matchMedia(TABLET_LAYOUT_MEDIA);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getTabletLayoutSnapshot() {
  return window.matchMedia(TABLET_LAYOUT_MEDIA).matches;
}

export function useTabletLayout(): boolean {
  return useSyncExternalStore(
    subscribeTabletLayout,
    getTabletLayoutSnapshot,
    () => false,
  );
}

/** @deprecated Prefer {@link useTabletLayout}. */
export function useTabletTouchLayout(): boolean {
  return useTabletLayout();
}

export function useScheduleCardLayout() {
  const isTabletLayout = useTabletLayout();

  return {
    isTabletTouch: isTabletLayout,
    isTabletLayout,
    nowCardMaxW: isTabletLayout
      ? TABLET_SCHEDULE_NOW_CARD_MAX_W_PX
      : GENERATED_PIXTO_SCHEDULE_NOW_W,
    nextCardMaxW: isTabletLayout
      ? TABLET_SCHEDULE_NEXT_CARD_MAX_W_PX
      : GENERATED_PIXTO_SCHEDULE_NEXT_W,
  };
}
