import {
  books,
  bugs,
  buildings,
  cassettes,
  clothing,
  cookingRecipes,
  craftingRecipes,
  critters,
  equipment,
  fish,
  furniture,
  licenses,
  milestones,
  npcs,
  signWritingRecipes,
  skills,
  tools,
  vehicles,
  weapons,
} from "dinkum-data";

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
  ...toEntries(npcs().get(), "NPCs", "npcs", true),
  ...toEntries(fish().get(), "Fish", "fish"),
  ...toEntries(bugs().get(), "Bugs", "bugs"),
  ...toEntries(critters().get(), "Critters", "critters"),
  ...toEntries(milestones().get(), "Milestones", "milestones"),
  ...toEntries(licenses().get(), "Licenses", "licenses"),
  ...toEntries(buildings().get(), "Buildings", "buildings"),
  ...toEntries(skills().get(), "Skills", "skills"),
  ...toEntries(cookingRecipes().get(), "Cooking Recipes", "cookingRecipes"),
  ...toEntries(craftingRecipes().get(), "Crafting Recipes", "craftingRecipes"),
  ...toEntries(
    signWritingRecipes().get(),
    "Sign Writing",
    "signWritingRecipes",
  ),
  ...toEntries(books().get(), "Books", "books"),
  ...toEntries(cassettes().get(), "Cassettes", "cassettes"),
  ...toEntries(tools().get(), "Tools", "tools"),
  ...toEntries(weapons().get(), "Weapons", "weapons"),
  ...toEntries(equipment().get(), "Equipment", "equipment"),
  ...toEntries(vehicles().get(), "Vehicles", "vehicles"),
  ...toEntries(clothing().get(), "Clothing", "clothing"),
  ...toEntries(furniture().get(), "Furniture", "furniture"),
];
