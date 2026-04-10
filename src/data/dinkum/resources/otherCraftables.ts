import { Recipe } from "@/types";

export const otherCraftables: Recipe[] = [
  {
    id: "animal_food",
    name: "Animal Food",
    img: "/images/resources/otherCraftables/Inv_Animal_Food.png",
    outputCount: "Varies",
    variants: [
      {
        id: "corn",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Corn",
            img: "/images/resources/crops/Inv_Corn.png",
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
            img: "/images/resources/seeds/Inv_Fir_Grass_Seeds.png",
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
            img: "/images/resources/seeds/Inv_Grass_Seed.png",
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
            img: "/images/resources/seeds/Inv_Tropical_Grass_Seeds.png",
          },
        ],
      },
    ],
    source: ["Grain Mill"],
    baseSellPrice: 50,
  },
  {
    id: "aquamarine_shard",
    name: "Aquamarine Shard",
    img: "/images/resources/otherCraftables/Inv_Aquamarine_Shard.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Aquamarine Gemstone",
            img: "/images/resources/minerals/Aquamarine.png",
          },
        ],
      },
    ],
    baseSellPrice: 2000,
  },
  {
    id: "bag_of_cement",
    name: "Bag of Cement",
    img: "/images/resources/otherCraftables/Inv_Bag_of_Cement.png",
    source: ["Stone Grinder"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Stone",
            img: "/images/resources/minerals/Inv_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "berkonium_bar",
    name: "Berkonium Bar",
    img: "/images/resources/otherCraftables/Inv_Berkonium_Bar.png",
    source: ["Blast Furnace"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 5,
            name: "Berkonium Ore",
            img: "/images/resources/minerals/Inv_Berkonium_Ore.png",
          },
        ],
      },
    ],
    baseSellPrice: 10000,
  },
  {
    id: "cheese",
    name: "Cheese",
    img: "/images/recipes/cookingRecipes/Inv_Cheese.png",
    outputCount: 1,
    variants: [
      {
        id: "milk",
        inputs: [
          {
            count: 1,
            name: "Milk",
            img: "/images/resources/animalProducts/Inv_Milk.png",
          },
        ],
      },
      {
        id: "high_quality_cheese",
        inputs: [
          {
            count: 1,
            name: "High Quality Cheese",
            img: "/images/recipes/cookingRecipes/Inv_High_Quality_Cheese.png",
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
    id: "cloth",
    name: "Cloth",
    img: "/images/resources/otherCraftables/Inv_Cloth.png",
    source: ["Spinning Wheel"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Wool",
            img: "/images/resources/animalProducts/Inv_Wool.png",
          },
        ],
      },
    ],
    baseSellPrice: 5150,
  },
  {
    id: "copper_bar",
    name: "Copper Bar",
    img: "/images/resources/otherCraftables/Inv_Copper_Bar.png",
    source: ["John's Goods", "Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Copper Ore",
            img: "/images/resources/minerals/Inv_Copper_Ore.png",
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
            img: "/images/resources/minerals/Inv_Copper_Ore.png",
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
            img: "/images/resources/minerals/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    buyPrice: 2000,
    baseSellPrice: 1000,
  },
  {
    id: "emerald_shard",
    name: "Emerald Shard",
    img: "/images/resources/otherCraftables/Inv_Emerald_Shard.png",
    source: ["Crusher", "Jimmy's Boat"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Emerald Gemstone",
            img: "/images/resources/minerals/Emerald.png",
          },
        ],
      },
    ],
    buyPrice: 100000,
    baseSellPrice: 5000,
  },
  {
    id: "fertilizer",
    name: "Fertilizer",
    img: "/images/resources/otherCraftables/Inv_Fertilizer.png",
    outputCount: "Varies",
    variants: [
      {
        id: "alpha_antler",
        outputCount: 8,
        inputs: [
          {
            count: 8,
            name: "Alpha Antler",
            img: "/images/resources/animalProducts/Inv_Alpha_Antler.png",
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
            img: "/images/resources/animalProducts/Inv_Alpha_Eye.png",
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
            img: "/images/resources/animalProducts/Inv_Alpha_Scale.png",
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
            img: "/images/resources/animalProducts/Inv_Bone.png",
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
            img: "/images/resources/foragables/Inv_Buccinidae_Shell.png",
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
            img: "/images/resources/foragables/Inv_Cassidae_Shell.png",
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
            img: "/images/resources/foragables/Inv_Nautilus_Shell.png",
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
            img: "/images/resources/animalProducts/Inv_Roo_Poo.png",
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
            img: "/images/resources/foragables/Inv_Sand_Dollar.png",
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
            img: "/images/resources/foragables/Inv_Scallop_Shell.png",
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
            img: "/images/resources/foragables/Inv_Syrinx_Shell.png",
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
            img: "/images/resources/foragables/Inv_Tonnidae_Shell.png",
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
            img: "/images/resources/animalProducts/Inv_Vombat_Poo.png",
          },
        ],
      },
    ],
    source: ["Compost Bin", "Worm Farm"],
    baseSellPrice: 156,
  },
  {
    id: "flame_jelly_bed",
    name: "Flame Jelly Bed",
    img: "/images/resources/otherCraftables/Inv_Flame_Jelly_Bed.png",
    outputCount: 5,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flame Jelly",
            img: "/images/resources/animalProducts/Inv_Flame_Jelly.png",
          },
        ],
      },
    ],
    source: ["Furnace", "Blast Furnace"],
    baseSellPrice: 940,
  },
  {
    id: "flour",
    name: "Flour",
    img: "/images/resources/otherCraftables/Inv_Flour.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 4,
            name: "Wheat",
            img: "/images/resources/crops/Inv_Wheat.png",
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
    id: "gold_bar",
    name: "Gold Bar",
    img: "/images/resources/otherCraftables/Inv_Gold_Bar.png",
    source: ["Furnace", "Blast Furnace"],
    variants: [
      {
        id: "furnace",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Gold Ore",
            img: "/images/resources/minerals/Inv_Gold_Ore.png",
          },
        ],
      },
      {
        id: "blast_furnace",
        outputCount: 2,
        inputs: [
          {
            count: 5,
            name: "Gold Ore",
            img: "/images/resources/minerals/Inv_Gold_Ore.png",
          },
        ],
      },
    ],
    baseSellPrice: 300000,
  },
  {
    id: "gum_wood_plank",
    name: "Gum Wood Plank",
    img: "/images/resources/otherCraftables/Inv_Gum_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Gum Log",
            img: "/images/resources/foragables/Inv_Gum_Log.png",
          },
        ],
      },
    ],
    baseSellPrice: 150,
  },
  {
    id: "hard_wood_plank",
    name: "Hard Wood Plank",
    img: "/images/resources/otherCraftables/Inv_Hard_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "hard_wood_log",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Log",
            img: "/images/resources/foragables/Inv_Hard_Wood_Log.png",
          },
        ],
      },
      {
        id: "bottle_tree_wood",
        inputs: [
          {
            count: 1,
            name: "Bottle Tree Wood",
            img: "/images/resources/foragables/Inv_Bottle_Tree_Wood.png",
          },
        ],
      },
    ],
    baseSellPrice: 250,
  },
  {
    id: "high_quality_cheese",
    name: "High Quality Cheese",
    img: "/images/recipes/cookingRecipes/Inv_High_Quality_Cheese.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "High Quality Milk",
            img: "/images/resources/animalProducts/Inv_High_Quality_Milk.png",
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
    img: "/images/resources/otherCraftables/Inv_Ice_Cream.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "High Quality Milk",
            img: "/images/resources/animalProducts/Inv_High_Quality_Milk.png",
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
    id: "iron_bar",
    name: "Iron Bar",
    img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
    source: ["John's Goods", "Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Iron Ore",
            img: "/images/resources/minerals/Inv_Iron_Ore.png",
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
            img: "/images/resources/minerals/Inv_Iron_Ore.png",
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
            img: "/images/resources/minerals/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    buyPrice: 4000,
    baseSellPrice: 2000,
  },
  {
    id: "meteorite_chunk",
    name: "Meteorite Chunk",
    img: "/images/resources/minerals/Inv_Meteorite_Chunk.png",
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Meteorite",
            img: "/images/resources/minerals/Meteorite.png",
          },
        ],
      },
    ],
    baseSellPrice: 16000,
  },
  {
    id: "opal",
    name: "Opal",
    img: "/images/resources/otherCraftables/Inv_Opal.png",
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
            img: "/images/resources/minerals/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 15000,
  },
  {
    id: "palm_wood_plank",
    name: "Palm Wood Plank",
    img: "/images/resources/otherCraftables/Inv_Palm_Wood_Plank.png",
    source: ["Table Saw", "Improved Table Saw"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Palm Wood",
            img: "/images/resources/foragables/Inv_Palm_Wood.png",
          },
        ],
      },
    ],
    baseSellPrice: 225,
  },
  {
    id: "perfect_aquamarine",
    name: "Perfect Aquamarine",
    img: "/images/resources/minerals/Inv_Perfect_Aquamarine.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Aquamarine Gemstone",
            img: "/images/resources/minerals/Aquamarine.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "perfect_emerald",
    name: "Perfect Emerald",
    img: "/images/resources/minerals/Inv_Perfect_Emerald.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Emerald Gemstone",
            img: "/images/resources/minerals/Emerald.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "perfect_ruby",
    name: "Perfect Ruby",
    img: "/images/resources/minerals/Inv_Perfect_Ruby.png",
    source: ["Crusher"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Ruby Gemstone",
            img: "/images/resources/minerals/Ruby.png",
          },
        ],
      },
    ],
    baseSellPrice: 75000,
  },
  {
    id: "ruby_shard",
    name: "Ruby Shard",
    img: "/images/resources/otherCraftables/Inv_Ruby_Shard.png",
    source: ["Crusher", "Jimmy's Boat"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Ruby Gemstone",
            img: "/images/resources/minerals/Ruby.png",
          },
        ],
      },
    ],
    buyPrice: 40000,
    baseSellPrice: 2000,
  },
  {
    id: "silk",
    name: "Silk",
    img: "/images/resources/otherCraftables/Inv_Silk.png",
    source: ["Spinning Wheel"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Cocoon",
            img: "/images/resources/animalProducts/Inv_Cocoon.png",
          },
        ],
      },
    ],
    baseSellPrice: 0,
  },
  {
    id: "spinifex_resin",
    name: "Spinifex Resin",
    img: "/images/resources/otherCraftables/Inv_Spinifex_Resin.png",
    source: ["Campfire", "BBQ"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Spinifex Tuft",
            img: "/images/resources/foragables/Inv_Spinifex_Tuft.png",
          },
        ],
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "sugar",
    name: "Sugar",
    img: "/images/resources/otherCraftables/Inv_Sugar.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Sugar Cane",
            img: "/images/resources/crops/Inv_Sugar_Cane.png",
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
    id: "tin_bar",
    name: "Tin Bar",
    img: "/images/resources/otherCraftables/Inv_Tin_Bar.png",
    source: ["Crude Furnace", "Furnace", "Blast Furnace"],
    variants: [
      {
        id: "standard",
        outputCount: 1,
        inputs: [
          {
            count: 5,
            name: "Tin Ore",
            img: "/images/resources/minerals/Inv_Tin_Ore.png",
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
            img: "/images/resources/minerals/Inv_Tin_Ore.png",
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
            img: "/images/resources/otherCraftables/Inv_Tin_Sheet.png",
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
            img: "/images/resources/minerals/Inv_Shiny_Stone.png",
          },
        ],
      },
    ],
    baseSellPrice: 500,
  },
  {
    id: "tin_sheet",
    name: "Tin Sheet",
    img: "/images/resources/otherCraftables/Inv_Tin_Sheet.png",
    source: ["Table Saw", "Improved Table Saw", "Old Barrel"],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Tin Bar",
            img: "/images/resources/otherCraftables/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
    baseSellPrice: 275,
  },
  {
    id: "watermelon_popsicle",
    name: "Watermelon Popsicle",
    img: "/images/resources/otherCraftables/Inv_Watermelon_Popsicle.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Watermelon",
            img: "/images/resources/crops/Inv_Watermelon.png",
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
    id: "insta_grow",
    name: "Insta-Grow",
    img: "/images/resources/otherCraftables/Inv_Insta-Grow.png",
    outputCount: "Varies",
    variants: [
      {
        id: "alpha_antler",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Alpha Antler",
            img: "/images/resources/animalProducts/Inv_Alpha_Antler.png",
          },
        ],
      },
      {
        id: "alpha_eye",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Alpha Eye",
            img: "/images/resources/animalProducts/Inv_Alpha_Eye.png",
          },
        ],
      },
      {
        id: "alpha_scale",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Alpha Scale",
            img: "/images/resources/animalProducts/Inv_Alpha_Scale.png",
          },
        ],
      },
      {
        id: "alpha_shark_tooth",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Alpha Shark Tooth",
            img: "/images/resources/animalProducts/Inv_Alpha_Shark_Tooth.png",
          },
        ],
      },
    ],
    source: ["Compost Bin"],
    baseSellPrice: 1200,
  },
  {
    id: "season_all",
    name: "Season-All",
    img: "/images/resources/otherCraftables/Inv_Season-All.png",
    outputCount: "Varies",
    variants: [
      {
        id: "tropical_grass_turf_roll",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Tropical Grass Turf Roll",
            img: "/images/resources/foragables/Inv_Tropical_Grass_Turf_Roll.png",
          },
        ],
      },
    ],
    source: ["Compost Bin"],
    baseSellPrice: 156,
  },
];
