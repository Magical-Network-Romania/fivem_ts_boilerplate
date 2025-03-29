import type { ConfigType } from "@common/types";
import { resourceEnv } from "./resource";
import { LoadJsonFile } from "./utils/file";
import { fetchJsonFile } from "./utils/file";

let config: ConfigType;

// @ts-ignore
// biome-ignore lint/suspicious/noConfusingLabels: This is a drop label. Code here will only be executed when it is built in the web. On client/server this code will be discarded and not built
$BROWSER: config = await fetchJsonFile<ConfigType>("static/config.json");
if (resourceEnv === "game") config = LoadJsonFile<ConfigType>("static/config.json");

export default config;
