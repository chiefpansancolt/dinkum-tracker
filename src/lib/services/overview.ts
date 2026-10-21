import {
  books,
  bugs,
  buildings,
  cassettes,
  clothing,
  cookingRecipes,
  craftingRecipes,
  critters,
  decorations,
  equipment,
  fish,
  furniture,
  licenses,
  milestones,
  npcs,
  signWritingRecipes,
  skills,
  tools,
  vehicles,
  weapons,
} from "dinkum-data";
import type { Playthrough } from "@/types/app";
import { levelKey } from "./levels";

/**
 * The figures of the Overview cards. Each card keeps the arithmetic of the old dashboard widget it
 * replaces. The headline is new: it counts every category against a fixed total.
 */

export interface Meter {
  count: number;
  total: number;
  percent: number;
}

export const meter = (count: number, total: number): Meter => ({
  count,
  total,
  percent: Math.round((count / total) * 100) || 0,
});

const countTrue = (flags: Record<string, boolean> | undefined) =>
  Object.values(flags ?? {}).filter(Boolean).length;

export const PERMIT_POINTS_PER_DONATION = 100;

const allLicenses = licenses().get();
const allMilestones = milestones().get();
const allBuildings = buildings().get();
const collectableBuildings = allBuildings.filter(
  (building) => building.deedType === "Collectable",
);
const allNpcs = npcs().get();
const allSkills = skills().get();

export interface PermitPoints {
  amount: number;
  total: number;
  percent: number;
}

const permitPoints = (amount: number, total: number): PermitPoints => ({
  amount,
  total,
  percent: total > 0 ? Math.round((amount / total) * 100) : 0,
});

interface PediaGroup {
  collected: Meter;
  donated: Meter;
}

export interface PediaStats {
  overall: Meter;
  donations: Meter;
  fish: PediaGroup;
  bugs: PediaGroup;
  critters: PediaGroup;
  permitPoints: PermitPoints;
}

export const pediaStats = (playthrough: Playthrough): PediaStats => {
  const group = (
    key: "fish" | "bugs" | "critters",
    total: number,
  ): PediaGroup => ({
    collected: meter(playthrough.collections?.[key]?.length ?? 0, total),
    donated: meter(playthrough.donations?.[key]?.length ?? 0, total),
  });
  const fishGroup = group("fish", fish().count());
  const bugsGroup = group("bugs", bugs().count());
  const crittersGroup = group("critters", critters().count());
  const groups = [fishGroup, bugsGroup, crittersGroup];

  const total = groups.reduce((sum, item) => sum + item.collected.total, 0);
  const collected = groups.reduce((sum, item) => sum + item.collected.count, 0);
  const donated = groups.reduce((sum, item) => sum + item.donated.count, 0);

  return {
    overall: meter(collected, total),
    donations: meter(donated, total),
    fish: fishGroup,
    bugs: bugsGroup,
    critters: crittersGroup,
    permitPoints: permitPoints(
      donated * PERMIT_POINTS_PER_DONATION,
      total * PERMIT_POINTS_PER_DONATION,
    ),
  };
};

export interface LevelledStats {
  overall: Meter;
  levels: Meter;
  permitPoints: PermitPoints;
}

interface Levelled {
  id: string;
  levels: { level: number }[];
}

const levelledStats = (
  items: Levelled[],
  flags: Record<string, boolean> | undefined,
  pointsOf: (item: Levelled, level: number) => number,
): LevelledStats => {
  const done = flags ?? {};
  const totalLevels = items.reduce((sum, item) => sum + item.levels.length, 0);
  const completeItems = items.filter((item) =>
    item.levels.every((entry) => done[levelKey(item.id, entry.level)] === true),
  ).length;

  let totalPoints = 0;
  let donePoints = 0;
  items.forEach((item) =>
    item.levels.forEach((entry) => {
      const points = pointsOf(item, entry.level);
      totalPoints += points;
      if (done[levelKey(item.id, entry.level)]) donePoints += points;
    }),
  );

  return {
    overall: meter(completeItems, items.length),
    levels: meter(countTrue(done), totalLevels),
    permitPoints: permitPoints(donePoints, totalPoints),
  };
};

export const licenseStats = (playthrough: Playthrough): LevelledStats =>
  levelledStats(allLicenses, playthrough.licenses, (item, level) => {
    const license = allLicenses.find((entry) => entry.id === item.id);
    return (
      license?.levels.find((entry) => entry.level === level)?.permitPointCost ??
      0
    );
  });

export const milestoneStats = (playthrough: Playthrough): LevelledStats =>
  levelledStats(allMilestones, playthrough.milestones, (item, level) => {
    const milestone = allMilestones.find((entry) => entry.id === item.id);
    return (
      milestone?.levels.find((entry) => entry.level === level)?.permitPoints ??
      0
    );
  });

export type GearCategory =
  "books" | "tools" | "weapons" | "equipment" | "vehicles" | "cassettes";
export type RecipeCategory = "cooking" | "crafting" | "signWriting";

export interface CategorySet<Category extends string> {
  overall: Meter;
  categories: Record<Category, Meter>;
  mostComplete: Category;
  leastComplete: Category;
}

const categorySet = <Category extends string>(
  categories: Record<Category, Meter>,
): CategorySet<Category> => {
  const keys = Object.keys(categories) as Category[];
  const count = keys.reduce((sum, key) => sum + categories[key].count, 0);
  const total = keys.reduce((sum, key) => sum + categories[key].total, 0);

  return {
    overall: meter(count, total),
    categories,
    mostComplete: keys.reduce(
      (best, key) =>
        categories[key].percent > categories[best].percent ? key : best,
      keys[0],
    ),
    leastComplete: keys.reduce(
      (worst, key) =>
        categories[key].percent < categories[worst].percent ? key : worst,
      keys[0],
    ),
  };
};

export const gearStats = (
  playthrough: Playthrough,
): CategorySet<GearCategory> =>
  categorySet<GearCategory>({
    books: meter(countTrue(playthrough.books), books().count()),
    tools: meter(countTrue(playthrough.tools), tools().count()),
    weapons: meter(countTrue(playthrough.weapons), weapons().count()),
    equipment: meter(countTrue(playthrough.equipment), equipment().count()),
    vehicles: meter(countTrue(playthrough.vehicles), vehicles().count()),
    cassettes: meter(countTrue(playthrough.cassettes), cassettes().count()),
  });

export const recipeStats = (
  playthrough: Playthrough,
): CategorySet<RecipeCategory> =>
  categorySet<RecipeCategory>({
    cooking: meter(
      countTrue(playthrough.cookingRecipes),
      cookingRecipes().count(),
    ),
    crafting: meter(
      countTrue(playthrough.craftingRecipes),
      craftingRecipes().count(),
    ),
    signWriting: meter(
      countTrue(playthrough.signWritingRecipes),
      signWritingRecipes().count(),
    ),
  });

export interface BuildingStats {
  overall: Meter;
  houseUpgrades: number;
  shops: number;
  townBuildings: number;
  utilityBuildings: number;
  mostExpensive: { id: string; name: string; img: string; deedPrice: number }[];
}

const SHOP_PATTERN = /barn|lab|salon|greenhouse|threadspace|tuckerbox/i;
const TOWN_PATTERN = /hall|museum|bank|band/i;
const UTILITY_PATTERN = /mine|tower|pad|fountain|airport|bulletin/i;

const MOST_EXPENSIVE_COUNT = 5;

const mostExpensiveBuildings = [...collectableBuildings]
  .sort((a, b) => b.deedPrice - a.deedPrice)
  .slice(0, MOST_EXPENSIVE_COUNT)
  .map(({ id, name, img, deedPrice }) => ({ id, name, img, deedPrice }));

export const buildingStats = (playthrough: Playthrough): BuildingStats => {
  const installed = playthrough.buildings ?? {};
  const countWhere = (matches: (id: string) => boolean) =>
    collectableBuildings.filter(
      (building) => matches(building.id) && installed[building.id],
    ).length;

  return {
    overall: meter(countTrue(installed), allBuildings.length),
    houseUpgrades: countWhere((id) => id.includes("house_upgrade")),
    shops: countWhere((id) => id.includes("shop") || SHOP_PATTERN.test(id)),
    townBuildings: countWhere((id) => TOWN_PATTERN.test(id)),
    utilityBuildings: countWhere((id) => UTILITY_PATTERN.test(id)),
    mostExpensive: mostExpensiveBuildings,
  };
};

export interface NpcStats {
  total: number;
  friends: number;
  oneHeart: number;
  maxHearts: number;
  averageHearts: number;
  top: { id: string; name: string; img: string; hearts: number }[];
}

const MAX_HEARTS = 5;
const TOP_RELATIONSHIPS_COUNT = 5;

export const npcStats = (playthrough: Playthrough): NpcStats => {
  const hearts = playthrough.relationships ?? {};
  const ids = Object.keys(hearts);
  const friends = ids.filter((id) => hearts[id] > 0).length;
  const totalHearts = Object.values(hearts).reduce(
    (sum, value) => sum + value,
    0,
  );

  return {
    total: allNpcs.length,
    friends,
    oneHeart: ids.filter((id) => hearts[id] >= 1).length,
    maxHearts: ids.filter((id) => hearts[id] >= MAX_HEARTS).length,
    averageHearts: friends > 0 ? totalHearts / friends : 0,
    top: ids
      .filter((id) => hearts[id] > 0)
      .sort((a, b) => hearts[b] - hearts[a])
      .slice(0, TOP_RELATIONSHIPS_COUNT)
      .map((id) => {
        const npc = allNpcs.find((entry) => entry.id === id);
        return {
          id,
          name: npc?.name ?? id,
          img: npc?.img ?? "",
          hearts: hearts[id],
        };
      }),
  };
};

export interface SkillRow {
  id: string;
  name: string;
  img: string;
  level: number;
}

export const skillRows = (playthrough: Playthrough): SkillRow[] | null => {
  const levels = playthrough.skillLevels ?? {};
  if (Object.keys(levels).length === 0) return null;

  return allSkills.map(({ id, name, img }) => ({
    id,
    name,
    img,
    level: levels[id] || 0,
  }));
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

export interface GameInfo {
  day: number;
  season: string;
  daysSinceCreation: number;
  lastUpdated: string;
  milestonesCompleted: number;
}

export const gameInfo = (
  playthrough: Playthrough,
  now: Date = new Date(),
): GameInfo => ({
  day: playthrough.calendar?.currentDay ?? 1,
  season: playthrough.calendar?.currentSeason ?? "Summer",
  daysSinceCreation: playthrough.createdAt
    ? Math.ceil(
        Math.abs(now.getTime() - new Date(playthrough.createdAt).getTime()) /
          MS_PER_DAY,
      )
    : 0,
  lastUpdated: playthrough.lastUpdated,
  milestonesCompleted: countTrue(playthrough.milestones),
});

export type HeadlineGroup = "track" | "progress" | "collect";

export interface Headline {
  overall: Meter;
  groups: Record<HeadlineGroup, Meter>;
  /** The fixed total of every category, for the note under the headline. */
  totals: {
    pedia: number;
    npcs: number;
    milestones: number;
    licenses: number;
    skills: number;
    buildings: number;
    gear: number;
    wardrobe: number;
    recipes: number;
  };
}

/**
 * The share of everything done. The total is fixed, so a category counts from day one and the
 * percent does not jump when a page is opened. Done counts: collected pedia entries, NPCs with at
 * least a quarter heart, finished milestones and licenses, skills above level 0, installed
 * buildings, owned gear, cassettes, clothing, furniture, decorations and unlocked recipes.
 */
export const headline = (playthrough: Playthrough): Headline => {
  const pedia = pediaStats(playthrough).overall;
  const gear = gearStats(playthrough).overall;
  const recipes = recipeStats(playthrough).overall;
  const milestoneOverall = milestoneStats(playthrough).overall;
  const licenseOverall = licenseStats(playthrough).overall;
  const buildingOverall = buildingStats(playthrough).overall;
  const skillsDone = (skillRows(playthrough) ?? []).filter(
    (skill) => skill.level > 0,
  ).length;
  const wardrobe = meter(
    countTrue(playthrough.clothing) +
      countTrue(playthrough.furniture) +
      countTrue(playthrough.decorations),
    clothing().count() + furniture().count() + decorations().count(),
  );
  const friends = meter(npcStats(playthrough).friends, allNpcs.length);
  const skillsMeter = meter(skillsDone, allSkills.length);

  const group = (...parts: Meter[]) =>
    meter(
      parts.reduce((sum, part) => sum + part.count, 0),
      parts.reduce((sum, part) => sum + part.total, 0),
    );

  const track = group(pedia, friends);
  const progress = group(
    milestoneOverall,
    licenseOverall,
    skillsMeter,
    buildingOverall,
  );
  const collect = group(gear, wardrobe, recipes);

  return {
    overall: group(track, progress, collect),
    groups: { track, progress, collect },
    totals: {
      pedia: pedia.total,
      npcs: friends.total,
      milestones: milestoneOverall.total,
      licenses: licenseOverall.total,
      skills: skillsMeter.total,
      buildings: buildingOverall.total,
      gear: gear.total,
      wardrobe: wardrobe.total,
      recipes: recipes.total,
    },
  };
};
