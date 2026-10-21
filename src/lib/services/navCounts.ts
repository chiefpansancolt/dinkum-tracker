import type { Playthrough } from "@/types/app";
import type { NavItemId } from "@/data/nav";
import { obtainedCount } from "./levels";
import { pediaStats } from "./overview";
import {
  allLicenses,
  allMilestones,
  collectableBuildings,
  installedCount,
} from "./progress";

const levelTotal = (items: { levels: unknown[] }[]) =>
  items.reduce((sum, item) => sum + item.levels.length, 0);

const LICENSE_LEVELS = levelTotal(allLicenses);
const MILESTONE_LEVELS = levelTotal(allMilestones);

/** The progress shown beside a sidebar link. A page without a count has no entry. */
export const navCounts = (
  playthrough: Playthrough,
): Partial<Record<NavItemId, string>> => ({
  pedia: `${pediaStats(playthrough).overall.percent}%`,
  buildings: `${installedCount(playthrough.buildings)}/${collectableBuildings.length}`,
  licenses: `${obtainedCount(playthrough.licenses)}/${LICENSE_LEVELS}`,
  milestones: `${obtainedCount(playthrough.milestones)}/${MILESTONE_LEVELS}`,
});
