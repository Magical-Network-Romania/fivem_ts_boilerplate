import type { Locale, LocaleKey, LocaleSettings, LocaleValue } from "@shared/types";
import { fetchJsonFile } from "~/utils/files";

const localeSettings: LocaleSettings = await fetchJsonFile<LocaleSettings>("assets/configs/locale.json");
const currentLocale: string = localeSettings.locale;
const allLocales: Locale = await fetchJsonFile<Locale>(`assets/locales/${currentLocale}.json`);

/**
 * Retrieves the localized string for the given locale key.
 *
 * @param {LocaleKey} key - The key to look up in the locale file.
 * @returns {LocaleValue} The localized string, or the key itself if not found.
 */
export function getLocale(key: LocaleKey): LocaleValue {
	return allLocales[key] || key;
}
