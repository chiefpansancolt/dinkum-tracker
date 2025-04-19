import { Resource } from "@/types/dinkum";

export interface Weapon {
  id: string;
  name: string;
  img: string;
  damage: number | null;
  licenceLevel: number | null;
  source: string[];
  inputs?: Resource[];
  buyPrice?: number;
  buyUnits?: BuyUnits;
  baseSellPrice: number;
}

export interface WeaponsTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface WeaponsTabHandle {
  saveWeapons: () => boolean;
}
