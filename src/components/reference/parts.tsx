"use client";

import { formatNumber } from "@/i18n/formatter";
import { formatDecimal } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { CommerceLevel } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useTerms } from "@/lib/hooks/useTerms";
import { commercePrice } from "@/service/pedia";
import { buffPairs } from "@/service/reference";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import type { BadgeTone } from "@/comps/ui/Badge";
import { Badge } from "@/comps/ui/Badge";
import { Card } from "@/comps/ui/Card";
import { StatTile } from "@/comps/ui/StatTile";

export const SEASON_TONE: Record<string, BadgeTone> = {
	Spring: "success",
	Summer: "warn",
	Autumn: "danger",
	Winter: "info",
	All: "common",
};

export function Chips({ items, tone = "common" }: { items: string[]; tone?: BadgeTone }) {
	return (
		<span className="flex flex-wrap justify-end gap-1">
			{items.map((item, index) => (
				<Badge key={`${item}-${index}`} tone={tone} wrap>
					{item}
				</Badge>
			))}
		</span>
	);
}

const SHOWN_BUFFS = 3;

export function BuffChips({ buffs }: { buffs: object | undefined }) {
	const t = useTranslations("reference.card");
	const terms = useTerms();
	const chips = buffPairs(buffs).map(([key, value]) =>
		typeof value === "number"
			? `${terms.buff(key)} ${formatDecimal(value, 2)}`
			: terms.buff(key)
	);
	const more = chips.length - SHOWN_BUFFS;

	return (
		<Chips
			items={
				more > 0 ? [...chips.slice(0, SHOWN_BUFFS), t("moreBuffs", { count: more })] : chips
			}
		/>
	);
}

export const useDinks = () => {
	const t = useTranslations("reference.card");
	const { prefs } = usePlaythrough();
	const level: CommerceLevel = prefs.commerceLevel;

	return {
		level,
		dinks: (amount: number) => t("dinks", { amount: formatNumber(amount) }),
		sellDinks: (amount: number) =>
			t("dinks", { amount: formatNumber(commercePrice(amount, level)) }),
	};
};

interface StatSpec {
	label: string;
	value: number;
	total: number;
	caption?: string;
}

export function StatRow({
	stats,
	commerce = true,
}: {
	stats: StatSpec[];
	commerce?: ReactNode | boolean;
}) {
	const t = useTranslations("reference.stats");

	return (
		<div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
			{stats.map((stat) => (
				<StatTile
					key={stat.label}
					label={stat.label}
					value={formatNumber(stat.value)}
					caption={stat.caption ?? t("of", { total: formatNumber(stat.total) })}
					progress={stat.total > 0 ? stat.value / stat.total : 0}
				/>
			))}
			{commerce && (
				<Card className="col-span-2 p-3 lg:col-span-1 lg:col-start-4">
					<CommerceLevelControl />
				</Card>
			)}
		</div>
	);
}
