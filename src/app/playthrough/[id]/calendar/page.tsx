"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Alert } from "flowbite-react";
import { getPlaythroughById, updatePlaythroughData } from "@/lib/localStorage";
import { useCalendarStore, getSeasonDays } from "@/service/calendar";
import { getSeasonStyles, getSeasonEmoji } from "@/service/seasonalTheme";
import DayDetails from "@/components/playthrough/DayDetails";
import LoadingPlaythrough from "@/components/playthrough/LoadingPlaythrough";
import NotFoundCard from "@/components/NotFoundCard";
import SaveFAB from "@/playthrough/SaveFAB";
import { HiInformationCircle } from "react-icons/hi";
import { Season, CalendarDay, Playthrough } from "@/types";
import BreadcrumbsComp from "@/comps/layout/Breadcrumbs";

export default function CalendarPage() {
	const params = useParams();
	const playthroughId = params?.id as string;
	const [playthrough, setPlaythrough] = useState<Playthrough | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isDirty, setIsDirty] = useState(false);
	const [initialized, setInitialized] = useState(false);

	const { currentDay, selectedSeason, setSelectedSeason, setDate } = useCalendarStore();
	const [seasonDays, setSeasonDays] = useState(getSeasonDays(selectedSeason));
	const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);

	useEffect(() => {
		if (playthroughId) {
			const data = getPlaythroughById(playthroughId);
			setPlaythrough(data);
			setIsLoading(false);

			if (data && data.calendar && !initialized) {
				try {
					setDate(data.calendar.currentDay, data.calendar.currentSeason);
					setInitialized(true);
				} catch (error) {
					console.error("Error setting calendar date from props:", error);
				}
			}
		}
	}, [playthroughId, setDate, initialized]);

	useEffect(() => {
		setSeasonDays(getSeasonDays(selectedSeason));
	}, [selectedSeason]);

	useEffect(() => {
		if (currentDay && !initialized) {
			setSelectedDay(currentDay);
			setInitialized(true);
		} else if (currentDay && selectedDay === null) {
			setSelectedDay(currentDay);
		}
	}, [currentDay, selectedDay, initialized]);

	const handleDayClick = (day: CalendarDay) => {
		setSelectedDay(day);

		if (day.day !== currentDay.day || day.season !== currentDay.season) {
			setIsDirty(true);
		}
	};

	const handleSave = () => {
		if (!selectedDay || !isDirty) return false;

		setDate(selectedDay.day, selectedDay.season);

		const success = updatePlaythroughData(playthroughId, {
			calendar: {
				currentDay: selectedDay.day,
				currentSeason: selectedDay.season,
			},
		});

		if (success) {
			setIsDirty(false);
		}

		return success;
	};

	const nextSeason = () => {
		const seasons: Season[] = ["Summer", "Autumn", "Winter", "Spring"];
		const currentIndex = seasons.indexOf(selectedSeason);
		const nextIndex = (currentIndex + 1) % 4;
		setSelectedSeason(seasons[nextIndex]);
	};

	const prevSeason = () => {
		const seasons: Season[] = ["Summer", "Autumn", "Winter", "Spring"];
		const currentIndex = seasons.indexOf(selectedSeason);
		const prevIndex = (currentIndex - 1 + 4) % 4;
		setSelectedSeason(seasons[prevIndex]);
	};

	const getDayEvents = (day: CalendarDay) => {
		const events = [...day.events];
		const birthdays = day.birthdays.map((b) => ({
			name: `${b.character}'s Birthday`,
			emoji: "🎂",
			startDay: day.day,
			endDay: day.day,
			season: day.season,
		}));

		return [...events, ...birthdays];
	};

	if (isLoading) {
		return <LoadingPlaythrough message="Loading calendar..." />;
	}

	if (!playthrough) {
		return <NotFoundCard message="Playthrough not found" />;
	}

	const seasonStyles = getSeasonStyles(selectedSeason);

	return (
		<>
			<BreadcrumbsComp id={playthroughId} name={playthrough.name} routeName="NPC's" />
			<div className="p-6 lg:flex lg:h-full lg:flex-col">
				<header className="flex items-center justify-between border-b border-gray-200 pb-4 lg:flex-none dark:border-gray-700">
					<h1 className="text-primary text-2xl font-bold">Calendar</h1>
					<div className="flex items-center">
						<div className="relative flex items-center rounded-md bg-white shadow-sm md:items-stretch dark:bg-gray-800">
							<button
								type="button"
								onClick={prevSeason}
								className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
							>
								<span className="sr-only">Previous season</span>
								<svg
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
							<button
								type="button"
								onClick={() => setDate(currentDay.day, currentDay.season)}
								className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block dark:border-gray-600 dark:text-gray-100 dark:hover:bg-gray-700"
							>
								Today
							</button>
							<span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden dark:bg-gray-600"></span>
							<button
								type="button"
								onClick={nextSeason}
								className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
							>
								<span className="sr-only">Next season</span>
								<svg
									className="h-5 w-5"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fillRule="evenodd"
										d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
										clipRule="evenodd"
									/>
								</svg>
							</button>
						</div>
						<div className="hidden md:ml-4 md:flex md:items-center">
							<div className="relative">
								<div className="flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold">
									<span className={`${seasonStyles.text}`}>
										{selectedSeason} {getSeasonEmoji(selectedSeason)}
									</span>
								</div>
							</div>
						</div>
					</div>
				</header>

				<div className="mb-4">
					<Alert color="blue" icon={HiInformationCircle}>
						<div className="flex items-center gap-2">
							<span className="text-sm">
								Current day:{" "}
								<strong>
									{currentDay.day} {currentDay.season}
								</strong>
								.
								{(selectedDay && selectedDay?.day !== currentDay.day) ||
								selectedDay?.season !== currentDay.season ? (
									<>
										{" "}
										Click the save button to set{" "}
										<strong>
											{selectedDay?.day} {selectedDay?.season}
										</strong>{" "}
										as the current day.
									</>
								) : (
									<> This is the current game day.</>
								)}
							</span>
						</div>
					</Alert>
				</div>

				<div
					className={`rounded-lg shadow-sm ring-1 ring-black/5 lg:flex lg:flex-auto lg:flex-col dark:ring-white/10 ${seasonStyles.bg}`}
				>
					<div className="grid grid-cols-7 gap-px rounded-tl-lg rounded-tr-lg border-b border-gray-300 bg-gray-200 text-center text-xs leading-6 font-semibold text-gray-700 lg:flex-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200">
						<div className="flex justify-center rounded-tl-lg bg-white py-2 dark:bg-gray-800">
							<span>S</span>
							<span className="sr-only sm:not-sr-only">un</span>
						</div>
						<div className="flex justify-center bg-white py-2 dark:bg-gray-800">
							<span>M</span>
							<span className="sr-only sm:not-sr-only">on</span>
						</div>
						<div className="flex justify-center bg-white py-2 dark:bg-gray-800">
							<span>T</span>
							<span className="sr-only sm:not-sr-only">ue</span>
						</div>
						<div className="flex justify-center bg-white py-2 dark:bg-gray-800">
							<span>W</span>
							<span className="sr-only sm:not-sr-only">ed</span>
						</div>
						<div className="flex justify-center bg-white py-2 dark:bg-gray-800">
							<span>T</span>
							<span className="sr-only sm:not-sr-only">hu</span>
						</div>
						<div className="flex justify-center bg-white py-2 dark:bg-gray-800">
							<span>F</span>
							<span className="sr-only sm:not-sr-only">ri</span>
						</div>
						<div className="flex justify-center rounded-tr-lg bg-white py-2 dark:bg-gray-800">
							<span>S</span>
							<span className="sr-only sm:not-sr-only">at</span>
						</div>
					</div>

					<div className="flex rounded-br-lg rounded-bl-lg bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto dark:bg-gray-700 dark:text-gray-200">
						<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-4 lg:gap-px">
							{seasonDays.map((day, index) => {
								const isCurrentDay =
									currentDay.day === day.day && currentDay.season === day.season;
								const isSelectedDay =
									selectedDay?.day === day.day &&
									selectedDay.season === day.season;
								const dayEvents = getDayEvents(day);

								return (
									<div
										key={index}
										className={`relative px-3 py-2 ${
											isSelectedDay
												? seasonStyles.cardBg
												: isCurrentDay
													? `ring-primary bg-white ring-2 ring-inset dark:bg-gray-800`
													: `bg-white dark:bg-gray-800 ${seasonStyles.hover} cursor-pointer`
										} ${index === seasonDays.length - 1 ? "rounded-br-lg" : ""} ${index === seasonDays.length - 7 ? "rounded-bl-lg" : ""}`}
										onClick={() => handleDayClick(day)}
									>
										<time
											dateTime={`${day.season}-${day.day}`}
											className={`${
												isCurrentDay
													? "bg-primary flex h-6 w-6 items-center justify-center rounded-full font-semibold text-white"
													: isSelectedDay
														? "text-primary font-semibold"
														: ""
											}`}
										>
											{day.day}
										</time>
										{dayEvents.length > 0 && (
											<ol className="mt-2">
												{dayEvents.slice(0, 2).map((event, idx) => (
													<li key={idx}>
														<div
															className="group flex"
															onClick={(e) => {
																e.preventDefault();
																handleDayClick(day);
															}}
														>
															<p className="flex-auto truncate font-medium text-gray-900 dark:text-gray-200">
																{event.emoji} {event.name}
															</p>
														</div>
													</li>
												))}
												{dayEvents.length > 2 && (
													<li className="text-gray-500 dark:text-gray-400">
														+ {dayEvents.length - 2} more
													</li>
												)}
											</ol>
										)}
									</div>
								);
							})}
						</div>

						<div className="isolate grid w-full grid-cols-7 grid-rows-4 gap-px lg:hidden">
							{seasonDays.map((day, index) => {
								const isCurrentDay =
									currentDay.day === day.day && currentDay.season === day.season;
								const isSelectedDay =
									selectedDay?.day === day.day &&
									selectedDay.season === day.season;
								const dayEvents = getDayEvents(day);

								return (
									<button
										key={index}
										type="button"
										className={`flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10 dark:hover:bg-gray-700 ${
											isSelectedDay
												? seasonStyles.cardBg
												: isCurrentDay
													? `ring-primary bg-white ring-2 ring-inset dark:bg-gray-800`
													: `bg-white dark:bg-gray-800`
										}`}
										onClick={() => handleDayClick(day)}
									>
										<time
											dateTime={`${day.season}-${day.day}`}
											className={`ml-auto ${
												isCurrentDay
													? "bg-primary flex h-6 w-6 items-center justify-center rounded-full font-semibold text-white"
													: isSelectedDay
														? "text-primary dark:text-primary font-semibold"
														: "text-gray-900 dark:text-gray-200"
											}`}
										>
											{day.day}
										</time>
										<span className="sr-only">{dayEvents.length} events</span>
										{dayEvents.length > 0 && (
											<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
												{dayEvents.slice(0, 3).map((event, idx) => (
													<span
														key={idx}
														className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
													></span>
												))}
											</span>
										)}
									</button>
								);
							})}
						</div>
					</div>
				</div>

				<div className="pt-4">{selectedDay && <DayDetails day={selectedDay} />}</div>
			</div>
			<SaveFAB isDirty={isDirty} onSave={handleSave} />
		</>
	);
}
