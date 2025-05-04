import { BaseResource } from "./base";

export interface Furniture extends BaseResource {
  displayPrice?: number;
  cataloguePrice?: number;
  melvinsCatalogue: boolean;
  furnitureSet?: string;
}
