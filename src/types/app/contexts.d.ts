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
   * Saves only what changed and returns the previous playthrough for Undo, or null when nothing
   * was saved. A failed save shows the Not saved toast.
   */
  update: (recipe: UpdateRecipe) => Playthrough | null;
  updateById: (id: string, recipe: UpdateRecipe) => Playthrough | null;
  /**
   * Shows the Saved chip on success and the Not saved toast on failure. Returns whether the write
   * succeeded.
   */
  commit: (write: () => boolean) => boolean;
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
