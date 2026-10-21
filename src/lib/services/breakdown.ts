import {
  animalProducts,
  bugs,
  buildings,
  cookingRecipes,
  craftingRecipes,
  critters,
  crops,
  equipment,
  fish,
  flowers,
  foragables,
  minerals,
  otherCraftables,
  paint,
  relics,
  type Resource,
  seeds,
  signWritingRecipes,
  tools,
  trophies,
  vehicles,
  weapons,
} from "dinkum-data";
import type { UniqueResource } from "@/types/app";
import { ResourceType } from "@/data/constants/components";

const RESOURCE_TYPES: readonly ResourceType[] = Object.values(ResourceType);

export const CATEGORIES = [
  "Buildings",
  "Tools",
  "Weapons",
  "Equipment",
  "Vehicles",
  "Crafting Recipes",
  "Cooking Recipes",
  "Sign Writing Recipes",
  "Other Craftables",
] as const;

type Category = (typeof CATEGORIES)[number];

/** A resource used in this many items or more counts as common. */
const COMMON_MIN_USES = 3;

export type SortBy = "name" | "usageCount";

const namesOf = (items: { name: string }[]) =>
  new Set(items.map((item) => item.name));

const makeTypeOf = () => {
  const craftables = new Set([
    ...namesOf(weapons().get()),
    ...namesOf(tools().get()),
    ...namesOf(vehicles().get()),
    ...namesOf(equipment().get()),
    ...namesOf(craftingRecipes().get()),
    ...namesOf(cookingRecipes().get()),
    ...namesOf(signWritingRecipes().get()),
    ...namesOf(otherCraftables().get()),
  ]);
  const checks: [Set<string>, ResourceType][] = [
    [namesOf(fish().get()), ResourceType.FISH],
    [namesOf(bugs().get()), ResourceType.BUG],
    [namesOf(critters().get()), ResourceType.CRITTER],
    [namesOf(relics().get()), ResourceType.RELIC],
    [namesOf(crops().get()), ResourceType.CROP],
    [namesOf(foragables().get()), ResourceType.FORAGABLE],
    [namesOf(animalProducts().get()), ResourceType.ANIMALPRODUCT],
    [namesOf(paint().get()), ResourceType.PAINT],
    [namesOf(minerals().get()), ResourceType.MINERAL],
    [namesOf(trophies().get()), ResourceType.TROPHY],
    [craftables, ResourceType.CRAFTABLE],
    [namesOf(seeds().get()), ResourceType.SEED],
    [namesOf(flowers().get()), ResourceType.FLOWER],
  ];
  return (name: string): ResourceType =>
    checks.find(([names]) => names.has(name))?.[1] ?? ResourceType.RESOURCE;
};

/**
 * Every resource that goes into something, with the items that use it. A resource counts under the
 * first type that matches, in the order of RESOURCE_TYPES.
 */
export const buildResourceIndex = (): UniqueResource[] => {
  const byName = new Map<string, UniqueResource>();
  const resourceTypeOf = makeTypeOf();

  const add = (resources: Resource[], itemName: string, category: Category) => {
    resources.forEach((resource) => {
      const known = byName.get(resource.name);
      if (!known) {
        byName.set(resource.name, {
          name: resource.name,
          img: resource.img,
          count: resource.count,
          usedIn: [itemName],
          categories: [category],
          resourceType: resourceTypeOf(resource.name),
        });
        return;
      }
      if (!known.usedIn.includes(itemName)) known.usedIn.push(itemName);
      if (!known.categories.includes(category)) known.categories.push(category);
    });
  };

  const withInputs = (
    items: { name: string; inputs?: Resource[] }[],
    category: Category,
  ) =>
    items.forEach(
      (item) => item.inputs && add(item.inputs, item.name, category),
    );
  const withVariants = (
    items: { name: string; variants: { inputs: Resource[] }[] }[],
    category: Category,
  ) =>
    items.forEach((item) =>
      item.variants.forEach((variant) =>
        add(variant.inputs, item.name, category),
      ),
    );

  withInputs(buildings().get(), "Buildings");
  withInputs(tools().get(), "Tools");
  withInputs(weapons().get(), "Weapons");
  withInputs(equipment().get(), "Equipment");
  withInputs(vehicles().get(), "Vehicles");
  withVariants(craftingRecipes().get(), "Crafting Recipes");
  withVariants(cookingRecipes().get(), "Cooking Recipes");
  withVariants(signWritingRecipes().get(), "Sign Writing Recipes");
  withVariants(otherCraftables().get(), "Other Craftables");

  return [...byName.values()];
};

export const resourceIndex = buildResourceIndex();

export const typeCounts = (resources: UniqueResource[]) =>
  RESOURCE_TYPES.map((type) => ({
    type,
    count: resources.filter((resource) => resource.resourceType === type)
      .length,
  }));

export interface BreakdownFilters {
  query: string;
  categories: string[];
  types: ResourceType[];
  commonOnly: boolean;
  sortBy: SortBy;
}

export const emptyBreakdownFilters: BreakdownFilters = {
  query: "",
  categories: [],
  types: [],
  commonOnly: false,
  sortBy: "name",
};

export const isCommon = (resource: UniqueResource) =>
  resource.usedIn.length >= COMMON_MIN_USES;

/** All the filters combine with AND. Inside Categories or Types, any one match is enough. */
export const filterResources = (
  resources: UniqueResource[],
  filters: BreakdownFilters,
) => {
  const text = filters.query.toLowerCase();
  const passing = resources.filter(
    (resource) =>
      (text === "" || resource.name.toLowerCase().includes(text)) &&
      (filters.categories.length === 0 ||
        resource.categories.some((category) =>
          filters.categories.includes(category),
        )) &&
      (filters.types.length === 0 ||
        filters.types.includes(resource.resourceType)) &&
      (!filters.commonOnly || isCommon(resource)),
  );

  return passing.sort((a, b) =>
    filters.sortBy === "name"
      ? a.name.localeCompare(b.name)
      : b.usedIn.length - a.usedIn.length,
  );
};

export const mostUsed = (resources: UniqueResource[]) =>
  resources.reduce((top, resource) =>
    resource.usedIn.length > top.usedIn.length ? resource : top,
  );

/** Adds the value to the list, or takes it out when it is already there. */
export const toggled = <Value>(list: Value[], value: Value) =>
  list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
