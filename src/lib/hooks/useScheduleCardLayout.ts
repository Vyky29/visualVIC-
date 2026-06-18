"use client";

import { useSyncExternalStore } from "react";
import {
  GENERATED_PIXTO_SCHEDULE_NEXT_W,
  GENERATED_PIXTO_SCHEDULE_NOW_W,
} from "@/lib/constants/generated-pixto-card-sizes";
import { TABLET_TOUCH_MEDIA } from "@/lib/constants/app-shell-layout";

function subscribeTabletTouch(onChange: () => void) {
  const mq = window.matchMedia(TABLET_TOUCH_MEDIA);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getTabletTouchSnapshot() {
  return window.matchMedia(TABLET_TOUCH_MEDIA).matches;
}

export function useTabletTouchLayout(): boolean {
  return useSyncExternalStore(
    subscribeTabletTouch,
    getTabletTouchSnapshot,
    () => false,
  );
}

export function useScheduleCardLayout() {
  const isTabletTouch = useTabletTouchLayout();

  return {
    isTabletTouch,
    /** Same caps as phone — preserves 744×1054 card proportions on tablet. */
    nowCardMaxW: GENERATED_PIXTO_SCHEDULE_NOW_W,
    nextCardMaxW: GENERATED_PIXTO_SCHEDULE_NEXT_W,
  };
}
