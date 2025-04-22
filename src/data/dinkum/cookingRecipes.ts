import { CookingRecipe } from "@/types/dinkum";

export const cookingRecipes: CookingRecipe[] = [
  {
    id: "apple_jam",
    name: "Apple Jam",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Apple_Jam.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Apple",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 3100,
    buffs: {
      length: 10,
      healthRegenRate: 3,
      speedLevel: 1,
    },
  },
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
    cookingLocation: ["Grain Mill"],
    baseSellPrice: 50,
  },
  {
    id: "banana_jam",
    name: "Banana Jam",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/49/Inv_Banana_Jam.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Apple",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 3100,
    buffs: {
      length: 10,
      staminaRegenRate: 5,
      speedLevel: 1,
    },
  },
  {
    id: "big_fried_egg",
    name: "Big Fried Egg",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Big_Fried_Egg.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 817,
    buffs: {
      length: 7,
      staminaRegenRate: 2.5,
      staminaMax: 20,
    },
  },
  {
    id: "bottle_brush_brew",
    name: "Bottle Brush Brew",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0a/Inv_Bottle_Brush_Brew.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Bottle Brush Tea",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Bottle_Brush_Tea.png",
          },
        ],
      },
    ],
    cookingLocation: ["Keg"],
    baseSellPrice: 10780,
    buffs: {
      length: 16,
      healthRegenRate: 2,
      healthMax: 25,
      fastHealthTickSpeedLevel: 2,
    },
  },
  {
    id: "bottle_brush_tea",
    name: "Bottle Brush Tea",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Bottle_Brush_Tea.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Bottle Brush",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e3/Inv_Bottle_Brush_Flower.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 2695,
    buffs: {
      length: 8,
      healthRegenRate: 2,
      fastHealthTickSpeedLevel: 1,
    },
  },
  {
    id: "bread",
    name: "Bread",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 3,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 3240,
    sheilasSellPrice: 8100,
    jimmysSellPrice: 4860,
    buffs: {
      length: 15,
      healthRegenRate: 3,
      staminaRegenRate: 1,
      defenseLevel: 1,
    },
  },
  {
    id: "burger",
    name: "Burger",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/23/Inv_Burger.png",
    outputCount: 1,
    variants: [
      {
        id: "cheese",
        inputs: [
          {
            count: 1,
            name: "Damper",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f4/Inv_Damper.png",
          },
          {
            count: 1,
            name: "Cooked Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
          },
          {
            count: 1,
            name: "Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Cheese.png",
          },
        ],
      },
      {
        id: "high_quality_cheese",
        inputs: [
          {
            count: 1,
            name: "Damper",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f4/Inv_Damper.png",
          },
          {
            count: 1,
            name: "Cooked Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
          },
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 5780,
    sheilasSellPrice: 14450,
    tedsSellPrice: 11560,
    jimmysSellPrice: 8670,
    buffs: {
      length: 35,
      healthRegenRate: 3,
      healthMax: 0.5,
      staminaRegenRate: 7,
      staminaMax: 20,
    },
  },
  {
    id: "caviar",
    name: "Caviar",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Inv_Caviar.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 30,
            name: "Fish Roe",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Fish_Roe.png",
          },
        ],
      },
    ],
    cookingLocation: ["Keg"],
    baseSellPrice: 76000,
    buffs: {
      length: 20,
      healthRegenRate: 2,
      healthMax: 10,
      staminaRegenRate: 8,
      staminaMax: 10,
      fishLevel: 2,
      swimmingLevel: 2,
    },
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
    cookingLocation: ["Cheese Maker"],
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
    id: "cheesy_spag",
    name: "Cheesy Spag",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bb/Inv_Cheesy_Spag.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 5125,
    sheilasSellPrice: 12812,
    tedsSellPrice: 10250,
    jimmysSellPrice: 7688,
    buffs: {
      length: 20,
      healthRegenRate: 1,
      healthMax: 0.5,
      staminaRegenRate: 3.5,
      staminaMax: 0.5,
      attackLevel: 2,
      defenseLevel: 1,
    },
  },
  {
    id: "coconut_drink",
    name: "Coconut Drink",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/56/Inv_Coconut_Drink.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Coconut",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 2695,
    buffs: {
      length: 8,
      staminaRegenRate: 3,
      defenseLevel: 1,
      swimmingLevel: 1,
    },
  },
  {
    id: "coffee",
    name: "Coffee",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3c/Inv_Coffee.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Roasted Coffee Beans",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Roasted_Coffee_Beans.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 6194,
    buffs: {
      length: 5,
      staminaRegenRate: 12,
      speedLevel: 1,
      sleepless: true,
    },
  },
  {
    id: "cooked_apple",
    name: "Cooked Apple",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Cooked_Apple.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Apple",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 390,
    buffs: {
      length: 4,
      healthRegenRate: 2,
    },
  },
  {
    id: "cooked_banana",
    name: "Cooked Banana",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Cooked_Banana.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Banana",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 290,
    buffs: {
      length: 4,
      staminaRegenRate: 2,
    },
  },
  {
    id: "cooked_blob_fish",
    name: "Cooked Blob Fish",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Cooked_Blob_Fish.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Blob Fish",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/6d/Inv_Blob_Fish.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 201,
    buffs: {
      length: 10,
      healthRegenRate: 1,
      staminaRegenRate: 0.2,
    },
  },
  {
    id: "cooked_bush_lime",
    name: "Cooked Bush Lime",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/75/Inv_Cooked_Bush_Lime.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Bush Lime",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 190,
    buffs: {
      length: 4,
      healthRegenRate: 1,
      staminaRegenRate: 1.2,
    },
  },
  {
    id: "cooked_cactus_fig",
    name: "Cooked Cactus Fig",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Cooked_Cactus_Fig.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Cactus Fig",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Cactus_Figs.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 250,
    buffs: {
      length: 2,
      staminaRegenRate: 1,
    },
  },
  {
    id: "cooked_cherries",
    name: "Cooked Cherries",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/89/Inv_Cooked_Cherries.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Cherries",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Cherries.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 410,
    buffs: {
      length: 4,
      healthRegenRate: 1,
    },
  },
  {
    id: "cooked_croco_meat",
    name: "Cooked Croco Meat",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Cooked_Croco_Meat.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Croco Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/35/Inv_Croco_Meat.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 1750,
    buffs: {
      length: 12,
      healthRegenRate: 3,
      healthMax: 10,
      staminaRegenRate: 1,
      staminaMax: 5,
    },
  },
  {
    id: "cooked_drumstick",
    name: "Cooked Drumstick",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/98/Inv_Cooked_Drumstick.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Drimpstick",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Raw_Drumstick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 700,
    buffs: {
      length: 6,
      healthRegenRate: 2,
      staminaRegenRate: 2,
    },
  },
  {
    id: "cooked_flake",
    name: "Cooked Flake",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/98/Inv_Cooked_Flake.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flake",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f6/Inv_Flake.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 1900,
    buffs: {
      length: 12,
      healthRegenRate: 2,
      healthMax: 20,
      staminaRegenRate: 3,
      staminaMax: 20,
    },
  },
  {
    id: "cooked_freshwater_fish",
    name: "Cooked Freshwater Fish",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Cooked_Freshwater_Fish.png",
    outputCount: "Varies",
    variants: [
      {
        id: "barcoo_grunter",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Barcoo Grunter",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Barcoo_Grunter.png",
          },
        ],
      },
      {
        id: "barramundi",
        outputCount: 5,
        inputs: [
          {
            count: 1,
            name: "Barramundi",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Barramundi.png",
          },
        ],
      },
      {
        id: "blackfish",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Blackfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Blackfish.png",
          },
        ],
      },
      {
        id: "bonytongue",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Bonytongue",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bonytongue.png",
          },
        ],
      },
      {
        id: "carp",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Carp",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Carp.png",
          },
        ],
      },
      {
        id: "deep_fish",
        outputCount: 10,
        inputs: [
          {
            count: 1,
            name: "Deep Fish",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b1/Inv_Deep_Fish.png",
          },
        ],
      },
      {
        id: "galaxias",
        outputCount: 3,
        inputs: [
          {
            count: 1,
            name: "Galaxias",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Galaxias.png",
          },
        ],
      },
      {
        id: "golden_perch",
        outputCount: 3,
        inputs: [
          {
            count: 1,
            name: "Golden Perch",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Golden_Perch.png",
          },
        ],
      },
      {
        id: "grayling",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Grayling",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a5/Inv_Grayling.png",
          },
        ],
      },
      {
        id: "jungle_perch",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Jungle Perch",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/dc/Inv_Jungle_Perch.png",
          },
        ],
      },
      {
        id: "murray_cod",
        outputCount: 6,
        inputs: [
          {
            count: 1,
            name: "Murray Cod",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4d/Inv_Murray_Cod.png",
          },
        ],
      },
      {
        id: "rainbow_fish",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Rainbow Fish",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Rainbow_Fish.png",
          },
        ],
      },
      {
        id: "river_bass",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "River Bass",
            img: "https://static.wikia.nocookie.net/dinkum/images/8/88/Inv_River_Bass.png",
          },
        ],
      },
      {
        id: "saratoga",
        outputCount: 4,
        inputs: [
          {
            count: 1,
            name: "Saratoga",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/dc/Inv_Saratoga.png",
          },
        ],
      },
      {
        id: "short_finned_eel",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Short Finned Eel",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1e/Inv_Short_Finned_Eel.png",
          },
        ],
      },
      {
        id: "silver_perch",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Silver Perch",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/95/Inv_Silver_Perch.png",
          },
        ],
      },
      {
        id: "tarpon",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Tarpon",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/19/Inv_Tarpon.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 2000,
    buffs: {
      length: 5,
      healthRegenRate: 1,
      staminaRegenRate: 2,
      defenseLevel: 1,
    },
  },
  {
    id: "cooked_giant_drumstick",
    name: "Cooked Giant Drumstick",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Cooked_Giant_Drumstick.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Giant Drumpstick",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Raw_Giant_Drumstick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 1500,
    buffs: {
      length: 12,
      healthMax: 5,
      staminaRegenRate: 3,
      staminaMax: 10,
    },
  },
  {
    id: "cooked_grub_meat",
    name: "Cooked Grub Meat",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2e/Inv_Cooked_Grub_Meat.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Grub Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Raw_Grub_Meat.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 800,
    buffs: {
      length: 8,
      healthRegenRate: 2,
      staminaRegenRate: 1.6,
      miningLevel: 2,
    },
  },
  {
    id: "cooked_meat",
    name: "Cooked Meat",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 800,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 1.6,
    },
  },
  {
    id: "cooked_mushroom",
    name: "Cooked Mushroom",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Cooked_Mushroom.png",
    outputCount: 1,
    variants: [
      {
        id: "field_mushroom",
        inputs: [
          {
            count: 1,
            name: "Field Mushroom",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Field_Mushroom.png",
          },
        ],
      },
      {
        id: "milk_cap",
        inputs: [
          {
            count: 1,
            name: "Milk Cap",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Milk_Cap.png",
          },
        ],
      },
      {
        id: "red_roundhead",
        inputs: [
          {
            count: 1,
            name: "Red Roundhead",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d1/Inv_Red_Roundhead.png",
          },
        ],
      },
      {
        id: "slippery_jack",
        inputs: [
          {
            count: 1,
            name: "Slippery Jack",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Slippery_Jack.png",
          },
        ],
      },
      {
        id: "yellow_morel",
        inputs: [
          {
            count: 1,
            name: "Yellow Morel",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Yellow_Morel.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 140,
    buffs: {
      length: 5,
      healthRegenRate: 2,
      staminaRegenRate: 5,
    },
  },
  {
    id: "cooked_prawn",
    name: "Cooked Prawn",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2c/Inv_Cooked_Prawn.png",
    outputCount: 1,
    variants: [
      {
        id: "tiger_prawn",
        inputs: [
          {
            count: 1,
            name: "Tiger Prawn",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/32/Inv_Tiger_Prawn.png",
          },
        ],
      },
      {
        id: "king_prawn",
        inputs: [
          {
            count: 1,
            name: "King Prawn",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/25/Inv_King_Prawn.png",
          },
        ],
      },
      {
        id: "fresh_water_prawn",
        inputs: [
          {
            count: 1,
            name: "Fresh Water Prawn",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Fresh_Water_Prawn.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 2800,
    buffs: {
      length: 8,
      healthRegenRate: 1,
      staminaRegenRate: 3,
      fishLevel: 1,
    },
  },
  {
    id: "cooked_prime_meat",
    name: "Cooked Prime Meat",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/52/Inv_Cooked_Prime_Meat.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Prime Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Inv_Raw_Prime_Meat.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 6000,
    buffs: {
      length: 15,
      healthRegenRate: 2,
      healthMax: 40,
      staminaRegenRate: 2,
      staminaMax: 10,
    },
  },
  {
    id: "cooked_quandong",
    name: "Cooked Quandong",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/86/Inv_Cooked_Quandong.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Quandong",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Quandong.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 220,
    buffs: {
      length: 4,
      healthRegenRate: 2,
      staminaRegenRate: 0.4,
    },
  },
  {
    id: "cooked_rice",
    name: "Cooked Rice",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Cooked_Rice.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Cooked Rice",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Rice.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 288,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 1.6,
    },
  },
  {
    id: "cooked_saltwater_fish",
    name: "Cooked Saltwater Fish",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/84/Inv_Cooked_Saltwater_Fish.png",
    outputCount: "Varies",
    variants: [
      {
        id: "anchovy",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Anchovy",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/56/Inv_Anchovy.png",
          },
        ],
      },
      {
        id: "banded_morwong",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Banded Morwong",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Inv_Banded_Morwong.png",
          },
        ],
      },
      {
        id: "barracuda",
        outputCount: 5,
        inputs: [
          {
            count: 1,
            name: "Barracuda",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/63/Inv_Barracuda.png",
          },
        ],
      },
      {
        id: "black__white_snapper",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Black & White Snapper",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ca/Inv_Black_%26_White_Snapper.png",
          },
        ],
      },
      {
        id: "blue_spot_flathead",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Blue Spot Flathead",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/db/Inv_Blue_Spot_Flathead.png",
          },
        ],
      },
      {
        id: "blue_tang",
        outputCount: 3,
        inputs: [
          {
            count: 1,
            name: "Blue Tang",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Blue_Tang.png",
          },
        ],
      },
      {
        id: "bluefish",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Bluefish",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e6/Inv_Bluefish.png",
          },
        ],
      },
      {
        id: "boofhead_catfish",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Boofhead Catfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Boofhead_Catfish.png",
          },
        ],
      },
      {
        id: "clown_fish",
        outputCount: 3,
        inputs: [
          {
            count: 1,
            name: "Clown Fish",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7b/Inv_Clown_Fish.png",
          },
        ],
      },
      {
        id: "eel_tailed_catfish",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Eel Tailed Catfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Eel_Tailed_Catfish.png",
          },
        ],
      },
      {
        id: "eyestripe_surgeonfish",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Eyestripe Surgeonfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Inv_Eyestripe_Surgeonfish.png",
          },
        ],
      },
      {
        id: "garfish",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Garfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/75/Inv_Garfish.png",
          },
        ],
      },
      {
        id: "goat_fish",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Goat Fish",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Goat_Fish.png",
          },
        ],
      },
      {
        id: "humphead_wrasse",
        outputCount: 6,
        inputs: [
          {
            count: 1,
            name: "Humphead Wrasse",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f2/Inv_Humphead_Wrasse.png",
          },
        ],
      },
      {
        id: "lionfish",
        outputCount: 4,
        inputs: [
          {
            count: 1,
            name: "Lionfish",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Lionfish.png",
          },
        ],
      },
      {
        id: "luderick",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Luderick",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/01/Inv_Luderick.png",
          },
        ],
      },
      {
        id: "mangrove_jack",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Mangrove Jack",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Mangrove_Jack.png",
          },
        ],
      },
      {
        id: "marlin",
        outputCount: 8,
        inputs: [
          {
            count: 1,
            name: "Marlin",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/51/Inv_Marlin.png",
          },
        ],
      },
      {
        id: "mouth_almighty",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Mouth Almighty",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1b/Inv_Mouth_Almighty.png",
          },
        ],
      },
      {
        id: "stingray",
        outputCount: 2,
        inputs: [
          {
            count: 1,
            name: "Stingray",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/9f/Inv_Stingray.png",
          },
        ],
      },
      {
        id: "travalla",
        outputCount: 3,
        inputs: [
          {
            count: 1,
            name: "Travalla",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1e/Inv_Travalla.png",
          },
        ],
      },
      {
        id: "yellow_tang",
        outputCount: 1,
        inputs: [
          {
            count: 1,
            name: "Yellow Tang",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/37/Inv_Yellow_Tang.png",
          },
        ],
      },
      {
        id: "yellowfin_tuna",
        outputCount: 9,
        inputs: [
          {
            count: 1,
            name: "Yellowfin Tuna",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Yellowfin_Tuna.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 2800,
    buffs: {
      length: 5,
      healthRegenRate: 1,
      staminaRegenRate: 2.5,
      attackLevel: 1,
    },
  },
  {
    id: "cooked_yabbie",
    name: "Cooked Yabbie",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Cooked_Yabbie.png",
    outputCount: 1,
    variants: [
      {
        id: "yabbie",
        inputs: [
          {
            count: 1,
            name: "Yabbie",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Yabbie.png",
          },
        ],
      },
      {
        id: "white_yabbie",
        inputs: [
          {
            count: 1,
            name: "White Yabbie",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f6/Inv_White_Yabbie.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 2800,
    buffs: {
      length: 8,
      healthRegenRate: 1,
      staminaRegenRate: 3,
      fishLevel: 1,
    },
  },
  {
    id: "crab_soup",
    name: "Crab Soup",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f2/Inv_Crab_Soup.png",
    outputCount: 1,
    variants: [
      {
        id: "inland_crab",
        inputs: [
          {
            count: 1,
            name: "Inland Crab",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Inland_Crab.png",
          },
        ],
      },
      {
        id: "mud_crab",
        inputs: [
          {
            count: 1,
            name: "Mud Crab",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Mud_Crab.png",
          },
        ],
      },
      {
        id: "purple_mottled_crab",
        inputs: [
          {
            count: 1,
            name: "Purple Mottled Crab",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d9/Inv_Purple_Mottled_Crab.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 890,
    buffs: {
      length: 10,
      diligent: true,
    },
  },
  {
    id: "croco_skewer",
    name: "Croco Skewer",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Inv_Croco_Skewer.png",
    outputCount: 1,
    variants: [
      {
        id: "croco_meat",
        inputs: [
          {
            count: 1,
            name: "Croco Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/35/Inv_Croco_Meat.png",
          },
          {
            count: 1,
            name: "Onion",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
      {
        id: "cooked_croco_meat",
        inputs: [
          {
            count: 1,
            name: "Cooked Croco Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Cooked_Croco_Meat.png",
          },
          {
            count: 1,
            name: "Onion",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1165,
    sheilasSellPrice: 2912,
    tedsSellPrice: 2330,
    jimmysSellPrice: 1748,
    buffs: {
      length: 15,
      healthRegenRate: 3,
      healthMax: 20,
      staminaRegenRate: 2,
      staminaMax: 10,
      attackLevel: 1,
    },
  },
  {
    id: "dagwood_dog",
    name: "Dagwood Dog",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/59/Inv_Dagwood_Dog.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Corn",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Corn.png",
          },
          {
            count: 1,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 848,
    sheilasSellPrice: 2120,
    tedsSellPrice: 1696,
    jimmysSellPrice: 1272,
    buffs: {
      length: 15,
      healthRegenRate: 2,
      staminaRegenRate: 2.5,
    },
  },
  {
    id: "damper",
    name: "Damper",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f4/Inv_Damper.png",
    outputCount: 1,
    variants: [
      {
        id: "milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Milk.png",
          },
        ],
      },
      {
        id: "high_quality_milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2580,
    sheilasSellPrice: 6450,
    jimmysSellPrice: 3870,
    buffs: {
      length: 15,
      healthRegenRate: 2,
      healthMax: 15,
      staminaRegenRate: 1,
      miningLevel: 2,
    },
  },
  {
    id: "egg_fried_rice",
    name: "Egg Fried Rice",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1e/Inv_Egg_Fried_Rice.png",
    outputCount: 1,
    variants: [
      {
        id: "chicken_egg",
        inputs: [
          {
            count: 1,
            name: "Cooked Rice",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Cooked_Rice.png",
          },
          {
            count: 2,
            name: "Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Chicken_Egg.png",
          },
        ],
      },
      {
        id: "big_chicken_egg",
        inputs: [
          {
            count: 1,
            name: "Cooked Rice",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Cooked_Rice.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 988,
    sheilasSellPrice: 2470,
    jimmysSellPrice: 1482,
    buffs: {
      length: 15,
      healthRegenRate: 2,
      staminaRegenRate: 2.2,
      staminaMax: 10,
    },
  },
  {
    id: "fairy_bread",
    name: "Fairy Bread",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Fairy_Bread.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Bread",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
          },
          {
            count: 2,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1230,
    sheilasSellPrice: 3075,
    jimmysSellPrice: 1845,
    buffs: {
      length: 6,
      healthRegenRate: 1,
      staminaRegenRate: 8,
      speedLevel: 1,
    },
  },
  {
    id: "fish_and_chips",
    name: "Fish and Chips",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Fish_And_Chips.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flake",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f6/Inv_Flake.png",
          },
          {
            count: 2,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
          {
            count: 1,
            name: "Bush Lime",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2320,
    sheilasSellPrice: 5800,
    tedsSellPrice: 4640,
    jimmysSellPrice: 3480,
    buffs: {
      length: 20,
      healthRegenRate: 3,
      healthMax: 10,
      staminaRegenRate: 3,
      staminaMax: 0.5,
      fishLevel: 3,
    },
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
    cookingLocation: ["Grain Mill"],
    baseSellPrice: 1080,
    buffs: {
      length: 5,
      healthRegenRate: 1,
      staminaRegenRate: 0.2,
    },
  },
  {
    id: "fried_egg",
    name: "Fried Egg",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/45/Inv_Fried_Egg.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Chicken_Egg.png",
          },
        ],
      },
    ],
    cookingLocation: ["Campfire", "BBQ"],
    baseSellPrice: 525,
    buffs: {
      length: 7,
      staminaRegenRate: 1.5,
      staminaMax: 10,
    },
  },
  {
    id: "fruit_salad",
    name: "Fruit Salad",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/db/Inv_Fruit_Salad.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 2,
            name: "Bush Lime",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
          },
          {
            count: 2,
            name: "Apple",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Apple.png",
          },
          {
            count: 2,
            name: "Banana",
            img: "https://static.wikia.nocookie.net/dinkum/images/6/62/Inv_Bananas.png",
          },
          {
            count: 2,
            name: "Quandong",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Quandong.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1110,
    sheilasSellPrice: 2775,
    jimmysSellPrice: 1665,
    buffs: {
      length: 10,
      healthRegenRate: 3,
      staminaRegenRate: 3.6,
      defenseLevel: 1,
      foragingLevel: 1,
    },
  },
  {
    id: "garden_salad",
    name: "Garden Salad",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Garden_Salad.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Cabbage",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/77/Inv_Cabbage.png",
          },
          {
            count: 1,
            name: "Tomato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
          },
          {
            count: 1,
            name: "Onion",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2551,
    sheilasSellPrice: 6378,
    jimmysSellPrice: 3826,
    buffs: {
      length: 15,
      healthRegenRate: 4,
      healthMax: 20,
      staminaRegenRate: 4,
      staminaMax: 20,
      defenseLevel: 1,
      miningLevel: 3,
    },
  },
  {
    id: "hearty_stew",
    name: "Hearty Stew",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Hearty_Stew.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
          {
            count: 1,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
          {
            count: 1,
            name: "Onion",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
          },
          {
            count: 1,
            name: "Carrot",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Carrot.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1965,
    sheilasSellPrice: 4912,
    tedsSellPrice: 3930,
    jimmysSellPrice: 2948,
    buffs: {
      length: 20,
      healthRegenRate: 3,
      healthMax: 45,
      staminaRegenRate: 3.5,
      staminaMax: 10,
      attackLevel: 1,
      defenseLevel: 2,
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
    cookingLocation: ["Cheese Maker"],
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
    cookingLocation: ["Ice Cream Maker"],
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
    id: "jam_toast",
    name: "Jam Toast",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Jam_Toast.png",
    outputCount: 3,
    variants: [
      {
        id: "apple_jam",
        inputs: [
          {
            count: 1,
            name: "Bread",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
          },
          {
            count: 1,
            name: "Apple Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Apple_Jam.png",
          },
        ],
      },
      {
        id: "banana_jam",
        inputs: [
          {
            count: 1,
            name: "Bread",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
          },
          {
            count: 1,
            name: "Banana Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/49/Inv_Banana_Jam.png",
          },
        ],
      },
      {
        id: "lime_jam",
        inputs: [
          {
            count: 1,
            name: "Bread",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
          },
          {
            count: 1,
            name: "Lime Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Lime_Jam.png",
          },
        ],
      },
      {
        id: "quandong_jam",
        inputs: [
          {
            count: 1,
            name: "Bread",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Bread.png",
          },
          {
            count: 1,
            name: "Quandong Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Quandong_Jam.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2113,
    sheilasSellPrice: 5282,
    jimmysSellPrice: 3170,
    buffs: {
      length: 8,
      healthRegenRate: 1,
      staminaRegenRate: 2,
      staminaMax: 10,
      speedLevel: 1,
    },
  },
  {
    id: "jelly_brew",
    name: "Jelly Brew",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Jelly_Brew.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Jelly",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a5/Inv_Jelly.png",
          },
        ],
      },
    ],
    cookingLocation: ["Keg"],
    baseSellPrice: 5000,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 2,
      experienceLevel: 1,
      fishLevel: 1,
    },
  },
  {
    id: "lamington",
    name: "Lamington",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/30/Inv_Lamington.png",
    outputCount: 1,
    variants: [
      {
        id: "chicken_egg_milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
          {
            count: 1,
            name: "Cocunut",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
          },
          {
            count: 1,
            name: "Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Milk.png",
          },
        ],
      },
      {
        id: "chicken_egg_high_quality_milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
          {
            count: 1,
            name: "Cocunut",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
          },
          {
            count: 1,
            name: "Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
        ],
      },
      {
        id: "big_chicken_egg_milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
          {
            count: 1,
            name: "Cocunut",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c6/Inv_Milk.png",
          },
        ],
      },
      {
        id: "big_chicken_egg_high_quality_milk",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
          {
            count: 1,
            name: "Cocunut",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Coconut.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 4031,
    sheilasSellPrice: 10078,
    jimmysSellPrice: 6046,
    buffs: {
      length: 20,
      healthRegenRate: 1,
      healthMax: 15,
      staminaRegenRate: 6,
      staminaMax: 0.5,
      defenseLevel: 1,
      foragingLevel: 1,
      miningLevel: 1,
      speedLevel: 3,
    },
  },
  {
    id: "lime_jam",
    name: "Lime Jam",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Lime_Jam.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Bush Lime",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/af/Inv_Bush_Lime.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 3100,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 3,
      speedLevel: 1,
    },
  },
  {
    id: "lot_burger",
    name: "Lot Burger",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Inv_Lot_Burger.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Damper",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/f4/Inv_Damper.png",
          },
          {
            count: 1,
            name: "Cooked Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
          },
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
          {
            count: 1,
            name: "Big Fried Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Big_Fried_Egg.png",
          },
          {
            count: 1,
            name: "Tomato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
          },
          {
            count: 1,
            name: "Beetroot",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/93/Inv_Beetroot.png",
          },
          {
            count: 1,
            name: "Pineapple",
            img: "https://static.wikia.nocookie.net/dinkum/images/8/87/Inv_Pineapple.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 24473,
    sheilasSellPrice: 61182,
    tedsSellPrice: 48946,
    jimmysSellPrice: 36710,
    buffs: {
      length: 60,
      healthRegenRate: 5,
      healthMax: 50,
      staminaRegenRate: 14,
      staminaMax: 50,
      defenseLevel: 2,
      diligent: true,
    },
  },
  {
    id: "meat_pie",
    name: "Meat Pie",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Meat_Pie.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
          {
            count: 1,
            name: "Raw Drumstick",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/0e/Inv_Raw_Drumstick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1830,
    sheilasSellPrice: 4575,
    tedsSellPrice: 3660,
    jimmysSellPrice: 2745,
    buffs: {
      length: 20,
      healthRegenRate: 2,
      healthMax: 25,
      staminaRegenRate: 4,
      staminaMax: 5,
      attackLevel: 1,
    },
  },
  {
    id: "meat_on_a_stick",
    name: "Meat on a stick.",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/69/Inv_Meat_on_a_Stick.png",
    outputCount: 1,
    variants: [
      {
        id: "raw_meat",
        inputs: [
          {
            count: 2,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
      {
        id: "cooked_meat",
        inputs: [
          {
            count: 2,
            name: "Cooked Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 890,
    sheilasSellPrice: 2225,
    tedsSellPrice: 1780,
    jimmysSellPrice: 1335,
    buffs: {
      length: 15,
      healthRegenRate: 3,
      staminaRegenRate: 3,
      defenseLevel: 1,
    },
  },
  {
    id: "mushroom_risotto",
    name: "Mushroom Risotto",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8b/Inv_Mushroom_Risotto.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Cooked Rice",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Cooked_Rice.png",
          },
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
          {
            count: 1,
            name: "Wattle Brew",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5b/Inv_Wattle_Brew.png",
          },
          {
            count: 5,
            name: "Field Mushroom",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Field_Mushroom.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 11418,
    sheilasSellPrice: 28545,
    jimmysSellPrice: 17127,
    buffs: {
      length: 25,
      healthRegenRate: 2,
      healthMax: 25,
      staminaRegenRate: 5,
      staminaMax: 25,
      foragingLevel: 3,
      miningLevel: 3,
      diligent: true,
    },
  },
  {
    id: "mushroom_soup",
    name: "Mushroom Soup",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Mushroom_Soup.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Field Mushroom",
            img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Field_Mushroom.png",
          },
          {
            count: 1,
            name: "Milk Cap",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Milk_Cap.png",
          },
          {
            count: 1,
            name: "Slippery Jack",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Slippery_Jack.png",
          },
          {
            count: 1,
            name: "Yellow Morel",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Yellow_Morel.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 1000,
    sheilasSellPrice: 2500,
    tedsSellPrice: 2000,
    jimmysSellPrice: 1500,
    buffs: {
      length: 20,
      healthRegenRate: 3,
      healthMax: 35,
      staminaRegenRate: 3.5,
      staminaMax: 10,
      attackLevel: 1,
      defenseLevel: 2,
    },
  },
  {
    id: "parmy_and_chips",
    name: "Parmy and Chips",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Parmy_and_Chips.png",
    outputCount: 1,
    variants: [
      {
        id: "cheese",
        inputs: [
          {
            count: 1,
            name: "Raw Drumstick",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Raw_Giant_Drumstick.png",
          },
          {
            count: 2,
            name: "Tomato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
          },
          {
            count: 1,
            name: "Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Inv_Cheese.png",
          },
          {
            count: 1,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
        ],
      },
      {
        id: "high_quality_cheese",
        inputs: [
          {
            count: 1,
            name: "Raw Drumstick",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a7/Inv_Raw_Giant_Drumstick.png",
          },
          {
            count: 2,
            name: "Tomato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
          },
          {
            count: 1,
            name: "High Quality Cheese",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_High_Quality_Cheese.png",
          },
          {
            count: 1,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2424,
    sheilasSellPrice: 10605,
    tedsSellPrice: 8484,
    jimmysSellPrice: 6363,
    buffs: {
      length: 20,
      healthRegenRate: 3,
      healthMax: 10,
      staminaRegenRate: 7,
      staminaMax: 0.5,
      attackLevel: 2,
    },
  },
  {
    id: "pastie",
    name: "Pastie",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Pastie.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Cabbage",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/77/Inv_Cabbage.png",
          },
          {
            count: 1,
            name: "Carrot",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Carrot.png",
          },
          {
            count: 1,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 3945,
    sheilasSellPrice: 9862,
    jimmysSellPrice: 5918,
    buffs: {
      length: 25,
      healthRegenRate: 2,
      healthMax: 20,
      staminaRegenRate: 3,
      staminaMax: 20,
      foragingLevel: 3,
      miningLevel: 3,
    },
  },
  {
    id: "pavlova",
    name: "Pavlova",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/44/Inv_Pavlova.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 4,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 2,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
          {
            count: 1,
            name: "Fruit Salad",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/db/Inv_Fruit_Salad.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 4970,
    sheilasSellPrice: 12425,
    jimmysSellPrice: 7455,
    buffs: {
      length: 25,
      healthRegenRate: 1,
      healthMax: 15,
      staminaRegenRate: 8,
      staminaMax: 15,
      experienceLevel: 2,
      speedLevel: 3,
    },
  },
  {
    id: "prime_roast",
    name: "Prime Roast",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/75/Inv_Prime_Roast.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Raw Prime Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Inv_Raw_Prime_Meat.png",
          },
          {
            count: 3,
            name: "Potato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
          },
          {
            count: 2,
            name: "Carrot",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Carrot.png",
          },
          {
            count: 1,
            name: "Kale",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a0/Inv_Kale.png",
          },
          {
            count: 3,
            name: "Green Bean",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Green_Bean.png",
          },
          {
            count: 1,
            name: "Pumpkin",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 10395,
    sheilasSellPrice: 25988,
    tedsSellPrice: 20790,
    jimmysSellPrice: 15592,
    buffs: {
      length: 60,
      healthRegenRate: 5,
      healthMax: 50,
      staminaRegenRate: 4,
      staminaMax: 50,
      attackLevel: 3,
      defenseLevel: 3,
    },
  },
  {
    id: "pumpkin_soup",
    name: "Pumpkin Soup",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2c/Inv_Pumpkin_Soup.png",
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
          {
            count: 1,
            name: "Pumpkin",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
          },
        ],
      },
      {
        id: "high_quality_milk",
        inputs: [
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
          {
            count: 1,
            name: "Pumpkin",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 4620,
    sheilasSellPrice: 11550,
    jimmysSellPrice: 6930,
    buffs: {
      length: 20,
      staminaRegenRate: 6,
      staminaMax: 20,
    },
  },
  {
    id: "quandong_jam",
    name: "Quandong Jam",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Quandong_Jam.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Quandong",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cf/Inv_Quandong.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 3100,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 1.2,
      speedLevel: 1,
    },
  },
  {
    id: "roasted_coffee_beans",
    name: "Roasted Coffee Beans",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Roasted_Coffee_Beans.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 3,
            name: "Coffee Beans",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/e4/Inv_Coffee_Bean.png",
          },
        ],
      },
    ],
    cookingLocation: ["BBQ"],
    baseSellPrice: 3097,
    buffs: {
      length: 5,
      staminaRegenRate: 4,
      staminaMax: 10,
      speedLevel: 2,
    },
  },
  {
    id: "roe_nigiri",
    name: "Roe Nigiri",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Roe_Nigiri.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Fish Roe",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Fish_Roe.png",
          },
          {
            count: 1,
            name: "Cooked Rice",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Cooked_Rice.png",
          },
          {
            count: 2,
            name: "Seaweed",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 4308,
    sheilasSellPrice: 10770,
    jimmysSellPrice: 6462,
    buffs: {
      length: 30,
      healthRegenRate: 4,
      healthMax: 25,
      staminaRegenRate: 9,
      staminaMax: 10,
    },
  },
  {
    id: "sausage_roll",
    name: "Sausage Roll",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Sausage_Roll.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Raw Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/cb/Inv_Raw_Meat.png",
          },
          {
            count: 1,
            name: "Onion",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2475,
    sheilasSellPrice: 6188,
    tedsSellPrice: 4950,
    jimmysSellPrice: 3712,
    buffs: {
      length: 20,
      healthRegenRate: 1,
      healthMax: 15,
      staminaRegenRate: 3.5,
      staminaMax: 10,
      attackLevel: 2,
    },
  },
  {
    id: "scone",
    name: "Scone",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Scones.png",
    outputCount: 1,
    variants: [
      {
        id: "apple_jam",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Apple Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/ed/Inv_Apple_Jam.png",
          },
        ],
      },
      {
        id: "banana_jam",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Banana Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/49/Inv_Banana_Jam.png",
          },
        ],
      },
      {
        id: "lime_jam",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Lime Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Lime_Jam.png",
          },
        ],
      },
      {
        id: "quandong_jam",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "High Quality Milk",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Inv_High_Quality_Milk.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Quandong Jam",
            img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Quandong_Jam.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 7025,
    sheilasSellPrice: 17562,
    jimmysSellPrice: 10538,
    buffs: {
      length: 15,
      healthRegenRate: 2,
      healthMax: 20,
      staminaRegenRate: 5,
      staminaMax: 15,
      miningLevel: 2,
    },
  },
  {
    id: "seaweed_soup",
    name: "Seaweed Soup",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Seaweed_Soup.png",
    outputCount: 1,
    variants: [
      {
        id: "seaweed",
        inputs: [
          {
            count: 10,
            name: "Seaweed",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
          },
        ],
      },
      {
        id: "red_seaweed",
        inputs: [
          {
            count: 10,
            name: "Red Seaweed",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Red_Seaweed.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 400,
    buffs: {
      length: 8,
      healthRegenRate: 1,
      staminaRegenRate: 2,
      swimmingLevel: 1,
    },
  },
  {
    id: "spag_bol",
    name: "Spag Bol",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/84/Inv_Spag_Bol.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Flour",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Flour.png",
          },
          {
            count: 1,
            name: "Big Chicken Egg",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Big_Chicken_Egg.png",
          },
          {
            count: 1,
            name: "Tomato",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
          },
          {
            count: 1,
            name: "Cooked Meat",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/48/Inv_Cooked_Meat.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2776,
    sheilasSellPrice: 6940,
    tedsSellPrice: 5552,
    jimmysSellPrice: 4164,
    buffs: {
      length: 20,
      healthRegenRate: 1,
      healthMax: 0.5,
      staminaRegenRate: 3.5,
      staminaMax: 0.5,
      attackLevel: 2,
      defenseLevel: 1,
    },
  },
  {
    id: "sparkin_soup",
    name: "Sparkin' Soup",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/bd/Inv_Sparkin%27_Soup.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 2,
            name: "Thunder Sac",
            img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Thunder_Sac.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kit", "Cooking Kettle"],
    baseSellPrice: 1519,
    buffs: {
      length: 10,
      charged: true,
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
    cookingLocation: ["Grain Mill"],
    baseSellPrice: 840,
    buffs: {
      length: 5,
      staminaRegenRate: 4,
      staminaMax: 5,
    },
  },
  {
    id: "toffee",
    name: "Toffee",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Inv_Toffee.png",
    outputCount: 3,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 2,
            name: "Honey",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Honey.png",
          },
          {
            count: 1,
            name: "Sugar",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/1f/Inv_Sugar.png",
          },
        ],
      },
    ],
    cookingLocation: ["Cooking Table"],
    baseSellPrice: 2346,
    sheilasSellPrice: 5865,
    jimmysSellPrice: 3519,
    buffs: {
      length: 8,
      staminaRegenRate: 10,
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
    cookingLocation: ["Ice Cream Maker"],
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
    id: "wattle_brew",
    name: "Wattle Brew",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5b/Inv_Wattle_Brew.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Wattle Tea",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Wattle_Tea.png",
          },
        ],
      },
    ],
    cookingLocation: ["Keg"],
    baseSellPrice: 6380,
    buffs: {
      length: 16,
      staminaRegenRate: 3.5,
      staminaMax: 25,
      foragingLevel: 2,
      miningLevel: 2,
    },
  },
  {
    id: "wattle_tea",
    name: "Wattle Tea",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Wattle_Tea.png",
    outputCount: 1,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 10,
            name: "Yellow Wattle Flower",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Yellow_Wattle_Flower.png",
          },
        ],
      },
    ],
    cookingLocation: ["Billy Can Kettle", "Cooking Kettle"],
    baseSellPrice: 1595,
    buffs: {
      length: 8,
      staminaRegenRate: 3.5,
      foragingLevel: 1,
      miningLevel: 1,
    },
  },
];
