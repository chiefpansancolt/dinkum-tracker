"use client";

import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";

/** Grid or List. The choice is saved on this device and shared by every list page. */
export function ViewToggle() {
	const t = useTranslations("pedia.view");
	const { prefs, updatePrefs } = usePlaythrough();

	return (
		<SegmentedControl
			label={t("label")}
			value={prefs.viewMode}
			onChange={(viewMode) => updatePrefs({ viewMode })}
			options={[
				{ id: "grid", label: t("grid") },
				{ id: "list", label: t("list") },
			]}
		/>
	);
}
