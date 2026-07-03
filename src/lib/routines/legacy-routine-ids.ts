/**
 * Old stock routine ids kept for bookmarks, dashboard links, and Schedule Player MRU.
 * Resolved to the split avatar/items schedules introduced in 2026.
 */

const LEGACY_ROUTINE_ID_SET = new Set([
  "ikram-day-centre",
  "ikram-day-centre-items",
  "emmanuel-day-centre",
  "emmanuel-day-centre-items",
  "fadi-day-centre",
  "fadi-day-centre-items",
]);

export function isLegacyRoutineId(id: string): boolean {
  return LEGACY_ROUTINE_ID_SET.has(id);
}

function emmanuelAvatarRoutineForWeekday(at: Date): string {
  switch (at.getDay()) {
    case 3:
      return "emmanuel-wednesday-avatar";
    case 5:
      return "emmanuel-friday-avatar";
    default:
      return "emmanuel-monday-avatar";
  }
}

function ikramAvatarRoutineForWeekday(at: Date): string {
  return at.getDay() === 2
    ? "ikram-tuesday-avatar"
    : "ikram-mon-wed-fri-avatar";
}

function ikramItemsRoutineForWeekday(at: Date): string {
  return at.getDay() === 2
    ? "ikram-tuesday-items"
    : "ikram-mon-wed-fri-items";
}

function fadiAvatarRoutineForWeekday(at: Date): string {
  const day = at.getDay();
  return day === 2 || day === 4
    ? "fadi-tue-thu-avatar"
    : "fadi-mon-wed-fri-avatar";
}

function fadiItemsRoutineForWeekday(at: Date): string {
  const day = at.getDay();
  return day === 2 || day === 4
    ? "fadi-tue-thu-items"
    : "fadi-mon-wed-fri-items";
}

/** Maps a legacy stock id to its replacement; returns the input when not legacy. */
export function canonicalRoutineId(
  id: string,
  at: Date = new Date(),
): string {
  switch (id) {
    case "emmanuel-day-centre":
      return emmanuelAvatarRoutineForWeekday(at);
    case "emmanuel-day-centre-items":
      return "emmanuel-weekday-items";
    case "ikram-day-centre":
      return ikramAvatarRoutineForWeekday(at);
    case "ikram-day-centre-items":
      return ikramItemsRoutineForWeekday(at);
    case "fadi-day-centre":
      return fadiAvatarRoutineForWeekday(at);
    case "fadi-day-centre-items":
      return fadiItemsRoutineForWeekday(at);
    default:
      return id;
  }
}
