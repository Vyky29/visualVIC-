"use client";

import { useSyncExternalStore } from "react";
import { FIRST_THEN_FOCUS_LANDSCAPE_MEDIA } from "@/lib/constants/app-shell-layout";
import { usePrefersFineHover } from "@/lib/hooks/usePrefersFineHover";

function subscribeFirstThenLandscape(onChange: () => void) {
  const mq = window.matchMedia(FIRST_THEN_FOCUS_LANDSCAPE_MEDIA);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getFirstThenLandscapeSnapshot() {
  return window.matchMedia(FIRST_THEN_FOCUS_LANDSCAPE_MEDIA).matches;
}

/** True when First & Then focus should show the horizontal two-card layout. */
export function useFirstThenLandscapeFocus(): boolean {
  const prefersFineHover = usePrefersFineHover();
  const matchesLayoutMq = useSyncExternalStore(
    subscribeFirstThenLandscape,
    getFirstThenLandscapeSnapshot,
    () => false,
  );
  return matchesLayoutMq || prefersFineHover;
}
