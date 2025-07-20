export type FxManifestVersion = "cerulean" | "bodacious" | "adamant";
export type FxManifestGame = "gta5" | "gta4" | "rdr3" | "common";

export interface FxManifest {
	fx_version: FxManifestVersion;
	game: FxManifestGame;
	server_only?: string;
	node_version?: string;
	name?: string;
	author?: string;
	version?: string;
	license?: string;
	repository?: string;
	description?: string;
	ui_page?: string;
	shared_script?: string[];
	client_script?: string[];
	server_script?: string[];
	files?: string[];
	dependencies?: string[];
}

export interface FxManifestConfig {
	/** What value (tabs or spaces) will be used to indent arrays in fxmanifest. */
	arrayIndentValue: string;
	/** How many blank lines to leave after a property in FxManifest */
	blankLines: { [K in keyof FxManifest]?: number };
}
