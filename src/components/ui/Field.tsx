"use client";

import { useTranslations } from "next-intl";
import { createContext, useContext, useId } from "react";
import type { ReactNode } from "react";
import { LuCircleAlert } from "react-icons/lu";

interface FieldControl {
	id: string;
	describedBy: string | undefined;
	invalid: boolean;
}

const FieldContext = createContext<FieldControl | undefined>(undefined);

export const useFieldControl = () => useContext(FieldContext);

interface FieldProps {
	label: string;
	optional?: boolean;
	hint?: ReactNode;
	error?: string;
	labelAction?: ReactNode;
	children: ReactNode;
}

export function Field({ label, optional, hint, error, labelAction, children }: FieldProps) {
	const t = useTranslations("ui");
	const id = useId();
	const hintId = `${id}-hint`;
	const errorId = `${id}-error`;
	const describedBy =
		[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;

	return (
		<FieldContext.Provider value={{ id, describedBy, invalid: Boolean(error) }}>
			<div className="flex flex-col gap-1.5">
				<div className="flex items-center gap-2">
					<label htmlFor={id} className="font-medium">
						{label}
					</label>
					{optional && <span className="text-muted text-xs">{t("field.optional")}</span>}
					{labelAction}
				</div>
				{children}
				{error && (
					<p id={errorId} className="text-danger flex items-center gap-2 font-medium">
						<LuCircleAlert size={18} aria-hidden="true" className="shrink-0" />
						{error}
					</p>
				)}
				{hint && (
					<p id={hintId} className="text-muted text-xs">
						{hint}
					</p>
				)}
			</div>
		</FieldContext.Provider>
	);
}

export const controlClasses =
	"w-full rounded-md border-[1.5px] bg-surface text-ink placeholder:text-muted disabled:opacity-50";

export const controlHeightClasses = "min-h-11 lg:min-h-9";

export const controlBorder = (invalid: boolean) => (invalid ? "border-danger" : "border-line");
