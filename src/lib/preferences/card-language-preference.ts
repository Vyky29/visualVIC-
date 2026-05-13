export const CARD_LANGUAGE_STORAGE_KEY = "pixtolearn-card-language";

/** Dispatched on `window` when the user picks a language (for future i18n / AI cards). */
export const CARD_LANGUAGE_CHANGE_EVENT = "pixtolearn-card-language-change";

/** UI + bundled digital copy are wired for English and Spanish only for now. */
export type CardLanguageCode = "en" | "es";

export const CARD_LANGUAGE_OPTIONS: readonly {
  code: CardLanguageCode;
  label: string;
  initials: string;
}[] = [
  { code: "en", label: "English", initials: "ING" },
  { code: "es", label: "Español", initials: "ESP" },
] as const;

/** Legacy keys from older builds map to English. */
export function effectiveDigitalUiLang(code: CardLanguageCode): "en" | "es" {
  return code === "es" ? "es" : "en";
}

export function isCardLanguageCode(value: string): value is CardLanguageCode {
  return CARD_LANGUAGE_OPTIONS.some((o) => o.code === value);
}

export function readStoredCardLanguage(): CardLanguageCode {
  if (typeof window === "undefined") return "en";
  try {
    const raw = window.localStorage.getItem(CARD_LANGUAGE_STORAGE_KEY);
    if (raw === "es") return "es";
    if (raw === "en") return "en";
  } catch {
    /* ignore */
  }
  return "en";
}

export function writeStoredCardLanguage(code: CardLanguageCode) {
  try {
    window.localStorage.setItem(CARD_LANGUAGE_STORAGE_KEY, code);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent<CardLanguageCode>(CARD_LANGUAGE_CHANGE_EVENT, {
      detail: code,
    }),
  );
}

export function optionForCode(code: CardLanguageCode) {
  return CARD_LANGUAGE_OPTIONS.find((o) => o.code === code) ?? CARD_LANGUAGE_OPTIONS[0];
}
