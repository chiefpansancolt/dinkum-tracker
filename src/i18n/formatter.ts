import { createTranslator } from "next-intl";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_NUMBER_FORMAT,
  numberTagOf,
} from "./formats";
import type { DateFormatId, NumberFormatId } from "./formats";
import { DEFAULT_LOCALE, REGION_TAG } from "./locales";
import type { Locale, Messages } from "./locales";
import en from "./messages/en";

/**
 * `I18nProvider` sets this state and remounts its children when it changes, so a plain function
 * such as `formatNumber` is current while it renders.
 */
interface I18nState {
  locale: Locale;
  messages: Messages;
  numberFormat: NumberFormatId;
  dateFormat: DateFormatId;
}

let state: I18nState = {
  locale: DEFAULT_LOCALE,
  messages: en,
  numberFormat: DEFAULT_NUMBER_FORMAT,
  dateFormat: DEFAULT_DATE_FORMAT,
};

export const configureI18n = (next: I18nState) => {
  state = next;
};

export const getI18nState = () => state;

const numberTag = () => numberTagOf(state.numberFormat, state.locale);
const languageTag = () => REGION_TAG[state.locale];

const numberFormatters = new Map<string, Intl.NumberFormat>();

const numberFormatter = (options: Intl.NumberFormatOptions = {}) => {
  const key = `${numberTag()}|${JSON.stringify(options)}`;
  const known = numberFormatters.get(key);
  if (known) return known;

  const created = new Intl.NumberFormat(numberTag(), options);
  numberFormatters.set(key, created);
  return created;
};

export const formatNumber = (value: number) => numberFormatter().format(value);

export const formatDecimal = (value: number, maxFractionDigits = 2) =>
  numberFormatter({ maximumFractionDigits: maxFractionDigits }).format(value);

export const formatFixed = (value: number, digits: number) =>
  numberFormatter({
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);

const DATE_PATTERNS: Record<Exclude<DateFormatId, "auto">, string[]> = {
  mdy: ["month", "day", "year"],
  dmy: ["day", "month", "year"],
  ymd: ["year", "month", "day"],
};

const DATE_SEPARATOR: Record<Exclude<DateFormatId, "auto">, string> = {
  mdy: "/",
  dmy: "/",
  ymd: "-",
};

const numericDate = (date: Date, format: Exclude<DateFormatId, "auto">) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(date)
      .map((part) => [part.type, part.value]),
  );
  return DATE_PATTERNS[format]
    .map((type) => parts[type])
    .join(DATE_SEPARATOR[format]);
};

export const formatTime = (date: Date) =>
  date.toLocaleTimeString(languageTag(), {
    hour: "numeric",
    minute: "2-digit",
  });

export const formatDateTime = (iso: string) => {
  const date = new Date(iso);
  if (state.dateFormat !== "auto") {
    return `${numericDate(date, state.dateFormat)}, ${formatTime(date)}`;
  }
  return date.toLocaleString(languageTag(), {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatShortDate = (iso: string) => {
  const date = new Date(iso);
  if (state.dateFormat !== "auto") return numericDate(date, state.dateFormat);
  return date.toLocaleDateString(languageTag(), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/** A component uses the `useTranslations` hook instead. */
export const translator = <Namespace extends keyof Messages>(
  namespace: Namespace,
) =>
  createTranslator({
    locale: state.locale,
    messages: state.messages,
    namespace,
  });
