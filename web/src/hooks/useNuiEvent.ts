import type { NuiHandlerSignature, NuiMessageData } from "@shared/types";
import { useCallback, useEffect } from "react";

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
 */
export function useNuiEvent<T = unknown>(action: string, handler: NuiHandlerSignature<T>): void {
	const listener = useCallback(
		(event: MessageEvent<NuiMessageData<T>>) => {
			if (event.data.action !== action) return;
			handler(event.data.data);
		},
		[action, handler]
	);

	useEffect(() => {
		window.addEventListener("message", listener);
		return () => window.removeEventListener("message", listener);
	}, [listener]);
}
