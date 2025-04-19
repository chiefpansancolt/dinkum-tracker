import { Tool } from "@/types/dinkum";

export const tools: Tool[] = [
  {
    id: "animal_trap",
    name: "Animal Trap",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/94/Inv_Animal_Trap.png",
    damage: null,
    licence: "Trapping",
    source: ["Crafting Table"],
    baseSellPrice: 4025,
  },
  {
    id: "basic_axe",
    name: "Basic Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Basic_Axe.png",
    damage: 2,
    licence: "Logging",
    source: ["John's Goods"],
    buyPrice: 1000,
    buyUnits: "Dinks",
    baseSellPrice: 500,
  },
  {
    id: "basic_pickaxe",
    name: "Basic Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f1/Inv_Basic_Pickaxe.png",
    damage: 1,
    licence: "Mining",
    source: ["John's Goods"],
    buyPrice: 1200,
    buyUnits: "Dinks",
    baseSellPrice: 600,
  },
  {
    id: "basic_watering_can",
    name: "Basic Watering Can",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Watering_Can.png",
    damage: null,
    licence: "Farming",
    source: ["Rayne's Greenhouse"],
    buyPrice: 10000,
    buyUnits: "Dinks",
    baseSellPrice: 5000,
  },
  {
    id: "bomb",
    name: "Bomb",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8b/Inv_Bomb.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 0,
    inputs: [
      {
        name: "Fertilizer",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Fertilizer.png",
        count: 1,
      },
      {
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
        count: 2,
      },
      {
        name: "Sugar",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
        count: 1,
      },
      {
        name: "Crocodile Tooth",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/0b/Inv_Crocodile_Tooth.png",
        count: 2,
      },
    ],
    buyPrice: 10000,
    buyUnits: "Dinks",
    baseSellPrice: 5000,
  },
  {
    id: "bug_net",
    name: "Bug Net",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/92/Inv_Bug_Net.png",
    damage: null,
    licence: "",
    source: ["John's Goods"],
    buyPrice: 1100,
    buyUnits: "Dinks",
    baseSellPrice: 550,
  },
  {
    id: "camera",
    name: "Camera",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ae/Inv_Camera.png",
    damage: null,
    licence: "",
    source: ["Museum"],
    buyPrice: 16000,
    buyUnits: "Dinks",
    baseSellPrice: 8000,
  },
  {
    id: "camera_tripod",
    name: "Camera Tripod",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d6/Inv_Camera_Tripod.png",
    damage: null,
    licence: "",
    source: ["Museum"],
    buyPrice: 24000,
    buyUnits: "Dinks",
    baseSellPrice: 12000,
  },
  {
    id: "candy_axe",
    name: "Candy Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Candy_Axe.png",
    damage: 3,
    licence: "Logging",
    source: ["Nick", "Real life December"],
    baseSellPrice: 4000,
  },
  {
    id: "candy_pickaxe",
    name: "Candy Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e1/Inv_Candy_Pickaxe.png",
    damage: 2,
    licence: "Mining",
    source: ["Nick", "Real life December"],
    baseSellPrice: 4000,
  },
  {
    id: "chainsaw",
    name: "Chainsaw",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f0/Inv_Chainsaw.png",
    damage: 3,
    licence: "Logging",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 13,
    inputs: [
      {
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
        count: 5,
      },
      {
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
        count: 2,
      },
      {
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
        count: 1,
      },
      {
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
        count: 8,
      },
      {
        name: "Table Saw",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/85/Inv_Table_Saw.png",
        count: 1,
      },
    ],
    buyPrice: 100000,
    buyUnits: "Dinks",
    baseSellPrice: 50000,
  },
  {
    id: "chicken_whistle",
    name: "Chicken Whistle",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1b/Inv_Chicken_Whistle.png",
    damage: null,
    licence: "",
    source: ["Irwin's Barn"],
    buyPrice: 10376,
    buyUnits: "Dinks",
    baseSellPrice: 5188,
  },
  {
    id: "comp_bug_net",
    name: "Comp Bug Net",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/54/Inv_Comp_Bug_Net.png",
    damage: null,
    licence: "",
    source: ["Julia"],
    buyPrice: 4400,
    buyUnits: "Dinks",
    baseSellPrice: 2200,
  },
  {
    id: "comp_fishing_rod",
    name: "Comp Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Comp_Fishing_Rod.png",
    damage: null,
    licence: "",
    source: ["Max"],
    buyPrice: 4076,
    buyUnits: "Dinks",
    baseSellPrice: 2038,
  },
  {
    id: "compactor",
    name: "Compactor",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Compactor.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 10,
    inputs: [
      {
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
        count: 5,
      },
      {
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
        count: 2,
      },
      {
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
        count: 1,
      },
      {
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
        count: 6,
      },
      {
        name: "Shovel",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Shovel.png",
        count: 1,
      },
    ],
    buyPrice: 50000,
    buyUnits: "Dinks",
    baseSellPrice: 25000,
  },
  {
    id: "copper_axe",
    name: "Copper Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d5/Inv_Copper_Axe.png",
    damage: 3,
    licence: "Logging",
    source: ["Crafting Table"],
    baseSellPrice: 3125,
  },
  {
    id: "copper_fishing_rod",
    name: "Copper Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Copper_Fishing_Rod.png",
    damage: null,
    licence: "Fishing",
    source: ["Crafting Table"],
    baseSellPrice: 3288,
  },
  {
    id: "copper_hoe",
    name: "Copper Hoe",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/10/Inv_Copper_Hoe.png",
    damage: null,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 3000,
  },
  {
    id: "copper_pickaxe",
    name: "Copper Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Copper_Pickaxe.png",
    damage: 2,
    licence: "Mining",
    source: ["Crafting Table"],
    baseSellPrice: 3250,
  },
  {
    id: "copper_scythe",
    name: "Copper Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Copper_Scythe.png",
    damage: 5,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 2382,
  },
  {
    id: "copper_watering_can",
    name: "Copper Watering Can",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/21/Inv_Copper_Watering_Can.png",
    damage: null,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 12500,
  },
  {
    id: "dirt_printer",
    name: "Dirt Printer",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Dirt_Printer.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 20,
    inputs: [
      {
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
        count: 5,
      },
      {
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
        count: 2,
      },
      {
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
        count: 1,
      },
      {
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
        count: 8,
      },
      {
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
        count: 3,
      },
      {
        name: "Opal",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
        count: 5,
      },
    ],
    buyPrice: 300000,
    buyUnits: "Dinks",
    baseSellPrice: 150000,
  },
  {
    id: "fishing_rod",
    name: "Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Fishing_Rod.png",
    damage: null,
    licence: "Fishing",
    source: ["John's Goods"],
    buyPrice: 1260,
    buyUnits: "Dinks",
    baseSellPrice: 630,
  },
  {
    id: "gold_pocket_watch",
    name: "Gold Pocket Watch",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Gold_Pocket_Watch.png",
    damage: null,
    licence: "",
    source: ["Jimmy's Boat"],
    buyPrice: 20000,
    buyUnits: "Permit Points",
    baseSellPrice: 5000000,
  },
  {
    id: "guitar",
    name: "Guitar",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Guitar.png",
    damage: null,
    licence: "",
    source: ["Deep Mine"],
    baseSellPrice: 3025,
  },
  {
    id: "hand_trolley",
    name: "Hand Trolley",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7f/Inv_Hand_Trolley.png",
    damage: null,
    licence: "",
    source: ["John's Goods"],
    buyPrice: 30000,
    buyUnits: "Dinks",
    baseSellPrice: 15000,
  },
  {
    id: "harvac",
    name: "Har-Vac",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Har-Vac.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 10,
    berkoniumOreCount: 10,
    inputs: [
      {
        name: "Windmill",
        img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Windmill.png",
        count: 1,
      },
      {
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
        count: 2,
      },
      {
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
        count: 2,
      },
      {
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
        count: 1,
      },
      {
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
        count: 10,
      },
    ],
    buyPrice: 2000000,
    buyUnits: "Dinks",
    baseSellPrice: 1000000,
  },
  {
    id: "hoe",
    name: "Hoe",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Hoe.png",
    damage: null,
    licence: "Farming",
    source: ["Rayne's Greenhouse"],
    buyPrice: 800,
    buyUnits: "Dinks",
    baseSellPrice: 400,
  },
  {
    id: "improved_chainsaw",
    name: "Improved Chainsaw",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0d/Inv_Improved_Chainsaw.png",
    damage: 3,
    licence: "Logging",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 13,
    berkoniumOreCount: 10,
    inputs: [
      {
        name: "Chainsaw",
        img: "https://static.wikia.nocookie.net/dinkum/images/f/f0/Inv_Chainsaw.png",
        count: 1,
      },
      {
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
        count: 10,
      },
      {
        name: "Ruby Shary",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
        count: 10,
      },
      {
        name: "Emerald Shard",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
        count: 10,
      },
    ],
    buyPrice: 2000000,
    buyUnits: "Dinks",
    baseSellPrice: 1000000,
  },
  {
    id: "improved_compactor",
    name: "Improved Compactor",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Improved_Compactor.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 20,
    berkoniumOreCount: 10,
    inputs: [
      {
        name: "Dirt Printer",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Dirt_Printer.png",
        count: 1,
      },
      {
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
        count: 10,
      },
      {
        name: "Ruby Shary",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
        count: 10,
      },
      {
        name: "Emerald Shard",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
        count: 10,
      },
    ],
    buyPrice: 2000000,
    buyUnits: "Dinks",
    baseSellPrice: 1000000,
  },
  {
    id: "improved_dirt_printer",
    name: "Improved Dirt Printer",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Improved_Dirt_Printer.png",
    damage: null,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 13,
    berkoniumOreCount: 10,
    inputs: [
      {
        name: "Jack Hammer",
        img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Jack_Hammer.png",
        count: 1,
      },
      {
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
        count: 10,
      },
      {
        name: "Ruby Shary",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
        count: 10,
      },
      {
        name: "Emerald Shard",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
        count: 10,
      },
    ],
    buyPrice: 2000000,
    buyUnits: "Dinks",
    baseSellPrice: 1000000,
  },
  {
    id: "improved_jack_hammer",
    name: "Improved Jack Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/25/Inv_Improved_Jack_Hammer.png",
    damage: 8,
    licence: "",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 10,
    berkoniumOreCount: 10,
    inputs: [
      {
        name: "Compactor",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Compactor.png",
        count: 1,
      },
      {
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
        count: 10,
      },
      {
        name: "Ruby Shary",
        img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
        count: 10,
      },
      {
        name: "Emerald Shard",
        img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
        count: 10,
      },
    ],
    buyPrice: 2000000,
    buyUnits: "Dinks",
    baseSellPrice: 1000000,
  },
  {
    id: "iron_axe",
    name: "Iron Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Iron_Axe.png",
    damage: 4,
    licence: "Logging",
    source: ["Crafting Table"],
    baseSellPrice: 8906,
  },
  {
    id: "iron_fishing_rod",
    name: "Iron Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ca/Inv_Iron_Fishing_Rod.png",
    damage: null,
    licence: "Fishing",
    source: ["Crafting Table"],
    baseSellPrice: 9110,
  },
  {
    id: "iron_hoe",
    name: "Iron Hoe",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/69/Inv_Iron_Hoe.png",
    damage: null,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 8750,
  },
  {
    id: "iron_pickaxe",
    name: "Iron Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5e/Inv_Iron_Pickaxe.png",
    damage: 3,
    licence: "Mining",
    source: ["Crafting Table"],
    baseSellPrice: 9062,
  },
  {
    id: "iron_scythe",
    name: "Iron Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0f/Inv_Iron_Scythe.png",
    damage: 7,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 5478,
  },
  {
    id: "iron_watering_can",
    name: "Iron Watering Can",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Iron_Watering_Can.png",
    damage: null,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 28125,
  },
  {
    id: "jack_hammer",
    name: "Jack Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Jack_Hammer.png",
    damage: 8,
    licence: "Mining",
    source: ["Franklyn's Lab"],
    shinyDiscCount: 10,
    inputs: [
      {
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
        count: 5,
      },
      {
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
        count: 2,
      },
      {
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
        count: 1,
      },
      {
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
        count: 8,
      },
      {
        name: "Stone Grinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Stone_Grinder.png",
        count: 1,
      },
    ],
    buyPrice: 100000,
    buyUnits: "Dinks",
    baseSellPrice: 50000,
  },
  {
    id: "metal_detector",
    name: "Metal Detector",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/57/Inv_Metal_Detector.png",
    damage: null,
    licence: "Metal Detecting",
    source: ["John's Goods"],
    buyPrice: 6600,
    buyUnits: "Dinks",
    baseSellPrice: 3300,
  },
  {
    id: "milking_bucket",
    name: "Milking Bucket",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c4/Inv_Milking_Bucket.png",
    damage: null,
    licence: "",
    source: ["Irwin's Barn"],
    buyPrice: 1600,
    buyUnits: "Dinks",
    baseSellPrice: 800,
  },
  {
    id: "mine_pass",
    name: "Mine Pass",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f9/Inv_Mine_Pass.png",
    damage: null,
    licence: "Deep Mining",
    source: ["John's Goods"],
    buyPrice: 25000,
    buyUnits: "Dinks",
    baseSellPrice: 12500,
  },
  {
    id: "mu_whistle",
    name: "Mu Whistle",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_Mu_Whistle.png",
    damage: null,
    licence: "",
    source: ["Undergrove Deep Mine"],
    baseSellPrice: 200000,
  },
  {
    id: "pickaxe_axe",
    name: "Pickaxe Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Inv_Pickaxe_Axe.png",
    damage: 10,
    licence: "",
    source: ["Red Chest in Hot Hot Hot"],
    baseSellPrice: 4844,
  },
  {
    id: "pleep_whistle",
    name: "Pleep Whistle",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Pleep_Whistle.png",
    damage: null,
    licence: "",
    source: ["Irwin's Barn"],
    buyPrice: 6196,
    buyUnits: "Dinks",
    baseSellPrice: 3098,
  },
  {
    id: "scythe",
    name: "Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Scythe.png",
    damage: 3,
    licence: "Farming",
    source: ["Crafting Table"],
    baseSellPrice: 906,
  },
  {
    id: "shears",
    name: "Shears",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Shears.png",
    damage: null,
    licence: "",
    source: ["Irwin's Barn"],
    buyPrice: 1800,
    buyUnits: "Dinks",
    baseSellPrice: 900,
  },
  {
    id: "shovel",
    name: "Shovel",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Shovel.png",
    damage: null,
    licence: "Excavation",
    source: ["John's Goods"],
    buyPrice: 900,
    buyUnits: "Dinks",
    baseSellPrice: 450,
  },
  {
    id: "signwriting_pen",
    name: "Signwriting Pen",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a5/Inv_Signwriting_Pen.png",
    damage: null,
    licence: "Signwriting",
    source: ["Signwriting Table"],
    baseSellPrice: 125,
  },
  {
    id: "silver_pocket_watch",
    name: "Silver Pocket Watch",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Silver_Pocket_Watch.png",
    damage: null,
    licence: "",
    source: ["Island Reef"],
    baseSellPrice: 25000,
  },
  {
    id: "simple_animal_trap",
    name: "Simple Animal Trap",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f2/Inv_Simple_Animal_Trap.png",
    damage: null,
    licence: "Trapping",
    source: ["Crafting Table"],
    baseSellPrice: 2131,
  },
  {
    id: "stone_wand",
    name: "Stone Wand",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Stone_Wand.png",
    damage: null,
    licence: "",
    source: ["Undergrove Deep Mine"],
    baseSellPrice: 45000,
  },
  {
    id: "swag_pack",
    name: "Swag Pack",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Swag_Pack.png",
    damage: null,
    licence: "",
    source: ["Red Chest in Hot Hot Hot"],
    baseSellPrice: 200000,
  },
  {
    id: "tape_measure",
    name: "Tape Measure",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/73/Inv_Tape_Measure.png",
    damage: null,
    licence: "",
    source: ["John's Goods"],
    buyPrice: 9000,
    buyUnits: "Dinks",
    baseSellPrice: 4500,
  },
  {
    id: "telejumper",
    name: "Tele-Jumper",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Tele-Jumper.png",
    damage: null,
    licence: "",
    source: ["Red Chest in Hot Hot Hot"],
    baseSellPrice: 150000,
  },
  {
    id: "torch",
    name: "Torch",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0d/Inv_Torch.png",
    damage: null,
    licence: "",
    source: ["John's Goods"],
    buyPrice: 6000,
    buyUnits: "Dinks",
    baseSellPrice: 3000,
  },
  {
    id: "tree_pinchers",
    name: "Tree Pinchers",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/77/Inv_Tree_Pinchers.png",
    damage: null,
    licence: "",
    source: ["Red Chest in Hot Hot Hot"],
    baseSellPrice: 15000,
  },
  {
    id: "tropical_grass_turf_roll",
    name: "Tropical Grass Turf Roll",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Tropical_Grass_Turf_Roll.png",
    damage: null,
    licence: "",
    source: ["Blue Chest in Island Reed"],
    baseSellPrice: 2,
  },
  {
    id: "vombat_whistle",
    name: "Vombat Whistle",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fd/Inv_Vombat_Whistle.png",
    damage: null,
    licence: "",
    source: ["Irwin's Barn"],
    buyPrice: 6196,
    buyUnits: "Dinks",
    baseSellPrice: 3098,
  },
];