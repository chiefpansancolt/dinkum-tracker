"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import type { Toggle } from "@/comps/collect/CollectionPanel";
import { GotCheckbox } from "@/comps/collect/GotCheckbox";
import { RowsOnScroll } from "@/comps/collect/RowsOnScroll";
import { ItemIcon } from "@/comps/ui/ItemIcon";

interface Column<Item> {
	id: string;
	label: string;
	align?: "end";
	render: (item: Item) => ReactNode;
}

interface WardrobeTableProps<Item extends { id: string; name: string; img: string }> {
	items: Item[];
	total: number;
	toggleOf: (item: Item) => Toggle;
	columns: Column<Item>[];
	mobileDetail: (item: Item) => ReactNode;
	mobileValue: (item: Item) => ReactNode;
}

const HEADER_CELL =
	"px-3 py-2 text-start font-mono text-[11px] font-normal tracking-[0.08em] uppercase";

/** Rows load as the player scrolls, because a tab can have hundreds of items. */
export function WardrobeTable<Item extends { id: string; name: string; img: string }>({
	items,
	total,
	toggleOf,
	columns,
	mobileDetail,
	mobileValue,
}: WardrobeTableProps<Item>) {
	const t = useTranslations("collect.list");

	return (
		<RowsOnScroll items={items}>
			{(visible) => (
				<>
					<div className="border-line bg-surface hidden overflow-x-auto rounded-md border-[1.5px] lg:block">
						<table className="w-full">
							<thead className="text-muted">
								<tr>
									<th scope="col" className={HEADER_CELL}>
										{t("got")}
									</th>
									<th scope="col" className={HEADER_CELL} colSpan={2}>
										{t("name")}
									</th>
									{columns.map((column) => (
										<th
											key={column.id}
											scope="col"
											className={`${HEADER_CELL} ${column.align === "end" ? "text-end" : ""}`}
										>
											{column.label}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{visible.map((item) => {
									const toggle = toggleOf(item);
									return (
										<tr
											key={item.id}
											className={`border-line border-t ${toggle.checked ? "bg-tint" : ""}`}
										>
											<td className="w-14 py-2 ps-3">
												<GotCheckbox
													checked={toggle.checked}
													itemName={item.name}
													onChange={toggle.onChange}
												/>
											</td>
											<td className="w-12 py-2">
												<span className="bg-track flex size-9 items-center justify-center rounded-md">
													<ItemIcon src={item.img} size={28} />
												</span>
											</td>
											<th
												scope="row"
												className="px-3 py-2 text-start font-semibold"
											>
												{item.name}
											</th>
											{columns.map((column) => (
												<td
													key={column.id}
													className={`px-3 py-2 ${column.align === "end" ? "text-end font-mono" : ""}`}
												>
													{column.render(item)}
												</td>
											))}
										</tr>
									);
								})}
							</tbody>
						</table>
						<p className="text-muted border-line flex flex-wrap justify-between gap-2 border-t px-3 py-2 text-sm">
							<span>{t("caption", { shown: visible.length, total })}</span>
							<span className="font-mono">{t("prices")}</span>
						</p>
					</div>
					<ul className="flex flex-col gap-2 lg:hidden">
						{visible.map((item) => {
							const toggle = toggleOf(item);
							return (
								<li
									key={item.id}
									className={`border-line flex items-center gap-3 rounded-md border-[1.5px] p-2.5 ${
										toggle.checked ? "bg-tint" : "bg-surface"
									}`}
								>
									<GotCheckbox
										checked={toggle.checked}
										itemName={item.name}
										onChange={toggle.onChange}
									/>
									<span className="bg-track flex size-9 shrink-0 items-center justify-center rounded-md">
										<ItemIcon src={item.img} size={28} />
									</span>
									<span className="flex min-w-0 flex-1 flex-col items-start gap-1">
										<span className="font-semibold">{item.name}</span>
										{mobileDetail(item)}
									</span>
									<span className="font-mono">{mobileValue(item)}</span>
								</li>
							);
						})}
					</ul>
				</>
			)}
		</RowsOnScroll>
	);
}
