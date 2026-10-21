"use client";

import { useId } from "react";
import type { ReactNode } from "react";

interface SegmentedControlProps<Value extends string> {
	label: string;
	options: { id: Value; label: string; icon?: ReactNode; tintWhenSelected?: boolean }[];
	value: Value;
	onChange: (value: Value) => void;
	/** Stretches the options to share the width of the container, for example inside a card. */
	fullWidth?: boolean;
}

export function SegmentedControl<Value extends string>({
	label,
	options,
	value,
	onChange,
	fullWidth = false,
}: SegmentedControlProps<Value>) {
	const name = useId();

	return (
		<fieldset
			className={`border-line min-w-0 overflow-hidden rounded-md border-[1.5px] ${fullWidth ? "flex w-full" : "inline-flex w-fit"}`}
		>
			<legend className="sr-only">{label}</legend>
			{options.map((option, index) => (
				<label
					key={option.id}
					className={`flex min-h-11 min-w-11 cursor-pointer items-center justify-center gap-1.5 px-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:-outline-offset-2 has-[:focus-visible]:outline-(--ring) lg:min-h-9 ${
						fullWidth ? "min-w-0 flex-1 px-1 text-[13px]" : ""
					} ${index > 0 ? "border-line border-s-[1.5px]" : ""} ${
						option.id !== value
							? "bg-surface text-ink"
							: option.tintWhenSelected
								? "bg-tint text-primary font-semibold"
								: "bg-primary text-on-primary font-semibold"
					}`}
				>
					<input
						type="radio"
						name={name}
						value={option.id}
						checked={option.id === value}
						onChange={() => onChange(option.id)}
						className="sr-only"
					/>
					{option.icon}
					{option.label}
				</label>
			))}
		</fieldset>
	);
}
