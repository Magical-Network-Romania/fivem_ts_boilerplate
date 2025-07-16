import type { ResourceContext, ResourceEnvironment } from "@shared/types";

/**
 * Extract the global window object from globalThis.
 * Note: This code runs on all three sides simultaneously (client, server, and web).
 * In client/server environments, window is undefined.
 * In a web environment, window exists. In FiveM's in-game browser (CEF), window has an added function GetParentResourceName.
 */
const window = (globalThis as { window?: unknown }).window as { GetParentResourceName?: () => string } | undefined;

/**
 * Determine the resource environment:
 * - If window is undefined, then the code is running in a game environment (client/server).
 * - If window exists and GetParentResourceName is defined, then it's running in FiveM's in-game browser (CEF).
 * - Otherwise, window exists but without the FiveM-specific function, so it's a regular browser (used during development).
 */
export const resourceEnv: ResourceEnvironment =
	window === undefined ? "game" : typeof window.GetParentResourceName !== "undefined" ? "cef" : "browser";

/**
 * Determine the resource context based on the resource environment:
 * - If in the game (client/server), we use IsDuplicityVersion() to determine whether it's running on the server or client.
 * - Otherwise (CEF or browser), the context is simply 'web'.
 */
export const resourceContext: ResourceContext =
	resourceEnv === "game" ? (IsDuplicityVersion() ? "server" : "client") : "web";

/**
 * Determine the resource name based on the environment:
 * - In the game (client/server), use the native GetCurrentResourceName().
 * - In a CEF environment, use the added window.GetParentResourceName() function.
 * - In a regular browser (development), use a generic name.
 */
export const resourceName: string =
	resourceEnv === "game"
		? GetCurrentResourceName()
		: resourceEnv === "cef" && window && typeof window.GetParentResourceName !== "undefined"
			? window.GetParentResourceName()
			: "nui-frame-app";
