"use client";

import { useTranslations } from "next-intl";
import type { Playthrough } from "@/types/app";
import { downloadBackup } from "@/service/backup";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { CompletionBadge } from "./CompletionBadge";
import { useAgeText, useGameDate } from "./playthroughText";

interface DeletePlaythroughDialogProps {
	/** The playthrough to delete. The dialog is closed while this is null. */
	playthrough: Playthrough | null;
	percent: number;
	isActive: boolean;
	/** The playthrough that becomes active after the delete, when the active one is deleted. */
	nextActiveName: string | null;
	onConfirm: (playthrough: Playthrough) => void;
	onClose: () => void;
}

export function DeletePlaythroughDialog({
	playthrough,
	percent,
	isActive,
	nextActiveName,
	onConfirm,
	onClose,
}: DeletePlaythroughDialogProps) {
	const t = useTranslations("playthroughs.delete");
	const ageText = useAgeText();
	const gameDate = useGameDate();

	return (
		<Dialog
			open={playthrough !== null}
			onClose={onClose}
			hideClose
			icon={
				<span
					aria-hidden="true"
					className="border-danger text-danger flex size-11 shrink-0 items-center justify-center rounded-md border-[1.5px] text-lg font-semibold"
				>
					!
				</span>
			}
			title={t("title", { name: playthrough?.name ?? "" })}
			description={t("description")}
			footer={
				<div className="flex w-full gap-2 max-sm:flex-col-reverse sm:justify-end">
					<Button className="max-sm:w-full" onClick={onClose}>
						{t("cancel")}
					</Button>
					<Button
						variant="destructive"
						className="max-sm:w-full"
						onClick={() => {
							if (playthrough) onConfirm(playthrough);
							onClose();
						}}
					>
						{t("confirm")}
					</Button>
				</div>
			}
		>
			{playthrough && (
				<>
					<div className="bg-bg flex flex-col gap-2 rounded-md p-3">
						<div className="flex items-start justify-between gap-3">
							<div className="flex min-w-0 flex-col">
								<span className="truncate font-semibold">{playthrough.name}</span>
								<span className="text-muted text-xs">
									{t("updated", {
										when: ageText(playthrough.lastUpdated),
										date: gameDate(playthrough),
									})}
								</span>
							</div>
							<CompletionBadge percent={percent} plain />
						</div>
						{isActive && (
							<p className="text-muted">
								{nextActiveName
									? t("activeNext", { next: nextActiveName })
									: t("activeLast")}
							</p>
						)}
					</div>
					<button
						type="button"
						onClick={downloadBackup}
						className="text-link min-h-11 self-start underline lg:min-h-9"
					>
						{t("exportFirst")}
					</button>
				</>
			)}
		</Dialog>
	);
}
