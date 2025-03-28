import { resourceName } from "@common/resource";

export function LoadJsonFile<T = unknown>(path: string): T {
	// For game/server: LoadResourceFile is synchronous.
	const fileContents = LoadResourceFile(resourceName, path);
	return JSON.parse(fileContents) as T;
}

export async function fetchFile<T = unknown>(path: string) {
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
