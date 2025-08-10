import type { BuildOptions } from "esbuild";

/**
 * The regular esbuild type but with only the settings regarding the build, omitting the `entryPoints`, `outdir` and `outfile` properties.
 */
export type EsbuildOptions = Omit<BuildOptions, "entryPoints" | "outdir" | "outfile">;

/**
 * The esbuild options that apply for both client and server when building.
 * Can be used to set different options for development and production builds.
 */
export interface CommonEsbuildOptions {
	development: EsbuildOptions;
	production: EsbuildOptions;
}

/**
 * The esbuild options that are used for the game build for by the client and server individually.
 * It has a development and production build option.
 */
export interface GameEsbuildOptions {
	development: EsbuildOptions;
	production: EsbuildOptions;
}

export interface GameBuildConfig {
	/** All build configuration options for the client */
	client?: {
		/** The main files for the client */
		entryFiles: string[];

		/** The directory where the client files will be outputted. Will be automatically inside the main outDirectory creating the following path: `mainOutDirectory/clientOutDirectory/index.js` */
		outDirectory: string;

		/**
		 * The esbuild options which are used when building the client side of the resource
		 * Imporant: If `entrypoints` or `outdir` are set, they will do nothing, as they are overwritten by the `entryFile` and `outDirectory` properties.
		 */
		buildOptions: GameEsbuildOptions;
	};

	/** All build configuraation options for the server */
	server?: {
		/** The main files for the server */
		entryFiles: string[];

		/** The directory where the server files will be outputted. Will be automatically inside the main outDirectory creating the following path: `mainOutDirectory/serverOutDirectory/index.js` */
		outDirectory: string;

		/**
		 * The esbuild options which are used when building the server side of the resource
		 * Imporant: If `entrypoints` or `outdir` are set, they will do nothing, as they are overwritten by the `entryFile` and `outDirectory` properties.
		 */
		buildOptions: GameEsbuildOptions;
	};

	/** The esbuild options which are used on both the client and the server */
	commonEsbuildOptions: CommonEsbuildOptions;
}
