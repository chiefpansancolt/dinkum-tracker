import {
  type Birthday,
  calendar,
  type CalendarDay,
  type CalendarEvent,
  type Season,
} from "dinkum-data";

/** The in-game season cycle order, derived from the calendar's own day sequence. */
export const SEASON_ORDER: Season[] = [
  ...new Set(
    calendar()
      .get()
      .map((d) => d.season),
  ),
];

const DAYS_IN_SEASON = 28;

export type DayRef = { day: number; season: Season };

export const sameDay = (a: DayRef, b: DayRef) =>
  a.day === b.day && a.season === b.season;

/** The season after or before, wrapping around the year. */
export const shiftSeason = (season: Season, step: 1 | -1): Season =>
  SEASON_ORDER[
    (SEASON_ORDER.indexOf(season) + step + SEASON_ORDER.length) %
      SEASON_ORDER.length
  ];

export const dayOf = ({ day, season }: DayRef): CalendarDay =>
  calendar().get()[SEASON_ORDER.indexOf(season) * DAYS_IN_SEASON + (day - 1)];

export interface DayEntry {
  kind: "event" | "birthday";
  name: string;
  /** Detail line: the day range of an event, or the food a character likes. */
  detail?: string;
}

/** Events first, then birthdays, as the old grid listed them. */
export const dayEntries = (day: CalendarDay): DayEntry[] => [
  ...day.events.map((event) => ({
    kind: "event" as const,
    name: event.name,
    detail:
      event.startDay === event.endDay
        ? undefined
        : `Days ${event.startDay}-${event.endDay} of ${event.season}`,
  })),
  ...day.birthdays.map((birthday) => ({
    kind: "birthday" as const,
    name: `${birthday.character}'s Birthday`,
    detail: birthday.likes ? `Likes: ${birthday.likes}` : undefined,
  })),
];

export const seasonCounts = (season: Season) => {
  const days = calendar()
    .get()
    .filter((day) => day.season === season);
  return {
    events: new Set(
      days.flatMap((day) => day.events.map((event) => event.name)),
    ).size,
    birthdays: days.reduce((sum, day) => sum + day.birthdays.length, 0),
  };
};

export const seasonDays = (season: Season): CalendarDay[] =>
  calendar()
    .get()
    .filter((day) => day.season === season);
