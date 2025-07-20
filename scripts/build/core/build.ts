import esbuild, { type BuildOptions } from "esbuild";
import { type BuildEnvironmentOptions, build as viteBuild } from "vite";
import type { BuildResult, GameBuildResult, StrictBuildOptions } from "../types";
import { checkDirectory, checkFile } from "../utils/files";

/**
 * Builds the client and server files (If they exist) using esbuild.
 *
 * @async
 * @param {StrictBuildOptions} [clientOptions] - Required options for the client such as the paths, target, etc.
 * @param {StrictBuildOptions} [serverOptions] - Required options for the server such as the paths, target, etc.
 * @param {BuildOptions} [commonOptions] - Optional options that are applied to both the client and server.
 * @returns {Promise<GameBuildResult>} A promise that resolves to GameBuildResult which indicates if the game was built successfully or only one context was built.
 */
export async function buildGameFiles(
	clientOptions?: StrictBuildOptions,
	serverOptions?: StrictBuildOptions,
	commonOptions?: BuildOptions
): Promise<GameBuildResult> {
	console.log("⏳ | Started building the game files.");
	let buildResult: GameBuildResult = false;

	if (!(clientOptions || serverOptions)) {
		console.error("❌ | Game build skipped - missing options.");
		return buildResult;
	}

	if (clientOptions) {
		await esbuild.build({ ...clientOptions, ...commonOptions });
		console.log(`✅ | Client built successfully. ${clientOptions.entryPoints} -> ${clientOptions.outdir}`);

		buildResult = "ClientOnly";
	} else console.warn("⚠️ | Client build skipped - missing files.");

	if (serverOptions) {
		await esbuild.build({ ...serverOptions, ...commonOptions });
		console.log(`✅ | Server built successfully. ${serverOptions.entryPoints} -> ${serverOptions.outdir}`);

		buildResult = buildResult === "ClientOnly" ? true : "ServerOnly";
	} else console.warn("⚠️ | Server build skipped - missing files.");

	console.log("✅ | Successfully built the game files.");
	return buildResult;
}

/**
 * Builds the web using the vite builder.
 *
 * @param {string} path - The path to the web folder which contains the vite config as well as the html file.
 * @param {BuildEnvironmentOptions} [buildOptions] - Extra build options that can be added to the vite builder.
 * @returns {Promise<BuildResult>} A promise that resolves to BuildResult indicating if the web was built successfully or not.
 */
export async function buildWeb(path: string, buildOptions?: BuildEnvironmentOptions): Promise<BuildResult> {
	console.log("⏳ | Started building the web.");

	if (!(await checkDirectory(path))) {
		console.error("❌ | Web build skipped - missing directory (web).");
		return false;
	}

	if (!checkFile(`${path}/index.html`)) {
		console.error("❌ | Web build skipped - missing files (index.html).");
		return false;
	}

	if (!checkFile(`${path}/vite.config.ts`)) {
		console.error("❌ | Web build skipped - missing files (vite.config.ts).");
		return false;
	}

	await viteBuild({ root: path, build: buildOptions });

	console.log("✅ | Web built successfully.");
	return true;
}
