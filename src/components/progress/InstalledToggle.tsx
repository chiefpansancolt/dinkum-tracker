"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import { LuCheck } from "react-icons/lu";

interface InstalledToggleProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function InstalledToggle({ checked, onChange }: InstalledToggleProps) {
	const t = useTranslations("progress.buildings");
	const id = useId();

	return (
		<label
			htmlFor={id}
			className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border-[1.5px] px-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) ${
				checked
					? "border-primary bg-tint text-primary font-semibold"
					: "border-line bg-surface"
			}`}
		>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
				className="sr-only"
			/>
			<span
				aria-hidden="true"
				className={`flex size-5 shrink-0 items-center justify-center rounded-sm border-[1.5px] ${
					checked ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"
				}`}
			>
				{checked && <LuCheck size={14} />}
			</span>
			{t("installed")}
		</label>
	);
}
