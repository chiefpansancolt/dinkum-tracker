import type { Playthrough } from "@/types/app";

export type CollectSection =
  | "books"
  | "cassettes"
  | "tools"
  | "weapons"
  | "equipment"
  | "vehicles"
  | "cookingRecipes"
  | "craftingRecipes"
  | "signWritingRecipes"
  | "clothing"
  | "furniture"
  | "decorations";

export type CollectedFilter = "all" | "collected" | "not_collected";

export type Flags = Record<string, boolean>;

export const isCollected = (flags: Flags | undefined, id: string) =>
  flags?.[id] === true;

export const collectedCount = (flags: Flags | undefined) =>
  Object.values(flags ?? {}).filter(Boolean).length;

export const withFlag = (
  playthrough: Playthrough,
  section: CollectSection,
  id: string,
  value: boolean,
): Playthrough => ({
  ...playthrough,
  [section]: { ...playthrough[section], [id]: value },
});

export const applyCollectedFilter = <Item extends { id: string }>(
  items: Item[],
  flags: Flags | undefined,
  filter: CollectedFilter,
) => {
  if (filter === "collected")
    return items.filter((item) => isCollected(flags, item.id));
  if (filter === "not_collected")
    return items.filter((item) => !isCollected(flags, item.id));
  return items;
};

/** The old data spells License in two ways. Options use one spelling, and both spellings match. */
export const normalizeSpelling = (label: string) =>
  label.replace(/Licence/g, "License");

export const uniqueSorted = (labels: string[]) => [...new Set(labels)].sort();

export const matchesLabel = (labels: string[], wanted: string) => {
  const target = normalizeSpelling(wanted).toLowerCase();
  return labels.some((label) =>
    normalizeSpelling(label).toLowerCase().includes(target),
  );
};

export const nameSearch = <Item extends { name: string }>(
  items: Item[],
  query: string,
) => {
  const text = query.trim().toLowerCase();
  return text === ""
    ? items
    : items.filter((item) => item.name.toLowerCase().includes(text));
};
