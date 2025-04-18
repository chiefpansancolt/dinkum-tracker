export interface BuildingResource {
  name: string;
  count: number;
  img: string;
}

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
  resources: BuildingResource[];
}
