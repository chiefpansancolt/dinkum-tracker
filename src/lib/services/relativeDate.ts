const DAY_MS = 24 * 60 * 60 * 1000;
const DAYS_PER_WEEK = 7;
const DAYS_PER_MONTH = 30;

export type Age =
  | { kind: "today" | "yesterday" | "unknown" }
  | { kind: "daysAgo" | "weeksAgo" | "monthsAgo"; count: number };

/**
 * How long ago a moment was, in the steps of the old playthrough card: today, yesterday, days,
 * weeks (under 30 days) and months. A missing date has no age.
 */
export const ageOf = (iso: string | undefined, now: Date = new Date()): Age => {
  if (!iso) return { kind: "unknown" };

  const days = Math.floor(
    Math.abs(now.getTime() - new Date(iso).getTime()) / DAY_MS,
  );
  if (days === 0) return { kind: "today" };
  if (days === 1) return { kind: "yesterday" };
  if (days < DAYS_PER_WEEK) return { kind: "daysAgo", count: days };
  if (days < DAYS_PER_MONTH)
    return { kind: "weeksAgo", count: Math.floor(days / DAYS_PER_WEEK) };
  return { kind: "monthsAgo", count: Math.floor(days / DAYS_PER_MONTH) };
};
