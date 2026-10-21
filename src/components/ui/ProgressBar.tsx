interface ProgressBarProps {
	value: number;
	label: string;
	tone?: "primary" | "success" | "warn";
	className?: string;
}

/**
 * `value` runs from 0 to 1. The label names what the bar measures for screen readers.
 */
const toneClasses = {
	primary: "bg-primary",
	success: "bg-success",
	warn: "bg-warn",
};

export function ProgressBar({ value, label, tone = "primary", className = "" }: ProgressBarProps) {
	const percent = Math.round(Math.min(1, Math.max(0, value)) * 100);

	return (
		<div
			role="progressbar"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={percent}
			className={`bg-track h-2 overflow-hidden rounded-full ${className}`}
		>
			<div
				className={`${toneClasses[tone]} h-full rounded-full`}
				style={{ width: `${percent}%` }}
			/>
		</div>
	);
}
