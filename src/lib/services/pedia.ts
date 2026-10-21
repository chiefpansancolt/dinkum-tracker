import {
  type Biome,
  bugs,
  critters,
  fish,
  type RarityLevel,
  type Season,
  SEASONS,
  TIME_PERIODS,
  type TimePeriod,
} from "dinkum-data";
import type { CommerceLevel, Playthrough } from "@/types/app";

export type PediaTab = "fish" | "bugs" | "critters";
export const PEDIA_TABS: readonly PediaTab[] = ["fish", "bugs", "critters"];

export type PediaStatus = "missing" | "caught" | "donated";

export interface PediaEntry {
  id: string;
  name: string;
  img: string;
  biome: string[];
  timeFound: string[];
  seasons: string[];
  rarity: string;
  baseSellPrice: number;
  /** Only fish can be cooked. */
  cookedPrice?: number;
  cookedPieces?: number;
}

const BUILDERS = { fish, bugs, critters } as const;

export const pediaEntries: Record<PediaTab, PediaEntry[]> = {
  fish: fish().get(),
  bugs: bugs().get(),
  critters: critters().get(),
};

/**
 * Collected and donated are two lists in the saved data, and donating also marks an item
 * collected. A donated item reads as Donated even in a save where it is not listed as collected.
 */
export const statusOf = (
  playthrough: Playthrough,
  tab: PediaTab,
  id: string,
): PediaStatus => {
  if (playthrough.donations[tab].includes(id)) return "donated";
  if (playthrough.collections[tab].includes(id)) return "caught";
  return "missing";
};

const withoutId = (ids: string[], id: string) =>
  ids.filter((entry) => entry !== id);
const withId = (ids: string[], id: string) =>
  ids.includes(id) ? ids : [...ids, id];

/** The playthrough after setting one item to a status. Other sections are not touched. */
export const withStatus = (
  playthrough: Playthrough,
  tab: PediaTab,
  id: string,
  status: PediaStatus,
): Playthrough => {
  const collected = playthrough.collections[tab];
  const donated = playthrough.donations[tab];

  return {
    ...playthrough,
    collections: {
      ...playthrough.collections,
      [tab]:
        status === "missing" ? withoutId(collected, id) : withId(collected, id),
    },
    donations: {
      ...playthrough.donations,
      [tab]:
        status === "donated" ? withId(donated, id) : withoutId(donated, id),
    },
  };
};

/** The price at a commerce level, rounded as the old price popover rounded it. */
export const commercePrice = (price: number, level: CommerceLevel) =>
  Math.round(price * (1 + level / 100));

export const ALL = "All";

export interface PediaFilters {
  biome: string;
  rarity: string;
  season: string;
  time: string;
  collected: "all" | "collected" | "not_collected";
  donated: "all" | "donated" | "not_donated";
  query: string;
}

export const emptyFilters: PediaFilters = {
  biome: ALL,
  rarity: ALL,
  season: ALL,
  time: ALL,
  collected: "all",
  donated: "all",
  query: "",
};

const RARITY_ORDER = ["Common", "Uncommon", "Rare", "Super Rare", "Very Rare"];

export const rarityOptions = (entries: PediaEntry[]) =>
  RARITY_ORDER.filter((rarity) =>
    entries.some((entry) => entry.rarity === rarity),
  );

export const biomeOptions = (entries: PediaEntry[]) =>
  [...new Set(entries.flatMap((entry) => entry.biome))].sort();

export const seasonOptions = () => SEASONS.filter((season) => season !== ALL);

export const timeOptions = () => TIME_PERIODS.filter((time) => time !== ALL);

/** Applies the six filters and the name search, the way the old pages did. */
export const filterEntries = (
  tab: PediaTab,
  playthrough: Playthrough,
  filters: PediaFilters,
): PediaEntry[] => {
  let query = BUILDERS[tab](pediaEntries[tab] as never);
  if (filters.biome !== ALL) query = query.byBiome(filters.biome as Biome);
  if (filters.rarity !== ALL)
    query = query.byRarity(filters.rarity as RarityLevel);
  if (filters.season !== ALL) query = query.bySeason(filters.season as Season);
  if (filters.time !== ALL) query = query.byTime(filters.time as TimePeriod);

  const collected = playthrough.collections[tab];
  const donated = playthrough.donations[tab];
  let entries = query.get() as PediaEntry[];

  if (filters.collected === "collected")
    entries = entries.filter((e) => collected.includes(e.id));
  if (filters.collected === "not_collected") {
    entries = entries.filter((e) => !collected.includes(e.id));
  }
  if (filters.donated === "donated")
    entries = entries.filter((e) => donated.includes(e.id));
  if (filters.donated === "not_donated")
    entries = entries.filter((e) => !donated.includes(e.id));

  if (filters.query)
    entries = BUILDERS[tab](entries as never).search(
      filters.query,
    ) as PediaEntry[];
  return entries;
};
