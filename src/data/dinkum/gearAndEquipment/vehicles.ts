import { FilterArray, Vehicle } from "@/types";

export const vehicles: Vehicle[] = [
  {
    id: "bat_glider",
    name: "Bat Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8a/Inv_Bat_Glider.png",
    requirementLevel: null,
    source: ["Deep Mine"],
    inputs: [
      {
        count: 20,
        name: "Bat Wing",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/2d/Inv_Bat_Wing.png",
      },
    ],
    baseSellPrice: 500000,
  },
  {
    id: "blue_hang_glider",
    name: "Blue Hang Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e1/Inv_Blue_Hang_Glider.png",
    requirementLevel: null,
    source: ["Wish Fountain"],
    baseSellPrice: 400000,
  },
  {
    id: "flame_glider",
    name: "Flame Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Flame_Glider.png",
    requirementLevel: null,
    source: ["Hot Hot Hot"],
    baseSellPrice: 525000,
  },
  {
    id: "galaxy_glider",
    name: "Galaxy Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4a/Inv_Galaxy_Glider.png",
    requirementLevel: null,
    source: ["Meteorite"],
    baseSellPrice: 500000,
  },
  {
    id: "gogo_trike",
    name: "Go-Go Trike",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/28/Inv_Go-Go_Trike.png",
    requirementLevel: null,
    source: ["TownCo. Agent"],
    inputs: [
      {
        count: 3,
        name: "Gonut",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7f/Inv_Gonut.png",
      },
      {
        count: 5,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 3,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 3,
        name: "Tin Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
      },
      {
        count: 2,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
    ],
    baseSellPrice: 0,
  },
  {
    id: "helicopter",
    name: "Helicopter",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f9/Inv_Helicopter.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 10,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 15,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 4,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 10,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
    ],
    buyPrice: 3000000,
    baseSellPrice: 1500000,
  },
  {
    id: "hot_air_balloon",
    name: "Hot Air Balloon",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/19/Inv_Hot_Air_Balloon.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Cloth",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
      },
      {
        count: 5,
        name: "Flame Sac",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7c/Inv_Flame_Sac.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 5,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 2,
        name: "Furnace",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Furnace.png",
      },
      {
        count: 15,
        name: "Vine",
        img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
      },
    ],
    buyPrice: 1500000,
    baseSellPrice: 750000,
  },
  {
    id: "jet_ski",
    name: "Jet Ski",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_Jet_Ski.png",
    requirementLevel: 1,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 2,
        name: "Hot Cylinder",
        img: "https://static.wikia.nocookie.net/dinkum/images/4/46/Inv_Hot_Cylinder.png",
      },
      {
        count: 1,
        name: "Green Board",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/1a/Inv_Green_Board.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
    ],
    buyPrice: 80000,
    baseSellPrice: 40000,
  },
  {
    id: "leaf_glider",
    name: "Leaf Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Leaf_Glider.png",
    requirementLevel: null,
    source: ["Undergrove", "Island Reef"],
    baseSellPrice: 500000,
  },
  {
    id: "motor_bike",
    name: "Motor Bike",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/99/Inv_Motor_Bike.png",
    requirementLevel: 2,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 5,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 2,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
    ],
    buyPrice: 80000,
    baseSellPrice: 40000,
  },
  {
    id: "pirate_glider",
    name: "Pirate Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Pirate_Glider.png",
    requirementLevel: null,
    source: ["Island Reef"],
    baseSellPrice: 500000,
  },
  {
    id: "plane",
    name: "Plane",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9e/Inv_Plane.png",
    requirementLevel: 3,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 8,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 4,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 15,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 2,
        name: "Ear Hats",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7e/Inv_Ear_Hats.png",
      },
      {
        count: 15,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 15,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 5,
        name: "Berkonium Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Berkonium_Bar.png",
      },
    ],
    buyPrice: 5000000,
    baseSellPrice: 2500000,
  },
  {
    id: "purple_hang_glider",
    name: "Purple Hang Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/25/Inv_Purple_Hang_Glider.png",
    requirementLevel: null,
    source: ["Wish Fountain"],
    baseSellPrice: 400000,
  },
  {
    id: "red_hang_glider",
    name: "Red Hang Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c9/Inv_Red_Hang_Glider.png",
    requirementLevel: null,
    source: ["Jimmy's Boat"],
    buyPrice: 800000,
    baseSellPrice: 400000,
  },
  {
    id: "ride_on_lawn_mower",
    name: "Ride On Lawn Mower",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Ride_On_Lawn_Mower.png",
    requirementLevel: null,
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 8,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 4,
        name: "Bright Wire",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Bright_Wire.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
      {
        count: 2,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
    ],
    buyPrice: 100000,
    baseSellPrice: 50000,
  },
  {
    id: "rowboat",
    name: "Rowboat",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/97/Inv_Rowboat.png",
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
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 2,
        name: "Tin Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Tin_Bar.png",
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
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d6/Inv_Sail_Boat.png",
    requirementLevel: 1,
    requirementType: "Vehicle Licence",
    source: ["Crafting Table"],
    inputs: [
      {
        count: 15,
        name: "Gum Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Palm Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
      },
      {
        count: 15,
        name: "Hard Wood Plank",
        img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
      },
      {
        count: 10,
        name: "Copper Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 10,
        name: "Cloth",
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Cloth.png",
      },
      {
        count: 1,
        name: "Wooden Chest",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Wooden_Chest.png",
      },
    ],
    baseSellPrice: 116344,
  },
  {
    id: "tractor",
    name: "Tractor",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a8/Inv_Tractor.png",
    requirementLevel: 1,
    requirementType: "Agriculture Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 25,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 4,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 20,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 2,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
    ],
    buyPrice: 1500000,
    baseSellPrice: 750000,
  },
  {
    id: "ute",
    name: "Ute",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9a/Inv_Ute.png",
    requirementLevel: 2,
    requirementType: "Vehicle Licence",
    source: ["Franklyn's Lab"],
    inputs: [
      {
        count: 10,
        name: "Old Gear",
        img: "https://static.wikia.nocookie.net/dinkum/images/9/90/Inv_Old_Gear.png",
      },
      {
        count: 8,
        name: "Old Spring",
        img: "https://static.wikia.nocookie.net/dinkum/images/1/11/Inv_Old_Spring.png",
      },
      {
        count: 10,
        name: "Iron Bar",
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
      },
      {
        count: 1,
        name: "Old Contraption",
        img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Old_Contraption.png",
      },
      {
        count: 4,
        name: "Old Wheel",
        img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Wheel.png",
      },
      {
        count: 4,
        name: "Tin Sheet",
        img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
      },
    ],
    buyPrice: 320000,
    baseSellPrice: 160000,
  },
  {
    id: "yellow_hang_glider",
    name: "Yellow Hang Glider",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a6/Inv_Yellow_Hang_Glider.png",
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
