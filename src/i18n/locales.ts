import type en from "./messages/en";

export type Messages = typeof en;

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type PartialMessages = {
  [K in keyof Messages]?: DeepPartial<Messages[K]>;
};

/**
 * A language that is not listed here reads as English, so an old backup with an unknown language
 * still opens. To add one, list it here, give it a region tag, add its catalog folder and run
 * `node scripts/gen-locale-indexes.mjs`.
 */
export const SUPPORTED_LOCALES = [
  "en",
  "ar",
  "es",
  "es-419",
  "fr",
  "de",
  "it",
  "pt-BR",
  "pt-PT",
  "ru",
  "zh-CN",
  "zh-TW",
  "ja",
  "ko",
  "tr",
  "vi",
  "th",
  "id",
  "ms",
] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const isSupportedLocale = (value: unknown): value is Locale =>
  typeof value === "string" &&
  (SUPPORTED_LOCALES as readonly string[]).includes(value);

/**
 * Arabic and Thai keep Western digits and the Gregorian calendar, as the game and its players
 * write them.
 */
export const REGION_TAG: Record<Locale, string> = {
  en: "en-US",
  ar: "ar-u-nu-latn",
  es: "es-ES",
  "es-419": "es-419",
  fr: "fr-FR",
  de: "de-DE",
  it: "it-IT",
  "pt-BR": "pt-BR",
  "pt-PT": "pt-PT",
  ru: "ru-RU",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja-JP",
  ko: "ko-KR",
  tr: "tr-TR",
  vi: "vi-VN",
  th: "th-TH-u-ca-gregory",
  id: "id-ID",
  ms: "ms-MY",
};

const RIGHT_TO_LEFT: readonly Locale[] = ["ar"];

export const directionOf = (locale: Locale) =>
  RIGHT_TO_LEFT.includes(locale) ? "rtl" : "ltr";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeOver = (base: unknown, over: unknown): unknown => {
  if (!isRecord(base) || !isRecord(over))
    return over === undefined ? base : over;
  const merged: Record<string, unknown> = { ...base };
  for (const key of Object.keys(over))
    merged[key] = mergeOver(base[key], over[key]);
  return merged;
};

const loaders: Record<Locale, () => Promise<{ default: PartialMessages }>> = {
  ar: () => import("./messages/ar"),
  es: () => import("./messages/es"),
  "es-419": () => import("./messages/es-419"),
  fr: () => import("./messages/fr"),
  de: () => import("./messages/de"),
  it: () => import("./messages/it"),
  "pt-BR": () => import("./messages/pt-BR"),
  "pt-PT": () => import("./messages/pt-PT"),
  ru: () => import("./messages/ru"),
  "zh-CN": () => import("./messages/zh-CN"),
  "zh-TW": () => import("./messages/zh-TW"),
  ja: () => import("./messages/ja"),
  ko: () => import("./messages/ko"),
  tr: () => import("./messages/tr"),
  vi: () => import("./messages/vi"),
  th: () => import("./messages/th"),
  id: () => import("./messages/id"),
  ms: () => import("./messages/ms"),
  en: () =>
    import("./messages/en") as unknown as Promise<{ default: PartialMessages }>,
};

export const loadMessages = async (locale: Locale): Promise<Messages> => {
  const { default: english } = await import("./messages/en");
  if (locale === "en") return english;
  const { default: own } = await loaders[locale]();
  return mergeOver(english, own) as Messages;
};
