import { Resource } from "./resource";

export type DeedType = "Collectable" | "Movable" | "Reference";

export interface Building {
  id: string;
  buildingName: string;
  deedName: string;
  size: string;
  img: string;
  npc: string;
  npcImg: string;
  description: string;
  buildTime: string;
  deedPrice: number;
  deedType: DeedType;
  inputs: Resource[];
  operatingHours: string[];
  daysClosed: string;
}

export interface BuildingsTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface BuildingsTabHandle {
  saveBuildings: () => boolean;
}

export interface BuildingStatsProps {
  collected: {
    [key: string]: boolean;
  };
}
