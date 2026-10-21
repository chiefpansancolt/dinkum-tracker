import { describe, expect, it } from "vitest";
import {
  buildResourceIndex,
  CATEGORIES,
  emptyBreakdownFilters,
  filterResources,
  isCommon,
  mostUsed,
  resourceIndex,
  toggled,
  typeCounts,
} from "@/lib/services/breakdown";
import {
  allWeightItems,
  clampWeight,
  formatWeight,
  priceFor,
  stepWeight,
} from "@/lib/services/weight";
import { ResourceType } from "@/data/constants/components";

describe("items breakdown", () => {
  it("indexes 296 resources", () => {
    expect(resourceIndex).toHaveLength(296);
    expect(buildResourceIndex()).toHaveLength(296);
  });

  it("counts each resource under one type, as the board lists them", () => {
    const counts = Object.fromEntries(
      typeCounts(resourceIndex).map((e) => [e.type, e.count]),
    );

    expect(counts).toMatchObject({
      Fish: 41,
      Critter: 8,
      Bug: 1,
      Relic: 15,
      Crop: 16,
      Foragable: 36,
      "Animal Product": 30,
      Paint: 9,
      Mineral: 13,
      Craftable: 106,
      Trophy: 6,
      Seed: 6,
      Flower: 1,
      Resource: 8,
    });
    expect(Object.values(counts).reduce((a, b) => a + b, 0)).toBe(296);
  });

  it("uses only the nine known categories", () => {
    const used = new Set(
      resourceIndex.flatMap((resource) => resource.categories),
    );

    expect(
      [...used].every((category) =>
        (CATEGORIES as readonly string[]).includes(category),
      ),
    ).toBe(true);
  });

  it("finds Nails as the most used resource", () => {
    expect(mostUsed(resourceIndex).name).toBe("Nails");
    expect(mostUsed(resourceIndex).usedIn).toHaveLength(89);
  });

  it("counts common resources as used in 3 or more items", () => {
    expect(resourceIndex.filter(isCommon)).toHaveLength(81);
  });

  it("combines the filters with and, and any match inside a group", () => {
    const run = (filters: Partial<typeof emptyBreakdownFilters>) =>
      filterResources(resourceIndex, { ...emptyBreakdownFilters, ...filters });

    expect(run({})).toHaveLength(296);
    expect(run({ query: "NAIL" }).map((r) => r.name)).toContain("Nails");
    expect(run({ categories: ["Buildings", "Tools"] }).length).toBeGreaterThan(
      0,
    );
    expect(run({ types: [ResourceType.MINERAL] })).toHaveLength(13);
    expect(
      run({ types: [ResourceType.MINERAL], commonOnly: true }).every(isCommon),
    ).toBe(true);
    expect(run({ query: "zzzz" })).toHaveLength(0);
  });

  it("sorts by name or by usage, most used first", () => {
    const byName = filterResources(resourceIndex, emptyBreakdownFilters);
    const byUse = filterResources(resourceIndex, {
      ...emptyBreakdownFilters,
      sortBy: "usageCount",
    });

    expect(byName[0].name.localeCompare(byName[1].name)).toBeLessThanOrEqual(0);
    expect(byUse[0].usedIn.length).toBeGreaterThanOrEqual(
      byUse[1].usedIn.length,
    );
  });

  it("does not change the index when it filters", () => {
    const first = resourceIndex[0].name;
    filterResources(resourceIndex, {
      ...emptyBreakdownFilters,
      sortBy: "usageCount",
    });
    expect(resourceIndex[0].name).toBe(first);
  });

  it("toggles a value in a list", () => {
    expect(toggled(["a"], "b")).toEqual(["a", "b"]);
    expect(toggled(["a", "b"], "a")).toEqual(["b"]);
  });
});

describe("weight calculator", () => {
  const thunderEgg = allWeightItems.find((item) => item.id === "thunder_egg")!;

  it("has the 13 items of the board", () => {
    expect(allWeightItems).toHaveLength(13);
    expect(thunderEgg).toMatchObject({
      pricePerKg: 33000,
      minWeight: 1,
      maxWeight: 3,
    });
  });

  it("rounds the price to a whole dink", () => {
    expect(priceFor(thunderEgg, 1.84)).toBe(60720);
    expect(priceFor(thunderEgg, 1)).toBe(33000);
    expect(priceFor(thunderEgg, 3)).toBe(99000);
  });

  it("keeps the weight inside the range of the item", () => {
    expect(clampWeight(thunderEgg, 0.2)).toBe(1);
    expect(clampWeight(thunderEgg, 9)).toBe(3);
    expect(clampWeight(thunderEgg, 2)).toBe(2);
  });

  it("steps by one hundredth without drift", () => {
    let weight = 1;
    for (let i = 0; i < 30; i++) weight = stepWeight(thunderEgg, weight, 1);

    expect(weight).toBe(1.3);
    expect(stepWeight(thunderEgg, 1, -1)).toBe(1);
    expect(stepWeight(thunderEgg, 3, 1)).toBe(3);
    expect(formatWeight(1.3)).toBe("1.30");
  });
});
