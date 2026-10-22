"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import type { LevelFlags, Levelled } from "@/service/levels";
import {
  allLevelsChange,
  allObtained,
  isObtained,
  levelChange,
  previousValues,
} from "@/service/levels";
import { useToast } from "@/comps/ui/Toast";

type NamedItem = Levelled & { name: string };

/**
 * One Undo toast puts back the flags that the change touched, including the higher levels that a
 * clear removed.
 */
export function useLevelEditor(section: "licenses" | "milestones") {
  const t = useTranslations("progress.common.toast");
  const common = useTranslations("common");
  const { update } = usePlaythrough();
  const showToast = useToast();

  const apply = (flags: LevelFlags, change: LevelFlags, title: string) => {
    const before = previousValues(flags, change);
    const saved = update((current) => ({
      ...current,
      [section]: { ...current[section], ...change },
    }));
    if (!saved) return;

    showToast({
      key: `${section}-levels`,
      variant: "success",
      title,
      action: {
        label: common("undo"),
        onAction: () =>
          update((current) => ({
            ...current,
            [section]: { ...current[section], ...before },
          })),
      },
    });
  };

  const toggleLevel = (flags: LevelFlags, item: NamedItem, level: number) => {
    const obtain = !isObtained(flags, item.id, level);
    const change = levelChange(flags, item, level, obtain);
    if (!change) return;

    const clearedCount = Object.keys(change).filter(
      (key) => flags[key] === true,
    ).length;
    apply(
      flags,
      change,
      obtain
        ? t("obtained", { item: item.name, level })
        : t("cleared", {
            item: item.name,
            count: clearedCount,
            amount: formatNumber(clearedCount),
          }),
    );
  };

  const toggleAll = (flags: LevelFlags, item: NamedItem) => {
    const obtain = !allObtained(flags, item);
    apply(
      flags,
      allLevelsChange(item, obtain),
      t(obtain ? "allObtained" : "allCleared", { item: item.name }),
    );
  };

  return { toggleLevel, toggleAll };
}
