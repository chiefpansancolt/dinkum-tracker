import { Crop, Season } from "@/types";
import { getSeedById } from "./seeds";

export const crops: Crop[] = [
  {
    id: "beetroot",
    name: "Beetroot",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/93/Inv_Beetroot.png",
    baseSellPrice: 1425,
    seed: getSeedById("beetroot_seed"),
    buffs: {
      length: 8,
      healthRegenRate: 1,
      staminaRegenRate: 1,
    },
  },
  {
    id: "cabbage",
    name: "Cabbage",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/77/Inv_Cabbage.png",
    baseSellPrice: 1750,
    seed: getSeedById("cabbage_seed"),
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 2,
    },
  },
  {
    id: "carrot",
    name: "Carrot",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/06/Inv_Carrot.png",
    baseSellPrice: 475,
    seed: getSeedById("carrot_seed"),
    buffs: {
      length: 3,
      staminaRegenRate: 1,
    },
  },
  {
    id: "coffee_bean",
    name: "Coffee Bean",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e4/Inv_Coffee_Bean.png",
    baseSellPrice: 295,
    seed: getSeedById("coffee_seed"),
  },
  {
    id: "corn",
    name: "Corn",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Corn.png",
    baseSellPrice: 358,
    seed: getSeedById("corn_seed"),
    buffs: {
      length: 4,
      healthRegenRate: 1,
      staminaRegenRate: 0.8,
    },
  },
  {
    id: "green_bean",
    name: "Green Bean",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b2/Inv_Green_Bean.png",
    seed: getSeedById("green_bean_seed"),
    baseSellPrice: 295,
    buffs: {
      length: 4,
      healthRegenRate: 1,
      staminaRegenRate: 1,
    },
  },
  {
    id: "kale",
    name: "Kale",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a0/Inv_Kale.png",
    seed: getSeedById("kale_seed"),
    buyPrice: 9120,
    baseSellPrice: 1520,
    buffs: {
      length: 10,
      healthRegenRate: 2,
      staminaRegenRate: 2,
    },
  },
  {
    id: "mighty_spread",
    name: "Mighty Spread",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/17/Inv_Mighty_Spread.png",
    seed: getSeedById("mighty_seed"),
    baseSellPrice: 120000,
    buffs: {
      length: 10,
      healthRegenRate: 3,
      healthMax: 50,
      staminaRegenRate: 3,
      staminaMax: 50,
      attackLevel: 3,
      defenseLevel: 3,
      charged: true,
      diligent: true,
    },
  },
  {
    id: "onion",
    name: "Onion",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/ad/Inv_Onion.png",
    seed: getSeedById("onion_seed"),
    baseSellPrice: 450,
    buffs: {
      length: 1,
      healthRegenRate: 1,
      staminaRegenRate: 1.6,
    },
  },
  {
    id: "pineapple",
    name: "Pineapple",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/87/Inv_Pineapple.png",
    source: ["Island Reef"],
    seed: undefined,
    baseSellPrice: 15000,
    buffs: {
      length: 8,
      staminaRegenRate: 3,
    },
  },
  {
    id: "potato",
    name: "Potato",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Potato.png",
    seed: getSeedById("potato_seed"),
    baseSellPrice: 640,
    buffs: {
      length: 4,
      healthRegenRate: 1,
      staminaRegenRate: 0.6,
    },
  },
  {
    id: "pumpkin",
    name: "Pumpkin",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Pumpkin.png",
    seed: getSeedById("pumpkin_seed"),
    baseSellPrice: 3120,
    buffs: {
      length: 12,
      staminaRegenRate: 3,
      staminaMax: 10,
    },
  },
  {
    id: "sugar_cane",
    name: "Sugar Cane",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/84/Inv_Sugar_Cane.png",
    seed: getSeedById("sugar_cane_seed"),
    baseSellPrice: 560,
    buffs: {
      length: 2,
      staminaRegenRate: 2,
      staminaMax: 5,
    },
  },
  {
    id: "tomato",
    name: "Tomato",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Tomato.png",
    seed: getSeedById("tomato_seed"),
    baseSellPrice: 351,
    buffs: {
      length: 4,
      healthRegenRate: 2,
      staminaRegenRate: 0.4,
    },
  },
  {
    id: "watermelon",
    name: "Watermelon",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/da/Inv_Watermelon.png",
    seed: getSeedById("watermelon_seed"),
    baseSellPrice: 3080,
    buffs: {
      length: 12,
      healthRegenRate: 1,
      healthMax: 10,
      coolLevel: 1,
    },
  },
  {
    id: "wheat",
    name: "Wheat",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/78/Inv_Wheat.png",
    seed: getSeedById("wheat_seed"),
    baseSellPrice: 216,
    buffs: {
      length: 1,
      staminaRegenRate: 0.2,
    },
  },
];

export const getCropsBySeason = (data: Crop[], value: Season): Crop[] => {
  return data.filter(
    (item) => item.seed && item.seed.season && item.seed.season.includes(value),
  );
};

export const getCropsBySearchValue = (
  data: Crop[],
  searchValue: string,
): Crop[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
