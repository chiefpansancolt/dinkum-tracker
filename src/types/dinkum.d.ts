export const BIOMES = [
  "Bushlands",
  "Plains",
  "Pine Forests",
  "Tropics",
  "Desert",
  "Underground",
  "Island Reef",
  "Everywhere",
  "Rivers",
  "Ocean",
  "Deep Ocean",
  "Ponds",
  "Billabongs",
  "Mangroves",
] as const;

export const TIME_PERIODS = [
  "Morning",
  "Day",
  "Evening",
  "Night",
  "All",
] as const;

export const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "All"] as const;

export const RARITY_LEVELS = [
  "Common",
  "Uncommon",
  "Rare",
  "Very Rare",
  "Super Rare",
] as const;

export type Biome = (typeof BIOMES)[number];
export type TimePeriod = (typeof TIME_PERIODS)[number];
export type Season = (typeof SEASONS)[number];
export type RarityLevel = (typeof RARITY_LEVELS)[number];

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

export interface Bug extends PediaItem {}
export interface Fish extends PediaItem {
  cookedPrice: number;
  cookedPieces: number;
}
export interface Critter extends PediaItem {}

export interface Milestone {
  id: string;
  name: string;
  description?: string;
  requirements?: string;
}

interface LicenseLevel {
  level: number;
  skillLevel: number;
  permitPointCost: number;
  description: string;
}

export interface License {
  id: string;
  name: string;
  img: string;
  requirements: string;
  levels: LicenseLevel[];
}

export interface DinkumData {
  bugs: Bug[];
  fish: Fish[];
  critters: Critter[];
  milestones: Milestone[];
  licenses: License[];
}
