"use client";

import { Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuChevronsUpDown, LuPlus } from "react-icons/lu";
import { Playthrough } from "@/types/app";
import { setActivePlaythroughId } from "@/lib/localStorage";

interface Props {
	playthroughs: Playthrough[];
	activeId: string | null;
	onSelect: (id: string) => void;
}

export default function PlaythroughSwitcher({ playthroughs, activeId, onSelect }: Props) {
	const router = useRouter();

	const activePlaythrough = activeId
		? (playthroughs.find((p) => p.id === activeId) ?? null)
		: null;

	const handleSelect = (id: string) => {
		if (id === activeId) return;
		setActivePlaythroughId(id);
		onSelect(id);
		router.push(`/playthrough/${id}`);
	};

	return (
		<div className="mb-2">
			<Dropdown
				dismissOnClick={true}
				renderTrigger={() => (
					<button
						type="button"
						className="flex w-full cursor-pointer items-center gap-2 rounded-lg p-2 text-left hover:bg-white/10 focus:outline-none"
					>
						<div className="bg-primary flex size-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white">
							{activePlaythrough
								? (activePlaythrough.name[0]?.toUpperCase() ?? "?")
								: "?"}
						</div>
						<div className="min-w-0 flex-1">
							<span className="block truncate text-sm font-medium text-white">
								{activePlaythrough?.name ?? "No Playthrough Selected"}
							</span>
						</div>
						<LuChevronsUpDown className="size-4 shrink-0 text-white/70" />
					</button>
				)}
			>
				<DropdownHeader>Playthroughs</DropdownHeader>
				{playthroughs.length === 0 ? (
					<DropdownItem disabled>No playthroughs yet</DropdownItem>
				) : (
					playthroughs.map((playthrough) => (
						<DropdownItem
							key={playthrough.id}
							onClick={() => handleSelect(playthrough.id)}
						>
							<div className="flex w-full items-center gap-2">
								<span className="truncate">{playthrough.name}</span>
								{playthrough.id === activeId && (
									<span className="text-primary ml-auto text-xs font-medium">
										Active
									</span>
								)}
							</div>
						</DropdownItem>
					))
				)}
				<DropdownDivider />
				<DropdownItem as={Link} href="/playthrough/new">
					<div className="flex items-center gap-2">
						<div className="flex size-6 items-center justify-center rounded-md border border-gray-300 bg-transparent dark:border-gray-600">
							<LuPlus className="size-4" />
						</div>
						<span className="font-medium text-gray-500 dark:text-gray-400">
							Add Playthrough
						</span>
					</div>
				</DropdownItem>
			</Dropdown>
		</div>
	);
}
