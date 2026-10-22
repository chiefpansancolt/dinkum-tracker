"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { LuLock } from "react-icons/lu";

interface TabsProps<TabId extends string> {
	label: string;
	tabs: { id: TabId; label: string; count?: number; locked?: boolean }[];
	activeId: TabId;
	onChange: (id: TabId) => void;
	children: ReactNode;
}

export function Tabs<TabId extends string>({
	label,
	tabs,
	activeId,
	onChange,
	children,
}: TabsProps<TabId>) {
	const t = useTranslations("ui.tabs");
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
				data-focus-inset
				aria-label={label}
				onKeyDown={handleKeyDown}
				className="border-line relative -mx-4 flex gap-1 overflow-x-auto border-b-[1.5px] px-4 lg:mx-0 lg:px-0"
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
							className={`mb-[-1.5px] min-h-11 shrink-0 border-b-[3px] px-3.5 whitespace-nowrap lg:min-h-10 ${
								active
									? "border-primary text-ink font-semibold"
									: "text-muted hover:text-ink border-transparent"
							}`}
						>
							{tab.label}
							{tab.count !== undefined && (
								<span className="text-muted ms-2 font-mono text-xs">
									{tab.count}
								</span>
							)}
							{tab.locked && (
								<>
									<LuLock
										size={12}
										aria-hidden="true"
										className="text-muted ms-1.5 inline"
									/>
									<span className="sr-only">{t("locked")}</span>
								</>
							)}
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
