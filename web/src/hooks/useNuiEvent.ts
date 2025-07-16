import type { NuiHandlerSignature, NuiMessageData } from "@shared/types";
import { type RefObject, useEffect, useRef } from "react";

/**
 * A hook that manage events listeners for receiving data from the client scripts
 * @param action The specific `action` that should be listened for.
 * @param handler The callback function that will handle data relayed by this hook
 *
 * @example
 * useNuiEvent<{visibility: true, wasVisible: 'something'}>('setVisible', (data) => {
 *   // whatever logic you want
 * })
 *
 **/
export function useNuiEvent<T = unknown>(action: string, handler: (data: T) => void): void {
	const savedHandler: RefObject<NuiHandlerSignature<T>> = useRef(() => undefined);

	// Make sure we handle for a reactive handler
	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect(() => {
		function eventListener(event: MessageEvent<NuiMessageData<T>>) {
			const { action: eventAction, data } = event.data;

			if (!savedHandler.current) return;
			if (eventAction !== action) return;

			savedHandler.current(data);
		}

		window.addEventListener("message", eventListener);

		// Remove Event Listener on component cleanup
		return () => window.removeEventListener("message", eventListener);
	}, [action]);
}
