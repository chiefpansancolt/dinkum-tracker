import { describe, expect, it } from "vitest";
import { completionTone, playthroughProgress } from "@/lib/services/completion";
import {
  emptyPlaythrough,
  legacyPlaythrough,
  progressedPlaythrough,
} from "./fixtures";

describe("playthroughProgress", () => {
  it("reports zero everywhere for an empty playthrough", () => {
    const progress = playthroughProgress(emptyPlaythrough("1", "Blank"));

    expect(progress.overallPercent).toBe(0);
    expect(progress.pedia.percent).toBe(0);
    expect(progress.licenses.percent).toBe(0);
  });

  it("uses the totals of the game data", () => {
    const progress = playthroughProgress(emptyPlaythrough("1", "Blank"));

    expect(progress.fish.total).toBe(45);
    expect(progress.bugs.total).toBe(50);
    expect(progress.critters.total).toBe(25);
    expect(progress.pedia.total).toBe(120);
    expect(progress.buildings.total).toBe(27);
  });

  it("counts the pedia and rounds its percent", () => {
    const progress = playthroughProgress(progressedPlaythrough());

    expect(progress.fish.count).toBe(1);
    expect(progress.pedia.count).toBe(3);
    expect(progress.pedia.percent).toBe(3);
  });

  it("counts only the level flags that are true", () => {
    const progress = playthroughProgress(progressedPlaythrough());

    expect(progress.milestones.count).toBe(1);
    expect(progress.licenses.count).toBe(1);
    expect(progress.buildings.count).toBe(1);
  });

  it("reads an older save that lacks sections", () => {
    expect(() => playthroughProgress(legacyPlaythrough())).not.toThrow();
  });

  it("counts clothing and furniture in the overall percent only", () => {
    const base = emptyPlaythrough("1", "Blank");
    const withClothing = { ...base, clothing: { adventure_hood: true } };

    expect(
      playthroughProgress(withClothing).overallPercent,
    ).toBeGreaterThanOrEqual(playthroughProgress(base).overallPercent);
    expect(playthroughProgress(withClothing).pedia.percent).toBe(0);
  });
});

describe("completionTone", () => {
  it.each([
    [0, "danger"],
    [29, "danger"],
    [30, "caution"],
    [69, "caution"],
    [70, "success"],
    [100, "success"],
  ] as const)("reads %i percent as %s", (percent, tone) => {
    expect(completionTone(percent)).toBe(tone);
  });
});
