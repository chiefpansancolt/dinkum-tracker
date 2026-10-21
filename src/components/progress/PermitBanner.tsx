import { Card } from "@/comps/ui/Card";
import { ProgressBar } from "@/comps/ui/ProgressBar";
import { SectionLabel } from "@/comps/ui/SectionLabel";
import { PermitPointsIcon } from "./PermitPointsIcon";

interface PermitBannerProps {
	label: string;
	amount: string;
	total: string;
	percent: number;
	sentence: string;
}

/** The permit points spent or earned, as a wide tile with the figure, a bar and a sentence. */
export function PermitBanner({ label, amount, total, percent, sentence }: PermitBannerProps) {
	return (
		<Card className="flex flex-col gap-1.5 px-4 py-3">
			<SectionLabel className="text-muted">{label}</SectionLabel>
			<span className="flex items-baseline gap-2">
				<span className="font-mono text-xl sm:text-2xl">
					{amount} / {total}
				</span>
				<PermitPointsIcon size={24} />
			</span>
			<ProgressBar value={percent / 100} label={label} />
			<p className="text-muted text-sm">{sentence}</p>
		</Card>
	);
}
