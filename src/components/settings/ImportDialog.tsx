"use client";

import { formatShortDate } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuDownload } from "react-icons/lu";
import type { Playthrough } from "@/types/app";
import type { ImportMode } from "@/service/backup";
import { downloadBackup, planImport } from "@/service/backup";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { RadioGroup } from "@/comps/ui/RadioGroup";

export interface PendingImport {
	fileName: string;
	playthroughs: Playthrough[];
	/** The playthroughs on the device when the file was chosen, for the preview. */
	devicePlaythroughs: Playthrough[];
}

interface ImportDialogProps {
	pending: PendingImport | null;
	onConfirm: (mode: ImportMode) => void;
	onClose: () => void;
}

function ImportBody({
	pending,
	mode,
	onModeChange,
}: {
	pending: PendingImport;
	mode: ImportMode;
	onModeChange: (mode: ImportMode) => void;
}) {
	const t = useTranslations("settings.import");
	const { devicePlaythroughs } = pending;
	const rows = planImport(devicePlaythroughs, pending.playthroughs, mode);
	const updatedOn = (iso: string | undefined, missing: string) =>
		iso ? t("updatedOn", { date: formatShortDate(iso) }) : missing;

	return (
		<>
			<p className="bg-bg flex flex-wrap justify-between gap-x-4 rounded-md px-3 py-2">
				<span className="font-mono text-xs">{pending.fileName}</span>
				<span className="text-muted">
					{t("fileSummary", {
						inFile: pending.playthroughs.length,
						onDevice: devicePlaythroughs.length,
					})}
				</span>
			</p>
			<RadioGroup
				label={t("mode")}
				value={mode}
				onChange={onModeChange}
				options={[
					{ id: "merge", label: t("merge"), description: t("mergeDescription") },
					{
						id: "replace",
						label: t("replace"),
						danger: true,
						description: t("replaceDescription", {
							onDevice: devicePlaythroughs.length,
							inFile: pending.playthroughs.length,
						}),
					},
				]}
			/>
			<div className="border-line overflow-x-auto rounded-md border-[1.5px]">
				<table className="w-full text-start">
					<thead className="bg-bg text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
						<tr>
							<th scope="col" className="px-3 py-2 text-start font-normal">
								{t("table.playthrough")}
							</th>
							<th scope="col" className="px-3 py-2 text-start font-normal">
								{t("table.inFile")}
							</th>
							<th scope="col" className="px-3 py-2 text-start font-normal">
								{t("table.onDevice")}
							</th>
							<th scope="col" className="px-3 py-2 text-start font-normal">
								{t("table.result")}
							</th>
						</tr>
					</thead>
					<tbody>
						{rows.map((row) => (
							<tr key={row.id} className="border-line border-t">
								<th scope="row" className="px-3 py-2 text-start font-semibold">
									{row.name}
								</th>
								<td className="px-3 py-2">
									{updatedOn(row.fileUpdated, t("notInFile"))}
								</td>
								<td className="px-3 py-2">
									{updatedOn(row.deviceUpdated, t("notOnDevice"))}
								</td>
								<td className="px-3 py-2 font-semibold">
									{t(`results.${row.result}`)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button variant="link" onClick={downloadBackup} className="self-start">
				<LuDownload size={16} aria-hidden="true" />
				{t("exportFirst")}
			</Button>
		</>
	);
}

export function ImportDialog({ pending, onConfirm, onClose }: ImportDialogProps) {
	const t = useTranslations("settings.import");
	const [mode, setMode] = useState<ImportMode>("merge");

	return (
		<Dialog
			open={pending !== null}
			onClose={onClose}
			variant="wide"
			title={t("title")}
			description={t("description")}
			footer={
				<>
					<Button onClick={onClose}>{t("cancel")}</Button>
					{mode === "merge" ? (
						<Button variant="primary" onClick={() => onConfirm(mode)}>
							{t("confirmMerge", { count: pending?.playthroughs.length ?? 0 })}
						</Button>
					) : (
						<Button variant="destructive" onClick={() => onConfirm(mode)}>
							{t("confirmReplace")}
						</Button>
					)}
				</>
			}
		>
			{pending && <ImportBody pending={pending} mode={mode} onModeChange={setMode} />}
		</Dialog>
	);
}
