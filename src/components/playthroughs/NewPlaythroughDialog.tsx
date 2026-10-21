"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { PlaythroughForm } from "./PlaythroughForm";
import { useCreatePlaythrough } from "./useCreatePlaythrough";

interface NewPlaythroughDialogProps {
	open: boolean;
	onClose: () => void;
}

export function NewPlaythroughDialog({ open, onClose }: NewPlaythroughDialogProps) {
	const t = useTranslations("playthroughs.form");
	const formId = useId();
	const create = useCreatePlaythrough();
	const [busy, setBusy] = useState(false);
	const [failed, setFailed] = useState(false);

	return (
		<Dialog
			open={open}
			onClose={onClose}
			title={t("title")}
			footer={
				<>
					<Button className="max-sm:flex-1" onClick={onClose}>
						{t("cancel")}
					</Button>
					<Button
						type="submit"
						form={formId}
						variant="primary"
						loading={busy}
						className="max-sm:flex-[2]"
					>
						{busy ? t("creating") : failed ? t("tryAgain") : t("create")}
					</Button>
				</>
			}
		>
			<PlaythroughForm
				formId={formId}
				onCreate={create}
				onCreated={onClose}
				onBusyChange={setBusy}
				onFailedChange={setFailed}
			/>
		</Dialog>
	);
}
