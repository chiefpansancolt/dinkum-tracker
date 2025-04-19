import { RelicLocations } from "@/data/constants";

export type RelicLocation = (typeof RelicLocations)[number];

export interface Relic {
  id: string;
  name: string;
  img: string;
  buyPrice?: number;
  franklynsSellPrice?: number;
  baseSellPrice: number;
  johnsSellPrice: number;
  locations: RelicLocation[];
}

export interface RelicCardProps {
  relic: Relic;
}
