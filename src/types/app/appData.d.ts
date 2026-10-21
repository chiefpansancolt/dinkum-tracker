import type { Playthrough } from "./storage";

export type PlaythroughSort =
  "lastUpdated" | "name" | "createdAt" | "completion";

export type CommerceLevel = 0 | 5 | 10 | 15;

export type ViewMode = "grid" | "list";

export interface Prefs {
  commerceLevel: CommerceLevel;
  /** How the long lists show their items. It is shared by every list page. */
  viewMode: ViewMode;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
  defaultSort: PlaythroughSort;
  prefs: Prefs;
}
