"use client";

import { useTranslations } from "next-intl";
import { Field } from "@/comps/ui/Field";
import { Input } from "@/comps/ui/Input";

const PLAYTHROUGH_NAME_MAX = 40;

interface PlaythroughNameFieldProps {
	label?: string;
	help?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
}

export function PlaythroughNameField({
	label,
	help,
	value,
	onChange,
	error,
}: PlaythroughNameFieldProps) {
	const t = useTranslations("playthroughs.form");

	return (
		<Field
			label={label ?? t("nameLabel")}
			error={error}
			labelAction={
				<span className="text-muted ms-auto font-mono text-xs uppercase">
					{t("required")}
				</span>
			}
			hint={
				<span className="flex justify-between gap-3">
					<span>{help ?? t("help")}</span>
					<span className="font-mono">
						{t("counter", { count: value.length, max: PLAYTHROUGH_NAME_MAX })}
					</span>
				</span>
			}
		>
			<Input
				data-autofocus
				value={value}
				maxLength={PLAYTHROUGH_NAME_MAX}
				placeholder={t("placeholder")}
				onChange={(event) => onChange(event.target.value)}
			/>
		</Field>
	);
}
