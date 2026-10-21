import type { ComponentProps } from "react";

interface ScrollRegionProps extends ComponentProps<"div"> {
	label: string;
}

export function ScrollRegion({
	label,
	className = "overflow-x-auto",
	...props
}: ScrollRegionProps) {
	return (
		<div
			role="region"
			aria-label={label}
			tabIndex={0}
			data-focus-inset
			className={`focus-visible:-outline-offset-2 ${className}`}
			{...props}
		/>
	);
}
