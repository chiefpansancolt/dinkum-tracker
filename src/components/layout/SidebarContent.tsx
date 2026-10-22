"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { navCounts } from "@/service/navCounts";
import type { NavItem } from "@/data/nav";
import { isNavItemActive, navGroups, settingsNavItem } from "@/data/nav";
import { SectionLabel } from "@/comps/ui/SectionLabel";
import { BrandMark } from "./BrandMark";
import { PlaythroughMenu } from "./PlaythroughMenu";
import { SidebarThemeSwitch } from "./SidebarThemeSwitch";

function SidebarLink({
	item,
	count,
	onNavigate,
}: {
	item: NavItem;
	count?: string;
	onNavigate?: () => void;
}) {
	const t = useTranslations("shell.nav");
	const active = isNavItemActive(item, usePathname());
	const Icon = item.icon;

	return (
		<Link
			href={item.href}
			onClick={onNavigate}
			aria-current={active ? "page" : undefined}
			className={`flex h-11 items-center gap-3 rounded-md px-2.5 lg:h-9 ${
				active
					? "bg-sb-active-bg text-sb-active-text font-semibold"
					: "text-sb-text hover:bg-sb-line"
			}`}
		>
			<Icon size={18} aria-hidden="true" className="shrink-0" />
			<span className="flex-1">{t(`items.${item.id}`)}</span>
			{count && (
				<span
					className={`font-mono text-xs ${active ? "text-sb-active-text" : "text-sb-muted"}`}
				>
					{count}
				</span>
			)}
		</Link>
	);
}

interface SidebarContentProps {
	onNavigate?: () => void;
	showThemeSwitch?: boolean;
}

export function SidebarContent({ onNavigate, showThemeSwitch = false }: SidebarContentProps) {
	const t = useTranslations("shell.nav");
	const { activePlaythrough } = usePlaythrough();
	const counts = useMemo(
		() => (activePlaythrough ? navCounts(activePlaythrough) : {}),
		[activePlaythrough]
	);

	return (
		<div className="flex min-h-0 flex-1 flex-col gap-4 [--ring:var(--color-sb-text)]">
			<BrandMark onNavigate={onNavigate} />
			<PlaythroughMenu onNavigate={onNavigate} />
			<nav
				aria-label={t("main")}
				data-focus-inset
				className="flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto"
			>
				{navGroups.map((group) => (
					<div key={group.id ?? "top"} className="flex flex-col gap-0.5">
						{group.id && (
							<SectionLabel className="text-sb-muted mt-2 px-2.5 pb-0.5">
								{t(`groups.${group.id}`)}
							</SectionLabel>
						)}
						{group.items.map((item) => (
							<SidebarLink
								key={item.href}
								item={item}
								count={counts[item.id]}
								onNavigate={onNavigate}
							/>
						))}
					</div>
				))}
			</nav>
			<div className="border-sb-line flex flex-col gap-2.5 border-t-[1.5px] pt-3">
				<SidebarLink item={settingsNavItem} onNavigate={onNavigate} />
				{showThemeSwitch && <SidebarThemeSwitch />}
			</div>
		</div>
	);
}
