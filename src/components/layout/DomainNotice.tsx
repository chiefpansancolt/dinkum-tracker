"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { LuX } from "react-icons/lu";
import { DOMAIN_NOTICE_DISMISSED_KEY } from "@/service/storageKeys";
import { IconButton } from "@/comps/ui/IconButton";

const OLD_DOMAIN = "dinkum-tracker.app";
const NEW_DOMAIN = "dinkum.gamerdex.app";
const RETIREMENT_MONTH = "April 2027";
const NOTICE_EXPIRES_AT = new Date("2027-05-01");
const DISMISSED_EVENT = "dinkum-domain-notice-dismissed";

const shouldShowNotice = () =>
	window.location.hostname === OLD_DOMAIN &&
	new Date() < NOTICE_EXPIRES_AT &&
	localStorage.getItem(DOMAIN_NOTICE_DISMISSED_KEY) === null;

const subscribe = (notify: () => void) => {
	window.addEventListener(DISMISSED_EVENT, notify);
	window.addEventListener("storage", notify);
	return () => {
		window.removeEventListener(DISMISSED_EVENT, notify);
		window.removeEventListener("storage", notify);
	};
};

const dismiss = () => {
	localStorage.setItem(DOMAIN_NOTICE_DISMISSED_KEY, "true");
	window.dispatchEvent(new Event(DISMISSED_EVENT));
};

/** Tells players on the old domain where their data has to go. It shows on that domain only. */
export function DomainNotice() {
	const t = useTranslations("shell.domainNotice");
	const visible = useSyncExternalStore(subscribe, shouldShowNotice, () => false);

	if (!visible) return null;

	const domain = (chunks: React.ReactNode) => (
		<span className="font-mono font-medium">{chunks}</span>
	);
	const date = (chunks: React.ReactNode) => <span className="font-semibold">{chunks}</span>;

	return (
		<div
			role="region"
			aria-label={t("label")}
			className="bg-surface border-warn flex items-start gap-3 border-b-2 px-4 py-2.5 lg:px-8"
		>
			<p className="flex-1 py-1.5">
				<span className="text-warn font-semibold">{t("label")}</span>{" "}
				{t.rich("movedTo", { domain: NEW_DOMAIN, strong: domain })}{" "}
				<Link href="/settings" className="text-link font-semibold underline">
					{t("exportLink")}
				</Link>{" "}
				{t.rich("retired", { date: RETIREMENT_MONTH, strong: date })}{" "}
				<a href={`https://${NEW_DOMAIN}`} className="text-link font-semibold underline">
					{t("goToNewSite")}
				</a>
			</p>
			<IconButton
				label={t("dismiss")}
				onClick={dismiss}
				className="text-muted hover:bg-line -my-2"
			>
				<LuX size={18} aria-hidden="true" />
			</IconButton>
		</div>
	);
}
