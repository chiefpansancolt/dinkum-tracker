import type { ReactNode } from "react";

export type BadgeTone =
	| "success"
	| "danger"
	| "info"
	| "warn"
	| "locked"
	| "common"
	| "uncommon"
	| "rare"
	| "superRare"
	| "veryRare";

const toneClasses: Record<BadgeTone, string> = {
	success: "text-success",
	danger: "text-danger",
	info: "text-info",
	warn: "text-warn",
	locked: "text-locked",
	common: "text-rarity-common",
	uncommon: "text-rarity-uncommon",
	rare: "text-rarity-rare",
	superRare: "text-rarity-super-rare",
	veryRare: "text-rarity-very-rare",
};

interface BadgeProps {
	tone: BadgeTone;
	children: ReactNode;
	/** Lets a long value wrap inside its row instead of reaching past the edge of a card. */
	wrap?: boolean;
}

export function Badge({ tone, children, wrap = false }: BadgeProps) {
	return (
		<span
			className={`inline-flex items-center rounded-full border-[1.5px] border-current px-2 py-0.5 font-mono text-[11px] tracking-[0.06em] uppercase ${
				wrap ? "max-w-full min-w-0 text-start break-words" : "shrink-0 whitespace-nowrap"
			} ${toneClasses[tone]}`}
		>
			{children}
		</span>
	);
}
