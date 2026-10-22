"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { LuListFilter, LuSearch } from "react-icons/lu";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { Field } from "@/comps/ui/Field";
import { Input } from "@/comps/ui/Input";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";
import { Select } from "@/comps/ui/Select";

export interface FilterFieldConfig {
	id: string;
	label: string;
	kind?: "select" | "segmented";
	/** The first option is the "all" choice. A field on it counts as not filtering. */
	options: { id: string; label: string }[];
	hint?: string;
}

interface FilterBlockProps {
	fields: FilterFieldConfig[];
	values: Record<string, string>;
	onChange: (fieldId: string, value: string) => void;
	onClear: () => void;
	search: { label: string; value: string; onChange: (value: string) => void };
	summary: ReactNode;
	searchAction?: ReactNode;
	extraFiltering?: boolean;
	trailing?: ReactNode;
	sheetTitle: string;
	applyLabel?: (draft: Record<string, string>) => string;
}

const isFiltering = (field: FilterFieldConfig, values: Record<string, string>) =>
	values[field.id] !== undefined && values[field.id] !== field.options[0].id;

function FieldSelect({
	field,
	value,
	onChange,
}: {
	field: FilterFieldConfig;
	value: string;
	onChange: (value: string) => void;
}) {
	if (field.kind === "segmented") {
		return (
			<div className="flex flex-col gap-1.5">
				<span className="font-medium">{field.label}</span>
				<SegmentedControl
					fullWidth
					label={field.label}
					value={value}
					onChange={onChange}
					options={field.options}
				/>
			</div>
		);
	}

	return (
		<Field label={field.label} hint={field.hint}>
			<Select value={value} onChange={(event) => onChange(event.target.value)}>
				{field.options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.label}
					</option>
				))}
			</Select>
		</Field>
	);
}

interface FilterSheetProps extends Pick<FilterBlockProps, "fields" | "values" | "applyLabel"> {
	onApply: (draft: Record<string, string>) => void;
	onClose: () => void;
}

/** The filters as a draft. They reach the page only when the player presses the apply button. */
function FilterSheetBody({ fields, values, applyLabel, onApply, onClose }: FilterSheetProps) {
	const t = useTranslations("ui.filters");
	const [draft, setDraft] = useState(values);
	const clearedDraft = Object.fromEntries(fields.map((field) => [field.id, field.options[0].id]));

	return (
		<>
			<div className="flex justify-end">
				<Button variant="link" onClick={() => setDraft(clearedDraft)}>
					{t("clearAll")}
				</Button>
			</div>
			{fields.map((field) => (
				<FieldSelect
					key={field.id}
					field={field}
					value={draft[field.id] ?? field.options[0].id}
					onChange={(value) => setDraft((current) => ({ ...current, [field.id]: value }))}
				/>
			))}
			<div className="border-line -mx-4 -mb-3 flex gap-2 border-t-[1.5px] px-4 py-3">
				<Button className="flex-1" onClick={onClose}>
					{t("cancel")}
				</Button>
				<Button
					variant="primary"
					className="flex-1"
					onClick={() => {
						onApply(draft);
						onClose();
					}}
				>
					{applyLabel?.(draft) ?? t("showResults")}
				</Button>
			</div>
		</>
	);
}

export function FilterBlock({
	fields,
	values,
	onChange,
	onClear,
	search,
	summary,
	searchAction,
	extraFiltering = false,
	trailing,
	sheetTitle,
	applyLabel,
}: FilterBlockProps) {
	const t = useTranslations("ui.filters");
	const [sheetOpen, setSheetOpen] = useState(false);
	const activeCount = fields.filter((field) => isFiltering(field, values)).length;
	const hasFilters = activeCount > 0 || search.value !== "" || extraFiltering;

	const applyDraft = (draft: Record<string, string>) => {
		fields.forEach((field) => {
			const next = draft[field.id] ?? field.options[0].id;
			if (next !== (values[field.id] ?? field.options[0].id)) onChange(field.id, next);
		});
	};

	return (
		<section aria-label={t("filters")} className="flex flex-col gap-3">
			<div
				style={
					{
						"--lg-cols": Math.min(fields.length, 3),
						"--xl-cols": fields.length,
					} as CSSProperties
				}
				className="hidden gap-3 lg:grid lg:grid-cols-[repeat(var(--lg-cols),minmax(0,1fr))] xl:grid-cols-[repeat(var(--xl-cols),minmax(0,1fr))]"
			>
				{fields.map((field) => (
					<FieldSelect
						key={field.id}
						field={field}
						value={values[field.id] ?? field.options[0].id}
						onChange={(value) => onChange(field.id, value)}
					/>
				))}
			</div>
			<div className="flex flex-wrap items-center gap-x-4 gap-y-2">
				<div className="min-w-0 flex-1 lg:min-w-60">
					<Input
						type="search"
						value={search.value}
						aria-label={search.label}
						placeholder={search.label}
						leadingIcon={<LuSearch size={16} />}
						onChange={(event) => search.onChange(event.target.value)}
					/>
				</div>
				{searchAction}
				<Button
					className="lg:hidden"
					onClick={() => setSheetOpen(true)}
					aria-haspopup="dialog"
				>
					<LuListFilter size={16} aria-hidden="true" />
					{activeCount > 0 ? t("filtersWithCount", { count: activeCount }) : t("filters")}
				</Button>
				<Dialog open={sheetOpen} onClose={() => setSheetOpen(false)} title={sheetTitle}>
					<FilterSheetBody
						fields={fields}
						values={values}
						applyLabel={applyLabel}
						onApply={applyDraft}
						onClose={() => setSheetOpen(false)}
					/>
				</Dialog>
				<span className="text-muted max-lg:order-last max-lg:basis-full">{summary}</span>
				{hasFilters && (
					<Button variant="link" onClick={onClear} className="px-1! max-lg:order-last">
						{t("clearFilters")}
					</Button>
				)}
				{trailing && (
					<div className="ms-auto max-lg:order-last max-lg:flex max-lg:basis-full max-lg:justify-end">
						{trailing}
					</div>
				)}
			</div>
		</section>
	);
}
