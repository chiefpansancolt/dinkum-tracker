"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import { IconButton } from "@/comps/ui/IconButton";

const linkClasses = "hover:text-primary flex min-h-11 items-center lg:min-h-9";

export function LandingHeader() {
	const t = useTranslations("landing.header");
	const [open, setOpen] = useState(false);

	const links = (
		<>
			<a href="#features" className={linkClasses} onClick={() => setOpen(false)}>
				{t("features")}
			</a>
			<a href="#track" className={linkClasses} onClick={() => setOpen(false)}>
				{t("track")}
			</a>
		</>
	);

	return (
		<header className="border-line bg-surface sticky top-0 z-20 border-b-[1.5px]">
			<div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 lg:px-8">
				<Link href="/" className="flex min-h-11 items-center gap-2.5">
					<Image
						src="/dinkum_d_logo.png"
						alt=""
						width={32}
						height={32}
						className="block size-8 shrink-0 rounded-md"
					/>
					<span className="flex flex-col leading-tight">
						{/* i18n-ignore */}
						<span className="text-base font-semibold">Dinkum</span>
						<span className="text-muted font-mono text-[11px] tracking-[0.08em] uppercase">
							{/* i18n-ignore */}
							Tracker
						</span>
					</span>
				</Link>
				<nav aria-label={t("nav")} className="hidden items-center gap-6 lg:flex">
					{links}
				</nav>
				<div className="hidden items-center gap-2 lg:flex">
					<Link
						href="/playthroughs"
						className="border-line bg-surface hover:bg-tint inline-flex min-h-9 items-center rounded-md border-[1.5px] px-3 font-medium"
					>
						{t("view")}
					</Link>
					<Link
						href="/playthroughs/new"
						className="bg-primary text-on-primary inline-flex min-h-9 items-center rounded-md px-3 font-medium"
					>
						{t("new")}
					</Link>
				</div>
				<IconButton
					label={open ? t("menuClose") : t("menuOpen")}
					onClick={() => setOpen(!open)}
					className="lg:hidden"
					aria-expanded={open}
				>
					{open ? (
						<LuX size={22} aria-hidden="true" />
					) : (
						<LuMenu size={22} aria-hidden="true" />
					)}
				</IconButton>
			</div>
			{open && (
				<div className="border-line flex flex-col gap-1 border-t px-4 pt-2 pb-4 lg:hidden">
					<nav aria-label={t("nav")} className="flex flex-col">
						{links}
					</nav>
					<Link
						href="/playthroughs"
						className="border-line bg-surface mt-2 inline-flex min-h-11 items-center justify-center rounded-md border-[1.5px] px-4 font-semibold"
					>
						{t("view")}
					</Link>
					<Link
						href="/playthroughs/new"
						className="bg-primary text-on-primary inline-flex min-h-11 items-center justify-center rounded-md px-4 font-semibold"
					>
						{t("new")}
					</Link>
				</div>
			)}
		</header>
	);
}
