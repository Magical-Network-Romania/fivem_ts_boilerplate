import type { Locale, LocaleKey, LocaleSettings, LocaleValue } from "@shared/types";
import { LoadJsonFile } from "./utils/file";

const localeSettings: LocaleSettings = LoadJsonFile<LocaleSettings>("assets/configs/locale.json");
const currentLocale: string = localeSettings.locale;
const allLocales: Locale = LoadJsonFile<Locale>(`assets/locales/${currentLocale}.json`);

/**
 * Retrieves the localized string for the given locale key.
 *
 * @param {LocaleKey} key - The key to look up in the locale file.
 * @returns {LocaleValue} The localized string, or the key itself if not found.
 */
export function getLocale(key: LocaleKey): LocaleValue {
	return allLocales[key] || key;
}
