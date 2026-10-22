import {
  books,
  bugs,
  buildings,
  cookingRecipes,
  craftingRecipes,
  critters,
  equipment,
  fish,
  licenses,
  milestones,
  signWritingRecipes,
  tools,
  vehicles,
  weapons,
} from "dinkum-data";
import type { Playthrough } from "@/types/app";

/**
 * These figures are the figures of the old playthrough card, unchanged. The overall percent counts
 * clothing and furniture in the numerator and leaves them out of the total, as the old card did.
 */

const countTrue = (flags: Record<string, boolean> | undefined) =>
  Object.values(flags ?? {}).filter(Boolean).length;

const percentOf = (count: number, total: number) =>
  Math.round((count / total) * 100) || 0;

const TOTALS = (() => {
  const fishTotal = fish().get().length;
  const bugsTotal = bugs().get().length;
  const crittersTotal = critters().get().length;
  const licenseLevels = licenses()
    .get()
    .reduce((sum, license) => sum + license.levels.length, 0);
  const milestoneLevels = milestones()
    .get()
    .reduce((sum, milestone) => sum + milestone.levels.length, 0);
  const collectableBuildings = buildings()
    .get()
    .filter((building) => building.deedType === "Collectable").length;
  const recipes =
    cookingRecipes().get().length +
    craftingRecipes().get().length +
    signWritingRecipes().get().length;
  const gear =
    books().get().length +
    tools().get().length +
    weapons().get().length +
    equipment().get().length +
    vehicles().get().length;

  return {
    fish: fishTotal,
    bugs: bugsTotal,
    critters: crittersTotal,
    pedia: fishTotal + bugsTotal + crittersTotal,
    licenseLevels,
    milestoneLevels,
    collectableBuildings,
    trackable:
      fishTotal +
      bugsTotal +
      crittersTotal +
      licenseLevels +
      milestoneLevels +
      collectableBuildings +
      recipes +
      gear,
  };
})();

export interface ProgressRow {
  count: number;
  total: number;
  percent: number;
}

export interface PlaythroughProgress {
  fish: { count: number; total: number };
  bugs: { count: number; total: number };
  critters: { count: number; total: number };
  pedia: ProgressRow;
  licenses: ProgressRow;
  milestones: ProgressRow;
  buildings: ProgressRow;
  overallPercent: number;
}

export const playthroughProgress = (
  playthrough: Playthrough,
): PlaythroughProgress => {
  const fishCount = playthrough.collections?.fish?.length ?? 0;
  const bugsCount = playthrough.collections?.bugs?.length ?? 0;
  const crittersCount = playthrough.collections?.critters?.length ?? 0;
  const pediaCount = fishCount + bugsCount + crittersCount;
  const licensesCount = countTrue(playthrough.licenses);
  const milestonesCount = countTrue(playthrough.milestones);
  const buildingsCount = countTrue(playthrough.buildings);

  const collected =
    pediaCount +
    licensesCount +
    milestonesCount +
    buildingsCount +
    countTrue(playthrough.cookingRecipes) +
    countTrue(playthrough.craftingRecipes) +
    countTrue(playthrough.signWritingRecipes) +
    countTrue(playthrough.books) +
    countTrue(playthrough.tools) +
    countTrue(playthrough.weapons) +
    countTrue(playthrough.equipment) +
    countTrue(playthrough.vehicles) +
    countTrue(playthrough.clothing) +
    countTrue(playthrough.furniture);

  return {
    fish: { count: fishCount, total: TOTALS.fish },
    bugs: { count: bugsCount, total: TOTALS.bugs },
    critters: { count: crittersCount, total: TOTALS.critters },
    pedia: {
      count: pediaCount,
      total: TOTALS.pedia,
      percent: percentOf(pediaCount, TOTALS.pedia),
    },
    licenses: {
      count: licensesCount,
      total: TOTALS.licenseLevels,
      percent: percentOf(licensesCount, TOTALS.licenseLevels),
    },
    milestones: {
      count: milestonesCount,
      total: TOTALS.milestoneLevels,
      percent: percentOf(milestonesCount, TOTALS.milestoneLevels),
    },
    buildings: {
      count: buildingsCount,
      total: TOTALS.collectableBuildings,
      percent: percentOf(buildingsCount, TOTALS.collectableBuildings),
    },
    overallPercent: percentOf(collected, TOTALS.trackable),
  };
};

export type CompletionTone = "danger" | "caution" | "success";

/** Under 30 is red, under 70 is yellow, and the rest is green. */
export const completionTone = (percent: number): CompletionTone => {
  if (percent < 30) return "danger";
  if (percent < 70) return "caution";
  return "success";
};
