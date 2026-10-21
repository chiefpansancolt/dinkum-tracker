"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { LuArrowUpRight } from "react-icons/lu";
import { APP_NAME } from "@/data/nav";
import { DISCORD_URL, GAMERDEX_URL, GITHUB_URL, WIKI_URL } from "@/data/site";
import { SectionLabel } from "@/comps/ui/SectionLabel";

const linkClasses =
	"text-on-primary flex min-h-11 items-center gap-1 hover:underline lg:min-h-9 [--ring:var(--color-on-primary)]";

function ExternalLink({
	href,
	children,
	sameTab = false,
}: {
	href: string;
	children: string;
	sameTab?: boolean;
}) {
	return (
		<a
			href={href}
			{...(sameTab ? {} : { target: "_blank", rel: "noopener noreferrer" })}
			className={linkClasses}
		>
			{children}
			<LuArrowUpRight size={14} aria-hidden="true" className="shrink-0 rtl:-scale-x-100" />
		</a>
	);
}

export function Footer() {
	const t = useTranslations("shell.footer");

	return (
		<footer className="bg-primary text-on-primary flex flex-col gap-6 px-4 pt-8 pb-5 [--ring:var(--color-on-primary)] lg:px-8">
			<div className="grid gap-8 md:grid-cols-[1.2fr_1fr_1.4fr]">
				<div className="flex min-w-0 flex-col gap-1">
					<span className="text-base font-semibold">{APP_NAME}</span>
					<span>{t("tagline")}</span>
				</div>
				<nav aria-label={t("support")} className="flex min-w-0 flex-col gap-1">
					<SectionLabel>{t("support")}</SectionLabel>
					<Link href="/settings" className={linkClasses}>
						{t("settings")}
					</Link>
					<ExternalLink href={DISCORD_URL}>{t("discord")}</ExternalLink>
					<ExternalLink href={GITHUB_URL}>{t("github")}</ExternalLink>
					<ExternalLink href={`${GAMERDEX_URL}/privacy`} sameTab>
						{t("privacyPolicy")}
					</ExternalLink>
					<ExternalLink href={`${GAMERDEX_URL}/terms`} sameTab>
						{t("termsOfService")}
					</ExternalLink>
				</nav>
				<div className="flex min-w-0 flex-col gap-1">
					<SectionLabel>{t("about")}</SectionLabel>
					<ExternalLink href={WIKI_URL}>{t("dinkumWiki")}</ExternalLink>
					<div className="border-on-primary/40 mt-2 flex flex-col gap-1 rounded-md border-[1.5px] px-3.5 py-3">
						<span className="font-semibold">{t("disclaimerTitle")}</span>
						<span className="text-[13px]">{t("disclaimer")}</span>
					</div>
				</div>
			</div>
			<div className="border-on-primary/40 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t-[1.5px] pt-4 text-[13px]">
				<span>
					{t("copyright", { year: String(new Date().getFullYear()), appName: APP_NAME })}
				</span>
				<span className="flex flex-wrap items-center gap-x-3">
					<span>{t("framework")}</span>
					<ExternalLink href={GAMERDEX_URL}>{t("visitGamerdex")}</ExternalLink>
				</span>
			</div>
		</footer>
	);
}
