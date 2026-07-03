"use client";

import { useSyncExternalStore } from "react";
import {
  CARD_LANGUAGE_CHANGE_EVENT,
  readStoredCardLanguage,
  type CardLanguageCode,
} from "@/lib/preferences/card-language-preference";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CARD_LANGUAGE_CHANGE_EVENT, onStoreChange);
  return () =>
    window.removeEventListener(CARD_LANGUAGE_CHANGE_EVENT, onStoreChange);
}

function getCardLanguageSnapshot(): CardLanguageCode {
  return readStoredCardLanguage();
}

function getCardLanguageServerSnapshot(): CardLanguageCode {
  return "en";
}

export function useCardUiLanguage(): CardLanguageCode {
  return useSyncExternalStore(
    subscribe,
    getCardLanguageSnapshot,
    getCardLanguageServerSnapshot,
  );
}
