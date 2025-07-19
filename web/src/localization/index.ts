import type { Locale, LocaleKey, LocaleSettings } from "@shared/types";
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
export function getLocale(key: LocaleKey): string {
	const parts = key.split(".");
	// start from the full JSON; keep as unknown until we confirm it's indexable
	let cursor: unknown = allLocales;

	for (const part of parts) {
		// narrow to object-with-keys
		if (typeof cursor === "object" && cursor !== null && part in cursor) {
			// cast to a safe indexable shape
			cursor = (cursor as Record<string, unknown>)[part];
		} else {
			// missing path → return raw key
			return key;
		}
	}

	// at this point cursor should be the leaf value (a string)
	return typeof cursor === "string" ? cursor : key;
}
