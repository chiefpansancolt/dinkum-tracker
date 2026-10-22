import type { HTMLAttributes } from "react";

export function SectionLabel({ className = "", ...props }: HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			className={`font-mono text-[11px] tracking-[0.08em] uppercase ${className}`}
			{...props}
		/>
	);
}
