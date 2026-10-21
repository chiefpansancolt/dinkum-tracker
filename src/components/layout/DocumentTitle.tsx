"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { APP_NAME, getPageRouteId } from "@/data/nav";

/**
 * The server renders the English title. This sets the title again in the chosen language and
 * sets it again when Next replaces it on navigation.
 */
export function DocumentTitle() {
	const t = useTranslations("shell.nav.items");
	const routeId = getPageRouteId(usePathname());
	const fullTitle = routeId === null ? undefined : `${t(routeId)} | ${APP_NAME}`;

	useEffect(() => {
		if (fullTitle === undefined) return;

		const apply = () => {
			if (document.title !== fullTitle) document.title = fullTitle;
		};
		apply();
		const observer = new MutationObserver(apply);
		observer.observe(document.head, { childList: true, subtree: true, characterData: true });
		return () => observer.disconnect();
	}, [fullTitle]);

	return null;
}
