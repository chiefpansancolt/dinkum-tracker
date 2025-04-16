import { Season, Weekday, Birthday, Event, CalendarDay } from "@/types/dinkum";

export class GameCalendar {
  private currentDay: number = 1;
  private currentSeason: Season = "Summer";
  private days: CalendarDay[] = [];
  private events: Event[] = [];
  private birthdays: Birthday[] = [];

  constructor() {
    this.initializeBirthdays();
    this.initializeEvents();
    this.generateCalendar();
  }

  private initializeBirthdays(): void {
    this.birthdays = [
      { day: 1, season: "Summer", character: "Fletch", likes: "Bush Lime" },
      {
        day: 18,
        season: "Summer",
        character: "Theodore",
        likes: "Cooked Cactus Fig",
      },
      { day: 26, season: "Summer", character: "Sheila", likes: "Prime Roast" },
      {
        day: 2,
        season: "Autumn",
        character: "Franklyn",
        likes: "Cooked Giant Drumstick",
      },
      { day: 13, season: "Autumn", character: "Clover", likes: "Apple" },
      {
        day: 24,
        season: "Autumn",
        character: "John",
        likes: "Cooked Croco Meat",
      },
      {
        day: 11,
        season: "Winter",
        character: "Milburn",
        likes: "High Quality Cheese",
      },
      { day: 16, season: "Winter", character: "Melvin", likes: "Cooked Meat" },
      {
        day: 28,
        season: "Winter",
        character: "Sally",
        likes: "Glowing Mushroom",
      },
      { day: 3, season: "Spring", character: "Irwin", likes: "Bananas" },
      { day: 20, season: "Spring", character: "Rayne", likes: "Corn" },
    ];
  }

  private initializeEvents(): void {
    this.events = [
      {
        name: "Fish Catching Competition",
        startDay: 22,
        endDay: 22,
        season: "Summer",
        emoji: "🐟",
      },
      {
        name: "Fish Catching Competition",
        startDay: 22,
        endDay: 22,
        season: "Winter",
        emoji: "🐟",
      },
      {
        name: "Bug Catching Competition",
        startDay: 15,
        endDay: 15,
        season: "Autumn",
        emoji: "🦋",
      },
      {
        name: "Bug Catching Competition",
        startDay: 15,
        endDay: 15,
        season: "Spring",
        emoji: "🦋",
      },
      {
        name: "Sky Fest",
        startDay: 8,
        endDay: 8,
        season: "Autumn",
        emoji: "🪁🌠",
      },
      {
        name: "Island Day",
        startDay: 28,
        endDay: 28,
        season: "Spring",
        emoji: "🎇🎆",
      },
      {
        name: "John's Goods Anniversary",
        startDay: 1,
        endDay: 7,
        season: "Summer",
        emoji: "🐠",
      },
    ];
  }

  private generateCalendar(): void {
    const seasons: Season[] = ["Summer", "Autumn", "Winter", "Spring"];
    const weekdays: Weekday[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let weekdayIndex = 0;

    for (const season of seasons) {
      for (let day = 1; day <= 28; day++) {
        const dayEvents = this.events.filter(
          (event) =>
            event.season === season &&
            day >= event.startDay &&
            day <= event.endDay,
        );

        const dayBirthdays = this.birthdays.filter(
          (birthday) => birthday.season === season && birthday.day === day,
        );

        this.days.push({
          day,
          season,
          weekday: weekdays[weekdayIndex],
          events: dayEvents,
          birthdays: dayBirthdays,
        });

        weekdayIndex = (weekdayIndex + 1) % 7;
      }
    }
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
    const seasons: Season[] = ["Summer", "Autumn", "Winter", "Spring"];
    return seasons.indexOf(season);
  }

  public advanceDay(): CalendarDay {
    this.currentDay++;

    if (this.currentDay > 28) {
      this.currentDay = 1;
      const nextSeasonIndex = (this.getSeasonIndex(this.currentSeason) + 1) % 4;
      const seasons: Season[] = ["Summer", "Autumn", "Winter", "Spring"];
      this.currentSeason = seasons[nextSeasonIndex];
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

  public getUpcomingEvents(daysAhead: number = 7): Event[] {
    const currentDayIndex =
      this.getSeasonIndex(this.currentSeason) * 28 + (this.currentDay - 1);
    const upcomingEvents: Event[] = [];
    const eventSet = new Set<string>();

    for (let i = 1; i <= daysAhead; i++) {
      const checkIndex = (currentDayIndex + i) % this.days.length;
      const checkDay = this.days[checkIndex];

      checkDay.events.forEach((event) => {
        // Only add an event once (for multi-day events)
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
