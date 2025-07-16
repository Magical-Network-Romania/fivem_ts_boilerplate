import type { NuiMessageData } from "@shared/types";
import { isEnvBrowser } from "./browser";

/**
 * Emulates dispatching an event using SendNuiMessage.
 * This is used when developing in browser.
 *
 * @param events - The event you want to cover
 * @param timer - How long until it should trigger (ms)
 */
export const debugData = <P>(events: NuiMessageData<P>[], timer = 1000): void => {
	if (!(process.env.NODE_ENV === "development" && isEnvBrowser())) return;

	for (const event of events) {
		setTimeout(() => {
			window.dispatchEvent(
				new MessageEvent("message", {
					data: {
						action: event.action,
						data: event.data
					}
				})
			);
		}, timer);
	}
};
