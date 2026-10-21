import { GEAR_TABS, gearItems } from "./gear";
import { allNpcs } from "./npcs";
import { pediaEntries } from "./pedia";
import { allBuildings, allLicenses, allMilestones } from "./progress";
import { RECIPE_TABS, recipeItems } from "./recipes";
import { wardrobeItems } from "./wardrobe";

const sum = (lengths: number[]) =>
  lengths.reduce((total, length) => total + length, 0);

/** The numbers on the landing page. They come from the data, so they stay true when the data grows. */
export const collectionCounts = {
  pedia: sum(Object.values(pediaEntries).map((entries) => entries.length)),
  npcs: allNpcs.length,
  licenses: allLicenses.length,
  milestones: allMilestones.length,
  buildings: allBuildings.length,
  gear: sum(GEAR_TABS.map((tab) => gearItems[tab].length)),
  recipes: sum(RECIPE_TABS.map((tab) => recipeItems[tab].length)),
  clothing: wardrobeItems.clothing.length,
};

export type CollectionKey = keyof typeof collectionCounts;
export const COLLECTION_KEYS = Object.keys(collectionCounts) as CollectionKey[];
