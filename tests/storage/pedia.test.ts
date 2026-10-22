import { describe, expect, it } from "vitest";
import {
  commercePrice,
  emptyFilters,
  filterEntries,
  pediaEntries,
  seasonOptions,
  statusOf,
  timeOptions,
  withStatus,
} from "@/lib/services/pedia";
import { emptyPlaythrough, progressedPlaythrough } from "./fixtures";

const base = () => emptyPlaythrough("1", "Blank");

describe("statusOf", () => {
  it("reads missing, caught and donated", () => {
    const playthrough = {
      ...base(),
      collections: { fish: ["a", "b"], bugs: [], critters: [] },
      donations: { fish: ["b"], bugs: [], critters: [] },
    };

    expect(statusOf(playthrough, "fish", "x")).toBe("missing");
    expect(statusOf(playthrough, "fish", "a")).toBe("caught");
    expect(statusOf(playthrough, "fish", "b")).toBe("donated");
  });

  it("reads a donated item as donated even when it is not listed as collected", () => {
    const playthrough = {
      ...base(),
      donations: { fish: ["a"], bugs: [], critters: [] },
    };

    expect(statusOf(playthrough, "fish", "a")).toBe("donated");
  });
});

describe("withStatus", () => {
  it("marks an item caught", () => {
    const next = withStatus(base(), "fish", "a", "caught");

    expect(next.collections.fish).toEqual(["a"]);
    expect(next.donations.fish).toEqual([]);
  });

  it("marks an item donated and caught together", () => {
    const next = withStatus(base(), "bugs", "b", "donated");

    expect(next.collections.bugs).toEqual(["b"]);
    expect(next.donations.bugs).toEqual(["b"]);
  });

  it("keeps the item caught when a donated item goes back to caught", () => {
    const donated = withStatus(base(), "fish", "a", "donated");
    const next = withStatus(donated, "fish", "a", "caught");

    expect(next.collections.fish).toEqual(["a"]);
    expect(next.donations.fish).toEqual([]);
  });

  it("clears both lists when an item goes to missing", () => {
    const donated = withStatus(base(), "fish", "a", "donated");
    const next = withStatus(donated, "fish", "a", "missing");

    expect(next.collections.fish).toEqual([]);
    expect(next.donations.fish).toEqual([]);
  });

  it("adds no duplicates when the same status is set twice", () => {
    const once = withStatus(base(), "fish", "a", "donated");
    const twice = withStatus(once, "fish", "a", "donated");

    expect(twice.collections.fish).toEqual(["a"]);
    expect(twice.donations.fish).toEqual(["a"]);
  });

  it("changes only the tab and item it was asked to change", () => {
    const original = progressedPlaythrough();
    const next = withStatus(original, "critters", "bay_bug", "missing");

    expect(next.collections.fish).toBe(original.collections.fish);
    expect(next.collections.bugs).toBe(original.collections.bugs);
    expect(next.donations.fish).toBe(original.donations.fish);
    expect(next.milestones).toBe(original.milestones);
    expect(next.collections.critters).toEqual([]);
  });
});

describe("commercePrice", () => {
  it.each([
    [4620, 0, 4620],
    [4620, 5, 4851],
    [4620, 10, 5082],
    [4620, 15, 5313],
    [680, 5, 714],
    [95, 15, 109],
  ] as const)("prices %i at +%i%% as %i", (price, level, expected) => {
    expect(commercePrice(price, level)).toBe(expected);
  });
});

describe("filterEntries", () => {
  it("returns every entry without filters", () => {
    expect(filterEntries("fish", base(), emptyFilters)).toHaveLength(
      pediaEntries.fish.length,
    );
    expect(filterEntries("critters", base(), emptyFilters)).toHaveLength(
      pediaEntries.critters.length,
    );
  });

  it("filters by biome, rarity, season and time", () => {
    const ocean = filterEntries("fish", base(), {
      ...emptyFilters,
      biome: "Ocean",
    });
    expect(ocean.length).toBeGreaterThan(0);
    expect(ocean.every((entry) => entry.biome.includes("Ocean"))).toBe(true);

    const rare = filterEntries("fish", base(), {
      ...emptyFilters,
      rarity: "Rare",
    });
    expect(rare.every((entry) => entry.rarity === "Rare")).toBe(true);

    const winter = filterEntries("bugs", base(), {
      ...emptyFilters,
      season: "Winter",
    });
    expect(winter.every((entry) => entry.seasons.includes("Winter"))).toBe(
      true,
    );

    const night = filterEntries("fish", base(), {
      ...emptyFilters,
      time: "Night",
    });
    expect(night.every((entry) => entry.timeFound.includes("Night"))).toBe(
      true,
    );
  });

  it("filters by collected and donated", () => {
    const playthrough = {
      ...base(),
      collections: { fish: ["anchovy", "other"], bugs: [], critters: [] },
      donations: { fish: ["anchovy"], bugs: [], critters: [] },
    };
    const total = pediaEntries.fish.length;

    expect(
      filterEntries("fish", playthrough, {
        ...emptyFilters,
        collected: "collected",
      }),
    ).toHaveLength(1);
    expect(
      filterEntries("fish", playthrough, {
        ...emptyFilters,
        collected: "not_collected",
      }),
    ).toHaveLength(total - 1);
    expect(
      filterEntries("fish", playthrough, {
        ...emptyFilters,
        donated: "donated",
      }),
    ).toHaveLength(1);
    expect(
      filterEntries("fish", playthrough, {
        ...emptyFilters,
        donated: "not_donated",
      }),
    ).toHaveLength(total - 1);
  });

  it("searches by name", () => {
    const found = filterEntries("fish", base(), {
      ...emptyFilters,
      query: "anchovy",
    });

    expect(found.map((entry) => entry.id)).toContain("anchovy");
    expect(found.length).toBeLessThan(pediaEntries.fish.length);
  });

  it("combines filters", () => {
    const found = filterEntries("fish", base(), {
      ...emptyFilters,
      biome: "Ocean",
      rarity: "Common",
    });

    expect(
      found.every(
        (entry) => entry.biome.includes("Ocean") && entry.rarity === "Common",
      ),
    ).toBe(true);
  });
});

describe("filter options", () => {
  it("leaves the all value out of the season and time lists", () => {
    expect(seasonOptions()).toEqual(["Spring", "Summer", "Autumn", "Winter"]);
    expect(timeOptions()).toEqual(["Morning", "Day", "Evening", "Night"]);
  });
});
