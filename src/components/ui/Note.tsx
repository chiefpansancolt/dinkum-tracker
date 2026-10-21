import type { ReactNode } from "react";
import { LuInfo, LuTriangleAlert } from "react-icons/lu";

type NoteTone = "info" | "warning";

const toneClasses: Record<NoteTone, string> = {
	info: "border-line bg-tint",
	warning: "border-warn bg-surface",
};

export function Note({
	tone = "info",
	title,
	children,
}: {
	tone?: NoteTone;
	title?: string;
	children: ReactNode;
}) {
	const Icon = tone === "info" ? LuInfo : LuTriangleAlert;

	return (
		<div
			className={`flex gap-3 rounded-md border-[1.5px] p-3 ${toneClasses[tone]} ${
				tone === "warning" ? "text-warn" : ""
			}`}
		>
			<Icon size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
			<p className={tone === "warning" ? "" : "text-ink"}>
				{title && <span className="font-semibold">{title} </span>}
				{children}
			</p>
		</div>
	);
}
