"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useMemo } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import type { SkillEntry } from "@/service/progress";
import { changeSkillLevel, skillEntries, skillStats } from "@/service/progress";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { ItemCard } from "@/comps/page/ItemCard";
import { IconButton } from "@/comps/ui/IconButton";
import { StatTile } from "@/comps/ui/StatTile";
import { useToast } from "@/comps/ui/Toast";

function SkillStepper({
	skill,
	onChange,
}: {
	skill: SkillEntry;
	onChange: (delta: number) => void;
}) {
	const t = useTranslations("ui.stepper");

	return (
		<span className="flex items-center gap-3">
			<IconButton
				label={t("lower", { label: skill.name })}
				disabled={skill.level === 0}
				onClick={() => onChange(-1)}
				className="border-ink text-ink disabled:border-line disabled:text-muted size-11 border-[1.5px]"
			>
				<LuMinus size={18} aria-hidden="true" />
			</IconButton>
			<span className="min-w-10 text-center font-mono text-xl font-medium">
				<span className="sr-only">{t("labelPrefix", { label: skill.name })}</span>
				{skill.level}
			</span>
			<IconButton
				label={t("raise", { label: skill.name })}
				onClick={() => onChange(1)}
				className="border-primary bg-tint text-primary size-11 border-[1.5px]"
			>
				<LuPlus size={18} aria-hidden="true" />
			</IconButton>
		</span>
	);
}

function SkillsContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("progress.skills");
	const undo = useTranslations("common");
	const { update } = usePlaythrough();
	const showToast = useToast();
	const entries = useMemo(() => skillEntries(playthrough.skillLevels), [playthrough]);
	const stats = skillStats(entries);

	const change = (skill: SkillEntry, delta: number) => {
		const saved = update((current) => changeSkillLevel(current, skill.id, delta));
		if (!saved) return;

		showToast({
			key: "skills",
			variant: "success",
			title: t("toast", { name: skill.name, level: skill.level + delta }),
			action: {
				label: undo("undo"),
				onAction: () => update((current) => changeSkillLevel(current, skill.id, -delta)),
			},
		});
	};

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					skills: stats.skillCount,
					levels: formatNumber(stats.totalLevels),
					name: playthrough.name,
				})}
			/>
			<div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
				<StatTile
					label={t("tiles.total")}
					value={formatNumber(stats.totalLevels)}
					caption={t("tiles.across", { count: stats.skillCount })}
					progress={1}
				/>
				<StatTile
					label={t("tiles.highest")}
					value={formatNumber(stats.highest.level)}
					caption={stats.highest.name}
					progress={1}
				/>
				<div className="max-sm:hidden">
					<StatTile
						label={t("tiles.atZero")}
						value={formatNumber(stats.atLevelZero)}
						caption={t("tiles.atZeroOf", { total: stats.skillCount })}
						progress={stats.atLevelZero / stats.skillCount}
					/>
				</div>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(19rem,1fr))] gap-3">
				{entries.map((skill) => (
					<ItemCard
						key={skill.id}
						img={skill.img}
						name={skill.name}
						highlighted={skill.level > 0}
						footer={
							<>
								<p>{skill.description}</p>
								<div className="border-line mt-auto flex items-center justify-between gap-3 border-t pt-3">
									<span className="font-semibold">{t("level")}</span>
									<SkillStepper
										skill={skill}
										onChange={(delta) => change(skill, delta)}
									/>
								</div>
							</>
						}
					/>
				))}
			</div>
			<p className="text-muted">
				{t.rich("note", {
					link: (chunks) => (
						<Link href="/licenses" className="text-link underline">
							{chunks}
						</Link>
					),
				})}
			</p>
		</>
	);
}

export function SkillsView() {
	const t = useTranslations("progress.skills");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <SkillsContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
