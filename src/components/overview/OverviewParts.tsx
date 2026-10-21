import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import Link from "next/link";
import type { ReactNode } from "react";
import { Card } from "@/comps/ui/Card";
import { ItemIcon } from "@/comps/ui/ItemIcon";
import { ProgressBar } from "@/comps/ui/ProgressBar";
import { SectionLabel } from "@/comps/ui/SectionLabel";

interface OverviewCardProps {
	title: string;
	href: string;
	className?: string;
	children: ReactNode;
}

/** A card of the Overview. Its title links to the full page of that category. */
export function OverviewCard({ title, href, className = "", children }: OverviewCardProps) {
	const t = useTranslations("overview");

	return (
		<Card className={`flex flex-col gap-4 p-4 ${className}`}>
			<div className="flex items-baseline justify-between gap-3">
				<h2 className="text-lg font-semibold">{title}</h2>
				<Link href={href} className="text-link text-sm underline">
					{t("view")}
					<span className="sr-only"> {title}</span>
				</Link>
			</div>
			{children}
		</Card>
	);
}

interface MeterRowProps {
	label: string;
	value: string;
	progress: number;
	/** The main row of a card is bold and green. A sub row is quieter, as the donation rows are. */
	sub?: boolean;
	tone?: "primary" | "info";
	mono?: boolean;
}

export function MeterRow({
	label,
	value,
	progress,
	sub = false,
	tone = "primary",
	mono = false,
}: MeterRowProps) {
	return (
		<div className="flex flex-col gap-1.5">
			<div className="flex items-baseline justify-between gap-3">
				<span className={sub ? "text-muted" : "font-semibold"}>{label}</span>
				<span
					className={`${sub ? "text-muted" : "font-semibold"} ${mono ? "font-mono" : ""}`}
				>
					{value}
				</span>
			</div>
			<ProgressBar value={progress} label={label} tone={tone} />
		</div>
	);
}

interface PermitPointsProps {
	label: string;
	amount: number;
	total: number;
	suffix: string;
	percent: number;
}

export function PermitPointsRow({ label, amount, total, suffix, percent }: PermitPointsProps) {
	return (
		<div className="flex flex-col gap-1.5">
			<SectionLabel className="text-muted">{label}</SectionLabel>
			<div className="flex items-baseline gap-2">
				<span className="font-mono text-xl font-medium">
					{formatNumber(amount)} / {formatNumber(total)}
				</span>
				<span className="text-muted">{suffix}</span>
			</div>
			<ProgressBar value={percent / 100} label={label} />
		</div>
	);
}

/** A number on a tinted tile, such as House upgrades 3. */
export function StatBox({ label, value }: { label: string; value: string }) {
	return (
		<div className="bg-tint flex flex-col gap-1 rounded-md p-3">
			<span className="text-muted text-[13px]">{label}</span>
			<span className="text-2xl font-semibold">{value}</span>
		</div>
	);
}

interface HighlightBoxProps {
	label: string;
	name: string;
	percent: number;
	tone: "most" | "least";
}

/** The most or least complete category. The most complete one has a green border. */
export function HighlightBox({ label, name, percent, tone }: HighlightBoxProps) {
	return (
		<div
			className={`flex flex-col gap-0.5 rounded-md border-[1.5px] px-3 py-2.5 ${
				tone === "most" ? "border-primary" : "border-line"
			}`}
		>
			<SectionLabel className="text-muted">{label}</SectionLabel>
			<span className="font-semibold">{name}</span>
			<span className={`text-sm ${tone === "most" ? "text-success" : "text-warn"}`}>
				{percent}%
			</span>
		</div>
	);
}

/** An image, a name and a value on one row, such as a top relationship. */
export function ListRow({ img, name, value }: { img: string; name: string; value: string }) {
	return (
		<li className="bg-bg flex items-center gap-3 rounded-md px-3 py-2">
			<ItemIcon src={img} size={28} />
			<span className="flex-1 font-semibold">{name}</span>
			<span className="font-mono">{value}</span>
		</li>
	);
}
