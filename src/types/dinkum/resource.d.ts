import { ResourceType } from "@/data/constants";
import { Buffs } from "./base";

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

export interface UniqueResource extends Resource {
  usedIn: string[];
  categories: string[];
  resourceType: ResourceType;
}

export interface ResourceItem {
  id: string;
  name: string;
  img: string;
  source?: string[];
  baseSellPrice: number;
  buffs?: Buffs;
  locations?: string[];
  resourceType: ResourceType;
  buyPrice?: number;
  description?: string;
  variants?: ResourceVariant[];
}
