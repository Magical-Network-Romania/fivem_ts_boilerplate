/**
 * Loads a JSON file asynchronously using the fetch API.
 *
 * It sends a GET request to fetch the file at the specified path,
 * checks for a successful response, and then parses the JSON data.
 *
 * @template T The expected type of the parsed JSON.
 * @param path The path (relative to the resource) to the JSON file.
 * @returns A promise that resolves to the parsed JSON object of type T.
 * @throws An error if the HTTP response is not OK.
 */
export async function fetchJsonFile<T = unknown>(path: string): Promise<T> {
	const response = await fetch(`/${path}`, {
		method: "GET",
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
