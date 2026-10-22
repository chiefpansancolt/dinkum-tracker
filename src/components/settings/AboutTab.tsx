import { useTranslations } from "next-intl";
import { LuArrowUpRight } from "react-icons/lu";
import { APP_NAME } from "@/data/nav";
import { GITHUB_URL, WIKI_URL } from "@/data/site";
import { SettingsCard } from "./SettingsCard";

function ResourceLink({ href, name }: { href: string; name: string }) {
	const t = useTranslations("settings.appearance");

	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="border-line hover:bg-tint flex min-h-12 items-center justify-between gap-3 rounded-md border-[1.5px] px-3 py-2"
		>
			<span className="flex min-w-0 flex-col">
				<span className="font-semibold">{name}</span>
				<span className="text-link truncate font-mono text-xs">
					{href.replace("https://", "")}
				</span>
			</span>
			<span className="text-muted flex shrink-0 items-center gap-1 text-xs">
				{t("opensInNewTab")}
				<LuArrowUpRight size={14} aria-hidden="true" className="rtl:-scale-x-100" />
			</span>
		</a>
	);
}

export function AboutTab() {
	const t = useTranslations("settings");

	return (
		<div className="max-w-2xl">
			<SettingsCard
				title={APP_NAME}
				description={t("about.version", {
					version: process.env.NEXT_PUBLIC_APP_VERSION ?? "",
				})}
			>
				<p>{t("about.summary")}</p>
				<span className="font-semibold">{t("about.resources")}</span>
				<ResourceLink href={WIKI_URL} name={t("appearance.wiki")} />
				<ResourceLink href={GITHUB_URL} name={t("appearance.repository")} />
				<p className="text-muted">{t("about.disclaimer")}</p>
			</SettingsCard>
		</div>
	);
}
