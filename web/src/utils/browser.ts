import { resourceEnv } from "@shared/resource";

/**
 * Determines if the current environment is a browser or the FiveM CEF.
 *
 * @returns {boolean} True if the environment is a browser, false if it is the FiveM CEF.
 */
export function isEnvBrowser(): boolean {
	// const isCfxNui: boolean = window.location.href.startsWith("https://cfx-nui-");
	// const isNuiProtocol: boolean = window.location.protocol === "nui:";

	// return !(isCfxNui || isNuiProtocol);

	return resourceEnv === "browser";
}
