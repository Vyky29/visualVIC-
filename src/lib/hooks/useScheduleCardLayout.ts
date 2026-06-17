"use client";

import { useEffect, useState } from "react";
import {
  GENERATED_PIXTO_SCHEDULE_NEXT_TABLET_W,
  GENERATED_PIXTO_SCHEDULE_NEXT_W,
  GENERATED_PIXTO_SCHEDULE_NOW_TABLET_W,
  GENERATED_PIXTO_SCHEDULE_NOW_W,
  TABLET_TOUCH_MEDIA,
} from "@/lib/constants/app-shell-layout";

export function useTabletTouchLayout(): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(TABLET_TOUCH_MEDIA);
    const apply = () => setMatches(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return matches;
}

export function useScheduleCardLayout() {
  const isTabletTouch = useTabletTouchLayout();

  return {
    isTabletTouch,
    nowCardMaxW: isTabletTouch
      ? GENERATED_PIXTO_SCHEDULE_NOW_TABLET_W
      : GENERATED_PIXTO_SCHEDULE_NOW_W,
    nextCardMaxW: isTabletTouch
      ? GENERATED_PIXTO_SCHEDULE_NEXT_TABLET_W
      : GENERATED_PIXTO_SCHEDULE_NEXT_W,
  };
}
