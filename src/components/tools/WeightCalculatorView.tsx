"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuMinus, LuPlus } from "react-icons/lu";
import {
	allWeightItems,
	clampWeight,
	formatWeight,
	priceFor,
	stepWeight,
	WEIGHT_STEP,
} from "@/service/weight";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Card } from "@/comps/ui/Card";
import { IconButton } from "@/comps/ui/IconButton";
import { ItemIcon } from "@/comps/ui/ItemIcon";

export function WeightCalculatorView() {
	const t = useTranslations("tools.weight");
	const [itemId, setItemId] = useState(allWeightItems[0].id);
	const item = allWeightItems.find((candidate) => candidate.id === itemId) ?? allWeightItems[0];
	const [weight, setWeight] = useState(item.minWeight);
	const total = formatNumber(priceFor(item, weight));

	const choose = (id: string) => {
		const next = allWeightItems.find((candidate) => candidate.id === id);
		if (!next) return;
		setItemId(id);
		setWeight(next.minWeight);
	};

	return (
		<>
			<PageHeader
				showSaved={false}
				title={t("title")}
				subline={t("subline", { count: allWeightItems.length })}
			/>
			<div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
				<Card className="p-4">
					<fieldset className="flex flex-col gap-3">
						<legend className="mb-3 text-lg font-semibold">{t("picker")}</legend>
						<div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
							{allWeightItems.map((candidate) => (
								<label
									key={candidate.id}
									className={`flex cursor-pointer flex-col items-center gap-1 rounded-md border-[1.5px] p-2 text-center has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-(--ring) ${
										candidate.id === item.id
											? "border-primary bg-tint"
											: "border-line bg-surface"
									}`}
								>
									<input
										type="radio"
										name="weight-item"
										value={candidate.id}
										checked={candidate.id === item.id}
										onChange={() => choose(candidate.id)}
										className="sr-only"
									/>
									<span className="bg-track flex size-12 items-center justify-center rounded-md">
										<ItemIcon src={candidate.img} size={40} />
									</span>
									<span className="font-semibold">{candidate.name}</span>
									<span className="text-muted font-mono text-xs">
										{t("perKg", { price: formatNumber(candidate.pricePerKg) })}
									</span>
									<span className="text-muted font-mono text-xs">
										{t("range", {
											min: candidate.minWeight,
											max: candidate.maxWeight,
										})}
									</span>
								</label>
							))}
						</div>
					</fieldset>
				</Card>
				<Card className="flex flex-col gap-5 p-5">
					<div className="border-line flex items-center gap-4 border-b pb-5">
						<span className="bg-track flex size-24 shrink-0 items-center justify-center rounded-md">
							<ItemIcon src={item.img} size={80} />
						</span>
						<div className="flex flex-col gap-1">
							<h2 className="text-2xl font-semibold">{item.name}</h2>
							<span className="font-mono">
								{t("perKg", { price: formatNumber(item.pricePerKg) })}
							</span>
							<span className="text-muted">
								{t("rangeLine", { min: item.minWeight, max: item.maxWeight })}
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="weight-slider" className="font-medium">
							{t("weight", { weight: formatWeight(weight) })}
						</label>
						<div className="flex items-center gap-3">
							<IconButton
								label={t("minus")}
								disabled={weight <= item.minWeight}
								onClick={() => setWeight(stepWeight(item, weight, -1))}
								className="border-line size-11 border-[1.5px]"
							>
								<LuMinus size={18} aria-hidden="true" />
							</IconButton>
							<input
								id="weight-slider"
								type="range"
								min={item.minWeight}
								max={item.maxWeight}
								step={WEIGHT_STEP}
								value={weight}
								onChange={(event) =>
									setWeight(clampWeight(item, Number(event.target.value)))
								}
								className="accent-primary h-11 min-w-0 flex-1"
							/>
							<IconButton
								label={t("plus")}
								disabled={weight >= item.maxWeight}
								onClick={() => setWeight(stepWeight(item, weight, 1))}
								className="border-line size-11 border-[1.5px]"
							>
								<LuPlus size={18} aria-hidden="true" />
							</IconButton>
						</div>
						<div className="text-muted flex justify-between">
							<span>{t("min", { min: item.minWeight })}</span>
							<span>{t("max", { max: item.maxWeight })}</span>
						</div>
						<p className="text-muted">{t("stepNote")}</p>
					</div>
					<div
						role="status"
						className="border-primary bg-tint flex flex-col items-center gap-2 rounded-md border-[1.5px] p-6 text-center"
					>
						<span className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
							{t("total")}
						</span>
						<span className="text-primary font-mono text-5xl font-semibold">
							{total}{" "}
							<span className="text-muted text-base font-normal">{t("dinks")}</span>
						</span>
						<span className="font-mono">
							{t("formula", {
								weight: formatWeight(weight),
								price: formatNumber(item.pricePerKg),
								total,
							})}
						</span>
						<span className="text-muted">{t("rounded")}</span>
					</div>
					<div className="grid grid-cols-2 gap-3">
						<div className="border-line rounded-md border-[1.5px] p-3">
							<span className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
								{t("atMin")}
							</span>
							<p className="font-mono text-lg">
								{formatNumber(priceFor(item, item.minWeight))}
							</p>
						</div>
						<div className="border-line rounded-md border-[1.5px] p-3">
							<span className="text-muted font-mono text-xs tracking-[0.08em] uppercase">
								{t("atMax")}
							</span>
							<p className="font-mono text-lg">
								{formatNumber(priceFor(item, item.maxWeight))}
							</p>
						</div>
					</div>
				</Card>
			</div>
		</>
	);
}
