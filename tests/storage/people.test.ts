import { describe, expect, it } from "vitest";
import {
  dayEntries,
  dayOf,
  sameDay,
  SEASON_ORDER,
  seasonCounts,
  shiftSeason,
} from "@/lib/services/calendar";
import {
  allNpcs,
  emptyNpcFilters,
  filterNpcs,
  formatHearts,
  fullHeartCount,
  heartFill,
  heartsAfterClick,
  MAX_TOTAL_HEARTS,
  metCount,
  stepHearts,
  totalHearts,
} from "@/lib/services/npcs";

describe("npc hearts", () => {
  it("has 23 npcs and 115 possible hearts", () => {
    expect(allNpcs).toHaveLength(23);
    expect(MAX_TOTAL_HEARTS).toBe(115);
  });

  it("steps by a quarter and stays between 0 and 5", () => {
    expect(stepHearts(1, 1)).toBe(1.25);
    expect(stepHearts(1, -1)).toBe(0.75);
    expect(stepHearts(0, -1)).toBe(0);
    expect(stepHearts(5, 1)).toBe(5);
  });

  it("fills up to an empty heart and lowers on a full heart", () => {
    expect(heartsAfterClick(0, 2)).toBe(3);
    expect(heartsAfterClick(2.5, 2)).toBe(3);
    expect(heartsAfterClick(3, 2)).toBe(2);
    expect(heartsAfterClick(3, 0)).toBe(0);
    expect(heartsAfterClick(5, 4)).toBe(4);
  });

  it("fills a heart in quarters", () => {
    expect(heartFill(2.25, 0)).toBe(1);
    expect(heartFill(2.25, 2)).toBe(0.25);
    expect(heartFill(2.25, 3)).toBe(0);
  });

  it("writes hearts the way the old page did", () => {
    expect(formatHearts(2)).toBe("2");
    expect(formatHearts(2.5)).toBe("2.5");
    expect(formatHearts(1.25)).toBe("1.25");
  });

  it("totals hearts, full hearts and npcs met", () => {
    const relationships = { fletch: 5, john: 4.25, theodore: 0 };

    expect(totalHearts(relationships)).toBe(9.25);
    expect(fullHeartCount(relationships)).toBe(1);
    expect(metCount(relationships)).toBe(2);
    expect(totalHearts(undefined)).toBe(0);
  });

  it("filters by relationship, residence and name", () => {
    const relationships = { fletch: 5, john: 2 };
    const names = (filters: Partial<typeof emptyNpcFilters>) =>
      filterNpcs(relationships, { ...emptyNpcFilters, ...filters }).map(
        (npc) => npc.id,
      );

    expect(names({})).toHaveLength(23);
    expect(names({ relationship: "full" })).toEqual(["fletch"]);
    expect(names({ relationship: "progress" })).toEqual(["john"]);
    expect(names({ relationship: "none" })).toHaveLength(21);
    expect(names({ residence: "visitors" })).toHaveLength(7);
    expect(names({ residence: "can_move_in" })).not.toContain("fletch");
    expect(names({ residence: "can_move_in" })).not.toContain("jimmy");
    expect(names({ query: "SHEI" })).toEqual(["sheila"]);
  });
});

describe("calendar helpers", () => {
  it("wraps seasons around the year", () => {
    expect(SEASON_ORDER).toEqual(["Summer", "Autumn", "Winter", "Spring"]);
    expect(shiftSeason("Spring", 1)).toBe("Summer");
    expect(shiftSeason("Summer", -1)).toBe("Spring");
  });

  it("finds a day by number and season", () => {
    expect(dayOf({ day: 1, season: "Summer" }).weekday).toBe("Sunday");
    expect(dayOf({ day: 28, season: "Spring" })).toMatchObject({
      day: 28,
      season: "Spring",
    });
    expect(
      sameDay({ day: 3, season: "Winter" }, { day: 3, season: "Winter" }),
    ).toBe(true);
    expect(
      sameDay({ day: 3, season: "Winter" }, { day: 3, season: "Spring" }),
    ).toBe(false);
  });

  it("lists events first, then birthdays, with the data for their detail lines", () => {
    const entries = dayEntries(dayOf({ day: 1, season: "Summer" }));

    expect(entries.map((entry) => entry.kind)).toEqual(["event", "birthday"]);
    expect(entries[0]).toMatchObject({
      name: "John's Goods Anniversary",
      range: { startDay: 1, endDay: 7, season: "Summer" },
    });
    expect(entries[1]).toMatchObject({
      character: "Fletch",
      likes: "Bush Lime",
    });
  });

  it("counts events and birthdays in a season", () => {
    expect(seasonCounts("Summer")).toEqual({ events: 3, birthdays: 4 });
  });
});

describe("landing counts", () => {
  it("shows the real item counts of the board", async () => {
    const { collectionCounts } = await import("@/lib/services/landing");

    expect(collectionCounts).toEqual({
      pedia: 120,
      npcs: 23,
      licenses: 25,
      milestones: 99,
      buildings: 32,
      gear: 234,
      recipes: 324,
      clothing: 532,
    });
  });
});
