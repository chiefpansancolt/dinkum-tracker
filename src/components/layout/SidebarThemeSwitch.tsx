"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import type { ThemeMode } from "@/lib/theme";
import { useThemeMode, writeThemeMode } from "@/lib/theme";

const OPTIONS: { mode: ThemeMode; labelKey: "light" | "dark" | "system" }[] = [
	{ mode: "light", labelKey: "light" },
	{ mode: "dark", labelKey: "dark" },
	{ mode: "auto", labelKey: "system" },
];

export function SidebarThemeSwitch() {
	const t = useTranslations("shell.theme");
	const name = useId();
	const current = useThemeMode();

	return (
		<fieldset className="border-sb-line grid grid-cols-3 overflow-hidden rounded-md border-[1.5px]">
			<legend className="sr-only">{t("label")}</legend>
			{OPTIONS.map((option, index) => (
				<label
					key={option.mode}
					className={`flex h-11 items-center justify-center has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-(--ring) ${
						index > 0 ? "border-sb-line border-s-[1.5px]" : ""
					} ${
						option.mode === current
							? "bg-sb-active-bg text-sb-active-text font-semibold"
							: "text-sb-text"
					}`}
				>
					<input
						type="radio"
						name={name}
						value={option.mode}
						checked={option.mode === current}
						onChange={() => writeThemeMode(option.mode)}
						className="sr-only"
					/>
					{t(option.labelKey)}
				</label>
			))}
		</fieldset>
	);
}
