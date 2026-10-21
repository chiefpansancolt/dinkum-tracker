"use client";

import { useTranslations } from "next-intl";
import type { CommerceLevel } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";

const LEVEL_LABEL_KEYS = {
	0: "base",
	5: "plus5",
	10: "plus10",
	15: "plus15",
} as const satisfies Record<CommerceLevel, string>;

const LEVELS = Object.keys(LEVEL_LABEL_KEYS).map(Number) as CommerceLevel[];

/** Sets the commerce level that every sell price on the page uses. It is saved for all pages. */
export function CommerceLevelControl() {
	const t = useTranslations("ui.commerce");
	const { prefs, updatePrefs } = usePlaythrough();

	return (
		<div className="flex flex-col gap-1.5">
			<span className="text-muted">{t("label")}</span>
			<SegmentedControl
				label={t("label")}
				options={LEVELS.map((level) => ({
					id: String(level),
					label: t(LEVEL_LABEL_KEYS[level]),
				}))}
				value={String(prefs.commerceLevel)}
				onChange={(value) => updatePrefs({ commerceLevel: Number(value) as CommerceLevel })}
			/>
		</div>
	);
}
