import type { CalendarDay, Season } from "dinkum-data";
import { GameCalendar } from "@/service/calendar";

export interface CalendarState {
  calendar: GameCalendar;
  currentDay: CalendarDay;
  selectedSeason: Season;
  setSelectedSeason: (season: Season) => void;
  advanceDay: () => void;
  setDate: (day: number, season: Season) => void;
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
