import { buildings, clothing, fish, licenses, npcs } from "dinkum-data";
import { describe, expect, it } from "vitest";
import {
  buildingStats,
  gameInfo,
  gearStats,
  headline,
  licenseStats,
  npcStats,
  pediaStats,
  skillRows,
} from "@/lib/services/overview";
import { emptyPlaythrough, progressedPlaythrough } from "./fixtures";

const blank = () => emptyPlaythrough("1", "Blank");
const trueFlags = (ids: string[]) =>
  Object.fromEntries(ids.map((id) => [id, true]));

describe("headline", () => {
  it("uses the fixed totals of every category", () => {
    const { totals, groups, overall } = headline(blank());

    expect(totals).toEqual({
      pedia: 120,
      npcs: 23,
      milestones: 99,
      licenses: 25,
      skills: 6,
      buildings: 32,
      gear: 234,
      wardrobe: 1240,
      recipes: 324,
    });
    expect(groups.track.total).toBe(143);
    expect(groups.progress.total).toBe(162);
    expect(groups.collect.total).toBe(1798);
    expect(overall.total).toBe(2103);
  });

  it("is zero for an empty playthrough", () => {
    expect(headline(blank()).overall).toEqual({
      count: 0,
      total: 2103,
      percent: 0,
    });
  });

  it("adds up what is done in each group", () => {
    const playthrough = {
      ...blank(),
      collections: { fish: ["a", "b", "c"], bugs: ["d"], critters: [] },
      relationships: { fletch: 0.25, clover: 0 },
      skillLevels: { farming: 3, fishing: 0, mining: 9 },
      buildings: trueFlags(["airport", "bank"]),
      clothing: trueFlags(["adventure_hood", "x"]),
    };
    const { groups, overall } = headline(playthrough);

    expect(groups.track.count).toBe(4 + 1);
    expect(groups.progress.count).toBe(2 + 2);
    expect(groups.collect.count).toBe(2);
    expect(overall.count).toBe(5 + 4 + 2);
  });

  it("rounds the percent of the whole", () => {
    const playthrough = {
      ...blank(),
      clothing: trueFlags(["a", "b", "c", "d", "e", "f"]),
    };

    expect(headline(playthrough).overall.percent).toBe(0);
  });
});

describe("pediaStats", () => {
  it("counts permit points as 100 for each donated item", () => {
    const playthrough = {
      ...blank(),
      collections: { fish: ["a", "b"], bugs: [], critters: [] },
      donations: { fish: ["a"], bugs: ["x", "y"], critters: [] },
    };
    const stats = pediaStats(playthrough);

    expect(stats.overall.count).toBe(2);
    expect(stats.donations.count).toBe(3);
    expect(stats.permitPoints).toEqual({
      amount: 300,
      total: 12000,
      percent: 3,
    });
    expect(stats.fish.collected.total).toBe(fish().count());
  });
});

describe("licenseStats", () => {
  it("counts finished licenses, true level flags and permit points spent", () => {
    const [first] = licenses().get();
    const flags = Object.fromEntries(
      first.levels.map((entry) => [`${first.id}_level_${entry.level}`, true]),
    );
    const stats = licenseStats({ ...blank(), licenses: flags });

    expect(stats.overall.count).toBe(1);
    expect(stats.levels.count).toBe(first.levels.length);
    expect(stats.permitPoints.amount).toBe(
      first.levels.reduce((sum, entry) => sum + entry.permitPointCost, 0),
    );
  });

  it("does not count a license with a missing level as finished", () => {
    const [first] = licenses().get();
    const stats = licenseStats({
      ...blank(),
      licenses: { [`${first.id}_level_1`]: true },
    });

    expect(first.levels.length).toBeGreaterThan(1);
    expect(stats.overall.count).toBe(0);
    expect(stats.levels.count).toBe(1);
  });
});

describe("gearStats", () => {
  it("picks the first most and least complete category on a tie", () => {
    const stats = gearStats(blank());

    expect(stats.mostComplete).toBe("books");
    expect(stats.leastComplete).toBe("books");
  });

  it("finds the most and least complete categories", () => {
    const playthrough = {
      ...blank(),
      books: trueFlags(["adventurers_journal"]),
      tools: trueFlags(["animal_brush"]),
    };
    const stats = gearStats(playthrough);

    expect(stats.mostComplete).toBe("books");
    expect(stats.leastComplete).toBe("weapons");
    expect(stats.overall.count).toBe(2);
    expect(stats.overall.total).toBe(234);
  });
});

describe("buildingStats", () => {
  it("counts every installed building against all buildings", () => {
    const stats = buildingStats({
      ...blank(),
      buildings: trueFlags(["airport", "bank"]),
    });

    expect(stats.overall).toEqual({
      count: 2,
      total: buildings().count(),
      percent: 6,
    });
    expect(stats.utilityBuildings).toBe(1);
    expect(stats.townBuildings).toBe(1);
  });

  it("lists the five most expensive collectable buildings first", () => {
    const { mostExpensive } = buildingStats(blank());

    expect(mostExpensive).toHaveLength(5);
    expect(mostExpensive[0].id).toBe("airport");
    expect(mostExpensive[0].deedPrice).toBeGreaterThanOrEqual(
      mostExpensive[4].deedPrice,
    );
  });
});

describe("npcStats", () => {
  const [a, b, c, d] = npcs().get();

  it("counts friends, hearts and the average", () => {
    const stats = npcStats({
      ...blank(),
      relationships: { [a.id]: 5, [b.id]: 4.5, [c.id]: 0.25, [d.id]: 0 },
    });

    expect(stats.friends).toBe(3);
    expect(stats.oneHeart).toBe(2);
    expect(stats.maxHearts).toBe(1);
    expect(stats.averageHearts).toBeCloseTo(3.25);
  });

  it("lists the best relationships first and leaves out zero hearts", () => {
    const stats = npcStats({
      ...blank(),
      relationships: { [c.id]: 0.25, [a.id]: 5, [d.id]: 0, [b.id]: 4.5 },
    });

    expect(stats.top.map((row) => row.id)).toEqual([a.id, b.id, c.id]);
    expect(stats.top[0].name).toBe(a.name);
  });

  it("has an average of zero without friends", () => {
    expect(npcStats(blank()).averageHearts).toBe(0);
  });
});

describe("skillRows", () => {
  it("lists the six skills with their level", () => {
    const rows = skillRows({ ...blank(), skillLevels: { farming: 14 } });

    expect(rows).toHaveLength(6);
    expect(rows?.find((row) => row.id === "farming")?.level).toBe(14);
    expect(rows?.find((row) => row.id === "mining")?.level).toBe(0);
  });

  it("has no rows when nothing is recorded", () => {
    expect(skillRows({ ...blank(), skillLevels: {} })).toBeNull();
  });
});

describe("gameInfo", () => {
  it("counts the days since creation upward", () => {
    const now = new Date("2026-10-21T12:00:00.000Z");
    const info = gameInfo(
      { ...progressedPlaythrough(), createdAt: "2026-10-18T06:00:00.000Z" },
      now,
    );

    expect(info.daysSinceCreation).toBe(4);
    expect(info.day).toBe(28);
    expect(info.season).toBe("Winter");
  });

  it("counts finished milestone levels", () => {
    expect(gameInfo(progressedPlaythrough()).milestonesCompleted).toBe(1);
  });

  it("reads clothing as part of the wardrobe total", () => {
    expect(headline(blank()).totals.wardrobe).toBe(
      clothing().count() + 443 + 265,
    );
  });
});
