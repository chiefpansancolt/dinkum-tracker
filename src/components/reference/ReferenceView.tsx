"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { PlantTab, ReferenceTab } from "@/service/reference";
import { PLANT_TABS, plantCounts, REFERENCE_TABS, tabCounts } from "@/service/reference";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Card } from "@/comps/ui/Card";
import { AnimalsPanel } from "./AnimalsPanel";
import { DailyPanel } from "./DailyPanel";
import { FoodPanel } from "./FoodPanel";
import { PlantsPanel } from "./PlantsPanel";
import { ResourcesPanel } from "./ResourcesPanel";

type TileId = "animals" | "resources" | PlantTab | "food" | "daily";

const HUB_TILES: { id: TileId; href: string; count: number }[] = [
	{ id: "animals", href: "/reference?tab=animals", count: tabCounts.animals },
	{ id: "resources", href: "/reference?tab=resources", count: tabCounts.resources },
	...PLANT_TABS.map((id) => ({
		id,
		href: `/reference?tab=plants&sub=${id}`,
		count: plantCounts[id],
	})),
	{ id: "food", href: "/reference?tab=food", count: tabCounts.food },
	{ id: "daily", href: "/reference?tab=daily", count: tabCounts.daily },
];

const totalEntries = REFERENCE_TABS.reduce((sum, id) => sum + tabCounts[id], 0);

const PANELS: Record<ReferenceTab, () => React.JSX.Element> = {
	animals: AnimalsPanel,
	resources: ResourcesPanel,
	plants: PlantsPanel,
	food: FoodPanel,
	daily: DailyPanel,
};

function Landing() {
	const t = useTranslations("reference");

	return (
		<>
			<p className="text-muted">{t("landing.intro")}</p>
			<ul className="grid grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))] gap-3">
				{HUB_TILES.map(({ id, href, count }) => (
					<li key={id} className="flex">
						<Card className="flex flex-1 flex-col gap-3 p-4">
							<div className="flex flex-col">
								<h2 className="text-lg font-semibold">{t(`tiles.${id}`)}</h2>
								<span className="text-muted font-mono text-sm">
									{t("landing.entries", { count: formatNumber(count) })}
								</span>
							</div>
							<p className="text-muted flex-1">{t(`descriptions.${id}`)}</p>
							<Link
								href={href}
								className="bg-primary text-on-primary inline-flex min-h-11 items-center justify-center rounded-md px-4 font-semibold"
							>
								{t("landing.browse", { name: t(`tiles.${id}`) })}
							</Link>
						</Card>
					</li>
				))}
			</ul>
		</>
	);
}

export function ReferenceView() {
	const t = useTranslations("reference");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const requested = searchParams.get("tab");
	const tab = REFERENCE_TABS.find((id) => id === requested) ?? null;
	const Panel = tab ? PANELS[tab] : null;

	const subline = tab
		? t(`summary.${tab}`, {
				count: formatNumber(tabCounts[tab]),
				categories: 14,
			})
		: t("landing.subline", { entries: formatNumber(totalEntries), lists: HUB_TILES.length });

	// A search belongs to one list, so a new tab starts with a clean address.
	const open = (id: ReferenceTab) => router.replace(`${pathname}?tab=${id}`, { scroll: false });

	return (
		<>
			<PageHeader title={t("title")} subline={subline} />
			<div
				role="tablist"
				aria-label={t("tabsLabel")}
				className="grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3"
			>
				{REFERENCE_TABS.map((id) => (
					<button
						key={id}
						type="button"
						role="tab"
						aria-selected={id === tab}
						onClick={() => open(id)}
						className={`flex min-h-11 flex-col rounded-md border-[1.5px] px-3 py-2.5 text-start ${
							id === tab
								? "border-primary bg-surface"
								: "border-line bg-tint/40 hover:bg-tint"
						}`}
					>
						<span className="font-semibold">{t(`tabs.${id}`)}</span>
						<span className="text-muted font-mono text-sm">
							{formatNumber(tabCounts[id])}
						</span>
					</button>
				))}
			</div>
			{Panel ? <Panel key={tab} /> : <Landing />}
		</>
	);
}
