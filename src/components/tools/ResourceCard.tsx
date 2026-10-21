"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { UniqueResource } from "@/types/app";
import { ItemCard } from "@/comps/page/ItemCard";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";

const VISIBLE_USES = 5;

export function ResourceCard({ resource }: { resource: UniqueResource }) {
	const t = useTranslations("tools.breakdown.card");
	const [showAll, setShowAll] = useState(false);
	const uses = showAll ? resource.usedIn : resource.usedIn.slice(0, VISIBLE_USES);
	const hidden = resource.usedIn.length - VISIBLE_USES;

	return (
		<ItemCard
			img={resource.img}
			name={resource.name}
			badge={
				<span className="flex flex-wrap gap-1">
					<Badge tone="success">{t("usedIn", { count: resource.usedIn.length })}</Badge>
					<Badge tone="info">{resource.resourceType}</Badge>
				</span>
			}
		>
			<section className="flex flex-col gap-2">
				<h4 className="font-medium">{t("categories")}</h4>
				<ul className="flex flex-wrap gap-1">
					{resource.categories.map((category) => (
						<li key={category}>
							<Badge tone="common">{category}</Badge>
						</li>
					))}
				</ul>
			</section>
			<section className="flex flex-col gap-2">
				<h4 className="font-medium">{t("usedInList")}</h4>
				<ul className="grid grid-cols-2 gap-2">
					{uses.map((name) => (
						<li key={name} className="bg-track rounded-md px-2.5 py-2 text-sm">
							{name}
						</li>
					))}
				</ul>
				{hidden > 0 && (
					<Button
						variant="outline"
						className="self-start"
						aria-expanded={showAll}
						onClick={() => setShowAll(!showAll)}
					>
						{showAll ? t("showLess") : t("showMore", { count: hidden })}
					</Button>
				)}
			</section>
		</ItemCard>
	);
}
