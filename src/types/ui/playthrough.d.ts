import React from "react";
import { Resource, ResourceVariant } from "../dinkum";

export interface FilterBarProps {
  showFilters: boolean;
  filters?: {
    [key: string]: {
      value: string;
      options: string[];
      label: string;
    };
  };
  onFilterChange?: (name: string, value: string) => void;
  showSearch: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export interface TabHeaderProps {
  title: string;
  collectionName: string;
  enableCollectionCount: boolean;
  collectedCount?: number;
  collectionTotal?: number;
  enableSaveAlert: boolean;
  isDirty?: boolean;
  dirtyMessage?: string;
}

export interface FilterDetailsProps {
  title: string;
  filteredCount: number;
  totalCount: number;
  collectedLabel?: string;
  collectedCount?: number;
  donatedLabel?: string;
  donatedCount?: number;
}

export interface ItemImageProps {
  src: string;
  name: string;
  isCollected: boolean;
}

export interface ItemDetailProps {
  label: string;
  details: string;
  iconComp?: () => React.ReactNode;
}

export interface DinkValueProps {
  label: string;
  price: number;
  showCommerceLicenses?: boolean;
}

export interface ItemFooterProps {
  id: string;
  showRightCheckbox?: boolean;
  leftLabel: string;
  isLeftChecked: boolean;
  handleLeftToggle: (id: string, checked: boolean) => void;
  rightLabel?: string;
  isRightChecked?: boolean;
  handleRightToggle?: (id: string, checked: boolean) => void;
}

export interface ItemHeaderProps {
  title: string;
  renderRightComp?: () => React.ReactNode;
}

export interface DinkPriceProps {
  price: number;
}

export interface ItemCardProps {
  renderHeader: () => React.ReactNode;
  renderImage: () => React.ReactNode;
  renderDetails: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
}

export interface ItemResourcesProps {
  id: string;
  label: string;
  variants?: ResourceVariant[];
  items?: Resource[];
}

export interface ItemsListProps {
  id: string;
  isVariantUsage?: boolean;
  inputs: Resource[];
}

export interface ResourceItemProps {
  isVariantUsage?: boolean;
  input: Resource;
}

export interface ItemFranklynProps {
  shinyDiscCount?: number;
  berkoniumOreCount?: number;
}

export interface ItemDamageProps {
  label: string;
  damage: number;
}
