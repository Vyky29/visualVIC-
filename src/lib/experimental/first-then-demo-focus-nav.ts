/** Hides AppShell BottomNav while first-then-demo Focus Mode is active. */

let focusActive = false;
const listeners = new Set<() => void>();

export function setFirstThenDemoFocusActive(active: boolean) {
  if (focusActive === active) return;
  focusActive = active;
  listeners.forEach((listener) => listener());
}

export function subscribeFirstThenDemoFocus(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getFirstThenDemoFocusActive() {
  return focusActive;
}
