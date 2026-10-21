import { beforeEach, describe, expect, it } from "vitest";
import type { Playthrough, PlaythroughUpdateData } from "@/types/app";
import {
  allFixtures,
  playthroughWithUnknownFields,
  progressedPlaythrough,
} from "./fixtures";

export const PLAYTHROUGHS_KEY = "dinkum-tracker-playthroughs";
export const ACTIVE_KEY = "dinkum-tracker-active-playthrough";
export const EXPORT_VERSION = "1.0.0";

export interface StorageAdapter {
  readAll(): Playthrough[];
  save(playthrough: Playthrough): void;
  update(id: string, updates: PlaythroughUpdateData): boolean;
  remove(id: string): void;
  exportJson(): Promise<string>;
  importText(text: string): Promise<boolean>;
}

const seed = (playthroughs: Playthrough[]) =>
  localStorage.setItem(PLAYTHROUGHS_KEY, JSON.stringify(playthroughs));

const storedRaw = () => localStorage.getItem(PLAYTHROUGHS_KEY);

const withoutLastUpdated = (playthrough: Playthrough) => {
  const { lastUpdated: _lastUpdated, ...rest } = playthrough;
  return rest;
};

const asFile = (text: string) => new File([text], "backup.json");

/**
 * Behavior every storage implementation must keep. The old app passes this suite, so a
 * passing run means the implementation reads and writes saves the way the old app does.
 */
export function describeStorageContract(
  name: string,
  createAdapter: () => StorageAdapter,
) {
  describe(`storage contract: ${name}`, () => {
    let storage: StorageAdapter;

    beforeEach(() => {
      localStorage.clear();
      storage = createAdapter();
    });

    it("reads every fixture exactly as stored", () => {
      const fixtures = allFixtures();
      seed(fixtures);

      expect(storage.readAll()).toEqual(fixtures);
    });

    it("returns an empty list when nothing is stored", () => {
      expect(storage.readAll()).toEqual([]);
    });

    it("returns an empty list when the stored value is not valid JSON", () => {
      localStorage.setItem(PLAYTHROUGHS_KEY, "{not json");

      expect(storage.readAll()).toEqual([]);
    });

    it("changes only the updated field and lastUpdated", () => {
      const original = progressedPlaythrough();
      seed([original]);

      expect(storage.update(original.id, { skillLevels: { fishing: 8 } })).toBe(
        true,
      );

      const [saved] = storage.readAll();
      expect(saved.skillLevels).toEqual({
        ...original.skillLevels,
        fishing: 8,
      });
      expect(saved.lastUpdated).not.toBe(original.lastUpdated);
      expect({ ...withoutLastUpdated(saved), skillLevels: null }).toEqual({
        ...withoutLastUpdated(original),
        skillLevels: null,
      });
    });

    it("keeps unknown fields through an update", () => {
      const original = playthroughWithUnknownFields();
      seed([original]);

      storage.update(original.id, {
        calendar: { currentDay: 5, currentSeason: "Spring" },
      });

      const [saved] = storage.readAll() as (Playthrough & {
        futureField?: unknown;
      })[];
      expect(saved.futureField).toEqual({ nested: [1, 2, 3], flag: true });
    });

    it("keeps unknown fields through a save of a loaded playthrough", () => {
      const original = playthroughWithUnknownFields();
      seed([original]);

      storage.save(storage.readAll()[0]);

      const [saved] = storage.readAll() as (Playthrough & {
        futureField?: unknown;
      })[];
      expect(saved.futureField).toEqual({ nested: [1, 2, 3], flag: true });
    });

    it("leaves every field but lastUpdated unchanged on an empty update", () => {
      const originals = allFixtures();
      seed(originals);

      storage.update(originals[0].id, {});

      const saved = storage.readAll();
      expect(saved.map(withoutLastUpdated)).toEqual(
        originals.map(withoutLastUpdated),
      );
    });

    it("keeps quarter step hearts and level keys as stored", () => {
      const original = progressedPlaythrough();
      seed([original]);

      storage.update(original.id, { relationships: { fletch: 5 } });

      const [saved] = storage.readAll();
      expect(saved.relationships).toEqual({ fletch: 5 });
      expect(saved.milestones).toEqual(original.milestones);
      expect(saved.licenses).toEqual(original.licenses);
    });

    it("returns false when updating a playthrough that does not exist", () => {
      seed(allFixtures());

      expect(storage.update("missing", { skillLevels: { farming: 1 } })).toBe(
        false,
      );
    });

    it("removes only the deleted playthrough and leaves the rest untouched", () => {
      const fixtures = allFixtures();
      seed(fixtures);

      storage.remove(fixtures[1].id);

      expect(storage.readAll()).toEqual(
        fixtures.filter((playthrough) => playthrough.id !== fixtures[1].id),
      );
    });

    it("does not touch the active playthrough key when saving", () => {
      const original = progressedPlaythrough();
      seed([original]);
      localStorage.setItem(ACTIVE_KEY, original.id);

      storage.update(original.id, { skillLevels: { mining: 1 } });

      expect(localStorage.getItem(ACTIVE_KEY)).toBe(original.id);
    });

    it("exports the fixed backup shape", async () => {
      const fixtures = allFixtures();
      seed(fixtures);

      const exported = JSON.parse(await storage.exportJson());

      expect(Object.keys(exported).sort()).toEqual([
        "exportDate",
        "playthroughs",
        "version",
      ]);
      expect(exported.version).toBe(EXPORT_VERSION);
      expect(Number.isNaN(Date.parse(exported.exportDate))).toBe(false);
      expect(exported.playthroughs).toEqual(fixtures);
    });

    it("restores every playthrough from its own export", async () => {
      const fixtures = allFixtures();
      seed(fixtures);
      const exported = await storage.exportJson();
      localStorage.clear();

      expect(await storage.importText(exported)).toBe(true);

      expect(storage.readAll()).toEqual(fixtures);
    });

    it("imports a file that has extra top-level keys", async () => {
      const fixtures = allFixtures();
      const file = JSON.stringify({
        playthroughs: fixtures,
        version: EXPORT_VERSION,
        exportDate: new Date().toISOString(),
        syncRevision: 7,
      });

      expect(await storage.importText(file)).toBe(true);

      expect(storage.readAll()).toEqual(fixtures);
    });

    it.each([
      ["not JSON", "{oops"],
      [
        "no version",
        JSON.stringify({ playthroughs: [], exportDate: "2025-01-01" }),
      ],
      [
        "playthroughs is not a list",
        JSON.stringify({
          playthroughs: {},
          version: EXPORT_VERSION,
          exportDate: "2025-01-01",
        }),
      ],
    ])(
      "rejects an import that is %s and keeps the current data",
      async (_label, text) => {
        const fixtures = allFixtures();
        seed(fixtures);
        const before = storedRaw();

        expect(await storage.importText(text)).toBe(false);

        expect(storedRaw()).toBe(before);
      },
    );
  });
}

export { asFile };
