import { describe, expect, it } from "vitest";
import { levelKey } from "@/lib/services/levels";
import { navCounts } from "@/lib/services/navCounts";
import {
  allBuildings,
  allLicenses,
  allMilestones,
  buildingNpcOptions,
  changeSkillLevel,
  collectableBuildings,
  emptyBuildingFilters,
  emptyLevelledFilters,
  filterBuildings,
  filterLicenses,
  filterMilestones,
  groupByLetter,
  installedCount,
  skillEntries,
  skillStats,
} from "@/lib/services/progress";
import { emptyPlaythrough, progressedPlaythrough } from "./fixtures";

const blank = () => emptyPlaythrough("1", "Blank");

describe("buildings", () => {
  it("lists 32 buildings of which 27 can be installed", () => {
    expect(allBuildings).toHaveLength(32);
    expect(collectableBuildings).toHaveLength(27);
  });

  it("counts only collectable buildings as installed", () => {
    const movable = allBuildings.find(
      (building) => building.deedType === "Movable",
    )!;

    expect(
      installedCount({
        airport: true,
        bank: true,
        [movable.id]: true,
        band_stand: false,
      }),
    ).toBe(2);
    expect(installedCount(undefined)).toBe(0);
  });

  it("filters by deed type, NPC, installed state and name", () => {
    const flags = { airport: true };

    const movable = filterBuildings(flags, {
      ...emptyBuildingFilters,
      deedType: "Movable",
    });
    expect(movable).toHaveLength(4);

    const npc = buildingNpcOptions[0];
    const byNpc = filterBuildings(flags, { ...emptyBuildingFilters, npc });
    expect(byNpc.length).toBeGreaterThan(0);
    expect(byNpc.every((building) => building.npc === npc)).toBe(true);

    expect(
      filterBuildings(flags, {
        ...emptyBuildingFilters,
        collected: "collected",
      }).map((b) => b.id),
    ).toEqual(["airport"]);
    expect(
      filterBuildings(flags, {
        ...emptyBuildingFilters,
        collected: "not_collected",
      }),
    ).toHaveLength(31);

    const found = filterBuildings(flags, {
      ...emptyBuildingFilters,
      query: "airport",
    });
    expect(found.map((building) => building.id)).toContain("airport");
  });

  it("lists every NPC that appears on a building once, sorted", () => {
    expect(buildingNpcOptions).toEqual([...new Set(buildingNpcOptions)].sort());
    expect(buildingNpcOptions).not.toContain("");
  });
});

describe("filterLicenses", () => {
  it("returns every license without filters", () => {
    expect(filterLicenses({}, emptyLevelledFilters)).toHaveLength(
      allLicenses.length,
    );
  });

  it("matches a category on the id, so Mining also finds the deep mining license", () => {
    const found = filterLicenses(
      {},
      { ...emptyLevelledFilters, category: "Mining" },
    );

    expect(found.map((license) => license.id)).toEqual(
      expect.arrayContaining(["mining_licence", "deep_mining_licence"]),
    );
    expect(found.every((license) => license.id.includes("mining"))).toBe(true);
  });

  it("treats a license with any level obtained as collected", () => {
    const flags = { [levelKey("mining_licence", 1)]: true };
    const collected = filterLicenses(flags, {
      ...emptyLevelledFilters,
      collected: "collected",
    });
    const notCollected = filterLicenses(flags, {
      ...emptyLevelledFilters,
      collected: "not_collected",
    });

    expect(collected.map((license) => license.id)).toEqual(["mining_licence"]);
    expect(notCollected).toHaveLength(allLicenses.length - 1);
  });

  it("searches by name", () => {
    const found = filterLicenses(
      {},
      { ...emptyLevelledFilters, query: "fishing" },
    );

    expect(found.map((license) => license.id)).toContain("fishing_licence");
  });
});

describe("filterMilestones and groupByLetter", () => {
  it("matches a category on the id prefix", () => {
    const found = filterMilestones(
      {},
      { ...emptyLevelledFilters, category: "fish" },
    );

    expect(found.length).toBeGreaterThan(0);
    expect(found.every((milestone) => milestone.id.includes("fish"))).toBe(
      true,
    );
  });

  it("searches the name and the description", () => {
    const byDescription = filterMilestones(
      {},
      { ...emptyLevelledFilters, query: "Alpha animal" },
    );

    expect(byDescription.map((milestone) => milestone.id)).toContain(
      "alpha_hunter",
    );
  });

  it("groups by first letter in order and keeps every milestone", () => {
    const groups = groupByLetter(allMilestones);

    expect(groups.map((group) => group.letter)).toEqual(
      [...new Set(groups.map((group) => group.letter))].sort(),
    );
    expect(groups.flatMap((group) => group.milestones)).toHaveLength(
      allMilestones.length,
    );
    expect(
      groups[0].milestones.every((milestone) =>
        milestone.name.startsWith(groups[0].letter),
      ),
    ).toBe(true);
  });
});

describe("skills", () => {
  it("lists the six skills with a level of zero by default", () => {
    const entries = skillEntries({});

    expect(entries).toHaveLength(6);
    expect(
      entries.every((entry) => entry.level === 0 && entry.description !== ""),
    ).toBe(true);
  });

  it("totals the levels and finds the highest skill and the skills at zero", () => {
    const stats = skillStats(
      skillEntries({ farming: 12, fishing: 21, mining: 17 }),
    );

    expect(stats.totalLevels).toBe(50);
    expect(stats.highest.id).toBe("fishing");
    expect(stats.atLevelZero).toBe(3);
    expect(stats.skillCount).toBe(6);
  });

  it("raises a level without an upper limit and never goes below zero", () => {
    const start = { ...blank(), skillLevels: { farming: 99, mining: 0 } };

    expect(changeSkillLevel(start, "farming", 1).skillLevels.farming).toBe(100);
    expect(changeSkillLevel(start, "mining", -1)).toBe(start);
    expect(changeSkillLevel(start, "farming", -1).skillLevels.farming).toBe(98);
  });
});

describe("navCounts", () => {
  it("shows progress beside the pages that have a count", () => {
    const counts = navCounts(progressedPlaythrough());

    expect(counts.pedia).toBe("3%");
    expect(counts.buildings).toBe("1/27");
    expect(counts.licenses).toBe("1/57");
    expect(counts.milestones).toBe("1/394");
    expect(counts.skills).toBeUndefined();
  });

  it("shows the share of recipes, gear and wardrobe items that are done", () => {
    const counts = navCounts(progressedPlaythrough());

    expect(counts.recipes).toBe("1%");
    expect(counts.gear).toBe("2%");
    expect(counts.wardrobe).toBe("0%");
    expect(navCounts(emptyPlaythrough("1", "Blank")).gear).toBe("0%");
  });
});
