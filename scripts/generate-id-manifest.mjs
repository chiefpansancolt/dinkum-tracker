import * as data from "dinkum-data";
import { writeFileSync } from "node:fs";

const COLLECTIONS = [
  "fish",
  "bugs",
  "critters",
  "licenses",
  "milestones",
  "buildings",
  "npcs",
  "skills",
  "books",
  "cassettes",
  "tools",
  "weapons",
  "equipment",
  "vehicles",
  "clothing",
  "furniture",
  "decorations",
  "cookingRecipes",
  "craftingRecipes",
  "signWritingRecipes",
];

const manifest = {};
for (const name of COLLECTIONS) {
  const items = Object.values(data[name]()).flat();
  manifest[name] = Object.fromEntries(
    items.map((item) => [item.id, item.levels ? item.levels.length : 0]),
  );
}

writeFileSync(
  new URL("../tests/data/ids.manifest.json", import.meta.url),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
