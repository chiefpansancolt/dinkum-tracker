import { ResourceVariant } from "./resource";
import { Buffs } from "./base";

export interface Recipe {
  id: string;
  name: string;
  img: string;
  buyPrice?: number;
  baseSellPrice: number;
  outputCount?: number | "Varies";
  source?: string[];
  variants: ResourceVariant[];
  buffs?: Buffs;
}

export interface CookingRecipe {
  id: string;
  name: string;
  img: string;
  outputCount: number | "Varies";
  cookingLocation: string[];
  variants: ResourceVariant[];
  baseSellPrice: number;
  sheilasSellPrice?: number;
  tedsSellPrice?: number | null;
  jimmysSellPrice?: number;
  buffs?: Buffs;
}

export interface CraftingRecipesTabProps {
  unlocked: {
    [key: string]: boolean;
  };
}

export interface CookingRecipesTabProps {
  unlocked: {
    [key: string]: boolean;
  };
}

export interface SignWritingRecipesTabProps {
  unlocked: {
    [key: string]: boolean;
  };
}

export interface CraftingRecipesTabHandle {
  saveCraftingRecipes: () => boolean;
}

export interface CookingRecipesTabHandle {
  saveCookingRecipes: () => boolean;
}

export interface SignWritingRecipesTabHandle {
  saveSignWritingRecipes: () => boolean;
}

export interface RecipeStatsProps {
  unlockedCookingRecipes: {
    [key: string]: boolean;
  };
  unlockedCraftingRecipes: {
    [key: string]: boolean;
  };
  unlockedSignwritingRecipes: {
    [key: string]: boolean;
  };
}
