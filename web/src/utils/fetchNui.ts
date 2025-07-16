import { resourceName } from "@shared/resource";
import { isEnvBrowser } from "./browser";

/**
 * Utility function to send NUI (browser-to-client) fetch requests in FiveM.
 *
 * @template T - The expected response type.
 * @param {string} eventName - The event name to send to the NUI resource.
 * @param {unknown} [data] - Optional data to send with the request.
 * @param {{ data: T; delay?: number }} [mock] - Optional mock response for browser environment, with optional delay in ms.
 * @returns {Promise<T>} - Resolves with the response data of type T.
 */
export async function fetchNui<T = unknown>(
	eventName: string,
	data?: unknown,
	mock?: { data: T; delay?: number }
): Promise<T> {
	if (isEnvBrowser()) {
		if (!mock) return await new Promise((resolve) => resolve);
		await new Promise((resolve) => setTimeout(resolve, mock.delay));
		return mock.data;
	}

	const options = {
		method: "post",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(data)
	};

	const resp = await fetch(`https://${resourceName ?? "nui-frame-app"}/${eventName}`, options);
	return (await resp.json()) as T;
}
