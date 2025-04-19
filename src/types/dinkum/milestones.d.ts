export interface MilestoneLevel {
  level: number;
  count: number;
  permitPoints: number;
  unit?: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  img: string;
  levels: MilestoneLevel[];
}

export interface DailyMilestone {
  id: string;
  name: string;
  permitPoints: number;
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

export const DAILY_MILESTONE_TYPES = [
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
] as const;

export type DailyMilestoneType = (typeof DAILY_MILESTONE_TYPES)[number];

export interface MilestonesTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface MilestonesTabHandle {
  saveMilestones: () => boolean;
}

export interface MilestoneStatsProps {
  collected: {
    [key: string]: boolean;
  };
}
