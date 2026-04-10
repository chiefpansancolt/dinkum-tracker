import { Biome, FilterArray, Flower } from "@/types";
import { getForagableById, getSeedById } from "./resources";

export const flowers: Flower[] = [
  {
    id: "billy_button",
    name: "Billy Button",
    img: "/images/flowers/Billy_Button.png",
    locations: ["Bushlands", "Plains"],
    baseSellPrice: 1400,
  },
  {
    id: "bird_nest_coral",
    name: "Bird Nest Coral",
    img: "/images/flowers/Inv_Bird_Nest_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bird_of_paradise",
    name: "Bird of Paradise",
    img: "/images/flowers/Bird_of_Paradise.png",
    locations: ["Undergrove"],
    baseSellPrice: 700,
  },
  {
    id: "blue_staghorn_coral",
    name: "Blue Staghorn Coral",
    img: "/images/flowers/Inv_Blue_Staghorn_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "blue_table_coral_fragment",
    name: "Blue Table Coral Fragment",
    img: "/images/flowers/Inv_Blue_Table_Coral_Fragment.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bottle_brush_bush",
    name: "Bottle Brush Bush",
    img: "/images/flowers/Bottle_Brush_Bush.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Bottle Brush",
        count: 3,
        img: "/images/resources/foragables/Inv_Bottle_Brush_Flower.png",
      },
      {
        name: "Bottle Brush Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Bottle_Brush_Seed.png",
      },
    ],
    seed: getSeedById("bottle_brush_seed"),
    baseSellPrice: 0,
  },
  {
    id: "brain_coral",
    name: "Brain Coral",
    img: "/images/flowers/Inv_Brain_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "bush",
    name: "Bush",
    img: "/images/flowers/Bush.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Bush Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Bush_Seed.png",
      },
    ],
    seed: getSeedById("bush_seed"),
    baseSellPrice: 0,
  },
  {
    id: "butterfly_orchid",
    name: "Butterfly Orchid",
    img: "/images/flowers/Butterfly_Orchid.png",
    locations: ["Tropics"],
    baseSellPrice: 540,
  },
  {
    id: "common_heath",
    name: "Common Heath",
    img: "/images/flowers/Common_Heath.png",
    locations: ["Pine Forests"],
    baseSellPrice: 140,
  },
  {
    id: "desert_pea",
    name: "Desert Pea",
    img: "/images/flowers/Desert_Pea.png",
    locations: ["Desert"],
    conditions: "After Rain",
    baseSellPrice: 140,
  },
  {
    id: "desert_rose",
    name: "Desert Rose",
    img: "/images/flowers/Desert_Rose.png",
    locations: ["Desert"],
    baseSellPrice: 140,
  },
  {
    id: "fern",
    name: "Fern",
    img: "/images/flowers/Fern.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Fern Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Fern_Seed.png",
      },
      {
        name: "Tropical Grass Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Tropical_Grass_Seeds.png",
      },
    ],
    seed: getSeedById("fern_seed"),
    baseSellPrice: 0,
  },
  {
    id: "fir_grass",
    name: "Fir Grass",
    img: "/images/flowers/Fir_Grass.png",
    locations: ["Pine Forests"],
    itemsDropped: [
      {
        name: "Fir Grass Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Fir_Grass_Seeds.png",
      },
    ],
    baseSellPrice: 0,
  },
  {
    id: "flannel_flower",
    name: "Flannel Flower",
    img: "/images/flowers/Flannel_Flower.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "giant_lily_pad",
    name: "Giant Lily Pad",
    img: "/images/flowers/Giant_Lily_Pad.png",
    locations: ["Undergrove"],
    baseSellPrice: 375,
  },
  {
    id: "glow_button",
    name: "Glow Button",
    img: "/images/flowers/Glow_Button.png",
    locations: ["Undergrove"],
    baseSellPrice: 240,
  },
  {
    id: "glowing_mushroom",
    name: "Glowing Mushroom",
    img: "/images/flowers/Glowing_Mushroom.png",
    locations: ["Deep Mine"],
    itemsDropped: [
      {
        name: "Glowing Mushroom",
        count: 1,
        img: "/images/resources/foragables/Inv_Glowing_Mushroom.png",
      },
    ],
    baseSellPrice: 35,
  },
  {
    id: "grass",
    name: "Grass",
    img: "/images/flowers/Grass.png",
    locations: ["Bushlands"],
    itemsDropped: [
      {
        name: "Grass Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Grass_Seed.png",
      },
    ],
    seed: getSeedById("grass_seed"),
    baseSellPrice: 0,
  },
  {
    id: "green_staghorn_coral",
    name: "Green Stagehorn Coral",
    img: "/images/flowers/Inv_Green_Staghorn_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "green_tube_coral",
    name: "Green Tube Coral",
    img: "/images/flowers/Inv_Green_Tube_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "jackaroo_paw",
    name: "Jackaroo Paw",
    img: "/images/flowers/Jackaroo_Paw.png",
    locations: ["Desert"],
    conditions: "Spring Only After Rain",
    baseSellPrice: 700,
  },
  {
    id: "lily_pad",
    name: "Lily Pad",
    img: "/images/flowers/Lily_Pad.png",
    locations: ["Undergrove", "Billabongs"],
    baseSellPrice: 100,
  },
  {
    id: "orange_paper_daisy",
    name: "Orange Paper Daisy",
    img: "/images/flowers/Orange_Paper_Daisy.png",
    locations: ["Bushlands"],
    baseSellPrice: 700,
  },
  {
    id: "pink_coral",
    name: "Pink Coral",
    img: "/images/flowers/Inv_Pink_Coral.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "pink_paper_daisy",
    name: "Pink Paper Daisy",
    img: "/images/flowers/Pink_Paper_Daisy.png",
    locations: ["Bushlands", "Plains"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "pink_table_coral_fragment",
    name: "Pink Table Coral Fragment",
    img: "/images/flowers/Inv_Pink_Table_Coral_Fragment.png",
    locations: ["Island Reef"],
    baseSellPrice: 4,
  },
  {
    id: "prickly_pear",
    name: "Prickly Pear",
    img: "/images/flowers/Prickly_Pear.png",
    locations: ["Desert"],
    itemsDropped: [
      {
        name: "Cactus Fig",
        count: 2,
        img: "/images/resources/foragables/Inv_Cactus_Figs.png",
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
    img: "/images/flowers/Purple_Hibiscus.png",
    locations: ["Island Reef"],
    baseSellPrice: 280,
  },
  {
    id: "red_hibiscus",
    name: "Red Hibiscus",
    img: "/images/flowers/Red_Hibiscus.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 280,
  },
  {
    id: "red_seaweed",
    name: "Red Seaweed",
    img: "/images/resources/foragables/Inv_Red_Seaweed.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Red Seaweed",
        count: 1,
        img: "/images/resources/foragables/Inv_Red_Seaweed.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "river_daisy",
    name: "River Daisy",
    img: "/images/flowers/River_Daisy.png",
    locations: ["Pine Forests"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "river_reed",
    name: "River Reed",
    img: "/images/flowers/River_Reed.png",
    locations: ["Billabongs", "Mangroves", "Rivers"],
    itemsDropped: [
      {
        name: "River Reed Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_River_Reed_Seed.png",
      },
    ],
    seed: getSeedById("river_reed_seed"),
    baseSellPrice: 0,
  },
  {
    id: "royal_bluebell",
    name: "Royal Bluebell",
    img: "/images/flowers/Royal_Bluebell.png",
    locations: ["Tropics"],
    baseSellPrice: 140,
  },
  {
    id: "seaweed",
    name: "Seaweed",
    img: "/images/resources/foragables/Inv_Seaweed.png",
    locations: ["Ocean"],
    itemsDropped: [
      {
        name: "Seaweed",
        count: 1,
        img: "/images/resources/foragables/Inv_Seaweed.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "spinifex_tuft_tropical",
    name: "Spinife Tuft",
    img: "/images/flowers/Spinifex_Tropical.png",
    locations: ["Tropics"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "/images/flowers/Spinifex_Desert.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "spinifex_tuft",
    name: "Spinifex Tuft",
    img: "/images/flowers/Spinifex_Desert.png",
    locations: ["Desert"],
    itemsDropped: [
      {
        name: "Spinifex Tuft",
        count: 1,
        img: "/images/flowers/Spinifex_Desert.png",
      },
    ],
    baseSellPrice: 10,
  },
  {
    id: "summer_lily",
    name: "Summer Lily",
    img: "/images/flowers/Summer_Lily.png",
    locations: ["Island Reef"],
    itemsDropped: [
      {
        name: "Summer Lily Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Summer_Lily_Seed.png",
      },
    ],
    seed: getSeedById("summer_lily_seed"),
    baseSellPrice: 0,
  },
  {
    id: "vine",
    name: "Vine",
    img: "/images/resources/foragables/Inv_Vine.png",
    locations: ["Undergrove"],
    itemsDropped: [
      {
        name: "Vine",
        count: 1,
        img: "/images/resources/foragables/Inv_Vine.png",
      },
    ],
    baseSellPrice: 25,
  },
  {
    id: "white_hibiscus",
    name: "White Hibiscus",
    img: "/images/flowers/White_Hibiscus.png",
    locations: ["Island Reef"],
    baseSellPrice: 280,
  },
  {
    id: "white_paper_daisy",
    name: "White Paper Daisy",
    img: "/images/flowers/White_Paper_Daisy.png",
    locations: ["Bushlands", "Plains"],
    conditions: "Spring Only",
    baseSellPrice: 700,
  },
  {
    id: "yellow_hibiscus",
    name: "Yellow Hibiscus",
    img: "/images/flowers/Yellow_Hibiscus.png",
    locations: ["Tropics"],
    conditions: "Spring Only",
    baseSellPrice: 280,
  },
  {
    id: "yellow_wattle_bush",
    name: "Yellow Wattle Bush",
    img: "/images/flowers/Yellow_Wattle_Bush.png",
    locations: ["Bushlands"],
    itemsDropped: [
      {
        name: "Yellow Wattle Flower",
        count: 3,
        img: "/images/resources/foragables/Inv_Yellow_Wattle_Flower.png",
      },
      {
        name: "Wattle Seed",
        count: 1,
        img: "/images/resources/seeds/Inv_Wattle_Seed.png",
      },
    ],
    seed: getSeedById("wattle_seed"),
    baseSellPrice: 0,
  },
];

export const getUniqueFlowerLocations = (): FilterArray => {
  const locations = new Set<string>();

  flowers.forEach((flower) => {
    if (flower.locations) {
      flower.locations.forEach((location) => {
        locations.add(location);
      });
    }
  });

  return ["All", ...Array.from(locations).sort()];
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
