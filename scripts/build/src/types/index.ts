export type {
	CommonEsbuildOptions,
	EsbuildOptions,
	GameBuildConfig,
	GameEsbuildOptions,
	ResourceBuildConfig,
	WebBuildConfig,
	WebBuildOptions
} from "./config";
export type { FXManifest, FXManifestConfig, FXManifestGame, FXManifestVersion } from "./fxmanifest";

/**
 * Signifies the result of a build operation.
 * It is a simple boolean indicating success or failure.
 */
export type BuildResult = boolean;

/**
 * Signifies the result of a building the game files.
 * `true` indicates a successful build (both server and client), `false` indicates a failure (neither sever nor client).
 * `ClientOnly` indicates that only the client files were built,
 * `ServerOnly` indicates that only the server files were built.
 */
export type GameBuildResult = BuildResult | "ClientOnly" | "ServerOnly";
