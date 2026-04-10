import { Biome, FilterArray, Tree } from "@/types";
import { getForagableById, getSeedById } from "./resources";

export const trees: Tree[] = [
  {
    id: "apple_tree",
    name: "Apple Tree",
    img: "/images/trees/Apple_Tree.png",
    itemsDropped: [
      {
        name: "Apple",
        count: 4,
        img: "/images/resources/foragables/Inv_Apple.png",
      },
    ],
    seed: getForagableById("apple"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "banana_tree",
    name: "Banana Tree",
    img: "/images/trees/Banana_Tree.png",
    itemsDropped: [
      {
        name: "Banana",
        count: 2,
        img: "/images/resources/foragables/Inv_Bananas.png",
      },
    ],
    seed: getForagableById("banana"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "blackwood_tree",
    name: "Blackwood Tree",
    img: "/images/trees/Blackwood_Tree.png",
    locations: ["Billabongs"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "/images/resources/foragables/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Backwood Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Blackwood_Seed.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "/images/resources/foragables/Bee_Hive.png",
      },
    ],
    seed: getSeedById("blackwood_seed"),
  },
  {
    id: "bottle_tree",
    name: "Bottle Tree",
    img: "/images/trees/Bottle_Tree.png",
    locations: ["Plains"],
    itemsDropped: [
      {
        name: "Bottle Tree Wood",
        count: 3,
        img: "/images/resources/foragables/Inv_Bottle_Tree_Wood.png",
      },
    ],
    seed: getSeedById("bottle_tree_seed"),
  },
  {
    id: "bush_lime_tree",
    name: "Bush Lime Tree",
    img: "/images/trees/Bush_Lime_Tree.png",
    itemsDropped: [
      {
        name: "Bush Lime",
        count: 3,
        img: "/images/resources/foragables/Inv_Bush_Lime.png",
      },
    ],
    seed: getForagableById("bush_lime"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "cherry_tree",
    name: "Cherry Tree",
    img: "/images/trees/Cherry_Tree.png",
    itemsDropped: [
      {
        name: "Cherry",
        count: 4,
        img: "/images/resources/foragables/Inv_Cherries.png",
      },
    ],
    seed: getForagableById("cherry"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "coconut_tree",
    name: "Coconut Tree",
    img: "/images/trees/Coconut_Tree.png",
    itemsDropped: [
      {
        name: "Coconut",
        count: 3,
        img: "/images/resources/foragables/Inv_Coconut.png",
      },
    ],
    seed: getForagableById("coconut"),
    growthPeriod: 5,
    regrowth: 10,
  },
  {
    id: "coral_acacia_tree",
    name: "Coral Acacia Tree",
    img: "/images/trees/Coral_Acacia_Tree.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "/images/resources/foragables/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Coral Acacia Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Coral_Acacia_Seed.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "/images/resources/foragables/Bee_Hive.png",
      },
    ],
    seed: getSeedById("coral_acacia_seed"),
  },
  {
    id: "grass_tree",
    name: "Grass Tree",
    img: "/images/trees/Grass_Tree.png",
    locations: ["Plains"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "/images/resources/foragables/Inv_Spinifex_Tuft.png",
      },
      {
        name: "Grass Tree Seed Pod",
        count: 1,
        img: "/images/trees/Inv_Grass_Tree_Seed_Pod.png",
      },
    ],
    seed: getSeedById("grass_tree_seed"),
  },
  {
    id: "gum_tree",
    name: "Gum Tree",
    img: "/images/trees/Gum_Tree.png",
    locations: ["Plains", "Bushlands"],
    itemsDropped: [
      {
        name: "Gum Log",
        count: 4,
        img: "/images/resources/foragables/Inv_Gum_Log.png",
      },
      {
        name: "Gum Nut",
        count: 1,
        img: "/images/resources/seeds/Inv_Gum_Nut.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "/images/resources/foragables/Bee_Hive.png",
      },
    ],
    seed: getSeedById("gum_nut"),
  },
  {
    id: "jacaranda_tree",
    name: "Jacaranda Tree",
    img: "/images/trees/Jacaranda_Tree.png",
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "/images/resources/foragables/Inv_Hard_Wood_Log.png",
      },
    ],
    seed: getSeedById("jacaranda_sapling"),
  },
  {
    id: "lilly_pilly",
    name: "Lilly Pilly",
    img: "/images/trees/Lilly_Pilly.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Lilly Pilly Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Lilly_Pilly_Seed.png",
      },
    ],
    seed: getSeedById("lilly_pilly_seed"),
  },
  {
    id: "mangrove_tree",
    name: "Mangrove Tree",
    img: "/images/trees/Mangrove_Tree.png",
    locations: ["Mangroves"],
    itemsDropped: [
      {
        name: "Mangrove Stick",
        count: 8,
        img: "/images/resources/foragables/Inv_Mangrove_Stick.png",
      },
    ],
    seed: undefined,
  },
  {
    id: "palm_tree",
    name: "Palm Tree",
    img: "/images/trees/Palm_Tree.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Palm Wood",
        count: 4,
        img: "/images/resources/foragables/Inv_Palm_Wood.png",
      },
      {
        name: "Palm Tree Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Palm_Tree_Seed.png",
      },
    ],
    seed: getSeedById("palm_tree_seed"),
  },
  {
    id: "pine_tree",
    name: "Pine Tree",
    img: "/images/trees/Pine_Tree.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "/images/resources/foragables/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Pine Cone",
        count: 1,
        img: "/images/resources/seeds/Inv_Pine_Cone.png",
      },
    ],
    seed: getSeedById("pine_cone"),
  },
  {
    id: "quandong_tree",
    name: "Quandong Tree",
    img: "/images/trees/Quandong_Tree.png",
    itemsDropped: [
      {
        name: "Quandong",
        count: 3,
        img: "/images/resources/foragables/Inv_Quandong.png",
      },
    ],
    seed: getForagableById("quandong"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "small_lilly_pilly",
    name: "Small Lilly Pilly",
    img: "/images/trees/Small_Lilly_Pilly.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Small Lilly Pilly Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Small_Lilly_Pilly_Seed.png",
      },
    ],
    seed: getSeedById("lilly_pilly_seed"),
  },
];

export const getUniqueTreeLocations = (): FilterArray => {
  const locations = new Set<string>();

  trees.forEach((tree) => {
    if (tree.locations) {
      tree.locations.forEach((location) => {
        locations.add(location);
      });
    }
  });

  return ["All", ...Array.from(locations).sort()];
};

export const getTreesByLocation = (data: Tree[], value: Biome): Tree[] => {
  return data.filter(
    (item) => item.locations && item.locations.includes(value),
  );
};

export const getTreesBySearchValue = (
  data: Tree[],
  searchValue: string,
): Tree[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
