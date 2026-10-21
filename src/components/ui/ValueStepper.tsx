"use client";

import { useTranslations } from "next-intl";
import { LuMinus, LuPlus } from "react-icons/lu";
import { IconButton } from "./IconButton";

interface ValueStepperProps {
	label: string;
	value: number;
	min: number;
	max: number;
	onChange: (value: number) => void;
	display?: string;
	suffix?: string;
	disabled?: boolean;
}

const BUTTON_CLASSES = "border-line bg-surface hover:bg-tint border-[1.5px]";
const SPACER_CLASSES = "size-8 shrink-0 lg:size-7";

/**
 * A button that cannot act is removed and an empty space of the same size keeps the rows aligned.
 * It steps by one. A caller with labelled stops passes `display`.
 */
export function ValueStepper({
	label,
	value,
	min,
	max,
	onChange,
	display,
	suffix,
	disabled = false,
}: ValueStepperProps) {
	const t = useTranslations("ui.stepper");
	return (
		<span className="relative inline-flex items-center gap-1">
			{value > min ? (
				<IconButton
					compact
					label={t("lower", { label })}
					disabled={disabled}
					onClick={() => onChange(value - 1)}
					className={BUTTON_CLASSES}
				>
					<LuMinus size={14} aria-hidden="true" />
				</IconButton>
			) : (
				<span aria-hidden="true" className={SPACER_CLASSES} />
			)}
			<span className="min-w-8 text-center font-mono font-medium">
				<span className="sr-only">{t("labelPrefix", { label })}</span>
				{display ?? value}
			</span>
			{value < max ? (
				<IconButton
					compact
					label={t("raise", { label })}
					disabled={disabled}
					onClick={() => onChange(value + 1)}
					className={BUTTON_CLASSES}
				>
					<LuPlus size={14} aria-hidden="true" />
				</IconButton>
			) : (
				<span aria-hidden="true" className={SPACER_CLASSES} />
			)}
			{suffix && <span className="text-muted font-mono text-xs">{suffix}</span>}
		</span>
	);
}
