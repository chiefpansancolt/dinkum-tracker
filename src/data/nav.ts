import type { IconType } from "react-icons";
import {
  LuBadgeCheck,
  LuBookOpen,
  LuBuilding2,
  LuCalendarDays,
  LuChefHat,
  LuFlag,
  LuLayoutDashboard,
  LuLibrary,
  LuListTree,
  LuScale,
  LuSettings,
  LuShirt,
  LuTrendingUp,
  LuUsers,
  LuWrench,
} from "react-icons/lu";

export const APP_NAME = "Dinkum Tracker";

export type NavItemId =
  | "overview"
  | "pedia"
  | "npcs"
  | "calendar"
  | "buildings"
  | "licenses"
  | "milestones"
  | "skills"
  | "recipes"
  | "gear"
  | "wardrobe"
  | "itemsBreakdown"
  | "weightCalculator"
  | "reference"
  | "settings";

/** Pages that are not in the sidebar list but still have a title. */
export type RouteId = NavItemId | "playthroughs";

type NavGroupId = "track" | "progress" | "collect" | "tools";

export interface NavItem {
  id: NavItemId;
  href: string;
  icon: IconType;
}

export interface NavGroup {
  id: NavGroupId | null;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    id: null,
    items: [{ id: "overview", href: "/overview", icon: LuLayoutDashboard }],
  },
  {
    id: "track",
    items: [
      { id: "pedia", href: "/pedia", icon: LuBookOpen },
      { id: "npcs", href: "/npcs", icon: LuUsers },
      { id: "calendar", href: "/calendar", icon: LuCalendarDays },
    ],
  },
  {
    id: "progress",
    items: [
      { id: "buildings", href: "/buildings", icon: LuBuilding2 },
      { id: "licenses", href: "/licenses", icon: LuBadgeCheck },
      { id: "milestones", href: "/milestones", icon: LuFlag },
      { id: "skills", href: "/skills", icon: LuTrendingUp },
    ],
  },
  {
    id: "collect",
    items: [
      { id: "recipes", href: "/recipes", icon: LuChefHat },
      { id: "gear", href: "/gear", icon: LuWrench },
      { id: "wardrobe", href: "/wardrobe", icon: LuShirt },
    ],
  },
  {
    id: "tools",
    items: [
      { id: "itemsBreakdown", href: "/items-breakdown", icon: LuListTree },
      { id: "weightCalculator", href: "/weight-calculator", icon: LuScale },
      { id: "reference", href: "/reference", icon: LuLibrary },
    ],
  },
];

export const settingsNavItem: NavItem = {
  id: "settings",
  href: "/settings",
  icon: LuSettings,
};

const routes: { id: RouteId; href: string }[] = [
  ...navGroups.flatMap((group) => group.items),
  settingsNavItem,
  { id: "playthroughs", href: "/playthroughs" },
  { id: "playthroughs", href: "/playthroughs/new" },
];

export const isNavItemActive = (item: NavItem, pathname: string) =>
  pathname === item.href;

export const getPageRouteId = (pathname: string): RouteId | null =>
  routes.find((route) => pathname === route.href)?.id ?? null;
