import { FilterObject } from "@/types";

export const collectedFilter: FilterObject[] = [
  { id: "all", value: "All" },
  { id: "collected", value: "Collected" },
  { id: "not_collected", value: "To Be Collected" },
];

export const unlockedFilter: FilterObject[] = [
  { id: "all", value: "All" },
  { id: "unlocked", value: "Unlocked" },
  { id: "not_unlocked", value: "To Be Unlocked" },
];

export const donatedFilter: FilterObject[] = [
  { id: "all", value: "All" },
  { id: "donated", value: "Donated" },
  { id: "not_donated", value: "To Be Donated" },
];

export const sellBySort: FilterObject[] = [
  { id: "name", value: "Name (A-Z)" },
  { id: "sellPriceDesc", value: "Sell Price (High to Low)" },
  { id: "sellPriceAsc", value: "Sell Price (Low to High)" },
];

export const sortByGrowth: FilterObject[] = [
  { id: "name", value: "Name (A-Z)" },
  { id: "growthPeriodAsc", value: "Growth Period (Fastest)" },
  { id: "growthPeriodDesc", value: "Growth Period (Longest)" },
];
