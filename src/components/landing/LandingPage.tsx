"use client";

import { formatNumber } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import type { IconType } from "react-icons";
import { LuCalendarDays, LuFish, LuPlus, LuSquareCheck, LuUsers } from "react-icons/lu";
import { COLLECTION_KEYS, collectionCounts } from "@/service/landing";
import { allNpcs } from "@/service/npcs";
import { allMilestones } from "@/service/progress";
import { Footer } from "@/comps/layout/Footer";
import { LandingHeader } from "./LandingHeader";

const primaryButton =
	"bg-primary text-on-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 font-semibold max-sm:w-full";
const secondaryButton =
	"border-line bg-surface hover:bg-tint inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-[1.5px] px-5 font-semibold max-sm:w-full";

const BLURBS: { id: "pedia" | "npcs" | "calendar"; Icon: IconType }[] = [
	{ id: "pedia", Icon: LuFish },
	{ id: "npcs", Icon: LuUsers },
	{ id: "calendar", Icon: LuCalendarDays },
];

const NEED_CARDS = ["milestones", "recipes", "collections"] as const;
const NEED_LINES = ["one", "two", "three"] as const;

export function LandingPage() {
	const t = useTranslations("landing");

	return (
		<div className="bg-bg text-ink flex min-h-dvh flex-col">
			<LandingHeader />
			<main id="main" tabIndex={-1} className="flex flex-col outline-none">
				<section
					id="features"
					className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-20"
				>
					<div className="flex flex-col items-start gap-5 max-sm:items-stretch">
						<span className="text-primary font-mono text-xs tracking-[0.08em] uppercase">
							{t("hero.eyebrow")}
						</span>
						<h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
							{t("hero.title")}
						</h1>
						<p className="text-muted max-w-xl text-lg">{t("hero.intro")}</p>
						<div className="flex flex-wrap gap-3 max-sm:flex-col">
							<Link href="/playthroughs" className={primaryButton}>
								{t("hero.view")}
							</Link>
							<Link href="/playthroughs/new" className={secondaryButton}>
								<LuPlus size={18} aria-hidden="true" />
								{t("hero.new")}
							</Link>
						</div>
					</div>
					<Image
						src="/Dinkum_Game_Image.png"
						alt={t("hero.imageAlt")}
						width={400}
						height={400}
						priority
						className="border-line w-full max-w-md justify-self-center rounded-lg border-[1.5px] lg:justify-self-end"
					/>
				</section>

				<section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 lg:px-8">
					<div className="flex max-w-2xl flex-col gap-3 text-center">
						<h2 className="text-3xl font-bold tracking-tight">{t("counts.title")}</h2>
						<p className="text-muted text-lg">{t("counts.intro")}</p>
					</div>
					<dl className="grid w-full grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
						{COLLECTION_KEYS.map((key) => (
							<div
								key={key}
								className="border-primary flex flex-col-reverse gap-1 border-s-[1.5px] ps-4"
							>
								<dt className="text-muted">{t(`counts.${key}`)}</dt>
								<dd className="font-mono text-4xl font-semibold">
									{formatNumber(collectionCounts[key])}
								</dd>
							</div>
						))}
					</dl>
				</section>

				<section id="track" className="border-line bg-surface border-y-[1.5px]">
					<div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:px-8 lg:py-16">
						<Image
							src="/Dinkum_Tracker_View.png"
							alt={t("everything.imageAlt")}
							width={400}
							height={800}
							className="border-line w-full max-w-md justify-self-center rounded-lg border-[1.5px]"
						/>
						<div className="flex flex-col gap-5">
							<h2 className="text-4xl font-bold tracking-tight">
								{t("everything.title")}
							</h2>
							<p className="text-muted text-lg">{t("everything.intro")}</p>
							<ul className="border-line flex flex-col gap-6 border-y py-6">
								{BLURBS.map(({ id, Icon }) => (
									<li key={id} className="flex gap-4">
										<span className="bg-tint text-primary flex size-9 shrink-0 items-center justify-center rounded-full">
											<Icon size={18} aria-hidden="true" />
										</span>
										<div className="flex flex-col gap-1">
											<h3 className="text-lg font-semibold">
												{t(`everything.${id}.title`)}
											</h3>
											<p className="text-muted">
												{id === "npcs"
													? t("everything.npcs.text", {
															count: allNpcs.length,
														})
													: t(`everything.${id}.text`)}
											</p>
										</div>
									</li>
								))}
							</ul>
							<p className="text-muted">{t("everything.closing")}</p>
						</div>
					</div>
				</section>

				<section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 py-12 lg:px-8 lg:py-16">
					<div className="flex max-w-2xl flex-col gap-3 text-center">
						<h2 className="text-3xl font-bold tracking-tight">{t("needs.title")}</h2>
						<p className="text-muted text-lg">{t("needs.intro")}</p>
					</div>
					<div className="grid w-full gap-4 lg:grid-cols-3">
						{NEED_CARDS.map((card) => (
							<section
								key={card}
								aria-label={t(`needs.${card}.title`)}
								className="border-line bg-surface flex flex-col gap-4 rounded-md border-[1.5px] p-5"
							>
								<h3 className="text-lg font-semibold">
									{t(`needs.${card}.title`)}
								</h3>
								<ul className="flex flex-col gap-3">
									{NEED_LINES.map((line) => (
										<li key={line} className="flex items-start gap-3">
											<LuSquareCheck
												size={20}
												aria-hidden="true"
												className="text-primary mt-0.5 shrink-0"
											/>
											<span>
												{card === "milestones" && line === "one"
													? t("needs.milestones.one", {
															count: allMilestones.length,
														})
													: t(`needs.${card}.${line}`)}
											</span>
										</li>
									))}
								</ul>
							</section>
						))}
					</div>
				</section>

				<section className="mx-auto w-full max-w-7xl px-4 pb-16 lg:px-8">
					<div className="border-primary bg-tint flex flex-col items-center gap-5 rounded-md border-[1.5px] px-5 py-12 text-center">
						<h2 className="text-3xl font-bold tracking-tight">{t("cta.title")}</h2>
						<p className="text-muted max-w-xl text-lg">{t("cta.text")}</p>
						<div className="flex flex-wrap justify-center gap-3 max-sm:w-full max-sm:flex-col">
							<Link href="/playthroughs/new" className={primaryButton}>
								{t("cta.create")}
							</Link>
							<Link href="/playthroughs" className={secondaryButton}>
								{t("cta.existing")}
							</Link>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
