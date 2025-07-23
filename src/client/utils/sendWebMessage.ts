import type { NuiMessageData } from "@shared/types";

/**
 * Sends a message to the NUI (New User Interface) using the SendNUIMessage function, while enforcing the structure of the message.
 * This function is designed to ensure that the message conforms to the NuiMessageData interface, which includes an action and data.
 *
 * @template T - The type of the data being sent in the message.
 * @param {NuiMessageData<T>} message - The message to be sent, which must conform to the NuiMessageData interface.
 * @returns {void}
 */
export function sendWebMessage<T = unknown>(message: NuiMessageData<T>): void {
	SendNUIMessage({ action: message.action, data: message.data });
}
