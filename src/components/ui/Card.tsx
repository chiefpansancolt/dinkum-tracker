import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	highlighted?: boolean;
	dimmed?: boolean;
}

export function Card({ highlighted = false, dimmed = false, className = "", ...props }: CardProps) {
	const surface = dimmed ? "bg-tint border-dashed" : "bg-surface";
	return (
		<div
			className={`${surface} rounded-md border-[1.5px] ${highlighted ? "border-primary" : "border-line"} ${className}`}
			{...props}
		/>
	);
}
