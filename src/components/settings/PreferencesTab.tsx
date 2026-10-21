"use client";

import { useTranslations } from "next-intl";
import type { PlaythroughSort } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import type { ThemeMode } from "@/lib/theme";
import { useThemeMode, writeThemeMode } from "@/lib/theme";
import { Field } from "@/comps/ui/Field";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";
import { Select } from "@/comps/ui/Select";
import { SettingsCard } from "./SettingsCard";

const SORT_OPTIONS: PlaythroughSort[] = ["lastUpdated", "name", "createdAt", "completion"];

const THEME_OPTIONS = [
	{ id: "light", labelKey: "light" },
	{ id: "dark", labelKey: "dark" },
	{ id: "auto", labelKey: "system" },
] as const satisfies readonly { id: ThemeMode; labelKey: string }[];

export function PreferencesTab() {
	const t = useTranslations("settings");
	const themeLabels = useTranslations("shell.theme");
	const sortLabels = useTranslations("playthroughs.filters.sort");
	const theme = useThemeMode();
	const { defaultSort, setDefaultSort } = usePlaythrough();

	return (
		<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
			<SettingsCard
				title={t("preferences.appearance.title")}
				description={t("preferences.appearance.description")}
			>
				<SegmentedControl
					fullWidth
					label={t("appearance.theme")}
					value={theme}
					onChange={writeThemeMode}
					options={THEME_OPTIONS.map((option) => ({
						id: option.id,
						label: themeLabels(option.labelKey),
					}))}
				/>
				<p className="text-muted">{t("appearance.themeHint")}</p>
			</SettingsCard>
			<SettingsCard
				title={t("preferences.playthroughList.title")}
				description={t("preferences.playthroughList.description")}
			>
				<Field label={t("appearance.defaultSort")} hint={t("appearance.defaultSortHint")}>
					<Select
						value={defaultSort}
						onChange={(event) => setDefaultSort(event.target.value as PlaythroughSort)}
					>
						{SORT_OPTIONS.map((option) => (
							<option key={option} value={option}>
								{sortLabels(option)}
							</option>
						))}
					</Select>
				</Field>
			</SettingsCard>
		</div>
	);
}
