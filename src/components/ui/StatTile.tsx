import type { ReactNode } from "react";
import { Card } from "./Card";
import { ProgressBar } from "./ProgressBar";
import { SectionLabel } from "./SectionLabel";

interface StatTileProps {
	value: ReactNode;
	label: string;
	caption?: string;
	emphasis?: boolean;
	progress?: number;
}

export function StatTile({ value, label, caption, emphasis = false, progress }: StatTileProps) {
	return (
		<Card className="flex flex-col gap-1.5 px-4 py-3">
			<SectionLabel className="text-muted">{label}</SectionLabel>
			<span className="flex min-w-0 items-baseline gap-2">
				<span
					className={`font-mono text-xl sm:text-2xl ${emphasis ? "text-primary" : "text-ink"}`}
				>
					{value}
				</span>
				{caption && <span className="text-muted min-w-0">{caption}</span>}
			</span>
			{progress !== undefined && <ProgressBar value={progress} label={label} />}
		</Card>
	);
}
