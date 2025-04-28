import React from "react";
import {
  Resource,
  ResourceVariant,
  Buffs,
  ResourceItem,
  License,
  Milestone,
  Skill,
  NPC,
} from "../dinkum";

export type FilterArray = string[];
export interface FilterObject {
  id: string;
  value: string;
}

export interface FilterBarProps {
  showFilters: boolean;
  filters?: {
    [key: string]: {
      value: string;
      options: FilterArray | FilterObject[];
      label: string;
    };
  };
  onFilterChange?: (name: string, value: string) => void;
  showSearch: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  showActionButton?: boolean;
  actionButtonLabel?: string;
  onActionButtonClick?: () => void;
  filterActive?: boolean;
  selectedCount?: number;
}

export interface TabHeaderProps {
  title: string;
  collectionName?: string;
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
  showRightBadge?: boolean;
  renderBadgeDetails?: () => React.ReactNode;
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

export interface PermitValueProps {
  label?: string;
  price: number;
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
  renderImage?: () => React.ReactNode;
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
  inputs: Resource[];
}

export interface ResourceItemProps {
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

export interface ItemBuffsProps {
  id: string;
  buffs: Buffs;
}

export interface ResourceCardProps {
  resource: ResourceItem;
  getTypeColor: (type: ResourceType) => string;
}

export interface ItemBreakdownResourceCardProps {
  resource: UniqueResource;
  getTypeColor: (type: ResourceType) => string;
}

export interface BreadCrumbsProps {
  name: string;
  overview?: boolean;
  routeName?: string;
  id?: string;
}

export interface CollectionCardProps {
  record:
    | Book
    | PediaItem
    | Building
    | Clothing
    | CookingRecipe
    | Recipe
    | Equipment
    | ResourceItem
    | Tool
    | Vehicle
    | Weapon;
  isCollected?: boolean;
  isDonated?: boolean;
  onToggleCollected?: (id: string, isCollected: boolean) => void;
  onToggleDonated?: (id: string, isDonated: boolean) => void;
  getTypeColor?: (type: ResourceType) => string;
}

export interface NPCCardProps {
  npc: NPC;
  hearts: number;
  onHeartsChange: (id: string, hearts: number) => void;
}

export interface LicenseCardProps {
  license: License;
  licenseCollection: Record<string, boolean>;
  isPreviousLevelObtained: (licenseId: string, level: number) => boolean;
  onToggleLicenseLevel: (
    licenseId: string,
    level: number,
    isObtained: boolean,
  ) => void;
  onToggleAllLevels: (license: License, obtainAll: boolean) => void;
  areAllLevelsComplete: (license: License) => boolean;
}

export interface MilestoneCardProps {
  milestone: Milestone;
  milestoneCollection: Record<string, boolean>;
  isPreviousLevelObtained: (milestoneId: string, level: number) => boolean;
  onToggleMilestoneLevel: (milestoneId: string, level: number) => void;
  onToggleAllLevels: (milestone: Milestone, setToValue: boolean) => void;
  areAllLevelsComplete: (milestone: Milestone) => boolean;
}

export interface SkillCardProps {
  skill: Skill;
  level: number;
  onLevelChange: (delta: number) => void;
}
