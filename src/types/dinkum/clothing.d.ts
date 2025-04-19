import { ClothingSlots } from "@/data/constants";

export type ClothingSlot = keyof typeof ClothingSlots;

export type ClothingType =
  | (typeof ClothingSlots.Head)[number]
  | (typeof ClothingSlots.Face)[number]
  | (typeof ClothingSlots.Body)[number]
  | (typeof ClothingSlots.Legs)[number]
  | (typeof ClothingSlots.Feet)[number];

export interface Clothing {
  id: string;
  name: string;
  img: string;
  displayPrice: number | null;
  cataloguePrice: number | null;
  baseSellingPrice: number;
  cloversCatalogue: boolean;
  slot: ClothingSlot[];
  type: ClothingType;
  set: string;
}

export interface ClothingTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface ClothingTabHandle {
  saveClothing: () => boolean;
}
