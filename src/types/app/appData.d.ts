import type { DateFormatId, NumberFormatId } from "@/i18n/formats";
import type { Locale } from "@/i18n/locales";
import type { Playthrough } from "./storage";

export type PlaythroughSort =
  "lastUpdated" | "name" | "createdAt" | "completion";

export type CommerceLevel = 0 | 5 | 10 | 15;

export type ViewMode = "grid" | "list";

export interface Prefs {
  commerceLevel: CommerceLevel;
  /** How the long lists show their items. It is shared by every list page. */
  viewMode: ViewMode;
  /** The language of the interface. Missing means English. */
  language?: Locale;
  /** How numbers are written. Missing means Automatic, which follows the language. */
  numberFormat?: NumberFormatId;
  /** How dates are written. Missing means Automatic, which follows the language. */
  dateFormat?: DateFormatId;
}

export interface AppData {
  playthroughs: Playthrough[];
  activePlaythroughId: string | null;
  defaultSort: PlaythroughSort;
  prefs: Prefs;
}
