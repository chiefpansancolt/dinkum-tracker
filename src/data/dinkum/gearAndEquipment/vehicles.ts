import { FilterArray, Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    id: "bat_glider",
    name: "Bat Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Bat_Glider.png",
    requirementLevel: null,
    source: ["Deep Mine"],
    inputs: [
      {
        count: 20,
        name: "Bat Wing",
        img: "/images/resources/animalProducts/Inv_Bat_Wing.png",
      },
    ],
    baseSellPrice: 500000,
  },
  {
    id: "blue_hang_glider",
    name: "Blue Hang Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Blue_Hang_Glider.png",
    requirementLevel: null,
    source: ["Wish Fountain"],
    baseSellPrice: 400000,
  },
  {
    id: "flame_glider",
    name: "Flame Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Flame_Glider.png",
    requirementLevel: null,
    source: ["Hot Hot Hot"],
    baseSellPrice: 525000,
  },
  {
    id: "galaxy_glider",
    name: "Galaxy Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Galaxy_Glider.png",
    requirementLevel: null,
    source: ["Meteorite"],
    baseSellPrice: 500000,
  },
  {
    id: "gogo_trike",
    name: "Go-Go Trike",
    img: "/images/gearAndEquipment/vehicles/Inv_Go-Go_Trike.png",
    requirementLevel: null,
    source: ["TownCo. Agent"],
    inputs: [
      {
        count: 3,
        name: "Gonut",
        img: "/images/recipes/cookingRecipes/Inv_Gonut.png",
      },
      {
        count: 5,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 3,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 3,
        name: "Tin Bar",
        img: "/images/resources/otherCraftables/Inv_Tin_Bar.png",
      },
      {
        count: 2,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
    ],
    baseSellPrice: 0,
  },
  {
    id: "helicopter",
    name: "Helicopter",
    img: "/images/gearAndEquipment/vehicles/Inv_Helicopter.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 28,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 10,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 15,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 4,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 10,
        name: "Bright Wire",
        img: "/images/resources/otherCraftables/Inv_Bright_Wire.png",
      },
    ],
    buyPrice: 3000000,
    baseSellPrice: 1500000,
  },
  {
    id: "hot_air_balloon",
    name: "Hot Air Balloon",
    img: "/images/gearAndEquipment/vehicles/Inv_Hot_Air_Balloon.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 28,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Cloth",
        img: "/images/resources/otherCraftables/Inv_Cloth.png",
      },
      {
        count: 5,
        name: "Flame Sac",
        img: "/images/resources/animalProducts/Inv_Flame_Sac.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 5,
        name: "Copper Bar",
        img: "/images/resources/otherCraftables/Inv_Copper_Bar.png",
      },
      {
        count: 2,
        name: "Furnace",
        img: "/images/gearAndEquipment/equipment/Inv_Furnace.png",
      },
      {
        count: 15,
        name: "Vine",
        img: "/images/resources/foragables/Inv_Vine.png",
      },
    ],
    buyPrice: 1500000,
    baseSellPrice: 750000,
  },
  {
    id: "jet_ski",
    name: "Jet Ski",
    img: "/images/gearAndEquipment/vehicles/Inv_Jet_Ski.png",
    requirementLevel: 1,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 3,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 2,
        name: "Hot Cylinder",
        img: "/images/resources/otherCraftables/Inv_Hot_Cylinder.png",
      },
      {
        count: 1,
        name: "Green Board",
        img: "/images/resources/relics/Inv_Green_Board.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
    ],
    buyPrice: 80000,
    baseSellPrice: 40000,
  },
  {
    id: "leaf_glider",
    name: "Leaf Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Leaf_Glider.png",
    requirementLevel: null,
    source: ["Undergrove", "Island Reef"],
    baseSellPrice: 500000,
  },
  {
    id: "motor_bike",
    name: "Motor Bike",
    img: "/images/gearAndEquipment/vehicles/Inv_Motor_Bike.png",
    requirementLevel: 2,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 3,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 2,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
    ],
    buyPrice: 80000,
    baseSellPrice: 40000,
  },
  {
    id: "pirate_glider",
    name: "Pirate Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Pirate_Glider.png",
    requirementLevel: null,
    source: ["Island Reef"],
    baseSellPrice: 500000,
  },
  {
    id: "plane",
    name: "Plane",
    img: "/images/gearAndEquipment/vehicles/Inv_Plane.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 50,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 8,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 4,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 15,
        name: "Bright Wire",
        img: "/images/resources/otherCraftables/Inv_Bright_Wire.png",
      },
      {
        count: 2,
        name: "Ear Hats",
        img: "/images/resources/relics/Inv_Ear_Hats.png",
      },
      {
        count: 15,
        name: "Copper Bar",
        img: "/images/resources/otherCraftables/Inv_Copper_Bar.png",
      },
      {
        count: 15,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 5,
        name: "Berkonium Bar",
        img: "/images/resources/otherCraftables/Inv_Berkonium_Bar.png",
      },
    ],
    buyPrice: 5000000,
    baseSellPrice: 2500000,
  },
  {
    id: "purple_hang_glider",
    name: "Purple Hang Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Purple_Hang_Glider.png",
    requirementLevel: null,
    source: ["Wish Fountain"],
    baseSellPrice: 400000,
  },
  {
    id: "red_hang_glider",
    name: "Red Hang Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Red_Hang_Glider.png",
    requirementLevel: null,
    source: ["Jimmy's Boat"],
    buyPrice: 800000,
    baseSellPrice: 400000,
  },
  {
    id: "ride_on_lawn_mower",
    name: "Ride On Lawn Mower",
    img: "/images/gearAndEquipment/vehicles/Inv_Ride_On_Lawn_Mower.png",
    requirementLevel: null,
    shinyDiscCount: 1,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 8,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 4,
        name: "Bright Wire",
        img: "/images/resources/otherCraftables/Inv_Bright_Wire.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
      {
        count: 2,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
    ],
    buyPrice: 100000,
    baseSellPrice: 50000,
  },
  {
    id: "rowboat",
    name: "Rowboat",
    img: "/images/gearAndEquipment/vehicles/Inv_Rowboat.png",
    requirementLevel: 1,
    requirementType: "Vehicle Licence",
    source: ["Crafting Table"],
    inputs: [
      {
        count: 10,
        name: "Gum Wood Plank",
        img: "",
      },
      {
        count: 10,
        name: "Palm Wood Plank",
        img: "/images/resources/otherCraftables/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 2,
        name: "Tin Bar",
        img: "/images/resources/otherCraftables/Inv_Tin_Bar.png",
      },
      {
        count: 4,
        name: "Nails",
        img: "",
      },
    ],
    baseSellPrice: 6328,
  },
  {
    id: "sail_boat",
    name: "Sail Boat",
    img: "/images/gearAndEquipment/vehicles/Inv_Sail_Boat.png",
    requirementLevel: 1,
    requirementType: "Vehicle Licence",
    source: ["Crafting Table"],
    inputs: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "/images/resources/otherCraftables/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Palm Wood Plank",
        img: "/images/resources/otherCraftables/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "/images/resources/otherCraftables/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Copper Bar",
        img: "/images/resources/otherCraftables/Inv_Copper_Bar.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 10,
        name: "Cloth",
        img: "/images/resources/otherCraftables/Inv_Cloth.png",
      },
      {
        count: 1,
        name: "Wooden Chest",
        img: "/images/gearAndEquipment/equipment/Inv_Wooden_Chest.png",
      },
    ],
    baseSellPrice: 116344,
  },
  {
    id: "tractor",
    name: "Tractor",
    img: "/images/gearAndEquipment/vehicles/Inv_Tractor.png",
    requirementLevel: 1,
    requirementType: "Agriculture Licence",
    shinyDiscCount: 20,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 25,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 20,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 2,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
    ],
    buyPrice: 1500000,
    baseSellPrice: 750000,
  },
  {
    id: "ute",
    name: "Ute",
    img: "/images/gearAndEquipment/vehicles/Inv_Ute.png",
    requirementLevel: 2,
    requirementType: "Vehicle Licence",
    shinyDiscCount: 7,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 8,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
      {
        count: 4,
        name: "Tin Sheet",
        img: "/images/resources/otherCraftables/Inv_Tin_Sheet.png",
      },
    ],
    buyPrice: 320000,
    baseSellPrice: 160000,
  },
  {
    id: "train",
    name: "Train",
    img: "/images/gearAndEquipment/vehicles/Inv_Train.png",
    requirementLevel: 1,
    requirementType: "Locomotive Licence",
    shinyDiscCount: 7,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "/images/resources/relics/Inv_Old_Gear.png",
      },
      {
        count: 8,
        name: "Old Spring",
        img: "/images/resources/relics/Inv_Old_Spring.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "/images/resources/otherCraftables/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "/images/resources/relics/Inv_Old_Contraption.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "/images/resources/relics/Inv_Old_Wheel.png",
      },
      {
        count: 4,
        name: "Tin Sheet",
        img: "/images/resources/otherCraftables/Inv_Tin_Sheet.png",
      },
    ],
    buyPrice: 320000,
    baseSellPrice: 160000,
  },
  {
    id: "yellow_hang_glider",
    name: "Yellow Hang Glider",
    img: "/images/gearAndEquipment/vehicles/Inv_Yellow_Hang_Glider.png",
    requirementLevel: null,
    source: ["Deep Mine"],
    baseSellPrice: 400000,
  },
];

export const getVehicleBySource = (
  data: Vehicle[],
  value: string,
): Vehicle[] => {
  return data.filter((item) => item.source.includes(value));
};

export const getVehicleByRequirmentType = (
  data: Vehicle[],
  value: string,
): Vehicle[] => {
  return data.filter((item) => item.requirementType === value);
};

export const getVehicleBySearchValue = (
  data: Vehicle[],
  searchValue: string,
): Vehicle[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueVehicleSources = (): FilterArray => {
  const sources = new Set<string>();

  vehicles.forEach((item) => {
    if (item.source && item.source.length > 0) {
      item.source.forEach((src) => {
        sources.add(src);
      });
    }
  });

  return ["All", ...Array.from(sources).sort()];
};

export const getUniqueVehicleReqType = (): FilterArray => {
  const types = new Set<string>();

  vehicles.forEach((item) => {
    if (item.requirementType) {
      types.add(item.requirementType);
    }
  });

  return ["All", ...Array.from(types).sort()];
};
