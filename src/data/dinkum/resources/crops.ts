import { Crop, Season } from "@/types";
import { getSeedById } from "./seeds";

export const crops: Crop[] = [
  {
    id: "beetroot",
    name: "Beetroot",
    img: "/images/resources/crops/Inv_Beetroot.png",
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
    img: "/images/resources/crops/Inv_Cabbage.png",
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
    img: "/images/resources/crops/Inv_Carrot.png",
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
    img: "/images/resources/crops/Inv_Coffee_Bean.png",
    baseSellPrice: 295,
    seed: getSeedById("coffee_seed"),
  },
  {
    id: "corn",
    name: "Corn",
    img: "/images/resources/crops/Inv_Corn.png",
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
    img: "/images/resources/crops/Inv_Green_Bean.png",
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
    img: "/images/resources/crops/Inv_Kale.png",
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
    img: "/images/resources/crops/Inv_Mighty_Spread.png",
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
    img: "/images/resources/crops/Inv_Onion.png",
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
    img: "/images/resources/crops/Inv_Pineapple.png",
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
    img: "/images/resources/crops/Inv_Potato.png",
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
    img: "/images/resources/crops/Inv_Pumpkin.png",
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
    img: "/images/resources/crops/Inv_Sugar_Cane.png",
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
    img: "/images/resources/crops/Inv_Tomato.png",
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
    img: "/images/resources/crops/Inv_Watermelon.png",
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
    img: "/images/resources/crops/Inv_Wheat.png",
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
