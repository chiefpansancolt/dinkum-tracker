import { Cassette, FilterArray } from "@/types";

export const cassettes: Cassette[] = [
  {
    id: "ambient_cassette",
    name: "Ambient Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/7e/Inv_Ambient_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "blues_cassette",
    name: "Blues Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/cc/Inv_Blues_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "chill_cassette",
    name: "Chill Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/3d/Inv_Chill_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "country_cassette",
    name: "Country Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c7/Inv_Country_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "creepy_cassette",
    name: "Creepy Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c8/Inv_Creepy_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "dinner_cassette",
    name: "Dinner Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/8/8e/Inv_Dinner_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "dreary_cassette",
    name: "Dreary Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fa/Inv_Dreary_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "experimental_cassette",
    name: "Experimental Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/2b/Inv_Experimental_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "golden_cassette",
    name: "Golden Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/59/Inv_Golden_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "hip_hop_cassette",
    name: "Hip-Hop Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/24/Inv_Hip-Hop_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "old_cassette",
    name: "Old Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Old_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "pop_cassette",
    name: "Pop Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/37/Inv_Pop_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "rock_cassette",
    name: "Rock Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/f/fe/Inv_Rock_Cassette.png",
    source: ["Jimmy's Boat", "Mines", "Island Reef"],
    buyPrice: 3200,
  },
  {
    id: "shopping_cassette",
    name: "Shopping Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/2/22/Inv_Shopping_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
  {
    id: "smooth_cassette",
    name: "Smooth Cassette",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0c/Inv_Smooth_Cassette.png",
    source: ["Jimmy's Boat"],
    buyPrice: 3200,
  },
];

export const getUniqueCassetteSources = (): FilterArray => {
  const sources = new Set<string>();
  sources.add("All");

  cassettes.forEach((cassette) => {
    if (cassette.source) {
      cassette.source.forEach((source) => {
        sources.add(source);
      });
    }
  });

  return Array.from(sources).sort();
};

export const getCassettesBySource = (
  items: Cassette[],
  source: string,
): Cassette[] => {
  return items.filter(
    (cassette) => cassette.source && cassette.source.includes(source),
  );
};

export const getCassettesBySearchValue = (
  items: Cassette[],
  searchValue: string,
): Cassette[] => {
  const lowercaseSearch = searchValue.toLowerCase();
  return items.filter((cassette) =>
    cassette.name.toLowerCase().includes(lowercaseSearch),
  );
};
