import type { KeyboardEvent } from "react";

const STEPS: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

/**
 * Keyboard support for a tab strip: arrow keys move between tabs, Home and End jump to the ends.
 * Put the handler on the element with role tablist. Each tab needs role tab.
 */
export function useArrowTabs<TabId extends string>(
  ids: readonly TabId[],
  active: TabId | null,
  onChange: (id: TabId) => void,
) {
  return (event: KeyboardEvent<HTMLElement>) => {
    const tabs = [
      ...event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]'),
    ];
    const current = active === null ? 0 : ids.indexOf(active);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? ids.length - 1
          : event.key in STEPS
            ? (current + STEPS[event.key] + ids.length) % ids.length
            : null;
    if (next === null) return;

    event.preventDefault();
    onChange(ids[next]);
    tabs[next]?.focus();
  };
}
