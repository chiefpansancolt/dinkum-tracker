"use client";

import { formatDateTime, formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useSync } from "@/lib/contexts/SyncContext";
import type { ActivityEntry } from "@/lib/sync/device";
import { Card } from "@/comps/ui/Card";

function ActivityText({ entry }: { entry: ActivityEntry }) {
	const t = useTranslations("sync");
	if (entry.kind === "connected") {
		return t("activity.connected", { provider: t(`provider.${entry.provider}.name`) });
	}
	if (entry.kind === "conflicts") {
		const count = entry.count ?? 0;
		return t("activity.conflicts", { count, amount: formatNumber(count) });
	}
	return t(`activity.${entry.kind}`);
}

export function ActivityCard() {
	const t = useTranslations("sync.activity");
	const { activity } = useSync();

	return (
		<Card className="flex flex-col gap-3 p-4">
			<h2 className="text-base font-semibold">{t("title")}</h2>
			{activity.length === 0 ? (
				<p className="text-muted">{t("empty")}</p>
			) : (
				<ul className="flex flex-col">
					{activity.map((entry) => (
						<li
							key={`${entry.at}-${entry.kind}`}
							className="border-line grid grid-cols-[8.5rem_1fr] gap-3 border-t py-2.5 first:border-t-0"
						>
							<span className="text-muted font-mono text-xs">
								{formatDateTime(entry.at)}
							</span>
							<span>
								<ActivityText entry={entry} />
							</span>
						</li>
					))}
				</ul>
			)}
		</Card>
	);
}
