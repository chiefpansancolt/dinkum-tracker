import { describe, expect, it } from "vitest";
import { ageOf } from "@/lib/services/relativeDate";

const now = new Date("2026-10-21T12:00:00.000Z");
const daysBefore = (days: number) =>
  new Date(now.getTime() - days * 86_400_000).toISOString();

describe("ageOf", () => {
  it.each([
    [0, { kind: "today" }],
    [1, { kind: "yesterday" }],
    [2, { kind: "daysAgo", count: 2 }],
    [6, { kind: "daysAgo", count: 6 }],
    [7, { kind: "weeksAgo", count: 1 }],
    [29, { kind: "weeksAgo", count: 4 }],
    [30, { kind: "monthsAgo", count: 1 }],
    [95, { kind: "monthsAgo", count: 3 }],
  ])("reads %i days as %o", (days, expected) => {
    expect(ageOf(daysBefore(days), now)).toEqual(expected);
  });

  it("has no age for a missing date", () => {
    expect(ageOf("", now)).toEqual({ kind: "unknown" });
    expect(ageOf(undefined, now)).toEqual({ kind: "unknown" });
  });
});
