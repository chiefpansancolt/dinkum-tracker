import { Biome, FilterArray, PediaItem, Season, TimePeriod } from "@/types";
import { SEASONS, TIME_PERIODS } from "@/data/constants";

export const critters: PediaItem[] = [
  {
    id: "bay_bug",
    name: "Bay Bug",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/ba/Inv_Bay_Bug.png",
    biome: ["Everywhere"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Rare",
    baseSellPrice: 4540,
  },
  {
    id: "biscuit_sea_star",
    name: "Biscuit Sea Star",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/71/Inv_Biscuit_Sea_Star.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 1200,
  },
  {
    id: "black_sea_cucumber",
    name: "Black Sea Cucumber",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/ce/Inv_Black_Sea_Cucumber.png",
    biome: ["Ocean", "Rivers"],
    timeFound: ["All"],
    seasons: ["Autumn", "Winter"],
    rarity: "Super Rare",
    baseSellPrice: 12540,
  },
  {
    id: "blue_mussel",
    name: "Blue Mussel",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/74/Inv_Blue_Mussel.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 799,
  },
  {
    id: "blue_sea_slug",
    name: "Blue Sea Slug",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/12/Inv_Blue_Sea_Slug.png",
    biome: ["Ocean"],
    timeFound: ["Night"],
    seasons: ["Winter"],
    rarity: "Super Rare",
    baseSellPrice: 50160,
  },
  {
    id: "blue_ringed_octopus",
    name: "Blue-ringed Octopus",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e7/Inv_Blue-ringed_Octopus.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["Summer", "Winter"],
    rarity: "Very Rare",
    baseSellPrice: 7400,
  },
  {
    id: "cushion_sea_star",
    name: "Cushion Sea Star",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a4/Inv_Cushion_Sea_Star.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["Spring"],
    rarity: "Uncommon",
    baseSellPrice: 2540,
  },
  {
    id: "eleven_armed_sea_star",
    name: "Eleven-armed Sea Star",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/34/Inv_Eleven-armed_Sea_Star.png",
    biome: ["Ocean"],
    timeFound: ["Morning"],
    seasons: ["All"],
    rarity: "Very Rare",
    baseSellPrice: 8540,
  },
  {
    id: "fresh_water_mussel",
    name: "Fresh Water Mussel",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Fresh_Water_Mussel.png",
    biome: ["Rivers"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 800,
  },
  {
    id: "fresh_water_prawn",
    name: "Fresh Water Prawn",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2a/Inv_Fresh_Water_Prawn.png",
    biome: ["Rivers"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Very Rare",
    baseSellPrice: 1540,
  },
  {
    id: "inland_crab",
    name: "Inland Crab",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Inland_Crab.png",
    biome: ["Rivers"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Uncommon",
    baseSellPrice: 740,
  },
  {
    id: "king_prawn",
    name: "King Prawn",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/25/Inv_King_Prawn.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Very Rare",
    baseSellPrice: 3540,
  },
  {
    id: "mud_crab",
    name: "Mud Crab",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b8/Inv_Mud_Crab.png",
    biome: ["Rivers"],
    timeFound: ["All"],
    seasons: ["Summer", "Autumn"],
    rarity: "Very Rare",
    baseSellPrice: 4540,
  },
  {
    id: "nudibranch",
    name: "Nudibranch",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/20/Inv_Nudibranch.png",
    biome: ["Ocean"],
    timeFound: ["Night"],
    seasons: ["Winter", "Autumn"],
    rarity: "Super Rare",
    baseSellPrice: 17540,
  },
  {
    id: "pink_sea_urchin",
    name: "Pink Sea Urchin",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_Pink_Sea_Urchin.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Rare",
    baseSellPrice: 1540,
  },
  {
    id: "purple_mottled_crab",
    name: "Purple Mottled Crab",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d9/Inv_Purple_Mottled_Crab.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["Summer"],
    rarity: "Common",
    baseSellPrice: 440,
  },
  {
    id: "purple_sea_urchin",
    name: "Purple Sea Urchin",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/08/Inv_Purple_Sea_Urchin.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["Spring"],
    rarity: "Very Rare",
    baseSellPrice: 8040,
  },
  {
    id: "rock_oyster",
    name: "Rock Oyster",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Rock_Oyster.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["Summer", "Spring"],
    rarity: "Very Rare",
    baseSellPrice: 12784,
  },
  {
    id: "sea_sponge",
    name: "Sea Sponge",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/28/Inv_Sea_Sponge.png",
    biome: ["Island Reef"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 200,
  },
  {
    id: "seahorse",
    name: "Seahorse",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3e/Inv_Seahorse.png",
    biome: ["Island Reef"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Very Rare",
    baseSellPrice: 3540,
  },
  {
    id: "spiny_sea_urchin",
    name: "Spiny Sea Urchin",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c1/Inv_Spiny_Sea_Urchin.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Uncommon",
    baseSellPrice: 640,
  },
  {
    id: "tiger_prawn",
    name: "Tiger Prawn",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/32/Inv_Tiger_Prawn.png",
    biome: ["Ocean"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 1540,
  },
  {
    id: "tritons_trumpet",
    name: "Triton's Trumpet",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Triton%27s_Trumpet.png",
    biome: ["Island Reef"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Rare",
    baseSellPrice: 1300,
  },
  {
    id: "white_yabbie",
    name: "White Yabbie",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/f6/Inv_White_Yabbie.png",
    biome: ["Rivers"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Common",
    baseSellPrice: 980,
  },
  {
    id: "yabbie",
    name: "Yabbie",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/00/Inv_Yabbie.png",
    biome: ["Everywhere"],
    timeFound: ["All"],
    seasons: ["All"],
    rarity: "Rare",
    baseSellPrice: 1899,
  },
];

export const getCrittersByBiome = (
  data: PediaItem[],
  value: Biome,
): PediaItem[] => {
  return data.filter((item) => item.biome.includes(value));
};

export const getCrittersByRarity = (
  data: PediaItem[],
  value: string,
): PediaItem[] => {
  return data.filter((item) => item.rarity === value);
};

export const getCrittersBySeason = (
  data: PediaItem[],
  value: Season,
): PediaItem[] => {
  return data.filter((item) => item.seasons.includes(value));
};

export const getCrittersByTime = (
  data: PediaItem[],
  value: TimePeriod,
): PediaItem[] => {
  return data.filter((item) => item.timeFound.includes(value));
};

export const getCrittersBySearchValue = (
  data: PediaItem[],
  searchValue: string,
): PediaItem[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueCritterBiomes = (): FilterArray => {
  const biomes = new Set<string>();

  critters.forEach((item) => {
    item.biome.forEach((b) => biomes.add(b));
  });

  return ["All", ...Array.from(biomes)].sort();
};

export const getUniqueCritterRarities = (): FilterArray => {
  const rarities = new Set<string>();

  critters.forEach((item) => rarities.add(item.rarity));

  return ["All", ...Array.from(rarities)].sort();
};

export const getUniqueCritterSeasons = (): FilterArray => {
  return Object.values(SEASONS);
};

export const getUniqueCritterTimePeriods = (): FilterArray => {
  return Object.values(TIME_PERIODS);
};
