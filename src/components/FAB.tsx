"use client";

import { usePathname } from "next/navigation";
import { Button } from "flowbite-react";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";

export default function FAB() {
	const pathname = usePathname();

	if (pathname !== "/" && pathname !== "/playthroughs") {
		return null;
	}

	return (
		<Button
			as={Link}
			href="/playthrough/new"
			color="accent"
			className="fixed right-6 bottom-6 z-10 flex h-14 w-14 items-center justify-center rounded-full p-0 shadow-lg"
			aria-label="Create new playthrough"
		>
			<HiPlus className="h-6 w-6" />
		</Button>
	);
}
