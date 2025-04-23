import { Base } from "./base";

interface BookData {
  aquiredFrom: string;
  requirements: string;
  buyingPrice: number;
  sellingPrice: number;
}

export interface Book extends Base {
  details: BookData[];
}
