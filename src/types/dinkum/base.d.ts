import { BIOMES, TIME_PERIODS, SEASONS, RARITY_LEVELS } from "@/data/constants";

export type BuyUnits = "Dinks" | "Permit Points";
export type Biome = (typeof BIOMES)[number];
export type TimePeriod = (typeof TIME_PERIODS)[number];
export type Season = (typeof SEASONS)[number];
export type RarityLevel = (typeof RARITY_LEVELS)[number];
export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface Resource {
  name: string;
  img: string;
  count: number;
}

export interface ResourceVariant {
  id: string;
  outputCount?: number;
  inputs: Resource[];
}

export interface Buffs {
  length: number;
  healthRegenRate?: number;
  healthMax?: number;
  staminaRegenRate?: number;
  staminaMax?: number;
  attackLevel?: number;
  defenseLevel?: number;
  experienceLevel?: number;
  fishLevel?: number;
  foragingLevel?: number;
  miningLevel?: number;
  speedLevel?: number;
  swimmingLevel?: number;
  charged?: boolean;
  diligent?: boolean;
  sleepless?: boolean;
  fastHealthTickSpeedLevel?: number;
  coolLevel?: number;
}

export interface BuffIcon {
  length: string;
  healthRegenRate: string;
  healthMax: string;
  staminaRegenRate: string;
  staminaMax: string;
  attackLevel1: string;
  attackLevel2: string;
  attackLevel3: string;
  defenseLevel1: string;
  defenseLevel2: string;
  defenseLevel3: string;
  experienceLevel1: string;
  experienceLevel2: string;
  experienceLevel3: string;
  fishLevel1: string;
  fishLevel2: string;
  fishLevel3: string;
  foragingLevel1: string;
  foragingLevel2: string;
  foragingLevel3: string;
  miningLevel1: string;
  miningLevel2: string;
  miningLevel3: string;
  speedLevel1: string;
  speedLevel2: string;
  speedLevel3: string;
  swimmingLevel1: string;
  swimmingLevel2: string;
  charged: string;
  diligent: string;
  sleepless: string;
  fastHealthTickSpeedLevel1: string;
  fastHealthTickSpeedLevel2: string;
  coolLevel1: string;
  coolLevel2: string;
}

export interface PediaItem extends BaseResource {
  biome: Biome[];
  timeFound: TimePeriod[];
  seasons: Season[];
  rarity: RarityLevel;
}

export interface Base {
  id: string;
  name: string;
  img: string;
}

export interface BaseResource extends Base {
  source?: string[];
  baseSellPrice: number;
  buyPrice?: number;
}
