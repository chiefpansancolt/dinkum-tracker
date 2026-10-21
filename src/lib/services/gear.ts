import {
  type Book,
  books,
  type Cassette,
  cassettes,
  type Equipment,
  equipment,
  type Tool,
  tools,
  type Vehicle,
  vehicles,
  type Weapon,
  weapons,
} from "dinkum-data";
import { matchesLabel, normalizeSpelling, uniqueSorted } from "./collect";

export type GearTab =
  "books" | "cassettes" | "tools" | "weapons" | "equipment" | "vehicles";
export const GEAR_TABS: readonly GearTab[] = [
  "books",
  "cassettes",
  "tools",
  "weapons",
  "equipment",
  "vehicles",
];

export const gearItems = {
  books: books().get(),
  cassettes: cassettes().get(),
  tools: tools().get(),
  weapons: weapons().get(),
  equipment: equipment().get(),
  vehicles: vehicles().get(),
} satisfies Record<GearTab, unknown[]>;

export type { Book, Cassette };

export const ALL = "All";

/** An item with Crafting Table among its sources has a recipe on the Crafting tab. */
export const isCraftable = (item: { source: string[] }) =>
  item.source.includes("Crafting Table");

/** Franklyn asks for Shiny Discs or Berkonium Ore before he sells the item. */
export const needsFranklyn = (item: {
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
}) => (item.shinyDiscCount ?? 0) > 0 || (item.berkoniumOreCount ?? 0) > 0;

export type DamageBand = "high" | "medium" | "low";

const HIGH_DAMAGE = 20;
const MEDIUM_DAMAGE = 10;

/** High is 20 and up, Medium is 10 to 19 and Low is under 10. No damage fits no band. */
export const damageBand = (
  damage: number | null | undefined,
): DamageBand | null => {
  if (damage === null || damage === undefined) return null;
  if (damage >= HIGH_DAMAGE) return "high";
  return damage >= MEDIUM_DAMAGE ? "medium" : "low";
};

export type PurchaseType = "purchasable" | "dinks" | "permit_points";

export const matchesPurchaseType = (
  tool: { buyPrice?: number; buyUnits?: string },
  type: PurchaseType,
) => {
  if (type === "dinks") return tool.buyUnits === "Dinks";
  if (type === "permit_points") return tool.buyUnits === "Permit Points";
  return tool.buyPrice !== undefined;
};

export const sourceOptions = (items: { source: string[] }[]) =>
  uniqueSorted(items.flatMap((item) => item.source));

export const matchesSource = (item: { source: string[] }, source: string) =>
  matchesLabel(item.source, source);

export const toolLicenseOptions = uniqueSorted(
  gearItems.tools
    .map((tool) => tool.licence)
    .filter((licence): licence is string => !!licence),
);

/** Licence and License are one option. */
export const requirementOptions = (items: { requirementType?: string }[]) =>
  uniqueSorted(
    items
      .map((item) => item.requirementType)
      .filter((type): type is string => !!type)
      .map(normalizeSpelling),
  );

export const matchesRequirement = (
  item: { requirementType?: string },
  wanted: string,
) =>
  item.requirementType !== undefined &&
  normalizeSpelling(item.requirementType) === normalizeSpelling(wanted);

/** The fields that the cards of tools, weapons, equipment and vehicles show. Each type has some of them. */
export interface GearCardItem {
  id: string;
  name: string;
  img: string;
  source: string[];
  inputs?: { count: number; name: string }[];
  baseSellPrice?: number;
  buyPrice?: number;
  buyUnits?: string;
  damage?: number | null;
  licence?: string;
  licenceLevel?: number | null;
  requirementType?: string;
  requirementLevel?: number | null;
  description?: string;
  windmillCompatable?: boolean;
  solarPanelCompatable?: boolean;
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
}

export const isPermitPointPrice = (item: { buyUnits?: string }) =>
  item.buyUnits === "Permit Points";

/** Where a Crafting Recipe button leads: the Crafting tab, searched for the item. */
export const craftingRecipeAddress = (name: string) =>
  `/recipes?tab=crafting&q=${encodeURIComponent(name)}`;
