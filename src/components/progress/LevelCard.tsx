"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { ItemCard } from "@/comps/page/ItemCard";
import { Button } from "@/comps/ui/Button";

interface LevelCardProps {
	name: string;
	img: string;
	complete: boolean;
	onToggleAll: () => void;
	intro?: ReactNode;
	children: ReactNode;
}

export function LevelCard({ name, img, complete, onToggleAll, intro, children }: LevelCardProps) {
	const t = useTranslations("progress.common");

	return (
		<ItemCard
			img={img}
			name={name}
			checked={complete}
			highlighted={complete}
			headerAction={
				<Button
					variant={complete ? "secondary" : "soft"}
					onClick={onToggleAll}
					aria-label={`${complete ? t("clearAll") : t("completeAll")}: ${name}`}
				>
					{complete ? t("clearAll") : t("completeAll")}
				</Button>
			}
		>
			{intro}
			<div className="flex flex-col gap-2">{children}</div>
		</ItemCard>
	);
}
