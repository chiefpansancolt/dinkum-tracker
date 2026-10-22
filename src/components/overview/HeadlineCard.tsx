"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { Headline, HeadlineGroup } from "@/service/overview";
import { Card } from "@/comps/ui/Card";
import { ProgressBar } from "@/comps/ui/ProgressBar";
import { SectionLabel } from "@/comps/ui/SectionLabel";

const GROUPS: HeadlineGroup[] = ["track", "progress", "collect"];

export function HeadlineCard({ headline }: { headline: Headline }) {
	const t = useTranslations("overview.headline");
	const { overall, groups, totals } = headline;

	return (
		<Card className="grid gap-5 p-5 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-8">
			<div className="flex flex-col justify-center gap-3">
				<SectionLabel className="text-muted">{t("label")}</SectionLabel>
				<div className="flex flex-wrap items-baseline gap-x-3">
					<span className="text-6xl leading-none font-bold">{overall.percent}%</span>
					<span className="text-muted">
						{t("ofItems", {
							done: formatNumber(overall.count),
							total: formatNumber(overall.total),
						})}
					</span>
				</div>
				<ProgressBar thick value={overall.percent / 100} label={t("label")} />
			</div>
			<div className="flex flex-col gap-3">
				<div className="grid gap-3 sm:grid-cols-3">
					{GROUPS.map((group) => (
						<div
							key={group}
							className="border-line flex flex-col gap-1.5 rounded-md border-[1.5px] p-3"
						>
							<SectionLabel className="text-muted">
								{t(`groups.${group}`)}
							</SectionLabel>
							<span className="flex items-baseline gap-2">
								<span className="text-2xl font-bold">{groups[group].percent}%</span>
								<span className="text-muted text-sm whitespace-nowrap">
									{t("groupOf", {
										done: formatNumber(groups[group].count),
										total: formatNumber(groups[group].total),
									})}
								</span>
							</span>
							<ProgressBar
								value={groups[group].percent / 100}
								label={t(`groups.${group}`)}
							/>
						</div>
					))}
				</div>
				<p className="text-muted text-sm">
					{t("note", {
						total: formatNumber(overall.total),
						pedia: formatNumber(totals.pedia),
						npcs: formatNumber(totals.npcs),
						milestones: formatNumber(totals.milestones),
						licenses: formatNumber(totals.licenses),
						skills: formatNumber(totals.skills),
						buildings: formatNumber(totals.buildings),
						gear: formatNumber(totals.gear),
						wardrobe: formatNumber(totals.wardrobe),
						recipes: formatNumber(totals.recipes),
					})}
				</p>
			</div>
		</Card>
	);
}
