import { Base } from "./base";

export interface LicenseLevel {
  level: number;
  skillLevel: number;
  permitPointCost: number;
  description: string;
}

export interface License extends Base {
  requirements: string;
  levels: LicenseLevel[];
}
