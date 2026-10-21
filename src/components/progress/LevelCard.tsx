"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { ItemCard } from "@/comps/page/ItemCard";
import { Button } from "@/comps/ui/Button";

interface LevelCardProps {
	name: string;
	img: string;
	/** Every level is obtained. The card gets a green border and a check on its picture. */
	complete: boolean;
	onToggleAll: () => void;
	/** Text above the levels, such as a requirement or a description. */
	intro?: ReactNode;
	/** The `LevelRow`s of the card. */
	children: ReactNode;
}

/** A license or a milestone with its levels and a Complete All or Clear All button. */
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
