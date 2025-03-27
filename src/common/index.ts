import { resourceContext } from "./resource";

export function hello(): void {
	console.log(`Current context: ${resourceContext}`);
}
