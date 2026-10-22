"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { redirectTarget } from "@/service/legacyRedirect";
import { setActivePlaythroughId, storageService } from "@/service/store";
import { Skeleton } from "@/comps/ui/Skeleton";

interface ActivateAndRedirectProps {
	playthroughId: string;
	to: string;
}

/**
 * Opening an old address makes its playthrough the active one, as the old app did. An id that no
 * longer exists changes nothing.
 */
export function ActivateAndRedirect({ playthroughId, to }: ActivateAndRedirectProps) {
	const router = useRouter();

	useEffect(() => {
		const exists = storageService.load().playthroughs.some(({ id }) => id === playthroughId);
		if (exists) setActivePlaythroughId(playthroughId);

		router.replace(redirectTarget(to, window.location.search));
	}, [playthroughId, to, router]);

	return <Skeleton className="m-4 h-40" />;
}
