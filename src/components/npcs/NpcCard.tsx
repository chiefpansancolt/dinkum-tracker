"use client";

import type { NPC } from "dinkum-data";
import { useTranslations } from "next-intl";
import { MAX_HEARTS, occupationLines } from "@/service/npcs";
import type { ItemCardField } from "@/comps/page/ItemCard";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { HeartMeter } from "./HeartMeter";

interface NpcCardProps {
	npc: NPC;
	hearts: number;
	onChange: (hearts: number) => void;
}

const lines = (text: string) => <span className="whitespace-pre-line">{text}</span>;

export function NpcCard({ npc, hearts, onChange }: NpcCardProps) {
	const t = useTranslations("people.npcs.card");
	const { likes, likesImg, dislikes, dislikesImg } = npc.foodPreferences;
	const none = <span className="text-muted">{t("none")}</span>;

	const fields: ItemCardField[] = [
		{ label: t("visit"), value: lines(npc.requirements.visit), stacked: true },
		{ label: t("moveIn"), value: lines(npc.requirements.moveIn), stacked: true },
		{
			label: t("likes"),
			value: likes === "None" ? none : lines(likes),
			icon: likes === "None" ? undefined : likesImg,
			stacked: true,
		},
		{
			label: t("dislikes"),
			value: dislikes === "None" ? none : lines(dislikes),
			icon: dislikes === "None" ? undefined : dislikesImg,
			stacked: true,
		},
	];
	const full = hearts === MAX_HEARTS;

	return (
		<ItemCard
			img={npc.img}
			name={npc.name}
			badge={full ? <Badge tone="success">{t("full")}</Badge> : undefined}
			description={occupationLines(npc).join(" · ")}
			highlighted={full}
			fields={fields}
			footer={<HeartMeter name={npc.name} hearts={hearts} onChange={onChange} />}
		/>
	);
}
