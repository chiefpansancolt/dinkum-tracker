import {
  type CookingRecipe,
  cookingRecipes,
  craftingRecipes,
  signWritingRecipes,
} from "dinkum-data";
import { matchesLabel, uniqueSorted } from "./collect";

export type RecipeTab = "cooking" | "crafting" | "signWriting";
export const RECIPE_TABS: readonly RecipeTab[] = [
  "cooking",
  "crafting",
  "signWriting",
];

export const recipeItems = {
  cooking: cookingRecipes().get(),
  crafting: craftingRecipes().get(),
  signWriting: signWritingRecipes().get(),
} satisfies Record<RecipeTab, unknown[]>;

export type CraftingRecipe = (typeof recipeItems.crafting)[number];
export type SignWritingRecipe = (typeof recipeItems.signWriting)[number];
export type { CookingRecipe };

export const ALL = "All";

export const cookingLocations = [
  ...new Set(recipeItems.cooking.flatMap((r) => r.cookingLocation)),
];

export const matchesLocation = (recipe: CookingRecipe, location: string) =>
  recipe.cookingLocation.includes(location);

export const sourceOptionsFor = (recipes: { source?: string[] }[]) =>
  uniqueSorted(
    recipes
      .flatMap((recipe) => recipe.source ?? [])
      .map((source) => source.replace(/Licence/g, "License")),
  );

export const matchesRecipeSource = (
  recipe: { source?: string[] },
  source: string,
) => matchesLabel(recipe.source ?? [], source);

const BUFF_DURATION_KEY = "length";

/** A buff has a number, such as a level, or is simply on, such as Sleepless. */
export type BuffValue = number | boolean;

/** A recipe has buffs when it lists anything besides the buff duration. */
export const buffEntries = (recipe: CookingRecipe): [string, BuffValue][] =>
  Object.entries(recipe.buffs ?? {}).filter(
    (entry): entry is [string, BuffValue] =>
      entry[0] !== BUFF_DURATION_KEY && Boolean(entry[1]),
  );

export const hasBuffs = (recipe: CookingRecipe) =>
  buffEntries(recipe).length > 0;

/** Every buff that any cooking recipe gives, in the order of the old panel. */
export const allBuffKeys = [
  ...new Set(
    recipeItems.cooking.flatMap((recipe) =>
      buffEntries(recipe).map(([key]) => key),
    ),
  ),
].sort();

/** The name of a buff: spaced words, with the word Level removed. */
export const buffName = (key: string) =>
  key
    .replace(/Level$/, "")
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase())
    .trim();

export const buffDuration = (recipe: CookingRecipe) => recipe.buffs?.length;

const UNITS: Record<string, string> = {
  healthRegenRate: "/t",
  staminaRegenRate: "/s",
};

export const buffUnit = (key: string) => UNITS[key] ?? "";

/** Any keeps recipes that have at least one chosen buff. All needs every chosen buff. */
export const filterByBuffs = (
  recipes: CookingRecipe[],
  chosen: string[],
  matchAll: boolean,
) => {
  if (chosen.length === 0) return recipes;

  return recipes.filter((recipe) => {
    const buffs = new Set(buffEntries(recipe).map(([key]) => key));
    return matchAll
      ? chosen.every((key) => buffs.has(key))
      : chosen.some((key) => buffs.has(key));
  });
};

export const isSoldByVendor = (recipe: CookingRecipe) =>
  Boolean(
    recipe.sheilasSellPrice || recipe.tedsSellPrice || recipe.jimmysSellPrice,
  );
