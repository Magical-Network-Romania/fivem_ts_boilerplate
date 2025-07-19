import { resourceContext } from "../../shared/resource";
import { getLocale } from "./locale";

export function hello(): void {
	console.log(`Current context: ${resourceContext}`);
	console.log(getLocale("greet", getLocale("example_names.2")))
}
