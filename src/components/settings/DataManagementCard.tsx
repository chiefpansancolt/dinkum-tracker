"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useTransientValue } from "@/lib/hooks/useTransientValue";
import type { ImportMode } from "@/service/backup";
import { applyImport, downloadBackup, parseBackup } from "@/service/backup";
import {
	clearAllPlaythroughs,
	readStoredPlaythroughs,
	replaceAllPlaythroughs,
} from "@/service/store";
import { Button } from "@/comps/ui/Button";
import { Input } from "@/comps/ui/Input";
import { Note } from "@/comps/ui/Note";
import { ImportDialog } from "./ImportDialog";
import type { PendingImport } from "./ImportDialog";
import { SettingsCard } from "./SettingsCard";

function StatusText({ tone, children }: { tone: "success" | "danger"; children: string }) {
	return (
		<span
			role="status"
			className={`text-sm font-medium ${tone === "success" ? "text-success" : "text-danger"}`}
		>
			{children}
		</span>
	);
}

export function DataManagementCard() {
	const t = useTranslations("settings.data");
	const { playthroughs, commit } = usePlaythrough();
	const fileInput = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [pending, setPending] = useState<PendingImport | null>(null);
	const [confirmingReset, setConfirmingReset] = useState(false);
	const [exportMessage, showExportMessage] = useTransientValue<true>();
	const [importMessage, showImportMessage] = useTransientValue<"done" | "failed">();
	const [resetMessage, showResetMessage] = useTransientValue<true>();

	const handleExport = () => {
		downloadBackup();
		showExportMessage(true);
	};

	const handleChooseImport = async () => {
		if (!file) return;

		const imported = parseBackup(await file.text());
		if (imported === null) {
			showImportMessage("failed");
			return;
		}
		setPending({
			fileName: file.name,
			playthroughs: imported,
			devicePlaythroughs: readStoredPlaythroughs(),
		});
	};

	const handleConfirmImport = (mode: ImportMode) => {
		if (!pending) return;

		const next = applyImport(readStoredPlaythroughs(), pending.playthroughs, mode);
		if (commit(() => replaceAllPlaythroughs(next))) {
			showImportMessage("done");
			setFile(null);
			if (fileInput.current) fileInput.current.value = "";
		}
		setPending(null);
	};

	const handleReset = () => {
		if (!confirmingReset) {
			setConfirmingReset(true);
			return;
		}

		if (commit(clearAllPlaythroughs)) showResetMessage(true);
		setConfirmingReset(false);
	};

	return (
		<SettingsCard
			title={t("title")}
			description={t("description")}
			aside={
				<span className="bg-tint rounded-full px-3 py-0.5 font-mono text-xs">
					{t("count", { count: playthroughs.length })}
				</span>
			}
		>
			<section className="flex flex-col gap-2">
				<div className="flex items-center justify-between gap-3">
					<h3 className="font-medium">{t("exportTitle")}</h3>
					{exportMessage && <StatusText tone="success">{t("exportDone")}</StatusText>}
				</div>
				<p className="text-muted">{t("exportHint")}</p>
				<div>
					<Button variant="primary" onClick={handleExport}>
						{t("exportButton")}
					</Button>
				</div>
			</section>

			<section className="border-line flex flex-col gap-2 border-t-[1.5px] pt-3">
				<div className="flex items-center justify-between gap-3">
					<h3 className="font-medium">
						<label htmlFor="import-file">{t("importTitle")}</label>
					</h3>
					{importMessage === "done" && (
						<StatusText tone="success">{t("importDone")}</StatusText>
					)}
					{importMessage === "failed" && (
						<StatusText tone="danger">{t("importFailed")}</StatusText>
					)}
				</div>
				<p className="text-muted">{t("importHint")}</p>
				<Input
					id="import-file"
					aria-label={t("importFile")}
					ref={fileInput}
					type="file"
					accept=".json"
					className="file:bg-tint file:me-3 file:rounded file:border-0 file:px-3 file:py-1.5"
					onChange={(event) => setFile(event.target.files?.[0] ?? null)}
				/>
				<div>
					<Button disabled={!file} onClick={handleChooseImport}>
						{t("importButton")}
					</Button>
				</div>
			</section>

			<section className="border-line flex flex-col gap-2 border-t-[1.5px] pt-3">
				<div className="flex items-center justify-between gap-3">
					<h3 className="text-danger font-medium">{t("resetTitle")}</h3>
					{resetMessage && <StatusText tone="success">{t("resetDone")}</StatusText>}
				</div>
				<Note tone="warning">{t("resetWarning")}</Note>
				<div className="flex flex-wrap gap-2">
					{confirmingReset ? (
						<>
							<Button onClick={() => setConfirmingReset(false)}>
								{t("resetCancel")}
							</Button>
							<Button variant="destructive" onClick={handleReset}>
								{t("resetConfirm")}
							</Button>
						</>
					) : (
						<Button variant="danger" onClick={handleReset}>
							{t("resetButton")}
						</Button>
					)}
				</div>
			</section>

			<ImportDialog
				pending={pending}
				onConfirm={handleConfirmImport}
				onClose={() => setPending(null)}
			/>
		</SettingsCard>
	);
}
