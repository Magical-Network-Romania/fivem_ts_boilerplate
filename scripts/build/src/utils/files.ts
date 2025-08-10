import fs, { constants, readdir } from "node:fs/promises";
import { stripOptions } from "../data/stripFileName";

/**
 * Checks if the path to a directory exists.
 *
 * @param {string} path - The path to the directory.
 * @returns {Promise<boolean>} Promise resolving to a boolean that indicated if the directory exists or not.
 */
export async function checkDirectory(path: string): Promise<boolean> {
	try {
		await fs.access(path, constants.F_OK);
		return true;
	} catch (_error) {
		return false;
	}
}

/**
 * Checks if a file exists.
 *
 * @param {string} path - The path to the file.
 * @returns {Promise<boolean>} Promise resolving to a boolean that indicated if the file exists or not.
 */
export async function checkFile(path: string): Promise<boolean> {
	return await Bun.file(path).exists();
}

/**
 * Given one or more directories, recursively scan them (depth‑first)
 * and return a flat array of every file path found.
 *
 * @param {string[]} directories - Array of directory paths to scan
 * @returns {Promise<string[]>} Promise resolving to an array of absolute file paths
 */
export async function getFilePaths(...directories: string[]): Promise<string[]> {
	let stripPrefix: string | undefined;
	const maybeLastArg = directories.at(-1);

	if (typeof maybeLastArg === "string" && maybeLastArg.startsWith(stripOptions.prefixKeyword)) {
		const lastArg = directories.pop();
		stripPrefix = typeof lastArg === "string" ? lastArg.replace(stripOptions.prefixRegex, "") : undefined;
	}

	const files = await Promise.all(
		directories.map(async (dir) => {
			try {
				const dirents = await readdir(`${dir}/`, { withFileTypes: true });

				const paths = await Promise.all(
					dirents.map(async (dirent) => {
						const path = `${dir}/${dirent.name}`;
						return dirent.isDirectory() ? await getFilePaths(path) : path;
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
		result = result.map((path) =>
			path.startsWith(stripPrefix) ? path.slice(stripPrefix.length).replace(stripOptions.leadingSlashOrBackslashRegex, "") : path
		);
	}

	return result;
}
