import { PediaItem } from "./base";

export type CollectionType = "fish" | "critters" | "bugs";

export interface Fish extends PediaItem {
  cookedPrice: number;
  cookedPieces: number;
}

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

export interface FishTabHandle {
  saveCollectionState: () => { collected: string[]; donated: string[] };
}

export interface BugsTabHandle {
  saveCollectionState: () => { collected: string[]; donated: string[] };
}

export interface CrittersTabHandle {
  saveCollectionState: () => { collected: string[]; donated: string[] };
}

export interface CollectionsTabHandle {
  saveCollections: () => void;
}

export interface CollectionsTabProps {
  collections: Collection;
  donations: Collection;
  activeCollectionType: CollectionType;
}

export interface BugsTabProps {
  collected: string[];
  donated: string[];
  onCollectedChange: (id: string, collected: boolean) => void;
  onDonatedChange: (id: string, donated: boolean) => void;
}

export interface CrittersTabProps {
  collected: string[];
  donated: string[];
  onCollectedChange: (id: string, collected: boolean) => void;
  onDonatedChange: (id: string, donated: boolean) => void;
}

export interface FishTabProps {
  collected: string[];
  donated: string[];
  onCollectedChange: (id: string, collected: boolean) => void;
  onDonatedChange: (id: string, donated: boolean) => void;
}

export interface CollectionStatsProps {
  collections: {
    fish: string[];
    bugs: string[];
    critters: string[];
  };
  donations: {
    fish: string[];
    bugs: string[];
    critters: string[];
  };
}
