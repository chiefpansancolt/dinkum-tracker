import type { Playthrough, PlaythroughUpdateData } from "@/types/app";
import { exportBackupJson, parseBackup } from "@/lib/services/backup";
import {
  readStoredPlaythroughs,
  removePlaythrough,
  replaceAllPlaythroughs,
  restorePlaythrough,
  updatePlaythrough,
} from "@/lib/services/store";
import { describeStorageContract } from "./contract";

const REPLACED_SECTIONS = new Set(["calendar"]);

const applySections = (
  playthrough: Playthrough,
  updates: PlaythroughUpdateData,
): Playthrough =>
  Object.entries(updates).reduce(
    (current, [section, value]) => ({
      ...current,
      [section]: REPLACED_SECTIONS.has(section)
        ? value
        : {
            ...(current[section as keyof Playthrough] as object),
            ...(value as object),
          },
    }),
    playthrough,
  );

describeStorageContract("new store", () => ({
  readAll: readStoredPlaythroughs,
  save: (playthrough) => {
    restorePlaythrough(playthrough);
  },
  update: (id, updates) =>
    updatePlaythrough(id, (playthrough) => applySections(playthrough, updates))
      .status !== "missing",
  remove: (id) => {
    removePlaythrough(id);
  },
  exportJson: async () => exportBackupJson(),
  importText: async (text) => {
    const playthroughs = parseBackup(text);
    return playthroughs !== null && replaceAllPlaythroughs(playthroughs);
  },
}));
