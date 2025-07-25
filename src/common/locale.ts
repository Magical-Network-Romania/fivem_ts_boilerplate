import type { Locale, LocaleKey, LocaleSettings } from "@shared/types";
import { LoadJsonFile } from "./utils/file";

const localeSettings: LocaleSettings = LoadJsonFile<LocaleSettings>("assets/configs/locale.json");
const currentLocale: string = localeSettings.locale;
const allLocales: Locale = LoadJsonFile<Locale>(`assets/locales/${currentLocale}.json`);

/**
 * Retrieves the localized string for the given locale key.
 *
 * @param {LocaleKey} key - The key to look up in the locale file.
 * @param {...string} args - Optional arguments to replace placeholders in the localized string. Placeholders should be in the format `%s` and will be replaced in order.
 * @returns {string} The localized string, or the key itself if it isn't found.
 */
export function getLocale(key: LocaleKey, ...args: string[]): string {
	const parts = key.split(".");

	// Drill down into allLocales using reduce; if any step fails, we end up with undefined.
	const cursor = parts.reduce<unknown | undefined>((currentValue, part) => {
		if (typeof currentValue === "object" && currentValue !== null) return (currentValue as Record<string, unknown>)[part];
		return undefined;
	}, allLocales);

	// If we got a string at the end, keep it, otherwise fall back to the key itself.
	let result = typeof cursor === "string" ? cursor : key;

	// Perform %s substitutions in order via reduce.
	result = args.reduce((prev, arg) => {
		if (prev.includes("%s")) return prev.replace("%s", arg);
		return prev;
	}, result);

	return result;
}
