import { WeightItem } from "@/types";


export const weightItems: WeightItem[] = [
  {
    id: "amber_chunk",
    name: "Amber Chunk",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Amber_Chunk.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 4,
  },
  {
    id: "aquamarine",
    name: "Aquamarine",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Aquamarine.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "bee_hive",
    name: "Bee Hive",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/82/Bee_Hive.png/",
    pricePerKg: 8000,
    minWeight: 1,
    maxWeight: 1.5,
  },
  {
    id: "raw_berkonium",
    name: "Raw Berkonium",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/54/Raw_Berkonium.png",
    pricePerKg: 25000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "emerald",
    name: "Emerald",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6a/Emerald.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "fossil",
    name: "Fossil",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8c/Fossil.png",
    pricePerKg: 10000,
    minWeight: 3,
    maxWeight: 12,
  },
  {
    id: "meteorite",
    name: "Meteorite",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/9e/Meteorite.png",
    pricePerKg: 200000,
    minWeight: 1,
    maxWeight: 3,
  },
  {
    id: "ruby",
    name: "Ruby",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a9/Ruby.png",
    pricePerKg: 15000,
    minWeight: 2,
    maxWeight: 6,
  },
  {
    id: "big_snow_ball",
    name: "Big Snow Ball",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/27/Big_Snow_Ball.png",
    pricePerKg: 100,
    minWeight: 1,
    maxWeight: 5,
  },
  {
    id: "snow_man",
    name: "Snow Man",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/45/Snow_Man.png",
    pricePerKg: 100,
    minWeight: 1,
    maxWeight: 5,
  },
  {
    id: "thunder_egg",
    name: "Thunder Egg",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Thunder_Egg.png",
    pricePerKg: 33000,
    minWeight: 1,
    maxWeight: 3,
  },
  {
    id: "wary_mu_egg",
    name: "Wary Mu Egg",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/07/Wary_Mu_Egg.png",
    pricePerKg: 8000,
    minWeight: 1,
    maxWeight: 3,
  },
];

export const getWeightItemById = (id: string): WeightItem | undefined => {
  return weightItems.find((item) => item.id === id);
};
