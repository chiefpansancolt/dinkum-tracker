"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useSync } from "@/lib/contexts/SyncContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Tabs } from "@/comps/ui/Tabs";
import { AboutTab } from "./AboutTab";
import { DataTab } from "./DataTab";
import { PreferencesTab } from "./PreferencesTab";
import { SyncTab } from "./SyncTab";

const tabIds = ["sync", "preferences", "data", "about"] as const;

export function SettingsView() {
	const t = useTranslations("settings");
	const { playthroughs } = usePlaythrough();
	const { available } = useSync();
	const [activeTab, setActiveTab] = useUrlTab(tabIds, available ? "sync" : "preferences");

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					count: playthroughs.length,
					amount: formatNumber(playthroughs.length),
				})}
			/>
			<Tabs
				label={t("page.tabsLabel")}
				tabs={tabIds.map((id) => ({ id, label: t(`page.tabs.${id}`) }))}
				activeId={activeTab}
				onChange={setActiveTab}
			>
				{activeTab === "sync" && <SyncTab />}
				{activeTab === "preferences" && <PreferencesTab />}
				{activeTab === "data" && <DataTab />}
				{activeTab === "about" && <AboutTab />}
			</Tabs>
		</>
	);
}
