//@ts-check

import { writeFile } from "node:fs/promises";
import { stripPrefixKeyword } from "./data/buildProcess.json";
import { outputDirectories, resourceDependencies, resourceMetadata } from "./data/output.json";
import { exec } from "./utils/commands.js";
import { exists, getFiles } from "./utils/files.js";
import { generateFxManifestText } from "./utils/fxmanifest.js";

const web = await exists("./web");

await Bun.build({
	entrypoints: ["./src/client/index.ts", "./src/server/index.ts"],
	outdir: "./dist",
	format: "cjs",
	target: "node"
});

if (web) await exec("cd ./web && vite build");

const files = await getFiles(
	`${outputDirectories.main}/${outputDirectories.web}`,
	outputDirectories.staticData,
	`${stripPrefixKeyword}${outputDirectories.main}/`
);
const FxManifestText = await generateFxManifestText(
	[`${outputDirectories.client}/*.js`],
	[`${outputDirectories.server}/*.js`],
	files,
	resourceDependencies,
	resourceMetadata
);

await writeFile(`./${outputDirectories.main}/fxmanifest.lua`, FxManifestText);
