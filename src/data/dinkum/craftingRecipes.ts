import { FilterObject, Recipe } from "@/types";

export const craftingRecipes: Recipe[] = [
  {
    id: "advanced_cooking_table",
    name: "Advanced Cooking Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Advanced_Cooking_Table.png",
    baseSellPrice: 72150,
    source: ["Building Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Cooking Table",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Cooking_Table.png",
          },
          {
            name: "Berkonium Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
          },
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Opal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "advanced_crafting_table",
    name: "Advanced Crafting Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Advanced_Crafting_Table.png",
    baseSellPrice: 70788,
    source: ["Building Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Crafting Table",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/36/Inv_Crafting_Table.png",
          },
          {
            name: "Berkonium Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
          },
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Opal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "advanced_sprinkler",
    name: "Advanced Sprinkler",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Advanced_Sprinkler.png",
    baseSellPrice: 36788,
    source: ["Irrigation Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Sprinkler",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Sprinkler.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Old Gear",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
          {
            name: "Old Spring",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
          {
            name: "Hot Cylinder",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_collection_point",
    name: "Animal Collection Point",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Animal_Collection_Point.png",
    baseSellPrice: 1285,
    source: ["Trapping Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_den",
    name: "Animal Den",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e5/Inv_Animal_Den.png",
    baseSellPrice: 7438,
    source: ["Handling Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Stone",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Palm Wood Plank",
            count: 6,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Iron Ore",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Iron_Ore.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_feeder",
    name: "Animal Feeder",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Animal_Feeder.png",
    baseSellPrice: 758,
    source: ["Purchase from Irwin"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_shower",
    name: "Animal Shower",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2e/Inv_Animal_Shower.png",
    baseSellPrice: 0,
    source: ["Irrigation Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Old Gear",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
          {
            name: "Old Spring",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
          {
            name: "Gum Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Quartz Crystal",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Iron Watering Can",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Iron_Watering_Can.png",
          },
          {
            name: "Opal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Opal.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_stall",
    name: "Animal Stall",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a1/Inv_Animal_Stall.png",
    baseSellPrice: 11492,
    source: ["Handling Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Spinifex Tuft",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
          {
            name: "Hard Wood Plank",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "animal_trap",
    name: "Animal Trap",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/94/Inv_Animal_Trap.png",
    baseSellPrice: 4025,
    source: ["Trapping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Hard Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Old Spring",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
        ],
      },
    ],
  },
  {
    id: "arrow_light",
    name: "Arrow Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7f/Inv_Arrow_Light.png",
    baseSellPrice: 3815,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
          {
            name: "Ruby Shard",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
          },
        ],
      },
    ],
  },
  {
    id: "barbed_wire_fence",
    name: "Barbed Wire Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/93/Inv_Barbed_Wire_Fence.png",
    baseSellPrice: 0,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "basic_hammer",
    name: "Basic Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Basic_Hammer.png",
    baseSellPrice: 2062,
    source: ["Hunting Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "basic_spear",
    name: "Basic Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6e/Inv_Basic_Spear.png",
    baseSellPrice: 812,
    source: ["Hunting Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "beach_bar",
    name: "Beach Bar",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/66/Inv_Beach_Bar.png",
    baseSellPrice: 1565,
    outputCount: 1,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Spinifex Tuft",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "bee_house",
    name: "Bee House",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Bee_House.png",
    baseSellPrice: 9150,
    source: ["Bug Catching Level 10"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
          {
            name: "Hard Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Queen Bee",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Queen_Bee.png",
          },
        ],
      },
    ],
  },
  {
    id: "billy_can_kit",
    name: "Billy Can Kit",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0c/Inv_Billy_Can_Kit.png",
    baseSellPrice: 1610,
    source: ["Brewing Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Campfire",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/6/65/Inv_Campfire.png",
          },
          {
            name: "Tin Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "bird_coop",
    name: "Bird Coop",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a6/Inv_Bird_Coop.png",
    baseSellPrice: 6690,
    source: ["Handling Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Bar",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Spinifex Tuft",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Gum Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "black_tile_path",
    name: "Black Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d8/Inv_Black_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Black Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Inv_Black_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "blue_floor_light",
    name: "Blue Floor Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6c/Inv_Blue_Floor_Light.png",
    baseSellPrice: 2240,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Aquamarine Shard",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3c/Inv_Aquamarine_Shard.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "blue_tile_path",
    name: "Blue Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8d/Inv_Blue_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Blue Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ac/Inv_Blue_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "board_fence",
    name: "Board Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f7/Inv_Board_Fence.png",
    baseSellPrice: 0,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_bridge",
    name: "Brick Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f7/Inv_Brick_Bridge.png",
    baseSellPrice: 238,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Stone",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_fence",
    name: "Brick Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Brick_Fence.png",
    baseSellPrice: 4,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_flower_bed",
    name: "Brick Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/64/Inv_Brick_Flower_Bed.png",
    baseSellPrice: 19,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_fountain",
    name: "Brick Fountain",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Brick_Fountain.png",
    baseSellPrice: 15500,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Sprinkler",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Sprinkler.png",
          },
          {
            name: "Bag of Cement",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_path",
    name: "Brick Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5b/Inv_Brick_Path.png",
    baseSellPrice: 2,
    source: ["Landscaping Licence Level 1"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "brick_well",
    name: "Brick Well",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/69/Inv_Brick_Well.png",
    baseSellPrice: 1125,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Gum Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "bug_terrarium",
    name: "Bug Terrarium",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1d/Inv_Bug_Terrarium.png",
    baseSellPrice: 0,
    source: ["Bug Catching Level 30"],
    outputCount: 1,
    variants: [
      {
        id: "bronze_bug_trophy",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
          {
            name: "Bird of Paradise",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Bird_of_Paradise.png",
          },
          {
            name: "Quartz Crystal",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Fir Grass Seeds",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Fir_Grass_Seeds.png",
          },
          {
            name: "Bee House",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Bee_House.png",
          },
          {
            name: "Bronze Bug Comp Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Bronze_Bug_Comp_Trophy.png",
          },
        ],
      },
      {
        id: "silver_bug_trophy",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
          {
            name: "Bird of Paradise",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Bird_of_Paradise.png",
          },
          {
            name: "Quartz Crystal",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Fir Grass Seeds",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Fir_Grass_Seeds.png",
          },
          {
            name: "Bee House",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Bee_House.png",
          },
          {
            name: "Silver Bug Comp Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Silver_Bug_Comp_Trophy.png",
          },
        ],
      },
      {
        id: "gold_bug_trophy",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
          {
            name: "Bird of Paradise",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Bird_of_Paradise.png",
          },
          {
            name: "Quartz Crystal",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Fir Grass Seeds",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Fir_Grass_Seeds.png",
          },
          {
            name: "Bee House",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Bee_House.png",
          },
          {
            name: "Gold Bug Comp Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/57/Inv_Gold_Bug_Comp_Trophy.png",
          },
        ],
      },
    ],
  },
  {
    id: "bulletin_board",
    name: "Bulletin Board",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c5/Bulletin_Board_Sprite.png",
    baseSellPrice: 10000,
    source: ["Bulletin Board Deed"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 6,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "bunting_festoon",
    name: "Bunting Festoon",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4b/Inv_Bunting_Festoon.png",
    baseSellPrice: 26688,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Cloth",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "bus_stop",
    name: "Bus Stop",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Bus_Stop.png",
    baseSellPrice: 3188,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "campfire",
    name: "Campfire",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/65/Inv_Campfire.png",
    baseSellPrice: 288,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "gum_log",
        inputs: [
          {
            name: "Gum Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
          {
            name: "Stone",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
      {
        id: "palm_wood",
        inputs: [
          {
            name: "Palm Wood",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
          },
          {
            name: "Stone",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
      {
        id: "hard_wood",
        inputs: [
          {
            name: "Hard Wood Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
          },
          {
            name: "Stone",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_bird_bath",
    name: "Cement Bird Bath",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/24/Inv_Cement_Bird_Bath.png",
    baseSellPrice: 62,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_bridge",
    name: "Cement Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Cement_Bridge.png",
    baseSellPrice: 812,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_fence",
    name: "Cement Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Cement_Fence.png",
    baseSellPrice: 6,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_path",
    name: "Cement Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/23/Inv_Cement_Path.png",
    baseSellPrice: 2,
    source: ["Landscaping Licence Level 1"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_planter",
    name: "Cement Planter",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e3/Inv_Cement_Planter.png",
    baseSellPrice: 412,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "cement_steps",
    name: "Cement Steps",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Cement_Steps.png",
    baseSellPrice: 6,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cheese_maker",
    name: "Cheese Maker",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/75/Inv_Cheese_Maker.png",
    baseSellPrice: 8625,
    source: ["Animal Processing Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Milking Bucket",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c4/Inv_Milking_Bucket.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Old Gear",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
        ],
      },
    ],
  },
  {
    id: "cobblestone_fence",
    name: "Cobblestone Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f8/Inv_Cobblestone_Fence.png",
    baseSellPrice: 4,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cobblestone_path",
    name: "Cobblestone Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Cobblestone_Path.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cobblestone_road",
    name: "Cobblestone Road",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Cobblestone_Road.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "cobblestone_road_lines",
    name: "Cobblestone Road Lines",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/55/Inv_Cobblestone_Road_Lines.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "compost_bin",
    name: "Compost Bin",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/86/Inv_Compost_Bin.png",
    baseSellPrice: 8056,
    source: ["Farming Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Tin Sheet",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "cooking_table",
    name: "Cooking Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Cooking_Table.png",
    baseSellPrice: 2570,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
          {
            name: "Tin Sheet",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_axe",
    name: "Copper Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d5/Inv_Copper_Axe.png",
    baseSellPrice: 3125,
    source: ["Logging Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Basic Axe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Basic_Axe.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_bulb_lamp",
    name: "Copper Bulb Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1e/Inv_Copper_Bulb_Lamp.png",
    baseSellPrice: 2794,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_fishing_rod",
    name: "Copper Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Copper_Fishing_Rod.png",
    baseSellPrice: 3288,
    source: ["Fishing Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Fishing Rod",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Fishing_Rod.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_flower_pot",
    name: "Copper Flower Pot",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5e/Inv_Copper_Flower_Pot.png",
    baseSellPrice: 2500,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_hammer",
    name: "Copper Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Copper_Hammer.png",
    baseSellPrice: 3938,
    source: ["Hunting Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_hoe",
    name: "Copper Hoe",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/10/Inv_Copper_Hoe.png",
    baseSellPrice: 3000,
    source: ["Farming Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hoe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Hoe.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_pickaxe",
    name: "Copper Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Copper_Pickaxe.png",
    baseSellPrice: 3250,
    source: ["Mining Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Basic Pickaxe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f1/Inv_Basic_Pickaxe.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_scythe",
    name: "Copper Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Copper_Scythe.png",
    baseSellPrice: 2382,
    source: ["Farming Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Scythe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Scythe.png",
          },
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_spear",
    name: "Copper Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Copper_Spear.png",
    baseSellPrice: 2781,
    source: ["Hunting Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_top_fence",
    name: "Copper Top Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Inv_Copper_Top_Fence.png",
    baseSellPrice: 202,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "copper_watering_can",
    name: "Copper Watering Can",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/21/Inv_Copper_Watering_Can.png",
    baseSellPrice: 12500,
    source: ["Farming Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Basic Watering Can",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Watering_Can.png",
          },
          {
            name: "Copper Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "crab_pot",
    name: "Crab Pot",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Crab_Pot.png",
    baseSellPrice: 7400,
    source: ["Fishing Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "crafting_table",
    name: "Crafting Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/36/Inv_Crafting_Table.png",
    baseSellPrice: 1480,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
          {
            name: "Nails",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "croc_teeth_bat",
    name: "Croc Teeth Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Croc_Teeth_Bat.png",
    baseSellPrice: 11025,
    source: ["Hunting Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
          {
            name: "Crocodile Tooth",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0b/Inv_Crocodile_Tooth.png",
          },
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "crude_fence",
    name: "Crude Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Crude_Fence.png",
    baseSellPrice: 32,
    source: ["Fletch"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
          {
            name: "Spinifex Resin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "crude_furnace",
    name: "Crude Furnace",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4d/Inv_Crude_Furnace.png",
    baseSellPrice: 554,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Campfire",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/6/65/Inv_Campfire.png",
          },
          {
            name: "Tin Ore",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Tin_Ore.png",
          },
        ],
      },
    ],
  },
  {
    id: "crude_ladder",
    name: "Crude Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Crude_Ladder.png",
    baseSellPrice: 900,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Mangrove Stick",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
  },
  {
    id: "curtain_festoon",
    name: "Curtain Festoon",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fb/Inv_Curtain_Festoon.png",
    baseSellPrice: 26688,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Cloth",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "dunny",
    name: "Dunny",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d2/Inv_Dunny.png",
    baseSellPrice: 1796,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "festoon_lights",
    name: "Festoon Lights",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8a/Inv_Festoon_Lights.png",
    baseSellPrice: 7431,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Bright Wire",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
          },
          {
            name: "Glass Bulb",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "field_mushroom_lamp",
    name: "Field Mushroom Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Field_Mushroom_Lamp.png",
    baseSellPrice: 4919,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Field Mushroom",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Field_Mushroom.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "fish_pond",
    name: "Fish Pond",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f2/Inv_Fish_Pond.png",
    baseSellPrice: 164825,
    source: ["Fish Farming Licence"],
    outputCount: 1,
    variants: [
      {
        id: "gold_trophy",
        inputs: [
          {
            name: "Stone",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Pearl",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
          },
          {
            name: "River Reed Seed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_River_Reed_Seed.png",
          },
          {
            name: "Seaweed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
          },
          {
            name: "Crab Pot",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Crab_Pot.png",
          },
          {
            name: "Gold Fish Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/18/Inv_Gold_Fish_Trophy.png",
          },
        ],
      },
      {
        id: "silver_trophy",
        inputs: [
          {
            name: "Stone",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Pearl",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
          },
          {
            name: "River Reed Seed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_River_Reed_Seed.png",
          },
          {
            name: "Seaweed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
          },
          {
            name: "Crab Pot",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Crab_Pot.png",
          },
          {
            name: "Silver Fish Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Silver_Fish_Trophy.png",
          },
        ],
      },
      {
        id: "bronze_trophy",
        inputs: [
          {
            name: "Stone",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Pearl",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
          },
          {
            name: "River Reed Seed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_River_Reed_Seed.png",
          },
          {
            name: "Seaweed",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
          },
          {
            name: "Crab Pot",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Crab_Pot.png",
          },
          {
            name: "Bronze Fish Trophy",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Bronze_Fish_Trophy.png",
          },
        ],
      },
    ],
  },
  {
    id: "flaming_bat",
    name: "Flaming Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Flaming_Bat.png",
    baseSellPrice: 16275,
    source: ["Hunting Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
          {
            name: "Flame Sac",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Inv_Flame_Sac.png",
          },
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "flat_top_fence",
    name: "Flat Top Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Flat_Top_Fence.png",
    baseSellPrice: 625,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "floor_light",
    name: "Floor Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Floor_Light.png",
    baseSellPrice: 1115,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "flower_pot",
    name: "Flower Pot",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Flower_Pot.png",
    baseSellPrice: 38,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "garden_light",
    name: "Garden Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c9/Inv_Garden_Light.png",
    baseSellPrice: 1115,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "glass_fence",
    name: "Glass Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Glass_Fence.png",
    baseSellPrice: 438,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "grain_mill",
    name: "Grain Mill",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/dd/Inv_Grain_Mill.png",
    baseSellPrice: 7525,
    source: ["Farming Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Old Gear",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Old Wheel",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
          },
        ],
      },
    ],
  },
  {
    id: "gravel_pathway",
    name: "Gravel Pathway",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/56/Inv_Gravel_Pathway.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "green_floor_light",
    name: "Green Floor Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Green_Floor_Light.png",
    baseSellPrice: 4115,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Emerald Shard",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Emerald_Shard.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "green_tile_path",
    name: "Green Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/13/Inv_Green_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Green Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/86/Inv_Green_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_log_seat",
    name: "Gum Log Seat",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/be/Inv_Gum_Log_Seat.png",
    baseSellPrice: 375,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Log",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_arch",
    name: "Gum Wood Arch",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/21/Inv_Gum_Wood_Arch.png",
    baseSellPrice: 945,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_bench",
    name: "Gum Wood Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Gum_Wood_Bench.png",
    baseSellPrice: 1328,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_bridge",
    name: "Gum Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Gum_Wood_Bridge.png",
    baseSellPrice: 4275,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Gum Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_double_gate",
    name: "Gum Wood Double Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0b/Inv_Gum_Wood_Double_Gate.png",
    baseSellPrice: 765,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_entrance_sign",
    name: "Gum Wood Entrance Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/52/Inv_Gum_Wood_Entrance_Sign.png",
    baseSellPrice: 1340,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Spinifex Resin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_fence",
    name: "Gum Wood Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Gum_Wood_Fence.png",
    baseSellPrice: 119,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_flag_post",
    name: "Gum Wood Flag Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Gum_Wood_Flag_Post.png",
    baseSellPrice: 6781,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Fence",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Gum_Wood_Fence.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_flower_bed",
    name: "Gum Wood Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Gum_Wood_Flower_Bed.png",
    baseSellPrice: 236,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_gate",
    name: "Gum Wood Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/33/Inv_Gum_Wood_Gate.png",
    baseSellPrice: 765,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_ladder",
    name: "Gum Wood Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1c/Inv_Gum_Wood_Ladder.png",
    baseSellPrice: 750,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_lamp_post",
    name: "Gum Wood Lamp Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/33/Inv_Gum_Wood_Lamp_Post.png",
    baseSellPrice: 514,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Fence",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Gum_Wood_Fence.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Wooden Torch",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_market_stall",
    name: "Gum Wood Market Stall",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4b/Inv_Gum_Wood_Market_Stall.png",
    baseSellPrice: 7578,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Gum Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_path",
    name: "Gum Wood Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Gum_Wood_Path.png",
    baseSellPrice: 46,
    source: ["Landscaping Licence Level 1"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_pergola",
    name: "Gum Wood Pergola",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0d/Inv_Gum_Wood_Pergola.png",
    baseSellPrice: 4780,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_steps",
    name: "Gum Wood Steps",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9b/Inv_Gum_Wood_Steps.png",
    baseSellPrice: 71,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_table",
    name: "Gum Wood Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Gum_Wood_Table.png",
    baseSellPrice: 1328,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_tool_rack",
    name: "Gum Wood Tool Rack",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fd/Inv_Gum_Wood_Tool_Rack.png",
    baseSellPrice: 6875,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_arch",
    name: "Hard Wood Arch",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9b/Inv_Hard_Wood_Arch.png",
    baseSellPrice: 1445,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_bench",
    name: "Hard Wood Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d7/Inv_Hard_Wood_Bench.png",
    baseSellPrice: 1952,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_bridge",
    name: "Hard Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/97/Inv_Hard_Wood_Bridge.png",
    baseSellPrice: 6150,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Hard Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_double_gate",
    name: "Hard Wood Double Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Hard_Wood_Double_Gate.png",
    baseSellPrice: 1015,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_entrance_sign",
    name: "Hard Wood Entrance Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4b/Inv_Hard_Wood_Entrance_Sign.png",
    baseSellPrice: 1965,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Spinifex Resin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_fence",
    name: "Hard Wood Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Hard_Wood_Fence.png",
    baseSellPrice: 165,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_flag_post",
    name: "Hard Wood Flag Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Hard_Wood_Flag_Post.png",
    baseSellPrice: 6945,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_flower_bed",
    name: "Hard Wood Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Hard_Wood_Flower_Bed.png",
    baseSellPrice: 361,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_gate",
    name: "Hard Wood Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Inv_Hard_Wood_Gate.png",
    baseSellPrice: 1015,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_ladder",
    name: "Hard Wood Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e2/Inv_Hard_Wood_Ladder.png",
    baseSellPrice: 1250,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_lamp_post",
    name: "Hard Wood Lamp Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/87/Inv_Hard_Wood_Lamp_Post.png",
    baseSellPrice: 571,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Fence",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Hard_Wood_Fence.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Wooden Torch",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_market_stall",
    name: "Hard Wood Market Stall",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/72/Inv_Hard_Wood_Market_Stall.png",
    baseSellPrice: 8078,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Hard Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_path",
    name: "Hard Wood Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Inv_Hard_Wood_Path.png",
    baseSellPrice: 78,
    source: ["Landscaping Licence Level 1"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_pergola",
    name: "Hard Wood Pergola",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Hard_Wood_Pergola.png",
    baseSellPrice: 5780,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_steps",
    name: "Hard Wood Steps",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Hard_Wood_Steps.png",
    baseSellPrice: 102,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_table",
    name: "Hard Wood Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/88/Inv_Hard_Wood_Table.png",
    baseSellPrice: 1952,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_tool_rack",
    name: "Hard Wood Tool Rack",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Hard_Wood_Tool_Rack.png",
    baseSellPrice: 8125,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "hardwood_crude_fence",
    name: "Hardwood Crude Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Hardwood_Crude_Fence.png",
    baseSellPrice: 56,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Inv_Hard_Wood_Log.png",
          },
          {
            name: "Spinifex Resin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "hay_bale",
    name: "Hay Bale",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a6/Inv_Hay_Bale.png",
    baseSellPrice: 50,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Spinifex Tuft",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
        ],
      },
    ],
  },
  {
    id: "hedge",
    name: "Hedge",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Hedge.png",
    baseSellPrice: 18,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Spinifex Tuft",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
          {
            name: "Fern Seed",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Fern_Seed.png",
          },
          {
            name: "Bush Seed",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f9/Inv_Bush_Seed.png",
          },
        ],
      },
    ],
  },
  {
    id: "hedge_arch",
    name: "Hedge Arch",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Hedge_Arch.png",
    baseSellPrice: 351,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hedge",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Hedge.png",
          },
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "honey_comb_path",
    name: "Honey Comb Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Honey_Comb_Path.png",
    baseSellPrice: 244,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Honey",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Honey.png",
          },
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_axe",
    name: "Iron Axe",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Iron_Axe.png",
    baseSellPrice: 8906,
    source: ["Logging Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "copper_upgrade",
        inputs: [
          {
            name: "Copper Axe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d5/Inv_Copper_Axe.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
      {
        id: "direct_craft",
        inputs: [
          {
            name: "Basic Axe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Basic_Axe.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_bridge",
    name: "Iron Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Iron_Bridge.png",
    baseSellPrice: 12500,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_cement_fence",
    name: "Iron Cement Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/58/Inv_Iron_Cement_Fence.png",
    baseSellPrice: 314,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_fishing_rod",
    name: "Iron Fishing Rod",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ca/Inv_Iron_Fishing_Rod.png",
    baseSellPrice: 9110,
    source: ["Fishing Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Fishing Rod",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Copper_Fishing_Rod.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_hammer",
    name: "Iron Hammer",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Iron_Hammer.png",
    baseSellPrice: 8125,
    source: ["Hunting Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_hoe",
    name: "Iron Hoe",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/69/Inv_Iron_Hoe.png",
    baseSellPrice: 8750,
    source: ["Farming Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Hoe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/10/Inv_Copper_Hoe.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_ladder",
    name: "Iron Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Iron_Ladder.png",
    baseSellPrice: 2500,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_path",
    name: "Iron Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Iron_Path.png",
    baseSellPrice: 312,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_pickaxe",
    name: "Iron Pickaxe",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5e/Inv_Iron_Pickaxe.png",
    baseSellPrice: 9062,
    source: ["Mining Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "copper_upgrade",
        inputs: [
          {
            name: "Copper Pickaxe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Copper_Pickaxe.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
      {
        id: "direct_craft",
        inputs: [
          {
            name: "Basic Pickaxe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f1/Inv_Basic_Pickaxe.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_scythe",
    name: "Iron Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0f/Inv_Iron_Scythe.png",
    baseSellPrice: 5478,
    source: ["Farming Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Scythe",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Copper_Scythe.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_spear",
    name: "Iron Spear",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Iron_Spear.png",
    baseSellPrice: 5281,
    source: ["Hunting Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_watering_can",
    name: "Iron Watering Can",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Iron_Watering_Can.png",
    baseSellPrice: 28125,
    source: ["Farming Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Watering Can",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/21/Inv_Copper_Watering_Can.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_wood_bench",
    name: "Iron Wood Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/26/Inv_Iron_Wood_Bench.png",
    baseSellPrice: 6406,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "keg",
    name: "Keg",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Keg.png",
    baseSellPrice: 14062,
    source: ["Brewing Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Iron Bar",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "large_cement_fountain",
    name: "Large Cement Fountain",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/aa/Inv_Large_Cement_Fountain.png",
    baseSellPrice: 46172,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Advanced Sprinkler",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Advanced_Sprinkler.png",
          },
        ],
      },
    ],
  },
  {
    id: "lattice_fence",
    name: "Lattice Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Lattice_Fence.png",
    baseSellPrice: 146,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Mangrove Stick",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "marble_bench",
    name: "Marble Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b4/Inv_Marble_Bench.png",
    baseSellPrice: 125,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Marble",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Marble.png",
          },
        ],
      },
    ],
  },
  {
    id: "marble_fence",
    name: "Marble Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1e/Inv_Marble_Fence.png",
    baseSellPrice: 26,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Marble",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Marble.png",
          },
          {
            name: "Vine",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
        ],
      },
    ],
  },
  {
    id: "marble_path",
    name: "Marble Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Marble_Path.png",
    baseSellPrice: 6,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Marble",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Marble.png",
          },
        ],
      },
    ],
  },
  {
    id: "marble_pedestal",
    name: "Marble Pedestal",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e6/Inv_Marble_Pedestal.png",
    baseSellPrice: 125,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Marble",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Marble.png",
          },
        ],
      },
    ],
  },
  {
    id: "marble_pillar",
    name: "Marble Pillar",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ee/Inv_Marble_Pillar.png",
    baseSellPrice: 312,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Marble",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Marble.png",
          },
        ],
      },
    ],
  },
  {
    id: "melon_scarecrow",
    name: "Melon Scarecrow",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9e/Inv_Melon_Scarecrow.png",
    baseSellPrice: 4200,
    source: ["Farming Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Watermelon",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/da/Inv_Watermelon.png",
          },
          {
            name: "Gum Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
          {
            name: "Spinifex Tuft",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
        ],
      },
    ],
  },
  {
    id: "milk_cap_lamp",
    name: "Milk Cap Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Milk_Cap_Lamp.png",
    baseSellPrice: 4919,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Milk Cap",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Milk_Cap.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "mushroom_lamp",
    name: "Mushroom Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/55/Inv_Mushroom_Lamp.png",
    baseSellPrice: 2450,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Glowing Mushroom",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "mushroom_path",
    name: "Mushroom Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3a/Inv_Mushroom_Path.png",
    baseSellPrice: 12,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Glowing Mushroom",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
          },
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "nails",
    name: "Nails",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
    baseSellPrice: 78,
    source: ["Fletch"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "natural_path",
    name: "Natural Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c4/Inv_Natural_Path.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "orange_tile_path",
    name: "Orange Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Orange_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Orange Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Orange_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_arch",
    name: "Palm Wood Arch",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Palm_Wood_Arch.png",
    baseSellPrice: 1320,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_bench",
    name: "Palm Wood Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/83/Inv_Palm_Wood_Bench.png",
    baseSellPrice: 1796,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_bridge",
    name: "Palm Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1d/Inv_Palm_Wood_Bridge.png",
    baseSellPrice: 5681,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Palm Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_bridge_multi",
    name: "Palm Wood Bridge (Multi)",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1d/Inv_Palm_Wood_Bridge.png",
    baseSellPrice: 1069,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 4,
    variants: [
      {
        id: "variant1",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Palm Wood",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_double_gate",
    name: "Palm Wood Double Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9d/Inv_Palm_Wood_Double_Gate.png",
    baseSellPrice: 952,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_entrance_sign",
    name: "Palm Wood Entrance Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/86/Inv_Palm_Wood_Entrance_Sign.png",
    baseSellPrice: 1809,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Spinifex Resin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_fence",
    name: "Palm Wood Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Palm_Wood_Fence.png",
    baseSellPrice: 154,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_flag_post",
    name: "Palm Wood Flag Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e9/Inv_Palm_Wood_Flag_Post.png",
    baseSellPrice: 6825,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Fence",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Palm_Wood_Fence.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_gate",
    name: "Palm Wood Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c9/Inv_Palm_Wood_Gate.png",
    baseSellPrice: 952,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_ladder",
    name: "Palm Wood Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/63/Inv_Palm_Wood_Ladder.png",
    baseSellPrice: 1125,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_market_stall",
    name: "Palm Wood Market Stall",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f9/Inv_Palm_Wood_Market_Stall.png",
    baseSellPrice: 7952,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_path",
    name: "Palm Wood Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ac/Inv_Palm_Wood_Path.png",
    baseSellPrice: 70,
    source: ["Landscaping Licence Level 1"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_pergola",
    name: "Palm Wood Pergola",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Inv_Palm_Wood_Pergola.png",
    baseSellPrice: 5530,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Copper Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_steps",
    name: "Palm Wood Steps",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f6/Inv_Palm_Wood_Steps.png",
    baseSellPrice: 94,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_table",
    name: "Palm Wood Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ef/Inv_Palm_Wood_Table.png",
    baseSellPrice: 1796,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_tool_rack",
    name: "Palm Wood Tool Rack",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f0/Inv_Palm_Wood_Tool_Rack.png",
    baseSellPrice: 7812,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "pattern_stone_path",
    name: "Pattern Stone Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Pattern_Stone_Path.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "pearl_path",
    name: "Pearl Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/16/Inv_Pearl_Path.png",
    baseSellPrice: 391,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Pearl",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
          },
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "picket_fence",
    name: "Picket Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Picket_Fence.png",
    baseSellPrice: 119,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "picket_gate",
    name: "Picket Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Picket_Gate.png",
    baseSellPrice: 765,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "pink_tile_path",
    name: "Pink Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/28/Inv_Pink_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Pink Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Pink_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "pontoon_bridge",
    name: "Pontoon Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Pontoon_Bridge.png",
    baseSellPrice: 0,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Button Board",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Inv_Button_Board.png",
          },
          {
            name: "Sliding Handle",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/dc/Inv_Sliding_Handle.png",
          },
        ],
      },
    ],
  },
  {
    id: "post_box",
    name: "Post Box",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Post_Box.png",
    baseSellPrice: 5000,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "purple_tile_path",
    name: "Purple Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Purple_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Purple Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b6/Inv_Purple_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "ramp",
    name: "Ramp",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/32/Inv_Ramp.png",
    baseSellPrice: 146,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "recycling_bin",
    name: "Recycling Bin",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/64/Inv_Recycling_Bin.png",
    baseSellPrice: 656,
    source: ["John 4 hearts"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "red_cloth_path",
    name: "Red Cloth Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Red_Cloth_Path.png",
    baseSellPrice: 401,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Cloth",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
        ],
      },
    ],
  },
  {
    id: "red_floor_light",
    name: "Red Floor Light",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4c/Inv_Red_Floor_Light.png",
    baseSellPrice: 2240,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Ruby Shard",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/50/Inv_Ruby_Shard.png",
          },
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "red_roundhead_lamp",
    name: "Red Roundhead Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Inv_Red_Roundhead_Lamp.png",
    baseSellPrice: 8044,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Red Roundhead",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d1/Inv_Red_Roundhead.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "red_tile_path",
    name: "Red Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/03/Inv_Red_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Red Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Inv_Red_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "road_lamp",
    name: "Road Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/26/Inv_Road_Lamp.png",
    baseSellPrice: 0,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "rock_edge_path",
    name: "Rock Edge Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Inv_Red_Paint.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "rock_path",
    name: "Rock Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Rock_Edge_Path.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "rope_fence",
    name: "Rope Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Inv_Rock_Path.png",
    baseSellPrice: 152,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Vine",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
        ],
      },
    ],
  },
  {
    id: "rope_ladder",
    name: "Rope Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Rope_Fence.png",
    baseSellPrice: 500,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
        ],
      },
    ],
  },
  {
    id: "rowboat",
    name: "Rowboat",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Rope_Ladder.png",
    baseSellPrice: 6328,
    source: ["Vehicle Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Palm Wood Plank",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "sail_boat",
    name: "Sail Boat",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/97/Inv_Rowboat.png",
    baseSellPrice: 116344,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Palm Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Hard Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Copper Bar",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Iron Bar",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Cloth",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
          },
          {
            name: "Wooden Chest",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Wooden_Chest.png",
          },
        ],
      },
    ],
  },
  {
    id: "sand_fence",
    name: "Sand Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d6/Inv_Sail_Boat.png",
    baseSellPrice: 14,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Scallop Shell",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Scallop_Shell.png",
          },
          {
            name: "Buccinidae Shell",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Buccinidae_Shell.png",
          },
          {
            name: "Cassidae Shell",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Cassidae_Shell.png",
          },
        ],
      },
    ],
  },
  {
    id: "scarecrow",
    name: "Scarecrow",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1b/Inv_Sand_Fence.png",
    baseSellPrice: 4250,
    source: ["Farming Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Pumpkin",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
          },
          {
            name: "Gum Log",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Gum_Log.png",
          },
          {
            name: "Spinifex Tuft",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Spinifex_Tuft.png",
          },
        ],
      },
    ],
  },
  {
    id: "scythe",
    name: "Scythe",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/85/Inv_Scarecrow.png",
    baseSellPrice: 906,
    source: ["Farming Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "signwriting_table",
    name: "Signwriting Table",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Scythe.png",
    baseSellPrice: 6092,
    source: ["Sign Writing Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "silo",
    name: "Silo",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5f/Inv_Signwriting_Table.png",
    baseSellPrice: 20094,
    source: ["Handling Licence Level 3"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Tin Sheet",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Bag of Cement",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Quartz Crystal",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "simple_animal_trap",
    name: "Simple Animal Trap",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Silo.png",
    baseSellPrice: 2131,
    source: ["Trapping Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
          {
            name: "Mangrove Stick",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
          {
            name: "Old Spring",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
        ],
      },
    ],
  },
  {
    id: "slippery_jack_lamp",
    name: "Slippery Jack Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f2/Inv_Simple_Animal_Trap.png",
    baseSellPrice: 4919,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Slippery Jack",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Slippery_Jack.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "small_cement_fountain",
    name: "Small Cement Fountain",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/92/Inv_Slippery_Jack_Lamp.png",
    baseSellPrice: 15500,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Sprinkler",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Sprinkler.png",
          },
          {
            name: "Bag of Cement",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "smooth_cement_path",
    name: "Smooth Cement Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/44/Inv_Small_Cement_Fountain.png",
    baseSellPrice: 2,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "spinning_wheel",
    name: "Spinning Wheel",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Smooth_Cement_Path.png",
    baseSellPrice: 5400,
    source: ["Animal Processing Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Old Gear",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
          {
            name: "Old Wheel",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
          },
        ],
      },
    ],
  },
  {
    id: "sprinkler",
    name: "Sprinkler",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Spinning_Wheel.png",
    baseSellPrice: 12300,
    source: ["Irrigation Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Copper Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Quartz Crystal",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Old Spring",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
          {
            name: "Old Gear",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
        ],
      },
    ],
  },
  {
    id: "stone_steps",
    name: "Stone Steps",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6f/Inv_Brick_Steps.png",
    baseSellPrice: 6,
    source: ["Landscaping Licence Level 1"],
    outputCount: 4,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Stone",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "storage_barrel",
    name: "Storage Barrel",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/42/Inv_Storage_Barrel.png",
    baseSellPrice: 4281,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "street_lamp",
    name: "Street Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/26/Inv_Street_Lamp.png",
    baseSellPrice: 4044,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "tiki_torch",
    name: "Tiki Torch",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Tiki_Torch.png",
    baseSellPrice: 205,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Palm_Wood.png",
          },
          {
            name: "Wooden Torch",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
          },
        ],
      },
    ],
  },
  {
    id: "tin_double_gate",
    name: "Tin Double Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fb/Inv_Tin_Double_Gate.png",
    baseSellPrice: 688,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "tin_fence",
    name: "Tin Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Tin_Fence.png",
    baseSellPrice: 171,
    source: ["Landscaping Licence Level 2"],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "tin_flower_bed",
    name: "Tin Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/57/Inv_Tin_Flower_Bed.png",
    baseSellPrice: 171,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "tin_gate",
    name: "Tin Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Tin_Gate.png",
    baseSellPrice: 688,
    source: ["Landscaping Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "trash_bin",
    name: "Trash Bin",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Trash_Bin.png",
    baseSellPrice: 14531,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Tin Sheet",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Milking Bucket",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c4/Inv_Milking_Bucket.png",
          },
        ],
      },
    ],
  },
  {
    id: "vine_fence",
    name: "Vine Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Vine_Fence.png",
    baseSellPrice: 126,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "vine_festoon",
    name: "Vine Festoon",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Vine_Festoon.png",
    baseSellPrice: 1406,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 3,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
        ],
      },
    ],
  },
  {
    id: "vine_lattice_ladder",
    name: "Vine Lattice Ladder",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6d/Inv_Vine_Lattice_Ladder.png",
    baseSellPrice: 688,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
        ],
      },
    ],
  },
  {
    id: "vine_wall",
    name: "Vine Wall",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c9/Inv_Vine_Wall.png",
    baseSellPrice: 134,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Vine",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
          },
          {
            name: "Nails",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "water_tank",
    name: "Water Tank",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/65/Inv_Water_Tank.png",
    baseSellPrice: 49486,
    source: ["Irrigation Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Hard Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            name: "Tin Sheet",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Old Contraption",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
          },
          {
            name: "Iron Bar",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Nails",
            count: 8,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "waterbed",
    name: "Waterbed",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8c/Inv_Waterbed.png",
    baseSellPrice: 940,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Pearl",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Pearl.png",
          },
          {
            name: "Copper Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wheelbarrow_flower_bed",
    name: "Wheelbarrow Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/37/Inv_Wheelbarrow_Flower_Bed.png",
    baseSellPrice: 19094,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Wheelbarrow",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Inv_Wheelbarrow.png",
          },
          {
            name: "Tin Sheet",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "white_tile_path",
    name: "White Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_White_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "White Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_White_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_brick_bridge",
    name: "Wide Brick Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f7/Inv_Brick_Bridge.png",
    baseSellPrice: 238,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 4,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Stone",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_cement_bridge",
    name: "Wide Cement Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Wide_Cement_Bridge.png",
    baseSellPrice: 812,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Bag of Cement",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            name: "Tin Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_gum_wood_bridge",
    name: "Wide Gum Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Gum_Wood_Bridge.png",
    baseSellPrice: 4275,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Gum Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_hard_wood_bridge",
    name: "Wide Hard Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/97/Inv_Hard_Wood_Bridge.png",
    baseSellPrice: 6150,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Hard Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_iron_bridge",
    name: "Wide Iron Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Wide_Iron_Bridge.png",
    baseSellPrice: 12500,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wide_palm_wood_bridge",
    name: "Wide Palm Wood Bridge",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Wide_Palm_Wood_Bridge.png",
    baseSellPrice: 5681,
    source: ["Building Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Nails",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Palm Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "windmill",
    name: "Windmill",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/04/Inv_Windmill.png",
    baseSellPrice: 28988,
    source: ["Building Licence Level 2"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Tin Sheet",
            count: 20,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            name: "Old Gear",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
          },
          {
            name: "Old Spring",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Old Wheel",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
          },
        ],
      },
    ],
  },
  {
    id: "wooden_bat",
    name: "Wooden Bat",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Wooden_Bat.png",
    baseSellPrice: 212,
    source: ["Hunting Licence Level 1"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Gum Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Spinifex Resin",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "wooden_crate",
    name: "Wooden Crate",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Wooden_Crate.png",
    baseSellPrice: 754,
    source: ["Fletch"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Gum Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "wooden_flower_bed",
    name: "Wooden Flower Bed",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Wooden_Flower_Bed.png",
    baseSellPrice: 330,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 2,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Plank",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "wooden_lamp_post",
    name: "Wooden Lamp Post",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/61/Inv_Wooden_Lamp_Post.png",
    baseSellPrice: 558,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Palm Wood Fence",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Palm_Wood_Fence.png",
          },
          {
            name: "Nails",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Wooden Torch",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
          },
        ],
      },
    ],
  },
  {
    id: "wooden_torch",
    name: "Wooden Torch",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Wooden_Torch.png",
    baseSellPrice: 14,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Mangrove Stick",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
  },
  {
    id: "worm_farm",
    name: "Worm Farm",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Inv_Worm_Farm.png",
    baseSellPrice: 23938,
    source: ["Bug Catching Level 20"],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Roo Poo",
            count: 25,
            img: "https://static.wikia.nocookie.net/dinkum/images/9/9b/Inv_Roo_Poo.png",
          },
          {
            name: "Bone",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Bone.png",
          },
          {
            name: "Copper Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            name: "Iron Bar",
            count: 5,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Hard Wood Plank",
            count: 15,
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
        ],
      },
    ],
  },
  {
    id: "wrought_iron_bench",
    name: "Wrought Iron Bench",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/be/Inv_Wrought_Iron_Bench.png",
    baseSellPrice: 5000,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wrought_iron_fence",
    name: "Wrought Iron Fence",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/66/Inv_Wrought_Iron_Fence.png",
    baseSellPrice: 625,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 8,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wrought_iron_gate",
    name: "Wrought Iron Gate",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Wrought_Iron_Gate.png",
    baseSellPrice: 5000,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Iron Bar",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
        ],
      },
    ],
  },
  {
    id: "wrought_iron_lamp",
    name: "Wrought Iron Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/18/Inv_Wrought_Iron_Lamp.png",
    baseSellPrice: 4044,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Quartz Crystal",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Iron Bar",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "yellow_morel_lamp",
    name: "Yellow Morel Lamp",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/61/Inv_Yellow_Morel_Lamp.png",
    baseSellPrice: 4919,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Yellow Morel",
            count: 10,
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Yellow_Morel.png",
          },
          {
            name: "Quartz Crystal",
            count: 2,
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
          {
            name: "Glass Bulb",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2f/Inv_Glass_Bulb.png",
          },
        ],
      },
    ],
  },
  {
    id: "yellow_tile_path",
    name: "Yellow Tile Path",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ec/Inv_Yellow_Tile_Path.png",
    baseSellPrice: 16,
    source: [
      "NPC Jobs",
      "Franklyn's Lab",
      "Jimmy's Boat",
      "Undergrove",
      "Island Reef",
      "Hot Hot Hot",
    ],
    outputCount: 16,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            name: "Yellow Paint",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Yellow_Paint.png",
          },
          {
            name: "Bag of Cement",
            count: 1,
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
];

export const getCraftingRecipesBySource = (
  data: Recipe[],
  value: string,
): Recipe[] => {
  return data.filter((item) => item.source?.includes(value));
};

export const getCraftingRecipesBySearchValue = (
  data: Recipe[],
  searchValue: string,
): Recipe[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueCraftingRecipeSources = (): FilterObject[] => {
  const sources = new Set<string>();
  craftingRecipes.forEach((recipe) => {
    if (recipe.source && recipe.source.length > 0) {
      recipe.source.forEach((src) => {
        sources.add(src);
      });
    }
  });
  return [
    { id: "All", value: "All Sources" },
    ...Array.from(sources)
      .sort()
      .map((source) => ({
        id: source,
        value: source,
      })),
  ];
};
