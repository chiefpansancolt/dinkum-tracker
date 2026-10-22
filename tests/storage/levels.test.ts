import { describe, expect, it } from "vitest";
import {
  allLevelsChange,
  allObtained,
  anyObtained,
  isUnlocked,
  levelChange,
  levelKey,
  noneObtained,
  obtainedCount,
  previousValues,
} from "@/lib/services/levels";

const item = {
  id: "mining_licence",
  levels: [{ level: 1 }, { level: 2 }, { level: 3 }],
};
const key = (level: number) => levelKey(item.id, level);

describe("levelKey", () => {
  it("writes the key the saved data already uses", () => {
    expect(levelKey("mining_licence", 2)).toBe("mining_licence_level_2");
  });
});

describe("isUnlocked", () => {
  it("opens the first level always", () => {
    expect(isUnlocked({}, item.id, 1)).toBe(true);
  });

  it("opens a level only after the one before it", () => {
    expect(isUnlocked({}, item.id, 2)).toBe(false);
    expect(isUnlocked({ [key(1)]: true }, item.id, 2)).toBe(true);
    expect(isUnlocked({ [key(1)]: false }, item.id, 2)).toBe(false);
    expect(isUnlocked({ [key(1)]: true }, item.id, 3)).toBe(false);
  });
});

describe("levelChange", () => {
  it("switches on an open level", () => {
    expect(levelChange({}, item, 1, true)).toEqual({ [key(1)]: true });
  });

  it("does nothing for a locked level", () => {
    expect(levelChange({}, item, 3, true)).toBeNull();
    expect(levelChange({ [key(1)]: true }, item, 3, true)).toBeNull();
  });

  it("switches off the level and every higher one", () => {
    const flags = { [key(1)]: true, [key(2)]: true, [key(3)]: true };

    expect(levelChange(flags, item, 2, false)).toEqual({
      [key(2)]: false,
      [key(3)]: false,
    });
    expect(levelChange(flags, item, 1, false)).toEqual({
      [key(1)]: false,
      [key(2)]: false,
      [key(3)]: false,
    });
  });

  it("leaves the lower levels alone", () => {
    expect(
      levelChange({ [key(1)]: true, [key(2)]: true }, item, 3, false),
    ).toEqual({
      [key(3)]: false,
    });
  });
});

describe("allLevelsChange", () => {
  it("switches every level on or off, as Complete All and Clear All do", () => {
    expect(allLevelsChange(item, true)).toEqual({
      [key(1)]: true,
      [key(2)]: true,
      [key(3)]: true,
    });
    expect(
      Object.values(allLevelsChange(item, false)).every(
        (value) => value === false,
      ),
    ).toBe(true);
  });
});

describe("level state", () => {
  const some = { [key(1)]: true, [key(2)]: false };

  it("tells all, any and none apart", () => {
    expect(allObtained(some, item)).toBe(false);
    expect(anyObtained(some, item)).toBe(true);
    expect(noneObtained(some, item)).toBe(false);
    expect(noneObtained({}, item)).toBe(true);
    expect(allObtained(allLevelsChange(item, true), item)).toBe(true);
  });

  it("counts the flags that are on", () => {
    expect(obtainedCount(some)).toBe(1);
    expect(obtainedCount(undefined)).toBe(0);
  });
});

describe("previousValues", () => {
  it("returns the earlier value of every changed flag so a change can be undone", () => {
    const flags = { [key(1)]: true, [key(2)]: true };
    const change = levelChange(flags, item, 1, false)!;

    expect(previousValues(flags, change)).toEqual({
      [key(1)]: true,
      [key(2)]: true,
      [key(3)]: false,
    });
  });
});
