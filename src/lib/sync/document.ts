import type { Playthrough } from "@/types/app";
import { BACKUP_VERSION } from "@/service/backup";
import {
  readStoredPlaythroughs,
  replaceAllPlaythroughs,
} from "@/service/store";

/** The data file is the export file, unchanged. */
export interface SyncDocument {
  playthroughs: Playthrough[];
  version: string;
  exportDate: string;
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isSyncDocument = (data: unknown): data is SyncDocument =>
  isRecord(data) &&
  Array.isArray(data.playthroughs) &&
  data.playthroughs.every(
    (entry) =>
      isRecord(entry) &&
      typeof entry.id === "string" &&
      typeof entry.name === "string",
  ) &&
  typeof data.version === "string" &&
  typeof data.exportDate === "string";

const EPOCH = new Date(0).toISOString();

const newestUpdate = (playthroughs: Playthrough[]) =>
  playthroughs.reduce(
    (newest, playthrough) =>
      (Date.parse(playthrough.lastUpdated) || 0) > (Date.parse(newest) || 0)
        ? playthrough.lastUpdated
        : newest,
    EPOCH,
  );

/**
 * The export date is the date of the newest change, so unchanged data gives the same document and
 * a sync with no change writes nothing.
 */
export const buildDocument = (playthroughs: Playthrough[]): SyncDocument => ({
  playthroughs,
  version: BACKUP_VERSION,
  exportDate: newestUpdate(playthroughs),
});

export const readLocalDocument = (): SyncDocument =>
  buildDocument(readStoredPlaythroughs());

/**
 * The active playthrough, the sort and the preferences are not part of the document, so they stay
 * as they are.
 */
export const applyDocument = (document: SyncDocument): boolean => {
  const stored = readStoredPlaythroughs();
  if (JSON.stringify(stored) === JSON.stringify(document.playthroughs))
    return false;
  return replaceAllPlaythroughs(document.playthroughs);
};

export const hasPlaythroughs = (document: SyncDocument) =>
  document.playthroughs.length > 0;
