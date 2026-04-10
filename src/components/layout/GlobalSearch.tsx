"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { HiSearch } from "react-icons/hi";
import { getActivePlaythroughId } from "@/lib/localStorage";
import { SearchEntry, searchIndex } from "@/lib/searchIndex";

export default function GlobalSearch() {
	const [activeId, setActiveId] = useState<string | null>(null);
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<SearchEntry[]>([]);
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setActiveId(getActivePlaythroughId());

		const handleStorage = () => {
			setActiveId(getActivePlaythroughId());
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);

	useEffect(() => {
		const q = query.toLowerCase().trim();
		if (!q) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setResults([]);
			setActiveIndex(-1);
			return;
		}
		const startsWith = searchIndex.filter((e) => e.nameLower.startsWith(q));
		const contains = searchIndex.filter(
			(e) => !e.nameLower.startsWith(q) && e.nameLower.includes(q),
		);
		setResults([...startsWith, ...contains].slice(0, 8));
		setActiveIndex(-1);
	}, [query]);

	const navigate = (entry: SearchEntry) => {
		const url = entry.noQuery
			? `/playthrough/${activeId}/${entry.route}`
			: `/playthrough/${activeId}/${entry.route}?q=${encodeURIComponent(entry.name)}`;
		window.location.href = url;
		setQuery("");
		setResults([]);
		setOpen(false);
		setActiveIndex(-1);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!open || results.length === 0) return;

		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => Math.min(i + 1, results.length - 1));
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => Math.max(i - 1, 0));
		} else if (e.key === "Enter") {
			e.preventDefault();
			const target = activeIndex >= 0 ? results[activeIndex] : results[0];
			if (target) navigate(target);
		} else if (e.key === "Escape") {
			setQuery("");
			setResults([]);
			setOpen(false);
			inputRef.current?.blur();
		}
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	if (!activeId) return null;

	return (
		<div ref={containerRef} className="relative w-full max-w-lg mx-auto">
			<div className="relative">
				<HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70 pointer-events-none" />
				<input
					ref={inputRef}
					type="text"
					value={query}
					onChange={(e) => {
						setQuery(e.target.value);
						setOpen(true);
					}}
					onFocus={() => setOpen(true)}
					onKeyDown={handleKeyDown}
					placeholder="Search items..."
					className="w-full rounded-lg bg-black/25 border border-white/40 pl-9 pr-4 py-1.5 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-black/30"
				/>
			</div>

			{open && results.length > 0 && (
				<div className="absolute top-full mt-1 left-0 right-0 z-50 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-700 overflow-hidden">
					{results.map((entry, i) => (
						<button
							key={`${entry.route}-${entry.id}`}
							type="button"
							className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
								i === activeIndex
									? "bg-primary/10 dark:bg-primary/20"
									: "hover:bg-gray-50 dark:hover:bg-gray-600"
							}`}
							onMouseDown={(e) => e.preventDefault()}
							onClick={() => navigate(entry)}
						>
							<div className="relative h-8 w-8 shrink-0 overflow-hidden rounded">
								<Image
									src={entry.img}
									alt={entry.name}
									fill
									className="object-contain"
									sizes="32px"
								/>
							</div>
							<span className="flex-1 truncate font-medium text-gray-900 dark:text-white">
								{entry.name}
							</span>
							<span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-600 dark:text-gray-300">
								{entry.category}
							</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
