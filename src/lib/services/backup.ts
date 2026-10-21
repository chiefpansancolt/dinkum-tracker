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
