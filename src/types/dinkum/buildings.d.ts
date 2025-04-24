import { Base, Resource } from "./base";
import { DeedTypes } from "@/data/constants";

export type DeedType =
  | DeedTypes.Collectable
  | DeedTypes.Movable
  | DeedTypes.Reference;

export interface Building extends Base {
  deedName: string;
  size: string;
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
