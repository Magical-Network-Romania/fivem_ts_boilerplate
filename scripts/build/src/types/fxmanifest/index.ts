/**
 * Represents the version of the fxmanifest.
 * @see {@link https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#fx_version FiveM Documentation on fx_version}
 */
export type FXManifestVersion = "cerulean" | "bodacious" | "adamant";

/**
 * Represents the game for which the fxmanifest is intended.
 * @see {@link https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#game FiveM Documentation on Game Property}
 */
export type FXManifestGame = "gta5" | "gta4" | "rdr3" | "common";

/**
 * Represents the structure of a FiveM fxmanifest file.
 * This is used to define the metadata and scripts for a FiveM resource.
 * The manifest will be written in the exact order as the properties are defined here.
 * @see {@link https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/ FiveM Documentation on fxmanifest}
 */
export interface FXManifest {
	fx_version: FXManifestVersion;
	game: FXManifestGame;
	server_only?: string;
	node_version?: string;
	name?: string;
	author?: string;
	version?: string;
	license?: string;
	repository?: string;
	description?: string;
	ui_page?: string;
	loadscreen?: string;
	loadscreen_manual_shutdown?: boolean;
	shared_script?: string[];
	client_script?: string[];
	server_script?: string[];
	files?: string[];
	dependencies?: string[];
}

/**
 * Configuration for the fxmanifest.
 * This is used to define how the fxmanifest should be formatted when written to a file.
 */
export interface FXManifestConfig {
	/** What value (tabs or spaces) will be used to indent stuff (like arrays) in fxmanifest. */
	indentValue: string;
	/** How many blank lines to write under a property in FxManifest. Used for formatting */
	blankLines: { [K in keyof FXManifest]?: number };
}
