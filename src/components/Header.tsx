"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

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
                            <li>
                                <Link
                                    href="/playthroughs"
                                    className={`hover:text-highlight transition-colors ${
                                        pathname === "/playthroughs" ? "font-bold underline" : ""
                                    }`}
                                >
                                    My Playthroughs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/new-playthrough"
                                    className={`hover:text-highlight transition-colors ${
                                        pathname === "/new-playthrough" ? "font-bold underline" : ""
                                    }`}
                                >
                                    New Playthrough
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}
