import type { Schema } from "@gamerdexapp/gamerdex-sync";

const dateOrder = (value: unknown) =>
  typeof value === "string" ? Date.parse(value) || 0 : 0;

/** A level or a count of hearts. When two devices changed it, the higher value wins. */
const level: Schema = { type: "max", order: (value) => Number(value) };

/** A marked item. When two devices changed it, marked wins. */
const flag: Schema = { type: "max", order: (value) => (value ? 1 : 0) };

const flags: Schema = { type: "object", each: flag };

/** A list of ids, such as the fish that the player caught. Removals since the last sync carry over. */
const idLists: Schema = { type: "object", each: { type: "join" } };

const sections = [
  "milestones",
  "licenses",
  "buildings",
  "cookingRecipes",
  "craftingRecipes",
  "signWritingRecipes",
  "books",
  "tools",
  "weapons",
  "equipment",
  "vehicles",
  "clothing",
  "furniture",
  "decorations",
  "cassettes",
] as const;

const playthrough: Schema = {
  type: "object",
  fields: {
    id: { type: "record" },
    name: { type: "record" },
    createdAt: { type: "record" },
    lastUpdated: { type: "max", order: dateOrder },
    collections: idLists,
    donations: idLists,
    skillLevels: { type: "object", each: level },
    relationships: { type: "object", each: level },
    calendar: { type: "record" },
    ...Object.fromEntries(sections.map((section) => [section, flags])),
  },
};

/**
 * The data file is the export file, so its shape never changes. Marked items and levels take the
 * higher side. Lists of ids keep what either device added and drop what either device removed. The
 * calendar day and the playthrough name report a conflict when both devices changed them. A
 * playthrough that one device deleted is deleted on the others, unless one of them changed it
 * since the last sync. Then the changed copy stays and the merge reports a conflict.
 */
export const syncSchema: Schema = {
  type: "object",
  fields: {
    playthroughs: { type: "keyed", key: "id", item: playthrough },
    version: { type: "record" },
    exportDate: { type: "max", order: dateOrder },
  },
};
