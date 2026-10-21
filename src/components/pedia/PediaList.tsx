"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { CommerceLevel } from "@/types/app";
import type { PediaEntry, PediaStatus } from "@/service/pedia";
import { commercePrice } from "@/service/pedia";
import { Badge } from "@/comps/ui/Badge";
import { ItemIcon } from "@/comps/ui/ItemIcon";
import { rarityTone } from "./rarity";
import { StatusControl } from "./StatusControl";

interface PediaListProps {
	entries: PediaEntry[];
	statusOf: (entry: PediaEntry) => PediaStatus;
	commerceLevel: CommerceLevel;
	onStatusChange: (entry: PediaEntry, status: PediaStatus) => void;
	showCooked: boolean;
	shown: number;
	total: number;
}

const HEADER_CELL =
	"px-3 py-2 text-start font-mono text-[11px] font-normal tracking-[0.08em] uppercase";

/**
 * The dense view. A wide screen gets a table. A phone gets compact rows, because six columns do not
 * fit beside a three way control.
 */
export function PediaList({
	entries,
	statusOf,
	commerceLevel,
	onStatusChange,
	showCooked,
	shown,
	total,
}: PediaListProps) {
	const t = useTranslations("pedia");
	const sell = (entry: PediaEntry) =>
		formatNumber(commercePrice(entry.baseSellPrice, commerceLevel));
	const cooked = (entry: PediaEntry) =>
		entry.cookedPrice === undefined
			? ""
			: t("card.cookedValue", {
					price: formatNumber(commercePrice(entry.cookedPrice, commerceLevel)),
					pieces: entry.cookedPieces ?? 1,
				});

	return (
		<>
			<div className="border-line bg-surface hidden overflow-x-auto rounded-md border-[1.5px] lg:block">
				<table className="w-full">
					<thead className="text-muted">
						<tr>
							<th scope="col" className={HEADER_CELL} colSpan={2}>
								{t("table.name")}
							</th>
							<th scope="col" className={HEADER_CELL}>
								{t("table.rarity")}
							</th>
							<th scope="col" className={HEADER_CELL}>
								{t("table.biome")}
							</th>
							<th scope="col" className={HEADER_CELL}>
								{t("table.seasons")}
							</th>
							<th scope="col" className={HEADER_CELL}>
								{t("table.time")}
							</th>
							<th scope="col" className={`${HEADER_CELL} text-end`}>
								{t("table.sell")}
							</th>
							{showCooked && (
								<th scope="col" className={HEADER_CELL}>
									{t("table.cooked")}
								</th>
							)}
							<th scope="col" className={HEADER_CELL}>
								{t("table.status")}
							</th>
						</tr>
					</thead>
					<tbody>
						{entries.map((entry) => {
							const status = statusOf(entry);
							return (
								<tr
									key={entry.id}
									className={`border-line border-t ${status === "donated" ? "bg-tint" : ""}`}
								>
									<td className="w-12 py-2 ps-3">
										<span className="bg-track flex size-9 items-center justify-center rounded-md">
											<ItemIcon src={entry.img} size={28} />
										</span>
									</td>
									<th scope="row" className="px-3 py-2 text-start font-semibold">
										{entry.name}
									</th>
									<td className="px-3 py-2">
										<Badge tone={rarityTone(entry.rarity)}>
											{entry.rarity}
										</Badge>
									</td>
									<td className="px-3 py-2">{entry.biome.join(", ")}</td>
									<td className="px-3 py-2">{entry.seasons.join(", ")}</td>
									<td className="px-3 py-2">{entry.timeFound.join(", ")}</td>
									<td className="px-3 py-2 text-end font-mono">{sell(entry)}</td>
									{showCooked && (
										<td className="px-3 py-2 font-mono text-xs">
											{cooked(entry)}
										</td>
									)}
									<td className="min-w-64 px-3 py-2">
										<StatusControl
											itemName={entry.name}
											value={status}
											onChange={(next) => onStatusChange(entry, next)}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				<p className="text-muted border-line border-t px-3 py-2 text-sm">
					{t("table.caption", { shown, total })}
				</p>
			</div>

			<ul className="flex flex-col gap-2 lg:hidden">
				{entries.map((entry) => {
					const status = statusOf(entry);
					return (
						<li
							key={entry.id}
							className={`border-line flex flex-col gap-2 rounded-md border-[1.5px] p-3 ${
								status === "donated" ? "bg-tint" : "bg-surface"
							}`}
						>
							<div className="flex items-center gap-3">
								<span className="bg-track flex size-9 shrink-0 items-center justify-center rounded-md">
									<ItemIcon src={entry.img} size={28} />
								</span>
								<span className="flex min-w-0 flex-1 flex-col items-start gap-1">
									<span className="font-semibold">{entry.name}</span>
									<Badge tone={rarityTone(entry.rarity)}>{entry.rarity}</Badge>
								</span>
								<span className="font-mono">{sell(entry)}</span>
							</div>
							<StatusControl
								itemName={entry.name}
								value={status}
								onChange={(next) => onStatusChange(entry, next)}
							/>
						</li>
					);
				})}
			</ul>
		</>
	);
}
