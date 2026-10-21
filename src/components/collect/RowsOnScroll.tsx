"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const FIRST_ROWS = 60;
const ROWS_PER_STEP = 60;

interface RowsOnScrollProps<Item> {
	items: Item[];
	children: (visible: Item[]) => ReactNode;
}

/** Gives the first rows of a long list, and the next rows when the end of the list comes into view. */
export function RowsOnScroll<Item>({ items, children }: RowsOnScrollProps<Item>) {
	const [count, setCount] = useState(FIRST_ROWS);
	const endRef = useRef<HTMLDivElement>(null);
	const hasMore = count < items.length;

	useEffect(() => {
		const end = endRef.current;
		if (!hasMore || !end) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((entry) => entry.isIntersecting)) {
					setCount((current) => current + ROWS_PER_STEP);
				}
			},
			{ rootMargin: "400px" }
		);
		observer.observe(end);
		return () => observer.disconnect();
	}, [hasMore, count]);

	return (
		<>
			{children(items.slice(0, count))}
			{hasMore && <div ref={endRef} aria-hidden="true" className="h-px" />}
		</>
	);
}
