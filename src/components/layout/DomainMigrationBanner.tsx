"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiArrowRight, HiX } from "react-icons/hi";

const DISMISSED_KEY = "dinkum-tracker-domain-migration-dismissed";

export default function DomainMigrationBanner() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const dismissed = localStorage.getItem(DISMISSED_KEY);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		if (!dismissed) setVisible(true);
	}, []);

	const handleDismiss = () => {
		localStorage.setItem(DISMISSED_KEY, "true");
		setVisible(false);
	};

	if (!visible) return null;

	return (
		<div className="border-b border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20">
			<div className="flex items-start gap-3 px-4 py-3">
				<div className="flex-1 text-sm text-yellow-800 dark:text-yellow-300">
					<span className="font-semibold">Domain change notice:</span> Dinkum Tracker has
					moved to <span className="font-mono font-semibold">dinkum.gamerdex.app</span>.
					Your saved data will not transfer automatically — please{" "}
					<Link href="/settings" className="font-semibold underline hover:no-underline">
						export your data
					</Link>{" "}
					from this site, then import it on the new domain.
					<a
						href="https://dinkum.gamerdex.app"
						target="_blank"
						rel="noopener noreferrer"
						className="ml-2 inline-flex items-center gap-1 font-semibold underline hover:no-underline"
					>
						Go to new site
						<HiArrowRight className="h-3.5 w-3.5" />
					</a>
				</div>
				<button
					onClick={handleDismiss}
					aria-label="Dismiss"
					className="mt-0.5 shrink-0 cursor-pointer text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-100"
				>
					<HiX className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
}
