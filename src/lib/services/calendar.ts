import { create } from "zustand";
import { CalendarDay, CalendarState, Season } from "@/types/dinkum";
import { GameCalendar } from "@/data/dinkum";

export const useCalendarStore = create<CalendarState>((set, get) => {
  const calendar = new GameCalendar();
  const currentDay = calendar.getCurrentDay();

  return {
    calendar,
    currentDay,
    selectedSeason: currentDay.season,

    setSelectedSeason: (season: Season) => {
      set({ selectedSeason: season });
    },

    advanceDay: () => {
      const { calendar } = get();
      const newDay = calendar.advanceDay();

      set({
        currentDay: newDay,
        selectedSeason: newDay.season,
      });
    },

    setDate: (day: number, season: Season) => {
      const { calendar } = get();
      calendar.setDate(day, season);

      set({
        currentDay: calendar.getCurrentDay(),
        selectedSeason: season,
      });
    },
  };
});

export const getSeasonDays = (season: Season): CalendarDay[] => {
  const { calendar } = useCalendarStore.getState();
  return calendar.getSeason(season);
};

export const getUpcomingBirthdays = (days: number = 7) => {
  const { calendar } = useCalendarStore.getState();
  return calendar.getUpcomingBirthdays(days);
};

export const getUpcomingEvents = (days: number = 7) => {
  const { calendar } = useCalendarStore.getState();
  return calendar.getUpcomingEvents(days);
};
