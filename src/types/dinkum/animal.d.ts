import { ANIMAL_TYPES, TEMPERAMENTS } from "@/data/constants";
import { Base, Resource } from "./base";

export type Temperament = (typeof TEMPERAMENTS)[number];
export type AnimalType = (typeof ANIMAL_TYPES)[number];

export interface Animal extends Base {
  temperament: Temperament;
  habitat?: string[];
  health?: number;
  drops: Resource[];
  produces?: Resource[];
  researchReward?: number;
  buyPrice?: number;
  baseSellPrice?: number;
  maxSellPrice?: number;
  source?: string;
  type: AnimalType;
}
