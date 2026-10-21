"use client";

import { useTranslations } from "next-intl";
import type { PediaStatus } from "@/service/pedia";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";

interface StatusControlProps {
	/** The name of the item, so each control has its own name for a screen reader. */
	itemName: string;
	value: PediaStatus;
	onChange: (status: PediaStatus) => void;
}

/** One control for Missing, Caught and Donated. Donated always includes Caught. */
export function StatusControl({ itemName, value, onChange }: StatusControlProps) {
	const t = useTranslations("pedia");

	return (
		<SegmentedControl
			fullWidth
			label={`${t("card.status")}: ${itemName}`}
			value={value}
			onChange={onChange}
			options={[
				{ id: "missing", label: t("card.missing"), tintWhenSelected: true },
				{ id: "caught", label: t("card.caught"), tintWhenSelected: true },
				{ id: "donated", label: t("card.donated") },
			]}
		/>
	);
}
