"use client";

import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/comps/ui/Button";
import { SavedChip } from "@/comps/ui/SavedChip";

export function NotFoundView() {
	const t = useTranslations("shell.notFound");
	const pathname = usePathname();

	return (
		<>
			<div className="flex justify-end max-lg:hidden">
				<SavedChip />
			</div>
			<div className="flex flex-1 flex-col items-center justify-center gap-3.5 py-8 text-center">
				<span className="text-primary text-[96px] leading-none font-bold sm:text-[120px]">
					{t("code")}
				</span>
				<h1 className="text-[28px] font-semibold">{t("title")}</h1>
				<p className="text-muted text-base">{t("description")}</p>
				<span className="border-line bg-surface text-muted max-w-full rounded-md border-[1.5px] px-3 py-1.5 font-mono text-[13px] break-all">
					{pathname}
				</span>
				<div className="mt-2.5 flex flex-wrap justify-center gap-3">
					<ButtonLink
						href="/overview"
						variant="primary"
						className="min-h-12 px-5.5 font-semibold"
					>
						{t("toOverview")}
					</ButtonLink>
					<ButtonLink
						href="/"
						variant="outline"
						className="min-h-12 px-5.5 font-semibold"
					>
						{t("toHome")}
					</ButtonLink>
				</div>
				<p className="text-muted max-w-[460px] text-[13px]">{t("hint")}</p>
			</div>
		</>
	);
}
