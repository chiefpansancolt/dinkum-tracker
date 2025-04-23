import { ClothingSlots } from "@/data/constants";
import { BaseResource } from "./base";

export type ClothingSlot = keyof typeof ClothingSlots;
export type ClothingType =
  | (typeof ClothingSlots.Head)[number]
  | (typeof ClothingSlots.Face)[number]
  | (typeof ClothingSlots.Body)[number]
  | (typeof ClothingSlots.Legs)[number]
  | (typeof ClothingSlots.Feet)[number];

export interface Clothing extends BaseResource {
  displayPrice: number | null;
  cataloguePrice: number | null;
  cloversCatalogue: boolean;
  slot: ClothingSlot[];
  type: ClothingType;
  set: string;
}
