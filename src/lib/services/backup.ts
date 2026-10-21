import type { ImportData, Playthrough } from "@/types/app";
import { readStoredPlaythroughs } from "./store";

/** The backup file format is shared with the old app and must not change. */
export const BACKUP_VERSION = "1.0.0";

export const backupFileName = (date = new Date()) =>
  `dinkum-tracker-backup-${date.toISOString().slice(0, 10)}.json`;

export const exportBackupJson = (): string =>
  JSON.stringify({
    playthroughs: readStoredPlaythroughs(),
    version: BACKUP_VERSION,
    exportDate: new Date().toISOString(),
  });

const isBackup = (data: unknown): data is ImportData => {
  if (typeof data !== "object" || data === null) return false;
  const candidate = data as Record<string, unknown>;
  return (
    Array.isArray(candidate.playthroughs) &&
    typeof candidate.version === "string" &&
    typeof candidate.exportDate === "string"
  );
};

/** Returns the playthroughs of a backup file, or null when the text is not a backup. */
export const parseBackup = (text: string): Playthrough[] | null => {
  try {
    const data: unknown = JSON.parse(text);
    return isBackup(data) ? data.playthroughs : null;
  } catch {
    return null;
  }
};

export const downloadBackup = () => {
  const blob = new Blob([exportBackupJson()], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = backupFileName();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export type ImportMode = "merge" | "replace";

export type ImportResult =
  "added" | "updated" | "kept" | "replaced" | "removed";

export interface ImportRow {
  id: string;
  name: string;
  fileUpdated?: string;
  deviceUpdated?: string;
  result: ImportResult;
}

const updatedAt = (playthrough: Playthrough) =>
  Date.parse(playthrough.lastUpdated) || 0;

/** The file copy wins only when it is strictly newer. A tie keeps the copy on the device. */
const fileCopyWins = (fromFile: Playthrough, onDevice: Playthrough) =>
  updatedAt(fromFile) > updatedAt(onDevice);

/** What an import would do to each playthrough, for the preview in the confirm dialog. */
export const planImport = (
  device: Playthrough[],
  file: Playthrough[],
  mode: ImportMode,
): ImportRow[] => {
  const onDevice = new Map(
    device.map((playthrough) => [playthrough.id, playthrough]),
  );

  const rows: ImportRow[] = file.map((playthrough) => {
    const existing = onDevice.get(playthrough.id);
    const row = {
      id: playthrough.id,
      name: playthrough.name,
      fileUpdated: playthrough.lastUpdated,
      deviceUpdated: existing?.lastUpdated,
    };
    if (mode === "replace") return { ...row, result: "replaced" };
    if (!existing) return { ...row, result: "added" };
    return {
      ...row,
      result: fileCopyWins(playthrough, existing) ? "updated" : "kept",
    };
  });

  const fileIds = new Set(file.map((playthrough) => playthrough.id));
  device
    .filter((playthrough) => !fileIds.has(playthrough.id))
    .forEach((playthrough) =>
      rows.push({
        id: playthrough.id,
        name: playthrough.name,
        deviceUpdated: playthrough.lastUpdated,
        result: mode === "replace" ? "removed" : "kept",
      }),
    );
  return rows;
};

/**
 * The playthroughs to save after an import. Merge keeps the order on the device, replaces a
 * playthrough with the file copy when that copy is newer, and appends the new ones. Entries
 * are kept as they are, so fields this app does not know about survive.
 */
export const applyImport = (
  device: Playthrough[],
  file: Playthrough[],
  mode: ImportMode,
): Playthrough[] => {
  if (mode === "replace") return file;

  const fromFile = new Map(
    file.map((playthrough) => [playthrough.id, playthrough]),
  );
  const merged = device.map((playthrough) => {
    const incoming = fromFile.get(playthrough.id);
    return incoming && fileCopyWins(incoming, playthrough)
      ? incoming
      : playthrough;
  });
  const deviceIds = new Set(device.map((playthrough) => playthrough.id));
  return [
    ...merged,
    ...file.filter((playthrough) => !deviceIds.has(playthrough.id)),
  ];
};
