import { Biome, FilterArray, Tree } from "@/types";
import { getForagableById, getSeedById } from "./resources";

export const trees: Tree[] = [
  {
    id: "apple_tree",
    name: "Apple Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bb/Apple_Tree.png",
    itemsDropped: [
      {
        name: "Apple",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
      },
    ],
    seed: getForagableById("apple"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "banana_tree",
    name: "Banana Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Banana_Tree.png",
    itemsDropped: [
      {
        name: "Banana",
        count: 2,
        img: "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
      },
    ],
    seed: getForagableById("banana"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "blackwood_tree",
    name: "Blackwood Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Blackwood_Tree.png",
    locations: ["Billabongs"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Backwood Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/1/19/Inv_Blackwood_Seed.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Bee_Hive.png",
      },
    ],
    seed: getSeedById("blackwood_seed"),
  },
  {
    id: "bottle_tree",
    name: "Bottle Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e2/Bottle_Tree.png",
    locations: ["Plains"],
    itemsDropped: [
      {
        name: "Bottle Tree Wood",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Inv_Bottle_Tree_Wood.png",
      },
    ],
    seed: getSeedById("bottle_tree_seed"),
  },
  {
    id: "bush_lime_tree",
    name: "Bush Lime Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e4/Bush_Lime_Tree.png",
    itemsDropped: [
      {
        name: "Bush Lime",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
      },
    ],
    seed: getForagableById("bush_lime"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "cherry_tree",
    name: "Cherry Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d3/Cherry_Tree.png",
    itemsDropped: [
      {
        name: "Cherry",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Cherries.png",
      },
    ],
    seed: getForagableById("cherry"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "coconut_tree",
    name: "Coconut Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Coconut_Tree.png",
    itemsDropped: [
      {
        name: "Coconut",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
      },
    ],
    seed: getForagableById("coconut"),
    growthPeriod: 5,
    regrowth: 10,
  },
  {
    id: "coral_acacia_tree",
    name: "Coral Acacia Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3e/Coral_Acacia_Tree.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Coral Acacia Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/c/ca/Inv_Coral_Acacia_Seed.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Bee_Hive.png",
      },
    ],
    seed: getSeedById("coral_acacia_seed"),
  },
  {
    id: "grass_tree",
    name: "Grass Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Grass_Tree.png",
    locations: ["Plains"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
      },
      {
        name: "Grass Tree Seed Pod",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/0/01/Inv_Grass_Tree_Seed_Pod.png",
      },
    ],
    seed: getSeedById("grass_tree_seed"),
  },
  {
    id: "gum_tree",
    name: "Gum Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/23/Gum_Tree.png",
    locations: ["Plains", "Bushlands"],
    itemsDropped: [
      {
        name: "Gum Log",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
      },
      {
        name: "Gum Nut",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/6/64/Inv_Gum_Nut.png",
      },
      {
        name: "Bee Hive",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Bee_Hive.png",
      },
    ],
    seed: getSeedById("gum_nut"),
  },
  {
    id: "jacaranda_tree",
    name: "Jacaranda Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/53/Jacaranda_Tree.png",
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
      },
    ],
    seed: getSeedById("jacaranda_sapling"),
  },
  {
    id: "lilly_pilly_tree",
    name: "Lilly Pilly Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/86/Lilly_Pilly_Tree.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Lilly Pilly Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/5/57/Inv_Lilly_Pilly_Seed.png",
      },
    ],
    seed: getSeedById("lilly_pilly_seed"),
  },
  {
    id: "mangrove_tree",
    name: "Mangrove Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Mangrove_Tree.png",
    locations: ["Mangroves"],
    itemsDropped: [
      {
        name: "Mangrove Stick",
        count: 8,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
      },
    ],
    seed: undefined,
  },
  {
    id: "palm_tree",
    name: "Palm Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Palm_Tree.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Palm Wood",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
      },
      {
        name: "Palm Tree Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Palm_Tree_Seed.png",
      },
    ],
    seed: getSeedById("palm_tree_seed"),
  },
  {
    id: "pine_tree",
    name: "Pine Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d4/Pine_Tree.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Hard Wood Log",
        count: 4,
        img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
      },
      {
        name: "Pine Cone",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Pine_Cone.png",
      },
    ],
    seed: getSeedById("pine_cone"),
  },
  {
    id: "quandong_tree",
    name: "Quandong Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0c/Quandong_Tree.png",
    itemsDropped: [
      {
        name: "Quandong",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Quandong.png",
      },
    ],
    seed: getForagableById("quandong"),
    growthPeriod: 12,
    regrowth: 6,
  },
  {
    id: "small_lilly_pilly_tree",
    name: "Small Lilly Pilly Tree",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Small_Lilly_Pilly_Tree.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Small Lilly Pilly Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/e/e6/Inv_Small_Lilly_Pilly_Seed.png",
      },
    ],
    seed: getSeedById("lilly_pilly_seed"),
  },
];

export const getUniqueTreeLocations = (): FilterArray => {
  const locations = new Set<string>();
  locations.add("All");

  trees.forEach((tree) => {
    if (tree.locations) {
      tree.locations.forEach((location) => {
        locations.add(location);
      });
    }
  });

  return Array.from(locations);
};

export const getTreesByLocation = (data: Tree[], biome: Biome): Tree[] => {
  return data.filter(
    (item) => item.locations && item.locations.includes(biome),
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
