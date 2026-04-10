import { npcs } from "@/data/dinkum/npcs";
import { bugs } from "@/data/dinkum/pedia/bugs";
import { critters } from "@/data/dinkum/pedia/critters";
import { fish } from "@/data/dinkum/pedia/fish";
import { buildings } from "@/data/dinkum/buildings";
import { clothing } from "@/data/dinkum/clothing";
import { furniture } from "@/data/dinkum/furniture";
import { licenses } from "@/data/dinkum/licences";
import { milestones } from "@/data/dinkum/milestones";
import { skills } from "@/data/dinkum/skills";
import { books } from "@/data/dinkum/gearAndEquipment/books";
import { cassettes } from "@/data/dinkum/gearAndEquipment/cassettes";
import { equipment } from "@/data/dinkum/gearAndEquipment/equipment";
import { tools } from "@/data/dinkum/gearAndEquipment/tools";
import { vehicles } from "@/data/dinkum/gearAndEquipment/vehicles";
import { weapons } from "@/data/dinkum/gearAndEquipment/weapons";
import { cookingRecipes } from "@/data/dinkum/recipes/cookingRecipes";
import { craftingRecipes } from "@/data/dinkum/recipes/craftingRecipes";
import { signWritingRecipes } from "@/data/dinkum/recipes/signWritingRecipes";

export interface SearchEntry {
  id: string;
  name: string;
  nameLower: string;
  img: string;
  category: string;
  route: string;
  noQuery?: boolean;
}

function toEntries(
  items: { id: string; name: string; img: string }[],
  category: string,
  route: string,
  noQuery?: boolean,
): SearchEntry[] {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    nameLower: item.name.toLowerCase(),
    img: item.img,
    category,
    route,
    ...(noQuery ? { noQuery: true } : {}),
  }));
}

export const searchIndex: SearchEntry[] = [
  ...toEntries(npcs, "NPCs", "npcs", true),
  ...toEntries(fish, "Fish", "fish"),
  ...toEntries(bugs, "Bugs", "bugs"),
  ...toEntries(critters, "Critters", "critters"),
  ...toEntries(milestones, "Milestones", "milestones"),
  ...toEntries(licenses, "Licenses", "licenses"),
  ...toEntries(buildings, "Buildings", "buildings"),
  ...toEntries(skills, "Skills", "skills"),
  ...toEntries(cookingRecipes, "Cooking Recipes", "cookingRecipes"),
  ...toEntries(craftingRecipes, "Crafting Recipes", "craftingRecipes"),
  ...toEntries(signWritingRecipes, "Sign Writing", "signWritingRecipes"),
  ...toEntries(books, "Books", "books"),
  ...toEntries(cassettes, "Cassettes", "cassettes"),
  ...toEntries(tools, "Tools", "tools"),
  ...toEntries(weapons, "Weapons", "weapons"),
  ...toEntries(equipment, "Equipment", "equipment"),
  ...toEntries(vehicles, "Vehicles", "vehicles"),
  ...toEntries(clothing, "Clothing", "clothing"),
  ...toEntries(furniture, "Furniture", "furniture"),
];
