"use client";

import { useCallback, useEffect, useState } from "react";
import {
  FOCUS_EXPANDED_CARDS_CHANGE_EVENT,
  readStoredFocusExpandedCards,
  writeStoredFocusExpandedCards,
} from "@/lib/preferences/focus-expanded-cards-preference";

export function useFocusExpandedCards() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(readStoredFocusExpandedCards());
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      if (typeof ce.detail === "boolean") {
        setEnabled(ce.detail);
      } else {
        setEnabled(readStoredFocusExpandedCards());
      }
    };
    window.addEventListener(FOCUS_EXPANDED_CARDS_CHANGE_EVENT, onChange);
    return () =>
      window.removeEventListener(FOCUS_EXPANDED_CARDS_CHANGE_EVENT, onChange);
  }, []);

  const toggle = useCallback(() => {
    const next = !readStoredFocusExpandedCards();
    writeStoredFocusExpandedCards(next);
    setEnabled(next);
  }, []);

  const set = useCallback((next: boolean) => {
    writeStoredFocusExpandedCards(next);
    setEnabled(next);
  }, []);

  return { enabled, toggle, set };
}
