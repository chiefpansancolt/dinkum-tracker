import {
  type FirstSyncChoice,
  MemoryProvider,
  sync,
  type SyncResult,
  type SyncState,
} from "@gamerdexapp/gamerdex-sync";
import { beforeEach, describe, expect, it } from "vitest";
import type { Playthrough } from "@/types/app";
import { exportBackupJson, parseBackup } from "@/lib/services/backup";
import {
  addPlaythrough,
  replaceAllPlaythroughs,
  setActivePlaythroughId,
  storageService,
} from "@/lib/services/store";
import {
  applyDocument,
  buildDocument,
  isSyncDocument,
  readLocalDocument,
  type SyncDocument,
} from "@/lib/sync/document";
import { syncSchema } from "@/lib/sync/schema";
import {
  emptyPlaythrough,
  playthroughWithUnknownFields,
  progressedPlaythrough,
} from "./fixtures";

const APP_ID = "dinkum-tracker";

class Device {
  state: SyncState | null = null;
  constructor(
    readonly id: string,
    public playthroughs: Playthrough[],
  ) {}

  document(): SyncDocument {
    return buildDocument(structuredClone(this.playthroughs));
  }

  async sync(
    cloud: MemoryProvider,
    firstSync?: FirstSyncChoice,
  ): Promise<SyncResult> {
    const result = await sync({
      appId: APP_ID,
      deviceId: this.id,
      deviceName: this.id,
      provider: cloud,
      schema: syncSchema,
      local: this.document(),
      state: this.state,
      firstSync,
      validate: isSyncDocument,
      now: () => "2026-01-02T00:00:00.000Z",
    });
    if (result.status === "synced") {
      // The real app stores both as JSON, so the device never shares objects with its sync state.
      this.playthroughs = structuredClone(
        (result.data as SyncDocument).playthroughs,
      );
      this.state = structuredClone(result.state);
    }
    return result;
  }

  edit(id: string, change: (playthrough: Playthrough) => void) {
    const target = this.playthroughs.find(
      (playthrough) => playthrough.id === id,
    )!;
    change(target);
  }

  get(id: string) {
    return this.playthroughs.find((playthrough) => playthrough.id === id);
  }
}

const synced = async (result: Promise<SyncResult>) => {
  const outcome = await result;
  if (outcome.status !== "synced") throw new Error("expected a finished sync");
  return outcome;
};

const twoDevices = async () => {
  const cloud = new MemoryProvider();
  const a = new Device("a", [
    progressedPlaythrough(),
    emptyPlaythrough("2", "Second"),
  ]);
  await a.sync(cloud);
  const b = new Device("b", []);
  await synced(b.sync(cloud, "keep-cloud"));
  return { cloud, a, b };
};

describe("the data file", () => {
  it("is the export file of the tracker, unchanged", async () => {
    const cloud = new MemoryProvider();
    const a = new Device("a", [progressedPlaythrough()]);
    await a.sync(cloud);

    const file = await cloud.read(`Gamerdex/${APP_ID}/data.json`);
    const data = JSON.parse(file!.content);

    expect(Object.keys(data).sort()).toEqual([
      "exportDate",
      "playthroughs",
      "version",
    ]);
    expect(data.version).toBe("1.0.0");
    expect(parseBackup(file!.content)).toHaveLength(1);
    expect(data.playthroughs[0]).toEqual(progressedPlaythrough());
  });

  it("matches what Export writes for the same saved data", () => {
    localStorage.clear();
    replaceAllPlaythroughs([progressedPlaythrough()]);

    const exported = JSON.parse(exportBackupJson());
    const document = readLocalDocument();

    expect(Object.keys(document).sort()).toEqual(Object.keys(exported).sort());
    expect(document.playthroughs).toEqual(exported.playthroughs);
    expect(document.version).toBe(exported.version);
    expect(Number.isNaN(Date.parse(document.exportDate))).toBe(false);
  });

  it("is refused when it is not an export file", () => {
    expect(
      isSyncDocument({
        playthroughs: [{ id: 1 }],
        version: "1.0.0",
        exportDate: "x",
      }),
    ).toBe(false);
    expect(isSyncDocument({ playthroughs: [], version: "1.0.0" })).toBe(false);
    expect(isSyncDocument(null)).toBe(false);
    expect(isSyncDocument(readLocalDocument())).toBe(true);
  });
});

describe("syncing two devices", () => {
  it("copies the data to a new device that has none", async () => {
    const { a, b } = await twoDevices();

    expect(b.playthroughs).toHaveLength(2);
    expect(b.playthroughs[0]).toEqual(a.playthroughs[0]);
  });

  it("asks before it replaces anything when both sides have data", async () => {
    const cloud = new MemoryProvider();
    await new Device("a", [progressedPlaythrough()]).sync(cloud);

    const result = await new Device("b", [emptyPlaythrough("9", "Other")]).sync(
      cloud,
    );

    expect(result.status).toBe("needs-choice");
  });

  it("keeps what both devices marked", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("1735689600000", (p) => (p.tools.hammer = true));
    b.edit("1735689600000", (p) => (p.weapons.sword = true));

    await a.sync(cloud);
    await b.sync(cloud);
    await a.sync(cloud);

    for (const device of [a, b]) {
      const merged = device.get("1735689600000")!;
      expect(merged.tools).toMatchObject({ animal_brush: true, hammer: true });
      expect(merged.weapons.sword).toBe(true);
    }
  });

  it("carries an unmarked item to the other device", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("1735689600000", (p) => (p.tools.animal_brush = false));

    await a.sync(cloud);
    await b.sync(cloud);

    expect(b.get("1735689600000")!.tools.animal_brush).toBe(false);
  });

  it("carries a removed fish to the other device and keeps a fish added there", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("1735689600000", (p) => (p.collections.fish = []));
    b.edit(
      "1735689600000",
      (p) => (p.collections.bugs = [...p.collections.bugs, "ant"]),
    );

    await a.sync(cloud);
    await b.sync(cloud);

    const merged = b.get("1735689600000")!;
    expect(merged.collections.fish).toEqual([]);
    expect(merged.collections.bugs).toContain("ant");
  });

  it("takes the higher level or heart count when both devices changed it", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("1735689600000", (p) => {
      p.skillLevels.farming = 14;
      p.relationships.fletch = 5;
    });
    b.edit("1735689600000", (p) => {
      p.skillLevels.farming = 20;
      p.relationships.fletch = 3.5;
    });

    await a.sync(cloud);
    const result = await synced(b.sync(cloud));

    const merged = b.get("1735689600000")!;
    expect(merged.skillLevels.farming).toBe(20);
    expect(merged.relationships.fletch).toBe(5);
    expect(result.conflicts).toHaveLength(0);
  });

  it("deletes a playthrough everywhere when one device deletes it", async () => {
    const { cloud, a, b } = await twoDevices();
    a.playthroughs = a.playthroughs.filter((p) => p.id !== "2");

    await a.sync(cloud);
    await b.sync(cloud);

    expect(b.get("2")).toBeUndefined();
    expect(b.playthroughs).toHaveLength(1);
  });

  it("keeps a playthrough that one device deleted and another changed, and reports it", async () => {
    const { cloud, a, b } = await twoDevices();
    a.playthroughs = a.playthroughs.filter((p) => p.id !== "2");
    b.edit("2", (p) => (p.tools.hammer = true));

    await a.sync(cloud);
    const result = await synced(b.sync(cloud));

    expect(b.get("2")!.tools.hammer).toBe(true);
    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0]).toMatchObject({
      kind: "delete-edit",
      path: ["playthroughs", "2"],
    });
  });

  it("reports a conflict when both devices rename a playthrough and takes the cloud name", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("2", (p) => (p.name = "From A"));
    b.edit("2", (p) => (p.name = "From B"));

    await a.sync(cloud);
    const result = await synced(b.sync(cloud));

    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0].path).toEqual(["playthroughs", "2", "name"]);
    expect(b.get("2")!.name).toBe("From A");
  });

  it("keeps fields that this version does not know about", async () => {
    const cloud = new MemoryProvider();
    const a = new Device("a", [playthroughWithUnknownFields()]);
    await a.sync(cloud);
    const b = new Device("b", []);
    await synced(b.sync(cloud, "keep-cloud"));

    expect(
      (b.playthroughs[0] as unknown as Record<string, unknown>).futureField,
    ).toEqual({
      nested: [1, 2, 3],
      flag: true,
    });
  });

  it("does not upload again when nothing changed", async () => {
    const { cloud, a } = await twoDevices();

    const again = await synced(a.sync(cloud));

    expect(again.uploaded).toBe(false);
  });

  it("uploads a change once and the other device sees it", async () => {
    const { cloud, a, b } = await twoDevices();
    a.edit("2", (p) => (p.books.adventurers_journal = true));

    expect((await synced(a.sync(cloud))).uploaded).toBe(true);
    await b.sync(cloud);

    expect(b.get("2")!.books.adventurers_journal).toBe(true);
  });
});

describe("applying the merged data", () => {
  beforeEach(() => localStorage.clear());

  it("writes the merged playthroughs and leaves the active one, sort and prefs alone", () => {
    addPlaythrough(emptyPlaythrough("1", "One"), { activate: true });
    addPlaythrough(emptyPlaythrough("2", "Two"), { activate: false });
    setActivePlaythroughId("2");
    localStorage.setItem("dinkum-tracker-default-sort", "name");
    localStorage.setItem(
      "dinkum-tracker-prefs",
      JSON.stringify({ commerceLevel: 10, viewMode: "list" }),
    );

    const merged = readLocalDocument();
    merged.playthroughs[0].name = "One renamed";

    expect(applyDocument(merged)).toBe(true);
    const data = storageService.load();
    expect(data.playthroughs[0].name).toBe("One renamed");
    expect(data.activePlaythroughId).toBe("2");
    expect(data.defaultSort).toBe("name");
    expect(data.prefs).toEqual({ commerceLevel: 10, viewMode: "list" });
  });

  it("writes nothing when the merged playthroughs equal the saved ones", () => {
    addPlaythrough(emptyPlaythrough("1", "One"), { activate: true });

    expect(applyDocument(readLocalDocument())).toBe(false);
  });

  it("moves the active playthrough to the newest one when a sync deleted it", () => {
    addPlaythrough(emptyPlaythrough("1", "One"), { activate: true });
    addPlaythrough(emptyPlaythrough("2", "Two"), { activate: false });
    setActivePlaythroughId("1");

    const merged = readLocalDocument();
    merged.playthroughs = merged.playthroughs.filter((p) => p.id !== "1");
    applyDocument(merged);

    expect(storageService.load().activePlaythroughId).toBe("2");
  });
});
