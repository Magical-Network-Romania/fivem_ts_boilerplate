import type { BuildOptions } from "esbuild";
import type { BuildEnvironmentOptions } from "vite";

type RequiredBuildOptions = Required<Pick<BuildOptions, "entryPoints" | "outdir" | "platform" | "target" | "format">>;
type OptionalBuildOptions = Partial<Omit<BuildOptions, keyof RequiredBuildOptions>>;

export type StrictBuildOptions = RequiredBuildOptions & OptionalBuildOptions;

export interface CommonBuildOptions {
	development: BuildOptions;
	production: BuildOptions;
}

export interface WebBuildOptions {
	development: BuildEnvironmentOptions;
	production: BuildEnvironmentOptions;
}

export interface AllBuildOptions {
	client?: StrictBuildOptions;
	server?: StrictBuildOptions;
	web?: WebBuildOptions;
	common: CommonBuildOptions;
}
