import { formatNumber } from "@/i18n/formatter";
import {
  type Animal,
  ANIMAL_TYPES,
  animalProducts,
  animals,
  type Crop,
  crops,
  dailyMilestones,
  type DailyMilestones,
  type Flower,
  flowers,
  foodModellerRecipes,
  foragables,
  minerals,
  otherCraftables,
  relics,
  type Season,
  type Seed,
  seeds,
  TEMPERAMENTS,
  type Tree,
  trees,
  trophies,
} from "dinkum-data";
import { ResourceType } from "@/data/constants/components";
import { isCommon, resourceIndex } from "./breakdown";

export const ALL = "All";

export type ReferenceTab =
  "animals" | "resources" | "plants" | "food" | "daily";
export const REFERENCE_TABS: readonly ReferenceTab[] = [
  "animals",
  "resources",
  "plants",
  "food",
  "daily",
];

export type PlantTab = "seeds" | "crops" | "flowers" | "trees";
export const PLANT_TABS: readonly PlantTab[] = [
  "seeds",
  "crops",
  "flowers",
  "trees",
];

export const allAnimals: Animal[] = animals().get();
export const allSeeds: Seed[] = seeds().get();
export const allCrops: Crop[] = crops().get();
export const allFlowers: Flower[] = flowers().get();
export const allTrees: Tree[] = trees().get();
export const allFood = foodModellerRecipes().get();
export type FoodRecipe = (typeof allFood)[number];

export interface ReferenceResource {
  id: string;
  name: string;
  img: string;
  resourceType: ResourceType;
  source?: string[];
  locations?: string[];
  buyPrice?: number;
  baseSellPrice: number;
  buffs?: Record<string, number | boolean>;
  variants?: { id: string; inputs: { count: number; name: string }[] }[];
}

export const RESOURCE_KINDS = [
  ResourceType.RELIC,
  ResourceType.FORAGABLE,
  ResourceType.ANIMALPRODUCT,
  ResourceType.MINERAL,
  ResourceType.CRAFTABLE,
  ResourceType.TROPHY,
] as const;

const tagged = (items: object[], resourceType: ResourceType) =>
  items.map((item) => ({ ...item, resourceType }) as ReferenceResource);

export const allResources: ReferenceResource[] = [
  ...tagged(animalProducts().get(), ResourceType.ANIMALPRODUCT),
  ...tagged(foragables().get(), ResourceType.FORAGABLE),
  ...tagged(minerals().get(), ResourceType.MINERAL),
  ...tagged(relics().get(), ResourceType.RELIC),
  ...tagged(trophies().get(), ResourceType.TROPHY),
  ...tagged(otherCraftables().get(), ResourceType.CRAFTABLE),
];

export const resourceKindCount = (kind: ResourceType) =>
  allResources.filter((resource) => resource.resourceType === kind).length;

const usesByName = new Map(
  resourceIndex.map((resource) => [resource.name, resource]),
);

export const usedInCount = (resource: { name: string }) =>
  usesByName.get(resource.name)?.usedIn.length ?? 0;

export const isCommonResource = (resource: { name: string }) => {
  const entry = usesByName.get(resource.name);
  return entry !== undefined && isCommon(entry);
};

export const tabCounts: Record<ReferenceTab, number> = {
  animals: allAnimals.length,
  resources: allResources.length,
  plants:
    allSeeds.length + allCrops.length + allFlowers.length + allTrees.length,
  food: allFood.length,
  daily: Object.values(dailyMilestones()).reduce(
    (sum, list) => sum + list.length,
    0,
  ),
};

export const plantCounts: Record<PlantTab, number> = {
  seeds: allSeeds.length,
  crops: allCrops.length,
  flowers: allFlowers.length,
  trees: allTrees.length,
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

export type Compare<Item> = (a: Item, b: Item) => number;

const byName = <Item extends { name: string }>(a: Item, b: Item) =>
  a.name.localeCompare(b.name);
const ascending =
  <Item>(value: (item: Item) => number): Compare<Item> =>
  (a, b) =>
    value(a) - value(b);
const descending =
  <Item>(value: (item: Item) => number): Compare<Item> =>
  (a, b) =>
    value(b) - value(a);

export type SortId =
  | "name"
  | "sellPriceDesc"
  | "sellPriceAsc"
  | "healthDesc"
  | "healthAsc"
  | "priceDesc"
  | "priceAsc"
  | "buyPriceDesc"
  | "buyPriceAsc"
  | "growthPeriodAsc"
  | "growthPeriodDesc";

export interface SortChoice<Item> {
  id: SortId;
  compare: Compare<Item>;
}

/** Sorts a copy. A missing number counts as zero, as the old pages did. */
export const sorted = <Item>(
  items: Item[],
  choices: SortChoice<Item>[],
  id: SortId,
) => {
  const choice = choices.find((candidate) => candidate.id === id) ?? choices[0];
  return [...items].sort(choice.compare);
};

export const animalSorts: SortChoice<Animal>[] = [
  { id: "name", compare: byName },
  { id: "sellPriceDesc", compare: descending((a) => a.baseSellPrice ?? 0) },
  { id: "sellPriceAsc", compare: ascending((a) => a.baseSellPrice ?? 0) },
  { id: "healthDesc", compare: descending((a) => a.health ?? 0) },
  { id: "healthAsc", compare: ascending((a) => a.health ?? 0) },
];

export const resourceSorts: SortChoice<ReferenceResource>[] = [
  { id: "name", compare: byName },
  { id: "priceDesc", compare: descending((r) => r.baseSellPrice) },
  { id: "priceAsc", compare: ascending((r) => r.baseSellPrice) },
];

export const seedSorts: SortChoice<Seed>[] = [
  { id: "name", compare: byName },
  { id: "buyPriceDesc", compare: descending((s) => s.buyPrice ?? 0) },
  { id: "buyPriceAsc", compare: ascending((s) => s.buyPrice ?? 0) },
  { id: "growthPeriodAsc", compare: ascending((s) => s.growthPeriod ?? 0) },
  { id: "growthPeriodDesc", compare: descending((s) => s.growthPeriod ?? 0) },
];

export const sellSorts = <
  Item extends { name: string; baseSellPrice: number },
>(): SortChoice<Item>[] => [
  { id: "name", compare: byName },
  { id: "sellPriceDesc", compare: descending((item) => item.baseSellPrice) },
  { id: "sellPriceAsc", compare: ascending((item) => item.baseSellPrice) },
];

export const treeSorts: SortChoice<Tree>[] = [
  { id: "name", compare: byName },
  { id: "growthPeriodAsc", compare: ascending((t) => t.growthPeriod ?? 0) },
  { id: "growthPeriodDesc", compare: descending((t) => t.growthPeriod ?? 0) },
];

export const temperamentOptions: readonly string[] = TEMPERAMENTS;
export const animalTypeOptions: readonly string[] = ANIMAL_TYPES;

export const habitatOptions = [
  ...new Set(allAnimals.flatMap((animal) => animal.habitat ?? [])),
].sort();

export interface AnimalFilters {
  temperament: string;
  type: string;
  habitat: string;
}

export const filterAnimals = (items: Animal[], filters: AnimalFilters) =>
  items.filter(
    (animal) =>
      (filters.temperament === ALL ||
        animal.temperament === filters.temperament) &&
      (filters.type === ALL || animal.type === filters.type) &&
      (filters.habitat === ALL ||
        (animal.habitat ?? []).includes(filters.habitat)),
  );

export const animalSearch = (items: Animal[], query: string) =>
  query === "" ? items : animals(items).search(query);

export const resourceSourceOptions = [
  ...new Set(allResources.flatMap((resource) => resource.source ?? [])),
].sort();

export interface ResourceFilters {
  kinds: ResourceType[];
  source: string;
  commonOnly: boolean;
}

export const filterResources = (
  items: ReferenceResource[],
  filters: ResourceFilters,
) =>
  items.filter(
    (resource) =>
      (filters.kinds.length === 0 ||
        filters.kinds.includes(resource.resourceType)) &&
      (filters.source === ALL ||
        (resource.source ?? []).includes(filters.source)) &&
      (!filters.commonOnly || isCommonResource(resource)),
  );

export const seedCategoryOptions = [
  ...new Set(allSeeds.map((seed) => seed.category)),
].sort();

export const flowerLocationOptions = [
  ...new Set(allFlowers.flatMap((flower) => flower.locations ?? [])),
].sort();

export const treeLocationOptions = [
  ...new Set(allTrees.flatMap((tree) => tree.locations ?? [])),
].sort();

export type DailyCategory = keyof DailyMilestones;

export const DAILY_CATEGORIES = Object.keys(
  dailyMilestones(),
) as DailyCategory[];

export const DAILY_TASKS_PER_DAY = 3;

const dailyData = dailyMilestones();

export const dailyCategoryCount = (category: DailyCategory) =>
  dailyData[category].length;

export interface DailyGroup {
  category: DailyCategory;
  items: DailyMilestones[DailyCategory];
}

/** Groups in the order of the old page. A group with no match is left out. */
export const filterDaily = (
  category: DailyCategory | typeof ALL,
  query: string,
): DailyGroup[] => {
  const text = query.trim().toLowerCase();
  const wanted =
    category === ALL
      ? DAILY_CATEGORIES
      : DAILY_CATEGORIES.filter((key) => key === category);

  return wanted
    .map((key) => ({
      category: key,
      items: dailyData[key].filter(
        (task) => text === "" || task.name.toLowerCase().includes(text),
      ),
    }))
    .filter((group) => group.items.length > 0);
};

export const largestDailyCategory = DAILY_CATEGORIES.reduce((top, key) =>
  dailyCategoryCount(key) > dailyCategoryCount(top) ? key : top,
);

export const buffPairs = (buffs: object | undefined) =>
  (Object.entries(buffs ?? {}) as [string, number | boolean][]).filter(
    ([, value]) => value !== false,
  );

export const inputsLabel = (inputs: { count: number; name: string }[]) =>
  inputs
    .map((input) => `${formatNumber(input.count)} ${input.name}`)
    .join(", ");

/** Season, category and location filters come from the data package, so they match as before. */
export const filterSeeds = (
  items: Seed[],
  season: string,
  category: string,
) => {
  let query = seeds(items);
  if (season !== ALL) query = query.bySeason(season as Season);
  if (category !== ALL) query = query.byCategory(category);
  return query.get();
};

export const filterCrops = (items: Crop[], season: string) =>
  season === ALL
    ? items
    : crops(items)
        .bySeason(season as Season)
        .get();

export const filterFlowers = (items: Flower[], location: string) =>
  location === ALL
    ? items
    : flowers(items)
        .byLocation(location as never)
        .get();

export const filterTrees = (items: Tree[], location: string) =>
  location === ALL
    ? items
    : trees(items)
        .byLocation(location as never)
        .get();

export const seedSearch = (items: Seed[], query: string) =>
  query === "" ? items : seeds(items).search(query);
export const cropSearch = (items: Crop[], query: string) =>
  query === "" ? items : crops(items).search(query);
export const flowerSearch = (items: Flower[], query: string) =>
  query === "" ? items : flowers(items).search(query);
export const treeSearch = (items: Tree[], query: string) =>
  query === "" ? items : trees(items).search(query);
export const foodSearch = (items: FoodRecipe[], query: string) =>
  query === "" ? items : foodModellerRecipes(items).search(query);
