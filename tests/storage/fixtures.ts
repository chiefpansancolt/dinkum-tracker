import type { Playthrough } from "@/types/app";
import { createEmptyPlaythrough } from "@/lib/localStorage";

const CREATED_AT = "2025-01-10T09:00:00.000Z";
const UPDATED_AT = "2025-06-01T18:30:00.000Z";

export const emptyPlaythrough = (id: string, name: string): Playthrough => ({
  ...createEmptyPlaythrough(name),
  id,
  createdAt: CREATED_AT,
  lastUpdated: UPDATED_AT,
});

export const progressedPlaythrough = (): Playthrough => ({
  ...emptyPlaythrough("1735689600000", "Main island"),
  collections: {
    fish: ["anchovy"],
    bugs: ["bee"],
    critters: ["bay_bug"],
  },
  donations: {
    fish: ["anchovy"],
    bugs: [],
    critters: [],
  },
  milestones: { alpha_hunter_level_1: true, alpha_hunter_level_2: false },
  licenses: { mining_licence_level_1: true },
  buildings: { airport: true },
  skillLevels: {
    bug_catching: 3,
    farming: 12,
    fishing: 7,
    foraging: 0,
    hunting: 1,
    mining: 20,
  },
  calendar: { currentDay: 28, currentSeason: "Winter" },
  relationships: { fletch: 4.75 },
  cookingRecipes: { apple_jam: true },
  craftingRecipes: { advanced_cooking_table: true },
  signWritingRecipes: { blue_sign: false },
  books: { adventurers_journal: true },
  tools: { animal_brush: true },
  weapons: { advanced_sling_shot: true },
  equipment: { adm: false },
  vehicles: { bat_glider: true },
  clothing: { adventure_hood: true },
  furniture: { airship_souvenir: true },
  decorations: { arch_fence: true },
  cassettes: { ambient_cassette: true },
});

/** An older save written before several sections existed. */
export const legacyPlaythrough = (): Playthrough => {
  const {
    cassettes: _cassettes,
    signWritingRecipes: _signWritingRecipes,
    decorations: _decorations,
    ...rest
  } = emptyPlaythrough("1700000000000", "Old save");
  return rest as Playthrough;
};

/** A save that carries a field this app does not know about. */
export const playthroughWithUnknownFields = (): Playthrough =>
  ({
    ...emptyPlaythrough("1740000000000", "Future save"),
    futureField: { nested: [1, 2, 3], flag: true },
  }) as Playthrough;

export const allFixtures = (): Playthrough[] => [
  progressedPlaythrough(),
  legacyPlaythrough(),
  playthroughWithUnknownFields(),
  emptyPlaythrough("1750000000000", "Blank"),
];
