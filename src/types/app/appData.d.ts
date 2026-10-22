import type { DateFormatId, NumberFormatId } from "@/i18n/formats";
import type { Locale } from "@/i18n/locales";
import type { Playthrough } from "./storage";

export type PlaythroughSort =
  "lastUpdated" | "name" | "createdAt" | "completion";

export type CommerceLevel = 0 | 5 | 10 | 15;

export type ViewMode = "grid" | "list";

export interface Prefs {
  commerceLevel: CommerceLevel;
  viewMode: ViewMode;
  language?: Locale;
  numberFormat?: NumberFormatId;
  dateFormat?: DateFormatId;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
  defaultSort: PlaythroughSort;
  prefs: Prefs;
}
