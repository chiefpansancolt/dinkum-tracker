"use client";

import { useId } from "react";

interface ToggleRowProps {
	label: string;
	itemName: string;
	checked: boolean;
	onChange: (checked: boolean) => void;
}

export function ToggleRow({ label, itemName, checked, onChange }: ToggleRowProps) {
	const id = useId();

	return (
		<label
			htmlFor={id}
			className={`flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md border-[1.5px] px-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) ${
				checked
					? "border-primary bg-tint text-primary font-semibold"
					: "border-line bg-surface"
			}`}
		>
			<span>
				{label}
				<span className="sr-only">: {itemName}</span>
			</span>
			<input
				id={id}
				type="checkbox"
				role="switch"
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
				className="sr-only"
			/>
			<span
				aria-hidden="true"
				className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
					checked ? "bg-primary" : "bg-track"
				}`}
			>
				<span
					className={`absolute top-0.5 size-4 rounded-full transition-all ${
						checked ? "bg-on-primary start-[1.125rem]" : "bg-muted start-0.5"
					}`}
				/>
			</span>
		</label>
	);
}
