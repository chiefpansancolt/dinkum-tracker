import {
  type Clothing,
  clothing,
  CLOTHING_SLOTS,
  clothingSlots,
  clothingTypesForSlot,
  type Decoration,
  DECORATION_CATEGORIES,
  decorations,
  furniture,
  type Furniture,
} from "dinkum-data";
import { type Flags, isCollected, uniqueSorted } from "./collect";

export type WardrobeTab = "clothing" | "furniture" | "decorations";
export const WARDROBE_TABS: readonly WardrobeTab[] = [
  "clothing",
  "furniture",
  "decorations",
];

export const wardrobeItems = {
  clothing: clothing().get(),
  furniture: furniture().get(),
  decorations: decorations().get(),
} satisfies Record<WardrobeTab, unknown[]>;

export type { Clothing, Decoration, Furniture };

export const ALL = "All";

export const slotList: readonly string[] = CLOTHING_SLOTS;

/** The types a slot has. With no slot chosen there is no type to pick. */
export const typesForSlot = (slot: string): string[] =>
  slot === ALL
    ? []
    : (clothingTypesForSlot(
        slot as keyof ReturnType<typeof clothingSlots>,
      ) as string[]);

const present = (labels: (string | undefined)[]) =>
  labels.filter((label): label is string => Boolean(label));

export const clothingSetOptions = uniqueSorted(
  present(wardrobeItems.clothing.map((item) => item.set)),
);

export const furnitureSetOptions = uniqueSorted(
  wardrobeItems.furniture
    .map((item) => item.furnitureSet ?? "")
    .filter(Boolean),
);

export const furnitureSourceOptions = uniqueSorted(
  wardrobeItems.furniture.flatMap((item) => item.source ?? []),
);

export const decorationCategories: readonly string[] = DECORATION_CATEGORIES;

export const decorationSourceOptions = uniqueSorted(
  wardrobeItems.decorations.flatMap((item) => item.source ?? []),
);

export interface ClothingFilters {
  slot: string;
  type: string;
  set: string;
}

export const filterClothing = (items: Clothing[], filters: ClothingFilters) =>
  items.filter(
    (item) =>
      (filters.slot === ALL || item.slot.includes(filters.slot as never)) &&
      (filters.type === ALL || item.type === filters.type) &&
      (filters.set === ALL || item.set === filters.set),
  );

type CatalogueFilter = "all" | "melvins" | "not_melvins";

export interface FurnitureFilters {
  set: string;
  source: string;
  catalogue: CatalogueFilter;
}

export const filterFurniture = (
  items: Furniture[],
  filters: FurnitureFilters,
) =>
  items.filter(
    (item) =>
      (filters.set === ALL || item.furnitureSet === filters.set) &&
      (filters.source === ALL ||
        (item.source ?? []).includes(filters.source)) &&
      (filters.catalogue === "all" ||
        (filters.catalogue === "melvins") === Boolean(item.melvinsCatalogue)),
  );

export interface DecorationFilters {
  category: string;
  source: string;
}

export const filterDecorations = (
  items: Decoration[],
  filters: DecorationFilters,
) =>
  items.filter(
    (item) =>
      (filters.category === ALL || item.category === filters.category) &&
      (filters.source === ALL || (item.source ?? []).includes(filters.source)),
  );

export interface Progress {
  label: string;
  count: number;
  total: number;
}

const progressOf = (
  labels: readonly string[],
  items: { id: string }[],
  flags: Flags | undefined,
  groupOf: (item: never, label: string) => boolean,
): Progress[] =>
  labels.map((label) => {
    const group = items.filter((item) => groupOf(item as never, label));
    return {
      label,
      count: group.filter((item) => isCollected(flags, item.id)).length,
      total: group.length,
    };
  });

/** Progress for each slot. An item with two slots counts in both. */
export const slotProgress = (flags: Flags | undefined) =>
  progressOf(slotList, wardrobeItems.clothing, flags, (item: Clothing, slot) =>
    item.slot.includes(slot as never),
  );

export const setProgress = (flags: Flags | undefined) =>
  progressOf(
    furnitureSetOptions,
    wardrobeItems.furniture,
    flags,
    (item: Furniture, set) => item.furnitureSet === set,
  );

export const categoryProgress = (flags: Flags | undefined) =>
  progressOf(
    decorationCategories,
    wardrobeItems.decorations,
    flags,
    (item: Decoration, category) => item.category === category,
  );
