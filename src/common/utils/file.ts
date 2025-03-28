import { resourceName } from "@common/resource";

/**
 * LoadFile loads a JSON file from the resource synchronously using FiveM's native LoadResourceFile.
 *
 * Use this function only on the client or server side, where the native function is available.
 * It reads the file content from the resource and parses it as JSON.
 *
 * @template T The expected type of the parsed JSON.
 * @param path The path (relative to the resource) to the JSON file.
 * @returns The parsed JSON object of type T.
 */
export function LoadJsonFile<T = unknown>(path: string): T {
	// For game/server: LoadResourceFile is synchronous.
	const fileContents = LoadResourceFile(resourceName, path);
	return JSON.parse(fileContents) as T;
}

/**
 * fetchFile loads a JSON file asynchronously using the fetch API.
 *
 * Use this function only in web, where file access is done via HTTP.
 * It sends a POST request to fetch the file at the specified path,
 * checks for a successful response, and then parses the JSON data.
 *
 * @template T The expected type of the parsed JSON.
 * @param path The path (relative to the resource) to the JSON file.
 * @returns A promise that resolves to the parsed JSON object of type T.
 * @throws An error if the HTTP response is not OK.
 */
export async function fetchJsonFile<T = unknown>(path: string): Promise<T> {
	// For browser/CEF: Use fetch to load the file asynchronously.
	const response = await fetch(`/${path}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	// Await response.json() to get the parsed object.
	return (await response.json()) as T;
}
