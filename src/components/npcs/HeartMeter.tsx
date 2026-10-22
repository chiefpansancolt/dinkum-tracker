"use client";

import { formatDecimal, formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { LuHeart } from "react-icons/lu";
import {
	formatHearts,
	HEART_STEP,
	heartFill,
	heartsAfterClick,
	MAX_HEARTS,
	stepHearts,
} from "@/service/npcs";
import { Button } from "@/comps/ui/Button";

interface HeartMeterProps {
	name: string;
	hearts: number;
	onChange: (hearts: number) => void;
}

/** Five hearts the player can press, quarter step buttons and the value as a number. */
export function HeartMeter({ name, hearts, onChange }: HeartMeterProps) {
	const t = useTranslations("people.npcs.hearts");
	const step = formatDecimal(HEART_STEP, 2);

	return (
		<div className="border-line flex flex-col gap-3 border-t pt-3">
			<div className="flex items-center justify-between gap-2">
				<div role="group" aria-label={t("label", { name })} className="flex">
					{Array.from({ length: MAX_HEARTS }, (_, index) => (
						<button
							key={index}
							type="button"
							aria-label={t("setTo", {
								name,
								count: heartsAfterClick(hearts, index),
								amount: formatNumber(heartsAfterClick(hearts, index)),
							})}
							onClick={() => onChange(heartsAfterClick(hearts, index))}
							className="relative flex size-11 items-center justify-center lg:size-8"
						>
							<LuHeart size={24} aria-hidden="true" className="text-muted absolute" />
							<span
								aria-hidden="true"
								style={{
									clipPath: `inset(0 ${100 - heartFill(hearts, index) * 100}% 0 0)`,
								}}
								className="absolute flex size-6 items-center justify-center"
							>
								<LuHeart size={24} className="text-danger fill-current" />
							</span>
						</button>
					))}
				</div>
				<span className="font-mono">
					{t("readout", { hearts: formatHearts(hearts), max: MAX_HEARTS })}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-2">
				<Button
					aria-label={t("lessLabel", { step })}
					disabled={hearts <= 0}
					onClick={() => onChange(stepHearts(hearts, -1))}
				>
					{t("less", { step })}
				</Button>
				<Button
					aria-label={t("moreLabel", { step })}
					disabled={hearts >= MAX_HEARTS}
					onClick={() => onChange(stepHearts(hearts, 1))}
				>
					{t("more", { step })}
				</Button>
			</div>
		</div>
	);
}
