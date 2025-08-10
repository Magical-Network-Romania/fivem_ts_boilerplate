import { rm } from "node:fs/promises";
import { stripOptions } from "./data/stripFileName";
import { buildGameFiles, buildWeb } from "./services/build";
import { generateFXManifest } from "./services/fxmanifest";
import type { BuildResult, FXManifest, FXManifestConfig, GameBuildResult, ResourceBuildConfig } from "./types";
import { getFilePaths } from "./utils/files";

/**
 * Builds a whole FiveM Typescript resource using esbuild and the vite builder.
 * It will also generate an fxmanifest for the resource.
 * When in development mode, it will be generated in the root of the resource, while in production, it will be generated in the out folder together with the rest of the code.
 * Expects the web folder to be nested inside another folder, outputting the build result 1 folder back.
 *
 * @param devMode - Whether of not the development mode settings when building the resource.
 * @param buildConfig - The config containg all paths and options for building the resource.
 * @param defaultFxmanifest - Options of the fxmanifest which will be converted to the final generated fxmanifest. Overrides any informaation obtained from the package.json.
 * @param fxmanifestConfig - The config for generating the fxmanifest, containing mainly formatting options.
 */
export async function buildResource(
	devMode: boolean,
	buildConfig: ResourceBuildConfig,
	defaultFxmanifest: FXManifest,
	fxmanifestConfig: FXManifestConfig
): Promise<void> {
	console.log("⏳ | Started building the resource.");

	try {
		await rm(buildConfig.outDirectory, { recursive: true });
		console.log(`🧹 | Cleaned directory: ${buildConfig.outDirectory}.`);
	} catch (_error) {
		console.warn(`⚠️ | Failed to clean ${buildConfig.outDirectory} folder.`);
	}

	try {
		await Bun.file("./fxmanifest.lua").delete();
		console.log("🧹 | Cleaned fxmanifest.lua from root folder.");
	} catch (_error) {
		console.warn("⚠️ | Failed to clean fxmanifest from root folder.");
	}

	const stripOutDir: string | undefined = devMode ? undefined : `${stripOptions.prefixKeyword}${buildConfig.outDirectory}`;

	let clientFiles: string[] = [];
	let serverFiles: string[] = [];
	const extraFiles: string[] = await getFilePaths(`${buildConfig.staticDataDirectory}`, ...(stripOutDir ? [stripOutDir] : []));

	let gameBuildResult: GameBuildResult = false;
	let webBuildResult: BuildResult = false;
	let uiPage: string | undefined;

	if (buildConfig.game) {
		gameBuildResult = await buildGameFiles(devMode, buildConfig.outDirectory, buildConfig.game);

		switch (gameBuildResult) {
			case true: {
				clientFiles = await getFilePaths(
					`${buildConfig.outDirectory}/${buildConfig.game.client?.outDirectory}`,
					...(stripOutDir ? [stripOutDir] : [])
				);

				serverFiles = await getFilePaths(
					`${buildConfig.outDirectory}/${buildConfig.game.server?.outDirectory}`,
					...(stripOutDir ? [stripOutDir] : [])
				);

				break;
			}
			case "ClientOnly": {
				clientFiles = await getFilePaths(
					`${buildConfig.outDirectory}/${buildConfig.game.client?.outDirectory}`,
					...(stripOutDir ? [stripOutDir] : [])
				);

				break;
			}
			case "ServerOnly": {
				serverFiles = await getFilePaths(
					`${buildConfig.outDirectory}/${buildConfig.game.server?.outDirectory}`,
					...(stripOutDir ? [stripOutDir] : [])
				);

				break;
			}
			default: {
				break;
			}
		}
	}

	if (buildConfig.web) {
		webBuildResult = await buildWeb(devMode, buildConfig.outDirectory, buildConfig.web);

		if (webBuildResult) {
			uiPage = `${stripOutDir ? "" : `${buildConfig.outDirectory}/`}${buildConfig.web.outDirectory}/index.html`;
			const webFiles = await getFilePaths(
				`${buildConfig.outDirectory}/${buildConfig.web.outDirectory}`,
				...(stripOutDir ? [stripOutDir] : [])
			);

			extraFiles.push(...webFiles);
		}
	}

	await generateFXManifest(
		devMode ? "." : `${buildConfig.outDirectory}`,
		{
			...defaultFxmanifest,
			server_only: gameBuildResult === "ServerOnly" && webBuildResult === false ? "yes" : undefined,
			client_script: [...(defaultFxmanifest.client_script ?? []), ...clientFiles],
			server_script: [...(defaultFxmanifest.server_script ?? []), ...serverFiles],
			files: extraFiles,
			ui_page: uiPage
		},
		fxmanifestConfig
	);
}
