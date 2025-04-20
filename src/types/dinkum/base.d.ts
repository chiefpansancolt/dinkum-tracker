import { BIOMES, TIME_PERIODS, SEASONS, RARITY_LEVELS } from "@/data/constants";

export type BuyUnits = "Dinks" | "Permit Points";
export type Biome = (typeof BIOMES)[number];
export type TimePeriod = (typeof TIME_PERIODS)[number];
export type Season = Exclude<(typeof SEASONS)[number], "All">;
export type RarityLevel = (typeof RARITY_LEVELS)[number];
export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface PediaItem {
  id: string;
  name: string;
  img: string;
  biome: Biome[];
  timeFound: TimePeriod[];
  seasons: Season[];
  rarity: RarityLevel;
  basePrice: number;
}
