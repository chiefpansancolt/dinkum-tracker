import { Biome, FilterArray, Flower } from "@/types";
import { getForagableById, getSeedById } from "./resources";

export const flowers: Flower[] = [
  {
    id: "billy_button",
    name: "Billy Button",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fe/Billy_Button.png",
    locations: ["Bushlands", "Plains"],
    baseSellPrice: 1400,
  },
  {
    id: "bird_nest_coral",
    name: "Bird Nest Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/02/Inv_Bird_Nest_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bird_of_paradise",
    name: "Bird of Paradise",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Bird_of_Paradise.png",
    locations: ["Undergrove"],
    baseSellPrice: 700,
  },
  {
    id: "blue_staghorn_coral",
    name: "Blue Staghorn Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/87/Inv_Blue_Staghorn_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "blue_table_coral_fragment",
    name: "Blue Table Coral Fragment",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Blue_Table_Coral_Fragment.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bottle_brush_bush",
    name: "Bottle Brush Bush",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Bottle_Brush_Bush.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Bottle Brush",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/e/e3/Inv_Bottle_Brush_Flower.png",
      },
      {
        name: "Bottle Brush Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/4/44/Inv_Bottle_Brush_Seed.png",
      },
    ],
    seed: getSeedById("bottle_brush_seed"),
    baseSellPrice: 0,
  },
  {
    id: "brain_coral",
    name: "Brain Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7d/Inv_Brain_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bush",
    name: "Bush",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a1/Bush.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Bush Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/f/f9/Inv_Bush_Seed.png",
      },
    ],
    seed: getSeedById("bush_seed"),
    baseSellPrice: 0,
  },
  {
    id: "butterfly_orchid",
    name: "Butterfly Orchid",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b1/Butterfly_Orchid.png",
    locations: ["Tropics"],
    baseSellPrice: 540,
  },
  {
    id: "common_heath",
    name: "Common Heath",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/70/Common_Heath.png",
    locations: ["Pine Forests"],
    baseSellPrice: 140,
  },
  {
    id: "desert_pea",
    name: "Desert Pea",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Desert_Pea.png",
    locations: ["Desert"],
    conditions: "After Rain",
    baseSellPrice: 140,
  },
  {
    id: "desert_rose",
    name: "Desert Rose",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1d/Desert_Rose.png",
    locations: ["Desert"],
    baseSellPrice: 140,
  },
  {
    id: "fern",
    name: "Fern",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5f/Fern.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Fern Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Fern_Seed.png",
      },
      {
        name: "Tropical Grass Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b3/Inv_Tropical_Grass_Seeds.png",
      },
    ],
    seed: getSeedById("fern_seed"),
    baseSellPrice: 0,
  },
  {
    id: "fir_grass",
    name: "Fir Grass",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ab/Fir_Grass.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Fir Grass Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Fir_Grass_Seeds.png",
      },
    ],
    baseSellPrice: 0,
  },
  {
    id: "flannel_flower",
    name: "Flannel Flower",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Flannel_Flower.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "giant_lily_pad",
    name: "Giant Lily Pad",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/10/Giant_Lily_Pad.png",
    locations: ["Undergrove"],
    baseSellPrice: 375,
  },
  {
    id: "glow_button",
    name: "Glow Button",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/60/Glow_Button.png",
    locations: ["Undergrove"],
    baseSellPrice: 240,
  },
  {
    id: "glowing_mushroom",
    name: "Glowing Mushroom",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/1c/Glowing_Mushroom.png",
    locations: ["Deep Mine"],
    itemsDropped: [
      {
        name: "Glowing Mushroom",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/9/91/Inv_Glowing_Mushroom.png",
      },
    ],
    baseSellPrice: 35,
  },
  {
    id: "grass",
    name: "Grass",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c5/Grass.png",
    locations: ["Bushlands"],
    itemsDropped: [
      {
        name: "Grass Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/8/8f/Inv_Grass_Seed.png",
      },
    ],
    seed: getSeedById("grass_seed"),
    baseSellPrice: 0,
  },
  {
    id: "green_staghorn_coral",
    name: "Green Stagehorn Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Green_Staghorn_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "green_tube_coral",
    name: "Green Tube Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/da/Inv_Green_Tube_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "jackaroo_paw",
    name: "Jackaroo Paw",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/85/Jackaroo_Paw.png",
    locations: ["Desert"],
    conditions: "Spring Only After Rain",
    baseSellPrice: 700,
  },
  {
    id: "lily_pad",
    name: "Lily Pad",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/43/Lily_Pad.png",
    locations: ["Undergrove", "Billabongs"],
    baseSellPrice: 100,
  },
  {
    id: "orange_paper_daisy",
    name: "Orange Paper Daisy",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/49/Orange_Paper_Daisy.png",
    locations: ["Bushlands"],
    baseSellPrice: 700,
  },
  {
    id: "pink_coral",
    name: "Pink Coral",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/78/Inv_Pink_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "pink_paper_daisy",
    name: "Pink Paper Daisy",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e5/Pink_Paper_Daisy.png",
    locations: ["Bushlands", "Plains"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "pink_table_coral_fragment",
    name: "Pink Table Coral Fragment",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fe/Inv_Pink_Table_Coral_Fragment.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "prickly_pear",
    name: "Prickly Pear",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/80/Prickly_Pear.png",
    locations: ["Desert"],
    itemsDropped: [
      {
        name: "Cactus Fig",
        count: 2,
        img: "https://static.wikia.nocookie.net/dinkum/images/7/79/Inv_Cactus_Figs.png",
      },
    ],
    seed: getForagableById("cactus_fig"),
    growthPeriod: 12,
    regrowth: 7,
    baseSellPrice: 0,
  },
  {
    id: "purple_hibiscus",
    name: "Purple Hibiscus",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0b/Purple_Hibiscus.png",
    locations: ["Island Reef"],
    baseSellPrice: 280,
  },
  {
    id: "red_hibiscus",
    name: "Red Hibiscus",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3f/Red_Hibiscus.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 280,
  },
  {
    id: "red_seaweed",
    name: "Red Seaweed",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Red_Seaweed.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Red Seaweed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/d/d0/Inv_Red_Seaweed.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "river_daisy",
    name: "River Daisy",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/54/River_Daisy.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "river_reed",
    name: "River Reed",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/River_Reed.png",
    locations: ["Billabongs", "Mangroves", "Rivers"],
    itemsDropped: [
      {
        name: "River Reed Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_River_Reed_Seed.png",
      },
    ],
    seed: getSeedById("river_reed_seed"),
    baseSellPrice: 0,
  },
  {
    id: "royal_bluebell",
    name: "Royal Bluebell",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Royal_Bluebell.png",
    locations: ["Tropics"],
    baseSellPrice: 140,
  },
  {
    id: "seaweed",
    name: "Seaweed",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
    locations: ["Ocean"],
    itemsDropped: [
      {
        name: "Seaweed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Seaweed.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "spinifex_tuft_tropical",
    name: "Spinife Tuft",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Spinifex_Tropical.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Spinifex_Desert.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "spinifex_tuft",
    name: "Spinifex Tuft",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Spinifex_Desert.png",
    locations: ["Desert"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Spinifex_Desert.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "summer_lily",
    name: "Summer Lily",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/45/Summer_Lily.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Summer Lily Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Summer_Lily_Seed.png",
      },
    ],
    seed: getSeedById("summer_lily_seed"),
    baseSellPrice: 0,
  },
  {
    id: "vine",
    name: "Vine",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Vine",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/e/ea/Inv_Vine.png",
      },
    ],
    baseSellPrice: 25,
  },
  {
    id: "white_hibiscus",
    name: "White Hibiscus",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/White_Hibiscus.png",
    locations: ["Island Reef"],
    baseSellPrice: 280,
  },
  {
    id: "white_paper_daisy",
    name: "White Paper Daisy",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/26/White_Paper_Daisy.png",
    locations: ["Bushlands", "Plains"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "yellow_hibiscus",
    name: "Yellow Hibiscus",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Yellow_Hibiscus.png",
    locations: ["Tropics"],
    conditions: "Spring Only",
    baseSellPrice: 280,
  },
  {
    id: "yellow_wattle_bush",
    name: "Yellow Wattle Bush",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/68/Yellow_Wattle_Bush.png",
    locations: ["Bushlands"],
    itemsDropped: [
      {
        name: "Yellow Wattle Flower",
        count: 3,
        img: "https://static.wikia.nocookie.net/dinkum/images/b/b5/Inv_Yellow_Wattle_Flower.png",
      },
      {
        name: "Wattle Seed",
        count: 1,
        img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Wattle_Seed.png",
      },
    ],
    seed: getSeedById("wattle_seed"),
    baseSellPrice: 0,
  },
];

export const getUniqueFlowerLocations = (): FilterArray => {
  const locations = new Set<string>();
  locations.add("All");

  flowers.forEach((flower) => {
    if (flower.locations) {
      flower.locations.forEach((location) => {
        locations.add(location);
      });
    }
  });

  return Array.from(locations);
};

export const getFlowersByLocation = (
  data: Flower[],
  biome: Biome,
): Flower[] => {
  return data.filter(
    (item) => item.locations && item.locations.includes(biome),
  );
};

export const getFlowersBySearchValue = (
  data: Flower[],
  searchValue: string,
): Flower[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
