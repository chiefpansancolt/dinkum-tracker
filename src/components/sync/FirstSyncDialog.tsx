"use client";

import { formatNumber } from "@/i18n/formatter";
import type { FirstSyncChoice } from "@gamerdexapp/gamerdex-sync";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { type PendingChoice, useSync } from "@/lib/contexts/SyncContext";
import type { SyncDocument } from "@/lib/sync/document";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";

const options = [
	{ id: "merge", choice: "merge" },
	{ id: "keepLocal", choice: "keep-local" },
	{ id: "keepCloud", choice: "keep-cloud" },
] as const;

function Summary({ title, data }: { title: string; data: SyncDocument }) {
	const t = useTranslations("sync");
	const count = data.playthroughs.length;

	return (
		<div className="border-line bg-surface flex flex-col gap-1 rounded-md border-[1.5px] p-3">
			<span className="font-semibold">{title}</span>
			<span className="text-muted">
				{t("playthroughCount", { count, amount: formatNumber(count) })}
			</span>
			<span className="font-mono text-xs break-words">
				{data.playthroughs.map((playthrough) => playthrough.name).join(", ")}
			</span>
		</div>
	);
}

interface FirstSyncDialogProps {
	open: boolean;
	choice: PendingChoice;
	onLater: () => void;
}

export function FirstSyncDialog({ open, choice, onLater }: FirstSyncDialogProps) {
	const t = useTranslations("sync");
	const { syncNow, status } = useSync();
	const [picked, setPicked] = useState<FirstSyncChoice>("merge");
	const working = status === "syncing";

	return (
		<Dialog
			open={open}
			onClose={onLater}
			title={t("choice.title")}
			description={t("choice.body")}
			variant="wide"
			footer={
				<>
					<Button variant="secondary" disabled={working} onClick={onLater}>
						{t("first.later")}
					</Button>
					<Button
						variant="primary"
						loading={working}
						onClick={() => void syncNow(picked)}
					>
						{working ? t("status.syncing") : t("first.apply")}
					</Button>
				</>
			}
		>
			<div className="grid gap-3 sm:grid-cols-2">
				<Summary title={t("first.thisDevice")} data={choice.local} />
				<Summary title={t("first.cloud")} data={choice.remote} />
			</div>
			<fieldset disabled={working} className="mt-4 flex flex-col gap-2">
				<legend className="sr-only">{t("first.optionsLabel")}</legend>
				{options.map((option) => (
					<label
						key={option.id}
						className={`flex items-start gap-3 rounded-md border-[1.5px] p-3 ${
							working ? "cursor-not-allowed opacity-50" : "cursor-pointer"
						} ${
							picked === option.choice
								? "border-primary bg-tint"
								: "border-line bg-surface"
						}`}
					>
						<input
							type="radio"
							name="first-sync-choice"
							checked={picked === option.choice}
							onChange={() => setPicked(option.choice)}
							className="accent-primary mt-1 size-4"
						/>
						<span className="flex flex-col gap-0.5">
							<span className="font-semibold">
								{t(`choice.${option.id}`)}
								{option.id === "merge" && (
									<span className="text-link ms-2 text-xs">
										{t("first.recommended")}
									</span>
								)}
							</span>
							<span className="text-muted">{t(`choice.${option.id}Hint`)}</span>
						</span>
					</label>
				))}
			</fieldset>
		</Dialog>
	);
}
