"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function FAB() {
    const pathname = usePathname();

    if (pathname !== "/" && pathname !== "/playthroughs") {
        return null;
    }

    return (
        <Link
            href="/new-playthrough"
            className="fixed right-6 bottom-6 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors z-10"
            aria-label="Create new playthrough"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </Link>
    );
}
