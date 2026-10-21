import {
  type Building,
  buildings,
  DEED_TYPES,
  type DeedType,
  type License,
  LICENSE_TYPES,
  licenses,
  type Milestone,
  milestoneCategories,
  milestones,
  skills,
} from "dinkum-data";
import type { Playthrough } from "@/types/app";
import { anyObtained, type LevelFlags, noneObtained } from "./levels";

type CollectedFilter = "all" | "collected" | "not_collected";

export const ALL = "All";

export const allBuildings: Building[] = buildings().get();
export const allLicenses: License[] = licenses().get();
export const allMilestones: Milestone[] = milestones().get();

const isCollectable = (building: Building) =>
  building.deedType === "Collectable";

export const collectableBuildings = allBuildings.filter(isCollectable);

export const deedTypeOptions: readonly DeedType[] = DEED_TYPES;

export const buildingNpcOptions = [
  ...new Set(
    allBuildings
      .map((building) => building.npc)
      .filter((npc) => npc.trim() !== ""),
  ),
].sort();

/**
 * Buildings installed. Only a Collectable building can be installed, so the count never passes the
 * number of Collectable buildings.
 */
export const installedCount = (flags: Record<string, boolean> | undefined) =>
  collectableBuildings.filter((building) => flags?.[building.id] === true)
    .length;

export interface BuildingFilters {
  deedType: string;
  npc: string;
  collected: CollectedFilter;
  query: string;
}

export const emptyBuildingFilters: BuildingFilters = {
  deedType: ALL,
  npc: ALL,
  collected: "all",
  query: "",
};

export const filterBuildings = (
  flags: Record<string, boolean>,
  filters: BuildingFilters,
): Building[] => {
  let query = buildings(allBuildings);
  if (filters.deedType !== ALL)
    query = query.byDeedType(filters.deedType as DeedType);
  if (filters.npc !== ALL) query = query.byNPC(filters.npc);

  let found = query.get();
  if (filters.collected === "collected")
    found = found.filter((item) => flags[item.id] === true);
  if (filters.collected === "not_collected")
    found = found.filter((item) => !flags[item.id]);
  if (filters.query) found = buildings(found).search(filters.query);
  return found;
};

export const licenseCategoryOptions: readonly string[] = LICENSE_TYPES;

export interface LevelledFilters {
  category: string;
  collected: CollectedFilter;
  query: string;
}

export const emptyLevelledFilters: LevelledFilters = {
  category: ALL,
  collected: "all",
  query: "",
};

const byCollected = <Item extends { id: string; levels: { level: number }[] }>(
  items: Item[],
  flags: LevelFlags,
  collected: CollectedFilter,
) => {
  if (collected === "collected")
    return items.filter((item) => anyObtained(flags, item));
  if (collected === "not_collected")
    return items.filter((item) => noneObtained(flags, item));
  return items;
};

/** A category matches when the id of the license contains its word, as in the old page. */
export const filterLicenses = (
  flags: LevelFlags,
  filters: LevelledFilters,
): License[] => {
  let found = [...allLicenses];
  if (filters.category !== ALL) {
    const word = filters.category.toLowerCase();
    found = found.filter((license) => license.id.includes(word));
  }
  found = byCollected(found, flags, filters.collected);
  return filters.query ? licenses(found).search(filters.query) : found;
};

export const milestoneCategoryList = milestoneCategories().get();

const matchesText = (milestone: Milestone, query: string) => {
  const text = query.trim().toLowerCase();
  return (
    milestone.name.toLowerCase().includes(text) ||
    milestone.description.toLowerCase().includes(text)
  );
};

/**
 * A category matches when the id of the milestone contains the id of the category. The search
 * reads the name and the description, as the search field says.
 */
export const filterMilestones = (
  flags: LevelFlags,
  filters: LevelledFilters,
): Milestone[] => {
  let found = [...allMilestones];
  if (filters.category !== ALL) {
    const word = filters.category.toLowerCase();
    found = found.filter((milestone) => milestone.id.includes(word));
  }
  found = byCollected(found, flags, filters.collected);
  return filters.query
    ? found.filter((milestone) => matchesText(milestone, filters.query))
    : found;
};

export interface LetterGroup {
  letter: string;
  milestones: Milestone[];
}

export const groupByLetter = (found: Milestone[]): LetterGroup[] => {
  const groups = new Map<string, Milestone[]>();
  found.forEach((milestone) => {
    const letter = milestone.name.charAt(0).toUpperCase();
    groups.set(letter, [...(groups.get(letter) ?? []), milestone]);
  });

  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => ({ letter, milestones: items }));
};

export interface SkillEntry {
  id: string;
  name: string;
  img: string;
  description: string;
  level: number;
}

export const skillEntries = (
  levels: Record<string, number> | undefined,
): SkillEntry[] =>
  skills()
    .get()
    .map(({ id, name, img, description }) => ({
      id,
      name,
      img,
      description,
      level: levels?.[id] || 0,
    }));

export interface SkillStats {
  totalLevels: number;
  skillCount: number;
  highest: SkillEntry;
  atLevelZero: number;
}

export const skillStats = (entries: SkillEntry[]): SkillStats => ({
  totalLevels: entries.reduce((sum, entry) => sum + entry.level, 0),
  skillCount: entries.length,
  highest: entries.reduce(
    (best, entry) => (entry.level > best.level ? entry : best),
    entries[0],
  ),
  atLevelZero: entries.filter((entry) => entry.level === 0).length,
});

export const changeSkillLevel = (
  playthrough: Playthrough,
  id: string,
  delta: number,
): Playthrough => {
  const current = playthrough.skillLevels[id] || 0;
  const next = Math.max(0, current + delta);

  return next === current
    ? playthrough
    : {
        ...playthrough,
        skillLevels: { ...playthrough.skillLevels, [id]: next },
      };
};
