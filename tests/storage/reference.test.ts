import { animals, flowers, seeds } from "dinkum-data";
import { describe, expect, it } from "vitest";
import {
  ALL,
  allAnimals,
  allCrops,
  allFlowers,
  allResources,
  allSeeds,
  allTrees,
  animalSearch,
  animalSorts,
  buffPairs,
  DAILY_CATEGORIES,
  dailyCategoryCount,
  filterAnimals,
  filterCrops,
  filterDaily,
  filterFlowers,
  filterResources,
  filterSeeds,
  filterTrees,
  flowerLocationOptions,
  habitatOptions,
  inputsLabel,
  isCommonResource,
  largestDailyCategory,
  plantCounts,
  resourceKindCount,
  resourceSorts,
  seedCategoryOptions,
  seedSorts,
  sorted,
  tabCounts,
  treeLocationOptions,
  usedInCount,
} from "@/lib/services/reference";
import { ResourceType } from "@/data/constants/components";

describe("reference counts", () => {
  it("has the counts of the board", () => {
    expect(tabCounts).toEqual({
      animals: 45,
      resources: 146,
      plants: 117,
      food: 89,
      daily: 120,
    });
    expect(plantCounts).toEqual({
      seeds: 36,
      crops: 17,
      flowers: 46,
      trees: 18,
    });
    expect(DAILY_CATEGORIES).toHaveLength(14);
    expect(largestDailyCategory).toBe("farmingMilestones");
    expect(dailyCategoryCount("farmingMilestones")).toBe(28);
  });

  it("counts the six kinds of resource", () => {
    expect(resourceKindCount(ResourceType.RELIC)).toBe(15);
    expect(resourceKindCount(ResourceType.FORAGABLE)).toBe(42);
    expect(resourceKindCount(ResourceType.ANIMALPRODUCT)).toBe(36);
    expect(resourceKindCount(ResourceType.MINERAL)).toBe(15);
    expect(resourceKindCount(ResourceType.CRAFTABLE)).toBe(32);
    expect(resourceKindCount(ResourceType.TROPHY)).toBe(6);
  });
});

describe("animals", () => {
  const none = { temperament: ALL, type: ALL, habitat: ALL };

  it("filters like the package for temperament and type", () => {
    expect(
      filterAnimals(allAnimals, { ...none, temperament: "Passive" }),
    ).toHaveLength(animals().byTemperament("Passive").count());
    expect(
      filterAnimals(allAnimals, { ...none, type: "Farm Animal" }),
    ).toHaveLength(animals().byType("Farm Animal").count());
  });

  it("filters habitat by the habitat list of each animal", () => {
    habitatOptions.forEach((habitat) => {
      const found = filterAnimals(allAnimals, { ...none, habitat });
      expect(found.length).toBeGreaterThan(0);
      expect(found.every((animal) => animal.habitat?.includes(habitat))).toBe(
        true,
      );
    });
  });

  it("sorts without changing the list and treats a missing number as zero", () => {
    const first = allAnimals[0].id;
    const high = sorted(allAnimals, animalSorts, "healthDesc");

    expect(allAnimals[0].id).toBe(first);
    expect((high[0].health ?? 0) >= (high[1].health ?? 0)).toBe(true);
    expect(
      sorted(allAnimals, animalSorts, "name")[0].name.localeCompare(
        allAnimals[1].name,
      ),
    ).toBeLessThanOrEqual(0);
  });

  it("searches by name and keeps all animals for an empty search", () => {
    expect(animalSearch(allAnimals, "")).toHaveLength(45);
    expect(animalSearch(allAnimals, "croco").length).toBeGreaterThan(0);
  });
});

describe("resources", () => {
  const base = { kinds: [], source: ALL, commonOnly: false };

  it("filters by kind, source and common use", () => {
    expect(filterResources(allResources, base)).toHaveLength(146);
    expect(
      filterResources(allResources, { ...base, kinds: [ResourceType.TROPHY] }),
    ).toHaveLength(6);

    const common = filterResources(allResources, { ...base, commonOnly: true });
    expect(common.length).toBeGreaterThan(0);
    expect(common.length).toBeLessThan(146);
    expect(common.every(isCommonResource)).toBe(true);
    expect(common.every((resource) => usedInCount(resource) >= 3)).toBe(true);
  });

  it("sorts by price in both directions", () => {
    const high = sorted(allResources, resourceSorts, "priceDesc");
    const low = sorted(allResources, resourceSorts, "priceAsc");

    expect(high[0].baseSellPrice).toBeGreaterThanOrEqual(high[1].baseSellPrice);
    expect(low[0].baseSellPrice).toBeLessThanOrEqual(low[1].baseSellPrice);
  });
});

describe("plants", () => {
  it("filters seeds like the package", () => {
    expect(filterSeeds(allSeeds, "Summer", ALL)).toHaveLength(
      seeds().bySeason("Summer").count(),
    );
    expect(
      filterSeeds(allSeeds, ALL, "Tree Seed").every(
        (seed) => seed.category === "Tree Seed",
      ),
    ).toBe(true);
    expect(seedCategoryOptions).toHaveLength(5);
  });

  it("sorts seeds by growth period", () => {
    const fast = sorted(allSeeds, seedSorts, "growthPeriodAsc");
    const slow = sorted(allSeeds, seedSorts, "growthPeriodDesc");

    expect(fast[0].growthPeriod ?? 0).toBeLessThanOrEqual(
      fast[1].growthPeriod ?? 0,
    );
    expect(slow[0].growthPeriod ?? 0).toBeGreaterThanOrEqual(
      slow[1].growthPeriod ?? 0,
    );
  });

  it("filters crops, flowers and trees by season and location", () => {
    expect(filterCrops(allCrops, ALL)).toHaveLength(17);
    expect(filterCrops(allCrops, "Winter").length).toBeGreaterThan(0);
    expect(flowerLocationOptions).toHaveLength(13);
    expect(filterFlowers(allFlowers, flowerLocationOptions[0])).toHaveLength(
      flowers()
        .byLocation(flowerLocationOptions[0] as never)
        .count(),
    );
    expect(treeLocationOptions).toHaveLength(9);
    expect(
      filterTrees(allTrees, treeLocationOptions[0]).length,
    ).toBeGreaterThan(0);
  });
});

describe("daily milestones", () => {
  it("groups by category in order and hides empty groups", () => {
    expect(filterDaily(ALL, "")).toHaveLength(14);
    expect(filterDaily("fishingMilestones", "")).toHaveLength(1);

    const sell = filterDaily(ALL, "sell");
    expect(sell.length).toBeLessThan(14);
    expect(sell.every((group) => group.items.length > 0)).toBe(true);
    expect(filterDaily(ALL, "zzzz")).toHaveLength(0);
  });
});

describe("buff pairs", () => {
  it("lists the buffs of an item and leaves out a buff that is off", () => {
    expect(buffPairs(undefined)).toEqual([]);
    expect(buffPairs({ length: 1, healthMax: 5, sleepless: false })).toEqual([
      ["length", 1],
      ["healthMax", 5],
    ]);
  });

  it("writes a conversion as counts and names", () => {
    expect(
      inputsLabel([
        { count: 5, name: "Copper Ore" },
        { count: 1, name: "Shiny Stone" },
      ]),
    ).toBe("5 Copper Ore, 1 Shiny Stone");
  });
});
