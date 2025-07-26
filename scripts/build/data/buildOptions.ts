import type { AllBuildOptions, CommonBuildOptions, StrictBuildOptions, WebBuildOptions } from "../types";
import { buildConfig } from "./buildConfig";

export const commonBuildOptions: CommonBuildOptions = {
	development: { bundle: true, sourcemap: "inline", keepNames: true, legalComments: "inline", minify: false },
	production: { bundle: true, sourcemap: false, keepNames: false, legalComments: "none", minify: true, treeShaking: true }
} as const;

export const clientBuildOptions: StrictBuildOptions = {
	entryPoints: [`${buildConfig.client?.entryFile}`],
	outdir: `${buildConfig.outDirectory}/${buildConfig.client?.outDirectory}`,
	platform: "browser",
	target: ["es2022"],
	format: "iife"
} as const;

export const serverBuildOptions: StrictBuildOptions = {
	entryPoints: [`${buildConfig.server?.entryFile}`],
	outdir: `${buildConfig.outDirectory}/${buildConfig.server?.outDirectory}`,
	platform: "node",
	target: ["node22"],
	format: "cjs"
} as const;

export const webBuildOptions: WebBuildOptions = {
	development: {
		// Required to overwrite the public directory to false so that absolute paths from the root directory are processed correctly and not overwritten to be relative.
		publicDir: false,
		build: {
			outDir: `../${buildConfig.outDirectory}/${buildConfig?.web?.outDirectory}`,
			minify: false,
			sourcemap: "inline",
			copyPublicDir: false
		}
	},
	production: {
		// Required to overwrite the public directory to false so that absolute paths from the root directory are processed correctly and not overwritten to be relative.
		publicDir: false,
		build: {
			outDir: `../${buildConfig.outDirectory}/${buildConfig?.web?.outDirectory}`,
			minify: true,
			sourcemap: false,
			copyPublicDir: false
		}
	}
} as const;

export const buildOptions: AllBuildOptions = {
	client: buildConfig.client ? clientBuildOptions : undefined,
	server: buildConfig.server ? serverBuildOptions : undefined,
	web: buildConfig.web ? webBuildOptions : undefined,
	common: commonBuildOptions
} as const;
