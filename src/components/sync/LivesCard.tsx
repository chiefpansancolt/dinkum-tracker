"use client";

import { formatNumber } from "@/i18n/formatter";
import { DATA_FILE, META_FILE } from "@gamerdexapp/gamerdex-sync";
import { useTranslations } from "next-intl";
import { useSync } from "@/lib/contexts/SyncContext";
import { SYNC_APP_ID } from "@/lib/sync/device";
import { dataFolderOf, usesRepository } from "@/lib/sync/providers";
import { Card } from "@/comps/ui/Card";

function Row({ label, value, mono = true }: { label: string; value: string; mono?: boolean }) {
	return (
		<>
			<dt className="text-muted">{label}</dt>
			<dd className={`text-end break-all ${mono ? "font-mono text-xs" : ""}`}>{value}</dd>
		</>
	);
}

export function LivesCard() {
	const t = useTranslations("sync");
	const { provider, repository, cloudCopy } = useSync();
	if (!provider) return null;

	const kilobytes = cloudCopy
		? Math.max(1, Math.round(JSON.stringify(cloudCopy, null, 2).length / 1024))
		: null;

	return (
		<Card className="flex flex-col gap-3 p-4">
			<h2 className="text-base font-semibold">{t("lives.title")}</h2>
			<dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2">
				<Row
					label={t("lives.storage")}
					value={t(`provider.${provider}.name`)}
					mono={false}
				/>
				{usesRepository(provider) && repository && (
					<Row label={t("connected.repository")} value={repository} />
				)}
				<Row label={t("lives.folder")} value={dataFolderOf(provider, SYNC_APP_ID)} />
				<Row label={t("lives.dataFile")} value={DATA_FILE} />
				{kilobytes !== null && (
					<Row
						label={t("lives.size")}
						value={t("lives.kb", { amount: formatNumber(kilobytes) })}
						mono={false}
					/>
				)}
				<Row label={t("lives.metaFile")} value={META_FILE} />
			</dl>
			<p className="text-muted">{t("lives.note")}</p>
			<p className="text-muted">{t(`lives.${provider}Note`)}</p>
		</Card>
	);
}
