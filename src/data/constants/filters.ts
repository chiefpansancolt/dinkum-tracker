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
