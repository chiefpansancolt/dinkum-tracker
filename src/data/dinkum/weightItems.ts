import { WeightItem } from "@/types";

export const weightItems: WeightItem[] = [
  {
    id: "amber_chunk",
    name: "Amber Chunk",
    img: "/images/resources/minerals/Amber_Chunk.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 4,
  },
  {
    id: "aquamarine",
    name: "Aquamarine",
    img: "/images/resources/minerals/Aquamarine.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "bee_hive",
    name: "Bee Hive",
    img: "/images/resources/foragables/Bee_Hive.png",
    pricePerKg: 8000,
    minWeight: 1,
    maxWeight: 1.5,
  },
  {
    id: "raw_berkonium",
    name: "Raw Berkonium",
    img: "/images/weightItems/Raw_Berkonium.png",
    pricePerKg: 25000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "emerald",
    name: "Emerald",
    img: "/images/resources/minerals/Emerald.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "fossil",
    name: "Fossil",
    img: "/images/weightItems/Fossil.png",
    pricePerKg: 10000,
    minWeight: 3,
    maxWeight: 12,
  },
  {
    id: "meteorite",
    name: "Meteorite",
    img: "/images/resources/minerals/Meteorite.png",
    pricePerKg: 200000,
    minWeight: 1,
    maxWeight: 3,
  },
  {
    id: "ruby",
    name: "Ruby",
    img: "/images/resources/minerals/Ruby.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "big_snow_ball",
    name: "Big Snow Ball",
    img: "/images/weightItems/Big_Snow_Ball.png",
    pricePerKg: 100,
    minWeight: 1,
    maxWeight: 5,
  },
  {
    id: "snow_man",
    name: "Snow Man",
    img: "/images/weightItems/Snow_Man.png",
    pricePerKg: 100,
    minWeight: 1,
    maxWeight: 5,
  },
  {
    id: "thunder_egg",
    name: "Thunder Egg",
    img: "/images/weightItems/Thunder_Egg.png",
    pricePerKg: 33000,
    minWeight: 1,
    maxWeight: 3,
  },
  {
    id: "wary_mu_egg",
    name: "Wary Mu Egg",
    img: "/images/weightItems/Wary_Mu_Egg.png",
    pricePerKg: 8000,
    minWeight: 1,
    maxWeight: 3,
  },
];

export const getWeightItemById = (id: string): WeightItem | undefined => {
  return weightItems.find((item) => item.id === id);
};
