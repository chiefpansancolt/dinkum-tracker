import type { Locale } from "./locales";

/**
 * Intl.DisplayNames capitalizes names differently in Node and in the browser, which breaks
 * hydration.
 */
const LANGUAGE_NAMES: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
  es: "Español",
  "es-419": "Español (Latinoamérica)",
  fr: "Français",
  de: "Deutsch",
  it: "Italiano",
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  ru: "Русский",
  "zh-CN": "中文（简体）",
  "zh-TW": "中文（繁體）",
  ja: "日本語",
  ko: "한국어",
  tr: "Türkçe",
  vi: "Tiếng Việt",
  th: "ไทย",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
};

export const languageName = (locale: Locale) => LANGUAGE_NAMES[locale];
