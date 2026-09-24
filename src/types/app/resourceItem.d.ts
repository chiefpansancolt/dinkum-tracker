import type {
  BaseResource,
  Buffs,
  Resource,
  ResourceVariant,
} from "dinkum-data";
import { ResourceType } from "@/data/constants";

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
