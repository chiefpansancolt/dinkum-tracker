interface ProgressBarProps {
	value: number;
	label: string;
	tone?: "primary" | "info" | "success" | "caution" | "danger";
	className?: string;
	thick?: boolean;
}

const toneClasses = {
	primary: "bg-primary",
	info: "bg-info",
	success: "bg-success",
	caution: "bg-amber",
	danger: "bg-danger",
};

export function ProgressBar({
	value,
	label,
	tone = "primary",
	className = "",
	thick = false,
}: ProgressBarProps) {
	const percent = Math.round(Math.min(1, Math.max(0, value)) * 100);

	return (
		<div
			role="progressbar"
			aria-label={label}
			aria-valuemin={0}
			aria-valuemax={100}
			aria-valuenow={percent}
			className={`bg-track overflow-hidden rounded-full ${thick ? "h-3" : "h-2"} ${className}`}
		>
			<div
				className={`${toneClasses[tone]} h-full rounded-full`}
				style={{ width: `${percent}%` }}
			/>
		</div>
	);
}
