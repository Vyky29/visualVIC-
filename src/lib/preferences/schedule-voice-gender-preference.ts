export type ScheduleVoiceGender = "female" | "male";

export const SCHEDULE_VOICE_GENDER_STORAGE_KEY =
  "pixtolearn-schedule-voice-gender";

export const SCHEDULE_VOICE_GENDER_CHANGE_EVENT =
  "pixtolearn-schedule-voice-gender-change";

export function readStoredScheduleVoiceGender(): ScheduleVoiceGender {
  if (typeof window === "undefined") return "female";
  try {
    const v = window.localStorage.getItem(SCHEDULE_VOICE_GENDER_STORAGE_KEY);
    return v === "male" ? "male" : "female";
  } catch {
    return "female";
  }
}

export function writeStoredScheduleVoiceGender(gender: ScheduleVoiceGender) {
  try {
    window.localStorage.setItem(SCHEDULE_VOICE_GENDER_STORAGE_KEY, gender);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent<ScheduleVoiceGender>(SCHEDULE_VOICE_GENDER_CHANGE_EVENT, {
      detail: gender,
    }),
  );
}
