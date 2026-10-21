"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { ButtonHTMLAttributes } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { useIsDesktop } from "@/lib/hooks/useMediaQuery";
import { playthroughProgress } from "@/service/completion";
import { Dialog } from "@/comps/ui/Dialog";
import { Menu, MenuItem, MenuLabel, MenuSeparator } from "@/comps/ui/Menu";
import { SectionLabel } from "@/comps/ui/SectionLabel";

const usePlaythroughDetail = () => {
	const t = useTranslations("shell.playthroughSwitcher");

	return (playthrough: Playthrough) =>
		t("detail", {
			day: playthrough.calendar.currentDay,
			percent: playthroughProgress(playthrough).overallPercent,
		});
};

interface PlaythroughChoicesProps {
	inMenu: boolean;
	close: () => void;
	onNavigate?: () => void;
}

function PlaythroughChoices({ inMenu, close, onNavigate }: PlaythroughChoicesProps) {
	const t = useTranslations("shell.playthroughSwitcher");
	const { playthroughs, activePlaythrough, setActivePlaythrough } = usePlaythrough();
	const describe = usePlaythroughDetail();
	const role = inMenu ? "menuitem" : "button";
	const followLink = () => {
		close();
		onNavigate?.();
	};

	return (
		<>
			{playthroughs.length > 0 && (
				<>
					{inMenu && <MenuLabel>{t("playthroughs")}</MenuLabel>}
					{playthroughs.map((playthrough) => {
						const isActive = playthrough.id === activePlaythrough?.id;
						return (
							<MenuItem
								key={playthrough.id}
								role={role}
								active={isActive}
								className="justify-between gap-2"
								onSelect={() => {
									setActivePlaythrough(playthrough.id);
									close();
								}}
							>
								<span className="flex min-w-0 flex-col">
									<span className="truncate font-medium">{playthrough.name}</span>
									<span className="text-muted truncate text-xs">
										{describe(playthrough)}
									</span>
								</span>
								{isActive && (
									<span className="text-primary font-mono text-xs font-medium">
										{t("active")}
									</span>
								)}
							</MenuItem>
						);
					})}
					<MenuSeparator />
				</>
			)}
			<MenuItem
				role={role}
				href="/playthroughs"
				onSelect={followLink}
				className="gap-2 font-medium"
			>
				{t("allPlaythroughs")}
			</MenuItem>
			<MenuItem
				role={role}
				href="/playthroughs?new=1"
				onSelect={followLink}
				className="text-primary gap-2.5 font-semibold"
			>
				<LuPlus size={16} aria-hidden="true" />
				{t("newPlaythrough")}
			</MenuItem>
		</>
	);
}

export function PlaythroughMenu({ onNavigate }: { onNavigate?: () => void }) {
	const t = useTranslations("shell.playthroughSwitcher");
	const { activePlaythrough, isLoaded } = usePlaythrough();
	const describe = usePlaythroughDetail();
	const isDesktop = useIsDesktop();
	const [sheetOpen, setSheetOpen] = useState(false);

	const triggerName = !isLoaded
		? t("loading")
		: (activePlaythrough?.name ?? t("noPlaythroughYet"));
	const triggerDetail = activePlaythrough ? describe(activePlaythrough) : "";

	const renderTrigger = (props: ButtonHTMLAttributes<HTMLButtonElement>) => (
		<button
			type="button"
			disabled={!isLoaded}
			{...props}
			className="border-sb-line text-sb-text flex h-12 w-full items-center justify-between gap-2 rounded-md border-[1.5px] px-3 text-start"
		>
			<span className="flex min-w-0 flex-col">
				<span className="truncate font-medium">{triggerName}</span>
				{triggerDetail && (
					<span className="text-sb-muted truncate text-xs">{triggerDetail}</span>
				)}
			</span>
			<LuChevronDown size={14} aria-hidden="true" className="text-sb-muted shrink-0" />
		</button>
	);

	return (
		<div className="flex flex-col gap-1.5">
			<SectionLabel className="text-sb-muted">{t("sectionLabel")}</SectionLabel>
			{isDesktop ? (
				<Menu label={t("switchPlaythrough")} trigger={({ props }) => renderTrigger(props)}>
					{(close) => <PlaythroughChoices inMenu close={close} onNavigate={onNavigate} />}
				</Menu>
			) : (
				<>
					{renderTrigger({
						"aria-haspopup": "dialog",
						onClick: () => setSheetOpen(true),
					})}
					<Dialog
						open={sheetOpen}
						onClose={() => setSheetOpen(false)}
						title={t("switchPlaythrough")}
					>
						<div className="-mx-2 flex flex-col gap-0.5">
							<PlaythroughChoices
								inMenu={false}
								close={() => setSheetOpen(false)}
								onNavigate={onNavigate}
							/>
						</div>
					</Dialog>
				</>
			)}
		</div>
	);
}
