import type configType from "static/config.json";
import { LoadJsonFile } from "./utils/file";

const config: Promise<typeof configType> = LoadJsonFile<typeof configType>("static/config.json");

export default config;
