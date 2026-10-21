"use client";

import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { createPlaythrough } from "@/service/playthrough";
import { addPlaythrough, removePlaythrough } from "@/service/store";
import { useToast } from "@/comps/ui/Toast";

/**
 * Creates an empty playthrough and offers Undo. Undo removes it and makes the playthrough that was
 * active before active again. It returns false when the browser could not store the data.
 */
export function useCreatePlaythrough() {
  const t = useTranslations("playthroughs.new");
  const common = useTranslations("common");
  const { activePlaythrough, commit, setActivePlaythrough } = usePlaythrough();
  const showToast = useToast();

  return (name: string, makeActive: boolean) => {
    const created = createPlaythrough(name);
    const previousActiveId = activePlaythrough?.id ?? null;

    const saved = commit(() =>
      addPlaythrough(created, { activate: makeActive }),
    );
    if (!saved) return false;

    showToast({
      variant: "success",
      title: t("createdToast", { name }),
      action: {
        label: common("undo"),
        onAction: () => {
          commit(() => removePlaythrough(created.id) !== null);
          setActivePlaythrough(previousActiveId);
        },
      },
    });
    return true;
  };
}
