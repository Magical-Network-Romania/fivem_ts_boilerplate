import type { Locale, LocaleKey, LocaleSettings } from "@shared/types";
import { fetchJsonFile } from "~/utils/files";

const localeSettings: LocaleSettings = await fetchJsonFile<LocaleSettings>("assets/configs/locale.json");
const currentLocale: string = localeSettings.locale;
const allLocales: Locale = await fetchJsonFile<Locale>(`assets/locales/${currentLocale}.json`);

/**
 * Retrieves the localized string for the given locale key.
 *
 * @param {LocaleKey} key - The key to look up in the locale file.
 * @param {...string} args - Optional arguments to replace placeholders in the localized string. Placeholders should be in the format `%s` and will be replaced in order.
 * @returns {LocaleValue} The localized string, or the key itself if not found.
 */
export function getLocale(key: LocaleKey, ...args: string[]): string {
	const parts = key.split(".");

	// start from the full JSON; keep as unknown until we confirm it's indexable
	let cursor: unknown = allLocales;

	for (const part of parts) {
		if (typeof cursor === "object" && cursor !== null) cursor = (cursor as Record<string, unknown>)[part];
		else return key;
	}

	let result = typeof cursor === "string" ? cursor : key;

	for (const arg of args) {
		if (result.includes("%s")) result = result.replace("%s", arg);
		else break;
	}

	return result;
}
