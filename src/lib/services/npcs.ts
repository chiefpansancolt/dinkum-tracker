import { formatDecimal } from "@/i18n/formatter";
import { type NPC, npcs } from "dinkum-data";

export const allNpcs: NPC[] = npcs().get();

export const MAX_HEARTS = 5;
export const HEART_STEP = 0.25;
export const MAX_TOTAL_HEARTS = allNpcs.length * MAX_HEARTS;

export type RelationshipFilter = "all" | "none" | "progress" | "full";
export type ResidenceFilter = "all" | "can_move_in" | "visitors";

export const heartsOf = (
  relationships: Record<string, number> | undefined,
  id: string,
) => relationships?.[id] ?? 0;

export const totalHearts = (
  relationships: Record<string, number> | undefined,
) => allNpcs.reduce((sum, npc) => sum + heartsOf(relationships, npc.id), 0);

export const fullHeartCount = (
  relationships: Record<string, number> | undefined,
) =>
  allNpcs.filter((npc) => heartsOf(relationships, npc.id) === MAX_HEARTS)
    .length;

export const metCount = (relationships: Record<string, number> | undefined) =>
  allNpcs.filter((npc) => heartsOf(relationships, npc.id) > 0).length;

/** One step up or down, kept inside 0 to 5. */
export const stepHearts = (hearts: number, direction: 1 | -1) =>
  Math.min(MAX_HEARTS, Math.max(0, hearts + direction * HEART_STEP));

/**
 * The value after a click on the heart at `index` (0 to 4). A full heart sets the count to its own
 * position, so the last full heart takes a heart back. An empty or part filled heart fills up to it.
 */
export const heartsAfterClick = (hearts: number, index: number) =>
  index < Math.floor(hearts) ? index : index + 1;

/** How much of the heart at `index` is filled, from 0 to 1 in quarters. */
export const heartFill = (hearts: number, index: number) =>
  Math.min(1, Math.max(0, hearts - index));

const isVisitor = (npc: NPC) =>
  /doesn't move in/i.test(npc.requirements.moveIn);

/** Fletch and the Night Merchant have no move in rule. */
const canMoveIn = (npc: NPC) =>
  !isVisitor(npc) && npc.requirements.moveIn !== "N/A";

const matchesRelationship = (hearts: number, filter: RelationshipFilter) => {
  if (filter === "none") return hearts === 0;
  if (filter === "progress") return hearts > 0 && hearts < MAX_HEARTS;
  if (filter === "full") return hearts === MAX_HEARTS;
  return true;
};

const matchesResidence = (npc: NPC, filter: ResidenceFilter) => {
  if (filter === "visitors") return isVisitor(npc);
  if (filter === "can_move_in") return canMoveIn(npc);
  return true;
};

export interface NpcFilters {
  relationship: RelationshipFilter;
  residence: ResidenceFilter;
  query: string;
}

export const emptyNpcFilters: NpcFilters = {
  relationship: "all",
  residence: "all",
  query: "",
};

export const filterNpcs = (
  relationships: Record<string, number> | undefined,
  filters: NpcFilters,
) => {
  const text = filters.query.trim().toLowerCase();
  return allNpcs.filter(
    (npc) =>
      matchesRelationship(
        heartsOf(relationships, npc.id),
        filters.relationship,
      ) &&
      matchesResidence(npc, filters.residence) &&
      (text === "" || npc.name.toLowerCase().includes(text)),
  );
};

/** The occupation field has one fact on each line. */
export const occupationLines = (npc: NPC) =>
  npc.occupation.split("\n").filter(Boolean);

/** Hearts as the old page wrote them: 2, 2.5, 1.25. */
export const formatHearts = (hearts: number) =>
  String(Number(hearts.toFixed(2)));
