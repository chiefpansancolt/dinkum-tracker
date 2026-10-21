import type { ReactNode } from "react";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";

interface StatTileProps {
	value: ReactNode;
	label: string;
	emphasis?: boolean;
	/** A share from 0 to 1. The tile shows a bar when it is set. */
	progress?: number;
}

export function StatTile({ value, label, emphasis = false, progress }: StatTileProps) {
	return (
		<Card className="flex flex-col gap-1 px-4 py-3">
			<span className="text-muted">{label}</span>
			<span
				className={`font-mono text-xl sm:text-2xl ${emphasis ? "text-primary" : "text-ink"}`}
			>
				{value}
			</span>
			{progress !== undefined && <ProgressBar value={progress} label={label} />}
		</Card>
	);
}
