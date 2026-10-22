import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
	label: string;
	compact?: boolean;
}

export function IconButton({
	label,
	compact = false,
	className = "",
	type = "button",
	...props
}: IconButtonProps) {
	// A compact button keeps its look and gets a 44 px touch area on small screens.
	const size = compact
		? "relative z-1 size-8 before:absolute before:-inset-2 before:content-[''] lg:size-7 lg:before:-inset-1.5"
		: "size-11 lg:size-9";

	return (
		<button
			type={type}
			aria-label={label}
			className={`inline-flex shrink-0 items-center justify-center rounded-md transition-colors ${size} ${className}`}
			{...props}
		/>
	);
}
