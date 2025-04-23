"use client";

import { Card, Badge } from "flowbite-react";
import { DayDetailsProps } from "@/types";
import { getSeasonStyles, getSeasonEmoji } from "@/service/seasonalTheme";

export default function DayDetails({ day }: DayDetailsProps) {
	const seasonStyles = getSeasonStyles(day.season);

	return (
		<Card className={`${seasonStyles.cardBg}`}>
			<div className="flex items-center justify-between">
				<h2 className="flex items-center gap-2 text-xl font-bold">
					{getSeasonEmoji(day.season)} {day.weekday}, {day.day} {day.season}
				</h2>
				<Badge
					color={
						day.season === "Summer"
							? "warning"
							: day.season === "Autumn"
								? "orange"
								: day.season === "Winter"
									? "info"
									: "success"
					}
				>
					{day.season}
				</Badge>
			</div>

			<div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
				<div>
					<h3 className={`font-bold ${seasonStyles.text} mb-2`}>Events:</h3>
					{day.events.length > 0 ? (
						<ul className="space-y-2">
							{day.events.map((event, idx) => (
								<li
									key={idx}
									className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-700"
								>
									<span className="text-xl">{event.emoji}</span>
									<div>
										<div className="font-medium">{event.name}</div>
										{event.startDay !== event.endDay && (
											<div className="text-sm text-gray-600 dark:text-gray-400">
												Days {event.startDay}-{event.endDay} of {day.season}
											</div>
										)}
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-600 italic dark:text-gray-400">No events today.</p>
					)}
				</div>

				<div>
					<h3 className={`font-bold ${seasonStyles.text} mb-2`}>Birthdays:</h3>
					{day.birthdays.length > 0 ? (
						<ul className="space-y-2">
							{day.birthdays.map((birthday, idx) => (
								<li
									key={idx}
									className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm dark:bg-gray-700"
								>
									<span className="text-xl">🎂</span>
									<div>
										<div className="font-medium">
											{birthday.character}&apos;s Birthday
										</div>
										<div className="text-sm text-gray-600 dark:text-gray-400">
											Likes: {birthday.likes}
										</div>
									</div>
								</li>
							))}
						</ul>
					) : (
						<p className="text-gray-600 italic dark:text-gray-400">
							No birthdays today.
						</p>
					)}
				</div>
			</div>
		</Card>
	);
}
