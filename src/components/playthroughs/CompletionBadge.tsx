import { useTranslations } from "next-intl";
import { completionTone } from "@/service/completion";

const TEXT_COLOR = { danger: "text-danger", caution: "text-warn", success: "text-success" };

/** The percent chip. It is red under 30, yellow under 70 and green from 70. */
export function CompletionBadge({ percent, plain = false }: { percent: number; plain?: boolean }) {
	const t = useTranslations("playthroughs.card");
	const color = TEXT_COLOR[completionTone(percent)];

	return (
		<span
			className={`font-semibold whitespace-nowrap ${color} ${
				plain ? "" : "rounded-full border-[1.5px] border-current px-3 py-0.5"
			}`}
		>
			{t("complete", { percent })}
		</span>
	);
}
