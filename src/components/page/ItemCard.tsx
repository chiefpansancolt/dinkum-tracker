"use client";

import { useId } from "react";
import type { ReactNode } from "react";
import { LuCheck } from "react-icons/lu";
import { Card } from "@/comps/ui/Card";
import { ItemIcon } from "@/comps/ui/ItemIcon";

export interface ItemCardField {
	label: string;
	value: ReactNode;
	mono?: boolean;
	/** Left out on a phone, where the same value sits at the top right of the card. */
	desktopOnly?: boolean;
	/** The value sits under its label and may use the full width, for long text. */
	stacked?: boolean;
	/** A small picture before the value, such as the portrait of an NPC. */
	icon?: string;
}

interface ItemCardProps {
	img?: string;
	name: string;
	badge?: ReactNode;
	/** Shown at the top right on a phone only. */
	mobileValue?: ReactNode;
	/** A control at the top right, such as Complete All. */
	headerAction?: ReactNode;
	/** A line of text under the name, such as what a machine does. */
	description?: string;
	fields?: ItemCardField[];
	/** Content between the fields and the footer, such as the levels of a license. */
	children?: ReactNode;
	footer?: ReactNode;
	/** A green border, for an item that is fully done. */
	highlighted?: boolean;
	/** A check on the picture, for an item the player has. */
	checked?: boolean;
}

/** The card of one item on a list page: picture, name, fields and one control at the bottom. */
export function ItemCard({
	img,
	name,
	badge,
	mobileValue,
	headerAction,
	description,
	fields = [],
	children,
	footer,
	highlighted = false,
	checked = false,
}: ItemCardProps) {
	const titleId = useId();

	return (
		<Card
			role="group"
			aria-labelledby={titleId}
			highlighted={highlighted}
			className="flex flex-col gap-3 p-3.5"
		>
			<div className="flex items-start gap-3">
				<span className="bg-track relative flex size-11 shrink-0 items-center justify-center rounded-md">
					<ItemIcon src={img} size={36} />
					{checked && (
						<span className="bg-primary text-on-primary absolute -end-1 -bottom-1 flex size-5 items-center justify-center rounded-full">
							<LuCheck size={12} aria-hidden="true" />
							<span className="sr-only">✓</span>
						</span>
					)}
				</span>
				<div className="flex min-w-0 flex-1 flex-col items-start gap-1">
					<h2 id={titleId} className="font-semibold">
						{name}
					</h2>
					{badge}
				</div>
				{mobileValue && <span className="font-mono sm:hidden">{mobileValue}</span>}
				{headerAction}
			</div>
			{description && <p className="text-muted whitespace-pre-line">{description}</p>}
			{fields.length > 0 && (
				<dl className="flex flex-col gap-1.5">
					{fields.map((field) => (
						<div
							key={field.label}
							className={`flex ${field.stacked ? "flex-col gap-0.5" : "justify-between gap-3"} ${
								field.desktopOnly ? "max-sm:hidden" : ""
							}`}
						>
							<dt className="text-muted">{field.label}</dt>
							<dd
								className={`flex items-center gap-1.5 ${field.stacked ? "" : "justify-end text-end"} ${
									field.mono ? "font-mono" : ""
								}`}
							>
								{field.icon && <ItemIcon src={field.icon} size={20} />}
								{field.value}
							</dd>
						</div>
					))}
				</dl>
			)}
			{children}
			{footer && <div className="mt-auto">{footer}</div>}
		</Card>
	);
}
