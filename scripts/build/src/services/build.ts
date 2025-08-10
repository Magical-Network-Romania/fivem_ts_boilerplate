import esbuild from "esbuild";
import { type InlineConfig, build as viteBuild } from "vite";
import type { BuildResult, EsbuildOptions, GameBuildConfig, GameBuildResult, ResourceBuildConfig, WebBuildConfig } from "../types";
import { checkDirectory, checkFile } from "../utils/files";

/**
 * Builds the client and server files of a FiveM resource using esbuild.
 *
 * @param devMode - Whether the build process should use configs for the development mode or production mode.
 * @param outDir - The main directory where all the built game files will be in.
 * @param buildConfig - The configuration of the game build containing the settings for client, server and the common options.
 * @returns `true` if both server and client were build, `ServerOnly` or `ClientOnly` if only one context was built, and `false` if nothing was built.
 */
export async function buildGameFiles(
	devMode: boolean,
	outDir: ResourceBuildConfig["outDirectory"],
	buildConfig: GameBuildConfig
): Promise<GameBuildResult> {
	console.log("⏳ | Started building the game files.");

	let buildResult: GameBuildResult = false;

	if (!(buildConfig.client || buildConfig.server)) {
		console.error("❌ | Game build skipped - missing client & server configs.");
		return buildResult;
	}

	const commonBuildOptions: EsbuildOptions = devMode
		? buildConfig.commonEsbuildOptions.development
		: buildConfig.commonEsbuildOptions.production;

	if (buildConfig.client) {
		const clientOptions: EsbuildOptions = devMode
			? buildConfig.client.buildOptions.development
			: buildConfig.client.buildOptions.production;
		const clientOutDirPath = `${outDir}/${buildConfig.client.outDirectory}`;

		try {
			await esbuild.build({
				...clientOptions,
				...commonBuildOptions,
				entryPoints: buildConfig.client.entryFiles,
				outdir: clientOutDirPath
			});
			console.log(`✅ | Client built successfully. ${buildConfig.client.entryFiles} -> ${clientOutDirPath}`);

			buildResult = "ClientOnly";
		} catch (error) {
			console.error(`❌ | Client build skipped: ${error}`);
		}
	} else console.warn("⚠️ | Client build skipped - missing files.");

	if (buildConfig.server) {
		const serverOptions: EsbuildOptions = devMode
			? buildConfig.server.buildOptions.development
			: buildConfig.server.buildOptions.production;
		const serverOutDirPath = `${outDir}/${buildConfig.server.outDirectory}`;

		try {
			await esbuild.build({
				...serverOptions,
				...commonBuildOptions,
				entryPoints: buildConfig.server.entryFiles,
				outdir: serverOutDirPath
			});
			console.log(`✅ | Server built successfully. ${buildConfig.server.entryFiles} -> ${serverOutDirPath}`);

			buildResult = buildResult === "ClientOnly" ? true : "ServerOnly";
		} catch (error) {
			console.error(`❌ | Server build skipped: ${error}`);
		}
	} else console.warn("⚠️ | Server build skipped - missing files.");

	if (buildResult === false) console.log("❌ | Game build failed.");
	else console.log("✅ | Successfully built the game files.");

	return buildResult;
}

/**
 * Builds the web context of a FiveM resource using the vite builder.
 * Expects the web folder to be nested inside another folder, outputting the build result 1 folder back.
 *
 * @param devMode - Whether the build process should use configs for the development mode or production mode.
 * @param outDir - The main directory where all other built game files are located.
 * @param buildConfig - The configuration of the web build.
 * @returns `true` is the web was built successfully or `false` if the build process failed.
 */
export async function buildWeb(
	devMode: boolean,
	outDir: ResourceBuildConfig["outDirectory"],
	buildConfig: WebBuildConfig
): Promise<BuildResult> {
	console.log("⏳ | Started building the web.");

	if (!(await checkDirectory(buildConfig.entryDirectory))) {
		console.error("❌ | Web build skipped - missing directory (web).");
		return false;
	}

	if (!checkFile(`${buildConfig.entryDirectory}/index.html`)) {
		console.error("❌ | Web build skipped - missing files (index.html).");
		return false;
	}

	if (!checkFile(`${buildConfig.entryDirectory}/vite.config.ts`)) {
		console.error("❌ | Web build skipped - missing files (vite.config.ts).");
		return false;
	}

	const buildOptions: InlineConfig = devMode ? buildConfig.buildOptions.development : buildConfig.buildOptions.production;

	try {
		await viteBuild({
			root: buildConfig.entryDirectory,
			...buildOptions,
			build: { outDir: `../${outDir}/${buildConfig.outDirectory}`, ...(buildOptions.build ?? {}) }
		});
	} catch (error) {
		console.error(`❌ | Web build failed: ${error}`);
		return false;
	}

	console.log("✅ | Web built successfully.");
	return true;
}
