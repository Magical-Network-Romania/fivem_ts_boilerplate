import type { GameBuildConfig } from "./game";
import type { WebBuildConfig } from "./web";

export type { CommonEsbuildOptions, EsbuildOptions, GameBuildConfig, GameEsbuildOptions } from "./game";
export type { WebBuildConfig, WebBuildOptions } from "./web";

/**
 * The entire build configuration for the resource.
 * This contains all settings that are used to build the resource.
 */
export interface ResourceBuildConfig {
	/** The path to the directory where all files will be outputted */
	outDirectory: string;

	/** The path to the directory where static data is stored */
	staticDataDirectory?: string;

	/** The game (client & server) build configuration */
	game?: GameBuildConfig;

	/** The web build configuration */
	web?: WebBuildConfig;
}
