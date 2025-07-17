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
 *
 * @returns {ResourceEnvironment} The environment of the resource, either 'game', 'cef', or 'browser'.
 */
export function detectResourceEnv(): ResourceEnvironment {
	if (typeof window === "undefined") return "game";
	if (typeof window.GetParentResourceName !== "undefined") return "cef";
	return "browser";
}

/**
 * Determine the resource context based on the resource environment:
 * - If in the game (client/server), we use IsDuplicityVersion() to determine whether it's running on the server or client.
 * - Otherwise (CEF or browser), the context is simply 'web'.
 *
 * @param {ResourceEnvironment} [env] - The environment to detect the context for. Defaults to the result of detectResourceEnv().
 * @returns {ResourceContext} The context of the resource, either 'server', 'client
 */
export function detectResourceContext(env: ResourceEnvironment = detectResourceEnv()): ResourceContext {
	if (env === "game") return IsDuplicityVersion() ? "server" : "client";
	return "web";
}

/**
 * Determine the resource name based on the environment:
 * - In the game (client/server), use the native GetCurrentResourceName().
 * - In a CEF environment, use the added window.GetParentResourceName() function.
 * - In a regular browser (development), use a generic name.
 *
 * @param {ResourceEnvironment} [env] - The environment to detect the resource name for. Defaults to the result of detectResourceEnv().
 * @returns {string} The name of the resource, which is either the current resource name in the game, the parent resource name in CEF, or a generic name in a browser.
 */
export function detectResourceName(env: ResourceEnvironment = detectResourceEnv()): string {
	if (env === "game") return GetCurrentResourceName();
	if (env === "cef" && window && typeof window.GetParentResourceName !== "undefined") return window.GetParentResourceName();
	return "nui-frame-app";
}

/**
 * The resource environment, which can be 'game', 'cef', or 'browser'.
 * This is determined by the detectResourceEnv function and is used to understand the context in which the code is running.
 */
export const resourceEnv: ResourceEnvironment = detectResourceEnv();

/**
 * The resource context, which can be 'server', 'client', or 'web'.
 * This is determined by the detectResourceContext function,
 * and provides insight into whether the code is running on the server, client, or in a web environment.
 */
export const resourceContext: ResourceContext = detectResourceContext(resourceEnv);

/**
 * The name of the resource, which is determined by the detectResourceName function in a game environment.
 * This name is used to identify the resource in the game or web environment.
 */
export const resourceName: string = detectResourceName();
