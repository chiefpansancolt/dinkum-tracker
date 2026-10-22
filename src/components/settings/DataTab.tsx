"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/comps/ui/Button";
import { Note } from "@/comps/ui/Note";
import { DataManagementCard } from "./DataManagementCard";
import { SettingsCard } from "./SettingsCard";

export function DataTab() {
	const t = useTranslations("settings");

	return (
		<div className="flex flex-col gap-4">
			<Note title={t("storage.title")}>
				{t("storage.body")} {t("storage.action")}
			</Note>
			<div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
				<DataManagementCard />
				<SettingsCard title={t("manage.title")} description={t("manage.description")}>
					<div>
						<ButtonLink href="/playthroughs">{t("manage.link")}</ButtonLink>
					</div>
				</SettingsCard>
			</div>
		</div>
	);
}
