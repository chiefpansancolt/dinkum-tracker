import type { Playthrough } from "@/types/app";
import type { NavItemId } from "@/data/nav";
import { isCollected } from "./collect";
import { GEAR_TABS, gearItems } from "./gear";
import { obtainedCount } from "./levels";
import { meter, pediaStats } from "./overview";
import {
  allLicenses,
  allMilestones,
  collectableBuildings,
  installedCount,
} from "./progress";
import { RECIPE_TABS, recipeItems } from "./recipes";
import { WARDROBE_TABS, wardrobeItems } from "./wardrobe";

const levelTotal = (items: { levels: unknown[] }[]) =>
  items.reduce((sum, item) => sum + item.levels.length, 0);

const LICENSE_LEVELS = levelTotal(allLicenses);
const MILESTONE_LEVELS = levelTotal(allMilestones);

/** The progress shown beside a sidebar link. A page without a count has no entry. */
export const navCounts = (
  playthrough: Playthrough,
): Partial<Record<NavItemId, string>> => ({
  pedia: `${pediaStats(playthrough).overall.percent}%`,
  buildings: `${installedCount(playthrough.buildings)}/${collectableBuildings.length}`,
  licenses: `${obtainedCount(playthrough.licenses)}/${LICENSE_LEVELS}`,
  milestones: `${obtainedCount(playthrough.milestones)}/${MILESTONE_LEVELS}`,
  ...collectCounts(playthrough),
});

const SECTION_OF_RECIPE_TAB = {
  cooking: "cookingRecipes",
  crafting: "craftingRecipes",
  signWriting: "signWritingRecipes",
} as const;

const percentOf = (
  groups: {
    items: { id: string }[];
    flags: Record<string, boolean> | undefined;
  }[],
) => {
  const done = groups.reduce(
    (sum, { items, flags }) =>
      sum + items.filter((item) => isCollected(flags, item.id)).length,
    0,
  );
  const total = groups.reduce((sum, { items }) => sum + items.length, 0);
  return `${meter(done, total).percent}%`;
};

/** The share of recipes unlocked, gear collected and wardrobe items collected. */
export const collectCounts = (playthrough: Playthrough) => ({
  recipes: percentOf(
    RECIPE_TABS.map((tab) => ({
      items: recipeItems[tab],
      flags: playthrough[SECTION_OF_RECIPE_TAB[tab]],
    })),
  ),
  gear: percentOf(
    GEAR_TABS.map((tab) => ({
      items: gearItems[tab],
      flags: playthrough[tab],
    })),
  ),
  wardrobe: percentOf(
    WARDROBE_TABS.map((tab) => ({
      items: wardrobeItems[tab],
      flags: playthrough[tab],
    })),
  ),
});
