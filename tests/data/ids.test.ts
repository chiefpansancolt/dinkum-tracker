import * as data from "dinkum-data";
import { describe, expect, it } from "vitest";
import manifest from "./ids.manifest.json";

type Manifest = Record<string, Record<string, number>>;

const resolveIds = (collection: string): Map<string, number> => {
  const read = (
    data as unknown as Record<string, () => Record<string, unknown>>
  )[collection];
  const items = Object.values(read()).flat() as {
    id: string;
    levels?: unknown[];
  }[];
  return new Map(items.map((item) => [item.id, item.levels?.length ?? 0]));
};

describe("dinkum-data ids that saves refer to", () => {
  describe.each(Object.entries(manifest as Manifest))(
    "%s",
    (collection, expected) => {
      const current = resolveIds(collection);

      it("still has every id from the manifest", () => {
        const missing = Object.keys(expected).filter((id) => !current.has(id));

        expect(missing).toEqual([]);
      });

      it("still has at least as many levels per id", () => {
        const shrunk = Object.entries(expected).filter(
          ([id, levels]) => (current.get(id) ?? 0) < levels,
        );

        expect(shrunk).toEqual([]);
      });
    },
  );
});
