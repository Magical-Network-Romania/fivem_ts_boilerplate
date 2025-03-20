export function isEnvBrowser(): boolean {
	const isCfxNui: boolean = window.location.href.startsWith("https://cfx-nui-");
	const isNuiProtocol: boolean = window.location.protocol === "nui:";

	return !(isCfxNui || isNuiProtocol);
}
