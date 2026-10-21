import { describe, expect, it } from "vitest";
import { applyImport, planImport } from "@/lib/services/backup";
import { emptyPlaythrough } from "./fixtures";

const at = (id: string, name: string, lastUpdated: string) => ({
  ...emptyPlaythrough(id, name),
  lastUpdated,
});

const device = [
  at("a", "Both, file newer", "2025-01-01T00:00:00.000Z"),
  at("b", "Both, device newer", "2025-09-01T00:00:00.000Z"),
  at("c", "Both, same time", "2025-05-01T00:00:00.000Z"),
  at("d", "Device only", "2025-02-01T00:00:00.000Z"),
];

const file = [
  {
    ...at("a", "Both, file newer", "2025-06-01T00:00:00.000Z"),
    futureField: "kept",
  },
  at("b", "Both, device newer", "2025-02-01T00:00:00.000Z"),
  at("c", "Both, same time", "2025-05-01T00:00:00.000Z"),
  at("e", "File only", "2025-03-01T00:00:00.000Z"),
];

const resultsOf = (rows: ReturnType<typeof planImport>) =>
  Object.fromEntries(rows.map((row) => [row.id, row.result]));

describe("planImport", () => {
  it("merges by the newest update and keeps device only playthroughs", () => {
    expect(resultsOf(planImport(device, file, "merge"))).toEqual({
      a: "updated",
      b: "kept",
      c: "kept",
      d: "kept",
      e: "added",
    });
  });

  it("replaces everything and removes what the file lacks", () => {
    expect(resultsOf(planImport(device, file, "replace"))).toEqual({
      a: "replaced",
      b: "replaced",
      c: "replaced",
      d: "removed",
      e: "replaced",
    });
  });
});

describe("applyImport", () => {
  it("merges in the device order, takes newer file copies and appends new ones", () => {
    const merged = applyImport(device, file, "merge");

    expect(merged.map((playthrough) => playthrough.id)).toEqual([
      "a",
      "b",
      "c",
      "d",
      "e",
    ]);
    expect(merged[0]).toBe(file[0]);
    expect(merged[1]).toBe(device[1]);
    expect(merged[2]).toBe(device[2]);
  });

  it("keeps fields it does not know about", () => {
    const [first] = applyImport(
      device,
      file,
      "merge",
    ) as ((typeof file)[number] & {
      futureField?: string;
    })[];

    expect(first.futureField).toBe("kept");
  });

  it("returns the file playthroughs for a replace", () => {
    expect(applyImport(device, file, "replace")).toBe(file);
  });
});
