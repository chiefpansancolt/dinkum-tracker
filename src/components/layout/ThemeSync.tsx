"use client";

import { useEffect } from "react";
import { applyThemeMode, useThemeMode } from "@/lib/theme";
import { DARK_QUERY } from "@/lib/themeScript";

/** Keeps the page theme in step with the saved choice and, for System, with the device. */
export function ThemeSync() {
	const mode = useThemeMode();

	useEffect(() => {
		applyThemeMode(mode);
		if (mode !== "auto") return;

		const systemDark = window.matchMedia(DARK_QUERY);
		const apply = () => applyThemeMode(mode);
		systemDark.addEventListener("change", apply);
		return () => systemDark.removeEventListener("change", apply);
	}, [mode]);

	return null;
}
