import { DEFAULT_LOCALE, REGION_TAG } from "./locales";
import type { Locale } from "./locales";

/** The label shows the result, so nobody has to guess. */
export const NUMBER_FORMATS = [
  { id: "auto", tag: null },
  { id: "us", tag: "en-US" },
  { id: "european", tag: "de-DE" },
  { id: "french", tag: "fr-FR" },
  { id: "swiss", tag: "de-CH" },
  { id: "indian", tag: "en-IN" },
] as const;

export type NumberFormatId = (typeof NUMBER_FORMATS)[number]["id"];

export const DATE_FORMATS = [
  { id: "auto" },
  { id: "mdy" },
  { id: "dmy" },
  { id: "ymd" },
] as const;

export type DateFormatId = (typeof DATE_FORMATS)[number]["id"];

export const DEFAULT_NUMBER_FORMAT: NumberFormatId = "auto";
export const DEFAULT_DATE_FORMAT: DateFormatId = "auto";

export const isNumberFormatId = (value: unknown): value is NumberFormatId =>
  NUMBER_FORMATS.some((format) => format.id === value);

export const isDateFormatId = (value: unknown): value is DateFormatId =>
  DATE_FORMATS.some((format) => format.id === value);

export const numberTagOf = (
  format: NumberFormatId,
  locale: Locale = DEFAULT_LOCALE,
) =>
  NUMBER_FORMATS.find((item) => item.id === format)?.tag ?? REGION_TAG[locale];
