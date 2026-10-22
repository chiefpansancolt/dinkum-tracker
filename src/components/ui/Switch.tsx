"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import type { ReactNode } from "react";

interface SwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
	labelledBy?: string;
	describedBy?: string;
	label?: string;
}

export function Switch({
	checked,
	onChange,
	disabled = false,
	labelledBy,
	describedBy,
	label,
}: SwitchProps) {
	const t = useTranslations("ui.switch");
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			aria-label={label}
			aria-labelledby={labelledBy}
			aria-describedby={describedBy}
			disabled={disabled}
			onClick={() => onChange(!checked)}
			className={`relative z-1 h-7 w-12 shrink-0 rounded-full border-[1.5px] transition-colors before:absolute before:-inset-2.5 before:content-[''] disabled:opacity-50 lg:before:inset-x-0 lg:before:-inset-y-1.5 ${
				checked ? "border-primary bg-primary" : "border-line bg-track"
			}`}
		>
			<span
				aria-hidden="true"
				className={`absolute top-0.5 size-5 rounded-full transition-all ${
					checked ? "bg-on-primary inset-s-5.5" : "bg-muted inset-s-0.5"
				}`}
			/>
			<span className="sr-only">{checked ? t("on") : t("off")}</span>
		</button>
	);
}

interface SwitchRowProps {
	label: string;
	description?: ReactNode;
	checked: boolean;
	onChange: (checked: boolean) => void;
	disabled?: boolean;
}

export function SwitchRow({ label, description, checked, onChange, disabled }: SwitchRowProps) {
	const labelId = useId();
	const descriptionId = useId();

	return (
		<div className="flex items-start justify-between gap-4 py-3">
			<div className="flex min-w-0 flex-col gap-1">
				<span id={labelId} className="font-medium">
					{label}
				</span>
				{description && (
					<span id={descriptionId} className="text-muted">
						{description}
					</span>
				)}
			</div>
			<div className="mt-0.5">
				<Switch
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					labelledBy={labelId}
					describedBy={description ? descriptionId : undefined}
				/>
			</div>
		</div>
	);
}
