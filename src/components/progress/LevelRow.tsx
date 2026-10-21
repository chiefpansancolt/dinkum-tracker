"use client";

import { useTranslations } from "next-intl";
import { useId } from "react";
import type { ReactNode } from "react";
import { LuCheck, LuLock } from "react-icons/lu";
import { PermitPointsIcon } from "./PermitPointsIcon";

interface LevelRowProps {
	/** The title of the level, for example Level 2 or Level 3: 1,000 km. */
	title: ReactNode;
	/** The permit point cost, shown with the permit points picture. */
	points: string;
	checked: boolean;
	/** A level opens only after the level before it. A locked level says so in text. */
	locked: boolean;
	onToggle: () => void;
	children?: ReactNode;
}

/** One level of a license or a milestone. The whole row is the control. */
export function LevelRow({ title, points, checked, locked, onToggle, children }: LevelRowProps) {
	const t = useTranslations("progress.common");
	const id = useId();
	const tone = checked ? "border-primary bg-tint" : "border-line bg-bg";

	const content = (
		<>
			<span className="flex items-center gap-3">
				{locked ? (
					<LuLock size={16} aria-hidden="true" className="text-muted mx-0.5 shrink-0" />
				) : (
					<span
						aria-hidden="true"
						className={`flex size-5 shrink-0 items-center justify-center rounded-sm border-[1.5px] ${
							checked
								? "border-primary bg-primary text-on-primary"
								: "border-line bg-surface"
						}`}
					>
						{checked && <LuCheck size={14} />}
					</span>
				)}
				<span className="flex-1 font-semibold">{title}</span>
				<span className="text-info inline-flex items-center gap-1 rounded-full border-[1.5px] border-current py-0.5 ps-2 pe-1.5 font-mono text-[11px] whitespace-nowrap">
					{points}
					<PermitPointsIcon size={16} />
				</span>
			</span>
			{locked && <span className="text-muted ps-8">{t("locked")}</span>}
			{children && <span className="flex flex-col gap-1 ps-8">{children}</span>}
		</>
	);

	if (locked) {
		return (
			<div
				aria-disabled="true"
				className={`flex flex-col gap-1.5 rounded-md border-[1.5px] p-3 ${tone}`}
			>
				{content}
			</div>
		);
	}

	return (
		<label
			htmlFor={id}
			className={`flex cursor-pointer flex-col gap-1.5 rounded-md border-[1.5px] p-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) ${tone}`}
		>
			<input
				id={id}
				type="checkbox"
				checked={checked}
				onChange={onToggle}
				className="sr-only"
			/>
			{content}
		</label>
	);
}
