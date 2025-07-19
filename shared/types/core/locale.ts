import type { FlattenObjectKeys } from "./object";

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
export type LocaleKey = FlattenObjectKeys<Locale>;
