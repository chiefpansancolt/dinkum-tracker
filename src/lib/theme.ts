import { useSyncExternalStore } from "react";
import { DARK_QUERY, THEME_STORAGE_KEY } from "./themeScript";

export const THEME_MODES = ["light", "dark", "auto"] as const;
export type ThemeMode = (typeof THEME_MODES)[number];

const DEFAULT_THEME_MODE: ThemeMode = "auto";
const THEME_CHANGED_EVENT = "dinkum-theme-changed";

const isThemeMode = (value: unknown): value is ThemeMode =>
  THEME_MODES.some((mode) => mode === value);

export const readThemeMode = (): ThemeMode => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return isThemeMode(stored) ? stored : DEFAULT_THEME_MODE;
  } catch {
    return DEFAULT_THEME_MODE;
  }
};

const isDark = (mode: ThemeMode) =>
  mode === "dark" || (mode === "auto" && matchMedia(DARK_QUERY).matches);

export const applyThemeMode = (mode: ThemeMode) => {
  document.documentElement.classList.toggle("dark", isDark(mode));
};

export const writeThemeMode = (mode: ThemeMode) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
    // The theme still applies for this visit when the browser refuses to store it.
  }
  applyThemeMode(mode);
  window.dispatchEvent(new Event(THEME_CHANGED_EVENT));
};

const subscribeToTheme = (notify: () => void) => {
  window.addEventListener(THEME_CHANGED_EVENT, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(THEME_CHANGED_EVENT, notify);
    window.removeEventListener("storage", notify);
  };
};

export const useThemeMode = () =>
  useSyncExternalStore(
    subscribeToTheme,
    readThemeMode,
    () => DEFAULT_THEME_MODE,
  );
