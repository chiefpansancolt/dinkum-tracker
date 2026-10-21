"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { LuPlus, LuSearch } from "react-icons/lu";
import type { Playthrough, PlaythroughSort } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { playthroughProgress } from "@/service/completion";
import { removePlaythrough } from "@/service/store";
import { PageHeader } from "@/comps/layout/PageHeader";
import { Button, ButtonLink } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { EmptyState } from "@/comps/ui/EmptyState";
import { Field } from "@/comps/ui/Field";
import { Input } from "@/comps/ui/Input";
import { Select } from "@/comps/ui/Select";
import { Skeleton } from "@/comps/ui/Skeleton";
import { StatTile } from "@/comps/ui/StatTile";
import { useToast } from "@/comps/ui/Toast";
import { DeletePlaythroughDialog } from "./DeletePlaythroughDialog";
import { EditPlaythroughDialog } from "./EditPlaythroughDialog";
import { NewPlaythroughDialog } from "./NewPlaythroughDialog";
import { PlaythroughCard } from "./PlaythroughCard";

const SORT_OPTIONS: PlaythroughSort[] = ["lastUpdated", "name", "createdAt", "completion"];

interface Row {
	playthrough: Playthrough;
	percent: number;
	progress: ReturnType<typeof playthroughProgress>;
}

const timestamp = (iso: string) => Date.parse(iso) || 0;

const SORTERS: Record<PlaythroughSort, (a: Row, b: Row) => number> = {
	lastUpdated: (a, b) =>
		timestamp(b.playthrough.lastUpdated) - timestamp(a.playthrough.lastUpdated),
	name: (a, b) => a.playthrough.name.localeCompare(b.playthrough.name),
	createdAt: (a, b) => timestamp(b.playthrough.createdAt) - timestamp(a.playthrough.createdAt),
	completion: (a, b) => b.percent - a.percent,
};

export function PlaythroughsView() {
	const t = useTranslations("playthroughs");
	const common = useTranslations("common");
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const showToast = useToast();
	const {
		playthroughs,
		activePlaythrough,
		defaultSort,
		isLoaded,
		setActivePlaythrough,
		commit,
		restore,
	} = usePlaythrough();

	const [chosenSort, setChosenSort] = useState<PlaythroughSort | null>(null);
	const [search, setSearch] = useState("");
	const [editing, setEditing] = useState<Playthrough | null>(null);
	const [deleting, setDeleting] = useState<Playthrough | null>(null);
	// The address holds the open state, so a link to ?new=1 opens the dialog even from this page.
	const creating = searchParams.get("new") === "1";

	const sort = chosenSort ?? defaultSort;

	const rows = useMemo<Row[]>(
		() =>
			playthroughs.map((playthrough) => {
				const progress = playthroughProgress(playthrough);
				return { playthrough, progress, percent: progress.overallPercent };
			}),
		[playthroughs]
	);

	const visibleRows = useMemo(() => {
		const query = search.trim().toLowerCase();
		return rows
			.filter((row) => row.playthrough.name.toLowerCase().includes(query))
			.sort(SORTERS[sort]);
	}, [rows, search, sort]);

	const openCreate = () => router.push(`${pathname}?new=1`);
	const closeCreate = () => router.replace(pathname);

	const handleDelete = (playthrough: Playthrough) => {
		let removed: ReturnType<typeof removePlaythrough> = null;
		const saved = commit(() => {
			removed = removePlaythrough(playthrough.id);
			return removed !== null;
		});
		if (!saved || !removed) return;

		const { index, wasActive } = removed;
		showToast({
			variant: "success",
			title: t("delete.toast", { name: playthrough.name }),
			message: t("delete.toastMessage"),
			action: {
				label: common("undo"),
				onAction: () => {
					restore(playthrough, index);
					if (wasActive) setActivePlaythrough(playthrough.id);
				},
			},
		});
	};

	const activeRow = rows.find((row) => row.playthrough.id === activePlaythrough?.id);
	const furthest = rows.reduce<Row | null>(
		(best, row) => (best === null || row.percent > best.percent ? row : best),
		null
	);
	const average = rows.length
		? Math.round(rows.reduce((sum, row) => sum + row.percent, 0) / rows.length)
		: 0;

	const deletingNextName =
		deleting && deleting.id === activePlaythrough?.id
			? ([...rows]
					.filter((row) => row.playthrough.id !== deleting.id)
					.sort(SORTERS.lastUpdated)[0]?.playthrough.name ?? null)
			: null;

	const subline = !isLoaded
		? ""
		: rows.length === 0
			? t("sublineEmpty")
			: activePlaythrough
				? t("subline", { count: rows.length, name: activePlaythrough.name })
				: t("sublineNoneActive", { count: rows.length });

	return (
		<>
			<PageHeader title={t("title")} subline={subline} />

			{isLoaded && rows.length > 0 && (
				<div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
					<StatTile
						label={t("stats.playthroughs")}
						value={rows.length}
						caption={t("stats.playthroughsCaption")}
						progress={1}
					/>
					<StatTile
						label={t("stats.active")}
						value={activeRow ? `${activeRow.percent}%` : t("stats.noneActive")}
						caption={activeRow ? activeRow.playthrough.name : undefined}
						progress={activeRow ? activeRow.percent / 100 : 0}
					/>
					<StatTile
						label={t("stats.furthest")}
						value={`${furthest?.percent ?? 0}%`}
						caption={furthest?.playthrough.name}
						progress={(furthest?.percent ?? 0) / 100}
					/>
					<StatTile
						label={t("stats.average")}
						value={`${average}%`}
						caption={t("stats.averageCaption")}
						progress={average / 100}
					/>
				</div>
			)}

			<Card className="flex flex-col gap-3 p-4">
				<div className="grid gap-3 sm:grid-cols-[14rem_1fr]">
					<Field label={t("filters.sortBy")}>
						<Select
							value={sort}
							onChange={(event) =>
								setChosenSort(event.target.value as PlaythroughSort)
							}
						>
							{SORT_OPTIONS.map((option) => (
								<option key={option} value={option}>
									{t(`filters.sort.${option}`)}
								</option>
							))}
						</Select>
					</Field>
					<div className="sm:self-end">
						<Input
							type="search"
							value={search}
							aria-label={t("filters.search")}
							placeholder={t("filters.search")}
							leadingIcon={<LuSearch size={16} />}
							onChange={(event) => setSearch(event.target.value)}
						/>
					</div>
				</div>
				<div className="text-muted flex flex-wrap justify-between gap-x-4 gap-y-1">
					<span>
						{t("filters.showing", { shown: visibleRows.length, total: rows.length })}
					</span>
					<span>
						{t.rich("filters.defaultSortFrom", {
							link: (chunks) => (
								<Link href="/settings" className="text-link underline">
									{chunks}
								</Link>
							),
						})}
					</span>
				</div>
			</Card>

			{!isLoaded ? (
				<div role="status" className="grid gap-4 lg:grid-cols-2">
					<span className="sr-only">{t("loading")}</span>
					<Skeleton className="h-96" />
					<Skeleton className="h-96" />
				</div>
			) : rows.length === 0 ? (
				<EmptyState
					title={t("empty.title")}
					description={t("empty.description")}
					actions={
						<>
							<Button variant="primary" onClick={openCreate}>
								<LuPlus size={16} aria-hidden="true" />
								{t("empty.create")}
							</Button>
							<ButtonLink href="/settings" variant="link">
								{t("empty.importBackup")}
							</ButtonLink>
						</>
					}
				/>
			) : visibleRows.length === 0 ? (
				<EmptyState
					title={t("noMatch.title", { query: search.trim() })}
					description={t("noMatch.description")}
					actions={<Button onClick={() => setSearch("")}>{t("noMatch.clear")}</Button>}
				/>
			) : (
				<div className="grid grid-cols-1 items-start gap-4 pb-16 lg:grid-cols-2">
					{visibleRows.map(({ playthrough, progress }) => (
						<PlaythroughCard
							key={playthrough.id}
							playthrough={playthrough}
							progress={progress}
							isActive={playthrough.id === activePlaythrough?.id}
							onSetActive={() => {
								setActivePlaythrough(playthrough.id);
								router.push("/overview");
							}}
							onEdit={() => setEditing(playthrough)}
							onDelete={() => setDeleting(playthrough)}
						/>
					))}
				</div>
			)}

			<div className="pointer-events-none sticky bottom-4 z-30 mt-auto flex justify-end">
				<Button
					variant="primary"
					onClick={openCreate}
					className="pointer-events-auto rounded-full px-5 shadow-lg"
				>
					<LuPlus size={18} aria-hidden="true" />
					<span className="max-sm:hidden">{t("new.action")}</span>
					<span className="sm:hidden">{t("new.actionShort")}</span>
				</Button>
			</div>

			<NewPlaythroughDialog open={creating} onClose={closeCreate} />
			<EditPlaythroughDialog playthrough={editing} onClose={() => setEditing(null)} />
			<DeletePlaythroughDialog
				playthrough={deleting}
				percent={rows.find((row) => row.playthrough.id === deleting?.id)?.percent ?? 0}
				isActive={deleting?.id === activePlaythrough?.id}
				nextActiveName={deletingNextName}
				onConfirm={handleDelete}
				onClose={() => setDeleting(null)}
			/>
		</>
	);
}
