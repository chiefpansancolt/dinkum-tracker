import type { Playthrough } from "@/types/app";

const SKILL_IDS = [
  "bug_catching",
  "farming",
  "fishing",
  "foraging",
  "hunting",
  "mining",
] as const;

export const createPlaythrough = (name: string): Playthrough => {
  const now = new Date().toISOString();

  return {
    id: Date.now().toString(),
    name,
    createdAt: now,
    lastUpdated: now,
    collections: { fish: [], bugs: [], critters: [] },
    donations: { fish: [], bugs: [], critters: [] },
    milestones: {},
    licenses: {},
    buildings: {},
    skillLevels: Object.fromEntries(SKILL_IDS.map((id) => [id, 0])),
    calendar: { currentDay: 1, currentSeason: "Summer" },
    relationships: {},
    cookingRecipes: {},
    craftingRecipes: {},
    signWritingRecipes: {},
    books: {},
    tools: {},
    weapons: {},
    equipment: {},
    vehicles: {},
    clothing: {},
    furniture: {},
    decorations: {},
    cassettes: {},
  };
};

/**
 * Fills the sections that an older save may lack, so pages can read every section without a
 * guard. The result is for reading and for recipes. The store never writes a section that a recipe
 * left unchanged, so a default added here does not reach the saved data by itself.
 */
export const withDefaults = (stored: Playthrough): Playthrough => {
  const defaults = createPlaythrough(stored.name);

  return {
    ...defaults,
    ...stored,
    collections: { ...defaults.collections, ...stored.collections },
    donations: { ...defaults.donations, ...stored.donations },
  };
};

const GAME_SEASONS = ["Spring", "Summer", "Autumn", "Winter"] as const;
export type GameSeason = (typeof GAME_SEASONS)[number];

/** The season of the game date. A save with an unknown season reads as Summer, as the old card did. */
export const seasonOf = (playthrough: Playthrough): GameSeason =>
  GAME_SEASONS.find(
    (season) => season === playthrough.calendar.currentSeason,
  ) ?? "Summer";
