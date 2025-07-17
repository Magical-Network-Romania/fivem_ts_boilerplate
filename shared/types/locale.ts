/**
 * The locale settings, which includes the current locale.
 * This is loaded from the locale configuration file and is used to determine all settings related to localization.
 */
export type LocaleSettings = typeof import("@assets/configs/locale.json");

/**
 * The locale type, which represents the structure of the locale JSON files.
 */
export type Locale = typeof import("@assets/locales/en.json");

/**
 * The locale key type, which is a union of all keys in the Locale type.
 * This is used to ensure that only valid keys are used when retrieving localized strings.
 */
export type LocaleKey = keyof Locale;

/**
 * The locale value type, which can be a string or any value associated with a LocaleKey.
 * This is used to represent the localized string for a given key.
 */
export type LocaleValue = Locale[LocaleKey] | string;
