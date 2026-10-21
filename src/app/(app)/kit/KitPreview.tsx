"use client";

import { useState } from "react";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { CommerceLevelControl } from "@/comps/page/CommerceLevelControl";
import { FilterBlock } from "@/comps/page/FilterBlock";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";
import { Card } from "@/comps/ui/Card";
import { SegmentedControl } from "@/comps/ui/SegmentedControl";
import { StatTile } from "@/comps/ui/StatTile";
import { Tabs } from "@/comps/ui/Tabs";
import { useToast } from "@/comps/ui/Toast";

const TABS = [
	{ id: "fish", label: "Fish", count: 45 },
	{ id: "bugs", label: "Bugs", count: 50 },
	{ id: "critters", label: "Critters", count: 25 },
] as const;

type TabId = (typeof TABS)[number]["id"];

const FIELDS = [
	{
		id: "biome",
		label: "Biome",
		options: [
			{ id: "all", label: "All biomes" },
			{ id: "ocean", label: "Ocean" },
			{ id: "river", label: "River" },
		],
	},
	{
		id: "rarity",
		label: "Rarity",
		options: [
			{ id: "all", label: "All rarities" },
			{ id: "rare", label: "Rare" },
		],
	},
];

export function KitPreview() {
	const showToast = useToast();
	const { update } = usePlaythrough();
	const [tab, setTab] = useState<TabId>("fish");
	const [status, setStatus] = useState("missing");
	const [search, setSearch] = useState("");
	const [filters, setFilters] = useState<Record<string, string>>({});

	return (
		<PlaythroughGate title="Kit">
			{(playthrough) => (
				<>
					<PageHeader
						title="Kit"
						subline={`Temporary page for the foundation phase. ${playthrough.name}`}
					/>
					<div className="grid gap-3 sm:grid-cols-3">
						<StatTile label="Caught" value="12 of 45" progress={12 / 45} />
						<StatTile label="Donated" value="3 of 45" progress={3 / 45} emphasis />
						<StatTile label="Total" value="38%" />
					</div>
					<Tabs
						label="Pedia sections"
						tabs={TABS.map((item) => ({ ...item }))}
						activeId={tab}
						onChange={setTab}
					>
						<CommerceLevelControl />
						<FilterBlock
							fields={FIELDS}
							values={filters}
							onChange={(id, value) =>
								setFilters((current) => ({ ...current, [id]: value }))
							}
							onClear={() => {
								setFilters({});
								setSearch("");
							}}
							search={{
								label: "Search fish by name",
								value: search,
								onChange: setSearch,
							}}
							summary={`Showing 8 of 45 ${tab}`}
							sheetTitle="Filter fish"
							applyLabel={() => "Show 8 fish"}
						/>
						<Card className="flex max-w-xs flex-col gap-3 p-4">
							<span className="font-semibold">Anchovy</span>
							<div className="flex flex-wrap gap-2">
								<Badge tone="common">Common</Badge>
								<Badge tone="uncommon">Uncommon</Badge>
								<Badge tone="rare">Rare</Badge>
								<Badge tone="superRare">Super rare</Badge>
								<Badge tone="veryRare">Very rare</Badge>
							</div>
							<SegmentedControl
								fullWidth
								label="Status"
								value={status}
								onChange={setStatus}
								options={[
									{ id: "missing", label: "Missing" },
									{ id: "caught", label: "Caught" },
									{ id: "donated", label: "Donated" },
								]}
							/>
						</Card>
					</Tabs>
					<div className="flex flex-wrap gap-2">
						<Button
							onClick={() =>
								showToast({
									variant: "success",
									title: "Level cleared",
									action: { label: "Undo", onAction: () => {} },
								})
							}
						>
							Show Undo toast
						</Button>
						<Button
							onClick={() =>
								update((current) => ({
									...current,
									skillLevels: {
										...current.skillLevels,
										fishing: current.skillLevels.fishing + 1,
									},
								}))
							}
						>
							Raise fishing skill
						</Button>
					</div>
				</>
			)}
		</PlaythroughGate>
	);
}
