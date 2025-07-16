import { resourceName } from "@shared/resource";

/**
 * Loads a JSON file from the resource synchronously using FiveM's native LoadResourceFile.
 *
 * Use this function only on the client or server side, where the native function is available.
 * It reads the file content from the resource and parses it as JSON.
 *
 * @template T The expected type of the parsed JSON.
 * @param path The path (relative to the resource) to the JSON file.
 * @returns The parsed JSON object of type T.
 */
export function LoadJsonFile<T = unknown>(path: string): T {
	const fileContents = LoadResourceFile(resourceName, path);
	return JSON.parse(fileContents) as T;
}
