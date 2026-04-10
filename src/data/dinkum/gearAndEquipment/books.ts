import { Book } from "@/types";

export const books: Book[] = [
  {
    id: "adventurers_journal",
    name: "Adventurer's Journal",
    img: "/images/gearAndEquipment/books/Inv_Adventurer%27s_Journal.png",
    details: [
      {
        aquiredFrom: "Fletch",
        requirements: "Tutorial at the beginning of a new island.",
        buyingPrice: "Gift",
        sellingPrice: 0,
      },
    ],
  },
  {
    id: "bug_book",
    name: "Bug Book",
    img: "/images/gearAndEquipment/books/Inv_Bug_Book.png",
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
    img: "/images/gearAndEquipment/books/Inv_Fish_Book.png",
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
    img: "/images/gearAndEquipment/books/Inv_Machine_Manual.png",
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
    id: "magic_tome",
    name: "Magic Tome",
    img: "/images/gearAndEquipment/books/Inv_Magic_Tome.png",
    details: [
      {
        aquiredFrom: "Yobbolin Healers in Hot Hot Hot",
        requirements: "",
        buyingPrice: 0,
        sellingPrice: 49000,
      },
    ],
  },
  {
    id: "plant_book",
    name: "Plant Book",
    img: "/images/gearAndEquipment/books/Inv_Plant_Book.png",
    details: [
      {
        aquiredFrom: "Rayne from Rayne's Greenhouse",
        requirements: "After gaining 2 ♥️ hearts with Rayne",
        buyingPrice: "Gift",
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

export const getBooksBySearchValue = (
  data: Book[],
  searchValue: string,
): Book[] => {
  return data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );
};
