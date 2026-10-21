"use client";

import { Button } from "@/comps/ui/Button";

interface ToggleButtonProps {
	checked: boolean;
	onLabel: string;
	offLabel: string;
	itemName: string;
	onChange: (checked: boolean) => void;
}

/** A full width button that marks an item collected. It shows the saved state in its label. */
export function ToggleButton({
	checked,
	onLabel,
	offLabel,
	itemName,
	onChange,
}: ToggleButtonProps) {
	return (
		<Button
			variant={checked ? "primary" : "outline"}
			aria-pressed={checked}
			className="w-full"
			onClick={() => onChange(!checked)}
		>
			{checked ? onLabel : offLabel}
			<span className="sr-only">: {itemName}</span>
		</Button>
	);
}
