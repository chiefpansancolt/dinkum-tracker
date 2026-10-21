"use client";

import { useId } from "react";

interface RadioOption<Value extends string> {
	id: Value;
	label: string;
	description?: string;
	/** A destructive choice reads in the danger color. */
	danger?: boolean;
}

interface RadioGroupProps<Value extends string> {
	label: string;
	options: RadioOption<Value>[];
	value: Value;
	onChange: (value: Value) => void;
}

export function RadioGroup<Value extends string>({
	label,
	options,
	value,
	onChange,
}: RadioGroupProps<Value>) {
	const name = useId();

	return (
		<fieldset className="flex flex-col gap-2">
			<legend className="sr-only">{label}</legend>
			{options.map((option) => (
				<label
					key={option.id}
					className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-md border-[1.5px] px-3 py-2.5 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) lg:min-h-10 ${
						option.id === value ? "border-primary bg-tint" : "border-line"
					}`}
				>
					<input
						type="radio"
						name={name}
						value={option.id}
						checked={option.id === value}
						onChange={() => onChange(option.id)}
						className="accent-primary mt-0.5 size-4"
					/>
					<span className="flex flex-col gap-0.5">
						<span className={`font-medium ${option.danger ? "text-danger" : ""}`}>
							{option.label}
						</span>
						{option.description && (
							<span className="text-muted">{option.description}</span>
						)}
					</span>
				</label>
			))}
		</fieldset>
	);
}
