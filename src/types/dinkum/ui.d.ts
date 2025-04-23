import { Season } from "./base";
import { License } from "./license";

type BooleanCollection = Record<string, boolean>;
type NumericCollection = Record<string, number>;
type StringArray = string[];

export interface CollectTabProps {
  collected: BooleanCollection;
}

export interface CollectNumberTabProps {
  collected: NumericCollection;
}

export interface UnlockTabProps {
  unlocked: BooleanCollection;
}

export interface TabHandle {
  save(): boolean;
}

export interface PediaTabHandle {
  save(): { collected: StringArray; donated: StringArray };
}

export interface CalendarTabProps {
  current: {
    currentDay: number;
    currentSeason: Season;
  };
}

export interface CollectionsTabProps {
  collections: {
    fish: StringArray;
    bugs: StringArray;
    critters: StringArray;
  };
  donations: {
    fish: StringArray;
    bugs: StringArray;
    critters: StringArray;
  };
  activeCollectionType: "fish" | "bugs" | "critters";
}

export interface PediaTabProps {
  collected: StringArray;
  donated: StringArray;
  onCollectedChange: (id: string, collected: boolean) => void;
  onDonatedChange: (id: string, donated: boolean) => void;
}

export interface SkillCardProps {
  skill: Skill;
  level: number;
  onLevelChange: (delta: number) => void;
}

export interface CollectionStatsProps {
  collections: Collection;
  donations: Collection;
}

export interface LicenseCardProps {
  license: License;
  isObtained: boolean;
  onObtainedChange: (id: string, isObtained: boolean) => void;
}

export interface GearAndEquipmentStatsProps {
  bookCollection: BooleanCollection;
  toolCollection: BooleanCollection;
  weaponCollection: BooleanCollection;
  equipmentCollection: BooleanCollection;
  vehicleCollection: BooleanCollection;
}
