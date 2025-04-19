import { Book } from "@/types/dinkum";

export const books: Book[] = [
  {
    id: "adventurers_journal",
    name: "Adventurer's Journal",
    img: "https://static.wikia.nocookie.net/dinkum/images/e/ee/Inv_Adventurer%27s_Journal.png",
    details: [
      {
        aquiredFrom: "Fletch",
        requirements: "Tutorial at the beginning of a new island.",
        buyingPrice: 0,
        sellingPrice: 0,
      },
    ],
  },
  {
    id: "bug_book",
    name: "Bug Book",
    img: "https://static.wikia.nocookie.net/dinkum/images/0/0c/Inv_Bug_Book.png",
    details: [
      {
        aquiredFrom: "Theodore at the Museum",
        requirements: "The museum collection to be 50% completed",
        buyingPrice: 98000,
        sellingPrice: 49000,
      },
    ],
  },
  {
    id: "fish_book",
    name: "Fish Book",
    img: "https://static.wikia.nocookie.net/dinkum/images/5/58/Inv_Fish_Book.png",
    details: [
      {
        aquiredFrom: "Theodore at the Museum",
        requirements: "The museum collection to be 50% completed",
        buyingPrice: 118000,
        sellingPrice: 59000,
      },
    ],
  },
  {
    id: "machine_manual",
    name: "Machine Manual",
    img: "https://static.wikia.nocookie.net/dinkum/images/d/d7/Inv_Machine_Manual.png",
    details: [
      {
        aquiredFrom: "John fom John's Goods",
        requirements: "Purchase un John's Goods",
        buyingPrice: 15000,
        sellingPrice: 7500,
      },
    ],
  },
  {
    id: "plant_book",
    name: "Plant Book",
    img: "https://static.wikia.nocookie.net/dinkum/images/6/6d/Inv_Plant_Book.png",
    details: [
      {
        aquiredFrom: "Rayne from Rayne's Greenhouse",
        requirements: "After gaining 2 ♥️ hearts with Rayne",
        buyingPrice: 0,
        sellingPrice: 18000,
      },
      {
        aquiredFrom: "Jimmy from Jimmy's Boat",
        requirements: "Purchase on Jimmy's Boat",
        buyingPrice: 36000,
        sellingPrice: 18000,
      },
    ],
  },
];
