import type { AppData, Playthrough, PlaythroughSort, Prefs } from "./index";

export type UpdateRecipe = (playthrough: Playthrough) => Playthrough;

export interface PlaythroughContextType {
  appData: AppData;
  playthroughs: Playthrough[];
  activePlaythrough: Playthrough | null;
  defaultSort: PlaythroughSort;
  prefs: Prefs;
  isLoaded: boolean;
  lastSavedAt: Date | null;
  saveFailed: boolean;
  /**
   * Applies `recipe` to the active playthrough and saves only what changed. It returns the
   * playthrough as it was before, so a caller can offer Undo, or null when nothing was saved.
   * A browser that cannot store the data shows the Not saved toast.
   */
  update: (recipe: UpdateRecipe) => Playthrough | null;
  /** Does the same as `update` for any playthrough, such as a rename on the Playthroughs page. */
  updateById: (id: string, recipe: UpdateRecipe) => Playthrough | null;
  /**
   * Runs a write from the store and reports the result: the Saved chip on success and the Not
   * saved toast on failure. It returns whether the write succeeded.
   */
  commit: (write: () => boolean) => boolean;
  /** Puts back a playthrough exactly as it was, for example after Undo. */
  restore: (playthrough: Playthrough, index?: number) => void;
  setActivePlaythrough: (id: string | null) => void;
  setDefaultSort: (sort: PlaythroughSort) => void;
  updatePrefs: (updates: Partial<Prefs>) => void;
}

export interface UIContextType {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}
