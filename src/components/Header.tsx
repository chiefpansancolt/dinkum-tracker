"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPlaythroughs, Playthrough } from "../lib/localStorage";

export default function Header() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [recentPlaythroughs, setRecentPlaythroughs] = useState<Playthrough[]>([]);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const allPlaythroughs = getPlaythroughs();
        const sortedPlaythroughs = allPlaythroughs
            .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
            .slice(0, 5);
        setRecentPlaythroughs(sortedPlaythroughs);
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="header shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <Link href="/" className="text-2xl font-bold hover:text-highlight transition-colors">
                        Dinkum Tracker
                    </Link>

                    <nav className="mt-4 md:mt-0">
                        <ul className="flex space-x-6">
                            <li>
                                <Link
                                    href="/"
                                    className={`hover:text-highlight transition-colors ${
                                        pathname === "/" ? "font-bold underline" : ""
                                    }`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="hover:text-highlight transition-colors flex items-center"
                                >
                                    Save Games
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-1"
                                    >
                                        <polyline points="6 9 12 15 18 9"></polyline>
                                    </svg>
                                </button>
                                {isMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-20">
                                        <div className="py-1">
                                            {recentPlaythroughs.length > 0 ? (
                                                recentPlaythroughs.map((playthrough) => (
                                                    <Link
                                                        key={playthrough.id}
                                                        href={`/playthrough/${playthrough.id}`}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {playthrough.name}
                                                    </Link>
                                                ))
                                            ) : (
                                                <div className="px-4 py-2 text-sm text-gray-500">
                                                    No recent playthroughs
                                                </div>
                                            )}
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <Link
                                                href="/playthroughs"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                View all playthroughs
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
