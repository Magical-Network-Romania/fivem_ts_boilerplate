//@ts-check

import { reduceArray, reduceObject } from "./data";
import { readJsonFile } from "./files.js";

/**
 * Generates the text content for an fxmanifest file used in FiveM resources.
 *
 * @param {string[]} clientFiles Array of file paths to be included as client scripts.
 * @param {string[]} serverFiles Array of file paths to be included as server scripts.
 * @param {string[]} [otherFiles] Optional array of additional files to include.
 * @param {string[]} [dependencies] Optional array of resource dependencies.
 * @param {Record<string, string>} [metadata] Optional additional metadata properties for the manifest.
 * @returns {Promise<string>} The text which is to be written in the fx manifest.
 */
export async function generateFxManifestText(clientFiles, serverFiles, otherFiles = [], dependencies = [], metadata = {}) {
	const pkg = await readJsonFile("package.json");
	const fxmanifestProperties = {
		name: pkg.name,
		author: pkg.author,
		version: pkg.version,
		license: pkg.license,
		repository: pkg.repository?.url,
		description: pkg.description,
		fx_version: "cerulean",
		game: "gta5",
		...(metadata || {})
	};

	let output = reduceObject(fxmanifestProperties);
	output += reduceArray("files", otherFiles);
	output += reduceArray("dependencies", dependencies);
	output += reduceArray("client_scripts", clientFiles);
	output += reduceArray("server_scripts", serverFiles);

	return output;
}
