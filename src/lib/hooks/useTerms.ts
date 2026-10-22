"use client";

import { useTranslations } from "next-intl";
import { ResourceType } from "@/data/constants/components";

type Group =
  | "buffs"
  | "categories"
  | "resourceTypes"
  | "daily"
  | "animalTypes"
  | "temperaments"
  | "seasons"
  | "weekdays";

const RESOURCE_TYPE_KEYS: Record<ResourceType, string> = {
  [ResourceType.FISH]: "fish",
  [ResourceType.CRITTER]: "critter",
  [ResourceType.BUG]: "bug",
  [ResourceType.RELIC]: "relic",
  [ResourceType.CROP]: "crop",
  [ResourceType.FORAGABLE]: "foragable",
  [ResourceType.ANIMALPRODUCT]: "animalProduct",
  [ResourceType.PAINT]: "paint",
  [ResourceType.MINERAL]: "mineral",
  [ResourceType.CRAFTABLE]: "craftable",
  [ResourceType.TROPHY]: "trophy",
  [ResourceType.SEED]: "seed",
  [ResourceType.FLOWER]: "flower",
  [ResourceType.RESOURCE]: "resource",
};

const CATEGORY_KEYS: Record<string, string> = {
  Buildings: "buildings",
  Tools: "tools",
  Weapons: "weapons",
  Equipment: "equipment",
  Vehicles: "vehicles",
  "Crafting Recipes": "craftingRecipes",
  "Cooking Recipes": "cookingRecipes",
  "Sign Writing Recipes": "signWritingRecipes",
  "Other Craftables": "otherCraftables",
};

/**
 * A value that has no name in the catalog reads as it came, because the data package may add
 * values before the catalog has them.
 */
export function useTerms() {
  const t = useTranslations("terms");

  const named = (group: Group, key: string) => {
    const path = `${group}.${key}`;
    return t.has(path as never) ? t(path as never) : key;
  };

  return {
    buff: (key: string) => named("buffs", key),
    category: (category: string) =>
      named("categories", CATEGORY_KEYS[category] ?? category),
    resourceType: (type: ResourceType) =>
      named("resourceTypes", RESOURCE_TYPE_KEYS[type] ?? type),
    daily: (category: string) => named("daily", category),
    animalType: (type: string) => named("animalTypes", type),
    temperament: (temperament: string) => named("temperaments", temperament),
    season: (season: string) => named("seasons", season),
    weekday: (weekday: string) => named("weekdays", weekday),
  };
}
