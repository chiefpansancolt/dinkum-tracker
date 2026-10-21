"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { FormEvent } from "react";
import { Checkbox } from "@/comps/ui/Checkbox";
import { Note } from "@/comps/ui/Note";
import { PlaythroughNameField } from "./PlaythroughNameField";

interface PlaythroughFormProps {
	formId: string;
	/** Returns whether the playthrough was created. */
	onCreate: (name: string, makeActive: boolean) => boolean;
	onCreated: () => void;
	onBusyChange?: (busy: boolean) => void;
	/** True after a create that the browser could not store, so the button can read Try again. */
	onFailedChange?: (failed: boolean) => void;
}

/** The fields of a new playthrough. The submit button sits outside, so a dialog and a page can place it. */
export function PlaythroughForm({
	formId,
	onCreate,
	onCreated,
	onBusyChange,
	onFailedChange,
}: PlaythroughFormProps) {
	const t = useTranslations("playthroughs.form");
	const [name, setName] = useState("");
	const [makeActive, setMakeActive] = useState(true);
	const [error, setError] = useState<string>();
	const [failed, setFailed] = useState(false);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		const trimmed = name.trim();
		if (trimmed === "") {
			setError(t("errorEmpty"));
			return;
		}

		setError(undefined);
		onBusyChange?.(true);
		const created = onCreate(trimmed, makeActive);
		onBusyChange?.(false);

		setFailed(!created);
		onFailedChange?.(!created);
		if (created) onCreated();
	};

	return (
		<form id={formId} onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
			<PlaythroughNameField
				value={name}
				onChange={(value) => {
					setName(value);
					setError(undefined);
				}}
				error={error}
			/>
			{failed && (
				<div role="alert">
					<Note tone="danger">{t("failed")}</Note>
				</div>
			)}{" "}
			<Checkbox label={t("makeActive")} checked={makeActive} onChange={setMakeActive} />
		</form>
	);
}
