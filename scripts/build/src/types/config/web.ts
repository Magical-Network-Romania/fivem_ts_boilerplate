import type { InlineConfig } from "vite";

/**
 * The vite build options that apply for the web build.
 * These options are used by vite when building the web files.
 * Used to set different options for development and production builds.
 */
export type WebBuildOptions = { development: InlineConfig; production: InlineConfig };

export interface WebBuildConfig {
	/** The directory where the web files are located. Must contain the follwing 2 files: `vite.config.ts` & `index.html` */
	entryDirectory: string;

	/** The directory where the web files will be outputted. Will be automatically inside the main outDirectory creating the following path: `mainOutDirectory/webOutDirectory/index.html` */
	outDirectory: string;

	/**
	 * The vite build options which are used when building the web files.
	 * Important: If `outDir` is set, it will do nothing, as it is overwritten by the `outDirectory` property.
	 */
	buildOptions: WebBuildOptions;
}
