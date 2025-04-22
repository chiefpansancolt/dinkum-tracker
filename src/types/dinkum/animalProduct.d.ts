import { Biome, Buffs } from "./base";

export interface AnimalProduct {
  id: string;
  name: string;
  img: string;
  source: string[];
  baseSellPrice: number;
  buffs?: Buffs;
  locations?: Biome[];
}
