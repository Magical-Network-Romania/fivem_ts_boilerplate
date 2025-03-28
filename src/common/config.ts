import type configType from "static/config.json";
import { LoadJsonFile } from "./utils/file";
import { fetchJsonFile } from "./utils/file";

const webConfig: Promise<typeof configType> = fetchJsonFile<typeof configType>("static/config.json");
const gameConfig: typeof configType = LoadJsonFile<typeof configType>("static/config.json");

export { webConfig, gameConfig };
