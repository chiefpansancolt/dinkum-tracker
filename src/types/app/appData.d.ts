import type { Playthrough } from "./storage";

export type PlaythroughSort =
  "lastUpdated" | "name" | "createdAt" | "completion";

export type CommerceLevel = 0 | 5 | 10 | 15;

export interface Prefs {
  commerceLevel: CommerceLevel;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
  defaultSort: PlaythroughSort;
  prefs: Prefs;
}
