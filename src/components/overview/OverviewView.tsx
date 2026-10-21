"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import type { Playthrough } from "@/types/app";
import {
	buildingStats,
	gameInfo,
	gearStats,
	headline,
	licenseStats,
	milestoneStats,
	npcStats,
	pediaStats,
	recipeStats,
	skillRows,
} from "@/service/overview";
import { seasonOf } from "@/service/playthrough";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { useSeasonName } from "@/comps/playthroughs/playthroughText";
import { GearCard, RecipesCard } from "./CollectionCards";
import { HeadlineCard } from "./HeadlineCard";
import { GameInfoCard, NpcCard, SkillsCard } from "./PeopleCards";
import { BuildingsCard, LicensesCard, MilestonesCard, PediaCard } from "./ProgressCards";

function OverviewContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("overview");
	const seasonName = useSeasonName();

	const figures = useMemo(
		() => ({
			headline: headline(playthrough),
			pedia: pediaStats(playthrough),
			licenses: licenseStats(playthrough),
			milestones: milestoneStats(playthrough),
			buildings: buildingStats(playthrough),
			gear: gearStats(playthrough),
			recipes: recipeStats(playthrough),
			npcs: npcStats(playthrough),
			skills: skillRows(playthrough),
			game: gameInfo(playthrough),
		}),
		[playthrough]
	);
	const { overall } = figures.headline;

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					done: formatNumber(overall.count),
					total: formatNumber(overall.total),
					percent: overall.percent,
					name: playthrough.name,
				})}
			/>
			<HeadlineCard headline={figures.headline} />
			<div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-start">
				<div className="flex flex-col gap-4 max-lg:contents">
					<SkillsCard rows={figures.skills} className="max-lg:order-6" />
					<LicensesCard stats={figures.licenses} className="max-lg:order-4" />
					<MilestonesCard stats={figures.milestones} className="max-lg:order-5" />
					<RecipesCard stats={figures.recipes} className="max-lg:order-7" />
				</div>
				<div className="flex flex-col gap-4 max-lg:contents">
					<PediaCard stats={figures.pedia} className="max-lg:order-1" />
					<BuildingsCard stats={figures.buildings} className="max-lg:order-3" />
				</div>
				<div className="flex flex-col gap-4 max-lg:contents">
					<GearCard stats={figures.gear} className="max-lg:order-8" />
					<NpcCard stats={figures.npcs} className="max-lg:order-2" />
					<GameInfoCard
						info={figures.game}
						season={seasonName(seasonOf(playthrough))}
						className="max-lg:order-9"
					/>
				</div>
			</div>
		</>
	);
}

export function OverviewView() {
	const t = useTranslations("overview");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <OverviewContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
