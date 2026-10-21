import type { ReactNode } from "react";

/**
 * Tiles of different heights in columns without gaps. The columns fill top to bottom, so the order
 * of the tiles reads down each column.
 */
export function MasonryGrid({ children }: { children: ReactNode }) {
	return <div className="columns-[19rem] gap-3">{children}</div>;
}

/** One tile of a MasonryGrid. It is never split across two columns. */
export function MasonryTile({ children }: { children: ReactNode }) {
	return <div className="mb-3 break-inside-avoid">{children}</div>;
}
