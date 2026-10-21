import type { InputHTMLAttributes, ReactNode } from "react";
import { controlBorder, controlClasses, controlHeightClasses, useFieldControl } from "./Field";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	leadingIcon?: ReactNode;
}

export function Input({ leadingIcon, className = "", ...props }: InputProps) {
	const field = useFieldControl();
	const padding = leadingIcon ? "pe-3 ps-9" : "px-3";

	const input = (
		<input
			id={field?.id}
			aria-describedby={field?.describedBy}
			aria-invalid={field?.invalid || undefined}
			className={`${controlClasses} ${controlHeightClasses} ${padding} ${controlBorder(field?.invalid ?? false)} ${className}`}
			{...props}
		/>
	);

	if (!leadingIcon) return input;

	return (
		<span className="relative block">
			<span
				aria-hidden="true"
				className="text-muted pointer-events-none absolute inset-s-3 top-1/2 -translate-y-1/2"
			>
				{leadingIcon}
			</span>
			{input}
		</span>
	);
}
