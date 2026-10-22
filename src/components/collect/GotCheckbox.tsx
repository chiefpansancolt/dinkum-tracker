"use client";

import { LuCheck } from "react-icons/lu";

interface GotCheckboxProps {
	checked: boolean;
	itemName: string;
	onChange: (checked: boolean) => void;
}

export function GotCheckbox({ checked, itemName, onChange }: GotCheckboxProps) {
	return (
		<label className="relative flex size-8 cursor-pointer items-center justify-center">
			<input
				type="checkbox"
				checked={checked}
				aria-label={itemName}
				onChange={(event) => onChange(event.target.checked)}
				className="peer sr-only"
			/>
			<span
				aria-hidden="true"
				className={`flex size-8 items-center justify-center rounded-md border-[1.5px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--ring) ${
					checked ? "border-primary bg-primary text-on-primary" : "border-line bg-surface"
				}`}
			>
				{checked && <LuCheck size={18} />}
			</span>
		</label>
	);
}
