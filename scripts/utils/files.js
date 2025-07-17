//@ts-check

import { readdir, readFile, stat } from "node:fs/promises";
import { leadingSlashOrBackslashRegex, stripPrefixKeyword, stripPrefixRegex } from "../data/buildProcess.json";

/**
 * Check if a filepath is valid.
 *
 * @param {string} path The path to check.
 * @returns {Promise<boolean>} Returns true if the path exists, otherwise false.
 */
export async function exists(path) {
	try {
		await stat(path);
		return true;
	} catch (_error) {
		return false;
	}
}

/**
 * Reads and parses a JSON file at the given path.
 *
 * @param {string} path The file path to read the JSON from.
 * @return {Promise<Object>} Returns a promise that resolves to the parsed JSON object.
 * @throws {Error} Throws an error if the file cannot be read or parsed.
 */
export async function readJsonFile(path) {
	return JSON.parse(await readFile(path, "utf8"));
}

/**
 * Recursively read the files in a directory and return the paths.
 *
 * @param {string[]} args The paths of directories to read.
 * @return {Promise<string[]>} Returns a promise that resolves to an array of file paths.
 */
export async function getFiles(...args) {
	let stripPrefix;
	const maybeLastArg = args.at(-1);

	if (typeof maybeLastArg === "string" && maybeLastArg.startsWith(stripPrefixKeyword)) {
		const lastArg = args.pop();
		stripPrefix = typeof lastArg === "string" ? lastArg.replace(new RegExp(stripPrefixRegex), "") : undefined;
	}

	const files = await Promise.all(
		args.map(async (dir) => {
			try {
				const dirents = await readdir(`${dir}/`, { withFileTypes: true });
				const paths = await Promise.all(
					dirents.map(async (dirent) => {
						const path = `${dir}/${dirent.name}`;
						return dirent.isDirectory() ? await getFiles(path) : path;
					})
				);

				return paths.flat();
			} catch (_error) {
				return [];
			}
		})
	);

	let result = files.flat();
	if (stripPrefix) {
		result = result.map((f) =>
			f.startsWith(stripPrefix) ? f.slice(stripPrefix.length).replace(new RegExp(leadingSlashOrBackslashRegex), "") : f
		);
	}

	return result;
}
