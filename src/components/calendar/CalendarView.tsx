"use client";

import type { CalendarDay, Season } from "dinkum-data";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import type { Playthrough } from "@/types/app";
import { usePlaythrough } from "@/lib/contexts/PlaythroughContext";
import { DESKTOP_QUERY } from "@/lib/hooks/useMediaQuery";
import type { DayEntry, DayRef } from "@/service/calendar";
import {
	dayEntries,
	dayOf,
	sameDay,
	seasonCounts,
	seasonDays,
	shiftSeason,
} from "@/service/calendar";
import { getSeasonStyles } from "@/service/seasonalTheme";
import { PageHeader } from "@/comps/layout/PageHeader";
import { PlaythroughGate } from "@/comps/layout/PlaythroughGate";
import { Badge } from "@/comps/ui/Badge";
import { Button } from "@/comps/ui/Button";
import { Dialog } from "@/comps/ui/Dialog";
import { IconButton } from "@/comps/ui/IconButton";
import { useToast } from "@/comps/ui/Toast";

const WEEKDAY_ORDER = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
] as const;
const DESKTOP_ENTRIES = 2;
const MOBILE_DOTS = 3;

function Marker({ kind }: { kind: DayEntry["kind"] }) {
	return (
		<span
			aria-hidden="true"
			className={`inline-block size-2 shrink-0 ${
				kind === "event" ? "bg-success rounded-full" : "bg-info rounded-[2px]"
			}`}
		/>
	);
}

function EntryList({ entries }: { entries: DayEntry[] }) {
	return (
		<ul className="flex flex-col gap-2">
			{entries.map((entry) => (
				<li
					key={entry.name}
					className="border-line bg-surface flex items-start gap-3 rounded-md border-[1.5px] p-3"
				>
					<span className="mt-1.5">
						<Marker kind={entry.kind} />
					</span>
					<span className="flex flex-col">
						<span className="font-semibold">{entry.name}</span>
						{entry.detail && <span className="text-muted">{entry.detail}</span>}
					</span>
				</li>
			))}
		</ul>
	);
}

function DayDetails({ day, isCurrent }: { day: CalendarDay; isCurrent: boolean }) {
	const t = useTranslations("people.calendar.details");
	const entries = dayEntries(day);
	const events = entries.filter((entry) => entry.kind === "event");
	const birthdays = entries.filter((entry) => entry.kind === "birthday");

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between gap-3">
				<h2 className="text-xl font-semibold">
					{t("title", { weekday: day.weekday, day: day.day, season: day.season })}
				</h2>
				<Badge tone="common">{isCurrent ? t("current") : day.season}</Badge>
			</div>
			<div className="grid gap-4 lg:grid-cols-2">
				<section className="flex flex-col gap-2">
					<h3 className="font-semibold">{t("events")}</h3>
					{events.length > 0 ? (
						<EntryList entries={events} />
					) : (
						<p className="text-muted">{t("noEvents")}</p>
					)}
				</section>
				<section className="flex flex-col gap-2">
					<h3 className="font-semibold">{t("birthdays")}</h3>
					{birthdays.length > 0 ? (
						<EntryList entries={birthdays} />
					) : (
						<p className="text-muted">{t("noBirthdays")}</p>
					)}
				</section>
			</div>
		</div>
	);
}

interface DayCellProps {
	day: CalendarDay;
	isCurrent: boolean;
	isSelected: boolean;
	tint: string;
	onPick: () => void;
}

function DayCell({ day, isCurrent, isSelected, tint, onPick }: DayCellProps) {
	const t = useTranslations("people.calendar");
	const entries = dayEntries(day);
	const hidden = entries.length - DESKTOP_ENTRIES;

	return (
		<button
			type="button"
			onClick={onPick}
			aria-pressed={isSelected}
			className={`border-line flex min-h-14 flex-col items-start gap-1 overflow-hidden border-s border-b p-1.5 text-start lg:min-h-24 lg:p-2 ${
				isSelected ? tint : "bg-surface hover:bg-tint/60"
			}`}
		>
			<span
				className={`flex size-6 items-center justify-center rounded-full text-sm ${
					isCurrent ? "bg-primary text-on-primary font-semibold" : ""
				}`}
			>
				{day.day}
				<span className="sr-only"> {day.season}</span>
			</span>
			<span className="hidden w-full flex-col gap-0.5 lg:flex">
				{entries.slice(0, DESKTOP_ENTRIES).map((entry) => (
					<span key={entry.name} className="flex min-w-0 items-center gap-1.5 text-xs">
						<Marker kind={entry.kind} />
						<span className="truncate">{entry.name}</span>
					</span>
				))}
				{hidden > 0 && (
					<span className="text-muted text-xs">{t("more", { count: hidden })}</span>
				)}
			</span>
			<span className="flex gap-1 lg:hidden" aria-hidden="true">
				{entries.slice(0, MOBILE_DOTS).map((entry) => (
					<Marker key={entry.name} kind={entry.kind} />
				))}
			</span>
			{entries.length > 0 && (
				<span className="sr-only lg:hidden">
					{t("cellEntries", { count: entries.length })}
				</span>
			)}
		</button>
	);
}

function CalendarContent({ playthrough }: { playthrough: Playthrough }) {
	const t = useTranslations("people.calendar");
	const undo = useTranslations("common");
	const { update } = usePlaythrough();
	const showToast = useToast();

	const current: DayRef = {
		day: playthrough.calendar.currentDay,
		season: playthrough.calendar.currentSeason,
	};
	const [viewSeason, setViewSeason] = useState<Season>(current.season);
	const [selected, setSelected] = useState<DayRef>(current);
	const [sheetOpen, setSheetOpen] = useState(false);

	const styles = getSeasonStyles(viewSeason);
	const counts = seasonCounts(viewSeason);
	const days = seasonDays(viewSeason);

	const setCurrentDay = (next: DayRef) => {
		setSelected(next);
		if (!window.matchMedia(DESKTOP_QUERY).matches) setSheetOpen(true);
		if (sameDay(next, current)) return;

		const saved = update((value) => ({
			...value,
			calendar: { currentDay: next.day, currentSeason: next.season },
		}));
		if (!saved) return;

		showToast({
			key: "calendar-day",
			variant: "success",
			title: t("toast.set", { day: next.day, season: next.season }),
			action: {
				label: undo("undo"),
				onAction: () =>
					update((value) => ({
						...value,
						calendar: { currentDay: current.day, currentSeason: current.season },
					})),
			},
		});
	};

	const goToday = () => {
		setViewSeason(current.season);
		setSelected(current);
	};

	const selectedDay = dayOf(selected);

	return (
		<>
			<PageHeader
				title={t("title")}
				subline={t("subline", {
					season: viewSeason,
					events: counts.events,
					birthdays: counts.birthdays,
					name: playthrough.name,
				})}
			/>
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<IconButton
						label={t("previous")}
						onClick={() => setViewSeason(shiftSeason(viewSeason, -1))}
						className="border-line border-[1.5px]"
					>
						<LuChevronLeft size={20} aria-hidden="true" />
					</IconButton>
					<span
						aria-live="polite"
						className={`flex min-h-11 min-w-0 items-center justify-center rounded-md px-4 font-semibold max-lg:flex-1 lg:min-w-32 ${styles.bg} ${styles.text}`}
					>
						{viewSeason}
					</span>
					<IconButton
						label={t("next")}
						onClick={() => setViewSeason(shiftSeason(viewSeason, 1))}
						className="border-line border-[1.5px]"
					>
						<LuChevronRight size={20} aria-hidden="true" />
					</IconButton>
					<Button onClick={goToday}>{t("today")}</Button>
				</div>
				<ul className="text-muted flex flex-wrap items-center gap-4 max-lg:hidden">
					<li className="flex items-center gap-1.5">
						<Marker kind="event" />
						{t("legend.event")}
					</li>
					<li className="flex items-center gap-1.5">
						<Marker kind="birthday" />
						{t("legend.birthday")}
					</li>
					<li className="flex items-center gap-1.5">
						<span
							aria-hidden="true"
							className="bg-primary inline-block size-4 rounded-full"
						/>
						{t("legend.current")}
					</li>
				</ul>
			</div>
			<p className="border-line bg-tint rounded-md border-[1.5px] px-3 py-2.5">
				{t("alert", { day: current.day, season: current.season })}
			</p>
			<div className="border-line bg-surface overflow-hidden rounded-md border-[1.5px]">
				<div className="border-line grid grid-cols-[repeat(7,minmax(0,1fr))] border-b text-center font-semibold">
					{WEEKDAY_ORDER.map((weekday) => (
						<span key={weekday} className="py-2">
							{t(`weekdays.${weekday}`)}
						</span>
					))}
				</div>
				<div className="grid grid-cols-[repeat(7,minmax(0,1fr))] [&>button:nth-child(7n+1)]:border-s-0">
					{days.map((day) => (
						<DayCell
							key={day.day}
							day={day}
							isCurrent={sameDay(day, current)}
							isSelected={sameDay(day, selected)}
							tint={styles.cardBg}
							onPick={() => setCurrentDay({ day: day.day, season: day.season })}
						/>
					))}
				</div>
			</div>
			<section
				aria-label={t("details.events")}
				className={`border-line rounded-md border-[1.5px] p-5 max-lg:hidden ${styles.cardBg}`}
			>
				<DayDetails day={selectedDay} isCurrent={sameDay(selected, current)} />
			</section>
			<Dialog
				open={sheetOpen}
				onClose={() => setSheetOpen(false)}
				title={t("dayLabel", {
					weekday: selectedDay.weekday,
					day: selectedDay.day,
					season: selectedDay.season,
				})}
				footer={
					<Button
						variant="primary"
						className="w-full"
						onClick={() => setSheetOpen(false)}
					>
						{t("details.close")}
					</Button>
				}
			>
				<DayDetails day={selectedDay} isCurrent={sameDay(selected, current)} />
			</Dialog>
		</>
	);
}

export function CalendarView() {
	const t = useTranslations("people.calendar");

	return (
		<PlaythroughGate title={t("title")}>
			{(playthrough) => <CalendarContent playthrough={playthrough} />}
		</PlaythroughGate>
	);
}
