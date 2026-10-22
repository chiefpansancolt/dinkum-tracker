import type { ReactNode } from "react";

/** The columns fill top to bottom, so the tiles read down each column. */
export function MasonryGrid({ children }: { children: ReactNode }) {
	return <div className="columns-[19rem] gap-3">{children}</div>;
}

/** A tile is never split across two columns. */
export function MasonryTile({ children }: { children: ReactNode }) {
	return <div className="mb-3 break-inside-avoid">{children}</div>;
}
