"use client";

import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import type { CollectSection, Flags } from "@/service/collect";
import { isCollected, withFlag } from "@/service/collect";
import { useToast } from "@/comps/ui/Toast";

/**
 * Marks one item collected or unlocked and offers Undo. Repeated changes share one toast, and Undo
 * puts back only the item of the last change.
 */
export function useCollectedToggle(
  section: CollectSection,
  mode: "collected" | "unlocked",
) {
  const t = useTranslations("collect.toast");
  const common = useTranslations("common");
  const { update } = usePlaythrough();
  const showToast = useToast();

  return (
    flags: Flags | undefined,
    item: { id: string; name: string },
    value: boolean,
  ) => {
    const previous = isCollected(flags, item.id);
    const saved = update((current) =>
      withFlag(current, section, item.id, value),
    );
    if (!saved) return;

    const state =
      mode === "collected"
        ? value
          ? "collected"
          : "notCollected"
        : value
          ? "unlocked"
          : "locked";
    showToast({
      key: `collect-${section}`,
      variant: "success",
      title: t("marked", { name: item.name, state: t(state) }),
      action: {
        label: common("undo"),
        onAction: () =>
          update((current) => withFlag(current, section, item.id, previous)),
      },
    });
  };
}
