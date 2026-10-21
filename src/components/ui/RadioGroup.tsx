"use client";

import { useId } from "react";

interface RadioGroupProps<Value extends string> {
	label: string;
	options: { id: Value; label: string }[];
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
					className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md border-[1.5px] px-3 lg:min-h-10 ${
						option.id === value ? "border-primary bg-tint" : "border-line"
					}`}
				>
					<input
						type="radio"
						name={name}
						value={option.id}
						checked={option.id === value}
						onChange={() => onChange(option.id)}
						className="accent-primary size-4"
					/>
					<span className="font-medium">{option.label}</span>
				</label>
			))}
		</fieldset>
	);
}
