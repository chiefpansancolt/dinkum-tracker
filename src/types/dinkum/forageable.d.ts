import { Buffs, Biome } from "./base";

export interface Forageable {
  id: string;
  name: string;
  img: string;
  buffs?: Buffs;
  locations?: Biome[];
  buyPrice?: number;
  baseSellPrice: number;
  source?: string[];
}
