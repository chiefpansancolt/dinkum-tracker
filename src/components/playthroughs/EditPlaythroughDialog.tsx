"use client";

import { formatShortDate } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { FormEvent } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { useToast } from "@/comps/ui/Toast";
import { PlaythroughNameField } from "./PlaythroughNameField";

interface EditPlaythroughDialogProps {
	playthrough: Playthrough | null;
	onClose: () => void;
}

function EditPlaythroughForm({
	playthrough,
	onClose,
}: {
	playthrough: Playthrough;
	onClose: () => void;
}) {
	const t = useTranslations("playthroughs");
	const { updateById } = usePlaythrough();
	const showToast = useToast();
	const [name, setName] = useState(playthrough.name);
	const trimmed = name.trim();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		if (trimmed === "") return;

		const previous = updateById(playthrough.id, (current) => ({ ...current, name: trimmed }));
		if (previous) {
			showToast({
				variant: "success",
				title: t("edit.savedToast"),
				message: t("edit.renamed", { name: trimmed }),
			});
		}
		onClose();
	};

	return (
		<form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			<PlaythroughNameField
				label={t("edit.nameLabel")}
				help={t("edit.help")}
				value={name}
				onChange={setName}
			/>
			<div className="flex justify-end gap-2">
				<Button onClick={onClose}>{t("form.cancel")}</Button>
				<Button type="submit" variant="primary" disabled={trimmed === ""}>
					{t("edit.save")}
				</Button>
			</div>
		</form>
	);
}

export function EditPlaythroughDialog({ playthrough, onClose }: EditPlaythroughDialogProps) {
	const t = useTranslations("playthroughs");

	return (
		<Dialog
			open={playthrough !== null}
			onClose={onClose}
			title={t("edit.title")}
			description={
				playthrough
					? t("edit.description", {
							name: playthrough.name,
							date: playthrough.createdAt
								? formatShortDate(playthrough.createdAt)
								: t("relative.unknown"),
						})
					: undefined
			}
		>
			{playthrough && <EditPlaythroughForm playthrough={playthrough} onClose={onClose} />}
		</Dialog>
	);
}
