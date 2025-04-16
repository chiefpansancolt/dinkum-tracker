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

const DILAY_MILESTONE_TYPES = [
  "Day One",
  "Travel",
  "NPC",
  "Fishing",
  "Farming",
  "Foraging",
  "Logging",
  "Mining",
  "Excavation",
  "Bug Catching",
  "Crafting",
  "Hunting",
  "Trapping",
  "Dinks",
];

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
export type DailyMilestoneType = (typeof DILAY_MILESTONE_TYPES)[number];

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

export interface Fish extends PediaItem {
  cookedPrice: number;
  cookedPieces: number;
}

export interface DailyMilestones {
  dayOneMilestones: DailyMilestone[];
  travelMilestones: DailyMilestone[];
  npcMilestones: DailyMilestone[];
  fishingMilestones: DailyMilestone[];
  farmingMilestones: DailyMilestone[];
  foragingMilestones: DailyMilestone[];
  loggingMilestones: DailyMilestone[];
  miningMilestones: DailyMilestone[];
  excavationMilestones: DailyMilestone[];
  bugCatchingMilestones: DailyMilestone[];
  craftingMilestones: DailyMilestone[];
  huntingMilestones: DailyMilestone[];
  trappingMilestones: DailyMilestone[];
  dinksMilestones: DailyMilestone[];
}

export interface DailyMilestone {
  id: string;
  name: string;
  permitPoints: number;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  img: string;
  levels: MilestoneLevel[];
}

interface MilestoneLevel {
  level: number;
  count: number;
  permitPoints: number;
  unit?: string;
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

export interface Skill {
  id: string;
  name: string;
  img: string;
  description: string;
}

export type Season = "Summer" | "Autumn" | "Winter" | "Spring";
export type Weekday =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export interface Birthday {
  day: number;
  season: Season;
  character: string;
  likes: string;
}

export interface Event {
  name: string;
  startDay: number;
  endDay: number;
  season: Season;
  emoji: string;
}

export interface CalendarDay {
  day: number;
  season: Season;
  weekday: Weekday;
  events: Event[];
  birthdays: Birthday[];
}
