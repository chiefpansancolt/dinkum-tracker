import type { ReactNode } from "react";

type BadgeTone =
	| "success"
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
	info: "text-info",
	warn: "text-warn",
	locked: "text-locked",
	common: "text-rarity-common",
	uncommon: "text-rarity-uncommon",
	rare: "text-rarity-rare",
	superRare: "text-rarity-super-rare",
	veryRare: "text-rarity-very-rare",
};

export function Badge({ tone, children }: { tone: BadgeTone; children: ReactNode }) {
	return (
		<span
			className={`inline-flex shrink-0 items-center rounded-full border-[1.5px] border-current px-2 py-0.5 font-mono text-[11px] tracking-[0.06em] whitespace-nowrap uppercase ${toneClasses[tone]}`}
		>
			{children}
		</span>
	);
}
