import { PediaItem } from "./base";

export interface Fish extends PediaItem {
  cookedPrice: number;
  cookedPieces: number;
}

export type CollectionType = "fish" | "bugs" | "critters";

export interface Collection {
  fish: string[];
  bugs: string[];
  critters: string[];
}
