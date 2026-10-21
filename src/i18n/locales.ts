import type en from "./messages/en";

export type Messages = typeof en;

/**
 * The languages of the app. Another language adds its code here, a region tag below and a catalog
 * folder `messages/<code>/` that follows the shape of the English catalog.
 */
const SUPPORTED_LOCALES = ["en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** The regional tag the browser Intl API formats numbers and dates with. */
export const REGION_TAG: Record<Locale, string> = {
  en: "en-US",
};
