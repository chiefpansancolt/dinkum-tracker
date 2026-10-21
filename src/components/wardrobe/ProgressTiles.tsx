"use client";

import { formatNumber } from "@/i18n/formatter";
import type { ReactNode } from "react";
import type { Progress } from "@/service/wardrobe";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import { ProgressBar } from "@/comps/ui/ProgressBar";

interface ProgressTilesProps {
	/** The line above the tiles, such as Progress by slot. */
	heading: string;
	progress: Progress[];
	/** The label of the tile that is also the current filter, if any. */
	selected: string | null;
	onSelect: (label: string) => void;
	showPercent?: boolean;
	/** Tile columns on a wide screen. */
	columns: number;
}

/** A strip of tiles, one for each slot, set or category. A tile sets that filter. */
export function ProgressTiles({
	heading,
	progress,
	selected,
	onSelect,
	showPercent = false,
	columns,
}: ProgressTilesProps): ReactNode {
	return (
		<section aria-label={heading} className="flex flex-col gap-3">
			<div className="flex flex-wrap items-end justify-between gap-3">
				<h2 className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
					{heading}
				</h2>
				<CommerceLevelControl />
			</div>
			<ul
				style={{ "--tile-cols": columns } as React.CSSProperties}
				className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-[repeat(var(--tile-cols),minmax(0,1fr))]"
			>
				{progress.map(({ label, count, total }) => {
					const active = label === selected;
					return (
						<li key={label} className="contents">
							<button
								type="button"
								aria-pressed={active}
								onClick={() => onSelect(label)}
								className={`flex min-h-11 min-w-0 flex-col gap-1.5 rounded-md border-[1.5px] px-3 py-2.5 text-start ${
									active
										? "border-primary bg-tint"
										: "border-line bg-surface hover:bg-tint/50"
								}`}
							>
								<span className="flex items-baseline justify-between gap-2">
									<span className="font-semibold">{label}</span>
									{showPercent && total > 0 && (
										<span className="text-muted font-mono text-xs">
											{Math.round((count / total) * 100)}%
										</span>
									)}
								</span>
								<span className="font-mono">
									{formatNumber(count)}{" "}
									<span className="text-muted">/ {formatNumber(total)}</span>
								</span>
								<ProgressBar value={total > 0 ? count / total : 0} label={label} />
							</button>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
