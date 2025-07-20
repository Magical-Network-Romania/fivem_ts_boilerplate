import process from "node:process";
import type { BuildOptions } from "esbuild";
import type { BuildEnvironmentOptions } from "vite";
import { buildGameFiles, buildWeb } from "./core/build";
import { generateFxManifest } from "./core/fxmanifest";
import { buildConfig, fxManifestConfig } from "./data/buildConfig";
import { buildOptions } from "./data/buildOptions";
import { defaultFxManifestSettings, stripOptions } from "./data/default";
import type { GameBuildResult } from "./types";
import { getFilePaths } from "./utils/files";

console.log("⏳ | Started building the resource.");

const isDevMode = process.env.NODE_ENV === "development";
const stripOutDir: string | undefined = isDevMode ? undefined : `${stripOptions.prefixKeyword}${buildConfig.outDirectory}`;

const activeBuildOptions: BuildOptions = isDevMode ? buildOptions.common.development : buildOptions.common.production;
const gameBuildResult = await buildGameFiles(buildOptions.client, buildOptions.server, activeBuildOptions);

const clientFiles: string[] =
	gameBuildResult === true || gameBuildResult === "ClientOnly"
		? await getFilePaths(`${buildConfig.outDirectory}/${buildConfig.client?.outDirectory}`, ...(stripOutDir ? [stripOutDir] : []))
		: [];

const serverFiles: string[] =
	gameBuildResult === true || gameBuildResult === "ServerOnly"
		? await getFilePaths(`${buildConfig.outDirectory}/${buildConfig.server?.outDirectory}`, ...(stripOutDir ? [stripOutDir] : []))
		: [];

const extraFiles: string[] = await getFilePaths(`${buildConfig.staticDataDirectory}`, ...(stripOutDir ? [stripOutDir] : []));
let uiPage: string | undefined;

let webBuilt: GameBuildResult = false;
if (buildConfig.web && buildOptions.web) {
	const activeWebBuildOptions: BuildEnvironmentOptions = isDevMode ? buildOptions.web.development : buildOptions.web.production;

	webBuilt = await buildWeb(buildConfig.web.entryDirectory, activeWebBuildOptions);

	if (webBuilt) {
		uiPage = `${buildConfig.outDirectory}/${buildConfig.web.outDirectory}/index.html`;
		const webFiles = await getFilePaths(
			`${buildConfig.outDirectory}/${buildConfig.web.outDirectory}`,
			...(stripOutDir ? [stripOutDir] : [])
		);

		extraFiles.push(...webFiles);
	}
}

await generateFxManifest(
	isDevMode ? "." : `${buildConfig.outDirectory}`,
	{
		...defaultFxManifestSettings,
		server_only: gameBuildResult === "ServerOnly" && webBuilt === false ? "yes" : undefined,
		client_script: clientFiles,
		server_script: serverFiles,
		files: extraFiles,
		ui_page: uiPage
	},
	fxManifestConfig
);

console.log("✅ | Resource built successfully.");
