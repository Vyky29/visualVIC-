export const SCHEDULE_VOICE_STORAGE_KEY = "pixtolearn-schedule-voice";

export const SCHEDULE_VOICE_CHANGE_EVENT = "pixtolearn-schedule-voice-change";

export function readStoredScheduleVoiceEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SCHEDULE_VOICE_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function writeStoredScheduleVoiceEnabled(enabled: boolean) {
  try {
    window.localStorage.setItem(
      SCHEDULE_VOICE_STORAGE_KEY,
      enabled ? "1" : "0",
    );
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent<boolean>(SCHEDULE_VOICE_CHANGE_EVENT, {
      detail: enabled,
    }),
  );
}
