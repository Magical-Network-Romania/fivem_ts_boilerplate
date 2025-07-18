/**
 * The structure of a NUI message.
 *
 * @template T - The type of the `data` payload.
 * @property {string} action - A string identifier for the action the handler should perform.
 * @property {T} data - The strongly-typed payload associated with this message.
 */
export interface NuiMessageData<T = unknown> {
	action: string;
	data: T;
}

/**
 * Signature for a function that handles incoming NUI messages.
 *
 * @template T - The type of the data payload that this handler expects.
 * @param {T} data - The data payload of the NUI message.
 * @returns {void}
 */
export type NuiHandlerSignature<T> = (data: T) => void;
