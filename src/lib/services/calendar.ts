import {
  type Birthday,
  calendar,
  type CalendarDay,
  type CalendarEvent,
  type Season,
} from "dinkum-data";
import { create } from "zustand";
import { CalendarState } from "@/types/ui/calendar";

/** The in-game season cycle order, derived from the calendar's own day sequence. */
export const SEASON_ORDER: Season[] = [
  ...new Set(
    calendar()
      .get()
      .map((d) => d.season),
  ),
];

/**
 * Tracks the current in-playthrough day against the static Dinkum calendar
 * shipped by dinkum-data. dinkum-data's calendar() is read-only; this class
 * layers mutable "what day is it" state on top of it.
 */
export class GameCalendar {
  private currentDay = 1;
  private currentSeason: Season = "Summer";
  private readonly days: CalendarDay[];

  constructor() {
    this.days = calendar().get();
  }

  public getAllDays(): CalendarDay[] {
    return this.days;
  }

  public getCurrentDay(): CalendarDay {
    const index =
      this.getSeasonIndex(this.currentSeason) * 28 + (this.currentDay - 1);
    return this.days[index];
  }

  private getSeasonIndex(season: Season): number {
    return SEASON_ORDER.indexOf(season);
  }

  public advanceDay(): CalendarDay {
    this.currentDay++;

    if (this.currentDay > 28) {
      this.currentDay = 1;
      const nextSeasonIndex = (this.getSeasonIndex(this.currentSeason) + 1) % 4;
      this.currentSeason = SEASON_ORDER[nextSeasonIndex];
    }

    return this.getCurrentDay();
  }

  public getUpcomingBirthdays(daysAhead: number = 7): Birthday[] {
    const currentDayIndex =
      this.getSeasonIndex(this.currentSeason) * 28 + (this.currentDay - 1);
    const upcomingBirthdays: Birthday[] = [];

    for (let i = 1; i <= daysAhead; i++) {
      const checkIndex = (currentDayIndex + i) % this.days.length;
      const checkDay = this.days[checkIndex];

      checkDay.birthdays.forEach((birthday) => {
        upcomingBirthdays.push(birthday);
      });
    }

    return upcomingBirthdays;
  }

  public getUpcomingEvents(daysAhead: number = 7): CalendarEvent[] {
    const currentDayIndex =
      this.getSeasonIndex(this.currentSeason) * 28 + (this.currentDay - 1);
    const upcomingEvents: CalendarEvent[] = [];
    const eventSet = new Set<string>();

    for (let i = 1; i <= daysAhead; i++) {
      const checkIndex = (currentDayIndex + i) % this.days.length;
      const checkDay = this.days[checkIndex];

      checkDay.events.forEach((event) => {
        const eventKey = `${event.name}-${event.season}-${event.startDay}`;
        if (!eventSet.has(eventKey)) {
          upcomingEvents.push(event);
          eventSet.add(eventKey);
        }
      });
    }

    return upcomingEvents;
  }

  public formatDate(day: CalendarDay): string {
    return `${day.weekday}, ${day.day} ${day.season}`;
  }

  public getSeason(season: Season): CalendarDay[] {
    return this.days.filter((day) => day.season === season);
  }

  public setDate(day: number, season: Season): void {
    if (day < 1 || day > 28) {
      throw new Error("Day must be between 1 and 28");
    }

    this.currentDay = day;
    this.currentSeason = season;
  }
}

export const useCalendarStore = create<CalendarState>((set, get) => {
  const gameCalendar = new GameCalendar();
  const currentDay = gameCalendar.getCurrentDay();

  return {
    calendar: gameCalendar,
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
