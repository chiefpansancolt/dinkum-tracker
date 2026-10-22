import {
  type Birthday,
  calendar,
  type CalendarDay,
  type CalendarEvent,
  type Season,
} from "dinkum-data";

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

export const shiftSeason = (season: Season, step: 1 | -1): Season =>
  SEASON_ORDER[
    (SEASON_ORDER.indexOf(season) + step + SEASON_ORDER.length) %
      SEASON_ORDER.length
  ];

export const dayOf = ({ day, season }: DayRef): CalendarDay =>
  calendar().get()[SEASON_ORDER.indexOf(season) * DAYS_IN_SEASON + (day - 1)];

export type DayEntry =
  | {
      kind: "event";
      id: string;
      name: string;
      range?: { startDay: number; endDay: number; season: Season };
    }
  | { kind: "birthday"; id: string; character: string; likes?: string };

/** Events first, then birthdays, as the old grid listed them. */
export const dayEntries = (day: CalendarDay): DayEntry[] => [
  ...day.events.map((event) => ({
    kind: "event" as const,
    id: `event:${event.name}`,
    name: event.name,
    range:
      event.startDay === event.endDay
        ? undefined
        : {
            startDay: event.startDay,
            endDay: event.endDay,
            season: event.season,
          },
  })),
  ...day.birthdays.map((birthday) => ({
    kind: "birthday" as const,
    id: `birthday:${birthday.character}`,
    character: birthday.character,
    likes: birthday.likes || undefined,
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
