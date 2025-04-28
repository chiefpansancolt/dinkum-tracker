type BooleanCollection = Record<string, boolean>;
type NumericCollection = Record<string, number>;

export interface CollectTabProps {
  collected: BooleanCollection;
}

export interface CollectNumberTabProps {
  collected: NumericCollection;
}

export interface CollectionStatsProps {
  collections: Collection;
  donations: Collection;
}

export interface GearAndEquipmentStatsProps {
  bookCollection: BooleanCollection;
  toolCollection: BooleanCollection;
  weaponCollection: BooleanCollection;
  equipmentCollection: BooleanCollection;
  vehicleCollection: BooleanCollection;
}
