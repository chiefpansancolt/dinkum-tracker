import { FilterArray, License } from "@/types";
import { LICENSE_TYPES } from "../constants";

export const licenses: License[] = [
  {
    id: "mining_licence",
    name: "Mining Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/26/Mining_Licence.png",
    requirements: "Based on character Mining skill",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description:
          "Allows the holder to buy pickaxes and break rocks and ore deposits.",
      },
      {
        level: 2,
        skillLevel: 10,
        permitPointCost: 1000,
        description: "Allows the holder to craft a better pickaxe.",
      },
      {
        level: 3,
        skillLevel: 20,
        permitPointCost: 3000,
        description: "Allows the holder to craft a better pickaxe.",
      },
    ],
  },
  {
    id: "deep_mining_licence",
    name: "Deep Mining Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b9/Deep_Mining_Licence.png",
    requirements: "Unlocked after purchasing Mining Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 10,
        permitPointCost: 3500,
        description: "Unlocks the Mine Deed and allows access to the Mine.",
      },
    ],
  },
  {
    id: "logging_licence",
    name: "Logging Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Logging_Licence.png",
    requirements: "Based on character Foraging skill",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to buy axes and chop down trees.",
      },
      {
        level: 2,
        skillLevel: 10,
        permitPointCost: 1000,
        description:
          "Allows the holder to craft a better axe and unlocks Brewing Licence.",
      },
      {
        level: 3,
        skillLevel: 20,
        permitPointCost: 3000,
        description: "Allows the holder to craft a better axe.",
      },
    ],
  },
  {
    id: "fishing_licence",
    name: "Fishing Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/05/Fishing_Licence.png",
    requirements: "Based on character Fishing skill",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows holder to buy fishing rods and catch fish.",
      },
      {
        level: 2,
        skillLevel: 5,
        permitPointCost: 1000,
        description:
          "Allows the holder to see bubbles created by underwater creatures. Unlocks a new fishing rod recipe.",
      },
      {
        level: 3,
        skillLevel: 10,
        permitPointCost: 3000,
        description:
          "Allows the holder to craft Crab Pots. Unlocks a new fishing rod recipe.",
      },
    ],
  },
  {
    id: "fish_farming_licence",
    name: "Fish Farming Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/78/Fish_Farming_Licence.png",
    requirements:
      "Unlocked after purchasing Fishing Licence 3 and Water Scaping Licence",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 2500,
        description:
          "Unlocks the recipe for Fish Ponds, used to breed and farm fish.",
      },
    ],
  },
  {
    id: "excavation_licence",
    name: "Excavation Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Excavation_Licence.png",
    requirements: "",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description: "Allows the holder to purchase and use shovels.",
      },
    ],
  },
  {
    id: "metal_detecting_licence",
    name: "Metal Detecting Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c2/Metal_Detecting_Licence.png",
    requirements: "Unlocked after purchasing Excavation Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description:
          "Allows the holder to buy a metal detector and search for treasure around the island.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 2000,
        description:
          "Allows the holder to notice some buried items using sight alone.",
      },
    ],
  },
  {
    id: "hunting_licence",
    name: "Hunting Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d6/Hunting_Licence.png",
    requirements: "Based on character Hunting skill",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to craft basic weapons.",
      },
      {
        level: 2,
        skillLevel: 5,
        permitPointCost: 1000,
        description:
          "Allows the holder to craft better weapons. Unlocks Trapping Licence.",
      },
      {
        level: 3,
        skillLevel: 10,
        permitPointCost: 3000,
        description:
          "Allows the holder to craft better weapons using animal drops. Animals have an even higher chance to drop other useful items when hunted.",
      },
    ],
  },
  {
    id: "trapping_licence",
    name: "Trapping Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Trapping_Licence.png",
    requirements: "Unlocked after purchasing Hunting Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description:
          "Allows the holder to craft and use animal traps and animal drop off points. Animals successfully dropped off will give a reward.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description:
          "Allows the holder to craft and use advanced animal traps.",
      },
    ],
  },
  {
    id: "farming_licence",
    name: "Farming Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3a/Farming_Licence.png",
    requirements: "Based on character Farming skill",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to buy farming equipment and seeds.",
      },
      {
        level: 2,
        skillLevel: 10,
        permitPointCost: 1000,
        description:
          "Allows the holder to craft fertilzer. Unlocks a new watercan recipe.",
      },
      {
        level: 3,
        skillLevel: 20,
        permitPointCost: 3000,
        description:
          "Allows the holder to access irrigation licence. Unlocks a new watercan recipe.",
      },
    ],
  },
  {
    id: "irrigation_licence",
    name: "Irrigation Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e0/Irrigation_Licence.png",
    requirements: "Unlocked after purchasing Farming Licence 3",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 1000,
        description: "Allows the holder to make Sprinkler and Water Tanks.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 4000,
        description: "Allows the holder to craft improved sprinklers.",
      },
    ],
  },
  {
    id: "handling_licence",
    name: "Handling Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/01/Handling_Licence.png",
    requirements: "Unlocked after purchasing Farming Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to buy and raise Chooks.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description: "Allows the holder to buy and raise Vombats.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 3000,
        description: "Allows the holder to buy and raise Pleep.",
      },
    ],
  },
  {
    id: "animal_processing_licence",
    name: "Animal Processing Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Animal_Processing_Licence.png",
    requirements: "Unlocked after purchasing Handling Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description: "Unlocks Cheese Making recipe for processing Milk.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description: "Unlocks Spinning Wheel recipe for processing Wool.",
      },
    ],
  },
  {
    id: "cargo_licence",
    name: "Cargo Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Cargo_Licence.png",
    requirements: "Unlocked after purchasing Toolbelt Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description: "Allows the holder to expand their pockets by 3 slots.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 2000,
        description: "Allows the holder to expand their pockets by 3 slots.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 6000,
        description: "Allows the holder to expand their pockets by 3 slots.",
      },
    ],
  },
  {
    id: "toolbelt_licence",
    name: "Toolbelt Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fd/Toolbelt_Licence.png",
    requirements:
      "Unlocked after purchasing Fishing Hunting Logging and Mining Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to expand their toolbelt slots by 1.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description: "Allow the holder to expand their toolbelt slots by 1.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 3000,
        description: "Allow the holder to expand their toolbelt slots by 1.",
      },
    ],
  },
  {
    id: "landscaping_licence",
    name: "Landscaping Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9c/Landscaping_Licence.png",
    requirements: "Unlocked after purchasing Logging Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to craft new pathing options.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 500,
        description: "Allows the holder to craft new fencing options.",
      },
    ],
  },
  {
    id: "building_licence",
    name: "Building Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d4/Building_Licence.png",
    requirements: "Unlocked after purchasing Logging Licence 1",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 250,
        description: "Allows the holder to craft simple bridges.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description:
          "Allows the holder to build Windmills to help speed up production tasks.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 3000,
        description:
          "Unlocks the recipes for Advanced Crafting Table and the Advanced Cooking Table.",
      },
    ],
  },
  {
    id: "vehicle_licence",
    name: "Vehicle Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/ff/Vehicle_Licence.png",
    requirements: "",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 1200,
        description: "Allows the holder to purchase and pilot water vehicles.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 2400,
        description: "Allows the holder to purchase and drive land vehicles.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 7200,
        description: "Allows the holder to purchase and pilot flying vehicles.",
      },
    ],
  },
  {
    id: "commerce_licence",
    name: "Commerce Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2e/Commerce_Licence.png",
    requirements:
      "Unlocked after purchasing Fishing Hunting Logging and Mining Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 750,
        description: "The holder will receive 5% more when selling items.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 3000,
        description: "The holder will receive 10% more when selling items.",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 9000,
        description: "The holder will receive 15% more when selling items.",
      },
    ],
  },
  {
    id: "agriculture_vehicle_licence",
    name: "Agriculture Vehicle Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Agriculture_Vehicles_Licence.png",
    requirements:
      "Unlocked after purchasing Farming Licence 3, Vehicle Licence 2, and Irrigation Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 2000,
        description:
          "Allows the holder to purchase Agricultural Vehicles and use the Harvesting Attachment.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 4000,
        description:
          "Allows the holder to use the Ploughing Attachment on Agricultural Vehicles",
      },
      {
        level: 3,
        skillLevel: 0,
        permitPointCost: 6000,
        description:
          "Allows the holder to use the Planting Attachment on Agricultural Vehicles",
      },
    ],
  },
  {
    id: "sign_writing_licence",
    name: "Sign Writing Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Sign_Writing_Licence.png",
    requirements: "Unlocked after purchasing Landscaping Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description:
          "Unlocks the recipe for the Signwriting Table and simple sign recipes.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 1000,
        description: "Unlocks the recipes for advanced signs.",
      },
    ],
  },
  {
    id: "water_scaping_licence",
    name: "Water Scaping Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8c/Water_Scaping_Licence.png",
    requirements: "Unlocked after purchasing Landscaping Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 1000,
        description:
          "Unlocks the recipe for Waterbeds. Used to create waterfalls.",
      },
    ],
  },
  {
    id: "brewing_licence",
    name: "Brewing Licence",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Brewing_Licence.png",
    requirements: "Unlocked after purchasing Logging Licence 2",
    levels: [
      {
        level: 1,
        skillLevel: 0,
        permitPointCost: 500,
        description:
          "Unlocks the Billy Can Kit recipe used for brewing drinks and jams.",
      },
      {
        level: 2,
        skillLevel: 0,
        permitPointCost: 2000,
        description: "Unlocks the Keg recipe used for brewing advanced drinks.",
      },
    ],
  },
];

export const getLicenseTotalLevels = (): number => {
  return licenses.reduce((total, license) => total + license.levels.length, 0);
};

export const getLicenseTotalPermitPoints = (): number => {
  let total = 0;
  licenses.forEach((license) => {
    license.levels.forEach((level) => {
      total += level.permitPointCost;
    });
  });

  return total;
};

export const getLicenseByCategory = (
  data: License[],
  value: string,
): License[] => {
  return data.filter((item) => item.id.includes(value.toLowerCase()));
};

export const getLicenseBySearchValue = (
  data: License[],
  searchValue: string,
): License[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getLicenseCategories = (): FilterArray => {
  return ["All", ...LICENSE_TYPES];
};
