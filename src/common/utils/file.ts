import { resourceEnv, resourceName } from "@common/resource";

export function LoadJsonFile<T = unknown>(path: string): T {
	if (resourceEnv === "game") {
		// For game/server: LoadResourceFile is synchronous.
		const fileContents = LoadResourceFile(resourceName, path);
		return JSON.parse(fileContents) as T;
	}

	// For browser/CEF: Use fetch to load the file asynchronously.
	const response = fetch(`/${path}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		}
	});

	// Await response.json() to get the parsed object.
	return response.then((res) => res.json()) as T;
}
