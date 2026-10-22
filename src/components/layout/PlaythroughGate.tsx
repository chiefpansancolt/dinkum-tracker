"use client";

import { useTranslations } from "next-intl";
import { Suspense } from "react";
import type { ReactNode } from "react";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { ButtonLink } from "@/comps/ui/Button";
import { EmptyState } from "@/comps/ui/EmptyState";
import { Skeleton } from "@/comps/ui/Skeleton";
import { PageHeader } from "./PageHeader";

interface PlaythroughGateProps {
	title: string;
	children: (playthrough: Playthrough) => ReactNode;
}

/** The Suspense boundary lets the views read their tab from the address with `useUrlTab`. */
export function PlaythroughGate({ title, children }: PlaythroughGateProps) {
	const t = useTranslations("shell.playthroughGate");
	const { activePlaythrough, isLoaded } = usePlaythrough();

	if (!isLoaded) {
		return (
			<>
				<PageHeader title={title} />
				<Skeleton className="h-40" />
			</>
		);
	}

	if (!activePlaythrough) {
		return (
			<>
				<PageHeader title={title} />
				<EmptyState
					title={t("emptyTitle")}
					description={t("emptyDescription")}
					actions={
						<ButtonLink href="/playthroughs?new=1" variant="primary">
							{t("newPlaythrough")}
						</ButtonLink>
					}
				/>
			</>
		);
	}

	return <Suspense fallback={null}>{children(activePlaythrough)}</Suspense>;
}
