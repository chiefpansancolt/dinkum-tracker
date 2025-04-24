export const BIOMES = [
  "Beach",
  "Bushlands",
  "Plains",
  "Pine Forests",
  "Tropics",
  "Desert",
  "Underground",
  "Island Reef",
  "Everywhere",
  "Rivers",
  "Ocean",
  "Deep Ocean",
  "Ponds",
  "Billabongs",
  "Mangroves",
  "Hot Hot Hot",
  "Undergrove",
  "Deep Mine",
] as const;

export const TIME_PERIODS = [
  "Morning",
  "Day",
  "Evening",
  "Night",
  "All",
] as const;

export const SEASONS = ["Spring", "Summer", "Autumn", "Winter", "All"] as const;

export const RARITY_LEVELS = [
  "Common",
  "Uncommon",
  "Rare",
  "Very Rare",
  "Super Rare",
] as const;

export enum DeedTypes {
  Collectable = "Collectable",
  Movable = "Movable",
  Reference = "Reference",
};
