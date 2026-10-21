import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Playthrough } from "@/types/app";
import {
  ACTIVE_PLAYTHROUGH_KEY,
  PLAYTHROUGHS_KEY,
  PREFS_KEY,
} from "@/lib/services/storageKeys";
import {
  removePlaythrough,
  storageService,
  updatePlaythrough,
  updatePrefs,
} from "@/lib/services/store";
import {
  emptyPlaythrough,
  legacyPlaythrough,
  progressedPlaythrough,
} from "./fixtures";

const seed = (entries: unknown[]) =>
  localStorage.setItem(PLAYTHROUGHS_KEY, JSON.stringify(entries));
const stored = (): Playthrough[] =>
  JSON.parse(localStorage.getItem(PLAYTHROUGHS_KEY) ?? "[]");

describe("store behavior", () => {
  beforeEach(() => localStorage.clear());

  describe("updatePlaythrough", () => {
    it("writes nothing when the recipe changes nothing", () => {
      seed([progressedPlaythrough()]);
      const before = localStorage.getItem(PLAYTHROUGHS_KEY);

      const result = updatePlaythrough("1735689600000", (playthrough) => ({
        ...playthrough,
      }));

      expect(result.status).toBe("unchanged");
      expect(localStorage.getItem(PLAYTHROUGHS_KEY)).toBe(before);
    });

    it("does not add default sections to an older save", () => {
      const legacy = legacyPlaythrough();
      seed([legacy]);

      updatePlaythrough(legacy.id, (playthrough) => ({
        ...playthrough,
        skillLevels: { ...playthrough.skillLevels, fishing: 3 },
      }));

      const [saved] = stored();
      expect(Object.keys(saved).sort()).toEqual(Object.keys(legacy).sort());
      expect(saved).not.toHaveProperty("cassettes");
    });

    it("leaves every other entry byte for byte, including entries it cannot show", () => {
      const target = progressedPlaythrough();
      const other = emptyPlaythrough("1750000000000", "Other");
      seed([null, other, target, "garbage"]);

      updatePlaythrough(target.id, (playthrough) => ({
        ...playthrough,
        name: "Renamed",
      }));

      const entries = JSON.parse(
        localStorage.getItem(PLAYTHROUGHS_KEY) ?? "[]",
      );
      expect(entries[0]).toBeNull();
      expect(entries[1]).toEqual(other);
      expect(entries[3]).toBe("garbage");
      expect(entries[2].name).toBe("Renamed");
    });

    it("keeps a change made by another tab since the page loaded", () => {
      const first = progressedPlaythrough();
      const second = emptyPlaythrough("1750000000000", "Second");
      seed([first, second]);
      storageService.load();

      seed([first, { ...second, name: "Renamed in another tab" }]);
      updatePlaythrough(first.id, (playthrough) => ({
        ...playthrough,
        skillLevels: { ...playthrough.skillLevels, mining: 1 },
      }));

      expect(stored()[1].name).toBe("Renamed in another tab");
    });

    it("reports a failed write and keeps the saved data", () => {
      const original = progressedPlaythrough();
      seed([original]);
      const before = localStorage.getItem(PLAYTHROUGHS_KEY);
      const failingWrite = vi
        .spyOn(localStorage, "setItem")
        .mockImplementation(() => {
          throw new Error("quota");
        });
      const hiddenLog = vi.spyOn(console, "error").mockImplementation(() => {});

      const result = updatePlaythrough(original.id, (playthrough) => ({
        ...playthrough,
        name: "New name",
      }));

      failingWrite.mockRestore();
      hiddenLog.mockRestore();
      expect(result.status).toBe("failed");
      expect(localStorage.getItem(PLAYTHROUGHS_KEY)).toBe(before);
    });

    it("hands back the playthrough as it was, so an edit can be undone", () => {
      const original = progressedPlaythrough();
      seed([original]);

      const result = updatePlaythrough(original.id, (playthrough) => ({
        ...playthrough,
        name: "Changed",
      }));

      expect(result).toEqual({ status: "saved", previous: original });
    });
  });

  describe("removePlaythrough", () => {
    it("makes the most recently updated playthrough active when the active one is deleted", () => {
      const older = {
        ...emptyPlaythrough("1", "Older"),
        lastUpdated: "2025-01-01T00:00:00.000Z",
      };
      const newer = {
        ...emptyPlaythrough("2", "Newer"),
        lastUpdated: "2025-09-01T00:00:00.000Z",
      };
      const active = emptyPlaythrough("3", "Active");
      seed([older, newer, active]);
      localStorage.setItem(ACTIVE_PLAYTHROUGH_KEY, "3");

      removePlaythrough("3");

      expect(localStorage.getItem(ACTIVE_PLAYTHROUGH_KEY)).toBe("2");
    });

    it("keeps the active playthrough when another one is deleted", () => {
      seed([emptyPlaythrough("1", "One"), emptyPlaythrough("2", "Two")]);
      localStorage.setItem(ACTIVE_PLAYTHROUGH_KEY, "1");

      removePlaythrough("2");

      expect(localStorage.getItem(ACTIVE_PLAYTHROUGH_KEY)).toBe("1");
    });

    it("clears the active playthrough when the last one is deleted", () => {
      seed([emptyPlaythrough("1", "One")]);
      localStorage.setItem(ACTIVE_PLAYTHROUGH_KEY, "1");

      removePlaythrough("1");

      expect(localStorage.getItem(ACTIVE_PLAYTHROUGH_KEY)).toBeNull();
    });
  });

  describe("storageService.load", () => {
    it("returns the same object until a saved value changes", () => {
      seed([progressedPlaythrough()]);

      const first = storageService.load();

      expect(storageService.load()).toBe(first);

      localStorage.setItem(ACTIVE_PLAYTHROUGH_KEY, "1735689600000");
      expect(storageService.load()).not.toBe(first);
    });

    it("fills the sections an older save lacks, for reading only", () => {
      const legacy = legacyPlaythrough();
      seed([legacy]);

      const [loaded] = storageService.load().playthroughs;

      expect(loaded.cassettes).toEqual({});
      expect(stored()[0]).not.toHaveProperty("cassettes");
    });

    it("falls back to the most recently updated playthrough when the active id is stale", () => {
      const older = {
        ...emptyPlaythrough("1", "Older"),
        lastUpdated: "2025-01-01T00:00:00.000Z",
      };
      const newer = {
        ...emptyPlaythrough("2", "Newer"),
        lastUpdated: "2025-09-01T00:00:00.000Z",
      };
      seed([older, newer]);
      localStorage.setItem(ACTIVE_PLAYTHROUGH_KEY, "deleted-long-ago");

      expect(storageService.load().activePlaythroughId).toBe("2");
    });

    it("reads defaults when the new preference key does not exist", () => {
      const data = storageService.load();

      expect(data.prefs).toEqual({ commerceLevel: 0, viewMode: "grid" });
      expect(data.defaultSort).toBe("lastUpdated");
    });
  });

  describe("updatePrefs", () => {
    it("keeps preference fields it does not know about", () => {
      localStorage.setItem(
        PREFS_KEY,
        JSON.stringify({ commerceLevel: 5, futurePref: "x" }),
      );

      updatePrefs({ commerceLevel: 10 });

      expect(JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}")).toEqual({
        commerceLevel: 10,
        futurePref: "x",
      });
    });

    it("reads an unknown view mode as the default", () => {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ viewMode: "cards" }));

      expect(storageService.load().prefs.viewMode).toBe("grid");
    });

    it("keeps a saved view mode", () => {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ viewMode: "list" }));

      expect(storageService.load().prefs.viewMode).toBe("list");
    });

    it("reads an invalid commerce level as the default", () => {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ commerceLevel: 7 }));

      expect(storageService.load().prefs.commerceLevel).toBe(0);
    });
  });
});
