//@ts-check

import { createBuilder, createFxmanifest } from "@communityox/fx-utils";
import { exec, exists, getFiles } from "./utils.js";

const watch = process.argv.includes("--watch");
const web = await exists("./web");
const dropLabels = ["$BROWSER"];

if (!watch) dropLabels.push("$DEV");

await createBuilder(
	watch,
	{
		keepNames: true,
		legalComments: "inline",
		bundle: true,
		treeShaking: true
	},
	[
		{
			name: "server",
			options: {
				platform: "node",
				target: ["node22"],
				format: "cjs",
				dropLabels: [...dropLabels, "$CLIENT"]
			}
		},
		{
			name: "client",
			options: {
				platform: "browser",
				target: ["ES2022"],
				format: "iife",
				dropLabels: [...dropLabels, "$SERVER"]
			}
		}
	],
	async (outfiles) => {
		// Force a one-time build here so that the dist/web folder is created.
		// This is required because getFiles() below needs to include the web files in the fx manifest.
		// Without this build step, the fx manifest may be generated before the web files are built.
		if (web) await exec("cd ./web && vite build");

		const files = await getFiles("dist/web", "static", "locales");
		await createFxmanifest({
			client_scripts: [outfiles.client],
			server_scripts: [outfiles.server],
			files: files,
			dependencies: ["/server:13068", "/onesync"],
			metadata: {
				ui_page: "dist/web/index.html",
				node_version: "22"
			}
		});
	}
);

if (web && watch) await exec("cd ./web && vite build --watch");
