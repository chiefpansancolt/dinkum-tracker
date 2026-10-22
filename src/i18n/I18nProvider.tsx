"use client";

import { NextIntlClientProvider } from "next-intl";
import { Fragment, useEffect, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { storageService } from "@/service/store";
import { DocumentTitle } from "@/comps/layout/DocumentTitle";
import { configureI18n } from "./formatter";
import { DEFAULT_LOCALE, directionOf, loadMessages } from "./locales";
import type { Locale, Messages } from "./locales";
import en from "./messages/en";

/**
 * It sits outside the data provider, so it reads the stored preferences itself. English is part of
 * the first page load. Another language loads after the page opens, and English shows until then.
 * The children are keyed by the choices, so they render again when a choice changes.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
	const prefs = useSyncExternalStore(
		storageService.subscribe,
		() => storageService.load().prefs,
		() => undefined
	);
	const locale = prefs?.language ?? DEFAULT_LOCALE;
	const numberFormat = prefs?.numberFormat ?? "auto";
	const dateFormat = prefs?.dateFormat ?? "auto";

	const [loaded, setLoaded] = useState<{ locale: Locale; messages: Messages }>({
		locale: DEFAULT_LOCALE,
		messages: en,
	});

	useEffect(() => {
		let current = true;
		loadMessages(locale).then((messages) => {
			if (current) setLoaded({ locale, messages });
		});
		return () => {
			current = false;
		};
	}, [locale]);

	useEffect(() => {
		document.documentElement.lang = locale;
		document.documentElement.dir = directionOf(locale);
	}, [locale]);

	// A language shows English until its catalog has loaded, so a message is never missing.
	const ready = loaded.locale === locale;
	const activeLocale = ready ? locale : DEFAULT_LOCALE;
	const messages = ready ? loaded.messages : en;
	configureI18n({ locale: activeLocale, messages, numberFormat, dateFormat });

	return (
		<NextIntlClientProvider locale={activeLocale} messages={messages} timeZone="UTC">
			<Fragment key={`${activeLocale}|${numberFormat}|${dateFormat}`}>
				<DocumentTitle />
				{children}
			</Fragment>
		</NextIntlClientProvider>
	);
}
