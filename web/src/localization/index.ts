import type { Locale, LocaleKey } from "@shared/types";
import { fetchJsonFile } from "~/utils/files";

const currentLocale = (await fetchJsonFile<{ locale: string }>("assets/configs/locale.json")).locale;
const allLocales = await fetchJsonFile<Locale>(`assets/locales/${currentLocale}.json`);

/**
 * Retrieves the localized string for the given locale key.
 *
 * @param {LocaleKey} key - The key to look up in the locale file.
 * @returns {string} The localized string, or the key itself if not found.
 */
export function getLocale(key: LocaleKey): string {
	return allLocales[key] || key;
}
