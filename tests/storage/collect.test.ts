import { cookingRecipes, tools } from "dinkum-data";
import { describe, expect, it } from "vitest";
import {
  applyCollectedFilter,
  collectedCount,
  matchesLabel,
  nameSearch,
  normalizeSpelling,
  withFlag,
} from "@/lib/services/collect";
import {
  damageBand,
  gearItems,
  isCraftable,
  matchesPurchaseType,
  matchesRequirement,
  matchesSource,
  needsFranklyn,
  requirementOptions,
  sourceOptions,
  toolLicenseOptions,
} from "@/lib/services/gear";
import {
  allBuffKeys,
  buffName,
  buffUnit,
  cookingLocations,
  filterByBuffs,
  hasBuffs,
  matchesLocation,
  matchesRecipeSource,
  recipeItems,
  sourceOptionsFor,
} from "@/lib/services/recipes";
import {
  categoryProgress,
  clothingSetOptions,
  decorationCategories,
  filterClothing,
  filterDecorations,
  filterFurniture,
  furnitureSetOptions,
  setProgress,
  slotProgress,
  typesForSlot,
  wardrobeItems,
} from "@/lib/services/wardrobe";
import { emptyPlaythrough } from "./fixtures";

const blank = () => emptyPlaythrough("1", "Blank");

describe("collect helpers", () => {
  it("sets one flag in one section and leaves the rest alone", () => {
    const start = blank();
    const next = withFlag(start, "tools", "animal_brush", true);

    expect(next.tools).toEqual({ animal_brush: true });
    expect(next.weapons).toBe(start.weapons);
    expect(withFlag(next, "tools", "animal_brush", false).tools).toEqual({
      animal_brush: false,
    });
  });

  it("counts the flags that are on", () => {
    expect(collectedCount({ a: true, b: false, c: true })).toBe(2);
    expect(collectedCount(undefined)).toBe(0);
  });

  it("filters by the collected state", () => {
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }];
    const flags = { a: true, b: false };

    expect(applyCollectedFilter(items, flags, "all")).toHaveLength(3);
    expect(
      applyCollectedFilter(items, flags, "collected").map((i) => i.id),
    ).toEqual(["a"]);
    expect(
      applyCollectedFilter(items, flags, "not_collected").map((i) => i.id),
    ).toEqual(["b", "c"]);
  });

  it("treats Licence and License as the same word", () => {
    expect(normalizeSpelling("Building Licence Level 1")).toBe(
      "Building License Level 1",
    );
    expect(
      matchesLabel(
        ["Irrigation Licence Level 2"],
        "Irrigation License Level 2",
      ),
    ).toBe(true);
    expect(
      matchesLabel(
        ["Irrigation License Level 2"],
        "Irrigation Licence Level 2",
      ),
    ).toBe(true);
    expect(matchesLabel(["Jimmy's Boat"], "Crafting Table")).toBe(false);
  });

  it("searches names without regard to case", () => {
    const items = [{ name: "Iron Axe" }, { name: "Gold Pocket Watch" }];

    expect(nameSearch(items, "AXE")).toHaveLength(1);
    expect(nameSearch(items, "  ")).toHaveLength(2);
  });
});

describe("gear", () => {
  it("has the item counts of the data package", () => {
    expect(
      Object.fromEntries(
        Object.entries(gearItems).map(([k, v]) => [k, v.length]),
      ),
    ).toEqual({
      books: 9,
      cassettes: 15,
      tools: 89,
      weapons: 32,
      equipment: 62,
      vehicles: 27,
    });
  });

  it("matches a source the way the package filter does", () => {
    const all = gearItems.tools;

    sourceOptions(all).forEach((source) => {
      expect(all.filter((tool) => matchesSource(tool, source)).length).toBe(
        tools(all).bySource(source).count(),
      );
    });
  });

  it("matches a tool license the way the package filter does", () => {
    toolLicenseOptions.forEach((licence) => {
      expect(
        gearItems.tools.filter((tool) => tool.licence === licence).length,
      ).toBe(tools(gearItems.tools).byLicence(licence).count());
    });
  });

  it("marks an item craftable when Crafting Table is one of its sources", () => {
    expect(gearItems.tools.filter(isCraftable)).toHaveLength(15);
    expect(isCraftable({ source: ["Hunter's Crafting Table"] })).toBe(false);
    expect(
      isCraftable({ source: ["Hunter's Crafting Table", "Crafting Table"] }),
    ).toBe(true);
  });

  it("splits damage into high, medium and low with the old cut offs", () => {
    expect(damageBand(20)).toBe("high");
    expect(damageBand(19)).toBe("medium");
    expect(damageBand(10)).toBe("medium");
    expect(damageBand(9)).toBe("low");
    expect(damageBand(0)).toBe("low");
    expect(damageBand(null)).toBeNull();
  });

  it("splits purchase types as the old Tools page did", () => {
    expect(
      matchesPurchaseType({ buyPrice: 5, buyUnits: "Dinks" }, "dinks"),
    ).toBe(true);
    expect(
      matchesPurchaseType({ buyPrice: 5, buyUnits: "Dinks" }, "permit_points"),
    ).toBe(false);
    expect(
      matchesPurchaseType(
        { buyPrice: 5, buyUnits: "Permit Points" },
        "permit_points",
      ),
    ).toBe(true);
    expect(matchesPurchaseType({ buyPrice: 5 }, "purchasable")).toBe(true);
    expect(matchesPurchaseType({}, "purchasable")).toBe(false);
  });

  it("reads Franklyn unlocks from the two counts", () => {
    expect(needsFranklyn({ shinyDiscCount: 5 })).toBe(true);
    expect(needsFranklyn({ berkoniumOreCount: 2 })).toBe(true);
    expect(needsFranklyn({ shinyDiscCount: 0 })).toBe(false);
    expect(needsFranklyn({})).toBe(false);
  });

  it("lists each requirement type once, with one spelling", () => {
    const options = requirementOptions(gearItems.equipment);

    expect(new Set(options).size).toBe(options.length);
    expect(options).toContain("Irrigation License");
    expect(options.some((option) => option.includes("Licence"))).toBe(false);
    const irrigation = gearItems.equipment.filter((item) =>
      matchesRequirement(item, "Irrigation License"),
    );
    expect(irrigation.length).toBeGreaterThan(1);
  });
});

describe("recipes", () => {
  it("has the counts of the data package", () => {
    expect(recipeItems.cooking).toHaveLength(72);
    expect(recipeItems.crafting).toHaveLength(235);
    expect(recipeItems.signWriting).toHaveLength(17);
    expect(cookingLocations).toHaveLength(7);
  });

  it("matches a cooking location exactly", () => {
    cookingLocations.forEach((location) => {
      expect(
        recipeItems.cooking.filter((recipe) =>
          matchesLocation(recipe, location),
        ).length,
      ).toBe(cookingRecipes(recipeItems.cooking).byLocation(location).count());
    });
  });

  it("merges the spelling of sources into one option", () => {
    const options = sourceOptionsFor(recipeItems.crafting);

    expect(options.some((option) => option.includes("Licence"))).toBe(false);
    expect(options).toContain("Building License Level 3");
    const matches = recipeItems.crafting.filter((recipe) =>
      matchesRecipeSource(recipe, "Building License Level 3"),
    );
    expect(matches.length).toBeGreaterThan(0);
  });

  it("lists 16 buffs and names them without the word Level", () => {
    expect(allBuffKeys).toHaveLength(16);
    expect(buffName("speedLevel")).toBe("Speed");
    expect(buffName("healthRegenRate")).toBe("Health Regen Rate");
    expect(buffName("fastHealthTickSpeedLevel")).toBe("Fast Health Tick Speed");
    expect(allBuffKeys).not.toContain("length");
  });

  it("gives the unit of the two regen buffs", () => {
    expect(buffUnit("healthRegenRate")).toBe("/t");
    expect(buffUnit("staminaRegenRate")).toBe("/s");
    expect(buffUnit("speedLevel")).toBe("");
  });

  it("filters by buffs with any and all", () => {
    const speed = allBuffKeys.find((key) => key.startsWith("speed"))!;
    const mining = allBuffKeys.find((key) => key.startsWith("mining"))!;
    const withBuffs = recipeItems.cooking.filter(hasBuffs);

    const any = filterByBuffs(recipeItems.cooking, [speed, mining], false);
    const all = filterByBuffs(recipeItems.cooking, [speed, mining], true);

    expect(filterByBuffs(recipeItems.cooking, [], false)).toHaveLength(72);
    expect(any.length).toBeGreaterThanOrEqual(all.length);
    expect(all.length).toBeLessThan(any.length);
    expect(any.every((recipe) => withBuffs.includes(recipe))).toBe(true);
  });
});

describe("wardrobe", () => {
  it("has the counts of the data package", () => {
    expect(wardrobeItems.clothing).toHaveLength(532);
    expect(wardrobeItems.furniture).toHaveLength(443);
    expect(wardrobeItems.decorations).toHaveLength(265);
    expect(clothingSetOptions).toHaveLength(46);
    expect(furnitureSetOptions).toHaveLength(18);
    expect(decorationCategories).toHaveLength(16);
  });

  it("lists the types of a slot and none when there is no slot", () => {
    expect(typesForSlot("Head")).toEqual([
      "Hat",
      "Scarf",
      "Bow",
      "Bonnet",
      "Bandana",
      "Hood",
      "Bandage",
    ]);
    expect(typesForSlot("All")).toEqual([]);
  });

  it("filters clothing by slot, type and set", () => {
    const head = filterClothing(wardrobeItems.clothing, {
      slot: "Head",
      type: "All",
      set: "All",
    });
    expect(head).toHaveLength(134);

    const hats = filterClothing(wardrobeItems.clothing, {
      slot: "Head",
      type: "Hat",
      set: "All",
    });
    expect(
      hats.every((item) => item.type === "Hat" && item.slot.includes("Head")),
    ).toBe(true);

    const bySet = filterClothing(wardrobeItems.clothing, {
      slot: "All",
      type: "All",
      set: clothingSetOptions[0],
    });
    expect(bySet.every((item) => item.set === clothingSetOptions[0])).toBe(
      true,
    );
  });

  it("filters furniture by set, source and catalogue", () => {
    const melvins = filterFurniture(wardrobeItems.furniture, {
      set: "All",
      source: "All",
      catalogue: "melvins",
    });
    const others = filterFurniture(wardrobeItems.furniture, {
      set: "All",
      source: "All",
      catalogue: "not_melvins",
    });

    expect(melvins).toHaveLength(282);
    expect(melvins.length + others.length).toBe(443);
  });

  it("filters decorations by category and source", () => {
    const fences = filterDecorations(wardrobeItems.decorations, {
      category: "Fences & Gates",
      source: "All",
    });

    expect(fences.length).toBeGreaterThan(0);
    expect(fences.every((item) => item.category === "Fences & Gates")).toBe(
      true,
    );
  });

  it("counts progress per slot, set and category", () => {
    const flags = { adventure_hood: true };

    expect(slotProgress(flags)[0]).toEqual({
      label: "Head",
      count: 1,
      total: 134,
    });
    expect(
      setProgress({}).reduce((sum, set) => sum + set.total, 0),
    ).toBeLessThanOrEqual(443);
    expect(
      categoryProgress({}).reduce((sum, category) => sum + category.total, 0),
    ).toBe(265);
  });
});

void blank;
