"use client";

import { formatNumber } from "@/i18n/formatter";
import { useId } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

interface TileTab<TabId extends string> {
	id: TabId;
	label: string;
	count: number;
	total: number;
}

interface TileTabsProps<TabId extends string> {
	label: string;
	tabs: TileTab<TabId>[];
	activeId: TabId;
	onChange: (id: TabId) => void;
	children: ReactNode;
}

export function TileTabs<TabId extends string>({
	label,
	tabs,
	activeId,
	onChange,
	children,
}: TileTabsProps<TabId>) {
	const baseId = useId();

	const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
		const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
		if (step === 0) return;

		event.preventDefault();
		const index = tabs.findIndex((tab) => tab.id === activeId);
		const next = tabs[(index + step + tabs.length) % tabs.length];
		onChange(next.id);
		document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
	};

	return (
		<div className="flex flex-col gap-4">
			<div
				role="tablist"
				aria-label={label}
				onKeyDown={handleKeyDown}
				className="grid grid-cols-3 gap-2 sm:gap-3"
			>
				{tabs.map((tab) => {
					const active = tab.id === activeId;
					return (
						<button
							key={tab.id}
							id={`${baseId}-tab-${tab.id}`}
							type="button"
							role="tab"
							aria-selected={active}
							aria-controls={`${baseId}-panel`}
							tabIndex={active ? 0 : -1}
							onClick={() => onChange(tab.id)}
							className={`flex min-h-11 flex-col gap-1.5 rounded-md border-[1.5px] px-3 py-2.5 text-start sm:px-4 sm:py-3 ${
								active
									? "border-primary bg-surface"
									: "border-line bg-tint/40 hover:bg-tint"
							}`}
						>
							<span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
								<span className="font-semibold">{tab.label}</span>
								<span className="text-muted font-mono text-xs sm:text-sm">
									{formatNumber(tab.count)}
									<span className="max-sm:hidden"> / </span>
									<span className="sm:hidden">/</span>
									{formatNumber(tab.total)}
								</span>
							</span>
							<ProgressBar
								value={tab.total > 0 ? tab.count / tab.total : 0}
								label={tab.label}
							/>
						</button>
					);
				})}
			</div>
			<div
				id={`${baseId}-panel`}
				role="tabpanel"
				aria-labelledby={`${baseId}-tab-${activeId}`}
				className="flex flex-col gap-4"
			>
				{children}
			</div>
		</div>
	);
}
