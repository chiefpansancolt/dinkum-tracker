"use client";

import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { DocumentTitle } from "@/comps/layout/DocumentTitle";
import { DEFAULT_LOCALE } from "./locales";
import en from "./messages/en";

export function I18nProvider({ children }: { children: ReactNode }) {
	return (
		<NextIntlClientProvider locale={DEFAULT_LOCALE} messages={en} timeZone="UTC">
			<DocumentTitle />
			{children}
		</NextIntlClientProvider>
	);
}
