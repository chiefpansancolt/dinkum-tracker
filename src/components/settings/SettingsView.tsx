"use client";

import { useTranslations } from "next-intl";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useUrlTab } from "@/lib/hooks/useUrlTab";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Tabs } from "@/comps/ui/Tabs";
import { AboutTab } from "./AboutTab";
import { DataTab } from "./DataTab";
import { PreferencesTab } from "./PreferencesTab";

const tabIds = ["preferences", "data", "about"] as const;

export function SettingsView() {
	const t = useTranslations("settings");
	const { playthroughs } = usePlaythrough();
	const [activeTab, setActiveTab] = useUrlTab(tabIds, "preferences");

	return (
		<>
			<PageHeader title={t("title")} subline={t("subline", { count: playthroughs.length })} />
			<Tabs
				label={t("page.tabsLabel")}
				tabs={tabIds.map((id) => ({ id, label: t(`page.tabs.${id}`) }))}
				activeId={activeTab}
				onChange={setActiveTab}
			>
				{activeTab === "preferences" && <PreferencesTab />}
				{activeTab === "data" && <DataTab />}
				{activeTab === "about" && <AboutTab />}
			</Tabs>
		</>
	);
}
