"use client";

import { formatNumber, formatShortDate } from "@/i18n/formatter";
import { useTranslations } from "next-intl";
import type { Playthrough } from "@/types/app";
import type { GameSeason } from "@/service/playthrough";
import { seasonOf } from "@/service/playthrough";
import { ageOf } from "@/service/relativeDate";

/** The relative wording of the old playthrough card: Today, Yesterday, 3 days ago and so on. */
export function useAgeText() {
  const t = useTranslations("playthroughs.relative");

  return (iso: string | undefined) => {
    const age = ageOf(iso);
    switch (age.kind) {
      case "today":
        return t("today");
      case "yesterday":
        return t("yesterday");
      case "unknown":
        return t("unknown");
      default:
        return t(age.kind, {
          count: age.count,
          amount: formatNumber(age.count),
        });
    }
  };
}

export function useUpdatedText() {
  const t = useTranslations("playthroughs.card");
  const ageText = useAgeText();

  return (playthrough: Playthrough) =>
    t("updated", { when: ageText(playthrough.lastUpdated) });
}

export function useCreatedText() {
  const t = useTranslations("playthroughs");

  return (playthrough: Playthrough) =>
    t("card.created", {
      date: playthrough.createdAt
        ? formatShortDate(playthrough.createdAt)
        : t("relative.unknown"),
    });
}

export function useSeasonName() {
  const t = useTranslations("playthroughs.seasons");

  return (season: GameSeason) => t(season);
}

export function useGameDate() {
  const t = useTranslations("playthroughs.card");
  const seasonName = useSeasonName();

  return (playthrough: Playthrough) =>
    t("gameDate", {
      day: playthrough.calendar.currentDay,
      season: seasonName(seasonOf(playthrough)),
    });
}
