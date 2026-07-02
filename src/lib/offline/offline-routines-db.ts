import { isValidRoutine } from "@/lib/routines/validate-routine";
import type { Routine } from "@/lib/types/routine";

const DB_NAME = "pixtolearn-offline";
const DB_VERSION = 1;
const STORE = "snapshots";
const SNAPSHOT_KEY = "merged-routines";

type SnapshotRecord = {
  id: typeof SNAPSHOT_KEY;
  routines: Routine[];
  updatedAt: number;
};

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB open failed"));
  });
}

export async function saveOfflineRoutinesSnapshot(
  routines: readonly Routine[],
): Promise<void> {
  if (typeof window === "undefined" || !("indexedDB" in window)) return;
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readwrite");
    const record: SnapshotRecord = {
      id: SNAPSHOT_KEY,
      routines: routines.filter(isValidRoutine),
      updatedAt: Date.now(),
    };
    tx.objectStore(STORE).put(record);
    await new Promise<void>((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error ?? new Error("IndexedDB write failed"));
    });
  } finally {
    db.close();
  }
}

export async function loadOfflineRoutinesSnapshot(): Promise<Routine[]> {
  if (typeof window === "undefined" || !("indexedDB" in window)) return [];
  const db = await openDb();
  try {
    const tx = db.transaction(STORE, "readonly");
    const request = tx.objectStore(STORE).get(SNAPSHOT_KEY);
    const record = await new Promise<SnapshotRecord | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result as SnapshotRecord | undefined);
      request.onerror = () => reject(request.error ?? new Error("IndexedDB read failed"));
    });
    if (!record?.routines?.length) return [];
    return record.routines.filter(isValidRoutine);
  } catch {
    return [];
  } finally {
    db.close();
  }
}
