import type { Season, Weekday } from "./base";

export interface CalendarState {
  calendar: GameCalendar;
  currentDay: CalendarDay;
  selectedSeason: Season;
  setSelectedSeason: (season: Season) => void;
  advanceDay: () => void;
  setDate: (day: number, season: Season) => void;
}

export interface CalendarData {
  currentDay: number;
  currentSeason: Season;
}

export interface Birthday {
  day: number;
  season: Season;
  character: string;
  likes: string;
}

export interface Event {
  name: string;
  startDay: number;
  endDay: number;
  season: Season;
  emoji: string;
}

export interface CalendarDay {
  day: number;
  season: Season;
  weekday: Weekday;
  events: Event[];
  birthdays: Birthday[];
}

export interface CalendarTabHandle {
  saveSelectedDay: () => boolean;
}

export interface DayDetailsProps {
  day: CalendarDay;
}

export interface SeasonStyle {
  bg: string;
  border: string;
  text: string;
  accent: string;
  hover: string;
  cardBg: string;
}
