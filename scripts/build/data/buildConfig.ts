import type { ResourceBuildConfig } from "../src/types";

export const buildConfig: ResourceBuildConfig = {
	outDirectory: "dist",
	staticDataDirectory: "assets",
	game: {
		client: {
			entryFiles: ["src/client/index.ts"],
			outDirectory: "client",
			buildOptions: {
				development: {
					platform: "browser",
					target: ["es2022"],
					format: "iife"
				},
				production: {
					platform: "browser",
					target: ["es2022"],
					format: "iife"
				}
			}
		},
		server: {
			entryFiles: ["src/server/index.ts"],
			outDirectory: "server",
			buildOptions: {
				development: {
					platform: "node",
					target: ["node22"],
					format: "cjs"
				},
				production: {
					platform: "node",
					target: ["node22"],
					format: "cjs"
				}
			}
		},
		commonEsbuildOptions: {
			development: {
				bundle: true,
				sourcemap: "inline",
				keepNames: true,
				legalComments: "inline",
				minify: false
			},
			production: {
				bundle: true,
				sourcemap: false,
				keepNames: false,
				legalComments: "none",
				minify: true,
				treeShaking: true
			}
		}
	},
	web: {
		entryDirectory: "web",
		outDirectory: "web",
		buildOptions: {
			development: {
				// Required to be false, to overwrite the public directory to false so that absolute paths from the root directory are processed correctly and not transformed to be relative.
				publicDir: false,
				build: {
					minify: false,
					sourcemap: "inline",
					copyPublicDir: false
				}
			},
			production: {
				// Required to be false, to overwrite the public directory to false so that absolute paths from the root directory are processed correctly and not transformed to be relative.
				publicDir: false,
				build: {
					minify: true,
					sourcemap: false,
					copyPublicDir: false
				}
			}
		}
	}
} as const;
