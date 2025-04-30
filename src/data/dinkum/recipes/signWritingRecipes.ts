import { FilterObject, Recipe } from "@/types";

export const signWritingRecipes: Recipe[] = [
  {
    id: "floor_plaque",
    name: "Floor Plaque",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/15/Inv_Floor_Plaque.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 1500,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Copper Bar",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/7a/Inv_Copper_Bar.png",
          },
          {
            count: 1,
            name: "Quartz Crystal",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
        ],
      },
    ],
  },
  {
    id: "gum_wood_direction_sign",
    name: "Gum Wood Direction Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/45/Inv_Gum_Wood_Direction_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 531,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Gum Wood Fence",
            img: "https://static.wikia.nocookie.net/dinkum/images/4/4e/Inv_Gum_Wood_Fence.png",
          },
          {
            count: 1,
            name: "Gum Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            count: 2,
            name: "Nails",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "hand_written_sign",
    name: "Hand Written Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Hand_Written_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 612,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            count: 1,
            name: "Gum Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
  },
  {
    id: "hard_wood_direction_sign",
    name: "Hard Wood Direction Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Inv_Hard_Wood_Direction_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 714,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Fence",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Hard_Wood_Fence.png",
          },
          {
            count: 1,
            name: "Hard Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            count: 2,
            name: "Nails",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "iron_sign",
    name: "Iron Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/c/c3/Inv_Iron_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 2844,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Iron Bar",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b0/Inv_Iron_Bar.png",
          },
          {
            count: 1,
            name: "Tin Sheet",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
  {
    id: "item_sign",
    name: "Item Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/9/95/Inv_Item_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 612,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/d/de/Inv_Hard_Wood_Plank.png",
          },
          {
            count: 1,
            name: "Gum Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/38/Inv_Gum_Wood_Plank.png",
          },
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
        ],
      },
    ],
  },
  {
    id: "jackaroo_crossing_sign",
    name: "Jackaroo Crossing Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e8/Inv_Jackaroo_Crossing_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 13306,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Hard Wood Fence",
            img: "https://static.wikia.nocookie.net/dinkum/images/1/14/Inv_Hard_Wood_Fence.png",
          },
          {
            count: 1,
            name: "Old Sign",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/28/Inv_Old_Sign.png",
          },
        ],
      },
    ],
  },
  {
    id: "letter_statue_az",
    name: "Letter Statue (A-Z)",
    img: "https://static.wikia.nocookie.net/dinkum/images/3/37/Inv_A_Letter_Statue.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 38,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 3,
            name: "Bag of Cement",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
        ],
      },
    ],
  },
  {
    id: "octagon_sign",
    name: "Octagon Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/1/17/Inv_Octagon_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 594,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Tin Sheet",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
          {
            count: 1,
            name: "Red Paint",
            img: "https://static.wikia.nocookie.net/dinkum/images/7/76/Inv_Red_Paint.png",
          },
        ],
      },
    ],
  },
  {
    id: "palm_wood_direction_sign",
    name: "Palm Wood Direction Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/5c/Inv_Palm_Wood_Direction_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 669,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Palm Wood Fence",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a2/Inv_Palm_Wood_Fence.png",
          },
          {
            count: 1,
            name: "Palm Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            count: 2,
            name: "Nails",
            img: "https://static.wikia.nocookie.net/dinkum/images/2/29/Inv_Nails.png",
          },
        ],
      },
    ],
  },
  {
    id: "sandwich_chalkboard",
    name: "Sandwich Chalkboard",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/df/Inv_Sandwich_Chalkboard.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 588,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 2,
            name: "Palm Wood Plank",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Palm_Wood_Plank.png",
          },
          {
            count: 2,
            name: "Spinifex Resin",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "signwriting_pen",
    name: "Signwriting Pen",
    img: "https://static.wikia.nocookie.net/dinkum/images/a/a5/Inv_Signwriting_Pen.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 125,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Mangrove Stick",
            img: "https://static.wikia.nocookie.net/dinkum/images/b/b7/Inv_Mangrove_Stick.png",
          },
          {
            count: 1,
            name: "Spinifex Resin",
            img: "https://static.wikia.nocookie.net/dinkum/images/a/a3/Inv_Spinifex_Resin.png",
          },
        ],
      },
    ],
  },
  {
    id: "stone_sign",
    name: "Stone Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/4/41/Inv_Stone_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 1"],
    baseSellPrice: 275,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Stone",
            img: "https://static.wikia.nocookie.net/dinkum/images/0/09/Inv_Stone.png",
          },
          {
            count: 1,
            name: "Bag of Cement",
            img: "https://static.wikia.nocookie.net/dinkum/images/e/eb/Inv_Bag_of_Cement.png",
          },
          {
            count: 1,
            name: "Quartz Crystal",
            img: "https://static.wikia.nocookie.net/dinkum/images/5/5a/Inv_Quartz_Crystal.png",
          },
        ],
      },
    ],
  },
  {
    id: "tin_direction_sign",
    name: "Tin Direction Sign",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/e6/Inv_Tin_Direction_Sign.png",
    outputCount: 1,
    source: ["Sign Writing Licence Level 2"],
    baseSellPrice: 558,
    variants: [
      {
        id: "standard",
        inputs: [
          {
            count: 1,
            name: "Tin Fence",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/39/Inv_Tin_Fence.png",
          },
          {
            count: 1,
            name: "Tin Sheet",
            img: "https://static.wikia.nocookie.net/dinkum/images/3/3b/Inv_Tin_Sheet.png",
          },
        ],
      },
    ],
  },
];

export const getSignRecipesBySource = (
  data: Recipe[],
  value: string,
): Recipe[] => {
  return data.filter((item) => item.source?.includes(value));
};

export const getSignRecipesBySearchValue = (
  data: Recipe[],
  searchValue: string,
): Recipe[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};

export const getUniqueSignRecipeSources = (): FilterObject[] => {
  const sources = new Set<string>();
  signWritingRecipes.forEach((recipe) => {
    if (recipe.source && recipe.source.length > 0) {
      recipe.source.forEach((src) => {
        sources.add(src);
      });
    }
  });
  return [
    { id: "All", value: "All Sources" },
    ...Array.from(sources)
      .sort()
      .map((source) => ({
        id: source,
        value: source,
      })),
  ];
};
