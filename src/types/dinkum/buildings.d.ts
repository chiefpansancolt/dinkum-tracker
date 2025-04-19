export interface BuildingResource {
  name: string;
  count: number;
  img: string;
}

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
  resources: BuildingResource[];
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
  buildings: {
    [key: string]: boolean;
  };
}
