"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuCheck } from "react-icons/lu";
import { useTerms } from "@/lib/hooks/useTerms";
import { allBuffKeys } from "@/service/recipes";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";
import { BuffIcon } from "./BuffIcon";

interface BuffsFilterProps {
	chosen: string[];
	matchAll: boolean;
	onChosenChange: (chosen: string[]) => void;
	onMatchAllChange: (matchAll: boolean) => void;
}

/** The Buffs button and the panel in which the player picks buffs and the match mode. */
export function BuffsFilter({
	chosen,
	matchAll,
	onChosenChange,
	onMatchAllChange,
}: BuffsFilterProps) {
	const terms = useTerms();
	const t = useTranslations("collect.recipes");
	const [open, setOpen] = useState(false);

	const toggle = (key: string) =>
		onChosenChange(
			chosen.includes(key) ? chosen.filter((item) => item !== key) : [...chosen, key]
		);

	return (
		<>
			<Button onClick={() => setOpen(true)} aria-haspopup="dialog">
				{chosen.length > 0
					? t("filters.buffsWithCount", { count: chosen.length })
					: t("filters.buffs")}
			</Button>
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				title={t("buffs.title")}
				footer={
					<>
						<span className="text-muted me-auto">
							{t("buffs.selected", { count: chosen.length })}
						</span>
						<Button variant="link" onClick={() => onChosenChange([])}>
							{t("buffs.clear")}
						</Button>
						<Button variant="primary" onClick={() => setOpen(false)}>
							{t("buffs.done")}
						</Button>
					</>
				}
			>
				<div className="flex items-center gap-3">
					<span className="font-medium">{t("buffs.match")}</span>
					<SegmentedControl
						label={t("buffs.match")}
						value={matchAll ? "all" : "any"}
						onChange={(value) => onMatchAllChange(value === "all")}
						options={[
							{ id: "any", label: t("buffs.any") },
							{ id: "all", label: t("buffs.all") },
						]}
					/>
				</div>
				<ul className="grid grid-cols-[repeat(auto-fill,minmax(8.5rem,1fr))] gap-2">
					{allBuffKeys.map((key) => {
						const selected = chosen.includes(key);
						return (
							<li key={key}>
								<button
									type="button"
									aria-pressed={selected}
									onClick={() => toggle(key)}
									className={`flex min-h-11 w-full items-center gap-2 rounded-md border-[1.5px] px-2 text-start ${
										selected
											? "border-primary bg-tint font-semibold"
											: "border-line bg-surface"
									}`}
								>
									<BuffIcon buff={key} size={28} />
									<span className="min-w-0 flex-1">{terms.buff(key)}</span>
									{selected && (
										<LuCheck
											size={16}
											aria-hidden="true"
											className="text-primary"
										/>
									)}
								</button>
							</li>
						);
					})}
				</ul>
			</Dialog>
		</>
	);
}
