import { Resource, BuyUnits } from "@/types/dinkum";

export interface Tool {
  id: string;
  name: string;
  img: string;
  damage: number | null;
  licence: string;
  source: string[];
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
  inputs?: Resource[];
  buyPrice?: number;
  buyUnits?: BuyUnits;
  baseSellPrice: number;
}

export interface ToolsTabProps {
  collected: {
    [key: string]: boolean;
  };
}

export interface ToolsTabHandle {
  saveTools: () => boolean;
}
