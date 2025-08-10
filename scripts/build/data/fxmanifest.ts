import type { FXManifest, FXManifestConfig } from "../src/types";

export const defaultFxmanifest: FXManifest = {
	fx_version: "cerulean",
	game: "gta5",
	node_version: "22",
	dependencies: ["/server:13068", "/onesync"]
} as const;

export const fxmanifestConfig: FXManifestConfig = {
	indentValue: "\t",
	blankLines: {
		game: 1,
		node_version: 1,
		description: 1,
		ui_page: 1,
		loadscreen: 1,
		loadscreen_manual_shutdown: 1,
		shared_script: 1,
		client_script: 1,
		server_script: 1,
		files: 1
	}
} as const;
