"use client";

import { DATE_FORMATS, NUMBER_FORMATS } from "@/i18n/formats";
import type { DateFormatId, NumberFormatId } from "@/i18n/formats";
import { formatNumber, formatShortDate } from "@/i18n/formatter";
import { languageName } from "@/i18n/languageName";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "@/i18n/locales";
import type { Locale } from "@/i18n/locales";
import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { Field } from "@/comps/ui/Field";
import { Select } from "@/comps/ui/Select";
import { SettingsCard } from "./SettingsCard";

const SAMPLE_NUMBER = 1234567.89;
const SAMPLE_DATE = new Date(Date.UTC(2026, 9, 8, 12)).toISOString();

export function RegionCard() {
	const t = useTranslations("settings.region");
	const { prefs, updatePrefs } = usePlaythrough();

	return (
		<SettingsCard title={t("title")} description={t("description")}>
			<Field label={t("language.label")} hint={t("language.hint")}>
				<Select
					value={prefs.language ?? DEFAULT_LOCALE}
					onChange={(event) => updatePrefs({ language: event.target.value as Locale })}
				>
					{SUPPORTED_LOCALES.map((code) => (
						<option key={code} value={code}>
							{languageName(code)}
						</option>
					))}
				</Select>
			</Field>
			<Field
				label={t("numberFormat.label")}
				hint={t("numberFormat.hint", { example: formatNumber(SAMPLE_NUMBER) })}
			>
				<Select
					value={prefs.numberFormat ?? "auto"}
					onChange={(event) =>
						updatePrefs({ numberFormat: event.target.value as NumberFormatId })
					}
				>
					{NUMBER_FORMATS.map((format) => (
						<option key={format.id} value={format.id}>
							{t(`numberFormat.options.${format.id}`)}
						</option>
					))}
				</Select>
			</Field>
			<Field
				label={t("dateFormat.label")}
				hint={t("dateFormat.hint", { example: formatShortDate(SAMPLE_DATE) })}
			>
				<Select
					value={prefs.dateFormat ?? "auto"}
					onChange={(event) =>
						updatePrefs({ dateFormat: event.target.value as DateFormatId })
					}
				>
					{DATE_FORMATS.map((format) => (
						<option key={format.id} value={format.id}>
							{t(`dateFormat.options.${format.id}`)}
						</option>
					))}
				</Select>
			</Field>
		</SettingsCard>
	);
}
