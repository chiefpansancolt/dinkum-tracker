import type {
  AppData,
  CommerceLevel,
  Playthrough,
  PlaythroughSort,
  Prefs,
} from "@/types/app";
import { withDefaults } from "./playthrough";
import {
  ACTIVE_PLAYTHROUGH_KEY,
  DEFAULT_SORT_KEY,
  PLAYTHROUGHS_KEY,
  PREFS_KEY,
} from "./storageKeys";

/**
 * The saved data lives in separate `localStorage` keys that the old app also reads. Every write
 * reads the key again first and changes only the playthrough it was asked to change, so another
 * tab's edits and fields this app does not know about survive.
 */

const SORT_KEYS: readonly PlaythroughSort[] = [
  "lastUpdated",
  "name",
  "createdAt",
  "completion",
];
const COMMERCE_LEVELS: readonly CommerceLevel[] = [0, 5, 10, 15];

const DEFAULT_PREFS: Prefs = { commerceLevel: 0 };

const emptyData: AppData = {
  playthroughs: [],
  activePlaythroughId: null,
  defaultSort: "lastUpdated",
  prefs: DEFAULT_PREFS,
};

export type UpdateResult =
  | { status: "saved"; previous: Playthrough }
  | { status: "unchanged" | "missing" | "failed" };

const listeners = new Set<() => void>();
const notifyListeners = () => listeners.forEach((listener) => listener());

const readKey = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeKey = (key: string, value: string | null): boolean => {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
    notifyListeners();
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

const parseJson = (raw: string | null): unknown => {
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error parsing saved data:", error);
    return undefined;
  }
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isPlaythrough = (value: unknown): value is Playthrough =>
  isRecord(value) &&
  typeof value.id === "string" &&
  typeof value.name === "string";

const sameJson = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

/** Every entry of the saved list as stored, including any that this app cannot show. */
const readStoredEntries = (): unknown[] => {
  const parsed = parseJson(readKey(PLAYTHROUGHS_KEY));
  return Array.isArray(parsed) ? parsed : [];
};

/** The playthroughs exactly as saved, for export. */
export const readStoredPlaythroughs = (): Playthrough[] =>
  readStoredEntries().filter(isPlaythrough);

const writeEntries = (entries: unknown[]) =>
  writeKey(PLAYTHROUGHS_KEY, JSON.stringify(entries));

const timestamp = (playthrough: Playthrough) =>
  Date.parse(playthrough.lastUpdated) || 0;

const mostRecentlyUpdated = (playthroughs: Playthrough[]) =>
  [...playthroughs].sort((a, b) => timestamp(b) - timestamp(a))[0] ?? null;

const parsePrefs = (raw: string | null): Prefs => {
  const parsed = parseJson(raw);
  if (!isRecord(parsed)) return DEFAULT_PREFS;

  const commerceLevel = COMMERCE_LEVELS.find(
    (level) => level === parsed.commerceLevel,
  );
  return { commerceLevel: commerceLevel ?? DEFAULT_PREFS.commerceLevel };
};

const parseSort = (raw: string | null): PlaythroughSort =>
  SORT_KEYS.find((key) => key === raw) ?? emptyData.defaultSort;

const resolveActiveId = (
  playthroughs: Playthrough[],
  storedId: string | null,
) => {
  if (playthroughs.some((playthrough) => playthrough.id === storedId))
    return storedId;
  return mostRecentlyUpdated(playthroughs)?.id ?? null;
};

interface RawSnapshot {
  playthroughs: string | null;
  active: string | null;
  sort: string | null;
  prefs: string | null;
}

let cachedRaw: RawSnapshot | null = null;
let cachedData: AppData = emptyData;

const sameRaw = (a: RawSnapshot, b: RawSnapshot) =>
  a.playthroughs === b.playthroughs &&
  a.active === b.active &&
  a.sort === b.sort &&
  a.prefs === b.prefs;

export const storageService = {
  /** Returns the same object until a saved value changes, as `useSyncExternalStore` requires. */
  load(): AppData {
    if (typeof window === "undefined") return emptyData;

    const raw: RawSnapshot = {
      playthroughs: readKey(PLAYTHROUGHS_KEY),
      active: readKey(ACTIVE_PLAYTHROUGH_KEY),
      sort: readKey(DEFAULT_SORT_KEY),
      prefs: readKey(PREFS_KEY),
    };
    if (cachedRaw && sameRaw(cachedRaw, raw)) return cachedData;

    const playthroughs = readStoredPlaythroughs().map(withDefaults);
    cachedRaw = raw;
    cachedData = {
      playthroughs,
      activePlaythroughId: resolveActiveId(playthroughs, raw.active),
      defaultSort: parseSort(raw.sort),
      prefs: parsePrefs(raw.prefs),
    };
    return cachedData;
  },

  loadOnServer(): AppData {
    return emptyData;
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },
};

/**
 * Applies `recipe` to one playthrough and writes only the sections the recipe changed, plus
 * `lastUpdated`. A recipe that changes nothing writes nothing.
 */
export const updatePlaythrough = (
  id: string,
  recipe: (playthrough: Playthrough) => Playthrough,
): UpdateResult => {
  const entries = readStoredEntries();
  const index = entries.findIndex(
    (entry) => isPlaythrough(entry) && entry.id === id,
  );
  if (index === -1) return { status: "missing" };

  const stored = entries[index] as Playthrough;
  const before = withDefaults(stored);
  const after = recipe(before);

  const changedSections = Object.entries(after).filter(
    ([section, value]) =>
      !sameJson(before[section as keyof Playthrough], value),
  );
  if (changedSections.length === 0) return { status: "unchanged" };

  entries[index] = {
    ...stored,
    ...Object.fromEntries(changedSections),
    lastUpdated: new Date().toISOString(),
  };
  return writeEntries(entries)
    ? { status: "saved", previous: stored }
    : { status: "failed" };
};

export const setActivePlaythroughId = (id: string | null) =>
  writeKey(ACTIVE_PLAYTHROUGH_KEY, id);

/** Adds a new playthrough at the end, as the old app did. */
export const addPlaythrough = (
  playthrough: Playthrough,
  options: { activate: boolean },
) => {
  const saved = writeEntries([...readStoredEntries(), playthrough]);
  if (saved && options.activate) setActivePlaythroughId(playthrough.id);
  return saved;
};

/** Puts a playthrough back at its old place, or replaces it when its id is already there. */
export const restorePlaythrough = (
  playthrough: Playthrough,
  index?: number,
) => {
  const entries = readStoredEntries();
  const existing = entries.findIndex(
    (entry) => isPlaythrough(entry) && entry.id === playthrough.id,
  );

  if (existing !== -1) entries[existing] = playthrough;
  else entries.splice(index ?? entries.length, 0, playthrough);
  return writeEntries(entries);
};

export interface RemovedPlaythrough {
  playthrough: Playthrough;
  index: number;
  wasActive: boolean;
}

/**
 * Removes one playthrough. Deleting the active one makes the most recently updated of the rest
 * active.
 */
export const removePlaythrough = (id: string): RemovedPlaythrough | null => {
  const entries = readStoredEntries();
  const index = entries.findIndex(
    (entry) => isPlaythrough(entry) && entry.id === id,
  );
  if (index === -1) return null;

  const playthrough = entries[index] as Playthrough;
  const remaining = entries.filter((_, position) => position !== index);
  if (!writeEntries(remaining)) return null;

  const wasActive = readKey(ACTIVE_PLAYTHROUGH_KEY) === id;
  if (wasActive) {
    const next = mostRecentlyUpdated(remaining.filter(isPlaythrough));
    setActivePlaythroughId(next?.id ?? null);
  }
  return { playthrough, index, wasActive };
};

export const replaceAllPlaythroughs = (playthroughs: Playthrough[]) =>
  writeEntries(playthroughs);

export const clearAllPlaythroughs = () => {
  const cleared = writeKey(PLAYTHROUGHS_KEY, null);
  setActivePlaythroughId(null);
  return cleared;
};

export const setDefaultSort = (sort: PlaythroughSort) =>
  writeKey(DEFAULT_SORT_KEY, sort);

export const updatePrefs = (updates: Partial<Prefs>) => {
  const stored = parseJson(readKey(PREFS_KEY));
  const current = isRecord(stored) ? stored : {};
  return writeKey(PREFS_KEY, JSON.stringify({ ...current, ...updates }));
};
