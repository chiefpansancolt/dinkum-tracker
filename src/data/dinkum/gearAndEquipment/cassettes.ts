import { Cassette, FilterArray } from "@/types";

export const cassettes: Cassette[] = [
  {
    id: "ambient_cassette",
    name: "Ambient Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Ambient_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "blues_cassette",
    name: "Blues Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Blues_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "chill_cassette",
    name: "Chill Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Chill_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "country_cassette",
    name: "Country Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Country_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "creepy_cassette",
    name: "Creepy Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Creepy_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "dinner_cassette",
    name: "Dinner Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Dinner_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "dreary_cassette",
    name: "Dreary Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Dreary_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "experimental_cassette",
    name: "Experimental Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Experimental_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "golden_cassette",
    name: "Golden Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Golden_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "hip_hop_cassette",
    name: "Hip-Hop Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Hip-Hop_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "old_cassette",
    name: "Old Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Old_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "pop_cassette",
    name: "Pop Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Pop_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "rock_cassette",
    name: "Rock Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Rock_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "shopping_cassette",
    name: "Shopping Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Shopping_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "smooth_cassette",
    name: "Smooth Cassette",
    img: "/images/gearAndEquipment/cassettes/Inv_Smooth_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
];

export const getCassettesBySource = (
  data: Cassette[],
  value: string,
): Cassette[] => {
  return data.filter(
    (cassette) => cassette.source && cassette.source.includes(value),
  );
};

export const getCassettesBySearchValue = (
  items: Cassette[],
  searchValue: string,
): Cassette[] => {
  return items.filter((cassette) =>
    cassette.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueCassetteSources = (): FilterArray => {
  const sources = new Set<string>();

  cassettes.forEach((cassette) => {
    if (cassette.source) {
      cassette.source.forEach((source) => {
        sources.add(source);
      });
    }
  });

  return ["All", ...Array.from(sources).sort()];
};
