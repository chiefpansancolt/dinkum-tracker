import { createTranslator } from "next-intl";
import { DEFAULT_LOCALE, REGION_TAG } from "./locales";
import en from "./messages/en";

const languageTag = REGION_TAG[DEFAULT_LOCALE];

const numberFormatter = new Intl.NumberFormat(languageTag);
const decimalFormatters = new Map<number, Intl.NumberFormat>();

export const formatNumber = (value: number) => numberFormatter.format(value);

/** A number with at most `maxFractionDigits` decimals, for example 4.75. */
export const formatDecimal = (value: number, maxFractionDigits = 2) => {
  const known = decimalFormatters.get(maxFractionDigits);
  const formatter =
    known ??
    new Intl.NumberFormat(languageTag, {
      maximumFractionDigits: maxFractionDigits,
    });
  decimalFormatters.set(maxFractionDigits, formatter);
  return formatter.format(value);
};

export const formatTime = (date: Date) =>
  date.toLocaleTimeString(languageTag, { hour: "numeric", minute: "2-digit" });

export const formatShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString(languageTag, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString(languageTag, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

/**
 * A translator for code that is not a component, such as a service that builds a sentence. A
 * component uses the `useTranslations` hook instead.
 */
export const translator = <Namespace extends keyof typeof en>(
  namespace: Namespace,
) => createTranslator({ locale: DEFAULT_LOCALE, messages: en, namespace });
