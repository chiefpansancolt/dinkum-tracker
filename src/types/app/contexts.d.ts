import type { AppData, Playthrough, Prefs } from "./index";

export type UpdateRecipe = (playthrough: Playthrough) => Playthrough;

export interface PlaythroughContextType {
  appData: AppData;
  playthroughs: Playthrough[];
  activePlaythrough: Playthrough | null;
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
  /** Puts back a playthrough exactly as it was, for example after Undo. */
  restore: (playthrough: Playthrough) => void;
  setActivePlaythrough: (id: string | null) => void;
  updatePrefs: (updates: Partial<Prefs>) => void;
}

export interface UIContextType {
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}
