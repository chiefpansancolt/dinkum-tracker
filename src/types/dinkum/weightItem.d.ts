import { Base } from "./base";

export interface WeightItem extends Base {
  pricePerKg: number;
  minWeight: number;
  maxWeight: number;
}
