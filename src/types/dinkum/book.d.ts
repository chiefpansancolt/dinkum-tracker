import { Base } from "./base";

interface BookData {
  aquiredFrom: string;
  requirements: string;
  buyingPrice: number | "Gift";
  sellingPrice: number;
}

export interface Book extends Base {
  details: BookData[];
}
