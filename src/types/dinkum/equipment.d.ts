import { ResourceVariant, BuyUnits } from "@/types/dinkum";

export interface Equipment {
  id: string;
  name: string;
  img: string;
  description: string;
  requirementLevel: number | null;
  requirementType?: string;
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  windmillCompatable?: boolean;
  solarPanelCompatable?: boolean;
  source: string[];
  inputs?: ResourceVariant[];
  buyPrice?: number;
  buyUnits?: BuyUnits;
  baseSellPrice: number;
}

export interface EquipmentTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface EquipmentTabHandle {
  saveEquipment: () => boolean;
}
