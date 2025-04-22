import { Buffs } from "./base";

export interface Crop {
  id: string;
  name: string;
  img: string;
  buffs?: Buffs;
  buyPrice?: number;
  baseSellPrice: number;
  seed: string;
}
