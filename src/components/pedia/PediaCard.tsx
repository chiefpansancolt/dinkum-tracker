"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { CommerceLevel } from "@/types/app";
import type { PediaEntry, PediaStatus } from "@/service/pedia";
import { commercePrice } from "@/service/pedia";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { rarityTone } from "./rarity";
import { StatusControl } from "./StatusControl";

interface PediaCardProps {
	entry: PediaEntry;
	status: PediaStatus;
	commerceLevel: CommerceLevel;
	onStatusChange: (status: PediaStatus) => void;
}

export function PediaCard({ entry, status, commerceLevel, onStatusChange }: PediaCardProps) {
	const t = useTranslations("pedia.card");
	const sell = formatNumber(commercePrice(entry.baseSellPrice, commerceLevel));

	return (
		<ItemCard
			img={entry.img}
			name={entry.name}
			badge={<Badge tone={rarityTone(entry.rarity)}>{entry.rarity}</Badge>}
			mobileValue={sell}
			checked={status !== "missing"}
			highlighted={status === "donated"}
			fields={[
				{ label: t("biome"), value: entry.biome.join(", ") },
				{ label: t("seasons"), value: entry.seasons.join(", ") },
				{ label: t("time"), value: entry.timeFound.join(", ") },
				{ label: t("sell"), value: sell, mono: true, desktopOnly: true },
				...(entry.cookedPrice !== undefined
					? [
							{
								label: t("cooked"),
								mono: true,
								value: t("cookedValue", {
									price: formatNumber(
										commercePrice(entry.cookedPrice, commerceLevel)
									),
									pieces: entry.cookedPieces ?? 1,
								}),
							},
						]
					: []),
			]}
			footer={
				<StatusControl itemName={entry.name} value={status} onChange={onStatusChange} />
			}
		/>
	);
}
