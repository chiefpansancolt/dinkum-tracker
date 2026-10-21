"use client";

import { useState } from "react";
import type { CollectedFilter, Flags } from "@/service/collect";
import { applyCollectedFilter } from "@/service/collect";
import type { FilterFieldConfig } from "@/comps/page/FilterBlock";

export interface FilterSpec<Item> {
  id: string;
  label: string;
  /** The first option is the all choice. A filter on it does not narrow the list. */
  options: { id: string; label: string }[];
  apply: (items: Item[], value: string) => Item[];
}

interface UseCollectionOptions<Item extends { id: string }> {
  items: Item[];
  /** The filters, which may depend on the values chosen so far, as Type depends on Slot. */
  buildSpecs: (values: Record<string, string>) => FilterSpec<Item>[];
  search: (items: Item[], query: string) => Item[];
  initialQuery: string;
  /** A filter with its own control outside the filter block, such as the Buffs panel. */
  extraFilter?: (items: Item[]) => Item[];
  /** Lets a change reset another filter, as a new Slot resets the Type. */
  afterChange?: (
    id: string,
    values: Record<string, string>,
  ) => Record<string, string>;
}

const firstOption = <Item>(spec: FilterSpec<Item>) => spec.options[0].id;

/** The filter state of one list, and the items that pass the filters and the name search. */
export function useCollection<Item extends { id: string }>({
  items,
  buildSpecs,
  search,
  initialQuery,
  extraFilter,
  afterChange,
}: UseCollectionOptions<Item>) {
  const [chosen, setChosen] = useState<Record<string, string>>({});
  const [query, setQuery] = useState(initialQuery);

  const run = (values: Record<string, string>, text: string) => {
    const filtered = buildSpecs(values).reduce((rest, spec) => {
      const value = values[spec.id] ?? firstOption(spec);
      return value === firstOption(spec) ? rest : spec.apply(rest, value);
    }, items);
    const extra = extraFilter ? extraFilter(filtered) : filtered;
    return text ? search(extra, text) : extra;
  };

  const specs = buildSpecs(chosen);
  const values = Object.fromEntries(
    specs.map((spec) => [spec.id, chosen[spec.id] ?? firstOption(spec)]),
  );
  const fields: FilterFieldConfig[] = specs.map(({ id, label, options }) => ({
    id,
    label,
    options,
  }));

  return {
    fields,
    values,
    query,
    setQuery,
    shown: run(chosen, query),
    setValue: (id: string, value: string) =>
      setChosen((current) => {
        const next = { ...current, [id]: value };
        return afterChange ? afterChange(id, next) : next;
      }),
    clear: () => {
      setChosen({});
      setQuery("");
    },
    /** How many items a draft of the filters would show, for the apply button of the mobile sheet. */
    countFor: (draft: Record<string, string>) =>
      run({ ...chosen, ...draft }, query).length,
  };
}

/** The Collected or Unlocked filter, which is the last filter of every list. */
export const collectedSpec = <Item extends { id: string }>(
  label: string,
  options: { all: string; on: string; off: string },
  flags: Flags | undefined,
): FilterSpec<Item> => ({
  id: "collected",
  label,
  options: [
    { id: "all", label: options.all },
    { id: "collected", label: options.on },
    { id: "not_collected", label: options.off },
  ],
  apply: (items, value) =>
    applyCollectedFilter(items, flags, value as CollectedFilter),
});
