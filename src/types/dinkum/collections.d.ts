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

export interface CollectionItemProps {
  item: PediaItem | Fish;
  isCollected: boolean;
  isDonated: boolean;
  onCollectedChange: (id: string, collected: boolean) => void;
  onDonatedChange: (id: string, donated: boolean) => void;
}
