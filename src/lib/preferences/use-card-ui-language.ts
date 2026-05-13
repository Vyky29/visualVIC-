"use client";

import { useEffect, useState } from "react";
import {
  CARD_LANGUAGE_CHANGE_EVENT,
  readStoredCardLanguage,
  type CardLanguageCode,
} from "@/lib/preferences/card-language-preference";

export function useCardUiLanguage(): CardLanguageCode {
  const [code, setCode] = useState<CardLanguageCode>("en");

  useEffect(() => {
    setCode(readStoredCardLanguage());
    const onChange = (e: Event) => {
      const ce = e as CustomEvent<CardLanguageCode>;
      if (ce.detail === "en" || ce.detail === "es") {
        setCode(ce.detail);
      } else {
        setCode(readStoredCardLanguage());
      }
    };
    window.addEventListener(CARD_LANGUAGE_CHANGE_EVENT, onChange);
    return () =>
      window.removeEventListener(CARD_LANGUAGE_CHANGE_EVENT, onChange);
  }, []);

  return code;
}
