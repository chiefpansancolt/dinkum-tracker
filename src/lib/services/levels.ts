/**
 * Licenses and milestones have levels. The saved data holds one flag for each level under the key
 * `{id}_level_{n}`. A level can be obtained only after the level before it, and clearing a level
 * clears every higher one. These rules are the ones of the old app.
 */

export type LevelFlags = Record<string, boolean>;

export interface Levelled {
  id: string;
  levels: { level: number }[];
}

export const levelKey = (id: string, level: number) => `${id}_level_${level}`;

export const isObtained = (flags: LevelFlags, id: string, level: number) =>
  flags[levelKey(id, level)] === true;

/** The first level is always open. Any other level opens when the level before it is obtained. */
export const isUnlocked = (flags: LevelFlags, id: string, level: number) =>
  level === 1 || isObtained(flags, id, level - 1);

/**
 * The flags to write when a level is switched on or off. A locked level cannot be switched on, so
 * that returns null. Switching a level off also switches off every higher level.
 */
export const levelChange = (
  flags: LevelFlags,
  item: Levelled,
  level: number,
  obtain: boolean,
): LevelFlags | null => {
  if (obtain) {
    return isUnlocked(flags, item.id, level)
      ? { [levelKey(item.id, level)]: true }
      : null;
  }

  return Object.fromEntries(
    item.levels
      .filter((entry) => entry.level >= level)
      .map((entry) => [levelKey(item.id, entry.level), false]),
  );
};

/** The flags to write for Complete All or Clear All. */
export const allLevelsChange = (item: Levelled, obtain: boolean): LevelFlags =>
  Object.fromEntries(
    item.levels.map((entry) => [levelKey(item.id, entry.level), obtain]),
  );

export const allObtained = (flags: LevelFlags, item: Levelled) =>
  item.levels.every((entry) => isObtained(flags, item.id, entry.level));

export const anyObtained = (flags: LevelFlags, item: Levelled) =>
  item.levels.some((entry) => isObtained(flags, item.id, entry.level));

export const noneObtained = (flags: LevelFlags, item: Levelled) =>
  item.levels.every((entry) => !flags[levelKey(item.id, entry.level)]);

/** The values the changed flags had before, so a change can be undone in one step. */
export const previousValues = (
  flags: LevelFlags,
  change: LevelFlags,
): LevelFlags =>
  Object.fromEntries(
    Object.keys(change).map((key) => [key, flags[key] === true]),
  );

/** The number of flags that are on. This is how the old pages counted obtained levels. */
export const obtainedCount = (flags: LevelFlags | undefined) =>
  Object.values(flags ?? {}).filter(Boolean).length;
