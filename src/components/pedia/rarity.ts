export type RarityTone =
  "common" | "uncommon" | "rare" | "superRare" | "veryRare";

const TONES: Record<string, RarityTone> = {
  Common: "common",
  Uncommon: "uncommon",
  Rare: "rare",
  "Super Rare": "superRare",
  "Very Rare": "veryRare",
};

export const rarityTone = (rarity: string): RarityTone =>
  TONES[rarity] ?? "common";
