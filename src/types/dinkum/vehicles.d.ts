import { Resource } from "@/types/dinkum";

export interface Vehicle {
  id: string;
  name: string;
  img: string;
  requirementLevel: number | null;
  requirementType?: string;
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  windmillCompatable?: boolean;
  solarPanelCompatable?: boolean;
  source: string[];
  inputs?: Resource[];
  buyPrice?: number;
  baseSellPrice: number;
}

export interface VehicleTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface VehicleTabHandle {
  saveVehicle: () => boolean;
}
