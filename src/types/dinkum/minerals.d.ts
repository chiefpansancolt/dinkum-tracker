import { Biome } from "./base";

export interface Mineral {
  id: string;
  name: string;
  img: string;
  source?: string[];
  buyPrice?: number;
  baseSellPrice: number;
  locations?: Biome[];
}
