"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useSync } from "@/lib/contexts/SyncContext";

export function SyncChip() {
	const t = useTranslations("sync.status");
	const { available, status, conflicts } = useSync();
	if (!available || status === "signedOut") return null;

	const conflict = conflicts.length > 0;
	const dot = conflict
		? "bg-warn"
		: status === "idle"
			? "bg-success"
			: status === "syncing"
				? "bg-primary"
				: "bg-warn";

	return (
		<Link
			href="/settings?tab=sync"
			className="border-line bg-surface text-muted hover:bg-tint inline-flex h-8 items-center gap-2 rounded-full border-[1.5px] px-3 text-xs"
		>
			<span aria-hidden="true" className={`${dot} size-1.5 rounded-full`} />
			{conflict ? t("conflicts") : t(status)}
		</Link>
	);
}
