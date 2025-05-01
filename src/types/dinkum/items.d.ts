import { ResourceType } from "@/data/constants";
import {
  Base,
  BaseResource,
  Biome,
  Buffs,
  Resource,
  ResourceVariant,
  Season,
} from "./base";

export interface Seed extends BaseResource {
  category: string;
  growthPeriod: number;
  outputCountMin?: number;
  outputCountMax?: number;
  regrowth?: number;
  season: Season[];
}

export interface Crop extends BaseResource {
  buffs?: Buffs;
  seed: Seed | undefined;
}

export interface Tree extends Base {
  seed: Seed | Foragable | undefined;
  itemsDropped: Resource[];
  locations?: Biome[];
  growthPeriod?: number;
  regrowth?: number;
}

export interface Flower extends BaseResource {
  seed?: Seed | Foragable | undefined;
  itemsDropped?: Resource[];
  locations: Biome[];
  conditions?: string;
  growthPeriod?: number;
  regrowth?: number;
}

export interface Relic extends BaseResource {
  locations: string[];
  johnsSellPrice: number;
  franklynsSellPrice?: number;
}

export interface Foragable extends BaseResource {
  buffs?: Buffs;
  locations?: Biome[];
}

export interface AnimalProduct extends BaseResource {
  buffs?: Buffs;
  locations?: Biome[];
}

export interface Mineral extends BaseResource {
  locations?: Biome[];
}

export interface Tool extends BaseResource {
  damage: number | null;
  licence: string;
  source: string[];
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  inputs?: Resource[];
  buyUnits?: BuyUnits;
}

export interface Weapon extends BaseResource {
  damage: number | null;
  licenceLevel: number | null;
  source: string[];
  inputs?: Resource[];
  buyUnits?: BuyUnits;
}

export interface Equipment extends BaseResource {
  description: string;
  requirementLevel: number | null;
  requirementType?: string;
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  windmillCompatable?: boolean;
  solarPanelCompatable?: boolean;
  source: string[];
  inputs?: Resource[];
  buyUnits?: BuyUnits;
}

export interface Vehicle extends BaseResource {
  requirementLevel: number | null;
  requirementType?: string;
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  windmillCompatable?: boolean;
  solarPanelCompatable?: boolean;
  source: string[];
  inputs?: Resource[];
}

export interface ResourceItem extends BaseResource {
  buffs?: Buffs;
  locations?: string[];
  resourceType: ResourceType;
  description?: string;
  variants?: ResourceVariant[];
}

export interface UniqueResource extends Resource {
  usedIn: string[];
  categories: string[];
  resourceType: ResourceType;
}
