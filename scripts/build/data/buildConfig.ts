import type { BuildConfig, FxManifestConfig } from "../types";

export const buildConfig: BuildConfig = {
	outDirectory: "dist",
	client: {
		entryFile: "src/client/index.ts",
		outDirectory: "client"
	},
	server: {
		entryFile: "src/server/index.ts",
		outDirectory: "server"
	},
	web: {
		entryDirectory: "web",
		outDirectory: "web"
	},
	staticDataDirectory: "assets"
} as const;

export const fxManifestConfig: FxManifestConfig = {
	arrayIndentValue: "\t",
	blankLines: {
		game: 1,
		node_version: 1,
		description: 1,
		ui_page: 1,
		shared_script: 1,
		client_script: 1,
		server_script: 1,
		files: 1
	}
} as const;
