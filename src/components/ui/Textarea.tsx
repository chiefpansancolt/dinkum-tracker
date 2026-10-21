import type { TextareaHTMLAttributes } from "react";
import { controlBorder, controlClasses, useFieldControl } from "./Field";

export function Textarea({
	className = "",
	...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
	const field = useFieldControl();

	return (
		<textarea
			id={field?.id}
			aria-describedby={field?.describedBy}
			aria-invalid={field?.invalid || undefined}
			className={`${controlClasses} ${controlBorder(field?.invalid ?? false)} min-h-24 px-3 py-2 ${className}`}
			{...props}
		/>
	);
}
