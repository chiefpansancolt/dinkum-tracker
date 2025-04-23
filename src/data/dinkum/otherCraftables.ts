import { Recipe } from "@/types";

export const otherCraftables: Recipe[] = [
  {
    id: "animal_food",
    name: "Animal Food",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/55/Inv_Animal_Food.png",
    outputCount: "Varies",
    variants: [
      {
        id: "corn",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Corn",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Corn.png",
          },
        ],
      },
      {
        id: "fir_grass_seeds",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Fir Grass Seed",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Fir_Grass_Seeds.png",
          },
        ],
      },
      {
        id: "grass_seeds",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Grass Seed",
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Grass_Seed.png",
          },
        ],
      },
      {
        id: "tropical_grass_seeds",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Tropical Grass Seed",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b3/Inv_Tropical_Grass_Seeds.png",
          },
        ],
      },
    ],
    source: ["Grain Mill"],
    baseSellPrice: 50,
  },
  {
    id: "cheese",
    name: "Cheese",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Cheese.png",
    outputCount: 1,
    variants: [
      {
        id: "milk",
        inputs: [
          {
            count: 1,
            name: "Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Milk.png",
          },
        ],
      },
      {
        id: "high_quality_cheese",
        inputs: [
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
        ],
      },
    ],
    source: ["Cheese Maker"],
    baseSellPrice: 2400,
    buffs: {
      length: 10,
      healthRegenRate: 1,
      healthMax: 15,
      staminaRegenRate: 2,
      staminaMax: 15,
    },
  },
  {
    id: "fertilizer",
    name: "Fertilizer",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Fertilizer.png",
    outputCount: "Varies",
    variants: [
      {
        id: "alpha_antler",
        outputCount: 8,
        inputs: [
          {
            count: 8,
            name: "Alpha Antler",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Inv_Alpha_Antler.png",
          },
        ],
      },
      {
        id: "alpha_eye",
        outputCount: 8,
        inputs: [
          {
            count: 8,
            name: "Alpha Eye",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4c/Inv_Alpha_Eye.png",
          },
        ],
      },
      {
        id: "alpha_scale",
        outputCount: 8,
        inputs: [
          {
            count: 8,
            name: "Alpha Scale",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/31/Inv_Alpha_Scale.png",
          },
        ],
      },
      {
        id: "bone",
        outputCount: 1,
        inputs: [
          {
            count: 8,
            name: "Bone",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Bone.png",
          },
        ],
      },
      {
        id: "buccinidae_shell",
        outputCount: 1,
        inputs: [
          {
            count: 25,
            name: "Buccinidae Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Buccinidae_Shell.png",
          },
        ],
      },
      {
        id: "cassidae_shell",
        outputCount: 1,
        inputs: [
          {
            count: 25,
            name: "Cassidae Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Cassidae_Shell.png",
          },
        ],
      },
      {
        id: "nautilus_shell",
        outputCount: 1,
        inputs: [
          {
            count: 15,
            name: "Nautilus Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d8/Inv_Nautilus_Shell.png",
          },
        ],
      },
      {
        id: "roo_poo",
        outputCount: 1,
        inputs: [
          {
            count: 4,
            name: "Roo Poo",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/9b/Inv_Roo_Poo.png",
          },
        ],
      },
      {
        id: "sand_dollar",
        outputCount: 1,
        inputs: [
          {
            count: 15,
            name: "Sand Dollar",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Sand_Dollar.png",
          },
        ],
      },
      {
        id: "scallop_Shell",
        outputCount: 1,
        inputs: [
          {
            count: 25,
            name: "Scallop Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Scallop_Shell.png",
          },
        ],
      },
      {
        id: "syrinx_shell",
        outputCount: 1,
        inputs: [
          {
            count: 10,
            name: "Syrinx Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Syrinx_Shell.png",
          },
        ],
      },
      {
        id: "tonnidae_shell",
        outputCount: 1,
        inputs: [
          {
            count: 25,
            name: "Tonnidae Shell",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6e/Inv_Tonnidae_Shell.png",
          },
        ],
      },
      {
        id: "vombat_poo",
        outputCount: 1,
        inputs: [
          {
            count: 2,
            name: "Vombat Poo",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Vombat_Poo.png",
          },
        ],
      },
    ],
    source: ["Compost Bin", "Worm Farm"],
    baseSellPrice: 156,
  },
  {
    id: "flour",
    name: "Flour",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 4,
            name: "Wheat",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/78/Inv_Wheat.png",
          },
        ],
      },
    ],
    source: ["Grain Mill"],
    baseSellPrice: 1080,
    buffs: {
      length: 5,
      healthRegenRate: 1,
      staminaRegenRate: 0.2,
    },
  },
  {
    id: "high_quality_cheese",
    name: "High Quality Cheese",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
        ],
      },
    ],
    source: ["Cheese Maker"],
    baseSellPrice: 3500,
    buffs: {
      length: 10,
      healthRegenRate: 1,
      healthMax: 20,
      staminaRegenRate: 2,
      staminaMax: 20,
    },
  },
  {
    id: "ice_cream",
    name: "Ice Cream",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/69/Inv_Ice_Cream.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
        ],
      },
    ],
    source: ["Ice Cream Maker"],
    baseSellPrice: 3500,
    buffs: {
      length: 10,
      healthRegenRate: 1,
      healthMax: 20,
      staminaRegenRate: 3,
      staminaMax: 20,
      coolLevel: 2,
    },
  },
  {
    id: "sugar",
    name: "Sugar",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Sugar Cane",
            img: "https://static.wikia.nocookie.net/dinkum/images/8/84/Inv_Sugar_Cane.png",
          },
        ],
      },
    ],
    source: ["Grain Mill"],
    baseSellPrice: 840,
    buffs: {
      length: 5,
      staminaRegenRate: 4,
      staminaMax: 5,
    },
  },
  {
    id: "watermelon_popsicle",
    name: "Watermelon Popsicle",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/67/Inv_Watermelon_Popsicle.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Watermelon",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/da/Inv_Watermelon.png",
          },
        ],
      },
    ],
    source: ["Ice Cream Maker"],
    baseSellPrice: 3580,
    buffs: {
      length: 10,
      healthRegenRate: 3,
      healthMax: 20,
      staminaRegenRate: 5,
      staminaMax: 10,
      coolLevel: 2,
    },
  },
  {
    id: "gum_wood_plank",
    name: "Gum Wood Plank",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Gum Log",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
        ],
      },
    ],
    baseSellPrice: 150,
  },
  {
    id: "hard_wood_plank",
    name: "Hard Wood Plank",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "hard_wood_log",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Log",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
          },
        ],
      },
      {
        id: "bottle_tree_wood",
        inputs: [
          {
            count: 1,
            name: "Bottle Tree Wood",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Inv_Bottle_Tree_Wood.png",
          },
        ],
      },
    ],
    baseSellPrice: 250,
  },
  {
    id: "palm_wood_plank",
    name: "Palm Wood Plank",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Palm Wood",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
          },
        ],
      },
    ],
    baseSellPrice: 225,
  },
  {
    id: "spinifex_resin",
    name: "Spinifex Resin",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
    source: ["Campfire", "BBQ"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Spinifex Tuft",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
        ],
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "bag_of_cement",
    name: "Bag of Cement",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
    source: ["Stone Grinder"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "aquamarine_shard",
    name: "Aquamarine Shard",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3c/Inv_Aquamarine_Shard.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Aquamarine Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Aquamarine.png",
          },
        ],
      },
    ],
    baseSellPrice: 2000,
  },
  {
    id: "perfect_aquamarine",
    name: "Perfect Aquamarine",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Perfect_Aquamarine.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Aquamarine Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Aquamarine.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "ruby_shard",
    name: "Ruby Shard",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
    source: ["Crusher", "Jimmy's Boat"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Ruby Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Ruby.png",
          },
        ],
      },
    ],
    buyPrice: 40000,
    baseSellPrice: 2000,
  },
  {
    id: "perfect_ruby",
    name: "Perfect Ruby",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Perfect_Ruby.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Ruby Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Ruby.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "emerald_shard",
    name: "Emerald Shard",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
    source: ["Crusher", "Jimmy's Boat"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Emerald Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6a/Emerald.png",
          },
        ],
      },
    ],
    buyPrice: 100000,
    baseSellPrice: 5000,
  },
  {
    id: "perfect_emerald",
    name: "Perfect Emerald",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8b/Inv_Perfect_Emerald.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Emerald Gemstone",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6a/Emerald.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "berkonium_bar",
    name: "Berkonium Bar",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
    source: ["Blast Furnace"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 5,
            name: "Berkonium Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Berkonium_Ore.png",
          },
        ],
      },
    ],
    baseSellPrice: 10000,
  },
  {
    id: "iron_bar",
    name: "Iron Bar",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
    source: ["John's Goods", "Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Iron Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
          },
        ],
      },
      {
        id: "blast_furance",
        outputCount: 2,
        inputs: [
          {
            count: 5,
            name: "Iron Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
          },
        ],
      },
      {
        id: "shiny_stone",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Shiny Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    buyPrice: 4000,
    baseSellPrice: 2000,
  },
  {
    id: "copper_bar",
    name: "Copper Bar",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
    source: ["John's Goods", "Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Copper Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
          },
        ],
      },
      {
        id: "blast_furnace",
        outputCount: 2,
        inputs: [
          {
            count: 5,
            name: "Copper Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Inv_Copper_Ore.png",
          },
        ],
      },
      {
        id: "shiny_stone",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Shiny Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    buyPrice: 2000,
    baseSellPrice: 1000,
  },
  {
    id: "tin_bar",
    name: "Tin Bar",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
    source: ["Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Tin Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Tin_Ore.png",
          },
        ],
      },
      {
        id: "blast_furnace",
        outputCount: 2,
        inputs: [
          {
            count: 5,
            name: "Tin Ore",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Tin_Ore.png",
          },
        ],
      },
      {
        id: "tin_sheet",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Tin Sheet",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
      {
        id: "shiny_stone",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Shiny Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 500,
  },
  {
    id: "meteorite_chunk",
    name: "Meteorite Chunk",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Meteorite_Chunk.png",
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Meteorite",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/9e/Meteorite.png",
          },
        ],
      },
    ],
    baseSellPrice: 16000,
  },
  {
    id: "opal",
    name: "Opal",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
    source: [
      "Deep Mines",
      "Thunder Egg",
      "Gacha Machine",
      "Stone Grinder",
      "Opal Ore Rocks",
      "Jimmy's Boat",
    ],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Shiny Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 15000,
  },
  {
    id: "tin_sheet",
    name: "Tin Sheet",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
    source: ["Table Saw", "Improved Table Saw", "Old Barrel"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Tin Bar",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
    baseSellPrice: 275,
  },
  {
    id: "cloth",
    name: "Cloth",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
    source: ["Spinning Wheel"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Wool",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Wool.png",
          },
        ],
      },
    ],
    baseSellPrice: 5150,
  },
];
